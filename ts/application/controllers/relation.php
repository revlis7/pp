<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Relation extends Auth_Controller {
	function __construct() {
		parent::__construct();
	}

	function company() {
		$data = $this->Proj_model->get_all_company();
		$this->json->output(array('success' => true, 'data' => $data));
	}

	function proj() {
		$data = $this->Proj_model->get_all_cproj();
		$n = count($data);
		for($i = 0; $i < $n; $i++) {
			$rel = $this->Proj_model->get_cproj_company_relation($data[$i]->id);
			$data[$i]->relation = $rel;
		}
		$this->json->output(array('success' => true, 'data' => $data));
	}

	function detail() {
		$relation_id = $this->input->get('relation_id');

		if(!$this->utility->chk_id($relation_id)) {
			$this->json->output(array('success' => false, 'm' => '输入的记录编号错误'));
		}
		
		$data = $this->Proj_model->get_relation_detail($relation_id);
		$this->json->output(array('success' => true, 'data' => $data));
	}
}