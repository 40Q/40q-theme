<?php

/**
 * Gutenberg Blocks setup
 *
 * @package By40QTheme
 */

namespace By40QTheme\BlocksRegister;

use BlockHandler\Factories\BlockHandlerFactory as BlockHandler;
use \WP_Block_Type_Registry;

/**
 * Set up blocks
 *
 * @return void
 */
function setup()
{
	$n = function ($function) {
		return __NAMESPACE__ . "\\$function";
	};

	add_filter('render_block', $n('render_block'), 10, 2);

	add_filter('block_categories_all', $n('register_custom_category'));

	add_filter('allowed_block_types_all', $n('disallow_blocks'));
}

function render_block($block_content, $block)
{
	if (!$block) return;
	$factory = new BlockHandler(BY40Q_THEME_PATH . 'app/Blocks', BY40Q_THEME_DIST_PATH);

	$blockName = $block['blockName'];
	$handlerClass = $factory->getHandler($blockName);

	$blockNameWithoutPrefix = explode('/', $blockName)[1];

	try {
		if ($handlerClass) {
			$handlerInstance = new $handlerClass();
			$attributes = $handlerInstance($block_content, $block);
			extract($attributes);

			ob_start();
			include BY40Q_THEME_BLOCK_DIR . $blockNameWithoutPrefix . '.php';
			return ob_get_clean();
		}
	} catch (\Exception $e) {
		error_log($e->getMessage());
		return $block_content;
	}

	return $block_content;
}

function register_custom_category($categories)
{
	$custom_categories = [
		[
			'slug'  => '40q',
			'title' => '40Q Blocks'
		],
	];

	return array_merge($custom_categories, $categories);
}

function disallow_blocks($allowed_blocks)
{
	$allowed_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();

	$blocks_to_unset = [
		'core/buttons',
		'core/button',
	];

	foreach ($blocks_to_unset as $block_name) {
		unset($allowed_blocks[$block_name]);
	}

	$by40qBlocksFactory = new BlockHandler(BY40Q_THEME_PATH . 'app/Blocks', BY40Q_THEME_DIST_PATH);
	$by40qBlocks = $by40qBlocksFactory->getBlocks();

	return array_keys(array_merge($allowed_blocks, $by40qBlocks));
}
