<html lang="fi">
  <head>
    <?php require get_template_directory() . '/inc/template-head-generic.php'; ?>
    <script type="text/javascript">window.rsConf = {general: {usePost: true}};</script>
    <script src="//cdn1.readspeaker.com/script/11747/webReader/webReader.js?pids=wr" type="text/javascript"></script>
  </head>
  <body>
    <?php if (preg_match('~MSIE|Internet Explorer~i', $_SERVER['HTTP_USER_AGENT']) || preg_match('~Trident/7.0(; Touch)?; rv:11.0~',$_SERVER['HTTP_USER_AGENT']) === 0) { ?>
      <?php require get_template_directory() . '/inc/template-loader.php'; ?>
      <?php require get_template_directory() . '/inc/root.php'; ?>
    <?php } else { ?>
      <?php require get_template_directory() . '/inc/template-deprecation-warning.php' ?>
    <?php } ?>
  </body>
</html>