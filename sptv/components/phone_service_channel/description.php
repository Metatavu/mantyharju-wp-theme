<?php
  $paths = $data->paths;
  include_once $paths["common"];
  
  echo "<p>";
  echo nl2p(getLocalizedValue($data->serviceChannel["serviceChannelDescriptions"], $data->language, "Description"));
  echo "</p>";
?>
