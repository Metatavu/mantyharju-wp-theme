<?php
  add_action('after_setup_theme', function() { 
    add_theme_support('post-thumbnails');
    register_nav_menus([
      'topmenu' => __('Top Navigation', "mantyharju"),
      'main' => __('Main Navigation', "mantyharju"),
      'locale' => __('Localization menu', "mantyharju")
    ]);
  });

  require_once(__DIR__ . "/wp-rest-api-endpoints/customizer.php");
  require_once(__DIR__ . "/wp-rest-api-endpoints/tree-menu.php");
  require_once(__DIR__ . "/wp-rest-api-endpoints/post-thumbnail.php");
  require_once(__DIR__ . "/wp-rest-api-endpoints/linkedevents.php");
?>