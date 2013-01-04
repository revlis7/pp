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
	
	function chk_id($val) {
		return preg_match('/^[1-9][0-9]{0,9}$/', $val);
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
				$_data->$field = '';
			}
		}
		return $_data;
	}
	
	function get_access_fields($group) {
		$_cfg = $this->get('access_fields_cfg');
		
		if(!isset($_cfg[$group])) {
			return array(
				'manage_button' => true,
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
	
	function manager_view_filter($proj_detail) {
		$fields = array(
			'commission_b_tax',
			'commission_a_tax',
			'outer_commission',
			'main_channel',
			'channel_company',
			'channel_contact',
			'billing_company',
			'manager_remark',
		);
		foreach($fields as $field) {
			if(isset($proj_detail->$field)) {
				$proj_detail->$field = '';
			}
		}
		return true;
	}
	
	function is_ajax_request() {
		if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest') {
			return true;
		}
		return false;
	}
	
	function get_inner_commission($commission_a_tax, $month) {
		if($month <= 0 || $commission_a_tax <= 0) {
			return 0;
		}
		return round($commission_a_tax - (0.09 * ($month / 12)), 3);
	}
	
	function get_outer_commission($commission_a_tax, $month) {
		if($month <= 0 || $commission_a_tax <= 0) {
			return 0;
		}
		return round($commission_a_tax - (0.1 * ($month / 12)), 3);
	}

	function object_to_array($d) {
		if (is_object($d)) {
			// Gets the properties of the given object
			// with get_object_vars function
			$d = get_object_vars($d); //将第一层对象转换为数组
		}

		if (is_array($d)) {
			/*
			 * Return array converted to object
			 * Using __FUNCTION__ (Magic constant)
			 * for recursive call
			 */
			return array_map(array($this, 'object_to_array'), $d);//如果是数组使用array_map递归调用自身处理数组元素
		} else {
			// Return array
			return $d;
		}
	}
}