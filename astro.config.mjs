// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeFlexoki from 'starlight-theme-flexoki';
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';

// https://astro.build/config
export default defineConfig({
	trailingSlash: 'never',
	integrations: [
		starlight({
			title: 'Shi-Xiong Wang',
			favicon: '/favicon-32x32.png',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/shwangcmt/shixiongwang.com' }],
			head: [
				// Add to home screen icons
				{ tag: 'link', attrs: { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' } },
				{ tag: 'link', attrs: { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' } },
				{ tag: 'link', attrs: { rel: 'icon', type: 'image/png', sizes: '64x64', href: '/favicon-64x64.png' } },
				{ tag: 'link', attrs: { rel: 'manifest', href: '/site.webmanifest' } },
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
							slug: 'research/jordan-wigner'
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
				// Fonts - Optimized using Variable Fonts (Reduces HTTP requests)
				'@fontsource-variable/source-serif-4/wght.css',
				'@fontsource-variable/source-serif-4/wght-italic.css',
				'@fontsource-variable/source-sans-3/wght.css',
				// Custom Styles
				'./src/styles/custom.css',
			],
		}),
	],
	markdown: {
		remarkPlugins: [remarkMath],
		rehypePlugins: [rehypeMathjax],
	},
});
