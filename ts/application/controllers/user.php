<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User extends Auth_Controller {
	function __construct() {
		parent::__construct();
	}
	
	function index() {
		//只允许管理员访问
		if(!$this->utility->is_admin()) {
			redirect(base_url(), 'refresh');
		}
		
		$this->template->load('default', 'user/main');
	}
	
	function view() {
		//只允许管理员访问
		if(!$this->utility->is_admin()) {
			$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
		}
		
		$data = $this->User_model->get_all();
		echo $this->json->output(array('success' => true, 'data' => $data));
	}
	
	function delete_submit() {
		$loginname = $this->input->post('loginname', true);
		
		//只允许管理员访问
		if(!$this->utility->is_admin()) {
			$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
		}
		
		if(!$this->utility->chk_loginname($loginname)) {
			$this->json->output(array('success' => false, 'm' => '请正确输入用户账号'));
		}
		
		if($loginname === element('loginname', $this->session->userdata('user'))) {
			$this->json->output(array('success' => false, 'm' => '不能删除自己的账号'));
		}
		
		if(!$this->User_model->delete($loginname)) {
			$this->json->output(array('success' => false, 'm' => '未找到符合的账号信息'));
		}
		
		$this->json->output(array('success' => true));
	}
	
	function create_submit() {
		$loginname = $this->input->post('loginname', true);
		$password  = $this->input->post('password', true);
		$title     = $this->input->post('title', true);
		$realname  = $this->input->post('realname', true);
		$branch    = $this->input->post('branch', true);
		$tel       = $this->input->post('tel', true);
		$qq        = $this->input->post('qq', true);
		$email     = $this->input->post('email', true);
		
		if(!$this->utility->is_admin()) {
			$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
		}
		
		if(!$this->utility->chk_loginname($loginname)) {
			$this->json->output(array('success' => false, 'errors' => array('loginname' => '用户名不符合规范（用户名长3～24字符，由大小写字母、数字和下划线组成）')));
		}
		
		if(!$this->utility->chk_password($password)) {
			$this->json->output(array('success' => false, 'errors' => array('password' => '登录密码不符合规范（密码长6～24字符，由大小写字母、数字和下划线组成）')));
		}
		
		/*
		if(!$this->utility->chk_group($group)) {
			$this->json->output(array('r' => 'error', 'm' => '用户分组信息错误，请重新选择'));
		}
		
		if(!$this->utility->chk_realname($realname)) {
			$this->json->output(array('r' => 'error', 'm' => '用户姓名不符合规范（姓名长2～64字符，由汉字、大小写字母、数字和下划线组成）'));
		}
		*/
		
		if($this->User_model->exists($loginname)) {
			$this->json->output(array('success' => false, 'm' => '用户名已存在'));
		}
		
		if(!$this->User_model->create($loginname, $password, $title, $realname, $branch, $tel, $qq, $email)) {
			$this->json->output(array('success' => false, 'm' => '添加用户失败'));
		}
		
		$this->json->output(array('success' => true));
	}
	
	/*
	function pwd_change() {
		$this->template->load('default', 'user/pwd_change');
	}
	*/
	
	function pwd_change_submit() {
		//$loginname = element('loginname', $this->session->userdata('user'));
		$loginname = $this->input->post('loginname', true);
		$password = $this->input->post('password', true);
		
		if(!$this->utility->is_admin()) {
			$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
		}
		
		/*
		if($password === $password_new) {
			$this->json->output(array('r' => 'error', 'm' => '您输入的新密码与旧密码相同'));
		}
		
		if(!$this->User_model->validate($loginname, $password)) {
			$this->json->output(array('r' => 'error', 'm' => '您输入的旧密码错误'));
		}
		*/
		
		if(!$this->utility->chk_password($password)) {
			$this->json->output(array('success' => false, 'errors' => array('password' => '您输入的新密码不符合规范（密码长6～24字符，由大小写字母、数字和下划线组成）')));
		}
		
		if($this->User_model->update_pwd($loginname, $password) !== true) {
			$this->json->output(array('success' => false, 'errors' => array('password' => '您输入的新密码与旧密码相同')));
		}
		$this->json->output(array('success' => true));
	}
	
	function ban_submit() {
		$loginname = $this->input->post('loginname', true);
		
		if(!$this->utility->is_admin()) {
			$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
		}
		
		if($loginname === 'admin') {
			$this->json->output(array('success' => false, 'errors' => array('loginname' => '不能禁用admin账号')));
		}
		
		if($this->User_model->ban($loginname) !== true) {
			$this->json->output(array('success' => false, 'errors' => array('password' => '用户更新操作失败')));
		}
		$this->json->output(array('success' => true));
	}
}