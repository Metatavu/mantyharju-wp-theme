<?php
  $paths = $data->paths;
  include_once $paths["common"];
  
  $serviceChannel = $data->serviceChannel;
  $addresses = $data->serviceChannel["addresses"];
  if (!$addresses) {
    return;
  }

  $services = $serviceChannel["services"];
  $serviceId = !empty($services) ? $services[0]["service"]["id"] : null;
  $serviceChannelId = $serviceChannel["id"];

  foreach ($addresses as $address) {
    if ($address["type"] == "Location") {

      /**
       * PTV accessibility information
       */
      if ($address['entrances']) {
        echo "<p>";
        foreach ($address['entrances'] as $entrance) {
          foreach ($entrance['accessibilitySentences'] as $accessibilitySentence) {
            $sentenceGroups = $accessibilitySentence['sentenceGroup'];
            $key = array_search('fi', array_column($sentenceGroups, 'language'));
            echo "<h4>" . $sentenceGroups[$key]['value'] . "</h4>";
            
            foreach ($accessibilitySentence['sentences'] as $sentences) {
              $sentence = $sentences['sentence'];
              $key = array_search('fi', array_column($sentence, 'language'));
              echo "<p>" . $sentence[$key]['value'] . "</p>";
            }
          }
        }
        echo "<p/>";
      }
    }
    
  }

?>
