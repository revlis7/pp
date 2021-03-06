Ext.onReady(function() {
  Ext.QuickTips.init();
  var params=Ext.Object.fromQueryString(location.search.substring(1));
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
	  {name:'proj_director'  ,type:'boolean' },
	  {name:'create_ts'  ,type:'boolean' },
	  {name:'commission_partner'  ,type:'boolean' }
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


    var topToolbar=Ext.create('Ext.toolbar.Toolbar',{
		region:'north',
		height: 56,
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
            html:'<span class="app-header2">&nbsp;</span>'
		},{
			xtype:'box',
			flex:1
		},{
			text:'查看在售产品列表',
			icon:'/ts/misc/resources/icons/document_alt_stroke_24.png',
			scale:'medium',
            hidden:true,
			id:"ListBtn",
			handler:function(){
                Ext.getCmp('headerTitle').setText('<span class="app-header2">固定收益类：在售产品列表</span>');
                //Ext.getCmp("endProjListBtn").show();
                //Ext.getCmp("ListBtn").hide();
				projAllStore.setProxy({
					type: 'ajax',
					url: '/ts/index.php/proj/view?c=1',
					reader:	{
						type: 'json',
						root: 'data'
					}
				});
                projAllStore.load();
				projAllAdvStore.setProxy({
					type: 'ajax',
					url: '/ts/index.php/proj/view?c=1&adv=1',
					reader:	{
						type: 'json',
						root: 'data'
					}
				});
                projAllAdvStore.load();
                Ext.getCmp('ListBtn').hide();
                Ext.getCmp('endProjListBtn').show();
				Ext.getCmp('topInfo').getLayout().setActiveItem(0);
			}
		},{
			text:'查看近期结束产品列表',
			icon:'/ts/misc/resources/icons/document_alt_fill_24.png',
			scale:'medium',
			id:"endProjListBtn",
            //hidden:true,
			handler:function(){
                Ext.getCmp('headerTitle').setText('<span class="app-header2">固定收益类：近期结束产品列表</span>');
                //Ext.getCmp("endProjListBtn").hide();
                //Ext.getCmp("ListBtn").show();
				projAllStore.setProxy({
					type: 'ajax',
					url: '/ts/index.php/proj/view?c=1&r=true&e=1',
					reader:	{
						type: 'json',
						root: 'data'
					}
				});
                projAllStore.load();
				projAllAdvStore.setProxy({
					type: 'ajax',
					url: '/ts/index.php/proj/view?c=1&adv=1&r=true&e=1',
					reader:	{
						type: 'json',
						root: 'data'
					}
				});
                projAllAdvStore.load();
                Ext.getCmp('endProjListBtn').hide();
                Ext.getCmp('ListBtn').show();
				Ext.getCmp('topInfo').getLayout().setActiveItem(0);
			}
		},{
			text:'高级列表',
			icon:'/ts/misc/resources/icons/wrench_24.png',
			scale:'medium',
            id:'BtnAdv',
			handler:function(){
                Ext.getCmp('topInfo').getLayout().setActiveItem(2);
                Ext.getCmp('BtnAdv').hide();
                Ext.getCmp('BtnBrief').show();
            }
		},{
			text:'简略列表',
			icon:'/ts/misc/resources/icons/wrench_24.png',
			scale:'medium',
            id:'BtnBrief',
            hidden:true,
			handler:function(){
                Ext.getCmp('topInfo').getLayout().setActiveItem(0);
                Ext.getCmp('BtnBrief').hide();
                Ext.getCmp('BtnAdv').show();
            }
		},{
			text:'进入管理模式',
			icon:'/ts/misc/resources/icons/wrench_24.png',
            id:'BtnManage',
			scale:'medium',
			hidden:true,
			handler:function(){window.location.href='/ts/index.php/proj/manage';}
		}]
	});

	var viewport = Ext.create('Ext.Viewport', {
        id:'viewport',
		layout: {
			type: 'border',
			padding: 0
		},
		baseCls:'customT',
		items: [{
			xtype:'toolbar',
			region:'south',
			border:0,
			height:20,
			items:[{
				xtype:'box',flex:1
			},{
				xtype:'box',
				html:'版权所有。北京玉尔财富投资管理有限公司 - 2012-2013年'
			},{
				xtype:'box',flex:1
			}]
		}]
	});

    var projPanel=Ext.create('Ext.panel.Panel',{
		id:'projPanel',
		//margin:10,
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
					icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
					text: '我要预约该产品',
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
            autoScroll : true,
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
			width:586,
			//title:'产品信息',
			html:'正在加载产品信息...',
            border:0,
			autoScroll :true
		}],
		listeners:{
			beforeactivate:{
                fn:function(e){generatePanelFn(e)},
				scope:this
			},
			deactivate:{
				fn:function(e){
					e.down('panel#projDetailPanel').removeAll(false);
				},
				scope:this
			}
		}
	});

