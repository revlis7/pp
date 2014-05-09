Ext.Loader.setConfig({
	enabled: true,
	disableCaching: false
});
Ext.Loader.setPath('Ext.ux', '/ts/misc/ux');
Ext.require(['Ext.ux.RowExpander']);
Ext.require(['Ext.ux.form.SearchField']);

Ext.onReady(function() {

	var storeBaseUrl = '/ts/index.php/csr_financing/view';
	var prdmode = 0;
	var prdrecentMode = 'null';
	var prdendMode = 0;
	var prdFSCChannel = 'null';
	var prdPStart = '';
	var prdPEnd = '';
	var prdlastFollow = '';
	var fncmode = 0;
	var fncrecentMode = 'null';
	var fncendMode = 0;
	var fncFSCChannel = 'null';
	var fncPStart = '';
	var fncPEnd = '';
	var fnclastFollow = '';
    
	var mode = 0;
	var recentMode = 'null';
	var endMode = 0;
	var FSCChannel = 'null';
	var PStart = '';
	var PEnd = '';
	var lastFollow = '';
	var endMode = 0;

var chManagerList=Ext.create('Ext.data.ArrayStore', {
	fields: ['id', 'text'],
	data: [
	  ['王璐','王璐'],
	  ['李汶洁','李汶洁']
	]
});
var chDirectorList=Ext.create('Ext.data.ArrayStore', {
	fields: ['id', 'text'],
	data: [
	  ['申玉玺','申玉玺'],
	  ['王栋生','王栋生']
	]
});
	var csrFinancingListStore = Ext.create('Ext.data.JsonStore', {
		fields: [{
			name: 'csr_financing_id',
			type: 'int'
		},
		{
			name: 'csr_financing_cat'
		},
		{
			name: 'csr_financing_cat_reason'
		},
		{
			name: 'csr_financing_name'
		},
		{
			name: 'csr_financing_bname'
		},
		{
			name: 'csr_financing_industry'
		},
		{
			name: 'csr_financing_addr_reg'
		},
		{
			name: 'csr_financing_addr_main'
		},
		{
			name: 'csr_financing_regcpt'
		},
		{
			name: 'csr_financing_biz'
		},
		{
			name: 'csr_financing_web'
		},
		{
			name: 'csr_financing_plusinfo'
		},
		{
			name: 'csr_financing_director'
		},
		{
			name: 'csr_financing_legalperson'
		},
		{
			name: 'csr_financing_CEO'
		},
		{
			name: 'csr_financing_manager'
		},
		{
			name: 'csr_financing_contact1_name'
		},
		{
			name: 'csr_financing_contact1_title'
		},
		{
			name: 'csr_financing_contact1_phone'
		},
		{
			name: 'csr_financing_contact1_email'
		},
		{
			name: 'csr_financing_contact1_CV'
		},
		{
			name: 'csr_financing_contact2_name'
		},
		{
			name: 'csr_financing_contact2_title'
		},
		{
			name: 'csr_financing_contact2_phone'
		},
		{
			name: 'csr_financing_contact2_email'
		},
		{
			name: 'csr_financing_contact2_CV'
		},
		{
			name: 'csr_financing_contact3_name'
		},
		{
			name: 'csr_financing_contact3_title'
		},
		{
			name: 'csr_financing_contact3_phone'
		},
		{
			name: 'csr_financing_contact3_email'
		},
		{
			name: 'csr_financing_contact3_CV'
		},
		{
			name: 'csr_financing_yearly_amount'
		},
		{
			name: 'csr_financing_FP_no'
		},
		{
			name: 'csr_financing_branch_no'
		},
		{
			name: 'csr_financing_biz_style'
		},
		{
			name: 'csr_financing_biz_dir_percent'
		},
		{
			name: 'csr_financing_biz_type'
		},
		{
			name: 'csr_financing_biz_partner'
		},
		{
			name: 'csr_financing_biz_plusinfo'
		},
		{
			name: 'csr_financing_yearly_issue'
		},
		{
			name: 'csr_financing_IP_no'
		},
		{
			name: 'csr_financing_inv_style'
		},
		{
			name: 'csr_financing_inv_chtype'
		},
		{
			name: 'csr_financing_inv_case'
		},
		{
			name: 'csr_financing_inv_plusinfo'
		},
		{
			name: 'csr_financing_coop_partner'
		},
		{
			name: 'csr_financing_coop_FSC_dir'
		},
		{
			name: 'csr_financing_coop_FSC_wish'
		},
		{
			name: 'csr_financing_follow'
		},
		{
			name: 'csr_financing_FSC_channel'
		},
		{
			name: 'csr_financing_FSC_pdt'
		},
		{
			name: 'csr_financing_FSC_follow_status'
		},
		{
			name: 'csr_financing_FSC_opp_and_prob'
		},
		{
			name: 'csr_financing_FSC_solution'
		},
		{
			name: 'csr_financing_follow_creator'
		},
		{
			name: 'csr_financing_follow_update_ts',
			dateFormat: "Y-m-d H:i:s"
		},
		{
			name: 'csr_financing_creator'
		},
		{
			name: 'csr_financing_create_ts',
			dateFormat: "Y-m-d H:i:s"
		},
		{
			name: 'csr_financing_editor'
		},
		{
			name: 'csr_financing_update_ts',
			dateFormat: "Y-m-d H:i:s"
		}],
		pageSize: 100,
		remoteSort: true,
		autoLoad: true,
		leadingBufferZone: 100,
		buffered: true,
		//    sorters:[{property:'csr_financing_id',direction:'ASC'}],
		extraParams: {
			total: 50000
		},
		proxy: {
			type: 'ajax',
			url: '/ts/index.php/csr_financing/view',
			reader: {
				type: 'json',
				root: 'data',
				totalProperty: 'totalCount'

			},
			simpleSortMode: true,
			filterParam: 'query',
			encodeFilters: function(filters) {
				return filters[0].value;
			}
		},
        listeners: {
            totalcountchange: function(){
                Ext.getCmp('csrFinancingWin').down('component#status').update({count: csrProviderListStore.getTotalCount()});
			}
		}
	});

var csrProviderListStore = Ext.create('Ext.data.JsonStore', {
	fields: [
	{name:'csr_provider_id',type:'int'   },
	{name:'csr_provider_cat'             },
	{name:'csr_provider_cat_reason'      },
	{name:'csr_provider_name'            },
	{name:'csr_provider_bname'           },
	{name:'csr_provider_industry'           },
	{name:'csr_provider_addr_reg'        },
	{name:'csr_provider_addr_main'       },
	{name:'csr_provider_regcpt'          },
	{name:'csr_provider_biz'             },
	{name:'csr_provider_web'             },
	{name:'csr_provider_plusinfo'        },
	{name:'csr_provider_director'        },
	{name:'csr_provider_legalperson'     },
	{name:'csr_provider_CEO'             },
	{name:'csr_provider_manager'         },
	{name:'csr_provider_contact1_name'   },
	{name:'csr_provider_contact1_title'  },
	{name:'csr_provider_contact1_phone'  },
	{name:'csr_provider_contact1_email'  },
	{name:'csr_provider_contact1_CV'     },
	{name:'csr_provider_contact2_name'   },
	{name:'csr_provider_contact2_title'  },
	{name:'csr_provider_contact2_phone'  },
	{name:'csr_provider_contact2_email'  },
	{name:'csr_provider_contact2_CV'     },
	{name:'csr_provider_contact3_name'   },
	{name:'csr_provider_contact3_title'  },
	{name:'csr_provider_contact3_phone'  },
	{name:'csr_provider_contact3_email'  },
	{name:'csr_provider_contact3_CV'     },
	{name:'csr_provider_contact4_name'   },
	{name:'csr_provider_contact4_title'  },
	{name:'csr_provider_contact4_phone'  },
	{name:'csr_provider_contact4_email'  },
	{name:'csr_provider_contact4_CV'     },
	{name:'csr_provider_contact5_name'   },
	{name:'csr_provider_contact5_title'  },
	{name:'csr_provider_contact5_phone'  },
	{name:'csr_provider_contact5_email'  },
	{name:'csr_provider_contact5_CV'     },
	{name:'csr_provider_yearly_amount'   },
	{name:'csr_provider_FP_no'           },
	{name:'csr_provider_branch_no'       },
	{name:'csr_provider_biz_style'       },
	{name:'csr_provider_biz_dir_percent' },
	{name:'csr_provider_biz_type'        },
	{name:'csr_provider_biz_partner'     },
	{name:'csr_provider_biz_plusinfo'    },
	{name:'csr_provider_yearly_issue'    },
	{name:'csr_provider_IP_no'           },
	{name:'csr_provider_inv_style'       },
	{name:'csr_provider_inv_chtype'      },
	{name:'csr_provider_inv_case'        },
	{name:'csr_provider_inv_plusinfo'    },
	{name:'csr_provider_coop_partner'    },
	{name:'csr_provider_coop_FSC_dir'    },
	{name:'csr_provider_coop_FSC_wish'   },
	{name:'csr_provider_follow'          },
	{name:'csr_provider_FSC_channel'     },
	{name:'csr_provider_FSC_pdt'         },
    {name:'csr_provider_FSC_follow_status'},
    {name:'csr_provider_FSC_opp_and_prob'},
    {name:'csr_provider_FSC_solution'},
    {name:'csr_provider_follow_creator'},
    {name:'csr_provider_follow_update_ts',dateFormat:"Y-m-d H:i:s"	},
    {name:'csr_provider_creator'},
    {name:'csr_provider_create_ts',dateFormat:"Y-m-d H:i:s"	},
    {name:'csr_provider_editor'},
    {name:'csr_provider_update_ts',dateFormat:"Y-m-d H:i:s"	}
	],
    pageSize : 100,
    remoteSort : true ,
	autoLoad:true,
    leadingBufferZone: 100,
    buffered: true,
//    sorters:[{property:'csr_provider_id',direction:'ASC'}],
    extraParams:{total:50000},
	proxy: {
		type: 'ajax',
		url: '/ts/index.php/csr_provider/view',
		reader: {
			type: 'json',
			root: 'data',
            totalProperty: 'totalCount'
            
		},
        simpleSortMode: true,
        filterParam: 'query',
        encodeFilters: function(filters) {
                return filters[0].value;
            }
	},
        listeners: {
            totalcountchange: function(){
                Ext.getCmp('csrFinancingWin').down('component#status').update({count: csrProviderListStore.getTotalCount()});
			}
		}
});
	var projDetailStore = Ext.create('Ext.data.JsonStore', {
		fields: [{
			name: 'proj_id',
			type: 'int'
		},
		{
			name: 'proj_name'
		},
		{
			name: 'amount'
		},
		{
			name: 'month'
		},
		{
			name: 'profit_max'
		},
		{
			name: 'profit_suggest'
		},
		{
			name: 'guarantee_mode'
		},
		{
			name: 'repayment'
		},
		{
			name: 'proj_rel'
		},
		{
			name: 'proj_deadline'
		},
		{
			name: 'remark'
		},
		{
			name: 'csr_financing_name'
		},
		{
			name: 'csr_financing_id'
		},
		{
			name: 'relation_id'
		},
		{
			name: 'csr_provider_id'
		},
		{
			name: 'csr_provider_name'
		},
		{
			name: 'status'
		},
		{
			name: 'update_ts',
			dateFormat: "Y-m-d H:i:s"
		},
		{
			name: 'cproj_creator'
		},
		{
			name: 'cproj_create_ts',
			dateFormat: "Y-m-d H:i:s"
		},
		{
			name: 'cproj_editor'
		},
		{
			name: 'cproj_update_ts',
			dateFormat: "Y-m-d H:i:s"
		},
		{
			name: 'creator'
		},
		{
			name: 'create_ts',
			dateFormat: "Y-m-d H:i:s"
		},
		{
			name: 'editor'
		},
		{
			name: 'cproj_intro'
		},
		{
			name: 'cproj_director'
		},
		{
			name: 'cproj_manager'
		}],
		pageSize: 100,
		remoteSort: true,
		autoLoad: true,
		leadingBufferZone: 100,
		buffered: true,
		//    sorters:[{property:'csr_financing_id',direction:'ASC'}],
		extraParams: {
			total: 50000
		},
		proxy: {
			type: 'ajax',
			url: '/ts/index.php/relation/proj_detail',
			reader: {
				type: 'json',
				root: 'data',
				totalProperty: 'totalCount'
			},
			simpleSortMode: true,
			filterParam: 'query',
			encodeFilters: function(filters) {
				return filters[0].value;
			}
		},
		listeners: {
			totalcountchange: function() {
				fgrid.down('component#status').update({
					count: projDetailStore.getTotalCount()
				});
			}
		}
	});

	var projStore = Ext.create('Ext.data.JsonStore', {
		fields: [{
			name: 'proj_id',
			type: 'int'
		},
		{
			name: 'proj_name'
		},
		{
			name: 'amount'
		},
		{
			name: 'month'
		},
		{
			name: 'profit_max'
		},
		{
			name: 'profit_suggest'
		},
		{
			name: 'guarantee_mode'
		},
		{
			name: 'repayment'
		},
		{
			name: 'proj_rel'
		},
		{
			name: 'proj_deadline'
		},
		{
			name: 'remark'
		},
		{
			name: 'csr_financing_name'
		},
		{
			name: 'csr_financing_id'
		},
		{
			name: 'cproj_intro'
		},
		{
			name: 'cproj_director'
		},
		{
			name: 'cproj_manager'
		}],
		pageSize: 100,
		remoteSort: true,
		autoLoad: true,
		leadingBufferZone: 100,
		buffered: true,
		//    sorters:[{property:'csr_financing_id',direction:'ASC'}],
		extraParams: {
			total: 50000
		},
		proxy: {
			type: 'ajax',
			url: '/ts/index.php/relation/get_submit',
			reader: {
				type: 'json',
				root: 'data'
				/*,
            totalProperty: 'totalCount'
            */
			}
		}
	});

	var csrFinancingWin = Ext.create('Ext.window.Window', {
		resizeable: false,
		closeAction: "hide",
        id:'csrFinancingWin',
		title: '选择融资方',
		titleAlign: 'center',
		width: 870,
		height: 500,
		layout: 'fit',
		items: [{
			xtype: 'grid',
			id: 'finacing_list',
			store: csrFinancingListStore,
			border: 0,
			columnLines: true,
			//title: '渠道客户',
			verticalScroller: {
				xtype: 'paginggridscroller'
			},
			selModel: {
				pruneRemoved: false
			},
			features: [{
				ftype: 'grouping',
				hideGroupedHeader: false
			}],
			viewConfig: {
				trackOver: false
			},
			multiSelect: true,
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				height: 48,
				enableOverflow: true,
				padding: 3,
				items: [{
					width: 400,
					fieldLabel: '查找',
					labelWidth: 50,
					xtype: 'searchfield',
					store: csrFinancingListStore
				},
				{
					xtype: 'component',
					itemId: 'status',
					tpl: '<span style="font-size:16px">记录数: <b>{count}</b>。</span>可搜索项目名称，供应商名称，供应商联系人。',
					style: 'margin-left:10px;margin-right:10px'
				}]
			},
			{
				xtype: 'toolbar',
				id: 'finacing_list_topbar',
				dock: 'top',
				height: 48,
				items: [{
					xtype: 'tbtext',
					text: '客户类别筛选：'
				},
				{
					xtype: 'cycle',
					showText: true,
					menu: {
						items: [{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '所有客户'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '目标客户'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '潜在客户'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '意向客户'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '成交客户'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '未标明客户类别的客户'
						}]
					},
					changeHandler: function(cycleBtn, activeItem) {
						if (activeItem.text == '目标客户') {
							catMode = 'lv1';
						} else if (activeItem.text == '潜在客户') {
							catMode = 'lv2';
						} else if (activeItem.text == '意向客户') {
							catMode = 'lv3';
						} else if (activeItem.text == '成交客户') {
							catMode = 'lv4';
						} else if (activeItem.text == '未标明客户类别的客户') {
							catMode = 'lv0';
						} else if (activeItem.text == '所有客户') {
							catMode = 'all';
						}
						csrFinancingListStore.setProxy({
							type: 'ajax',
							url: '/ts/index.php/csr_financing/view?mode=' + fncmode + '&recentMode=' + fncrecentMode +'&FSCChannel=' + encodeURI(fncFSCChannel) + '&PStart=' + fncPStart + '&PEnd=' + fncPEnd + '&lastFollow=' + encodeURI(fnclastFollow),
							reader: {
								type: 'json',
								root: 'data',
								totalProperty: 'totalCount'
							},
							simpleSortMode: true,
							filterParam: 'query',
							encodeFilters: function(filters) {
								return filters[0].value;
							}
						});
						csrFinancingListStore.load();
					}
				},
				{
					xtype: 'tbtext',
					text: '跟进结果筛选：'
				},
				{
					xtype: 'cycle',
					showText: true,
					menu: {
						items: [{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '所有跟进结果'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '还未跟进'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '实施面谈'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '成功约见'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '接通但未约见'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '仅成功接通'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '未找到人'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '接通但人很忙'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '无人接听'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '小秘书'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '挂断'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '放弃'
						}]
					},
					changeHandler: function(cycleBtn, activeItem) {
						if (activeItem.text == '所有跟进结果') {
							lastFollow = '';
						} else if (activeItem.text == '还未跟进') {
							lastFollow = 'not_follow';
						} else {
							lastFollow = activeItem.text;
						}
						csrFinancingListStore.setProxy({
							type: 'ajax',
							url: '/ts/index.php/csr_financing/view?mode=' + fncmode + '&recentMode=' + fncrecentMode +'&FSCChannel=' + encodeURI(fncFSCChannel) + '&PStart=' + fncPStart + '&PEnd=' + fncPEnd + '&lastFollow=' + encodeURI(fnclastFollow),
							reader: {
								type: 'json',
								root: 'data',
								totalProperty: 'totalCount'
							},
							simpleSortMode: true,
							filterParam: 'query',
							encodeFilters: function(filters) {
								return filters[0].value;
							}
						});
						csrFinancingListStore.load();
					}
				},
				{
					xtype: 'tbtext',
					text: '跟进时间筛选：'
				},
				{
					xtype: 'cycle',
					showText: true,
					menu: {
						items: [
						// these will render as dropdown menu items when the arrow is clicked:
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '所有记录'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '最近7天跟进'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '最近30天跟进'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '最近7天未跟进'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '最近30天未跟进'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '没有跟进记录'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '高级'
						}]
					},
					changeHandler: function(cycleBtn, activeItem) {
						if (activeItem.text != '高级') {
							var PStartChoose = Ext.getCmp('PStartChoose');
							if (PStartChoose != undefined) {
								PStartChoose.hide();
								PStartChoose.reset();
								PStart = '';
							}
							var PEndChoose = Ext.getCmp('PEndChoose');
							if (PEndChoose != undefined) {
								PEndChoose.hide();
								PEndChoose.reset();
								PEnd = '';
							}
							if (activeItem.text == '所有记录') {
								recentMode = 'null';
							} else if (activeItem.text == '最近7天跟进') {
								recentMode = 'lt7';
							} else if (activeItem.text == '最近7天未跟进') {
								recentMode = 'gt7';
							} else if (activeItem.text == '最近30天跟进') {
								recentMode = 'lt30';
							} else if (activeItem.text == '最近30天未跟进') {
								recentMode = 'gt30';
							} else if (activeItem.text == '没有跟进记录') {
								recentMode = 'nofollow';
							}
							csrFinancingListStore.setProxy({
								type: 'ajax',
							url: '/ts/index.php/csr_financing/view?mode=' + fncmode + '&recentMode=' + fncrecentMode +'&FSCChannel=' + encodeURI(fncFSCChannel) + '&PStart=' + fncPStart + '&PEnd=' + fncPEnd + '&lastFollow=' + encodeURI(fnclastFollow),
								reader: {
									type: 'json',
									root: 'data',
									totalProperty: 'totalCount'
								},
								simpleSortMode: true,
								filterParam: 'query',
								encodeFilters: function(filters) {
									return filters[0].value;
								}
							});
							csrFinancingListStore.load();
						} else {
							Ext.getCmp('PStartChoose').show();
							Ext.getCmp('PStartChoose').reset();
							PStart = '';
							Ext.getCmp('PEndChoose').show();
							Ext.getCmp('PEndChoose').reset();
							PEnd = '';
						}
					}
				},
				{
					id: 'PStartChoose',
					hidden: true,
					xtype: 'datefield',
					width: 120,
					name: 'PStart',
					maxValue: new Date(),
					format: 'Y-m-d',
					listeners: {
						change: function(me, newValue, oldValue) {
							PStart = ((newValue.getYear() < 1900) ? (1900 + newValue.getYear()) : newValue.getYear()) + "-" + (newValue.getMonth() + 1) + "-" + newValue.getDate();
							if (PStart != '' && PEnd != '') {
								csrFinancingListStore.setProxy({
									type: 'ajax',
							url: '/ts/index.php/csr_financing/view?mode=' + fncmode + '&recentMode=' + fncrecentMode +'&FSCChannel=' + encodeURI(fncFSCChannel) + '&PStart=' + fncPStart + '&PEnd=' + fncPEnd + '&lastFollow=' + encodeURI(fnclastFollow),
									reader: {
										type: 'json',
										root: 'data',
										totalProperty: 'totalCount'
									},
									simpleSortMode: true,
									filterParam: 'query',
									encodeFilters: function(filters) {
										return filters[0].value;
									}
								});
								csrFinancingListStore.load();
							}
						}
					}
				},
				{
					xtype: 'tbtext',
					text: ' - '
				},
				{
					id: 'PEndChoose',
					hidden: true,
					xtype: 'datefield',
					width: 120,
					name: 'PEnd',
					maxValue: new Date(),
					format: 'Y-m-d',
					listeners: {
						change: function(me, newValue, oldValue) {
							PEnd = ((newValue.getYear() < 1900) ? (1900 + newValue.getYear()) : newValue.getYear()) + "-" + (newValue.getMonth() + 1) + "-" + newValue.getDate();
							if (PStart != '' && PEnd != '') {
								csrFinancingListStore.setProxy({
									type: 'ajax',
							url: '/ts/index.php/csr_financing/view?mode=' + fncmode + '&recentMode=' + fncrecentMode +'&FSCChannel=' + encodeURI(fncFSCChannel) + '&PStart=' + fncPStart + '&PEnd=' + fncPEnd + '&lastFollow=' + encodeURI(fnclastFollow),
									reader: {
										type: 'json',
										root: 'data',
										totalProperty: 'totalCount'
									},
									simpleSortMode: true,
									filterParam: 'query',
									encodeFilters: function(filters) {
										return filters[0].value;
									}
								});
								csrFinancingListStore.load();
							}
						}
					}
				}]
			}],
			columns: [{
				xtype: 'actioncolumn',
				width: 80,
				style: "text-align:center;",
				align: 'center',
				sortable: false,
				stopSelection: false,
				items: [{
					icon: '/ts/misc/resources/icons/cog_16.png',
					tooltip: '选择此客户',
					handler: function(grid, rowIndex, colIndex) {
						//sampleStore.removeAt(rowIndex);
						Ext.getCmp('fieldCsrFinancingName').setValue(grid.getStore().getAt(rowIndex).get("csr_financing_name"));
						Ext.getCmp('fieldCsrFinancingID').setValue(grid.getStore().getAt(rowIndex).get("csr_financing_id"));
						grid.up('window').close();
					}
				}]
			},
			{
				dataIndex: 'csr_financing_cat',
				text: '客户类别',
				filtable: true,
				style: "text-align:center;",
				align: 'center',
				width: 120
			},
			{
				dataIndex: '',
				text: '大区',
				filtable: true,
				style: "text-align:center;",
				align: 'center',
				width: 80
			},
			{
				dataIndex: 'csr_financing_name',
				text: '公司名称',
				filtable: true,
				style: "text-align:center;",
				align: 'center',
				width: 180
			},
			{
				dataIndex: 'csr_financing_industry',
				text: '公司行业',
				filtable: true,
				style: "text-align:center;",
				align: 'center',
				width: 120
			},
			{
				dataIndex: 'csr_financing_web',
				text: '公司网址',
				filtable: true,
				style: "text-align:center;",
				align: 'center',
				width: 210,
				renderer: function(value, metaData, record, colIndex, store, view) {
					if (value.indexOf('http://') > 0) {
						return '<a href=\'' + value + '\' target=\'_blank\'>' + value + '</a>';
					} else {
						return '<a href=\'http://' + value + '\' target=\'_blank\'>' + value + '</a>';
					}
				}
			}],
			viewConfig: {
				stripeRows: true,
				forceFit: true,
				sortAscText: '正序',
				sortDescText: '降序'
			},
			loadMask: true,
			emptyText: '没有匹配的记录'
		}]
	});
	var csrProviderWin = Ext.create('Ext.window.Window', {
		resizeable: false,
		closeAction: "hide",
        id:'csrProviderWin',
		title: '选择供应商',
		titleAlign: 'center',
		width: 870,
		height: 500,
		layout: 'fit',
		items: [{
			xtype: 'grid',
			id: 'finacing_list',
			store: csrProviderListStore,
			border: 0,
			columnLines: true,
			//title: '渠道客户',
			verticalScroller: {
				xtype: 'paginggridscroller'
			},
			selModel: {
				pruneRemoved: false
			},
			features: [{
				ftype: 'grouping',
				hideGroupedHeader: false
			}],
			viewConfig: {
				trackOver: false
			},
			multiSelect: true,
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				height: 48,
				enableOverflow: true,
				padding: 3,
				items: [{
					width: 400,
					fieldLabel: '查找',
					labelWidth: 50,
					xtype: 'searchfield',
					store: csrProviderListStore
				},
				{
					xtype: 'component',
					itemId: 'status',
					tpl: '<span style="font-size:16px">记录数: <b>{count}</b>。</span>可搜索项目名称，供应商名称，供应商联系人。',
					style: 'margin-left:10px;margin-right:10px'
				}]
			},
			{
				xtype: 'toolbar',
				id: 'provider_list_topbar',
				dock: 'top',
				height: 48,
				items: [{
					xtype: 'tbtext',
					text: '客户类别筛选：'
				},
				{
					xtype: 'cycle',
					showText: true,
					menu: {
						items: [{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '所有客户'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '目标客户'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '潜在客户'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '意向客户'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '成交客户'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '未标明客户类别的客户'
						}]
					},
					changeHandler: function(cycleBtn, activeItem) {
						if (activeItem.text == '目标客户') {
							catMode = 'lv1';
						} else if (activeItem.text == '潜在客户') {
							catMode = 'lv2';
						} else if (activeItem.text == '意向客户') {
							catMode = 'lv3';
						} else if (activeItem.text == '成交客户') {
							catMode = 'lv4';
						} else if (activeItem.text == '未标明客户类别的客户') {
							catMode = 'lv0';
						} else if (activeItem.text == '所有客户') {
							catMode = 'all';
						}
						csrProviderListStore.setProxy({
							type: 'ajax',
							url: '/ts/index.php/csr_provider/view?mode=' + prdmode + '&recentMode=' + prdrecentMode + '&FSCChannel=' + encodeURI(prdFSCChannel) + '&PStart=' + prdPStart + '&PEnd=' + prdPEnd + '&lastFollow=' + encodeURI(prdlastFollow),
							reader: {
								type: 'json',
								root: 'data',
								totalProperty: 'totalCount'
							},
							simpleSortMode: true,
							filterParam: 'query',
							encodeFilters: function(filters) {
								return filters[0].value;
							}
						});
						csrProviderListStore.load();
					}
				},
				{
					xtype: 'tbtext',
					text: '跟进结果筛选：'
				},
				{
					xtype: 'cycle',
					showText: true,
					menu: {
						items: [{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '所有跟进结果'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '还未跟进'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '实施面谈'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '成功约见'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '接通但未约见'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '仅成功接通'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '未找到人'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '接通但人很忙'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '无人接听'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '小秘书'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '挂断'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '放弃'
						}]
					},
					changeHandler: function(cycleBtn, activeItem) {
						if (activeItem.text == '所有跟进结果') {
							lastFollow = '';
						} else if (activeItem.text == '还未跟进') {
							lastFollow = 'not_follow';
						} else {
							lastFollow = activeItem.text;
						}
						csrProviderListStore.setProxy({
							type: 'ajax',
							url: '/ts/index.php/csr_provider/view?mode=' + prdmode + '&recentMode=' + prdrecentMode + '&FSCChannel=' + encodeURI(prdFSCChannel) + '&PStart=' + prdPStart + '&PEnd=' + prdPEnd + '&lastFollow=' + encodeURI(prdlastFollow),
							reader: {
								type: 'json',
								root: 'data',
								totalProperty: 'totalCount'
							},
							simpleSortMode: true,
							filterParam: 'query',
							encodeFilters: function(filters) {
								return filters[0].value;
							}
						});
						csrProviderListStore.load();
					}
				},
				{
					xtype: 'tbtext',
					text: '跟进时间筛选：'
				},
				{
					xtype: 'cycle',
					showText: true,
					menu: {
						items: [
						// these will render as dropdown menu items when the arrow is clicked:
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '所有记录'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '最近7天跟进'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '最近30天跟进'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '最近7天未跟进'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '最近30天未跟进'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '没有跟进记录'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '高级'
						}]
					},
					changeHandler: function(cycleBtn, activeItem) {
						if (activeItem.text != '高级') {
							var PStartChoose = Ext.getCmp('PStartChoose');
							if (PStartChoose != undefined) {
								PStartChoose.hide();
								PStartChoose.reset();
								PStart = '';
							}
							var PEndChoose = Ext.getCmp('PEndChoose');
							if (PEndChoose != undefined) {
								PEndChoose.hide();
								PEndChoose.reset();
								PEnd = '';
							}
							if (activeItem.text == '所有记录') {
								recentMode = 'null';
							} else if (activeItem.text == '最近7天跟进') {
								recentMode = 'lt7';
							} else if (activeItem.text == '最近7天未跟进') {
								recentMode = 'gt7';
							} else if (activeItem.text == '最近30天跟进') {
								recentMode = 'lt30';
							} else if (activeItem.text == '最近30天未跟进') {
								recentMode = 'gt30';
							} else if (activeItem.text == '没有跟进记录') {
								recentMode = 'nofollow';
							}
							csrProviderListStore.setProxy({
								type: 'ajax',
							url: '/ts/index.php/csr_provider/view?mode=' + prdmode + '&recentMode=' + prdrecentMode + '&FSCChannel=' + encodeURI(prdFSCChannel) + '&PStart=' + prdPStart + '&PEnd=' + prdPEnd + '&lastFollow=' + encodeURI(prdlastFollow),
								reader: {
									type: 'json',
									root: 'data',
									totalProperty: 'totalCount'
								},
								simpleSortMode: true,
								filterParam: 'query',
								encodeFilters: function(filters) {
									return filters[0].value;
								}
							});
							csrProviderListStore.load();
						} else {
							Ext.getCmp('PStartChoose').show();
							Ext.getCmp('PStartChoose').reset();
							PStart = '';
							Ext.getCmp('PEndChoose').show();
							Ext.getCmp('PEndChoose').reset();
							PEnd = '';
						}
					}
				},
				{
					id: 'PStartChoose',
					hidden: true,
					xtype: 'datefield',
					width: 120,
					name: 'PStart',
					maxValue: new Date(),
					format: 'Y-m-d',
					listeners: {
						change: function(me, newValue, oldValue) {
							PStart = ((newValue.getYear() < 1900) ? (1900 + newValue.getYear()) : newValue.getYear()) + "-" + (newValue.getMonth() + 1) + "-" + newValue.getDate();
							if (PStart != '' && PEnd != '') {
								csrProviderListStore.setProxy({
									type: 'ajax',
							url: '/ts/index.php/csr_provider/view?mode=' + prdmode + '&recentMode=' + prdrecentMode + '&FSCChannel=' + encodeURI(prdFSCChannel) + '&PStart=' + prdPStart + '&PEnd=' + prdPEnd + '&lastFollow=' + encodeURI(prdlastFollow),
									reader: {
										type: 'json',
										root: 'data',
										totalProperty: 'totalCount'
									},
									simpleSortMode: true,
									filterParam: 'query',
									encodeFilters: function(filters) {
										return filters[0].value;
									}
								});
								csrProviderListStore.load();
							}
						}
					}
				},
				{
					xtype: 'tbtext',
					text: ' - '
				},
				{
					id: 'PEndChoose',
					hidden: true,
					xtype: 'datefield',
					width: 120,
					name: 'PEnd',
					maxValue: new Date(),
					format: 'Y-m-d',
					listeners: {
						change: function(me, newValue, oldValue) {
							PEnd = ((newValue.getYear() < 1900) ? (1900 + newValue.getYear()) : newValue.getYear()) + "-" + (newValue.getMonth() + 1) + "-" + newValue.getDate();
							if (PStart != '' && PEnd != '') {
								csrProviderListStore.setProxy({
									type: 'ajax',
							url: '/ts/index.php/csr_provider/view?mode=' + prdmode + '&recentMode=' + prdrecentMode + '&FSCChannel=' + encodeURI(prdFSCChannel) + '&PStart=' + prdPStart + '&PEnd=' + prdPEnd + '&lastFollow=' + encodeURI(prdlastFollow),
									reader: {
										type: 'json',
										root: 'data',
										totalProperty: 'totalCount'
									},
									simpleSortMode: true,
									filterParam: 'query',
									encodeFilters: function(filters) {
										return filters[0].value;
									}
								});
								csrProviderListStore.load();
							}
						}
					}
				}]
			}],
			columns: [{
				xtype: 'actioncolumn',
				width: 80,
				style: "text-align:center;",
				align: 'center',
				sortable: false,
				stopSelection: false,
				items: [{
					icon: '/ts/misc/resources/icons/cog_16.png',
					tooltip: '选择此客户',
					handler: function(grid, rowIndex, colIndex) {
						//sampleStore.removeAt(rowIndex);
						Ext.getCmp('fieldCsrProviderName').setValue(grid.getStore().getAt(rowIndex).get("csr_provider_name"));
						Ext.getCmp('fieldCsrProviderID').setValue(grid.getStore().getAt(rowIndex).get("csr_provider_id"));
						grid.up('window').close();
					}
				}]
			},
			{
				dataIndex: 'csr_provider_cat',
				text: '客户类别',
				filtable: true,
				style: "text-align:center;",
				align: 'center',
				width: 120
			},
			{
				dataIndex: '',
				text: '大区',
				filtable: true,
				style: "text-align:center;",
				align: 'center',
				width: 80
			},
			{
				dataIndex: 'csr_provider_name',
				text: '公司名称',
				filtable: true,
				style: "text-align:center;",
				align: 'center',
				width: 180
			},
			{
				dataIndex: 'csr_provider_industry',
				text: '公司行业',
				filtable: true,
				style: "text-align:center;",
				align: 'center',
				width: 120
			},
			{
				dataIndex: 'csr_provider_web',
				text: '公司网址',
				filtable: true,
				style: "text-align:center;",
				align: 'center',
				width: 210,
				renderer: function(value, metaData, record, colIndex, store, view) {
					if (value.indexOf('http://') > 0) {
						return '<a href=\'' + value + '\' target=\'_blank\'>' + value + '</a>';
					} else {
						return '<a href=\'http://' + value + '\' target=\'_blank\'>' + value + '</a>';
					}
				}
			}],
			viewConfig: {
				stripeRows: true,
				forceFit: true,
				sortAscText: '正序',
				sortDescText: '降序'
			},
			loadMask: true,
			emptyText: '没有匹配的记录'
		}]
	});
	var viewport = Ext.create('Ext.Viewport', {
		id: 'viewport',
		layout: {
			type: 'border',
			padding: 0
		},
		baseCls: 'customT',
		items: [{
			xtype: 'toolbar',
			region: 'south',
			border: 0,
			height: 20,
			items: [{
				xtype: 'box',
				flex: 1
			},
			{
				xtype: 'box',
				html: '版权所有。北京玉尔财富投资管理有限公司 - 2012-2013年'
			},
			{
				xtype: 'box',
				flex: 1
			}]
		}]
	});

	var topToolbar = Ext.create('Ext.toolbar.Toolbar', {
		region: 'north',
		height: 48,
		id: 'topMenu',
		border: 0,
		margin: 0,
		enableOverflow: true,
		items: [{
			xtype: 'image',
			src: '/ts/misc/resources/firstshin.jpg',
			width: 240,
			height: 38
		},
		{
			xtype: 'tbtext',
			id: 'headerTitle',
			html: '<span class="app-header2">个人客户列表</span>'
		},
		{
			xtype: 'box',
			flex: 1
		},
		'->', {
			xtype: 'tbtext',
			text: '您可以：'
		},
		{
			text: '<b>新增项目</b>',
			icon: '/ts/misc/resources/icons/add.gif',
			scale: 'medium',
			handler: function() {
				Ext.getBody().mask();
				projNewWin.show();
			}
		}
		/*,{
        text: '<b>新增公司</b>',
        icon: '/ts/misc/resources/icons/add.gif',
        scale:'medium',
        handler:function(){
            Ext.getBody().mask();
          companyEditWin.show();
        }
      }*/
		]
	});

	var controlTreeStore = Ext.create('Ext.data.TreeStore', {
		proxy: {
			type: 'ajax',
			url: '/ts/index.php/api/get_control_tree',
			reader: {
				type: 'json'
			}
		}
	});

	var controlTree = Ext.create('Ext.tree.Panel', {
		title: '功能选择',
		width: 200,
		store: controlTreeStore,
		collapsible: true,
		rootVisible: false,
		collapseDirection: 'left',
		region: 'west'

	});

	controlTree.on("itemclick",
	function(view, record, item, index, e) {
		//alert("点击的节点ID是："+record.raw.id+",文字是："+record.raw.text);
		if (record.isLeaf() == true) {
			window.location.href = "/ts/index.php/" + record.get("id");
		} else {
			record.collapse();
		}
	});

	var fgrid = 0;
	var chStatusList = Ext.create('Ext.data.ArrayStore', {
		fields: ['id', 'text'],
		data: [['顺利', '顺利'], ['等待', '等待'], ['停滞', '停滞']]
	});

	var colStore = Ext.create('Ext.data.JsonStore', {
		fields: [{
			name: 'csr_provider_id',
			type: 'string',
			dataIndex: 'id'
		},
		{
			name: 'csr_provider_name',
			type: 'string'
		}],
		proxy: {
			type: 'ajax',
			url: '/ts/index.php/relation/company',
			reader: {
				type: 'json',
				root: 'data'
			}
		}
	});

	var gridStore = Ext.create('Ext.data.Store', {
		model: 'Rproj'
	});

	var contentStore = Ext.create('Ext.data.JsonStore', {
		fields: [{
			name: 'id',
			type: 'int'
		},
		{
			name: 'csr_provider_id',
			type: 'integer'
		},
		{
			name: 'csr_provider_name',
			type: 'string'
		},
		{
			name: 'proj_id',
			type: 'integer'
		},
		{
			name: 'update_ts',
			type: 'date'
		},
		{
			name: 'status',
			type: 'string'
		},
		{
			name: 'update_remark',
			type: 'string'
		}],
		proxy: {
			type: 'ajax',
			url: '/ts/index.php/relation/detail?relation_id=1',
			reader: {
				type: 'json',
				root: 'data'
			}
		}
	});

	var projEditWin = Ext.create('Ext.window.Window', {
		resizeable: false,
		closeAction: "hide",
		title: '编辑项目信息',
		titleAlign: 'center',
		id: 'projEditWin',
		width: 970,
		height: 620,
		layout: 'fit',
		items: [{
			xtype: 'form',
			bodyPadding: 5,
			trackResetOnLoad: true,
			border: 0,
			waitTitle: "Pleas wait...",
			layout: {
				type: 'hbox',
				defaultMargins: {
					top: 0,
					right: 5,
					bottom: 0,
					left: 5
				}
			},
			fieldDefaults: {
				labelAlign: 'right',
				labelWidth: 120,
				width: 300,
				msgTarget: 'under',
				allowBlank: false
			},
			dockedItems: [{
				dock: 'bottom',
				xtype: 'toolbar',
				bodyPadding: 5,
				items: [{
					xtype: 'box',
					flex: 1
				},
				{
					icon: '/ts/misc/resources/icons/grid.png',
					text: '确定',
					formBind: true,
					//only enabled once the form is valid
					disabled: true,
					handler: function() {
						this.up('form').getForm().submit({
							url: '/ts/index.php/relation/proj_update_submit',
							submitEmptyText: false,
							waitMsg: 'Saving Data...',
							success: function(form, action) {
								projEditWin.hide();
								projDetailStore.load();
							}
							//,
							//failure: function(form, action) {
							//  Ext.Msg.alert('alert', '保存失败。如有问题请联系管理员。');
							//}
						});
					}
				},
				{
					icon: '/ts/misc/resources/icons/cross.gif',
					text: '取消',
					handler: function() {
						this.up('window').hide();
					}
				},
				{
					xtype: 'box',
					flex: 1
				}]
			}],
			items: [{
				xtype: 'hiddenfield',
				name: 'proj_id'
			},
			{
				xtype: 'fieldset',
				layout: 'vbox',
                defaults:{
                    margin:10
                },
                title: '====<b>项目基本信息</b>====',
				border: 0,
				items: [{
					xtype: 'fieldset',
					layout: 'vbox',
					border: 0,
					items: [{
						xtype: 'textfield',
						fieldLabel: '融资方',
						id: 'fieldCsrFinancingName',
						width: 400,
						name: 'csr_financing_name'
					},
					{
						xtype: 'hiddenfield',
						id: 'fieldCsrFinancingID',
						name: 'csr_financing_id'
					},
					{
						xtype: 'button',
						text: '从我的客户列表中选择...',
						handler: function() {
							csrFinancingWin.show();
							Ext.getCmp('projEditWin').mask();
						}
					}]
				},
				{
					xtype: 'textfield',
					fieldLabel: '项目名称',
					width: 400,
					name: 'proj_name'
				},
				{
					xtype: 'numberfield',
					fieldLabel: '融资额(万)',
					name: 'amount'
				},
				{
					xtype: 'numberfield',
					fieldLabel: '融资期限(月)',
					name: 'month'
				},
				{
					xtype: 'numberfield',
					fieldLabel: '融资最高成本(%)',
					name: 'profit_max'
				},
				{
					xtype: 'numberfield',
					fieldLabel: '融资建议成本(%)',
					name: 'profit_suggest'
				},
				{
					xtype: 'datefield',
					fieldLabel: '项目截止期',
					name: 'proj_deadline'
				},
				{
					xtype: 'textfield',
					fieldLabel: '项目介绍人',
					name: 'cproj_intro'
				},
				{
				xtype:'combo',
				fieldLabel: '项目董事',
				name:'cproj_director',
				queryMode : 'local',
				store : chDirectorList,
				valueField: 'id',
				displayField: 'text',
				forceSelection:true
				},
				{
				xtype:'combo',
				fieldLabel: '项目经理',
				name:'cproj_manager',
				queryMode : 'local',
				store : chManagerList,
				valueField: 'id',
				displayField: 'text',
				forceSelection:true
				}]
			},
			{
				xtype: 'fieldset',
				layout: 'vbox',
                title: '====<b>项目扩展信息</b>====',
				fieldDefaults: {
				labelAlign: 'right',
				labelWidth: 80,
				width: 500,
                height:120,
				msgTarget: 'under',
				allowBlank: false
			},border: 0,
				items: [{
					xtype: 'textareafield',
					fieldLabel: '担保方式',
					name: 'guarantee_mode'
				},
				{
					xtype: 'textareafield',
					fieldLabel: '还款来源',
					name: 'repayment'
				},
				{
					xtype: 'textareafield',
					fieldLabel: '项目关系',
					name: 'proj_rel'
				},
				{
					xtype: 'textareafield',
					fieldLabel: '其它备注',
					name: 'remark'
				}]
			}]
		}]
	});

	var projNewWin = Ext.create('Ext.window.Window', {
		resizeable: false,
		closeAction: "hide",
		title: '新增项目',
		titleAlign: 'center',
		id: 'projNewWin',
		width: 970,
		height: 620,
		layout: 'fit',
		items: [{
			xtype: 'form',
			bodyPadding: 5,
			trackResetOnLoad: true,
			border: 0,
			waitTitle: "Pleas wait...",
			layout: {
				type: 'hbox',
				defaultMargins: {
					top: 0,
					right: 5,
					bottom: 0,
					left: 5
				}
			},
			fieldDefaults: {
				labelAlign: 'right',
				labelWidth: 120,
				width: 300,
				msgTarget: 'under',
				allowBlank: false
			},
			dockedItems: [{
				dock: 'bottom',
				xtype: 'toolbar',
				bodyPadding: 5,
				items: [{
					xtype: 'box',
					flex: 1
				},
				{
					icon: '/ts/misc/resources/icons/grid.png',
					text: '确定',
					formBind: true,
					//only enabled once the form is valid
					disabled: true,
					handler: function() {
						this.up('form').getForm().submit({
							url: '/ts/index.php/relation/proj_create',
							submitEmptyText: false,
							waitMsg: 'Saving Data...',
							success: function(form, action) {
								projNewWin.hide();
								projDetailStore.load();
							}
							//,
							//failure: function(form, action) {
							//  Ext.Msg.alert('alert', '保存失败。如有问题请联系管理员。');
							//}
						});
					}
				},
				{
					icon: '/ts/misc/resources/icons/cross.gif',
					text: '取消',
					handler: function() {
						this.up('window').hide();
					}
				},
				{
					xtype: 'box',
					flex: 1
				}]
			}],
			items: [{
				xtype: 'fieldset',
				layout: 'vbox',
                title: '====<b>项目基本信息</b>====',
				border: 0,
                defaults:{
                    margin:10
                },
				items: [{
					xtype: 'fieldset',
					layout: 'vbox',
					border: 0,
					items: [{
						xtype: 'textfield',
						fieldLabel: '融资方',
						id: 'fieldCsrFinancingName',
						width: 300,
						name: 'csr_financing_name'
					},
					{
						xtype: 'hiddenfield',
						id: 'fieldCsrFinancingID',
						name: 'csr_financing_id'
					},
					{
						xtype: 'button',
						text: '从我的客户列表中选择...',
						handler: function() {
							csrFinancingWin.show();
							Ext.getCmp('projEditWin').mask();
						}
					}]
				},
				{
					xtype: 'textfield',
					fieldLabel: '项目名称',
					width: 400,
					name: 'proj_name'
				},
				{
					xtype: 'numberfield',
					fieldLabel: '融资额(万)',
					name: 'amount'
				},
				{
					xtype: 'numberfield',
					fieldLabel: '融资期限(月)',
					name: 'month'
				},
				{
					xtype: 'numberfield',
					fieldLabel: '融资最高成本(%)',
					name: 'profit_max'
				},
				{
					xtype: 'numberfield',
					fieldLabel: '融资建议成本(%)',
					name: 'profit_suggest'
				},
				{
					xtype: 'datefield',
					fieldLabel: '项目截止期',
					name: 'proj_deadline'
				},
				{
					xtype: 'textfield',
					fieldLabel: '项目介绍人',
					name: 'cproj_intro'
				},
				{
				xtype:'combo',
				fieldLabel: '项目董事',
				name:'cproj_director',
				queryMode : 'local',
				store : chDirectorList,
				valueField: 'id',
				displayField: 'text',
				forceSelection:true
				},
				{
				xtype:'combo',
				fieldLabel: '项目经理',
				name:'cproj_manager',
				queryMode : 'local',
				store : chManagerList,
				valueField: 'id',
				displayField: 'text',
				forceSelection:true
				}]
			},
			{
				xtype: 'fieldset',
				layout: 'vbox',
                title: '====<b>项目扩展信息</b>====',
				border: 0,
			fieldDefaults: {
				labelAlign: 'right',
				labelWidth: 80,
				width: 500,
                height:120,
				msgTarget: 'under',
				allowBlank: false
			},
				items: [{
					xtype: 'textareafield',
					fieldLabel: '担保方式',
					name: 'guarantee_mode'
				},
				{
					xtype: 'textareafield',
					fieldLabel: '还款来源',
					name: 'repayment'
				},
				{
					xtype: 'textareafield',
					fieldLabel: '项目关系',
					name: 'proj_rel'
				},
				{
					xtype: 'textareafield',
					fieldLabel: '其它备注',
					name: 'remark'
				}]
			}]
        }]
	});
	projNewWin.on({
		hide: function() {
			Ext.getBody().unmask();
		}
	});
	projEditWin.on({
		hide: function() {
			Ext.getBody().unmask();
		}
	});
	csrFinancingWin.on({
		hide: function() {
			Ext.getCmp('projEditWin').unmask();
		}
	});
	csrProviderWin.on({
		hide: function() {
			Ext.getCmp('relationEditWin').unmask();
		}
	});
	var contentWin = Ext.create('Ext.window.Window', {
		resizeable: false,
		closeAction: "hide",
		title: '项目历史',
		width: 626,
		height: 400,
		layout: 'border',
		dockedItems: [{
			dock: 'top',
			xtype: 'toolbar',
			bodyPadding: 5,
			items: [{
				icon: '/ts/misc/resources/icons/grid.png',
				text: '更新状态',
				scale: 'medium',
				formBind: true,
				//only enabled once the form is valid
				handler: function() {
					this.up('toolbar').hide();
					this.up('window').down('form').show();
				}
			}]
		}],
		items: [{
			xtype: 'form',
			region: 'north',
			hidden: true,
			bodyPadding: 5,
			trackResetOnLoad: true,
			border: 0,
			height: 240,
			width: 620,
			waitTitle: "Pleas wait...",
			layout: {
				type: 'vbox',
				defaultMargins: {
					top: 0,
					right: 5,
					bottom: 0,
					left: 5
				}
			},
			bodyStyle: {
				background: '#DDDDDD'
			},
			dockedItems: [{
				dock: 'bottom',
				xtype: 'toolbar',
				style: {
					background: '#DDDDDD'
				},
				bodyPadding: 5,
				items: [{
					icon: '/ts/misc/resources/icons/grid.png',
					text: '确定',
					formBind: true,
					//only enabled once the form is valid
					disabled: true,
					handler: function() {
						this.up('form').getForm().submit({
							url: '/ts/index.php/relation/relation_update',
							submitEmptyText: false,
							waitMsg: 'Saving Data...',
							success: function(form, action) {
								form.owner.hide();
								contentWin.down('toolbar').show();
								contentStore.load();
								gridStore.load();
							}
							//,
							//failure: function(form, action) {
							//  Ext.Msg.alert('alert', '保存失败。如有问题请联系管理员。');
							//}
						});
					}
				},
				{
					icon: '/ts/misc/resources/icons/cross.gif',
					text: '取消',
					handler: function() {
						this.up('form').hide();
						this.up('window').down('toolbar').show();
					}
				}]
			}],
			items: [{
				xtype: 'hiddenfield',
				fieldLabel: 'csr_provider_id',
				name: 'csr_provider_id',
				allowBlank: false
			},
			{
				xtype: 'hiddenfield',
				fieldLabel: 'proj_id',
				name: 'proj_id',
				allowBlank: false
			},
			{
				xtype: 'datefield',
				width: 300,
				fieldLabel: '更新日期',
				name: 'update_ts',
				allowBlank: false
			},
			{
				xtype: 'combo',
				width: 300,
				fieldLabel: '项目状态',
				queryMode: 'local',
				store: chStatusList,
				valueField: 'id',
				displayField: 'text',
				forceSelection: true,
				name: 'status',
				allowBlank: false
			},
			{
				xtype: 'textareafield',
				width: 400,
				fieldLabel: '备注',
				name: 'update_remark'
			}]
		},
		{
			xtype: 'grid',
			store: contentStore,
			region: 'center',
			height: 370,
			columns: [{
				text: "更新时间",
				width: 120,
				dataIndex: "update_ts",
				renderer: new Ext.util.Format.dateRenderer("Y-m-d")
			},
			{
				text: "项目状态",
				width: 100,
				dataIndex: "status",
				type: "string"
			},
			{
				text: "更新说明",
				width: 350,
				dataIndex: "update_remark",
				type: "string"
			}]
		}]
	});
	contentWin.on({
		hide: function() {
			Ext.getBody().unmask();
		}
	});

	var relationEditWin = Ext.create('Ext.window.Window', {
		resizeable: false,
		closeAction: "hide",
        id:'relationEditWin',
		title: '新建投资关系',
		width: 540,
		height: 300,
		layout: 'fit',
		items: [{
			xtype: 'form',
			bodyPadding: 5,
			trackResetOnLoad: true,
			border: 0,
			height: 200,
			waitTitle: "Pleas wait...",
			layout: {
				type: 'vbox',
				defaultMargins: {
					top: 0,
					right: 5,
					bottom: 0,
					left: 5
				}
			},
			dockedItems: [{
				dock: 'bottom',
				xtype: 'toolbar',
				bodyPadding: 5,
				items: [{
					icon: '/ts/misc/resources/icons/grid.png',
					text: '确定',
					formBind: true,
					//only enabled once the form is valid
					disabled: true,
					handler: function() {
						this.up('form').getForm().submit({
							url: '/ts/index.php/relation/relation_create',
							submitEmptyText: false,
							waitMsg: 'Saving Data...',
							success: function(form, action) {
								relationEditWin.hide();
								projDetailStore.load();
							}
							//,
							//failure: function(form, action) {
							//  Ext.Msg.alert('alert', '保存失败。如有问题请联系管理员。');
							//}
						});
					}
				},
				{
					icon: '/ts/misc/resources/icons/cross.gif',
					text: '取消',
					handler: function() {
						this.up('window').hide();
					}
				}]
			}],
			items: [{
					xtype: 'fieldset',
					layout: 'vbox',
					border: 0,
					items: [{
						xtype: 'textfield',
						fieldLabel: '融资方',
						id: 'fieldCsrProviderName',
						width: 300,
						name: 'csr_provider_name'
					},
					{
						xtype: 'hiddenfield',
						id: 'fieldCsrProviderID',
						name: 'csr_provider_id'
					},
					{
						xtype: 'button',
						text: '从我的客户列表中选择...',
						handler: function() {
							csrProviderWin.show();
							Ext.getCmp('relationEditWin').mask();
						}
					}]
            },
			{
				xtype: 'hiddenfield',
				name: 'proj_id',
				allowBlank: false
			},
			{
				xtype: 'textfield',
				fieldLabel: '联系人',
				width: 300,
				name: 'contact_person',
				allowBlank: false
			},
			{
				xtype: 'datefield',
				fieldLabel: '更新日期',
				width: 300,
				name: 'update_ts',
				allowBlank: false
			},
			{
				xtype: 'combo',
				width: 300,
				fieldLabel: '项目状态',
				queryMode: 'local',
				store: chStatusList,
				valueField: 'id',
				displayField: 'text',
				forceSelection: true,
				name: 'status',
				allowBlank: false
			},
			{
				xtype: 'textareafield',
				width: 400,
				fieldLabel: '备注',
				name: 'update_remark',
				allowBlank: false
			}]
		}]

	});

	relationEditWin.on({
		hide: function() {
			Ext.getBody().unmask();
		}
	});

	/*colStore.on("load",function(records, operation, success) {
  var gridColConfig=[{name:"proj_name",width:160,dataIndex:"proj_name",type:"string"}];
  
  var recs=records.data.items;
  recs.forEach(function(record){
  	var csr_provider_name=record.get("csr_provider_name");
  	var csr_provider_id=record.get("csr_provider_id");
  	
    gridColConfig.push({
    	text:csr_provider_name,
        width:130,
    	dataIndex:csr_provider_id,
    	type:record.get("type"),
    	renderer:function (val, metadata, record) {
        metadata.style = 'cursor: pointer;';
        var status=record.relation().queryBy(function(record){
          return record.get("csr_provider_id")==csr_provider_id
        });
        if(status.length>0){
          return status.first().get("status")
        } else return "";
      }
    });
  });

  gridStore.load();
  
  if(fgrid!=0){fgrid.destroy()};
  fgrid=Ext.create('Ext.grid.Panel',{
    region:'center',
    store:gridStore,
    columns:gridColConfig,
    dockedItems:[{
      dock: 'top',
      xtype: 'toolbar',
      bodyPadding: 5,
      items: []
    }],
    //height:600,
    //renderTo:Ext.getBody(),
    plugins:[{
      ptype: 'rowexpander',
      selectRowOnExpand : true,
      rowBodyTpl : [
        '<table><tr><td style="padding:10px;border:1px;"><table>',
        '<tr><td class="r_ex_td_pre"><b>项目名称</b></td><td class="r_ex_td_main"><pre>{proj_name}</pre></td></tr>',
        '<tr><td class="r_ex_td_pre"><b>融资额</b></td><td class="r_ex_td_main"><pre>{amount:this.cusNum()}</pre></td></tr>',
        '<tr><td class="r_ex_td_pre"><b>融资期限</b></td><td class="r_ex_td_main"><pre>{month}</pre></td></tr>',
        '<tr><td class="r_ex_td_pre"><b>融资最高成本</b></td><td class="r_ex_td_main"><pre>{profit_max}</pre>%</td></tr>',
        '<tr><td class="r_ex_td_pre"><b>融资建议成本</b></td><td class="r_ex_td_main"><pre>{profit_suggest}</pre>%</td></tr>',
        '<tr><td class="r_ex_td_pre"><b>担保方式</b></td><td class="r_ex_td_main"><pre>{guarantee_mode}</pre></td></tr>',
        '<tr><td class="r_ex_td_pre"><b>还款来源</b></td><td class="r_ex_td_main"><pre>{repayment}</pre></td></tr>',
        '<tr><td class="r_ex_td_pre"><b>项目关系</b></td><td class="r_ex_td_main"><pre>{proj_rel}</pre></td></tr>',
        '<tr><td class="r_ex_td_pre"><b>项目截止期</b></td><td class="r_ex_td_main"><pre>{proj_deadline:this.cusDate()}</pre></td></tr>',
        '<tr><td class="r_ex_td_pre"><b>备注</b></td><td class="r_ex_td_main"><pre>{remark}</pre></td></tr>',
        '</table></td></tr></table>',
        {
          cusDate:function(d){return Ext.Date.format(d,'Y年m月d日');}
        },{
          cusNum:function(n){return (n<10000)?(n+"万"):(n/10000+"亿")}
        }
      ]
    }],
    listeners:{ 
      'cellclick':function(grid,td,cellIndex,record,tr,rowIndex){
      	if(cellIndex>1){
      	  var csr_provider_id=grid.getHeaderCt().getHeaderAtIndex(cellIndex).dataIndex;
      	  var companyData=record.relation().queryBy(function(record){return record.get("csr_provider_id")==csr_provider_id});
      	  if(companyData.items.length>0){
      	    contentStore.setProxy({
              type: 'ajax',
              url: '/ts/index.php/relation/detail?relation_id='+companyData.items[0].data.id,
              reader: {
                type: 'json',
                root: 'data'
              }
            });
            Ext.getBody().mask();
            contentStore.load();
            contentWin.setTitle(record.get("proj_name"));
            contentWin.down('hiddenfield[name="proj_id"]').setValue(record.get("id"));
            contentWin.down('hiddenfield[name="csr_provider_id"]').setValue(csr_provider_id);
            contentWin.show();
          } else {
            Ext.getBody().mask();
            relationEditWin.down('hiddenfield[name="proj_id"]').setValue(record.get("id"));
            relationEditWin.down('hiddenfield[name="csr_provider_id"]').setValue(csr_provider_id);
            relationEditWin.show();
          }
        }
      } 
    }
  });
    
},this);*/

	var loginname = Ext.util.Cookies.get("loginname");
	fgrid = Ext.create('Ext.grid.Panel', {
		id: 'fgrid',
		region: 'center',
		store: projDetailStore,
		border: 0,
		columnLines: true,
		//title: '渠道客户',
		verticalScroller: {
			xtype: 'paginggridscroller'
		},
		selModel: {
			pruneRemoved: false
		},
		features: [{
			ftype: 'grouping',
			hideGroupedHeader: false
		}],
		viewConfig: {
			trackOver: false
		},
		multiSelect: true,
		dockedItems: [{
			xtype: 'toolbar',
			dock: 'top',
			height: 48,
			enableOverflow: true,
			padding: 3,
			items: [{
				width: 400,
				fieldLabel: '查找',
				labelWidth: 50,
				xtype: 'searchfield',
				store: projDetailStore
			},
			'->', {
				xtype: 'component',
				itemId: 'status',
				tpl: '<span style="font-size:16px">客户数: <b>{count}</b>。</span>可搜索客户姓名，电话，电子邮箱，QQ号，所在城市。',
				style: 'margin-left:10px;margin-right:10px'
			}]
		},
		{
			xtype: 'toolbar',
			id: 'proj_detail_list_topbar',
			dock: 'top',
			height: 48,
			items: [{
				xtype: 'tbtext',
				text: '项目状态筛选：'
			},
			{
				xtype: 'cycle',
				showText: true,
				menu: {
					items: [{
						icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
						text: '正在进行'
					},
					{
						icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
						text: '已经结束'
					}]
				},
				changeHandler: function(cycleBtn, activeItem) {
					if (activeItem.text == '正在进行') {
						endMode = 0;
					} else {
						endMode = 1;
					}
					projDetailStore.setProxy({
						type: 'ajax',
						url: '/ts/index.php/relation/proj_detail?mode=' + mode + '&recentMode=' + recentMode + '&FSCChannel=' + encodeURI(FSCChannel) + '&PStart=' + PStart + '&PEnd=' + PEnd + '&lastFollow=' + encodeURI(lastFollow) + '&endMode=' + endMode,
						reader: {
							type: 'json',
							root: 'data',
							totalProperty: 'totalCount'
						},
						simpleSortMode: true,
						filterParam: 'query',
						encodeFilters: function(filters) {
							return filters[0].value;
						}
					});
					projDetailStore.load();
				}
			},
			{
				xtype: 'tbtext',
				text: '进展状态筛选：'
			},
			{
				xtype: 'cycle',
				showText: true,
				menu: {
					items: [{
						icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
						text: '所有结果'
					},
					{
						icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
						text: '等待'
					},
					{
						icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
						text: '停滞'
					},
					{
						icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
						text: '顺利'
					}]
				},
				changeHandler: function(cycleBtn, activeItem) {
					if (activeItem.text == '所有结果') {
						lastFollow = '';
					} else {
						lastFollow = activeItem.text;
					}
					projDetailStore.setProxy({
						type: 'ajax',
						url: '/ts/index.php/relation/proj_detail?mode=' + mode + '&recentMode=' + recentMode + '&FSCChannel=' + encodeURI(FSCChannel) + '&PStart=' + PStart + '&PEnd=' + PEnd + '&lastFollow=' + encodeURI(lastFollow) + '&endMode=' + endMode,
						reader: {
							type: 'json',
							root: 'data',
							totalProperty: 'totalCount'
						},
						simpleSortMode: true,
						filterParam: 'query',
						encodeFilters: function(filters) {
							return filters[0].value;
						}
					});
					projDetailStore.load();
				}
			},
			{
				xtype: 'tbtext',
				text: '跟进时间筛选：'
			},
			{
				xtype: 'cycle',
				showText: true,
				menu: {
					items: [
					// these will render as dropdown menu items when the arrow is clicked:
					{
						icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
						text: '所有记录'
					},
					{
						icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
						text: '最近7天跟进'
					},
					{
						icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
						text: '最近30天跟进'
					},
					{
						icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
						text: '最近7天未跟进'
					},
					{
						icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
						text: '最近30天未跟进'
					},
					{
						icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
						text: '没有跟进记录'
					},
					{
						icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
						text: '高级'
					}]
				},
				changeHandler: function(cycleBtn, activeItem) {
					if (activeItem.text != '高级') {
						var PStartChoose = Ext.getCmp('PStartChoose');
						if (PStartChoose != undefined) {
							PStartChoose.hide();
							PStartChoose.reset();
							PStart = '';
						}
						var PEndChoose = Ext.getCmp('PEndChoose');
						if (PEndChoose != undefined) {
							PEndChoose.hide();
							PEndChoose.reset();
							PEnd = '';
						}
						if (activeItem.text == '所有记录') {
							recentMode = 'null';
						} else if (activeItem.text == '最近7天跟进') {
							recentMode = 'lt7';
						} else if (activeItem.text == '最近7天未跟进') {
							recentMode = 'gt7';
						} else if (activeItem.text == '最近30天跟进') {
							recentMode = 'lt30';
						} else if (activeItem.text == '最近30天未跟进') {
							recentMode = 'gt30';
						} else if (activeItem.text == '没有跟进记录') {
							recentMode = 'nofollow';
						}
						projDetailStore.setProxy({
							type: 'ajax',
							url: '/ts/index.php/relation/proj_detail?mode=' + mode + '&recentMode=' + recentMode + '&FSCChannel=' + encodeURI(FSCChannel) + '&PStart=' + PStart + '&PEnd=' + PEnd + '&lastFollow=' + encodeURI(lastFollow) + '&endMode=' + endMode,
							reader: {
								type: 'json',
								root: 'data',
								totalProperty: 'totalCount'
							},
							simpleSortMode: true,
							filterParam: 'query',
							encodeFilters: function(filters) {
								return filters[0].value;
							}
						});
						projDetailStore.load();
					} else {
						Ext.getCmp('PStartChoose').show();
						Ext.getCmp('PStartChoose').reset();
						PStart = '';
						Ext.getCmp('PEndChoose').show();
						Ext.getCmp('PEndChoose').reset();
						PEnd = '';
					}
				}
			},
			{
				id: 'PStartChoose',
				hidden: true,
				xtype: 'datefield',
				width: 120,
				name: 'PStart',
				maxValue: new Date(),
				format: 'Y-m-d',
				listeners: {
					change: function(me, newValue, oldValue) {
						PStart = ((newValue.getYear() < 1900) ? (1900 + newValue.getYear()) : newValue.getYear()) + "-" + (newValue.getMonth() + 1) + "-" + newValue.getDate();
						if (PStart != '' && PEnd != '') {
							projDetailStore.setProxy({
								type: 'ajax',
								url: '/ts/index.php/relation/proj_detail?mode=' + mode + '&recentMode=' + recentMode + '&FSCChannel=' + encodeURI(FSCChannel) + '&PStart=' + PStart + '&PEnd=' + PEnd + '&lastFollow=' + encodeURI(lastFollow) + '&endMode=' + endMode,
								reader: {
									type: 'json',
									root: 'data',
									totalProperty: 'totalCount'
								},
								simpleSortMode: true,
								filterParam: 'query',
								encodeFilters: function(filters) {
									return filters[0].value;
								}
							});
							projDetailStore.load();
						}
					}
				}
			},
			{
				xtype: 'tbtext',
				text: ' - '
			},
			{
				id: 'PEndChoose',
				hidden: true,
				xtype: 'datefield',
				width: 120,
				name: 'PEnd',
				maxValue: new Date(),
				format: 'Y-m-d',
				listeners: {
					change: function(me, newValue, oldValue) {
						PEnd = ((newValue.getYear() < 1900) ? (1900 + newValue.getYear()) : newValue.getYear()) + "-" + (newValue.getMonth() + 1) + "-" + newValue.getDate();
						if (PStart != '' && PEnd != '') {
							projDetailStore.setProxy({
								type: 'ajax',
								url: '/ts/index.php/relation/proj_detail?mode=' + mode + '&recentMode=' + recentMode + '&FSCChannel=' + encodeURI(FSCChannel) + '&PStart=' + PStart + '&PEnd=' + PEnd + '&lastFollow=' + encodeURI(lastFollow) + '&endMode=' + endMode,
								reader: {
									type: 'json',
									root: 'data',
									totalProperty: 'totalCount'
								},
								simpleSortMode: true,
								filterParam: 'query',
								encodeFilters: function(filters) {
									return filters[0].value;
								}
							});
							projDetailStore.load();
						}
					}
				}
			},
			'->', {
				xtype: 'tbtext',
				text: '责任人：'
			}]
		}],
		columns: [{
			xtype: 'actioncolumn',
			width: 50,
			style: "text-align:center;",
			align: 'center',
			sortable: false,
			stopSelection: false,
			items: [{
				icon: '/ts/misc/resources/icons/cog_16.png',
				tooltip: '查看及编辑此项目',
				handler: function(grid, rowIndex, colIndex) {
					//sampleStore.removeAt(rowIndex);
					var proj_id = grid.getStore().getAt(rowIndex).get("proj_id");
					projStore.setProxy({
						type: 'ajax',
						url: '/ts/index.php/relation/get_submit?proj_id=' + proj_id,
						reader: {
							type: 'json',
							root: 'data'
						}
					});
					projStore.load(function(records, operation, success) {
						projEditWin.down('form').loadRecord(records[0]);
						Ext.getBody().mask();
						projEditWin.show();
					});
				}
			}]
        },{
			xtype: 'actioncolumn',
			width: 50,
			style: "text-align:center;",
			align: 'center',
			sortable: false,
			stopSelection: false,
			items: [{
				icon: '/ts/misc/resources/icons/cog_16.png',
				tooltip: '为该项目增加供应商',
				handler: function(grid, rowIndex, colIndex) {
					//sampleStore.removeAt(rowIndex);
					var proj_id = grid.getStore().getAt(rowIndex).get("proj_id");
		            relationEditWin.down('form').down('hiddenfield[name="proj_id"]').setValue(proj_id);
        		    //relationEditWin.down('hiddenfield[name="csr_provider_id"]').setValue(csr_provider_id);
					Ext.getBody().mask();
					relationEditWin.show();
				}
			}]
        },{
			xtype: 'actioncolumn',
			width: 50,
			style: "text-align:center;",
			align: 'center',
			sortable: false,
			stopSelection: false,
			items: [{
				icon: '/ts/misc/resources/icons/cog_16.png',
				tooltip: '添加跟进记录',
				handler: function(grid, rowIndex, colIndex) {
					//sampleStore.removeAt(rowIndex);
					var proj_id = grid.getStore().getAt(rowIndex).get("proj_id");
					projStore.setProxy({
						type: 'ajax',
						url: '/ts/index.php/relation/get_submit?proj_id=' + proj_id,
						reader: {
							type: 'json',
							root: 'data'
						}
					});
					projStore.load(function(records, operation, success) {
						projEditWin.down('form').loadRecord(records[0]);
						Ext.getBody().mask();
						projEditWin.show();
					});
				}
			}]
		},
		{
			dataIndex: 'proj_id',
			text: 'proj_id',
			filtable: true,
			style: "text-align:center;",
			align: 'center',
			width: 60,
			hidden: true
		},
		{
			dataIndex: 'proj_name',
			text: '项目名称',
			filtable: true,
			style: "text-align:center;",
			align: 'center',
			width: 120
		},
		{
			dataIndex: 'amount',
			text: '融资额',
			filtable: true,
			style: "text-align:center;",
			align: 'center',
			width: 80,
             renderer:function(value,metaData,record,rowIndex,colIndex,store,view) { 
                 return value+'万';
            }
		},
		{
			dataIndex: 'month',
			text: '融资期限',
			filtable: true,
			style: "text-align:center;",
			align: 'center',
			width: 80,
            renderer:function(value,metaData,record,rowIndex,colIndex,store,view) { 
                return value+'月';
           		
            }
		},
		{
			dataIndex: 'proj_deadline',
			text: '项目截止期',
			filtable: true,
			style: "text-align:center;",
			align: 'center',
			width: 100,
            renderer:new Ext.util.Format.dateRenderer("Y-m-d")
		},
		{
			dataIndex: 'csr_financing_name',
			text: '融资方名称',
			filtable: true,
			style: "text-align:center;",
			align: 'center',
			width: 120
		},
		{
			dataIndex: 'csr_financing_id',
			text: 'csr_financing_id',
			filtable: true,
			style: "text-align:center;",
			align: 'center',
			width: 80,
			hidden: true
		},
		{
			dataIndex: 'relation_id',
			text: 'relation_id',
			filtable: true,
			style: "text-align:center;",
			align: 'center',
			width: 80,
			hidden: true
		},
		{
			dataIndex: 'csr_provider_id',
			text: 'csr_provider_id',
			filtable: true,
			style: "text-align:center;",
			align: 'center',
			width: 80,
			hidden: true
		},
		{
			dataIndex: 'csr_provider_name',
			text: '供应商名称',
			filtable: true,
			style: "text-align:center;",
			align: 'center',
			width: 120
		},
		{
			dataIndex: 'status',
			text: '状态',
			filtable: true,
			style: "text-align:center;",
			align: 'center',
			width: 80
		},
		{
			dataIndex: 'update_ts',
			text: '最新跟进时间',
			filtable: true,
			style: "text-align:center;",
			align: 'center',
			width: 100,
            renderer:new Ext.util.Format.dateRenderer("Y-m-d")
		},
		{
			dataIndex: 'cproj_director',
			text: '项目董事',
			filtable: true,
			style: "text-align:center;",
			align: 'center',
			width: 80
        },
		{
			dataIndex: 'cproj_manager',
			text: '项目经理',
			filtable: true,
			style: "text-align:center;",
			align: 'center',
			width: 80
        },
		{
			dataIndex: 'cproj_update_ts',
			text: '项目更新时间',
			filtable: true,
			style: "text-align:center;",
			align: 'center',
			width: 100,
            renderer:new Ext.util.Format.dateRenderer("Y-m-d")
		}],
		viewConfig: {
			stripeRows: true,
			forceFit: true,
			sortAscText: '正序',
			sortDescText: '降序'
		},
		loadMask: true,
		emptyText: '没有匹配的记录'

	});

	Ext.getCmp('viewport').add(fgrid);
	Ext.getCmp('viewport').add(topToolbar);
	Ext.getCmp('viewport').add(controlTree);

	colStore.load();

	var reportersStore = Ext.create('Ext.data.JsonStore', {
		fields: [{
			name: 'userid',
			type: 'integer'
		},
		{
			name: 'loginname',
			type: 'string'
		},
		{
			name: 'title',
			type: 'string'
		},
		{
			name: 'realname',
			type: 'string'
		},
		{
			name: 'branch',
			type: 'string'
		}],
		proxy: {
			type: 'ajax',
			url: '/ts/index.php/user/view_reporters?access_mode=csr_financing/save',
			reader: {
				type: 'json',
				root: 'data'
			}
		}
	});
	reportersStore.load(function(records, operation, success) {
		defaultCycleItem = [{
			icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
			text: '只看自己',
		},
		{
			icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
			text: '管理客户',
		}];
		Ext.Array.forEach(records,
		function(record) {
			defaultCycleItem.push({
				text: record.get('realname'),
				icon: '/ts/misc/resources/icons/user_24.png'
			});
		});
		if (Ext.getCmp('CycleFSCChannel') != undefined) {
			Ext.getCmp('CycleFSCChannel').remove();
		}
		Ext.getCmp('proj_detail_list_topbar').add(Ext.create('Ext.button.Cycle', {
			showText: true,
			id: 'CycleFSCChannel',
			menu: {
				items: defaultCycleItem
			},
			changeHandler: function(cycleBtn, activeItem) {
				if (activeItem.text == '管理客户') {
					mode = 1;
					FSCChannel = 'null';
				} else if (activeItem.text == '只看自己') {
					mode = 0;
					FSCChannel = 'null';
				} else {
					mode = 0;
					FSCChannel = activeItem.text;
				}
				projDetailStore.setProxy({
					type: 'ajax',
					url: '/ts/index.php/relation/proj_detail?mode=' + mode + '&recentMode=' + recentMode + '&FSCChannel=' + encodeURI(FSCChannel) + '&PStart=' + PStart + '&PEnd=' + PEnd + '&lastFollow=' + encodeURI(lastFollow) + '&endMode=' + endMode,
					reader: {
						type: 'json',
						root: 'data',
						totalProperty: 'totalCount'
					},
					simpleSortMode: true,
					filterParam: 'query',
					encodeFilters: function(filters) {
						return filters[0].value;
					}
				});
				projDetailStore.load();
			}
		}));

	});
});