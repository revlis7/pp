<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$config['login_expire'] = 1800;

$config['group_cfg'] = array(
	'administrator'   => array('administrator', 'CEO', '产品与研究部总监', '产品与研究部副总监', 'CTO'),
	'product_manager' => array('产品经理'),
	'staff'           => array('各地财富中心合伙人', '独立理财顾问'),
	'part_time_job'   => array('外部兼职人员'),
);