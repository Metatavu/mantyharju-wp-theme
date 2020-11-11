<html lang="fi">
  <head>
    <?php require get_template_directory() . '/inc/template-head-generic.php'; ?>
    <script type="text/javascript">window.rsConf = {general: {usePost: true}};</script>
    <script src="//cdn1.readspeaker.com/script/11747/webReader/webReader.js?pids=wr" type="text/javascript"></script>
    <!-- Google Analytics -->
    <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-142777848-1', 'auto');
    ga('send', 'pageview');
    </script>
    <!-- End Google Analytics -->
  </head>
  <body>
    <?php if (preg_match('~MSIE|Internet Explorer~i', $_SERVER['HTTP_USER_AGENT']) || preg_match('~Trident/7.0(; Touch)?; rv:11.0~',$_SERVER['HTTP_USER_AGENT']) === 0) { ?>
      <?php require get_template_directory() . '/inc/template-loader.php'; ?>
      <div id="root"></div>
      <script type="text/javascript" src="<?php echo get_template_directory_uri() ?>/dist/bundle.js"></script>
    <?php } else { ?>
      <?php require get_template_directory() . '/inc/template-deprecation-warning.php' ?>
    <?php } ?>
  </body>
</html>