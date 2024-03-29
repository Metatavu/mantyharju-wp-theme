<?php
  $paths = $data->paths;
  include_once $paths["common"];
  $serviceChannel = $data->serviceChannel;
  $attachments = $serviceChannel["attachments"];

  if (!$attachments) {
    return;
  }

  $attachment = getLocalizedUrl($attachments, $data->language);
  if ($attachment) {
    $url = $attachment["url"];
    $text = $attachment["description"] ? $attachment["description"] : $url;
    echo "<p>";
    echo $description;
    echo "<br/><a target=\"_blank\" href=\"$url\">$text</a>";
    echo "</p>";
  }
?>
