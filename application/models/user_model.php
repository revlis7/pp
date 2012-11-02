<?php
class User_model extends CI_Model {
	var $loginname = '';
	var $password  = '';
	var $group     = '';
	var $realname  = '';
	
	function __construct() {
		parent::__construct();
	}
	
	function exists($loginname) {
		$this->db->from('user')->where('loginname', $loginname);
		if($this->db->count_all_results() === 1)  {
			return true;
		}
		return false;
	}
	
	function validate($loginname, $password) {
		$this->db->from('user')->where(array('loginname' => $loginname, 'password' => $this->encrypt->sha1($password)));
		if($this->db->count_all_results() === 1)  {
			return true;
		}
		return false;
	}
	
	function get_list() {
		$this->db->from('user');
		$this->db->order_by('id', 'asc');
		$query = $this->db->get();
		return $query->result();
	}
	
	function update_pwd($loginname, $password) {
		$this->db->set('password', $this->encrypt->sha1($password));
		$this->db->where('loginname', $loginname);
		$this->db->update('user');
		return $this->db->affected_rows();
	}
}