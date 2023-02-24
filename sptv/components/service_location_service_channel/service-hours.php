<?php
  $paths = $data->paths;
  include_once $paths["common"];

  $serviceChannel = $data->serviceChannel;
  echo formatServiceHours($serviceChannel["serviceHours"], $data->language);

?>
