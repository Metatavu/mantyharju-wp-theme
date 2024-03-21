<?php

  /**
   * Register the Company Tools page in the admin menu.
   */
  function register_company_tools_page() {
    add_management_page(
        'Company Tools', 
        'Company Tools', 
        'manage_options',
        'company-tools', 
        'company_tools_page_content'
    );
  }

  /**
   * Render the Company Tools page content.
   */
  function company_tools_page_content() {
    echo '<div class="wrap">';
    echo '<h2>Company Tools</h2>';
    echo '<p>Welcome to the Company Tools page. Here you can manage company-specific settings and tools.</p>';
    echo '<p>';
    echo '<a href="?page=company-tools&action=regenerate_company_category_pages" class="button">Regenerate Category Pages</a>';
    echo "&nbsp;";
    echo '<a href="?page=company-tools&action=regenerate_company_pages" class="button">Regenerate Company Pages</a>';
    echo "&nbsp;";
    echo '<a href="?page=company-tools&action=regenerate_category_page_contents" class="button">Regenerate Category Page Contents</a>';
    echo "&nbsp;";
    echo '<a href="?page=company-tools&action=regenerate_categories_list_page_contents" class="button">Regenerate Categories List Page Contents</a>';
    echo '</p>';

    if (isset($_GET['action']) && $_GET['action'] === 'regenerate_company_category_pages') {
      regenerate_company_category_pages();
    }

    if (isset($_GET['action']) && $_GET['action'] === 'regenerate_company_pages') {
      regenerate_company_pages();
    }

    if (isset($_GET['action']) && $_GET['action'] === 'regenerate_category_page_contents') {
      regenerate_category_page_contents();
    }

    if (isset($_GET['action']) && $_GET['action'] === 'regenerate_categories_list_page_contents') {
      regenerate_categories_list_page_contents();
    }

    echo '</div>';
  }

  /**
   * Regenerate company category pages.
   */
  function regenerate_company_category_pages() {
    $terms = get_terms([
        'taxonomy' => 'company_category',
        'hide_empty' => false
    ]);

    echo '<table class="wp-list-table widefat fixed">';
    echo '<thead>';
    echo '<tr>';
    echo '<th>Term ID</th>';
    echo '<th>Term Name</th>';
    echo '<th>Term Slug</th>';
    echo '<th>Term Page</th>';
    echo '</tr>';
    echo '</thead>';
    echo '<tbody>';

    foreach ($terms as $term) {
      echo '<tr>';
      $term_id = $term->term_id;
      $term_name = $term->name;
      $term_slug = $term->slug;
      $term_description = $term->description;
      $term_page_id = get_term_meta($term_id, 'taxonomy_page_id', true);
      $term_page = get_post($term_page_id);

      echo "<td>" . $term_id . "</td>";
      echo "<td>" . $term_name . "</td>";
      echo "<td>" . $term_slug . "</td>";
      
      if (!empty($term_page)) {
        echo "<td>$term_page_id (<a href='" . get_permalink($term_page->ID) . "'>" . $term_page->post_title . "</a>)</td>";
      } else {
        $term_page = \Company\Utils\create_company_category_page($term);
        echo "<td style=\"color: red\">Page did not exist (<a href='" . get_permalink($term_page->ID) . "'>" . $term_page->post_title . "</a>)</td>";
      }

      echo "</tr>";
    }

    echo "</pre>";
    echo '<div id="message" class="updated notice notice-success is-dismissible"><p>Pages have been regenerated successfully.</p></div>';
  }

  /**
   * Regenerate company pages.
   */
  function regenerate_company_pages() {
    $terms = get_terms([
      'taxonomy' => 'company_category',
      'hide_empty' => false
    ]);

    echo '<table class="wp-list-table widefat fixed">';
    echo '<thead>';
    echo '<tr>';
    echo '<th>Category</th>';
    echo '<th>Company Name</th>';
    echo '<th>Company Page Id</th>';
    echo '<th>Term Parent Page Id</th>';
    echo '<th>Company Page Parent Id</th>';
    echo '</tr>';
    echo '</thead>';
    echo '<tbody>';

    foreach ($terms as $term) {
      $term_id = $term->term_id;
      $term_name = $term->name;
      $term_page_id = get_term_meta($term_id, 'taxonomy_page_id', true);
      
      $companies = get_posts(array(
        'post_type' => 'company',
        'post_status' => 'publish',
        'numberposts' => -1,
        'tax_query' => array(
          array(
            'taxonomy' => 'company_category',
            'field' => 'term_id',
            'terms' => $term_id
          )
        )
      ));

      foreach ($companies as $company) {
        $company_id = $company->ID;
        $company_page_id = get_post_meta($company_id, 'company_page_id', true);
        $company_page = get_post($company_page_id);
        $company_parent_page_id = $company_page ? $company_page->post_parent : null;
        
        echo '<tr>';
        echo "<td>" . $term_name . "</td>";
        echo "<td>" . $company->post_title . "</td>";

        if (!$company_page) {
          \Company\Utils\create_company_page($company_id, $term_id);
          echo "<td style=\"color: red\">No page (fixed)</td>";
        } else {
          echo "<td>" . $company_page_id . "</td>";
        }

        echo "<td>" . $term_page_id . "</td>";

        if (!$company_parent_page_id) {
          echo "<td style=\"color: red\">No parent page</td>";
        } elseif ($company_parent_page_id != $term_page_id) {
          wp_update_post(array(
            'ID' => $company_page_id,
            'post_parent' => $term_page_id,
          ));

          echo "<td style=\"color: red\">" . $company_parent_page_id . ' != ' . $term_page_id . " (fixed)</td>";
        } else {
          echo "<td>" . $company_parent_page_id . "</td>";
        }

        echo "</tr>";
      }
    }
  }

  /**
   * Regenerate category page contents.
   */
  function regenerate_category_page_contents() {
    $terms = get_terms([
      'taxonomy' => 'company_category',
      'hide_empty' => false
    ]);

    echo '<table class="wp-list-table widefat fixed">';
    echo '<thead>';
    echo '<tr>';
    echo '<th>Category</th>';
    echo '<th>Category Page</th>';
    echo '<th>Company Count</th>';
    echo '</tr>';
    echo '</thead>';
    echo '<tbody>';

    foreach ($terms as $term) {
      $term_id = $term->term_id;
      $term_name = $term->name;
      $term_page_id = get_term_meta($term_id, 'taxonomy_page_id', true);
      $term_page = get_post($term_page_id);

      $companies = get_posts(array(
        'post_type' => 'company',
        'post_status' => 'publish',
        'numberposts' => -1,
        'tax_query' => array(
          array(
            'taxonomy' => 'company_category',
            'field' => 'term_id',
            'terms' => $term_id
          )
        )
      ));

      $page_contents = \Company\Utils\build_company_category_page_contents($term, $term_page);

      wp_update_post(array(
        'ID' => $term_page_id,
        'post_content' => $page_contents
      ));

      echo '<tr>';
      echo "<td>" . $term_name . "</td>";
      echo "<td><a href='" . get_permalink($term_page->ID) . "'>" . $term_page->post_title . "</a></td>";
      echo "<td>" . count($companies) . "</td>";
      echo "</tr>";
    }

    echo "</tbody>";
  }

  /**
   * Regenerate categories list page contents.
   */
  function regenerate_categories_list_page_contents() {
    \Company\Utils\regenerate_company_category_page_contents();
  }

  add_action('admin_menu', 'register_company_tools_page');

?>