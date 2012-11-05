Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', '/misc/ux');

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
          icon: '/misc/resources/icons/cog_edit.png',
          tooltip: '编辑此条记录',
          handler: function(grid, rowIndex, colIndex) {
            //sampleStore.removeAt(rowIndex);      
            AmountEditForm.getForm().loadRecord(grid.getStore().getAt(rowIndex));
            AmountEditForm.show();
          }
        }]
      },
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
    
   var ProjWin=Ext.create("Ext.window.Window",{
      resizeable:false,
      closeAction:"hide",
      closable:false,
      title:'新增项目',
      width:540,
      items:[
      {
        xtype:"form",
        bodyPadding:5,
        trackResetOnLoad:true,
        border:0,
        waitTitle:"Pleas wait...",
        layout:{
          type:'hbox',
          defaultMargins: {top: 0, right: 5, bottom: 0, left: 5}
        },
        fieldDefaults:{
          lableWidth:90,
          width:320
        },
        dockedItems: [{
            dock: 'bottom',
            xtype: 'toolbar',
            bodyPadding: 5,
            items: [{
            	  icon:'/misc/resources/icons/grid.png',
                text: '进入详细配置',
                formBind: true, //only enabled once the form is valid
                disabled: true,
                handler: function() {
                    var win = this.up('window');
                    var form = this.up('form').getForm();
                    if (form.isValid()) {
                        form.submit({
                            success: function(form, action) {
                               win.close();
                               document.location.href="ts_proj_detail.html";
                            },
                            failure: function(form, action) {
                               win.close();
                            }
                        });
                    }
                }
            },{
            	  icon:'/misc/resources/icons/cross.gif',
                text: '取消',
                handler: function(){
                    this.up('window').close();
                }
            }]
        }],
        items:[
        {
          xtype:'panel',
          region:'east',
          border:0,
          items:[
          {
            xtype:'fieldset',
            title: '项目信息',
            //collapsible: true,
            defaults: {
              labelWidth: 89,
              anchor: '100%',
              layout: {
                type: 'hbox',
                defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
              }
            },
            items:[
            {
              xtype:'fieldcontainer',
              layout:'hbox',
              flex:1,
              width:480,
              region:'north',
              fieldLabel: '项目类别',
              items:[
              {//主类别
                 xtype:'combo',
                 emptyText:"主类别...",  
                 width:160,   
                 store : chCategoryList,
                 queryMode : 'local',
                 forceSelection:true,
                 triggerAction: 'all',
                 valueField: 'id',   //value值字段
                 displayField: 'text',  //显示文本字段
                 listeners: { // 监听选择事件
                     select: function() {
                        chSubCategoryList.removeAll();
                        if (this.getValue() == '信托类') {
                           chSubCategoryList.loadData(subTrustList,true);
                        } else if (this.getValue() == '债券类') {
                           chSubCategoryList.loadData(subBondList,true);
                        } else if (this.getValue() == '私募证券类') {
                           chSubCategoryList.loadData(subPrivateSecuritiesList,true);
                        } else if (this.getValue() == '私募股权类') {
                           chSubCategoryList.loadData(subPrivateEquityList,true);
                        } else if (this.getValue() == '其他类') {
                           chSubCategoryList.loadData(subOtherList,true);
                        }
                     }
                 }
              }, 
              {//子类别
                 xtype:'combo',
                 emptyText:"子类别...",
                 width:160,   
                 store : chSubCategoryList,
                 queryMode: 'local',
                 triggerAction: 'all',
                 valueField: 'value',
                 displayField: 'text',
                 forceSelection:true,
                 listeners: { 
                     select: function() {
//                         alert(comboBuild.getValue() + '-' + comboRoom.getValue());                          
                        }
                 }
              }]
            },{
              xtype:'textfield',
              fieldLabel: '发行方',
              name:'issue',
              allowBlank: false
            },{
              xtype:'textfield',
              fieldLabel: '项目名称',
              width:480,
              name:'name',
              allowBlank: false
            },{
              xtype:'textfield',
              fieldLabel: '资金投向',
              width:480,
              name:'flow_of_fund',
              allowBlank: false
            },{
              xtype:'textareafield',
              fieldLabel: '项目亮点',
              width:480,
              height:100,
              name:'highlights',
              allowBlank: false
            },{
              xtype:'numberfield',
              fieldLabel: '项目期限',
              name:'month',
              allowBlank: false
            },{
              xtype:'numberfield',
              fieldLabel: '融资规模(万)',
              name:'scale',
              allowBlank: false
            },{
              xtype:'combo',
              fieldLabel: '分配',
              name:'cycle',
              queryMode : 'local',
              store : chCycleList,
              valueField: 'id',
              displayField: 'text',
              forceSelection:true,
              allowBlank: false
            },{
              xtype:'combo',
              fieldLabel: '项目收益属性',
              name:'profit_property',
              queryMode : 'local',
              store : chProfitPropertyList,
              valueField: 'id',
              displayField: 'text',
              forceSelection:true,
              allowBlank: false
            },{
              xtype:'textfield',
              fieldLabel: '合同情况',
              width:480,
              name:'contract',
              allowBlank: true
            },{
              xtype:'combo',
              fieldLabel: '产品经理',
              name:'manager',
              queryMode : 'local',
              store : chManagerList,
              valueField: 'id',
              displayField: 'text',
              forceSelection:true,
              allowBlank: false
            },{
              xtype:'datefield',
              fieldLabel: '成立日期',
              forceSelection:true,
              name:'found'
            },{
              xtype:'textareafield',
              fieldLabel: '备注',
              width:480,
              name:'remark',
              allowBlank: true
            }]
          }]
        }]
      }]
    });
    
    fullGrid.child('pagingtoolbar').add([
        '->',
        {
            icon: '/misc/resources/icons/delete.gif',
            text: '清除过滤条件',
            handler: function () {
                fullGrid.filters.clearFilters();
            } 
        }, {
            icon: '/misc/resources/icons/add.gif',
            text: '新增项目',
            handler: function () {
                ProjWin.show();
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
        	html:'<span class="app-header2">管理员模式</span>'
        },{
        	xtype:'box',
        	flex:1,
        },{
        	text:'用户管理',
        	icon:'/misc/resources/icons/user_edit.png',
        	handler:function(){window.location.href='/user';}
        },{
        	text:'离开管理员模式',
        	icon:'/misc/resources/icons/cross.gif',
        	handler:function(){window.location.href='/data';}
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

});
