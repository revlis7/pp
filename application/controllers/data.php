<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Data extends Auth_Controller {
	function __construct() {
		parent::__construct(false);
	}
	
	function index() {
		$this->template->load('default', 'data/view');
	}
	
	function manage() {
		$this->template->load('default', 'data/manage');
	}
}