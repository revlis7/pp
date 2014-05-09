<?php
class Csr_person_model extends CI_Model {

	const TABLE_NAME = 'csr_person';
    const FOLLOW_TABLE_NAME = 'csr_person_follows';

	function __construct() {
		parent::__construct();
	}
    
	function get_all($start='',$limit='',$sort='',$dir='',$q='',$r='',$c='',$ch='',$ps='',$pe='', $flw='') {
        $this->db->select('csr_person_id,csr_person_cat,csr_person_name,csr_person_gender,csr_person_age,csr_person_telephone,csr_person_mobile,csr_person_qq,csr_person_email,csr_person_financial_pref,csr_person_financial_demand,csr_person_follow_result,csr_person_FSC_follow_status,csr_person_FSC_channel,csr_person_creator,csr_person_create_ts,csr_person_editor,csr_person_update_ts,csr_person_follow_creator,csr_person_follow_update_ts');
        
        if(!empty($q)){
            $this->db->where('(csr_person_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_person_mobile like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_person_telephone like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_person_email like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_person_qq like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_person_city like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2).'%\')');
        }
        if(!empty($flw)){
            if($flw=='not_follow'){
                $this->db->where('csr_person_follow_result is null');
            } else {
            	$this->db->where('csr_person_follow_result',$flw);
            }
        }
        if(!empty($ps) && !empty($pe)){
            $this->db->where('csr_person_follow_update_ts >=', date("Y-m-d H:i:s",strtotime($ps)) );
            $this->db->where('csr_person_follow_update_ts <', date("Y-m-d H:i:s",strtotime("+1 day",strtotime($pe))));
        } else {
	        if($r=='lt7'){
    	        $this->db->where('csr_person_follow_update_ts >=', date("Y-m-d H:i:s" ,strtotime("-7 day")) );
        	} else if ($r=='gt7'){
            	$this->db->where('csr_person_follow_update_ts <', date("Y-m-d H:i:s" ,strtotime("-7 day")) );
	        } else if ($r=='lt30'){
    	        $this->db->where('csr_person_follow_update_ts >=', date("Y-m-d H:i:s" ,strtotime("-30 day")) );
        	} else if ($r=='gt30'){
	            $this->db->where('csr_person_follow_update_ts <', date("Y-m-d H:i:s" ,strtotime("-30 day")) );
    	    } else if ($r=='nofollow'){
        	    $this->db->where('csr_person_follow_update_ts is null');
        	}
        }
        
        if($c=='lv0'){
            $this->db->where('csr_person_cat','');
        } else if($c=='lv1'){
            $this->db->where('csr_person_cat','目标客户');
        } else if($c=='lv2'){
            $this->db->where('csr_person_cat','潜在客户');
        } else if($c=='lv3'){
            $this->db->where('csr_person_cat','意向客户');
        } else if($c=='lv4'){
            $this->db->where('csr_person_cat','成交客户');
        }

        if(!empty($ch)){
            $this->db->where('csr_person_FSC_channel',$ch);
        }

        if(!empty($sort)){
            $this->db->order_by($sort,$dir);
        } else {
			$this->db->order_by('csr_person_id','asc');
        }
        
        if($start>=0 && $limit>0){
           $this->db->limit($limit,$start);
        }
        $query = $this->db->get(self::TABLE_NAME);
        return $query->result();
	}
    
