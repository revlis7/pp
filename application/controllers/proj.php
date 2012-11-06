<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Proj extends Auth_Controller {
	function __construct() {
		parent::__construct();
	}
	
	function index() {
		$this->template->load('default', 'proj/view');
	}
	
	function manage() {
		$this->template->load('default', 'proj/manage');
	}
	
	function create() {
		$this->template->load('default', 'proj/create');
	}
	
	function update() {
		$this->template->load('default', 'proj/update');
	}
	
	//返回所有proj＋proj_detail的json数据
	function view() {
		$data = $this->Proj_model->get_all_proj_detail();
		echo $this->json->output(array('success' => true, 'data' => $data));
	}
	
	//返回所有proj的json数据
	function proj_view() {
		return null;
	}
	
	//返回proj下所有proj_detail的json数据
	function detail_view() {
		$proj_id = $this->input->get('proj_id', true);
		
		$data = $this->Proj_model->get_all_detail($proj_id);
		echo $this->json->output(array('success' => true, 'data' => $data));
	}
	
	//返回单条proj＋proj_detail的json数据
	function get() {
		return null;
	}
	
	//返回单条proj的json数据
	function proj_get() {
		$proj_id = $this->input->get('proj_id', true);
		
		$data = $this->Proj_model->get_proj($proj_id);
		echo $this->json->output(array('success' => true, 'data' => $data));
	}
	
	//返回单条proj_detail的json数据
	function detail_get() {
		return null;
	}
	
	function create_submit() {
		$total_share = $this->input->post('total_share', true);
		$status = $this->input->post('status', true);
		$exclusive = $this->input->post('exclusive', true);
		$grade = $this->input->post('grade', true);
		$category = $this->input->post('category', true);
		$sub_category = $this->input->post('sub_category', true);
		$issue = $this->input->post('issue', true);
		$name = $this->input->post('name', true);
		$flow_of_fund = $this->input->post('flow_of_fund', true);
		$highlights = $this->input->post('highlights', true);
		$month = $this->input->post('month', true);
		$scale = $this->input->post('scale', true);
		$cycle = $this->input->post('cycle', true);
		$amount = $this->input->post('amount', true);
		$profit_property = $this->input->post('profit_property', true);
		$profit = $this->input->post('profit', true);
		$manager = $this->input->post('manager', true);
		$remark = $this->input->post('remark', true);
		$commission_b_tax = $this->input->post('commission_b_tax', true);
		$commission_a_tax = $this->input->post('commission_a_tax', true);
		$inner_commission = $this->input->post('inner_commission', true);
		$outer_commission = $this->input->post('outer_commission', true);
		$pay = $this->input->post('pay', true);
		$paid = $this->input->post('paid', true);
		$found = $this->input->post('found', true);
		$quota = $this->input->post('quota', true);
		$quota_paid = $this->input->post('quota_paid', true);
		$quota_remain = $this->input->post('quota_remain', true);
		$main_channel = $this->input->post('main_channel', true);
		$channel_company = $this->input->post('channel_company', true);
		$channel_contact = $this->input->post('channel_contact', true);
		$billing_company = $this->input->post('billing_company', true);
		$manager_remark = $this->input->post('manager_remark', true);
		
		if(!$this->Data_model->create($total_share, $status, $exclusive, $grade, $category, $sub_category, $issue, $name, $flow_of_fund, $highlights, $month, $scale, $cycle, $amount, $profit_property, $profit, $manager, $remark, $commission_b_tax, $commission_a_tax, $inner_commission, $outer_commission, $pay, $paid, $found, $quota, $quota_paid, $quota_remain, $main_channel, $channel_company, $channel_contact, $billing_company, $manager_remark)) {
			$this->json->output(array('r' => 'error', 'm' => '添加数据失败'));
		}
		$this->json->output(array('r' => 'success'));
	}
	
	function delete_submit() {
		$id = $this->input->post('id', true);
	
		if(!$this->Data_model->delete($id)) {
			$this->json->output(array('r' => 'error', 'm' => '未找到符合的数据记录'));
		}
		
		$this->json->output(array('r' => 'success'));
	}
}