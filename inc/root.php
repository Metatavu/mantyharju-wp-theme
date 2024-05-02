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
<script type="text/javascript" src="<?php echo get_template_directory_uri() ?>/dist/bundle.js"></script>