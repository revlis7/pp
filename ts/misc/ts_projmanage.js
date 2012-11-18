Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', '/ts/misc/ux');

Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*',
    'Ext.ux.grid.FiltersFeature',
    'Ext.ux.ajax.JsonSimlet',
    'Ext.ux.ajax.SimManager'
]);
var loginname = Ext.util.Cookies.get("loginname");

Ext.onReady(function() {
  Ext.QuickTips.init();

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
          icon: '/ts/misc/resources/icons/cog_edit.png',
          tooltip: '编辑此条记录',
          handler: function(grid, rowIndex, colIndex) {
            //sampleStore.removeAt(rowIndex);      
            var proj_id=grid.getStore().getAt(rowIndex).get("proj_id");
            window.location.href='/ts/index.php/proj/update?proj_id='+proj_id;
          }
        }]
      },
      {text:'proj_id',     dataIndex:'proj_id',       filtable:true, hidden:true},
      {text:'proj_detail_id',     dataIndex:'proj_detail_id',       filtable:true, hidden:true},
      {text:'份额',         dataIndex:'total_share',     filtable:true, width:100},
      {text:'销售状态',     dataIndex:'status',         filtable:true, width:100},
      {text:'销售类别',     dataIndex:'exclusive',      filtable:true, width:100},
      {text:'产品等级',     dataIndex:'grade',          filtable:true, width:100},
      {text:'项目类别',     dataIndex:'category',       filtable:true, width:100},
      {text:'子类别',       dataIndex:'sub_category',    filtable:true, width:100},
      {text:'发行方',       dataIndex:'issue',         filtable:true, width:100},
      {text:'项目名称',     dataIndex:'name',          filtable:true, width:100},
      {text:'资金投向',     dataIndex:'flow_of_fund',    filtable:true, width:100},
      {text:'项目亮点',     dataIndex:'highlights',    filtable:true, width:100},
      {text:'项目期限',     dataIndex:'month',           filtable:true, width:100},
      {text:'融资规模',     dataIndex:'scale',           filtable:true, width:100},
      {text:'分配',         dataIndex:'cycle',          filtable:true, width:100},
      {text:'认购金额',     dataIndex:'amount',          filtable:true, width:100},
      {text:'项目收益属性', dataIndex:'profit_property', filtable:true, width:100},
      {text:'项目收益',     dataIndex:'profit',          filtable:true, width:100},
      {text:'产品经理',     dataIndex:'manager',        filtable:true, width:100},
      {text:'备注',         dataIndex:'remark',        filtable:true, width:100},
      {text:'税前佣金',     dataIndex:'commission_b_tax',  filtable:true, width:100},
      {text:'税后佣金',     dataIndex:'commission_a_tax',  filtable:true, width:100},
      {text:'佣金',         dataIndex:'inner_commission', filtable:true, width:100},
      {text:'佣金（税后）', dataIndex:'outer_commission', filtable:true, width:100},
      {text:'打款日期',     dataIndex:'pay',             filtable:true, width:100},
      {text:'已打款金额',   dataIndex:'paid',            filtable:true, width:100},
      {text:'成立日期',     dataIndex:'found',           filtable:true, width:100},
      {text:'包销/分销额度',dataIndex:'quota',           filtable:true, width:100},
      {text:'已打款额度',   dataIndex:'quota_paid',       filtable:true, width:100},
      {text:'剩余额度',     dataIndex:'quota_remain',     filtable:true, width:100},
      {text:'主销渠道',     dataIndex:'main_channel',   filtable:true, width:100},
      {text:'渠道公司',     dataIndex:'channel_company',filtable:true, width:100},
      {text:'渠道联系人',   dataIndex:'channel_contact',filtable:true, width:100},
      {text:'走帐公司',     dataIndex:'billing_company',filtable:true, width:100},
      {text:'产品经理备注', dataIndex:'manager_remark', filtable:true, width:100}
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
            icon: '/ts/misc/resources/icons/delete.gif',
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
        	html:'<span class="app-header1">彩虹桥</span>'
        },{
        	xtype:'box',
        	html:'<span class="app-header2">管理模式</span>'
        },{
        	xtype:'box',
        	flex:1,
        },{
          icon: '/ts/misc/resources/icons/add.gif',
          text: '新增项目',
          handler: function () {window.location.href='/ts/index.php/proj/create';} 
        },{
        	text:'用户管理',
        	icon:'/ts/misc/resources/icons/user_edit.png',
        	handler:function(){window.location.href='/ts/index.php/user';}
        },{
        	text:'离开管理员模式',
        	icon:'/ts/misc/resources/icons/cross.gif',
        	handler:function(){window.location.href='/ts/index.php/proj';}
        }]
      },{
    	xtype:'panel', 
    	margin:'0 20 20 20',
    	border:0,
    	region:'center',
    	layout:'border',
      items:[fullGrid]
    }]
  });
  sampleStore.load();
});
