<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Api extends Auth_Controller {
	function __construct() {
		parent::__construct();
	}
	
	function access_fields() {
		$fields = array(
			'manage_button' => false,
			'proj_id' => false,
			'proj_detail_id' => false,
			'sub_name' => false,
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
			'pdt_status' => false,
			'quota' => false,
			'quota_paid' => false,
			'quota_remain' => false,
			'main_channel' => false,
			'channel_company' => false,
			'channel_contact' => false,
			'billing_company' => false,
			'manager_remark' => false,
			'create_ts' => false,
			'imm_payment' => false,
		);
		$group = $this->utility->title2group(element('title', $this->session->userdata('user')));
		$forbidden_fields = $this->utility->get_forbidden_fields($group);
		foreach($forbidden_fields as $forbidden_field) {
			$fields[$forbidden_field] = true;
		}
		$this->json->output(array('success' => true, 'data' => $fields));
	}
}