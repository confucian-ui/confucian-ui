import { defineConfig } from "eslint/config";
import { createConfig } from "@mutsuntsai/eslint";

export default defineConfig([
	...createConfig({
		ignores: ["**/{dist,.dist-staging}/**"],
		import: {
			files: ["**/*.{ts,vue}", "eslint.config.js"],
			project: [
				"packages/core",
				"packages/demo",
				"packages/starter",
			],
		},
		globals: {
			esm: ["eslint.config.js", "**/scripts/**"],
			browser: ["**/src/**"],
		},
		vue: true,
	}),
	{
		rules: {
			"local-rules/ascii-comments": "off",
			"@typescript-eslint/no-magic-numbers": "off",
		},
	},
	{
		files: ["**/package.json"],
		rules: {
			"package-json/specify-peers-locally": "off",
		},
	},
]);
