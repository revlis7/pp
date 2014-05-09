<?php
class Order_model extends CI_Model {
	private $CI;

	function __construct() {
		parent::__construct();
		
		$this->CI =& get_instance();
	}
    
    function get_by_id($itemid) {
        $this->db->select('order_achieve.id as itemid,order_achieve.state,order_achieve.is_realname,order_achieve.csr_type,order_achieve.csr_name,order_achieve.csr_id,'.
        'order_achieve.channel_name,order_achieve.channel_id,order_achieve.channel_type,order_achieve.amount,order_achieve.proj_name,order_achieve.proj_id,'.
        'order_achieve.comm_in_percent,order_achieve.comm_out_percent,order_achieve.advance_out,order_achieve.advance_out_request,order_achieve.advance_out_request_ts,'.
        'order_achieve.create_ts,order_achieve.creator,order_achieve.update_ts,order_achieve.editor,order_achieve.invest_ts,order_achieve.invest_checker,'.
        'order_achieve.comm_in_ts,order_achieve.comm_in_checker,order_achieve.comm_out_ts,order_achieve.comm_out_checker,order_achieve.advance_out_ts,'.
        'order_achieve.advance_out_checker,order_achieve.csr_remark,order_achieve.end_remark,order_achieve.comm_in_remark,order_achieve.comm_out_remark,'.
        'order_achieve.advance_out_remark,order_achieve.finish_checker,order_achieve.finish_ts,order_achieve.accept_checker,order_achieve.accept_ts,'.
        'proj.category as proj_category,proj.sub_category as proj_sub_category,proj.issue as proj_issue,'.
        'proj.flow_of_fund as proj_flow_of_fund,proj.profit_property as proj_profit_property,proj.manager as proj_manager,proj.grade as proj_grade,'.
        'proj.proj_director as proj_director,proj.profit_string as proj_profit_string');
        $this->db->where('order_achieve.id',$itemid);
        $this->db->from('order_achieve');
        $this->db->join('proj','proj.id=order_achieve.proj_id');
        $query = $this->db->get();
        return $query->row();
    }
    
