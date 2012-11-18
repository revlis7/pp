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

  var userGrid = Ext.create('Ext.grid.Panel', {
    store: strUserList,
    region:'center',
    columnLines: true,
    //'loginname', 'realname','title','branch'
    columns: [{
      xtype: 'actioncolumn',
      width:30,
      sortable: false,
      items: [{
        icon: '/ts/misc/resources/icons/connect.gif',
        tooltip: '重置密码',
        handler: function(grid, rowIndex, colIndex) {
        	UserPassWin.show();
        	UserPassWin.down('form').getForm().loadRecord(grid.getStore().getAt(rowIndex));
        }
      }]
    },{
      xtype: 'actioncolumn',
      width:30,
      sortable: false,
      items: [{
        icon: '/ts/misc/resources/icons/cog_edit.png',
        tooltip: '编辑用户信息',
        handler: function(grid, rowIndex, colIndex) {
        	UserEditWin.show();
        	UserEditWin.down('form').getForm().loadRecord(grid.getStore().getAt(rowIndex));
        }
      }]
    },{
      xtype: 'actioncolumn',
      width:30,
      sortable: false,
      items: [{
        icon: '/ts/misc/resources/icons/delete.gif',
        tooltip: '禁用用户',
        handler: function(grid, rowIndex, colIndex) {
        	UserEditWin.down('form').getForm().loadRecord(grid.getStore().getAt(rowIndex));
          UserEditWin.down('form').getForm().submit({
            url: '/ts/index.php/user/ban_submit',
            submitEmptyText: false,
            waitMsg: 'Saving Data...',
            success: function(form, action) {
               UserEditWin.close();
               strUserList.load();
            },
            failure: function(form, action) {
              Ext.Msg.alert('alert', '保存失败。如有问题请联系管理员。');
            }
          });
        }
      }]
    },{
      xtype: 'actioncolumn',
      width:30,
      sortable: false,
      items: [{
        icon: '/ts/misc/resources/icons/cross.gif',
        tooltip: '删除用户',
        handler: function(grid, rowIndex, colIndex) {
        	UserEditWin.down('form').getForm().loadRecord(grid.getStore().getAt(rowIndex));
          UserEditWin.down('form').getForm().submit({
            //url: 'xml-form-errors-ed-json.json',
            url: '/ts/index.php/user/delete_submit',
            submitEmptyText: false,
            waitMsg: 'Deleting...',
            success: function(form, action) {
               UserEditWin.close();
               strUserList.removeAt(rowIndex);
            },
            failure: function(form, action) {
              Ext.Msg.alert('alert', '保存失败。如有问题请联系管理员。');
            }
          });
        }
      }]
    },{
    	text:'登录名',dataIndex:'loginname', width:100
    },{
    	text:'真实姓名',dataIndex:'realname', width:100
    },{
    	text:'职位',dataIndex:'title', width:100
    },{
    	text:'分支机构',dataIndex:'branch', width:150
    },{
    	text:'联系电话',dataIndex:'tel', width:150
    },{
    	text:'QQ',dataIndex:'qq', width:150
    },{
    	text:'邮箱',dataIndex:'email', width:150
    }]
  })

  var UserNewWin=Ext.create("Ext.window.Window",{
    resizeable:false,
    closeAction:"hide",
    closable:false,
    title:'新增用户',
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
                  url: '/ts/index.php/user/create_submit',
                  submitEmptyText: false,
                  waitMsg: 'Saving Data...',
                  success: function(form, action) {
                    UserNewWin.close();
                    strUserList.load();
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
                  this.up('window').close();
              }
          }]
      }],
      items:[
      {
        xtype:'textfield',
        fieldLabel: '用户名',
        name:'loginname',
        allowBlank: false
      },{
        xtype:'textfield',
        fieldLabel: '密码',
        name:'password',
        itemId: 'pass',
        inputType: 'password',
        allowBlank: false
      },{
        xtype:'textfield',
        fieldLabel: '请重复密码',
        name:'password_confirm',
        inputType: 'password',
        vtype: 'password',
        initialPassField: 'pass',
        allowBlank: false
      },{
        xtype:'textfield',
        fieldLabel: '真实姓名',
        name:'realname',
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
        allowBlank: false
      },{
        xtype:'textfield',
        fieldLabel: '联系电话',
        name:'tel',
        allowBlank: false
      },{
        xtype:'textfield',
        fieldLabel: 'QQ',
        name:'qq',
        allowBlank: false
      },{
        xtype:'textfield',
        fieldLabel: 'Email',
        name:'email',
        allowBlank: false
      }]
    }]
  });
  var UserEditWin=Ext.create("Ext.window.Window",{
    resizeable:false,
    closeAction:"hide",
    closable:false,
    title:'编辑用户信息',
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
                  url: '/ts/index.php/user/update_submit',
                  submitEmptyText: false,
                  waitMsg: 'Saving Data...',
                  success: function(form, action) {
                    UserEditWin.close();
                    Ext.Msg.alert('消息', '修改成功！');
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
        fieldLabel: '真实姓名',
        name:'realname',
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
        allowBlank: false
      },{
        xtype:'textfield',
        fieldLabel: '联系电话',
        name:'tel',
        allowBlank: false
      },{
        xtype:'textfield',
        fieldLabel: 'QQ',
        name:'qq',
        allowBlank: false
      },{
        xtype:'textfield',
        fieldLabel: 'Email',
        name:'email',
        allowBlank: false
      }]
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
        html:'<span class="app-header2">用户管理</span>'
      },{
        xtype:'box',
        flex:1,
      },{
      	text:'新增用户',
      	icon:'/ts/misc/resources/icons/user_add.gif',
      	handler:function(){UserNewWin.show();}
      },{
      	text:'项目管理',
      	icon:'/ts/misc/resources/icons/user_add.gif',
      	handler:function(){window.location.href='/ts/index.php/proj/manage';}
      },{
      	text:'离开管理员模式',
      	icon:'/ts/misc/resources/icons/cross.gif',
      	handler:function(){window.location.href='/ts/index.php/proj';}
      }]
    },{
      xtype:'panel', 
      margin:'10 20 20 20',
      border:0,
      region:'center',
      align:'center',
      layout:'border',
      items: [userGrid]
    }]
  });
  
  strUserList.load();
});