listControl.load(function(records, operation, success) {
    if(records[0].get("manage_button") == false){
        Ext.getCmp('BtnManage').show();
    }
    
	AmountDetailsGrid=Ext.create('Ext.grid.Panel',{
		store: projDetailStore,
		//border:1,
		//title:'额度信息',
		region:'center',
		minHeight:156,
		flex:1,
		emptyText:'暂无额度信息',
		defaults:{
			filtable:true,
			style: "text-align:center;",
			align: 'center'
		},
		columns:[
		{text:'销售状态',	 dataIndex:'status', width:80,filtable:true,style: "text-align:center;",align: 'center', hidden:records[0].get("status"),
			renderer:function(value,metaData){
				if(value=="在售"){
					metaData.style='background:#CCFFCC;color:#000000'
				} else if(value=="结束"){
					metaData.style='background:#DFDFDF;color:#606060;'
				} else {
					metaData.style='background:#FFFF99;color:#000000'
				}
				return value;
			}
		},
		{text:'份额',		 dataIndex:'total_share', width:60,filtable:true,style: "text-align:center;",align: 'center', hidden:records[0].get("total_share"),
			renderer:function(value,metaData){
				if(value=="OPEN"){
					metaData.style='background:#CCFFCC;color:#000000'
				} else if(value=="无"){
					metaData.style='background:#DFDFDF;color:#606060;'
				} else {
					metaData.style='background:#FFFF99;color:#000000'
				}
				return value;
			}
		},
		{text:'子名称',		 dataIndex:'sub_name', width:94,filtable:true,style: "text-align:center;",align: 'center', hidden:records[0].get("sub_name")},
		{text:'产品期限',	 dataIndex:'month',	width:80,filtable:true,style: "text-align:center;",align: 'center', hidden:records[0].get("month"),renderer:function(value,metaData,record,colIndex,store,view) {return value+'个月';}},
		{text:'认购金额',	 dataIndex:'amount', width:80,filtable:true,style: "text-align:center;",align: 'center', hidden:records[0].get("amount"),renderer:function(value,metaData,record,colIndex,store,view) {return value+'万';}},
		{text:'产品收益',	 dataIndex:'profit', width:80,filtable:true,style: "text-align:center;",align: 'center', hidden:records[0].get("profit"),renderer:function(value,metaData,record,colIndex,store,view) {return value.toFixed(3)+'%';}},
		{text:'税前佣金',	 dataIndex:'commission_b_tax', filtable:true,style: "text-align:center;",align: 'center',width:76, hidden:records[0].get("commission_b_tax"),		 
			renderer: commissionFn
		},
		{text:'税后佣金',	 dataIndex:'commission_a_tax', filtable:true,style: "text-align:center;",align: 'center',width:76, hidden:records[0].get("commission_a_tax"),		 
			renderer: commissionFn
		},
		{text:'平台费用',	 dataIndex:'inner_commission', filtable:true,style: "text-align:center;",align: 'center',width:76, hidden:records[0].get("inner_commission"),		 
			renderer: commissionFn
		},
		{text:'合伙人费用',	 dataIndex:'commission_partner', filtable:true,style: "text-align:center;",align: 'center',width:76, hidden:records[0].get("commission_partner"),		 
			renderer: commissionFn
		},
		{text:'费用',		 dataIndex:'outer_commission', filtable:true,style: "text-align:center;",align: 'center',width:76, hidden:records[0].get("outer_commission"),		 
			renderer: commissionFn
		},
		{text:'成立日期',	 dataIndex:'found',	width:88,filtable:true,style: "text-align:center;",align: 'center', hidden:records[0].get("found"),renderer:new Ext.util.Format.dateRenderer("Y-m-d")}
		]
	});
    var fullGridColumns=[
	{
		text:'proj_id', dataIndex:'id', filterable:true, width:100,hidden:true
	}, {
		text:'产品信息',columns:[
		{
			text:'产品等级', dataIndex:'grade', filterable:true,sortable : true, width:96,style: "text-align:center;",align: 'center', hidden:records[0].get("grade"),renderer: gradeFn
		}, {
			text:'类别', dataIndex:'sub_category', filterable:true,sortable : true, width:180,style: "text-align:center;",align: 'left', hidden:records[0].get("sub_category"),
			renderer: toolTipFn
		}, {
			text:'发行方', dataIndex:'issue', filterable:true,sortable : true, width:116,style: "text-align:center;",align: 'center', hidden:records[0].get("issue"),
			renderer: toolTipFn
		}, {
			text:'产品名称', dataIndex:'name', filterable:true,sortable : true, width:240,style: "text-align:center;",align: 'left', hidden:records[0].get("name"),
             renderer:function(value,metaData,record,rowIndex,colIndex,store,view) { 
           		metaData.tdAttr = 'data-qtip="'+value+'"'; 
                 return '<table><tr><td style="height:22px;vertical-align:middle"><b>'+value+'</b></td><tr></table>';
            }
		}, {
			xtype: 'actioncolumn',
			width:60,style: "text-align:center;",align: 'center', 
			sortable: false,
			items: [{
				icon: '/ts/misc/resources/icons/magnifying_glass_16.png',
				tooltip: '查看该产品的详细信息',
				handler: function(grid, rowIndex, colIndex) {
					//e=Ext.getCmp('projPanel');
					//e.proj_id=grid.getStore().getAt(rowIndex).get("proj_id");
					//e.setTitle(grid.getStore().getAt(rowIndex).get("issue")+" "+grid.getStore().getAt(rowIndex).get("name"))
					//Ext.getCmp('topInfo').getLayout().setActiveItem(2);
                    var proj_id=grid.getStore().getAt(rowIndex).get("proj_id");
					window.open('/ts/index.php/proj?proj_id='+proj_id);
				}
          }]
        }]
	}, {
		text:'认购信息',columns:[
			{
             text:'起购金额', dataIndex:'min_amount', filterable:true,sortable : true, width:100,style: "text-align:center;",align: 'center', hidden:records[0].get("sub_name"),
             renderer:function(value,metaData,record,rowIndex,colIndex,store,view) { 
                 return value+'万元';
             }
            },            {
             text:'期限', dataIndex:'min_month', filterable:true,sortable : true, width:120,style: "text-align:center;",align: 'center', hidden:records[0].get("month"),
             renderer:function(value,metaData,record,rowIndex,colIndex,store,view) { 
                 if(record.get("min_month")==record.get("max_month")) {
                 	return record.get("min_month")+"个月"
                 } else {
                    return record.get("min_month")+"～"+record.get("max_month")+"个月"
                 }
             }
            },
            {text:'收益', dataIndex:'min_profit', filterable:true,sortable : true, width:120,style: "text-align:center;",align: 'center', hidden:records[0].get("profit"),
             renderer:function(value,metaData,record,rowIndex,colIndex,store,view) { 
                 if(record.get("min_profit")==record.get("max_profit")) {
                 	return record.get("min_profit")+"%"
                 } else {
                    return record.get("min_profit")+"%～"+record.get("max_profit")+"%"
                 }
             }
            }

		/*{
			text:'子类', dataIndex:'sub_name', filterable:true,sortable : true, width:100,style: "text-align:center;",align: 'left', hidden:records[0].get("sub_name"),
			renderer: toolTipFn
		}, {
			text:'销售状态', dataIndex:'status', filterable:true,sortable : true, width:76,style: "text-align:center;",align: 'center', hidden:records[0].get("status"), 
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
			text:'认购金额', dataIndex:'amount', filterable:true,sortable : true, width:76, style: "text-align:center;",align: 'center',hidden:records[0].get("amount"),
			renderer: function(value,metaData,record,rowIndex,colIndex,store,view) { 
				if(value>=10000){ return value/10000+'亿'; } 
				if(value<10000){ return value+'万'; } 
			}
		}, {
			text:'期限', dataIndex:'month', filterable:true,sortable : true, width:64,style: "text-align:center;",align: 'center', hidden:records[0].get("month"),
			renderer: function(value,metaData,record,rowIndex,colIndex,store,view) { 
				return value+'月';
			}
		}, {
			text:'收益', dataIndex:'profit', filterable:true,sortable : true, width:64, style: "text-align:center;",align: 'center',hidden:records[0].get("profit"),
			renderer: commissionFn
		}, {
			text:'份额', dataIndex:'total_share', filterable:true,sortable : true, width:64,style: "text-align:center;",align: 'center',hidden:records[0].get("total_share"), 
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
		}, {
			text:'税前佣金', dataIndex:'commission_b_tax', filterable:true,sortable : true, width:76, style: "text-align:center;",align: 'center',hidden:records[0].get("commission_b_tax"),
			renderer: commissionFn
		}, {
			text:'税后佣金', dataIndex:'commission_a_tax', filterable:true,sortable : true, width:76, style: "text-align:center;",align: 'center',hidden:records[0].get("commission_a_tax"),
			renderer: commissionFn
		}, {
			text:'平台费用', dataIndex:'inner_commission', filterable:true,sortable : true, width:76, style: "text-align:center;",align: 'center',hidden:records[0].get("inner_commission"),
			renderer: commissionFn
		}, {
			text:'费用', dataIndex:'outer_commission', filterable:true,sortable : true, width:76, style: "text-align:center;",align: 'center',hidden:records[0].get("outer_commission"),
			renderer: commissionFn
		}*/]
	}, {
		text:'附加信息',columns:[
		{
			text:'产品董事', dataIndex:'proj_director', filterable:true,sortable : true, width:86, style: "text-align:center;",align: 'center',hidden:records[0].get("proj_director")
		}, {
			text:'产品经理', dataIndex:'manager', filterable:true,sortable : true, width:86, style: "text-align:center;",align: 'center',hidden:records[0].get("manager")
		}/*, {
			text:'渠道公司',dataIndex:'channel_company',filterable:true,sortable : true, width:72, style: "text-align:center;",align: 'center',hidden:records[0].get("channel_company")
		}*/, {
			text:'添加时间',dataIndex:'create_ts',filterable:true,sortable : true, width:116, style: "text-align:center;",align: 'center',renderer:new Ext.util.Format.dateRenderer("Y-m-d")
		}/*, {
			text:'打款进度', dataIndex:'countdown', filterable:true,sortable : true, minWidth:200,hidden:records[0].get("countdown"),
			renderer: toolTipFn
		}, {
			text:'备注', dataIndex:'remark', filterable:true,sortable : true, minWidth:200,hidden:records[0].get("remark"),
			renderer: toolTipFn
		}*/]
	}];
        
    var fullAdvGridColumns=[
	{
		text:'proj_id', dataIndex:'id', filterable:true, width:100,hidden:true
	}, {
		text:'proj_detail_id', dataIndex:'proj_detail_id', filterable:true, width:100,hidden:true
	}, {
		text:'产品信息',columns:[
		{
			text:'产品等级', dataIndex:'grade', filterable:true,sortable : true, width:96,style: "text-align:center;",align: 'center', hidden:records[0].get("grade"),renderer: gradeFn
		}, {
			text:'类别', dataIndex:'sub_category', filterable:true,sortable : true, width:180,style: "text-align:center;",align: 'left', hidden:records[0].get("sub_category"),
			renderer: toolTipFn
		}, {
			text:'发行方', dataIndex:'issue', filterable:true,sortable : true, width:116,style: "text-align:center;",align: 'center', hidden:records[0].get("issue"),
			renderer: toolTipFn
		}, {
			text:'产品名称', dataIndex:'name', filterable:true,sortable : true, width:240,style: "text-align:center;",align: 'left', hidden:records[0].get("name"),
             renderer:function(value,metaData,record,rowIndex,colIndex,store,view) { 
            	 metaData.tdAttr = 'data-qtip="'+value+'"'; 
                 return '<b>'+value+'</b>';
            }
		}, {
			text:'资金投向', dataIndex:'flow_of_fund', filterable:true,sortable : true, width:350,style: "text-align:center;",align: 'left', hidden:records[0].get("flow_of_fund"),
			renderer: toolTipFn
		}, {
			xtype: 'actioncolumn',
			width:60,style: "text-align:center;",align: 'center', 
			sortable: false,
			items: [{
				icon: '/ts/misc/resources/icons/magnifying_glass_16.png',
				tooltip: '查看该产品的详细信息',
				handler: function(grid, rowIndex, colIndex) {
					//e=Ext.getCmp('projPanel');
					//e.proj_id=grid.getStore().getAt(rowIndex).get("proj_id");
					//e.setTitle(grid.getStore().getAt(rowIndex).get("issue")+" "+grid.getStore().getAt(rowIndex).get("name"))
					//Ext.getCmp('topInfo').getLayout().setActiveItem(2);
                    var proj_id=grid.getStore().getAt(rowIndex).get("proj_id");
					window.open('/ts/index.php/proj?proj_id='+proj_id);
				}
          }]
        }]
	}, {
		text:'认购信息',columns:[
			/*{
             text:'起购金额', dataIndex:'min_amount', filterable:true,sortable : true, width:100,style: "text-align:center;",align: 'center', hidden:records[0].get("sub_name"),
             renderer:function(value,metaData,record,rowIndex,colIndex,store,view) { 
                 return value+'万元';
             }
            },            {
             text:'期限', dataIndex:'min_month', filterable:true,sortable : true, width:120,style: "text-align:center;",align: 'center', hidden:records[0].get("sub_name"),
             renderer:function(value,metaData,record,rowIndex,colIndex,store,view) { 
                 if(record.get("min_month")==record.get("max_month")) {
                 	return record.get("min_month")+"个月"
                 } else {
                    return record.get("min_month")+"～"+record.get("max_month")+"个月"
                 }
             }
            },
            {text:'收益', dataIndex:'min_profit', filterable:true,sortable : true, width:120,style: "text-align:center;",align: 'center', hidden:records[0].get("sub_name"),             renderer:function(value,metaData,record,rowIndex,colIndex,store,view) { 
                 if(record.get("min_profit")==record.get("max_profit")) {
                 	return record.get("min_profit")+"%"
                 } else {
                    return record.get("min_profit")+"%～"+record.get("max_profit")+"%"
                 }
             }
            }*/
		{
			text:'子类', dataIndex:'sub_name', filterable:true,sortable : true, width:80,style: "text-align:center;",align: 'center', hidden:records[0].get("sub_name"),
			renderer: toolTipFn
		}, {
			text:'销售状态', dataIndex:'status', filterable:true,sortable : true, width:76,style: "text-align:center;",align: 'center', hidden:records[0].get("status"), 
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
			text:'认购金额', dataIndex:'amount', filterable:true,sortable : true, width:76, style: "text-align:center;",align: 'center',hidden:records[0].get("amount"),
			renderer: function(value,metaData,record,rowIndex,colIndex,store,view) { 
				if(value>=10000){ return value/10000+'亿'; } 
				if(value<10000){ return value+'万'; } 
			}
		}, {
			text:'期限', dataIndex:'month', filterable:true,sortable : true, width:64,style: "text-align:center;",align: 'center', hidden:records[0].get("month"),
			renderer: function(value,metaData,record,rowIndex,colIndex,store,view) { 
				return value+'月';
			}
		}, {
			text:'收益', dataIndex:'profit', filterable:true,sortable : true, width:64, style: "text-align:center;",align: 'center',hidden:records[0].get("profit"),
			renderer: commissionFn
		}, {
			text:'份额', dataIndex:'total_share', filterable:true,sortable : true, width:64,style: "text-align:center;",align: 'center',hidden:records[0].get("total_share"), 
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
		}, {
			text:'税前佣金', dataIndex:'commission_b_tax', filterable:true,sortable : true, width:76, style: "text-align:center;",align: 'center',hidden:records[0].get("commission_b_tax"),
			renderer: commissionFn
		}, {
			text:'税后佣金', dataIndex:'commission_a_tax', filterable:true,sortable : true, width:76, style: "text-align:center;",align: 'center',hidden:records[0].get("commission_a_tax"),
			renderer: commissionFn
		}, {
			text:'平台费用', dataIndex:'inner_commission', filterable:true,sortable : true, width:76, style: "text-align:center;",align: 'center',hidden:records[0].get("inner_commission"),
			renderer: commissionFn
        }, {
            text:'合伙人费用',	 dataIndex:'commission_partner', filtable:true,style: "text-align:center;",align: 'center',width:76, hidden:records[0].get("commission_partner"),		 
			renderer: commissionFn
		}, {
			text:'费用', dataIndex:'outer_commission', filterable:true,sortable : true, width:76, style: "text-align:center;",align: 'center',hidden:records[0].get("outer_commission"),
			renderer: commissionFn
		}]
	}, {
		text:'附加信息',columns:[
		{
			text:'产品董事', dataIndex:'proj_director', filterable:true,sortable : true, width:86, style: "text-align:center;",align: 'center',hidden:records[0].get("proj_director")
		}, {
			text:'产品经理', dataIndex:'manager', filterable:true,sortable : true, width:86, style: "text-align:center;",align: 'center',hidden:records[0].get("manager")
		}/*, {
			text:'渠道公司',dataIndex:'channel_company',filterable:true,sortable : true, width:72, style: "text-align:center;",align: 'center',hidden:records[0].get("channel_company")
		}*/, {
			text:'添加时间',dataIndex:'create_ts',filterable:true,sortable : true, width:116, style: "text-align:center;",align: 'center',renderer:new Ext.util.Format.dateRenderer("Y-m-d")
		}, {
			text:'备注', dataIndex:'remark', filterable:true,sortable : true, minWidth:290,hidden:records[0].get("remark"),
			renderer: toolTipFn
		}]
	}];

		fullGridC1=Ext.create('searchPanel', {
			store: projAllStore,
			border:0,
			columnLines: true,
			//title: '&nbsp;&nbsp;<b>&gt;&gt;&nbsp;固定收益产品&nbsp;&lt;&lt;</b> -- 点击折叠',
			margin:'0 10 0 10',
			columns: fullGridColumns,
			viewConfig: {
				stripeRows: true,
				forceFit:true,
				sortAscText:'正序',
				sortDescText:'降序'//,
				//getRowClass: function(record,rowIndex,rowParams,store){
				//	var sumVal=0;
				//	for (var i=0;i<rowIndex;i++) {
				//		if(store.getAt(i+1).data.name!=store.getAt(i).data.name){
				//			sumVal++;
				//		}
				//	}
				//	return (sumVal%2==0) ? 'style_row_proj0':'style_row_proj1';
				//}
			},
			loadMask: true,
			features: [filtersCfg],
			emptyText: '没有匹配的记录'
		});
    	
		fullGridC2=Ext.create('searchPanel', {
			store: projAllAdvStore,
			border:0,
			margin:'0 10 0 10',
			columnLines: true,
			columns: fullAdvGridColumns,
			//viewConfig: {
			//	stripeRows: true,
			//	forceFit:true,
			//	sortAscText:'正序',
			//	sortDescText:'降序',
			//	getRowClass: function(record,rowIndex,rowParams,store){    
			//		var sumVal=0;
			//		for (var i=0;i<rowIndex;i++) {
			//			if(store.getAt(i+1).data.name!=store.getAt(i).data.name){
			//				sumVal++;
			//			}
			//		}
			//		return (sumVal%2==0) ? 'style_row_proj0':'style_row_proj1';
			//	}
			//},
			loadMask: true,
			features: [filtersCfg],
			emptyText: '没有匹配的记录'
		});
    	
		fullGridC1.child('toolbar').add([
		{
			xtype:'tbtext',
		  scale:'small',
		  text:'集合信托产品：'
		},{
			text:'上市公司股票质押',
		  scale:'small',
			handler:function(){
			  fullGridC1.filters.clearFilters();
			  projAllStore.filterBy( function(record,id){
				return record.get("sub_category")=="集合信托：上市公司股票质押类" ;
			  });
			}
		},{
			text:'政府基建',
			scale:'small',
			handler:function(){
			  fullGridC1.filters.clearFilters();
			  projAllStore.filterBy( function(record,id){
				return record.get("sub_category")=="集合信托：政府基建类";
			  });
			}
		},{
			text:'房地产',
			scale:'small',
			handler:function(){
			  fullGridC1.filters.clearFilters();
			  projAllStore.filterBy( function(record,id){
				return record.get("sub_category")=="集合信托：房地产类";
			  });
			}
		},{
			text:'其他信托',
			scale:'small',
			handler:function(){
			  fullGridC1.filters.clearFilters();
			  projAllStore.filterBy( function(record,id){
				return record.get("sub_category")=="集合信托：其他类";
			  });
			}
		},{
			text:'所有信托',
			scale:'small',
			handler:function(){
			  fullGridC1.filters.clearFilters();
			  projAllStore.filterBy( function(record,id){
				return record.get("sub_category")=="集合信托：其他类" ||
				  record.get("sub_category")=="集合信托：房地产类" ||
				  record.get("sub_category")=="集合信托：政府基建类" ||
				  record.get("sub_category")=="集合信托：上市公司股票质押类";
			  });
			}
		},'-',{
			text:'私募基金',
			scale:'small',
			handler:function(){
			  fullGridC1.filters.clearFilters();
			  projAllStore.filterBy( function(record,id){
				return record.get("sub_category")=="私募基金";
			  });
			}
		},'-',{
			text:'资产管理计划',
			scale:'small',
			handler:function(){
			  fullGridC1.filters.clearFilters();
			  projAllStore.filterBy( function(record,id){
				return record.get("sub_category")=="资产管理计划";
			  });
			}
		},'-',{
			text:'P2P理财',
			scale:'small',
			handler:function(){
			  fullGridC1.filters.clearFilters();
			  projAllStore.filterBy( function(record,id){
				return record.get("sub_category")=="P2P理财";
			  });
			}
		},'-',{
			text:'其他固定收益产品',
			scale:'small',
			handler:function(){
			  fullGridC1.filters.clearFilters();
			  projAllStore.filterBy( function(record,id){
				return (record.get("sub_category")=="其他" && record.get("category")=="固定收益类");
			  });
			}
		},'-',{
			text:'全部显示',
			scale:'small',
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
		  scale:'small',
		  text:'集合信托产品：'
		},{
			text:'上市公司股票质押',
		  scale:'small',
			handler:function(){
			  fullGridC2.filters.clearFilters();
			  projAllAdvStore.filterBy( function(record,id){
				return record.get("sub_category")=="集合信托：上市公司股票质押类" ;
			  });
			}
		},{
			text:'政府基建',
			scale:'small',
			handler:function(){
			  fullGridC2.filters.clearFilters();
			  projAllAdvStore.filterBy( function(record,id){
				return record.get("sub_category")=="集合信托：政府基建类";
			  });
			}
		},{
			text:'房地产',
			scale:'small',
			handler:function(){
			  fullGridC2.filters.clearFilters();
			  projAllAdvStore.filterBy( function(record,id){
				return record.get("sub_category")=="集合信托：房地产类";
			  });
			}
		},{
			text:'其他信托',
			scale:'small',
			handler:function(){
			  fullGridC2.filters.clearFilters();
			  projAllAdvStore.filterBy( function(record,id){
				return record.get("sub_category")=="集合信托：其他类";
			  });
			}
		},{
			text:'所有信托',
			scale:'small',
			handler:function(){
			  fullGridC2.filters.clearFilters();
			  projAllAdvStore.filterBy( function(record,id){
				return record.get("sub_category")=="集合信托：其他类" ||
				  record.get("sub_category")=="集合信托：房地产类" ||
				  record.get("sub_category")=="集合信托：政府基建类" ||
				  record.get("sub_category")=="集合信托：上市公司股票质押类";
			  });
			}
		},'-',{
			text:'私募基金',
			scale:'small',
			handler:function(){
			  fullGridC2.filters.clearFilters();
			  projAllAdvStore.filterBy( function(record,id){
				return record.get("sub_category")=="私募基金";
			  });
			}
		},'-',{
			text:'P2P理财',
			scale:'small',
			handler:function(){
			  fullGridC2.filters.clearFilters();
			  projAllAdvStore.filterBy( function(record,id){
				return record.get("sub_category")=="P2P理财";
			  });
			}
		},'-',{
			text:'其他固定收益产品',
			scale:'small',
			handler:function(){
			  fullGridC2.filters.clearFilters();
			  projAllAdvStore.filterBy( function(record,id){
				return (record.get("sub_category")=="其他" && record.get("category")=="固定收益类");
			  });
			}
		},'-',{
			text:'全部显示',
			scale:'small',
			icon:'/ts/misc/resources/icons/article_16.png',
			handler:function(){
				fullGridC2.filters.clearFilters();
				projAllAdvStore.load();
				projAllAdvStore.filterBy( function(record,id){
					return record.get("category")=="固定收益类" ;
				});
			}
		}     
		]);

    	fullGridC1.on({celldblclick:cellClick});
        fullGridC2.on({celldblclick:cellClick});
		//Ext.getCmp('projListPanel').add(fullGridC1);
		//Ext.getCmp('projListPanel').add(fullGridC2);
		var reccnt=0;
        
		projAllStore.setProxy({
			type: 'ajax',
			url: '/ts/index.php/proj/view?c=1',
			reader:	{
				type: 'json',
				root: 'data'
			}
		});
		projAllAdvStore.setProxy({
			type: 'ajax',
			url: '/ts/index.php/proj/view?c=1&adv=1',
			reader:	{
				type: 'json',
				root: 'data'
			}
		});
    projAllStore.load(function(recommendRecords, operation, success) {
/*        recommendStore.load(function(recommendRecords, operation, success) {
			Ext.Array.forEach(recommendRecords,function(recommendRecord){
				var foundRecords = projAllStore.query('proj_id',recommendRecord.get("proj_id"));
				if(foundRecords.getCount()>0){
                    reccnt+=1;
					var detailString='';
					foundRecords.each(function(record){
						detailString+=record.get("sub_name")+record.get("month")+"个月, "+(record.get("amount")<10000?(record.get("amount")+"万"):(record.get("amount")/10000+"亿"))+': '+record.get("profit")+'%; ';
					});
					var r=foundRecords.getAt(0);
					var recommendTempPanel=Ext.create('Ext.panel.Panel',{
						margin:'10 10 0 10',
						border:0,
						layout:'border',
						proj_id:r.get("proj_id"),
                        title:"推荐产品：<span style='font-size:14px;font-weight:bold;font-family:微软雅黑,黑体,sans-serif'>"+r.get("issue")+" "+r.get("name")+"</span>, "+detailString,
                        titleAlign:'center',
						proj_info_tpl:'',
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
							width:586,
							title:'产品信息',
							html:'正在加载产品信息...',
							autoScroll :true,
							dockedItems:[{
								dock: 'top',
								xtype: 'toolbar',
								scale:'medium',
								bodyPadding: 5,
								items: [{
									icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
									text: '我要预约该产品',
									scale:'medium',
									handler: function() {
										Ext.Msg.alert("提示","该功能尚未开放！");
									}
								}]
							}]
						}],
						listeners:{
							beforeexpand:{
                                fn:function(e){generatePanelFn(e);},
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
					Ext.getCmp('recommendPanel').add(recommendTempPanel);
				}
			});
            if (params.proj_id>0) {
            } else if (reccnt==0){
                Ext.getCmp('topInfo').getLayout().setActiveItem(1);
            } else {
                Ext.getCmp('headerTitle').setText('<span class="app-header2">推荐产品列表</span>');
				//Ext.getCmp('recommendPanel').items.items[0].collapse();
               	var e=Ext.getCmp('recommendPanel');
				if(e.down("panel").collapsed == false) {
				  	generatePanelFn(e.down('panel'));
				} else {
               	    Ext.getCmp('recommendPanel').items.items[0].show();
				}
				Ext.getCmp('topInfo').getLayout().setActiveItem(0);
            }
		});
*/    });
    
    projAllAdvStore.load();
    var topInfo=Ext.create('Ext.panel.Panel',{
		xtype:'panel',
		height:150,
		id:'topInfo',
		region:'center',
		border:0,
		layout:'card',
		resizable:false,
		items:[
			/*{
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
			}, */
          fullGridC1,  projPanel, fullGridC2
        ]
	});
    
	Ext.getCmp('viewport').add(topInfo);
	Ext.getCmp('viewport').add(topToolbar);
	Ext.getCmp('viewport').add(controlTree);
	if(params.proj_id>0) {
		e=Ext.getCmp('projPanel');
		e.proj_id=params.proj_id;
		//e.setTitle(grid.getStore().getAt(rowIndex).get("issue")+" "+grid.getStore().getAt(rowIndex).get("name"))
		Ext.getCmp('topInfo').getLayout().setActiveItem(1);
        Ext.getCmp('ListBtn').hide();
        Ext.getCmp('endProjListBtn').hide();
        Ext.getCmp('BtnAdv').hide();
        Ext.getCmp('BtnBrief').show();
        //Ext.getCmp('headerTitle').setText('<span class="app-header2">''</span>');
    }	 else {
        Ext.getCmp('headerTitle').setText('<span class="app-header2">固定收益类：在售产品列表</span>');

    }

});



});

 
 