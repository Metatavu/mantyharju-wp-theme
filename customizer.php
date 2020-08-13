<?php

  function custom_customizer_register( $wp_customize ) { 

    $wp_customize->add_section(
			'showcase_section',
			array(
				'title'       => __( 'Esittelyn asetukset', 'showcase' ),
				'capability'  => 'edit_theme_options',
				'description' => __( 'Aseta esittelyn kuva, otsikko ja leipäteksti', 'showcase' ),
				'priority'    => apply_filters( 'showcase_options_priority', 160 )
			)
    );
    
    $wp_customize->add_setting('showcase_image', array(
      'type' => 'option',
		));

		$wp_customize->add_setting('showcase_title', array(
      'type' => 'option',
    ));

    $wp_customize->add_setting('showcase_text', array(
      'type' => 'option',
    ));

    $wp_customize->add_setting('showcase_button_text', array(
      'type' => 'option',
    ));

    $wp_customize->add_setting('showcase_button_link', array(
      'type' => 'option',
    ));
    
    $wp_customize->add_control(
      new WP_Customize_Image_Control(
        $wp_customize,
        'showcase_image_control',
        array(
        'label' => 'Kuva',
        'settings'  => 'showcase_image',
        'section'   => 'showcase_section'
        )
      )
		);

		$wp_customize->add_control(
      new WP_Customize_Control(
        $wp_customize,
        'showcase_title_control',
        array(
          'label' => 'Otsikko',
          'section' => 'showcase_section',
          'settings' => 'showcase_title',
          'type' => 'text'
        )
      )
    );
    
    $wp_customize->add_control(
      new WP_Customize_Control(
        $wp_customize,
        'showcase_text_control',
        array(
          'label' => 'Leipäteksti',
          'section' => 'showcase_section',
          'settings' => 'showcase_text',
          'type' => 'textarea'
        )
      )
    );
    
    $wp_customize->add_control(
      new WP_Customize_Control(
        $wp_customize,
        'showcase_button_text_control',
        array(
          'label' => 'Painikkeen teksti',
          'section' => 'showcase_section',
          'settings' => 'showcase_button_text',
          'type' => 'text'
        )
      )
    );
    
    $wp_customize->add_control(
      new WP_Customize_Control(
        $wp_customize,
        'showcase_button_link_control',
        array(
          'label' => 'Painikkeen linkin osoite',
          'section' => 'showcase_section',
          'settings' => 'showcase_button_link',
          'type' => 'url'
        )
      )
		);
  }
  add_action('customize_register', 'custom_customizer_register');

  function customizer () {
    register_rest_route( 'wp/v2', '/customize', array(
      'methods' => 'GET',
      'callback' => function (WP_REST_Request $request) {
        $showcase_image = get_option( 'showcase_image' );
        $showcase_title = get_option( 'showcase_title' );
        $showcase_text = get_option( 'showcase_text' );
        $showcase_button_text = get_option( 'showcase_button_text' );
        $showcase_button_link = get_option( 'showcase_button_link' );
        return array(
          array(
            'key' => 'showcase_image',
            'value' => "$showcase_image"
          ),
          array(
            'key' => 'showcase_title',
            'value' => "$showcase_title"
          ),
          array(
            'key' => 'showcase_text',
            'value' => "$showcase_text"
          ),
          array(
            'key' => 'showcase_button_text',
            'value' => "$showcase_button_text"
          ),
          array(
            'key' => 'showcase_button_link',
            'value' => "$showcase_button_link"
          )
        );
      },
    ) );
  }
  add_action( 'rest_api_init', 'customizer' );
?>