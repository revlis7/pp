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
	
	function get_by_name($name) {
		$this->db->from('user')->where('realname', $name);
		$query = $this->db->get();
		return $query->row();
	}

    function get_all($status = '') {
		$this->db->select('id,loginname, title, realname, branch, tel, qq, email, mobile, status');
        if(!empty($status)){
            $this->db->where('status',$status);
        }
		$this->db->from('user');
		$this->db->order_by('id', 'asc');
		$query = $this->db->get();
		return $query->result();
	}
	
    function get_by_users($append_users='',$mode=0){
        $this->db->select('id as userid,loginname, title, realname, branch');
        $this->db->where('status','normal');
        $group_cfg=$this->utility->get_group_cfg();
        $this->db->where_in('title',array_merge(
			$group_cfg['administrator'],
			$group_cfg['administrator_b'],
			$group_cfg['proj_director'],
			$group_cfg['proj_director_b'],
			$group_cfg['proj_director_c'],
			$group_cfg['proj_director_d'],
			$group_cfg['product_manager'],
			$group_cfg['staff'],
			$group_cfg['part_time_job'],
			$group_cfg['other']
		));
       	if(!empty($append_users)){
       		$apuser_where = '(realname = \''.element('realname', $this->session->userdata('user')).'\' or  ';
       		foreach ($append_users as $row) {
       	    	$apuser_where .= 'realname =\''.$row.'\' or ';
       		}
           	$apuser_where = substr($apuser_where, 0 ,strlen($apuser_where)-3);
       	    $apuser_where .= ') ';
       	    //echo($apuser_where);
   		    $this->db->where($apuser_where);
       	}
		$this->db->from('user');
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
	
	function update($loginname, $title, $realname, $branch, $tel, $qq, $mobile, $email) {
		$user = array(
			'title' => $title,
			'realname' => $realname,
			'branch' => $branch,
			'tel' => $tel,
			'qq' => $qq,
			'email' => $email,
			'mobile' => $mobile,
		);
		$this->db->where('loginname', $loginname);
		$this->db->update('user', $user);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return true;
	}
	
	function create($loginname, $password, $title, $realname = '', $branch = '', $tel = '', $qq = '', $mobile = '', $email = '',$status = 'normal') {
		$data = array(
			'loginname' => $loginname,
			'password'  => $this->encrypt->sha1($password),
			'title'     => $title,
			'realname'  => $realname,
			'branch'    => $branch,
			'tel'       => $tel,
			'qq'        => $qq,
			'email'     => $email,
			'mobile'    => $mobile,
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

	function has_action_access($loginname, $action = null) {
		$this->db->from('user_action_access');
		$this->db->where('loginname', $loginname);
		if($action === null) {
			$action = $this->router->fetch_class().'/'.$this->router->fetch_method();
		}
		$this->db->where('action', $action);
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

    function is_accessed($action_access_id, $value, $loginname){
        $this->db->from('user_action_access_history');
        $this->db->where('loginname', $loginname);
        $this->db->where('action_access_id', $action_access_id);
        $this->db->where('value', $value);
        
        $query = $this->db->get();

		if($query->num_rows() == 0) {
			return false;
        }
        return true;

    }
    
    function update_access_history($action_access_id, $value, $loginname){
        $data = array(
            'value' => $value,
            'update_ts' => date('Y-m-d H:i:s'),
        );
        $this->db->where('loginname',$loginname);
        $this->db->where('action_access_id',$action_access_id);
        $this->db->update('user_action_access_history', $data);
        
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return true;
    }
    
    function get_access_value($loginname, $action = null) {
        if($action === null) {
			$action = $this->router->fetch_class().'/'.$this->router->fetch_method();
		}
        $this->db->from('user_action_access');
        $this->db->where('action',$action);
        $this->db->where('loginname',$loginname);
        $query = $this->db->get();
        return $query->row()->value;
    }
           
    function is_all_accessed($action_access_id, $value) {
       
        $this->db->from('user_action_access_history');
        $this->db->where('action_access_id', $action_access_id);
        $this->db->where('value', $value);
        $query = $this->db->get();
        $access_rows = $query->num_rows();
        
        $this->db->from('user_action_access_history');
        $this->db->where('action_access_id', $action_access_id);
        $query = $this->db->get();
        $all_rows = $query->num_rows();
        
        if($access_rows == $all_rows) {
            return true;
        }
        return false;
        
    }
    
    function create_access_history($proj_id, $operate_rel) {
        $query = $this->db->query('select max(action_access_id) as max_action_access_id from user_action_access_history');
        $max_action_access_id = $query->row()->max_action_access_id+1;
        
        $this->db->distinct('');
        $this->db->select('loginname');
        $this->db->from('user_action_access');
        $this->db->where('operate_rel',$operate_rel);
        $query=$this->db->get();
        
        foreach ($query->result() as $row) {
            $data = array(
                'operate_rel' => $operate_rel,
                'action_access_id' => $max_action_access_id,
                'mod_id' => $proj_id,
                'loginname' => $row->loginname,
                'create_ts' => date('Y-m-d H:i:s'),
                'update_ts' => date('Y-m-d H:i:s'),
                'value' => 0
            );
            $this->db->insert('user_action_access_history',$data);
        }

    	$data = array(
            'action_access_id' => $max_action_access_id
        );
        $this->db->where('id', $proj_id);
        $this->db->update('proj', $data);

    }
    
    function get_reporters() {
        $this->db->select('realname');
        $this->db->from('user');
        $this->db->where('report_to',element('realname', $this->session->userdata('user')));
        //$this->db->where('report_to','孟祥春');
        $query=$this->db->get();
        return $query->result();
    }

    function get_all_reporters() {
        return explode(',',element('all_reportors', $this->session->userdata('user')));
    }

    function get_root_reporter() {
        $sql = "SELECT * FROM user WHERE report_to = '' OR report_to IS NULL";
        $query = $this->db->query($sql);
        return $query->result();
    }

    function get_reporter($loginname) {
        $sql = "SELECT * FROM user WHERE report_to = ?";
        $query = $this->db->query($sql, array($loginname));

        $result = array(
            'loginname' => $loginname,
            'children'  => array(),
        );

        foreach($query->result() as $reporter) {
            $result['children'][] = $this->get_reporter($reporter->loginname);
        }
        if(empty($result['children'])) {
            $result['leaf'] = true;
        } else {
            $result['expanded'] = true;
        }
        return $result;
    }
}