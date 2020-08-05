<?php
  require_once "customizer.php";
  add_action('after_setup_theme', function() { 
    add_theme_support('post-thumbnails');
    register_nav_menus([
      'main' => __('Main Navigation', "mantyharju"),
      'locale' => __('Localization menu', "mantyharju"),
      'site' => __('Site Navigation', "mantyharju"),
      'quick' => __('Quick Links', "mantyharju"),
      'footer' => __('Footer Navigation', "mantyharju")
    ]);
  });
?>