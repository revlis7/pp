<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User extends Auth_Controller {
	function __construct() {
		parent::__construct(false);
	}
	
	function index() {
		/* TODO
		//只允许管理员访问
		if(element('group', $this->session->userdata('user')) !== 'administrator') {
			redirect('/', 'refresh');
		}
		
		$users = $this->User_model->get_all();
		//var_dump($users);exit;
		$data = array('users' => $users);
		$this->template->load('default', 'user/main', $data);
		*/
		$this->template->load('default', 'user/main');
	}
	
	function delete() {
		$loginname = $this->input->post('loginname', true);
		
		//只允许管理员访问
		if(element('group', $this->session->userdata('user')) !== 'administrator') {
			$this->json->output(array('r' => 'error', 'm' => '您没有使用该功能的权限'));
		}
		
		if(!$this->utility->chk_loginname($loginname)) {
			$this->json->output(array('r' => 'error', 'm' => '请正确输入用户账号'));
		}
		
		if($loginname === element('loginname', $this->session->userdata('user'))) {
			$this->json->output(array('r' => 'error', 'm' => '不能删除自己的账号'));
		}
		
		if(!$this->User_model->delete($loginname)) {
			$this->json->output(array('r' => 'error', 'm' => '未找到符合的账号信息'));
		}
		
		$this->json->output(array('r' => 'success'));
	}
	
	function create() {
		/* TODO
		if(element('group', $this->session->userdata('user')) !== 'administrator') {
			redirect('/', 'refresh');
		}
		*/
		$this->template->load('default', 'user/create');
	}
	
	function create_submit() {
		$loginname = $this->input->post('loginname', true);
		$password  = $this->input->post('password', true);
		$group     = $this->input->post('group', true);
		$realname  = $this->input->post('realname', true);
				
		if(element('group', $this->session->userdata('user')) !== 'administrator') {
			$this->json->output(array('r' => 'error', 'm' => '您没有使用该功能的权限'));
		}
		
		if(!$this->utility->chk_loginname($loginname)) {
			$this->json->output(array('r' => 'error', 'm' => '用户名不符合规范（用户名长3～24字符，由大小写字母、数字和下划线组成）'));
		}
		
		if(!$this->utility->chk_password($password)) {
			$this->json->output(array('r' => 'error', 'm' => '登录密码不符合规范（密码长6～24字符，由大小写字母、数字和下划线组成）'));
		}
		
		if(!$this->utility->chk_group($group)) {
			$this->json->output(array('r' => 'error', 'm' => '用户分组信息错误，请重新选择'));
		}
		
		if(!$this->utility->chk_realname($realname)) {
			$this->json->output(array('r' => 'error', 'm' => '用户姓名不符合规范（姓名长2～64字符，由汉字、大小写字母、数字和下划线组成）'));
		}
		
		if($this->User_model->exists($loginname)) {
			$this->json->output(array('r' => 'error', 'm' => '用户名已存在'));
		}
		
		if(!$this->User_model->create($loginname, $password, $group, $realname)) {
			$this->json->output(array('r' => 'error', 'm' => '创建用户失败'));
		}
		
		$this->json->output(array('r' => 'success'));
	}
	
	function pwd_change() {
		$this->template->load('default', 'user/pwd_change');
	}
	
	function pwd_change_submit() {
		$loginname = element('loginname', $this->session->userdata('user'));
		$password = $this->input->post('password');
		$password_new = $this->input->post('password_new');
		
		if($password === $password_new) {
			$this->json->output(array('r' => 'error', 'm' => '您输入的新密码与旧密码相同'));
		}
		
		if(!$this->User_model->validate($loginname, $password)) {
			$this->json->output(array('r' => 'error', 'm' => '您输入的旧密码错误'));
		}
		
		if(!$this->utility->chk_password($password_new)) {
			$this->json->output(array('r' => 'error', 'm' => '您输入的新密码不符合规范（密码长6～24字符，由大小写字母、数字和下划线组成）'));
		}
		
		if($this->User_model->update_pwd($loginname, $password_new) === 1) {
			$this->json->output(array('r' => 'success'));
		}
		$this->json->output(array('r' => 'error', 'm' => '修改密码失败'));
	}
}