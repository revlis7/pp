<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Upload extends Auth_Controller {
	function __construct() {
		parent::__construct();
	}

	function submit() {
		//var_dump($_FILES);exit;
		if(!$this->has_privilege()) {
			$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
		}

		$proj_id = $this->input->post('proj_id');

		if(!$this->utility->chk_id($proj_id)) {
			$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
		}

		$max_size = 12; // filesize MB
		if($_FILES['file']['size'] > $max_size * 1024 * 1024) {
			$this->json->output(array('success' => false, 'm' => '上传文件大小不能超过'.$max_size.'MB'));
		}

		if(!empty($_FILES)) {
			$s = new SaeStorage(SAE_ACCESSKEY, SAE_SECRETKEY);
			$url = $s->upload('upload', $_FILES['file']['name'], $_FILES['file']['tmp_name']);
			if(!$url) {
				$this->json->output(array('success' => false, 'm' => $s->errmsg()));
			}

			// insert into upload table
			$id = $this->Proj_model->create_upload($proj_id, $_FILES['file']['name'], $_FILES['file']['size']);
			
			// extjs json decode bug, using echo instead of output
			// $this->json->output(array('success' => true, 'url' => $url));
			echo '{"success":true, "url":"'.$url.'"}';exit;
		}
	}

	function get_list() {
		$proj_id = $this->input->get('proj_id');

		if(!$this->utility->chk_id($proj_id)) {
			$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
		}

		$storage_url = site_url('upload/get?file=');
		$data = $this->Proj_model->get_upload_list($proj_id);
		foreach($data as $key => $item) {
			$data[$key]->filename = $storage_url.$item->filename;
		}

		$this->json->output(array('success' => true, 'data' => $data));
	}

	function get() {
		$file = $this->input->get('file');

		if(!empty($file)) {
			$s = new SaeStorage(SAE_ACCESSKEY, SAE_SECRETKEY);
			$content = $s->read('upload', $file);

			header('Content-type: application/octet-stream');
			header("Content-Disposition: attachment; filename=".$file);
			exit($content);
		}
	}

	function delete() {
		if(!$this->has_privilege()) {
			$this->json->output(array('success' => false, 'm' => '您没有使用该功能的权限'));
		}

		$file = $this->input->get('file');

		if(!empty($file)) {
			$s = new SaeStorage(SAE_ACCESSKEY, SAE_SECRETKEY);
			if($s->delete('upload', $file)) {
				// remove from upload table
				$this->Proj_model->delete_upload($file);
				$this->json->output(array('success' => true));
			}
		}
	}

	private function has_privilege() {
		if(!$this->utility->is_admin() && !$this->utility->is_pm()) {
			return false;
		}
		return true;
	}
}