Ext.Loader.setConfig({enabled: true,disableCaching:false});
Ext.Loader.setPath('Ext.ux', '/ts/misc/ux');

Ext.require([
 'Ext.grid.*',
 'Ext.data.*',
 'Ext.util.*',
 'Ext.state.*',
 'Ext.ux.grid.FiltersFeature',
]);

var chCorpCatList=Ext.create('Ext.data.ArrayStore', {
	fields: ['id', 'text'],
	data: [
		['一般理财客户','一般理财客户'],
		['一般产品客户','一般产品客户'],
		['一般双向客户','一般双向客户'],
		['VIP客户','VIP客户']
	]
});
var chChannelCatList=Ext.create('Ext.data.ArrayStore', {
	fields: ['id', 'text'],
	data: [
		['目标客户','目标客户'],
		['潜在客户','潜在客户'],
		['意向客户','意向客户'],
		['成交客户','成交客户']
	]
});
var chPersonCatList=Ext.create('Ext.data.ArrayStore', {
	fields: ['id', 'text'],
	data: [
		['目标客户','目标客户'],
		['潜在客户','潜在客户'],
		['意向客户','意向客户'],
		['成交客户','成交客户']
	]
});
var chCorpBizStyleList=Ext.create('Ext.data.ArrayStore', {
	fields: ['id', 'text'],
	data: [
		['包销为主','包销为主'],
		['分销为主','分销为主']
	]
});
var chCorpInvStyleList=Ext.create('Ext.data.ArrayStore', {
	fields: ['id', 'text'],
	data: [
		['贴牌','贴牌'],
		['有限合伙','有限合伙'],
		['其他','其他'],
	]
});

var chCorpInvChtypeList=Ext.create('Ext.data.ArrayStore', {
	fields: ['id', 'text'],
	data: [
		['直销为主','直销为主'],
		['渠道为主','渠道为主'],
		['直销渠道并重','直销渠道并重'],
	]
});
var chChannelCsrTypeList=Ext.create('Ext.data.ArrayStore', {
	fields: ['id', 'text'],
	data: [
		['渠道为主','渠道为主'],
		['直客为主','直客为主'],
		['渠道直客并重','渠道直客并重'],
	]
});
var chChannelCsrStyleList=Ext.create('Ext.data.ArrayStore', {
	fields: ['id', 'text'],
	data: [
		['极为保守','极为保守'],
		['相对保守','相对保守'],
		['相对灵活','相对灵活'],
		['极为灵活','极为灵活'],
	]
});

