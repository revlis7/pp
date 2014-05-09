<?php
class Csr_corp_model extends CI_Model {

	const TABLE_NAME = 'csr_corp';
    const FOLLOW_TABLE_NAME = 'csr_corp_follows';

	function __construct() {
		parent::__construct();
	}
    
	function get_all($start='',$limit='',$sort='',$dir='',$q='',$r='',$c='',$ch='',$ps='',$pe='', $flw='') {
        if(!empty($q)){
            $this->db->where('(csr_corp_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_bname like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact1_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact1_phone like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact1_email like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact2_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact2_phone like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact2_email like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact3_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact3_phone like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact3_email like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact4_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact4_phone like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact4_email like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact5_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact5_phone like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact5_email like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2).'%\')');
        }

        if(!empty($flw)){
            if($flw=='not_follow'){
                $this->db->where('csr_corp_follow_result is null');
            } else {
            	$this->db->where('csr_corp_follow_result',$flw);
            }
        }
        if(!empty($ps) && !empty($pe)){
            $this->db->where('csr_corp_follow_update_ts >=', date("Y-m-d H:i:s",strtotime($ps)) );
            $this->db->where('csr_corp_follow_update_ts <', date("Y-m-d H:i:s",strtotime("+1 day",strtotime($pe))));
        } else {
            if($r=='lt7'){
	            $this->db->where('csr_corp_follow_update_ts >=', date("Y-m-d H:i:s" ,strtotime("-7 day")) );
    	    } else if ($r=='gt7'){
        	    $this->db->where('csr_corp_follow_update_ts <', date("Y-m-d H:i:s" ,strtotime("-7 day")) );
	        } else if ($r=='lt30'){
    	        $this->db->where('csr_corp_follow_update_ts >=', date("Y-m-d H:i:s" ,strtotime("-30 day")) );
        	} else if ($r=='gt30'){
	            $this->db->where('csr_corp_follow_update_ts <', date("Y-m-d H:i:s" ,strtotime("-30 day")) );
    	    } else if ($r=='nofollow'){
        	    $this->db->where('csr_corp_follow_update_ts is null');
        	}
        }

        if($c=='lv0'){
            $this->db->where('csr_corp_cat','');
        } else if($c=='lv1'){
            $this->db->where('csr_corp_cat','目标客户');
        } else if($c=='lv2'){
            $this->db->where('csr_corp_cat','潜在客户');
        } else if($c=='lv3'){
            $this->db->where('csr_corp_cat','意向客户');
        } else if($c=='lv4'){
            $this->db->where('csr_corp_cat','成交客户');
        }

        if(!empty($ch)){
            $this->db->where('csr_corp_FSC_channel',$ch);
        }

        if(!empty($sort)){
            $this->db->order_by($sort,$dir);
        } else {
			$this->db->order_by('csr_corp_id','asc');
        }
        
        if($start>=0 && $limit>0){
           $this->db->limit($limit,$start);
        }
        return $this->db->get(self::TABLE_NAME);
	}
    
	function get_all_row_num($q='',$r='',$c='',$ch='',$ps='',$pe='', $flw='') {
        if(!empty($q)){
            $this->db->where('(csr_corp_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_bname like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact1_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact1_phone like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact1_email like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact2_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact2_phone like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact2_email like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact3_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact3_phone like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact3_email like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact4_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact4_phone like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact4_email like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact5_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact5_phone like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact5_email like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2).'%\')');
        }
        if(!empty($flw)){
            if($flw=='not_follow'){
                $this->db->where('csr_corp_follow_result is null');
            } else {
            	$this->db->where('csr_corp_follow_result',$flw);
            }
        }
        if(!empty($ps) && !empty($pe)){
            $this->db->where('csr_corp_follow_update_ts >=', date("Y-m-d H:i:s",strtotime($ps)) );
            $this->db->where('csr_corp_follow_update_ts <', date("Y-m-d H:i:s",strtotime("+1 day",strtotime($pe))));
        } else {
            if($r=='lt7'){
	            $this->db->where('csr_corp_follow_update_ts >=', date("Y-m-d H:i:s" ,strtotime("-7 day")) );
    	    } else if ($r=='gt7'){
        	    $this->db->where('csr_corp_follow_update_ts <', date("Y-m-d H:i:s" ,strtotime("-7 day")) );
	        } else if ($r=='lt30'){
    	        $this->db->where('csr_corp_follow_update_ts >=', date("Y-m-d H:i:s" ,strtotime("-30 day")) );
        	} else if ($r=='gt30'){
	            $this->db->where('csr_corp_follow_update_ts <', date("Y-m-d H:i:s" ,strtotime("-30 day")) );
    	    } else if ($r=='nofollow'){
        	    $this->db->where('csr_corp_follow_update_ts is null');
        	}
        }

        if($c=='lv0'){
            $this->db->where('csr_corp_cat','');
        } else if($c=='lv1'){
            $this->db->where('csr_corp_cat','目标客户');
        } else if($c=='lv2'){
            $this->db->where('csr_corp_cat','潜在客户');
        } else if($c=='lv3'){
            $this->db->where('csr_corp_cat','意向客户');
        } else if($c=='lv4'){
            $this->db->where('csr_corp_cat','成交客户');
        }

        if(!empty($ch)){
            $this->db->where('csr_corp_FSC_channel',$ch);
        }
        $query = $this->db->get(self::TABLE_NAME);
        return $query->num_rows();
	}

