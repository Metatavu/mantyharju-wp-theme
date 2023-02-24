<?php
  $paths = $data->paths;
  include_once $paths["common"];
  
  echo "<p>";
  echo nl2p(getLocalizedValue($data->service["requirements"], $data->language));
  echo "<p>";
?>
