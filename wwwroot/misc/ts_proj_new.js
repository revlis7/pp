Ext.onReady(function() {
  Ext.QuickTips.init();

  //var params=Ext.Object.fromQueryString(location.search.substring(1));
  var proj_id;

  var projStore=Ext.create('Ext.data.JsonStore', {
      fields: [
        {name:'proj_id'          ,type:'integer' },
        {name:'proj_detail_id'   ,type:'integer' },
        {name:'total_share'      ,type:'string' },
        {name:'status'           ,type:'string' },
        {name:'exclusive'        ,type:'string' },
        {name:'grade'            ,type:'string' },
        {name:'category'         ,type:'string' },
        {name:'sub_category'     ,type:'string' },
        {name:'issue'            ,type:'string' },
        {name:'name'             ,type:'string' },
        {name:'flow_of_fund'     ,type:'string' },
        {name:'highlights'       ,type:'string' },
        {name:'month'            ,type:'integer'},
        {name:'scale'            ,type:'integer'},
        {name:'cycle'            ,type:'string' },
        {name:'amount'           ,type:'integer'},
        {name:'profit_property'  ,type:'string' },
        {name:'profit'           ,type:'float'  },
        {name:'manager'          ,type:'string' },
        {name:'contract'         ,type:'string' },
        {name:'remark'           ,type:'string' },
        {name:'commission_b_tax' ,type:'float'  },
        {name:'commission_a_tax' ,type:'float'  },
        {name:'inner_commission' ,type:'float'  },
        {name:'outer_commission' ,type:'float'  },
        {name:'pay'              ,type:'date'   },
        {name:'paid'             ,type:'integer'},
        {name:'found'            ,type:'date'   },
        {name:'quota'            ,type:'integer'},
        {name:'quota_paid'       ,type:'integer'},
        {name:'quota_remain'     ,type:'integer'},
        {name:'main_channel'     ,type:'string' },
        {name:'channel_company'  ,type:'string' },
        {name:'channel_contact'  ,type:'string' },
        {name:'billing_company'  ,type:'string' },
        {name:'manager_remark'   ,type:'string' }
      ],
      proxy: {
        type: 'ajax',
        url: '/proj/detail_view?proj_id='+proj_id,
        reader: {
            type: 'json',
            root: 'data'
        }
      }
    });

  var projdetailStore=Ext.create('Ext.data.JsonStore', {
      fields: [
        {name:'proj_id'          ,type:'integer' },
        {name:'proj_detail_id'   ,type:'integer' },
        {name:'total_share'      ,type:'string' },
        {name:'status'           ,type:'string' },
        {name:'exclusive'        ,type:'string' },
        {name:'grade'            ,type:'string' },
        {name:'category'         ,type:'string' },
        {name:'sub_category'     ,type:'string' },
        {name:'issue'            ,type:'string' },
        {name:'name'             ,type:'string' },
        {name:'flow_of_fund'     ,type:'string' },
        {name:'highlights'       ,type:'string' },
        {name:'month'            ,type:'integer'},
        {name:'scale'            ,type:'integer'},
        {name:'cycle'            ,type:'string' },
        {name:'amount'           ,type:'integer'},
        {name:'profit_property'  ,type:'string' },
        {name:'profit'           ,type:'float'  },
        {name:'manager'          ,type:'string' },
        {name:'contract'         ,type:'string' },
        {name:'remark'           ,type:'string' },
        {name:'commission_b_tax' ,type:'float'  },
        {name:'commission_a_tax' ,type:'float'  },
        {name:'inner_commission' ,type:'float'  },
        {name:'outer_commission' ,type:'float'  },
        {name:'pay'              ,type:'date'   },
        {name:'paid'             ,type:'integer'},
        {name:'found'            ,type:'date'   },
        {name:'quota'            ,type:'integer'},
        {name:'quota_paid'       ,type:'integer'},
        {name:'quota_remain'     ,type:'integer'},
        {name:'main_channel'     ,type:'string' },
        {name:'channel_company'  ,type:'string' },
        {name:'channel_contact'  ,type:'string' },
        {name:'billing_company'  ,type:'string' },
        {name:'manager_remark'   ,type:'string' }
      ],
      proxy: {
        type: 'ajax',
        url: 'proj_sample_data.json?para='+proj_id,
        //url: '/proj/view',
        reader: {
            type: 'json',
            root: 'data'
        }
      }
    });
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
  var ProjWin=Ext.create("Ext.window.Window",{
      resizeable:false,
      closeAction:"hide",
      closable:false,
      title:'编辑项目',
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
            text: '确定',
            hidden:false,
            formBind: true, //only enabled once the form is valid
            disabled: true,
            handler: function() {
              this.up('form').getForm().submit({
                url: '/proj/proj_create_submit',
                submitEmptyText: false,
                waitMsg: 'Saving Data...',
                success: function(form, action) {
                  proj_id=action.result.proj_id;
                  ProjWin.close();
                  ProjWin.down('button[hidden=true]').setVisible(true);
                  ProjWin.down('button[hidden=false]').setVisible(false);
                  projStore.setProxy({
                    type: 'ajax',
                    url: '/proj/proj_get?proj_id='+proj_id,
                    reader: {
                        type: 'json',
                        root: 'data'
                    }
                  });
                  projStore.load(function(records, operation, success) {
                    ProjInfoForm.getForm().loadRecord(records[0]);
                  });
                  projdetailStore.setProxy({
                    type: 'ajax',
                    url: '/proj/detail_view?proj_id='+proj_id,
                    reader: {
                        type: 'json',
                        root: 'data'
                    }
                  });
                  projdetailStore.load();
                } 
                //,
                //failure: function(form, action) {
                //  Ext.Msg.alert('alert', '保存失败。如有问题请联系管理员。');
                //}
              });
            }
          },{
            icon:'/misc/resources/icons/grid.png',
            text: '确定',
            hidden:true,
            formBind: true, //only enabled once the form is valid
            disabled: true,
            handler: function() {
              this.up('form').getForm().submit({
                url: '/proj/proj_update_submit',
                submitEmptyText: false,
                waitMsg: 'Saving Data...',
                success: function(form, action) {
                  ProjWin.close();
                  projStore.load(function(records, operation, success) {
                    ProjInfoForm.getForm().loadRecord(records[0]);
                  });
                } 
                //,
                //failure: function(form, action) {
                //  Ext.Msg.alert('alert', '保存失败。如有问题请联系管理员。');
                //}
              });
            }
          },{
            icon:'/misc/resources/icons/cross.gif',
            text: '取消',
            handler: function(){
              Ext.util.History.back();
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
              xtype:'hiddenfield',
              fieldLabel: 'proj_id',
              name:'proj_id',
              allowBlank: false
            },
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
                 name:'category',
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
                 name:'sub_category',
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
          this.up('form').getForm().submit({
            url: '/proj/detail_create_submit',
            submitEmptyText: false,
            waitMsg: 'Saving Data...',
            success: function(form, action) {
              AmountEditForm.hide();
              projdetailStore.load();
            } 
            //,
            //failure: function(form, action) {
            //  Ext.Msg.alert('alert', '保存失败。如有问题请联系管理员。');
            //}
          });
        }
      },{
        icon:'/misc/resources/icons/cross.gif',
        text: '取消',
        handler: function(){
          this.up('form').getForm().reset();
          this.up('panel').hide(); 
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
        xtype:'hiddenfield',
        fieldLabel: 'proj_detail_id',
        name:'proj_detail_id',
        allowBlank: false
      },{
        xtype:'numberfield',
        fieldLabel: '认购金额(万)',
        name:'amount',
        allowBlank: false
      },{
        xtype:'numberfield',
        fieldLabel: '项目收益(%)',
        name:'profit',
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
         name:'total_share',
         queryMode : 'local',
         store : chTotalShareList,
         valueField: 'id',
         displayField: 'text',
         forceSelection:true,
         allowBlank: false
       }, {
         xtype:'combo',
         fieldLabel: '销售状态',
         name:'status',
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
        name:'commission_b_tax',
        allowBlank: false
      },{
        xtype:'numberfield',
        fieldLabel: '税后佣金(%)',
        name:'commission_a_tax',
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
       name:'pay'
      },{
       xtype:'numberfield',
       fieldLabel: '已打款金额',
       name:'paid'
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
       name:'quota'
      },{
       xtype:'numberfield',
       fieldLabel: '已打款额度',
       name:'quota_paid'
      },{
       xtype:'numberfield',
       fieldLabel: '剩余额度',
       name:'quota_remain'
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
       name:'main_channel'
      },{
       xtype:'textfield',
       fieldLabel: '渠道公司',
       name:'channel_company'
      },{
       xtype:'textfield',
       fieldLabel: '渠道联系人',
       name:'channel_contact'
      },{
       xtype:'textfield',
       fieldLabel: '走帐公司',
       name:'billing_company'
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
    dockedItems: [{
      dock: 'top',
      xtype: 'toolbar',
      bodyPadding: 5,
      items: [{
      	text:'编辑项目信息',
      	icon: '/misc/resources/icons/cog_edit.png',
      	handler:function(){
      		ProjWin.down('form').getForm().loadRecord(projStore.first());
      		ProjWin.show();
      	}
      }]
    }],
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
          name:'category'
        }, 
        {//子类别
          xtype:'textfield',
          //emptyText:"子类别...",
          disabled:true,
          width:160,   
          name:'sub_category'
        }]
      },{
        xtype:'textfield',
        fieldLabel: '发行方',
        name:'issue',
        disabled:true,
        allowBlank: false
      },{
        xtype:'textfield',
        fieldLabel: '项目名称',
        width:480,
        name:'name',
        disabled:true,
        allowBlank: false
      },{
        xtype:'numberfield',
        fieldLabel: '项目期限',
        name:'month',
        disabled:true,
        allowBlank: false
      },{
        xtype:'numberfield',
        fieldLabel: '融资规模(万)',
        name:'scale',
        disabled:true,
        allowBlank: false
      },{
        xtype:'textfield',
        fieldLabel: '分配',
        disabled:true,
        name:'cycle'
      },{
        xtype:'textfield',
        fieldLabel: '项目收益属性',
        disabled:true,
        name:'profit_property'
      },{
        xtype:'textfield',
        fieldLabel: '产品经理',
        disabled:true,
        name:'manager',
      },{
        xtype:'datefield',
        fieldLabel: '成立日期',
        disabled:true,
        name:'found'
      },{
        xtype:'textfield',
        fieldLabel: '资金投向',
        width:480,
        disabled:true,
        name:'flow_of_fund',
        allowBlank: false
      },{
        xtype:'textfield',
        fieldLabel: '合同情况',
        width:480,
        disabled:true,
        name:'contract',
        allowBlank: true
      },{
        xtype:'textareafield',
        fieldLabel: '项目亮点',
        width:480,
        height:100,
        disabled:true,
        name:'highlights',
        allowBlank: false
      },{
        xtype:'textareafield',
        fieldLabel: '备注',
        width:480,
        disabled:true,
        name:'remark',
        allowBlank: true
      }]
    }]
  });
       
  var AmountDetailsGrid=Ext.create('Ext.grid.Panel',{
    store: projdetailStore,
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
          AmountEditForm.down('hiddenfield').setValue(-1);
          AmountEditForm.down('numberfield[name="amount"]').setValue(null);
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
            AmountEditForm.getForm().loadRecord(grid.getStore().getAt(rowIndex));
            AmountEditForm.getForm().submit({
                url: 'xml-form-errors-ed-json.json',
                submitEmptyText: false,
                waitMsg: 'Saving Data...',
                success: function(form, action) {
                  projdetailStore.removeAt(rowIndex);
                } ,
                failure: function(form, action) {
                  Ext.Msg.alert('错误！', '保存失败。如有问题请联系管理员。');
                }
            });
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
      {text:'份额',         dataIndex:'total_share',     filtable:true, width:100},
      {text:'销售状态',     dataIndex:'status',         filtable:true, width:100},
      {text:'认购金额',     dataIndex:'amount',          filtable:true, width:100},
      {text:'项目收益',     dataIndex:'profit',          filtable:true, width:100},
      {text:'产品经理',     dataIndex:'manager',        filtable:true, width:100},
      {text:'税前佣金',     dataIndex:'commission_b_tax',  filtable:true, width:100},
      {text:'税后佣金',     dataIndex:'commission_a_tax',  filtable:true, width:100},
      {text:'佣金',         dataIndex:'inner_commission', filtable:true, width:100},
      {text:'佣金（税后）', dataIndex:'outer_commission', filtable:true, width:100},
      {text:'打款日期',     dataIndex:'pay',             filtable:true, width:100},
      {text:'已打款金额',   dataIndex:'paid',            filtable:true, width:100},
      {text:'包销/分销额度',dataIndex:'quota',           filtable:true, width:100},
      {text:'已打款额度',   dataIndex:'quota_paid',       filtable:true, width:100},
      {text:'剩余额度',     dataIndex:'quota_remain',     filtable:true, width:100},
      {text:'主销渠道',     dataIndex:'main_channel',   filtable:true, width:100},
      {text:'渠道公司',     dataIndex:'channel_company',filtable:true, width:100},
      {text:'渠道联系人',   dataIndex:'channel_contact',filtable:true, width:100},
      {text:'走帐公司',     dataIndex:'billing_company',filtable:true, width:100}
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
  
  ProjWin.show();
  
  
});