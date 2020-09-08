<?php

function register_posts_endpoint() {
  register_rest_route('wp/v2', '/customPosts', array(
    'methods' => 'GET',
    'callback' => function (WP_REST_Request $request) {
      $posts = get_wp_posts();
      $posts = array_map('map_additional_post_properties', $posts);
      return $posts;
    }
  ));
}
add_action('rest_api_init', 'register_posts_endpoint');

function get_wp_posts() {
  return get_posts(
    array(
      'post_type' => 'post'
    )
  );
}

function map_additional_post_properties($post) {
  $post->link = "" . get_permalink($post);
  $post->categories = wp_get_post_categories($post->ID);
  return $post;
}

?>