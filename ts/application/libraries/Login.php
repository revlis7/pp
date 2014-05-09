<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Login {
	private $CI;
	
	function __construct() {
		$this->CI =& get_instance();
	}
	
	function is_login() {
		$loginname = get_cookie('loginname');
		$user = $this->CI->session->userdata('user');
		if(!empty($user['loginname']) && $loginname === $user['loginname']) {
			//判断用户是否登录超时
			$current_ts = time();
			if(empty($user['login_ts']) || $current_ts - $user['login_ts'] > $this->CI->utility->get('login_expire')) {
				$this->CI->session->unset_userdata('user');
				return false;
			}
			$user['login_ts'] = $current_ts;
			$this->CI->session->set_userdata('user', $user);
			return true;
		}
		//$this->CI->session->sess_destroy();
		$this->CI->session->unset_userdata('user');
		return false;
	}
	
	function set_login($loginname) {
		$this->CI->db->from('user')->where('loginname', $loginname);
		$query = $this->CI->db->get();
		$user  = $query->row_array();
		if(empty($user)) {
			return false;
		}
		$user['login_ts'] = time();
		
		$this->CI->session->set_userdata('user', $user);
		$cookie = array(
			'name'	 => 'loginname',
			'value'	 => $user['loginname'],
			'expire' => '0',
		);
		set_cookie($cookie);
		return true;
	}
	
	function logout() {
		delete_cookie('loginname');
		$this->CI->session->sess_destroy();
	}
}