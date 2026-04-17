// 全域事件委派：點擊 v-text-field 的 prepend-inner icon 時，
// 若該 field 含 input[type="date"] 或 input[type="time"]，
// 自動呼叫 showPicker() 開啟原生日期/時間選擇器。
//
// 這讓消費者不需要手動綁事件或包元件，只要加 prepend-inner-icon 就能運作。
// 由 createConfucian 的 install() 呼叫，只註冊一次。

export function installNativePickerDelegate(): void {
	if(typeof document === "undefined") return;

	document.addEventListener("click", e => {
		const target = e.target as Element;
		const prepend = target.closest?.(".v-field__prepend-inner");
		if(!prepend) return;
		const field = prepend.closest(".v-field");
		const input = field?.querySelector<HTMLInputElement>(
			'input[type="date"], input[type="time"]'
		);
		if(input?.showPicker) input.showPicker();
	});
}
