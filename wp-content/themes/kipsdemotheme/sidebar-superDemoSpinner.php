<?php
/**
 * The super demo spinner Sidebar Widget Dynamic Text
 */


if ( ! is_active_sidebar( 'sidebar-2' ) ) {
	return;
}
?>
<div id="superDemoSpinner-sidebar" class="superDemoSpinner-sidebar widget-area" role="complementary">
	<?php dynamic_sidebar( 'sidebar-2' ); ?>
</div><!-- #content-sidebar -->