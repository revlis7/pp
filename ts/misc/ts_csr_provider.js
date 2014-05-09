Ext.require(['Ext.ux.form.SearchField']);

Ext.onReady(function() {

var corpStatDailyStore;
var checkResult;
		
var params=Ext.Object.fromQueryString(location.search.substring(1));
		
var storeBaseUrl= '/ts/index.php/csr_provider/view';
var mode=0;
var recentMode='null';
var catMode='all';
var FSCChannel='null';
var PStart='';
var PEnd='';
var lastFollow='';
	 
Ext.QuickTips.init();
var chCorpCatList=Ext.create('Ext.data.ArrayStore', {
	fields: ['id', 'text'],
	data: [
		['一般理财客户','一般理财客户'],
		['一般产品客户','一般产品客户'],
		['一般双向客户','一般双向客户'],
		['VIP客户','VIP客户']
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
		['其他','其他']
	]
});

var chCorpInvChtypeList=Ext.create('Ext.data.ArrayStore', {
	fields: ['id', 'text'],
	data: [
		['直销为主','直销为主'],
		['渠道为主','渠道为主'],
		['直销渠道并重','直销渠道并重']
	]
});
var csrProviderStore = Ext.create('Ext.data.JsonStore', {
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
                provider_list.down('component#status').update({count: csrProviderListStore.getTotalCount()});
			}
		}
});
var csrProviderFollowStore=Ext.create('Ext.data.JsonStore', {
	fields: [
		{name:'csr_provider_id',type:'integer'},
		{name:'csr_provider_FSC_follow_status',type:'string'},
		{name:'csr_provider_FSC_opp_and_prob',type:'string'},
		{name:'csr_provider_FSC_solution',type:'string'},
		{name:'csr_provider_follow_update_ts',type:'date',dateFormat:"Y-m-d H:i:s"	},
		{name:'csr_provider_follow_result',type:'string'}
	],
	proxy: {
		type: 'ajax',
		url: '/ts/index.php/csr_provider/follow_view',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

var csrProviderFollowStore=Ext.create('Ext.data.JsonStore', {
	fields: [
		{name:'csr_provider_id',type:'integer'},
		{name:'csr_provider_FSC_follow_status',type:'string'},
		{name:'csr_provider_FSC_opp_and_prob',type:'string'},
		{name:'csr_provider_FSC_solution',type:'string'},
		{name:'csr_provider_follow_update_ts',type:'date',dateFormat:"Y-m-d H:i:s"	},
        {name:'csr_provider_follow_result',type:'string'}
	],
	proxy: {
		type: 'ajax',
		url: '/ts/index.php/csr_provider/follow_view',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

var csrProviderFollowsStore=Ext.create('Ext.data.JsonStore', {
    pageSize : 100,
    remoteSort : true ,
	autoLoad:true,
    leadingBufferZone: 100,
    buffered: true,
//    sorters:[{property:'csr_provider_id',direction:'ASC'}],
    extraParams:{total:50000},
//    simpleSortMode:true,
	fields: [
		{name:'csr_provider_id',type:'integer'},
		{name:'csr_provider_FSC_follow_status',type:'string'},
		{name:'csr_provider_FSC_opp_and_prob',type:'string'},
		{name:'csr_provider_FSC_solution',type:'string'},
		{name:'csr_provider_follow_update_ts',type:'date',dateFormat:"Y-m-d H:i:s"	},
		{name:'id',type:'integer'},
		{name:'csr_provider_follow_creator',type:'string'},
		{name:'csr_provider_cat',type:'string'},
		{name:'csr_provider_name',type:'string'},
		{name:'csr_provider_contact1_name',type:'string'},
		{name:'csr_provider_contact1_phone',type:'string'},
        {name:'csr_provider_follow_result',type:'string'}
	],
	proxy: {
		type: 'ajax',
		url: '/ts/index.php/csr_provider/follows_view',
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
	}
});

var listControl=Ext.create('Ext.data.JsonStore', {
	fields: [
		{name:'csr_provider'  ,type:'boolean' },
		{name:'csr_channel'  ,type:'boolean' },
		{name:'csr_person'  ,type:'boolean' }
	],
	proxy: {
		type: 'ajax',
		url: '/ts/index.php/api/access_fields_csr',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});
		
var provider_list = Ext.create('Ext.grid.Panel', {
	id:'provider_list',
	store: csrProviderListStore,
	border:0,
	columnLines: true,
	//title: '渠道客户',
	verticalScroller : {
		xtype : 'paginggridscroller'
	} ,
	selModel: {
		pruneRemoved: false
	},
	features:[{
		ftype: 'grouping',
		hideGroupedHeader: false
	}],
	viewConfig: {
		trackOver: false
	},
	multiSelect: true,
	dockedItems:[{
		xtype:'toolbar',
		dock:'top',
		height:48,
		enableOverflow: true,
		padding:3,
		items:[
		{
			width: 400,
			fieldLabel: '查找',
			labelWidth: 50,
			xtype: 'searchfield',
			store: csrProviderListStore
		},'->',{
			xtype: 'component',
			itemId: 'status',
            tpl: '<span style="font-size:16px">客户数: <b>{count}</b>。</span>可搜索客户姓名，电话，电子邮箱，QQ号，所在城市。',
			style: 'margin-left:10px;margin-right:10px'
		}]
	},{
		xtype:'toolbar',
		id:'provider_list_topbar',
		dock:'top',
        height:48,
		items:[
		{
			xtype:'tbtext',
			text:'客户类别筛选：'
		},{
			xtype:'cycle',
			showText:true,
			menu:{
				items:[{
					icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
					text: '所有客户'
				},{
					icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
					text: '目标客户'
				},{
					icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
					text: '潜在客户'
				},{
					icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
					text: '意向客户'
				},{
					icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
					text: '成交客户'
				},{
					icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
					text: '未标明客户类别的客户'
				}]
			},
			changeHandler: function(cycleBtn, activeItem) {
				if(activeItem.text=='目标客户') {
					catMode='lv1';
				} else if(activeItem.text=='潜在客户') {
					catMode='lv2';
				} else if(activeItem.text=='意向客户') {
					catMode='lv3';
				} else if(activeItem.text=='成交客户') {
					catMode='lv4';
				} else if(activeItem.text=='未标明客户类别的客户') {
					catMode='lv0';
				} else if(activeItem.text=='所有客户') {
					catMode='all';
				}
				csrProviderListStore.setProxy({
					type: 'ajax',
					url: '/ts/index.php/csr_provider/view?mode='+mode+'&recentMode='+recentMode+'&catMode='+catMode+'&FSCChannel='+encodeURI(FSCChannel)+'&PStart='+PStart+'&PEnd='+PEnd+'&lastFollow='+encodeURI(lastFollow),
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
		},{
			xtype:'tbtext',
			text:'跟进结果筛选：'
		},{
			xtype:'cycle',
			showText:true,
			menu:{
				items:[{
					icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
					text: '所有跟进结果'
				},{
					icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
					text: '还未跟进'
				},{
					icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
					text: '实施面谈'
				},{
					icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
					text: '成功约见'
				},{
					icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
					text: '接通但未约见'
				},{
					icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
					text: '仅成功接通'
				},{
					icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
					text: '未找到人'
				},{
					icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
					text: '接通但人很忙'
				},{
					icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
					text: '无人接听'
				},{
					icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
					text: '小秘书'
				},{
					icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
					text: '挂断'
				},{
					icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
					text: '放弃'
				}]
			},
			changeHandler: function(cycleBtn, activeItem) {
				if(activeItem.text=='所有跟进结果') {
					lastFollow='';
                } else if(activeItem.text=='还未跟进'){
                    lastFollow='not_follow';
                } else {
                    lastFollow=activeItem.text;
				}
				csrProviderListStore.setProxy({
					type: 'ajax',
					url: '/ts/index.php/csr_provider/view?mode='+mode+'&recentMode='+recentMode+'&catMode='+catMode+'&FSCChannel='+encodeURI(FSCChannel)+'&PStart='+PStart+'&PEnd='+PEnd+'&lastFollow='+encodeURI(lastFollow),
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
		},{
			xtype:'tbtext',
			text:'跟进时间筛选：'
		},{
			xtype:'cycle',
			showText:true,
			menu:{
				items: [
				// these will render as dropdown menu items when the arrow is clicked:
				{
					icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
					text: '所有记录'
				},{
					icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
					text: '最近7天跟进'
				},{
					icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
					text: '最近30天跟进'
				},{
					icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
					text: '最近7天未跟进'
				},{
					icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
					text: '最近30天未跟进'
				},{
					icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
					text: '没有跟进记录'
				},{
					icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
					text: '高级'
				}]
			},
			changeHandler: function(cycleBtn, activeItem) {
				if(activeItem.text!='高级'){
					var PStartChoose = Ext.getCmp('PStartChoose')
					if(PStartChoose!=undefined){
						PStartChoose.hide();
						PStartChoose.reset();
						PStart='';
					}
					var PEndChoose = Ext.getCmp('PEndChoose')
					if(PEndChoose!=undefined){
						PEndChoose.hide();
						PEndChoose.reset();
						PEnd='';
					}
					if(activeItem.text=='所有记录') {
						recentMode='null';
					} else if(activeItem.text=='最近7天跟进') {
						recentMode='lt7';
					} else if(activeItem.text=='最近7天未跟进') {
						recentMode='gt7';
					} else if(activeItem.text=='最近30天跟进') {
						recentMode='lt30';
					} else if(activeItem.text=='最近30天未跟进') {
						recentMode='gt30';
					} else if(activeItem.text=='没有跟进记录') {
						recentMode='nofollow';
					}
					csrProviderListStore.setProxy({
						type: 'ajax',
						url: '/ts/index.php/csr_provider/view?mode='+mode+'&recentMode='+recentMode+'&catMode='+catMode+'&FSCChannel='+encodeURI(FSCChannel)+'&PStart='+PStart+'&PEnd='+PEnd+'&lastFollow='+encodeURI(lastFollow),
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
					PStart='';
					Ext.getCmp('PEndChoose').show();
					Ext.getCmp('PEndChoose').reset();
					PEnd='';
				}
			}
		},{
			id:'PStartChoose',
			hidden:true,
			xtype: 'datefield',
			width:120,
			name: 'PStart',
			maxValue: new Date(),
			format:'Y-m-d',
			listeners:{
				change:function(me, newValue, oldValue){
					PStart=(( newValue.getYear() < 1900 ) ? ( 1900 + newValue.getYear() ) : newValue.getYear())+"-"+(newValue.getMonth()+1)+"-"+newValue.getDate();
					if(PStart!='' && PEnd!=''){
						csrProviderListStore.setProxy({
							type: 'ajax',
							url: '/ts/index.php/csr_provider/view?mode='+mode+'&recentMode='+recentMode+'&catMode='+catMode+'&FSCChannel='+encodeURI(FSCChannel)+'&PStart='+PStart+'&PEnd='+PEnd+'&lastFollow='+encodeURI(lastFollow),
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
		},{
			xtype:'tbtext',
			text:' - '
		},{
			id:'PEndChoose',
			hidden:true,
			xtype: 'datefield',
			width:120,
			name: 'PEnd',
			maxValue: new Date(),
			format:'Y-m-d',
			listeners:{
				change:function(me, newValue, oldValue){
					PEnd=(( newValue.getYear() < 1900 ) ? ( 1900 + newValue.getYear() ) : newValue.getYear())+"-"+(newValue.getMonth()+1)+"-"+newValue.getDate();
					if(PStart!='' && PEnd!=''){
						csrProviderListStore.setProxy({
							type: 'ajax',
							url: '/ts/index.php/csr_provider/view?mode='+mode+'&recentMode='+recentMode+'&catMode='+catMode+'&FSCChannel='+encodeURI(FSCChannel)+'&PStart='+PStart+'&PEnd='+PEnd+'&lastFollow='+encodeURI(lastFollow),
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
		},'->',{
			xtype:'tbtext',
			text:'责任人：'
		}]
	}],
	columns: [
	{
		xtype: 'actioncolumn',
		width:80,
		style: "text-align:center;",
		align: 'center',
		sortable: false,
		stopSelection:false,
		items: [{
			icon: '/ts/misc/resources/icons/cog_16.png',
			tooltip: '编辑此条记录',
			handler: function(grid, rowIndex, colIndex) {
				//sampleStore.removeAt(rowIndex);
				var temp_csr_provider_id=grid.getStore().getAt(rowIndex).get("csr_provider_id");
				this.up('panel').up('panel').getLayout().setActiveItem(1);
				csrProviderStore.setProxy({
					type: 'ajax',
					url: '/ts/index.php/csr_provider/get?csr_provider_id='+temp_csr_provider_id,
					reader: {
						type: 'json',
						root: 'data'
					}
				});
				csrProviderFollowStore.setProxy({
					type: 'ajax',
					url: '/ts/index.php/csr_provider/follow_view?csr_provider_id='+temp_csr_provider_id,
					reader: {
						type: 'json',
						root: 'data'
					}
				});
				csrProviderStore.load(function(records, operation, success) {
					infoForm.getForm().loadRecord(records[0]);
				});
				followpanel.down('form').down('hiddenfield[name="csr_provider_id"]').setValue(temp_csr_provider_id);
				csrProviderFollowStore.load();
				//this.up('panel').up('panel').getLayout().setActiveItem(1);
			}
		}]
	},/*{
			xtype: 'actioncolumn',
			width:40,style: "text-align:center;",align: 'center',
			sortable: false,
			items: [{
				icon: '/ts/misc/resources/icons/document_alt_stroke_24.png',
				tooltip: '跟进登记',
				handler: function(grid, rowIndex, colIndex) {
					//sampleStore.removeAt(rowIndex);
					//csrProviderEditWin.down('form').getForm().loadRecord(grid.getStore().getAt(rowIndex));
										var temp_csr_channel_id=grid.getStore().getAt(rowIndex).get("csr_channel_id");
										csrChannelFollowWin.down('form').down('hiddenfield[name="csr_channel_id"]').setValue(temp_csr_channel_id);
					csrChannelFollowStore.setProxy({
						type: 'ajax',
						url: '/ts/index.php/csr_channel/follow_view?csr_channel_id='+temp_csr_channel_id,
						reader: {
							type: 'json',
							root: 'data'
						}
					});
										csrChannelFollowStore.load();
										Ext.getBody().mask();
					csrChannelFollowWin.show();
				}
			}]
		},*/
	{dataIndex:'csr_provider_cat'             ,text:'客户类别', filtable:true, style: "text-align:center;",align: 'center',width:120},
        {dataIndex:''             ,text:'大区', filtable:true, style: "text-align:center;",align: 'center',width:80},
		{dataIndex:'csr_provider_name'            ,text:'公司名称', filtable:true, style: "text-align:center;",align: 'center',width:180},
		{dataIndex:'csr_provider_industry'            ,text:'公司行业', filtable:true, style: "text-align:center;",align: 'center',width:120},
        {dataIndex:'csr_provider_web'             ,text:'公司网址', filtable:true, style: "text-align:center;",align: 'center',width:210,
         renderer:function(value,metaData,record,colIndex,store,view) {
             if(value.indexOf('http://')>0){
             	return '<a href=\''+value+'\' target=\'_blank\'>'+value+'</a>';
                } else {
                return '<a href=\'http://'+value+'\' target=\'_blank\'>'+value+'</a>';
                }
         }
        },
		{dataIndex:'csr_provider_contact1_name'   ,text:'联系人1姓名', filtable:true, style: "text-align:center;",align: 'center',width:120},
		{dataIndex:'csr_provider_contact1_title'  ,text:'联系人1职位', filtable:true, style: "text-align:center;",align: 'center',width:120},
		{dataIndex:'csr_provider_contact1_phone'  ,text:'联系人1电话', filtable:true, style: "text-align:center;",align: 'center',width:120},
		{dataIndex:'csr_provider_contact1_email'  ,text:'联系人1邮箱', filtable:true, style: "text-align:center;",align: 'center',width:200},
        {dataIndex:'csr_provider_FSC_channel'     ,text:'渠道部负责人', filtable:true, style: "text-align:center;",align: 'center',width:90,hidden:true},
		{dataIndex:'csr_provider_FSC_pdt'         ,text:'产品部负责人', filtable:true, style: "text-align:center;",align: 'center',width:90,hidden:true},
    	{dataIndex:'csr_provider_follow_creator',text:'最后跟进人', filtable:true, style: "text-align:center;",align: 'center',width:90,hidden:true},
    	{dataIndex:'csr_provider_follow_update_ts',text:'最后跟进时间', filtable:true, style: "text-align:center;",align: 'center',width:90,hidden:true,renderer:new Ext.util.Format.dateRenderer("Y-m-d")},
    	{dataIndex:'csr_provider_creator',text:'创建人', filtable:true, style: "text-align:center;",align: 'center',width:90,hidden:true},
    	{dataIndex:'csr_provider_create_ts',text:'创建时间', filtable:true, style: "text-align:center;",align: 'center',width:90,hidden:true,renderer:new Ext.util.Format.dateRenderer("Y-m-d")},
    	{dataIndex:'csr_provider_editor',text:'用户资料更新人', filtable:true, style: "text-align:center;",align: 'center',width:90,hidden:true},
    	{dataIndex:'csr_provider_update_ts',text:'用户资料更新时间', filtable:true, style: "text-align:center;",align: 'center',width:90,hidden:true,renderer:new Ext.util.Format.dateRenderer("Y-m-d")}
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

provider_list.on({
		celldblclick:function(grid,td,cellIndex,record,tr,rowIndex){
		//sampleStore.removeAt(rowIndex);
				var temp_csr_provider_id=grid.getStore().getAt(rowIndex).get("csr_provider_id");
				provider_list.up('panel').getLayout().setActiveItem(1);
		csrProviderStore.setProxy({
			type: 'ajax',
			url: '/ts/index.php/csr_provider/get?csr_provider_id='+temp_csr_provider_id,
			reader: {
				type: 'json',
				root: 'data'
			}
		});
		csrProviderFollowStore.setProxy({
			type: 'ajax',
			url: '/ts/index.php/csr_provider/follow_view?csr_provider_id='+temp_csr_provider_id,
			reader: {
				type: 'json',
				root: 'data'
			}
		});
				csrProviderStore.load(function(records, operation, success) {
						infoForm.getForm().loadRecord(records[0]);
				});
				followpanel.down('form').down('hiddenfield[name="csr_provider_id"]').setValue(temp_csr_provider_id);
				csrProviderFollowStore.load();
				//this.up('panel').up('panel').getLayout().setActiveItem(1);
		}
});
	var infoForm=Ext.create('Ext.form.Panel', {
		id:"infoForm",
		xtype:"form",
		width:350,
		//height:500,
		//margin:'10 0 0 0',
				//padding:'10 0 0 0',
		autoScroll:true,
				//flex:1,
		//hidden:true,
		//collapsible:true,
		//collapseDirection : 'left',
		//collapsed : true,
		//title:'额度信息编辑',
		trackResetOnLoad:true,
		border:0,
		waitTitle:"Pleas wait...",
		layout:{
			type:'vbox',
			align: 'stretch',
			defaultMargins: 5
		},
		fieldDefaults:{
			//lableWidth:120,
			//width:440,
			allowBlank: true,
			labelAlign:'right'
		},
		dockedItems: [{
			dock: 'bottom',
			xtype: 'toolbar',
			scale:'medium',
						border:0,
			bodyPadding: 5,
			items: [{xtype:'box',flex:1},{
				icon:'/ts/misc/resources/icons/x_24.png',
				text: '重置',
				scale:'medium',
				handler: function(){
					this.up('form').getForm().reset(true);
				}
			},{
				icon:'/ts/misc/resources/icons/check_24.png',
				text: '确认',
				scale:'medium',
				formBind: true, //only enabled once the form is valid
				disabled: true,
				handler: function() {
					this.up('form').getForm().submit({
						url: '/ts/index.php/csr_provider/save',
						submitEmptyText: false,
						waitMsg: 'Saving Data...',
						success: function(form, action) {
							//csrChannelEditWin.hide();
							//csrChannelStore.load();
							Ext.Msg.alert('alert', '保存成功！');
						}
						//,
						//failure: function(form, action) {
						//  Ext.Msg.alert('alert', '保存失败。如有问题请联系管理员。');
						//}
					});
				}
			},{xtype:'box',flex:1}]
		}],
		items:[
		{xtype:'hiddenfield',name:'csr_provider_id'},
		{
			xtype:'fieldset',
			title: '====<b>类别</b>====',
			border:0,
			layout: {
				type: 'vbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			items:[
			{xtype:'combo',queryMode:'local',store:chCorpCatList,valueField:'id',displayField:'text',forceSelection:true,name:'csr_provider_cat'             ,fieldLabel:'客户类别'},
			{xtype:'textfield',name:'csr_provider_cat_reason'      ,fieldLabel:'客户类别<br />评判理由'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>公司基本信息</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
			{xtype:'textfield',name:'csr_provider_name'            ,fieldLabel:'公司名称'},
			{xtype:'textfield',name:'csr_provider_bname'           ,fieldLabel:'公司简称'},
			{xtype:'textfield',name:'csr_provider_industry'            ,fieldLabel:'公司所属行业'},
			{xtype:'textfield',name:'csr_provider_addr_reg'        ,fieldLabel:'公司注册地址'},
			{xtype:'textfield',name:'csr_provider_addr_main'       ,fieldLabel:'公司主要<br />办公地址'},
			{xtype:'textfield',name:'csr_provider_regcpt'          ,fieldLabel:'公司注册资本'},
			{xtype:'textfield',name:'csr_provider_biz'             ,fieldLabel:'公司主营业务'},
			{xtype:'textfield',name:'csr_provider_web'             ,fieldLabel:'公司网址'},
			{xtype:'textareafield',name:'csr_provider_plusinfo'        ,fieldLabel:'公司其他<br />主要信息'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>公司人员信息</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
			{xtype:'textareafield',name:'csr_provider_director'        ,fieldLabel:'公司主要股东<br />及其主要履历'},
			{xtype:'textareafield',name:'csr_provider_legalperson'     ,fieldLabel:'公司法人<br />及主要履历'},
			{xtype:'textareafield',name:'csr_provider_CEO'             ,fieldLabel:'公司总经理<br />及主要履历'},
			{xtype:'textareafield',name:'csr_provider_manager'         ,fieldLabel:'公司主要高管<br />及主要履历'},
			{
			xtype:'fieldset',
			title: '====<b>联系人1</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
				{xtype:'textfield',name:'csr_provider_contact1_name'   ,fieldLabel:'联系人1姓名'},
				{xtype:'textfield',name:'csr_provider_contact1_title'  ,fieldLabel:'联系人1职位'},
				{xtype:'textfield',name:'csr_provider_contact1_phone'  ,fieldLabel:'联系人1电话'},
				{xtype:'textfield',name:'csr_provider_contact1_email'  ,fieldLabel:'联系人1邮箱'},
				{xtype:'textareafield',name:'csr_provider_contact1_CV'     ,fieldLabel:'联系人1<br />主要履历'}
				]
			},{
			xtype:'fieldset',
			title: '====<b>联系人2</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
				{xtype:'textfield',name:'csr_provider_contact2_name'   ,fieldLabel:'联系人2姓名'},
				{xtype:'textfield',name:'csr_provider_contact2_title'  ,fieldLabel:'联系人2职位'},
				{xtype:'textfield',name:'csr_provider_contact2_phone'  ,fieldLabel:'联系人2电话'},
				{xtype:'textfield',name:'csr_provider_contact2_email'  ,fieldLabel:'联系人2邮箱'},
				{xtype:'textareafield',name:'csr_provider_contact2_CV'     ,fieldLabel:'联系人2<br />主要履历'}
				]
			},{
			xtype:'fieldset',
			title: '====<b>联系人3</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
				{xtype:'textfield',name:'csr_provider_contact3_name'   ,fieldLabel:'联系人3姓名'},
				{xtype:'textfield',name:'csr_provider_contact3_title'  ,fieldLabel:'联系人3职位'},
				{xtype:'textfield',name:'csr_provider_contact3_phone'  ,fieldLabel:'联系人3电话'},
				{xtype:'textfield',name:'csr_provider_contact3_email'  ,fieldLabel:'联系人3邮箱'},
				{xtype:'textareafield',name:'csr_provider_contact3_CV'     ,fieldLabel:'联系人3<br />主要履历'}
				]
			},{
			xtype:'fieldset',
			title: '====<b>联系人4</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
				{xtype:'textfield',name:'csr_provider_contact4_name'   ,fieldLabel:'联系人4姓名'},
				{xtype:'textfield',name:'csr_provider_contact4_title'  ,fieldLabel:'联系人4职位'},
				{xtype:'textfield',name:'csr_provider_contact4_phone'  ,fieldLabel:'联系人4电话'},
				{xtype:'textfield',name:'csr_provider_contact4_email'  ,fieldLabel:'联系人4邮箱'},
				{xtype:'textareafield',name:'csr_provider_contact4_CV'     ,fieldLabel:'联系人4<br />主要履历'}
				]
			},{
			xtype:'fieldset',
			title: '====<b>联系人5</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
				{xtype:'textfield',name:'csr_provider_contact5_name'   ,fieldLabel:'联系人5姓名'},
				{xtype:'textfield',name:'csr_provider_contact5_title'  ,fieldLabel:'联系人5职位'},
				{xtype:'textfield',name:'csr_provider_contact5_phone'  ,fieldLabel:'联系人5电话'},
				{xtype:'textfield',name:'csr_provider_contact5_email'  ,fieldLabel:'联系人5邮箱'},
				{xtype:'textareafield',name:'csr_provider_contact5_CV'     ,fieldLabel:'联系人5<br />主要履历'}
				]
			}]
		}/*,{
			xtype:'fieldset',
			title: '====<b>理财团队</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
			{xtype:'textfield',name:'csr_provider_yearly_amount'   ,fieldLabel:'公司最近<br />年度募资额'},
			{xtype:'numberfield',name:'csr_provider_FP_no'           ,fieldLabel:'公司理财师<br />人数'},
			{xtype:'numberfield',name:'csr_provider_branch_no'       ,fieldLabel:'公司分公司<br />个数'},
			{xtype:'combo',queryMode:'local',store:chCorpBizStyleList,valueField:'id',displayField:'text',forceSelection:true,name:'csr_provider_biz_style',fieldLabel:'公司销售风格'},
			{xtype:'textfield',name:'csr_provider_biz_dir_percent' ,fieldLabel:'公司直销<br />占销售额比例'},
			{xtype:'textfield',name:'csr_provider_biz_type'        ,fieldLabel:'公司主销<br />产品类别'},
			{xtype:'textfield',name:'csr_provider_biz_partner'     ,fieldLabel:'公司主要金融<br />机构合作伙伴'},
			{xtype:'textareafield',name:'csr_provider_biz_plusinfo'    ,fieldLabel:'公司理财业务<br />其他情况'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>投行团队</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
			{xtype:'textfield',name:'csr_provider_yearly_issue'    ,fieldLabel:'公司最近年度<br />发行额'},
			{xtype:'numberfield',name:'csr_provider_IP_no'           ,fieldLabel:'公司投行团队<br />人数'},
			{xtype:'combo',queryMode:'local',store:chCorpInvStyleList,valueField:'id',displayField:'text',forceSelection:true,name:'csr_provider_inv_style'       ,fieldLabel:'公司投行发行<br />风格'},
			{xtype:'combo',queryMode:'local',store:chCorpInvChtypeList,valueField:'id',displayField:'text',forceSelection:true,name:'csr_provider_inv_chtype'      ,fieldLabel:'公司投行发行<br />渠道'},
			{xtype:'textareafield',name:'csr_provider_inv_case'        ,fieldLabel:'公司投行业务<br />成功案例'},
			{xtype:'textareafield',name:'csr_provider_inv_plusinfo'    ,fieldLabel:'公司投行业务<br />其他情况'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>合作信息</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
			{xtype:'textfield',name:'csr_provider_coop_partner'    ,fieldLabel:'目前主要合作<br />竞争方'},
			{xtype:'textfield',name:'csr_provider_coop_FSC_dir'    ,fieldLabel:'与我司<br />合作方向'},
			{xtype:'textfield',name:'csr_provider_coop_FSC_wish'   ,fieldLabel:'与我司<br />合作意愿'},
			{xtype:'textfield',name:'csr_provider_follow'          ,fieldLabel:'后续跟进策略'},
			{xtype:'textfield',name:'csr_provider_FSC_channel'     ,fieldLabel:'我司渠道部<br />负责人'},
			{xtype:'textfield',name:'csr_provider_FSC_pdt'         ,fieldLabel:'我司产品部<br />负责人'}
			]
		}*/]
	});
		
var followpanel=Ext.create('Ext.panel.Panel',{
		//xtype:'panel',
		flex:1,
	resizeable:false,
	//closeAction:"hide",
	//closable:true,
	//title:'个人客户跟踪',
	titleAlign:'center',
				border:0,
	layout:{
		type:'vbox',
		//defaultMargins: {top: 0, right: 5, bottom: 0, left: 5},
				align:'stretch'
	},
	items:[
	{
		xtype:"form",
				id:'addFollowForm',
		width:850,
		autoScroll :true,
		border:0,
		waitTitle:"Pleas wait...",
				trackResetOnLoad:true,
		layout:{
			type:'vbox',
			align: 'stretch',
			defaultMargins: {top: 0, right: 5, bottom: 0, left: 5}
		},
		fieldDefaults:{
			//lableWidth:50,
			//width:540,
			allowBlank: true,
			labelAlign:'right'
		},
				dockedItems: [{
			dock: 'bottom',
			xtype: 'toolbar',
			scale:'medium',
						border:0,
			bodyPadding: 5,
			items: [{xtype:'box',flex:1},{
				icon:'/ts/misc/resources/icons/x_24.png',
				text: '重置',
				scale:'medium',
				handler: function(){
					this.up('form').getForm().reset(true);
				}
			},{
				icon:'/ts/misc/resources/icons/check_24.png',
				text: '确认',
				scale:'medium',
				formBind: true, //only enabled once the form is valid
				disabled: true,
				handler: function() {
					this.up('form').getForm().submit({
						url: '/ts/index.php/csr_provider/follow_update',
						submitEmptyText: false,
						waitMsg: 'Saving Data...',
						success: function(form, action) {
							//csrChannelFollowWin.hide();
							csrProviderFollowStore.load();
														Ext.getCmp('addFollowForm').getForm().reset();
														followpanel.down('form').down('hiddenfield[name="csr_provider_id"]').setValue(action.result.csr_provider_id);
									//csrProviderStore.load();
						}
						//,
						//failure: function(form, action) {
						//  Ext.Msg.alert('alert', '保存失败。如有问题请联系管理员。');
						//}
					});
				}
			},{xtype:'box',flex:1}]
		}],
		items:[
						{
			xtype:'fieldset',
			title: '====<b>新增跟进消息</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
		{xtype:'hiddenfield',name:'csr_provider_id'},
		{xtype:'combo',name:'csr_provider_follow_result',queryMode : 'local',store : chFollowResult,valueField: 'id',displayField: 'text',forceSelection:true,fieldLabel:'跟进结果',allowBlank:false},
		{xtype:'textareafield',name:'csr_provider_FSC_follow_status',fieldLabel:'跟进状况',width:'90%',height:36},
		{xtype:'textareafield',name:'csr_provider_FSC_opp_and_prob',fieldLabel:'机会和问题',width:'90%',height:36},
		{xtype:'textareafield',name:'csr_provider_FSC_solution',fieldLabel:'解决方案',width:'90%',height:36}
		]
                        }]
	},{
		xtype:'grid',
				flex:1,
				border:0,
		store:csrProviderFollowStore,
		columns:[
			{text:'跟进时间',dataIndex:'csr_provider_follow_update_ts',filtable:true, style: "text-align:center;",align: 'center',width:100,renderer:new Ext.util.Format.dateRenderer("Y-m-d")},
			{text:'跟进结果',dataIndex:'csr_provider_follow_result',filtable:true, style: "text-align:center;",align: 'left',width:120},
			{text:'跟进状况',dataIndex:'csr_provider_FSC_follow_status',filtable:true, style: "text-align:center;",align: 'left',width:350,renderer: function(value, meta, record) {    
					return '<div style="white-space:normal;">' + value + '</div>';
				}  
			},
			{text:'机会和问题',dataIndex:'csr_provider_FSC_opp_and_prob',filtable:true, style: "text-align:center;",align: 'left',width:250,renderer: function(value, meta, record) {    
					return '<div style="white-space:normal;">' + value + '</div>';
				}  
			},
			{text:'解决方案',dataIndex:'csr_provider_FSC_solution',filtable:true, style: "text-align:center;",align: 'left',width:200,renderer: function(value, meta, record) {    
					return '<div style="white-space:normal;">' + value + '</div>';
				}  
			}
		]
	}]
});

var csrProviderEditPanel=Ext.create('Ext.panel.Panel',{
	autoScroll:true,
	region:'center',
	layout:'card',
	items:[
		provider_list,
	{
		xtype:'panel',
		id:'infoPanel',
		border:0,
		layout:{
			type:'hbox',
			align: 'stretch'
		},
		dockedItems:[{
			dock: 'top',
			xtype: 'toolbar',
			scale:'medium',
			border:0,
			bodyPadding: 5,
			items: [{
				icon:'/ts/misc/resources/icons/x_24.png',
				text: '返回客户列表',
				scale:'medium',
				handler: function(){
					Ext.getCmp('infoPanel').up('panel').getLayout().setActiveItem(0);
				}
			}]
		}],
		items:[
			infoForm ,
			followpanel
		]
	},{
		xtype:'tabpanel',
		border:1,
		padding:10,
        plain:true,
		items:[
		{
			title:'统 计 图 表',
			xtype:'panel',
			id:'follows_panel',
			layout:'border',
			padding:10
		},{
			title:'详 细 表 格',
			xtype:'panel',
            id:'follows_stat_grid'
		}]
	}]
});
		
		
var csrProviderNewWin=Ext.create('Ext.window.Window',{
	resizeable:false,
	closeAction:"hide",
	closable:false,
	title:'公司客户编辑',
	titleAlign:'center',
	autoScroll:true,
	layout:{
		type:'vbox',
		//defaultMargins: {top: 0, right: 5, bottom: 0, left: 5},
        align:'stretch'
	},
	width:920,
	items:[
	{
		xtype:"form",
		width:890,
		height:500,
		//margin:'10 0 0 0',
        //padding:'10 0 0 0',
		autoScroll:true,
		//hidden:true,
		//collapsible:true,
		//collapseDirection : 'left',
		//collapsed : true,
		//title:'额度信息编辑',
		border:0,
		waitTitle:"Pleas wait...",
		layout:{
			type:'vbox',
			align: 'stretch',
			defaultMargins: 5
		},
		fieldDefaults:{
			lableWidth:120,
			width:440,
			allowBlank: true,
			labelAlign:'right'
		},
		dockedItems: [{
			dock: 'bottom',
			xtype: 'toolbar',
			scale:'medium',
            border:0,
			bodyPadding: 5,
			items: [{xtype:'box',flex:1},{
				icon:'/ts/misc/resources/icons/x_24.png',
				text: '重置',
				scale:'medium',
				handler: function(){
					this.up('form').getForm().reset(true);
				}
			},{
				icon:'/ts/misc/resources/icons/check_24.png',
				text: '确认',
				scale:'medium',
				formBind: true, //only enabled once the form is valid
				disabled: true,
				handler: function() {
					this.up('form').getForm().submit({
						url: '/ts/index.php/csr_provider/save',
						submitEmptyText: false,
						waitMsg: 'Saving Data...',
						success: function(form, action) {
							csrProviderNewWin.hide();
							csrProviderListStore.load();
						}
						//,
						//failure: function(form, action) {
						//  Ext.Msg.alert('alert', '保存失败。如有问题请联系管理员。');
						//}
					});
				}
			},{
				icon:'/ts/misc/resources/icons/x_24.png',
				text: '取消',
				scale:'medium',
				handler: function(){
					this.up('form').getForm().reset(true);
					this.up('window').hide();
				}
			},{xtype:'box',flex:1}]
		}],
		items:[
		{xtype:'hiddenfield',name:'csr_provider_id'},
		{
			xtype:'fieldset',
			title: '====<b>类别</b>====',
			border:0,
			layout: {
				type: 'vbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			items:[
			{xtype:'combo',queryMode:'local',store:chCorpCatList,valueField:'id',displayField:'text',forceSelection:true,width:300,name:'csr_provider_cat'             ,fieldLabel:'客户类别'},
			{xtype:'textfield',name:'csr_provider_cat_reason'      ,fieldLabel:'客户类别评判理由'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>公司基本信息</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
                {xtype:'textfield',width:500,name:'csr_provider_name'            ,fieldLabel:'<b>公司名称(必填)</b>',allowBlank:false,blankText : '该项必须填写'},
			{xtype:'textfield',name:'csr_provider_bname'           ,fieldLabel:'<b>公司简称(必填)</b>',allowBlank:false,blankText : '该项必须填写'},
			{xtype:'textfield',width:300,name:'csr_provider_industry'            ,fieldLabel:'<b>公司所属行业(必填)</b>',allowBlank:false,blankText : '该项必须填写'},
			{xtype:'textfield',width:700,name:'csr_provider_addr_reg'        ,fieldLabel:'公司注册地址'},
			{xtype:'textfield',width:700,name:'csr_provider_addr_main'       ,fieldLabel:'<b>公司主要办公地址(必填)</b>',allowBlank:false,blankText : '该项必须填写'},
			{xtype:'textfield',name:'csr_provider_regcpt'          ,fieldLabel:'公司注册资本'},
			{xtype:'textfield',width:700,name:'csr_provider_biz'             ,fieldLabel:'公司主营业务'},
			{xtype:'textfield',name:'csr_provider_web'             ,fieldLabel:'<b>公司网址(必填)</b>',allowBlank:false},
			{xtype:'textareafield',width:700,name:'csr_provider_plusinfo'        ,fieldLabel:'公司其他主要信息'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>公司人员信息</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
			{xtype:'textareafield',width:700,name:'csr_provider_director'        ,fieldLabel:'公司主要股东及其主要履历'},
			{xtype:'textareafield',width:700,name:'csr_provider_legalperson'     ,fieldLabel:'公司法人及主要履历'},
			{xtype:'textareafield',width:700,name:'csr_provider_CEO'             ,fieldLabel:'公司总经理及主要履历'},
			{xtype:'textareafield',width:700,name:'csr_provider_manager'         ,fieldLabel:'公司主要高管及主要履历'},
			{
			xtype:'fieldset',
			title: '====<b>联系人1</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
				{xtype:'textfield',width:300,name:'csr_provider_contact1_name'   ,fieldLabel:'联系人1姓名'},
				{xtype:'textfield',name:'csr_provider_contact1_title'  ,fieldLabel:'联系人1职位'},
				{xtype:'textfield',name:'csr_provider_contact1_phone'  ,fieldLabel:'联系人1电话'},
				{xtype:'textfield',name:'csr_provider_contact1_email'  ,fieldLabel:'联系人1邮箱'},
				{xtype:'textareafield',width:700,name:'csr_provider_contact1_CV'     ,fieldLabel:'联系人1主要履历'}
				]
			},{
			xtype:'fieldset',
			title: '====<b>联系人2</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
				{xtype:'textfield',width:300,name:'csr_provider_contact2_name'   ,fieldLabel:'联系人2姓名'},
				{xtype:'textfield',name:'csr_provider_contact2_title'  ,fieldLabel:'联系人2职位'},
				{xtype:'textfield',name:'csr_provider_contact2_phone'  ,fieldLabel:'联系人2电话'},
				{xtype:'textfield',name:'csr_provider_contact2_email'  ,fieldLabel:'联系人2邮箱'},
				{xtype:'textareafield',width:700,name:'csr_provider_contact2_CV'     ,fieldLabel:'联系人2主要履历'}
				]
			},{
			xtype:'fieldset',
			title: '====<b>联系人3</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
				{xtype:'textfield',width:300,name:'csr_provider_contact3_name'   ,fieldLabel:'联系人3姓名'},
				{xtype:'textfield',name:'csr_provider_contact3_title'  ,fieldLabel:'联系人3职位'},
				{xtype:'textfield',name:'csr_provider_contact3_phone'  ,fieldLabel:'联系人3电话'},
				{xtype:'textfield',name:'csr_provider_contact3_email'  ,fieldLabel:'联系人3邮箱'},
				{xtype:'textareafield',width:700,name:'csr_provider_contact3_CV'     ,fieldLabel:'联系人3主要履历'}
				]
			},{
			xtype:'fieldset',
			title: '====<b>联系人4</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
				{xtype:'textfield',width:300,name:'csr_provider_contact4_name'   ,fieldLabel:'联系人4姓名'},
				{xtype:'textfield',name:'csr_provider_contact4_title'  ,fieldLabel:'联系人4职位'},
				{xtype:'textfield',name:'csr_provider_contact4_phone'  ,fieldLabel:'联系人4电话'},
				{xtype:'textfield',name:'csr_provider_contact4_email'  ,fieldLabel:'联系人4邮箱'},
				{xtype:'textareafield',width:700,name:'csr_provider_contact4_CV'     ,fieldLabel:'联系人4主要履历'}
				]
			},{
			xtype:'fieldset',
			title: '====<b>联系人5</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
				{xtype:'textfield',width:300,name:'csr_provider_contact5_name'   ,fieldLabel:'联系人5姓名'},
				{xtype:'textfield',name:'csr_provider_contact5_title'  ,fieldLabel:'联系人5职位'},
				{xtype:'textfield',name:'csr_provider_contact5_phone'  ,fieldLabel:'联系人5电话'},
				{xtype:'textfield',name:'csr_provider_contact5_email'  ,fieldLabel:'联系人5邮箱'},
				{xtype:'textareafield',width:700,name:'csr_provider_contact5_CV'     ,fieldLabel:'联系人5主要履历'}
				]
			}]
		}/*,{
			xtype:'fieldset',
			title: '====<b>理财团队</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
			{xtype:'textfield',name:'csr_provider_yearly_amount'   ,fieldLabel:'公司最近年度募资额'},
			{xtype:'numberfield',width:300,name:'csr_provider_FP_no'           ,fieldLabel:'公司理财师人数'},
			{xtype:'numberfield',width:300,name:'csr_provider_branch_no'       ,fieldLabel:'公司分公司个数'},
			{xtype:'combo',queryMode:'local',store:chCorpBizStyleList,valueField:'id',displayField:'text',forceSelection:true,name:'csr_provider_biz_style',fieldLabel:'公司销售风格'},
			{xtype:'textfield',name:'csr_provider_biz_dir_percent' ,fieldLabel:'公司直销占销售额比例'},
			{xtype:'textfield',name:'csr_provider_biz_type'        ,fieldLabel:'公司主销产品类别'},
			{xtype:'textfield',name:'csr_provider_biz_partner'     ,fieldLabel:'公司主要金融机构合作伙伴'},
			{xtype:'textareafield',width:700,name:'csr_provider_biz_plusinfo'    ,fieldLabel:'公司理财业务其他情况'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>投行团队</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
			{xtype:'textfield',name:'csr_provider_yearly_issue'    ,fieldLabel:'公司最近年度发行额'},
			{xtype:'numberfield',width:300,name:'csr_provider_IP_no'           ,fieldLabel:'公司投行团队人数'},
			{xtype:'combo',queryMode:'local',store:chCorpInvStyleList,valueField:'id',displayField:'text',forceSelection:true,name:'csr_provider_inv_style'       ,fieldLabel:'公司投行发行风格'},
			{xtype:'combo',queryMode:'local',store:chCorpInvChtypeList,valueField:'id',displayField:'text',forceSelection:true,width:500,name:'csr_provider_inv_chtype'      ,fieldLabel:'公司投行发行渠道'},
			{xtype:'textareafield',width:700,name:'csr_provider_inv_case'        ,fieldLabel:'公司投行业务的成功案例'},
			{xtype:'textareafield',width:700,name:'csr_provider_inv_plusinfo'    ,fieldLabel:'公司投行业务的其他情况'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>合作信息</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
			{xtype:'textfield',name:'csr_provider_coop_partner'    ,fieldLabel:'目前主要合作的竞争方'},
			{xtype:'textfield',name:'csr_provider_coop_FSC_dir'    ,fieldLabel:'与我司合作方向'},
			{xtype:'textfield',name:'csr_provider_coop_FSC_wish'   ,fieldLabel:'与我司合作意愿'},
			{xtype:'textfield',name:'csr_provider_follow'          ,fieldLabel:'后续跟进策略'},
			{xtype:'textfield',name:'csr_provider_FSC_channel'     ,fieldLabel:'我司渠道部负责人'},
			{xtype:'textfield',name:'csr_provider_FSC_pdt'         ,fieldLabel:'我司产品部负责人'}
			]
		}*/]
	}]
});

csrProviderNewWin.on({
	hide: function(){
			Ext.getBody().unmask();
	}
});


var topToolbar=Ext.create('Ext.toolbar.Toolbar',{
	region:'north',
	height: 48,
	id:'topMenu',
	border:0,
	margin:0,
	enableOverflow:true,
	items:[
	{
		xtype:'image',
		src:'/ts/misc/resources/firstshin.jpg',
		width:240,
		height:38
	},{
		xtype:'tbtext',
		id:'headerTitle',
		text:'<span class="app-header2">供应商客户列表</span>'
	},{
		xtype:'box',
		flex:1
	},{
		icon: '/ts/misc/resources/icons/message_add.png',
		scale:'medium',
		text:'新增' ,
		id:'BtnNewCorp',
		handler:function(){
			//todo
			corpForm=csrProviderNewWin.down('form');
			Ext.getBody().mask();
			csrProviderNewWin.show();
			corpForm.getForm().reset(true);
			corpForm.down('hiddenfield[name="csr_provider_id"]').setValue(-1);
		}
	},{
		icon: '/ts/misc/resources/icons/document_recommend_24.png',
		scale:'medium',
		text:'查看跟进统计' ,
		id:'BtnCorpView',
		handler:function(){
			Ext.getCmp('infoPanel').up('panel').getLayout().setActiveItem(2);
			Ext.getCmp('headerTitle').setText('<span class="app-header2">客户跟进统计</span>');
			Ext.getCmp('BtnCorpView').hide();
			Ext.getCmp('BtnFollowsView').show();
		}
	},{
		icon: '/ts/misc/resources/icons/document_recommend_24.png',
		scale:'medium',
		text:'查看客户列表' ,
		hidden:true,
		id:'BtnFollowsView',
		handler:function(){
			Ext.getCmp('infoPanel').up('panel').getLayout().setActiveItem(0);
			Ext.getCmp('headerTitle').setText('<span class="app-header2">供应商客户列表</span>');
			Ext.getCmp('BtnFollowsView').hide();
			Ext.getCmp('BtnCorpView').show();
		}
	}]
});
				
Ext.getCmp('viewport').add(csrProviderEditPanel);
Ext.getCmp('viewport').add(topToolbar);
Ext.getCmp('viewport').add(controlTree);
		

var reportersStore=Ext.create('Ext.data.JsonStore', {
	fields:[
		{name:'userid',type:'integer'},
		{name:'loginname',type:'string'},
		{name:'title',type:'string'},
		{name:'realname',type:'string'},
		{name:'branch',type:'string'}
	],
	proxy: {
		type: 'ajax',
		url: '/ts/index.php/user/view_reporters?access_mode=csr_provider/save',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

var attendingReportersStore=Ext.create('Ext.data.JsonStore', {
	fields:[
		{name:'userid',type:'integer'},
		{name:'loginname',type:'string'},
		{name:'title',type:'string'},
		{name:'realname',type:'string'},
		{name:'branch',type:'string'}
	],
	proxy: {
		type: 'ajax',
		url: '/ts/index.php/user/view_attending_reporters',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

var csrProviderFollowWin=Ext.create('Ext.window.Window',{
	resizeable:false,
	closeAction:"hide",
	closable:true,
	title:'供应商客户跟踪',
	titleAlign:'center',
	width:1020,
	height:600,
	layout:'fit',
	items:[
	{
		xtype:'grid',
		id:'follows_list',
		store: csrProviderFollowsStore,
		border:0,
		columnLines: true,
		//title: '渠道客户',
		verticalScroller : {
		xtype : 'paginggridscroller'
	} ,
	selModel: {
		pruneRemoved: false
	},
	features:[{
		ftype: 'grouping',
		hideGroupedHeader: false
	}],
	viewConfig: {
		trackOver: false
	},
	multiSelect: true,
	listeners:{
		celldblclick:function(grid,td,cellIndex,record,tr,rowIndex){
			//sampleStore.removeAt(rowIndex);
			var temp_csr_provider_id=grid.getStore().getAt(rowIndex).get("csr_provider_id");
			window.open('/ts/index.php/csr_provider?csr_provider_id='+temp_csr_provider_id);
		}
	},
	columns: [
		/*{
			xtype: 'actioncolumn',
			width:80,style: "text-align:center;",align: 'center',
			sortable: false,
			items: [{
				icon: '/ts/misc/resources/icons/cog_16.png',
				tooltip: '编辑此条记录',
				handler: function(grid, rowIndex, colIndex) {
					//sampleStore.removeAt(rowIndex);
					Ext.getCmp('infoForm').getForm().loadRecord(grid.getStore().getAt(rowIndex));
										var temp_csr_provider_id=grid.getStore().getAt(rowIndex).get("csr_provider_id");
										followpanel.down('form').down('hiddenfield[name="csr_provider_id"]').setValue(temp_csr_provider_id);
					csrProviderFollowStore.setProxy({
						type: 'ajax',
						url: '/ts/index.php/csr_provider/follow_view?csr_provider_id='+temp_csr_provider_id,
						reader: {
							type: 'json',
							root: 'data'
						}
					});
										csrProviderFollowStore.load();
										this.up('panel').up('panel').getLayout().setActiveItem(1);
				}
			}]
		},{
			xtype: 'actioncolumn',
			width:40,style: "text-align:center;",align: 'center',
			sortable: false,
			items: [{
				icon: '/ts/misc/resources/icons/document_alt_stroke_24.png',
				tooltip: '跟进登记',
				handler: function(grid, rowIndex, colIndex) {
					//sampleStore.removeAt(rowIndex);
					//csrProviderEditWin.down('form').getForm().loadRecord(grid.getStore().getAt(rowIndex));
										var temp_csr_channel_id=grid.getStore().getAt(rowIndex).get("csr_channel_id");
										csrChannelFollowWin.down('form').down('hiddenfield[name="csr_channel_id"]').setValue(temp_csr_channel_id);
					csrChannelFollowStore.setProxy({
						type: 'ajax',
						url: '/ts/index.php/csr_channel/follow_view?csr_channel_id='+temp_csr_channel_id,
						reader: {
							type: 'json',
							root: 'data'
						}
					});
										csrChannelFollowStore.load();
										Ext.getBody().mask();
					csrChannelFollowWin.show();
				}
			}]
		},*/
		{
			xtype: 'actioncolumn',
			width:60,style: "text-align:center;",align: 'center', 
			sortable: false,
			items: [{
				icon: '/ts/misc/resources/icons/magnifying_glass_16.png',
				tooltip: '查看该用户的详细信息',
				handler: function(grid, rowIndex, colIndex) {
					//e=Ext.getCmp('projPanel');
					//e.proj_id=grid.getStore().getAt(rowIndex).get("proj_id");
					//e.setTitle(grid.getStore().getAt(rowIndex).get("issue")+" "+grid.getStore().getAt(rowIndex).get("name"))
					//Ext.getCmp('topInfo').getLayout().setActiveItem(2);
					var temp_csr_provider_id=grid.getStore().getAt(rowIndex).get("csr_provider_id");
					window.open('/ts/index.php/csr_provider?csr_provider_id='+temp_csr_provider_id);
				}
			}]
		},
		{dataIndex:'csr_provider_cat',text:'客户类别', filtable:true, style: "text-align:center;",align: 'center',width:80},
		{dataIndex:'csr_provider_name',text:'姓名', filtable:true, style: "text-align:center;",align: 'center',width:80},
		{dataIndex:'csr_provider_follow_creator',text:'最后跟进人', filtable:true, style: "text-align:center;",align: 'center',width:120},
		{text:'跟进时间',dataIndex:'csr_provider_follow_update_ts',filtable:true, style: "text-align:center;",align: 'center',width:100,renderer:new Ext.util.Format.dateRenderer("Y-m-d")},
		{dataIndex:'csr_provider_follow_result',text:'跟进结果', filtable:true, style: "text-align:center;",align: 'center',width:120},
		{text:'跟进状况',dataIndex:'csr_provider_FSC_follow_status',filtable:true, style: "text-align:center;",align: 'left',width:350,renderer: function(value, meta, record) {    
				return '<div style="white-space:normal;">' + value + '</div>';
			}  
		},
		{text:'机会和问题',dataIndex:'csr_provider_FSC_opp_and_prob',filtable:true, style: "text-align:center;",align: 'left',width:250,renderer: function(value, meta, record) {    
				return '<div style="white-space:normal;">' + value + '</div>';
			}  
		},
		{text:'解决方案',dataIndex:'csr_provider_FSC_solution',filtable:true, style: "text-align:center;",align: 'left',width:200,renderer: function(value, meta, record) {    
				return '<div style="white-space:normal;">' + value + '</div>';
			}  
		}
	],
	viewConfig: {
		stripeRows: true,
		forceFit:true,
		sortAscText:'正序',
		sortDescText:'降序'
	},
	loadMask: true,
	emptyText: '没有匹配的记录'
}]
});
		
function checkFormChange(f,newValue){
	checkResult[f.innerCheckId][1]=newValue;
	if(typeof(FollowsMainChart)!='undefined'){
		FollowsMainChart.destroy();
	}
	dataArray=[];
	var n=0;
	for(i=0;i<checkResult.length;i++){
		if(checkResult[i][1]==true){
			dataArray.push(checkResult[i][0]);
			n++;
		}
	}
	endDate=new Date();
	if(n>5){
		EstFromDate=Ext.Date.add(endDate, Ext.Date.DAY, -7);
	} else if (n>3) {
		EstFromDate=Ext.Date.add(endDate, Ext.Date.DAY, -11);
	} else {
		EstFromDate=Ext.Date.add(endDate, Ext.Date.DAY, -16);
	}
	FollowsMainChart=Ext.create('Ext.chart.Chart', {
		//renderTo:Ext.getBody(),
		region:'center',
		style: 'background:#fff',
		animate: false,
		shadow: true,
		store: personStatDailyStore,
		legend: {
			position: 'right'  
		},
		axes: [{
			type: 'time',
			position: 'bottom',
			fields: ['sday'],
			title: '日期',
			constrain: true,
			dateFormat: 'M d',
			fromDate: EstFromDate,
			toDate: Ext.Date.add(endDate, Ext.Date.DAY, -1)
		},{
			type: 'Numeric',
			position: 'left',
			fields: dataArray,
			//minimum: 0,
			//maximum: 100,
			label: {
				renderer: Ext.util.Format.numberRenderer('0,0')
			},
			grid: true,
			title: '数量'
		}],
		series: [{
			type: 'column',
			axis: 'bottom',
			xField: ['sday'],
			yField: dataArray,
			label:{
				display: 'insideEnd',
				'text-anchor': 'middle',
				field: dataArray,
				renderer: Ext.util.Format.numberRenderer('0'),
				orientation: 'vertical',
				color: '#333'
			},
			tips: {
				trackMouse: true,
				width: 200,
				height: 52,
				renderer: function(storeItem, item) {
					//this.setTitle(storeItem.get('realname') + ' <br /> ' + storeItem.get('sday').toLocaleDateString() + ' 星期' + storeItem.get('sday').getDay() + ' <br /> 新增跟进数 ' + storeItem.get('no_follows') + ' 人');
					this.setTitle(item.yField + ' <br /> ' + item.value[0].toLocaleDateString() + ' 星期' + item.value[0].getDay() + ' <br /> 新增跟进数 ' + item.value[1] + ' 人');
				}
			},
			listeners:{
				'itemclick': function(a,b,c) {
					Ext.getBody().mask();
					//Ext.Msg.alert('测试','姓名: '+a.storeItem.data.realname+'<br />跟进客户数: '+a.storeItem.data.no_distfollows+'<br />跟进数: '+a.storeItem.data.no_follows+'<br />日期: '+a.storeItem.data.sday.toLocaleDateString());
					csrProviderFollowsStore.setProxy({
						type: 'ajax',
						url: '/ts/index.php/csr_provider/follows_view?s_username='+encodeURI(a.yField)+'&s_day='+ (( a.value[0].getYear() < 1900 ) ? ( 1900 + a.value[0].getYear() ) : a.value[0].getYear())+"-"+(a.value[0].getMonth()+1)+"-"+a.value[0].getDate()+'&s_mode=day',
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
					csrProviderFollowsStore.load();
					csrProviderFollowWin.show();
				}
			}
		}]
	});
	Ext.getCmp('follows_panel').add(FollowsMainChart);
}

reportersStore.load(function(records, operation, success) {
		NJCheckFormFields=[];
		SHCheckFormFields=[];
		ChannelCheckFormFields=[];
		OtherCheckFormFields=[];
		checkResult=[];
		personStatDailyFields=[{
				name:'sday'    ,type:'date' ,dateFormat:"Y-m-d"	
		}];
		
		
		defaultCycleItem=[{
            icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
			text: '只看自己',
		},{
            icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
			text: '管理客户',
		}];
		
		Ext.Array.forEach(records,function(record){
				defaultCycleItem.push({
						text:record.get('realname'),
						icon:'/ts/misc/resources/icons/user_24.png'
				});
		});

		if(Ext.getCmp('CycleFSCChannel')!=undefined){
			Ext.getCmp('CycleFSCChannel').remove();
		}
		Ext.getCmp('provider_list_topbar').add(Ext.create('Ext.button.Cycle',{
				showText:true,
				id:'CycleFSCChannel',
				menu:{
				items:defaultCycleItem
			},
			changeHandler: function(cycleBtn, activeItem) {
				if(activeItem.text=='管理客户') {
					mode=1;
					FSCChannel='null';
				} else if(activeItem.text=='只看自己') {
					mode=0;
					FSCChannel='null';
				} else {
					mode=0;
					FSCChannel=activeItem.text;
				}
				csrProviderListStore.setProxy({
					type: 'ajax',
					url:'/ts/index.php/csr_provider/view?mode='+mode+'&recentMode='+recentMode+'&catMode='+catMode+'&FSCChannel='+encodeURI(FSCChannel)+'&PStart='+PStart+'&PEnd='+PEnd+'&lastFollow='+encodeURI(lastFollow),
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
		}));
		
attendingReportersStore.load(function(at_records, at_operation, at_success) {
		Ext.Array.forEach(records,function(record){
				if(record.get("branch")=="南京财富中心"){
						var t=0;
						Ext.Array.forEach(at_records,function(at_record){
								if(at_record.get("loginname") == record.get('loginname')){
								NJCheckFormFields.push({
								boxLabel  : record.get('realname'),
								name      : record.get('realname'),
										loginname : record.get("loginname"),
								inputValue: false,
												checked	  : true,
								innerCheckId:reportersStore.indexOf(record),
								listeners:{
										change:checkFormChange
								}
						});
								checkResult[reportersStore.indexOf(record)]=[record.get('realname'),true];
										t=1;
							}
						});
						if(t==0){
							NJCheckFormFields.push({
							boxLabel  : record.get('realname'),
							name      : record.get('realname'),
									loginname : record.get("loginname"),
							inputValue: false,
										checked	  : false,
							innerCheckId:reportersStore.indexOf(record),
							listeners:{
									change:checkFormChange
							}
					});
							checkResult[reportersStore.indexOf(record)]=[record.get('realname'),false];
						}
						personStatDailyFields.push({name:unescape(record.get('realname')) ,type:'integer' });
				}
		});
		Ext.Array.forEach(records,function(record){
				if(record.get("branch")=="上海财富中心"){
						var t=0;
						Ext.Array.forEach(at_records,function(at_record){
								if(at_record.get("loginname") == record.get('loginname')){
								SHCheckFormFields.push({
								boxLabel  : record.get('realname'),
								name      : record.get('realname'),
										loginname : record.get("loginname"),
								inputValue: false,
												checked	  : true,
								innerCheckId:reportersStore.indexOf(record),
								listeners:{
										change:checkFormChange
								}
						});
								checkResult[reportersStore.indexOf(record)]=[record.get('realname'),true];
										t=1;
							}
						});
						if(t==0){
							SHCheckFormFields.push({
							boxLabel  : record.get('realname'),
							name      : record.get('realname'),
									loginname : record.get("loginname"),
							inputValue: false,
										checked	  : false,
							innerCheckId:reportersStore.indexOf(record),
							listeners:{
									change:checkFormChange
							}
					});
							checkResult[reportersStore.indexOf(record)]=[record.get('realname'),false];
						}
						personStatDailyFields.push({name:unescape(record.get('realname')) ,type:'integer' });
				}
		});
		Ext.Array.forEach(records,function(record){
				if(record.get("branch")=="机构业务部"){
						var t=0;
						Ext.Array.forEach(at_records,function(at_record){
								if(at_record.get("loginname") == record.get('loginname')){
								ChannelCheckFormFields.push({
								boxLabel  : record.get('realname'),
								name      : record.get('realname'),
										loginname : record.get("loginname"),
								inputValue: false,
												checked	  : true,
								innerCheckId:reportersStore.indexOf(record),
								listeners:{
										change:checkFormChange
								}
						});
								checkResult[reportersStore.indexOf(record)]=[record.get('realname'),true];
										t=1;
							}
						});
						if(t==0){
							ChannelCheckFormFields.push({
							boxLabel  : record.get('realname'),
							name      : record.get('realname'),
									loginname : record.get("loginname"),
							inputValue: false,
										checked	  : false,
							innerCheckId:reportersStore.indexOf(record),
							listeners:{
									change:checkFormChange
							}
					});
							checkResult[reportersStore.indexOf(record)]=[record.get('realname'),false];
						}
						personStatDailyFields.push({name:unescape(record.get('realname')) ,type:'integer' });
				}
		});
		Ext.Array.forEach(records,function(record){
				if(record.get("branch")!="南京财富中心" && record.get("branch")!="上海财富中心" && record.get("branch")!="机构业务部"){
						var t=0;
						Ext.Array.forEach(at_records,function(at_record){
								if(at_record.get("loginname") == record.get('loginname')){
								OtherCheckFormFields.push({
								boxLabel  : record.get('realname'),
								name      : record.get('realname'),
										loginname : record.get("loginname"),
								inputValue: false,
												checked	  : true,
								innerCheckId:reportersStore.indexOf(record),
								listeners:{
										change:checkFormChange
								}
						});
								checkResult[reportersStore.indexOf(record)]=[record.get('realname'),true];
										t=1;
							}
						});
						if(t==0){
							OtherCheckFormFields.push({
							boxLabel  : record.get('realname'),
							name      : record.get('realname'),
									loginname : record.get("loginname"),
							inputValue: false,
										checked	  : false,
							innerCheckId:reportersStore.indexOf(record),
							listeners:{
									change:checkFormChange
							}
					});
							checkResult[reportersStore.indexOf(record)]=[record.get('realname'),false];
						}
						personStatDailyFields.push({name:unescape(record.get('realname')) ,type:'integer' });
				}
		});

		personStatDailyStore=Ext.create('Ext.data.JsonStore', {
			//autoLoad:true,
		fields: personStatDailyFields,
		proxy: {
			type: 'ajax',
			url: '/ts/index.php/csr_provider/get_daily_stats',
			reader: {
				type: 'json',
				root: 'data'
			}
		}
	});
		personStatDailyStore.load(function(records, operation, success) {
		if(NJCheckFormFields.length>0){
			var NJCheckForm = Ext.create('Ext.form.Panel', {
				region:'north',
				defaultType: 'checkboxfield',
						border:0,
						items:[{
						xtype: 'checkboxgroup',
						fieldLabel: '南京财富中心',
								vertical: true,
								columns: 6,
						items: NJCheckFormFields
						}],
						listeners:{
								added:function( el, container, pos, eOpts){
						if(NJCheckForm.down('checkboxgroup').down('checkbox[loginname="'+Ext.util.Cookies.get("loginname")+'"]') != null){
									NJCheckForm.down('checkboxgroup').down('checkbox[loginname="'+Ext.util.Cookies.get("loginname")+'"]').setValue(true);
						}
								}
						}
			});
		Ext.getCmp('follows_panel').add(NJCheckForm);
		}
		if(SHCheckFormFields.length>0){
			var SHCheckForm = Ext.create('Ext.form.Panel', {
				region:'north',
				defaultType: 'checkboxfield',
						border:0,
						items:[{
						xtype: 'checkboxgroup',
						fieldLabel: '上海财富中心',
								vertical: true,
								columns: 6,
						items: SHCheckFormFields
						}],
						listeners:{
								added:function( el, container, pos, eOpts){
						if(SHCheckForm.down('checkboxgroup').down('checkbox[loginname="'+Ext.util.Cookies.get("loginname")+'"]') != null){
										SHCheckForm.down('checkboxgroup').down('checkbox[loginname="'+Ext.util.Cookies.get("loginname")+'"]').setValue(true);
						}
								}
						}
			});
		Ext.getCmp('follows_panel').add(SHCheckForm);
		}
		if(ChannelCheckFormFields.length>0){
			var ChannelCheckForm = Ext.create('Ext.form.Panel', {
				region:'north',
				defaultType: 'checkboxfield',
						border:0,
						items:[{
						xtype: 'checkboxgroup',
						fieldLabel: '机构业务部',
								vertical: true,
								columns: 6,
						items: ChannelCheckFormFields
						}],
						listeners:{
								added:function( el, container, pos, eOpts){
						if(ChannelCheckForm.down('checkboxgroup').down('checkbox[loginname="'+Ext.util.Cookies.get("loginname")+'"]') != null){
										ChannelCheckForm.down('checkboxgroup').down('checkbox[loginname="'+Ext.util.Cookies.get("loginname")+'"]').setValue(true);
						}
								}
						}
			});
		Ext.getCmp('follows_panel').add(ChannelCheckForm);
		}
		if(OtherCheckFormFields.length>0){
			var OtherCheckForm = Ext.create('Ext.form.Panel', {
				region:'north',
				defaultType: 'checkboxfield',
						border:0,
						items:[{
						xtype: 'checkboxgroup',
						fieldLabel: '其他人员',
								vertical: true,
								columns: 6,
						items: OtherCheckFormFields
						}],
						listeners:{
								added:function( el, container, pos, eOpts){
						if(OtherCheckForm.down('checkboxgroup').down('checkbox[loginname="'+Ext.util.Cookies.get("loginname")+'"]') != null){
									OtherCheckForm.down('checkboxgroup').down('checkbox[loginname="'+Ext.util.Cookies.get("loginname")+'"]').setValue(true);
						}
								}
						}
			});
		Ext.getCmp('follows_panel').add(OtherCheckForm);
		}
		dataArray=[];
		var n=0;
		for(i=0;i<checkResult.length;i++){
				if(checkResult[i][1]==true){
						dataArray.push(checkResult[i][0]);
						n++;
				}
		}
		endDate=new Date();
		if(n>5){
				EstFromDate=Ext.Date.add(endDate, Ext.Date.DAY, -7);
		} else if (n>3) {
				EstFromDate=Ext.Date.add(endDate, Ext.Date.DAY, -11);
		} else {
				EstFromDate=Ext.Date.add(endDate, Ext.Date.DAY, -16);
		}
	FollowsMainChart=Ext.create('Ext.chart.Chart', {
			//renderTo:Ext.getBody(),
			region:'center',
			style: 'background:#fff',
			animate: false,
			shadow: true,
			store: personStatDailyStore,
			legend: {
				position: 'right'  
			},
			axes: [{
					type: 'time',
					position: 'bottom',
					fields: ['sday'],
					title: '日期',
					constrain: true,
					dateFormat: 'M d',
					fromDate: EstFromDate,
					toDate: Ext.Date.add(endDate, Ext.Date.DAY, -1)
			},{
					type: 'Numeric',
					position: 'left',
					fields: dataArray,
					//minimum: 0,
					//maximum: 100,
					label: {
							renderer: Ext.util.Format.numberRenderer('0,0')
					},
					grid: true,
					title: '数量'
			}],
			series: [{
					type: 'column',
					axis: 'bottom',
					xField: ['sday'],
					yField: dataArray,
					label:{
						display: 'insideEnd',
						'text-anchor': 'middle',
						field: dataArray,
						renderer: Ext.util.Format.numberRenderer('0'),
						orientation: 'vertical',
						color: '#333'
				},
					tips: {
							trackMouse: true,
							width: 200,
							height: 52,
							renderer: function(storeItem, item) {
									//this.setTitle(storeItem.get('realname') + ' <br /> ' + storeItem.get('sday').toLocaleDateString() + ' 星期' + storeItem.get('sday').getDay() + ' <br /> 新增跟进数 ' + storeItem.get('no_follows') + ' 人');
									this.setTitle(item.yField + ' <br /> ' + item.value[0].toLocaleDateString() + ' 星期' + item.value[0].getDay() + ' <br /> 新增跟进数 ' + item.value[1] + ' 人');
							}
					},
					listeners:{
							'itemclick': function(a,b,c) {
										Ext.getBody().mask();
									//Ext.Msg.alert('测试','姓名: '+a.storeItem.data.realname+'<br />跟进客户数: '+a.storeItem.data.no_distfollows+'<br />跟进数: '+a.storeItem.data.no_follows+'<br />日期: '+a.storeItem.data.sday.toLocaleDateString());
									csrProviderFollowsStore.setProxy({
						type: 'ajax',
											url: '/ts/index.php/csr_provider/follows_view?s_username='+encodeURI(a.yField)+'&s_day='+ (( a.value[0].getYear() < 1900 ) ? ( 1900 + a.value[0].getYear() ) : a.value[0].getYear())+"-"+(a.value[0].getMonth()+1)+"-"+a.value[0].getDate()+'&s_mode=day',
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
									csrProviderFollowsStore.load();
									csrProviderFollowWin.show();
							}
					}
			}]
	});
		Ext.getCmp('follows_panel').add(FollowsMainChart);
		});

});    
});
		
csrProviderFollowWin.on({
	hide: function(){
			Ext.getBody().unmask();
	}
});

Ext.getCmp('infoPanel').on({
	show:slidepanelright
});

Ext.getCmp('provider_list').on({
	hide:slidepanelleft
});

//csrProviderStore.load();
//csrChannelStore.load();
//csrProviderStore.loadPage(1);
//listControl.load(function(records, operation, success) {
if (params.csr_provider_id>0) {
	Ext.getCmp('infoPanel').up('panel').getLayout().setActiveItem(1);
	var temp_csr_provider_id=params.csr_provider_id;
	csrProviderStore.setProxy({
		type: 'ajax',
		url: '/ts/index.php/csr_provider/get?csr_provider_id='+temp_csr_provider_id,
		reader: {
			type: 'json',
			root: 'data'
		}
	});
	csrProviderFollowStore.setProxy({
		type: 'ajax',
		url: '/ts/index.php/csr_provider/follow_view?csr_provider_id='+temp_csr_provider_id,
		reader: {
			type: 'json',
			root: 'data'
		}
	});
	csrProviderStore.load(function(records, operation, success) {
		infoForm.getForm().loadRecord(records[0]);
	});
	followpanel.down('form').down('hiddenfield[name="csr_provider_id"]').setValue(temp_csr_provider_id);
	csrProviderFollowStore.load();
} else if(params.stat>0){
	Ext.getCmp('infoPanel').up('panel').getLayout().setActiveItem(0);
} else {
	Ext.getCmp('infoPanel').up('panel').getLayout().setActiveItem(0);
}
//});

});