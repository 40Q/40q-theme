import { defineConfig } from 'vite'
import fs from 'node:fs'
import { globSync } from 'node:fs'
import tailwindcss from '@tailwindcss/vite'
import laravel from 'laravel-vite-plugin'
import { wordpressPlugin, wordpressThemeJson } from '@roots/vite-plugin'

// laravel-vite-plugin expects APP_URL (mirrors Sage's fallback).
if (!process.env.APP_URL) {
  process.env.APP_URL = 'http://example.test'
}

/**
 * `wordpressThemeJson()` emits the generated theme.json under
 * `public/build/assets/`. WordPress (Acorn-free) reads theme.json from the
 * theme root, so copy it there after the build.
 */
function copyThemeJsonToRoot() {
  return {
    name: 'by40q-copy-theme-json-to-root',
    apply: 'build',
    closeBundle() {
      const src = 'public/build/assets/theme.json'
      if (fs.existsSync(src)) fs.copyFileSync(src, 'theme.json')
    },
  }
}

// Per-block/component frontend scripts (theme convention; empty by default).
const blockEntries = [
  ...globSync('resources/scripts/frontend/blocks/*.{js,jsx}'),
  ...globSync('resources/scripts/frontend/components/*.{js,jsx}'),
]

export default defineConfig({
  base: '/wp-content/themes/40q-theme/public/build/',
  plugins: [
    tailwindcss(),
    laravel({
      input: [
        'resources/styles/app.css',
        'resources/scripts/app.js',
        'resources/styles/editor.css',
        'resources/scripts/editor.js',
        ...blockEntries,
      ],
      refresh: true,
      assets: ['resources/images/**', 'resources/fonts/**'],
    }),
    wordpressPlugin(),
    // Expose Tailwind tokens (colors/fonts/sizes/radius) to theme.json / the
    // editor, like Sage. Project design-system tokens are expected to override
    // the Tailwind defaults.
    wordpressThemeJson({
      disableTailwindColors: false,
      disableTailwindFonts: false,
      disableTailwindFontSizes: false,
      disableTailwindBorderRadius: false,
    }),
    copyThemeJsonToRoot(),
  ],
  resolve: {
    alias: {
      '@scripts': '/resources/scripts',
      '@styles': '/resources/styles',
      '@images': '/resources/images',
      '@fonts': '/resources/fonts',
    },
  },
})
