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

  function update_company_menu_order($category_term_id) {
    global $wpdb;

    // Run the SQL query to update menu_order for all company posts in a specific category
    $query = "
        UPDATE {$wpdb->posts} p
        JOIN {$wpdb->term_relationships} tr ON p.ID = tr.object_id
        SET p.menu_order = @menu_order := @menu_order + 1
        WHERE p.post_type = 'company'
        AND tr.term_taxonomy_id = %d
        ORDER BY p.post_title ASC;
    ";

    // Run the query with the category term ID as a parameter
    $wpdb->query($wpdb->prepare($query, $category_term_id));
  }

?>