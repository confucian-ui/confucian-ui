// 把 .dist-staging/ 的建置結果「個別」同步到 dist/
// - 讓 Rsbuild dev server 在 core 重建期間仍能看到 dist/ 裡的舊檔
// - 建置完成後，新檔覆蓋、相同則不動、多餘的才刪除
// - 避免像 rslib 的 cleanDistPath 那樣一次把 dist 整個砍掉

import { copyFileSync, existsSync, mkdirSync, readdirSync, renameSync, rmSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = resolve(fileURLToPath(import.meta.url), "..");
const pkgRoot = resolve(here, "..");
const stagingDir = resolve(pkgRoot, ".dist-staging");
const distDir = resolve(pkgRoot, "dist");

if(!existsSync(stagingDir)) {
	console.error(`[sync-dist] staging 目錄不存在：${stagingDir}`);
	process.exit(1);
}

// Rslib v0.21 用自己的 LibCssExtractPlugin + libCssExtractLoader 處理 CSS，
// 完全繞過了 Rsbuild/Rspack 的 cssChunkFilename / tools.cssExtract 設定，
// 因此 CSS 檔名無法透過官方配置固定——只能在建置後 rename。
// 我們的 4 個 entry 共用同一批 SFC，產出的 CSS 合輯只會有一份。
const cssFiles = readdirSync(stagingDir).filter(f => f.endsWith(".css"));
if(cssFiles.length > 1) {
	console.error(`[sync-dist] 預期 staging 只有一份 CSS 合輯，實際找到 ${cssFiles.length}：${cssFiles.join(", ")}`);
	process.exit(1);
}
if(cssFiles.length === 1 && cssFiles[0] !== "components.css") {
	renameSync(join(stagingDir, cssFiles[0]), join(stagingDir, "components.css"));
}

// 蒐集 staging 內所有檔案的相對路徑
function collectFiles(root, base = root, acc = new Set()) {
	for(const name of readdirSync(root)) {
		const full = join(root, name);
		if(statSync(full).isDirectory()) {
			collectFiles(full, base, acc);
		} else {
			acc.add(relative(base, full).replace(/\\/g, "/"));
		}
	}
	return acc;
}

const stagingFiles = collectFiles(stagingDir);
const distFiles = existsSync(distDir) ? collectFiles(distDir) : new Set();

// 1. 複製 / 覆蓋 staging → dist
let copied = 0;
for(const rel of stagingFiles) {
	const src = join(stagingDir, rel);
	const dst = join(distDir, rel);
	mkdirSync(resolve(dst, ".."), { recursive: true });
	copyFileSync(src, dst);
	copied++;
}

// 2. 刪除 dist 中多餘的檔案（staging 沒有但 dist 有）
let removed = 0;
for(const rel of distFiles) {
	if(!stagingFiles.has(rel)) {
		rmSync(join(distDir, rel), { force: true });
		removed++;
	}
}

// 3. 清理掉空的舊資料夾（非必要但乾淨）
function pruneEmptyDirs(dir) {
	if(!existsSync(dir)) return;
	for(const name of readdirSync(dir)) {
		const full = join(dir, name);
		if(statSync(full).isDirectory()) pruneEmptyDirs(full);
	}
	if(readdirSync(dir).length === 0 && dir !== distDir) {
		rmSync(dir, { recursive: true, force: true });
	}
}
pruneEmptyDirs(distDir);

console.log(`[sync-dist] 複製 ${copied} 檔、移除 ${removed} 檔。`);
