<?php

namespace App\Components;

use App\Component;

class Button extends Component
{
    /**
     * The button array
     */

    protected $href;

    protected $text;

    protected $hasTargetBlank;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct(
        $href = "",
        $text = "",
        $hasTargetBlank = false,
    ) {
        $this->href = $href;
        $this->text = $text;
        $this->hasTargetBlank = $hasTargetBlank;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        return $this->renderView('button');
    }
}
