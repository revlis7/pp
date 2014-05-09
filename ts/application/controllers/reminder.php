<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Reminder extends Auth_Controller {
	function __construct() {
		parent::__construct();
	}
    
	function index() {
		$this->template->load('default', 'reminder/view');
	}
    
    function view(){
		$type=$this->input->get('type');
        if ($type == 'assigner') {
	        $data = $this->Reminder_model->get_by_assigner($this->get_user_info('realname'));
        } else if ($type == 'assignee') {
	        $data = $this->Reminder_model->get_by_assignee($this->get_user_info('realname'));
        } else {
            $data = array();
        }
        $this->json->output(array('success' => true, 'data' => $data));
    }
    
    function view_flow(){
		$batchid=$this->input->get('batchid');
        $data = $this->Reminder_model->get_by_batchid($batchid,'no');
        $this->json->output(array('success' => true, 'data' => $data));
    }

    function create_submit() {
		if(!$this->has_privilege()) {
			$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
		}
		$category=$this->input->post('category');
		$title=$this->input->post('title');
		$content=$this->input->post('content');
		$link=$this->input->post('link');
		$flow_path=$this->input->post('flow_path');
		$flow_is_current=$this->input->post('flow_is_current');
		$assignee=$this->input->post('assignee');
		$status=$this->input->post('status');
        
        $itemid=$this->Reminder_model->create_item($category,$title,$content,$link,$flow_path,$flow_is_current,$assignee);
        
		$this->json->output(array('success' => true,'data' =>$itemid));
    }
    
    function mark_readed_submit(){
		if(!$this->has_privilege()) {
			$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
		}
        $itemid = $this->input->post('itemid');
    }

    function edit_submit() {
		if(!$this->has_privilege()) {
			$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
		}
        $itemid = $this->input->post('itemid');
        $title = $this->input->post('title');
        $content = $this->input->post('content');
        
        if($this->utility->is_board_manage()){
            $item=$this->Reminder_model->get_by_id($itemid);
            if(!$item->creator == element('realname', $this->session->userdata('user'))){
                $this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
            }
        }
        
        if(!$this->Reminder_model->update_item($itemid, $title,$content)){
            $this->json->output(array('success' => false, 'm' => '更新错误，请联系管理员'));
        }
        
		$this->json->output(array('success' => true));
    }
                            
    function delete_submit() {
		if(!$this->has_privilege()) {
			$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
		}
        $itemid = $this->input->get('itemid');
        
        if($this->utility->is_board_manage()){
            $item=$this->Reminder_model->get_by_id($itemid);
            if(!$item->creator == element('realname', $this->session->userdata('user'))){
                $this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
            }
        }
        if(!$this->Reminder_model->delete_item($itemid)){
            $this->json->output(array('success' => false, 'm' => '更新错误，请联系管理员'));
        }
        
		$this->json->output(array('success' => true));
    }
	private function get_user_info($field) {
		$info = element($field, $this->session->userdata('user'));
		if($info === false) {
			return false;
		}
		return $info;
	}
	private function has_privilege() {
		if(!$this->utility->is_board_admin() && !$this->utility->is_board_manage()) {
			return false;
		}
		return true;
	}
}