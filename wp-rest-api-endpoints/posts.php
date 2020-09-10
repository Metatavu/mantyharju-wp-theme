<?php

function register_posts_endpoint() {
  register_rest_route('wp/v2', '/customPosts', array(
    'methods' => 'GET',
    'callback' => function (WP_REST_Request $request) {
      $category = get_category_by_slug($request->get_param('category'));
      $args = array(
        'post_type' => 'post',
        'numberposts' => -1,
        'category' => $category ? $category->cat_ID : 0
      );
      $posts = get_posts($args);
      $posts = array_map('map_additional_post_properties', $posts);
      return $posts;
    }
  ));
}
add_action('rest_api_init', 'register_posts_endpoint');

function map_additional_post_properties($post) {
  $post->categories = wp_get_post_categories($post->ID);
  $post->featured_image_url = get_the_post_thumbnail_url($post);
  $post->link = get_permalink($post) ? get_permalink($post) : "";
  return $post;
}

?>