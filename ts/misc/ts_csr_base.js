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
		url: '/ts/index.php/csr_corp/view',
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
		url: '/ts/index.php/csr_channel/view',
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
		url: '/ts/index.php/csr_person/view',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});
