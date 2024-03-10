/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { 
	useBlockProps, 
	InspectorControls
} from '@wordpress/block-editor';

/**
 * Additional imports
 */

import {
	PanelBody,
	PanelRow,
	ToggleControl,
	__experimentalNumberControl as NumberControl,
	Spinner
} from '@wordpress/components';

import { 
	useSelect 
} from '@wordpress/data';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {

	const blockProps = useBlockProps();

	const { showFeaturedImage, showCategory, numberOfPosts } = attributes;

	const posts = useSelect( ( select ) => {
		
        return select('core').getEntityRecords('postType', 'post', {
            per_page: numberOfPosts,
            _embed: true
        });
    } );

	function PostsList ( { posts } ) {

		if (!posts) {
			return <Spinner />;
		}
		
		return (
			posts.map( ( post ) => (
				<article key={ post.id }>
					{ showFeaturedImage && ( 
						<figure><img src={ post._embedded['wp:featuredmedia'][0]['media_details']['sizes']['thumbnail'].source_url } alt={ post._embedded['wp:featuredmedia'][0].title.rendered } /></figure>
					) }
					<div>
						{ showCategory && ( 
							<span class="category">{post._embedded['wp:term'][0][0].name}</span>
						)}
						<h2><a href={ post.link }>{ post.title.rendered }</a></h2>
					</div>
				</article>
			) )
		);
	};

	return (
		<>
            <InspectorControls>
                <PanelBody title={ __( 'Settings', 'featured-posts-block' ) }>
                    <PanelRow>
						<fieldset>
                            <ToggleControl
                                label={ __(
                                    'Show Featured Images',
                                    'featured-posts-block'
                                ) }
                                checked={ showFeaturedImage }
								onChange={ () =>
                                    setAttributes( { showFeaturedImage: ! showFeaturedImage } )
                                }
                            />
                        </fieldset>
					</PanelRow>

                    <PanelRow>
						<fieldset>
                            <ToggleControl
                                checked={ !! showCategory }
                                label={ __(
                                    'Show Categories',
                                    'featured-posts-block'
                                ) }
                                onChange={ () =>
                                    setAttributes( { showCategory: ! showCategory } )
                                }
                            />
                        </fieldset>
					</PanelRow>

                    <PanelRow>
						<fieldset>
							<NumberControl
								isShiftStepEnabled={ true }
								shiftStep={ 1 }
								min={1}
								value={ numberOfPosts }
								onChange={ ( value ) => 
									setAttributes( { numberOfPosts: parseInt(value) } ) 
								}
							/>
                        </fieldset>
					</PanelRow>
                </PanelBody>
            </InspectorControls>

            <div { ...blockProps }>
            	<PostsList posts={posts} />
            </div>
        </>
	);
}