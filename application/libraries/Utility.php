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
	
	function is_ajax_request() {
		if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest') {
			return true;
		}
		return false;
	}
}