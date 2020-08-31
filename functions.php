<?php
  require_once "customizer.php";
  require_once "linkedevents.php";
  require_once "tree-menu.php";
  add_action('after_setup_theme', function() { 
    add_theme_support('post-thumbnails');
    register_nav_menus([
      'topmenu' => __('Top Navigation', "mantyharju"),
      'main' => __('Main Navigation', "mantyharju"),
      'locale' => __('Localization menu', "mantyharju")
    ]);
  });
?>