<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Csr_channel extends Auth_Controller {
	function __construct() {
		parent::__construct();
	}

	function index() {
		$this->template->load('default', 'csr/csr_channel_view');
	}

    function view() {
        if($this->utility->get_user_group() == 'part_time_job' || $this->utility->get_user_group() == 'other') {
            $this->template->load('default', 'csr/csr_person_view');
        } 
        $mode = $this->input->get('mode',true);
        $page = $this->input->get('page', true);
        $start = $this->input->get('start', true);
        $limit = $this->input->get('limit', true);
        $sort = $this->input->get('sort', true);
        $dir = $this->input->get('dir', true);
        $query = $this->input->get('query', true);
        $recentMode = $this->input->get('recentMode', true);
        $catMode = $this->input->get('catMode', true);
        $FSCChannel = $this->input->get('FSCChannel', true);
        $PStart = $this->input->get('PStart', true);
        $PEnd = $this->input->get('PEnd', true);
        $LastFollow = $this->input->get('lastFollow', true);
        
        $mode = $mode > 0 ? $mode : -1;
        $page = $page >= 0 ? $page : -1;
        $start = $start >= 0 ? $start : -1;
        $limit = $limit >= 0 ? $limit : -1;

        //if(!$this->utility->chk_loginname($sort) && !empty($sort)) {
        //	$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
        //}

        if(!$dir=='ASC' && !$dir=='DESC' && !empty($dir)) {
            $this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
        }

        if($FSCChannel=='null'){
            $FSCChannel='';
        }
        
        if(!in_array($FSCChannel,$this->User_model->get_all_reporters()) && !$this->is_csr_admin()) {
        	$FSCChannel='';   
        }

        if($mode>0){
            if($this->is_csr_admin()) {
            	$data = $this->Csr_channel_model->get_all($start,$limit,$sort,$dir,$query,$recentMode,$catMode,$FSCChannel,$PStart,$PEnd,$LastFollow)->result();
            	$totalCount = $this->Csr_channel_model->get_all_row_num($query,$recentMode,$catMode,$FSCChannel,$PStart,$PEnd,$LastFollow);
            } else {
            	$append_users= $this->User_model->get_all_reporters();
				$data = $this->Csr_channel_model->get_by_owner($this->get_user_info('realname'),$append_users,$start,$limit,$sort,$dir,$query,$recentMode,$catMode,$FSCChannel,$PStart,$PEnd,$LastFollow)->result();
        	    $totalCount = $this->Csr_channel_model->get_by_owner_row_num($this->get_user_info('realname'),$append_users,$query,$recentMode,$catMode,$FSCChannel,$PStart,$PEnd,$LastFollow);
            }
        } else {
			$data = $this->Csr_channel_model->get_by_owner($this->get_user_info('realname'),'',$start,$limit,$sort,$dir,$query,$recentMode,$catMode,$FSCChannel,$PStart,$PEnd,$LastFollow)->result();
            $totalCount = $this->Csr_channel_model->get_by_owner_row_num($this->get_user_info('realname'),'',$query,$recentMode,$catMode,$FSCChannel,$PStart,$PEnd,$LastFollow);
        }

        //不是本人直属客户的需要屏蔽部分字段
		$n = count($data);
		for($i = 0; $i < $n; $i++) {
            if($data[$i]->csr_channel_FSC_channel != $this->get_user_info('realname')) {
				$this->utility->csr_channel_view_filter($data[$i]);
            }
		}
		$this->json->output(array('success' => true,'totalCount'=>$totalCount,'data' => $data));
	}

	function get() {
        if($this->utility->get_user_group() == 'part_time_job' || $this->utility->get_user_group() == 'other') {
            $this->template->load('default', 'proj/view');
        } 
		$csr_channel_id = $this->input->get('csr_channel_id', true);

		if(!$this->utility->chk_id($csr_channel_id)) {
			$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
		}

		// only admin and owner can see the data
		$data = $this->Csr_channel_model->get_by_id($csr_channel_id);
        if($data->csr_channel_FSC_channel != $this->get_user_info('realname')) {
			$this->utility->csr_channel_view_filter($data);
        }
		if(!$this->is_csr_admin() && !$this->is_owner($this->get_user_info('realname'), $data) && !in_array($data->csr_channel_FSC_channel,$this->User_model->get_all_reporters()) ) {
			$data = array();
		}
        
		$this->json->output(array('success' => true, 'data' => $data));
	}

    function follow_view() {
        $csr_channel_id = $this->input->get('csr_channel_id', true);
        
        if(!$this->utility->chk_id($csr_channel_id)) {
			$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
		}
        
        $csr = $this->Csr_channel_model->get_by_id($csr_channel_id);
        if(count($csr) !== 1) {
            $this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
        }
		if(!$this->is_csr_admin() && !$this->is_owner($this->get_user_info('realname'), $csr) && !in_array($csr->csr_channel_FSC_channel,$this->User_model->get_all_reporters()) ) {
			$data = array();
        } else {
        	$data = $this->Csr_channel_model->get_follow_by_id($csr_channel_id)->result();
        }
        
        $this->json->output(array('success' => true, 'data' => $data));
    }
    function follows_view() {
        if($this->utility->get_user_group() == 'part_time_job' || $this->utility->get_user_group() == 'other') {
            $this->template->load('default', 'proj/view');
        } 
        $mode = $this->input->get('mode',true);
        $page = $this->input->get('page', true);
        $start = $this->input->get('start', true);
        $limit = $this->input->get('limit', true);
        $sort = $this->input->get('sort', true);
        $dir = $this->input->get('dir', true);
        $s_username = $this->input->get('s_username',true);
        $s_day = $this->input->get('s_day',true);
        $s_mode = $this->input->get('s_mode',true);
        
        $mode = $mode > 0 ? $mode : -1;
        $page = $page >= 0 ? $page : -1;
        $start = $start >= 0 ? $start : -1;
        $limit = $limit >= 0 ? $limit : -1;

        $ts_day = strtotime($s_day);
        //echo('ts_day:'.$ts_day.'***');
        if(!$ts_day){
            $ts_day='';
        }
        //echo(!empty($s_username) && !empty($s_day));
        //echo('ts_day:'.$ts_day.'***');
        
        if($s_mode="day"){
            $ts_mode=1;
        } else if($s_mode="week"){
            $ts_mode=7;
        } else if($s_mode="month"){
            $ts_mode=30;
        } else {
            $ts_mode='';
        }
        //echo($ts_day." *** ".$ts_mode);

        //if(!$this->utility->chk_loginname($sort) && !empty($sort)) {
        //	$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
        //}
        //if(!$this->utility->chk_loginname($sort) && !empty($sort)) {
        //	$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
        //}

        if(!$dir=='ASC' && !$dir=='DESC' && !empty($dir)) {
            $this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
        }

        //是否管理模式
        if($mode>0){
            if($this->is_csr_admin()) {
            	$data = $this->Csr_channel_model->get_all_follows($start,$limit,$sort,$dir)->result();
            	$totalCount = $this->Csr_channel_model->get_all_follows_row_num();
            } else {
            	$append_users= $this->User_model->get_all_reporters();
				$data = $this->Csr_channel_model->get_follows_by_owner($this->get_user_info('realname'),$append_users,$ts_day,$ts_mode,$start,$limit,$sort,$dir)->result();
        	    $totalCount = $this->Csr_channel_model->get_follows_by_owner_row_num($this->get_user_info('realname'),$append_users,$ts_day,$ts_mode);
            }
        } else {
            if(!empty($s_username) && !empty($s_day) ){
				$data = $this->Csr_channel_model->get_follows_by_owner($s_username,'',$ts_day,$ts_mode,$start,$limit,$sort,$dir)->result();
            	$totalCount = $this->Csr_channel_model->get_follows_by_owner_row_num($s_username,'',$ts_day,$ts_mode);
            } else {
				$data = $this->Csr_channel_model->get_follows_by_owner($this->get_user_info('realname'),'',$ts_day,$ts_mode,$start,$limit,$sort,$dir)->result();
            	$totalCount = $this->Csr_channel_model->get_follows_by_owner_row_num($this->get_user_info('realname'),'',$ts_day,$ts_mode);
            }
        }
        
        //不是本人直属客户的需要屏蔽部分字段
		$n = count($data);
		for($i = 0; $i < $n; $i++) {
            if($data[$i]->csr_channel_FSC_channel != $this->get_user_info('realname')) {
				$this->utility->csr_channel_view_filter($data[$i]);
            }
		}

        $this->json->output(array('success' => true,'totalCount'=>$totalCount,'data' => $data));
	}
    function follow_update() {
        $csr_channel_follow = array(
			'csr_channel_id' => $this->input->post('csr_channel_id', true),
			'csr_channel_FSC_follow_status' => $this->input->post('csr_channel_FSC_follow_status', true),
			'csr_channel_FSC_opp_and_prob' => $this->input->post('csr_channel_FSC_opp_and_prob', true),
			'csr_channel_FSC_solution' => $this->input->post('csr_channel_FSC_solution', true),
			'csr_channel_follow_result' => $this->input->post('csr_channel_follow_result', true),
        );
        
		$csr_channel_id = $csr_channel_follow['csr_channel_id'];
        unset($csr_channel_follow['csr_channel_id']);
        
        $csr_channel_follow['csr_channel_follow_creator'] = $this->get_user_info('realname');

        if(!$this->utility->chk_id($csr_channel_id)) {
			$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
		}
        
        $data = $this->Csr_channel_model->get_by_id($csr_channel_id);
        if(count($data) !== 1) {
            $this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
        }
        if(!$this->is_csr_admin() && !$this->is_owner($this->get_user_info('realname'), $data)) {
            $this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
        }
        
        $ret = $this->Csr_channel_model->update_follow($csr_channel_id, $csr_channel_follow);
        if(!$ret) {
        		$this->json->output(array('success' => false, 'm' => '添加数据失败'));
        }
        
        $ret2 = $this->Csr_channel_model->insert_follow($csr_channel_id, $csr_channel_follow);
        if(!$ret2) {
        		$this->json->output(array('success' => false, 'm' => '添加数据失败'));
        }

        $this->json->output(array('success' => true, 'csr_channel_id' => $csr_channel_id));
    }

    function save() {
		$csr_channel = array(
			'csr_channel_id' => $this->input->post('csr_channel_id', true),
			'csr_channel_cat' => $this->input->post('csr_channel_cat', true),
			'csr_channel_reason' => $this->input->post('csr_channel_reason', true),
			'csr_channel_name' => $this->input->post('csr_channel_name', true),
			'csr_channel_gender' => $this->input->post('csr_channel_gender', true),
			'csr_channel_age' => $this->input->post('csr_channel_age', true),
			'csr_channel_hometown' => $this->input->post('csr_channel_hometown', true),
			'csr_channel_telephone' => $this->input->post('csr_channel_telephone', true),
			'csr_channel_mobile' => $this->input->post('csr_channel_mobile', true),
			'csr_channel_qq' => $this->input->post('csr_channel_qq', true),
			'csr_channel_fax' => $this->input->post('csr_channel_fax', true),
			'csr_channel_wechat' => $this->input->post('csr_channel_wechat', true),
			'csr_channel_email' => $this->input->post('csr_channel_email', true),
			'csr_channel_email2' => $this->input->post('csr_channel_email2', true),
			'csr_channel_interests' => $this->input->post('csr_channel_interests', true),
			'csr_channel_proper_comm' => $this->input->post('csr_channel_proper_comm', true),
			'csr_channel_person_plusinfo' => $this->input->post('csr_channel_person_plusinfo', true),
			'csr_channel_industry' => $this->input->post('csr_channel_industry', true),
			'csr_channel_corp_name' => $this->input->post('csr_channel_corp_name', true),
			'csr_channel_corp_depart' => $this->input->post('csr_channel_corp_depart', true),
			'csr_channel_corp_title' => $this->input->post('csr_channel_corp_title', true),
			'csr_channel_past_work' => $this->input->post('csr_channel_past_work', true),
			'csr_channel_edu' => $this->input->post('csr_channel_edu', true),
			'csr_channel_prof_plusinfo' => $this->input->post('csr_channel_prof_plusinfo', true),
			'csr_channel_csr_type' => $this->input->post('csr_channel_csr_type', true),
			'csr_channel_csr_style' => $this->input->post('csr_channel_csr_style', true),
			'csr_channel_pdt_channel' => $this->input->post('csr_channel_pdt_channel', true),
			'csr_channel_coop_FSC_dir' => $this->input->post('csr_channel_coop_FSC_dir', true),
			'csr_channel_coop_FSC_wish' => $this->input->post('csr_channel_coop_FSC_wish', true),
			'csr_channel_follow' => $this->input->post('csr_channel_follow', true),
		);

		$csr_channel_id = $csr_channel['csr_channel_id'];
		unset($csr_channel['csr_channel_id']);
		$editor = element('loginname', $this->session->userdata('user'));

		// create new record when id equals -1
		if($csr_channel_id == '-1') {
			$csr_channel['csr_channel_creator'] = $this->get_user_info('realname');
			$csr_channel['csr_channel_editor']  = $this->get_user_info('realname');
			$csr_channel['csr_channel_FSC_channel']  = $this->get_user_info('realname');
			$csr_channel_id = $this->Csr_channel_model->save($csr_channel);
		} else {
            unset($csr_channel['csr_channel_mobile']);
			if(!$this->utility->chk_id($csr_channel_id)) {
				$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
			}
			$csr_channel['csr_channel_editor']  = $this->get_user_info('realname');
			// only admin and owner can update the data
			$data = $this->Csr_channel_model->get_by_id($csr_channel_id);
			if(!$this->is_csr_admin() && !$this->is_owner($this->get_user_info('realname'), $data)) {
				$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
			}

			$ret = $this->Csr_channel_model->update($csr_channel_id, $csr_channel);
			if(!$ret) {
				$this->json->output(array('success' => false, 'm' => '添加数据失败'));
			}
		}
		$this->json->output(array('success' => true, 'csr_channel_id' => $csr_channel_id));
	}

    function refresh_stat_data(){
        if(!$this->is_csr_admin()){
            $this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
        }
        $this->Csr_channel_model->refresh_all_stat_data();
        $this->json->output(array('success' => true));
    }
    
    function get_daily_stats(){
        if($this->is_csr_admin()) {
            $user_array=$this->User_model->get_all('normal');
            $new_user_array=array();
            foreach($user_array as $_t){
                array_push($new_user_array, $_t->realname);
            }
            $data=$this->Csr_channel_model->get_daily_stat_data($new_user_array,-15);
        } else {
            $user_array=$this->User_model->get_all_reporters();
            array_push($user_array,element('realname', $this->session->userdata('user')));
	        $data=$this->Csr_channel_model->get_daily_stat_data($user_array,-15);
        }
        $data_array=array();
        for($i=0;$i<31;$i++){
            $tdata=array();
            $tdata['sday']=date("Y-m-d" ,strtotime("-".(31-$i)."day"));
            foreach($data as $_t) {
                if($_t['sday']==date("Y-m-d" ,strtotime("-".(31-$i)."day"))){
                    $tdata[$_t['realname']] = $_t['no_follows'];
                }
            }
            array_push($data_array,$tdata);
        }
        $this->json->output(array('success' => true, 'data' => $data_array));
    }

    private function get_user_info($field) {
		$info = element($field, $this->session->userdata('user'));
		if($info === false) {
			return false;
		}
		return $info;
	}

	private function is_csr_admin() {
		if(!$this->User_model->has_action_access(element('loginname', $this->session->userdata('user')), 'csr_channel/save')) {
			return false;
		}
		return true;
	}

	private function is_owner($realname, $csr_channel) {
		if(empty($realname)) {
			return false;
		}
		if($csr_channel->csr_channel_FSC_channel == $realname) {
			return true;
		}
		return false;
	}
}