    function get_all($start='',$limit='',$sort='',$dir='',$q='',$ch='',$m='',$d='',$s='',$month='',$is_confirmed='') {
        $this->db->select('order_achieve.id as itemid,order_achieve.state,order_achieve.is_realname,order_achieve.csr_type,order_achieve.csr_name,order_achieve.csr_id,'.
        'order_achieve.channel_name,order_achieve.channel_id,order_achieve.channel_type,order_achieve.amount,order_achieve.proj_name,order_achieve.proj_id,'.
        'order_achieve.comm_in_percent,order_achieve.comm_out_percent,order_achieve.advance_out,order_achieve.advance_out_request,order_achieve.advance_out_request_ts,'.
        'order_achieve.create_ts,order_achieve.creator,order_achieve.update_ts,order_achieve.editor,order_achieve.invest_ts,order_achieve.invest_checker,'.
        'order_achieve.comm_in_ts,order_achieve.comm_in_checker,order_achieve.comm_out_ts,order_achieve.comm_out_checker,order_achieve.advance_out_ts,'.
        'order_achieve.advance_out_checker,order_achieve.csr_remark,order_achieve.end_remark,order_achieve.comm_in_remark,order_achieve.comm_out_remark,'.
        'order_achieve.advance_out_remark,order_achieve.finish_checker,order_achieve.finish_ts,order_achieve.accept_checker,order_achieve.accept_ts,'.
        'proj.category as proj_category,proj.sub_category as proj_sub_category,proj.issue as proj_issue,'.
        'proj.flow_of_fund as proj_flow_of_fund,proj.profit_property as proj_profit_property,proj.manager as proj_manager,proj.grade as proj_grade,'.
        'proj.proj_director as proj_director,proj.profit_string as proj_profit_string');
        $this->db->from('order_achieve');
        $this->db->join('proj','proj.id=order_achieve.proj_id');

        if(!empty($m)) {
            $this->db->where('proj.manager',$m);            
        }

        if(!empty($d)) {
            $this->db->where('proj.proj_director',$m);            
        }
        
        if(!empty($q)){
            $this->db->where('(proj.issue like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or proj.name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or flow_of_fund like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or proj.sub_category like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2).'%\')');
        }
        
        if(!empty($s)){
            if($is_confirmed>0) {
                if($s=='confirmed' || $s=='comm_in' || $s=='comm_out' || $s=='maintenance' ) {
            		$this->db->where('state',$s);
                }
            } else if($is_confirmed<=0) {
                if($s=='subscribing' || $s=='accepted' || $s=='invested') {
            		$this->db->where('state',$s);
                }
            }
        } else {
            if($is_confirmed>0) {
           		$this->db->where_in('state',array('confirmed','comm_in','comm_out','maintenance'));
            } else if($is_confirmed<=0) {
           		$this->db->where_in('state',array('subscribing','accepted','invested'));
            }
        }

        if(!empty($sort)){
            $this->db->order_by($sort,$dir);
        } else {
			$this->db->order_by('order_achieve.id','asc');
        }
        
        if($start>=0 && $limit>0){
           $this->db->limit($limit,$start);
        }

        $query = $this->db->get();
        return $query->result();
    }
    function get_all_row_num($q='',$ch='',$m='',$d='',$s='',$month='',$is_confirmed='') {
        $this->db->select("count(*) as cnt,sum(amount) as amount_sum,sum(comm_in_percent*amount*100) as comm_in_sum,sum(comm_out_percent*amount*100) as comm_out_sum");
        $this->db->from('order_achieve');
        $this->db->join('proj','proj.id=order_achieve.proj_id');

        if(!empty($m)) {
            $this->db->where('proj.manager',$m);            
        }

        if(!empty($d)) {
            $this->db->where('proj.proj_director',$m);            
        }
        
        if(!empty($q)){
            $this->db->where('(proj.issue like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or proj.name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or flow_of_fund like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or proj.sub_category like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2).'%\')');
        }
        
        if(!empty($s)){
            if($is_confirmed>0) {
                if($s=='confirmed' || $s=='comm_in' || $s=='comm_out' || $s=='maintenance' ) {
            		$this->db->where('state',$s);
                }
            } else if($is_confirmed<=0) {
                if($s=='subscribing' || $s=='accepted' || $s=='invested') {
            		$this->db->where('state',$s);
                }
            }
        } else {
            if($is_confirmed>0) {
           		$this->db->where_in('state',array('confirmed','comm_in','comm_out','maintenance'));
            } else if($is_confirmed<=0) {
           		$this->db->where_in('state',array('subscribing','accepted','invested'));
            }
        }
        $query = $this->db->get();
        return $query->row();
    }
	function get_by_owner($realname,$append_users,$start='',$limit='',$sort='',$dir='',$q='',$ch='',$m='',$d='',$s='',$month='',$is_confirmed='') {
        $this->db->select('order_achieve.id as itemid,order_achieve.state,order_achieve.is_realname,order_achieve.csr_type,order_achieve.csr_name,order_achieve.csr_id,'.
        'order_achieve.channel_name,order_achieve.channel_id,order_achieve.channel_type,order_achieve.amount,order_achieve.proj_name,order_achieve.proj_id,'.
        'order_achieve.comm_in_percent,order_achieve.comm_out_percent,order_achieve.advance_out,order_achieve.advance_out_request,order_achieve.advance_out_request_ts,'.
        'order_achieve.create_ts,order_achieve.creator,order_achieve.update_ts,order_achieve.editor,order_achieve.invest_ts,order_achieve.invest_checker,'.
        'order_achieve.comm_in_ts,order_achieve.comm_in_checker,order_achieve.comm_out_ts,order_achieve.comm_out_checker,order_achieve.advance_out_ts,'.
        'order_achieve.advance_out_checker,order_achieve.csr_remark,order_achieve.end_remark,order_achieve.comm_in_remark,order_achieve.comm_out_remark,'.
        'order_achieve.advance_out_remark,order_achieve.finish_checker,order_achieve.finish_ts,order_achieve.accept_checker,order_achieve.accept_ts,'.
        'proj.category as proj_category,proj.sub_category as proj_sub_category,proj.issue as proj_issue,'.
        'proj.flow_of_fund as proj_flow_of_fund,proj.profit_property as proj_profit_property,proj.manager as proj_manager,proj.grade as proj_grade,'.
        'proj.proj_director as proj_director,proj.profit_string as proj_profit_string');
        $this->db->from('order_achieve');
        $this->db->join('proj','proj.id=order_achieve.proj_id');

        if(!empty($ch)){
            $this->db->where('order_achieve.creator',$ch);
        } else {
        	if(!empty($append_users)){
        		$apuser_where = '(order_achieve.creator=\''.$realname.'\' or ';
        		foreach ($append_users as $row) {
                    if(!empty($row)){
           		    	$apuser_where .= 'order_achieve.creator like \'%'.$row.'%\' or ';
                    }
        		}
            	$apuser_where = substr($apuser_where, 0 ,strlen($apuser_where)-3);
            	$apuser_where .= ')';
                //echo($apuser_where);
       	    	$this->db->where($apuser_where);
        	} else {
            	$this->db->where('order_achieve.creator',$realname);
        	}
        }
        if(!empty($m)) {
            $this->db->where('proj.manager',$m);            
        }

        if(!empty($d)) {
            $this->db->where('proj.proj_director',$m);            
        }
        if(!empty($q)){
            $this->db->where('(proj.issue like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or proj.name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or flow_of_fund like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or proj.sub_category like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2).'%\')');
        }

        if(!empty($s)){
            if($is_confirmed>0) {
                if($s=='confirmed' || $s=='comm_in' || $s=='comm_out' || $s=='maintenance' ) {
            		$this->db->where('state',$s);
                }
            } else if($is_confirmed<=0) {
                if($s=='subscribing' || $s=='accepted' || $s=='invested') {
            		$this->db->where('state',$s);
                }
            }
        } else {
            if($is_confirmed>0) {
           		$this->db->where_in('state',array('confirmed','comm_in','comm_out','maintenance'));
            } else if($is_confirmed<=0) {
           		$this->db->where_in('state',array('subscribing','accepted','invested'));
            }
        }

        if(!empty($sort)){
            $this->db->order_by($sort,$dir);
        } else {
			$this->db->order_by('order_achieve.id','asc');
        }
        
        if($start>=0 && $limit>0){
           $this->db->limit($limit,$start);
        }
        $query = $this->db->get();
        return $query->result();
        
    }

