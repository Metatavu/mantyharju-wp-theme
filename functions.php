<?php
  add_action('after_setup_theme', function() { 
    add_theme_support('post-thumbnails');
    register_nav_menus([
      'topmenu' => __('Top Navigation', "mantyharju"),
      'main' => __('Main Navigation', "mantyharju"),
      'locale' => __('Localization menu', "mantyharju")
    ]);
  });

  require_once(__DIR__ . "/wp-rest-api-endpoints/pages.php");
  require_once(__DIR__ . "/wp-rest-api-endpoints/customizer.php");
  require_once(__DIR__ . "/wp-rest-api-endpoints/tree-menu.php");
  require_once(__DIR__ . "/wp-rest-api-endpoints/post-thumbnail.php");
  require_once(__DIR__ . "/wp-rest-api-endpoints/posts.php");
  require_once(__DIR__ . "/vendor/autoload.php");
  require_once(__DIR__ . "/linkedevents/event-rest-handler.php");
  require_once(__DIR__ . "/companies/companies.php");

  function create_ACF_meta_in_REST() {
    $postypes_to_exclude = ['acf-field-group','acf-field'];
    $extra_postypes_to_include = ["page"];
    $post_types = array_diff(get_post_types(["_builtin" => false], 'names'),$postypes_to_exclude);

    array_push($post_types, $extra_postypes_to_include);

    foreach ($post_types as $post_type) {
        register_rest_field( $post_type, 'ACF', [
            'get_callback'    => 'expose_ACF_fields',
            'schema'          => null,
        ]
      );
    }
  }

function expose_ACF_fields( $object ) {
    $ID = $object['id'];
    return get_fields($ID);
}

add_action( 'rest_api_init', 'create_ACF_meta_in_REST' );

  add_filter("sptv_service_location_service_channel_components", function ($templates) {
    $templates[] = [
      "slug" => "accessibility",
      "name" => __("Esteettömyystiedot", "sptv")
    ];
    
    return $templates;
  });
?>