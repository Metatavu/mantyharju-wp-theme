<?php

function register_tree_menu_endpoint() {
    register_rest_route( 'wp/v2', '/treeMenu', array(
      'methods' => 'GET',
      'callback' => function (WP_REST_Request $request) {
        $slug = $request->get_param('slug');
        $page = page_by_slug($slug);
        $mainPage = get_main_page($page);
        $initial_open_nodes = get_initial_open_nodes($page);
        $treeData = build_tree($mainPage, $page);
        return array(
          'treeData' => $treeData,
          'initialOpenNodes' => $initial_open_nodes
        );
      },
    ));
  }
  add_action('rest_api_init', 'register_tree_menu_endpoint');

  function page_by_slug($slug) {
    $pages = get_posts(
      array(
        'name' => $slug,
        'post_type' => 'page'
      )
    );
    if (count($pages) === 0) {
      return;
    }
    return $pages[0];
  }

  function get_main_page($page) {
    $ancestors = get_post_ancestors($page);
    $length = count($ancestors);
    if ($length === 1) {
      return $page;
    }
    if ($length > 1) {
      return get_post($ancestors[count($ancestors) - 2]);
    }
    return page_by_slug("sivut"); 
  }

  function get_initial_open_nodes($page) {
    $initial_open_nodes = array("$page->ID");
    $current = $page;
    while (wp_get_post_parent_id(wp_get_post_parent_id(wp_get_post_parent_id($current)))) {
      $parentId = wp_get_post_parent_id($current);
      $current = get_post($parentId);
      $id = "$current->ID";
      if (wp_get_post_parent_id($current)) {
        for ($i = 0; $i < count($initial_open_nodes); $i++) {
          $initial_open_nodes[$i] = "$id/" . $initial_open_nodes[$i];
        }
        array_unshift($initial_open_nodes, $id);
      }
    }
    return $initial_open_nodes;
  }

  function build_tree($mainPage, $page) {
    $all_pages = get_pages(array('child_of' => $mainPage->ID));
    return build_tree_layer($mainPage->ID, $page->ID, $all_pages);
  }

  function build_tree_layer($parentId, $currentPageId, $all_pages) {
    $tree_nodes = array();
    foreach($all_pages as $page) {
      if ($page->post_parent === $parentId) {
        array_push(
          $tree_nodes,
          array(
            'key' => $page->ID,
            'menu_order' => $page->menu_order,
            'post_status' => get_post_status($page->ID),
            'label' => $page->post_title,
            'link' => get_page_link($page->ID),
            'current' => $page->ID === $currentPageId,
            'nodes' => build_tree_layer($page->ID, $currentPageId, $all_pages)
          )
        );
      }
    }
    usort($tree_nodes, function($a, $b) {
      return $a['menu_order'] > $b['menu_order'];
    });
    return $tree_nodes;
  }

?>