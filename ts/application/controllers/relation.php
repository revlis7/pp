<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Relation extends Auth_Controller {
	function __construct() {
		parent::__construct(false);
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
		echo '<pre>';
		print_r($data);
		echo '</pre>';exit;
		$this->json->output(array('success' => true, 'data' => $data));
	}
}