var csrCorpStore = Ext.create('Ext.data.JsonStore', {
	fields: [
	{name:'csr_corp_id',type:'int'   },
	{name:'csr_corp_cat'             },
	{name:'csr_corp_cat_reason'      },
	{name:'csr_corp_name'            },
	{name:'csr_corp_bname'           },
	{name:'csr_corp_addr_reg'        },
	{name:'csr_corp_addr_main'       },
	{name:'csr_corp_regcpt'          },
	{name:'csr_corp_biz'             },
	{name:'csr_corp_web'             },
	{name:'csr_corp_plusinfo'        },
	{name:'csr_corp_director'        },
	{name:'csr_corp_legalperson'     },
	{name:'csr_corp_CEO'             },
	{name:'csr_corp_manager'         },
	{name:'csr_corp_contact1_name'   },
	{name:'csr_corp_contact1_title'  },
	{name:'csr_corp_contact1_phone'  },
	{name:'csr_corp_contact1_email'  },
	{name:'csr_corp_contact1_CV'     },
	{name:'csr_corp_contact2_name'   },
	{name:'csr_corp_contact2_title'  },
	{name:'csr_corp_contact2_phone'  },
	{name:'csr_corp_contact2_email'  },
	{name:'csr_corp_contact2_CV'     },
	{name:'csr_corp_contact3_name'   },
	{name:'csr_corp_contact3_title'  },
	{name:'csr_corp_contact3_phone'  },
	{name:'csr_corp_contact3_email'  },
	{name:'csr_corp_contact3_CV'     },
	{name:'csr_corp_yearly_amount'   },
	{name:'csr_corp_FP_no'           },
	{name:'csr_corp_branch_no'       },
	{name:'csr_corp_biz_style'       },
	{name:'csr_corp_biz_dir_percent' },
	{name:'csr_corp_biz_type'        },
	{name:'csr_corp_biz_partner'     },
	{name:'csr_corp_biz_plusinfo'    },
	{name:'csr_corp_yearly_issue'    },
	{name:'csr_corp_IP_no'           },
	{name:'csr_corp_inv_style'       },
	{name:'csr_corp_inv_chtype'      },
	{name:'csr_corp_inv_case'        },
	{name:'csr_corp_inv_plusinfo'    },
	{name:'csr_corp_coop_partner'    },
	{name:'csr_corp_coop_FSC_dir'    },
	{name:'csr_corp_coop_FSC_wish'   },
	{name:'csr_corp_follow'          },
	{name:'csr_corp_FSC_channel'     },
	{name:'csr_corp_FSC_pdt'         },
	],
	proxy: {
		type: 'ajax',
		url: '/ts/index.php/??????????????????????????????????',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});
var csrChannelStore = Ext.create('Ext.data.JsonStore', {
	fields: [
	{name:'csr_channel_id',type:'int'   },
	{name:'csr_channel_cat'},
	{name:'csr_channel_cat_reason'},
	{name:'csr_channel_name'},
	{name:'csr_channel_gender'},
	{name:'csr_channel_age'},
	{name:'csr_channel_hometown'},
	{name:'csr_channel_telephone'},
	{name:'csr_channel_mobile'},
	{name:'csr_channel_qq'},
	{name:'csr_channel_wechat'},
	{name:'csr_channel_email'},
	{name:'csr_channel_interests'},
	{name:'csr_channel_proper_comm'},
	{name:'csr_channel_person_plusinfo'},
	{name:'csr_channel_corp_industry'},
	{name:'csr_channel_corp_name'},
	{name:'csr_channel_corp_depart'},
	{name:'csr_channel_corp_title'},
	{name:'csr_channel_past_work'},
	{name:'csr_channel_edu'},
	{name:'csr_channel_prof_plusinfo'},
	{name:'csr_channel_csr_type'},
	{name:'csr_channel_csr_style'},
	{name:'csr_channel_pdt_channel'},
	{name:'csr_channel_coop_FSC_dir'},
	{name:'csr_channel_coop_FSC_wish'},
	{name:'csr_channel_follow'},
	],
	proxy: {
		type: 'ajax',
		url: '/ts/index.php/??????????????????????????????????',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});
var csrPersonStore = Ext.create('Ext.data.JsonStore', {
	fields: [
	{name:'csr_person_id'},
	{name:'csr_person_cat'},
	{name:'csr_person_cat_reason'},
	{name:'csr_person_name'},
	{name:'csr_person_gender'},
	{name:'csr_person_age'},
	{name:'csr_person_hometown'},
	{name:'csr_person_telephone'},
	{name:'csr_person_mobile'},
	{name:'csr_person_qq'},
	{name:'csr_person_wechat'},
	{name:'csr_person_email'},
	{name:'csr_person_interests'},
	{name:'csr_person_proper_comm'},
	{name:'csr_person_plusinfo'},
	{name:'csr_person_corp_industry'},
	{name:'csr_person_corp_name'},
	{name:'csr_person_corp_'},
	{name:'csr_person_corp_title'},
	{name:'csr_person_past_work'},
	{name:'csr_person_edu'},
	{name:'csr_person_prof_plusinfo'},
	{name:'csr_person_marriage'},
	{name:'csr_person_child'},
	{name:'csr_person_child_no'},
	{name:'csr_person_child1_age'},
	{name:'csr_person_child2_age'},
	{name:'csr_person_family_plusinfo'},
	{name:'csr_person_income_p'},
	{name:'csr_person_assets_p'},
	{name:'csr_person_income_h'},
	{name:'csr_person_assets_h'},
	{name:'csr_person_financial_dicision'},
	{name:'csr_person_financial_plusinfo'},
	{name:'csr_person_assets_estate'},
	{name:'csr_person_assets_trusts'},
	{name:'csr_person_assets_fixed'},
	{name:'csr_person_assets_stock'},
	{name:'csr_person_assets_PE'},
	{name:'csr_person_assets_float'},
	{name:'csr_person_assets_other'},
	{name:'csr_person_assets_oversea'},
	{name:'csr_person_assets_plusinfo'},
	{name:'csr_person_financial_pref'},
	{name:'csr_person_financial_demand'},
	{name:'csr_person_financial_channel'},
	{name:'csr_person_offer_pdt'},
	{name:'csr_person_offer_mode'},
	],
	proxy: {
		type: 'ajax',
		url: '/ts/index.php/??????????????????????????????????',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});
var corp_list = Ext.create('searchPanel', {
	store: csrCorpStore,
	border:0,
	columnLines: true,
	title: '公司客户',
	margin:10,
	columns: [
		{dataIndex:'csr_corp_cat'             ,text:'客户类别'},
		{dataIndex:'csr_corp_cat_reason'      ,text:'客户类别评判理由'},
		{dataIndex:'csr_corp_name'            ,text:'公司名称'},
		{dataIndex:'csr_corp_bname'           ,text:'公司简称'},
		{dataIndex:'csr_corp_addr_reg'        ,text:'公司注册地址'},
		{dataIndex:'csr_corp_addr_main'       ,text:'公司主要办公地址'},
		{dataIndex:'csr_corp_regcpt'          ,text:'公司注册资本'},
		{dataIndex:'csr_corp_biz'             ,text:'公司主营业务'},
		{dataIndex:'csr_corp_web'             ,text:'公司网址'},
		{dataIndex:'csr_corp_plusinfo'        ,text:'公司其他主要信息'},
		{dataIndex:'csr_corp_director'        ,text:'公司主要股东及其主要履历'},
		{dataIndex:'csr_corp_legalperson'     ,text:'公司法人及主要履历'},
		{dataIndex:'csr_corp_CEO'             ,text:'公司总经理及主要履历'},
		{dataIndex:'csr_corp_manager'         ,text:'公司主要高管及主要履历'},
		{dataIndex:'csr_corp_contact1_name'   ,text:'联系人1姓名'},
		{dataIndex:'csr_corp_contact1_title'  ,text:'联系人1职位'},
		{dataIndex:'csr_corp_contact1_phone'  ,text:'联系人1电话'},
		{dataIndex:'csr_corp_contact1_email'  ,text:'联系人1邮箱'},
		{dataIndex:'csr_corp_contact1_CV'     ,text:'联系人1主要履历'},
		{dataIndex:'csr_corp_contact2_name'   ,text:'联系人2姓名'},
		{dataIndex:'csr_corp_contact2_title'  ,text:'联系人2职位'},
		{dataIndex:'csr_corp_contact2_phone'  ,text:'联系人2电话'},
		{dataIndex:'csr_corp_contact2_email'  ,text:'联系人2邮箱'},
		{dataIndex:'csr_corp_contact2_CV'     ,text:'联系人2主要履历'},
		{dataIndex:'csr_corp_contact3_name'   ,text:'联系人3姓名'},
		{dataIndex:'csr_corp_contact3_title'  ,text:'联系人3职位'},
		{dataIndex:'csr_corp_contact3_phone'  ,text:'联系人3电话'},
		{dataIndex:'csr_corp_contact3_email'  ,text:'联系人3邮箱'},
		{dataIndex:'csr_corp_contact3_CV'     ,text:'联系人3主要履历'},
		{dataIndex:'csr_corp_yearly_amount'   ,text:'公司最近年度募资额'},
		{dataIndex:'csr_corp_FP_no'           ,text:'公司理财师人数'},
		{dataIndex:'csr_corp_branch_no'       ,text:'公司分公司个数'},
		{dataIndex:'csr_corp_biz_style'       ,text:'公司销售风格'},
		{dataIndex:'csr_corp_biz_dir_percent' ,text:'公司直销占销售额比例'},
		{dataIndex:'csr_corp_biz_type'        ,text:'公司主销产品类别'},
		{dataIndex:'csr_corp_biz_partner'     ,text:'公司主要金融机构合作伙伴'},
		{dataIndex:'csr_corp_biz_plusinfo'    ,text:'公司理财业务其他情况'},
		{dataIndex:'csr_corp_yearly_issue'    ,text:'公司最近年度发行额'},
		{dataIndex:'csr_corp_IP_no'           ,text:'公司投行团队人数'},
		{dataIndex:'csr_corp_inv_style'       ,text:'公司投行发行风格'},
		{dataIndex:'csr_corp_inv_chtype'      ,text:'公司投行发行渠道'},
		{dataIndex:'csr_corp_inv_case'        ,text:'公司投行业务的成功案例'},
		{dataIndex:'csr_corp_inv_plusinfo'    ,text:'公司投行业务的其他情况'},
		{dataIndex:'csr_corp_coop_partner'    ,text:'目前主要合作的竞争方'},
		{dataIndex:'csr_corp_coop_FSC_dir'    ,text:'与我司合作方向'},
		{dataIndex:'csr_corp_coop_FSC_wish'   ,text:'与我司合作意愿'},
		{dataIndex:'csr_corp_follow'          ,text:'后续跟进策略'},
		{dataIndex:'csr_corp_FSC_channel'     ,text:'我司渠道部负责人'},
		{dataIndex:'csr_corp_FSC_pdt'         ,text:'我司产品部负责人'}
	],
	viewConfig: {
		stripeRows: true,
		forceFit:true,
		sortAscText:'正序',
		sortDescText:'降序'
	},
	loadMask: true,
	emptyText: '没有匹配的记录'
});
var channel_list = Ext.create('searchPanel', {
	store: csrChannelStore,
	border:0,
	columnLines: true,
	title: '渠道客户',
	margin:10,
	columns: [
		{dataIndex:'csr_channel_cat',text:'客户类别'},
		{dataIndex:'csr_channel_cat_reason',text:'客户类别评判理由：'},
		{dataIndex:'csr_channel_name',text:'姓名'},
		{dataIndex:'csr_channel_gender',text:'性别'},
		{dataIndex:'csr_channel_age',text:'年龄'},
		{dataIndex:'csr_channel_hometown',text:'籍贯'},
		{dataIndex:'csr_channel_telephone',text:'固定电话'},
		{dataIndex:'csr_channel_mobile',text:'手机'},
		{dataIndex:'csr_channel_qq',text:'qq'},
		{dataIndex:'csr_channel_wechat',text:'微信'},
		{dataIndex:'csr_channel_email',text:'邮箱'},
		{dataIndex:'csr_channel_interests',text:'兴趣爱好'},
		{dataIndex:'csr_channel_proper_comm',text:'比较接受的沟通方式'},
		{dataIndex:'csr_channel_person_plusinfo',text:'个人其他需要说明的状况'},
		{dataIndex:'csr_channel_corp_industry',text:'服务行业'},
		{dataIndex:'csr_channel_corp_name',text:'公司名称'},
		{dataIndex:'csr_channel_corp_depart',text:'部门'},
		{dataIndex:'csr_channel_corp_title',text:'职位'},
		{dataIndex:'csr_channel_past_work',text:'过往主要任职经历'},
		{dataIndex:'csr_channel_edu',text:'过往主要教育经历'},
		{dataIndex:'csr_channel_prof_plusinfo',text:'职业其他需要说明的状况'},
		{dataIndex:'csr_channel_csr_type',text:'服务客户类别：渠道为主、直客为主、渠道直客并重'},
		{dataIndex:'csr_channel_csr_style',text:'服务客户偏好：极为保守、相对保守、灵活、极为灵活'},
		{dataIndex:'csr_channel_pdt_channel',text:'目前接触理财产品渠道'},
		{dataIndex:'csr_channel_coop_FSC_dir',text:'与我司合作方向'},
		{dataIndex:'csr_channel_coop_FSC_wish',text:'与我司合作意愿'},
		{dataIndex:'csr_channel_follow',text:'后续跟进策略'}
	],
	viewConfig: {
		stripeRows: true,
		forceFit:true,
		sortAscText:'正序',
		sortDescText:'降序'
	},
	loadMask: true,
	emptyText: '没有匹配的记录'
});
var person_list = Ext.create('searchPanel', {
	store: csrPersonStore,
	border:0,
	columnLines: true,
	title: '个人客户',
	margin:10,
	columns: [
		{dataIndex:'csr_person_cat',text:'客户类别'},
		{dataIndex:'csr_person_cat_reason',text:'客户类别评判理由'},
		{dataIndex:'csr_person_name',text:'姓名'},
		{dataIndex:'csr_person_gender',text:'性别'},
		{dataIndex:'csr_person_age',text:'年龄'},
		{dataIndex:'csr_person_hometown',text:'籍贯'},
		{dataIndex:'csr_person_telephone',text:'固定电话'},
		{dataIndex:'csr_person_mobile',text:'手机'},
		{dataIndex:'csr_person_qq',text:'qq'},
		{dataIndex:'csr_person_wechat',text:'微信'},
		{dataIndex:'csr_person_email',text:'邮箱'},
		{dataIndex:'csr_person_interests',text:'兴趣爱好'},
		{dataIndex:'csr_person_proper_comm',text:'比较接受的沟通方式'},
		{dataIndex:'csr_person_plusinfo',text:'个人其他需要说明的状况'},
		{dataIndex:'csr_person_corp_industry',text:'服务行业'},
		{dataIndex:'csr_person_corp_name',text:'公司名称'},
		{dataIndex:'csr_person_corp_property',text:'公司性质'},
		{dataIndex:'csr_person_corp_title',text:'职位'},
		{dataIndex:'csr_person_past_work',text:'过往主要任职经历'},
		{dataIndex:'csr_person_edu',text:'过往主要教育经历'},
		{dataIndex:'csr_person_prof_plusinfo',text:'职业其他需要说明的状况'},
		{dataIndex:'csr_person_marriage',text:'婚姻状况'},
		{dataIndex:'csr_person_child',text:'生育状况'},
		{dataIndex:'csr_person_child_no',text:'子女个数'},
		{dataIndex:'csr_person_child1_age',text:'子女1年龄'},
		{dataIndex:'csr_person_child2_age',text:'子女2年龄'},
		{dataIndex:'csr_person_family_plusinfo',text:'家庭其他需要说明的状况'},
		{dataIndex:'csr_person_income_p',text:'个人年收入'},
		{dataIndex:'csr_person_assets_p',text:'个人总资产'},
		{dataIndex:'csr_person_income_h',text:'家庭年收入'},
		{dataIndex:'csr_person_assets_h',text:'家庭总资产'},
		{dataIndex:'csr_person_financial_dicision',text:'家庭理财决策模式'},
		{dataIndex:'csr_person_financial_plusinfo',text:'资产其他需要说明的状况'},
		{dataIndex:'csr_person_assets_estate',text:'目前房产配置状况'},
		{dataIndex:'csr_person_assets_trusts',text:'目前信托类资产配置状况'},
		{dataIndex:'csr_person_assets_fixed',text:'目前其他固定收益类资产配置状况'},
		{dataIndex:'csr_person_assets_stock',text:'目前股票类投资配置状况'},
		{dataIndex:'csr_person_assets_PE',text:'目前股权投资类资产配置状况'},
		{dataIndex:'csr_person_assets_float',text:'目前其他浮动收益类资产配置状况'},
		{dataIndex:'csr_person_assets_other',text:'目前另类资产配置状况'},
		{dataIndex:'csr_person_assets_oversea',text:'目前海外资产配置状况'},
		{dataIndex:'csr_person_assets_plusinfo',text:'目前资产配置其他需要说明的状况'},
		{dataIndex:'csr_person_financial_pref',text:'客户理财偏好'},
		{dataIndex:'csr_person_financial_demand',text:'客户理财需求'},
		{dataIndex:'csr_person_financial_channel',text:'目前的理财渠道'},
		{dataIndex:'csr_person_offer_pdt',text:'可能提供服务的产品'},
		{dataIndex:'csr_person_offer_mode',text:'可能提供服务的模式'}
	],
	viewConfig: {
		stripeRows: true,
		forceFit:true,
		sortAscText:'正序',
		sortDescText:'降序'
	},
	loadMask: true,
	emptyText: '没有匹配的记录'
});

var customerPanel=Ext.create('Ext.tab.Panel', {
	region:'center',
    items: [corp_list,channel_list,person_list]
});  
