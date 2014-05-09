<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Csr_corp extends Auth_Controller {
	function __construct() {
		parent::__construct();
	}

	function index() {
		$this->template->load('default', 'csr/csr_corp_view');
	}

    function view() {
        if($this->utility->get_user_group() == 'part_time_job' || $this->utility->get_user_group() == 'other') {
            $this->template->load('default', 'proj/view');
        } 
        $mode = $this->input->get('mode',true);
        $page = $this->input->get('page', true);
        $start = $this->input->get('start', true);
        $limit = $this->input->get('limit', true);
        $sort = $this->input->get('sort', true);
        $dir = $this->input->get('dir', true);
        $query = $this->input->get('query', true);
        $recentMode = $this->input->get('recentMode', true);
        $catMode = $this->input->get('catMode', true);
        $FSCChannel = $this->input->get('FSCChannel', true);
        $PStart = $this->input->get('PStart', true);
        $PEnd = $this->input->get('PEnd', true);
        $LastFollow = $this->input->get('lastFollow', true);
        
        $mode = $mode > 0 ? $mode : -1;
        $page = $page >= 0 ? $page : -1;
        $start = $start >= 0 ? $start : -1;
        $limit = $limit >= 0 ? $limit : -1;

        //if(!$this->utility->chk_loginname($sort) && !empty($sort)) {
        //	$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
        //}

        if(!$dir=='ASC' && !$dir=='DESC' && !empty($dir)) {
            $this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
        }

        if($FSCChannel=='null'){
            $FSCChannel='';
        }
        
        if(!in_array($FSCChannel,$this->User_model->get_all_reporters()) && !$this->is_csr_admin()) {
        	$FSCChannel='';   
        }

        if($mode>0){
            if($this->is_csr_admin()) {
            	$data = $this->Csr_corp_model->get_all($start,$limit,$sort,$dir,$query,$recentMode,$catMode,$FSCChannel,$PStart,$PEnd,$LastFollow)->result();
            	$totalCount = $this->Csr_corp_model->get_all_row_num($query,$recentMode,$catMode,$FSCChannel,$PStart,$PEnd,$LastFollow);
            } else {
            	$append_users= $this->User_model->get_all_reporters();
				$data = $this->Csr_corp_model->get_by_owner($this->get_user_info('realname'),$append_users,$start,$limit,$sort,$dir,$query,$recentMode,$catMode,$FSCChannel,$PStart,$PEnd,$LastFollow)->result();
        	    $totalCount = $this->Csr_corp_model->get_by_owner_row_num($this->get_user_info('realname'),$append_users,$query,$recentMode,$catMode,$FSCChannel,$PStart,$PEnd,$LastFollow);
            }
        } else {
			$data = $this->Csr_corp_model->get_by_owner($this->get_user_info('realname'),'',$start,$limit,$sort,$dir,$query,$recentMode,$catMode,$FSCChannel,$PStart,$PEnd,$LastFollow)->result();
            $totalCount = $this->Csr_corp_model->get_by_owner_row_num($this->get_user_info('realname'),'',$query,$recentMode,$catMode,$FSCChannel,$PStart,$PEnd,$LastFollow);
        }
		$this->json->output(array('success' => true,'totalCount'=>$totalCount,'data' => $data));
	}

	function get() {
		$csr_corp_id = $this->input->get('csr_corp_id', true);

		if(!$this->utility->chk_id($csr_corp_id)) {
			$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
		}

		// only admin and owner can see the data
		$data = $this->Csr_corp_model->get_by_id($csr_corp_id);
		if(!$this->is_csr_admin() && !$this->is_owner($this->get_user_info('realname'), $data)) {
			$data = array();
		}
		$this->json->output(array('success' => true, 'data' => $data));
	}

    function follow_view() {
        $csr_corp_id = $this->input->get('csr_corp_id', true);
        
        if(!$this->utility->chk_id($csr_corp_id)) {
			$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
		}
        
        $csr = $this->Csr_corp_model->get_by_id($csr_corp_id);
        if(count($csr) !== 1) {
            $this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
        }
		if(!$this->is_csr_admin() && !$this->is_owner($this->get_user_info('realname'), $csr)) {
			$data = array();
        } else {
        	$data = $this->Csr_corp_model->get_follow_by_id($csr_corp_id)->result();
        }
        
        $this->json->output(array('success' => true, 'data' => $data));

    }
    function follows_view() {
        if($this->utility->get_user_group() == 'part_time_job' || $this->utility->get_user_group() == 'other') {
            $this->template->load('default', 'proj/view');
        } 
        $mode = $this->input->get('mode',true);
        $page = $this->input->get('page', true);
        $start = $this->input->get('start', true);
        $limit = $this->input->get('limit', true);
        $sort = $this->input->get('sort', true);
        $dir = $this->input->get('dir', true);
        
        $mode = $mode > 0 ? $mode : -1;
        $page = $page >= 0 ? $page : -1;
        $start = $start >= 0 ? $start : -1;
        $limit = $limit >= 0 ? $limit : -1;

        //if(!$this->utility->chk_loginname($sort) && !empty($sort)) {
        //	$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
        //}

        if(!$dir=='ASC' && !$dir=='DESC' && !empty($dir)) {
            $this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
        }

        //是否管理模式
        if($mode>0){
            if($this->is_csr_admin()) {
            	$data = $this->Csr_corp_model->get_all_follows($start,$limit,$sort,$dir)->result();
            	$totalCount = $this->Csr_corp_model->get_all_follows_row_num();
            } else {
            	$append_users= $this->User_model->get_all_reporters();
				$data = $this->Csr_corp_model->get_follows_by_owner($this->get_user_info('realname'),$append_users,$start,$limit,$sort,$dir)->result();
        	    $totalCount = $this->Csr_corp_model->get_follows_by_owner_row_num($this->get_user_info('realname'),$append_users);
            }
        } else {
			$data = $this->Csr_corp_model->get_follows_by_owner($this->get_user_info('realname'),'',$start,$limit,$sort,$dir)->result();
            $totalCount = $this->Csr_corp_model->get_follows_by_owner_row_num($this->get_user_info('realname'),'');
        }
        
		$this->json->output(array('success' => true,'totalCount'=>$totalCount,'data' => $data));
	}
    function follow_update() {
        $csr_corp_follow = array(
			'csr_corp_id' => $this->input->post('csr_corp_id', true),
			'csr_corp_FSC_follow_status' => $this->input->post('csr_corp_FSC_follow_status', true),
			'csr_corp_FSC_opp_and_prob' => $this->input->post('csr_corp_FSC_opp_and_prob', true),
			'csr_corp_FSC_solution' => $this->input->post('csr_corp_FSC_solution', true),
			'csr_corp_follow_result' => $this->input->post('csr_corp_follow_result', true),
        );
        
		$csr_corp_id = $csr_corp_follow['csr_corp_id'];
        unset($csr_corp_follow['csr_corp_id']);
        
        $csr_corp_follow['csr_corp_follow_creator'] = $this->get_user_info('realname');

        if(!$this->utility->chk_id($csr_corp_id)) {
			$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
		}
        
        $data = $this->Csr_corp_model->get_by_id($csr_corp_id);
        if(count($data) !== 1) {
            $this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
        }
        if(!$this->is_csr_admin() && !$this->is_owner($this->get_user_info('realname'), $data)) {
            $this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
        }
        
        $ret = $this->Csr_corp_model->update_follow($csr_corp_id, $csr_corp_follow);
        if(!$ret) {
        		$this->json->output(array('success' => false, 'm' => '添加数据失败'));
        }
        
        $ret2 = $this->Csr_corp_model->insert_follow($csr_corp_id, $csr_corp_follow);
        if(!$ret2) {
        		$this->json->output(array('success' => false, 'm' => '添加数据失败'));
        }

        $this->json->output(array('success' => true, 'csr_corp_id' => $csr_corp_id));
    }
	function save() {
		$csr_corp = array(
			'csr_corp_id' => $this->input->post('csr_corp_id', true),
			'csr_corp_cat' => $this->input->post('csr_corp_cat', true),
			'csr_corp_cat_reason' => $this->input->post('csr_corp_cat_reason', true),
			'csr_corp_name' => $this->input->post('csr_corp_name', true),
			'csr_corp_bname' => $this->input->post('csr_corp_bname', true),
			'csr_corp_industry' => $this->input->post('csr_corp_industry', true),
			'csr_corp_addr_reg' => $this->input->post('csr_corp_addr_reg', true),
			'csr_corp_addr_main' => $this->input->post('csr_corp_addr_main', true),
			'csr_corp_regcpt' => $this->input->post('csr_corp_regcpt', true),
			'csr_corp_biz' => $this->input->post('csr_corp_biz', true),
			'csr_corp_web' => $this->input->post('csr_corp_web', true),
			'csr_corp_plusinfo' => $this->input->post('csr_corp_plusinfo', true),
			'csr_corp_director' => $this->input->post('csr_corp_director', true),
			'csr_corp_legalperson' => $this->input->post('csr_corp_legalperson', true),
			'csr_corp_CEO' => $this->input->post('csr_corp_CEO', true),
			'csr_corp_manager' => $this->input->post('csr_corp_manager', true),
			'csr_corp_contact1_name' => $this->input->post('csr_corp_contact1_name', true),
			'csr_corp_contact1_title' => $this->input->post('csr_corp_contact1_title', true),
			'csr_corp_contact1_phone' => $this->input->post('csr_corp_contact1_phone', true),
			'csr_corp_contact1_email' => $this->input->post('csr_corp_contact1_email', true),
			'csr_corp_contact1_CV' => $this->input->post('csr_corp_contact1_CV', true),
			'csr_corp_contact2_name' => $this->input->post('csr_corp_contact2_name', true),
			'csr_corp_contact2_title' => $this->input->post('csr_corp_contact2_title', true),
			'csr_corp_contact2_phone' => $this->input->post('csr_corp_contact2_phone', true),
			'csr_corp_contact2_email' => $this->input->post('csr_corp_contact2_email', true),
			'csr_corp_contact2_CV' => $this->input->post('csr_corp_contact2_CV', true),
			'csr_corp_contact3_name' => $this->input->post('csr_corp_contact3_name', true),
			'csr_corp_contact3_title' => $this->input->post('csr_corp_contact3_title', true),
			'csr_corp_contact3_phone' => $this->input->post('csr_corp_contact3_phone', true),
			'csr_corp_contact3_email' => $this->input->post('csr_corp_contact3_email', true),
			'csr_corp_contact3_CV' => $this->input->post('csr_corp_contact3_CV', true),
			'csr_corp_contact4_name' => $this->input->post('csr_corp_contact4_name', true),
			'csr_corp_contact4_title' => $this->input->post('csr_corp_contact4_title', true),
			'csr_corp_contact4_phone' => $this->input->post('csr_corp_contact4_phone', true),
			'csr_corp_contact4_email' => $this->input->post('csr_corp_contact4_email', true),
			'csr_corp_contact4_CV' => $this->input->post('csr_corp_contact4_CV', true),
			'csr_corp_contact5_name' => $this->input->post('csr_corp_contact5_name', true),
			'csr_corp_contact5_title' => $this->input->post('csr_corp_contact5_title', true),
			'csr_corp_contact5_phone' => $this->input->post('csr_corp_contact5_phone', true),
			'csr_corp_contact5_email' => $this->input->post('csr_corp_contact5_email', true),
			'csr_corp_contact5_CV' => $this->input->post('csr_corp_contact5_CV', true),
			'csr_corp_yearly_amount' => $this->input->post('csr_corp_yearly_amount', true),
			'csr_corp_FP_no' => $this->input->post('csr_corp_FP_no', true),
			'csr_corp_branch_no' => $this->input->post('csr_corp_branch_no', true),
			'csr_corp_biz_style' => $this->input->post('csr_corp_biz_style', true),
			'csr_corp_biz_dir_percent' => $this->input->post('csr_corp_biz_dir_percent', true),
			'csr_corp_biz_type' => $this->input->post('csr_corp_biz_type', true),
			'csr_corp_biz_partner' => $this->input->post('csr_corp_biz_partner', true),
			'csr_corp_biz_plusinfo' => $this->input->post('csr_corp_biz_plusinfo', true),
			'csr_corp_yearly_issue' => $this->input->post('csr_corp_yearly_issue', true),
			'csr_corp_IP_no' => $this->input->post('csr_corp_IP_no', true),
			'csr_corp_inv_style' => $this->input->post('csr_corp_inv_style', true),
			'csr_corp_inv_chtype' => $this->input->post('csr_corp_inv_chtype', true),
			'csr_corp_inv_case' => $this->input->post('csr_corp_inv_case', true),
			'csr_corp_inv_plusinfo' => $this->input->post('csr_corp_inv_plusinfo', true),
			'csr_corp_coop_partner' => $this->input->post('csr_corp_coop_partner', true),
			'csr_corp_coop_FSC_dir' => $this->input->post('csr_corp_coop_FSC_dir', true),
			'csr_corp_coop_FSC_wish' => $this->input->post('csr_corp_coop_FSC_wish', true),
			'csr_corp_follow' => $this->input->post('csr_corp_follow', true),
		);

		$csr_corp_id = $csr_corp['csr_corp_id'];
		unset($csr_corp['csr_corp_id']);
		$editor = element('loginname', $this->session->userdata('user'));
        
        $used_csr_corp=$this->Csr_corp_model->get_by_name($csr_corp['csr_corp_name']);
        $used_csr_corp_b=$this->Csr_corp_model->get_by_name($csr_corp['csr_corp_bname']);
        
		// create new record when id equals -1
		if($csr_corp_id == '-1') {
	        if($used_csr_corp->num_rows()>0||$used_csr_corp_b->num_rows()>0) {
    	        $this->json->output(array('success' => false, 'm' => '名称重复!'));
        	}
			$csr_corp['csr_corp_creator'] = $this->get_user_info('realname');
			$csr_corp['csr_corp_editor']  = $this->get_user_info('realname');
			$csr_corp['csr_corp_FSC_channel']  = $this->get_user_info('realname');
			$csr_corp_id = $this->Csr_corp_model->save($csr_corp);
		} else {
			if(!$this->utility->chk_id($csr_corp_id)) {
				$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
			}
	        if($used_csr_corp->num_rows()>1||$used_csr_corp_b->num_rows()>1) {
    	        $this->json->output(array('success' => false, 'm' => '名称重复!'));
        	}
			$csr_corp['csr_corp_editor']  = $this->get_user_info('realname');
			// only admin and owner can update the data
			$data = $this->Csr_corp_model->get_by_id($csr_corp_id);
			if(!$this->is_csr_admin() && !$this->is_owner($this->get_user_info('realname'), $data)) {
				$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
			}

			$ret = $this->Csr_corp_model->update($csr_corp_id, $csr_corp);
			if(!$ret) {
				$this->json->output(array('success' => false, 'm' => '添加数据失败'));
			}
		}
		$this->json->output(array('success' => true, 'csr_corp_id' => $csr_corp_id));
	}

	private function get_user_info($field) {
		$info = element($field, $this->session->userdata('user'));
		if($info === false) {
			return false;
		}
		return $info;
	}

	private function is_csr_admin() {
		if(!$this->User_model->has_action_access(element('loginname', $this->session->userdata('user')), 'csr_corp/save')) {
			return false;
		}
		return true;
	}

	private function is_owner($realname, $csr_corp) {
		if(empty($realname)) {
			return false;
		}
		if($csr_corp->csr_corp_FSC_channel == $realname || $csr_corp->csr_corp_FSC_pdt == $realname) {
			return true;
		}
		return false;
	}
}