	function get_all_row_num($q='',$r='',$c='',$ch='',$ps='',$pe='', $flw='') {
        if(!empty($q)){
            $this->db->where('(csr_person_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_person_mobile like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_person_telephone like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_person_email like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_person_qq like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_person_city like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2).'%\')');
        }
        if(!empty($flw)){
            if($flw=='not_follow'){
                $this->db->where('csr_person_follow_result is null');
            } else {
            	$this->db->where('csr_person_follow_result',$flw);
            }
        }
        if(!empty($ps) && !empty($pe)){
            $this->db->where('csr_person_follow_update_ts >=', date("Y-m-d H:i:s",strtotime($ps)) );
            $this->db->where('csr_person_follow_update_ts <', date("Y-m-d H:i:s",strtotime("+1 day",strtotime($pe))));
        } else {
	        if($r=='lt7'){
    	        $this->db->where('csr_person_follow_update_ts >=', date("Y-m-d H:i:s" ,strtotime("-7 day")) );
        	} else if ($r=='gt7'){
            	$this->db->where('csr_person_follow_update_ts <', date("Y-m-d H:i:s" ,strtotime("-7 day")) );
	        } else if ($r=='lt30'){
    	        $this->db->where('csr_person_follow_update_ts >=', date("Y-m-d H:i:s" ,strtotime("-30 day")) );
        	} else if ($r=='gt30'){
	            $this->db->where('csr_person_follow_update_ts <', date("Y-m-d H:i:s" ,strtotime("-30 day")) );
    	    } else if ($r=='nofollow'){
        	    $this->db->where('csr_person_follow_update_ts is null');
        	}
        }

        if($c=='lv0'){
            $this->db->where('csr_person_cat','');
        } else if($c=='lv1'){
            $this->db->where('csr_person_cat','目标客户');
        } else if($c=='lv2'){
            $this->db->where('csr_person_cat','潜在客户');
        } else if($c=='lv3'){
            $this->db->where('csr_person_cat','意向客户');
        } else if($c=='lv4'){
            $this->db->where('csr_person_cat','成交客户');
        }

        if(!empty($ch)){
            $this->db->where('csr_person_FSC_channel',$ch);
        }
        $query = $this->db->get(self::TABLE_NAME);
        return $query->num_rows();
	}

	function get_by_owner($realname,$append_users,$start='',$limit='',$sort='',$dir='',$q='',$r='',$c='',$ch='',$ps='',$pe='', $flw='') {
        $this->db->select('csr_person_id,csr_person_cat,csr_person_name,csr_person_gender,csr_person_age,csr_person_telephone,csr_person_mobile,csr_person_qq,csr_person_email,csr_person_financial_pref,csr_person_financial_demand,csr_person_follow_result,csr_person_FSC_follow_status,csr_person_FSC_channel,csr_person_creator,csr_person_create_ts,csr_person_editor,csr_person_update_ts,csr_person_follow_creator,csr_person_follow_update_ts');
        if(!empty($ch)){
            $this->db->where('csr_person_FSC_channel',$ch);
        } else {
        	if(!empty($append_users)){
        		$apuser_where = '(csr_person_FSC_channel=\''.$realname.'\' or ';
        		foreach ($append_users as $row) {
                    if(!empty($row)){
           		    	$apuser_where .= 'csr_person_FSC_channel like \'%'.$row.'%\' or ';
                    }
        		}
            	$apuser_where = substr($apuser_where, 0 ,strlen($apuser_where)-3);
            	$apuser_where .= ')';
                //echo($apuser_where);
       	    	$this->db->where($apuser_where);
        	} else {
            	$this->db->where('csr_person_FSC_channel',$realname);
        	}
        }
        //    echo(substr($this->db->escape($q),1,strlen($this->db->escape($q))-2));
        if(!empty($flw)){
            if($flw=='not_follow'){
                $this->db->where('csr_person_follow_result is null');
            } else {
            	$this->db->where('csr_person_follow_result',$flw);
            }
        }
        if(!empty($q)){
            $this->db->where('(csr_person_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_person_mobile like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_person_telephone like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_person_email like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_person_qq like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_person_city like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2).'%\')');
        }
        if(!empty($ps) && !empty($pe)){
            $this->db->where('csr_person_follow_update_ts >=', date("Y-m-d H:i:s",strtotime($ps)) );
            $this->db->where('csr_person_follow_update_ts <', date("Y-m-d H:i:s",strtotime("+1 day",strtotime($pe))));
        } else {
	        if($r=='lt7'){
    	        $this->db->where('csr_person_follow_update_ts >=', date("Y-m-d H:i:s" ,strtotime("-7 day")) );
        	} else if ($r=='gt7'){
            	$this->db->where('csr_person_follow_update_ts <', date("Y-m-d H:i:s" ,strtotime("-7 day")) );
	        } else if ($r=='lt30'){
    	        $this->db->where('csr_person_follow_update_ts >=', date("Y-m-d H:i:s" ,strtotime("-30 day")) );
        	} else if ($r=='gt30'){
	            $this->db->where('csr_person_follow_update_ts <', date("Y-m-d H:i:s" ,strtotime("-30 day")) );
    	    } else if ($r=='nofollow'){
        	    $this->db->where('csr_person_follow_update_ts is null');
        	}
        }

        if($c=='lv0'){
            $this->db->where('csr_person_cat','');
        } else if($c=='lv1'){
            $this->db->where('csr_person_cat','目标客户');
        } else if($c=='lv2'){
            $this->db->where('csr_person_cat','潜在客户');
        } else if($c=='lv3'){
            $this->db->where('csr_person_cat','意向客户');
        } else if($c=='lv4'){
            $this->db->where('csr_person_cat','成交客户');
        }

        if(!empty($sort)){
            $this->db->order_by($sort,$dir);
        } else {
			$this->db->order_by('csr_person_id','asc');
        }
        if($start>=0 && $limit>0){
           $this->db->limit($limit,$start);
        }
        $query = $this->db->get(self::TABLE_NAME);
        return $query->result();
	}

