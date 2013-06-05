Ext.onReady(function() {
  Ext.QuickTips.init();

  //var params=Ext.Object.fromQueryString(location.search.substring(1));
  var proj_id;
  var proj_info_tpl;
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
        {name:'scale'            ,type:'float'},
        {name:'cycle'            ,type:'string' },
        {name:'amount'           ,type:'integer'},
        {name:'profit_property'  ,type:'string' },
        {name:'profit'           ,type:'float'  },
        {name:'manager'          ,type:'string' },
        {name:'contract'         ,type:'string' },
        {name:'remark'           ,type:'string' },
        {name:'pay_account'            ,type:'string' },
        {name:'countdown'            ,type:'string' },
        {name:'commission_b_tax' ,type:'float'  },
        {name:'commission_a_tax' ,type:'float'  },
        {name:'inner_commission' ,type:'float'  },
        {name:'outer_commission' ,type:'float'  },
        {name:'imm_payment' ,type:'float'  },
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
        url: '/ts/index.php/proj/detail_view?proj_id='+proj_id,
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
        {name:'scale'            ,type:'float'},
        {name:'cycle'            ,type:'string' },
        {name:'amount'           ,type:'integer'},
        {name:'profit_property'  ,type:'string' },
        {name:'profit'           ,type:'float'  },
        {name:'manager'          ,type:'string' },
        {name:'contract'         ,type:'string' },
        {name:'remark'           ,type:'string' },
        {name:'pay_account'            ,type:'string' },
        {name:'countdown'            ,type:'string' },
        {name:'commission_b_tax' ,type:'float'  },
        {name:'commission_a_tax' ,type:'float'  },
        {name:'inner_commission' ,type:'float'  },
        {name:'outer_commission' ,type:'float'  },
        {name:'imm_payment' ,type:'float'  },
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
        //url: 'proj_sample_data.json?para='+proj_id,
        url: '/ts/index.php/proj/view',
        reader: {
            type: 'json',
            root: 'data'
        }
      }
    });

  var fileListStore=Ext.create('Ext.data.JsonStore', {
      fields: [
        {name:'id'     ,type:'integer' },
        {name:'proj_id'     ,type:'integer' },
        {name:'filename'     ,type:'string' },
        {name:'filesize'     ,type:'integer' },
        {name:'editor'     ,type:'string' },
        {name:'create_ts'     ,type:'date' },
      ],
      proxy: {
        type: 'ajax',
        url: '/ts/index.php/upload/get_list?proj_id=',
        reader: {
            type: 'json',
            root: 'data'
        }
      }
    });

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
            icon:'/ts/misc/resources/icons/grid.png',
            text: '确定',
            id:'ok_create',
            hidden:false,
            formBind: true, //only enabled once the form is valid
            disabled: true,
            handler: function() {
              this.up('form').getForm().submit({
                url: '/ts/index.php/proj/proj_create_submit',
                submitEmptyText: false,
                waitMsg: 'Saving Data...',
                success: function(form, action) {
                  proj_id=action.result.proj_id;
                  ProjWin.close();
                  ProjWin.down('button[id=ok_edit]').setVisible(true);
                  ProjWin.down('button[id=ok_create]').setVisible(false);
                  ProjWin.down('button[id=cancel_edit]').setVisible(true);
                  ProjWin.down('button[id=cancel_create]').setVisible(false);
                  projStore.setProxy({
                    type: 'ajax',
                    url: '/ts/index.php/proj/proj_get?proj_id='+proj_id,
                    reader: {
                        type: 'json',
                        root: 'data'
                    }
                  });
                  projdetailStore.setProxy({
                    type: 'ajax',
                    url: '/ts/index.php/proj/detail_view?proj_id='+proj_id,
                    reader: {
                        type: 'json',
                        root: 'data'
                    }
                  });
                  fileListStore.setProxy({
                    type: 'ajax',
                    url: '/ts/index.php/upload/get_list?proj_id=',
                    reader: {
                        type: 'json',
                        root: 'data'
                    }
                  });
                  fileListStore.load();
  projStore.load(function(records, operation, success) {
    projdetailStore.load(function(records, operation, success) {
      var detailString="";
      //ProjInfoForm.getForm().loadRecord(records[0]);
      Ext.Array.forEach(records,function(record){
        detailString+='<pre>'+(record.get("amount")<10000?(record.get("amount")+"万"):(record.get("amount")/10000+"亿"))+record.get("profit")+'%</pre>';
      });
      var proj_info_tpl=Ext.create('Ext.XTemplate',[
        '<table cellpadding=0 cellspacing=0><tr><td style="padding:10px;border:1px;"><table>',
        '<tr><td class="r_ex_td_pre"><b>分类</b></td><td class="r_ex_td_main"><pre>{category}->{sub_category}, {exclusive}</pre></td></tr>',
        '<tr><td class="r_ex_td_pre"><b>项目名称</b></td><td class="r_ex_td_main"><pre>{name}</pre></td></tr>',
        '<tr><td class="r_ex_td_pre"><b>基本情况</b></td><td class="r_ex_td_main"><b>{profit_property}收益</b>项目，由<b>{issue}</b>发行，期限<b>{month}</b>个月，融资规模<b>{scale:this.cusNum()}</b>，按<b>{cycle}</b>分配</td></tr>',
        '<tr><td class="r_ex_td_pre"><b>预期收益</b></td><td class="r_ex_td_main">',
        detailString, '</td></tr>',
        //'{[(records[0].get("profit_property")==true)?"aaa":"bbb"]}',
        '<tr><td class="r_ex_td_pre"><b>资金投向</b></td><td class="r_ex_td_main"><pre>{flow_of_fund}</pre></td></tr>',
        '<tr><td class="r_ex_td_pre"><b>项目亮点</b></td><td class="r_ex_td_main"><pre style="overflow:auto;white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap;word-wrap:break-word;">{highlights}</pre></td></tr>',
        '<tr><td class="r_ex_td_pre"><b>合同情况</b></td><td class="r_ex_td_main"><pre style="overflow:auto;white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap;word-wrap:break-word;">{contract}</pre></td></tr>',
        '<tr><td class="r_ex_td_pre"><b>项目进度</b></td><td class="r_ex_td_main"><pre style="overflow:auto;white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap;word-wrap:break-word;">{countdown}</pre></td></tr>',
        '<tr><td class="r_ex_td_pre"><b>打款账号</b></td><td class="r_ex_td_main"><pre style="overflow:auto;white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap;word-wrap:break-word;">{pay_account}</pre></td></tr>',
        '<tr><td class="r_ex_td_pre"><b>备注</b></td><td class="r_ex_td_main"><pre style="overflow:auto;white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap;word-wrap:break-word;">{remark}</pre></td></tr>',
        '</table></td></tr></table>',
        {
          cusDate:function(d){return Ext.Date.format(d,'Y年m月d日');}
        },{
          cusNum:function(n){return (n<1)?(n*10000+"万"):(n+"亿")}
        }
      ]);
      proj_info_tpl.overwrite(Ext.getCmp('projInfoPanel').body,projStore.getAt(0).data);
      //proj_info_window.show();
    });    
  });
                } 
                //,
                //failure: function(form, action) {
                //  Ext.Msg.alert('alert', '保存失败。如有问题请联系管理员。');
                //}
              });
            }
          },{
            icon:'/ts/misc/resources/icons/grid.png',
            text: '确定',
            id:'ok_edit',
            hidden:true,
            formBind: true, //only enabled once the form is valid
            disabled: true,
            handler: function() {
              this.up('form').getForm().submit({
                url: '/ts/index.php/proj/proj_update_submit',
                submitEmptyText: false,
                waitMsg: 'Saving Data...',
                success: function(form, action) {
                  ProjWin.close();
  projStore.load(function(records, operation, success) {
    projdetailStore.load(function(records, operation, success) {
      var detailString="";
      //ProjInfoForm.getForm().loadRecord(records[0]);
      Ext.Array.forEach(records,function(record){
        detailString+='<pre>'+(record.get("amount")<10000?(record.get("amount")+"万"):(record.get("amount")/10000+"亿"))+record.get("profit")+'%</pre>';
      });
      proj_info_tpl=Ext.create('Ext.XTemplate',[
        '<table cellpadding=0 cellspacing=0><tr><td style="padding:10px;border:1px;"><table>',
        '<tr><td class="r_ex_td_pre"><b>分类</b></td><td class="r_ex_td_main"><pre>{category}->{sub_category}, {exclusive}</pre></td></tr>',
        '<tr><td class="r_ex_td_pre"><b>项目名称</b></td><td class="r_ex_td_main"><pre>{name}</pre></td></tr>',
        '<tr><td class="r_ex_td_pre"><b>基本情况</b></td><td class="r_ex_td_main"><b>{profit_property}收益</b>项目，由<b>{issue}</b>发行，期限<b>{month}</b>个月，融资规模<b>{scale:this.cusNum()}</b>，按<b>{cycle}</b>分配</td></tr>',
        '<tr><td class="r_ex_td_pre"><b>预期收益</b></td><td class="r_ex_td_main">',
        detailString, '</td></tr>',
        //'{[(records[0].get("profit_property")==true)?"aaa":"bbb"]}',
        '<tr><td class="r_ex_td_pre"><b>资金投向</b></td><td class="r_ex_td_main"><pre>{flow_of_fund}</pre></td></tr>',
        '<tr><td class="r_ex_td_pre"><b>项目亮点</b></td><td class="r_ex_td_main"><pre style="overflow:auto;white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap;word-wrap:break-word;">{highlights}</pre></td></tr>',
        '<tr><td class="r_ex_td_pre"><b>合同情况</b></td><td class="r_ex_td_main"><pre style="overflow:auto;white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap;word-wrap:break-word;">{contract}</pre></td></tr>',
        '<tr><td class="r_ex_td_pre"><b>项目进度</b></td><td class="r_ex_td_main"><pre style="overflow:auto;white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap;word-wrap:break-word;">{countdown}</pre></td></tr>',
        '<tr><td class="r_ex_td_pre"><b>打款账号</b></td><td class="r_ex_td_main"><pre style="overflow:auto;white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap;word-wrap:break-word;">{pay_account}</pre></td></tr>',
        '<tr><td class="r_ex_td_pre"><b>备注</b></td><td class="r_ex_td_main"><pre style="overflow:auto;white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap;word-wrap:break-word;">{remark}</pre></td></tr>',
        '</table></td></tr></table>',
        {
          cusDate:function(d){return Ext.Date.format(d,'Y年m月d日');}
        },{
          cusNum:function(n){return (n<10000)?(n+"万"):(n/10000+"亿")}
        }
      ]);
      proj_info_tpl.overwrite(Ext.getCmp('projInfoPanel').body,projStore.getAt(0).data);
      
      //proj_info_window.show();
    });    
  });
                } 
                //,
                //failure: function(form, action) {
                //  Ext.Msg.alert('alert', '保存失败。如有问题请联系管理员。');
                //}
              });
            }
          },{
            icon:'/ts/misc/resources/icons/cross.gif',
            text: '取消',
            id:'cancel_create',
            hidden:false,
            handler: function(){
              Ext.util.History.back();
            }
          },{
            icon:'/ts/misc/resources/icons/cross.gif',
            text: '取消',
            id:'cancel_edit',
            hidden:true,
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
                        if (this.getValue() == '固定收益类') {
                           chSubCategoryList.loadData(chFixedList,true);
                        } else if (this.getValue() == '浮动收益类') {
                           chSubCategoryList.loadData(chFloatingList,true);
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
              fieldLabel: '项目期限(月)',
              name:'month',
              allowBlank: false
            },{
              xtype:'numberfield',
              fieldLabel: '融资规模(亿)',
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
              xtype:'textareafield',
              fieldLabel: '打款账户',
              width:480,
              name:'pay_account',
              allowBlank: true
            },{
              xtype:'textareafield',
              fieldLabel: '项目进度',
              width:480,
              name:'countdown',
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
              xtype:'textfield',
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
        icon:'/ts/misc/resources/icons/accept.gif',
        text: '确认',
        formBind: true, //only enabled once the form is valid
        disabled: true,
        handler: function() {
          this.up('form').getForm().submit({
            url: '/ts/index.php/proj/detail_create_submit',
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
        icon:'/ts/misc/resources/icons/cross.gif',
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
      items:[
      {
        xtype:'hiddenfield',
        fieldLabel: 'proj_id',
        name:'proj_id',
        allowBlank: false
      },
      {
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
       }, {
         xtype:'combo',
         fieldLabel: '销售类别',
         name:'exclusive',
         queryMode : 'local',
         store : chExclusiveList,
         valueField: 'id',
         displayField: 'text',
         forceSelection:true,
         allowBlank: false
       }, {
         xtype:'combo',
         fieldLabel: '产品等级',
         name:'grade',
         queryMode : 'local',
         store : chGradeList,
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
        decimalPrecision:3,
        allowBlank: false
      },{
        xtype:'numberfield',
        fieldLabel: '税后佣金(%)',
        name:'commission_a_tax',
        decimalPrecision:3,
        allowBlank: false
      },{
        xtype:'numberfield',
        fieldLabel: '平台费用(%)',
        name:'inner_commission',
        decimalPrecision:3,
        allowBlank: false
      },{
        xtype:'numberfield',
        fieldLabel: '费用(%)',
        name:'outer_commission',
        decimalPrecision:3,
        allowBlank: false
      },{
        xtype:'numberfield',
        fieldLabel: '现结费用(%)',
        name:'imm_payment',
        decimalPrecision:3,
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
    },{
      xtype:'fieldset',
      title: '其他',
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
       fieldLabel: '产品经理备注',
       name:'manager_remark'
      }]
    }]
  });

  var uploadWin=Ext.create("Ext.window.Window",{
    title: '上传项目文件',
    width: 550,
    resizeable:false,
    closeAction:"hide",
    closable:true,
    bodyPadding: 10,
    items:[
    {
      xtype:"form",
      bodyPadding:5,
      trackResetOnLoad:true,
      border:0,
      waitTitle:"Pleas wait...",
      layout:'fit',
      items: [{
          xtype:'hiddenfield',
          name:'proj_id',
          allowBlank:false
      }, {
          xtype: 'filefield',
          name: 'file',
          fieldLabel: '文件',
          labelWidth: 50,
          width:500,
          msgTarget: 'side',
          allowBlank: false,
          anchor: '100%',
          buttonText: '选择文件...'
      }],
      
      buttons: [{
          text: '上传',
          handler: function() {
              var form = this.up('form').getForm();
              if(form.isValid()){
                  form.submit({
                      url: '/ts/index.php/upload/submit',
                      waitMsg: '正在上传文件...',
                      success: function(fp, o) {
                          Ext.Msg.alert('上传成功！', '您的文件 "' + o.result.file + '" 已成功上传。');
                          uploadWin.close();
                          fileListStore.load();
                      }
                  });
              }
          }
      }]
    }]
  });

  var ProjInfoForm=Ext.create('Ext.form.Panel',{
    xtype:'form',
    border:1,
    bodyPadding:5,
    region:'north',
    //weight:-100,
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
      	icon: '/ts/misc/resources/icons/cog_edit.png',
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
        name:'manager'
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
    region:'south',
    minHeight:156,
//    flex:1,
    emptyText:'暂无额度信息',
    columns:[
      {text:'认购金额',     dataIndex:'amount',           filtable:true, width:60,renderer:function(value,metaData,record,colIndex,store,view) {return value+'万';}},
      {
        xtype: 'actioncolumn',
        text:'删除',
        width:40,style: "text-align:center;",align: 'center', 
        sortable: false,
        items: [{
          icon: '/ts/misc/resources/icons/cross.gif',
          tooltip: '删除此条记录',
          handler: function(grid, rowIndex, colIndex) {
            AmountEditForm.getForm().loadRecord(grid.getStore().getAt(rowIndex));
            AmountEditForm.getForm().submit({
                url: '/ts/index.php/proj/detail_delete_submit',
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
        width:40,style: "text-align:center;",align: 'center', 
        sortable: false,
        items: [{
          icon: '/ts/misc/resources/icons/cog_edit.png',
          tooltip: '编辑此条记录',
          handler: function(grid, rowIndex, colIndex) {
            //sampleStore.removeAt(rowIndex);      
            AmountEditForm.getForm().loadRecord(grid.getStore().getAt(rowIndex));
            AmountEditForm.show();
          }
        }]
      },      {text:'份额',         dataIndex:'total_share',      filtable:true, width:50},
      {text:'销售状态',     dataIndex:'status',           filtable:true, width:70},
      {text:'项目收益',     dataIndex:'profit',           filtable:true, width:60,renderer:function(value,metaData,record,colIndex,store,view) {return value+'%';}},
      {text:'税前佣金',     dataIndex:'commission_b_tax', filtable:true, width:60,renderer:function(value,metaData,record,colIndex,store,view) {return value+'%';}},
      {text:'税后佣金',     dataIndex:'commission_a_tax', filtable:true, width:60,renderer:function(value,metaData,record,colIndex,store,view) {return value+'%';}},
      {text:'平台费用',     dataIndex:'inner_commission', filtable:true, width:60,renderer:function(value,metaData,record,colIndex,store,view) {return value+'%';}},
      {text:'费用',         dataIndex:'outer_commission', filtable:true, width:60,renderer:function(value,metaData,record,colIndex,store,view) {return value+'%';}},
      {text:'费用',         dataIndex:'imm_payment', filtable:true, width:60,renderer:function(value,metaData,record,colIndex,store,view) {return value+'%';}},
      {text:'打款日期',     dataIndex:'pay',              filtable:true, width:100,renderer:new Ext.util.Format.dateRenderer("Y-m-d")},
      {text:'已打款金额',   dataIndex:'paid',             filtable:true, width:80},
      {text:'包销/分销额度',dataIndex:'quota',            filtable:true, width:90},
      {text:'已打款额度',   dataIndex:'quota_paid',       filtable:true, width:80},
      {text:'剩余额度',     dataIndex:'quota_remain',     filtable:true, width:80},
      {text:'主销渠道',     dataIndex:'main_channel',     filtable:true, width:80},
      {text:'渠道公司',     dataIndex:'channel_company',  filtable:true, width:80},
      {text:'渠道联系人',   dataIndex:'channel_contact',  filtable:true, width:80},
      {text:'走帐公司',     dataIndex:'billing_company',  filtable:true, width:80},
      {text:'产品经理备注', dataIndex:'manager_remark',   filtable:true, width:140,
          renderer: function(value,metaData,record,colIndex,store,view) {  
            metaData.tdAttr = 'data-qtip="<pre>'+value+'</pre>"';  
            return value; 
          }
      }
    ]
  });

  var FileListGrid=Ext.create('Ext.grid.Panel',{
    store: fileListStore,
    border:1,
    title:'文件列表',
    emptyText:'暂无文件信息',
    minHeight:156,
    region:'south',
//    flex:1,
    columns:[{
        xtype: 'actioncolumn',
        text:'删除',
        width:40,style: "text-align:center;",align: 'center', 
        sortable: false,
        items: [{
          icon: '/ts/misc/resources/icons/cross.gif',
          tooltip: '删除该文件',
          handler: function(grid, rowIndex, colIndex) {
            AmountEditForm.getForm().loadRecord(grid.getStore().getAt(rowIndex));
            AmountEditForm.getForm().submit({
                url: '/ts/index.php/proj/file_delete_submit',
                submitEmptyText: false,
                waitMsg: 'Saving Data...',
                success: function(form, action) {
                  fileListStore.removeAt(rowIndex);
                } ,
                failure: function(form, action) {
                  Ext.Msg.alert('错误！', '保存失败。如有问题请联系管理员。');
                }
            });
          }
        }]
      },{
        xtype: 'actioncolumn',
        text:'下载',
        width:40,style: "text-align:center;",align: 'center', 
        sortable: false,
        items: [{
          icon: '/ts/misc/resources/icons/download.gif',
          tooltip: '下载该文件',
          handler: function(grid, rowIndex, colIndex) {
            var filename=grid.getStore().getAt(rowIndex).get("filename");
            window.open('/ts/index.php/upload/get?file='+filename);
          }
        }]
      },
      {text:'文件名',         dataIndex:'filename',      filtable:true, width:300},
      {text:'文件大小',       dataIndex:'filesize',      filtable:true, width:70,
         renderer:function(value,metaData,record,colIndex,store,view) {
           if(value>=1048676) {var v=value/1048576;return v.toFixed(2)+'MB';}
           else if(value>=1024) {var v=value/1024;return v.toFixed(2)+'KB';}
           else return value;
         }
      },
      {text:'文件上传日期',   dataIndex:'create_ts',      filtable:true, width:100,renderer:new Ext.util.Format.dateRenderer("Y-m-d")},
    ]
  });

  var viewport = Ext.create('Ext.Viewport', {
    layout: {
        type: 'border',
//        padding: 5
    },
    defaults: {
//        split: true                //可改变窗体大小
    },
    items: [{
      xtype:'toolbar',
      region:'north',
      height:40,
      border:0,
      items:[
        {
        	xtype:'image',
                src:'/ts/misc/resources/firstshin.jpg',
          	width:240,
                height:38
        },{
        	xtype:'box',
        	html:'<span class="app-header2">项目编辑</span>'
        },{
      	xtype:'box',
      	flex:1
      },{
      	text:'返回项目管理列表',
      	icon:'/ts/misc/resources/icons/plugin.gif',
        scale:'medium',
      	handler:function(){window.location.href='/ts/index.php/proj/manage';}
      },{
      	text:'关闭窗口',
      	icon:'/ts/misc/resources/icons/cross.gif',
        scale:'medium',
      	handler:function(){window.close();}
      }]
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
          //ProjInfoForm,
        {
          id:'projInfoPanel',
          region:'center',
          height:380,
          minWidth:800,
          html:'正在加载项目信息...',
          autoScroll :true,
          dockedItems: [{
            dock: 'top',
            xtype: 'toolbar',
            bodyPadding: 5,
            items: [{
              xtype:'tbtext',
              text:'您可以：'
            },{
              text:'编辑项目信息',
              scale:'medium',
              icon: '/ts/misc/resources/icons/cog_edit.png',
              handler:function(){
      		ProjWin.down('form').getForm().loadRecord(projStore.first());
      		ProjWin.show();
              }
            },{
              icon: '/ts/misc/resources/icons/add.gif',
              scale:'medium',
              text:'新增额度信息' ,
              handler:function(){
                //todo
                AmountEditForm.getForm().reset();
                AmountEditForm.down('hiddenfield[name="proj_id"]').setValue(proj_id);
                AmountEditForm.down('hiddenfield[name="proj_detail_id"]').setValue(-1);
                AmountEditForm.down('numberfield[name="amount"]').setValue(null);
                AmountEditForm.show();
              }
            },{
              icon: '/ts/misc/resources/icons/upload.gif',
              text:'上传项目文件',
              scale:'medium',
              handler:function(){
                uploadWin.show();
              }
            }]
          }]
        },
        {
          xtype:'box',
          region:'south',
          //weight:-200,
          height:15
        }, 
        AmountDetailsGrid,
        {
          xtype:'box',
          region:'south',
          //weight:-100,
          height:15
        },
        FileListGrid
        ]
      },
      AmountEditForm
      ]
    }]
  });
  ProjWin.show();
});