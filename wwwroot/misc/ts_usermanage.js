Ext.onReady(function() {
  Ext.QuickTips.init();
  
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
        icon: 'resources/icons/connect.gif',
        tooltip: '重置密码',
        handler: function(grid, rowIndex, colIndex) {
        }
      }]
    },{
      xtype: 'actioncolumn',
      width:30,
      sortable: false,
      items: [{
        icon: 'resources/icons/cog_edit.png',
        tooltip: '编辑用户信息',
        handler: function(grid, rowIndex, colIndex) {
        }
      }]
    },{
      xtype: 'actioncolumn',
      width:30,
      sortable: false,
      items: [{
        icon: 'resources/icons/delete.gif',
        tooltip: '禁用用户',
        handler: function(grid, rowIndex, colIndex) {
        }
      }]
    },{
      xtype: 'actioncolumn',
      width:30,
      sortable: false,
      items: [{
        icon: 'resources/icons/cross.gif',
        tooltip: '删除用户',
        handler: function(grid, rowIndex, colIndex) {
        }
      }]
    },{
    	text:'登录名',dataIndex:'strLoginname', width:100
    },{
    	text:'真实姓名',dataIndex:'strRealname', width:100
    },{
    	text:'职位',dataIndex:'chTitle', width:100
    },{
    	text:'分支机构',dataIndex:'chBranch', width:150
    },{
    	text:'联系电话',dataIndex:'strTel', width:150
    },{
    	text:'QQ',dataIndex:'strQQ', width:150
    },{
    	text:'邮箱',dataIndex:'strEmail', width:150
    }]
  })

  var UserEditWin=Ext.create("Ext.window.Window",{
    resizeable:false,
    closeAction:"hide",
    closable:false,
    title:'新增用户',
    width:360,
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
          	  icon:'resources/icons/accept.png',
              text: '确定',
              formBind: true, //only enabled once the form is valid
              disabled: true,
              handler: function() {
                  var win = this.up('window');
                  var form = this.up('form').getForm();
                  if (form.isValid()) {
                      form.submit({
                          success: function(form, action) {
                          	//todo!!
                             win.close();
                             document.location.href="ts2.html";
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
        xtype:'textfield',
        fieldLabel: '用户名',
        name:'strLoginname',
        allowBlank: false
      },{
        xtype:'textfield',
        fieldLabel: '密码',
        name:'strPassword',
        allowBlank: false
      },{
        xtype:'textfield',
        fieldLabel: '请重复密码',
        name:'strPassword2',
        allowBlank: false
      },{
        xtype:'textfield',
        fieldLabel: '真实姓名',
        name:'strRealname',
        allowBlank: false
      },{
        xtype:'combo',
        fieldLabel: '职位',
        name:'chTitle',
        queryMode : 'local',
        store : chTitleList,
        valueField: 'id',
        displayField: 'text',
        forceSelection:true,
        allowBlank: false
      },{
        xtype:'combo',
        fieldLabel: '分支机构',
        name:'chBranch',
        queryMode : 'local',
        store : chBranchList,
        valueField: 'id',
        displayField: 'text',
        forceSelection:true,
        allowBlank: false
      },{
        xtype:'textfield',
        fieldLabel: '联系电话',
        name:'strTel',
        allowBlank: false
      },{
        xtype:'textfield',
        fieldLabel: 'QQ',
        name:'strQQ',
        allowBlank: false
      },{
        xtype:'textfield',
        fieldLabel: 'Email',
        name:'strEmail',
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
        html:'<span class="app-header1">some system</span>'
      },{
        xtype:'box',
        html:'<span class="app-header2">用户管理</span>'
      },{
        xtype:'box',
        flex:1,
      },{
      	text:'新增用户',
      	icon:'resources/icons/user_add.gif',
      	handler:function(){UserEditWin.show();}
      },{
      	text:'项目管理',
      	icon:'resources/icons/user_add.gif',
      	handler:function(){window.location.href='ts_projmanage.html';}
      },{
      	text:'离开管理员模式',
      	icon:'resources/icons/cross.gif',
      	handler:function(){window.location.href='ts_viewonly.html';}
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
});