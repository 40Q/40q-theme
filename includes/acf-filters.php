<?php

/**
 * Custom ACF location rules for menus
 */

add_filter('acf/location/rule_match/menu_depth', 'acf_location_rule_match_user', 10, 4);
function acf_location_rule_match_user($match, $rule, $options, $field_group)
{
	global $current_screen;
	if (isset($current_screen->id) && $current_screen->id == 'nav-menus' && isset($options['nav_menu_item_depth'])) {
		if ($rule ['operator'] == "==") {
			$match = ($options['nav_menu_item_depth'] == $rule['value']);
		}
	}
	return $match;
	return $match;
}
