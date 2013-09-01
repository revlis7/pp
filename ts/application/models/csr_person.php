<?php
class Csr_channel_model extends CI_Model {
	private $CI;

	function __construct() {
		parent::__construct();
		
		$this->CI =& get_instance();
	}
}