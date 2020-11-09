<?php
  require_once(__DIR__ . '/../common.php');
  
  echo "<b>";
  echo getLocalizedValue($data->serviceChannel["serviceChannelNames"], $data->language, "Name");
  echo "</b>";
?>