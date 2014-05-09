<?php
class Proj_model extends CI_Model {
	private $CI;

	function __construct() {
		parent::__construct();
		
		$this->CI =& get_instance();
	}

	function get_proj_message_by_proj_id($proj_id, $mode) {
		$proj = $this->get_proj($proj_id);
		if(!$proj) {
			return false;
		}
		$this->db->from('proj_message');
        if($mode == 'outer'){
        	$this->db->where('msg_cat', '公开信息');
        }
        if($mode == 'staff'){
        	$this->db->where("(msg_cat='公开信息' or msg_cat='渠道消息')");
        }
        $this->db->where('proj_id', $proj_id);
		$this->db->order_by('create_ts', 'desc');
		$query = $this->db->get();
		$result = $query->result();
		return $result;
	}

	function get_proj_message_by_id($id) {
		$this->db->from('proj_message')->where('id', $id);
		$this->db->order_by('create_ts', 'desc');
		$query = $this->db->get();
		$result = $query->row();
		if(!$result) {
			return false;
		}
		return $result;
	}

	function create_proj_message($proj_id, $msg_cat = '', $message = '', $creator = '') {
		$proj = $this->get_proj($proj_id);
		if(!$proj) {
			return false;
		}
		$proj_message = array(
			'proj_id' => $proj_id,
			'msg_cat' => $msg_cat,
			'message' => $message,
			'creator' => $creator,
			'create_ts' => date('Y-m-d H:i:s'),
			'update_ts' => date('Y-m-d H:i:s'),
		);
		$query = $this->db->insert('proj_message', $proj_message);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return $this->db->insert_id();
	}

	function update_proj_message($id, $msg_cat = '', $message = '') {
		$proj_message = array(
			'msg_cat' => $msg_cat,
			'message' => $message,
			'update_ts' => date('Y-m-d H:i:s'),
		);
		$this->db->where('id', $id);
		$this->db->update('proj_message', $proj_message);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return $id;
	}

	function delete_proj_message($id) {
		$this->db->from('proj_message')->where('id', $id);
		$this->db->delete();
		
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return true;
	}

	function get_proj_manager($proj_id) {
		$proj = $this->get_proj($proj_id);
		if(!$proj) {
			return false;
		}
		return $proj->manager;
	}
	
	function get_proj_director($proj_id) {
		$proj = $this->get_proj($proj_id);
		if(!$proj) {
			return false;
		}
		return $proj->proj_director;
	}

    function get_proj_string($proj_id) {
        //$proj = $this->get_proj($proj_id);
        //$proj_str = $proj->category.$proj->sub_category;
        
    }
    
