<?php
  namespace Company;
  
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  add_action ('init', function () {
    register_post_type('Company', array (
      'labels' => array (
        'name'               => "Yritykset",
        'singular_name'      => "Yritys",
        'add_new'            => "Lisää yritys",
        'add_new_item'       => "Lisää uusi yritys",
        'edit_item'          => "Muokkaa yritystä",
        'new_item'           => "Uusi yritys",
        'view_item'          => "Näytä yritys",
        'search_items'       => "Hae yrityksiä",
        'not_found'          => "Yritystä ei löytynyt",
        'not_found_in_trash' => "Yritystä ei löytynyt roskakorista",
        'menu_name'          => "Yritykset",
        'all_items'          => "Yritysluettelo"
      ),
      'menu_icon' => 'dashicons-bank',
      'public' => true,
      'has_archive' => true,
      'show_in_rest' => true,
      'supports' => ['title'],
      'taxonomies' => ['company_category']
    ));
  });

  add_action('rest_api_init', function () {
    // Create a company
    register_rest_route('/companies', '/create-company', array(
        'methods' => 'POST',
        'callback' => function ($request) {
            $params = $request->get_json_params();
          
            $company_name = sanitize_text_field($params['company_name']);
            $company_information = wp_kses_post($params['company_information']);
            $company_category = absint($params['company_category']);
            $contact_person_name = sanitize_text_field($params['company_contact_person_name']);
            $contact_person_email = sanitize_email($params['company_contact_person_email']);
            $company_address = sanitize_text_field($params['company_address']);
            $company_postal_code = sanitize_text_field($params['company_postal_code']);
            $company_city = sanitize_text_field($params['company_city']);
            $company_phone_numbers = sanitize_text_field($params['company_phone_numbers']);
            $company_email = sanitize_email($params['company_email']);
            $company_website = esc_url_raw($params['company_website']);
            
            $post_id = wp_insert_post(array(
                'post_title' => $company_name,
                'post_type' => 'company',
                'post_status' => 'draft',
            ));
          
            update_field('company_category', $company_category, $post_id);
            update_field('company_information', $company_information, $post_id);
            update_field('company_contact_person_name', $contact_person_name, $post_id);
            update_field('company_contact_person_email', $contact_person_email, $post_id);
            update_field('company_address', $company_address, $post_id);
            update_field('company_postal_code', $company_postal_code, $post_id);
            update_field('company_city', $company_city, $post_id);
            update_field('company_phone_numbers', $company_phone_numbers, $post_id);
            update_field('company_email', $company_email, $post_id);
            update_field('company_website', $company_website, $post_id);
        },
        'permission_callback' => '__return_true',
    ));
  });

  add_action('save_post', function ($company_id, $company, $update) {
    if ($company->post_type === 'company' && $company->post_status === 'publish') {
      $company_category_term_id = get_field('company_category', $company_id);
      $company_category_term = get_term($company_category_term_id);
      $category_page_id = get_term_meta($company_category_term_id, 'taxonomy_page_id', true);
      $category_page = get_post($category_page_id);

      $company_page_id = get_post_meta($company_id, 'company_page_id', true);
      $company_page = get_post($company_page_id);

      if (!$company_page || $company_page->post_status != 'publish') {
        \Company\Utils\create_company_page($company_id, $company_category_term_id);
      } else {
        \Company\Utils\update_company_page($company_id, $company_category_term_id);
      }

      if (!$category_page || $category_page->post_status != 'publish') {
        $category_page = \Company\Utils\create_company_category_page($company_category_term);
      } else {
        \Company\Utils\update_company_category_page($company_category_term, $category_page);
      }

      \Company\Utils\regenerate_company_category_page_contents();
    } elseif ($company->post_type === 'company' && $company->post_status === 'trash') {
      $company_page_id = get_post_meta($company_id, 'company_page_id', true);

      if ($company_page_id) {
        wp_delete_post($company_page_id);
      }

      $company_category_term_id = get_field('company_category', $company_id);
      $company_category_term = get_term($company_category_term_id);
      $category_page_id = get_term_meta($company_category_term_id, 'taxonomy_page_id', true);
      $category_page = get_post($category_page_id);

      if ($category_page && $category_page->post_status == 'publish') {
        \Company\Utils\update_company_category_page($company_category_term, $category_page);
      }
    }
  }, 10, 3);

?>