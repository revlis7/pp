Ext.Loader.setConfig({enabled: true,disableCaching:false});
Ext.Loader.setPath('Ext.ux', '/ts/misc/ux');

Ext.require([
 'Ext.grid.*',
 'Ext.data.*',
 'Ext.util.*',
 'Ext.state.*',
 'Ext.ux.grid.FiltersFeature',
]);

var controlTreeStore = Ext.create('Ext.data.TreeStore', {
    proxy:{
        type:'ajax',
        url:'/ts/index.php/api/get_control_tree',
        reader:{
            type:'json'
        }
    }
});

var controlTree=Ext.create('Ext.tree.Panel', {
    title: '功能选择',
    width:200,
    store: controlTreeStore,
    collapsible:true,
    rootVisible: false,
    collapseDirection:'left',
    region:'west'

});

controlTree.on("itemclick",function(view,record,item,index,e){
    //alert("点击的节点ID是："+record.raw.id+",文字是："+record.raw.text);
    if(record.isLeaf()==true){
    	window.location.href="/ts/index.php/"+record.get("id");
    } else {
        record.collapse();
    }
});
	var viewport = Ext.create('Ext.Viewport', {
        id:'viewport',
		layout: {
			type: 'border',
			padding: 0
		},
		baseCls:'customT',
		items: [{
			xtype:'toolbar',
			region:'south',
			border:1,
			height:26,
            padding:0,
			items:[{
                xtype:'box',flex:1,padding:0
			},{
                xtype:'box',padding:0,
				html:'版权所有。上海玉尔投资发展有限公司 - 2012-2013年'
			},{
                xtype:'box',flex:1,padding:0
			}]
		}]
	});

    var topToolbar=Ext.create('Ext.toolbar.Toolbar',{
		region:'north',
		height: 48,
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
            text:'<span class="app-header2">消息版</span>'
		},{
			xtype:'box',
			flex:1
		}/*,{
			icon: '/ts/misc/resources/icons/arrow_up_24.png',
			scale:'medium',
            hidden:true,
            id:'BtnNew',
            isManage:true,
			text:'新增公告' ,
			handler:function(){
				//todo
				Ext.getBody().mask();
				itemNewWin.show();
			}
		}*/]
	});

