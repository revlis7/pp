Ext.onReady(function() {
  Ext.QuickTips.init();
  var params = Ext.Object.fromQueryString(location.search.substring(1));
  
  var viewport = Ext.create('Ext.Viewport', {
    layout: 'border',
    items: [{
        xtype:'toolbar',
        region:'south',
        height:20,
        items:[{xtype:'box',flex:1},{
          xtype:'box',
          html:'上海玉尔投资发展有限公司 - 版权所有 - 2012-2013年'
        },{xtype:'box',flex:1}]
    },{
      xtype:'panel', 
      //margin:'0 20 20 20',
      border:0,
      region:'center',
      layout:{
        type:'hbox',
        align:'middle'
      },
      items: [{
        xtype:'box',flex:1
      },{
        xtype:'panel',
        region:'east',
        layout:'hbox',
        border:0,
        items:[{
          xtype:'panel',
          border:0,
          height:600,
          width:800,
          html:'<a href="http://www.firstshin.com/?page_id=479"><img src="/ts/misc/resources/fp_20130809.jpg"></img></a>'
        },{
          xtype:'form',
          border:2,
          margin:'0 0 0 10',
          region:'east',
          width:240,
          height:600,
          defaultType: 'textfield',
          layout:{
            type: 'vbox',
            align: 'center'
          },
          listeners: {  
            afterRender: function(thisForm, options){  
              this.keyNav = Ext.create('Ext.util.KeyNav', this.el, {  
                enter: function(){  
                  // 筛选表格  
                  var btn = Ext.getCmp('enter_button');  
                  btn.handler() ;  
                  console.log( this );  
                },  
                scope: this  
              });  
            }  
          },
          dockedItems: [{
            dock: 'bottom',
            xtype: 'toolbar',
            //bodyPadding: 5,
            items: [{
            	xtype:'box',
            	flex:1
            },
            {
              id:'enter_button',
              icon:'/ts/misc/resources/icons/grid.png',
              text: '登录',
              scale: 'medium',
              height:40,
              handler: function() {
                this.up('form').getForm().submit({
                  //url: 'xml-form-errors-ed-json.json',
                  url: '/ts/index.php/auth/auth_submit',
                  submitEmptyText: false,
                  waitMsg: '正在登录...',
                  success: function(form, action) {
                    if(typeof(params)!="undefined"){
                      if(typeof(params.redurl)!="undefined"){
                        window.location.href=params.redurl;
                      } else {
                        window.location.href='/ts/misc/redirect.html';
                      }
                    } else {
                      window.location.href='/ts/misc/redirect.html';
                    }
                  },
                  failure: function(form, action) {
                    Ext.Msg.alert('alert', '用户名或密码错误，请检查您的输入！');
                  }
                });
              }
            },{
              xtype:'box',
              flex:1
            }]
          },{
            dock: 'top',
            xtype:'toolbar',
            height: 40,
            border:0,
            items:[{
              xtype:'image',
              src:'/ts/misc/resources/firstshin.jpg',
              width:240,
              height:38
            },{
              xtype:'box',
              flex:1
            }]
          }],
          items:[{
            xtype:'box',
            margin:'40 0',
            border:0,
            html:'<span style="font-size:14px">欢迎访问玉尔财富。请登录:</span>'
            
          },{
            margin: 10,
            fieldLabel: '用户名',
            labelAlign: 'top',
            padding:10,
            name: 'loginname',
            width:180,
            allowBlank: false,
            labelClsExtra : "font-size:14px!important"
          },{
            margin: 10,
            fieldLabel: '密码',
            labelAlign: 'top',
            padding:10,
            inputType: 'password',
            name: 'password',
            width:180,
            allowBlank: false,
            labelClsExtra : "font-size:14px!important"
          }]
        }]
      },{
        xtype:'box',
        flex:1
      }]
    }]
  });
});