<script>
Ext.onReady(function() {
  var viewport = Ext.create('Ext.Viewport', {
    layout: 'border',
    items: [{
		xtype:'toolbar',
		region:'north',
		height: 40,
		id:'topMenu',
		border:0,
		margin:0,
        enableOverflow:true,
		items:[
		{
			xtype:'image',
			src:'/ts/misc/resources/firstshin.jpg',
			width:240,
			height:38
		},{
			xtype:'tbtext',
            id:'headerTitle',
            html:'<span class="app-header2">模块列表</span>'
		}]
    },{
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
        layout:{
        	type: 'vbox',
     		align: 'center'
    	},
        defaults:{
            margin:{top:10,left:10,right:10,bottom:10}
        },
        border:0,
        items:[{
        	xtype:'button',
            width:360,
            height:100,
        	text:'<span style="font-family:微软雅黑,黑体,sans-serif;font-size:16px;font-weight:bold">我要查看产品</span>',
        	handler:function(){
        		window.location.href='/ts/index.php/proj';
        	}
        },{
        	xtype:'button',
            width:360,
            height:100,
        	text:'<span style="font-family:微软雅黑,黑体,sans-serif;font-size:16px;font-weight:bold">我要管理客户</span>',
        	handler:function(){
        		window.location.href='/ts/index.php/csr_corp';
        	}
        },{
            xtype:'button',
			text:'个人信息',
			icon:'/ts/misc/resources/icons/user_24.png',
			scale:'medium',
			handler:function(){window.location.href='/ts/index.php/user/info';}
		},{
            xtype:'button',
			text:'退出',
			scale:'medium',
			icon:'/ts/misc/resources/icons/curved_arrow_24.png',
			handler:function(){window.location.href='/ts/index.php/logout';}
		}]
      },{
        xtype:'box',
        flex:1
      }]
    }]
  });
});
</script>
