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
			components: {
				// Override the theme selector with our custom styled dropdown
				ThemeSelect: './src/components/overrides/ThemeSelect.astro',
			},
			customCss: [
				// Variable fonts - normal and italic styles
				'@fontsource-variable/source-serif-4',
				'@fontsource-variable/source-serif-4/wght-italic.css',
				'@fontsource-variable/source-sans-3',
				'@fontsource-variable/source-sans-3/wght-italic.css',
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
