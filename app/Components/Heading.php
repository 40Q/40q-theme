<?php

namespace App\Components;

use App\Component;

class Heading extends Component
{
    protected $heading;
    protected $isH1;
    protected $headingSize;

    public function __construct($heading, $isH1, $headingSize)
    {
        $this->heading = $heading;
        $this->isH1 = $isH1;
        $this->headingSize = $headingSize;
    }

    public function render()
    {
        return $this->renderView('heading');
    }
}
