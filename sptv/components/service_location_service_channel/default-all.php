<?php
  include "name.php";
  include "description.php";
  
  echo "<p>";
  echo "<b>" . __("Visiting information", "sptv") . "</b><br/>";
  include "addresses.php";
  include "service-hours.php";
  echo "</p>";

  echo "<p>";
  echo "<b>" . __("Other contact details", "sptv") . "</b><br/>";

  if (getLocalizedValue($serviceChannel ["emails"], $data->language)) {
    echo "<b>" . __("Email", "sptv") . "</b><br/>";
    include "email.php";
  }

  include "phone-numbers.php";

  if (getLocalizedValue($serviceChannel ["webPages"], $data->language)) {
    echo "<b>" . __("Website", "sptv") . "</b><br/>";
    include "webpage.php";
    echo "</p>";
  }

  include "accessibility.php";
?>