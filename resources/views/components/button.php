<a href="<?= esc_url($href); ?>" class="" <?php if (esc_attr($hasTargetBlank)) : ?>target="_blank" <?php endif; ?>>
    <?= esc_html($text); ?>
</a>