	function get_by_owner($realname,$append_users,$start='',$limit='',$sort='',$dir='',$q='',$r='',$c='',$ch='',$ps='',$pe='', $flw='') {
        
        if(!empty($ch)){
            $this->db->where('csr_corp_FSC_channel',$ch);
        } else {
        	if(!empty($append_users)){
        		$apuser_where = '(csr_corp_FSC_channel=\''.$realname.'\' or ';
        		foreach ($append_users as $row) {
                    if(!empty($row)){
           		    	$apuser_where .= 'csr_corp_FSC_channel like \'%'.$row.'%\' or ';
                    }
        		}
            	$apuser_where = substr($apuser_where, 0 ,strlen($apuser_where)-3);
            	$apuser_where .= ')';
                //echo($apuser_where);
       	    	$this->db->where($apuser_where);
        	} else {
            	$this->db->where('csr_corp_FSC_channel',$realname);
        	}
        }
        if(!empty($q)){
            $this->db->where('(csr_corp_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_bname like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact1_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact1_phone like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact1_email like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact2_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact2_phone like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact2_email like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact3_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact3_phone like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact3_email like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact4_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact4_phone like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact4_email like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact5_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact5_phone like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact5_email like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2).'%\')');
        }
        if(!empty($flw)){
            if($flw=='not_follow'){
                $this->db->where('csr_corp_follow_result is null');
            } else {
            	$this->db->where('csr_corp_follow_result',$flw);
            }
        }
        if(!empty($ps) && !empty($pe)){
            $this->db->where('csr_corp_follow_update_ts >=', date("Y-m-d H:i:s",strtotime($ps)) );
            $this->db->where('csr_corp_follow_update_ts <', date("Y-m-d H:i:s",strtotime("+1 day",strtotime($pe))));
        } else {
            if($r=='lt7'){
	            $this->db->where('csr_corp_follow_update_ts >=', date("Y-m-d H:i:s" ,strtotime("-7 day")) );
    	    } else if ($r=='gt7'){
        	    $this->db->where('csr_corp_follow_update_ts <', date("Y-m-d H:i:s" ,strtotime("-7 day")) );
	        } else if ($r=='lt30'){
    	        $this->db->where('csr_corp_follow_update_ts >=', date("Y-m-d H:i:s" ,strtotime("-30 day")) );
        	} else if ($r=='gt30'){
	            $this->db->where('csr_corp_follow_update_ts <', date("Y-m-d H:i:s" ,strtotime("-30 day")) );
    	    } else if ($r=='nofollow'){
        	    $this->db->where('csr_corp_follow_update_ts is null');
        	}
        }

        if($c=='lv0'){
            $this->db->where('csr_corp_cat','');
        } else if($c=='lv1'){
            $this->db->where('csr_corp_cat','目标客户');
        } else if($c=='lv2'){
            $this->db->where('csr_corp_cat','潜在客户');
        } else if($c=='lv3'){
            $this->db->where('csr_corp_cat','意向客户');
        } else if($c=='lv4'){
            $this->db->where('csr_corp_cat','成交客户');
        }

        if(!empty($sort)){
            $this->db->order_by($sort,$dir);
        } else {
			$this->db->order_by('csr_corp_id','asc');
        }
        
        if($start>=0 && $limit>0){
           $this->db->limit($limit,$start);
        }
        return $this->db->get(self::TABLE_NAME);
	}

