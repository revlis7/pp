Ext.Loader.setConfig({enabled: true,disableCaching:false});
Ext.Loader.setPath('Ext.ux', '/ts/misc/ux');

Ext.require([
 'Ext.grid.*',
 'Ext.data.*',
 'Ext.util.*',
 'Ext.state.*',
 'Ext.ux.grid.FiltersFeature',
]);

var listControl=Ext.create('Ext.data.JsonStore', {
	fields: [
	  {name:'manage_button'    ,type:'boolean' },
	  {name:'admin_button'    ,type:'boolean' }
	],
	proxy: {
	  type: 'ajax',
	  url: '/ts/index.php/api/access_fields_library',
	  reader: {
		  type: 'json',
		  root: 'data'
	  }
	}
});
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
			border:0,
			height:20,
			items:[{
				xtype:'box',flex:1
			},{
				xtype:'box',
				html:'版权所有。北京玉尔财富投资管理有限公司 - 2012-2013年'
			},{
				xtype:'box',flex:1
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
            id:'BtnRecycle',
            hidden:true,
			scale:'medium',
			text:'回收站' ,
            hidden:true,
            isAdmin:true,
			handler:function(){
				//todo
            	fileListStore.setProxy({
					type: 'ajax',
					url: '/ts/index.php/library/get_recycle_list',
					reader: {
						type: 'json',
						root: 'data'
					}
				});
            	fileListStore.load();
        		Ext.getCmp('tb_path').setText('<span style="font-size:16px;line-height:28px;">回收站</span>');
                FileListGrid.down('actioncolumn[text=恢复]').show();
                FileListGrid.down('gridcolumn[text=文件路径]').show();
                FileListGrid.down('actioncolumn[text=删除]').hide();
                FileListGrid.down('actioncolumn[text=下载]').hide();
                FileListGrid.un({
				    celldblclick:enterItem
				});
			}
		},{
			icon: '/ts/misc/resources/icons/arrow_up_24.png',
            id:'BtnList',
			scale:'medium',
			text:'文件列表' ,
            hidden:true,
            isAdmin:true,
			handler:function(){
				//todo
            	fileListStore.setProxy({
					type: 'ajax',
					url: '/ts/index.php/library/get_list?dir_path=%2F',
					reader: {
						type: 'json',
						root: 'data'
					}
				});
            	fileListStore.load();
                dir_path='/';
                Ext.getCmp('tb_path').setText('<span style="font-size:16px;line-height:28px;">文件目录： '+dir_path+'</span>');
                FileListGrid.down('actioncolumn[text=恢复]').hide();
                FileListGrid.down('gridcolumn[text=文件路径]').hide();
                FileListGrid.down('actioncolumn[text=删除]').show();
                FileListGrid.down('actioncolumn[text=下载]').show();
                FileListGrid.on({
				    celldblclick:enterItem
				});
			}
		},{
			icon: '/ts/misc/resources/icons/folder_stroke.png',
            id:'BtnNewDir',
			scale:'medium',
			text:'创建文件夹' ,
            hidden:true,
            isAdmin:true,
			handler:function(){
				//todo
				Ext.getBody().mask();
                newDirWin.down('form').getForm().reset();
                newDirWin.down('hiddenfield').setValue(dir_path);
				newDirWin.show();
            }
		},{
			icon: '/ts/misc/resources/icons/arrow_up_24.png',
            id:'BtnUpload',
			scale:'medium',
			text:'上传文件' ,
            hidden:true,
            isManage:true,
			handler:function(){
				//todo
				Ext.getBody().mask();
                uploadWin.down('form').getForm().reset();
                uploadWin.down('hiddenfield').setValue(dir_path);
				uploadWin.show();
			}
		}*/]
	});

