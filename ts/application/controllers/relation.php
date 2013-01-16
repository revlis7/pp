<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Relation extends Auth_Controller {
    function __construct() {
        parent::__construct(false);
    }

    function company() {
        $data = $this->Proj_model->get_all_company();
        $this->json->output(array('success' => true, 'data' => $data));
    }
}

