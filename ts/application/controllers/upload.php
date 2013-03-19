<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Upload extends Auth_Controller {
	function __construct() {
		parent::__construct();
	}

	function submit() {
		$proj_id = $this->input->post('proj_id');

		if(!$this->utility->chk_id($proj_id)) {
			$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
		}

		if(!empty($_FILES)) {
			$s = new SaeStorage();
			$url = $s->upload('upload', $_FILES['file']['name'], $_FILES['file']['tmp_name']);
			if(!$url) {
				$this->json->output(array('success' => false, 'm' => $s->errmsg()));
			}

			// insert into upload table
			$id = $this->Proj_model->create_upload($proj_id, $_FILES['file']['name']);
			$this->json->output(array('success' => true, 'url' => $url));
		}
	}

	function get_list () {
		$proj_id = $this->input->get('proj_id');

		if(!$this->utility->chk_id($proj_id)) {
			$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
		}

        $storage_url = 'http://rainbowbridge-upload.stor.sinaapp.com/';
		$data = $this->Proj_model->get_upload_list($proj_id);
        foreach($data as $key => $item) {
            $data[$key]->filename = $storage_url.$item->filename;
        }

		$this->json->output(array('success' => true, 'data' => $data));
	}
}