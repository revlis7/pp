Ext.Loader.setConfig({enabled: true,disableCaching:false});
Ext.Loader.setPath('Ext.ux', '/ts/misc/ux');

Ext.require([
 'Ext.grid.*',
 'Ext.data.*',
 'Ext.util.*',
 'Ext.state.*',
 'Ext.ux.grid.FiltersFeature',
 'Ext.grid.plugin.BufferedRenderer',
 'Ext.ux.form.SearchField'
]);
function slidepanelleft(co){co.animate({from:{left:500},to:{right:0}})};
function slidepanelright(co){co.animate({from:{right:500},to:{left:0}})};

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
var chFollowResult=Ext.create('Ext.data.ArrayStore', {
	fields: ['id', 'text'],
	data: [
['实施面谈',     '实施面谈'],
['成功约见',     '成功约见'],
['接通但未约见',   '接通但未约见'],
['仅成功接通',    '仅成功接通'],
['未找到人',     '未找到人'],
['接通但人很忙',   '接通但人很忙'],
['无人接听',     '无人接听'],
['小秘书',      '小秘书'],
['挂断',       '挂断'],
['放弃',        '放弃']
	]
});
