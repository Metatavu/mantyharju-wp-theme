<?php
  namespace Company;
  
  if (!defined('ABSPATH')) { 
    exit;
  }
  
  add_action('init', function () {
    register_taxonomy('company_category', 'company', array(
        'labels' => array(
          'name'               => "Kategoriat",
          'singular_name'      => "Kategoria",
          'add_new'            => "Lisää kategoria",
          'add_new_item'       => "Lisää uusi kategoria",
          'edit_item'          => "Muokkaa kategoriaa",
          'new_item'           => "Uusi kategoria",
          'view_item'          => "Näytä kategoria",
          'search_items'       => "Hae kategorioita",
          'not_found'          => "Kategoriaa ei löytynyt",
          'not_found_in_trash' => "Kategoriaa ei löytynyt roskakorista",
          'menu_name'          => "Kategoriat",
          'all_items'          => "Kategoriat"
        ),
        'public' => true,
        'show_ui' => true,
        'show_admin_column' => true,
        'query_var' => true,
        'rewrite' => array('slug' => 'company-category'),
        'show_in_menu' => 'edit.php?post_type=company',
        'show_in_rest' => true
    ));
  });

  add_action('create_term', function ($term_id, $tt_id, $taxonomy) {
    if ($taxonomy === 'company_category') {
        $term = get_term($term_id, $taxonomy);
        $page_slug = $term->slug;
        $page_title = $term->name;
        $parent_page = \Company\Utils\COMPANIES_PAGE;

        $existing_page = get_page_by_path($parent_page . $page_slug);

        if (!$existing_page) {
            $parent_page_id = get_page_by_path($parent_page)->ID;
            $new_page = array(
                'post_title'    => $page_title,
                'post_name'     => $page_slug,
                'post_content'  => '<p></p>',
                'post_status'   => 'publish',
                'post_type'     => 'page',
                'post_parent'   => get_page_by_path($parent_page)->ID,
            );

            $page_id = wp_insert_post($new_page);

            if ($page_id) {
                update_term_meta($term_id, 'taxonomy_page_id', $page_id);

                $links_html = \Company\Utils\build_child_links($parent_page_id, $page_id);

                wp_update_post(array(
                    'ID' => $parent_page_id,
                    'post_content' => !empty($links_html) ? $links_html : '<p></p>'
                ));
            }
        }
    }
  }, 10, 3);

  add_action('edited_term', function ($term_id, $tt_id, $taxonomy) {
    if ($taxonomy === 'company_category') {
        $term = get_term($term_id, $taxonomy);
        $page_slug = $term->slug;
        $page_title = $term->name;
        $parent_page = \Company\Utils\COMPANIES_PAGE;

        $stored_page_id = get_term_meta($term_id, 'taxonomy_page_id', true);

        if ($stored_page_id) {
            $page_update_args = array(
                'ID'         => $stored_page_id,
                'post_title' => $page_title,
                'post_name'   => $page_slug,
            );
            wp_update_post($page_update_args);
            $parent_page_id = get_page_by_path($parent_page)->ID;
            
            $links_html = \Company\Utils\build_child_links($parent_page_id, $stored_page_id);

            wp_update_post(array(
                'ID' => $parent_page_id,
                'post_content' => !empty($links_html) ? $links_html : '<p></p>'
            ));
        }
    }
  }, 10, 3);

  add_action('delete_term', function ($term_id, $tt_id, $taxonomy) {
    if ($taxonomy === 'company_category') {
        $term = get_term($term_id, $taxonomy);
        $page_slug = $term->slug;
        $parent_page = \Company\Utils\COMPANIES_PAGE;

        $args = array(
            'name'        => $page_slug,
            'post_type'   => 'page',
            'post_status' => 'any',
            'numberposts' => 1,
            'post_parent' => get_page_by_path($parent_page)->ID,
        );
        $page = get_posts($args);

        if (!empty($page)) {
            $page_id = $page[0]->ID;

            $child_pages = get_children(array(
              'post_parent' => $page_id,
              'post_type' => 'page'
            ));

            foreach ($child_pages as $child_page) {
              wp_delete_post($child_page->ID, true);
            }
            wp_delete_post($page_id, true);

            delete_term_meta($term_id, 'taxonomy_page_id');

            $parent_page_id = get_page_by_path($parent_page)->ID;
            
            $links_html = \Company\Utils\build_child_links($parent_page_id);

            wp_update_post(array(
                'ID' => $parent_page_id,
                'post_content' => !empty($links_html) ? $links_html : '<p></p>'
            ));
        }
    }
  }, 10, 3);

?>