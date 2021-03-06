<?php

function register_post_thumbnail_endpoint() {
  register_rest_route('wp/v2', '/postThumbnail', array(
    'methods' => 'GET',
    'callback' => function (WP_REST_Request $request) {
      $id = $request->get_param('id');
      $slug = $request->get_param('slug');
      $post = get_wp_post($id, $slug)[0];
      $postThumbnail = get_the_post_thumbnail_url($post);
      if (!$postThumbnail) {
          return;
      }
      return $postThumbnail;
    }
  ));
}
add_action('rest_api_init', 'register_post_thumbnail_endpoint');

function get_wp_post($id, $slug) {
  if ($id) {
    return get_posts(
      array(
        'p' => $id,
        'post_type' => 'any'
      )
    );
  }
  if ($slug) {
    return get_posts(
      array(
        'name' => $slug,
        'post_type' => 'any'
      )
    );
  }
}

?>