<?php
get_header();

$page_slug = '404-page';

$args = array(
    'name'        => $page_slug,
    'post_type'   => 'page',
    'post_status' => 'publish',
    'numberposts' => 1
);

$custom_404_query = new WP_Query($args);

if ($custom_404_query->have_posts()) {
    while ($custom_404_query->have_posts()) {
        $custom_404_query->the_post();
?>
        <div class="custom-404-page">
            <div><?php the_content(); ?></div>
        </div>
    <?php
    }
    wp_reset_postdata();
} else {
    ?>
    <h2><?php esc_html_e('Page Not Found', '40q-theme'); ?></h2>
    <p><?php esc_html_e('It looks like nothing was found at this location.', '40q-theme'); ?></p>
<?php
}

get_footer();
