// 發布 @confucian-ui 系列套件到 npm
//
// 用法：
//   node scripts/publish.mjs [target] [bump]
//
//   target: vuetify (預設) | rsbuild-plugin | all
//   bump:   patch (預設) | minor | major | <具體版本>
//
// 範例：
//   pnpm release                          → vuetify patch
//   pnpm release rsbuild-plugin minor     → rsbuild-plugin minor
//   pnpm release all patch                → 兩者都 patch
//
// 流程：
//   1. 確認 working tree 乾淨
//   2. 對每個 target 各自 build → bump version → publish
//   3. 一次 commit 含所有變更（commit message 反映實際發布的套件）
//   4. 只在發布到 vuetify 時才打 git tag（tag 名 = vuetify 版本）
//   5. push commit + tags
//   6. 只在發布到 vuetify 時才開啟 GitHub Release draft

import { execSync } from "node:child_process";

// ── 套件設定 ──

const PACKAGES = {
	"vuetify": {
		name: "@confucian-ui/vuetify",
		dir: "packages/vuetify",
	},
	"rsbuild-plugin": {
		name: "@confucian-ui/rsbuild-plugin",
		dir: "packages/rsbuild-plugin",
	},
};

// ── 解析參數 ──

const VALID_TARGETS = new Set(["vuetify", "rsbuild-plugin", "all"]);
const targetArg = process.argv[2] ?? "vuetify";
const bump = process.argv[3] ?? "patch";

if(!VALID_TARGETS.has(targetArg)) {
	console.error(`✗ 無效的 target："${targetArg}"，可用值：${[...VALID_TARGETS].join(", ")}`);
	process.exit(1);
}

const targets = targetArg === "all" ? ["vuetify", "rsbuild-plugin"] : [targetArg];
const includesVuetify = targets.includes("vuetify");

// ── 工具 ──

function run(cmd, opts = {}) {
	console.log(`\n> ${cmd}`);
	execSync(cmd, { stdio: "inherit", ...opts });
}

function readVersion(dir) {
	return execSync(`node -p "require('./package.json').version"`, { cwd: dir, encoding: "utf-8" }).trim();
}

// ── 流程 ──

// 1. 工作目錄乾淨
const status = execSync("git status --porcelain", { encoding: "utf-8" }).trim();
if(status) {
	console.error("✗ 工作目錄不乾淨，請先 commit 或 stash：\n" + status);
	process.exit(1);
}

// 2. 對每個 target：build → bump → publish
const results = []; // [{ key, name, version }]
for(const key of targets) {
	const pkg = PACKAGES[key];
	console.log(`\n━━━ 處理 ${pkg.name} ━━━`);

	// build
	run(`pnpm --filter ${pkg.name} build`);

	// bump version（在子目錄執行；--no-git-tag-version 因為 pnpm 在子目錄 commit 會失敗）
	run(`pnpm version ${bump} --no-git-tag-version`, { cwd: pkg.dir });

	const version = readVersion(pkg.dir);
	console.log(`版本：${version}`);

	// publish
	// --no-git-checks：此時 package.json 已 bump 但尚未 commit（commit 在所有 publish 之後統一做），
	// pnpm 會抱怨 working tree dirty；這裡跳過 git 檢查
	run("pnpm publish --access public --no-git-checks", { cwd: pkg.dir });

	results.push({ key, name: pkg.name, version });
}

// 3. Commit（含所有變更的 package.json + lockfile）
run("pnpm install --lockfile-only");
const filesToAdd = [
	...results.map(r => `${PACKAGES[r.key].dir}/package.json`),
	"pnpm-lock.yaml",
].join(" ");
run(`git add ${filesToAdd}`);

const commitMsg = "Version " + results.map(r => `${r.key}@${r.version}`).join(", ");
run(`git commit -m ${JSON.stringify(commitMsg)}`);

// 4. Tag（只在發布到 vuetify 時打）
let tag;
if(includesVuetify) {
	const vuetifyResult = results.find(r => r.key === "vuetify");
	tag = `v${vuetifyResult.version}`;
	run(`git tag ${tag}`);
}

// 5. Push
run("git push && git push --tags");

// 6. GitHub Release draft（只在發布到 vuetify 時）
if(includesVuetify && tag) {
	const repo = "confucian-ui/confucian-ui";
	const releaseUrl = `https://github.com/${repo}/releases/new?tag=${tag}&title=${encodeURIComponent(tag)}`;
	console.log(`\n📝 GitHub Release：${releaseUrl}`);
	const openCmds = { win32: "start", darwin: "open" };
	const openCmd = openCmds[process.platform] ?? "xdg-open";
	execSync(`${openCmd} ${releaseUrl}`, { stdio: "ignore" });
}

// 7. 完成訊息
console.log("\n✓ 發布完成！");
for(const r of results) {
	console.log(`   • ${r.name}@${r.version}`);
}
