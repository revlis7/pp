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
	
	function get_all() {
		$this->db->select('loginname, title, realname, branch, tel, qq, email');
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
	
	function create($loginname, $password, $title, $realname = '', $branch = '', $tel = '', $qq = '', $email = '') {
		$data = array(
			'loginname' => $loginname,
			'password'  => $this->encrypt->sha1($password),
			'title'     => $title,
			'realname'  => $realname,
			'branch'    => $branch,
			'tel'       => $tel,
			'qq'        => $qq,
			'email'     => $email,
		);
		$query = $this->db->insert('user', $data);
		if($this->db->affected_rows() === 1) {
			return true;
		}
		return false;
	}
	
	function delete($loginname) {
		$this->db->from('user')->where('loginname', $loginname);
		$this->db->delete();
		
		if($this->db->affected_rows() === 1) {
			return true;
		}
		return false;
	}
}