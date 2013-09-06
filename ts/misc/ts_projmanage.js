//Ext.require(['Ext.ux.RowExpander']);

Ext.onReady(function() {
  Ext.QuickTips.init();
  var accPanel,fullGridC1,fullGridC2;
  var loginname = Ext.util.Cookies.get("loginname");
  var listControl=Ext.create('Ext.data.JsonStore', {
	fields: [
	  {name:'manage_button'    ,type:'boolean' },
	  {name:'proj_id'          ,type:'boolean' },
	  {name:'proj_detail_id'   ,type:'boolean' },
	  {name:'total_share'      ,type:'boolean' },
	  {name:'status'           ,type:'boolean' },
	  {name:'exclusive'        ,type:'boolean' },
	  {name:'grade'            ,type:'boolean' },
	  {name:'category'         ,type:'boolean' },
	  {name:'sub_category'     ,type:'boolean' },
	  {name:'issue'            ,type:'boolean' },
	  {name:'name'             ,type:'boolean' },
	  {name:'sub_name'         ,type:'boolean' },
	  {name:'flow_of_fund'     ,type:'boolean' },
	  {name:'highlights'       ,type:'boolean' },
	  {name:'month'            ,type:'boolean' },
	  {name:'scale'            ,type:'boolean' },
	  {name:'cycle'            ,type:'boolean' },
	  {name:'amount'           ,type:'boolean' },
	  {name:'profit_property'  ,type:'boolean' },
	  {name:'profit'           ,type:'boolean' },
	  {name:'proj_director'    ,type:'boolean' },
	  {name:'manager'          ,type:'boolean' },
	  {name:'contract'         ,type:'boolean' },
	  {name:'remark'           ,type:'boolean' },
	  {name:'pay_account'      ,type:'boolean' },
	  {name:'countdown'        ,type:'boolean' },
	  {name:'commission_b_tax' ,type:'boolean' },
	  {name:'commission_a_tax' ,type:'boolean' },
	  {name:'inner_commission' ,type:'boolean' },
	  {name:'outer_commission' ,type:'boolean' },
	  {name:'imm_payment'      ,type:'boolean' },
	  {name:'found'            ,type:'boolean' },
	  {name:'main_channel'     ,type:'boolean' },
	  {name:'channel_company'  ,type:'boolean' },
	  {name:'channel_contact'  ,type:'boolean' },
	  {name:'billing_company'  ,type:'boolean' },
	  {name:'manager_remark'   ,type:'boolean' },
	  {name:'create_ts'  ,type:'boolean' }
	],
	proxy: {
	  type: 'ajax',
	  url: '/ts/index.php/api/access_fields',
	  reader: {
		  type: 'json',
		  root: 'data'
	  }
	},
	listener:{
		datachanged:function(){
		}
	}
  });
  
  function slidepanel(co){co.animate({from:{left:500},to:{left:10}})};
  function slideproj(co){
	co.animate({from:{y:co.y-300},to:{y:co.y+88},easeing:'backOut',duration:500})
  };
  
	var ProjWin=Ext.create("Ext.window.Window",{
		resizeable:false,
		closeAction:"hide",
		closable:false,
		title:'编辑项目信息',
		titleAlign:'center',
		width:940,
		items:[
		{
			xtype:"form",
			bodyPadding:5,
			trackResetOnLoad:true,
			border:0,
			waitTitle:"Pleas wait...",
			layout:{
				type:'vbox',
				defaultMargins: {top: 5, right: 5, bottom: 5, left: 5}
			},
			fieldDefaults:{
				lableWidth:90,
				width:240,
				labelAlign:'right',
				allowBlank: false
			},
			dockedItems: [{
				dock: 'bottom',
				xtype: 'toolbar',
				bodyPadding: 5,
				items: [{
						xtype:'box',
						flex:1
				},{
					icon:'/ts/misc/resources/icons/check_24.png',
					text: '确定',
					id:'ok_create',
					hidden:false,
					scale: 'medium',
					formBind: true, //only enabled once the form is valid
					disabled: true,
					handler: function() {
                        window.opener=null;
						var subWin = window.open();
						this.up('form').getForm().submit({
							url: '/ts/index.php/proj/proj_create_submit',
							submitEmptyText: false,
							waitMsg: 'Saving Data...',
							success: function(form, action) {
                                proj_id=action.result.proj_id;
                                ProjWin.close();
                                subWin.location='http://rainbowbridge.sinaapp.com/ts/index.php/proj/update?proj_id='+proj_id;
							},
							failure: function(form, action) {
                                ProjWin.close();
                                subWin.close();
								Ext.Msg.alert('alert', '保存失败。如有问题请联系管理员。');
                                
							}
						});
					}
				},{
					icon:'/ts/misc/resources/icons/x_24.png',
					text: '取消',
					id:'cancel_edit',
					scale: 'medium',
					handler: function(){
						this.up('window').close();
					}
				},{
						xtype:'box',
						flex:1
				}]
			}],
			items:[
			{
				xtype:'panel',
				region:'east',
				border:0,
				layout: {
					type: 'hbox',
					defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
				},
				items:[
				{
					xtype:'fieldset',
					title: '====<b>项目基本信息</b>====',
					border:0,
					//collapsible: true,
					defaults: {
						labelWidth: 89,
						anchor: '100%',
						layout: {
							type: 'vbox'
						}
					},
					items:[{xtype:'box',height:10,border:0},
					{
						xtype:'hiddenfield',
						fieldLabel: 'proj_id',
						name:'proj_id'
					},
					{
						xtype:'fieldcontainer',
						layout:'hbox',
						flex:1,
						width:420,
						region:'north',
						labelAlign:'right',
						fieldLabel: '项目类别*',
						items:[
						{//主类别
							 xtype:'combo',
							 emptyText:"主类别...",
							 width:140,
							 name:'category',
							 store : chCategoryList,
							 queryMode : 'local',
							 forceSelection:true,
							 triggerAction: 'all',
							 valueField: 'id',   //value值字段
							 displayField: 'text',  //显示文本字段
							 listeners: { // 监听选择事件
									 select: function() {
											chSubCategoryList.removeAll();
											if (this.getValue() == '固定收益类') {
												 chSubCategoryList.loadData(chFixedList,true);
											} else if (this.getValue() == '浮动收益类') {
												 chSubCategoryList.loadData(chFloatingList,true);
											}
									 }
							 }
						},
						{//子类别
							 xtype:'combo',
							 emptyText:"子类别...",
							 width:170,
							 name:'sub_category',
							 store : chSubCategoryList,
							 queryMode: 'local',
							 triggerAction: 'all',
							 valueField: 'value',
							 displayField: 'text',
							 forceSelection:true,
							 listeners: {
									 select: function() {
//	                       alert(comboBuild.getValue() + '-' + comboRoom.getValue());
											}
							 }
						}]
					},{
						xtype:'textfield',
						fieldLabel: '发行方*',
						name:'issue',
						width:320
					},{
						xtype:'textfield',
						fieldLabel: '项目名称*',
						name:'name',
						width:400
					},{
						xtype:'numberfield',
						fieldLabel: '融资规模(亿)*',
						name:'scale'
					},{
						xtype:'combo',
						fieldLabel: '分配周期*',
						name:'cycle',
						queryMode : 'local',
						store : chCycleList,
						valueField: 'id',
						displayField: 'text',
						forceSelection:true
					},{
						xtype:'combo',
						fieldLabel: '项目收益属性*',
						name:'profit_property',
						queryMode : 'local',
						store : chProfitPropertyList,
						valueField: 'id',
						displayField: 'text',
						forceSelection:true
					},{
						xtype:'textfield',
						fieldLabel: '资金投向*',
						width:420,
						name:'flow_of_fund'
					},{
						xtype:'textareafield',
						fieldLabel: '项目亮点*',
						width:420,
						height:100,
						name:'highlights'
					}, {
						xtype:'combo',
						fieldLabel: '产品董事*',
						width:220,
						name:'proj_director',
						queryMode : 'local',
						store : chProjDirectorList,
						valueField: 'id',
						displayField: 'text',
						forceSelection:true
					}, {
						xtype:'combo',
						fieldLabel: '产品经理*',
						width:220,
						name:'manager',
						queryMode : 'local',
						store : chManagerList,
						valueField: 'id',
						displayField: 'text',
						forceSelection:true
					}, {
						xtype:'combo',
						fieldLabel: '产品等级*',
						width:220,
						name:'grade',
						queryMode : 'local',
						store : chGradeList,
						valueField: 'id',
						displayField: 'text',
						forceSelection:true
					},{
						xtype:'combo',
						fieldLabel: '销售类别*',
						name:'exclusive',
						width:220,
						queryMode : 'local',
						store : chExclusiveList,
						valueField: 'id',
						displayField: 'text',
						forceSelection:true
					}]
				},{
					xtype:'fieldset',
					title: '====<b>项目其他信息</b>====',
					border:0,
					//collapsible: true,
					defaults: {
						labelWidth: 89,
						anchor: '100%',
						labelAlign: 'top',
						layout: {
							type: 'hbox',
							defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
						}
					},
					items:[{xtype:'box',height:5,border:0},
					{
						xtype:'textareafield',
						fieldLabel: '合同情况',
						width:420,
						name:'contract',
						allowBlank: true
					},{
						xtype:'textareafield',
						fieldLabel: '打款账户',
						width:420,
						name:'pay_account',
						allowBlank: true
					},{
						xtype:'textareafield',
						fieldLabel: '备注',
						width:420,
						height:80,
						name:'remark',
						allowBlank: true
					},{
						xtype:'textareafield',
						fieldLabel: '产品经理备注',
						width:420,
						height:80,
						name:'manager_remark',
						allowBlank: true
					 }]
				}]
			},{xtype:'box',html:'<span style="color:#666666">注：标记*号的是必填项。下列字段不会被渠道及外部用户所见：销售类别，产品经理备注。</span>'}]
		}]
	});

	ProjWin.on({
		hide: function(){
			Ext.getBody().unmask();
		}
	});

listControl.load(function(records, operation, success) {
	var fullGridColumns=[
	{
		text:'项目<br>编号', dataIndex:'proj_id', filterable:true, width:50,style: "text-align:center;",align: 'center',
	}, {
		text:'proj_detail_id', dataIndex:'proj_detail_id', filterable:true, width:100,hidden:true
	}, {
		text:'项目状态', dataIndex:'pdt_status', filterable:true, width:68,style: "text-align:center;",align: 'center',hidden:false,
		renderer:function(value,metaData,record,rowIndex,colIndex,store,view) { 
			if(value=="申请中"){
				metaData.style='background:#003366;color:#ffffff;';
				return value;
			} else if(value=="上线通过"){
				metaData.style='background:#CCFFCC;color:#000000;';
				return "已上线";
			} else if(value=="上线驳回"){
				metaData.style='background:#DFDFDF;color:#606060;';
				return value;
			} else {
				return value;
			}
		}
	}, {
		text:'产品信息',columns:[
		{
			text:'产品等级', dataIndex:'grade', filterable:true,sortable : true, width:84,style: "text-align:center;",align: 'center',hidden:records[0].get("grade"),renderer: gradeFn
		}, {
			text:'项目名称', dataIndex:'name', filterable:true,sortable : true, width:220,style: "text-align:center;",align: 'left', hidden:records[0].get("name"),
			renderer: toolTipFn
		}, {
			xtype: 'actioncolumn',
			text:'编辑',
			width:60,style: "text-align:center;",align: 'center',
			sortable: false,
			items: [{
				icon: '/ts/misc/resources/icons/cog_16.png',
				tooltip: '编辑此条记录',
				handler: function(grid, rowIndex, colIndex) {
					//sampleStore.removeAt(rowIndex);      
					var proj_id=grid.getStore().getAt(rowIndex).get("proj_id");
					window.open('/ts/index.php/proj/update?proj_id='+proj_id);
				}
			}]
		}, {
			text:'类别', dataIndex:'sub_category', filterable:true,sortable : true, width:150,style: "text-align:center;",align: 'left', hidden:records[0].get("sub_category"),
			renderer: toolTipFn
		}, {
			text:'发行方', dataIndex:'issue', filterable:true,sortable : true, width:86,style: "text-align:center;",align: 'center', hidden:records[0].get("issue"),
			renderer: toolTipFn
		}]
	}, {
		text:'认购信息',columns:[
		{
			text:'子类', dataIndex:'sub_name', filterable:true,sortable : true, width:100,style: "text-align:center;",align: 'left', hidden:records[0].get("sub_name"),
			renderer: toolTipFn
		}, {
			text:'销售状态', dataIndex:'status', filterable:true,sortable : true, width:60,style: "text-align:center;",align: 'center', hidden:records[0].get("status"), 
			renderer:function(value,metaData){
				if(value=="在售"){
					metaData.style='background:#CCFFCC;color:#000000'
				}
				if(value=="预约"){
					metaData.style='background:#FFFF99;color:#000000'
				}
				if(value=="结束"){
					metaData.style='background:#DFDFDF;color:#606060;'
				}
				return value;
			}
		}, {
			text:'认购金额', dataIndex:'amount', filterable:true,sortable : true, width:60, style: "text-align:center;",align: 'center',hidden:records[0].get("amount"),
			renderer: function(value,metaData,record,rowIndex,colIndex,store,view) { 
				if(value>=10000){ return value/10000+'亿'; } 
				if(value<10000){ return value+'万'; } 
			}
		}, {
			text:'期限', dataIndex:'month', filterable:true,sortable : true, width:50,style: "text-align:center;",align: 'center', hidden:records[0].get("month"),
			renderer: function(value,metaData,record,rowIndex,colIndex,store,view) { 
				return value+'月';
			}
		}, {
			text:'收益', dataIndex:'profit', filterable:true,sortable : true, width:50, style: "text-align:center;",align: 'center',hidden:records[0].get("profit"),
			renderer: commissionFn
		}, {
			text:'份额', dataIndex:'total_share', filterable:true,sortable : true, width:50,style: "text-align:center;",align: 'center',hidden:records[0].get("total_share"), 
			renderer:function(value,metaData){
				if(value=="OPEN"){
					metaData.style='background:#CCFFCC;color:#000000'
				}
				if(value=="大带小"){
					metaData.style='background:#FFFF99;color:#000000'
				}
				if(value=="无"){
					metaData.style='background:#DFDFDF;color:#606060;'
				}
				return value;
			}
		}]
	}, {
		text:'佣金信息',columns:[
		{
			text:'税前佣金', dataIndex:'commission_b_tax', filterable:true,sortable : true, width:60, style: "text-align:center;",align: 'center',hidden:records[0].get("commission_b_tax"),
			renderer: commissionFn
		}, {
			text:'税后佣金', dataIndex:'commission_a_tax', filterable:true,sortable : true, width:60, style: "text-align:center;",align: 'center',hidden:records[0].get("commission_a_tax"),
			renderer: commissionFn
		}, {
			text:'平台费用', dataIndex:'inner_commission', filterable:true,sortable : true, width:60, style: "text-align:center;",align: 'center',hidden:records[0].get("inner_commission"),
			renderer: commissionFn
		}, {
			text:'费用', dataIndex:'outer_commission', filterable:true,sortable : true, width:50, style: "text-align:center;",align: 'center',hidden:records[0].get("outer_commission"),
			renderer: commissionFn
		}, {
			text:'现结费用', dataIndex:'imm_payment', filterable:true,sortable : true, width:60, style: "text-align:center;",align: 'center',hidden:records[0].get("imm_payment"),
			renderer: commissionFn
		}]
	}, {
		text:'附加信息',columns:[
		{
			text:'产品董事', dataIndex:'proj_director', filterable:true,sortable : true, width:60, style: "text-align:center;",align: 'center',hidden:records[0].get("proj_director")
		}, {
			text:'产品经理', dataIndex:'manager', filterable:true,sortable : true, width:60, style: "text-align:center;",align: 'center',hidden:records[0].get("manager")
		}, {
			text:'渠道公司',dataIndex:'channel_company',filterable:true,sortable : true, width:72, style: "text-align:center;",align: 'center',hidden:records[0].get("channel_company")
		}, {
			text:'添加时间',dataIndex:'create_ts',filterable:true,sortable : true, width:80, style: "text-align:center;",align: 'center',renderer:new Ext.util.Format.dateRenderer("Y-m-d")
		}, /*{
			text:'打款进度', dataIndex:'countdown', filterable:true,sortable : true, minWidth:200,hidden:records[0].get("countdown"),
			renderer: toolTipFn
		}, */{
			text:'备注', dataIndex:'remark', filterable:true,sortable : true, minWidth:200,hidden:records[0].get("remark"),
			renderer: toolTipFn
		}]
	}];
	
	projAllStore.load(function(){
		fullGridC1=Ext.create('searchPanel', {
			store: projAllStore,
			border:0,
			columnLines: true,
			title: '&nbsp;&nbsp;<b>&gt;&gt;&nbsp;固定收益产品&nbsp;&lt;&lt;</b> -- 点击折叠',
			margin:10,
			columns: fullGridColumns,
			viewConfig: {
				stripeRows: true,
				forceFit:true,
				sortAscText:'正序',
				sortDescText:'降序',
				getRowClass: function(record,rowIndex,rowParams,store){
					var sumVal=0;
					for (var i=0;i<rowIndex;i++) {
						if(store.getAt(i+1).data.name!=store.getAt(i).data.name){
							sumVal++;
						}
					}
					return (sumVal%2==0) ? 'style_row_proj0':'style_row_proj1';
				}
			},
			loadMask: true,
			features: [filtersCfg],
			emptyText: '没有匹配的记录',
			listeners:{
				beforeexpand:{
					fn:function(p){
						p.filters.clearFilters();
						projAllStore.filterBy( function(record,id){
							return record.get("category")=="固定收益类" ;
						});
						p.setTitle('&nbsp;&nbsp;<b>&gt;&gt;&nbsp;固定收益产品&nbsp;&lt;&lt;</b> -- 点击折叠');
					},
					scope:this
				},
				beforeCollapse:function(p){
					p.setTitle('&nbsp;&nbsp;<b>&gt;&gt;&nbsp;固定收益产品&nbsp;&lt;&lt;</b> -- 点击展开');
				}
			}
		});
    	
		fullGridC2=Ext.create('searchPanel', {
			store: projAllStore,
			border:0,
			margin:10,
			columnLines: true,
			title: '&nbsp;&nbsp;<b>&gt;&gt;&nbsp;浮动收益产品&nbsp;&lt;&lt;</b> -- 点击展开',
			columns: fullGridColumns,
			viewConfig: {
				stripeRows: true,
				forceFit:true,
				sortAscText:'正序',
				sortDescText:'降序',
				getRowClass: function(record,rowIndex,rowParams,store){    
					var sumVal=0;
					for (var i=0;i<rowIndex;i++) {
						if(store.getAt(i+1).data.name!=store.getAt(i).data.name){
							sumVal++;
						}
					}
					return (sumVal%2==0) ? 'style_row_proj0':'style_row_proj1';
				}
			},
			loadMask: true,
			features: [filtersCfg],
			emptyText: '没有匹配的记录',
			listeners:{
				beforeexpand:{
					fn:function(p){
						p.filters.clearFilters();
						projAllStore.filterBy( function(record,id){
							return record.get("category")=="浮动收益类" ;
						});
						p.setTitle('&nbsp;&nbsp;<b>&gt;&gt;&nbsp;浮动收益产品&nbsp;&lt;&lt;</b> -- 点击折叠');
					},
					scope:this
				},
				beforeCollapse:function(p){
					p.setTitle('&nbsp;&nbsp;<b>&gt;&gt;&nbsp;浮动收益产品&nbsp;&lt;&lt;</b> -- 点击展开');
				}
			}
		});
    	
		fullGridC1.child('toolbar').add([
		{
			xtype:'tbtext',
			text:'快速筛选：'
		},{
			xtype:'tbtext',
		  scale:'medium',
		  text:'【集合信托产品：'
		},{
			text:'上市公司股票质押',
		  scale:'medium',
			handler:function(){
			  fullGridC1.filters.clearFilters();
			  projAllStore.filterBy( function(record,id){
				return record.get("sub_category")=="集合信托：上市公司股票质押类" ;
			  });
			}
		},{
			text:'政府基建',
			scale:'medium',
			handler:function(){
			  fullGridC1.filters.clearFilters();
			  projAllStore.filterBy( function(record,id){
				return record.get("sub_category")=="集合信托：政府基建类";
			  });
			}
		},{
			text:'房地产',
			scale:'medium',
			handler:function(){
			  fullGridC1.filters.clearFilters();
			  projAllStore.filterBy( function(record,id){
				return record.get("sub_category")=="集合信托：房地产类";
			  });
			}
		},{
			text:'其他信托',
			scale:'medium',
			handler:function(){
			  fullGridC1.filters.clearFilters();
			  projAllStore.filterBy( function(record,id){
				return record.get("sub_category")=="集合信托：其他类";
			  });
			}
		},{
			text:'所有信托】',
			scale:'medium',
			handler:function(){
			  fullGridC1.filters.clearFilters();
			  projAllStore.filterBy( function(record,id){
				return record.get("sub_category")=="集合信托：其他类" ||
				  record.get("sub_category")=="集合信托：房地产类" ||
				  record.get("sub_category")=="集合信托：政府基建类" ||
				  record.get("sub_category")=="集合信托：上市公司股票质押类";
			  });
			}
		},{
			text:'【私募基金】',
			scale:'medium',
			handler:function(){
			  fullGridC1.filters.clearFilters();
			  projAllStore.filterBy( function(record,id){
				return record.get("sub_category")=="私募基金";
			  });
			}
		},{
			text:'【P2P理财】',
			scale:'medium',
			handler:function(){
			  fullGridC1.filters.clearFilters();
			  projAllStore.filterBy( function(record,id){
				return record.get("sub_category")=="P2P理财";
			  });
			}
		},{
			text:'【其他固定收益产品】',
			scale:'medium',
			handler:function(){
			  fullGridC1.filters.clearFilters();
			  projAllStore.filterBy( function(record,id){
				return (record.get("sub_category")=="其他" && record.get("category")=="固定收益类");
			  });
			}
		},'-',{
			text:'全部显示',
			scale:'medium',
			icon:'/ts/misc/resources/icons/article_16.png',
			handler:function(){
				fullGridC1.filters.clearFilters();
				projAllStore.load();
				projAllStore.filterBy( function(record,id){
					return record.get("category")=="固定收益类" ;
				});
			}
		}     
		]);
		fullGridC2.child('toolbar').add([
		{
			xtype:'tbtext',
			text:'快速筛选：'
		},{
			text:'【债券基金】',
			scale:'medium',
			handler:function(){
			  fullGridC2.filters.clearFilters();
			  projAllStore.filterBy( function(record,id){
				return record.get("sub_category")=="债券基金";
			  });
			}
		},{
			text:'【证券基金】',
			scale:'medium',
			handler:function(){
			  fullGridC2.filters.clearFilters();
			  projAllStore.filterBy( function(record,id){
				return record.get("sub_category")=="证券基金";
			  });
			}
		},{
			text:'【股权基金】',
			scale:'medium',
			handler:function(){
			  fullGridC2.filters.clearFilters();
			  projAllStore.filterBy( function(record,id){
				return record.get("sub_category")=="股权基金";
			  });
			}
		},{
			text:'【其他浮动收益产品】',
			scale:'medium',
			handler:function(){
			  fullGridC2.filters.clearFilters();
			  projAllStore.filterBy( function(record,id){
				return (record.get("sub_category")=="其他" && record.get("category")=="浮动收益类");
			  });
			}
		},'-',{
			text:'全部显示',
			scale:'medium',
			icon:'/ts/misc/resources/icons/article_16.png',
			handler:function(){
				fullGridC1.filters.clearFilters();
				projAllStore.load();
				projAllStore.filterBy( function(record,id){
					return record.get("category")=="浮动收益类" ;
				});
			}
		}]);
		var e=Ext.ComponentQuery.query('#projListPanel')[0];
		e.add(fullGridC1);
		e.add(fullGridC2);
		if(e.down("panel").collapsed == false) {
			projAllStore.load(function(){
				projAllStore.filterBy(function(record,id){
					return record.get("category")=="固定收益类" ;
				});
			});
		} else {
			projAllStore.load(function(){
				projAllStore.filterBy(function(record,id){
					return record.get("category")=="浮动收益类" ;
				});
			});
		}
	});
	
	var viewport = Ext.create('Ext.Viewport', {
		layout: {
			type: 'border',
			padding: 0
		},
		baseCls:'customT',
		items: [{
			xtype:'toolbar',
			region:'north',
			height: 40,
			id:'topMenu',
			border:0,
			margin:0,
			items:[
			{
				xtype:'image',
				src:'/ts/misc/resources/firstshin.jpg',
				width:240,
				height:38
			},{
				xtype:'box',
				flex:1
			},{
				icon: '/ts/misc/resources/icons/document_add_24.png',
				text: '新增项目',
				scale:'medium',
				handler: function() {
                    ProjWin.down('hiddenfield[name="proj_id"]').setValue(-1);
                    Ext.getBody().mask();
                    ProjWin.show();
                } 
			},{
				text:'查看在售列表',
				icon:'/ts/misc/resources/icons/document_alt_stroke_24.png',
				scale:'medium',
				itemId:"ListBtn",
				handler:function(){
					projAllStore.setProxy({
						type: 'ajax',
						url: '/ts/index.php/proj/view',
						reader:	{
							type: 'json',
							root: 'data'
						}
					});
					var e=Ext.ComponentQuery.query('#projListPanel')[0];
					if(e.down("panel").collapsed == false) {
						projAllStore.load(function(){
							projAllStore.filterBy(function(record,id){
								return record.get("category")=="固定收益类" ;
							});
						});
					} else {
						projAllStore.load(function(){
							projAllStore.filterBy(function(record,id){
								return record.get("category")=="浮动收益类" ;
							});
						});
					}
				}
			},{
				text:'查看近期结束项目',
				icon:'/ts/misc/resources/icons/document_alt_fill_24.png',
				scale:'medium',
				itemId:"endProjListBtn",
				handler:function(){
					projAllStore.setProxy({
						type: 'ajax',
						url: '/ts/index.php/proj/view?r=true&e=1',
						reader:	{
							type: 'json',
							root: 'data'
						}
					});
					var e=Ext.ComponentQuery.query('#projListPanel')[0];
					if(e.down("panel").collapsed == false) {
						projAllStore.load(function(){
							projAllStore.filterBy(function(record,id){
								return record.get("category")=="固定收益类" ;
							});
						});
					} else {
						projAllStore.load(function(){
							projAllStore.filterBy(function(record,id){
								return record.get("category")=="浮动收益类" ;
							});
						});
					}
				}
			},{
				text:'离开管理员模式',
				scale:'medium',
				icon:'/ts/misc/resources/icons/curved_arrow_24.png',
				handler:function(){window.location.href='/ts/index.php/proj';}
			}]
		}, {
			xtype:'panel',
			id:'projListPanel',
			border:0,
			width:1320,
			region:'center',
			layout:{
				type: 'accordion',
				animate: true,
				titleCollapse: true,
				activeOnTop: true
			},
			items:[]
		},{
			xtype:'toolbar',
			region:'south',
			border:0,
			height:20,
			items:[{
				xtype:'box',flex:1
			},{
				xtype:'box',
				html:'版权所有。上海玉尔投资发展有限公司 - 2012-2013年'
			},{
				xtype:'box',flex:1
			}]
		}]
	});
});

});

 
 