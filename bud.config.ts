import type { Bud } from "@roots/bud";

/**
 * Bud config
 */
export default async (bud: Bud) => {
	async function getDynamicEntries(inputDir, outputDir) {
		const files = await bud.fs.list(`resources/${inputDir}`);

		if (!files) return [];

		return files.reduce((entries, filename) => {
			const name = filename.replace(".ts", "");
			entries[`${outputDir}/${name}`] = `${inputDir}/${filename}`;
			return entries;
		}, {});
	}

	const blocks = await getDynamicEntries("scripts/frontend/blocks", "blocks");
	const components = await getDynamicEntries(
		"scripts/frontend/components",
		"components"
	);

	bud
		.proxy(`http://ueno.vipdev.lndo.site/`)
		.serve(`http://localhost:8000`)
		.watch([bud.path(`resources/views`), bud.path(`app`)])

		.entry(`app`, [`@scripts/app`, `@styles/app`])
		.entry(`editor`, [`@scripts/editor`, `@styles/editor`])
		.entry({ ...blocks, ...components })
		.assets(["images"])

		.experiments(`topLevelAwait`, true)

		.wpjson.setSettings({
			background: {
				backgroundImage: true,
			},
			color: {
				custom: false,
				customDuotone: false,
				customGradient: false,
				defaultDuotone: false,
				defaultGradients: false,
				defaultPalette: false,
				duotone: [],
			},
			custom: {
				spacing: {},
				typography: {
					"font-size": {},
					"line-height": {},
				},
			},
			spacing: {
				padding: true,
				units: ["px", "%", "em", "rem", "vw", "vh"],
			},
			typography: {
				customFontSize: false,
			},
		});

	bud.when(`tailwind` in bud, ({ wpjson }) =>
		wpjson.useTailwindColors().useTailwindFontFamily().useTailwindFontSize()
	);

	await bud.tapAsync(sourceThemeValues);

	bud
		.when(`eslint` in bud, ({ eslint }) =>
			eslint
				.extends([`@40q/eslint-config`])
				.setFix(true)
				.setFailOnWarning(bud.isProduction)
		)

		/**
		 * Stylelint config
		 */
		.when(`stylelint` in bud, ({ stylelint }) =>
			stylelint
				.extends([
					`@roots/sage/stylelint-config`,
					`@roots/bud-tailwindcss/stylelint-config`,
				])
				.setFix(true)
				.setFailOnWarning(bud.isProduction)
		)

		/**
		 * Image minification config
		 */
		.when(`imagemin` in bud, ({ imagemin }) =>
			imagemin.encode(`jpeg`, { mozjpeg: true, quality: 70 })
		);

	/**
	 * Add cache control headers
	 */
	bud.hooks.on("dev.middleware.dev.options", (options) => {
		options.headers = [
			...options.headers,
			{
				key: "Cache-Control",
				value: "public, max-age=1800",
			},
		];
		return options;
	});
};

/**
 * Find all `*.theme.js` files and apply them to the `theme.json` output
 */
const sourceThemeValues = async ({ error, glob, wpjson }: Bud) => {
	const importMatching = async (paths: Array<string>) =>
		await Promise.all(paths.map(async (path) => (await import(path)).default));

	const setThemeValues = (records: Record<string, unknown>) =>
		Object.entries(records).map((params) => wpjson.set(...params));

	await glob(`resources/**/*.theme.js`)
		.then(importMatching)
		.then((modules) => modules.map(setThemeValues))
		.catch(error);
};