var reminderListStore=Ext.create('Ext.data.JsonStore', {
	fields: [
	{name:'itemid',type:'integer'},
	{name:'category',type:'string'},
	{name:'title',type:'string'},
	{name:'content',type:'string'},
	{name:'attachment',type:'string'},
	{name:'link',type:'string'},
	{name:'flow_path',type:'string'},
	{name:'flow_is_current',type:'int'},
	{name:'creator',type:'string'},
	{name:'create_ts',type:'date'},
	{name:'editor',type:'string'},
	{name:'update_ts',type:'date'},
	{name:'remind_ts',type:'date'},
	{name:'assigner',type:'string'},
	{name:'assignee',type:'string'},
	{name:'assign_ts',type:'date'},
	{name:'finish_user',type:'string'},
	{name:'finish_ts',type:'date'},
	{name:'status',type:'string'}
	],
	proxy: {
		type: 'ajax',
		url: '/ts/index.php/reminder/view?type=assignee',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});


var enterItem=function(grid,td,cellIndex,record,tr,rowIndex){
    window.open(record.get("link"));
}

var	reminderListGrid=Ext.create('Ext.grid.Panel',{
	store: reminderListStore,
	//border:0,
	//title:'文件列表',
	emptyText:'暂无消息',
	minHeight:156,
    //    margin:'0 10 0 10',
	region:'center',
	flex:1,
    /*tbar:{
        items:[{
            xtype:'tbtext',
            id:'tb_path',
            text:'<span style="font-size:16px;line-height:28px;">文件目录： /</span>'
        }]
    },*/
	columns:[
	{text:'更新时间',	  dataIndex:'update_ts',	  filtable:true, width:130,style: "text-align:center;",align: 'center',renderer:new Ext.util.Format.dateRenderer("Y-m-d")},
        {text:'内容',		 dataIndex:'title',		filtable:true, style: "text-align:center;",align: 'left',width:722
	},
	
    {
		xtype: 'actioncolumn',
		width:40,style: "text-align:center;",align: 'center',
        hidden:true,
		sortable: false,
        text:'打开',
        hidden:true,
		items: [{
			icon: '/ts/misc/resources/icons/minus_16.png',
			tooltip: '打开',
			handler: function(grid, rowIndex, colIndex) {
				window.open(grid.getStore().getAt(rowIndex).get("link"));
			}
		}]
	}
	]
});

reminderListGrid.on({
    celldblclick:enterItem
});

/*        
var uploadWin=Ext.create("Ext.window.Window",{
	title: '上传文件',
	width: 550,
    height:200,
	resizeable:false,
	closeAction:"hide",
	closable:true,
	bodyPadding: 10,
	bbar: {
		items:['->',{
			text: '上传',
			scale:'medium',
			handler: function() {
				var fform = this.up('window').down('form').getForm();
				if(fform.isValid())
				{
					fform.submit({
						url: '/ts/index.php/library/submit',
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
			name:'dir_path'
		}, {
			xtype:'textfield',
			fieldLabel: '文件说明',
			width:620,
			name:'remark',
			allowBlank: true
		}, {
			xtype: 'filefield',
			name: 'file',
			fieldLabel: '文件',
			//labelWidth: 50,
			width:500,
			msgTarget: 'side',
			allowBlank: false,
			anchor: '100%',
			buttonText: '选择文件...'
		}]
	}]
});

uploadWin.on({
	hide: function(){
		Ext.getBody().unmask();
	}
});

var newDirWin=Ext.create("Ext.window.Window",{
	title: '新建文件夹',
	width: 550,
    height:200,
	resizeable:false,
	closeAction:"hide",
	closable:true,
	bodyPadding: 10,
	bbar: {
		items:['->',{
			text: '创建',
			scale:'medium',
			handler: function() {
				var fform = this.up('window').down('form').getForm();
				if(fform.isValid())
				{
					fform.submit({
						url: '/ts/index.php/library/create_dir_submit',
						waitMsg: '正在创建文件夹',
						success: function(fp, o) {
							Ext.Msg.alert('创建成功。');
							newDirWin.close();
							fileListStore.load();
						}
					});
				}
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
			name:'dir_path'
		}, {
			xtype: 'textfield',
			name: 'dir',
			fieldLabel: '文件夹名称',
			width:500
		}, {
			xtype:'textfield',
			fieldLabel: '文件夹说明',
			width:620,
			name:'remark',
			allowBlank: true
		}]
	}]
});

newDirWin.on({
	hide: function(){
		Ext.getBody().unmask();
	}
});
*/
Ext.onReady(function(){
    Ext.getCmp('viewport').add(reminderListGrid);
	Ext.getCmp('viewport').add(topToolbar);
	Ext.getCmp('viewport').add(controlTree);
    reminderListStore.load();
    
/*    listControl.load(function(records, operation, success) {
	    if(records[0].get("manage_button") == false){
            Ext.Array.forEach(Ext.ComponentQuery.query('button[isManage=true]'), function(Btn){
                Btn.show();
            });
            FileListGrid.down('actioncolumn[text=删除]').show();
    	}
	    if(records[0].get("admin_button") == false){
            Ext.Array.forEach(Ext.ComponentQuery.query('button[isAdmin=true]'), function(Btn){
                Btn.show();
            });
    	}
    });
*/
});
