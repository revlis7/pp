<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Csr_channel extends Auth_Controller {
	function __construct() {
		parent::__construct();
	}

	function index() {
		echo 'show template';
	}

	function view() {
		$data = $this->Csr_channel_model->get_all()->result();
		$this->json->output(array('success' => true, 'data' => $data));
	}

	function get() {
		$csr_channel_id = $this->input->get('csr_channel_id', true);

		if(!$this->utility->chk_id($csr_channel_id)) {
			$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
		}

		$data = $this->Csr_channel_model->get_by_id($csr_channel_id)->row();
		$this->json->output(array('success' => true, 'data' => $data));
	}

	function save() {
		$csr_channel = array(
			'csr_channel_id' => $this->input->post('csr_channel_id', true),
			'csr_channel_cat' => $this->input->post('csr_channel_cat', true),
			'csr_channel_reason' => $this->input->post('csr_channel_reason', true),
			'csr_channel_name' => $this->input->post('csr_channel_name', true),
			'csr_channel_gender' => $this->input->post('csr_channel_gender', true),
			'csr_channel_age' => $this->input->post('csr_channel_age', true),
			'csr_channel_hometown' => $this->input->post('csr_channel_hometown', true),
			'csr_channel_telephone' => $this->input->post('csr_channel_telephone', true),
			'csr_channel_mobile' => $this->input->post('csr_channel_mobile', true),
			'csr_channel_qq' => $this->input->post('csr_channel_qq', true),
			'csr_channel_wechat' => $this->input->post('csr_channel_wechat', true),
			'csr_channel_email' => $this->input->post('csr_channel_email', true),
			'csr_channel_interests' => $this->input->post('csr_channel_interests', true),
			'csr_channel_proper_comm' => $this->input->post('csr_channel_proper_comm', true),
			'csr_channel_person_plusinfo' => $this->input->post('csr_channel_person_plusinfo', true),
			'csr_channel_industry' => $this->input->post('csr_channel_industry', true),
			'csr_channel_corp_name' => $this->input->post('csr_channel_corp_name', true),
			'csr_channel_corp_depart' => $this->input->post('csr_channel_corp_depart', true),
			'csr_channel_corp_title' => $this->input->post('csr_channel_corp_title', true),
			'csr_channel_past_work' => $this->input->post('csr_channel_past_work', true),
			'csr_channel_edu' => $this->input->post('csr_channel_edu', true),
			'csr_channel_prof_plusinfo' => $this->input->post('csr_channel_prof_plusinfo', true),
			'csr_channel_csr_type' => $this->input->post('csr_channel_csr_type', true),
			'csr_channel_csr_style' => $this->input->post('csr_channel_csr_style', true),
			'csr_channel_pdt_channel' => $this->input->post('csr_channel_pdt_channel', true),
			'csr_channel_coop_FSC_dir' => $this->input->post('csr_channel_coop_FSC_dir', true),
			'csr_channel_coop_FSC_wish' => $this->input->post('csr_channel_coop_FSC_wish', true),
			'csr_channel_follow' => $this->input->post('csr_channel_follow', true),
			'csr_channel_FSC_channel' => $this->input->post('csr_channel_FSC_channel', true),
			'csr_channel_FSC_follow_status' => $this->input->post('csr_channel_FSC_follow_status', true),
			'csr_channel_FSC_opp_and_prob' => $this->input->post('csr_channel_FSC_opp_and_prob', true),
			'csr_channel_FSC_solution' => $this->input->post('csr_channel_FSC_solution', true),
		);

		$editor = element('loginname', $this->session->userdata('user'));

		// create new record when id equals -1
		if($csr_channel['csr_channel_id'] == '-1') {
			unset($csr_channel['csr_channel_id']);
			$csr_channel['csr_channel_creator'] = $editor;
			$csr_channel['csr_channel_editor']  = $editor;
			$csr_channel_id = $this->Csr_channel_model->save($csr_channel);
		} else {
			if(!$this->utility->chk_id($csr_channel['csr_channel_id'])) {
				$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
			}
			$csr_channel['csr_channel_editor']  = $editor;
			$ret = $this->Csr_channel_model->update($csr_channel);
			if(!$ret) {
				$this->json->output(array('success' => false, 'm' => '添加数据失败'));
			}
		}
		$this->json->output(array('success' => true, 'csr_channel_id' => $csr_channel_id));
	}
}