	function get_by_owner_row_num($realname,$append_users,$q='',$r='',$c='',$ch='',$ps='',$pe='', $flw='') {
        if(!empty($ch)){
            $this->db->where('csr_corp_FSC_channel',$ch);
        } else {
        	if(!empty($append_users)){
        		$apuser_where = '(csr_corp_FSC_channel=\''.$realname.'\' or ';
        		foreach ($append_users as $row) {
                    if(!empty($row)){
           		    	$apuser_where .= 'csr_corp_FSC_channel like \'%'.$row.'%\' or ';
                    }
        		}
            	$apuser_where = substr($apuser_where, 0 ,strlen($apuser_where)-3);
            	$apuser_where .= ')';
                //echo($apuser_where);
       	    	$this->db->where($apuser_where);
        	} else {
            	$this->db->where('csr_corp_FSC_channel',$realname);
        	}
        }
        if(!empty($q)){
            $this->db->where('(csr_corp_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_bname like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact1_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact1_phone like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact1_email like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact2_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact2_phone like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact2_email like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact3_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact3_phone like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact3_email like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact4_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact4_phone like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact4_email like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact5_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact5_phone like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_corp_contact5_email like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2).'%\')');
        }
        if(!empty($flw)){
            if($flw=='not_follow'){
                $this->db->where('csr_corp_follow_result is null');
            } else {
            	$this->db->where('csr_corp_follow_result',$flw);
            }
        }
        if(!empty($ps) && !empty($pe)){
            $this->db->where('csr_corp_follow_update_ts >=', date("Y-m-d H:i:s",strtotime($ps)) );
            $this->db->where('csr_corp_follow_update_ts <', date("Y-m-d H:i:s",strtotime("+1 day",strtotime($pe))));
        } else {
            if($r=='lt7'){
	            $this->db->where('csr_corp_follow_update_ts >=', date("Y-m-d H:i:s" ,strtotime("-7 day")) );
    	    } else if ($r=='gt7'){
        	    $this->db->where('csr_corp_follow_update_ts <', date("Y-m-d H:i:s" ,strtotime("-7 day")) );
	        } else if ($r=='lt30'){
    	        $this->db->where('csr_corp_follow_update_ts >=', date("Y-m-d H:i:s" ,strtotime("-30 day")) );
        	} else if ($r=='gt30'){
	            $this->db->where('csr_corp_follow_update_ts <', date("Y-m-d H:i:s" ,strtotime("-30 day")) );
    	    } else if ($r=='nofollow'){
        	    $this->db->where('csr_corp_follow_update_ts is null');
        	}
        }

        if($c=='lv0'){
            $this->db->where('csr_corp_cat','');
        } else if($c=='lv1'){
            $this->db->where('csr_corp_cat','目标客户');
        } else if($c=='lv2'){
            $this->db->where('csr_corp_cat','潜在客户');
        } else if($c=='lv3'){
            $this->db->where('csr_corp_cat','意向客户');
        } else if($c=='lv4'){
            $this->db->where('csr_corp_cat','成交客户');
        }

        $query = $this->db->get(self::TABLE_NAME);
        return $query->num_rows();
	}

    function get_by_id($csr_corp_id) {
		$this->db->where('csr_corp_id', $csr_corp_id);
		$query = $this->db->get(self::TABLE_NAME);
        return $query->row();
	}
    
    function get_by_name($name) {
        $this->db->where('csr_corp_name', $name);
        $this->db->or_where('csr_corp_bname', $name);
        return $this->db->get(self::TABLE_NAME);
    }

	// add new record
	function save($csr_corp) {
		$ts = date('Y-m-d H:i:s');
		$csr_corp['csr_corp_create_ts'] = $ts;
		$csr_corp['csr_corp_update_ts'] = $ts;
		$this->db->insert(self::TABLE_NAME, $csr_corp);
		return $this->db->insert_id();
	}

	// update record by id
	function update($csr_corp_id, $csr_corp) {
		$ts = date('Y-m-d H:i:s');
		$csr_corp['csr_corp_update_ts'] = $ts;
		$this->db->where('csr_corp_id', $csr_corp_id);
		$this->db->update(self::TABLE_NAME, $csr_corp);
		return true;
	}

	function get_follow_by_id($csr_corp_id) {
		$this->db->where('csr_corp_id', $csr_corp_id);
		return $this->db->get('csr_corp_follows');
	}
    
    function update_follow($csr_corp_id, $csr_corp_follow) {
		$ts = date('Y-m-d H:i:s');
		$csr_corp_follow['csr_corp_follow_update_ts'] = $ts;
        unset($csr_corp_follow['csr_corp_follow_result']);
		$this->db->where('csr_corp_id', $csr_corp_id);
        $this->db->update(self::TABLE_NAME, $csr_corp_follow);
		return true;
	}
    
