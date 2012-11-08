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
		if($this->db->count_all_results() !== 1)  {
			return false;
		}
		return true;
	}
	
	function validate($loginname, $password) {
		$this->db->from('user')->where(array('loginname' => $loginname, 'password' => $this->encrypt->sha1($password)));
		if($this->db->count_all_results() !== 1)  {
			return false;
		}
		return true;
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
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return true;
	}
	
	function create($loginname, $password, $title, $realname = '', $branch = '', $tel = '', $qq = '', $email = '', $status = 'normal') {
		$data = array(
			'loginname' => $loginname,
			'password'  => $this->encrypt->sha1($password),
			'title'     => $title,
			'realname'  => $realname,
			'branch'    => $branch,
			'tel'       => $tel,
			'qq'        => $qq,
			'email'     => $email,
			'status'    => $status,
		);
		$query = $this->db->insert('user', $data);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return true;
	}
	
	function ban($loginname) {
		$this->db->set('status', 'banned');
		$this->db->where('loginname', $loginname);
		$this->db->update('user');
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return true;
	}
	
	function is_banned($loginname) {
		$this->db->select('status');
		$this->db->from('user')->where('loginname', $loginname);
		$query = $this->db->get();
		$ret = $query->row();
		if($ret->status === 'banned') {
			return true;
		}
		return false;
	}
	
	function delete($loginname) {
		$this->db->from('user')->where('loginname', $loginname);
		$this->db->delete();
		
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return true;
	}
}