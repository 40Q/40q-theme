<?php
/**
 * Filters for the 40Q Theme
 *
  * @package By40QTheme\Filters
 */

if (!function_exists('wp_body_open')) {
	/**
	 * Fire the wp_body_open action.
	 *
	 * Added for backwards compatibility to support versions of WordPress prior to 5.2.0.
	 */
	function wp_body_open()
	{
		do_action('wp_body_open');
	}
}
