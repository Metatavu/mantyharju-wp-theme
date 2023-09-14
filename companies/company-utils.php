<?php
  namespace Company\Utils; 
  
  function build_child_links($parent_page_id, $page_id = null) {
    $child_pages = get_children(array(
      'post_parent' => $parent_page_id,
      'post_type' => 'page',
      'post_status' => 'publish'
    ));

    $links = array();

    foreach ($child_pages as $child_page) {
        $links[$child_page->post_title] = get_permalink($child_page->ID);
    }

    if (!empty($page_id)) {
      $links[$post->post_title] = get_permalink($page_id);
    }

    ksort($links);

    $links_html = '';
    foreach ($links as $link_text => $link_url) {
        $links_html .= '<a href="' . $link_url . '">' . esc_html($link_text) . '</a><br>';
    }

    return $links_html;
  }

  const COMPANIES_DISPLAY_PAGE = 'sivut/tyo-yrittaminen/yrityspalvelut/yritykset/';
  const COMPANIES_PARENT_PAGE  = 'yritys-kategoriat/';
  const COMPANIES_DISPLAY_PAGE_TEXT = 'Tervetuloa Mäntyharjun kunnan hallinnoimaan yritysluetteloon, josta löydät paikalliset toimijat toimialoittain.';
?>