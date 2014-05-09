<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Relation extends Auth_Controller {
	function __construct() {
		parent::__construct();

		if(!$this->User_model->has_relation_access(element('loginname', $this->session->userdata('user')))) {
			redirect(site_url('proj'), 'refresh');
		}
	}

	function index() {
		$this->template->load('default', 'relation/main');
	}

	function rlist() {
		$this->template->load('default', 'relation/list');
	}

    function company() {
		$data = $this->Proj_model->get_all_company();
		$this->json->output(array('success' => true, 'data' => $data));
	}

	function company_create() {
		$company_name = $this->input->post('company_name');
		$type = 'string';
		$remark = $this->input->post('remark');
		$creator = element('loginname', $this->session->userdata('user'));

		$company_id = $this->Proj_model->create_company($company_name, $type, $remark, $creator);
		if($company_id === false) {
			$this->json->output(array('success' => false, 'm' => '添加数据失败'));
		}
		$this->json->output(array('success' => true, 'company_id' => $company_id));
	}

	function company_delete() {
		$company_id = $this->input->get('company_id', true);

		if(!$this->utility->chk_id($company_id)) {
			$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
		}

		if(!$this->Proj_model->delete_company($company_id)) {
			$this->json->output(array('success' => false, 'm' => '未找到符合的数据记录'));
		}
		$this->json->output(array('success' => true));
	}

	function proj() {
		$data = $this->Proj_model->get_all_cproj();
		$n = count($data);
		for($i = 0; $i < $n; $i++) {
			$rel = $this->Proj_model->get_cproj_company_relation($data[$i]->id);
			$data[$i]->relation = $rel;
		}
		$this->json->output(array('success' => true, 'data' => $data));
	}
    
    function get_submit(){
        $proj_id = $this->input->get('proj_id',true);
		if(!$this->utility->chk_id($proj_id)) {
			$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
		}
        $data = $this->Proj_model->get_cproj($proj_id);
        unset($data->id);
        $data->proj_id=$proj_id;
        $this->json->output(array('success' => true, 'data' => $data));
    }
    function proj_detail(){
        $mode = $this->input->get('mode',true);
        $page = $this->input->get('page', true);
        $start = $this->input->get('start', true);
        $limit = $this->input->get('limit', true);
        $sort = $this->input->get('sort', true);
        $dir = $this->input->get('dir', true);
        $query = $this->input->get('query', true);
        $recentMode = $this->input->get('recentMode', true);
        $FSCChannel = $this->input->get('FSCChannel', true);
        $PStart = $this->input->get('PStart', true);
        $PEnd = $this->input->get('PEnd', true);
        $LastFollow = $this->input->get('lastFollow', true);
        $endMode = $this->input->get('endMode',true);
        
        $mode = $mode > 0 ? $mode : -1;
        $page = $page >= 0 ? $page : -1;
        $start = $start >= 0 ? $start : -1;
        $limit = $limit >= 0 ? $limit : -1;
        
        if($endMode>0) {
            $endMode=1;
        } else if($endMode<0) {
            $endMode=-1;
        } else {
            $endMode=0;
        }

        //if(!$this->utility->chk_loginname($sort) && !empty($sort)) {
        //	$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
        //}

        if(!$dir=='ASC' && !$dir=='DESC' && !empty($dir)) {
            $this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
        }

        if($FSCChannel=='null'){
            $FSCChannel='';
        }
        
        if(!in_array($FSCChannel,$this->User_model->get_all_reporters()) && !$this->is_cproj_admin()) {
        	$FSCChannel='';   
        }
        if($mode>0){
            if($this->is_cproj_admin()) {
            	$data = $this->Proj_model->get_all_cproj_detail($start,$limit,$sort,$dir,$query,$recentMode,$FSCChannel,$PStart,$PEnd,$LastFollow,$endMode);
            	$totalCount = $this->Proj_model->get_all_cproj_detail_rownum($query,$recentMode,$FSCChannel,$PStart,$PEnd,$LastFollow,$endMode);
            } else {
                $append_users= $this->User_model->get_all_reporters();
				$data = $this->Proj_model->get_cproj_detail_by_owner($this->get_user_info('realname'),$append_users,$start,$limit,$sort,$dir,$query,$recentMode,$FSCChannel,$PStart,$PEnd,$LastFollow,$endMode);
        	    $totalCount = $this->Proj_model->get_cproj_detail_by_owner_rownum($this->get_user_info('realname'),$append_users,$query,$recentMode,$FSCChannel,$PStart,$PEnd,$LastFollow,$endMode);
            }
        } else {
			$data = $this->Proj_model->get_cproj_detail_by_owner($this->get_user_info('realname'),'',$start,$limit,$sort,$dir,$query,$recentMode,$FSCChannel,$PStart,$PEnd,$LastFollow,$endMode);
            $totalCount = $this->Proj_model->get_cproj_detail_by_owner_rownum($this->get_user_info('realname'),'',$query,$recentMode,$FSCChannel,$PStart,$PEnd,$LastFollow,$endMode);
        }
		$this->json->output(array('success' => true,'totalCount'=>$totalCount,'data' => $data));
        //$data=$this->Proj_model->get_all_cproj_detail();
        //$this->json->output(array('success' => true, 'data' => $data));
    }

	function proj_create() {
		$csr_financing_name = $this->input->post('csr_financing_name');
		$csr_financing_id = $this->input->post('csr_financing_id');
		$proj_name = $this->input->post('proj_name');
		$amount = $this->input->post('amount');
		$month = $this->input->post('month');
		$profit_max = $this->input->post('profit_max');
		$profit_suggest = $this->input->post('profit_suggest');
		$guarantee_mode = $this->input->post('guarantee_mode');
		$repayment = $this->input->post('repayment');
		$proj_rel = $this->input->post('proj_rel');
		$proj_deadline = $this->input->post('proj_deadline');
		$remark = $this->input->post('remark');
		$cproj_intro = $this->input->post('cproj_intro');
		$cproj_director = $this->input->post('cproj_director');
		$cproj_manager = $this->input->post('cproj_manager');
        
		if(!$this->utility->chk_id($csr_financing_id)) {
			$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
		}
        $csr_financing=$this->Csr_financing_model->get_by_id($csr_financing_id)->row();
        
    if($csr_financing->csr_financing_name != $csr_financing_name && !$this->is_cproj_admin() && !$this->is_financing_owner($this->get_user_info('realname'), $csr_financing)) {
			$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
    }

		$proj_id = $this->Proj_model->create_cproj($proj_name, $amount, $month, $profit_max, $profit_suggest, $guarantee_mode, $repayment, $proj_rel, $proj_deadline, $remark,$csr_financing_name,$csr_financing_id,$cproj_intro,$cproj_director,$cproj_manager);
		if($proj_id === false) {
			$this->json->output(array('success' => false, 'm' => '添加数据失败'));
		}
		$this->json->output(array('success' => true, 'proj_id' => $proj_id));
	}
	
	function proj_update_submit() {
		$proj_id = $this->input->post('proj_id');
		$csr_financing_name = $this->input->post('csr_financing_name');
		$csr_financing_id = $this->input->post('csr_financing_id');
		$proj_name = $this->input->post('proj_name');
		$amount = $this->input->post('amount');
		$month = $this->input->post('month');
		$profit_max = $this->input->post('profit_max');
		$profit_suggest = $this->input->post('profit_suggest');
		$guarantee_mode = $this->input->post('guarantee_mode');
		$repayment = $this->input->post('repayment');
		$proj_rel = $this->input->post('proj_rel');
		$proj_deadline = $this->input->post('proj_deadline');
		$remark = $this->input->post('remark');
		$cproj_intro = $this->input->post('cproj_intro');
		$cproj_director = $this->input->post('cproj_director');
		$cproj_manager = $this->input->post('cproj_manager');
        
		if(!$this->utility->chk_id($proj_id)) {
			$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
		}
		
		$cproj=$this->Proj_model->get_cproj($proj_id);
		if(!$this->is_cproj_admin() && !$this->is_owner($this->get_user_info('realname'), $cproj)) {
			$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
		}

        if( $this->Proj_model->update_cproj($proj_id, $proj_name, $amount, $month, $profit_max, $profit_suggest, $guarantee_mode, $repayment, $proj_rel, $proj_deadline, $remark,$csr_financing_name,$csr_financing_id,$cproj_intro,$cproj_director,$cproj_manager) ){
			$this->json->output(array('success' => true, 'proj_id' => $proj_id));
		}
		$this->json->output(array('success' => false, 'm' => '更新失败'));
	}

	function proj_finish_submit() {
		$proj_id = $this->input->get('proj_id', true);

		if(!$this->utility->chk_id($proj_id)) {
			$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
		}

		if(!$this->Proj_model->finish_cproj($proj_id)) {
			$this->json->output(array('success' => false, 'm' => '未找到符合的数据记录'));
		}
		$this->json->output(array('success' => true));
	}

	function relation_create() {
		$proj_id = $this->input->post('proj_id', true);
		$csr_provider_id = $this->input->post('csr_provider_id', true);
		$csr_provider_name = $this->input->post('csr_provider_name', true);
		$status = $this->input->post('status', true);
		$contact_person = $this->input->post('contact_person', true);
        //$update_ts = date('Y-m-d H:i:s', strtotime($this->input->post('update_ts', true)));
		$update_remark = $this->input->post('update_remark', true);

		$csr_provider = $this->Csr_provider_model->get_by_id($csr_provider_id);
		if(empty($csr_provider)) {
			$this->json->output(array('success' => false, 'm' => '未找到符合的公司记录'));
		}

		$proj = $this->Proj_model->get_cproj($proj_id);
		if(empty($proj)) {
			$this->json->output(array('success' => false, 'm' => '未找到符合的项目记录'));
		}

        $relation_id = $this->Proj_model->create_relation($proj_id, $csr_provider_id, $csr_provider_name, $status, $contact_person/*, $update_ts*/);
		if($relation_id === false) {
			$this->json->output(array('success' => false, 'm' => '添加数据失败'));
		}

		// save relation history
        $detail_id = $this->Proj_model->create_relation_detail($relation_id, /*$update_ts,*/ $status, $update_remark);
		if($detail_id === false) {
			$this->json->output(array('success' => false, 'm' => '添加数据失败'));
		}

		$this->json->output(array('success' => true, 'relation_id' => $relation_id));
	}

	function relation_update() {
		$proj_id = $this->input->post('proj_id', true);
		$company_id = $this->input->post('company_id', true);

		$status = $this->input->post('status', true);
		$update_ts = date('Y-m-d H:i:s', strtotime($this->input->post('update_ts', true)));
		$update_remark = $this->input->post('update_remark', true);

		$relation_id = $this->Proj_model->get_relation_id($proj_id, $company_id);
		if($relation_id === false) {
			$this->json->output(array('success' => false, 'm' => '添加数据失败'));
		}

		// save relation history
		$detail_id = $this->Proj_model->create_relation_detail($relation_id, $update_ts, $status, $update_remark);
		if($detail_id === false) {
			$this->json->output(array('success' => false, 'm' => '添加数据失败'));
		}

		$result = $this->Proj_model->update_relation($relation_id, $status, $update_ts);
		if($result == false) {
			$this->json->output(array('success' => false, 'm' => '添加数据失败'));
		}
		$this->json->output(array('success' => true));
	}

	function relation_delete() {
		$relation_id = $this->input->get('relation_id');

		if(!$this->utility->chk_id($relation_id)) {
			$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
		}

		if(!$this->Proj_model->delete_relation($relation_id)) {
			$this->json->output(array('success' => false, 'm' => '未找到符合的数据记录'));
		}
		$this->json->output(array('success' => true));
	}

	function detail() {
		$relation_id = $this->input->get('relation_id');

		if(!$this->utility->chk_id($relation_id)) {
			$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
		}
		
		$data = $this->Proj_model->get_relation_detail($relation_id);
		$this->json->output(array('success' => true, 'data' => $data));
	}

	function detail_delete() {
		$detail_id = $this->input->get('detail_id', true);

		if(!$this->utility->chk_id($detail_id)) {
			$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
		}

		if(!$this->Proj_model->delete_relation_detail($detail_id)) {
			$this->json->output(array('success' => false, 'm' => '未找到符合的数据记录'));
		}
		$this->json->output(array('success' => true));
	}
	private function is_cproj_admin() {
		if(!$this->User_model->has_action_access(element('loginname', $this->session->userdata('user')), 'csr_financing/save')) {
			return false;
		}
		return true;
	}

	private function get_user_info($field) {
		$info = element($field, $this->session->userdata('user'));
		if($info === false) {
			return false;
		}
		return $info;
	}
	
	private function is_owner($realname,$cproj) {
		if(empty($realname)) {
			return false;
		}
		if($cproj->cproj_director == $realname || $cproj->cproj_manager == $realname) {
			return true;
		}
		return false;
	}
	private function is_financing_owner($realname, $csr_financing) {
		if(empty($realname)) {
			return false;
		}
		if($csr_financing->csr_financing_FSC_channel == $realname || $csr_financing->csr_financing_FSC_pdt == $realname) {
			return true;
		}
		return false;
	}
}