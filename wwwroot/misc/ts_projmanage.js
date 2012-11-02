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
            	  icon:'resources/icons/grid.png',
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
            	  icon:'resources/icons/cross.gif',
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
              name:'strIssue',
              allowBlank: false
            },{
              xtype:'textfield',
              fieldLabel: '项目名称',
              width:480,
              name:'strName',
              allowBlank: false
            },{
              xtype:'textfield',
              fieldLabel: '资金投向',
              width:480,
              name:'strFlowOfFund',
              allowBlank: false
            },{
              xtype:'textareafield',
              fieldLabel: '项目亮点',
              width:480,
              height:100,
              name:'strHighlights',
              allowBlank: false
            },{
              xtype:'numberfield',
              fieldLabel: '项目期限',
              name:'iMonth',
              allowBlank: false
            },{
              xtype:'numberfield',
              fieldLabel: '融资规模(万)',
              name:'iScale',
              allowBlank: false
            },{
              xtype:'combo',
              fieldLabel: '分配',
              name:'chCycle',
              queryMode : 'local',
              store : chCycleList,
              valueField: 'id',
              displayField: 'text',
              forceSelection:true,
              allowBlank: false
            },{
              xtype:'combo',
              fieldLabel: '项目收益属性',
              name:'chProfitProperty',
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
              name:'strContract',
              allowBlank: true
            },{
              xtype:'combo',
              fieldLabel: '产品经理',
              name:'chManager',
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
              name:'dFound'
            },{
              xtype:'textareafield',
              fieldLabel: '备注',
              width:480,
              name:'strRemark',
              allowBlank: true
            }]
          }]
        }]
      }]
    });
    
    fullGrid.child('pagingtoolbar').add([
        '->',
        {
            icon: 'resources/icons/delete.gif',
            text: '清除过滤条件',
            handler: function () {
                fullGrid.filters.clearFilters();
            } 
        }, {
            icon: 'resources/icons/add.gif',
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
        	icon:'resources/icons/user_edit.png',
        	handler:function(){window.location.href='ts_usermanage.html';}
        },{
        	text:'离开管理员模式',
        	icon:'resources/icons/cross.gif',
        	handler:function(){window.location.href='ts_viewonly.html';}
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
