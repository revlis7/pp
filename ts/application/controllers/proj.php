<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Proj extends Auth_Controller {
	function __construct() {
		parent::__construct();
	}
	
	function index() {
		$this->template->load('default', 'proj/view');
	}
	
	function manage() {
		if(!$this->_has_privilege()) {
			redirect(site_url(), 'refresh');
		}
		$this->template->load('default', 'proj/manage');
	}
	
	function create() {
		if(!$this->_has_privilege()) {
			redirect(site_url(), 'refresh');
		}
		$this->template->load('default', 'proj/create');
	}
	
	function update() {
		if(!$this->_has_privilege()) {
			redirect(site_url(), 'refresh');
		}
		
		$proj_id = $this->input->get('proj_id', true);
		
		if($this->utility->is_pm() && $this->Proj_model->get_proj_creator($proj_id) !== element('loginname', $this->session->userdata('user'))) {
			redirect(site_url('proj/manage'), 'refresh');
		}
		$this->template->load('default', 'proj/update');
	}
	
	//返回所有proj＋proj_detail的json数据
	function view() {
		$data = $this->Proj_model->get_all_proj_detail();
		$temp = array();
		$group = $this->utility->get_user_group();
		foreach($data as $_t) {
			$temp[] = $this->utility->access_fields_filter($group, $_t);
		}
		echo $this->json->output(array('success' => true, 'data' => $temp));
	}
	
	//返回所有proj的json数据
	//function proj_view() {
	//	return null;
	//}
	
	//返回proj下所有proj_detail的json数据
	function detail_view() {
		$proj_id = $this->input->get('proj_id', true);
		
		$data = $this->Proj_model->get_all_detail($proj_id);
		echo $this->json->output(array('success' => true, 'data' => $data));
	}
	
	//返回单条proj＋proj_detail的json数据
	//function get() {
	//	return null;
	//}
	
	//返回单条proj的json数据
	function proj_get() {
		$proj_id = $this->input->get('proj_id', true);
		$data = $this->Proj_model->get_proj($proj_id);
		$data->proj_id = $data->id;
		unset($data->id);
		echo $this->json->output(array('success' => true, 'data' => $data));
	}
	
	//返回单条proj_detail的json数据
	//function detail_get() {
	//	return null;
	//}
	
	function proj_create_submit() {
		if(!$this->_has_privilege()) {
			$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
		}
		//$total_share = $this->input->post('total_share', true);
		//$status = $this->input->post('status', true);
		//$exclusive = $this->input->post('exclusive', true);
		//$grade = $this->input->post('grade', true);
		$category = $this->input->post('category', true);
		$sub_category = $this->input->post('sub_category', true);
		$issue = $this->input->post('issue', true);
		$name = $this->input->post('name', true);
		$flow_of_fund = $this->input->post('flow_of_fund', true);
		$highlights = $this->input->post('highlights', true);
		$month = $this->input->post('month', true);
		$scale = $this->input->post('scale', true);
		$cycle = $this->input->post('cycle', true);
		//$amount = $this->input->post('amount', true);
		$profit_property = $this->input->post('profit_property', true);
		//$profit = $this->input->post('profit', true);
		$manager = $this->input->post('manager', true);
		$contract = $this->input->post('contract', true);
		$remark = $this->input->post('remark', true);
		//$commission_b_tax = $this->input->post('commission_b_tax', true);
		//$commission_a_tax = $this->input->post('commission_a_tax', true);
		//$inner_commission = $this->input->post('inner_commission', true);
		//$outer_commission = $this->input->post('outer_commission', true);
		//$pay = $this->input->post('pay', true);
		//$paid = $this->input->post('paid', true);
		$found = $this->input->post('found', true);
		//$quota = $this->input->post('quota', true);
		//$quota_paid = $this->input->post('quota_paid', true);
		//$quota_remain = $this->input->post('quota_remain', true);
		//$main_channel = $this->input->post('main_channel', true);
		//$channel_company = $this->input->post('channel_company', true);
		//$channel_contact = $this->input->post('channel_contact', true);
		//$billing_company = $this->input->post('billing_company', true);
		//$manager_remark = $this->input->post('manager_remark', true);
		
		$proj_id = $this->Proj_model->create_proj($category, $sub_category, $issue, $name, $flow_of_fund, $highlights, $month, $scale, $cycle, $profit_property, $manager, $contract, $remark, $found, element('loginname', $this->session->userdata('user')));
		if($proj_id === false) {
			$this->json->output(array('success' => false, 'm' => '添加数据失败'));
		}
		$this->json->output(array('success' => true, 'proj_id' => $proj_id));
	}
	
	function proj_update_submit() {
		if(!$this->_has_privilege()) {
			$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
		}
		
		$proj_id = $this->input->post('proj_id', true);
		$category = $this->input->post('category', true);
		$sub_category = $this->input->post('sub_category', true);
		$issue = $this->input->post('issue', true);
		$name = $this->input->post('name', true);
		$flow_of_fund = $this->input->post('flow_of_fund', true);
		$highlights = $this->input->post('highlights', true);
		$month = $this->input->post('month', true);
		$scale = $this->input->post('scale', true);
		$cycle = $this->input->post('cycle', true);
		$profit_property = $this->input->post('profit_property', true);
		$manager = $this->input->post('manager', true);
		$contract = $this->input->post('contract', true);
		$remark = $this->input->post('remark', true);
		$found = $this->input->post('found', true);
		
		if($this->utility->is_pm() && $this->Proj_model->get_proj_creator($proj_id) !== element('loginname', $this->session->userdata('user'))) {
			$this->json->output(array('success' => false, 'm' => '您不能对他人的记录进行操作'));
		}
		
		$proj_id = $this->Proj_model->update_proj($proj_id, $category, $sub_category, $issue, $name, $flow_of_fund, $highlights, $month, $scale, $cycle, $profit_property, $manager, $contract, $remark, $found, element('loginname', $this->session->userdata('user')));
		if($proj_id === false) {
			$this->json->output(array('success' => false, 'm' => '修改数据失败'));
		}
		$this->json->output(array('success' => true, 'proj_id' => $proj_id));
	}
	
	function detail_create_submit() {
		if(!$this->_has_privilege()) {
			$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
		}
		$proj_id = $this->input->post('proj_id', true);
		$proj_detail_id = $this->input->post('proj_detail_id', true);
		$total_share = $this->input->post('total_share', true);
		$status = $this->input->post('status', true);
		$exclusive = $this->input->post('exclusive', true);
		$grade = $this->input->post('grade', true);
		$amount = $this->input->post('amount', true);
		$profit = $this->input->post('profit', true);
		$commission_b_tax = $this->input->post('commission_b_tax', true);
		$commission_a_tax = $this->input->post('commission_a_tax', true);
		$inner_commission = $this->input->post('inner_commission', true);
		$outer_commission = $this->input->post('outer_commission', true);
		$pay = $this->input->post('pay', true);
		$paid = $this->input->post('paid', true);
		$quota = $this->input->post('quota', true);
		$quota_paid = $this->input->post('quota_paid', true);
		$quota_remain = $this->input->post('quota_remain', true);
		$main_channel = $this->input->post('main_channel', true);
		$channel_company = $this->input->post('channel_company', true);
		$channel_contact = $this->input->post('channel_contact', true);
		$billing_company = $this->input->post('billing_company', true);
		$manager_remark = $this->input->post('manager_remark', true);
		
		if($this->utility->is_pm() && $this->Proj_model->get_proj_creator($proj_id) !== element('loginname', $this->session->userdata('user'))) {
			$this->json->output(array('success' => false, 'm' => '您不能对他人的记录进行操作'));
		}
		
		if($proj_detail_id != '-1') {
			$proj_detail_id = $this->Proj_model->update_detail($proj_detail_id, $total_share, $status, $exclusive, $grade, $amount, $profit, $commission_b_tax, $commission_a_tax, $inner_commission, $outer_commission, $pay, $paid, $quota, $quota_paid, $quota_remain, $main_channel, $channel_company, $channel_contact, $billing_company, $manager_remark, element('loginname', $this->session->userdata('user')));
		} else {
			$proj_detail_id = $this->Proj_model->create_detail($proj_id, $total_share, $status, $exclusive, $grade, $amount, $profit, $commission_b_tax, $commission_a_tax, $inner_commission, $outer_commission, $pay, $paid, $quota, $quota_paid, $quota_remain, $main_channel, $channel_company, $channel_contact, $billing_company, $manager_remark, element('loginname', $this->session->userdata('user')));
		}
		
		if($proj_detail_id === false) {
			$this->json->output(array('success' => false, 'm' => '添加数据失败'));
		}
		$this->json->output(array('success' => true, 'proj_detail_id' => $proj_detail_id));
	}
	
	function proj_delete_submit() {
		if(!$this->_has_privilege()) {
			$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
		}
		
		$proj_id = $this->input->post('proj_id', true);
		
		if($this->utility->is_pm() && $this->Proj_model->get_proj_creator($proj_id) !== element('loginname', $this->session->userdata('user'))) {
			$this->json->output(array('success' => false, 'm' => '您不能对他人的记录进行操作'));
		}
		
		if(!$this->Data_model->delete_proj($proj_id)) {
			$this->json->output(array('success' => false, 'm' => '未找到符合的数据记录'));
		}
		$this->json->output(array('success' => true));
	}
	
	function detail_delete_submit() {
		if(!$this->_has_privilege()) {
			$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
		}
		
		$proj_detail_id = $this->input->post('proj_detail_id', true);
		
		$proj_detail = $this->Proj_model->get_detail($proj_detail_id);
		if($this->utility->is_pm() && $this->Proj_model->get_proj_creator($proj_detail->proj_id) !== element('loginname', $this->session->userdata('user'))) {
			$this->json->output(array('success' => false, 'm' => '您不能对他人的记录进行操作'));
		}
		
		if(!$this->Proj_model->delete_detail($proj_detail_id)) {
			$this->json->output(array('success' => false, 'm' => '未找到符合的数据记录'));
		}
		$this->json->output(array('success' => true));
	}
	
	private function _has_privilege() {
		if(!$this->utility->is_admin() && !$this->utility->is_pm()) {
			return false;
		}
		return true;
	}
}