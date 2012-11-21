<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Api extends Auth_Controller {
	function __construct() {
		parent::__construct();
	}
	
	function access_fields() {
		$group = $this->utility->title2group(element('title', $this->session->userdata('user')));
		$this->json->output(array('success' => true, 'data' => $this->utility->get_access_fields($group)));
	}
}