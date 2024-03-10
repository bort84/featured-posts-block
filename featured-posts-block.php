<?php
/**
 * Plugin Name:       Featured Posts Block
 * Description:       Show a set number of posts to feature
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.1
 * Author:            John Balnaves
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       featured-posts-block
 *
 * @package           featured-posts-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function featured_posts_block_featured_posts_block_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'featured_posts_block_featured_posts_block_block_init' );
