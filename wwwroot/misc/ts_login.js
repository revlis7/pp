Ext.onReady(function() {
  Ext.QuickTips.init();

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
        html:'<span class="app-header2">请登录</span>'
      },{
        xtype:'box',
        flex:1,
      }]
    },{
      xtype:'panel', 
      margin:'0 20 20 20',
      border:0,
      region:'center',
      align:'center',
      layout:'border',
      items: [{
        xtype:'form',
        border:1,
        width:400,
        defaultType: 'textfield',
        layout:{
        	type: 'vbox',
        	align: 'center'
        },
        dockedItems: [{
          dock: 'bottom',
          xtype: 'toolbar',
          bodyPadding: 5,
          items: [{
          	xtype:'box',
          	flex:1
          },
          {
          	icon:'/misc/resources/icons/grid.png',
            text: '登录',
            handler: function() {
         window.location.href='ts_viewonly.html';
            }
          },{
          	xtype:'box',
          	flex:1
          }]
        }],
        items:[{
          margin: '10 0 5 0',
          fieldLabel: '用户名',
          name: 'loginname',
          allowBlank: false
        },{
        	margin: '0 0 10 0',
          fieldLabel: '密码',
          inputType: 'password',
          name: 'password',
          allowBlank: false
        }]
      }]
    }]
  });
});