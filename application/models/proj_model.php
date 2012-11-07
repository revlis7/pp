<?php
class Proj_model extends CI_Model {
	function __construct() {
		parent::__construct();
	}
	
	function create_proj($category = '', $sub_category = '', $issue = '', $name = '', $flow_of_fund = '', $highlights = '', $month = '', $scale = '', $cycle = '', $profit_property = '', $manager = '', $contract = '', $remark = '', $found = '') {
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
		$query = $this->db->insert('proj', $proj);
		if($this->db->affected_rows() === 1) {
			return $this->db->insert_id();
		}
		return false;
	}
	
	function update_proj($proj_id, $category, $sub_category, $issue, $name, $flow_of_fund, $highlights, $month, $scale, $cycle, $profit_property, $manager, $contract, $remark, $found) {
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
		if($this->db->affected_rows() === 1) {
			return $proj_id;
		}
		return false;
	}
	
	function create_detail($proj_id, $total_share = '', $status = '', $exclusive = '', $grade = '', $amount = '', $profit = '', $commission_b_tax = '', $commission_a_tax = '', $inner_commission = '', $outer_commission = '', $pay = '', $paid = '', $quota = '', $quota_paid = '', $quota_remain = '', $main_channel = '', $channel_company = '', $channel_contact = '', $billing_company = '', $manager_remark = '') {
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
			'inner_commission' => $inner_commission,
			'outer_commission' => $outer_commission,
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
		$query = $this->db->insert('proj_detail', $proj_detail);
		if($this->db->affected_rows() === 1) {
			return $this->db->insert_id();
		}
		return false;
	}
	
	// TODO join delete
	function delete_proj($proj_id) {
		$this->db->from('proj')->where('id', $proj_id);
		$this->db->delete();
		
		if($this->db->affected_rows() === 1) {
			return true;
		}
		return false;
	}
	
	function delete_detail($proj_detail_id) {
		$this->db->from('proj_detail')->where('id', $proj_detail_id);
		$this->db->delete();
		
		if($this->db->affected_rows() === 1) {
			return true;
		}
		return false;
	}
	
	function get_proj($proj_id) {
		$this->db->from('proj')->where('id', $proj_id);
		$query = $this->db->get();
		return $query->result();
	}
	
	// TODO
	function get_detail() {
		return null;
	}
	
	function get_all_proj() {
		$this->db->from('proj');
		$this->db->order_by('id', 'asc');
		$query = $this->db->get();
		return $query->result();
	}
	
	function get_all_detail($proj_id) {
		$this->db->select('proj_detail.proj_id as proj_id, proj_detail.id as proj_detail_id, proj_detail.total_share, proj_detail.status, proj_detail.exclusive, proj_detail.grade, proj_detail.amount, proj_detail.profit, proj_detail.commission_b_tax, proj_detail.commission_a_tax, proj_detail.inner_commission, proj_detail.outer_commission, proj_detail.pay, proj_detail.paid, proj_detail.quota, proj_detail.quota_paid, proj_detail.quota_remain, proj_detail.main_channel, proj_detail.channel_company, proj_detail.channel_contact, proj_detail.billing_company, proj_detail.manager_remark');
		//$this->db->select('proj.category, proj.sub_category, proj.issue, proj.name, proj.flow_of_fund, proj.highlights, proj.month, proj.scale, proj.cycle, proj.profit_property, proj.manager, proj.contract, proj.remark, proj.found, proj_detail.*');
		$this->db->from('proj_detail')->where('proj_id', $proj_id);
		//$this->db->join('proj_detail', 'proj_detail.proj_id = proj.id', 'left');
		$this->db->order_by('proj_detail_id', 'asc');
		$query = $this->db->get();
		return $query->result();
	}
	
	function get_all_proj_detail() {
		//$this->db->select('proj.*, proj_detail.total_share, proj_detail.status, proj_detail.exclusive, proj_detail.grade, proj_detail.amount, proj_detail.profit, proj_detail.commission_b_tax, proj_detail.commission_a_tax, proj_detail.inner_commission, proj_detail.outer_commission, proj_detail.pay, proj_detail.paid, proj_detail.quota, proj_detail.quota_paid, proj_detail.quota_remain, proj_detail.main_channel, proj_detail.channel_company, proj_detail.channel_contact, proj_detail.billing_company, proj_detail.manager_remark');
		$this->db->select('proj.id as proj_id, proj.category, proj.sub_category, proj.issue, proj.name, proj.flow_of_fund, proj.highlights, proj.month, proj.scale, proj.cycle, proj.profit_property, proj.manager, proj.contract, proj.remark, proj.found, proj_detail.id as proj_detail_id, proj_detail.total_share, proj_detail.status, proj_detail.exclusive, proj_detail.grade, proj_detail.amount, proj_detail.profit, proj_detail.commission_b_tax, proj_detail.commission_a_tax, proj_detail.inner_commission, proj_detail.outer_commission, proj_detail.pay, proj_detail.paid, proj_detail.quota, proj_detail.quota_paid, proj_detail.quota_remain, proj_detail.main_channel, proj_detail.channel_company, proj_detail.channel_contact, proj_detail.billing_company, proj_detail.manager_remark');
		//$this->db->select('proj.category, proj.sub_category, proj.issue, proj.name, proj.flow_of_fund, proj.highlights, proj.month, proj.scale, proj.cycle, proj.profit_property, proj.manager, proj.contract, proj.remark, proj.found, proj_detail.*');
		$this->db->from('proj');
		$this->db->join('proj_detail', 'proj_detail.proj_id = proj.id', 'left');
		$this->db->order_by('proj.id', 'asc');
		$query = $this->db->get();
		return $query->result();
	}
}