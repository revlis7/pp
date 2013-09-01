<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Csr extends Auth_Controller {
	function __construct() {
		parent::__construct();
	}

	function index() {
		echo 'show template';
	}

	function corp_view() {
		$data = $this->Csr_corp_model->get_all()->result();
		$this->json->output(array('success' => true, 'data' => $data));
	}

	function corp_get() {
		$csr_corp_id = $this->input->get('csr_corp_id', true);

		if(!$this->utility->chk_id($csr_corp_id)) {
			$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
		}
		$data = $this->Csr_corp_model->get_by_id($csr_corp_id)->row();
		$this->json->output(array('success' => true, 'data' => $data));
	}

	function corp_save() {
		$csr_corp = array(
			'csr_corp_id' => $this->input->post('csr_corp_id', true),
			'csr_corp_cat' => $this->input->post('csr_corp_cat', true),
			'csr_corp_cat_reason' => $this->input->post('csr_corp_cat_reason', true),
			'csr_corp_name' => $this->input->post('csr_corp_name', true),
			'csr_corp_bname' => $this->input->post('csr_corp_bname', true),
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
			'csr_corp_FSC_channel' => $this->input->post('csr_corp_FSC_channel', true),
			'csr_corp_FSC_pdt' => $this->input->post('csr_corp_FSC_pdt', true),
			'csr_corp_FSC_follow_status' => $this->input->post('csr_corp_FSC_follow_status', true),
			'csr_corp_FSC_opp_and_prob' => $this->input->post('csr_corp_FSC_opp_and_prob', true),
			'csr_corp_FSC_solution' => $this->input->post('csr_corp_FSC_solution', true),
			'csr_corp_creator' => $this->input->post('csr_corp_creator', true),
			'csr_corp_create_ts' => $this->input->post('csr_corp_create_ts', true),
			'csr_corp_editor' => $this->input->post('csr_corp_editor', true),
			'csr_corp_update_ts' => $this->input->post('csr_corp_update_ts', true),
		);

		if($csr_corp['csr_corp_id'] == '-1') {
			unset($csr_corp['csr_corp_id']);
			$csr_corp_id = $this->Csr_corp_model->save($csr_corp);
		} else {
			if(!$this->utility->chk_id($csr_corp['csr_corp_id'])) {
				$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
			}
			$ret = $this->Csr_corp_model->update($csr_corp);
			if(!$ret) {
				$this->json->output(array('success' => false, 'm' => '添加数据失败'));
			}
		}
		$this->json->output(array('success' => true, 'csr_corp_id' => $csr_corp_id));
	}
}