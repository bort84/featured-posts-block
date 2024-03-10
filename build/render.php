<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<?php $args = array(
	'post_type' => 'post',
	'posts_per_page' => $attributes['numberOfPosts']
);

$posts = new WP_Query( $args );

if ( $posts->have_posts() ) : ?>

	<section <?php echo get_block_wrapper_attributes(); ?>>
		<?php while ( $posts->have_posts() ) : $posts->the_post();
		$cat_array = get_the_terms( get_the_ID(), 'category' ); ?>

		<article>
			<?php if ($attributes['showFeaturedImage'] === true) {?>
				<figure>
					<?php echo get_the_post_thumbnail( get_the_ID(), 'thumbnail' ); ?>
				</figure>
			<?php } ?>

			<div>
				<?php if ($attributes['showCategory'] === true) {?>
					<span><?php echo $cat_array[0]->name; ?></span>
				<?php } ?>
				<h2><a href="<?php echo get_the_permalink(); ?>"><?php echo get_the_title(); ?></a></h2>
			</div>
		</article>
		<?php endwhile; ?>
	</section>

<?php else: ?>
  	<div>No posts to display</div>
<?php endif; wp_reset_postdata(); ?>