	function get_by_owner_row_num($realname,$append_users,$q='',$r='',$c='',$ch='',$ps='',$pe='', $flw='') {
        if(!empty($ch)){
            $this->db->where('csr_person_FSC_channel',$ch);
        } else {
        	if(!empty($append_users)){
        		$apuser_where = '(csr_person_FSC_channel=\''.$realname.'\' or ';
        		foreach ($append_users as $row) {
                    if(!empty($row)){
           		    	$apuser_where .= 'csr_person_FSC_channel like \'%'.$row.'%\' or ';
                    }
        		}
            	$apuser_where = substr($apuser_where, 0 ,strlen($apuser_where)-3);
            	$apuser_where .= ')';
                //echo($apuser_where);
       	    	$this->db->where($apuser_where);
        	} else {
            	$this->db->where('csr_person_FSC_channel',$realname);
        	}
        }
        if(!empty($flw)){
            if($flw=='not_follow'){
                $this->db->where('csr_person_follow_result is null');
            } else {
            	$this->db->where('csr_person_follow_result',$flw);
            }
        }
        if(!empty($q)){
            $this->db->where('(csr_person_name like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_person_mobile like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_person_telephone like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_person_email like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_person_qq like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2)
            				.'%\' or csr_person_city like \'%'.substr($this->db->escape($q),1,strlen($this->db->escape($q))-2).'%\')');
        }
        if(!empty($ps) && !empty($pe)){
            $this->db->where('csr_person_follow_update_ts >=', date("Y-m-d H:i:s",strtotime($ps)) );
            $this->db->where('csr_person_follow_update_ts <', date("Y-m-d H:i:s",strtotime("+1 day",strtotime($pe))));
        } else {
	        if($r=='lt7'){
    	        $this->db->where('csr_person_follow_update_ts >=', date("Y-m-d H:i:s" ,strtotime("-7 day")) );
        	} else if ($r=='gt7'){
            	$this->db->where('csr_person_follow_update_ts <', date("Y-m-d H:i:s" ,strtotime("-7 day")) );
	        } else if ($r=='lt30'){
    	        $this->db->where('csr_person_follow_update_ts >=', date("Y-m-d H:i:s" ,strtotime("-30 day")) );
        	} else if ($r=='gt30'){
	            $this->db->where('csr_person_follow_update_ts <', date("Y-m-d H:i:s" ,strtotime("-30 day")) );
    	    } else if ($r=='nofollow'){
        	    $this->db->where('csr_person_follow_update_ts is null');
        	}
        }

        if($c=='lv0'){
            $this->db->where('csr_person_cat','');
        } else if($c=='lv1'){
            $this->db->where('csr_person_cat','目标客户');
        } else if($c=='lv2'){
            $this->db->where('csr_person_cat','潜在客户');
        } else if($c=='lv3'){
            $this->db->where('csr_person_cat','意向客户');
        } else if($c=='lv4'){
            $this->db->where('csr_person_cat','成交客户');
        }

        $query = $this->db->get(self::TABLE_NAME);
        return $query->num_rows();
	}

