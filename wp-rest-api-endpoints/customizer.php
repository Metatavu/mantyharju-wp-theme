<?php

  function custom_customizer_register( $wp_customize ) {

  /*-----START HERO CUSTOMIZER-----*/

  $wp_customize->add_section(
    'hero_section',
    array(
      'title'       => __( 'Laidastalaitaan (HERO) kuvan asetukset', 'hero' ),
      'capability'  => 'edit_theme_options',
      'description' => __( 'Aseta laidastalaitaan kuva, otsikko ja leipäteksti', 'hero' ),
      'priority'    => apply_filters( 'hero_options_priority', 160 )
    )
  );

  $wp_customize->add_setting('hero_image', array(
    'type' => 'option',
  ));

  $wp_customize->add_setting('hero_logo_image', array(
    'type' => 'option',
  ));

  $wp_customize->add_setting('hero_title', array(
    'type' => 'option',
  ));

  $wp_customize->add_setting('hero_button_text', array(
    'type' => 'option',
  ));

  $wp_customize->add_setting('hero_button_link', array(
    'type' => 'option',
  ));

  $wp_customize->add_control(
    new WP_Customize_Image_Control(
      $wp_customize,
      'hero_image_control',
      array(
      'label' => 'Taustakuva',
      'settings'  => 'hero_image',
      'section'   => 'hero_section'
      )
    )
  );

  $wp_customize->add_control(
    new WP_Customize_Image_Control(
      $wp_customize,
      'hero_logo_image_control',
      array(
      'label' => 'Mäntyharju Logo',
      'settings'  => 'hero_logo_image',
      'section'   => 'hero_section'
      )
    )
  );

  $wp_customize->add_control(
    new WP_Customize_Control(
      $wp_customize,
      'hero_title_control',
      array(
        'label' => 'Otsikko',
        'section' => 'hero_section',
        'settings' => 'hero_title',
        'type' => 'text'
      )
    )
  );

  $wp_customize->add_control(
    new WP_Customize_Control(
      $wp_customize,
      'hero_button_text_control',
      array(
        'label' => 'Painikkeen teksti',
        'section' => 'hero_section',
        'settings' => 'hero_button_text',
        'type' => 'text'
      )
    )
  );

  $wp_customize->add_control(
    new WP_Customize_Control(
      $wp_customize,
      'hero_button_link_control',
      array(
        'label' => 'Painikkeen linkin osoite',
        'section' => 'hero_section',
        'settings' => 'hero_button_link',
        'type' => 'url'
      )
    )
  );

  /*-----END HERO CUSTOMIZER-----*/

    /*-----START SHOWCASE CUSTOMIZER-----*/
    
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
    /*-----END SHOWCASE CUSTOMIZER-----*/

    /*-----START FOOTER CUSTOMIZER-----*/

    $wp_customize->add_section(
      'footer_section',
      array(
        'title'       => __( 'Alapalkin asetukset', 'footer' ),
        'capability'  => 'edit_theme_options',
        'description' => __( 'Aseta alapalkin kuva, otsikko ja leipäteksti', 'footer' ),
        'priority'    => apply_filters( 'footer_options_priority', 160 )
      )
    );

    $wp_customize->add_setting('footer_image', array(
      'type' => 'option',
    ));

    $wp_customize->add_setting('footer_title', array(
      'type' => 'option',
    ));

    $wp_customize->add_setting('footer_text', array(
      'type' => 'option',
    ));

    $wp_customize->add_setting('footer_button_text', array(
      'type' => 'option',
    ));

    $wp_customize->add_setting('footer_button_link', array(
      'type' => 'option',
    ));

    $wp_customize->add_control(
      new WP_Customize_Image_Control(
        $wp_customize,
        'footer_image_control',
        array(
        'label' => 'Kuva',
        'settings'  => 'footer_image',
        'section'   => 'footer_section'
        )
      )
    );

    $wp_customize->add_control(
      new WP_Customize_Control(
        $wp_customize,
        'footer_title_control',
        array(
          'label' => 'Otsikko',
          'section' => 'footer_section',
          'settings' => 'footer_title',
          'type' => 'text'
        )
      )
    );

    $wp_customize->add_control(
      new WP_Customize_Control(
        $wp_customize,
        'footer_text_control',
        array(
          'label' => 'Leipäteksti',
          'section' => 'footer_section',
          'settings' => 'footer_text',
          'type' => 'textarea'
        )
      )
    );

    $wp_customize->add_control(
      new WP_Customize_Control(
        $wp_customize,
        'footer_button_text_control',
        array(
          'label' => 'Painikkeen teksti',
          'section' => 'footer_section',
          'settings' => 'footer_button_text',
          'type' => 'text'
        )
      )
    );

    $wp_customize->add_control(
      new WP_Customize_Control(
        $wp_customize,
        'footer_button_link_control',
        array(
          'label' => 'Painikkeen linkin osoite',
          'section' => 'footer_section',
          'settings' => 'footer_button_link',
          'type' => 'url'
        )
      )
    );
    /*-----END FOOTER CUSTOMIZER-----*/
  }
  add_action('customize_register', 'custom_customizer_register');

  function customizer () {
    register_rest_route( 'wp/v2', '/customize', array(
      'methods' => 'GET',
      'callback' => function (WP_REST_Request $request) {
        $showcase_image = get_option('showcase_image');
        $showcase_title = get_option('showcase_title');
        $showcase_text = get_option('showcase_text');
        $showcase_button_text = get_option('showcase_button_text');
        $showcase_button_link = get_option('showcase_button_link');
        $hero_image = get_option('hero_image');
        $hero_logo_image = get_option('hero_logo_image');
        $hero_title = get_option('hero_title');
        $hero_button_text = get_option('hero_button_text');
        $hero_button_link = get_option('hero_button_link');
        $footer_image = get_option('footer_image');
        $footer_title = get_option('footer_title');
        $footer_text = get_option('footer_text');
        $footer_button_text = get_option('footer_button_text');
        $footer_button_link = get_option('footer_button_link');
        return array(
          array('key' => 'showcase_image', 'value' => "$showcase_image"),
          array('key' => 'showcase_title', 'value' => "$showcase_title"),
          array('key' => 'showcase_text', 'value' => "$showcase_text"),
          array('key' => 'showcase_title', 'value' => "$showcase_title"),
          array('key' => 'showcase_button_text', 'value' => "$showcase_button_text"),
          array('key' => 'showcase_button_link', 'value' => "$showcase_button_link"),
          array('key' => 'hero_image', 'value' => "$hero_image"),
          array('key' => 'hero_logo_image', 'value' => "$hero_logo_image"),
          array('key' => 'hero_title', 'value' => "$hero_title"),
          array('key' => 'hero_button_text', 'value' => "$hero_button_text"),
          array('key' => 'hero_button_link', 'value' => "$hero_button_link"),
          array('key' => 'footer_image', 'value' => "$footer_image"),
          array('key' => 'footer_title', 'value' => "$footer_title"),
          array('key' => 'footer_text', 'value' => "$footer_text"),
          array('key' => 'footer_title', 'value' => "$footer_title"),
          array('key' => 'footer_button_text', 'value' => "$footer_button_text"),
          array('key' => 'footer_button_link', 'value' => "$footer_button_link"),
        );
      },
    ) );
  }
  add_action( 'rest_api_init', 'customizer' );
?>