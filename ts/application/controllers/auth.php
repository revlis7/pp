<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Auth extends Auth_Controller {
	function __construct() {
		parent::__construct(false);
		
		if($this->login->is_login() === true) {
			$redurl = $this->input->get('redurl', true);
			if($redurl != '') {
				redirect($redurl, 'refresh');
			}
			redirect(site_url('tsmain'), 'refresh');
		}
	}

	function index() {
		$this->template->load('default', 'auth/main');
	}
	
	function auth_submit() {
		$loginname = $this->input->post('loginname', true) === false ? '' : $this->input->post('loginname', true);
		$password  = $this->input->post('password', true) === false ? '' : $this->input->post('password', true);
		
		
		if(!$this->utility->chk_loginname($loginname)) {
			$this->json->output(array('success' => false, 'm' => '用户名不符合规范（用户名长3～24字符，由大小写字母、数字和下划线组成）'));
		}
		
		/*
		if(!$this->utility->chk_password($password)) {
			$this->json->output(array('r' => 'error', 'm' => '登录密码不符合规范（密码长6～24字符，由大小写字母、数字和下划线组成）'));
		}
		*/
		
		if(!$this->User_model->exists($loginname)) {
			$this->json->output(array('success' => false, 'errors' => array('loginname' => '用户不存在')));
		}
		
		if(!$this->User_model->validate($loginname, $password)) {
			$this->json->output(array('success' => false, 'errors' => array('loginname' => '用户名或登录密码错误')));
		}
		
		if($this->User_model->is_banned($loginname)) {
			$this->json->output(array('success' => false, 'errors' => array('loginname' => '该账号已被禁止登录')));
		}
		
		if(!$this->login->set_login($loginname)) {
			$this->json->output(array('success' => false, 'errors' => array('loginname' => '登录失败')));
		}
		
		//记录用户登录历史
		$this->User_model->login_history($loginname);
		
		$this->json->output(array('success' => true));
	}
}
