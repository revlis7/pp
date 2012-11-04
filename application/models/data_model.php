<?php
class Data_model extends CI_Model {
	function __construct() {
		parent::__construct();
	}
	
	function create($total_share = '', $status = '', $exclusive = '', $grade = '', $category = '', $sub_category = '', $issue = '', $name = '', $flow_of_fund = '', $highlights = '', $month = '', $scale = '', $cycle = '', $amount = '', $profit_property = '', $profit = '', $manager = '', $remark = '', $commission_b_tax = '', $commission_a_tax = '', $inner_commission = '', $outer_commission = '', $pay = '', $paid = '', $found = '', $quota = '', $quota_paid = '', $quota_remain = '', $main_channel = '', $channel_company = '', $channel_contact = '', $billing_company = '', $manager_remark = '') {
		$data = array(
			'total_share' => $total_share,
			'status' => $status,
			'exclusive' => $exclusive,
			'grade' => $grade,
			'category' => $category,
			'sub_category' => $sub_category,
			'issue' => $issue,
			'name' => $name,
			'flow_of_fund' => $flow_of_fund,
			'highlights' => $highlights,
			'month' => $month,
			'scale' => $scale,
			'cycle' => $cycle,
			'amount' => $amount,
			'profit_property' => $profit_property,
			'profit' => $profit,
			'manager' => $manager,
			'remark' => $remark,
			'commission_b_tax' => $commission_b_tax,
			'commission_a_tax' => $commission_a_tax,
			'inner_commission' => $inner_commission,
			'outer_commission' => $outer_commission,
			'pay' => $pay,
			'paid' => $paid,
			'found' => $found,
			'quota' => $quota,
			'quota_paid' => $quota_paid,
			'quota_remain' => $quota_remain,
			'main_channel' => $main_channel,
			'channel_company' => $channel_company,
			'channel_contact' => $channel_contact,
			'billing_company' => $billing_company,
			'manager_remark' => $manager_remark,
		);
		$query = $this->db->insert('data', $data);
		if($this->db->affected_rows() === 1) {
			return true;
		}
		return false;
	}
	
	function get_all() {
		$this->db->from('data');
		$this->db->order_by('id', 'asc');
		$query = $this->db->get();
		return $query->result();
	}
}