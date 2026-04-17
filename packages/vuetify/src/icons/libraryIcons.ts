// Library 自己用到的 Phosphor icon 的預先註冊。
//
// 核心套件本身會使用某些 icon（見下方 import 清單），這些在此 module
// 載入時就註冊到 phosphorSet 的 registry 裡，不依賴消費端 loader。
//
// 消費端的 icon 則由 @confucian-ui/rsbuild-plugin 的 Phosphor loader
// 掃描原始碼、自動注入對應的 register 呼叫，確保整個應用的 icon 都被正確打包。
//
// 新增 icon 到 aliases.ts 或 Confucian* 元件後，需回來此檔同步加上 import + register

import {
	PhArrowBendDownLeft,
	PhArrowDown,
	PhArrowFatUp,
	PhArrowLeft,
	PhArrowRight,
	PhArrowsDownUp,
	PhArrowUp,
	PhBackspace,
	PhCalendar,
	PhCaretDoubleLeft,
	PhCaretDoubleRight,
	PhCaretDown,
	PhCaretLeft,
	PhCaretRight,
	PhCheck,
	PhCheckCircle,
	PhCheckSquare,
	PhCircle,
	PhCircleDashed,
	PhClock,
	PhCloudArrowUp,
	PhCommand,
	PhCornersIn,
	PhCornersOut,
	PhDotOutline,
	PhEye,
	PhEyedropper,
	PhEyeSlash,
	PhInfo,
	PhList,
	PhMagnifyingGlass,
	PhMinus,
	PhMinusSquare,
	PhMoon,
	PhPalette,
	PhPaperclip,
	PhPause,
	PhPencilSimple,
	PhPlay,
	PhPlus,
	PhSignOut,
	PhSortAscending,
	PhSortDescending,
	PhSpeakerHigh,
	PhSpeakerLow,
	PhSpeakerSlash,
	PhSquare,
	PhStar,
	PhStarHalf,
	PhSun,
	PhWarning,
	PhWarningCircle,
	PhX,
	PhXCircle
} from "@phosphor-icons/vue";

import { registerPhosphorIcon } from "./phosphorSet";

registerPhosphorIcon("PhArrowBendDownLeft", PhArrowBendDownLeft);
registerPhosphorIcon("PhArrowDown", PhArrowDown);
registerPhosphorIcon("PhArrowFatUp", PhArrowFatUp);
registerPhosphorIcon("PhArrowLeft", PhArrowLeft);
registerPhosphorIcon("PhArrowRight", PhArrowRight);
registerPhosphorIcon("PhArrowsDownUp", PhArrowsDownUp);
registerPhosphorIcon("PhArrowUp", PhArrowUp);
registerPhosphorIcon("PhBackspace", PhBackspace);
registerPhosphorIcon("PhCalendar", PhCalendar);
registerPhosphorIcon("PhCaretDoubleLeft", PhCaretDoubleLeft);
registerPhosphorIcon("PhCaretDoubleRight", PhCaretDoubleRight);
registerPhosphorIcon("PhCaretDown", PhCaretDown);
registerPhosphorIcon("PhCaretLeft", PhCaretLeft);
registerPhosphorIcon("PhCaretRight", PhCaretRight);
registerPhosphorIcon("PhCheck", PhCheck);
registerPhosphorIcon("PhCheckCircle", PhCheckCircle);
registerPhosphorIcon("PhCheckSquare", PhCheckSquare);
registerPhosphorIcon("PhCircle", PhCircle);
registerPhosphorIcon("PhCircleDashed", PhCircleDashed);
registerPhosphorIcon("PhClock", PhClock);
registerPhosphorIcon("PhCloudArrowUp", PhCloudArrowUp);
registerPhosphorIcon("PhCommand", PhCommand);
registerPhosphorIcon("PhCornersIn", PhCornersIn);
registerPhosphorIcon("PhCornersOut", PhCornersOut);
registerPhosphorIcon("PhDotOutline", PhDotOutline);
registerPhosphorIcon("PhEye", PhEye);
registerPhosphorIcon("PhEyedropper", PhEyedropper);
registerPhosphorIcon("PhEyeSlash", PhEyeSlash);
registerPhosphorIcon("PhInfo", PhInfo);
registerPhosphorIcon("PhList", PhList);
registerPhosphorIcon("PhMagnifyingGlass", PhMagnifyingGlass);
registerPhosphorIcon("PhMinus", PhMinus);
registerPhosphorIcon("PhMinusSquare", PhMinusSquare);
registerPhosphorIcon("PhMoon", PhMoon);
registerPhosphorIcon("PhPalette", PhPalette);
registerPhosphorIcon("PhPaperclip", PhPaperclip);
registerPhosphorIcon("PhPause", PhPause);
registerPhosphorIcon("PhPencilSimple", PhPencilSimple);
registerPhosphorIcon("PhPlay", PhPlay);
registerPhosphorIcon("PhPlus", PhPlus);
registerPhosphorIcon("PhSignOut", PhSignOut);
registerPhosphorIcon("PhSortAscending", PhSortAscending);
registerPhosphorIcon("PhSortDescending", PhSortDescending);
registerPhosphorIcon("PhSpeakerHigh", PhSpeakerHigh);
registerPhosphorIcon("PhSpeakerLow", PhSpeakerLow);
registerPhosphorIcon("PhSpeakerSlash", PhSpeakerSlash);
registerPhosphorIcon("PhSquare", PhSquare);
registerPhosphorIcon("PhStar", PhStar);
registerPhosphorIcon("PhStarHalf", PhStarHalf);
registerPhosphorIcon("PhSun", PhSun);
registerPhosphorIcon("PhWarning", PhWarning);
registerPhosphorIcon("PhWarningCircle", PhWarningCircle);
registerPhosphorIcon("PhX", PhX);
registerPhosphorIcon("PhXCircle", PhXCircle);
