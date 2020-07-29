<?php
  foreach ($data->events as $event) {
    $result = "";
    $result .= '<article class="linkedevents-event">';
    $result .= '<div>';
    $eventName = $event["name"]["fi"];
    $eventLink = $event["externalLinks"][0]["link"];
    $eventDescription = $event["description"]["fi"];
    $eventTime = $event["startTime"]->format("d.m.Y");
    //  \k\l\o H
    $eventEndTime = $event["endTime"]->format("d.m.Y");
    $result .= sprintf('<p>%s</p>', $eventTime);
    if ($event["startTime"]->format("U") > date("U") &&  $event["endTime"]->format("U") > date("U")) {
      $result .= sprintf('<div><img style="background-color: #00AAAD;"></img></div>');
    } elseif ($event["startTime"]->format("U") < date("U") &&  $event["endTime"]->format("U") > date("U")) {
      $result .= sprintf('<div><img style="background-color: #FFCF4E;"></img></div>');
    } else {
      $result .= sprintf('<div><img style="background-color: #e43e3e;"></img></div>');
    }
    $result .= sprintf('<a href="%s">%s</a>', $eventLink, $eventName);
    $result .= sprintf('<hr></hr>', $eventLink, $eventName);
    // $result .= sprintf('<p>%s</p>', $eventEndTime);
    // $result .= sprintf('<p>%s</p>', html_entity_decode($eventDescription));
    $result .= '</div>';
    $result .= '</article>';
    echo $result;
  }
?>
