<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Order extends Auth_Controller {
	function __construct() {
		parent::__construct();
	}

	function index() {
		$this->template->load('default', 'order/main');
	}
	function main_confirmed() {
		$this->template->load('default', 'order/confirmed_order');
	}

	public function view(){
        $mode = $this->input->get('mode',true);
        $page = $this->input->get('page', true);
        $start = $this->input->get('start', true);
        $limit = $this->input->get('limit', true);
        $sort = $this->input->get('sort', true);
        $dir = $this->input->get('dir', true);
        $query = $this->input->get('query', true);
        $status = $this->input->get('status', true);
        $FSCChannel = $this->input->get('FSCChannel', true);
        $FSCManager = $this->input->get('FSCManager', true);
        $FSCDirector = $this->input->get('FSCDirector', true);
        $month = $this->input->get('FSCDirector', true);
        $is_confirmed = $this->input->get('is_confirmed', true);
        $itemid = $this->input->get('itemid', true);

        if($this->utility->chk_id($itemid)){
            $data = $this->Order_model->get_by_id($itemid);
            //$stat=
            $realname = $this->get_user_info('realname');
            if(!$this->is_order_admin() && $data->proj_manager != $realname && $data->proj_director != $realname && $data->creator != $realname) {
                $data = '';
            }
			if(!$this->is_order_admin() && $data->proj_manager != $realname && $data->proj_director != $realname) {
				$data->comm_in_percent='';
				$data->comm_in_checker='';
				$data->comm_in_ts='';
			}
            $this->json->output(array('success' => true,'data' => $data,'totalCount' => 1, 'amount_sum' => $data->amount, 'comm_out_sum' => $data->comm_out_percent*$data->amount*100));
        } else {

            $mode = $mode > 0 ? $mode : -1;
        	$page = $page >= 0 ? $page : -1;
        	$start = $start >= 0 ? $start : -1;
        	$limit = $limit >= 0 ? $limit : -1;
	
	        if(!$dir=='ASC' && !$dir=='DESC' && !empty($dir)) {
    	        $this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
        	}
	
	        if($FSCChannel=='null'){
    	        $FSCChannel='';
        	}
        
	        if($FSCManager=='null'){
    	        $FSCManager='';
        	}
        	if($FSCDirector=='null'){
	            $FSCDirector='';
    	    }
        	
	        if($status=='all') {
    	        $status='';
        	}
	        if(!in_array($FSCChannel,$this->User_model->get_all_reporters()) && !$this->is_order_admin()) {
    	    	$FSCChannel=''; 
        	}
        
	        if($mode>0){
    	        if($this->is_order_admin()) {
        	    	$data = $this->Order_model->get_all($start,$limit,$sort,$dir,$query,$FSCChannel,$FSCManager,$FSCDirector,$status,$month,$is_confirmed);
            	    $stat = $this->Order_model->get_all_row_num($query,$FSCChannel,$FSCManager,$FSCDirector,$status,$month,$is_confirmed);
	            } else {
    	        	$append_users= $this->User_model->get_all_reporters();
					$data = $this->Order_model->get_by_owner($this->get_user_info('realname'),$append_users,$start,$limit,$sort,$dir,$query,$FSCChannel,$FSCManager,$FSCDirector,$status,$month,$is_confirmed);
            	    $stat = $this->Order_model->get_by_owner_row_num($this->get_user_info('realname'),$append_users,$query,$FSCChannel,$FSCManager,$FSCDirector,$status,$month,$is_confirmed);
	            }
    	    } else {
				$data = $this->Order_model->get_by_owner($this->get_user_info('realname'),'',$start,$limit,$sort,$dir,$query,$FSCChannel,$FSCManager,$FSCDirector,$status,$month,$is_confirmed);
	            $stat = $this->Order_model->get_by_owner_row_num($this->get_user_info('realname'),'',$query,$FSCChannel,$FSCManager,$FSCDirector,$status,$month,$is_confirmed);
    	    }
	
    	    //部分情况下需要过滤掉comm_in
			$n = count($data);
			for($i = 0; $i < $n; $i++) {
				if(!$this->is_order_admin() && $data[$i]->proj_manager != $this->get_user_info('realname') && $data[$i]->proj_director != $this->get_user_info('realname')) {
					$data[$i]->comm_in_percent='';
					$data[$i]->comm_in_checker='';
					$data[$i]->comm_in_ts='';
				}
			}
            $this->json->output(array('success' => true,'data' => $data,'totalCount' => ($stat->cnt), 'amount_sum' => ($stat->amount_sum), 'comm_out_sum' => ($stat->comm_out_sum)));
        }
	}
    
    public function view_proj_manage(){
        $page = $this->input->get('page', true);
        $start = $this->input->get('start', true);
        $limit = $this->input->get('limit', true);
        $sort = $this->input->get('sort', true);
        $dir = $this->input->get('dir', true);
        $query = $this->input->get('query', true);
        $status = $this->input->get('status', true);
        $is_confirmed = $this->input->get('is_confirmed', true);
        $itemid = $this->input->get('itemid', true);
        
        if($this->utility->chk_id($itemid)){
            $data = $this->Order_model->get_by_id($itemid);
            $realname = $this->get_user_info('realname');
            if(!$this->is_order_admin() && $data->proj_manager != $realname && $data->proj_director != $realname && $data->creator != $realname) {
                $data = '';
            }
        } else {

	        if($status=='all') {
    	        $status='';
        	}

        	$data = $this->Order_model->get_by_proj($start,$limit,$sort,$dir,$query,$status,$is_confirmed);
        	$stat = $this->Order_model->get_by_proj_row_num($query,$status,$is_confirmed);
        }
       	$this->json->output(array('success' => true,'data' => $data,'totalCount' => ($stat->cnt), 'amount_sum' => ($stat->amount_sum), 'comm_out_sum' => ($stat->comm_out_sum)));
    }

    public function create_order_submit(){
        $csr_person_name=$this->input->post('csr_person_name');
        $csr_person_id=$this->input->post('csr_person_id');
        $csr_fm_corp_name=$this->input->post('csr_fm_corp_name');
        $csr_fm_corp_id=$this->input->post('csr_fm_corp_id');
        $csr_type=$this->input->post('radioNewCsr');
        $csr_channel_name=$this->input->post('csr_channel_name');
        $csr_channel_id=$this->input->post('csr_channel_id');
        $csr_corp_name=$this->input->post('csr_corp_name');
        $csr_corp_id=$this->input->post('csr_corp_id');
        $channel_type=$this->input->post('radioNewChannel');
        $amount=$this->input->post('amount');
        $proj_name=$this->input->post('proj_name');
        $proj_id=$this->input->post('proj_id');
        $is_realname=$this->input->post('is_realname');
        
        $proj=$this->Proj_model->get_proj($proj_id);
        if($proj->name != $proj_name) {
            $this->json->output(array('success' => false,'errors' => array('proj_name' => '您的输入不正确！')));
        }

        if($csr_type=='fm_corp'){
            if($channel_type=='channel'){
            	$channel=$this->Csr_channel_model->get_by_id($csr_channel_id);
            	if($channel->csr_channel_name != $csr_channel_name) {
            	    $this->json->output(array('success' => false,'errors' => array('csr_channel_name' =>'您的输入不正确！')));
            	}
        		$orderid=$this->Order_model->create_order($csr_fm_corp_name,$csr_fm_corp_id,$csr_type,$csr_channel_name,$csr_channel_id,$channel_type,$amount,$proj_name,$proj_id,$is_realname);
            } else if ($channel_type=='corp') {
            	$corp=$this->Csr_corp_model->get_by_id($csr_corp_id);
            	if($corp->csr_corp_name != $csr_corp_name) {
            	    $this->json->output(array('success' => false,'errors' => array('csr_corp_name' => '您的输入不正确！')));
            	}
        		$orderid=$this->Order_model->create_order($csr_fm_corp_name,$csr_fm_corp_id,$csr_type,$csr_corp_name,$csr_corp_id,$channel_type,$amount,$proj_name,$proj_id,$is_realname);
            } else {
	            $fm_corp=$this->Csr_fm_corp_model->get_by_id($csr_fm_corp_id);
    	        if($fm_corp->csr_fm_corp_name != $csr_fm_corp_name) {
        	        $this->json->output(array('success' => false,'errors' => array('csr_fm_corp_name' => '您的输入不正确！')));
            	}
                $orderid=$this->Order_model->create_order($csr_fm_corp_name,$csr_fm_corp_id,$csr_type,'','','none',$amount,$proj_name,$proj_id,$is_realname);
            }
        } else if($csr_type=='person'){
            if($channel_type=='channel'){
            	$channel=$this->Csr_channel_model->get_by_id($csr_channel_id);
            	if($channel->csr_channel_name != $csr_channel_name) {
            	    $this->json->output(array('success' => false,'errors' => array('csr_channel_name' => '您的输入不正确！')));
            	}
        		$orderid=$this->Order_model->create_order($csr_person_name,$csr_person_id,$csr_type,$csr_channel_name,$csr_channel_id,$channel_type,$amount,$proj_name,$proj_id,$is_realname);
            } else if ($channel_type=='corp') {
            	$corp=$this->Csr_corp_model->get_by_id($csr_corp_id);
            	if($corp->csr_corp_name != $csr_corp_name) {
            	    $this->json->output(array('success' => false,'errors' => array('csr_corp_name' => '您的输入不正确！')));
            	}
        		$orderid=$this->Order_model->create_order($csr_person_name,$csr_person_id,$csr_type,$csr_corp_name,$csr_corp_id,$channel_type,$amount,$proj_name,$proj_id,$is_realname);
            } else {
	            $person=$this->Csr_person_model->get_by_id($csr_person_id);
    	        if($person->csr_person_name != $csr_person_name) {
        	        $this->json->output(array('success' => false,'errors' => array('csr_person_name' => '您的输入不正确！')));
            	}
                $orderid=$this->Order_model->create_order($csr_person_name,$csr_person_id,$csr_type,'','','none',$amount,$proj_name,$proj_id,$is_realname);
            }
        } else {
            $this->json->output(array('success' => false));
        }
        
        $order = $this->Order_model->get_by_id($orderid);
        $flow_next_user = $this->User_model->get_by_name($order->proj_manager);

        $mail_content_title = '新 预 约';
   	    $mail_content_mainstr = '<p>新建预约</p><p><table><tr><td>申请人：　</td><td>'.$order->creator.'</td></tr>'.
       	    '<tr><td>项目名称：</td><td>'.$order->proj_name.'</td></tr>'.
           	'<tr><td>客户姓名：</td><td>'.$order->csr_name.'</td></tr>'.
            '<tr><td>投资数额：</td><td>'.$order->amount.'万元</td></tr></table></p>'.
   	        '<p>请点击<a href="http://rainbowbridge.sinaapp.com/ts/index.php/order?itemid='.$order->itemid.'"> 这里 </a>查看';
       	$mail_content_buttomstr = '您收到这封邮件，是因为您是该预约产品的产品经理。';
        $mail_subject = 'YW31_新预约: 预约号'.$order->itemid;
   	    
        $this->utility->noticemail_html($flow_next_user->email, $mail_subject, $mail_content_title, $mail_content_mainstr, $mail_content_buttomstr, '');

        $this->json->output(array('success' => true,'data' =>$orderid));
	}
    public function update_order_submit(){
        $itemid=$this->input->post('itemid');
        $csr_person_name=$this->input->post('csr_person_name');
        $csr_person_id=$this->input->post('csr_person_id');
        $csr_fm_corp_name=$this->input->post('csr_fm_corp_name');
        $csr_fm_corp_id=$this->input->post('csr_fm_corp_id');
        $csr_type=$this->input->post('radioNewCsr');
        $csr_channel_name=$this->input->post('csr_channel_name');
        $csr_channel_id=$this->input->post('csr_channel_id');
        $csr_corp_name=$this->input->post('csr_corp_name');
        $csr_corp_id=$this->input->post('csr_corp_id');
        $channel_type=$this->input->post('radioNewChannel');
        $amount=$this->input->post('amount');
        $proj_name=$this->input->post('proj_name');
        $proj_id=$this->input->post('proj_id');
        $is_realname=$this->input->post('is_realname');
        
        $proj=$this->Proj_model->get_proj($proj_id);
        if($proj->name != $proj_name) {
            $this->json->output(array('success' => false,'errors' => array('proj_name' => '您的输入不正确！')));
        }

        $order=$this->Order_model->get_by_id($itemid);
        
        if($order->creator!= $this->get_user_info('realname')) {
            $this->json->output(array('success' => false,'errors' => array('proj_name' => '您不可以修改他人的预约！')));
        }
        
        if($order->state != 'subscribing' && $order->state != 'accepted' && $order->state != 'invested'){
            $this->json->output(array('success' => false,'errors' => array('proj_name' => '您提交的订单已不可修改！')));
        }
      
        if($csr_type=='fm_corp'){
            if($order->is_realname>0 && $order->csr_name != $csr_fm_corp_name) {
                $this->json->output(array('success' => false,'errors' => array('csr_fm_corp_name' => '实名预约不可以修改用户名称！')));
            }
            if($channel_type=='channel'){
            	$channel=$this->Csr_channel_model->get_by_id($csr_channel_id);
            	if($channel->csr_channel_name != $csr_channel_name) {
            	    $this->json->output(array('success' => false, 'errors' => array('csr_channel_name' => '您的输入不正确！')));
            	}
        		$this->Order_model->update_order($itemid,$csr_fm_corp_name,$csr_fm_corp_id,$csr_type,$csr_channel_name,$csr_channel_id,$channel_type,$amount,$proj_name,$proj_id);
            } else if ($channel_type=='corp') {
            	$corp=$this->Csr_corp_model->get_by_id($csr_corp_id);
            	if($corp->csr_corp_name != $csr_corp_name) {
            	    $this->json->output(array('success' => false,'errors' => array('csr_corp_name' => '您的输入不正确！')));
            	}
        		$this->Order_model->update_order($itemid,$csr_fm_corp_name,$csr_fm_corp_id,$csr_type,$csr_corp_name,$csr_corp_id,$channel_type,$amount,$proj_name,$proj_id);
            } else {
	            $fm_corp=$this->Csr_fm_corp_model->get_by_id($csr_fm_corp_id);
    	        if($fm_corp->csr_fm_corp_name != $csr_fm_corp_name) {
        	        $this->json->output(array('success' => false,'errors' => array('csr_fm_corp_name' => '您的输入不正确！')));
            	}
                $this->Order_model->update_order($itemid,$csr_fm_corp_name,$csr_fm_corp_id,$csr_type,'','','none',$amount,$proj_name,$proj_id);
            }
        } else if($csr_type=='person'){
            if($order->is_realname>0 && $order->csr_name != $csr_person_name) {
                $this->json->output(array('success' => false,'errors' => array('csr_person_name' => '实名预约不可以修改用户名称！')));
            }
            if($channel_type=='channel'){
            	$channel=$this->Csr_channel_model->get_by_id($csr_channel_id);
            	if($channel->csr_channel_name != $csr_channel_name) {
            	    $this->json->output(array('success' => false,'errors' => array('csr_channel_name' => '您的输入不正确！')));
            	}
        		$this->Order_model->update_order($itemid,$csr_person_name,$csr_person_id,$csr_type,$csr_channel_name,$csr_channel_id,$channel_type,$amount,$proj_name,$proj_id);
            } else if ($channel_type=='corp') {
            	$corp=$this->Csr_corp_model->get_by_id($csr_corp_id);
            	if($corp->csr_corp_name != $csr_corp_name) {
            	    $this->json->output(array('success' => false,'errors' => array('csr_corp_name' =>'您的输入不正确！')));
            	}
        		$this->Order_model->update_order($itemid,$csr_person_name,$csr_person_id,$csr_type,$csr_corp_name,$csr_corp_id,$channel_type,$amount,$proj_name,$proj_id);
            } else {
	            $person=$this->Csr_person_model->get_by_id($csr_person_id);
    	        if($person->csr_person_name != $csr_person_name) {
        	        $this->json->output(array('success' => false,'errors' => array('csr_person_name' =>'您的输入不正确！')));
            	}
                $this->Order_model->update_order($itemid,$csr_person_name,$csr_person_id,$csr_type,'','','none',$amount,$proj_name,$proj_id);
            }
        } else {
            $this->json->output(array('success' => false));
        }
        $flow_next_user = $this->User_model->get_by_name($order->proj_manager);

        $mail_content_title = '预 约 修 改';
   	    $mail_content_mainstr = '<p>以下预约已被修改：</p><p><table><tr><td>申请人：　</td><td>'.$order->creator.'</td></tr>'.
       	    '<tr><td>项目名称：</td><td>'.$order->proj_name.'</td></tr>'.
           	'<tr><td>客户姓名：</td><td>'.$order->csr_name.'</td></tr>'.
            '<tr><td>投资数额：</td><td>'.$order->amount.'万元</td></tr></table></p>'.
   	        '<p>请点击<a href="http://rainbowbridge.sinaapp.com/ts/index.php/order?itemid='.$order->itemid.'"> 这里 </a>查看';
       	$mail_content_buttomstr = '您收到这封邮件，是因为您是该预约产品的产品经理。';
        $mail_subject = 'YW32_预约修改: 预约号'.$order->itemid;
   	    
        $this->utility->noticemail_html($flow_next_user->email, $mail_subject, $mail_content_title, $mail_content_mainstr, $mail_content_buttomstr, '');

        $this->json->output(array('success' => true,'data' =>$itemid));
	}
	public function confirm_order_submit(){
        $itemid=$this->input->post('itemid');
        $comm_in_percent=$this->input->post('comm_in_percent');
        $comm_out_percent=$this->input->post('comm_out_percent');
        

        $order=$this->Order_model->get_by_id($itemid);
        
        if($order->proj_manager != $this->get_user_info('realname') && $order->proj_director != $this->get_user_info('realname')) {
            $this->json->output(array('success' => false,'m' => '您不可以修改他人的预约！'));
        }
        
        if($order->state != 'subscribing' && $order->state != 'accepted' && $order->state != 'invested'){
            $this->json->output(array('success' => false,'m' => '您提交的订单不可接受！'));
        }

        $this->Order_model->accept_order($itemid,$comm_in_percent,$comm_out_percent);

        $flow_next_user = $this->User_model->get_by_name($order->creator);

        $mail_content_title = '预 约 已 接 受';
   	    $mail_content_mainstr = '<p>以下预约已由该产品的产品经理接受，您可以安排打款事宜：</p><p><table><tr><td>申请人：　</td><td>'.$order->creator.'</td></tr>'.
       	    '<tr><td>项目名称：</td><td>'.$order->proj_name.'</td></tr>'.
           	'<tr><td>客户姓名：</td><td>'.$order->csr_name.'</td></tr>'.
            '<tr><td>投资数额：</td><td>'.$order->amount.'万元</td></tr></table></p>'.
   	        '<p>请点击<a href="http://rainbowbridge.sinaapp.com/ts/index.php/order?itemid='.$order->itemid.'"> 这里 </a>查看';
       	$mail_content_buttomstr = '您收到这封邮件，是因为您是该预约的创建人。';
        $mail_subject = 'YW33_预约生效: 预约号'.$order->itemid;
   	    
        $this->utility->noticemail_html($flow_next_user->email, $mail_subject, $mail_content_title, $mail_content_mainstr, $mail_content_buttomstr, '');
        
        $this->json->output(array('success' => true));
	}
	public function end_order_submit(){
        $itemid=$this->input->post('itemid');
        $state=$this->input->post('state');
        
        $order = $this->Order_model->get_by_id($itemid);
        $flow_next_user = $this->User_model->get_by_name($order->creator);
        
        if($state=='abort') {
        
	        if($order->proj_manager != $this->get_user_info('realname') && $order->proj_director != $this->get_user_info('realname') && $order->creator != $this->get_user_info('realname')) {
    	        $this->json->output(array('success' => false,'m' => '您不可以修改他人的预约！'));
        	}
        
	        if($order->state != 'subscribing' && $order->state != 'accepted' && $order->state != 'invested'){
    	        $this->json->output(array('success' => false,'m' => '您提交的订单已不可修改！'));
        	}

        	$this->Order_model->finish_order($itemid,$state);

            $mail_content_title = '预 约 已 被 终 止';
   		    $mail_content_mainstr = '<p>以下预约已结束并从列表中去除：</p><p><table><tr><td>申请人：　</td><td>'.$order->creator.'</td></tr>'.
       		    '<tr><td>项目名称：</td><td>'.$order->proj_name.'</td></tr>'.
           		'<tr><td>客户姓名：</td><td>'.$order->csr_name.'</td></tr>'.
	            '<tr><td>投资数额：</td><td>'.$order->amount.'万元</td></tr></table></p>'.
   		        '<p>请点击<a href="http://rainbowbridge.sinaapp.com/ts/index.php/order?itemid='.$order->itemid.'"> 这里 </a>查看';
       		$mail_content_buttomstr = '您收到这封邮件，是因为您是该预约的创建人。';
	        $mail_subject = 'YW39_预约终止: 预约号'.$order->itemid;
   		    
            $this->utility->noticemail_html($flow_next_user->email, $mail_subject, $mail_content_title, $mail_content_mainstr, $mail_content_buttomstr, '');

	        $flow_next_user = $this->User_model->get_by_name($order->proj_manager);
    	   	$mail_content_buttomstr = '您收到这封邮件，是因为您是该预约产品的产品经理。';
            $this->utility->noticemail_html($flow_next_user->email, $mail_subject, $mail_content_title, $mail_content_mainstr, $mail_content_buttomstr, '');
        } else {
	        if($order->proj_manager != $this->get_user_info('realname') && $order->proj_director != $this->get_user_info('realname')) {
    	        $this->json->output(array('success' => false,'m' => '您不可以修改他人的预约！'));
        	}
        
	        if($order->state != 'subscribing' && $order->state != 'accepted' && $order->state != 'invested'){
    	        $this->json->output(array('success' => false,'m' => '您提交的订单已不可修改！'));
        	}
        	$this->Order_model->finish_order($itemid,$state);
   	        
            $mail_content_title = '预 约 已 成 立';
   		    $mail_content_mainstr = '<p>以下预约已正式成立：</p><p><table><tr><td>申请人：　</td><td>'.$order->creator.'</td></tr>'.
       		    '<tr><td>项目名称：</td><td>'.$order->proj_name.'</td></tr>'.
           		'<tr><td>客户姓名：</td><td>'.$order->csr_name.'</td></tr>'.
	            '<tr><td>投资数额：</td><td>'.$order->amount.'万元</td></tr></table></p>'.
                '<p>该订单现在可以从成交管理中进行后续事宜。</p>';
                '<p>请点击 <a href="http://rainbowbridge.sinaapp.com/ts/index.php/order/main_confirmed?itemid='.$order->itemid.'">这里</a> 查看</p>';
       		$mail_content_buttomstr = '您收到这封邮件，是因为您是该预约的创建人。';
	        $mail_subject = 'YW35_预约成立: 预约号'.$order->itemid;
   		    
            $this->utility->noticemail_html($flow_next_user->email, $mail_subject, $mail_content_title, $mail_content_mainstr, $mail_content_buttomstr, '');
	        $flow_next_user = $this->User_model->get_by_name($order->proj_manager);
    	   	$mail_content_buttomstr = '您收到这封邮件，是因为您是该预约产品的产品经理。';
            $this->utility->noticemail_html($flow_next_user->email, $mail_subject, $mail_content_title, $mail_content_mainstr, $mail_content_buttomstr, '');
        }
        
        $this->json->output(array('success' => true));
	}
	public function invest_in_request(){
		$itemid=$this->input->post('itemid');
		$content=$this->input->post('content');
		
        $order = $this->Order_model->get_by_id($itemid);
        
	    if($order->creator != $this->get_user_info('realname')) {
    	    $this->json->output(array('success' => false,'m' => '您不可以修改他人的预约！'));
        }
        
	    if($order->state != 'accepted'){
    	    $this->json->output(array('success' => false,'m' => '您提交的订单不可修改！'));
        }
        $this->Order_model->invest_order($itemid);

		$max_size = 10; // filesize MB
        //var_dump($_FILES);

		if($_FILES['file']['name']!="") {
			if($_FILES['file']['size'] > $max_size * 1024 * 1024) {
				$this->json->output(array('success' => false, 'm' => '上传文件大小不能超过'.$max_size.'MB'));
			}
			$store_filename=$this->encrypt->sha1($_FILES['file']['name'].date('Y-m-d H:i:s'));

			$s = new SaeStorage(SAE_ACCESSKEY, SAE_SECRETKEY);
			$url = $s->upload('order', $store_filename, $_FILES['file']['tmp_name']);
			if(!$url) {
				$this->json->output(array('success' => false, 'm' => $s->errmsg()));
			}
			// insert into upload table
            //$file_list = $this->Library_model->get_upload_by_name($_FILES['file']['name'], $dir_path, 'normal');
			
            //$id = $this->Order_model->create_upload($remark, $_FILES['file']['name'], $_FILES['file']['size'], $dir_path,'',$store_filename, $version);
            
	   	    $this_step_id=$this->Reminder_model->system_create_item('order_invest','打款确认流程：提交','','/order?itemid='.$order->itemid,$order->proj_manager,0,$this->get_user_info('realname'),$content,$content,1,$itemid,$_FILES['file']['name'],$store_filename,$_FILES['file']['size']);
    	    $this->Reminder_model->system_create_item('order_invest','打款确认流程：审核','','/order?itemid='.$order->itemid,'end',1,$order->proj_manager,'',$content,2,$itemid);
        
            $this->Reminder_model->finish_item($this_step_id);
            
	        $flow_next_user = $this->User_model->get_by_name($order->proj_manager);

    	    $mail_content_title = '打 款 确 认 申 请';
	        $mail_content_mainstr = '<p>以下预约正在申请确认打款：</p><p><table><tr><td>申请人：　</td><td>'.$order->creator.'</td></tr>'.
        	    '<tr><td>项目名称：</td><td>'.$order->proj_name.'</td></tr>'.
    	        '<tr><td>客户姓名：</td><td>'.$order->csr_name.'</td></tr>'.
            	'<tr><td>投资数额：</td><td>'.$order->amount.'万元</td></tr></table></p>'.
	            '<p>请点击<a href="http://rainbowbridge.sinaapp.com/ts/index.php/order?itemid='.$order->itemid.'"> 这里 </a>查看';
    	    $mail_content_buttomstr = '您收到这封邮件，是因为您是该预约产品的产品经理。';
        	$mail_subject = 'YW34_打款确认申请: 预约号'.$order->itemid;
        
	        $this->utility->noticemail_html($flow_next_user->email, $mail_subject, $mail_content_title, $mail_content_mainstr, $mail_content_buttomstr, '');

			// extjs json decode bug, using echo instead of output
			// $this->json->output(array('success' => true, 'url' => $url));
			echo '{"success":true, "file":"'.$_FILES['file']['name'].'"}';exit;
		} else {
	   	    $this_step_id=$this->Reminder_model->system_create_item('order_invest','打款确认流程：提交','','/order?itemid='.$order->itemid,$order->proj_manager,0,$this->get_user_info('realname'),$content,$content,1,$itemid);
    	    $this->Reminder_model->system_create_item('order_invest','打款确认流程：审核','','/order?itemid='.$order->itemid,'end',1,$order->proj_manager,'',$content,2,$itemid);
        
            $this->Reminder_model->finish_item($this_step_id);

            $flow_next_user = $this->User_model->get_by_name($order->proj_manager);

    	    $mail_content_title = '打 款 确 认 申 请';
	        $mail_content_mainstr = '<p>以下预约正在申请确认打款：</p><p><table><tr><td>申请人：　</td><td>'.$order->creator.'</td></tr>'.
        	    '<tr><td>项目名称：</td><td>'.$order->proj_name.'</td></tr>'.
    	        '<tr><td>客户姓名：</td><td>'.$order->csr_name.'</td></tr>'.
            	'<tr><td>投资数额：</td><td>'.$order->amount.'万元</td></tr></table></p>'.
	            '<p>请点击<a href="http://rainbowbridge.sinaapp.com/ts/index.php/order?itemid='.$order->itemid.'"> 这里 </a>查看';
    	    $mail_content_buttomstr = '您收到这封邮件，是因为您是该预约产品的产品经理。';
        	$mail_subject = 'YW34_打款确认申请: 预约号'.$order->itemid;
        
	        $this->utility->noticemail_html($flow_next_user->email, $mail_subject, $mail_content_title, $mail_content_mainstr, $mail_content_buttomstr, '');

			// extjs json decode bug, using echo instead of output
			// $this->json->output(array('success' => true, 'url' => $url));
			echo '{"success":true}';exit;
            
        }
	}
    
	public function invest_in_submit(){
		$itemid = $this->input->post('itemid');
        $result = $this->input->post('result');
        $content = $this->input->post('content');

        $order = $this->Order_model->get_by_id($itemid);
        
	    if($order->proj_manager != $this->get_user_info('realname') && $order->proj_director != $this->get_user_info('realname')) {
    	    $this->json->output(array('success' => false,'m' => '您不可以修改他人的预约！'));
        }
        
	    if($order->state != 'accepted'){
    	    $this->json->output(array('success' => false,'m' => '您提交的订单已不可修改！'));
        }
        if($result=='agree'){
	        $this->Order_model->invest_order($itemid,'done');
            //update_status_batch($category,$batchid,$last_message,$status='normal',$status_default='normal'){
            
            $reminder = $this->Reminder_model->get_by_batchid($itemid,'yes');
        	$this->Reminder_model->update_remark($reminder->itemid,'content');
        	$this->Reminder_model->update_status_batch('order',$itemid,$content);
            
            $flow_next_user = $this->User_model->get_by_name($order->creator);

	        $mail_content_title = '打 款 已 确 认';
    	    $mail_content_mainstr = '<p>以下预约已确认打款：</p><p><table><tr><td>申请人：　</td><td>'.$order->creator.'</td></tr>'.
        	    '<tr><td>项目名称：</td><td>'.$order->proj_name.'</td></tr>'.
            	'<tr><td>客户姓名：</td><td>'.$order->csr_name.'</td></tr>'.
	            '<tr><td>投资数额：</td><td>'.$order->amount.'万元</td></tr></table></p>'.
    	        '<p>请点击<a href="http://rainbowbridge.sinaapp.com/ts/index.php/order?itemid='.$order->itemid.'"> 这里 </a>查看';
        	$mail_content_buttomstr = '您收到这封邮件，是因为您是该预约的创建人。';
	        $mail_subject = 'YW34_打款确认: 预约号'.$order->itemid;
    	    
            $this->utility->noticemail_html($flow_next_user->email, $mail_subject, $mail_content_title, $mail_content_mainstr, $mail_content_buttomstr, '');

            $this->json->output(array('success' => true));
        } else {
            $this->Order_model->refuse_invest_order($itemid);

            $reminder = $this->Reminder_model->get_by_batchid($itemid,'yes');

            $this->Reminder_model->update_remark($reminder->itemid,'content');
            $this->Reminder_model->update_status_batch('order_invest',$itemid,$content,'end');

	        $order = $this->Order_model->get_by_id($itemid);
            $flow_next_user = $this->User_model->get_by_name($order->creator);

	        $mail_content_title = '打 款 申 请 被 拒 绝';
    	    $mail_content_mainstr = '<p>以下预约无法确认打款：</p><p><table><tr><td>申请人：　</td><td>'.$order->creator.'</td></tr>'.
        	    '<tr><td>项目名称：</td><td>'.$order->proj_name.'</td></tr>'.
            	'<tr><td>客户姓名：</td><td>'.$order->csr_name.'</td></tr>'.
	            '<tr><td>投资数额：</td><td>'.$order->amount.'万元</td></tr></table></p>'.
    	        '<p>您可以重新提交打款申请。</p>';
    	        '<p>请点击<a href="http://rainbowbridge.sinaapp.com/ts/index.php/order?itemid='.$order->itemid.'"> 这里 </a>查看';
        	$mail_content_buttomstr = '您收到这封邮件，是因为您是该预约的创建人。';
	        $mail_subject = 'YW34_打款拒绝: 预约号'.$order->itemid;
    	    
            $this->utility->noticemail_html($flow_next_user->email, $mail_subject, $mail_content_title, $mail_content_mainstr, $mail_content_buttomstr, '');

            $this->json->output(array('success' => true));
        }
	}
	public function comm_in_request(){
		$orderId=$this->input->post('orderId');
        $remark=$this->input->post('remark');

        $order = $this->Order_model->get_by_id($orderid);

        $this_step_id=$this->Reminder_model->system_create_item('order_comm_in','业绩收款流程：通知收款','','/order?itemid='.$order->itemid,$order->manager,1,'郭晶晶',$content,$content,1,$itemid);
        $this->Reminder_model->system_create_item('order_comm_in','业绩收款流程：提交','','/order?itemid='.$order->itemid,'郭晶晶',0,$order->manager,$content,$content,2,$itemid);
        $this->Reminder_model->system_create_item('order_comm_in','业绩收款流程：产品经理确认','','/order?itemid='.$order->itemid,$order->director,0,$order->manager,$content,$content,3,$itemid);
        $this->Reminder_model->system_create_item('order_comm_in','业绩收款流程：产品董事确认','','/order?itemid='.$order->itemid,'end',0,$order->director,$content,$content,4,$itemid);
        
        $this->Reminder_model->system_create_item('order_comm_in','业绩收款流程','','/order?itemid='.$order->itemid,'other',0,'王晶',$content,$content,$itemid);
        $this->Reminder_model->system_create_item('order_comm_in','业绩收款流程','','/order?itemid='.$order->itemid,'other',0,'申玉玺',$content,$content,$itemid);
        $this->Reminder_model->system_create_item('order_comm_in','业绩收款流程','','/order?itemid='.$order->itemid,'other',0,'许欣平',$content,$content,$itemid);
        
        $this->Reminder_model->finish_item($this_step_id);
        
        $mail_content_title = '业 绩 收 款 流 程';	
   	    $mail_content_mainstr = '<p>以下成交订单无法确认收款，您可以稍后重新提交申请：</p><p><table><tr><td>申请人：　</td><td>'.$order->creator.'</td></tr>'.
       	    '<tr><td>项目名称：</td><td>'.$order->proj_name.'</td></tr>'.
           	'<tr><td>客户姓名：</td><td>'.$order->csr_name.'</td></tr>'.
            '<tr><td>投资数额：</td><td>'.$order->amount.'万元</td></tr></table></p>'.
   	        '<p>请点击<a href="http://rainbowbridge.sinaapp.com/ts/index.php/order?itemid='.$order->itemid.'"> 这里 </a>查看';
       	$mail_content_buttomstr = '您收到这封邮件，是因为您是该预约的创建人。';
        $mail_subject = 'CW41_打款确认申请: 预约号'.$order->itemid;
        
        $this->utility->noticemail_html('guo@firstshin.com', $mail_subject, $mail_content_title, $mail_content_mainstr, $mail_content_buttomstr, $proj);

        $this->json->output(array('success' => true));
	}

	public function comm_in_submit(){
        //这个还要弄
		$itemid = $this->input->post('itemid');
        $result = $this->input->post('result');
        $content = $this->input->post('content');
        
        $this_step = $this->Reminder_model->get_by_batchid($itemid);
        
        if($result!='agree'){
	        $this->Order_model->invest_order($itemid,'done');
    	    //update_status_batch($category,$batchid,$last_message,$status='normal',$status_default='normal'){
            
            $reminder = $this->Reminder_model->get_by_batchid($itemid,'yes');
        	$this->Reminder_model->update_remark($reminder->itemid,'content');
        	$this->Reminder_model->update_status_batch('order_comm_in',$itemid,$content,'end');
            
	        $order = $this->Order_model->get_by_id($itemid);
            $flow_next_user = $this->User_model->get_by_name($order->creator);

	        $mail_content_title = '收 款 不 能 确 认';
    	    $mail_content_mainstr = '<p>以下成交订单无法确认收款，您可以稍后重新提交申请：</p><p><table><tr><td>申请人：　</td><td>'.$order->creator.'</td></tr>'.
        	    '<tr><td>项目名称：</td><td>'.$order->proj_name.'</td></tr>'.
            	'<tr><td>客户姓名：</td><td>'.$order->csr_name.'</td></tr>'.
	            '<tr><td>投资数额：</td><td>'.$order->amount.'万元</td></tr></table></p>'.
    	        '<p>请点击<a href="http://rainbowbridge.sinaapp.com/ts/index.php/order?itemid='.$order->itemid.'"> 这里 </a>查看';
        	$mail_content_buttomstr = '您收到这封邮件，是因为您是该预约的创建人。';
	        $mail_subject = 'CW41_打款确认: 预约号'.$order->itemid;
    	    
       		$this->utility->noticemail_html($flow_next_user->email, $mail_subject, $mail_content_title, $mail_content_mainstr, $mail_content_buttomstr, '');

            $this->json->output(array('success' => true));
        } else {
	        if($this_step->flow_is_current =='end') {
    	        //更新当前步骤
        		$this->update_remark($this_step->itemid,$remark,'no');
            	//全部更新状态和最后说明
	        	$this->update_status_batch($this_step->category,$this_step->batchid,$remark);
    	        //结束流程
	    	    $this->Order_model->comm_in_order($itemid);
	        } else {
    	    	$next_step = $this->Reminder_model->get_by_batchid($itemid,'no',($this_step->flow_step)+1);
        	    //调整本步骤和下一步骤的状态
        		$this->Reminder_model->update_status($this_step->itemid,$remark,'no','');
	        	$this->Reminder_model->update_status($next_step->itemid,'','yes','');
    	        //全部最后说明
        		$this->update_status_batch($this_step->category,$this_step->batchid,$remark,'');
        	}
        }
        $this->json->output(array('success' => true));
	}

    public function comm_out_request(){
		$orderId=$this->input->post('orderId');
        $remark=$this->input->post('remark');

        $order = $this->Order_model->get_by_id($orderid);

        //system_create_item($category,$title,$content,$link,$flow_path,$flow_is_current,$assignee,$remark,$last_message,$batchid,$status='normal'){
        $this->Reminder_model->system_create_item('order_comm_out','业绩付款流程：通知付款','','',$order->creator,0,'王晶','','',1,$itemid);
        $this->Reminder_model->system_create_item('order_comm_out','业绩付款流程：提交','','','王晶',0,$order->creator,'','',2,$itemid);
        $this->Reminder_model->system_create_item('order_comm_out','业绩付款流程：确认','','','end',0,$order->creator,'','',6,$itemid);

        $this->Reminder_model->system_create_item('order_comm_out','业绩付款流程：操作','','',$order->creator,1,'郭晶晶','','',5,$itemid);
        $this->Reminder_model->system_create_item('order_comm_out','业绩付款流程：财务审批','','','申玉玺',0,'王晶','','',3,$itemid);
        $this->Reminder_model->system_create_item('order_comm_out','业绩付款流程：审批','','','郭晶晶',0,'申玉玺','','',4,$itemid);
        $this->Reminder_model->system_create_item('order_comm_out','业绩付款流程','','','other',0,'许欣平','','',$itemid);
        
        $this->json->output(array('success' => true));
    }
	public function comm_out_submit(){
		$itemid = $this->input->post('itemid');
        $result = $this->input->post('result');
        $content = $this->input->post('content');
        
        $this_step = $this->Reminder_model->get_by_batchid($itemid);
        
        if($result!='agree'){
	        $this->Order_model->invest_order($itemid,'done');
    	    //update_status_batch($category,$batchid,$last_message,$status='normal',$status_default='normal'){
            
            $reminder = $this->Reminder_model->get_by_batchid($itemid,'yes');
        	$this->Reminder_model->update_remark($reminder->itemid,'content');
        	$this->Reminder_model->update_status_batch('order_comm_out',$itemid,$content,'end');
            
	        $order = $this->Order_model->get_by_id($itemid);
            $flow_next_user = $this->User_model->get_by_name($order->creator);

	        $mail_content_title = '付 款 不 能 确 认';
    	    $mail_content_mainstr = '<p>以下成交订单无法确认付款，您可以稍后重新提交申请：</p><p><table><tr><td>申请人：　</td><td>'.$order->creator.'</td></tr>'.
        	    '<tr><td>项目名称：</td><td>'.$order->proj_name.'</td></tr>'.
            	'<tr><td>客户姓名：</td><td>'.$order->csr_name.'</td></tr>'.
	            '<tr><td>投资数额：</td><td>'.$order->amount.'万元</td></tr></table></p>'.
    	        '<p>请点击<a href="http://rainbowbridge.sinaapp.com/ts/index.php/order?itemid='.$order->itemid.'"> 这里 </a>查看';
        	$mail_content_buttomstr = '您收到这封邮件，是因为您是该预约的创建人。';
	        $mail_subject = 'CW41_打款确认: 预约号'.$order->itemid;
    	    
       		$this->utility->noticemail_html($flow_next_user->email, $mail_subject, $mail_content_title, $mail_content_mainstr, $mail_content_buttomstr, '');

            $this->json->output(array('success' => true));
        } else {
            if($this_step->flow_is_current =='end') {
        	    //更新当前步骤
	        	$this->update_remark($this_step->itemid,$remark,'no');
	            //全部更新状态和最后说明
    	    	$this->update_status_batch($this_step->category,$this_step->batchid,$remark);
    	        //结束流程
	    	    $this->Order_model->comm_out_order($itemid);
	        } else {
    	    	$next_step = $this->Reminder_model->get_by_batchid($itemid,'no',($this_step->flow_step)+1);
        	    //全部最后说明
	        	$this->update_status_batch($this_step->category,$this_step->batchid,$remark,'');
    	        //调整本步骤和下一步骤的状态
        		$this->Reminder_model->update_status($this_step->itemid,$remark,'no','');
	        	$this->Reminder_model->update_status($next_step->itemid,'','yes','');
    	    }
        }
        $this->json->output(array('success' => true));
	}	
	public function advance_request(){
        //todo
        
		$orderId=$this->input->post('orderId');
        $advance_out_request=$this->input->post('advance_out_request');
        $advance_out_request_ts=$this->input->post('advance_out_request_ts');
        $remark=$this->input->post('remark');

        $order = $this->Order_model->get_by_id($orderid);
        //system_create_item($category,$title,$content,$link,$flow_path,$flow_is_current,$assignee,$remark,$last_message,$batchid,$status='normal')
        $this->Reminder_model->system_create_item('order','垫款流程','','','no',$this->get_user_info('realname'),'','',$itemid);
        $this->Reminder_model->system_create_item('order','垫款流程','','','yes',$order->manager,'','',$itemid);

        $this->Reminder_model->system_create_item('order','垫款流程','','','no','郭晶晶','','',$itemid);
        $this->Reminder_model->system_create_item('order','垫款流程','','','no','王晶','','',$itemid);
        $this->Reminder_model->system_create_item('order','垫款流程','','','no','申玉玺','','',$itemid);
        $this->Reminder_model->system_create_item('order','垫款流程','','','no','许欣平','','',$itemid);
    }
    
    public function advance_test(){
    }
    
    public function attach_get(){
		$itemid = $this->input->get('itemid');
        
		if(!$this->utility->chk_id($itemid)) {
			$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
		}
        $file_info=$this->Reminder_model->get_by_id($itemid);
        
		if(!empty($file_info)) {
			$s = new SaeStorage(SAE_ACCESSKEY, SAE_SECRETKEY);
			$content = $s->read('order', $file_info->store_attachment);

			header('Content-type: application/octet-stream');
            header('Content-Disposition: attachment; filename="'.urlencode($file_info->attachment).'";');//
			exit($content);
		}
        
    }
	public function advance_submit(){
		$itemid=$this->input->post('itemid');
        $this->Order_model->advance_order($itemid);
	}
    
	private function get_user_info($field) {
		$info = element($field, $this->session->userdata('user'));
		if($info === false) {
			return false;
		}
		return $info;
	}
    private function is_order_admin() {
        if($this->utility->get_order_group() == 'admin' || $this->utility->get_order_group() == 'finance') {
            return true;
        }
        return false;
    }
	
	private function has_update_privilege() {
		if( !$this->utility->is_admin() && !$this->utility->is_pm() && !$this->utility->is_director() && !$this->utility->is_director_2() ) {
			return false;
		}
		return true;
	}
	private function has_create_privilege() {
		if( !$this->utility->is_admin() && !$this->utility->is_pm() && !$this->utility->is_director() ) {
			return false;
		}
		return true;
	}
}