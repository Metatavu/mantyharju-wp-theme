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
        $page_title = $term->name;
        $parent_page = \Company\Utils\COMPANIES_PARENT_PAGE;

        $existing_page = get_page_by_path($parent_page . $page_title);

        if (!$existing_page) {
            $parent_page_id = get_page_by_path($parent_page)->ID;
            $new_page = array(
                'post_title'    => $page_title,
                'post_name'     => $page_title,
                'post_content'  => '<p></p>',
                'post_status'   => 'publish',
                'post_type'     => 'page',
                'post_parent'   => get_page_by_path($parent_page)->ID,
            );

            $page_id = wp_insert_post($new_page);

            if ($page_id) {
                update_term_meta($term_id, 'taxonomy_page_id', $page_id);

                $links_html = '<p>' . \Company\Utils\COMPANIES_DISPLAY_PAGE_TEXT . '</p><br/>' . \Company\Utils\build_child_links($parent_page_id, $page_id);


                $display_page = \Company\Utils\COMPANIES_DISPLAY_PAGE;
                $display_page_id = get_page_by_path($display_page)->ID;
                wp_update_post(array(
                    'ID' => $display_page_id,
                    'post_content' => !empty($links_html) ? $links_html : '<p>' . \Company\Utils\COMPANIES_DISPLAY_PAGE_TEXT . '</p>'
                ));
            }
        }
    }
  }, 10, 3);

  add_action('edited_term', function ($term_id, $tt_id, $taxonomy) {
    if ($taxonomy === 'company_category') {
        $term = get_term($term_id, $taxonomy);
        $page_title = $term->name;
        $parent_page = \Company\Utils\COMPANIES_PARENT_PAGE;

        $stored_page_id = get_term_meta($term_id, 'taxonomy_page_id', true);

        if ($stored_page_id) {
            $page_update_args = array(
                'ID'         => $stored_page_id,
                'post_title' => $page_title,
                'post_name'   => $page_title,
            );
            wp_update_post($page_update_args);
            $parent_page_id = get_page_by_path($parent_page)->ID;
            $this_page_links_html = '<p>' . \Company\Utils\COMPANIES_DISPLAY_PAGE_TEXT . '</p><br/>' . \Company\Utils\build_child_links($stored_page_id);
            wp_update_post(array(
              'ID'         => $stored_page_id,
              'post_content' => !empty($this_page_links_html) ? $this_page_links_html : '<p>' . \Company\Utils\COMPANIES_DISPLAY_PAGE_TEXT . '</p>'
            ));
            $links_html = '<p>' . \Company\Utils\COMPANIES_DISPLAY_PAGE_TEXT . '</p><br/>' . \Company\Utils\build_child_links($parent_page_id, $stored_page_id);

            $display_page = \Company\Utils\COMPANIES_DISPLAY_PAGE;
            $display_page_id = get_page_by_path($display_page)->ID;
            wp_update_post(array(
                'ID' => $display_page_id,
                'post_content' => !empty($links_html) ? $links_html : '<p>' . \Company\Utils\COMPANIES_DISPLAY_PAGE_TEXT . '</p>'
            ));
        }
    }
  }, 10, 3);

  add_action('pre_delete_term', function ($term_id, $taxonomy) {
    if ($taxonomy === 'company_category') {
        $page_title = $term->name;
        $stored_page_id = get_term_meta($term_id, 'taxonomy_page_id', true);
        $parent_page = \Company\Utils\COMPANIES_PARENT_PAGE;

        $args = array(
            'ID' => $stored_page_id
        );
        $page = get_post($stored_page_id);

        if (!empty($page)) {
            $page_id = $page->ID;

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
            
            $links_html = '<p>' . \Company\Utils\COMPANIES_DISPLAY_PAGE_TEXT . '</p><br/>' . \Company\Utils\build_child_links($parent_page_id);

            $display_page = \Company\Utils\COMPANIES_DISPLAY_PAGE;
            $display_page_id = get_page_by_path($display_page)->ID;
            wp_update_post(array(
                'ID' => $display_page_id,
                'post_content' => !empty($links_html) ? $links_html : '<p>' . \Company\Utils\COMPANIES_DISPLAY_PAGE_TEXT . '</p>'
            ));
        }
    }
  }, 10, 3);

?>