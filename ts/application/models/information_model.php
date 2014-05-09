<?php
class Information_model extends CI_Model {
	private $CI;

	function __construct() {
		parent::__construct();
		
		$this->CI =& get_instance();
	}
    
    function create() {
    }
    
    function update_status() {
    }
    
    function update_current() {
    }
}