    function get_by_id($csr_person_id) {
		$this->db->where('csr_person_id', $csr_person_id);
		$query = $this->db->get(self::TABLE_NAME);
        return $query->row();
	}

	// add new record
	function save($csr_person) {
		$ts = date('Y-m-d H:i:s');
		$csr_person['csr_person_create_ts'] = $ts;
		$csr_person['csr_person_update_ts'] = $ts;
		$this->db->insert(self::TABLE_NAME, $csr_person);
		return $this->db->insert_id();
	}

	// update record by id
	function update($csr_person_id, $csr_person) {
		$ts = date('Y-m-d H:i:s');
		$csr_person['csr_person_update_ts'] = $ts;
		$this->db->where('csr_person_id', $csr_person_id);
		$this->db->update(self::TABLE_NAME, $csr_person);
		return true;
	}
    
    function save_history( $csr_person) {
		$ts = date('Y-m-d H:i:s');
		$csr_person->update_ts = $ts;
		$csr_person->editor = element('loginname', $this->session->userdata('user'));;
		$this->db->insert('csr_person_history', $csr_person);
		return true;
    }

	function get_follow_by_id($csr_person_id) {
		$this->db->where('csr_person_id', $csr_person_id);
		$query = $this->db->get('csr_person_follows');
        return $query->result();
	}
    
    function update_follow($csr_person_id, $csr_person_follow) {
		$ts = date('Y-m-d H:i:s');
		$csr_person_follow['csr_person_follow_update_ts'] = $ts;
		$this->db->where('csr_person_id', $csr_person_id);
        $this->db->update(self::TABLE_NAME, $csr_person_follow);
		return true;
	}
    
    function insert_follow($csr_person_id, $csr_person_follow) {
        
		$ts = date('Y-m-d H:i:s');
		$csr_person_follow['csr_person_follow_update_ts'] = $ts;
        $csr_person_follow['csr_person_id'] = $csr_person_id;
        $csr_person_follow['csr_person_follow_creator'] = element('realname', $this->session->userdata('user'));
        $this->db->insert(self::FOLLOW_TABLE_NAME,$csr_person_follow);
        return true;
    }
        
