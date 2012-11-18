Ext.onReady(function() {
  Ext.QuickTips.init();
  Ext.tip.QuickTipManager.init();
  
  Ext.apply(Ext.form.field.VTypes, {
    password: function(val, field) {
      if (field.initialPassField) {
         var pwd = field.up('form').down('#' + field.initialPassField);
         return (val == pwd.getValue());
      }
      return true;
    },
    passwordText: '两次输入的密码不一致！'
  });

  var UserEditPanel=Ext.create("Ext.form.Panel",{
  	trackResetOnLoad:true,
    border:0,
    waitTitle:"Pleas wait...",
    layout:{
      type:'vbox',
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
        	icon:'/ts/misc/resources/icons/accept.png',
          text: '修改密码',
          //formBind: true, //only enabled once the form is valid
          //disabled: true,
          handler: function() {
          	UserPassWin.show();
          }
        }]
    }],
    items:[
    {
      xtype:'textfield',
      fieldLabel: '用户名',
      name:'loginname',
      disabled:true,
      allowBlank: false
    },{
      xtype:'textfield',
      fieldLabel: '真实姓名',
      name:'realname',
      disabled:true,
      allowBlank: false
    },{
      xtype:'combo',
      fieldLabel: '职位',
      name:'title',
      queryMode : 'local',
      store : chTitleList,
      valueField: 'id',
      displayField: 'text',
      forceSelection:true,
      disabled:true,
      allowBlank: false
    },{
      xtype:'combo',
      fieldLabel: '分支机构',
      name:'branch',
      queryMode : 'local',
      store : chBranchList,
      valueField: 'id',
      displayField: 'text',
      forceSelection:true,
      disabled:true,
      allowBlank: false
    },{
      xtype:'textfield',
      fieldLabel: '联系电话',
      name:'tel',
      disabled:true,
      allowBlank: false
    },{
      xtype:'textfield',
      fieldLabel: 'QQ',
      name:'qq',
      disabled:true,
      allowBlank: false
    },{
      xtype:'textfield',
      fieldLabel: 'Email',
      name:'email',
      disabled:true,
      allowBlank: false
    }]
  });
  
  var UserPassWin=Ext.create("Ext.window.Window",{
    resizeable:false,
    closeAction:"hide",
    closable:false,
    title:'修改密码',
    width:380,
    items:[
    {
      xtype:"form",
      bodyPadding:5,
      trackResetOnLoad:true,
      border:0,
      waitTitle:"Pleas wait...",
      layout:{
        type:'vbox',
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
          	icon:'/ts/misc/resources/icons/accept.png',
            text: '确定',
            formBind: true, //only enabled once the form is valid
            disabled: true,
            handler: function() {
              this.up('form').getForm().submit({
                  //url: 'xml-form-errors-ed-json.json',
                  url: '/ts/index.php/user/pwd_change_submit',
                  submitEmptyText: false,
                  waitMsg: 'Saving Data...',
                  success: function(form, action) {
                    UserPassWin.close();
                    Ext.Msg.alert('消息', '密码修改成功！');
                    strUserList.load();
                  }
                  // ,
                  //failure: function(form, action) {
                  //  Ext.Msg.alert('alert', '保存失败。如有问题请联系管理员。');
                  //}
              });
            }
          },{
          	  icon:'/ts/misc/resources/icons/cross.gif',
              text: '取消',
              handler: function(){
                  this.up('window').close();
              }
          }]
      }],
      items:[
      {
        xtype:'textfield',
        fieldLabel: '用户名',
        name:'loginname',
        disabled:true,
        allowBlank: false
      },{
        xtype:'textfield',
        fieldLabel: '密码',
        name:'password',
        itemId: 'passE',
        inputType: 'password',
        allowBlank: false
      },{
        xtype:'textfield',
        fieldLabel: '请重复密码',
        name:'password_confirm',
        inputType: 'password',
        vtype: 'password',
        initialPassField: 'passE',
        allowBlank: false
      }]
    }]
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
        html:'<span class="app-header2">个人信息</span>'
      },{
        xtype:'box',
        flex:1,
      },{
      	text:'返回',
      	icon:'/ts/misc/resources/icons/plugin.gif',
      	handler:function(){Ext.util.History.back();}
      },{
      	text:'退出',
      	icon:'/ts/misc/resources/icons/cross.gif',
      	handler:function(){window.location.href='/ts/index.php/logout';}
      }]
    },{
      xtype:'panel', 
      margin:'10 20 20 20',
      border:0,
      region:'center',
      align:'center',
      layout:'border',
      items: [UserEditPanel]
    }]
  });
  
  strUserList.load(function(records, operation, success) {
    UserEditPanel.getForm().loadRecord(records[0]);
  });
});