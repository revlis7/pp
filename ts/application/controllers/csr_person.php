<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Csr_person extends Auth_Controller {
	function __construct() {
		parent::__construct();
	}

	function index() {
		$this->template->load('default', 'csr/view');
	}

	function view() {
		if($this->is_csr_admin()) {
			$data = $this->Csr_person_model->get_all()->result();
		} else {
			$data = $this->Csr_person_model->get_by_owner($this->get_user_info('realname'))->result();
		}
		$this->json->output(array('success' => true, 'data' => $data));
	}

	function get() {
		$csr_person_id = $this->input->get('csr_person_id', true);

		if(!$this->utility->chk_id($csr_person_id)) {
			$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
		}

		// only admin and owner can see the data
		$data = $this->Csr_person_model->get_by_id($csr_person_id)->row();
		if(!$this->is_csr_admin() && !$this->is_owner($this->get_user_info('realname'), $data)) {
			$data = array();
		}
		$this->json->output(array('success' => true, 'data' => $data));
	}

	function save() {
		$csr_person = array(
			'csr_person_id' => $this->input->post('csr_person_id', true),
			'csr_person_cat' => $this->input->post('csr_person_cat', true),
			'csr_person_cat_reason' => $this->input->post('csr_person_cat_reason', true),
			'csr_person_name' => $this->input->post('csr_person_name', true),
			'csr_person_gender' => $this->input->post('csr_person_gender', true),
			'csr_person_age' => $this->input->post('csr_person_age', true),
			'csr_person_hometown' => $this->input->post('csr_person_hometown', true),
			'csr_person_telephone' => $this->input->post('csr_person_telephone', true),
			'csr_person_mobile' => $this->input->post('csr_person_mobile', true),
			'csr_person_qq' => $this->input->post('csr_person_qq', true),
			'csr_person_wechat' => $this->input->post('csr_person_wechat', true),
			'csr_person_email' => $this->input->post('csr_person_email', true),
			'csr_person_varcharerests' => $this->input->post('csr_person_varcharerests', true),
			'csr_person_proper_comm' => $this->input->post('csr_person_proper_comm', true),
			'csr_person_plusinfo' => $this->input->post('csr_person_plusinfo', true),
			'csr_person_corp_industry' => $this->input->post('csr_person_corp_industry', true),
			'csr_person_corp_name' => $this->input->post('csr_person_corp_name', true),
			'csr_person_corp_property' => $this->input->post('csr_person_corp_property', true),
			'csr_person_corp_title' => $this->input->post('csr_person_corp_title', true),
			'csr_person_past_work' => $this->input->post('csr_person_past_work', true),
			'csr_person_edu' => $this->input->post('csr_person_edu', true),
			'csr_person_prof_plusinfo' => $this->input->post('csr_person_prof_plusinfo', true),
			'csr_person_marriage' => $this->input->post('csr_person_marriage', true),
			'csr_person_child' => $this->input->post('csr_person_child', true),
			'csr_person_child_no' => $this->input->post('csr_person_child_no', true),
			'csr_person_child1_age' => $this->input->post('csr_person_child1_age', true),
			'csr_person_child2_age' => $this->input->post('csr_person_child2_age', true),
			'csr_person_family_plusinfo' => $this->input->post('csr_person_family_plusinfo', true),
			'csr_person_income_p' => $this->input->post('csr_person_income_p', true),
			'csr_person_assets_p' => $this->input->post('csr_person_assets_p', true),
			'csr_person_income_h' => $this->input->post('csr_person_income_h', true),
			'csr_person_assets_h' => $this->input->post('csr_person_assets_h', true),
			'csr_person_financial_dicision' => $this->input->post('csr_person_financial_dicision', true),
			'csr_person_financial_plusinfo' => $this->input->post('csr_person_financial_plusinfo', true),
			'csr_person_assets_estate' => $this->input->post('csr_person_assets_estate', true),
			'csr_person_assets_trusts' => $this->input->post('csr_person_assets_trusts', true),
			'csr_person_assets_fixed' => $this->input->post('csr_person_assets_fixed', true),
			'csr_person_assets_stock' => $this->input->post('csr_person_assets_stock', true),
			'csr_person_assets_PE' => $this->input->post('csr_person_assets_PE', true),
			'csr_person_assets_float' => $this->input->post('csr_person_assets_float', true),
			'csr_person_assets_other' => $this->input->post('csr_person_assets_other', true),
			'csr_person_assets_oversea' => $this->input->post('csr_person_assets_oversea', true),
			'csr_person_assets_plusinfo' => $this->input->post('csr_person_assets_plusinfo', true),
			'csr_person_financial_pref' => $this->input->post('csr_person_financial_pref', true),
			'csr_person_financial_demand' => $this->input->post('csr_person_financial_demand', true),
			'csr_person_financial_channel' => $this->input->post('csr_person_financial_channel', true),
			'csr_person_offer_pdt' => $this->input->post('csr_person_offer_pdt', true),
			'csr_person_offer_mode' => $this->input->post('csr_person_offer_mode', true),
			'csr_person_FSC_channel' => $this->input->post('csr_person_FSC_channel', true),
			'csr_person_FSC_follow_status' => $this->input->post('csr_person_FSC_follow_status', true),
			'csr_person_FSC_opp_and_prob' => $this->input->post('csr_person_FSC_opp_and_prob', true),
			'csr_person_FSC_solution' => $this->input->post('csr_person_FSC_solution', true),
			'csr_person_creator' => $this->input->post('csr_person_creator', true),
			'csr_person_create_ts' => $this->input->post('csr_person_create_ts', true),
			'csr_person_editor' => $this->input->post('csr_person_editor', true),
			'csr_person_update_ts' => $this->input->post('csr_person_update_ts', true),
		);

		$csr_person_id = $csr_person['csr_person_id'];
		unset($csr_person['csr_person_id']);
		$editor = element('loginname', $this->session->userdata('user'));

		// create new record when id equals -1
		if($csr_person_id == '-1') {
			$csr_person['csr_person_creator'] = $editor;
			$csr_person['csr_person_editor']  = $editor;
			$csr_person_id = $this->Csr_person_model->save($csr_person);
		} else {
			if(!$this->utility->chk_id($csr_person_id)) {
				$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
			}
			$csr_person['csr_person_editor']  = $editor;
			// only admin and owner can update the data
			$data = $this->Csr_person_model->get_by_id($csr_person_id)->row();
			if(!$this->is_csr_admin() && !$this->is_owner($this->get_user_info('realname'), $data)) {
				$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
			}

			$ret = $this->Csr_person_model->update($csr_person_id, $csr_person);
			if(!$ret) {
				$this->json->output(array('success' => false, 'm' => '添加数据失败'));
			}
		}
		$this->json->output(array('success' => true, 'csr_person_id' => $csr_person_id));
	}

	private function get_user_info($field) {
		$info = element($field, $this->session->userdata('user'));
		if($info === false) {
			return false;
		}
		return $info;
	}

	private function is_csr_admin() {
		if(!$this->User_model->has_action_access(element('loginname', $this->session->userdata('user')), 'csr_person/save')) {
			return false;
		}
		return true;
	}

	private function is_owner($realname, $csr_person) {
		if(empty($realname)) {
			return false;
		}
		if($csr_person->csr_person_FSC_channel == $realname) {
			return true;
		}
		return false;
	}
}