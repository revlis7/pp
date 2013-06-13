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
	
	function create_proj($category = '', $sub_category = '', $issue = '', $name = '', $flow_of_fund = '', $highlights = '', $scale = '', $cycle = '', $profit_property = '', $manager = '', $contract = '', $remark = '', $pay_account = '', $countdown = '', $found = '', $pdt_status = '', $creator = '') {
		$proj = array(
			'category' => $category,
			'sub_category' => $sub_category,
			'issue' => $issue,
			'name' => $name,
			'flow_of_fund' => $flow_of_fund,
			'highlights' => $highlights,
			'scale' => $scale,
			'cycle' => $cycle,
			'profit_property' => $profit_property,
			'manager' => $manager,
			'contract' => $contract,
			'remark' => $remark,
			'pay_account' => $pay_account,
			'countdown' => $countdown,
			'found' => $found,
			'pdt_status' => $pdt_status,
			'creator' => $creator,
			'create_ts' => date('Y-m-d H:i:s'),
		);
		$query = $this->db->insert('proj', $proj);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return $this->db->insert_id();
	}
	
	function update_proj($proj_id, $category, $sub_category, $issue, $name, $flow_of_fund, $highlights, $scale, $cycle, $profit_property, $manager, $contract, $remark, $pay_account, $countdown, $found, $pdt_status, $editor) {
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
			'scale' => $old_proj->scale,
			'cycle' => $old_proj->cycle,
			'profit_property' => $old_proj->profit_property,
			'manager' => $old_proj->manager,
			'contract' => $old_proj->contract,
			'remark' => $old_proj->remark,
			'pay_account' => $old_proj->pay_account,
			'countdown' => $old_proj->countdown,
			'found' => $old_proj->found,
			'pdt_status' => $old_proj->pdt_status,
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
			'scale' => $scale,
			'cycle' => $cycle,
			'profit_property' => $profit_property,
			'manager' => $manager,
			'contract' => $contract,
			'remark' => $remark,
			'pay_account' => $pay_account,
			'countdown' => $countdown,
			'found' => $found,
			'pdt_status' => $pdt_status,
		);
		$this->db->where('id', $proj_id);
		$this->db->update('proj', $proj);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return $proj_id;
	}
	
	function create_detail($proj_id, $sub_name = '', $total_share = '', $status = '', $exclusive = '', $grade = '', $amount = '', $profit = '', $commission_b_tax = '', $commission_a_tax = '', $inner_commission = '', $outer_commission = '', $imm_payment = '', $month = '', $pay = '', $paid = '', $quota = '', $quota_paid = '', $quota_remain = '', $main_channel = '', $channel_company = '', $channel_contact = '', $billing_company = '', $manager_remark = '', $creator = '') {
		$proj_detail = array(
			'proj_id' => $proj_id,
			'sub_name' => $sub_name,
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
			'imm_payment' => $imm_payment,
			'month' => $month,
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
	
	function update_detail($proj_detail_id, $sub_name, $total_share, $status, $exclusive, $grade, $amount, $profit, $commission_b_tax, $commission_a_tax, $inner_commission, $outer_commission, $imm_payment, $month, $pay, $paid, $quota, $quota_paid, $quota_remain, $main_channel, $channel_company, $channel_contact, $billing_company, $manager_remark, $editor) {
		//查询旧记录，插入历史表
		$old_proj_detail = $this->get_detail($proj_detail_id);
		if(!$old_proj_detail) {
			return false;
		}
		$proj_detail = array(
			'proj_detail_id' => $old_proj_detail->id,
			'proj_id' => $old_proj_detail->proj_id,
			'sub_name' => $old_proj_detail->sub_name,
			'total_share' => $old_proj_detail->total_share,
			'status' => $old_proj_detail->status,
			'exclusive' => $old_proj_detail->exclusive,
			'grade' => $old_proj_detail->grade,
			'amount' => $old_proj_detail->amount,
			'profit' => $old_proj_detail->profit,
			'commission_b_tax' => $old_proj_detail->commission_b_tax,
			'commission_a_tax' => $old_proj_detail->commission_a_tax,
			'inner_commission' => $old_proj_detail->inner_commission,
			'outer_commission' => $old_proj_detail->outer_commission,
			'imm_payment' => $old_proj_detail->imm_payment,
			'month' => $old_proj_detail->month,
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
			'sub_name' => $sub_name,
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
			'imm_payment' => $imm_payment,
			'month' => $month,
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
		$this->db->select('proj_detail.proj_id as proj_id, proj_detail.id as proj_detail_id, proj_detail.total_share, proj_detail.status, proj_detail.exclusive, proj_detail.grade, proj_detail.amount, proj_detail.profit, proj_detail.commission_b_tax, proj_detail.commission_a_tax, proj_detail.inner_commission, proj_detail.outer_commission, proj_detail.imm_payment, proj_detail.pay, proj_detail.paid, proj_detail.quota, proj_detail.quota_paid, proj_detail.quota_remain, proj_detail.main_channel, proj_detail.channel_company, proj_detail.channel_contact, proj_detail.billing_company, proj_detail.manager_remark');
		$this->db->from('proj_detail')->where('proj_id', $proj_id);
		$this->db->order_by('proj_detail_id', 'asc');
		$query = $this->db->get();
		$result = $query->result();
		return $result;
	}
	
	function get_all_proj_detail($category_id, $ending_status) {
		$t_q = 'select proj.id as proj_id, proj.category, proj.sub_category, '.
				'proj.issue, proj.name, proj.flow_of_fund, proj.highlights, '.
				'proj.scale, proj.cycle, proj.profit_property, '.
				'proj.manager, proj.contract, proj.remark, proj.pay_account, proj.countdown, proj.found, proj.pdt_status '.
				'proj_detail.id as proj_detail_id, proj_detail.sub_name, proj_detail.total_share, '.
				'proj_detail.status, proj_detail.exclusive, proj_detail.grade, '.
				'proj_detail.amount, proj_detail.profit, proj_detail.commission_b_tax, '.
				'proj_detail.commission_a_tax, proj_detail.inner_commission, '.
				'proj_detail.outer_commission, proj_detail.imm_payment, proj_detail.pay, proj_detail.paid, '.
				'proj_detail.quota, proj_detail.quota_paid, proj_detail.quota_remain, '. 
				'proj_detail.main_channel, proj_detail.channel_company, '.
				'proj_detail.channel_contact, proj_detail.billing_company, '. 
				'proj_detail.manager_remark,proj.create_ts, '.
				'case proj_detail.grade when "五星级" then 5 when "四星级" then 4 when "三星级" then 3 when "二星级" then 2 else 1 end as order_2, '.
				'proj_detail.month '.
			'from proj '.
			'left join proj_detail on proj_detail.proj_id = proj.id ';
		$t_q_end = 'order by order_2 desc,sub_category desc,proj.name,proj_detail.month,proj_detail.amount';
		
		if($category_id == 1) {
			if($ending_status >= 1) {
				$query = $this->db->query($t_q.'where (proj_detail.status = "结束" or proj_detail.status is null) and category="固定收益类" '.$t_q_end);
			} else {
				$query = $this->db->query($t_q.'where proj_detail.status <> "结束" and category="固定收益类" '.$t_q_end);
			}
		} else if($category_id == 2) {
			if($ending_status >= 1) {
				$query = $this->db->query($t_q.'where (proj_detail.status = "结束" or proj_detail.status is null) and category="浮动收益类" '.$t_q_end);
			} else {
				$query = $this->db->query($t_q.'where proj_detail.status <> "结束" and category="浮动收益类"'.$t_q_end);
			}
		} else {
			if($ending_status >= 1) {
				$query = $this->db->query($t_q.'(proj_detail.status = "结束" or proj_detail.status is null) '.$t_q_end);
			} else {
				$query = $this->db->query($t_q.'where proj_detail.status <> "结束" '.$t_q_end);
			}
		}
		return $query->result();
	}

	function create_company($company_name = '', $type = '', $remark = '', $creator = '') {
		$company = array(
			'company_name' => $company_name,
			'type'         => $type,
			'remark'       => $remark,
			'creator'      => $creator,
			'create_ts'    => date('Y-m-d H:i:s'),
			'operation'    => 'normal',
		);
		$query = $this->db->insert('company', $company);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return $this->db->insert_id();
	}

	function get_company($company_id = '') {
		$this->db->from('company');
		$this->db->where('operation !=', 'deleted');
		$this->db->where('id', $company_id);
		$query = $this->db->get();
		return $query->result();
	}

	function get_all_company() {
		$this->db->from('company')->where('operation !=', 'deleted');
		$this->db->order_by('id', 'asc');
		$query = $this->db->get();
		return $query->result();
	}

	function delete_company($company_id) {
		$data = array(
			'operation' => 'deleted',
		);
		$this->db->where('id', $company_id);
		$this->db->update('company', $data);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return $company_id;
	}

	function create_cproj($proj_name = '', $amount = '', $month = '', $profit_max = '', $profit_suggest = '', $guarantee_mode = '', $repayment = '', $proj_rel = '', $proj_deadline = '', $remark = '') {
		$cproj = array(
			'proj_name'      => $proj_name,
			'amount'         => $amount,
			'month'          => $month,
			'profit_max'     => $profit_max,
			'profit_suggest' => $profit_suggest,
			'guarantee_mode' => $guarantee_mode,
			'repayment'      => $repayment,
			'proj_rel'       => $proj_rel,
			'proj_deadline'  => $proj_deadline,
			'remark'         => $remark,
			'operation'      => 'normal',
		);
		$query = $this->db->insert('cproj', $cproj);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return $this->db->insert_id();
	}

	function get_cproj($proj_id) {
		$this->db->from('cproj');
		$this->db->where('operation !=', 'deleted');
		$this->db->where('id', $proj_id);
		$query = $this->db->get();
		return $query->result();
	}

	function get_all_cproj() {
		$this->db->from('cproj')->where('operation !=', 'deleted');
		$this->db->order_by('id', 'asc');
		$query = $this->db->get();
		return $query->result();
	}

	function delete_cproj($proj_id) {
		$data = array(
			'operation' => 'deleted',
		);
		$this->db->where('id', $proj_id);
		$this->db->update('cproj', $data);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return $proj_id;
	}

	function create_relation($proj_id = '', $company_id = '', $status = '', $contact_person = '', $update_ts = '') {
		$this->db->from('cproj_company_relation');
		$this->db->where('proj_id', $proj_id);
		$this->db->where('company_id', $company_id);
		$this->db->where('operation !=', 'deleted');
		$query = $this->db->get();
		if($query->result()) {
			return false;
		}

		$relation = array(
			'proj_id'        => $proj_id,
			'company_id'     => $company_id,
			'status'         => $status,
			'contact_person' => $contact_person,
			'update_ts'      => $update_ts,
			'operation'      => 'normal',
		);
		$query = $this->db->insert('cproj_company_relation', $relation);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return $this->db->insert_id();
	}

	function update_relation($relation_id = '', $status = '', $update_ts = '') {
		$data = array(
			'status'    => $status,
			'update_ts' => $update_ts,
		);
		$this->db->where('id', $relation_id);
		$this->db->where('operation !=', 'deleted');
		$this->db->update('cproj_company_relation', $data);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return $relation_id;
	}

	function get_relation_id($proj_id = '', $company_id = '') {
		$this->db->from('cproj_company_relation');
		$this->db->where('operation !=', 'deleted');
		$this->db->where('proj_id', $proj_id);
		$this->db->where('company_id', $company_id);
		$query = $this->db->get();
		$result = $query->row();
		if(empty($result)) {
			return false;
		}
		return $result->id;
	}

	function get_cproj_company_relation($proj_id) {
		$this->db->from('cproj_company_relation');
		$this->db->where('proj_id', $proj_id);
		$this->db->where('operation !=', 'deleted');
		$this->db->order_by('id', 'asc');
		$query = $this->db->get();
		return $query->result();
	}

	function delete_relation($relation_id) {
		$data = array(
			'operation' => 'deleted',
		);
		$this->db->where('id', $relation_id);
		$this->db->update('cproj_company_relation', $data);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return $relation_id;
	}

	function create_relation_detail($relation_id = '', $update_ts = '', $status = '', $update_remark = '') {
		$detail = array(
			'relation_id'    => $relation_id,
			'update_ts'      => $update_ts,
			'status'         => $status,
			'update_remark'  => $update_remark,
			'operation'      => 'normal',
			'editor'         => element('loginname', $this->CI->session->userdata('user')),
			'edit_ts'        => date('Y-m-d H:i:s'),
		);
		$query = $this->db->insert('cproj_company_relation_detail', $detail);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return $this->db->insert_id();
	}

	function get_relation_detail($relation_id) {
		$this->db->from('cproj_company_relation_detail');
		$this->db->where('relation_id', $relation_id);
		$this->db->where('operation !=', 'deleted');
		$this->db->order_by('id', 'asc');
		$query = $this->db->get();
		return $query->result();
	}

	function delete_relation_detail($detail_id) {
		$data = array(
			'operation' => 'deleted',
		);
		$this->db->where('id', $detail_id);
		$this->db->update('cproj_company_relation_detail', $data);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return $detail_id;
	}

	function create_upload($proj_id, $filename, $filesize) {
		$upload = array(
			'proj_id'   => $proj_id,
			'filename'  => $filename,
			'filesize'  => $filesize,
			'editor'    => element('loginname', $this->CI->session->userdata('user')),
			'create_ts' => date('Y-m-d H:i:s'),
		);
		$query = $this->db->insert('proj_uploads', $upload);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return $this->db->insert_id();
	}

	function get_upload_list($proj_id) {
		$this->db->from('proj_uploads')->where('proj_id', $proj_id);
		$this->db->order_by('id', 'asc');
		$query = $this->db->get();
		return $query->result();
	}

	function delete_upload($file) {
		$this->db->from('proj_uploads')->where('filename', $file);
		$this->db->delete();
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return true;
	}
}
