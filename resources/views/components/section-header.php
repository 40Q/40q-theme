<?php

use App\Components\Heading;

$headingComponent = new Heading(
    heading: $heading['heading'] ?? '',
    isH1: $heading['isH1'] ?? false,
	headingSize: $heading['headingSize'] ?? null,
);

$textSizes = [
    's' => 'lg:text-sm text-xs',
    'm' => 'lg:text-base text-xs',
	'base' => 'text-base',
];

$styles = [
    'container' => 'flex flex-col gap-4 relative fas-section-header',
    'eyebrow' => 'font-sans font-extrabold text-neutral-600 dark:text-neutral-200 text-xs lg:text-sm uppercase',
    'text' => 'font-sans text-neutral-600 dark:text-white font-normal ' . $textSizes[$textSize],
];

?>
<?php if (($showEyebrow && !empty($eyebrow)) || ($showTitle && !empty($heading['heading'])) || ($showText && !empty($text))): ?>
    <div class="<?= $centerText ? 'lg:text-center lg:mx-auto' : 'text-left'; ?> <?= $narrow ? 'lg:w-[85%]' : 'lg:w-full'; ?> <?= esc_attr($styles['container']); ?>">
        <?php if ($showEyebrow && !empty($eyebrow)): ?>
            <p class="<?= esc_attr($styles['eyebrow']); ?>"><?= esc_html($eyebrow); ?></p>
        <?php endif; ?>

        <?php if ($showTitle && !empty($heading['heading'])): ?>
            <?php $headingComponent->render(); ?>
        <?php endif; ?>

        <?php if ($showText && !empty($text)): ?>
            <div class="<?= esc_attr($styles['text']); ?>"><?= wp_kses_post($text); ?></div>
        <?php endif; ?>
    </div>
<?php endif; ?>
