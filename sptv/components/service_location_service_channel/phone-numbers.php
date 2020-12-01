<?php
  require_once(__DIR__ . '/../common.php');

  $serviceChannel = $data->serviceChannel;
  $phoneNumbers = $serviceChannel ["phoneNumbers"];


  if (!$phoneNumbers) {
    return;
  }
  
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
      echo "<b>$additionalInformation</b><br/>";
    }

    echo implode(" ", [$prefixNumber, $number, $chargeInfo]);

    echo "<br/>";
  }
  echo "</p>";

?>
