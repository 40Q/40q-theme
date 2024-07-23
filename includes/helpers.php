<?php

/**
 * Theme specific helpers.
 *
 * @package By40QTheme
 */

namespace By40QTheme;

/**
 * Get an initialized class by its full class name, including namespace.
 *
 * @param string $class_name The class name including the namespace.
 *
 * @return false|Module
 */
function get_module($class_name)
{
	return \By40QTheme\ModuleInitialization::instance()->get_class($class_name);
}
