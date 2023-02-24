<?php
  $paths = $data->paths;
  include_once $paths["common"];
  
  echo "<p><b>";
  echo getLocalizedValue($data->service["serviceNames"], $data->language, "Name");
  echo "</b></p>";
?>
