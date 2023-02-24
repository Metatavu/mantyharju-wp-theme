<?php
  $paths = $data->paths;
  include_once $paths["common"];

  $serviceChannel = $data->serviceChannel;

  $webPages = $serviceChannel ["webPages"];

  if (!$webPages) {
    return;
  }

  $webPage = getLocalizedUrl($webPages, $data->language);
  if ($webPage) {
    $url = $webPage["url"];
    $text = $webPage["value"] ? $webPage["value"] : $url;
    echo "<p><a target=\"_blank\" href=\"$url\">$text</a></p>";
  }

?>
