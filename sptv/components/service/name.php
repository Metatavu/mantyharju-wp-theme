<?php
  require_once(__DIR__ . '/../common.php');
  
  echo "<b>";
  echo getLocalizedValue($data->service["serviceNames"], $data->language, "Name");
  echo "</b>";
?>