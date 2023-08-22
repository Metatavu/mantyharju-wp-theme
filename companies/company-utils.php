<?php
  namespace Company\Utils; 
  
  function build_child_links($parent_page_id, $page_id = null) {
    // Get all child company pages of the current category
    $child_pages = get_children(array(
      'post_parent' => $parent_page_id,
      'post_type' => 'page',
      'post_status' => 'publish'
    ));

    // Prepare an array to store links
    $links = array();

    // Build links array
    foreach ($child_pages as $child_page) {
        $links[$child_page->post_title] = get_permalink($child_page->ID);
    }

    if (!empty($page_id)) {
      // Add the link to the current company page
      $links[$post->post_title] = get_permalink($page_id);
    }

    // Sort the links array alphabetically by link text
    ksort($links);

    // Prepare the HTML for the links
    $links_html = '';
    foreach ($links as $link_text => $link_url) {
        $links_html .= '<a href="' . $link_url . '">' . esc_html($link_text) . '</a><br>';
    }

    return $links_html;
  }

  const COMPANIES_PAGE = 'sivut/tyo-yrittaminen/yrityspalvelut/yritykset/';
?>