    function get_all_follows($start='',$limit='',$sort='',$dir=''){
        $this->db->select(self::FOLLOW_TABLE_NAME.'.csr_person_id,'.self::FOLLOW_TABLE_NAME.'.csr_person_FSC_follow_status,'.
                          self::FOLLOW_TABLE_NAME.'.csr_person_FSC_opp_and_prob,'.self::FOLLOW_TABLE_NAME.'.csr_person_FSC_solution,'.
                          self::FOLLOW_TABLE_NAME.'.csr_person_follow_update_ts,'.self::FOLLOW_TABLE_NAME.'.id,'.
                          self::FOLLOW_TABLE_NAME.'.csr_person_follow_creator,'.self::FOLLOW_TABLE_NAME.'.csr_person_follow_result,'.self::TABLE_NAME.'.csr_person_cat,'.
                          self::TABLE_NAME.'.csr_person_name,'.self::TABLE_NAME.'.csr_person_gender,'.self::TABLE_NAME.'.csr_person_mobile,'.
                          self::TABLE_NAME.'.csr_person_FSC_channel'
                    );
        $this->db->from(self::FOLLOW_TABLE_NAME);
        
        $this->db->join(self::TABLE_NAME, self::TABLE_NAME.'.csr_person_id = '.self::FOLLOW_TABLE_NAME.'.csr_person_id');

        if(!empty($sort)){
            $this->db->order_by($sort,$dir);
        } else {
			$this->db->order_by('csr_person_follow_update_ts','desc');
        }
        if($start>=0 && $limit>0){
           $this->db->limit($limit,$start);
        }
        $query = $this->db->get();
        return $query->result();
        
    }
	function get_all_follows_row_num() {
        $query=$this->db->query('select 1 from csr_person_follows');
        return $query->num_rows();
	}
    function get_follows_by_owner($realname,$append_users= '',$s_day = '',$s_mode='',$start='',$limit='',$sort='',$dir=''){
        $this->db->select(self::FOLLOW_TABLE_NAME.'.csr_person_id,'.self::FOLLOW_TABLE_NAME.'.csr_person_FSC_follow_status,'.
                          self::FOLLOW_TABLE_NAME.'.csr_person_FSC_opp_and_prob,'.self::FOLLOW_TABLE_NAME.'.csr_person_FSC_solution,'.
                          self::FOLLOW_TABLE_NAME.'.csr_person_follow_update_ts,'.self::FOLLOW_TABLE_NAME.'.id,'.
                          self::FOLLOW_TABLE_NAME.'.csr_person_follow_creator,'.self::FOLLOW_TABLE_NAME.'.csr_person_follow_result,'.self::TABLE_NAME.'.csr_person_cat,'.
                          self::TABLE_NAME.'.csr_person_name,'.self::TABLE_NAME.'.csr_person_gender,'.self::TABLE_NAME.'.csr_person_mobile,'.
                          self::TABLE_NAME.'.csr_person_FSC_channel'
                    );
        $this->db->from(self::FOLLOW_TABLE_NAME);
        
        $this->db->join(self::TABLE_NAME, self::TABLE_NAME.'.csr_person_id = '.self::FOLLOW_TABLE_NAME.'.csr_person_id');

        if(!empty($s_day)){
        	$this->db->where(self::FOLLOW_TABLE_NAME.'.csr_person_follow_update_ts >=', date("Y-m-d",$s_day));
        	$this->db->where(self::FOLLOW_TABLE_NAME.'.csr_person_follow_update_ts <', date("Y-m-d",strtotime("+".$s_mode." day",$s_day)));
        }
        if(!empty($append_users)){
        	$apuser_where = '(csr_person_follow_creator=\''.$realname.'\' or ';
        	foreach ($append_users as $row) {
                $apuser_where .= 'csr_person_follow_creator like \'%'.$row.'%\' or ';
        	}
            $apuser_where = substr($apuser_where, 0 ,strlen($apuser_where)-3);
            $apuser_where .= ')';
            //echo($apuser_where);
       	    $this->db->where($apuser_where);
        } else {
            $this->db->where(self::FOLLOW_TABLE_NAME.'.csr_person_follow_creator',$realname);
        }
        if(!empty($sort)){
            $this->db->order_by($sort,$dir);
        } else {
			$this->db->order_by(self::FOLLOW_TABLE_NAME.'.csr_person_follow_update_ts','desc');
        }
        if($start>=0 && $limit>0){
           $this->db->limit($limit,$start);
        }
        //echo(var_dump($this->db));
        $query = $this->db->get();
        return $query->result();
        
    }

	function get_follows_by_owner_row_num($realname,$append_users='',$s_day = '',$s_mode='') {
        //$this->db->where('csr_person_follow_creator', $realname);
        if(!empty($s_day)){
        	$this->db->where(self::FOLLOW_TABLE_NAME.'.csr_person_follow_update_ts >=',date("Y-m-d",$s_day));
        	$this->db->where(self::FOLLOW_TABLE_NAME.'.csr_person_follow_update_ts <', date("Y-m-d",strtotime("+".$s_mode." day",$s_day)));
        }
        if(!empty($append_users)){
        	$apuser_where = '(csr_person_follow_creator=\''.$realname.'\' or ';
        	foreach ($append_users as $row) {
                $apuser_where .= 'csr_person_follow_creator like \'%'.$row.'%\' or ';
        	}
            $apuser_where = substr($apuser_where, 0 ,strlen($apuser_where)-3);
            $apuser_where .= ')';
            //echo($apuser_where);
       	    $this->db->where($apuser_where);
        } else {
            $this->db->where('csr_person_follow_creator',$realname);
        }
        $query = $this->db->get(self::FOLLOW_TABLE_NAME);
        return $query->num_rows();
	}
    
