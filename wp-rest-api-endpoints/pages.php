<?php

function register_pages_endpoint() {
  register_rest_route('wp/v2', '/customPages', array(
    'methods' => 'GET',
    'callback' => function (WP_REST_Request $request) {
      $parentSlug = $request->get_param('parent_slug');
      if ($parentSlug) {
        $parentPage = get_parent_page($parentSlug);
        if ($parentPage) {
          $pages = get_wp_page_children($parentPage->ID);
          $pages = array_map('map_additional_page_properties', $pages);
          return $pages;
        } else {
          return [];
        }
      }
    }
  ));
}
add_action('rest_api_init', 'register_pages_endpoint');

function get_parent_page($slug) {
  if ($slug) {
    $posts = get_posts(
      array(
        'name' => $slug,
        'post_type' => 'page'
      )
    );

    if (count($posts) > 0) {
      return $posts[0];
    }
  }

  return null;
}

function get_wp_page_children($parentId) {
  return get_pages(
    array(
      'child_of' => $parentId
    )
  );
}

function map_additional_page_properties($page) {
  $page->featured_image_url = "" . get_the_post_thumbnail_url($page);
  $page->link = "" . get_permalink($page);
  return $page;
}

?>