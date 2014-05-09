<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Board extends Auth_Controller {
	function __construct() {
		parent::__construct();
	}
    
	function index() {
		$this->template->load('default', 'board/view');
	}
    
    function get_list() {
        $data = $this->Board_model->get_all();
        
		$this->json->output(array('success' => true, 'data' => $data));
    }

    function create_submit() {
		if(!$this->has_privilege()) {
			$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
		}
        $title = $this->input->post('title');
        $content = $this->input->post('content');
        
        $this->Board_model->create_item($title,$content);
        
		$this->json->output(array('success' => true));
    }

    function edit_submit() {
		if(!$this->has_privilege()) {
			$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
		}
        $itemid = $this->input->post('itemid');
        $title = $this->input->post('title');
        $content = $this->input->post('content');
        
        if($this->utility->is_board_manage()){
            $item=$this->Board_model->get_by_id($itemid);
            if(!$item->creator == element('realname', $this->session->userdata('user'))){
                $this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
            }
        }
        
        if(!$this->Board_model->update_item($itemid, $title,$content)){
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
            $item=$this->Board_model->get_by_id($itemid);
            if(!$item->creator == element('realname', $this->session->userdata('user'))){
                $this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
            }
        }
        if(!$this->Board_model->delete_item($itemid)){
            $this->json->output(array('success' => false, 'm' => '更新错误，请联系管理员'));
        }
        
		$this->json->output(array('success' => true));
    }
	private function has_privilege() {
		if(!$this->utility->is_board_admin() && !$this->utility->is_board_manage()) {
			return false;
		}
		return true;
	}
}