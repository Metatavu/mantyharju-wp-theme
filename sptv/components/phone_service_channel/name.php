<?php
  $paths = $data->paths;
  include_once $paths["common"];

  if (isset($data->serviceChannel["serviceChannelNames"])) {
    echo "<h3>";
    echo getLocalizedValue($data->serviceChannel["serviceChannelNames"], $data->language, "Name");
    echo "</h3>";
  }
?>
