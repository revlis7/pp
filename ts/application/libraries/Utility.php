<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Utility {
	private $CI;
	
	function __construct() {
		$this->CI =& get_instance();
	}
	
	function get($item_name) {
		$this->CI->config->load('application', true);
		return $this->CI->config->item($item_name, 'application');
	}
	
	function chk_loginname($val) {
		return preg_match('/^[A-Za-z0-9_]{3,24}$/', $val);
	}
	
	function chk_password($val) {
		return preg_match('/^[A-Za-z0-9_]{6,24}$/', $val);
	}
	
	function chk_realname($val) {
		return preg_match('/^[\x{4e00}-\x{9fa5}A-Za-z0-9_]{2,64}$/u', $val);
	}
	
	function get_group_cfg() {
		return $this->get('group_cfg');
	}
	
	function chk_group($val) {
		$_cfg = $this->get_group_cfg();
		$_group_cfg = array_keys($_cfg);
		if(!in_array($val, $_group_cfg)) {
			return false;
		}
		return true;
	}
	
	function get_user_group() {
		return $this->title2group(element('title', $this->CI->session->userdata('user')));
	}
	
	function title2group($title) {
		$_cfg = $this->get_group_cfg();
		foreach($_cfg as $group => $title_array) {
			if(in_array($title, $title_array)) {
				return $group;
			}
		}
		return null;
	}
	
	function is_admin() {
		if($this->title2group(element('title', $this->CI->session->userdata('user'))) !== 'administrator') {
			return false;
		}
		return true;
	}
	
	function is_pm() {
		if($this->title2group(element('title', $this->CI->session->userdata('user'))) !== 'product_manager') {
			return false;
		}
		return true;
	}
	
	function access_fields_filter($group, $data) {
		$_data = $data;
		$_cfg = $this->get_access_fields($group);
		foreach($_cfg as $field => $hidden) {
			if(isset($_data->$field) && $hidden) {
				unset($_data->$field);
			}
		}
		return $_data;
	}
	
	function get_access_fields($group) {
		$_cfg = $this->get('access_fields_cfg');
		
		if(!isset($_cfg[$group])) {
			return array(
				'proj_id' => true,
				'proj_detail_id' => true,
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
			);
		}
		return $_cfg[$group];
	}
	
	function is_ajax_request() {
		if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest') {
			return true;
		}
		return false;
	}
}