<?php
class Proj_model extends CI_Model {
	private $CI;

	function __construct() {
		parent::__construct();
		
		$this->CI =& get_instance();
	}
	
	function get_proj_manager($proj_id) {
		$proj = $this->get_proj($proj_id);
		if(!$proj) {
			return false;
		}
		return $proj->manager;
	}
	
	function create_proj($category = '', $sub_category = '', $issue = '', $name = '', $flow_of_fund = '', $highlights = '', $month = '', $scale = '', $cycle = '', $profit_property = '', $manager = '', $contract = '', $remark = '', $found = '', $creator = '') {
		$proj = array(
			'category' => $category,
			'sub_category' => $sub_category,
			'issue' => $issue,
			'name' => $name,
			'flow_of_fund' => $flow_of_fund,
			'highlights' => $highlights,
			'month' => $month,
			'scale' => $scale,
			'cycle' => $cycle,
			'profit_property' => $profit_property,
			'manager' => $manager,
			'contract' => $contract,
			'remark' => $remark,
			'found' => $found,
			'creator' => $creator,
			'create_ts' => date('Y-m-d H:i:s'),
		);
		$query = $this->db->insert('proj', $proj);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return $this->db->insert_id();
	}
	
	function update_proj($proj_id, $category, $sub_category, $issue, $name, $flow_of_fund, $highlights, $month, $scale, $cycle, $profit_property, $manager, $contract, $remark, $found, $editor) {
		//查询旧记录，插入历史表
		$old_proj = $this->get_proj($proj_id);
		if(!$old_proj) {
			return false;
		}
		$proj = array(
			'proj_id' => $old_proj->id,
			'category' => $old_proj->category,
			'sub_category' => $old_proj->sub_category,
			'issue' => $old_proj->issue,
			'name' => $old_proj->name,
			'flow_of_fund' => $old_proj->flow_of_fund,
			'highlights' => $old_proj->highlights,
			'month' => $old_proj->month,
			'scale' => $old_proj->scale,
			'cycle' => $old_proj->cycle,
			'profit_property' => $old_proj->profit_property,
			'manager' => $old_proj->manager,
			'contract' => $old_proj->contract,
			'remark' => $old_proj->remark,
			'found' => $old_proj->found,
			'editor' => $editor,
			'edit_ts' => date('Y-m-d H:i:s'),
		);
		$query = $this->db->insert('proj_history', $proj);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
	
		$proj = array(
			'category' => $category,
			'sub_category' => $sub_category,
			'issue' => $issue,
			'name' => $name,
			'flow_of_fund' => $flow_of_fund,
			'highlights' => $highlights,
			'month' => $month,
			'scale' => $scale,
			'cycle' => $cycle,
			'profit_property' => $profit_property,
			'manager' => $manager,
			'contract' => $contract,
			'remark' => $remark,
			'found' => $found,
		);
		$this->db->where('id', $proj_id);
		$this->db->update('proj', $proj);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return $proj_id;
	}
	
	function create_detail($proj_id, $total_share = '', $status = '', $exclusive = '', $grade = '', $amount = '', $profit = '', $commission_b_tax = '', $commission_a_tax = '', $pay = '', $paid = '', $quota = '', $quota_paid = '', $quota_remain = '', $main_channel = '', $channel_company = '', $channel_contact = '', $billing_company = '', $manager_remark = '', $creator = '') {
		$proj_detail = array(
			'proj_id' => $proj_id,
			'total_share' => $total_share,
			'status' => $status,
			'exclusive' => $exclusive,
			'grade' => $grade,
			'amount' => $amount,
			'profit' => $profit,
			'commission_b_tax' => $commission_b_tax,
			'commission_a_tax' => $commission_a_tax,
			//'inner_commission' => $commission_a_tax * (1 - 0.09 * 2),
			//'outer_commission' => $commission_a_tax * (1 - 0.1 * 2),
			'pay' => $pay,
			'paid' => $paid,
			'quota' => $quota,
			'quota_paid' => $quota_paid,
			'quota_remain' => $quota_remain,
			'main_channel' => $main_channel,
			'channel_company' => $channel_company,
			'channel_contact' => $channel_contact,
			'billing_company' => $billing_company,
			'manager_remark' => $manager_remark,
			'creator' => $creator,
			'create_ts' => date('Y-m-d H:i:s'),
		);
		$query = $this->db->insert('proj_detail', $proj_detail);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return $this->db->insert_id();
	}
	
