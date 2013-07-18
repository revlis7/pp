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
	}
  });
  
  function slidepanel(co){co.animate({from:{left:500},to:{left:10}})};
  function slideproj(co){
	co.animate({from:{y:co.y-300},to:{y:co.y+88},easeing:'backOut',duration:500})
  };
  
listControl.load(function(records, operation, success) {
	var fullGridColumns=[
	{
		text:'proj_id', dataIndex:'proj_id', filterable:true, width:100,hidden:true
	}, {
		text:'proj_detail_id', dataIndex:'proj_detail_id', filterable:true, width:100,hidden:true
	}, {
		text:'产品信息',columns:[
		{
			text:'产品等级', dataIndex:'grade', filterable:true,sortable : true, width:94, hidden:records[0].get("grade"),renderer: gradeFn
		}, {
			text:'项目名称', dataIndex:'name', filterable:true,sortable : true, width:220,style: "text-align:center;",align: 'left', hidden:records[0].get("name"),
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
					Ext.ComponentQuery.query('#projPanel')[0].proj_id=grid.getStore().getAt(rowIndex).get("proj_id");
					Ext.ComponentQuery.query('#projPanel')[0].setTitle(grid.getStore().getAt(rowIndex).get("issue")+" "+grid.getStore().getAt(rowIndex).get("name"))
					Ext.ComponentQuery.query('#topInfo')[0].getLayout().setActiveItem(2);
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
			text:'产品经理', dataIndex:'manager', filterable:true,sortable : true, width:60, style: "text-align:center;",align: 'center',hidden:records[0].get("manager")
		}, {
			text:'渠道公司',dataIndex:'channel_company',filterable:true,sortable : true, width:72, style: "text-align:center;",align: 'center',hidden:records[0].get("channel_company")
		}, {
			text:'添加时间',dataIndex:'create_ts',filterable:true,sortable : true, width:80, style: "text-align:center;",align: 'center',renderer:new Ext.util.Format.dateRenderer("Y-m-d")
		}, {
			text:'打款进度', dataIndex:'countdown', filterable:true,sortable : true, minWidth:200,hidden:records[0].get("countdown"),
			renderer: toolTipFn
		}, {
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
			icon:'/ts/misc/resources/icons/grid.png',
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
			icon:'/ts/misc/resources/icons/grid.png',
			handler:function(){
				fullGridC1.filters.clearFilters();
				projAllStore.load(function(){
					projAllStore.filterBy( function(record,id){
						return record.get("category")=="浮动收益类" ;
					});
				});
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
						margin:10,
						border:0,
						layout:'border',
						proj_id:r.get("proj_id"),
						title:"<b>"+r.get("issue")+" "+r.get("name")+"</b>, "+detailString,
						proj_info_tpl:'',
						dockedItems:[{
							dock: 'top',
							xtype: 'toolbar',
							scale:'medium',
							bodyPadding: 5,
							items: [{
								icon:'/ts/misc/resources/icons/accept.gif',
								text: '我要预约该项目',
								scale:'medium',
								handler: function() {
									Ext.Msg.alert("提示","该功能尚未开放！");
								}
							}]
						}],
						items:[{
							itemId:'projDetailPanel',
							xtype:'panel',
							region:'center',
							border:0,
							autoScroll :true,
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
							beforeexpand:{
								fn:generatePanelFn,
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
			
			Ext.ComponentQuery.query('#recommendBtn')[0].toggle();
		});
		
		//if(loginname=='admin'){Ext.ComponentQuery.query('#topInfo')[0].getLayout().setActiveItem(2);}
		//Ext.ComponentQuery.query('#recommendPanel')[0].items.items[0].collapse();
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
				text:'查看推荐项目',
				icon:'/ts/misc/resources/icons/plugin.gif',
				scale:'medium',
				itemId:"recommendBtn",
				handler:function(){
					projAllStore.setProxy({
						type: 'ajax',
						url: '/ts/index.php/proj/view',
						reader:	{
							type: 'json',
							root: 'data'
						}
					});
					projAllStore.load(function(){
						var recP=Ext.ComponentQuery.query('#recommendPanel')[0];
						if(recP.down("panel").collapsed == false) {
							var e=recP.down("panel");
							fileListStore.setProxy({
								type: 'ajax',
								url: '/ts/index.php/upload/get_list?proj_id='+e.proj_id,
								reader:	{
									type: 'json',
									root: 'data'
								}
							});
							projDetailStore.setProxy({
								type: 'ajax',
								url: '/ts/index.php/proj/detail_view?proj_id='+e.proj_id,
								reader: {
									type: 'json',
									root: 'data'
								}
							});
							recentChangeStore.setProxy({
								type: 'ajax',
								url: '/ts/index.php/proj/detail_view?proj_id='+e.proj_id,
								reader: {
									type: 'json',
								root: 'data'
								}
							});
							fileListStore.load();
							projDetailStore.load();
							recentChangeStore.load();
							e.down('panel#projDetailPanel').add(RecentChangeGrid).show();
							e.down('panel#projDetailPanel').add(AmountDetailsGrid).show();
							e.down('panel#projDetailPanel').add(FileListGrid).show();
							var	foundRecords = projAllStore.query('proj_id',e.proj_id);
							if(foundRecords.getCount()>0){
								var	detailString="";
								foundRecords.each(function(record){
									detailString+='<pre>'+record.get("sub_name")+record.get("month")+"个月, "+(record.get("amount")<10000?(record.get("amount")+"万"):(record.get("amount")/10000+"亿"))+':	'+record.get("profit")+'%</pre>';
								});
								e.proj_info_tpl = Ext.create('Ext.XTemplate',[
								'<table	style="border-collapse:collapse;"><tr><td style="padding:20px;border:1px;"><table style="border-collapse:collapse;">',
								'<tr><td class="r_ex_td_pre"><b>分类</b></td><td class="r_ex_td_main"><pre>{category}: {sub_category}, {exclusive}</pre></td></tr>',
								'<tr><td class="r_ex_td_pre"><b>项目名称</b></td><td class="r_ex_td_main"><pre>{name}</pre></td></tr>',
								'<tr><td class="r_ex_td_pre"><b>基本情况</b></td><td class="r_ex_td_main"><b>{profit_property}收益</b>项目，由<b>{issue}</b>发行，融资规模<b>{scale:this.cusNum()}</b>，按<b>{cycle}</b>分配</td></tr>',
								'<tr><td class="r_ex_td_pre"><b>项目评级</b></td><td class="r_ex_td_main">{grade:this.cusGrade()}</td></tr>',
								'<tr><td class="r_ex_td_pre"><b>预期收益</b></td><td class="r_ex_td_main">',
								detailString, '</td></tr>',
								'<tr><td class="r_ex_td_pre"><b>资金投向</b></td><td class="r_ex_td_main"><pre>{flow_of_fund}</pre></td></tr>',
								'<tr><td class="r_ex_td_pre"><b>项目亮点</b></td><td class="r_ex_td_main"><pre>{highlights}</pre></td></tr>',
								'<tr><td class="r_ex_td_pre"><b>合同情况</b></td><td class="r_ex_td_main"><pre>{contract}</pre></td></tr>',
								'<tr><td class="r_ex_td_pre"><b>项目进度</b></td><td class="r_ex_td_main"><pre>{countdown}</pre></td></tr>',
								'<tr><td class="r_ex_td_pre"><b>打款账号</b></td><td class="r_ex_td_main"><pre>{pay_account}</pre></td></tr>',
								'<tr><td class="r_ex_td_pre"><b>备注</b></td><td class="r_ex_td_main"><pre>{remark}</pre></td></tr>',
								'<tr><td class="r_ex_td_pre"><b>项目经理备注</b></td><td class="r_ex_td_main"><pre>{manager_remark}</pre></td></tr>',
								'</table></td></tr></table>',
								{
									cusDate:function(d){
										return Ext.Date.format(d,'Y年m月d日');
									}
								},{
									cusNum:function(n){
										return (n<1)?(n*10000+"万"):(n+"亿")
									}
								},{
									cusGrade:gradeFn
								}]);
							};
							e.proj_info_tpl.overwrite(e.down('panel#projInfoPanel').body,foundRecords.getAt(0).data);
						} else {
							recP.down("panel").expand();
						}
					});
						
					Ext.ComponentQuery.query('#topInfo')[0].getLayout().setActiveItem(0);
				}
			},{
				text:'查看在售列表',
				icon:'/ts/misc/resources/icons/plugin.gif',
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
					Ext.ComponentQuery.query('#topInfo')[0].getLayout().setActiveItem(1);
				}
			},{
				text:'查看近期结束项目',
				icon:'/ts/misc/resources/icons/plugin.gif',
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
				margin:10,
				border:0,
				layout:'border',
				proj_id:'',
				title:'',
				proj_info_tpl:'',
				dockedItems:[{
					dock: 'top',
					xtype: 'toolbar',
					scale:'medium',
					bodyPadding: 5,
					items: [{
						icon:'/ts/misc/resources/icons/accept.gif',
						text: '我要预约该项目',
						scale:'medium',
						handler: function() {
							Ext.Msg.alert("提示","该功能尚未开放！");
						}
					}]
				}],
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
					beforeactivate:{
						fn:generatePanelFn,
						scope:this
					},
					deactivate:{
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


});

 
 