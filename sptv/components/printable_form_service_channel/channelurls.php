<?php
  $paths = $data->paths;
  include_once $paths["common"];
  $serviceChannel = $data->serviceChannel;
  $channelUrls = $serviceChannel["channelUrls"];

  if (!$channelUrls) {
    return;
  }

  $item = getLocalizedItem($channelUrls, $data->language);
  if ($item) {
    $url = $item["value"];
    echo "<p>";
    echo "<a target=\"_blank\" href=\"$url\">$url</a>";
    echo "</p>";
  }
?>
