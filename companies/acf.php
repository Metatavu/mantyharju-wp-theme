<?php
if(function_exists("acf_add_local_field_group"))
{
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
				'key' => 'field_58bd9c741036f',
				'label' => 'Tiedot',
				'name' => 'company_information',
				'type' => 'textarea',
				'required' => 1,
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
			'hide_on_screen' => array (
			),
		),
		'menu_order' => 0,
	));
}
?>