    function insert_follow($csr_corp_id, $csr_corp_follow) {
        
		$ts = date('Y-m-d H:i:s');
		$csr_corp_follow['csr_corp_follow_update_ts'] = $ts;
        $csr_corp_follow['csr_corp_id'] = $csr_corp_id;
        $csr_corp_follow['csr_corp_follow_creator'] = element('realname', $this->session->userdata('user'));
        $this->db->insert(self::FOLLOW_TABLE_NAME,$csr_corp_follow);
        return true;
    }
    
    function get_all_follows($start='',$limit='',$sort='',$dir=''){
        $this->db->select(self::FOLLOW_TABLE_NAME.'.csr_corp_id,'.self::FOLLOW_TABLE_NAME.'.csr_corp_FSC_follow_status,'.
                          self::FOLLOW_TABLE_NAME.'.csr_corp_FSC_opp_and_prob,'.self::FOLLOW_TABLE_NAME.'.csr_corp_FSC_solution,'.
                          self::FOLLOW_TABLE_NAME.'.csr_corp_follow_update_ts,'.self::FOLLOW_TABLE_NAME.'.id,'.
                          self::FOLLOW_TABLE_NAME.'.csr_corp_follow_creator,'.self::TABLE_NAME.'.csr_corp_cat,'.
                          self::TABLE_NAME.'.csr_corp_name,'.self::TABLE_NAME.'.csr_corp_contact1_name,'.self::TABLE_NAME.'.csr_corp_contact1_phone'
                    );
        $this->db->from(self::FOLLOW_TABLE_NAME);
        
        $this->db->join(self::TABLE_NAME, self::TABLE_NAME.'.csr_corp_id = '.self::FOLLOW_TABLE_NAME.'.csr_corp_id');

        if(!empty($sort)){
            $this->db->order_by($sort,$dir);
        } else {
			$this->db->order_by('csr_corp_follow_update_ts','desc');
        }
        if($start>=0 && $limit>0){
           $this->db->limit($limit,$start);
        }
        return $this->db->get();
        
    }
	function get_all_follows_row_num() {
        $query=$this->db->query('select 1 from csr_corp_follows');
        return $query->num_rows();
	}
    function get_follows_by_owner($realname,$append_users,$start='',$limit='',$sort='',$dir=''){
        $this->db->select(self::FOLLOW_TABLE_NAME.'.csr_corp_id,'.self::FOLLOW_TABLE_NAME.'.csr_corp_FSC_follow_status,'.
                          self::FOLLOW_TABLE_NAME.'.csr_corp_FSC_opp_and_prob,'.self::FOLLOW_TABLE_NAME.'.csr_corp_FSC_solution,'.
                          self::FOLLOW_TABLE_NAME.'.csr_corp_follow_update_ts,'.self::FOLLOW_TABLE_NAME.'.id,'.
                          self::FOLLOW_TABLE_NAME.'.csr_corp_follow_creator,'.self::TABLE_NAME.'.csr_corp_cat,'.
                          self::TABLE_NAME.'.csr_corp_name,'.self::TABLE_NAME.'.csr_corp_contact1_name,'.self::TABLE_NAME.'.csr_corp_contact1_phone'
                    );
        $this->db->from(self::FOLLOW_TABLE_NAME);
        
        $this->db->join(self::TABLE_NAME, self::TABLE_NAME.'.csr_corp_id = '.self::FOLLOW_TABLE_NAME.'.csr_corp_id');
        $this->db->where(self::FOLLOW_TABLE_NAME.'.csr_corp_follow_creator', $realname);
        
        if(!empty($append_users)){
        	foreach ($append_users as $row) {
        	    $this->db->or_where(self::FOLLOW_TABLE_NAME.'.csr_corp_follow_creator',$row->realname);
        	}
        }
        if(!empty($sort)){
            $this->db->order_by($sort,$dir);
        } else {
			$this->db->order_by('csr_corp_follow_update_ts','desc');
        }
        if($start>=0 && $limit>0){
           $this->db->limit($limit,$start);
        }
        return $this->db->get();
        
    }

	function get_follows_by_owner_row_num($realname,$append_users) {
        $this->db->where('csr_corp_follow_creator', $realname);
        if(!empty($append_users)){
        	foreach ($append_users as $row) {
        	    $this->db->or_where('csr_corp_follow_creator',$row->realname);
        	}
        }
        $query = $this->db->get(self::FOLLOW_TABLE_NAME);
        return $query->num_rows();
	}
}