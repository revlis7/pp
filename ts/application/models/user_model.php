<?php
class User_model extends CI_Model {
	private $CI;

	var $loginname = '';
	var $password  = '';
	var $group     = '';
	var $realname  = '';
	
	function __construct() {
		parent::__construct();
		
		$this->CI =& get_instance();
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
	
	function get($loginname) {
		$this->db->from('user')->where('loginname', $loginname);
		$query = $this->db->get();
		return $query->row();
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
	
	function update($loginname, $title, $realname, $branch, $tel, $qq, $email) {
		$user = array(
			'title' => $title,
			'realname' => $realname,
			'branch' => $branch,
			'tel' => $tel,
			'qq' => $qq,
			'email' => $email,
		);
		$this->db->where('loginname', $loginname);
		$this->db->update('user', $user);
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
	
	function login_history($loginname) {
		$data = array(
			'loginname' => $loginname,
			'ip'        => $this->CI->input->ip_address(),
			'login_ts'  => date('Y-m-d H:i:s'),
		);
		$query = $this->db->insert('user_login_history', $data);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return true;
	}

	function operation_history($loginname, $operation) {
		$data = array(
			'loginname'  => $loginname,
			'ip'         => $this->CI->input->ip_address(),
			'operation'  => $operation,
			'operate_ts' => date('Y-m-d H:i:s'),
		);
		$query = $this->db->insert('user_operation_history', $data);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return true;
	}

	function get_operation_history() {
		$this->db->select('user.realname, user_operation_history.operation, user_operation_history.operate_ts');
		$this->db->from('user_operation_history');
		$this->db->join('user', 'user.loginname = user_operation_history.loginname', 'left');
		$this->db->order_by('user_operation_history.id', 'desc');
		$query = $this->db->get();
		return $query->result();
	}

	function has_relation_access($loginname) {
		$this->db->from('user_relation_access')->where('loginname', $loginname);
		if($this->db->count_all_results() !== 1) {
			return false;
		}
		return true;
	}

	function has_action_access($loginname) {
		$this->db->from('user_action_access');
		$this->db->where('loginname', $loginname);
		$this->db->where('action', $this->router->fetch_class().'/'.$this->router->fetch_method());
		if($this->db->count_all_results() !== 1) {
			return false;
		}
		return true;
	}

	function get_action_access_users($action) {
		$this->db->select('loginname');
		$this->db->from('user_action_access');
		$this->db->where('action', $action);
		$query = $this->db->get();
		return $query->result();
	}
}