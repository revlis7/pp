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

	function proj_create() {
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

		$proj_id = $this->Proj_model->create_cproj($proj_name, $amount, $month, $profit_max, $profit_suggest, $guarantee_mode, $repayment, $proj_rel, $proj_deadline, $remark);
		if($proj_id === false) {
			$this->json->output(array('success' => false, 'm' => '添加数据失败'));
		}
		$this->json->output(array('success' => true, 'proj_id' => $proj_id));
	}

	function proj_delete() {
		$proj_id = $this->input->get('proj_id', true);

		if(!$this->utility->chk_id($proj_id)) {
			$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
		}

		if(!$this->Proj_model->delete_cproj($proj_id)) {
			$this->json->output(array('success' => false, 'm' => '未找到符合的数据记录'));
		}
		$this->json->output(array('success' => true));
	}

	function relation_create() {
		$proj_id = $this->input->post('proj_id', true);
		$company_id = $this->input->post('company_id', true);
		$status = $this->input->post('status', true);
		$contact_person = $this->input->post('contact_person', true);
		$update_ts = date('Y-m-d H:i:s', strtotime($this->input->post('update_ts', true)));
		$update_remark = $this->input->post('update_remark', true);

		$company = $this->Proj_model->get_company($company_id);
		if(empty($company)) {
			$this->json->output(array('success' => false, 'm' => '未找到符合的公司记录'));
		}

		$proj = $this->Proj_model->get_cproj($proj_id);
		if(empty($proj)) {
			$this->json->output(array('success' => false, 'm' => '未找到符合的项目记录'));
		}

		$relation_id = $this->Proj_model->create_relation($proj_id, $company_id, $status, $contact_person, $update_ts);
		if($relation_id === false) {
			$this->json->output(array('success' => false, 'm' => '添加数据失败'));
		}

		// save relation history
		$detail_id = $this->Proj_model->create_relation_detail($relation_id, $update_ts, $status, $update_remark);
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
}