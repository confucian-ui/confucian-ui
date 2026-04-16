// 簡單 deep merge：plain object 遞迴合併、陣列直接覆寫（後者勝出）。
// 為 ApexCharts options 這類純資料 config 設計，刻意不處理 lodash.merge 那些
// edge case（cross-realm、Map/Set/TypedArray、Symbol key、循環引用、prototype pollution 等），
// 換來幾乎為 0 的 bundle 增量與可預期的行為。
//
// 用法：deepMerge(base, override1, override2, ...)
export function deepMerge<T extends object>(...sources: Array<Partial<T> | undefined>): T {
	const out: Record<string, unknown> = {};
	for(const src of sources) {
		if(!src) continue;
		for(const [key, val] of Object.entries(src)) {
			const prev = out[key];
			if(
				val && typeof val === "object" && !Array.isArray(val) &&
				prev && typeof prev === "object" && !Array.isArray(prev)
			) {
				out[key] = deepMerge(prev as Record<string, unknown>, val as Record<string, unknown>);
			} else {
				out[key] = val;
			}
		}
	}
	return out as T;
}