	function get_by_owner_row_num($realname,$append_users,$q='',$ch='',$m='',$d='',$s='',$month='',$is_confirmed='') {
        $this->db->select("count(*) as cnt,sum(amount) as amount_sum,sum(comm_in_percent*amount*100) as comm_in_sum,sum(comm_out_percent*amount*100) as comm_out_sum");
        $this->db->from('order_achieve');
        $this->db->join('proj','proj.id=order_achieve.proj_id');

        if(!empty($ch)){
            $this->db->where('order_achieve.creator',$ch);
        } else {
        	if(!empty($append_users)){
        		$apuser_where = '(order_achieve.creator=\''.$realname.'\' or ';
        		foreach ($append_users as $row) {
                    if(!empty($row)){
           		    	$apuser_where .= 'order_achieve.creator like \'%'.$row.'%\' or ';
                    }
        		}
            	$apuser_where = substr($apuser_where, 0 ,strlen($apuser_where)-3);
            	$apuser_where .= ')';
                //echo($apuser_where);
       	    	$this->db->where($apuser_where);
        	} else {
            	$this->db->where('order_achieve.creator',$realname);
        	}
        }
        if(!empty($m)) {
            $this->db->where('proj.manager',$m);            
        }

        if(!empty($d)) {
            $this->db->where('proj.proj_director',$m);            
        }
        if(!empty($q)){
            $this->db->where('(proj.issue like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or proj.name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or flow_of_fund like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or proj.sub_category like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2).'%\')');
        }

        if(!empty($s)){
            if($is_confirmed>0) {
                if($s=='confirmed' || $s=='comm_in' || $s=='comm_out' || $s=='maintenance' ) {
            		$this->db->where('state',$s);
                }
            } else if($is_confirmed<=0) {
                if($s=='subscribing' || $s=='accepted' || $s=='invested') {
            		$this->db->where('state',$s);
                }
            }
        } else {
            if($is_confirmed>0) {
           		$this->db->where_in('state',array('confirmed','comm_in','comm_out','maintenance'));
            } else if($is_confirmed<=0) {
           		$this->db->where_in('state',array('subscribing','accepted','invested'));
            }
        }

        $query = $this->db->get();
        return $query->row();
        
    }
    