	function update_detail($proj_detail_id, $total_share, $status, $exclusive, $grade, $amount, $profit, $commission_b_tax, $commission_a_tax, $pay, $paid, $quota, $quota_paid, $quota_remain, $main_channel, $channel_company, $channel_contact, $billing_company, $manager_remark, $editor) {
		//查询旧记录，插入历史表
		$old_proj_detail = $this->get_detail($proj_detail_id);
		if(!$old_proj_detail) {
			return false;
		}
		$proj_detail = array(
			'proj_detail_id' => $old_proj_detail->id,
			'proj_id' => $old_proj_detail->proj_id,
			'total_share' => $old_proj_detail->total_share,
			'status' => $old_proj_detail->status,
			'exclusive' => $old_proj_detail->exclusive,
			'grade' => $old_proj_detail->grade,
			'amount' => $old_proj_detail->amount,
			'profit' => $old_proj_detail->profit,
			'commission_b_tax' => $old_proj_detail->commission_b_tax,
			'commission_a_tax' => $old_proj_detail->commission_a_tax,
			//'inner_commission' => $old_proj_detail->inner_commission,
			//'outer_commission' => $old_proj_detail->outer_commission,
			'pay' => $old_proj_detail->pay,
			'paid' => $old_proj_detail->paid,
			'quota' => $old_proj_detail->quota,
			'quota_paid' => $old_proj_detail->quota_paid,
			'quota_remain' => $old_proj_detail->quota_remain,
			'main_channel' => $old_proj_detail->main_channel,
			'channel_company' => $old_proj_detail->channel_company,
			'channel_contact' => $old_proj_detail->channel_contact,
			'billing_company' => $old_proj_detail->billing_company,
			'manager_remark' => $old_proj_detail->manager_remark,
			'editor' => $editor,
			'edit_ts' => date('Y-m-d H:i:s'),
		);
		$query = $this->db->insert('proj_detail_history', $proj_detail);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		
		$proj_detail = array(
			'total_share' => $total_share,
			'status' => $status,
			'exclusive' => $exclusive,
			'grade' => $grade,
			'amount' => $amount,
			'profit' => $profit,
			'commission_b_tax' => $commission_b_tax,
			'commission_a_tax' => $commission_a_tax,
			//'inner_commission' => round($commission_a_tax * (1 - 0.09 * 2), 3),
			//'outer_commission' => round($commission_a_tax * (1 - 0.1 * 2), 3),
			'pay' => $pay,
			'paid' => $paid,
			'quota' => $quota,
			'quota_paid' => $quota_paid,
			'quota_remain' => $quota_remain,
			'main_channel' => $main_channel,
			'channel_company' => $channel_company,
			'channel_contact' => $channel_contact,
			'billing_company' => $billing_company,
			'manager_remark' => $manager_remark,
		);
		$this->db->where('id', $proj_detail_id);
		$this->db->update('proj_detail', $proj_detail);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return $proj_detail_id;
	}
	
	// TODO join delete
	function delete_proj($proj_id) {
		$this->db->from('proj')->where('id', $proj_id);
		$this->db->delete();
		
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return true;
	}
	
	function delete_detail($proj_detail_id) {
		$this->db->from('proj_detail')->where('id', $proj_detail_id);
		$this->db->delete();
		
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return true;
	}
	
	function get_proj($proj_id) {
		$this->db->from('proj')->where('id', $proj_id);
		$query = $this->db->get();
		return $query->row();
	}
	
	function get_detail($proj_detail_id) {
		$this->db->from('proj_detail')->where('id', $proj_detail_id);
		$query = $this->db->get();
		$result = $query->row();
		if(!$result) {
			return false;
		}
		$proj = $this->get_proj($result->proj_id);
		if(!$proj) {
			return false;
		}
		$month = $proj->month;
		$result->inner_commission = $this->CI->utility->get_inner_commission($result->commission_a_tax, $month);
		$result->outer_commission = $this->CI->utility->get_outer_commission($result->commission_a_tax, $month);
		return $result;
	}
	
	function get_all_proj() {
		$this->db->from('proj');
		$this->db->order_by('id', 'asc');
		$query = $this->db->get();
		return $query->result();
	}
	
