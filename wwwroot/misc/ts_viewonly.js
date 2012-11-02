Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', 'ux');

Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*',
    'Ext.ux.grid.FiltersFeature',
    'Ext.ux.ajax.JsonSimlet',
    'Ext.ux.ajax.SimManager'
]);

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
  	  
  var fullGrid=Ext.create('Ext.grid.Panel', {
      store: sampleStore,
      region:'center',
      columnLines: true,
      columns: [{
        xtype: 'actioncolumn',
        //text:'编辑',
        width:30,
        sortable: false,
        items: [{
          icon: 'resources/icons/cog_edit.png',
          tooltip: '编辑此条记录',
          handler: function(grid, rowIndex, colIndex) {
            //sampleStore.removeAt(rowIndex);      
            AmountEditForm.getForm().loadRecord(grid.getStore().getAt(rowIndex));
            AmountEditForm.show();
          }
        }]
      },
        {text:'份额',         dataIndex:'chTotalShare',     filtable:true, width:100},
        {text:'销售状态',     dataIndex:'chStatus',         filtable:true, width:100},
        {text:'销售类别',     dataIndex:'chExclusive',      filtable:true, width:100},
        {text:'产品等级',     dataIndex:'chGrade',          filtable:true, width:100},
        {text:'项目类别',     dataIndex:'chCategory',       filtable:true, width:100},
        {text:'子类别',       dataIndex:'chSubCategory',    filtable:true, width:100},
        {text:'发行方',       dataIndex:'strIssue',         filtable:true, width:100},
        {text:'项目名称',     dataIndex:'strName',          filtable:true, width:100},
        {text:'资金投向',     dataIndex:'strFlowOfFund',    filtable:true, width:100},
        {text:'项目亮点',     dataIndex:'strHighlights',    filtable:true, width:100},
        {text:'项目期限',     dataIndex:'iMonth',           filtable:true, width:100},
        {text:'融资规模',     dataIndex:'iScale',           filtable:true, width:100},
        {text:'分配',         dataIndex:'chCycle',          filtable:true, width:100},
        {text:'认购金额',     dataIndex:'iAmount',          filtable:true, width:100},
        {text:'项目收益属性', dataIndex:'chProfitProperty', filtable:true, width:100},
        {text:'项目收益',     dataIndex:'fProfit',          filtable:true, width:100},
        {text:'产品经理',     dataIndex:'chManager',        filtable:true, width:100},
        {text:'备注',         dataIndex:'strRemark',        filtable:true, width:100},
        {text:'税前佣金',     dataIndex:'fCommissionBTax',  filtable:true, width:100},
        {text:'税后佣金',     dataIndex:'fCommissionATax',  filtable:true, width:100},
        {text:'佣金',         dataIndex:'fInnerCommission', filtable:true, width:100},
        {text:'佣金（税后）', dataIndex:'fOuterCommission', filtable:true, width:100},
        {text:'打款日期',     dataIndex:'dPay',             filtable:true, width:100},
        {text:'已打款金额',   dataIndex:'iPaid',            filtable:true, width:100},
        {text:'成立日期',     dataIndex:'dFound',           filtable:true, width:100},
        {text:'包销/分销额度',dataIndex:'iQuota',           filtable:true, width:100},
        {text:'已打款额度',   dataIndex:'iQuotaPaid',       filtable:true, width:100},
        {text:'剩余额度',     dataIndex:'iQuotaRemain',     filtable:true, width:100},
        {text:'主销渠道',     dataIndex:'strMainChannel',   filtable:true, width:100},
        {text:'渠道公司',     dataIndex:'strChannelCompany',filtable:true, width:100},
        {text:'渠道联系人',   dataIndex:'strChannelContact',filtable:true, width:100},
        {text:'走帐公司',     dataIndex:'strBillingCompany',filtable:true, width:100},
        {text:'产品经理备注', dataIndex:'strManegerRemark', filtable:true, width:100}
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
      emptyText: 'No Matching Records'
    });
    
   
    fullGrid.child('pagingtoolbar').add([
        '->',
        {
            icon: 'resources/icons/delete.gif',
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
        	icon:'resources/icons/plugin.gif',
        	handler:function(){window.location.href='ts_usermanage.html';}
        },{
        	text:'个人信息',
        	icon:'resources/icons/user.png',
        	handler:function(){}
        },{
        	text:'退出',
        	icon:'resources/icons/cross.gif',
        	handler:function(){window.location.href='ts_login.html';}
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

 
 