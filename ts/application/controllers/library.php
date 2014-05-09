<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Library extends Auth_Controller {
	function __construct() {
		parent::__construct();
	}
    
	function index() {
		$this->template->load('default', 'library/view');
	}
    
    function test() {
        $teststr='/abc/def/ghi';
        echo dirname($teststr).'          ';
        echo dirname(dirname($teststr));
    }

	function submit() {
		//var_dump($_FILES);exit;
		if(!$this->has_privilege()) {
			$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
		}

        $remark = $this->input->post('remark');
        $dir_path = $this->input->post('dir_path');

        //if(!$this->utility->chk_id($proj_id)) {
        //	$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
        //}

		$max_size = 20; // filesize MB
		if($_FILES['file']['size'] > $max_size * 1024 * 1024) {
			$this->json->output(array('success' => false, 'm' => '上传文件大小不能超过'.$max_size.'MB'));
		}
		
		$store_filename=$this->encrypt->sha1($_FILES['file']['name'].date('Y-m-d H:i:s'));

		if(!empty($_FILES)) {
			$s = new SaeStorage(SAE_ACCESSKEY, SAE_SECRETKEY);
			$url = $s->upload('library', $store_filename, $_FILES['file']['tmp_name']);
			if(!$url) {
				$this->json->output(array('success' => false, 'm' => $s->errmsg()));
			}
			// insert into upload table
			$file_list = $this->Library_model->get_upload_by_name($_FILES['file']['name'], $dir_path, 'normal');
			
            $version = 1;
            
			if( count($file_list) > 1) {
				echo '{"success":false}';exit;
			} else if( count($file_list) == 1) {
				$version = $file_list[0]->version;
			}
            
			$id = $this->Library_model->create_upload($remark, $_FILES['file']['name'], $_FILES['file']['size'], $dir_path,'',$store_filename, $version);
			
			// extjs json decode bug, using echo instead of output
			// $this->json->output(array('success' => true, 'url' => $url));
			echo '{"success":true, "file":"'.$_FILES['file']['name'].'"}';exit;
		}
	}

	function create_dir_submit(){
		if(!$this->has_privilege()) {
			$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
		}
		$dir= $this->input->post('dir');
        $remark = $this->input->post('remark');
        $dir_path = $this->input->post('dir_path');
        
        if($dir == '返回上层') {
        	$this->json->output(array('success' => false, 'm' => '您不能取这个文件夹名字'));
        }
        
		$file_list = $this->Library_model->get_upload_by_name($dir, $dir_path, 'normal');
		
		if(count($file_list) >= 1) {
			$this->json->output(array('success' => false, 'm' => '您不能取这个文件夹名字'));
		}
		
        $store_filename=$this->encrypt->sha1($dir.date('Y-m-d H:i:s'));
        
        $this->Library_model->create_dir($dir, $remark, $dir_path, $store_filename);
		$this->json->output(array('success' => true));
	}

	function get_list() {
        //$proj_id = $this->input->get('proj_id');

        //if(!$this->utility->chk_id($proj_id)) {
        //	$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
        //}

        $dir_path = $this->input->get('dir_path');
        //$storage_url = site_url('upload/get?file=');
		$data = $this->Library_model->get_upload_list($dir_path);
        //foreach($data as $key => $item) {
        //	$data[$key]->filename = $storage_url.$item->filename;
        //}

		$this->json->output(array('success' => true, 'data' => $data));
	}

	function get_recycle_list() {
        if($this->utility->is_library_manage()){
            $mode='manage';
        } else if($this->utility->is_library_admin()){
            $mode='admin';
        } else {
            $this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
        }
        
        $data = $this->Library_model->get_recycle_list($mode);

		$this->json->output(array('success' => true, 'data' => $data));
	}
    
	function get() {
		$fileid = $this->input->get('fileid');

		if(!empty($fileid)) {
			$file_list = $this->Library_model->get_upload_by_id($fileid, 'normal');
            
            //echo $file_list[0].$store_filename;
			if(!count($file_list) == 1) {
				$this->json->output(array('success' => false, 'm' => '文件读取错误，请联系管理员'));
			}
            
            if($file_list[0]->is_delete == 1 && !($this->utility->is_library_admin()) && 
               !($this->utility->is_library_manage() && $file_list[0]->creator == element('realname', $this->CI->session->userdata('user')))) {
               $this->json->output(array('success' => false, 'm' => '文件访问错误，请联系管理员'));
            }
			$s = new SaeStorage(SAE_ACCESSKEY, SAE_SECRETKEY);
			$content = $s->read('library', $file_list[0]->store_filename);

			header('Content-type: application/octet-stream');
            header('Content-Disposition: attachment; filename="'.urlencode($file_list[0]->filename).'";');//
			exit($content);
		}
	}

	function delete() {
		if(!$this->has_privilege()) {
			$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
		}

		$fileid = $this->input->get('fileid');

        $item=$this->Library_model->get_upload_by_id($fileid);

        if($this->utility->is_library_manage()){
            if(!$item[0]->creator == element('realname', $this->CI->session->userdata('user'))){
                $this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
            }
        }
        
        if($item[0]->is_dir==1 ){
            if($item[0]->filename == '返回上层') {
               	$this->json->output(array('success' => false, 'm' => '该文件夹不可删除'));
            } else {
                //echo $item[0]->dest_dir;
                if(!$this->Library_model->delete_dir($item[0]->dest_dir)){
                    $this->json->output(array('success' => false, 'm' => '删除文件出错，请联系管理员1'));
                }
                if($this->Library_model->delete_upload($fileid)){
                    $this->json->output(array('success' => true));
                }
                     
                $this->json->output(array('success' => false, 'm' => '删除文件出错，请联系管理员2'));   
            }
        }
        /*
        if(!empty($file)) {
			$s = new SaeStorage(SAE_ACCESSKEY, SAE_SECRETKEY);
			if($s->delete('library', $file)) {
				// remove from upload table
				$this->Library_model->delete_upload($file);
				$this->json->output(array('success' => true));
			}
        }
        */
        if($this->Library_model->delete_upload($fileid)){
            $this->json->output(array('success' => true));
        }
        
        $this->json->output(array('success' => false, 'm' => '删除文件出错，请联系管理员3'));
	}
    
    function restore() {
		if(!$this->utility->is_library_admin()) {
			$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
		}
		$fileid = $this->input->get('fileid');
        $item=$this->Library_model->get_upload_by_id($fileid);
        
        if($this->utility->is_library_manage()){
            if(!$item->creator == element('realname', $this->CI->session->userdata('user'))){
                $this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
            }
        }
        
        //$temp_item=$this->Library_model->get_upload_by_name($item->dest_dir,$item)；
        //if()
            
        if($this->Library_model->restore_upload($fileid)) {
            $this->json->output(array('success' => true));
        }
        
        $this->json->output(array('success' => false, 'm' => '恢复文件出错，请联系管理员'));
    }
    
    function view_history(){
		$fileid = $this->input->get('fileid');
        
		if(!empty($fileid)) {
			$file_list = $this->Library_model->get_upload_by_id($fileid, 'normal');
            
	        if($this->utility->is_library_manage()){
	            $mode='manage';
    	    } else if($this->utility->is_library_admin()){
        	    $mode='admin';
	        } else {
    	        $mode='normal';
        	}
        }
        
        $data=$this->Library_model->get_upload_history($fileid,$mode);
        
        $this->json->output(array('success' => false,'data' => $data));
    }
    
    function delete_history(){
		if(!$this->utility->is_library_admin()) {
			$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
		}
		$fileid = $this->input->get('fileid');
        
        if($this->utility->is_library_manage()){
            $item=$this->Library_model->get_upload_by_id($fileid);
            if(!$item->creator == element('realname', $this->CI->session->userdata('user'))){
                $this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
            }
        }
        if($this->Library_model->delete_upload($fileid)){
            $this->json->output(array('success' => true));
        }
        
        $this->json->output(array('success' => false, 'm' => '删除文件出错，请联系管理员'));
    }

    function restore_history() {
		if(!$this->utility->is_library_admin()) {
			$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
		}
		$fileid = $this->input->get('fileid');
        
        if($this->utility->is_library_manage()){
            $item=$this->Library_model->get_upload_by_id($fileid);
            if(!$item->creator == element('realname', $this->CI->session->userdata('user'))){
                $this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
            }
        }
        if($this->Library_model->restore_upload($fileid)){
            $this->json->output(array('success' => true));
        }
        
        $this->json->output(array('success' => false, 'm' => '恢复文件出错，请联系管理员'));
    }
    

    private function has_privilege() {
		if(!$this->utility->is_library_admin() && !$this->utility->is_library_manage()) {
			return false;
		}
		return true;
	}
}