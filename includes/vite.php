<?php
/**
 * Acorn-free Vite manifest + dev-server helper.
 *
 * Reads laravel-vite-plugin's output directly (no Roots\Acorn / Vite facade):
 *  - prod: public/build/manifest.json (Vite manifest: src => { file, css }).
 *  - dev:  public/build/hot (contains the dev-server origin) + @vite/client.
 *
 * @package By40QTheme\Vite
 */

namespace By40QTheme\Vite;

const HOT      = 'public/hot';
const OUT_DIR  = 'public/build/';
const MANIFEST = 'public/build/manifest.json';

function is_dev(): bool {
	return file_exists(BY40Q_THEME_PATH . HOT);
}

function dev_origin(): string {
	return rtrim(file_get_contents(BY40Q_THEME_PATH . HOT), " \n\r\t");
}

function manifest(): array {
	static $m = null;
	if ($m === null) {
		$path = BY40Q_THEME_PATH . MANIFEST;
		$m = file_exists($path) ? (json_decode(file_get_contents($path), true) ?: []) : [];
	}
	return $m;
}

/** Built URL for a manifest source key (e.g. 'resources/images/x.svg'). '' if unknown. */
function asset(string $src): string {
	if (is_dev()) {
		return dev_origin() . '/' . ltrim($src, '/');
	}
	$m = manifest();
	if (empty($m[$src]['file'])) {
		return '';
	}
	return get_template_directory_uri() . '/' . OUT_DIR . $m[$src]['file'];
}

/** Print the Vite HMR client once (dev only). */
function print_client(): void {
	static $done = false;
	if ($done) {
		return;
	}
	$done = true;
	echo '<script type="module" src="' . esc_url(dev_origin() . '/@vite/client') . '"></script>' . "\n";
}

/** Tag our enqueued JS as ES modules (Vite output is ESM). */
function module_tag($tag, $handle, $src) {
	// Every script we enqueue (handle prefix `by40q-vite-`) is ESM. In prod
	// only JS entries reach this filter (CSS entries are wp_enqueue_style'd);
	// in dev the source URLs end in .ts/.css, so match on the handle, not the
	// extension.
	if (strpos($handle, 'by40q-vite-') === 0) {
		return '<script type="module" src="' . esc_url($src) . '"></script>' . "\n";
	}
	return $tag;
}
add_filter('script_loader_tag', __NAMESPACE__ . '\\module_tag', 10, 3);

/**
 * Enqueue a build entry (JS or CSS) plus any CSS a JS entry imports.
 *
 * @param string $src  Manifest source key, e.g. 'resources/scripts/app.ts'.
 * @param array  $deps Script/style dependency handles.
 */
function enqueue_entry(string $src, array $deps = []): void {
	$handle = 'by40q-vite-' . sanitize_key(str_replace(['/', '.'], '-', $src));

	if (is_dev()) {
		add_action('wp_head', __NAMESPACE__ . '\\print_client', 1);
		add_action('admin_print_scripts', __NAMESPACE__ . '\\print_client', 1);
		$url = dev_origin() . '/' . ltrim($src, '/');
		if (substr($src, -4) === '.css') {
			wp_enqueue_script($handle, $url, $deps, null, true); // Vite injects CSS via the JS client in dev.
		} else {
			wp_enqueue_script($handle, $url, $deps, null, true);
		}
		return;
	}

	$m = manifest();
	if (empty($m[$src])) {
		return;
	}
	$chunk    = $m[$src];
	$base_url = get_template_directory_uri() . '/' . OUT_DIR;

	// A CSS entry: enqueue the stylesheet.
	if (!empty($chunk['file']) && substr($chunk['file'], -4) === '.css') {
		wp_enqueue_style($handle, $base_url . $chunk['file'], $deps, null);
	}

	// A JS entry: enqueue the script + any CSS it imports.
	if (!empty($chunk['file']) && substr($chunk['file'], -3) === '.js') {
		wp_enqueue_script($handle, $base_url . $chunk['file'], $deps, null, true);
	}
	foreach (($chunk['css'] ?? []) as $i => $css) {
		wp_enqueue_style($handle . '-css-' . $i, $base_url . $css, [], null);
	}
}

/** Editor @wordpress/* dependency handles emitted by @roots/vite-plugin. */
function editor_dependencies(): array {
	$m = manifest();
	$rel = $m['editor.deps.json']['file'] ?? null;
	if (!$rel) {
		return [];
	}
	$path = BY40Q_THEME_PATH . OUT_DIR . $rel;
	if (!file_exists($path)) {
		return [];
	}
	$deps = json_decode(file_get_contents($path), true);
	return is_array($deps) ? $deps : [];
}
