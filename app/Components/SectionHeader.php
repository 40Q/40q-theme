<?php

namespace App\View\Components;

use App\Component;

class SectionHeader extends Component
{
    public $showEyebrow;
    public $eyebrow;
    public $showHeading;
    public $heading;
    public $showText;
    public $text;
    public $isH1;
    public $textAlign;

    public function __construct(
        $data = [],
        $showEyebrow = null,
        $eyebrow = null,
        $showHeading = null,
        $heading = null,
        $showText = null,
        $text = null,
        $isH1 = null,
        $textAlign = null
    ) {

        $this->showEyebrow = $showEyebrow ?? $data['showEyebrow'] ?? false;
        $this->eyebrow = $eyebrow ?? $data['eyebrow'] ?? '';
        $this->showHeading = $showHeading ?? $data['showHeading'] ?? false;
        $this->heading = $heading ?? $data['heading'] ?? [];
        $this->showText = $showText ?? $data['showText'] ?? false;
        $this->text = $text ?? $data['text'] ?? '';
        $this->isH1 = $isH1 ?? $data['isH1'] ?? false;
        $this->textAlign = $textAlign ?? $data['textAlign'] ?? 'left';
    }

    public function render()
    {
        return $this->renderView('section-header');
    }
}