    function refresh_all_stat_data() {
        $this->db->query('delete from csr_person_new_month_stats');
		$this->db->query('insert into csr_person_new_month_stats (realname,smonth,no_newusers,no_dist_newusers) '
			.'select csr_person_creator,date_format(csr_person_create_ts,\'%Y-%m-01\'),count(*),count(distinct csr_person_id) '
			.'from csr_person '
			.'group by csr_person_creator,date_format(csr_person_create_ts,\'%Y-%m-01\')');
		$this->db->query('delete from csr_person_new_week_stats');
		$this->db->query('insert into csr_person_new_week_stats (realname,sweek,no_newusers,no_dist_newusers) '
			.'select csr_person_creator,date_format(subdate(csr_person_create_ts,date_format(csr_person_create_ts,\'%w\')-1),\'%Y-%m-%d\'),count(*),count(distinct csr_person_id) '
			.'from csr_person '
			.'group by csr_person_creator,date_format(subdate(csr_person_create_ts,date_format(csr_person_create_ts,\'%w\')-1),\'%Y-%m-%d\')');
		$this->db->query('delete from csr_person_new_day_stats');
		$this->db->query('insert into csr_person_new_day_stats (realname,sday,no_newusers,no_dist_newusers) '
			.'select csr_person_creator,date_format(csr_person_create_ts,\'%Y-%m-%d\'),count(*),count(distinct csr_person_id) '
			.'from csr_person '
			.'group by csr_person_creator,date_format(csr_person_create_ts,\'%Y-%m-%d\')');
		$this->db->query('delete from csr_person_follow_month_stats');
		$this->db->query('insert into csr_person_follow_month_stats (realname,smonth,no_follows,no_dist_follows) '
			.'select csr_person_follow_creator,date_format(csr_person_follow_update_ts,\'%Y-%m-01\'),count(*),count(distinct csr_person_id) '
			.'from csr_person_follows '
			.'group by csr_person_follow_creator,date_format(csr_person_follow_update_ts,\'%Y-%m-01\')');
		$this->db->query('delete from csr_person_follow_week_stats');
		$this->db->query('insert into csr_person_follow_week_stats (realname,sweek,no_follows,no_dist_follows) '
			.'select csr_person_follow_creator,date_format(subdate(csr_person_follow_update_ts,date_format(csr_person_follow_update_ts,\'%w\')-1),\'%Y-%m-%d\'),count(*),count(distinct csr_person_id) '
			.'from csr_person_follows '
			.'group by csr_person_follow_creator,date_format(subdate(csr_person_follow_update_ts,date_format(csr_person_follow_update_ts,\'%w\')-1),\'%Y-%m-%d\')');
		$this->db->query('delete from csr_person_follow_day_stats');
		$this->db->query('insert into csr_person_follow_day_stats (realname,sday,no_follows,no_dist_follows) '
			.'select csr_person_follow_creator,date_format(csr_person_follow_update_ts,\'%Y-%m-%d\'),count(*),count(distinct csr_person_id) '
			.'from csr_person_follows '
			.'group by csr_person_follow_creator,date_format(csr_person_follow_update_ts,\'%Y-%m-%d\')');
    }
    
    function get_daily_stat_data($usernames,$day_diff){
        $this->db->where('sday >=',date("Y-m-d H:i:s" ,strtotime($day_diff." day")) );
        $this->db->where_in('realname',$usernames);
        $this->db->order_by('sday','realname');
        $query = $this->db->get('csr_person_follow_day_stats');
        return $query->result_array();
    }
    
}