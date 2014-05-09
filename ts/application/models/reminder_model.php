<?php
class Reminder_model extends CI_Model {
	private $CI;

	function __construct() {
		parent::__construct();
		
		$this->CI =& get_instance();
	}
    
    function get_by_id($itemid){
        $this->db->select('id as itemid,category,title,content,attachment,link,flow_path,flow_is_current,creator,editor,update_ts,'.
                          'remind_ts,assigner,assignee,assign_ts,finish_user,finish_ts,status,remark,store_attachment,store_attachment_size');
        $this->db->from('reminders');
        $this->db->where('id',$itemid);
		$query = $this->db->get();
		return $query->row();
    }
    
    function get_by_batchid($batchid,$step='yes',$step_id=0) {
        if($step=='yes'){
	        $this->db->select('id as itemid,category,title,content,attachment,link,flow_path,flow_is_current,creator,editor,update_ts,'.
                          'remind_ts,assigner,assignee,assign_ts,finish_user,finish_ts,status,remark');
        	$this->db->from('reminders');
        	$this->db->where('batchid',$batchid);
        	$this->db->where('flow_is_current',1);
	        $this->db->where('status <>','end');
	        $this->db->order_by('flow_step','asc');
			$query = $this->db->get();
			return $query->row();
        } else {
            $this->db->select('id as itemid,category,title,content,attachment,link,flow_path,flow_is_current,creator,editor,update_ts,'.
                          'remind_ts,assigner,assignee,assign_ts,finish_user,finish_ts,status,remark');
        	$this->db->from('reminders');
        	$this->db->where('batchid',$batchid);
            if($step_id > 0) {
            	$this->db->where('flow_step',$step_id);
            }
    	    $this->db->where('status <>','end');
    	    $this->db->order_by('flow_step','asc');
			$query = $this->db->get();
			return $query->result();
        }
    }
    
    function get_by_assignee($assignee,$status='normal'){
        $this->db->select('id as itemid,category,title,content,attachment,link,flow_path,flow_is_current,creator,editor,update_ts,'.
                          'remind_ts,assigner,assignee,assign_ts,finish_user,finish_ts,status,remark');
        $this->db->from('reminders');
        $this->db->where('assignee',$assignee);
        $this->db->where('status',$status);
        $this->db->order_by('assign_ts','desc');
		$query = $this->db->get();
		return $query->result();
    }

    function get_by_assigner($assigner,$status='normal'){
        $this->db->select('id as itemid,category,title,content,attachment,link,flow_path,flow_is_current,creator,editor,update_ts,'.
                          'remind_ts,assigner,assignee,assign_ts,finish_user,finish_ts,status,remark');
        $this->db->from('reminders');
        $this->db->where('assigner',$assigner);
        $this->db->where('status',$status);
        $this->db->order_by('assign_ts','desc');
		$query = $this->db->get();
		return $query->result();
    }

    function create_item($category,$title,$content,$link,$flow_path,$flow_is_current,$assignee,$status='normal'){
        $data=array(
            'category'  => $category,
            'title'     => $title,
            'content'   => $content,
            'link'      => $link,
            'flow_path' => $flow_path,
            'flow_is_current' => $flow_is_current,
			'creator'   => element('realname', $this->CI->session->userdata('user')),
			'create_ts' => date('Y-m-d H:i:s'),
			'editor'    => element('realname', $this->CI->session->userdata('user')),
			'update_ts' => date('Y-m-d H:i:s'),
			'assigner'  => element('realname', $this->CI->session->userdata('user')),
			'assignee'  => $assignee,
			'assign_ts' => date('Y-m-d H:i:s'),
            'status'    => $status,
            );
        
		$this->db->insert('reminders',$data);
        return $this->db->insert_id();
    }

    function system_create_item($category,$title,$content,$link,$flow_path,$flow_is_current,$assignee,$remark,$last_message,
                                $flow_step,$batchid,$attachment='',$store_attachment='',$store_attachment_size='',$status='normal'){
        $data=array(
            'category'  => $category,
            'title'     => $title,
            'content'   => $content,
            'link'      => $link,
            'flow_path' => $flow_path,
            'flow_is_current' => $flow_is_current,
			'creator'   => 'admin',
			'create_ts' => date('Y-m-d H:i:s'),
			'editor'    => 'admin',
			'update_ts' => date('Y-m-d H:i:s'),
			'assigner'  => 'admin',
			'assignee'  => $assignee,
			'assign_ts' => date('Y-m-d H:i:s'),
            'status'    => $status,
            'remark'    => $remark,
            'last_message' => $last_message,
            'batchid'   => $batchid,
            'flow_step' => $flow_step,
            'attachment' => $attachment,
            'store_attachment' => $store_attachment,
            'store_attachment_size' => $store_attachment_size
            );
        
		$this->db->insert('reminders',$data);
        return $this->db->insert_id();
    }

    function update_item($itemid,$category,$title,$content) {
        $data=array(
            'category'  => $category,
            'title'     => $title,
            'content'   => $content,
			'editor'    => element('realname', $this->CI->session->userdata('user')),
			'update_ts' => date('Y-m-d H:i:s'),
            );
        $this->db->where('id',$itemid);
		$this->db->update('reminders',$data);
        return true;
	}
    
    function update_status($itemid,$last_message,$flow_is_current,$status='end',$status_default='normal'){
        $data=array(
            'flow_is_current' => $flow_is_current,
            'status'    => $status,
            'last_message' => $last_message,
            );
        $this->db->where('id',$itemid);
        $this->db->where('status',$status_default);
		$this->db->update('reminders',$data);
        return true;
    }

    function update_status_batch($category,$batchid,$last_message,$status='normal',$status_default='end'){
        $data=array(
            'status'    => $status,
            'last_message' => $last_message,
            );
        $this->db->where('category',$category);
        $this->db->where('batchid',$batchid);
        $this->db->where('status <>',$status_default);
		$this->db->update('reminders',$data);
        return true;
    }
    function update_remark($itemid,$remark){
        $data=array(
            'remark' => $remark,
            );
        $this->db->where('id',$itemid);
		$this->db->update('reminders',$data);
        return true;
    }

    function assign_item($itemid,$assignee) {
        $data=array(
			'assigner'  => element('realname', $this->CI->session->userdata('user')),
			'assignee'  => $assignee,
			'assign_ts' => date('Y-m-d H:i:s'),
            );
        $this->db->where('id',$itemid);
		$this->db->update('reminders',$data);
        return true;
	}
    
    function finish_item($itemid){
        $data=array(
			'finish_user'  => element('realname', $this->CI->session->userdata('user')),
			'finish_ts' => date('Y-m-d H:i:s'),
            'status'    => 'finish',
            );
        $this->db->where('id',$itemid);
		$this->db->update('reminders',$data);
        return true;
    }
}