<?php
  $paths = $data->paths;
  include_once $paths["common"];

  $service = $data->service;
  $serviceChannels = $service["serviceChannels"];

  if (!$serviceChannels) {
    return;
  }

  foreach ($serviceChannels as $serviceChannelChild) {
    
    $serviceChannel = $serviceChannelChild["serviceChannel"];
    $serviceChannelName = $serviceChannel["name"];

    echo "<p>";
    echo $serviceChannelName;
    echo "</p>";
  }

?>
