// 發布 @confucian-ui/vuetify 到 npm
// 用法：node scripts/publish.mjs [patch|minor|major|<版本號>]
//
// 流程：
//   1. 確認 working tree 乾淨
//   2. build vuetify 套件
//   3. bump version（pnpm version）
//   4. commit package.json + pnpm-lock.yaml
//   5. git tag
//   6. pnpm publish --access public
//   7. git push + push tags
//   8. 開啟 GitHub Release draft 頁面

import { execSync } from "node:child_process";

const bump = process.argv[2] ?? "patch";
const pkgDir = "packages/vuetify";

function run(cmd, opts = {}) {
	console.log(`\n> ${cmd}`);
	execSync(cmd, { stdio: "inherit", ...opts });
}

// 1. 確認乾淨
const status = execSync("git status --porcelain", { encoding: "utf-8" }).trim();
if(status) {
	console.error("✗ 工作目錄不乾淨，請先 commit 或 stash：\n" + status);
	process.exit(1);
}

// 2. Build
run("pnpm --filter @confucian-ui/vuetify build");

// 3. Bump version（在子目錄執行，不帶 git-tag-version 避免 pnpm 在子目錄 commit 失敗）
run(`pnpm version ${bump} --no-git-tag-version`, { cwd: pkgDir });

// 讀取新版本號
const version = execSync(`node -p "require('./package.json').version"`, { cwd: pkgDir, encoding: "utf-8" }).trim();
const tag = `v${version}`;
console.log(`\n版本：${version}（tag: ${tag}）`);

// 4. Commit
run("pnpm install --lockfile-only");
run(`git add ${pkgDir}/package.json pnpm-lock.yaml`);
run(`git commit -m "Version ${version}"`);

// 5. Tag
run(`git tag ${tag}`);

// 6. Publish
run("pnpm publish --access public", { cwd: pkgDir });

// 7. Push
run("git push && git push --tags");

// 8. 開啟 GitHub Release draft 頁面（與 np 相同做法：組 URL + 開瀏覽器）
const repo = "confucian-ui/confucian-ui";
const releaseUrl = `https://github.com/${repo}/releases/new?tag=${tag}&title=${encodeURIComponent(tag)}`;
console.log(`\n📝 GitHub Release：${releaseUrl}`);
const openCmds = { win32: "start", darwin: "open" };
const openCmd = openCmds[process.platform] ?? "xdg-open";
execSync(`${openCmd} ${releaseUrl}`, { stdio: "ignore" });

console.log(`\n✓ @confucian-ui/vuetify@${version} 發布完成！`);
