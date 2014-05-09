Ext.onReady(function() {
  Ext.QuickTips.init();
    var reccnt=0;
    
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
        {name:'commission_partner',type:'boolean'}
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
                html:'<span class="app-header2">&nbsp;</span>'
			},{
				xtype:'box',
				flex:1
			}]
		});
    
		var promoteProjPanel=Ext.create('Ext.panel.Panel',{
			height:150,
			id:'recommendPanel',
			region:'center',
			border:0,
    autoScroll:true,
			layout:
            {
				type: 'vbox',
				animate: true,
				titleCollapse: true,
				activeOnTop: true,
                align:'stretch'
			},
			items:[]
		});
Ext.getCmp('viewport').add(promoteProjPanel);
Ext.getCmp('viewport').add(topToolbar);
Ext.getCmp('viewport').add(controlTree);
    
listControl.load(function(records, operation, success) {
	AmountDetailsGrid=Ext.create('Ext.grid.Panel',{
		store: projDetailStore,
		border:1,
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
		{text:'子名称',	dataIndex:'sub_name', width:114,filtable:true,style: "text-align:center;",align: 'center', hidden:records[0].get("sub_name")},
		{text:'产品期限',	 dataIndex:'month',	width:80,filtable:true,style: "text-align:center;",align: 'center', hidden:records[0].get("month"),renderer:function(value,metaData,record,colIndex,store,view) {return value+'个月';}},
		{text:'认购金额',	 dataIndex:'amount', width:80,filtable:true,style: "text-align:center;",align: 'center', hidden:records[0].get("amount"),renderer:function(value,metaData,record,colIndex,store,view) {return value+'万';}},
		{text:'产品收益',	 dataIndex:'profit', width:80,filtable:true,style: "text-align:center;",align: 'center', hidden:records[0].get("profit"),renderer:function(value,metaData,record,colIndex,store,view) {return value.toFixed(3)+'%';}},
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
		{text:'成立日期',	 dataIndex:'found',	width:88,filtable:true,style: "text-align:center;",align: 'center', hidden:records[0].get("found"),renderer:new Ext.util.Format.dateRenderer("Y-m-d")},
		{text:'税前佣金',	 dataIndex:'commission_b_tax', filtable:true,style: "text-align:center;",align: 'center',width:80, hidden:records[0].get("commission_b_tax"),		 
			renderer: commissionFn
		},
		{text:'税后佣金',	 dataIndex:'commission_a_tax', filtable:true,style: "text-align:center;",align: 'center',width:80, hidden:records[0].get("commission_a_tax"),		 
			renderer: commissionFn
		},
		{text:'平台费用',	 dataIndex:'inner_commission', filtable:true,style: "text-align:center;",align: 'center',width:80, hidden:records[0].get("inner_commission"),		 
			renderer: commissionFn
		},
		{text:'合伙人费用',	 dataIndex:'commission_partner', filtable:true,style: "text-align:center;",align: 'center',width:80, hidden:records[0].get("commission_partner"),		
			renderer: commissionFn
		},
		{text:'费用',		 dataIndex:'outer_commission', filtable:true,style: "text-align:center;",align: 'center',width:80, hidden:records[0].get("outer_commission"),		 
			renderer: commissionFn
		}
		]
	});
        
    projAllStore.load(function(recommendRecords, operation, success) {
        recommendStore.load(function(recommendRecords, operation, success) {
			Ext.Array.forEach(recommendRecords,function(recommendRecord){
				var foundRecords = projAllStore.query('proj_id',recommendRecord.get("proj_id"));
				if(foundRecords.getCount()>0){
                    reccnt+=1;
					//var detailString='';
					//foundRecords.each(function(record){
					//	detailString+=record.get("sub_name")+record.get("month")+"个月, "+(record.get("amount")<10000?(record.get("amount")+"万"):(record.get("amount")/10000+"亿"))+': '+record.get("profit")+'%; ';
					//});
					var r=foundRecords.getAt(0);
					var recommendTempPanel=Ext.create('Ext.panel.Panel',{
						margin:'0 10 10 10',
						border:0,
						layout:'border',
						proj_id:r.get("proj_id"),
                        collapsed:true,
                titleCollapse :true,
                collapsible:true,
                        height:800,
                        title:"<table><tr><td class='r_ex_td_main' style=\"width:560px;vertical-align:top;font-weight:none;\"><p><span style='font-size:16px;font-weight:bold;font-family:微软雅黑,黑体,sans-serif'>"+r.get("issue")+" "+r.get("name")+'</span></p><p><pre>'+r.get('flow_of_fund')+'</pre></p></td><td class="r_ex_td_main" style="width:360px; text-align:left;font-size:12px;font-weight:bold;font-family:微软雅黑,黑体,sans-serif">'+r.get("profit_string")+'</td></tr></table>',
                        titleAlign:'left',
						proj_info_tpl:'',
                        region:'center',
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
                            border:0,
							//title:'产品信息',
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
            Ext.getCmp('headerTitle').setText('<span class="app-header2">推荐产品列表</span>');
			//Ext.getCmp('recommendPanel').items.items[0].collapse();
           	var e=Ext.getCmp('recommendPanel');
			if(e.down("panel").collapsed == false) {
			  	generatePanelFn(e.down('panel'));
			} else {
           	    Ext.getCmp('recommendPanel').items.items[0].show();
			}
		});
    });
});


});

 
 