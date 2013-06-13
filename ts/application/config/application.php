<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$config['login_expire'] = 1800;

$config['group_cfg'] = array(
	'administrator'   => array('administrator', 'CEO', '产品总监', '综合部', 'CTO'),
	'product_manager' => array('产品经理'),
	'staff'           => array('大区总监','渠道经理','财富中心合伙人'),
	'part_time_job'   => array('外部兼职人员','业务人员', '独立理财顾问'),
	'other'           => array('其他人员','VIP客户'),
);

$config['access_fields_cfg'] = array(
	'administrator' => array(
		'manage_button' => false,
		'proj_id' => false,
		'proj_detail_id' => false,
		'total_share' => false,
		'status' => false,
		'exclusive' => false,
		'grade' => false,
		'category' => false,
		'sub_category' => false,
		'issue' => false,
		'name' => false,
		'flow_of_fund' => false,
		'highlights' => false,
		'month' => false,
		'scale' => false,
		'cycle' => false,
		'amount' => false,
		'profit_property' => false,
		'profit' => false,
		'manager' => false,
		'contract' => false,
		'remark' => false,
		'pay_account' => false,
		'countdown' => false,
		'commission_b_tax' => false,
		'commission_a_tax' => false,
		'inner_commission' => false,
		'outer_commission' => false,
		'pay' => false,
		'paid' => false,
		'found' => false,
		'quota' => false,
		'quota_paid' => false,
		'quota_remain' => false,
		'main_channel' => false,
		'channel_company' => false,
		'channel_contact' => false,
		'billing_company' => false,
		'manager_remark' => false,
		'create_ts' => false,
		'imm_payment'=>false,
	),
	'product_manager' => array(
		'manage_button' => false,
		'proj_id' => false,
		'proj_detail_id' => false,
		'total_share' => false,
		'status' => false,
		'exclusive' => false,
		'grade' => false,
		'category' => false,
		'sub_category' => false,
		'issue' => false,
		'name' => false,
		'flow_of_fund' => false,
		'highlights' => false,
		'month' => false,
		'scale' => false,
		'cycle' => false,
		'amount' => false,
		'profit_property' => false,
		'profit' => false,
		'manager' => false,
		'contract' => false,
		'remark' => false,
		'pay_account' => false,
		'countdown' => false,
		'commission_b_tax' => false,
		'commission_a_tax' => false,
		'inner_commission' => false,
		'outer_commission' => false,
		'pay' => false,
		'paid' => false,
		'found' => false,
		'quota' => false,
		'quota_paid' => false,
		'quota_remain' => false,
		'main_channel' => false,
		'channel_company' => false,
		'channel_contact' => false,
		'billing_company' => false,
		'manager_remark' => false,
		'create_ts' => false,
		'imm_payment'=>false,
	),
	'staff' => array(
		'manage_button' => true,
		'proj_id' => false,
		'proj_detail_id' => false,
		'total_share' => false,
		'status' => false,
		'exclusive' => false,
		'grade' => false,
		'category' => false,
		'sub_category' => false,
		'issue' => false,
		'name' => false,
		'flow_of_fund' => false,
		'highlights' => false,
		'month' => false,
		'scale' => false,
		'cycle' => false,
		'amount' => false,
		'profit_property' => false,
		'profit' => false,
		'manager' => false,
		'contract' => false,
		'remark' => false,
		'pay_account' => false,
		'countdown' => false,
		'commission_b_tax' => true,
		'commission_a_tax' => true,
		'inner_commission' => false,
		'outer_commission' => false,
		'pay' => false,
		'paid' => false,
		'found' => false,
		'quota' => false,
		'quota_paid' => false,
		'quota_remain' => false,
		'main_channel' => true,
		'channel_company' => true,
		'channel_contact' => true,
		'billing_company' => true,
		'manager_remark' => true,
		'create_ts' => false,
		'imm_payment'=>false,
	),
	'part_time_job' => array(
		'manage_button' => true,
		'proj_id' => false,
		'proj_detail_id' => false,
		'total_share' => false,
		'status' => false,
		'exclusive' => false,
		'grade' => false,
		'category' => false,
		'sub_category' => false,
		'issue' => false,
		'name' => false,
		'flow_of_fund' => false,
		'highlights' => false,
		'month' => false,
		'scale' => false,
		'cycle' => false,
		'amount' => false,
		'profit_property' => false,
		'profit' => false,
		'manager' => true,
		'contract' => false,
		'remark' => false,
		'pay_account' => false,
		'countdown' => false,
		'commission_b_tax' => true,
		'commission_a_tax' => true,
		'inner_commission' => true,
		'outer_commission' => false,
		'pay' => false,
		'paid' => false,
		'found' => false,
		'quota' => false,
		'quota_paid' => false,
		'quota_remain' => false,
		'main_channel' => true,
		'channel_company' => true,
		'channel_contact' => true,
		'billing_company' => true,
		'manager_remark' => true,
		'create_ts' => false,
		'imm_payment'=>false,
	),
	'other' => array(
		'manage_button' => true,
		'proj_id' => false,
		'proj_detail_id' => false,
		'total_share' => false,
		'status' => false,
		'exclusive' => false,
		'grade' => false,
		'category' => false,
		'sub_category' => false,
		'issue' => false,
		'name' => false,
		'flow_of_fund' => false,
		'highlights' => false,
		'month' => false,
		'scale' => false,
		'cycle' => false,
		'amount' => false,
		'profit_property' => false,
		'profit' => false,
		'manager' => true,
		'contract' => false,
		'remark' => false,
		'pay_account' => false,
		'countdown' => false,
		'commission_b_tax' => true,
		'commission_a_tax' => true,
		'inner_commission' => true,
		'outer_commission' => true,
		'pay' => true,
		'paid' => true,
		'found' => true,
		'quota' => true,
		'quota_paid' => true,
		'quota_remain' => true,
		'main_channel' => true,
		'channel_company' => true,
		'channel_contact' => true,
		'billing_company' => true,
		'manager_remark' => true,
		'create_ts' => false,
		'imm_payment' => true,
	),
);