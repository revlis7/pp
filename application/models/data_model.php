<?php
class Data_model extends CI_Model {
	function __construct() {
		parent::__construct();
	}
	
	function get_list() {
		$this->db->from('data');
		$this->db->order_by('id', 'asc');
		$query = $this->db->get();
		return $query->result();
	}
}