Ext.require(['Ext.ux.RowExpander']);

Ext.onReady(function() {
  Ext.QuickTips.init();

  var recentChangeGrid=Ext.create('Ext.grid.Panel', {
    	region:'north',
    	collapsible:true,
    	collapseDirection:'top',
    	collapseMode:'header',
    	animCollapse : true,
      title:'最近更改',
      maxHeight:200,
      store:sampleChanges,
      columns:[
      {text:'时间',             dataIndex:'changeDate',     filtable:true, width:100},
      {text:'修改人',           dataIndex:'changePerson',     filtable:true, width:100},
      {text:'修改内容',         dataIndex:'changes',     filtable:true, width:500},
  	  ]
  	});
  	  
  var listControl=Ext.create('Ext.data.JsonStore', {
      fields: [
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
        {name:'commission_b_tax' ,type:'boolean' },
        {name:'commission_a_tax' ,type:'boolean' },
        {name:'inner_commission' ,type:'boolean' },
        {name:'outer_commission' ,type:'boolean' },
        {name:'pay'              ,type:'boolean' },
        {name:'paid'             ,type:'boolean' },
        {name:'found'            ,type:'boolean' },
        {name:'quota'            ,type:'boolean' },
        {name:'quota_paid'       ,type:'boolean' },
        {name:'quota_remain'     ,type:'boolean' },
        {name:'main_channel'     ,type:'boolean' },
        {name:'channel_company'  ,type:'boolean' },
        {name:'channel_contact'  ,type:'boolean' },
        {name:'billing_company'  ,type:'boolean' },
        {name:'manager_remark'   ,type:'boolean' }
      ],
      proxy: {
        type: 'ajax',
        //url: 'listControl.json',
        url: '/etc/listControl.json',
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
    
    listControl.load(function(records, operation, success) {
      var fullGrid=Ext.create('Ext.grid.Panel', {
        store: sampleStore,
        region:'center',
        columnLines: true,
        columns: [
          {text:'proj_id',     dataIndex:'proj_id',       filtable:true, width:100,hidden:records[0].get("proj_id")},
          {text:'proj_detail_id',     dataIndex:'proj_detail_id',       filtable:true, width:100,hidden:records[0].get("proj_detail_id")},
          {text:'份额',         dataIndex:'total_share',     filtable:true, width:100, hidden:records[0].get("total_share")},
          {text:'销售状态',     dataIndex:'status',         filtable:true, width:100, hidden:records[0].get("status")},
          {text:'销售类别',     dataIndex:'exclusive',      filtable:true, width:100, hidden:records[0].get("exclusive")},
          {text:'产品等级',     dataIndex:'grade',          filtable:true, width:100, hidden:records[0].get("grade")},
          {text:'项目类别',     dataIndex:'category',       filtable:true, width:100, hidden:records[0].get("category")},
          {text:'子类别',       dataIndex:'sub_category',    filtable:true, width:100, hidden:records[0].get("sub_category")},
          {text:'发行方',       dataIndex:'issue',         filtable:true, width:100, hidden:records[0].get("issue")},
          {text:'项目名称',     dataIndex:'name',          filtable:true, width:100, hidden:records[0].get("name")},
          {text:'资金投向',     dataIndex:'flow_of_fund',    filtable:true, width:100, hidden:records[0].get("flow_of_fund")},
          //{text:'项目亮点',     dataIndex:'highlights',    filtable:true, width:100, hidden:records[0].get("highlights")},
          {text:'项目期限',     dataIndex:'month',           filtable:true, width:100, hidden:records[0].get("month")},
          {text:'融资规模',     dataIndex:'scale',           filtable:true, width:100, hidden:records[0].get("scale")},
          {text:'分配',         dataIndex:'cycle',          filtable:true, width:100, hidden:records[0].get("cycle")},
          {text:'认购金额',     dataIndex:'amount',          filtable:true, width:100, hidden:records[0].get("amount")},
          {text:'项目收益属性', dataIndex:'profit_property', filtable:true, width:100, hidden:records[0].get("profit_property")},
          {text:'项目收益',     dataIndex:'profit',          filtable:true, width:100, hidden:records[0].get("profit")},
          {text:'产品经理',     dataIndex:'manager',        filtable:true, width:100, hidden:records[0].get("manager")},
          {text:'合同信息',     dataIndex:'contract',        filtable:true, width:100, hidden:records[0].get("contract")},
          //{text:'备注',         dataIndex:'remark',        filtable:true, width:100, hidden:records[0].get("remark")},
          {text:'税前佣金',     dataIndex:'commission_b_tax',  filtable:true, width:100, hidden:records[0].get("commission_b_tax")},
          {text:'税后佣金',     dataIndex:'commission_a_tax',  filtable:true, width:100, hidden:records[0].get("commission_a_tax")},
          {text:'佣金',         dataIndex:'inner_commission', filtable:true, width:100, hidden:records[0].get("inner_commission")},
          {text:'佣金（税后）', dataIndex:'outer_commission', filtable:true, width:100, hidden:records[0].get("outer_commission")},
          {text:'打款日期',     dataIndex:'pay',             filtable:true, width:100, hidden:records[0].get("pay")},
          {text:'已打款金额',   dataIndex:'paid',            filtable:true, width:100, hidden:records[0].get("paid")},
          {text:'成立日期',     dataIndex:'found',           filtable:true, width:100, hidden:records[0].get("found")},
          {text:'包销/分销额度',dataIndex:'quota',           filtable:true, width:100, hidden:records[0].get("quota")},
          {text:'已打款额度',   dataIndex:'quota_paid',       filtable:true, width:100, hidden:records[0].get("quota_paid")},
          {text:'剩余额度',     dataIndex:'quota_remain',     filtable:true, width:100, hidden:records[0].get("quota_remain")},
          {text:'主销渠道',     dataIndex:'main_channel',   filtable:true, width:100, hidden:records[0].get("main_channel")},
          {text:'渠道公司',     dataIndex:'channel_company',filtable:true, width:100, hidden:records[0].get("channel_company")},
          {text:'渠道联系人',   dataIndex:'channel_contact',filtable:true, width:100, hidden:records[0].get("channel_contact")},
          {text:'走帐公司',     dataIndex:'billing_company',filtable:true, width:100, hidden:records[0].get("billing_company")},
          {text:'产品经理备注', dataIndex:'manager_remark', filtable:true, width:100, hidden:records[0].get("manager_remark")}
        ],
        title: '项目列表',
        viewConfig: {
            stripeRows: true
        },
        loadMask: true,
        features: [filtersCfg],
        dockedItems: [Ext.create('Ext.toolbar.Paging', {
            dock: 'bottom',
            store: sampleStore
        })],
        plugins: [{
            ptype: 'rowexpander',
            rowBodyTpl : [
                '<p><b>项目亮点:</b> {highlights}</p>',
                '<p><b>备注:</b> {remark}</p>'
            ]
        }],
        emptyText: 'No Matching Records'
      });

      fullGrid.child('pagingtoolbar').add([
          '->',
          {
              icon: '/misc/resources/icons/delete.gif',
              text: '清除过滤条件',
              handler: function () {
                  fullGrid.filters.clearFilters();
              } 
          }
      ]);
    
      var viewport = Ext.create('Ext.Viewport', {
        layout: {
            type: 'border',
            padding: 5
        },
        defaults: {
            split: true                //可改变窗体大小
        },
        items: [{
        	  xtype:'toolbar',
        	  region:'north',
        	  height: 30,
        	  border:0,
            items:[
            {
            	xtype:'box',
            	html:'<span class="app-header1">some system</span>'
            },{
            	xtype:'box',
            	flex:1,
            },{
            	text:'进入管理模式',
            	icon:'/misc/resources/icons/plugin.gif',
            	handler:function(){window.location.href='ts_projmanage.html';}
            },{
            	text:'个人信息',
            	icon:'/misc/resources/icons/user.png',
            	handler:function(){}
            },{
            	text:'退出',
            	icon:'/misc/resources/icons/cross.gif',
            	handler:function(){window.location.href='/logout';}
            }]
          },{
        	xtype:'panel', 
        	margin:'8 20 20 20',
        	border:0,
        	region:'center',
        	layout:'border',
        	items:[
        	recentChangeGrid,{
          	region:'north',
          	xtype:'box',
          	height:20
          },
          fullGrid]
        }]
      });
    
  });
  sampleStore.load();
  sampleChanges.load();
});

 
 