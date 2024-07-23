<?php

/**
 * Advance custom fields settings
 */

namespace App;

// Exit if accessed directly.
defined('ABSPATH') || exit;

use StoutLogic\AcfBuilder\FieldsBuilder;

class AcfFieldManager
{
	public function __construct()
	{
		add_action('acf/init', [$this, 'registerFields'], 2);
		add_action('acf/init', [$this, 'registerOptionsPages'], 2);
	}

	public function registerFields()
	{
		$fields = glob(BY40Q_THEME_PATH . 'app/Fields/*.php', GLOB_BRACE);

		foreach ($fields as $field) {
			$registered_fields = require_once $field;
			if ($registered_fields instanceof FieldsBuilder) {
				acf_add_local_field_group($registered_fields->build());
			}
		}
	}

	public function registerOptionsPages()
	{
		if (!function_exists('acf_add_options_page')) {
			return;
		}

		acf_add_options_page([
			'page_title' => 'Global Settings',
			'menu_title' => 'Global Settings',
			'menu_slug' => 'global-settings',
			'capability' => 'edit_posts',
			'redirect' => false,
			'position' => 2,
			'icon_url' => 'dashicons-admin-generic',
			'autoload' => true,
		]);
	}
}

new \App\AcfFieldManager();
