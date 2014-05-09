Ext.require(['Ext.ux.form.SearchField']);

Ext.onReady(function() {

var personStatDailyStore;
var checkResult;
		
var params=Ext.Object.fromQueryString(location.search.substring(1));
		
var storeBaseUrl= '/ts/index.php/csr_person/view';
var mode=0;
var recentMode='null';
var catMode='all';
var FSCChannel='null';
var PStart='';
var PEnd='';
var lastFollow='';
	 
Ext.QuickTips.init();
var chPersonCatList=Ext.create('Ext.data.ArrayStore', {
	fields: ['id', 'text'],
	data: [
		['目标客户','目标客户'],
		['潜在客户','潜在客户'],
		['意向客户','意向客户'],
		['成交客户','成交客户']
	]
});


var csrPersonListStore = Ext.create('Ext.data.JsonStore', {
	pageSize : 100,
	remoteSort : true ,
	autoLoad:true,
	leadingBufferZone: 300,
	buffered: true,
//    sorters:[{property:'csr_person_id',direction:'ASC'}],
	extraParams:{total:50000},
//    simpleSortMode:true,
	fields: [
		{name:'csr_person_id'},
		{name:'csr_person_cat'},
		{name:'csr_person_name'},
		{name:'csr_person_gender'},
		{name:'csr_person_age'},
		{name:'csr_person_telephone'},
		{name:'csr_person_mobile'},
		{name:'csr_person_qq'},
		{name:'csr_person_email'},
		{name:'csr_person_financial_pref'},
		{name:'csr_person_financial_demand'},
		{name:'csr_person_FSC_follow_status'},
		{name:'csr_person_FSC_follow_result'},
		{name:'csr_person_FSC_channel'},
		{name:'csr_person_creator'},
		{name:'csr_person_create_ts',type:'date',dateFormat:"Y-m-d H:i:s"	},
		{name:'csr_person_editor'},
		{name:'csr_person_update_ts',type:'date',dateFormat:"Y-m-d H:i:s"	},
		{name:'csr_person_follow_creator'},
		{name:'csr_person_follow_result'},
		{name:'csr_person_follow_update_ts',type:'date',dateFormat:"Y-m-d H:i:s"	}
	],
	proxy: {
		type: 'ajax',
		url: '/ts/index.php/csr_person/view',
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
			person_list.down('component#status').update({count: csrPersonListStore.getTotalCount()});
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
		{name:'csr_person_FSC_follow_status'},
		{name:'csr_person_FSC_opp_and_prob'},
		{name:'csr_person_FSC_solution'},
		{name:'csr_person_FSC_channel'},
		{name:'csr_person_creator'},
		{name:'csr_person_create_ts',type:'date',dateFormat:"Y-m-d H:i:s"	},
		{name:'csr_person_editor'},
		{name:'csr_person_update_ts',type:'date',dateFormat:"Y-m-d H:i:s"	},
		{name:'csr_person_follow_creator'},
		{name:'csr_person_follow_update_ts',type:'date',dateFormat:"Y-m-d H:i:s"	}
	],
	proxy: {
		type: 'ajax',
		url: '/ts/index.php/csr_person/get',
		reader: {
			type: 'json',
			root: 'data'
		}        
	}
});
var csrPersonFollowStore=Ext.create('Ext.data.JsonStore', {
	fields: [
		{name:'csr_person_id',type:'integer'},
		{name:'csr_person_FSC_follow_status',type:'string'},
		{name:'csr_person_FSC_opp_and_prob',type:'string'},
		{name:'csr_person_FSC_solution',type:'string'},
		{name:'csr_person_follow_update_ts',type:'date',dateFormat:"Y-m-d H:i:s"	},
		{name:'csr_person_follow_result',type:'string'}
	],
	proxy: {
		type: 'ajax',
		url: '/ts/index.php/csr_person/follow_view',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

var csrPersonFollowsStore=Ext.create('Ext.data.JsonStore', {
	pageSize : 100,
	remoteSort : true ,
	autoLoad:true,
	leadingBufferZone: 100,
	buffered: true,
//    sorters:[{property:'csr_person_id',direction:'ASC'}],
	extraParams:{total:50000},
//    simpleSortMode:true,
	fields: [
		{name:'csr_person_id',type:'integer'},
		{name:'csr_person_FSC_follow_status',type:'string'},
		{name:'csr_person_FSC_opp_and_prob',type:'string'},
		{name:'csr_person_FSC_solution',type:'string'},
		{name:'csr_person_follow_update_ts',type:'date',dateFormat:"Y-m-d H:i:s"	},
		{name:'csr_person_follow_result',type:'string'},
		{name:'id',type:'integer'},
		{name:'csr_person_follow_creator',type:'string'},
		{name:'csr_person_cat',type:'string'},
		{name:'csr_person_name',type:'string'},
		{name:'csr_person_gender',type:'string'},
		{name:'csr_person_mobile',type:'string'}
	],
	proxy: {
		type: 'ajax',
		url: '/ts/index.php/csr_person/follows_view',
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
		{name:'csr_corp'  ,type:'boolean' },
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
		
var person_list = Ext.create('Ext.grid.Panel', {
	id:'person_list',
	store: csrPersonListStore,
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
			store: csrPersonListStore
		},'->',{
			xtype: 'component',
			itemId: 'status',
            tpl: '<span style="font-size:16px">客户数: <b>{count}</b>。</span>可搜索客户姓名，电话，电子邮箱，QQ号，所在城市。',
			style: 'margin-left:10px;margin-right:10px'
		}]
	},{
		xtype:'toolbar',
		id:'person_list_topbar',
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
				csrPersonListStore.setProxy({
					type: 'ajax',
					url: '/ts/index.php/csr_person/view?mode='+mode+'&recentMode='+recentMode+'&catMode='+catMode+'&FSCChannel='+encodeURI(FSCChannel)+'&PStart='+PStart+'&PEnd='+PEnd+'&lastFollow='+encodeURI(lastFollow),
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
				csrPersonListStore.load();
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
				csrPersonListStore.setProxy({
					type: 'ajax',
					url: '/ts/index.php/csr_person/view?mode='+mode+'&recentMode='+recentMode+'&catMode='+catMode+'&FSCChannel='+encodeURI(FSCChannel)+'&PStart='+PStart+'&PEnd='+PEnd+'&lastFollow='+encodeURI(lastFollow),
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
				csrPersonListStore.load();
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
					csrPersonListStore.setProxy({
						type: 'ajax',
						url: '/ts/index.php/csr_person/view?mode='+mode+'&recentMode='+recentMode+'&catMode='+catMode+'&FSCChannel='+encodeURI(FSCChannel)+'&PStart='+PStart+'&PEnd='+PEnd+'&lastFollow='+encodeURI(lastFollow),
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
					csrPersonListStore.load();
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
						csrPersonListStore.setProxy({
							type: 'ajax',
							url: '/ts/index.php/csr_person/view?mode='+mode+'&recentMode='+recentMode+'&catMode='+catMode+'&FSCChannel='+encodeURI(FSCChannel)+'&PStart='+PStart+'&PEnd='+PEnd+'&lastFollow='+encodeURI(lastFollow),
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
						csrPersonListStore.load();
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
						csrPersonListStore.setProxy({
							type: 'ajax',
							url: '/ts/index.php/csr_person/view?mode='+mode+'&recentMode='+recentMode+'&catMode='+catMode+'&FSCChannel='+encodeURI(FSCChannel)+'&PStart='+PStart+'&PEnd='+PEnd+'&lastFollow='+encodeURI(lastFollow),
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
						csrPersonListStore.load();
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
				var temp_csr_person_id=grid.getStore().getAt(rowIndex).get("csr_person_id");
				this.up('panel').up('panel').getLayout().setActiveItem(1);
				csrPersonStore.setProxy({
					type: 'ajax',
					url: '/ts/index.php/csr_person/get?csr_person_id='+temp_csr_person_id,
					reader: {
						type: 'json',
						root: 'data'
					}
				});
				csrPersonFollowStore.setProxy({
					type: 'ajax',
					url: '/ts/index.php/csr_person/follow_view?csr_person_id='+temp_csr_person_id,
					reader: {
						type: 'json',
						root: 'data'
					}
				});
				csrPersonStore.load(function(records, operation, success) {
					infoForm.getForm().loadRecord(records[0]);
				});
				followpanel.down('form').down('hiddenfield[name="csr_person_id"]').setValue(temp_csr_person_id);
				csrPersonFollowStore.load();
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
					//csrCorpEditWin.down('form').getForm().loadRecord(grid.getStore().getAt(rowIndex));
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
	{dataIndex:'csr_person_cat',text:'客户类别', filtable:true, style: "text-align:center;",align: 'center',width:80},
	{dataIndex:'csr_person_name',text:'姓名', filtable:true, style: "text-align:center;",align: 'center',width:80},
	{dataIndex:'csr_person_gender',text:'性别', filtable:true, style: "text-align:center;",align: 'center',width:60},
	{dataIndex:'csr_person_telephone',text:'固定电话', filtable:true, style: "text-align:center;",align: 'center',width:120},
	{dataIndex:'csr_person_mobile',text:'手机', filtable:true, style: "text-align:center;",align: 'center',width:110,renderer:function(value){return value.substring(0,3)+'-'+value.substring(3,7)+'-'+value.substring(7,11)}},
	{dataIndex:'csr_person_qq',text:'qq', filtable:true, style: "text-align:center;",align: 'center',width:100},
	{dataIndex:'csr_person_email',text:'邮箱', filtable:true, style: "text-align:center;",align: 'center',width:180},
	{dataIndex:'csr_person_FSC_channel',text:'责任人', filtable:true, style: "text-align:center;",align: 'center',width:90},
	{dataIndex:'csr_person_follow_result',text:'跟进结果', filtable:true, style: "text-align:center;",align: 'center',width:120},
	{dataIndex:'csr_person_FSC_follow_status',text:'跟进状态', filtable:true, style: "text-align:center;",align: 'center',width:180},
	{dataIndex:'csr_person_follow_update_ts',text:'最后跟进时间', filtable:true, style: "text-align:center;",align: 'center',width:120,renderer:new Ext.util.Format.dateRenderer("Y-m-d")}
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

person_list.on({
		celldblclick:function(grid,td,cellIndex,record,tr,rowIndex){
		//sampleStore.removeAt(rowIndex);
				var temp_csr_person_id=grid.getStore().getAt(rowIndex).get("csr_person_id");
				person_list.up('panel').getLayout().setActiveItem(1);
		csrPersonStore.setProxy({
			type: 'ajax',
			url: '/ts/index.php/csr_person/get?csr_person_id='+temp_csr_person_id,
			reader: {
				type: 'json',
				root: 'data'
			}
		});
		csrPersonFollowStore.setProxy({
			type: 'ajax',
			url: '/ts/index.php/csr_person/follow_view?csr_person_id='+temp_csr_person_id,
			reader: {
				type: 'json',
				root: 'data'
			}
		});
				csrPersonStore.load(function(records, operation, success) {
						infoForm.getForm().loadRecord(records[0]);
				});
				followpanel.down('form').down('hiddenfield[name="csr_person_id"]').setValue(temp_csr_person_id);
				csrPersonFollowStore.load();
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
						url: '/ts/index.php/csr_person/save',
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
		{xtype:'hiddenfield',name:'csr_person_id'},
		{
			xtype:'fieldset',
			title: '====<b>类别</b>====',
			border:0,
			layout: {
				type: 'vbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			items:[
			{xtype:'combo',queryMode:'local',store:chPersonCatList,valueField:'id',displayField:'text',forceSelection:true,name:'csr_person_cat',fieldLabel:'客户类别'},
			{xtype:'textfield',name:'csr_person_cat_reason',fieldLabel:'客户类别<br />评判理由'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>客户基本信息</b>====',
			border:0,
			layout: {
				type: 'vbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			fieldDefaults:{
				allowBlank: true,
				labelAlign:'right'
			},
			items:[
			{xtype:'textfield',name:'csr_person_name',fieldLabel:'姓名'},
			{xtype:'textfield',name:'csr_person_gender',fieldLabel:'性别'},
			{xtype:'textfield',name:'csr_person_age',fieldLabel:'年龄'},
			{xtype:'textfield',name:'csr_person_hometown',fieldLabel:'籍贯'},
			{xtype:'textfield',name:'csr_person_telephone',fieldLabel:'固定电话'},
								{xtype:'textfield',name:'csr_person_mobile',fieldLabel:'手机*',allowBlank:false,disabled:true},
			{xtype:'textfield',name:'csr_person_qq',fieldLabel:'qq'},
			{xtype:'textfield',name:'csr_person_wechat',fieldLabel:'微信'},
			{xtype:'textfield',name:'csr_person_email',fieldLabel:'邮箱'},
			{xtype:'textfield',name:'csr_person_interests',fieldLabel:'兴趣爱好'},
			{xtype:'textfield',name:'csr_person_proper_comm',fieldLabel:'比较接受的<br />沟通方式'},
			{xtype:'textareafield',name:'csr_person_plusinfo',fieldLabel:'个人其他需要<br />说明的状况'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>客户职业信息</b>====',
			border:0,
			layout: {
				type: 'vbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			fieldDefaults:{
				allowBlank: true,
				labelAlign:'right'
			},
			items:[
			{xtype:'textfield',name:'csr_person_corp_industry',fieldLabel:'服务行业'},
			{xtype:'textfield',name:'csr_person_corp_name',fieldLabel:'公司名称'},
			{xtype:'textfield',name:'csr_person_corp_property',fieldLabel:'公司性质'},
			{xtype:'textfield',name:'csr_person_corp_title',fieldLabel:'职位'},
			{xtype:'textareafield',name:'csr_person_past_work',fieldLabel:'过往主要<br />任职经历'},
			{xtype:'textareafield',name:'csr_person_edu',fieldLabel:'过往主要<br />教育经历'},
			{xtype:'textareafield',name:'csr_person_prof_plusinfo',fieldLabel:'职业其他需要<br />说明的状况'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>客户家庭信息</b>====',
			border:0,
			layout: {
				type: 'vbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			fieldDefaults:{
				lableWidth:120,
				width:440,
				allowBlank: true,
				labelAlign:'right'
			},
			items:[
			{xtype:'textfield',name:'csr_person_marriage',fieldLabel:'婚姻状况'},
			{xtype:'textfield',name:'csr_person_child',fieldLabel:'生育状况'},
			{xtype:'textfield',name:'csr_person_child_no',fieldLabel:'子女个数'},
			{xtype:'textfield',name:'csr_person_child1_age',fieldLabel:'子女1年龄'},
			{xtype:'textfield',name:'csr_person_child2_age',fieldLabel:'子女2年龄'},
			{xtype:'textareafield',name:'csr_person_family_plusinfo',fieldLabel:'家庭其他需要<br />说明的状况'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>客户资产状况</b>====',
			border:0,
			layout: {
				type: 'vbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			fieldDefaults:{
				lableWidth:120,
				width:440,
				allowBlank: true,
				labelAlign:'right'
			},
			items:[
			{xtype:'textfield',name:'csr_person_income_p',fieldLabel:'个人年收入'},
			{xtype:'textfield',name:'csr_person_assets_p',fieldLabel:'个人总资产'},
			{xtype:'textfield',name:'csr_person_income_h',fieldLabel:'家庭年收入'},
			{xtype:'textfield',name:'csr_person_assets_h',fieldLabel:'家庭总资产'},
			{xtype:'textfield',name:'csr_person_financial_dicision',fieldLabel:'家庭理财<br />决策模式'},
			{xtype:'textareafield',name:'csr_person_financial_plusinfo',fieldLabel:'资产其他需要<br />说明的状况'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>资产配置状况</b>====',
			border:0,
			layout: {
				type: 'vbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			fieldDefaults:{
				lableWidth:120,
				width:440,
				allowBlank: true,
				labelAlign:'right'
			},
			items:[
			{xtype:'textfield',name:'csr_person_assets_estate',fieldLabel:'房产'},
			{xtype:'textfield',name:'csr_person_assets_trusts',fieldLabel:'信托类'},
			{xtype:'textfield',name:'csr_person_assets_fixed',fieldLabel:'其他固定<br />收益类'},
			{xtype:'textfield',name:'csr_person_assets_stock',fieldLabel:'股票类'},
			{xtype:'textfield',name:'csr_person_assets_PE',fieldLabel:'股权投资类'},
			{xtype:'textfield',name:'csr_person_assets_float',fieldLabel:'其他浮动<br />收益类'},
			{xtype:'textfield',name:'csr_person_assets_other',fieldLabel:'另类'},
			{xtype:'textfield',name:'csr_person_assets_oversea',fieldLabel:'海外'},
			{xtype:'textareafield',name:'csr_person_assets_plusinfo',fieldLabel:'资产配置其他<br />要说明的状况'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>合作信息</b>====',
			border:0,
			layout: {
				type: 'vbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			fieldDefaults:{
				allowBlank: true,
				labelAlign:'right'
			},
			items:[
			{xtype:'textfield',name:'csr_person_financial_pref',fieldLabel:'客户理财偏好'},
			{xtype:'textfield',name:'csr_person_financial_demand',fieldLabel:'客户理财需求'},
			{xtype:'textfield',name:'csr_person_financial_channel',fieldLabel:'目前的<br />理财渠道'},
			{xtype:'textfield',name:'csr_person_offer_pdt',fieldLabel:'可能提供<br />服务的产品'},
			{xtype:'textfield',name:'csr_person_offer_mode',fieldLabel:'可能提供<br />服务的模式'}
			]
		}]
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
						url: '/ts/index.php/csr_person/follow_update',
						submitEmptyText: false,
						waitMsg: 'Saving Data...',
						success: function(form, action) {
							//csrChannelFollowWin.hide();
							csrPersonFollowStore.load();
														Ext.getCmp('addFollowForm').getForm().reset();
														followpanel.down('form').down('hiddenfield[name="csr_person_id"]').setValue(action.result.csr_person_id);
									//csrCorpStore.load();
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
		{xtype:'hiddenfield',name:'csr_person_id'},
		{xtype:'combo',name:'csr_person_follow_result',queryMode : 'local',store : chFollowResult,valueField: 'id',displayField: 'text',forceSelection:true,fieldLabel:'跟进结果',allowBlank:false},
		{xtype:'textareafield',name:'csr_person_FSC_follow_status',fieldLabel:'跟进状况',width:'90%',height:36},
		{xtype:'textareafield',name:'csr_person_FSC_opp_and_prob',fieldLabel:'机会和问题',width:'90%',height:36},
		{xtype:'textareafield',name:'csr_person_FSC_solution',fieldLabel:'解决方案',width:'90%',height:36}
		]
                        }]
	},{
		xtype:'grid',
				flex:1,
				border:0,
		store:csrPersonFollowStore,
		columns:[
			{text:'跟进时间',dataIndex:'csr_person_follow_update_ts',filtable:true, style: "text-align:center;",align: 'center',width:100,renderer:new Ext.util.Format.dateRenderer("Y-m-d")},
			{text:'跟进结果',dataIndex:'csr_person_follow_result',filtable:true, style: "text-align:center;",align: 'left',width:120},
			{text:'跟进状况',dataIndex:'csr_person_FSC_follow_status',filtable:true, style: "text-align:center;",align: 'left',width:350,renderer: function(value, meta, record) {    
					return '<div style="white-space:normal;">' + value + '</div>';
				}  
			},
			{text:'机会和问题',dataIndex:'csr_person_FSC_opp_and_prob',filtable:true, style: "text-align:center;",align: 'left',width:250,renderer: function(value, meta, record) {    
					return '<div style="white-space:normal;">' + value + '</div>';
				}  
			},
			{text:'解决方案',dataIndex:'csr_person_FSC_solution',filtable:true, style: "text-align:center;",align: 'left',width:200,renderer: function(value, meta, record) {    
					return '<div style="white-space:normal;">' + value + '</div>';
				}  
			}
		]
	}]
});

var csrPersonEditPanel=Ext.create('Ext.panel.Panel',{
	autoScroll:true,
	region:'center',
	layout:'card',
	items:[
		person_list,
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
				text: '返回个人客户列表',
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
		
		
var csrPersonNewWin=Ext.create('Ext.window.Window',{
	resizeable:false,
	closeAction:"hide",
	closable:false,
	title:'信息编辑',
	titleAlign:'center',
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
		autoScroll :true,
		//hidden:true,
		//collapsible:true,
		//collapseDirection : 'left',
		//collapsed : true,
		//title:'个人客户信息编辑',
		border:0,
		waitTitle:"Pleas wait...",
		layout:{
			type:'vbox',
			align: 'stretch',
			defaultMargins: {top: 0, right: 5, bottom: 0, left: 5}
		},
		fieldDefaults:{
			lableWidth:50,
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
						url: '/ts/index.php/csr_person/save',
						submitEmptyText: false,
						waitMsg: 'Saving Data...',
						success: function(form, action) {
							csrPersonNewWin.hide();
							csrPersonListStore.load();
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
		{xtype:'hiddenfield',name:'csr_person_id'},
		{
			xtype:'fieldset',
			title: '====<b>类别</b>====',
			border:0,
			layout: {
				type: 'hbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			items:[
			{xtype:'combo',queryMode:'local',store:chPersonCatList,valueField:'id',displayField:'text',forceSelection:true,width:300,name:'csr_person_cat',fieldLabel:'客户类别'},
			{xtype:'textfield',name:'csr_person_cat_reason',fieldLabel:'客户类别评判理由'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>客户基本信息</b>====',
			border:0,
			layout: {
				type: 'vbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			fieldDefaults:{
				lableWidth:100,
				width:440,
				allowBlank: true,
				labelAlign:'right'
			},
			items:[
				{xtype:'textfield',width:300,name:'csr_person_name',fieldLabel:'姓名'},
				{xtype:'textfield',width:300,name:'csr_person_gender',fieldLabel:'性别'},
				{xtype:'textfield',width:300,name:'csr_person_age',fieldLabel:'年龄'},
				{xtype:'textfield',width:300,name:'csr_person_hometown',fieldLabel:'籍贯'},
				{xtype:'textfield',width:300,name:'csr_person_telephone',fieldLabel:'固定电话'},
				{xtype:'textfield',width:300,name:'csr_person_mobile',fieldLabel:'<b>手机(必填)</b>',allowBlank:false},
				{xtype:'textfield',width:300,name:'csr_person_qq',fieldLabel:'qq'},
				{xtype:'textfield',width:300,name:'csr_person_wechat',fieldLabel:'微信'},
				{xtype:'textfield',width:300,name:'csr_person_email',fieldLabel:'邮箱'},
				{xtype:'textfield',width:700,name:'csr_person_interests',fieldLabel:'兴趣爱好'},
				{xtype:'textfield',width:700,name:'csr_person_proper_comm',fieldLabel:'比较接受的<br />沟通方式'},
				{xtype:'textareafield',width:700,name:'csr_person_plusinfo',fieldLabel:'个人其他需要<br />说明的状况'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>客户职业信息</b>====',
			border:0,
			layout: {
				type: 'vbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			fieldDefaults:{
				lableWidth:120,
				width:440,
				allowBlank: true,
				labelAlign:'right'
			},
			items:[
				{xtype:'textfield',width:300,name:'csr_person_corp_industry',fieldLabel:'服务行业'},
				{xtype:'textfield',width:700,name:'csr_person_corp_name',fieldLabel:'公司名称'},
				{xtype:'textfield',width:300,name:'csr_person_corp_property',fieldLabel:'公司性质'},
				{xtype:'textfield',width:300,name:'csr_person_corp_title',fieldLabel:'职位'},
				{xtype:'textareafield',width:700,name:'csr_person_past_work',fieldLabel:'过往主要任职经历'},
				{xtype:'textareafield',width:700,name:'csr_person_edu',fieldLabel:'过往主要教育经历'},
				{xtype:'textareafield',width:700,name:'csr_person_prof_plusinfo',fieldLabel:'职业其他需要说明的状况'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>客户家庭信息</b>====',
			border:0,
			layout: {
				type: 'vbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			fieldDefaults:{
				lableWidth:120,
				width:440,
				allowBlank: true,
				labelAlign:'right'
			},
			items:[
				{xtype:'textfield',name:'csr_person_marriage',fieldLabel:'婚姻状况'},
				{xtype:'textfield',name:'csr_person_child',fieldLabel:'生育状况'},
				{xtype:'textfield',name:'csr_person_child_no',fieldLabel:'子女个数'},
				{xtype:'textfield',name:'csr_person_child1_age',fieldLabel:'子女1年龄'},
				{xtype:'textfield',name:'csr_person_child2_age',fieldLabel:'子女2年龄'},
				{xtype:'textareafield',width:700,name:'csr_person_family_plusinfo',fieldLabel:'家庭其他需要说明的状况'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>客户资产状况</b>====',
			border:0,
			layout: {
				type: 'vbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			fieldDefaults:{
				lableWidth:120,
				width:440,
				allowBlank: true,
				labelAlign:'right'
			},
			items:[
				{xtype:'textfield',name:'csr_person_income_p',fieldLabel:'个人年收入'},
				{xtype:'textfield',name:'csr_person_assets_p',fieldLabel:'个人总资产'},
				{xtype:'textfield',name:'csr_person_income_h',fieldLabel:'家庭年收入'},
				{xtype:'textfield',name:'csr_person_assets_h',fieldLabel:'家庭总资产'},
				{xtype:'textfield',name:'csr_person_financial_dicision',fieldLabel:'家庭理财决策模式'},
				{xtype:'textareafield',width:700,name:'csr_person_financial_plusinfo',fieldLabel:'资产其他需要说明的状况'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>资产配置状况</b>====',
			border:0,
			layout: {
				type: 'vbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			fieldDefaults:{
				lableWidth:120,
				width:440,
				allowBlank: true,
				labelAlign:'right'
			},
			items:[
				{xtype:'textfield',width:700,name:'csr_person_assets_estate',fieldLabel:'房产'},
				{xtype:'textfield',width:700,name:'csr_person_assets_trusts',fieldLabel:'信托类'},
				{xtype:'textfield',width:700,name:'csr_person_assets_fixed',fieldLabel:'其他固定收益类'},
				{xtype:'textfield',width:700,name:'csr_person_assets_stock',fieldLabel:'股票类'},
				{xtype:'textfield',width:700,name:'csr_person_assets_PE',fieldLabel:'股权投资类'},
				{xtype:'textfield',width:700,name:'csr_person_assets_float',fieldLabel:'其他浮动收益类'},
				{xtype:'textfield',width:700,name:'csr_person_assets_other',fieldLabel:'另类'},
				{xtype:'textfield',width:700,name:'csr_person_assets_oversea',fieldLabel:'海外'},
				{xtype:'textareafield',width:700,name:'csr_person_assets_plusinfo',fieldLabel:'资产配置其他需要说明的状况'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>合作信息</b>====',
			border:0,
			layout: {
				type: 'vbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			fieldDefaults:{
				lableWidth:120,
				width:440,
				allowBlank: true,
				labelAlign:'right'
			},
			items:[
				{xtype:'textfield',name:'csr_person_financial_pref',fieldLabel:'客户理财偏好'},
				{xtype:'textfield',name:'csr_person_financial_demand',fieldLabel:'客户理财需求'},
				{xtype:'textfield',name:'csr_person_financial_channel',fieldLabel:'目前的理财渠道'},
				{xtype:'textfield',name:'csr_person_offer_pdt',fieldLabel:'可能提供服务的产品'},
				{xtype:'textfield',name:'csr_person_offer_mode',fieldLabel:'可能提供服务的模式'}
			]
		}]
	}]
});

csrPersonNewWin.on({
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
		text:'<span class="app-header2">个人及家庭理财客户列表</span>'
	},{
		xtype:'box',
		flex:1
	},{
		icon: '/ts/misc/resources/icons/message_add.png',
		scale:'medium',
		text:'新增' ,
		id:'BtnNewPerson',
		handler:function(){
			//todo
			personForm=csrPersonNewWin.down('form');
			Ext.getBody().mask();
			csrPersonNewWin.show();
			personForm.getForm().reset(true);
			personForm.down('hiddenfield[name="csr_person_id"]').setValue(-1);
		}
	},{
		icon: '/ts/misc/resources/icons/document_recommend_24.png',
		scale:'medium',
		text:'查看跟进统计' ,
		id:'BtnPersonView',
		handler:function(){
			Ext.getCmp('infoPanel').up('panel').getLayout().setActiveItem(2);
			Ext.getCmp('headerTitle').setText('<span class="app-header2">客户跟进统计</span>');
			Ext.getCmp('BtnPersonView').hide();
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
			Ext.getCmp('headerTitle').setText('<span class="app-header2">个人及家庭理财客户列表</span>');
			Ext.getCmp('BtnFollowsView').hide();
			Ext.getCmp('BtnPersonView').show();
		}
	}]
});
				
Ext.getCmp('viewport').add(csrPersonEditPanel);
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
		url: '/ts/index.php/user/view_reporters?access_mode=csr_person/save',
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

var csrPersonFollowWin=Ext.create('Ext.window.Window',{
	resizeable:false,
	closeAction:"hide",
	closable:true,
	title:'个人及家庭理财客户跟踪',
	titleAlign:'center',
	width:1020,
		height:600,
	layout:'fit',
	items:[
	{
		xtype:'grid',
		id:'follows_list',
		store: csrPersonFollowsStore,
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
			var temp_csr_person_id=grid.getStore().getAt(rowIndex).get("csr_person_id");
			window.open('/ts/index.php/csr_person?csr_person_id='+temp_csr_person_id);
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
										var temp_csr_person_id=grid.getStore().getAt(rowIndex).get("csr_person_id");
										followpanel.down('form').down('hiddenfield[name="csr_person_id"]').setValue(temp_csr_person_id);
					csrPersonFollowStore.setProxy({
						type: 'ajax',
						url: '/ts/index.php/csr_person/follow_view?csr_person_id='+temp_csr_person_id,
						reader: {
							type: 'json',
							root: 'data'
						}
					});
										csrPersonFollowStore.load();
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
					//csrCorpEditWin.down('form').getForm().loadRecord(grid.getStore().getAt(rowIndex));
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
					var temp_csr_person_id=grid.getStore().getAt(rowIndex).get("csr_person_id");
					window.open('/ts/index.php/csr_person?csr_person_id='+temp_csr_person_id);
				}
			}]
		},
		{dataIndex:'csr_person_cat',text:'客户类别', filtable:true, style: "text-align:center;",align: 'center',width:80},
		{dataIndex:'csr_person_name',text:'姓名', filtable:true, style: "text-align:center;",align: 'center',width:80},
		{dataIndex:'csr_person_gender',text:'性别', filtable:true, style: "text-align:center;",align: 'center',width:60},
		{dataIndex:'csr_person_mobile',text:'手机', filtable:true, style: "text-align:center;",align: 'center',width:100},
		{dataIndex:'csr_person_follow_creator',text:'最后跟进人', filtable:true, style: "text-align:center;",align: 'center',width:120},
		{text:'跟进时间',dataIndex:'csr_person_follow_update_ts',filtable:true, style: "text-align:center;",align: 'center',width:100,renderer:new Ext.util.Format.dateRenderer("Y-m-d")},
		{dataIndex:'csr_person_follow_result',text:'跟进结果', filtable:true, style: "text-align:center;",align: 'center',width:120},
		{text:'跟进状况',dataIndex:'csr_person_FSC_follow_status',filtable:true, style: "text-align:center;",align: 'left',width:350,renderer: function(value, meta, record) {    
				return '<div style="white-space:normal;">' + value + '</div>';
			}  
		},
		{text:'机会和问题',dataIndex:'csr_person_FSC_opp_and_prob',filtable:true, style: "text-align:center;",align: 'left',width:250,renderer: function(value, meta, record) {    
				return '<div style="white-space:normal;">' + value + '</div>';
			}  
		},
		{text:'解决方案',dataIndex:'csr_person_FSC_solution',filtable:true, style: "text-align:center;",align: 'left',width:200,renderer: function(value, meta, record) {    
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
					csrPersonFollowsStore.setProxy({
						type: 'ajax',
						url: '/ts/index.php/csr_person/follows_view?s_username='+encodeURI(a.yField)+'&s_day='+ (( a.value[0].getYear() < 1900 ) ? ( 1900 + a.value[0].getYear() ) : a.value[0].getYear())+"-"+(a.value[0].getMonth()+1)+"-"+a.value[0].getDate()+'&s_mode=day',
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
					csrPersonFollowsStore.load();
					csrPersonFollowWin.show();
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
					text: '只看自己'
				},{
								icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
					text: '管理客户'
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
		Ext.getCmp('person_list_topbar').add(Ext.create('Ext.button.Cycle',{
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
				csrPersonListStore.setProxy({
					type: 'ajax',
					url:'/ts/index.php/csr_person/view?mode='+mode+'&recentMode='+recentMode+'&catMode='+catMode+'&FSCChannel='+encodeURI(FSCChannel)+'&PStart='+PStart+'&PEnd='+PEnd+'&lastFollow='+encodeURI(lastFollow),
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
				csrPersonListStore.load();
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
			url: '/ts/index.php/csr_person/get_daily_stats',
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
									csrPersonFollowsStore.setProxy({
						type: 'ajax',
											url: '/ts/index.php/csr_person/follows_view?s_username='+encodeURI(a.yField)+'&s_day='+ (( a.value[0].getYear() < 1900 ) ? ( 1900 + a.value[0].getYear() ) : a.value[0].getYear())+"-"+(a.value[0].getMonth()+1)+"-"+a.value[0].getDate()+'&s_mode=day',
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
									csrPersonFollowsStore.load();
									csrPersonFollowWin.show();
							}
					}
			}]
	});
		Ext.getCmp('follows_panel').add(FollowsMainChart);
		});

});    
});
		
csrPersonFollowWin.on({
	hide: function(){
			Ext.getBody().unmask();
	}
});

Ext.getCmp('infoPanel').on({
	show:slidepanelright
});

Ext.getCmp('person_list').on({
	hide:slidepanelleft
});

//csrCorpStore.load();
//csrChannelStore.load();
//csrPersonStore.loadPage(1);
//listControl.load(function(records, operation, success) {
if (params.csr_person_id>0) {
	Ext.getCmp('infoPanel').up('panel').getLayout().setActiveItem(1);
	var temp_csr_person_id=params.csr_person_id;
	csrPersonStore.setProxy({
		type: 'ajax',
		url: '/ts/index.php/csr_person/get?csr_person_id='+temp_csr_person_id,
		reader: {
			type: 'json',
			root: 'data'
		}
	});
	csrPersonFollowStore.setProxy({
		type: 'ajax',
		url: '/ts/index.php/csr_person/follow_view?csr_person_id='+temp_csr_person_id,
		reader: {
			type: 'json',
			root: 'data'
		}
	});
	csrPersonStore.load(function(records, operation, success) {
		infoForm.getForm().loadRecord(records[0]);
	});
	followpanel.down('form').down('hiddenfield[name="csr_person_id"]').setValue(temp_csr_person_id);
	csrPersonFollowStore.load();
} else if(params.stat>0){
	Ext.getCmp('infoPanel').up('panel').getLayout().setActiveItem(0);
} else {
	Ext.getCmp('infoPanel').up('panel').getLayout().setActiveItem(0);
}
//});

});