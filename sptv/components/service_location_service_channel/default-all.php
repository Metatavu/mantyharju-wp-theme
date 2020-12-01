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
    echo "<p><b>" . __("Email", "sptv") . "</b>";
    include "email.php";
    echo "</p>";
  }

  include "phone-numbers.php";

  if (getLocalizedValue($serviceChannel ["webPages"], $data->language)) {
    echo "<p><b>" . __("Website", "sptv") . "</b>";
    include "webpage.php";
    echo "</p>";
  }
  echo "</p>";

  include "accessibility.php";
?>