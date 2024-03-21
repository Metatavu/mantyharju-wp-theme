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
      $post = get_post($page_id);
      $links[$post->post_title] = get_permalink($page_id);
    }

    ksort($links);

    $links_html = '';
    foreach ($links as $link_text => $link_url) {
        $links_html .= '<a href="' . $link_url . '">' . esc_html($link_text) . '</a><br>';
    }

    return $links_html;
  }

  /**
   * Build company category list page contents
   * 
   * @return string page contents
   */
  function build_company_category_list_page_contents() {
    $categories_page = get_page_by_path(\Company\Utils\COMPANIES_PARENT_PAGE);
    $category_pages = get_children(array(
      'post_parent' => $categories_page->ID,
      'post_type' => 'page',
      'post_status' => 'publish'
    ));

    $links = array();

    foreach ($category_pages as $category_page) {
        $links[$category_page->post_title] = get_permalink($category_page->ID);
    }

    ksort($links);

    $links_html = '';
    foreach ($links as $link_text => $link_url) {
        $links_html .= '<a href="' . $link_url . '">' . esc_html($link_text) . '</a><br>';
    }

    return '<p>' . \Company\Utils\COMPANIES_DISPLAY_PAGE_TEXT . '</p><br/>' . $links_html; 
  }

  /**
   * Build company category page contents
   * 
   * @param WP_Term $term company category term
   * @param int $category_page_id company category page id
   * @return string page contents
   */
  function build_company_category_page_contents($term, $category_page_id) {
    $child_pages = get_children(array(
      'post_parent' => $category_page_id,
      'post_type' => 'page',
      'post_status' => 'publish'
    ));

    $links = array();

    foreach ($child_pages as $child_page) {
        $links[$child_page->post_title] = get_permalink($child_page->ID);
    }

    ksort($links);

    $links_html = '';
    foreach ($links as $link_text => $link_url) {
        $links_html .= '<a href="' . $link_url . '">' . esc_html($link_text) . '</a><br>';
    }

    return '<p>' . $term->description . '</p><br/>' . $links_html;
  }

  /**
   * Build company page contents
   * 
   * @param WP_Post $company company post
   * @return string company page contents
   */
  function build_company_page_contents($company) {
    $content = '';
    $company_id = $company->ID;
    $company_title = esc_html($company->post_title);
    $company_category = get_field('company_category', $company_id);
    $company_information = esc_html(get_field('company_information', $company_id));
    $company_contact_person_name = esc_html(get_field('company_contact_person_name', $company_id));
    $company_address = esc_html(get_field('company_address', $company_id));
    $company_postal_code = esc_html(get_field('company_postal_code', $company_id));
    $company_city = esc_html(get_field('company_city', $company_id));
    $company_phone_numbers = esc_html(get_field('company_phone_numbers', $company_id));
    $company_email = esc_html(get_field('company_email', $company_id));
    $company_website = esc_url(get_field('company_website', $company_id));

    if ($company_contact_person_name) {
      $content .= $company_contact_person_name . "\n";
    }
    
    if ($company_address) {
        $content .= $company_address . "\n";
    }
    
    if ($company_postal_code && $company_city) {
        $content .= $company_postal_code . ' ' . $company_city . "\n";
    }
    
    if ($company_phone_numbers) {
        $content .= $company_phone_numbers . "\n";
    }

    if ($company_email) {
        $content .= '<a href="' . esc_url( 'mailto:' . $company_email) . '">';
        $content .= $company_email;
        $content .= "</a>" . "\n";
    }

    if ($company_website) {
        $content .= '<a href="' . $company_website . '">';
        $content .= $company_website;
        $content .= '</a>';
    }
    
    $content .= '<p>' . $company_information . '</p>';

    return $content;
  }

  /**
   * Create new company category page based on term
   * 
   * @param WP_Term $term
   * @return WP_Post created page
   */
  function create_company_category_page($term) {
    $parent_page = get_page_by_path(\Company\Utils\COMPANIES_PARENT_PAGE);
    $parent_page_id = $parent_page->ID;
    $page_title = $term->name;
    $term_id = $term->term_id;

    $category_page_id = wp_insert_post(array(
      'post_title'    => $page_title,
      'post_name'     => $page_title,
      'post_content'  => '<p></p>',
      'post_status'   => 'publish',
      'post_type'     => 'page',
      'post_parent'   => $parent_page_id,
    ));

    $category_page_content = \Company\Utils\build_company_category_page_contents($term, $category_page_id);

    wp_update_post(array(
      'ID' => $category_page_id,
      'post_content' => $category_page_content
    ));

    update_term_meta($term_id, 'taxonomy_page_id', $category_page_id);

    return get_post($category_page_id);
  }
  
  /**
   * Update company category page
   * 
   * @param WP_Term $term company category term
   * @param WP_Post $category_page company category page
   * @return WP_Post updated page
   */
  function update_company_category_page($term, $category_page) {
    $category_page_id = $category_page->ID;
    $category_page_content = \Company\Utils\build_company_category_page_contents($term, $category_page_id);

    wp_update_post(array(
      'ID' => $category_page_id,
      'post_content' => $category_page_content
    ));
  }

  /**
   * Creates a new company page based on company
   * 
   * @param int $company_id company id
   * @param int $term_id company category term id
   */
  function create_company_page($company_id, $term_id) {
    $company = get_post($company_id);
    $term = get_term($term_id);
    $term_page_id = get_term_meta($term_id, 'taxonomy_page_id', true);
    
    $company_page_contents = \Company\Utils\build_company_page_contents($company);
    
    $company_page_id = wp_insert_post(array(
      'post_title'    => $company->post_title,
      'post_name'     => $company->post_name,
      'post_status'   => 'publish',
      'post_type'     => 'page',
      'post_parent'   => $term_page_id,
      'post_content'  => $company_page_contents
    ));

    if ($company_page_id) {
      update_post_meta($company_id, 'company_page_id', $company_page_id);
      $category_page_id = get_term_meta($term_id, 'taxonomy_page_id', true);
      
      $category_page_content = \Company\Utils\build_company_category_page_contents($term, $category_page_id);

      wp_update_post(array(
          'ID' => $category_page_id,
          'post_content' => $category_page_content
      ));
    }
  }

  /**
   * Regenerate company category page contents
   */
  function regenerate_company_category_page_contents() {
    $company_category_list_page = get_page_by_path(\Company\Utils\COMPANIES_DISPLAY_PAGE);
    $company_category_list_page_id = $company_category_list_page->ID;
    $company_category_list_page_contents = \Company\Utils\build_company_category_list_page_contents();

    wp_update_post(array(
      'ID' => $company_category_list_page_id,
      'post_content' => $company_category_list_page_contents
    ));
  }

  const COMPANIES_DISPLAY_PAGE = 'sivut/tyo-yrittaminen/yrityspalvelut/yritykset/';
  const COMPANIES_PARENT_PAGE  = 'yritys-kategoriat/';
  const COMPANIES_DISPLAY_PAGE_TEXT = 'Tervetuloa Mäntyharjun kunnan hallinnoimaan yritysluetteloon, josta löydät paikalliset toimijat toimialoittain.';
?>