    function get_by_proj($start='',$limit='',$sort='',$dir='',$q='',$s='',$is_confirmed='') {
        $this->db->select('order_achieve.id as itemid,order_achieve.state,order_achieve.is_realname,order_achieve.csr_type,order_achieve.csr_name,order_achieve.csr_id,'.
        'order_achieve.channel_name,order_achieve.channel_id,order_achieve.channel_type,order_achieve.amount,order_achieve.proj_name,order_achieve.proj_id,'.
        'order_achieve.comm_in_percent,order_achieve.comm_out_percent,order_achieve.advance_out,order_achieve.advance_out_request,order_achieve.advance_out_request_ts,'.
        'order_achieve.create_ts,order_achieve.creator,order_achieve.update_ts,order_achieve.editor,order_achieve.invest_ts,order_achieve.invest_checker,'.
        'order_achieve.comm_in_ts,order_achieve.comm_in_checker,order_achieve.comm_out_ts,order_achieve.comm_out_checker,order_achieve.advance_out_ts,'.
        'order_achieve.advance_out_checker,order_achieve.csr_remark,order_achieve.end_remark,order_achieve.comm_in_remark,order_achieve.comm_out_remark,'.
        'order_achieve.advance_out_remark,order_achieve.finish_checker,order_achieve.finish_ts,order_achieve.accept_checker,order_achieve.accept_ts,'.
        'proj.category as proj_category,proj.sub_category as proj_sub_category,proj.issue as proj_issue,'.
        'proj.flow_of_fund as proj_flow_of_fund,proj.profit_property as proj_profit_property,proj.manager as proj_manager,proj.grade as proj_grade,'.
        'proj.proj_director as proj_director,proj.profit_string as proj_profit_string');
        $this->db->from('order_achieve');
        $this->db->join('proj','proj.id=order_achieve.proj_id');
        
        $this->db->where('proj.manager',element('realname', $this->CI->session->userdata('user')));

        if(!empty($q)){
            $this->db->where('(proj.issue like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or proj.name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or flow_of_fund like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or proj.sub_category like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2).'%\')');
        }

        if(!empty($s)){
            if($is_confirmed>0) {
                if($s=='confirmed' || $s=='comm_in' || $s=='comm_out' || $s=='maintenance' ) {
            		$this->db->where('state',$s);
                }
            } else if($is_confirmed<=0) {
                if($s=='subscribing' || $s=='accepted' || $s=='invested') {
            		$this->db->where('state',$s);
                }
            }
        } else {
            if($is_confirmed>0) {
           		$this->db->where_in('state',array('confirmed','comm_in','comm_out','maintenance'));
            } else if($is_confirmed<=0) {
           		$this->db->where_in('state',array('subscribing','accepted','invested'));
            }
        }

        if(!empty($sort)){
            $this->db->order_by($sort,$dir);
        } else {
			$this->db->order_by('order_achieve.id','asc');
        }
        
        if($start>=0 && $limit>0){
           $this->db->limit($limit,$start);
        }
        $query = $this->db->get();
        return $query->result();
    }
    
    function get_by_proj_row_num($q='',$s='',$is_confirmed='') {
        $this->db->select("count(*) as cnt,sum(amount) as amount_sum,sum(comm_in_percent*amount*100) as comm_in_sum,sum(comm_out_percent*amount*100) as comm_out_sum");
        $this->db->from('order_achieve');
        $this->db->join('proj','proj.id=order_achieve.proj_id');
        
        $this->db->where('proj.manager',element('realname', $this->CI->session->userdata('user')));
        
        if(!empty($q)){
            $this->db->where('(proj.issue like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or proj.name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or flow_of_fund like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or proj.sub_category like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2).'%\')');
        }

        if(!empty($s)){
            if($is_confirmed>0) {
                if($s=='confirmed' || $s=='comm_in' || $s=='comm_out' || $s=='maintenance' ) {
            		$this->db->where('state',$s);
                }
            } else if($is_confirmed<=0) {
                if($s=='subscribing' || $s=='accepted' || $s=='invested') {
            		$this->db->where('state',$s);
                }
            }
        } else {
            if($is_confirmed>0) {
           		$this->db->where_in('state',array('confirmed','comm_in','comm_out','maintenance'));
            } else if($is_confirmed<=0) {
           		$this->db->where_in('state',array('subscribing','accepted','invested'));
            }
        }

        $query = $this->db->get();
        return $query->row();
    }
    
    function create_order($csr_name,$csr_id,$csr_type,$channel_name,$channel_id,$channel_type,$amount,$proj_name,$proj_id,$is_realname) {
        $order=array(
            'csr_name'        => $csr_name,
            'csr_id'          => $csr_id,
            'csr_type'        => $csr_type,
            'channel_name'    => $channel_name,
            'channel_id'      => $channel_id,
            'channel_type'    => $channel_type,
            'amount'          => $amount,
            'is_realname'     => $is_realname,
            'proj_name'       => $proj_name,
            'proj_id'         => $proj_id,
			'creator'         => element('realname', $this->CI->session->userdata('user')),
			'create_ts'       => date('Y-m-d H:i:s'),
			'editor'          => element('realname', $this->CI->session->userdata('user')),
			'update_ts'       => date('Y-m-d H:i:s'),
            'state'           => 'subscribing'
            );
		$query = $this->db->insert('order_achieve', $order);
		if($this->db->affected_rows() !== 1) {
			return false;
		}
		return $this->db->insert_id();
    }
    function update_order($itemid,$csr_name,$csr_id,$csr_type,$channel_name,$channel_id,$channel_type,$amount,$proj_name,$proj_id) {
        $data=array(
            'csr_name'        => $csr_name,
            'csr_id'          => $csr_id,
            'csr_type'        => $csr_type,
            'channel_name'    => $channel_name,
            'channel_id'      => $channel_id,
            'channel_type'    => $channel_type,
            'amount'          => $amount,
            'proj_name'       => $proj_name,
            'proj_id'         => $proj_id,
			'editor'          => element('realname', $this->CI->session->userdata('user')),
			'update_ts'       => date('Y-m-d H:i:s'),
            );
        $this->db->where('id',$itemid);
		$this->db->update('order_achieve',$data);
        return true;
    }
    
