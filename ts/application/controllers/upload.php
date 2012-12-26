<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Upload extends Auth_Controller {
	function __construct() {
		parent::__construct(false);
	}

	function submit() {
		if(!empty($_FILES)) {
			$s = new SaeStorage();
			$url = $s->upload('upload', $_FILES['photo']['name'], $_FILES['photo']['tmp_name']);
			if(!$url) {
				$this->json->output(array('success' => false, 'm' => $s->errmsg()));
			}
			$this->json->output(array('success' => true, 'url' => $url));
		}
	}
}