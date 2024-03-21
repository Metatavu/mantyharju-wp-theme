<?php
  $paths = $data->paths;
  include_once $paths["common"];
  
  $serviceChannel = $data->serviceChannel;
  if (!isset($data->serviceChannel["phoneNumbers"])) {
    return;
  }

  $phoneNumbers = $serviceChannel["phoneNumbers"];
  echo "<p>";
  
  foreach ($phoneNumbers as $phoneNumber) {
    $additionalInformation = $phoneNumber["additionalInformation"];
    $prefixNumber = $phoneNumber["prefixNumber"];
    $number = $phoneNumber["number"];
    $chargeInfo = "";

    switch ($phoneNumber["serviceChargeType"]) {
      case "Chargeable":
        $chargeInfo = __("Chargeable", "sptv");
    }

    if ($additionalInformation) {
      echo "<b>$additionalInformation<br/></b>";
    }

    echo "$prefixNumber $number $chargeInfo<br/>";

  }

  echo "</p>";
?>
