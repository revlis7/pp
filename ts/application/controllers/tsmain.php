<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class tsmain extends Auth_Controller {
	function __construct() {
		parent::__construct();
	}

	function index() {
        if($this->utility->get_user_group() == 'part_time_job' || $this->utility->get_user_group() == 'other') {
            $this->template->load('default', 'proj/promote_proj');
        } else {
			$this->template->load('default', 'proj/promote_proj');
        }
	}
}