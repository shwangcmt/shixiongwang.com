// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeFlexoki from 'starlight-theme-flexoki';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Shi-Xiong Wang',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/shwangcmt' }],
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
			plugins: [
				starlightThemeFlexoki({
					accentColor: 'cyan',
				}),
			],
			customCss: [
				// Fonts
				'@fontsource/source-serif-4/400.css',
				'@fontsource/source-serif-4/400-italic.css',
				'@fontsource/source-serif-4/600.css',
				'@fontsource/source-serif-4/600-italic.css',
				'@fontsource/source-serif-4/700.css',
				'@fontsource/source-serif-4/700-italic.css', /* Optional but good for consistency */
				'@fontsource/source-serif-4/900.css',
				'@fontsource/source-sans-3/400.css',
				'@fontsource/source-sans-3/400-italic.css',
				'@fontsource/source-sans-3/600.css',
				'@fontsource/source-sans-3/600-italic.css',
				'@fontsource/source-sans-3/900.css',
				// Custom Styles
				'./src/styles/custom.css',
				// KaTeX CSS
				'katex/dist/katex.min.css',
			],
		}),
	],
	markdown: {
		remarkPlugins: [remarkMath],
		rehypePlugins: [rehypeKatex],
	},
});
