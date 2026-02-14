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
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/shwangcmt/shixiongwang.com' }],
			head: [
				// theme-color meta tags are managed dynamically by ThemeSelect.astro
			],
			sidebar: [
				{
					label: 'Home',
					slug: ''
				},
				{
					label: 'Teaching',
					items: [
						// Each item here is one entry in the navigation menu.
						{
							label: 'PHYS040C',
							slug: 'teaching/phys040c'
						},
					],
				},
				{
					label: 'Research',
					items: [
						// Each item here is one entry in the navigation menu.
						{
							label: 'Jordan-Wigner Transformation',
							slug: 'research/example'
						},
					],
				},
				{
					label: 'Notes',
					autogenerate: { directory: 'notes' },
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
				Sidebar: './src/components/overrides/Sidebar.astro',
				Pagination: './src/components/overrides/Pagination.astro',
				MobileMenuToggle: './src/components/overrides/MobileMenuToggle.astro',
			},
			customCss: [
				// Fonts - only load weights actually used (400, 600 with italics)
				'@fontsource/source-serif-4/400.css',
				'@fontsource/source-serif-4/400-italic.css',
				'@fontsource/source-serif-4/600.css',
				'@fontsource/source-serif-4/600-italic.css',
				'@fontsource/source-sans-3/400.css',
				'@fontsource/source-sans-3/400-italic.css',
				'@fontsource/source-sans-3/600.css',
				'@fontsource/source-sans-3/600-italic.css',
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
