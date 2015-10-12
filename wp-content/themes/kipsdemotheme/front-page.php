<?php
/**
 * The template for displaying the home page
 */
get_header();
?>

<div id="main-content" class="main-content">

    <?php
    if (is_front_page() && twentyfourteen_has_featured_posts()) {
        // Include the featured content template.
        get_template_part('featured-content');
    }
    ?>
    <div id="primary" class="content-area">
        <div id="content" class="site-content" role="main">

            <?php //this part should be a template part probably when I am through ?>

            <?php
            wp_register_script('Kinetic', get_template_directory_uri() . '/js/kinetic-v5.0.1.min.js', array(), '5.0.1', true);
            wp_enqueue_script('superDemoSpinner', get_template_directory_uri() . '/js/superDemoSpinner.js', array('Kinetic'), '1.0.2', true);
            ?>
            <div class="superDemoSpinner-container">  
                <div id="superDemoSpinner" class="superDemoSpinner-canvases">
                </div>

                <?php get_sidebar('superDemoSpinner'); ?>
            </div>  

        </div><!-- #content -->
    </div><!-- #primary -->

</div><!-- #main-content -->

<?php
get_footer();
