<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Api extends Auth_Controller {
	function __construct() {
		parent::__construct();
	}
	
	function access_fields() {
		$fields = array(
			'manage_button' => false,
			'proj_id' => false,
			'proj_detail_id' => false,
			'sub_name' => false,
			'total_share' => false,
			'status' => false,
			'exclusive' => false,
			'grade' => false,
			'category' => false,
			'sub_category' => false,
			'issue' => false,
			'name' => false,
			'flow_of_fund' => false,
			'highlights' => false,
			'month' => false,
			'scale' => false,
			'cycle' => false,
			'amount' => false,
			'profit_property' => false,
			'profit' => false,
			'manager' => false,
			'contract' => false,
			'remark' => false,
			'pay_account' => false,
			'countdown' => false,
			'commission_b_tax' => false,
			'commission_a_tax' => false,
			'inner_commission' => false,
			'outer_commission' => false,
			'found' => false,
			'pdt_status' => false,
			'main_channel' => false,
			'channel_company' => false,
			'channel_contact' => false,
			'billing_company' => false,
			'manager_remark' => false,
			'create_ts' => false,
			'imm_payment' => false,
		);
		$group = $this->utility->title2group(element('title', $this->session->userdata('user')));
		$forbidden_fields = $this->utility->get_forbidden_fields($group);
		foreach($forbidden_fields as $forbidden_field) {
			$fields[$forbidden_field] = true;
		}
		$this->json->output(array('success' => true, 'data' => $fields));
	}
    
    function access_fields_csr() {
        $fields = array(
			'csr_corp' => false,
			'csr_channel' => false,
			'csr_person' => false,
		);
		$group = $this->utility->title2group(element('title', $this->session->userdata('user')));
		$forbidden_fields_csr = $this->utility->get_forbidden_fields_csr($group);
		foreach($forbidden_fields_csr as $forbidden_field_csr) {
			$fields[$forbidden_field_csr] = true;
		}
		$this->json->output(array('success' => true, 'data' => $fields));
    }
    
    function test2() {
        $menu_group='outer';
        
		$forbidden_menu_fields= $this->utility->get_forbidden_menu_fields($menu_group);
        $this->json->output($forbidden_menu_fields );
        
    }
    
    function access_fields_library() {
        $fields = array(
			'manage_button' => false,
		);
		$group = $this->utility->title2library(element('title', $this->session->userdata('user')));
		$forbidden_fields_library = $this->utility->get_forbidden_fields_library($group);
		foreach($forbidden_fields_library as $forbidden_field_library) {
			$fields[$forbidden_field_library] = true;
		}
		$this->json->output(array('success' => true, 'data' => $fields));
    }

    function access_fields_board() {
        $fields = array(
			'manage_button' => false,
		);
		$group = $this->utility->title2board(element('title', $this->session->userdata('user')));
		$forbidden_fields_board = $this->utility->get_forbidden_fields_board($group);
		foreach($forbidden_fields_board as $forbidden_field_board) {
			$fields[$forbidden_field_board] = true;
		}
		$this->json->output(array('success' => true, 'data' => $fields));
    }

    function access_fields_order() {
        $fields = array(
            'comm_in' => true,
            'accept_order' => true,
            'invest_in' => true,
            'abort' => true,
            'confirm_order' => true,
			'manage_button' => true,
			'channel_choose' => true,
		);
		$group = $this->utility->title2order(element('title', $this->session->userdata('user')));
        $accept_fields_order = $this->utility->get_accept_fields_order($group);
        foreach($accept_fields_order as $accept_field_order) {
        	$fields[$accept_field_order] = false;
        }
		$this->json->output(array('success' => true, 'data' => $fields));
    }

    function get_control_tree() {
        $menu_group=$this->utility->title2menu(element('title', $this->session->userdata('user')));
        //$menu_group='admin';
        
		$forbidden_menu_fields= $this->utility->get_forbidden_menu_fields($menu_group);
        
		$proj=array();
        
		if(!in_array('promote_proj',$forbidden_menu_fields)){
			array_push($proj,array('id'=>'promote_proj', 'text' => '精选产品','leaf' => true,));
		}
		if(!in_array('proj',$forbidden_menu_fields)){
			array_push($proj,array('id'=>'proj', 'text' => '固定收益产品','leaf' => true,));
		}
		if(!in_array('float_proj',$forbidden_menu_fields)){
			array_push($proj,array('id'=>'float_proj', 'text' => '浮动收益产品','leaf' => true,));
		}
        
        $csr=array();
        /*if(!in_array('csr_remind',$forbidden_menu_fields)){
			array_push($csr,array('id'=>'csr_remind', 'text' => '今日提醒','leaf' => true,));
		}*/
		if(!in_array('csr_person',$forbidden_menu_fields)){
			array_push($csr,array('id'=>'csr_person', 'text' => '个人及家庭理财','leaf' => true,));
		}
		if(!in_array('csr_fm_corp',$forbidden_menu_fields)){
			array_push($csr,array('id'=>'csr_fm_corp', 'text' => '机构理财','leaf' => true,));
		}
		if(!in_array('csr_channel',$forbidden_menu_fields)){
			array_push($csr,array('id'=>'csr_channel', 'text' => '经纪人','leaf' => true,));
		}
		if(!in_array('csr_corp',$forbidden_menu_fields)){
			array_push($csr,array('id'=>'csr_corp', 'text' => '经纪机构','leaf' => true,));
		}
        if(!in_array('csr_financing',$forbidden_menu_fields)){
			array_push($csr,array('id'=>'csr_financing', 'text' => '融资方','leaf' => true,));
		}
        if(!in_array('csr_provider',$forbidden_menu_fields)){
			array_push($csr,array('id'=>'csr_provider', 'text' => '供应商','leaf' => true,));
		}
        /*if(!in_array('csr_follows',$forbidden_menu_fields)){
			array_push($csr,array('id'=>'csr_follows', 'text' => '跟进查询','leaf' => true,));
		}*/
        
        $order=array();
        /*if(!in_array('order',$forbidden_menu_fields)){
			array_push($order,array('id'=>'order', 'text' => '预约记录','leaf' => true,));
		}*/
		if(!in_array('deal',$forbidden_menu_fields)){
			array_push($order,array('id'=>'order', 'text' => '预约与订单','leaf' => true,));
		}
        if(!in_array('deal',$forbidden_menu_fields)){
            array_push($order,array('id'=>'order/main_confirmed', 'text' => '成交管理','leaf' => true,));
        }

        $cproj=array();
        /*if(!in_array('csr_cproj',$forbidden_menu_fields)){
			array_push($cproj,array('id'=>'csr_cproj', 'text' => '客户管理','leaf' => true,));
		}*/
		if(!in_array('cproj',$forbidden_menu_fields)){
            array_push($cproj,array('id'=>'relation/rlist', 'text' => '项目列表','leaf' => true,));
		}
        if(!in_array('cproj',$forbidden_menu_fields)){
			array_push($cproj,array('id'=>'relation', 'text' => '进展一览','leaf' => true,));
		}
        
        $data=array();
		if(!in_array('board',$forbidden_menu_fields)){
			array_push($data,array('id'=>'board', 'text' => '公告板','leaf' => true,));
		}
		if(!in_array('library',$forbidden_menu_fields)){
			array_push($data,array('id'=>'library', 'text' => '知识库','leaf' => true,));
		}
		if(!in_array('reminder',$forbidden_menu_fields)){
			array_push($data,array('id'=>'reminder', 'text' => '消息板','leaf' => true,));
		}
        
        if(count($proj)>0){
            array_push($data,array('text' => '理财产品','expanded' => true,'children' => $proj));
        }
        if(count($csr)>0){
            array_push($data,array('text' => '客户管理','expanded' => true,'children' => $csr));
        }
        if(count($order)>0){
            array_push($data,array('text' => '订单管理','expanded' => true,'children' => $order));
        }
        if(count($cproj)>0){
            array_push($data,array('text' => '项目管理','expanded' => true,'children' => $cproj));
        }
        if(!in_array('user/info',$forbidden_menu_fields)){
			array_push($data,array('id'=>'user/info', 'text' => '个人信息','leaf' => true,));
		}
		if(!in_array('logout',$forbidden_menu_fields)){
            array_push($data,array('id'=>'logout', 'text' => '退出系统','leaf' => true,));
		}
        /*
        $data = array(
            array(
                'text' => '公告板',
                'leaf' => true,
            ),
            array(
                'text' => '知识库',
                'leaf' => true,
            ),
            array(
                'text' => '理财产品',
                'expanded' => true,
                'children' => array (
	            	array(
    	            	'text' => '精选产品',
	        	        'leaf' => true,
    	        	),
		        	    array(
		                'text' => '其他固定收益产品',
		                'leaf' => true,
		            ),
		            array(
		                'text' => '其他浮动收益产品',
		                'leaf' => true,
		            )
                )
            )
        );
        */
        
        $this->json->output($data );
    }

    function get_user_tree() {
        $roots = $this->User_model->get_root_reporter();
        $data = array();
        foreach($roots as $root) {
            $data[] = $this->User_model->get_reporter($root->loginname);
        }
        $this->json->output(array('success' => true, 'data' => $data));
    }
}
