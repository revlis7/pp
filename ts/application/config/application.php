<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$config['login_expire'] = 7200;

$config['group_cfg'] = array(
	'administrator'   => array('administrator', 'CEO', '机构业务部总经理', 'CTO','产品与投行部总经理','COO'),
	'administrator_b' => array('财富中心股东'),
	'proj_director'   => array('机构业务部区域总经理'),
	'proj_director_d' => array('机构业务部大客户经理'),
	'proj_director_c' => array('机构业务部区域经理','机构业务部区域总监'),
	'proj_director_b' => array('产品与投行部副总经理'),
	'product_manager' => array('产品经理','高级产品经理'),
	'staff'           => array('财富中心总经理'),
	'part_time_job'   => array('外部兼职人员','业务人员','独立理财顾问','财富中心副总经理','财富中心合伙人','独立合伙人'),
	'other'           => array('其他人员','财富中心总经理助理','理财师','高级理财师','试用期理财师','试用期高级理财师','试用期财富中心总经理助理','试用期财富中心副总经理','试用期财富中心总经理',
                               '人力专员','财务经理','财务专员','综合助理','大区助理' ),
    'outer'           => array('外部理财师', 'VIP客户'),
    'outer2'          => array('外部机构'),
);

// fields *cannot* be accessed
$config['access_fields_cfg'] = array(
	'administrator' => array(),
	'administrator_b' => array(
        'manage_button',
        'new_button',
		'main_channel',
		'channel_company',
		'channel_contact',
		'billing_company',
    ),
	'proj_director' => array(),
	'proj_director_b' => array(),
	'proj_director_c' => array(
    	'new_button'
    ),
	'proj_director_d' => array(),
	'product_manager' => array(),
	'staff' => array(
		'commission_b_tax',
		'commission_a_tax',
		'manage_button',
        'new_button',
		'main_channel',
		'channel_company',
		'channel_contact',
		'billing_company',
		'manager_remark',
	),
	'part_time_job' => array(
		'manage_button',
        'new_button',
		'commission_b_tax',
		'commission_a_tax',
		'inner_commission',
		'outer_commission',
		'main_channel',
		'channel_company',
		'channel_contact',
		'billing_company',
		'manager_remark',
	),
	'other' => array(
		'manage_button',
        'new_button',
		'commission_b_tax',
		'commission_a_tax',
		'inner_commission',
        'commission_partner',
		'found',
		'main_channel',
		'channel_company',
		'channel_contact',
		'billing_company',
		'manager_remark'
	),
	'outer' => array(
		'manage_button',
        'new_button',
		'manager',
		'proj_director',
		'commission_b_tax',
		'commission_a_tax',
		'inner_commission',
		'outer_commission',
        'commission_partner',
		'found',
		'main_channel',
		'channel_company',
		'channel_contact',
		'billing_company',
		'manager_remark'
	),
	'outer2' => array(
		'manage_button',
        'new_button',
		'manager',
		'proj_director',
		'commission_b_tax',
		'commission_a_tax',
		'inner_commission',
		'outer_commission',
		'found',
		'main_channel',
		'channel_company',
		'channel_contact',
		'billing_company',
		'manager_remark'
	),
);

$config['group_cfg_csr'] = array(
);

$config['access_fields_cfg_csr'] = array(
	'administrator' => array(),
	'proj_director' => array(),
	'product_manager' => array(
        'csr_channel',
    ),
	'staff' => array(
        'csr_corp',
        'csr_channel',
	),
	'part_time_job' => array(
        'csr_corp',
        'csr_channel',
        'csr_person',
	),
	'other' => array(
        'csr_corp',
        'csr_channel',
        'csr_person',
	),
);

$config['menu_group_cfg'] = array(
	'admin'=>array('administrator', 'CEO', '机构业务部总经理', 'CTO','产品与投行部总经理','COO'),
    'admin2'=>array('财富中心股东'),
	'operation'=>array('财务经理','综合助理','财务专员','人力专员'),
    'pdt'=>array('产品与投行部副总经理'),//可以看到对应的产品各项费用
    'pdt_lower'=>array('产品经理','高级产品经理'),//可以看到对应的产品各项费用
    //'tech'=>array(),
    'channel'=>array('渠道总监','渠道经理','机构业务部区域总经理','机构业务部区域总监','机构业务部区域经理'),
    'channel_2'=>array('机构业务部大客户经理'),
    'csr'=>array('财富中心总经理','财富中心副总经理','财富中心总经理助理'),
    'csr_lower'=>array('理财师','高级理财师','合伙人','独立合伙人','试用期高级理财师','试用期财富中心总经理助理','试用期财富中心副总经理','试用期财富中心总经理'),
    'csr_start'=>array('试用期理财师'),//只能看到推荐项目，
    'outer'=>array('外部理财师','独立理财顾问'),//此类用户作废
    'vip'=>array('VIP客户'),//此类用户作废
    'outer2'=>array('外部机构'),
);

