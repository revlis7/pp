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
  
listControl.load(function(records, operation, success) {
	var fullGridColumns=[
	{
		text:'proj_id', dataIndex:'proj_id', filtable:true, width:100,hidden:true
	}, {
		text:'proj_detail_id', dataIndex:'proj_detail_id', filtable:true, width:100,hidden:true
	}, {
		text:'产品信息',columns:[
		{
			text:'产品等级', dataIndex:'grade', filtable:true,sortable : true, width:94, hidden:records[0].get("grade"),renderer: gradeFn
		}, {
			text:'项目名称', dataIndex:'name', filtable:true,sortable : true, width:220,style: "text-align:center;",align: 'left', hidden:records[0].get("name"),
			renderer: function(value,metaData,record,rowIndex,colIndex,store,view) { 
				metaData.tdAttr = 'data-qtip="'+value+'"'; 
				return '<b>'+value+'</b>';
			}
		}, {
			xtype: 'actioncolumn',
			width:60,style: "text-align:center;",align: 'center', 
			sortable: false,
			items: [{
				icon: '/ts/misc/resources/icons/download.gif',
				tooltip: '查看该项目的详细信息',
				handler: function(grid, rowIndex, colIndex) {
					Ext.ComponentQuery.query('#topInfo')[0].proj_id=grid.getStore().getAt(rowIndex).get("proj_id");
					Ext.ComponentQuery.query('#topInfo')[0].getLayout().setActiveItem(2);
				}
          }]
        }, {
			text:'类别', dataIndex:'sub_category', filtable:true,sortable : true, width:150,style: "text-align:center;",align: 'left', hidden:records[0].get("sub_category"),
			renderer: toolTipFn
		}, {
			text:'发行方', dataIndex:'issue', filtable:true,sortable : true, width:86,style: "text-align:center;",align: 'center', hidden:records[0].get("issue"),
			renderer: toolTipFn
		}]
	}, {
		text:'认购信息',columns:[
		{
			text:'子类', dataIndex:'sub_name', filtable:true,sortable : true, width:100,style: "text-align:center;",align: 'left', hidden:records[0].get("sub_name"),
			renderer: toolTipFn
		}, {
			text:'销售状态', dataIndex:'status', filtable:true,sortable : true, width:60,style: "text-align:center;",align: 'center', hidden:records[0].get("status"), 
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
			text:'认购金额', dataIndex:'amount', filtable:true,sortable : true, width:60, style: "text-align:center;",align: 'center',hidden:records[0].get("amount"),
			renderer: function(value,metaData,record,rowIndex,colIndex,store,view) { 
				if(value>=10000){ return value/10000+'亿'; } 
				if(value<10000){ return value+'万'; } 
			}
		}, {
			text:'期限', dataIndex:'month', filtable:true,sortable : true, width:50,style: "text-align:center;",align: 'center', hidden:records[0].get("month"),
			renderer: function(value,metaData,record,rowIndex,colIndex,store,view) { 
				return value+'月';
			}
		}, {
			text:'收益', dataIndex:'profit', filtable:true,sortable : true, width:50, style: "text-align:center;",align: 'center',hidden:records[0].get("profit"),
			renderer: commissionFn
		}, {
			text:'份额', dataIndex:'total_share', filtable:true,sortable : true, width:50,style: "text-align:center;",align: 'center',hidden:records[0].get("total_share"), 
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
			text:'税前佣金', dataIndex:'commission_b_tax', filtable:true,sortable : true, width:60, style: "text-align:center;",align: 'center',hidden:records[0].get("commission_b_tax"),
			renderer: commissionFn
		}, {
			text:'税后佣金', dataIndex:'commission_a_tax', filtable:true,sortable : true, width:60, style: "text-align:center;",align: 'center',hidden:records[0].get("commission_a_tax"),
			renderer: commissionFn
		}, {
			text:'平台费用', dataIndex:'inner_commission', filtable:true,sortable : true, width:60, style: "text-align:center;",align: 'center',hidden:records[0].get("inner_commission"),
			renderer: commissionFn
		}, {
			text:'费用', dataIndex:'outer_commission', filtable:true,sortable : true, width:50, style: "text-align:center;",align: 'center',hidden:records[0].get("outer_commission"),
			renderer: commissionFn
		}, {
			text:'现结费用', dataIndex:'imm_payment', filtable:true,sortable : true, width:60, style: "text-align:center;",align: 'center',hidden:records[0].get("imm_payment"),
			renderer: commissionFn
		}]
	}, {
		text:'附加信息',columns:[
		{
			text:'产品经理', dataIndex:'manager', filtable:true,sortable : true, width:60, style: "text-align:center;",align: 'center',hidden:records[0].get("manager")
		}, {
			text:'渠道公司',dataIndex:'channel_company',filtable:true,sortable : true, width:72, style: "text-align:center;",align: 'center',hidden:records[0].get("channel_company")
		}, {
			text:'添加时间',dataIndex:'create_ts',filtable:true,sortable : true, width:80, style: "text-align:center;",align: 'center',renderer:new Ext.util.Format.dateRenderer("Y-m-d")
		}, {
			text:'打款进度', dataIndex:'countdown', filtable:true,sortable : true, minWidth:200,hidden:records[0].get("countdown"),
			renderer: toolTipFn
		}, {
			text:'备注', dataIndex:'remark', filtable:true,sortable : true, minWidth:200,hidden:records[0].get("remark"),
			renderer: toolTipFn
		}]
	}];
	
	projAllStore.load(function(){
		fullGridC1=Ext.create('searchPanel', {
			store: projAllStore,
			border:0,
			columnLines: true,
			//forceFit: true,
			width:1320,
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
			emptyText: '没有匹配的记录'
		});
    	
		fullGridC2=Ext.create('searchPanel', {
		  store: projAllStore,
		  border:0,
		  width:1320,
		  margin:10,
		  columnLines: true,
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
		  emptyText: '没有匹配的记录'
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
			  sampleStoreC1.filterBy( function(record,id){
				return record.get("sub_category")=="集合信托：上市公司股票质押类" ;
			  });
			}
		},{
			text:'政府基建',
			scale:'medium',
			handler:function(){
			  fullGridC1.filters.clearFilters();
			  sampleStoreC1.filterBy( function(record,id){
				return record.get("sub_category")=="集合信托：政府基建类";
			  });
			}
		},{
			text:'房地产',
			scale:'medium',
			handler:function(){
			  fullGridC1.filters.clearFilters();
			  sampleStoreC1.filterBy( function(record,id){
				return record.get("sub_category")=="集合信托：房地产类";
			  });
			}
		},{
			text:'其他信托',
			scale:'medium',
			handler:function(){
			  fullGridC1.filters.clearFilters();
			  sampleStoreC1.filterBy( function(record,id){
				return record.get("sub_category")=="集合信托：其他类";
			  });
			}
		},{
			text:'所有信托】',
			scale:'medium',
			handler:function(){
			  fullGridC1.filters.clearFilters();
			  sampleStoreC1.filterBy( function(record,id){
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
			  sampleStoreC1.filterBy( function(record,id){
				return record.get("sub_category")=="私募基金";
			  });
			}
		},{
			text:'【P2P理财】',
			scale:'medium',
			handler:function(){
			  fullGridC1.filters.clearFilters();
			  sampleStoreC1.filterBy( function(record,id){
				return record.get("sub_category")=="P2P理财";
			  });
			}
		},{
			text:'【其他固定收益产品】',
			scale:'medium',
			handler:function(){
			  fullGridC1.filters.clearFilters();
			  sampleStoreC1.filterBy( function(record,id){
				return record.get("sub_category")=="其他" ;
			  });
			}
		},'-',{
			text:'全部显示',
			scale:'medium',
			icon:'/ts/misc/resources/icons/grid.png',
			handler:function(){
			  fullGridC1.filters.clearFilters();
			  sampleStoreC1.load();
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
			  sampleStoreC2.filterBy( function(record,id){
				return record.get("sub_category")=="债券基金";
			  });
			}
		},{
			text:'【证券基金】',
			scale:'medium',
			handler:function(){
			  fullGridC2.filters.clearFilters();
			  sampleStoreC2.filterBy( function(record,id){
				return record.get("sub_category")=="证券基金";
			  });
			}
		},{
			text:'【股权基金】',
			scale:'medium',
			handler:function(){
			  fullGridC2.filters.clearFilters();
			  sampleStoreC2.filterBy( function(record,id){
				return record.get("sub_category")=="股权基金";
			  });
			}
		},{
			text:'【其他浮动收益产品】',
			scale:'medium',
			handler:function(){
			  fullGridC2.filters.clearFilters();
			  sampleStoreC2.filterBy( function(record,id){
				return record.get("sub_category")=="其他";
			  });
			}
		},'-',{
			text:'全部显示',
			scale:'medium',
			icon:'/ts/misc/resources/icons/grid.png',
			handler:function(){
			  fullGridC2.filters.clearFilters();
			  sampleStoreC2.load();
			}
		}]);
		Ext.ComponentQuery.query('#projListPanel')[0].add(fullGridC1);
		Ext.ComponentQuery.query('#projListPanel')[0].add(fullGridC2);
		
		recommendStore.load(function(recommendRecords, operation, success) {
			Ext.Array.forEach(recommendRecords,function(recommendRecord){
				var foundRecords = projAllStore.query('proj_id',recommendRecord.get("proj_id"));
				if(foundRecords.getCount()>0){
					var detailString='';
					foundRecords.each(function(record){
						detailString+=record.get("sub_name")+record.get("month")+"个月, "+(record.get("amount")<10000?(record.get("amount")+"万"):(record.get("amount")/10000+"亿"))+': '+record.get("profit")+'%; ';
					});
					var r=foundRecords.getAt(0);
					var recommendTempPanel=Ext.create('Ext.panel.Panel',{
						margin:'0 0 0 0',
						border:0,
						layout:'border',
						proj_id:r.get("proj_id"),
						title:"<b>"+r.get("issue")+" "+r.get("name")+"</b>, "+detailString,
						proj_info_tpl:'',
						items:[{
							itemId:'projDetailPanel',
							xtype:'panel',
							region:'center',
							border:0,
							layout:{
								type:'vbox',
								align:'stretch'
							},
							items:[]
						},{
							itemId:'projInfoPanel',
							xtype:'panel',
							region:'west',
							width:480,
							title:'项目信息',
							html:'正在加载项目信息...',
							autoScroll :true
						}],
						listeners:{
							beforeshow:{
								fn:generatePanelFn,
								scope:this
							},
							beforeexpand:{
								fn:generatePanelFn,
								scope:this
							},
							beforedeactivate:{
								fn:generatePanelFn,
								scope:this
							},
							deactivate:{
								fn:function(e){
									e.down('panel#projDetailPanel').removeAll(false);
								},
								scope:this
							},
							hide:{
								fn:function(e){
									e.down('panel#projDetailPanel').removeAll(false);
								},
								scope:this
							},
							collapse:{
								fn:function(e){
									e.down('panel#projDetailPanel').removeAll(false);
								},
								scope:this
							}
						}
					});
					Ext.ComponentQuery.query('#recommendPanel')[0].add(recommendTempPanel);
				}
			});
		});
		
		//if(loginname=='admin'){Ext.ComponentQuery.query('#topInfo')[0].getLayout().setActiveItem(2);}
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
			margin:'0 0 5 0',
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
				xtype: 'tbtext',
				text:"小提示：双击可以查看项目详细信息。"
			},{
				xtype:'box',
				flex:1
			},{
				text:'查看推荐项目',
				icon:'/ts/misc/resources/icons/plugin.gif',
				scale:'medium',
				itemId:"recommendBtn",
				handler:function(){
					this.hide();
					this.up('toolbar').down("#ListBtn").show();
					Ext.ComponentQuery.query('#topInfo')[0].getLayout().setActiveItem(0);
				}
			},{
				text:'查看在售列表',
				icon:'/ts/misc/resources/icons/plugin.gif',
				scale:'medium',
				itemId:"ListBtn",
				handler:function(){
					this.hide();
					this.up('toolbar').down("#recommendBtn").show();
					Ext.ComponentQuery.query('#topInfo')[0].getLayout().setActiveItem(1);
				}
			},{
				text:'进入管理模式',
				icon:'/ts/misc/resources/icons/plugin.gif',
				scale:'medium',
				hidden:records[0].get("manage_button"),
				handler:function(){window.location.href='/ts/index.php/proj/manage';}
			},{
				text:'个人信息：'+loginname,
				icon:'/ts/misc/resources/icons/user.png',
				scale:'medium',
				handler:function(){window.location.href='/ts/index.php/user/info';}
			},{
				text:'退出',
				scale:'medium',
				icon:'/ts/misc/resources/icons/cross.gif',
				handler:function(){window.location.href='/ts/index.php/logout';}
			}]
		}, {
			xtype:'panel',
			height:150,
			id:'topInfo',
			region:'center',
			border:0,
			layout:'card',
			resizable:false,
			items:[
			{
				xtype:'panel',
				border:0,
				width:1320,
				id:'recommendPanel',
				region:'center',
				layout:{
				  type: 'accordion',
				  animate: true,
				  titleCollapse: true,
				  activeOnTop: true
				},
				items:[]
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
			}, {
				xtype:'panel',
				id:'projPanel',
				margin:'0 0 0 0',
				border:0,
				layout:'border',
				proj_id:'',
				title:'',
				proj_info_tpl:'',
				items:[{
					itemId:'projDetailPanel',
					xtype:'panel',
					region:'center',
					border:0,
					layout:{
						type:'vbox',
						align:'stretch'
					},
					items:[]
				},{
					itemId:'projInfoPanel',
					xtype:'panel',
					region:'west',
					width:480,
					title:'项目信息',
					html:'正在加载项目信息...',
					autoScroll :true
				}],
				listeners:{
					beforeshow:{
						fn:generatePanelFn,
						scope:this
					},
					beforeexpand:{
						fn:generatePanelFn,
						scope:this
					},
					beforedeactivate:{
						fn:generatePanelFn,
						scope:this
					},
					deactivate:{
						fn:function(e){
							e.down('panel#projDetailPanel').removeAll(false);
						},
						scope:this
					},
					hide:{
						fn:function(e){
							e.down('panel#projDetailPanel').removeAll(false);
						},
						scope:this
					},
					collapse:{
						fn:function(e){
							e.down('panel#projDetailPanel').removeAll(false);
						},
						scope:this
					}
				}
			}]
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


	window.setInterval(function(){
		sampleStoreC1.load();
		sampleStoreC2.load();
	},1200000);
});

 
 