	function get_all_detail($proj_id) {
		$proj = $this->get_proj($proj_id);
		if(!$proj) {
			return false;
		}
		$month = $proj->month;
		$this->db->select('proj_detail.proj_id as proj_id, proj_detail.id as proj_detail_id, proj_detail.total_share, proj_detail.status, proj_detail.exclusive, proj_detail.grade, proj_detail.amount, proj_detail.profit, proj_detail.commission_b_tax, proj_detail.commission_a_tax, proj_detail.inner_commission, proj_detail.outer_commission, proj_detail.pay, proj_detail.paid, proj_detail.quota, proj_detail.quota_paid, proj_detail.quota_remain, proj_detail.main_channel, proj_detail.channel_company, proj_detail.channel_contact, proj_detail.billing_company, proj_detail.manager_remark');
		$this->db->from('proj_detail')->where('proj_id', $proj_id);
		$this->db->order_by('proj_detail_id', 'asc');
		$query = $this->db->get();
		$result = $query->result();
		for($i = 0; $i < count($result); $i++) {
			$result[$i]->inner_commission = $this->CI->utility->get_inner_commission($result[$i]->commission_a_tax, $month);
			$result[$i]->outer_commission = $this->CI->utility->get_outer_commission($result[$i]->commission_a_tax, $month);
		}
		return $result;
	}
	
	function get_all_proj_detail($category_id) {
		//$this->db->select('proj.id as proj_id, proj.category, proj.sub_category, proj.issue, proj.name, proj.flow_of_fund, proj.highlights, proj.month, proj.scale, proj.cycle, proj.profit_property, proj.manager, proj.contract, proj.remark, proj.found, proj_detail.id as proj_detail_id, proj_detail.total_share, proj_detail.status, proj_detail.exclusive, proj_detail.grade, proj_detail.amount, proj_detail.profit, proj_detail.commission_b_tax, proj_detail.commission_a_tax, proj_detail.inner_commission, proj_detail.outer_commission, proj_detail.pay, proj_detail.paid, proj_detail.quota, proj_detail.quota_paid, proj_detail.quota_remain, proj_detail.main_channel, proj_detail.channel_company, proj_detail.channel_contact, proj_detail.billing_company, proj_detail.manager_remark');
		//$this->db->from('proj');
		//$this->db->where('proj_detail.status <> "结束"');
		//$this->db->join('proj_detail', 'proj_detail.proj_id = proj.id', 'left');
		//$this->db->order_by('order_1', 'asc');
		//$this->db->order_by('category', 'asc');
		//$this->db->order_by('sub_category', 'asc');
		//$this->db->order_by('order_2', 'desc');
		//$this->db->order_by('proj.id', 'desc');
		//$query = $this->db->get();
		$t_q = 'select proj.id as proj_id, proj.category, proj.sub_category, '.
				'proj.issue, proj.name, proj.flow_of_fund, proj.highlights, '.
				'proj.month, proj.scale, proj.cycle, proj.profit_property, '.
				'proj.manager, proj.contract, proj.remark, proj.found, '.
				'proj_detail.id as proj_detail_id, proj_detail.total_share, '.
				'proj_detail.status, proj_detail.exclusive, proj_detail.grade, '.
				'proj_detail.amount, proj_detail.profit, proj_detail.commission_b_tax, '.
				'proj_detail.commission_a_tax, proj_detail.inner_commission, '.
				'proj_detail.outer_commission, proj_detail.pay, proj_detail.paid, '.
				'proj_detail.quota, proj_detail.quota_paid, proj_detail.quota_remain, '. 
				'proj_detail.main_channel, proj_detail.channel_company, '.
				'proj_detail.channel_contact, proj_detail.billing_company, '. 
				'proj_detail.manager_remark, '.
				'case proj_detail.grade when "五星级" then 5 when "四星级" then 4 when "三星级" then 3 when "二星级" then 2 else 1 end as order_2, '.
				'case when proj_detail.status="在售" then 1 else 2 end as order_1 '.
			'from proj '.
			'left join proj_detail on proj_detail.proj_id = proj.id '.
			'where proj_detail.status <> "结束" ';
		$t_q_end = 'order by order_1,order_2 desc,sub_category desc,proj.id desc';
		
		if($category_id == 1) {
			$query = $this->db->query($t_q . 'and category="固定收益类" ' . $t_q_end);
		} else if($category_id == 2) {
			$query = $this->db->query($t_q . 'and category="浮动收益类"' . $t_q_end);
		} else {
			$query = $this->db->query($t_q . $t_q_end);
		}
		//$result = $query->result();
		//for($i = 0; $i < count($result); $i++) {
		foreach ($query->result() as $row) {
			//$result[$i]->inner_commission = round($result[$i]->commission_a_tax - (0.09 * ($result[$i]->month / 12)), 3);
			//$result[$i]->outer_commission = round($result[$i]->commission_a_tax - (0.1 * ($result[$i]->month / 12)), 3);
			$row->inner_commission = $this->CI->utility->get_inner_commission($row->commission_a_tax, $row->month);
			$row->outer_commission = $this->CI->utility->get_outer_commission($row->commission_a_tax, $row->month);
		}
		return $query->result();
	}
}