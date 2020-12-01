<?php
  require_once(__DIR__ . '/../common.php');
  
  echo "<p><b>";
  echo getLocalizedValue($data->serviceChannel["serviceChannelNames"], $data->language, "Name");
  echo "</b></p>";
?>