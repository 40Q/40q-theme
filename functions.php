<?php

/**
 * WP Theme constants and setup functions
 *
 * @package By40QTheme
 */

// Useful global constants.
define('BY40Q_THEME_VERSION', '0.1.0');
define('BY40Q_THEME_TEMPLATE_URL', get_template_directory_uri());
define('BY40Q_THEME_PATH', get_template_directory() . '/');
define('BY40Q_THEME_DIST_PATH', BY40Q_THEME_PATH . 'public/');
define('BY40Q_THEME_DIST_URL', BY40Q_THEME_TEMPLATE_URL . '/public/');
define('BY40Q_THEME_INC', BY40Q_THEME_PATH . 'includes/');
define('BY40Q_THEME_BLOCK_DIR', BY40Q_THEME_PATH . 'resources/views/blocks/');
define('BY40Q_THEME_COMPONENTS_DIR', BY40Q_THEME_PATH . 'resources/views/components/');
define('BY40Q_THEME_BLOCK_DIST_DIR', BY40Q_THEME_PATH . 'dist/blocks/');

$is_local_env = in_array(wp_get_environment_type(), ['local', 'development'], true);
$is_local_url = strpos(home_url(), '.test') || strpos(home_url(), '.local');
$is_local     = $is_local_env || $is_local_url;

require_once BY40Q_THEME_INC . 'core.php';
require_once BY40Q_THEME_INC . 'overrides.php';
require_once BY40Q_THEME_INC . 'template-tags.php';
require_once BY40Q_THEME_INC . 'filters.php';
require_once BY40Q_THEME_INC . 'utility.php';
require_once BY40Q_THEME_INC . 'blocks-register.php';
require_once BY40Q_THEME_INC . 'helpers.php';
require_once BY40Q_THEME_INC . 'acf.php';
require_once BY40Q_THEME_INC . 'acf-filters.php';

// Run the setup functions.
By40QTheme\Core\setup();
By40QTheme\BlocksRegister\setup();

// Require Composer autoloader if it exists.
if (file_exists(__DIR__ . '/vendor/autoload.php')) {
	require_once __DIR__ . '/vendor/autoload.php';
}
