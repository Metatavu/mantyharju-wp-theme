<?php
  foreach ($data->events as $event) {
    $result = "";
    $result .= '<article>';
    $result .= '<div>';
    $eventName = $event["name"]["fi"];
    $eventLink = $event["externalLinks"][0]["link"];
    $eventDescription = $event["description"]["fi"];
    $eventTime = $event["startTime"]->format("d.m.Y \k\l\o H");
    // $eventEndTime = $event["endTime"]->format("l jmY F Y G:ia");
    $result .= sprintf('<h2>%s</h2>', $eventTime);
    $result .= sprintf('<img style="background-color: #00AAAD; width: 10%; height: 10px; margin-left: 47%;"></img>');
    $result .= sprintf('<a href="%s">%s</a>', $eventLink, $eventName);
    // $result .= sprintf('<p>%s</p>', $eventEndTime);
    // $result .= sprintf('<p>%s</p>', html_entity_decode($eventDescription));
    $result .= '</div>';
    $result .= '</article>';
    echo $result;
  }
?>
