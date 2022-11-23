<div class="linkedevents">
<?php
  foreach ($data->events as $event) {
    $result = "";
    $siteUrlBase = get_site_url();
    $eventName = $event["name"]["fi"];
    $eventLink = $event["externalLinks"][0]["link"];
    $eventId = $event["id"];
    // Event price: "free" if not specified
    $eventPrice = $event["offers"][0]["price"]["fi"] ? $event["offers"][0]["price"]["fi"] : "free";
    $eventDescription = $event["description"]["fi"];
    $eventTime = $event["startTime"]->format("d.m.Y");
    $eventEndTime = $event["endTime"]->format("d.m.Y");
    $result .= sprintf('<a href="%s/event/%s" class="linkedevents-event-link">', $siteUrlBase, $eventId, $eventName);
    $result .= sprintf('<h5 class="MuiTypography-h5">%s</h5>', $eventTime);
    if ($event["startTime"]->format("U") > date("U") &&  $event["endTime"]->format("U") > date("U")) {
      $result .= sprintf('<div class="indicator" style="background-color: #1068B3;"></div>');
    } elseif ($event["startTime"]->format("U") < date("U") &&  $event["endTime"]->format("U") > date("U")) {
      $result .= sprintf('<div class="indicator" style="background-color: #FFCF4E;"></div>');
    } else {
      $result .= sprintf('<div class="indicator" style="background-color: #e43e3e;"></div>');
    }
    $result .= sprintf($eventLink, $eventName);
    $result .= sprintf('<p class="MuiTypography-body1">%s</p>', $eventName);
    $result .= '</a>';
    echo $result;
  }
?>
</div>