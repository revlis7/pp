<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Data extends Auth_Controller {
	function __construct() {
		parent::__construct();
	}
	
	function index() {
		$this->template->load('default', 'data/main');
	}
}