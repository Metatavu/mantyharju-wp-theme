<?php

function linkedeventsEndPoint () {
    register_rest_route( 'wp/v2', '/linkedeventsEndPoint', array(
      'methods' => 'POST',
      'callback' => function (WP_REST_Request $request) {
        print('<pre>' . print_r($request, true) . '</pre>');
      },
    ) );
  }
  add_action( 'rest_api_init', 'linkedeventsEndPoint' );
?>