	function create_proj($category = '', $sub_category = '', $issue = '', $name = '', 
		$flow_of_fund = '', $highlights = '', $scale = '', $cycle = '', $profit_property = '', 
        $proj_director = '', $manager = '', $contract = '', $remark = '', $pay_account = '', 
        $countdown = '', $exclusive = '', $grade = '', $manager_remark = '', $creator = '') {
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
			'proj_director' => $proj_director,
			'manager' => $manager,
			'contract' => $contract,
			'remark' => $remark,
			'pay_account' => $pay_account,
			'countdown' => $countdown,
			'pdt_status' => '初始',
			'exclusive' => $exclusive,
			'grade' => $grade,
			'manager_remark' => $manager_remark,
			'creator' => $creator,
			'create_ts' => date('Y-m-d H:i:s'),
			'update_ts' => date('Y-m-d H:i:s'),
		);
		$query = $this->db->insert('proj', $proj);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return $this->db->insert_id();
	}
	
	function update_proj($proj_id, $category, $sub_category, $issue, $name, $flow_of_fund, 
		$highlights, $scale, $cycle, $profit_property, $proj_director, $manager, $contract, $remark, 
		$pay_account, $countdown, $exclusive, $grade, $manager_remark, $editor) {
		// 查询旧记录，插入历史表
		if(!$this->archive_proj($proj_id, $editor)) {
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
			'proj_director' => $proj_director,
			'manager' => $manager,
			'contract' => $contract,
			'remark' => $remark,
			'pay_account' => $pay_account,
			'countdown' => $countdown,
			'exclusive' => $exclusive,
			'grade' => $grade,
			'manager_remark' => $manager_remark,
			'update_ts' => date('Y-m-d H:i:s'),
		);
		$this->db->where('id', $proj_id);
		$this->db->update('proj', $proj);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return $proj_id;
	}

	function update_pdt_status($proj_id, $pdt_status, $editor) {
		// 查询旧记录，插入历史表
		if(!$this->archive_proj($proj_id, $editor)) {
			return false;
		}

		$field = array('pdt_status' => $pdt_status);
		$this->db->where('id', $proj_id);
		$this->db->update('proj', $field);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return $proj_id;
	}

	function archive_proj($proj_id, $editor) {
		$old_proj = $this->get_proj($proj_id);
		if(empty($old_proj)) {
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
			'proj_director' => $old_proj->proj_director,
			'manager' => $old_proj->manager,
			'contract' => $old_proj->contract,
			'remark' => $old_proj->remark,
			'pay_account' => $old_proj->pay_account,
			'countdown' => $old_proj->countdown,
			'pdt_status' => $old_proj->pdt_status,
			'exclusive' => $old_proj->exclusive,
			'grade' => $old_proj->grade,
			'manager_remark' => $old_proj->manager_remark,
			'editor' => $editor,
			'edit_ts' => date('Y-m-d H:i:s'),
		);
		$query = $this->db->insert('proj_history', $proj);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return true;
	}

	function create_detail($proj_id, $sub_name = '', $found = '', $total_share = '', $status = '', 
		$amount = '', $profit = '', $commission_b_tax = '', $commission_a_tax = '', 
		$inner_commission = '', $outer_commission = '', $imm_payment = '', $month = '', 
		$main_channel = '', $channel_company = '', $channel_contact = '', 
		$billing_company = '', $creator = '',$commission_partner = '') {
		$proj_detail = array(
			'proj_id' => $proj_id,
			'sub_name' => $sub_name,
			'found' => $found,
			'total_share' => $total_share,
			'status' => $status,
			'amount' => $amount,
			'profit' => $profit,
			'commission_b_tax' => $commission_b_tax,
			'commission_a_tax' => $commission_a_tax,
			'inner_commission' => $inner_commission,
			'outer_commission' => $outer_commission,
			'imm_payment' => $imm_payment,
			'month' => $month,
			'main_channel' => $main_channel,
			'channel_company' => $channel_company,
			'channel_contact' => $channel_contact,
			'billing_company' => $billing_company,
			'creator' => $creator,
			'create_ts' => date('Y-m-d H:i:s'),
            'commission_partner' => $commission_partner,
		);
		$query = $this->db->insert('proj_detail', $proj_detail);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return $this->db->insert_id();
	}
	
	function update_detail($proj_detail_id, $sub_name, $found, $total_share, $status, $amount, 
		$profit, $commission_b_tax, $commission_a_tax, $inner_commission, $outer_commission, 
		$imm_payment, $month, $main_channel, $channel_company, $channel_contact, 
		$billing_company, $editor,$commission_partner) {
		//查询旧记录，插入历史表
		$old_proj_detail = $this->get_detail($proj_detail_id);
		if(!$old_proj_detail) {
			return false;
		}
		$proj_detail = array(
			'proj_detail_id' => $old_proj_detail->id,
			'proj_id' => $old_proj_detail->proj_id,
			'sub_name' => $old_proj_detail->sub_name,
			'found' => $old_proj_detail->found,
			'total_share' => $old_proj_detail->total_share,
			'status' => $old_proj_detail->status,
			'amount' => $old_proj_detail->amount,
			'profit' => $old_proj_detail->profit,
			'commission_b_tax' => $old_proj_detail->commission_b_tax,
			'commission_a_tax' => $old_proj_detail->commission_a_tax,
			'inner_commission' => $old_proj_detail->inner_commission,
			'outer_commission' => $old_proj_detail->outer_commission,
			'imm_payment' => $old_proj_detail->imm_payment,
			'month' => $old_proj_detail->month,
			'main_channel' => $old_proj_detail->main_channel,
			'channel_company' => $old_proj_detail->channel_company,
			'channel_contact' => $old_proj_detail->channel_contact,
			'billing_company' => $old_proj_detail->billing_company,
			'editor' => $editor,
			'edit_ts' => date('Y-m-d H:i:s'),
            'commission_partner' => $commission_partner,
		);
		$query = $this->db->insert('proj_detail_history', $proj_detail);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		
		$proj_detail = array(
			'sub_name' => $sub_name,
			'found' => $found,
			'total_share' => $total_share,
			'status' => $status,
			'amount' => $amount,
			'profit' => $profit,
			'commission_b_tax' => $commission_b_tax,
			'commission_a_tax' => $commission_a_tax,
			'inner_commission' => $inner_commission,
			'outer_commission' => $outer_commission,
			'imm_payment' => $imm_payment,
			'month' => $month,
			'main_channel' => $main_channel,
			'channel_company' => $channel_company,
			'channel_contact' => $channel_contact,
			'billing_company' => $billing_company,
            'commission_partner' => $commission_partner,
		);
		$this->db->where('id', $proj_detail_id);
		$this->db->update('proj_detail', $proj_detail);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return $proj_detail_id;
	}

	function close_proj($proj_id) {
		$proj_detail = array(
			'total_share' => '无',
			'status'      => '结束',
		);
		$this->db->where('proj_id', $proj_id);
		$this->db->update('proj_detail', $proj_detail);
        //if($this->db->affected_rows() == 0) {
        //	return false;
        //}
		return true;
	}

	function proj_profit_modify($proj_id) {
		$all_details=$this->get_all_detail($proj_id);
		$n = count($all_details);
		$min_month=10000;
		$max_month=0;
		$min_profit=10000.0;
		$max_profit=0.0;
		$profit_string='';
		$end_status=0;
        $min_amount=10000;
		
		for($i = 0; $i < $n; $i++) {
            //echo $all_details[$i]->month;
			$min_month=($min_month <= $all_details[$i]->month) ? $min_month:$all_details[$i]->month;
			$max_month=($max_month >= $all_details[$i]->month) ? $max_month:$all_details[$i]->month;
			$min_profit=($min_profit <= $all_details[$i]->profit) ? $min_profit:$all_details[$i]->profit;
			$max_profit=($max_profit >= $all_details[$i]->profit) ? $max_profit:$all_details[$i]->profit;
			$min_amount=($min_amount <= $all_details[$i]->amount) ? $min_amount:$all_details[$i]->amount;
            if($all_details[$i]->status!='结束'){
                $profit_string .= $all_details[$i]->sub_name.$all_details[$i]->month.'个月,'.$all_details[$i]->amount.'万: '.$all_details[$i]->profit.'%<br />';
            }
			$end_status += ( ($all_details[$i]->status=='结束') ? 0:1);
		}
		$is_end=(($end_status==0)?false:true);
		$this->db->where('id',$proj_id);
		$this->db->set('min_month',$min_month);
		$this->db->set('max_month',$max_month);
		$this->db->set('min_profit',$min_profit);
		$this->db->set('max_profit',$max_profit);
		$this->db->set('min_amount',$min_amount);
		$this->db->set('profit_string',$profit_string);
		$this->db->set('is_end',$is_end);
		$this->db->update('proj');
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
    
    function get_proj_brief_string($proj,$manager) {
        $proj_str = '<p>'.$proj->profit_property.'收益项目，融资规模'.$proj->scale.'亿，按'.$proj->cycle.'分配。<br />项目评级：';
        $proj_str .= $proj->grade.'<br />资金投向：'.$proj->flow_of_fund.'<br />项目亮点：'.mb_substr($proj->highlights,0,50).'......</p>';
        if($manager == 'm'){
        	$proj_str .= '<p><a href="http://rainbowbridge.sinaapp.com/ts/index.php/proj/update?proj_id='.$proj->id.'">详情请点击这里查看</a>。</p>';
        } else {
            $proj_str .= '<p><a href="http://rainbowbridge.sinaapp.com/ts/index.php/proj?proj_id='.$proj->id.'">详情请点击这里查看</a>。</p>';
        }
        return $proj_str;
    }
	
	function get_all_proj($category_id, $ending_status, $recently = false, $mode = '', $manager = null) {
        $this->db->select('id as proj_id,grade,category,sub_category,issue,flow_of_fund,name,min_amount,min_month,max_month,min_profit,max_profit,proj_director,manager,create_ts,profit_string');
		$this->db->from('proj');
		$this->db->order_by('grade DESC, sub_category DESC, min_month,max_month,min_profit desc,max_profit desc');

        // status条件 //e
		if($ending_status >= 1) {
			$this->db->where('(is_end = 0 OR is_end = 0) ');
		} else {
			$this->db->where('is_end = 1 ');
		}

		// category条件 //c
		$category_query = '';
		if($category_id == 1) {
			$this->db->where('category = "固定收益类" ');
		} else if($category_id == 2) {
			$this->db->where('category = "浮动收益类" ');
		}

		// 最近三个月项目条件 //r
		if($recently) {
			$this->db->where('DATEDIFF(NOW(), proj.update_ts) <= 90 ');
		}

		if($mode == 'manager') {
			$this->db->where('(pdt_status = "上线通过" OR manager = \''.$manager.'\' OR proj_director=\''.$manager.'\') ');
		} else if($mode != 'admin') {
			$this->db->where('pdt_status = "上线通过" ');
		}

        $query = $this->db->get();
		return $query->result();
	}
	
	function get_all_detail($proj_id) {
		$proj = $this->get_proj($proj_id);
		if(!$proj) {
			return false;
		}
		$this->db->select('proj_detail.proj_id as proj_id, proj_detail.id as proj_detail_id, proj_detail.sub_name, proj_detail.found, proj_detail.total_share, proj_detail.status, proj_detail.amount, proj_detail.profit, proj_detail.commission_b_tax, proj_detail.commission_a_tax, proj_detail.inner_commission, proj_detail.outer_commission, proj_detail.imm_payment, proj_detail.month, proj_detail.main_channel, proj_detail.channel_company, proj_detail.channel_contact, proj_detail.billing_company, proj_detail.commission_partner');
		$this->db->from('proj_detail')->where('proj_id', $proj_id);
		$this->db->order_by('proj_detail_id', 'asc');
		$query = $this->db->get();
		$result = $query->result();
		return $result;
	}
	
	function get_all_proj_detail($category_id, $ending_status, $recently = false, $mode = '', $manager = null) {
		$raw_sql  = 'SELECT proj.id AS proj_id, proj_detail.id as proj_detail_id, proj.category, proj.sub_category, ';
		$raw_sql .= 'proj.issue, proj.name, proj.flow_of_fund, ';
		$raw_sql .= 'proj.scale, proj.cycle, proj.profit_property, proj.proj_director, proj.manager, ';
		$raw_sql .= 'proj.contract, proj.remark, proj.pay_account, proj.countdown, ';
		$raw_sql .= 'proj.pdt_status, proj.exclusive, proj.grade, proj.manager_remark, ';
		$raw_sql .= 'proj_detail.id as proj_detail_id, proj_detail.sub_name, ';
		$raw_sql .= 'proj_detail.found, proj_detail.total_share, proj_detail.status, ';
		$raw_sql .= 'proj_detail.amount, proj_detail.profit, proj_detail.commission_b_tax, ';
		$raw_sql .= 'proj_detail.commission_a_tax, proj_detail.inner_commission, ';
		$raw_sql .= 'proj_detail.outer_commission, proj_detail.imm_payment, ';
		$raw_sql .= 'proj_detail.main_channel, proj_detail.channel_company, ';
		$raw_sql .= 'proj_detail.channel_contact, proj_detail.billing_company, proj.create_ts, proj_detail.commission_partner, ';
        //$raw_sql .= 'CASE proj.grade WHEN "五星级" THEN 5 WHEN "四星级" THEN 4 WHEN "三星级" THEN 3 WHEN "二星级" THEN 2 ELSE 1 END AS order_2, ';
		$raw_sql .= 'proj_detail.month ';
		$raw_sql .= 'FROM proj ';
		$raw_sql .= 'LEFT JOIN proj_detail ON proj_detail.proj_id = proj.id ';

		// status条件 //e
		if($ending_status >= 1) {
			$raw_sql .= ' WHERE (proj_detail.status = "结束" OR proj_detail.status IS null) ';
		} else {
			$raw_sql .= ' WHERE proj_detail.status <> "结束" ';
		}

		// category条件 //c
		$category_query = '';
		if($category_id == 1) {
			$raw_sql .= ' AND proj.category = "固定收益类" ';
		} else if($category_id == 2) {
			$raw_sql .= ' AND proj.category = "浮动收益类" ';
		}

		// 最近三个月项目条件 //r
		if($recently) {
			$raw_sql .= ' AND DATEDIFF(NOW(), proj.update_ts) <= 90 ';
		}

		if($mode == 'manager') {
			$raw_sql .= ' AND (proj.pdt_status = "上线通过" OR proj.manager = ? OR proj.proj_director= ?) ';
		} else if($mode != 'admin') {
			$raw_sql .= ' AND proj.pdt_status = "上线通过" ';
		}

		$raw_sql .= ' ORDER BY grade DESC, sub_category DESC, proj.name, proj_detail.month, proj_detail.amount ';

		$query = $this->db->query($raw_sql, array($manager,$manager));
		return $query->result();
	}
    
    function get_promote_proj() {
		$this->db->from('promote_proj');
		$query = $this->db->get();
		return $query->result();
    }

    function is_promoted($proj_id) {
		$this->db->from('promote_proj');
		$this->db->where('proj_id',$proj_id);
		$query = $this->db->get();
        if($query->num_rows()>0) {
            return true;
        }
        return false;
    }
    
    function enter_promote($proj_id = '') {
        $promote_proj = array(
            'proj_id'      => $proj_id,
        );
        $this->db->from('promote_proj');
        $this->db->where('proj_id', $proj_id);
		$query = $this->db->get();
        
        if($query->num_rows()>0){
        	$q = $this->db->delete('promote_proj', $promote_proj);
			if($this->db->affected_rows() !== 1) {
				return false;
			}
        } else {
        	$q = $this->db->insert('promote_proj', $promote_proj);
			if($this->db->affected_rows() !== 1) {
				return false;
			}
        }
		return true;
    }
    
    /*
    function close_promote($proj_id = '') {
        $this->db->from('promote_proj')->where('proj_id', $proj_id);
        $this->db->delete();
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return true;
    }
    */

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
        $this->db->distinct();
        $this->db->select('csr_provider_id,csr_provider_name');
		$this->db->from('cproj_company_relation')->where('is_end', '0');
		$this->db->order_by('csr_provider_id', 'asc');
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

	function create_cproj($proj_name = '', $amount = '', $month = '', $profit_max = '', 
		$profit_suggest = '', $guarantee_mode = '', $repayment = '', $proj_rel = '', 
		$proj_deadline = '', $remark = '' ,$csr_financing_name = '', $csr_financing_id = '',
        $cproj_intro = '', $cproj_manager = '', $cproj_director = '') {
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
            'csr_financing_name' => $csr_financing_name,
            'csr_financing_id' => $csr_financing_id,
            'cproj_create_ts' => date('Y-m-d H:i:s'),
            'cproj_creator' => element('realname', $this->session->userdata('user')),
            'cproj_update_ts' => date('Y-m-d H:i:s'),
            'cproj_editor' => element('realname', $this->session->userdata('user')),
			'cproj_intro'  => $cproj_intro,
			'cproj_manager'  => $cproj_manager,
			'cproj_director'  => $cproj_director,
		);
		$query = $this->db->insert('cproj', $cproj);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return $this->db->insert_id();
	}

	function update_cproj($proj_id, $proj_name = '', $amount = '', $month = '', $profit_max = '', 
		$profit_suggest = '', $guarantee_mode = '', $repayment = '', $proj_rel = '', 
		$proj_deadline = '', $remark = '' ,$csr_financing_name = '', $csr_financing_id = '',
        $cproj_intro = '', $cproj_manager = '', $cproj_director = '') {
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
            'csr_financing_name' => $csr_financing_name,
            'csr_financing_id' => $csr_financing_id,
            'cproj_create_ts' => date('Y-m-d H:i:s'),
            'cproj_creator' => element('realname', $this->session->userdata('user')),
            'cproj_update_ts' => date('Y-m-d H:i:s'),
            'cproj_editor' => element('realname', $this->session->userdata('user')),
			'cproj_intro'  => $cproj_intro,
			'cproj_manager'  => $cproj_manager,
			'cproj_director'  => $cproj_director,
		);
        $this->db->where('id', $proj_id);
		$query = $this->db->update('cproj', $cproj);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return $proj_id;
	}
	function get_cproj($proj_id) {
		$this->db->from('cproj');
		$this->db->where('operation !=', 'deleted');
		$this->db->where('id', $proj_id);
		$query = $this->db->get();
		return $query->row();
	}

	function get_all_cproj() {
		$this->db->from('cproj')->where('operation !=', 'deleted');
		$this->db->order_by('id', 'asc');
		$query = $this->db->get();
		return $query->result();
	}
    
    function get_all_cproj_detail($start='',$limit='',$sort='',$dir='',$q='',$r='',$ch='',$ps='',$pe='', $flw='',$em='') {
        $this->db->select('cproj.id as proj_id,cproj.proj_name,cproj.amount,cproj.month,cproj.profit_max,cproj.profit_suggest,cproj.guarantee_mode,cproj.repayment,cproj.proj_rel,'.
                         'cproj.proj_deadline,cproj.remark,cproj.csr_financing_name,cproj.csr_financing_id,cproj_company_relation.id as relation_id,cproj_company_relation.csr_provider_id,'.
                         'cproj_company_relation.csr_provider_name,cproj_company_relation.status,cproj_company_relation.update_ts,cproj.cproj_create_ts,cproj.cproj_creator,cproj.cproj_update_ts,'.
                         'cproj.cproj_editor,cproj_company_relation.editor,cproj_company_relation.create_ts,cproj_company_relation.creator,cproj.cproj_intro,cproj.cproj_manager,cproj.cproj_director');
        $this->db->from('cproj');
        $this->db->join('cproj_company_relation','cproj.id=cproj_company_relation.proj_id','left');
        if($em==0){
        	$this->db->where('cproj.is_end',0);
        	$this->db->where('cproj_company_relation.is_end=0 or cproj_company_relation.is_end is null');
        } else {
        	$this->db->where('(cproj.is_end=1 or cproj_company_relation.is_end=1)');
        }

        if(!empty($q)){
            $this->db->where('(cproj.proj_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_provider_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_financing_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2).'%\')');
        }
        if(!empty($flw)){
            if($flw=='not_follow'){
                $this->db->where('cproj_company_relation.status is null');
            } else {
            	$this->db->where('cproj_company_relation.status',$flw);
            }
        }
        if(!empty($ps) && !empty($pe)){
            $this->db->where('cproj_company_relation.update_ts >=', date("Y-m-d H:i:s",strtotime($ps)) );
            $this->db->where('cproj_company_relation.update_ts <', date("Y-m-d H:i:s",strtotime("+1 day",strtotime($pe))));
        } else {
	        if($r=='lt7'){
    	        $this->db->where('cproj_company_relation.update_ts >=', date("Y-m-d H:i:s" ,strtotime("-7 day")) );
        	} else if ($r=='gt7'){
            	$this->db->where('cproj_company_relation.update_ts <', date("Y-m-d H:i:s" ,strtotime("-7 day")) );
	        } else if ($r=='lt30'){
    	        $this->db->where('cproj_company_relation.update_ts >=', date("Y-m-d H:i:s" ,strtotime("-30 day")) );
        	} else if ($r=='gt30'){
	            $this->db->where('cproj_company_relation.update_ts <', date("Y-m-d H:i:s" ,strtotime("-30 day")) );
    	    } else if ($r=='nofollow'){
        	    $this->db->where('cproj_company_relation.update_ts is null');
        	}
        }
        if(!empty($ch)){
            $this->db->where('cproj.cproj_creator',$ch);
        }

        if(!empty($sort)){
            $this->db->order_by($sort,$dir);
        } else {
			$this->db->order_by('cproj.id','asc');
        }
        
        if($start>=0 && $limit>0){
           $this->db->limit($limit,$start);
        }
        $query = $this->db->get();
		return $query->result();
    }

    function get_all_cproj_detail_rownum($q='',$r='',$ch='',$ps='',$pe='', $flw='',$em='') {
        $this->db->from('cproj');
        $this->db->join('cproj_company_relation','cproj.id=cproj_company_relation.proj_id','left');
        if($em==0){
        	$this->db->where('cproj.is_end',0);
        	$this->db->where('(cproj_company_relation.is_end=0 or cproj_company_relation.is_end is null)');
        } else {
        	$this->db->where('(cproj.is_end=1 or cproj_company_relation.is_end=1)');
        }

        if(!empty($q)){
            $this->db->where('(cproj.proj_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_provider_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_financing_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2).'%\')');
        }
        if(!empty($flw)){
            if($flw=='not_follow'){
                $this->db->where('cproj_company_relation.status is null');
            } else {
            	$this->db->where('cproj_company_relation.status',$flw);
            }
        }
        if(!empty($ps) && !empty($pe)){
            $this->db->where('cproj_company_relation.update_ts >=', date("Y-m-d H:i:s",strtotime($ps)) );
            $this->db->where('cproj_company_relation.update_ts <', date("Y-m-d H:i:s",strtotime("+1 day",strtotime($pe))));
        } else {
	        if($r=='lt7'){
    	        $this->db->where('cproj_company_relation.update_ts >=', date("Y-m-d H:i:s" ,strtotime("-7 day")) );
        	} else if ($r=='gt7'){
            	$this->db->where('cproj_company_relation.update_ts <', date("Y-m-d H:i:s" ,strtotime("-7 day")) );
	        } else if ($r=='lt30'){
    	        $this->db->where('cproj_company_relation.update_ts >=', date("Y-m-d H:i:s" ,strtotime("-30 day")) );
        	} else if ($r=='gt30'){
	            $this->db->where('cproj_company_relation.update_ts <', date("Y-m-d H:i:s" ,strtotime("-30 day")) );
    	    } else if ($r=='nofollow'){
        	    $this->db->where('cproj_company_relation.update_ts is null');
        	}
        }
        if(!empty($ch)){
            $this->db->where('cproj.cproj_creator',$ch);
        }

        $query = $this->db->get();
		return $query->num_rows();
    }

    function get_cproj_detail_by_owner($realname,$append_users,$start='',$limit='',$sort='',$dir='',$q='',$r='',$ch='',$ps='',$pe='', $flw='',$em='') {

        $this->db->select('cproj.id as proj_id,cproj.proj_name,cproj.amount,cproj.month,cproj.profit_max,cproj.profit_suggest,cproj.guarantee_mode,cproj.repayment,cproj.proj_rel,'.
                         'cproj.proj_deadline,cproj.remark,cproj.csr_financing_name,cproj.csr_financing_id,cproj_company_relation.id as relation_id,cproj_company_relation.csr_provider_id,'.
                         'cproj_company_relation.csr_provider_name,cproj_company_relation.status,cproj_company_relation.update_ts,cproj.cproj_create_ts,cproj.cproj_creator,cproj.cproj_update_ts,'.
                         'cproj.cproj_editor,cproj_company_relation.editor,cproj_company_relation.create_ts,cproj_company_relation.creator,cproj.cproj_intro,cproj.cproj_manager,cproj.cproj_director');
        $this->db->from('cproj');
        $this->db->join('cproj_company_relation','cproj.id=cproj_company_relation.proj_id','left');
        if($em==0){
        	$this->db->where('cproj.is_end',0);
        	$this->db->where('(cproj_company_relation.is_end=0 or cproj_company_relation.is_end is null)');
        } else {
        	$this->db->where('(cproj.is_end=1 or cproj_company_relation.is_end=1)');
        }

        if(!empty($q)){
            $this->db->where('(cproj.proj_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_provider_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_financing_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2).'%\')');
        }
        if(!empty($flw)){
            if($flw=='not_follow'){
                $this->db->where('cproj_company_relation.status is null');
            } else {
            	$this->db->where('cproj_company_relation.status',$flw);
            }
        }
        if(!empty($ps) && !empty($pe)){
            $this->db->where('cproj_company_relation.update_ts >=', date("Y-m-d H:i:s",strtotime($ps)) );
            $this->db->where('cproj_company_relation.update_ts <', date("Y-m-d H:i:s",strtotime("+1 day",strtotime($pe))));
        } else {
	        if($r=='lt7'){
    	        $this->db->where('cproj_company_relation.update_ts >=', date("Y-m-d H:i:s" ,strtotime("-7 day")) );
        	} else if ($r=='gt7'){
            	$this->db->where('cproj_company_relation.update_ts <', date("Y-m-d H:i:s" ,strtotime("-7 day")) );
	        } else if ($r=='lt30'){
    	        $this->db->where('cproj_company_relation.update_ts >=', date("Y-m-d H:i:s" ,strtotime("-30 day")) );
        	} else if ($r=='gt30'){
	            $this->db->where('cproj_company_relation.update_ts <', date("Y-m-d H:i:s" ,strtotime("-30 day")) );
    	    } else if ($r=='nofollow'){
        	    $this->db->where('cproj_company_relation.update_ts is null');
        	}
        }
        if(!empty($ch)){
            $this->db->where('cproj.cproj_creator',$ch);
        } else {
        	if(!empty($append_users)){
        		$apuser_where = '(cproj.cproj_creator=\''.$realname.'\' or ';
        		foreach ($append_users as $row) {
                    if(!empty($row)){
           		    	$apuser_where .= 'cproj.cproj_creator like \'%'.$row.'%\' or ';
                    }
        		}
            	$apuser_where = substr($apuser_where, 0 ,strlen($apuser_where)-3);
            	$apuser_where .= ')';
                //echo($apuser_where);
       	    	$this->db->where($apuser_where);
        	} else {
            	$this->db->where('cproj.cproj_creator',$realname);
        	}
        }

        if(!empty($sort)){
            $this->db->order_by($sort,$dir);
        } else {
			$this->db->order_by('cproj.id','asc');
        }
        
        if($start>=0 && $limit>0){
           $this->db->limit($limit,$start);
        }
        $query = $this->db->get();
        //var_dump($this->db);
		return $query->result();
	}

	function get_cproj_detail_by_owner_rownum($realname,$append_users,$q='',$r='',$ch='',$ps='',$pe='', $flw='',$em='') {
        $this->db->from('cproj');
        $this->db->join('cproj_company_relation','cproj.id=cproj_company_relation.proj_id','left');
        if($em==0){
        	$this->db->where('cproj.is_end',0);
        	$this->db->where('(cproj_company_relation.is_end=0 or cproj_company_relation.is_end is null)');
        } else {
        	$this->db->where('(cproj.is_end=1 or cproj_company_relation.is_end=1)');
        }

        if(!empty($q)){
            $this->db->where('(cproj.proj_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_provider_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_financing_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2).'%\')');
        }
        if(!empty($flw)){
            if($flw=='not_follow'){
                $this->db->where('cproj_company_relation.status is null');
            } else {
            	$this->db->where('cproj_company_relation.status',$flw);
            }
        }
        if(!empty($ps) && !empty($pe)){
            $this->db->where('cproj_company_relation.update_ts >=', date("Y-m-d H:i:s",strtotime($ps)) );
            $this->db->where('cproj_company_relation.update_ts <', date("Y-m-d H:i:s",strtotime("+1 day",strtotime($pe))));
        } else {
	        if($r=='lt7'){
    	        $this->db->where('cproj_company_relation.update_ts >=', date("Y-m-d H:i:s" ,strtotime("-7 day")) );
        	} else if ($r=='gt7'){
            	$this->db->where('cproj_company_relation.update_ts <', date("Y-m-d H:i:s" ,strtotime("-7 day")) );
	        } else if ($r=='lt30'){
    	        $this->db->where('cproj_company_relation.update_ts >=', date("Y-m-d H:i:s" ,strtotime("-30 day")) );
        	} else if ($r=='gt30'){
	            $this->db->where('cproj_company_relation.update_ts <', date("Y-m-d H:i:s" ,strtotime("-30 day")) );
    	    } else if ($r=='nofollow'){
        	    $this->db->where('cproj_company_relation.update_ts is null');
        	}
        }
        if(!empty($ch)){
            $this->db->where('cproj.cproj_creator',$ch);
        } else {
        	if(!empty($append_users)){
        		$apuser_where = '(cproj.cproj_creator=\''.$realname.'\' or ';
        		foreach ($append_users as $row) {
                    if(!empty($row)){
           		    	$apuser_where .= 'cproj.cproj_creator like \'%'.$row.'%\' or ';
                    }
        		}
            	$apuser_where = substr($apuser_where, 0 ,strlen($apuser_where)-3);
            	$apuser_where .= ')';
                //echo($apuser_where);
       	    	$this->db->where($apuser_where);
        	} else {
            	$this->db->where('cproj.cproj_creator',$realname);
        	}
        }

        $query = $this->db->get();
		return $query->num_rows();
	}

    function finish_cproj($proj_id) {
		$data = array(
			'is_end' => 1,
		);
		$this->db->where('id', $proj_id);
		$this->db->update('cproj', $data);
        
        $this->db->where('id', $proj_id);
        $this->db->update('cproj_company_relation',$data);

        return $proj_id;
	}

    function create_relation($proj_id = '', $csr_provider_id = '', $csr_provider_name = '', $status = '', $contact_person = ''/*, $update_ts = ''*/) {
		$this->db->from('cproj_company_relation');
		$this->db->where('proj_id', $proj_id);
		$this->db->where('csr_provider_id', $csr_provider_id);
		$this->db->where('operation !=', 'deleted');
		$query = $this->db->get();
		if($query->result()) {
			return false;
		}

		$relation = array(
			'proj_id'        => $proj_id,
			'csr_provider_id'     => $csr_provider_id,
			'csr_provider_name'   => $csr_provider_name,
			'status'         => $status,
			'contact_person' => $contact_person,
			'update_ts'      => date('Y-m-d H:i:s'),
			'editor'         => element('realname', $this->session->userdata('user')),
			'create_ts'      => date('Y-m-d H:i:s'),
			'creator'        => element('realname', $this->session->userdata('user')),
			'operation'      => 'normal',
		);
		$query = $this->db->insert('cproj_company_relation', $relation);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return $this->db->insert_id();
	}

    function update_relation($relation_id = '', $status = ''/*, $update_ts = ''*/) {
		$data = array(
			'status'    => $status,
			'update_ts'      => date('Y-m-d H:i:s'),
			'editor'         => element('realname', $this->session->userdata('user')),
		);
		$this->db->where('id', $relation_id);
		$this->db->where('operation !=', 'deleted');
		$this->db->update('cproj_company_relation', $data);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return $relation_id;
	}

	function get_relation_id($proj_id = '', $csr_provider_id = '') {
		$this->db->from('cproj_company_relation');
		$this->db->where('operation !=', 'deleted');
		$this->db->where('proj_id', $proj_id);
		$this->db->where('csr_provider_id', $csr_provider_id);
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

    function create_relation_detail($relation_id = '', /*$update_ts = '',*/ $status = '', $update_remark = '') {
		$detail = array(
			'relation_id'    => $relation_id,
            //			'update_ts'      => $update_ts,
			'status'         => $status,
			'update_remark'  => $update_remark,
			'operation'      => 'normal',
			'editor'         => element('realname', $this->CI->session->userdata('user')),
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

    function get_upload_by_id($fileid) {
        $this->db->from('proj_uploads')->where('id', $fileid);
		$query = $this->db->get();
		return $query->result();
    }
    
    function create_upload($proj_id, $filename, $filesize) {
		$upload = array(
			'proj_id'   => $proj_id,
			'filename'  => $filename,
			'filesize'  => $filesize,
			'editor'    => element('realname', $this->CI->session->userdata('user')),
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

	function delete_upload($fileid) {
		$this->db->from('proj_uploads')->where('id', $fileid);
		$this->db->delete();
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return true;
	}
}
