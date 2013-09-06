<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Utility {
	private $CI;
	
	function __construct() {
		$this->CI =& get_instance();
	}
	
	function get($item_name) {
		$this->CI->config->load('application', true);
		return $this->CI->config->item($item_name, 'application');
	}
	
	function chk_id($val) {
		return preg_match('/^[1-9][0-9]{0,9}$/', $val);
	}
	
	function chk_loginname($val) {
		return preg_match('/^[A-Za-z0-9_]{3,24}$/', $val);
	}
	
	function chk_password($val) {
		return preg_match('/^[A-Za-z0-9_]{6,24}$/', $val);
	}
	
	function chk_realname($val) {
		return preg_match('/^[\x{4e00}-\x{9fa5}A-Za-z0-9_]{2,64}$/u', $val);
	}

	function chk_mobile($val) {
		return preg_match('/^(13|14|15|18)\d{9}$/', $val);
	}
    
    function chk_email($val) {
        return preg_match('/^[_.0-9a-z-]+@([0-9a-z][0-9a-z-]+.)+[a-z]{2,3}$/', $val);
    }
	
	function get_group_cfg() {
		return $this->get('group_cfg');
	}
	
	function chk_group($val) {
		$_cfg = $this->get_group_cfg();
		$_group_cfg = array_keys($_cfg);
		if(!in_array($val, $_group_cfg)) {
			return false;
		}
		return true;
	}
	
	function get_user_group() {
		return $this->title2group(element('title', $this->CI->session->userdata('user')));
	}
	
	function title2group($title) {
		$_cfg = $this->get_group_cfg();
		foreach($_cfg as $group => $title_array) {
			if(in_array($title, $title_array)) {
				return $group;
			}
		}
		return null;
	}
	
	function is_admin() {
		if($this->title2group(element('title', $this->CI->session->userdata('user'))) !== 'administrator') {
			return false;
		}
		return true;
	}
	
	function is_pm() {
		if($this->title2group(element('title', $this->CI->session->userdata('user'))) !== 'product_manager') {
			return false;
		}
		return true;
	}

	function is_director() {
		if($this->title2group(element('title', $this->CI->session->userdata('user'))) !== 'proj_director') {
			return false;
		}
		return true;
	}

    function is_ch() {
		if($this->title2group(element('title', $this->CI->session->userdata('user'))) !== 'staff') {
			return false;
		}
		return true;
	}

	function access_fields_filter($group, $data) {
		$_data = $data;
		$_cfg = $this->get_forbidden_fields($group);
		foreach($_cfg as $field) {
			if(isset($_data->$field)) {
				$_data->$field = '';
			}
		}
		return $_data;
	}
	
	function get_forbidden_fields($group) {
		$_cfg = $this->get('access_fields_cfg');
		
		if(!isset($_cfg[$group])) {
			return array('manage_button', 'proj_id', 'proj_detail_id');
		}
		return $_cfg[$group];
	}
	
	function manager_view_filter($proj_detail) {
		$fields = array(
			'main_channel',
			'channel_company',
			'channel_contact',
			'billing_company',
			'manager_remark',
		);
		foreach($fields as $field) {
			if(isset($proj_detail->$field)) {
				$proj_detail->$field = '';
			}
		}
		return true;
	}
	
	function is_ajax_request() {
		if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest') {
			return true;
		}
		return false;
	}
	
	function get_inner_commission($commission_a_tax, $month) {
		if($month <= 0 || $commission_a_tax <= 0) {
			return 0;
		}
		return round($commission_a_tax - (0.09 * ($month / 12)), 3);
	}
	
	function get_outer_commission($commission_a_tax, $month) {
		if($month <= 0 || $commission_a_tax <= 0) {
			return 0;
		}
		return round($commission_a_tax - (0.1 * ($month / 12)), 3);
	}

	function object_to_array($d) {
		if (is_object($d)) {
			// Gets the properties of the given object
			// with get_object_vars function
			$d = get_object_vars($d); //将第一层对象转换为数组
		}

		if (is_array($d)) {
			/*
			 * Return array converted to object
			 * Using __FUNCTION__ (Magic constant)
			 * for recursive call
			 */
			return array_map(array($this, 'object_to_array'), $d);//如果是数组使用array_map递归调用自身处理数组元素
		} else {
			// Return array
			return $d;
		}
	}
    
    function noticemail($to, $subject, $content) {
        $mail_config['from'] = 'firstshin_notice@163.com';
        $mail_config['smtp_host'] = 'smtp.163.com';
        $mail_config['smtp_username'] = 'firstshin_notice@163.com';
        $mail_config['smtp_password'] = 'qc1ttpkq';
        $mail_config['to'] = $to;
        $mail_config['subject'] = $subject;
        $mail_config['content'] = $content;
        
        $mail = new SaeMail();
        
        $mail->setOpt($mail_config);
        
        $mail->send();
    }

    function noticemail_html($to, $subject, $mail_content_title, $mail_content_mainstr, $mail_content_buttomstr, $proj) {
        $mail_config['from'] = 'firstshin_notice@163.com';
        $mail_config['smtp_host'] = 'smtp.163.com';
        $mail_config['smtp_username'] = 'firstshin_notice@163.com';
        $mail_config['smtp_password'] = 'qc1ttpkq';
        $mail_config['to'] = $to;
        $mail_config['subject'] = $subject;
        $mail_config['content_type'] = 'HTML';
        
        $mail_config['content'] = '<html><body><table><tr><td style="background-color:#DFDFDF;width:486px;"><span style="color:#404040;font-weight:bold;font-size:20px;font-family:微软雅黑;黑体;sans-serif;">&nbsp;'. $mail_content_title.'</span></td>';
        $mail_config['content'] .= '<td><a href="http://rainbowbridge.sinaapp.com/ts/"><img style="width:240px; height:38px" src="http://rainbowbridge.sinaapp.com/ts/misc/resources/firstshin.jpg"></img></a></td></tr>';
        $mail_config['content'] .= '<tr><td colspan=2 style="font-size:12px;padding:10px;">'.$mail_content_mainstr.'</td></tr>';
        $mail_config['content'] .= '<tr><td colspan=2 style="font-size:12px;background-color:#DFDFDF;text-align:center;color:#606060;height:48px;">'.$mail_content_buttomstr.'如有任何问题请<a href="mailto:xpfinance@163.com">及时联系</a>。</td></tr></table></body></html>';
        
        $mail = new SaeMail();
        $mail->setOpt($mail_config);
        $mail->send();
    }
    
    function page_title() {
		$module = $this->CI->uri->segment(1);
		$action = $this->CI->uri->segment(2);
		switch($module) {
			case 'user':
				if($action == 'info') {
					return '个人信息 - 玉尔通行证';
				} else {
					return '用户管理 - 玉尔通行证';
				}
				break;
			case 'proj':
				if($action == 'manage') {
					return '项目管理 - 彩虹桥 - 玉尔财富';
				} else if($action == 'create') {
					return '新增项目 - 彩虹桥 - 玉尔财富';
				} else if($action == 'update') {
					return '项目编辑 - 彩虹桥 - 玉尔财富';
				} else {
					return '彩虹桥 - 玉尔财富';
				}
				break;
			case 'relation';
				return '金水桥 - 玉尔资本';
				break;
			default:
				return '彩虹桥 - 玉尔财富';
				break;
		}
	}
}