var reminderListStore=Ext.create('Ext.data.JsonStore', {
	fields: [
	{name:'itemid',type:'integer'},
	{name:'title',type:'string'},
	{name:'content',type:'string'},
	{name:'creator',type:'string'},
	{name:'create_ts',type:'date'},
	{name:'editor',type:'string'},
	{name:'update_ts',type:'date'},
	{name:'status',type:'string'}
	],
	proxy: {
		type: 'ajax',
		url: '/ts/index.php/board/get_list',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

var boardListPanel=Ext.create('Ext.panel.Panel',{
	height:150,
	id:'boardList',
	region:'center',
	border:0,
    autoScroll:true,
//	layout:{
//		type: 'accordion',
//		animate: true,
//		titleCollapse: true,
//		activeOnTop: true
//	},
    layout:{
        type:'vbox',
        align:'stretch'
    },
	items:[]
});

/*
var itemNewWin=Ext.create("Ext.window.Window",{
	title: '新增公告',
	width: 740,
    height:600,
	resizeable:false,
	closeAction:"hide",
	closable:true,
	bodyPadding: 10,
	bbar: {
		items:['->',{
			text: '确定',
			scale:'medium',
			handler: function() {
				var fform = this.up('window').down('form').getForm();
				if(fform.isValid())
				{
					fform.submit({
						url: '/ts/index.php/board/create_submit',
						waitMsg: '正在提交',
						success: function(fp, o) {
							//Ext.Msg.alert('上传成功！', '您的文件 "' + o.result.file + '" 已成功上传。');
							itemNewWin.close();
							//fileListStore.load();
						}
					});
				}
			}
		},{
			icon:'/ts/misc/resources/icons/x_24.png',
			text: '取消',
			scale:'medium',
			handler: function(){
				this.up('window').hide();
			}
		}]
	},
    items:[
	{
		xtype:"form",
		bodyPadding:5,
		trackResetOnLoad:true,
		border:0,
		waitTitle:"Pleas wait...",
		layout:'vbox',
		items: [{
			xtype:'textfield',
			fieldLabel: '公告标题',
			width:670,
			name:'title',
			allowBlank: false
		}, {
			xtype:'textareafield',
			fieldLabel: '公告内容',
			width:670,
            height:460,
			name:'content',
			allowBlank: false
		}, ]
	}]
});
var itemEditWin=Ext.create("Ext.window.Window",{
	title: '修改公告',
	width: 740,
    height:600,
	resizeable:false,
	closeAction:"hide",
	closable:true,
	bodyPadding: 10,
	bbar: {
		items:['->',{
			text: '确定',
			scale:'medium',
			handler: function() {
				var fform = this.up('window').down('form').getForm();
				if(fform.isValid())
				{
					fform.submit({
						url: '/ts/index.php/board/edit_submit',
						waitMsg: '正在提交',
						success: function(fp, o) {
							//Ext.Msg.alert('上传成功！', '您的文件 "' + o.result.file + '" 已成功上传。');
							itemEditWin.close();
							//fileListStore.load();
        					boardListPanel.removeAll();
        					boardListStore.load();
						}
					});
				}
			}
        },{
			icon:'/ts/misc/resources/icons/x_24.png',
			text: '取消',
			scale:'medium',
			handler: function(){
				this.up('window').hide();
			}
		}]
	},
    items:[
	{
		xtype:"form",
		bodyPadding:5,
		trackResetOnLoad:true,
		border:0,
		waitTitle:"Pleas wait...",
		layout:'vbox',
		items: [{
			xtype:'hiddenfield',
			width:670,
			name:'itemid',
			allowBlank: false
		}, {
			xtype:'textfield',
			fieldLabel: '公告标题',
			width:670,
			name:'title',
			allowBlank: false
		}, {
			xtype:'textareafield',
			fieldLabel: '公告内容',
			width:670,
            height:460,
			name:'content',
			allowBlank: false
		}, ]
	}]
});

itemNewWin.on({
	hide: function(){
		Ext.getBody().unmask();
	}
});
itemEditWin.on({
	hide: function(){
		Ext.getBody().unmask();
	}
});
*/
reminderListStore.on({
load:function(t, records, successful) {
	if(successful==true){
		Ext.Array.forEach(records,function(record){
			var recordPanel=Ext.create('Ext.panel.Panel',{
				margin:'0 5 5 5',
                collapsible:true,
                titleCollapse :true,
				border:0,
                id:'board_item_'+record.get("itemid"),
				//layout:'border',
                title:'<div style="height:26px;"><span style="font-size:20px;font-weight:bold;line-height:32px;">'+record.get("title")+'</span></div>',
	            rec_id:record.index,
                real_id:record.get("itemid"),
	            //titleAlign:'center',
				//proj_info_tpl:'',
	            dockedItems:[
	            {
	                xtype:'toolbar',
	                dock: 'top',
	                items:[
	                {
						text: '修改公告',
                        hidden:true,
                        isManage:true,
						scale:'medium',
						handler: function() {
							itemEditWin.down('form').getForm().loadRecord(boardListStore.getAt(this.up("panel").rec_id));
	    	                Ext.getBody().mask();
	        	            itemEditWin.show();
	            	    }
		            },{
						text: '删除公告',
                        hidden:true,
                        isManage:true,
						scale:'medium',
						handler: function() {
							Ext.Msg.show({
								title:'删除公告条目',
								msg: '您是否确认要删除'+record.get("title")+' 的公告条目？',
								buttons: Ext.Msg.OKCANCEL,
								icon: Ext.Msg.QUESTION,
                                real_id:this.up("panel").real_id,
                                fn:function(buttonId,text,opt){
									if(buttonId=='ok'){
										Ext.Ajax.request({
											url: '/ts/index.php/board/delete_submit?itemid='+opt.real_id,
											success: function(response){
                                                boardListPanel.removeAll();
												boardListStore.load();
											}
										});
									}
								}
							});
	    	            }
	        	    }]
	            }],
                html:'<div class="r_board_content" style="width:100%;height:100%;background-color:#ffffff;padding:10px;font-size:14px;"><p>'+record.get('creator')+' 创建于 '+record.get('create_ts').toLocaleDateString()+'</p><hr /><p><pre>'+record.get("content")+'</pre></p></div>'
			})
	        boardListPanel.add(recordPanel);
		});
	}
    listControl.load(function(records, operation, success) {
	    if(records[0].get("manage_button") == false){
            Ext.Array.forEach(Ext.ComponentQuery.query('button[isManage=true]'), function(Btn){
                Btn.show();
            });
    	}
    });
}
});

Ext.onReady(function(){
    Ext.getCmp('viewport').add(boardListPanel);
	Ext.getCmp('viewport').add(topToolbar);
	Ext.getCmp('viewport').add(controlTree);
    boardListStore.load();
    

});
