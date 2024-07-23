<?php

namespace App;

class Component
{
    protected function renderView($template)
    {
        ob_start();
        extract(get_object_vars($this));
        include BY40Q_THEME_COMPONENTS_DIR . $template . '.php';
        echo ob_get_clean();
        return;
    }
}
