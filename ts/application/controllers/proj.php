<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Proj extends Auth_Controller {
	function __construct() {
		parent::__construct();
	}

	function index() {
		$this->template->load('default', 'proj/view');
	}
	
	function manage() {
		if(!$this->has_privilege()) {
			redirect(site_url(), 'refresh');
		}
		$this->template->load('default', 'proj/manage');
	}
	
	function create() {
		if(!$this->has_privilege()) {
			redirect(site_url(), 'refresh');
		}
		$this->template->load('default', 'proj/create');
	}
	
	function update() {
		if(!$this->has_privilege()) {
			redirect(site_url(), 'refresh');
		}
		
		$proj_id = $this->input->get('proj_id', true);
		
		if($this->utility->is_pm() && $this->Proj_model->get_proj_manager($proj_id) !== $this->get_user_info('realname')) {
			redirect(site_url('proj/manage'), 'refresh');
		}
		$this->template->load('default', 'proj/update');
	}
	
	//返回所有proj＋proj_detail的json数据
	function view() {
		$category_id   = $this->input->get('c');
		$ending_status = $this->input->get('e');
		$recently      = $this->input->get('r') ? true : false;
		$manage_mode   = ($this->input->get('m') && $this->has_privilege()) ? true : false;

		$category_id   = $category_id >= 1 ? $category_id : -1;
		$ending_status = $ending_status >= 1 ? $ending_status : -1;

		$data = $this->Proj_model->get_all_proj_detail($category_id, $ending_status, $recently, $manage_mode, $this->get_user_info('realname'));

		//viewonly模式过滤部分字段
		if(!$manage_mode) {
			foreach($data as $_t) {
				unset($_t->main_channel, $_t->channel_company, $_t->channel_contact, $_t->billing_company, $_t->manager_remark);
			}
		}

		//根据用户组过滤可见信息
		$group = $this->utility->get_user_group();
		foreach($data as $_t) {
			$this->utility->access_fields_filter($group, $_t);
		}

		//对于项目经理组，不属于登录用户自己创建的记录需要过滤部分字段
		if($this->utility->is_pm()) {
			$n = count($data);
			for($i = 0; $i < $n; $i++) {
				if($data[$i]->manager != $this->get_user_info('realname')) {
					$this->utility->manager_view_filter($data[$i]);
				}
			}
		}

		$format = $this->input->get('format', true);
		if($format == 'csv') {
			$this->load->helper('csv');
			$data = $this->utility->object_to_array($data);
			foreach(array_keys($data) as $n) {
				foreach(array_keys($data[$n]) as $m) {
					$data[$n][$m] = iconv('UTF-8', 'GB18030', $data[$n][$m]);
				}
			}

			array_to_csv($data, 'proj-'.date('Y-m-d').'.csv');
			exit;
		}
		$this->json->output(array('success' => true, 'data' => $data));
	}

	//返回proj下所有proj_detail的json数据
	function detail_view() {
		$proj_id = $this->input->get('proj_id', true);
		
		$data = $this->Proj_model->get_all_detail($proj_id);

		//根据用户组过滤可见信息
		$group = $this->utility->get_user_group();
		foreach($data as $_t) {
			$this->utility->access_fields_filter($group, $_t);
		}

		//对于项目经理组，不属于登录用户自己创建的记录需要过滤部分字段
		if($this->utility->is_pm() && $this->Proj_model->get_proj_manager($proj_id) !== $this->get_user_info('realname')) {
			$n = count($data);
			for($i = 0; $i < $n; $i++) {
				$this->utility->manager_view_filter($data[$i]);
			}
		}
		
		$this->json->output(array('success' => true, 'data' => $data));
	}

	//返回单条proj的json数据
	function proj_get() {
		$proj_id = $this->input->get('proj_id', true);
		$data = $this->Proj_model->get_proj($proj_id);
		$data->proj_id = $data->id;
		unset($data->id);
		//根据用户组过滤可见信息
		$this->utility->access_fields_filter($this->utility->get_user_group(), $data);
		$this->json->output(array('success' => true, 'data' => $data));
	}

	function proj_create_submit() {
		if(!$this->has_privilege()) {
			$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
		}
		$category = $this->input->post('category', true);
		$sub_category = $this->input->post('sub_category', true);
		$issue = $this->input->post('issue', true);
		$name = $this->input->post('name', true);
		$flow_of_fund = $this->input->post('flow_of_fund', true);
		$highlights = $this->input->post('highlights', true);
		$scale = $this->input->post('scale', true);
		$cycle = $this->input->post('cycle', true);
		$profit_property = $this->input->post('profit_property', true);
		$manager = $this->input->post('manager', true);
		$contract = $this->input->post('contract', true);
		$remark = $this->input->post('remark', true);
		$pay_account = $this->input->post('pay_account', true);
		$countdown = $this->input->post('countdown', true);
		$exclusive = $this->input->post('exclusive', true);
		$grade = $this->input->post('grade', true);
		$manager_remark = $this->input->post('manager_remark', true);

		$proj_id = $this->Proj_model->create_proj($category, $sub_category, $issue, $name, $flow_of_fund, $highlights, $scale, $cycle, $profit_property, $manager, $contract, $remark, $pay_account, $countdown, $exclusive, $grade, $manager_remark, element('loginname', $this->session->userdata('user')));
		if($proj_id === false) {
			$this->json->output(array('success' => false, 'm' => '添加数据失败'));
		}

		//记录用户操作历史
		$this->User_model->operation_history(element('loginname', $this->session->userdata('user')), $this->get_user_info('realname').'新增['.$issue.']的项目：['.$name.']，['.$scale.']万额度');

		$this->json->output(array('success' => true, 'proj_id' => $proj_id));
	}

	function proj_update_submit() {
		if(!$this->has_privilege()) {
			$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
		}
		
		$proj_id = $this->input->post('proj_id', true) === false ? '' : $this->input->post('proj_id', true);
		$category = $this->input->post('category', true);
		$sub_category = $this->input->post('sub_category', true);
		$issue = $this->input->post('issue', true);
		$name = $this->input->post('name', true);
		$flow_of_fund = $this->input->post('flow_of_fund', true);
		$highlights = $this->input->post('highlights', true);
		$scale = $this->input->post('scale', true);
		$cycle = $this->input->post('cycle', true);
		$profit_property = $this->input->post('profit_property', true);
		$manager = $this->input->post('manager', true);
		$contract = $this->input->post('contract', true);
		$remark = $this->input->post('remark', true);
		$pay_account = $this->input->post('pay_account', true);
		$countdown = $this->input->post('countdown', true);
		$exclusive = $this->input->post('exclusive', true);
		$grade = $this->input->post('grade', true);
		$manager_remark = $this->input->post('manager_remark', true);
		
		if($this->utility->is_pm() && $this->Proj_model->get_proj_manager($proj_id) !== $this->get_user_info('realname')) {
			$this->json->output(array('success' => false, 'm' => '您不能对他人的记录进行操作'));
		}
		
		if(!$this->utility->chk_id($proj_id)) {
			$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
		}

		//获取需要记录历史操作的旧值
		$proj = $this->Proj_model->get_proj($proj_id);
		if($remark != $proj->remark) {
			$this->User_model->operation_history(element('loginname', $this->session->userdata('user')), $this->get_user_info('realname').'将['.$proj->issue.']的项目：['.$proj->name.']的备注修改为［'.$remark.'］');
		}
		
		$proj_id = $this->Proj_model->update_proj($proj_id, $category, $sub_category, $issue, $name, $flow_of_fund, $highlights, $scale, $cycle, $profit_property, $manager, $contract, $remark, $pay_account, $countdown, $exclusive, $grade, $manager_remark, element('loginname', $this->session->userdata('user')));
		if($proj_id === false) {
			$this->json->output(array('success' => false, 'm' => '修改数据失败'));
		}
		$this->json->output(array('success' => true, 'proj_id' => $proj_id));
	}

	function proj_close_submit() {
		$proj_id = $this->input->get('proj_id');

		if(!$this->utility->chk_id($proj_id)) {
			$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
		}

		$proj = $this->Proj_model->get_proj($proj_id);
		$proj_details = $this->Proj_model->get_all_detail($proj_id);
		if(!$proj || empty($proj_detail)) {
			$this->json->output(array('success' => false, 'm' => '未找到符合的数据记录'));
		}

		foreach($proj_details as $proj_detail) {
			$this->User_model->operation_history(element('loginname', $this->session->userdata('user')), $this->get_user_info('realname').'将['.$proj->issue.']的项目：['.$proj->name.']，额度为['.$proj_detail->amount.']万，由［'.$proj_detail->status.'］状态修改为［结束］');
		}

		if(!$this->Proj_model->close_proj($proj_id)) {
			$this->json->output(array('success' => false, 'm' => '修改数据失败'));
		}
		$this->json->output(array('success' => true));
	}

	function proj_apply_submit() {
		if(!$this->User_model->has_action_access(element('loginname', $this->session->userdata('user')))) {
			$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
		}

		$proj_id = $this->input->get('proj_id');

		if(!$this->utility->chk_id($proj_id)) {
			$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
		}

		if(!$this->Proj_model->update_pdt_status($proj_id, '申请中', element('loginname', $this->session->userdata('user')))) {
			$this->json->output(array('success' => false, 'm' => '修改数据失败'));
		}
		$this->json->output(array('success' => true));
	}

	function proj_accept_submit() {
		if(!$this->User_model->has_action_access(element('loginname', $this->session->userdata('user')))) {
			$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
		}

		$proj_id = $this->input->get('proj_id');

		if(!$this->utility->chk_id($proj_id)) {
			$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
		}

		if(!$this->Proj_model->update_pdt_status($proj_id, '上线通过', element('loginname', $this->session->userdata('user')))) {
			$this->json->output(array('success' => false, 'm' => '修改数据失败'));
		}
		$this->json->output(array('success' => true));
	}

	function proj_refuse_submit() {
		if(!$this->User_model->has_action_access(element('loginname', $this->session->userdata('user')))) {
			$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
		}

		$proj_id = $this->input->get('proj_id');

		if(!$this->utility->chk_id($proj_id)) {
			$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
		}

		if(!$this->Proj_model->update_pdt_status($proj_id, '上线驳回', element('loginname', $this->session->userdata('user')))) {
			$this->json->output(array('success' => false, 'm' => '修改数据失败'));
		}
		$this->json->output(array('success' => true));
	}

	function detail_create_submit() {
		if(!$this->has_privilege()) {
			$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
		}
		$proj_id = $this->input->post('proj_id', true) === false ? '' : $this->input->post('proj_id', true);
		$proj_detail_id = $this->input->post('proj_detail_id', true) === false ? '' : $this->input->post('proj_detail_id', true);
		$sub_name = $this->input->post('sub_name', true);
		$found = $this->input->post('found', true);
		$total_share = $this->input->post('total_share', true);
		$status = $this->input->post('status', true);
		$amount = $this->input->post('amount', true);
		$profit = $this->input->post('profit', true);
		$commission_b_tax = $this->input->post('commission_b_tax', true);
		$commission_a_tax = $this->input->post('commission_a_tax', true);
		$inner_commission = $this->input->post('inner_commission', true);
		$outer_commission = $this->input->post('outer_commission', true);
		$imm_payment = $this->input->post('imm_payment', true);
		$month = $this->input->post('month', true);
		$main_channel = $this->input->post('main_channel', true);
		$channel_company = $this->input->post('channel_company', true);
		$channel_contact = $this->input->post('channel_contact', true);
		$billing_company = $this->input->post('billing_company', true);

		if($this->utility->is_pm() && $this->Proj_model->get_proj_manager($proj_id) !== $this->get_user_info('realname')) {
			$this->json->output(array('success' => false, 'm' => '您不能对他人的记录进行操作'));
		}

		//detail_id为-1时，表示创建新的detail记录
		if($proj_detail_id != '-1') {
			if(!$this->utility->chk_id($proj_detail_id)) {
				$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
			}
			//获取需要记录历史操作的旧值
			$proj = $this->Proj_model->get_proj($proj_id);
			$proj_detail = $this->Proj_model->get_detail($proj_detail_id);
			if(!$proj || empty($proj_detail)) {
				$this->json->output(array('success' => false, 'm' => '未找到符合的数据记录'));
			}

			$proj_detail_id = $this->Proj_model->update_detail($proj_detail_id, $sub_name, $found, $total_share, $status, $amount, $profit, $commission_b_tax, $commission_a_tax, $inner_commission, $outer_commission, $imm_payment, $month, $main_channel, $channel_company, $channel_contact, $billing_company, element('loginname', $this->session->userdata('user')));
			if($proj_detail_id === false) {
				$this->json->output(array('success' => false, 'm' => '添加数据失败'));
			}
			//比较新旧值，记录操作历史
			if($status != $proj_detail->status) {
				$this->User_model->operation_history(element('loginname', $this->session->userdata('user')), $this->get_user_info('realname').'将['.$proj->issue.']的项目：['.$proj->name.']，额度为['.$proj_detail->amount.']万，由［'.$proj_detail->status.'］状态修改为［'.$status.'］');
			}
		} else {
			$proj_detail_id = $this->Proj_model->create_detail($proj_id, $sub_name, $found, $total_share, $status, $amount, $profit, $commission_b_tax, $commission_a_tax, $inner_commission, $outer_commission, $imm_payment, $month, $main_channel, $channel_company, $channel_contact, $billing_company, element('loginname', $this->session->userdata('user')));
			if($proj_detail_id === false) {
				$this->json->output(array('success' => false, 'm' => '添加数据失败'));
			}
		}

		$this->json->output(array('success' => true, 'proj_detail_id' => $proj_detail_id));
	}
	
	function proj_delete_submit() {
		if(!$this->has_privilege()) {
			$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
		}
		
		$proj_id = $this->input->post('proj_id', true) === false ? '' : $this->input->post('proj_id', true);
		
		if(!$this->utility->chk_id($proj_id)) {
			$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
		}
		
		if($this->utility->is_pm() && $this->Proj_model->get_proj_manager($proj_id) !== $this->get_user_info('realname')) {
			$this->json->output(array('success' => false, 'm' => '您不能对他人的记录进行操作'));
		}
		
		if(!$this->Proj_model->delete_proj($proj_id)) {
			$this->json->output(array('success' => false, 'm' => '未找到符合的数据记录'));
		}
		$this->json->output(array('success' => true));
	}
	
	function detail_delete_submit() {
		if(!$this->has_privilege()) {
			$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
		}
		
		$proj_detail_id = $this->input->post('proj_detail_id', true) === false ? '' : $this->input->post('proj_detail_id', true);
		
		if(!$this->utility->chk_id($proj_detail_id)) {
			$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
		}
		
		$proj_detail = $this->Proj_model->get_detail($proj_detail_id);
		if($this->utility->is_pm() && $this->Proj_model->get_proj_manager($proj_detail->proj_id) !== $this->get_user_info('realname')) {
			$this->json->output(array('success' => false, 'm' => '您不能对他人的记录进行操作'));
		}
		
		if(!$this->Proj_model->delete_detail($proj_detail_id)) {
			$this->json->output(array('success' => false, 'm' => '未找到符合的数据记录'));
		}
		$this->json->output(array('success' => true));
	}

	function operation_history() {
		$data = $this->User_model->get_operation_history();
		$this->json->output(array('success' => true, 'data' => $data));
	}
	
	private function get_user_info($field) {
		$info = element($field, $this->session->userdata('user'));
		if($info === false) {
			return false;
		}
		return $info;
	}
	
	private function has_privilege() {
		if(!$this->utility->is_admin() && !$this->utility->is_pm()) {
			return false;
		}
		return true;
	}
}