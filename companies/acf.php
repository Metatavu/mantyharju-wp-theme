<?php
if(function_exists("acf_add_local_field_group")) {
	acf_add_local_field_group(array (
			'id' => 'acf_companies',
			'title' => 'Companies',
			'fields' => array (			
					array (
							'key' => 'field_company_category_8438d8acf5c6',
							'label' => 'Kategoria',
							'name' => 'company_category',
							'type' => 'taxonomy',
							'instructions' => 'Valitse yrityksen kategoria',
							'taxonomy' => 'company_category',
							'field_type' => 'select',
							'allow_null' => 0,
							'add_term' => 0,
							'save_terms' => 1,
							'load_terms' => 1,
							'return_format' => 'id',
							'required' => 1,
					),
					array (
							'key' => 'field_company_contact_person_name',
							'label' => 'Henkilön nimi',
							'name' => 'company_contact_person_name',
							'type' => 'text',
							'required' => 0,
					),
					array (
							'key' => 'field_company_contact_person_email',
							'label' => 'Kontaktihenkilön sähköposti',
							'name' => 'company_contact_person_email',
							'type' => 'email',
							'required' => 0,
					),
					array (
							'key' => 'field_company_address',
							'label' => 'Yrityksen osoite',
							'name' => 'company_address',
							'type' => 'text',
							'required' => 0,
					),
					array (
							'key' => 'field_company_postal_code',
							'label' => 'Postinumero',
							'name' => 'company_postal_code',
							'type' => 'text',
							'required' => 0,
					),
					array (
							'key' => 'field_company_city',
							'label' => 'Postitoimipaikka',
							'name' => 'company_city',
							'type' => 'text',
							'required' => 0,
					),
					array (
							'key' => 'field_company_phone_numbers',
							'label' => 'Yrityksen puhelinnumerot',
							'name' => 'company_phone_numbers',
							'type' => 'text',
							'required' => 1,
					),
					array (
							'key' => 'field_company_email',
							'label' => 'Yrityksen sähköposti',
							'name' => 'company_email',
							'type' => 'email',
							'required' => 0,
					),
					array (
							'key' => 'field_company_website',
							'label' => 'Yrityksen www-sivu',
							'name' => 'company_website',
							'type' => 'text',
							'required' => 0,
					),
					array (
							'key' => 'field_company_information',
							'label' => 'Tiedot',
							'name' => 'company_information',
							'type' => 'textarea',
							'required' => 0,
							'default_value' => '',
							'placeholder' => 'Yrityksen tiedot',
							'prepend' => '',
							'append' => '',
							'formatting' => 'none',
							'maxlength' => '',
					)
			),
			'location' => array (
					array (
							array (
									'param' => 'post_type',
									'operator' => '==',
									'value' => 'company',
									'order_no' => 0,
									'group_no' => 0,
							),
					),
			),
			'options' => array (
					'position' => 'acf_after_title',
					'layout' => 'no_box',
					'hide_on_screen' => array (),
			),
			'menu_order' => 0,
	));
}
?>