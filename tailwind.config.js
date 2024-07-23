/** @type {import('tailwindcss').Config} config */
const config = {
	content: [
		"footer.php",
		"header.php",
		"index.php",
		"search.php",
		"searchform.php",
		"./app/**/*.php",
		"./partials/**/*.php",
		"./resources/**/*.{php,vue,js,ts,tsx}",
	],
	theme: {
		fontFamily: {},
		screens: {
			sm: "576px",
			md: "768px",
			lg: "992px",
			xl: "1440px",
		},
		fontSize: {},
		colors: {},
	},
	plugins: [
		function ({ addComponents }) {
			addComponents({
				".container": {
					maxWidth: "100%",
					marginLeft: "auto",
					marginRight: "auto",
					paddingLeft: "1.25rem",
					paddingRight: "1.25rem",
					"@screen sm": {
						maxWidth: "540px",
						padding: "0",
					},
					"@screen md": {
						maxWidth: "720px",
						padding: "0",
					},
					"@screen lg": {
						maxWidth: "960px",
						padding: "0",
					},
					"@screen xl": {
						maxWidth: "1056px",
					},
					"@screen 2xl": {
						maxWidth: "1056px",
					},
				},
				".wide-container": {
					maxWidth: "100%",
					marginLeft: "auto",
					marginRight: "auto",
					paddingLeft: "1.25rem",
					paddingRight: "1.25rem",
					"@screen sm": {
						maxWidth: "540px",
						padding: "0",
					},
					"@screen md": {
						maxWidth: "720px",
						padding: "0",
					},
					"@screen lg": {
						maxWidth: "960px",
						padding: "0",
					},
					"@screen xl": {
						maxWidth: "1270px",
					},
				},
			});
		},
	],
};

export default config;