    function accept_order($itemid,$comm_in_percent,$comm_out_percent) {
        //accept之后可以开始打款和合同操作
        $data=array(
            'comm_in_percent' => $comm_in_percent,
            'comm_out_percent'=> $comm_out_percent,
			'accept_checker'  => element('realname', $this->CI->session->userdata('user')),
            'state'           => 'accepted',
			'accept_ts'       => date('Y-m-d H:i:s'),
            );
        $this->db->where('id',$itemid);
		$this->db->update('order_achieve',$data);
        return true;
    }
    
    function finish_order($itemid,$state) {
        //finish之后不可以再进行update，但是可以开始后续工作
        $data=array(
			'finish_checker'  => element('realname', $this->CI->session->userdata('user')),
			'finish_ts'       => date('Y-m-d H:i:s'),
            'state'           => $state
            );
        $this->db->where('id',$itemid);
		$this->db->update('order_achieve',$data);
        return true;
    }
    
    function refuse_invest_order($itemid,$submit='') {
       	$data=array(
			'invest_checker'  => '',
			'invest_ts'       => '',
        );
        $this->db->where('id',$itemid);
		$this->db->update('order_achieve',$data);
        return true;
    }
    function invest_order($itemid,$submit='') {
        if(!empty($submit)){
        	$data=array(
				'invest_checker'  => element('realname', $this->CI->session->userdata('user')),
				'invest_ts'       => date('Y-m-d H:i:s'),
            	'state'           => 'invested',
            );
        } else {
        	$data=array(
				'invest_checker'  => element('realname', $this->CI->session->userdata('user')),
				'invest_ts'       => date('Y-m-d H:i:s'),
                );
        }
            
        $this->db->where('id',$itemid);
		$this->db->update('order_achieve',$data);
        return true;
    }
    
    function comm_in_order($itemid,$submit='') {
        if(!empty($submit)){
        	$data=array(
				'comm_in_checker' => element('realname', $this->CI->session->userdata('user')),
				'comm_in_ts'      => date('Y-m-d H:i:s'),
        	    'state'           => 'comm_in',
        	    );
        } else {
        	$data=array(
				'comm_in_checker' => element('realname', $this->CI->session->userdata('user')),
				'comm_in_ts'      => date('Y-m-d H:i:s'),
                );
        }
            
        $this->db->where('id',$itemid);
		$this->db->update('order_achieve',$data);
        return true;
    }
    
    function comm_out_order($itemid,$submit='') {
        if(!empty($submit)){
        	$data=array(
				'comm_out_checker'=> element('realname', $this->CI->session->userdata('user')),
				'comm_out_ts'     => date('Y-m-d H:i:s'),
        	    'state'           => 'comm_out',
        	    );
        } else {
        	$data=array(
				'comm_out_checker' => element('realname', $this->CI->session->userdata('user')),
				'comm_out_ts'     => date('Y-m-d H:i:s'),
                );
        }
            
        $this->db->where('id',$itemid);
		$this->db->update('order_achieve',$data);
        return true;
    }
    
    function advance_order($itemid) {
        $data=array(
			'advance_out'  => element('realname', $this->CI->session->userdata('user')),
			'advance_out_request_ts'       => date('Y-m-d H:i:s'),
            );
        $this->db->where('id',$itemid);
		$this->db->update('order_achieve',$data);
        return true;
    }
    
    function advance_out_order($itemid) {
        $data=array(
			'advance_out_checker'  => element('realname', $this->CI->session->userdata('user')),
			'advance_out_ts'       => date('Y-m-d H:i:s'),
            );
        $this->db->where('id',$itemid);
		$this->db->update('order_achieve',$data);
        return true;
    }

}