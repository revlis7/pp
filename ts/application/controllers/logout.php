<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Logout extends Auth_Controller {
	function __construct() {
		parent::__construct(false);
	}
	
	function index() {
		if($this->login->is_login() === true) {
			$this->login->logout();
		}
		$redurl = $this->input->get('redurl', true);
		if($redurl != '') {
			redirect($redurl, 'refresh');
		}
		redirect('/', 'refresh');
	}
}