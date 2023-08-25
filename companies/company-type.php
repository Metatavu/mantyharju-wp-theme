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
        'all_items'          => "Yritykset"
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

  add_action('save_post', function ($post_id, $post, $update) {
    if ($post->post_type === 'company' && ($post->post_status === 'publish' || ($update && $post->post_status === 'publish'))) {
        $term_id = get_field('company_category', $post_id);

        if ($term_id) {
            $term_slug = get_term_field('slug', $term_id, 'company_category');
            $parent_page_path = \Company\Utils\COMPANIES_PAGE . $term_slug;
            $parent_page_id = get_page_by_path($parent_page_path)->ID;

            if ($parent_page_id) {
                $existing_page_id = get_post_meta($post_id, 'company_page_id', true);
                $old_term_id = get_post_meta($post_id, '_company_old_term_id', true);

                if ($existing_page_id) {
                    if ($old_term_id && $term_id !== $old_term_id) {
                        wp_delete_post($existing_page_id, true);

                        $old_term_slug = get_term_field('slug', $old_term_id, 'company_category');
                        $old_parent_page_path = \Company\Utils\COMPANIES_PAGE . $old_term_slug;
                        $old_parent_page_id = get_page_by_path($old_parent_page_path)->ID;

                        $links_html = \Company\Utils\build_child_links($old_parent_page_id);

                        wp_update_post(array(
                          'ID' => $old_parent_page_id,
                          'post_content' => !empty($links_html) ? $links_html : '<p></p>'
                      ));
                    }
                }

              $company_title = esc_html($post->post_title);
              $company_category = get_field('company_category', $post_id);
              $company_information = esc_html(get_field('company_information', $post_id));
              $company_contact_person_name = esc_html(get_field('company_contact_person_name', $post_id));
              $company_address = esc_html(get_field('company_address', $post_id));
              $company_postal_code = esc_html(get_field('company_postal_code', $post_id));
              $company_city = esc_html(get_field('company_city', $post_id));
              $company_phone_numbers = esc_html(get_field('company_phone_numbers', $post_id));
              $company_email = esc_html(get_field('company_email', $post_id));
              $company_website = esc_url(get_field('company_website', $post_id));

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
                  $content .= $company_email . "\n";
              }
              if ($company_website) {
                  $content .= $company_website . "\n";
              }
              $content .= '<p>' . $company_information . '</p>';
                $page_attributes = array(
                    'post_title'    => $post->post_title,
                    'post_name'     => $post->post_name,
                    'post_status'   => 'publish',
                    'post_type'     => 'page',
                    'post_parent'   => $parent_page_id,
                    'post_content' => $content
                );

                $page_id = wp_insert_post($page_attributes);

                if ($page_id) {
                    update_post_meta($post_id, 'company_page_id', $page_id);

                    update_post_meta($post_id, '_company_old_term_id', $term_id);

                    $links_html = \Company\Utils\build_child_links($parent_page_id, $page_id);

                    wp_update_post(array(
                        'ID' => $parent_page_id,
                        'post_content' => !empty($links_html) ? $links_html : '<p></p>'
                    ));
                }
            }

        }
    }
  }, 10, 3);

  add_action('pre_trash_post', function ($post_id) {
    if (get_post_type($post_id) === 'company') {
      $term_id = get_field('company_category', $post_id);

      if ($term_id) {
          $term_slug = get_term_field('slug', $term_id, 'company_category');

          $parent_page_path = \Company\Utils\COMPANIES_PAGE . $term_slug;

          $parent_page = get_page_by_path($parent_page_path);

          if ($parent_page) {
              $company_slug = get_post_field('post_name', $post_id);
              $company_page_name = $parent_page_path . '/' . $company_slug;
              $company_page = get_page_by_path($company_page_name, OBJECT, 'page');
              if ($company_page) {
                  wp_delete_post($company_page->ID, true);

                  $parent_page_id = $parent_page->ID;
                  $links_html = \Company\Utils\build_child_links($parent_page_id);

                  wp_update_post(array(
                      'ID' => $parent_page_id,
                      'post_content' => !empty($links_html) ? $links_html : '<p></p>'
                  ));
              }
          }
        }
      }
  });
?>