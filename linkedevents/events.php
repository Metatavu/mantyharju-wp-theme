<?php
  foreach ($data->events as $event) {
    $result = "";
    $siteUrlBase = get_site_url();
    $result .= '<article class="linkedevents-event">';
    $result .= '<div>';
    $eventName = $event["name"]["fi"];
    $eventLink = $event["externalLinks"][0]["link"];
    $eventId = $event["id"];
    // Event price: "free" if not specified
    $eventPrice = $event["offers"][0]["price"]["fi"] ? $event["offers"][0]["price"]["fi"] : "free";
    $eventDescription = $event["description"]["fi"];
    $eventTime = $event["startTime"]->format("d.m.Y");
    $eventEndTime = $event["endTime"]->format("d.m.Y");
    $result .= sprintf('<p>%s</p>', $eventTime);
    if ($event["startTime"]->format("U") > date("U") &&  $event["endTime"]->format("U") > date("U")) {
      $result .= sprintf('<div><img style="background-color: #00AAAD;"></img></div>');
    } elseif ($event["startTime"]->format("U") < date("U") &&  $event["endTime"]->format("U") > date("U")) {
      $result .= sprintf('<div><img style="background-color: #FFCF4E;"></img></div>');
    } else {
      $result .= sprintf('<div><img style="background-color: #e43e3e;"></img></div>');
    }
    $result .= sprintf('<hr></hr>', $eventLink, $eventName);
    $result .= sprintf('<div><a href="%s/event/%s">%s</a></div>', $siteUrlBase, $eventId, $eventId);
    $result .= '</div>';
    $result .= '</article>';
    echo $result;
  }
?>