<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$config['login_expire'] = 1800;

$config['group_cfg'] = array(
	'administrator'   => array('administrator', 'CEO', '产品总监', '综合部', 'CTO'),
	'product_manager' => array('产品经理'),
	'staff'           => array('大区总监','渠道经理','财富中心合伙人'),
	'part_time_job'   => array('外部兼职人员','业务人员', '独立理财顾问'),
	'other'           => array('其他人员','VIP客户'),
);

// fields *cannot* be accessed
$config['access_fields_cfg'] = array(
	'administrator' => array(),
	'product_manager' => array(),
	'staff' => array(
		'manage_button',
		'commission_b_tax',
		'commission_a_tax',
		'main_channel',
		'channel_company',
		'channel_contact',
		'billing_company',
		'manager_remark',
	),
	'part_time_job' => array(
		'manage_button',
		'manager',
		'commission_b_tax',
		'commission_a_tax',
		'inner_commission',
		'main_channel',
		'channel_company',
		'channel_contact',
		'billing_company',
		'manager_remark',
	),
	'other' => array(
		'manage_button',
		'manager',
		'commission_b_tax',
		'commission_a_tax',
		'inner_commission',
		'outer_commission',
		'pay',
		'paid',
		'found',
		'quota',
		'quota_paid',
		'quota_remain',
		'main_channel',
		'channel_company',
		'channel_contact',
		'billing_company',
		'manager_remark',
		'imm_payment',
	),
);