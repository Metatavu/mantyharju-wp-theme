<?php
  $paths = $data->paths;
  include_once $paths["common"];
  
  $serviceChannel = $data->serviceChannel;
  $emails = $serviceChannel["emails"];

  if (!$emails) {
    return;
  }

  echo "<p>";
  echo getLocalizedValue($emails, $data->language);
  echo "</p>";

?>
