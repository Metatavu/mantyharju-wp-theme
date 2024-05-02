<div id="root"></div>
<script type="text/javascript">
  (function() {
    window.askem = {
      settings: {
        apiKey: '<?php echo get_theme_mod('askem_api_key') ?>'
      }
    };
    var s = document.createElement('script');
    s.src = 'https://cdn.askem.com/plugin/askem.js';

    document.body.appendChild(s);
  }());
</script>
<?
 $theme_version = "0";
 try {
   $theme = wp_get_theme();
   if ($theme) {
     $theme_version = $theme->get('Version');
   }
  } catch (Exception $e) {
  }

  $bundle_url = get_template_directory_uri() . '/dist/bundle.js' . '?v=' . $theme_version;
?>

<script type="text/javascript" src="<?php echo $bundle_url ?>"></script>