$config['menu_items_cfg'] = array(
    'admin'=>array(),
    'admin2'=>array('csr_corp','csr_cproj','cproj'),
    'operation'=>array('csr_channel','csr_corp','csr_fm_corp','cproj','csr_financing','csr_provider','upper_reaches'),
    'pdt'=>array('csr_channel','csr_corp'),
    'pdt_lower'=>array('csr_channel','csr_corp','csr_fm_corp','csr_provider'),
    //'tech'=>array(/*'csr_channel','csr_corp','csr_cproj','cproj','upper_reaches'*/),
    'channel'=>array('csr_fm_corp','csr_provider','cproj','upper_reaches','csr_financing','csr_provider'),
    'channel_2'=>array('csr_provider','cproj','upper_reaches','csr_financing','csr_provider'),
    'csr'=>array('csr_channel','csr_corp','csr_fm_corp','csr_provider','cproj','upper_reaches','csr_financing','csr_provider'),
    'csr_lower'=>array('csr_channel','csr_corp','csr_provider','csr_fm_corp','cproj','upper_reaches','csr_fm_corp','csr_financing','csr_provider'),
    'csr_start'=>array('proj','float_proj','csr_channel','csr_corp','csr_fm_corp','cproj','upper_reaches','csr_provider','csr_fm_corp','csr_financing','csr_provider'),//只能看到推荐项目，
    'outer'=>array('board','library','csr_remind','csr_person','csr_channel','csr_corp','csr_follows','rank','csr_provider','csr_fm_corp','cproj','upper_reaches','csr_fm_corp','csr_financing','csr_provider'),
    'vip'=>array('board','library','proj','float_proj','csr_remind','csr_person','csr_channel','csr_corp','csr_follows','deal','rank','csr_provider','csr_fm_corp','cproj','upper_reaches','csr_fm_corp','csr_financing','csr_provider'),
    'outer2'=>array('board','library','csr_remind','csr_person','csr_channel','csr_corp','csr_follows','deal','rank','csr_provider','csr_fm_corp','cproj','upper_reaches','csr_fm_corp','csr_financing','csr_provider'),
);

$config['board_group_cfg'] = array(
    'admin' => array('administrator', 'CTO','CEO','COO','产品与投行部总经理','机构业务部总经理'),
    'manage' => array('产品经理','高级产品经理','综合助理','机构业务部区域总经理','财务经理','财务专员','人力专员','机构业务部区域总监','机构业务部区域经理','机构业务部大客户经理'),
    'view' => array('财富中心股东','试用期理财师','外部理财师','高级理财师','理财师','合伙人','独立合伙人','财富中心总经理','财富中心副总经理','财富中心总经理助理','渠道总监','渠道经理','产品与投行部副总经理'),
);

$config['board_items_cfg'] = array(
    'admin'=>array(),
    'manage'=>array('admin_button'),
    'view'=>array('manage_button','admin_button'),
);

$config['library_group_cfg'] = array(
    'admin' => array('administrator', 'CTO','CEO','COO','机构业务部总经理','产品与投行部总经理'),
    'manage' => array('产品经理','高级产品经理','综合助理','机构业务部区域总经理','财务经理','财务专员','人力专员','机构业务部区域总监','机构业务部区域经理','机构业务部大客户经理'),
    'view' => array('财富中心股东','试用期理财师','外部理财师','高级理财师','理财师','合伙人','独立合伙人','财富中心总经理','财富中心副总经理','财富中心总经理助理','渠道总监','渠道经理','产品与投行部副总经理'),
);

$config['library_items_cfg'] = array(
    'admin'=>array(),
    'manage'=>array(),
    'view'=>array('manage_button'),
);

$config['order_group_cfg'] = array(
    'admin' => array('administrator', 'CTO','CEO','COO'),
    'finance' => array('财务经理','财务专员'),
    'pdt' => array('产品与投行部总经理','产品与投行部副总经理','产品经理','高级产品经理','机构业务部大客户经理'),
    'channel' => array('机构业务部总经理','机构业务部总经理','机构业务部区域总经理','机构业务部区域总监','机构业务部区域经理'),
    'other' => array('综合助理','人力专员','财富中心股东','试用期理财师','外部理财师','高级理财师','理财师','合伙人','独立合伙人',
                     '财富中心总经理','财富中心副总经理','财富中心总经理助理','渠道总监','渠道经理'),
    );

$config['order_items_cfg'] = array(
    'admin' => array('comm_in','accept_order','invest_in','abort','confirm_order','manage_button','channel_choose'),
    'finance' => array('comm_in','manage_button'),
    'pdt' => array('comm_in','accept_order','invest_in','abort','manage_button','confirm_order'),
    'channel' => array('comm_in','accept_order','invest_in','abort','channel_choose'),
    'other' => array(),
    );
