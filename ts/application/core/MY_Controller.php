<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Auth_Controller extends CI_Controller {	
	function __construct($login_verify = true) {
		parent::__construct();
		
		//$this->output->enable_profiler(true);
		
		if($login_verify) {
			$this->login_verify();
		} else {
			if($this->login->is_login() === true) {
				$this->login_init();
			}
		}
	}
	
	function login_verify() {
		if($this->login->is_login() !== true) {
			if($this->utility->is_ajax_request()) {
				$this->json->output(array('r' => 'error', 'm' => '您已经自动登出，请重新登录', 'd' => array('redurl' => '/')));
			}
			if(current_url() != base_url()) {
				redirect(base_url('auth?redurl='.urlencode(current_url().$this->build_request(true))), 'refresh');
			}
			redirect(base_url('auth'), 'refresh');
		}
		$this->login_init();
	}
	
	function login_init() {
		return true;
	}
	
	function build_request($question_mark = false) {
		$get = $this->input->get();
		if(!$get) {
			return '';
		}
		if($question_mark) {
			return '?'.http_build_query($get);
		}
		return http_build_query($get);
	}
}
