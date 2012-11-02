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
/*    
  var ItemPanel=Ext.create("Ext.panel.Panel",{
     resizeable:false,
     closeAction:"hide",
     closable:false,
     title:'项目信息编辑',
     width:900,
     layout:{
       type:'hbox'
     },
     dockedItems: [{
       dock: 'bottom',
       xtype: 'toolbar',
       border:0,
       bodyPadding: 5,
       items: ['->',{
         text: '关闭配置窗口',
         formBind: true, //only enabled once the form is valid
         disabled: true,
         handler: function() {
           var win = this.up('window');
           var form = this.up('form').getForm();
           if (form.isValid()) {
             form.submit({
               success: function(form, action) {
                  //Ext.Msg.alert('Success', action.result.msg);
                  win.close();
                  //todo
                  //thisform.data.load();
                  ItemWin.show();
               },
               failure: function(form, action) {
                  //Ext.Msg.alert('Success', action.result.msg);
                  win .close();
                  //todo
                  //thisform.data.load();
                  ItemWin.show();
               }
             });
           }
         }
       }]
     }],
     items:[ {
       xtype:'panel',
       region:'center',
       border:0,
       width: 550,
       items:[]
     }, ]
   });
*/  
  var AmountEditForm=Ext.create('Ext.form.Panel',{
    region:'east',
    width:320,
    margin:'0 0 0 2',
    bodyPadding:5,
    autoScroll :true,
    hidden:true,
    //collapsible:true,
    //collapseDirection : 'left',
    //collapsed : true,
    title:'额度信息编辑',
    trackResetOnLoad:true,
    border:0,
    waitTitle:"Pleas wait...",
    layout:{
      type:'vbox',
      defaultMargins: {top: 0, right: 5, bottom: 0, left: 5}
    },
    fieldDefaults:{
      lableWidth:90,
      width:260
    },
    dockedItems: [{
      dock: 'bottom',
      xtype: 'toolbar',
      bodyPadding: 5,
      items: [{
      	icon:'/misc/resources/icons/accept.gif',
        text: '确认',
        formBind: true, //only enabled once the form is valid
        disabled: true,
        handler: function() {
          var form = this.up('form').getForm();
          if (form.isValid()) {
            form.submit({
              success: function(form, action) {
                Ext.Msg.alert('Success', action.result.msg);
              },
              failure: function(form, action) {
                Ext.Msg.alert('Failed', action.result.msg);
              }
            });
          }
        }
      },{
      	icon:'/misc/resources/icons/cross.gif',
        text: '取消',
        handler: function(){
        	this.up('form').getForm().reset();
          //this.up('panel').hide(); 
        }
      }]
    }],
    items:[ {
      xtype:'fieldset',
      title: '额度信息',
      collapsible: true,
      defaults: {
        labelWidth: 89,
        anchor: '100%',
        layout: {
          type: 'hbox',
          defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
        }
      },
      items:[{
        xtype:'numberfield',
        fieldLabel: '认购金额(万)',
        name:'iAmount',
        allowBlank: false
      },{
        xtype:'numberfield',
        fieldLabel: '项目收益(%)',
        name:'fProfit',
        allowBlank: false
      }]
    }, {
      xtype:'fieldset',
      title: '综合信息',
      collapsible: true,
      defaults: {
        labelWidth: 89,
        anchor: '100%',
        layout: {
          type: 'hbox',
          defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
        }
      },
      items:[{
         xtype:'combo',
         fieldLabel: '份额',
         name:'chTotalShare',
         queryMode : 'local',
         store : chTotalShareList,
         valueField: 'id',
         displayField: 'text',
         forceSelection:true,
         allowBlank: false
       }, {
         xtype:'combo',
         fieldLabel: '销售状态',
         name:'chStatus',
         queryMode : 'local',
         store : chStatusList,
         valueField: 'id',
         displayField: 'text',
         forceSelection:true,
         allowBlank: false
       }]
    }, {
      xtype:'fieldset',
      title: '佣金信息',
      collapsible: true,
      defaults: {
        labelWidth: 89,
        anchor: '100%',
        layout: {
          type: 'hbox',
          defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
        }
      },
      items:[{
        xtype:'numberfield',
        fieldLabel: '税前佣金(%)',
        name:'fCommissionBTax',
        allowBlank: false
      },{
        xtype:'numberfield',
        fieldLabel: '税后佣金(%)',
        name:'fCommissionATax',
        allowBlank: false
      }]
    }, {
      xtype:'fieldset',
      title: '打款信息',
      collapsible: true,
      defaults: {
        labelWidth: 89,
        anchor: '100%',
        layout: {
          type: 'hbox',
          defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
        }
      },
      items:[{
       xtype:'datefield',
       fieldLabel: '打款日期',
       forceSelection:true,
       name:'dPay'
      },{
       xtype:'numberfield',
       fieldLabel: '已打款金额',
       name:'iPaid'
      }]
    }, {
      xtype:'fieldset',
      title: '包销进度信息',
      collapsible: true,
      defaults: {
        labelWidth: 89,
        anchor: '100%',
        layout: {
          type: 'hbox',
          defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
        }
      },
      items:[{
       xtype:'numberfield',
       fieldLabel: '包销/分销额度',
       name:'iQuota'
      },{
       xtype:'numberfield',
       fieldLabel: '已打款额度',
       name:'iQuotaPaid'
      },{
       xtype:'numberfield',
       fieldLabel: '剩余额度',
       name:'iQuotaRemain'
      }]
    },{
      xtype:'fieldset',
      title: '渠道信息',
      collapsible: true,
      defaults: {
        labelWidth: 89,
        anchor: '100%',
        layout: {
          type: 'hbox',
          defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
        }
      },
      items:[{
       xtype:'textfield',
       fieldLabel: '主销渠道',
       name:'strMainChannel'
      },{
       xtype:'textfield',
       fieldLabel: '渠道公司',
       name:'strChannelCompany'
      },{
       xtype:'textfield',
       fieldLabel: '渠道联系人',
       name:'strChannelContact'
      },{
       xtype:'textfield',
       fieldLabel: '走帐公司',
       name:'strBillingCompany'
      }]
    }]
  });

  var ProjInfoForm=Ext.create('Ext.form.Panel',{
    xtype:'form',
    border:1,
    bodyPadding:5,
    region:'north',
    weight:-100,
    flex:2,
    autoScroll :true,
    fieldDefault:{
    	maskOnDisable:false,
    	disabledCls:"x-item"
    },
/*    listeners:{
      show: function(){
        this.up('form').getForm().loadRecord(sampleStore.first().data);
      }
    },
*/
    items:[{
    	xtype:'fieldset',
    	title:'项目信息',
    	collapsible:false,
    	items:[{
        xtype:'fieldcontainer',
        layout:'hbox',
        flex:1,
        width:480,
        fieldLabel: '项目类别',
        items:[
        {//主类别
          xtype:'textfield',
          //emptyText:"主类别...",  
    	    disabled:true,
          width:160,   
          name:'chCategory'
        }, 
        {//子类别
          xtype:'textfield',
          //emptyText:"子类别...",
    	    disabled:true,
          width:160,   
          name:'chSubCategory'
        }]
      },{
        xtype:'textfield',
        fieldLabel: '发行方',
        name:'strIssue',
    	  disabled:true,
        allowBlank: false
      },{
        xtype:'textfield',
        fieldLabel: '项目名称',
        width:480,
        name:'strName',
    	  disabled:true,
        allowBlank: false
      },{
        xtype:'numberfield',
        fieldLabel: '项目期限',
        name:'iMonth',
    	  disabled:true,
        allowBlank: false
      },{
        xtype:'numberfield',
        fieldLabel: '融资规模(万)',
        name:'iScale',
    	  disabled:true,
        allowBlank: false
      },{
        xtype:'textfield',
        fieldLabel: '分配',
    	  disabled:true,
        name:'chCycle'
      },{
        xtype:'textfield',
        fieldLabel: '项目收益属性',
    	  disabled:true,
        name:'chProfitProperty'
      },{
        xtype:'textfield',
        fieldLabel: '产品经理',
    	  disabled:true,
        name:'chManager',
      },{
        xtype:'datefield',
        fieldLabel: '成立日期',
    	  disabled:true,
        name:'dFound'
      },{
        xtype:'textfield',
        fieldLabel: '资金投向',
        width:480,
    	  disabled:true,
        name:'strFlowOfFund',
        allowBlank: false
      },{
        xtype:'textfield',
        fieldLabel: '合同情况',
        width:480,
    	  disabled:true,
        name:'strContract',
        allowBlank: true
      },{
        xtype:'textareafield',
        fieldLabel: '项目亮点',
        width:480,
        height:100,
    	  disabled:true,
        name:'strHighlights',
        allowBlank: false
      },{
        xtype:'textareafield',
        fieldLabel: '备注',
        width:480,
    	  disabled:true,
        name:'strRemark',
        allowBlank: true
      }]
    }]
  });
       
  var AmountDetailsGrid=Ext.create('Ext.grid.Panel',{
    store: sampleStore,
    border:1,
    title:'额度信息',
    region:'center',
    flex:2,
    dockedItems:[{
    	xtype:'toolbar',
    	dock: 'top',
    	items:[{
    		icon: '/misc/resources/icons/add.gif',
    		text:'新增额度信息' ,
    		handler:function(){
    			//todo
    			AmountEditForm.getForm().reset();
    			AmountEditForm.show();
    		}         		
    	}]
    }],
    columns:[{
        xtype: 'actioncolumn',
        text:'删除',
        width:30,
        sortable: false,
        items: [{
          icon: '/misc/resources/icons/cross.gif',
          tooltip: '删除此条记录',
          handler: function(grid, rowIndex, colIndex) {
            sampleStore.removeAt(rowIndex); 
          }
        }]
      },{
        xtype: 'actioncolumn',
        text:'编辑',
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
      {text:'份额',         dataIndex:'chTotalShare',     filtable:true, width:100},
      {text:'销售状态',     dataIndex:'chStatus',         filtable:true, width:100},
      {text:'认购金额',     dataIndex:'iAmount',          filtable:true, width:100},
      {text:'项目收益',     dataIndex:'fProfit',          filtable:true, width:100},
      {text:'产品经理',     dataIndex:'chManager',        filtable:true, width:100},
      {text:'税前佣金',     dataIndex:'fCommissionBTax',  filtable:true, width:100},
      {text:'税后佣金',     dataIndex:'fCommissionATax',  filtable:true, width:100},
      {text:'佣金',         dataIndex:'fInnerCommission', filtable:true, width:100},
      {text:'佣金（税后）', dataIndex:'fOuterCommission', filtable:true, width:100},
      {text:'打款日期',     dataIndex:'dPay',             filtable:true, width:100},
      {text:'已打款金额',   dataIndex:'iPaid',            filtable:true, width:100},
      {text:'包销/分销额度',dataIndex:'iQuota',           filtable:true, width:100},
      {text:'已打款额度',   dataIndex:'iQuotaPaid',       filtable:true, width:100},
      {text:'剩余额度',     dataIndex:'iQuotaRemain',     filtable:true, width:100},
      {text:'主销渠道',     dataIndex:'strMainChannel',   filtable:true, width:100},
      {text:'渠道公司',     dataIndex:'strChannelCompany',filtable:true, width:100},
      {text:'渠道联系人',   dataIndex:'strChannelContact',filtable:true, width:100},
      {text:'走帐公司',     dataIndex:'strBillingCompany',filtable:true, width:100}
    ]
  });

  var viewport = Ext.create('Ext.Viewport', {
    layout: {
        type: 'border',
        padding: 5
    },
    defaults: {
        split: true                //可改变窗体大小
    },
    items: [{
    	xtype:'box',
    	region:'north',
    	height: 30,
    	html:'<span class="app-header1">some system</span><span class="app-header2">some step</span>'
    },{
    	xtype:'panel', 
    	margin:'0 20 20 20',
    	border:0,
    	region:'center',
    	layout:'border',
      items:[{
      	xtype:'panel',
      	//autoScroll :true,
      	border:0,
      	//minWidth:500,
      	//minHeight:200,
      	layout:'border',
      	region:'center',
      	items:[
          ProjInfoForm,
          {
        	  xtype:'box',
          	region:'north',
           	weight:-200,
          	height:15
          },        
          AmountDetailsGrid
        ]
      },
      AmountEditForm
      ]
    }]
  });
  
  ProjInfoForm.getForm().loadRecord(sampleStore.first())
});