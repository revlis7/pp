Ext.Loader.setConfig({enabled: true,disableCaching:false});
Ext.Loader.setPath('Ext.ux', '/ts/misc/ux');

Ext.require([
 'Ext.grid.*',
 'Ext.data.*',
 'Ext.util.*',
 'Ext.state.*',
 'Ext.ux.grid.FiltersFeature',
]);

var dir_path='/';
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
    /*    switch(record.get("text"))
    {
        case "精选产品":
            window.location.href="/ts/index.php/proj"
	        break;
        case "其他固定收益产品":
            window.location.href="/ts/index.php/proj"
	        break;
        case "其他浮动收益产品":
            window.location.href="/ts/index.php/proj"
	        break;
        case "个人客户":
            window.location.href="/ts/index.php/csr_person"
	        break;
        case "渠道客户":
            window.location.href="/ts/index.php/csr_channel"
	        break;
        case "机构客户":
            window.location.href="/ts/index.php/csr_corp"
	        break;
        default:
            alert('nothing!');
	        break;
    }
*/
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
            text:'<span class="app-header2">知识库</span>'
		},{
			xtype:'box',
			flex:1
		},{
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
		}]
	});

var fileListStore=Ext.create('Ext.data.JsonStore', {
	fields: [
	{name:'id',type:'integer'},
	{name:'filename',type:'string'},
	{name:'filesize',type:'integer'},
	{name:'format',type:'string'},
	{name:'remark',type:'string'},
	{name:'dir_path',type:'string'},
	{name:'dest_dir',type:'string'},
    {name:'is_dir',type:'int'},
	{name:'is_latest',type:'int'},
	{name:'is_delete',type:'int'}
	],
	proxy: {
		type: 'ajax',
		url: '/ts/index.php/library/get_list?dir_path=%2F',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});


var enterItem=function(grid,td,cellIndex,record,tr,rowIndex){
        if(record.get("is_dir")==1){
            dir_path=record.get("dest_dir");
            fileListStore.setProxy({
				type: 'ajax',
				url: '/ts/index.php/library/get_list?dir_path='+encodeURI(dir_path),
				reader: {
					type: 'json',
					root: 'data'
				}
			});
            fileListStore.load();
        	Ext.getCmp('tb_path').setText('<span style="font-size:16px;line-height:28px;">文件目录： '+dir_path+'</span>');
        } else {
			var message=record.get("filename");
			var fileid=record.get("id");
			Ext.Msg.show({
				title:'下载文件',
				msg: '您是否确认要下载该文件: '+message,
				buttons: Ext.Msg.OKCANCEL,
				icon: Ext.Msg.QUESTION,
				fn:function(buttonId){
					if(buttonId=='ok'){
            			window.open('/ts/index.php/library/get?fileid='+fileid);
					}
				}
			});
        }
	}

var	FileListGrid=Ext.create('Ext.grid.Panel',{
	store: fileListStore,
	//border:0,
	//title:'文件列表',
	emptyText:'暂无文件信息',
	minHeight:156,
    //    margin:'0 10 0 10',
	region:'center',
	flex:1,
    tbar:{
        items:[{
            xtype:'tbtext',
            id:'tb_path',
            text:'<span style="font-size:16px;line-height:28px;">文件目录： /</span>'
        }]
    },
	columns:[
	{text:'文件名',		 dataIndex:'filename',		filtable:true, style: "text-align:center;",align: 'left',width:322,
    	 renderer:function(value,metaData,record,colIndex,store,view) {
             if(record.get("is_dir")==1){
                 return '<img src="/ts/misc/resources/icons/folder_stroke.png"></img>&nbsp;'+value;
             } else {
                 return '<img src="/ts/misc/resources/icons/document_alt_stroke_24.png"></img>&nbsp;'+value;
             }
		 }
	},
    {text:'文件简介',		 dataIndex:'remark',		filtable:true, style: "text-align:center;",align: 'left',width:322},
	{
		xtype: 'actioncolumn',
		width:40,style:	"text-align:center;",align:	'center',
        text:'下载',
		sortable: false,
		items: [{
			icon: '/ts/misc/resources/icons/download_16.png',
			tooltip: '下载该文件',
            getClass:function(val,meta,record){
                if(record.get("is_dir")==1) {
                    return 'x-hidden';
                }
            },
			handler: function(grid,	rowIndex, colIndex)	{
				var	fileid=grid.getStore().getAt(rowIndex).get("id");
				window.open('/ts/index.php/library/get?fileid='+fileid);
			}
		}]
	},{
		xtype: 'actioncolumn',
		width:40,style: "text-align:center;",align: 'center',
		sortable: false,
        text:'删除',
        hidden:true,
		items: [{
			icon: '/ts/misc/resources/icons/minus_16.png',
			tooltip: '删除该文件',
            getClass:function(val,meta,record){
                if(record.get("is_dir")==1 && record.get("filename")=="返回上层") {
                    return 'x-hidden';
                }
            },
			handler: function(grid, rowIndex, colIndex) {
				var filename=grid.getStore().getAt(rowIndex).get("filename");
				var fileid=grid.getStore().getAt(rowIndex).get("id");
				Ext.Msg.show({
					title:'删除文件',
					msg: '您是否确认要删除文件 <b>'+filename+'</b> ？',
					buttons: Ext.Msg.OKCANCEL,
					icon: Ext.Msg.QUESTION,
					fn:function(buttonId){
						if(buttonId=='ok'){
							Ext.Ajax.request({
								url: '/ts/index.php/library/delete?fileid='+fileid,
								success: function(response){
									fileListStore.load();
								}
							});
						}
					}
				});
			}
		}]
	},{
		xtype: 'actioncolumn',
		width:40,style: "text-align:center;",align: 'center',
        hidden:true,
		sortable: false,
        text:'恢复',
        hidden:true,
		items: [{
			icon: '/ts/misc/resources/icons/minus_16.png',
			tooltip: '恢复该文件',
			handler: function(grid, rowIndex, colIndex) {
				var filename=grid.getStore().getAt(rowIndex).get("filename");
				var fileid=grid.getStore().getAt(rowIndex).get("id");
				Ext.Msg.show({
					title:'恢复文件',
					msg: '您是否确认要恢复文件 <b>'+filename+'</b> ？',
					buttons: Ext.Msg.OKCANCEL,
					icon: Ext.Msg.QUESTION,
					fn:function(buttonId){
						if(buttonId=='ok'){
							Ext.Ajax.request({
								url: '/ts/index.php/library/restore?fileid='+fileid,
								success: function(response){
									fileListStore.load();
								}
							});
						}
					}
				});
			}
		}]
	},{text:'文件大小',		dataIndex:'filesize',	   filtable:true, style: "text-align:center;",align: 'right',width:120,
		 renderer:function(value,metaData,record,colIndex,store,view) {
             if(record.get("is_dir") == 1){return '';}
			 if(value>=1048676)	{var v=value/1048576;return	v.toFixed(1)+' MB';}
			 else if(value>=1024) {var v=value/1024;return v.toFixed(1)+' KB';}
			 else return value;
		 }
	},
	{text:'文件上传日期',	  dataIndex:'create_ts',	  filtable:true, width:130,style: "text-align:center;",align: 'center',renderer:new Ext.util.Format.dateRenderer("Y-m-d")},
        {text:'文件路径',	  dataIndex:'dir_path',	  hidden:true,filtable:true, width:130,style: "text-align:center;",align: 'left'},
	]
});

FileListGrid.on({
    celldblclick:enterItem
});

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

Ext.onReady(function(){
    Ext.getCmp('viewport').add(FileListGrid);
	Ext.getCmp('viewport').add(topToolbar);
	Ext.getCmp('viewport').add(controlTree);
    fileListStore.load();
    
    listControl.load(function(records, operation, success) {
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

});
