Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', '/ts/misc/ux');

Ext.require([
 'Ext.grid.*',
 'Ext.data.*',
 'Ext.util.*',
 'Ext.state.*',
 'Ext.ux.grid.FiltersFeature',
]);
var chTotalShareList=Ext.create('Ext.data.ArrayStore', {
	fields: ['id', 'text'],
	data: [
	  ['OPEN','OPEN'],
	  ['大带小','大带小'],
	  ['无','无']
	]
});

var chStatusList=Ext.create('Ext.data.ArrayStore', {
	fields: ['id', 'text'],
	data: [
	  ['在售','在售'],
	  ['预约','预约'],
	  ['结束','结束']
	]
});

var chExclusiveList=Ext.create('Ext.data.ArrayStore', {
	fields: ['id', 'text'],
	data: [
	  ['自主开发类','自主开发类'],
	  ['包销类','包销类'],
	  ['通道类','通道类']
	]
});

var chGradeList=Ext.create('Ext.data.ArrayStore', {
	fields: ['id', 'text'],
	data: [
	  ['五星级','五星级'],
	  ['四星级','四星级'],
	  ['三星级','三星级'],
	  ['二星级','二星级'],
	  ['一星级','一星级']
	]
});

var chCategoryList=Ext.create('Ext.data.ArrayStore', {
	fields: ['id', 'text'],
	data: [
	  ['固定收益类','固定收益类'],
	  ['浮动收益类','浮动收益类']
	]
});

var chCycleList=Ext.create('Ext.data.ArrayStore', {
	fields: ['id', 'text'],
	data: [
	  ['项目期','项目期'],
	  ['年','年'],
	  ['半年','半年'],
	  ['季度','季度'],
	  ['月','月'],
	  ['其他','其他'],
	  ['不适用','不适用']
	]
});

var chProfitPropertyList=Ext.create('Ext.data.ArrayStore', {
	fields: ['id', 'text'],
	data: [
	  ['固定','固定'],
	  ['浮动','浮动'],
	  ['固定加浮动','固定加浮动'],
	  ['其他','其他']
	]
});

var chManagerList=Ext.create('Ext.data.ArrayStore', {
	fields: ['id', 'text'],
	data: [
	  ['申玉玺','申玉玺'],
	  ['孟祥春','孟祥春'],
	  ['王璐','王璐'],
	  ['翟晓凤','翟晓凤']
	]
});

var chFixedList=[
  ['集合信托：上市公司股票质押类','集合信托：上市公司股票质押类'],
  ['集合信托：政府基建类','集合信托：政府基建类'],
  ['集合信托：房地产类','集合信托：房地产类'],
  ['集合信托：其他类','集合信托：其他类'],
  ['私募基金','私募基金'],
  ['P2P理财','P2P理财'],
  ['其他','其他']
]

var chFloatingList=[
  ['债券基金','债券基金'],
  ['证券基金','证券基金'],
  ['股权基金','股权基金'],
  ['其他','其他']
]

var	fileListStore=Ext.create('Ext.data.JsonStore', {
	fields:	[
	{name:'id'	,type:'integer'	},
	{name:'proj_id'	,type:'integer'	},
	{name:'filename'	,type:'string' },
	{name:'filesize'	,type:'integer'	},
	{name:'editor'	,type:'string' },
	{name:'create_ts'	,type:'date' },
	],
	proxy: {
		type: 'ajax',
		url: '/ts/index.php/upload/get_list?proj_id=',
		reader:	{
			type: 'json',
			root: 'data'
		}
	}
});
var	FileListGrid=Ext.create('Ext.grid.Panel',{
	store: fileListStore,
	border:1,
	title:'文件列表',
	emptyText:'暂无文件信息',
	minHeight:156,
	region:'south',
	flex:1,
	columns:[
	{
		xtype: 'actioncolumn',
		width:40,style:	"text-align:center;",align:	'center',
		sortable: false,
		items: [{
			icon: '/ts/misc/resources/icons/download.gif',
			tooltip: '下载该文件',
			handler: function(grid,	rowIndex, colIndex)	{
				var	filename=grid.getStore().getAt(rowIndex).get("filename");
				window.open('/ts/index.php/upload/get?file='+filename);
			}
		}]
	},
	{text:'文件名', dataIndex:'filename', filtable:true, style: "text-align:center;",align: 'left',width:400},
	{text:'文件大小', dataIndex:'filesize',	filtable:true, style: "text-align:center;",align: 'right',width:80,
		 renderer:function(value,metaData,record,colIndex,store,view) {
			 if(value>=1048676)	{var v=value/1048576;return	v.toFixed(2)+'MB';}
			 else if(value>=1024) {var v=value/1024;return v.toFixed(2)+'KB';}
			 else return value;
		 }
	},
	{text:'文件上传日期',	dataIndex:'create_ts', filtable:true, width:120,renderer:new Ext.util.Format.dateRenderer("Y-m-d")}
	]
});
var	AmountDetailsGrid=Ext.create('Ext.grid.Panel',{
	store: projAllStore,
	border:1,
	title:'额度信息',
	region:'south',
	minHeight:156,
	flex:1,
	emptyText:'暂无额度信息',
	columns:[
	{text:'子名称',		 dataIndex:'sub_name', filtable:true, style: "text-align:center;",align: 'center',width:80},
	{text:'项目期限',	 dataIndex:'month',	filtable:true, style: "text-align:center;",align: 'center',width:80,renderer:function(value,metaData,record,colIndex,store,view) {return value+'个月';}},
	{text:'认购金额',	 dataIndex:'amount', filtable:true,	style: "text-align:center;",align: 'center',width:80,renderer:function(value,metaData,record,colIndex,store,view) {return value+'万';}},
	{text:'项目收益',	 dataIndex:'profit', filtable:true,	style: "text-align:center;",align: 'center',width:80,renderer:function(value,metaData,record,colIndex,store,view) {return value.toFixed(3)+'%';}},
	{text:'销售状态',	 dataIndex:'status', filtable:true,	style: "text-align:center;",align: 'center',width:80,
		renderer:function(value,metaData){
			if(value=="在售"){
				metaData.style='background:#CCFFCC;color:#000000'
			} else if(value=="结束"){
				metaData.style='background:#DFDFDF;color:#606060;'
			} else {
				metaData.style='background:#FFFF99;color:#000000'
			}
			return value;
		}
	},
	{text:'份额',		 dataIndex:'total_share', filtable:true, style:	"text-align:center;",align:	'center',width:60,
		renderer:function(value,metaData){
			if(value=="OPEN"){
				metaData.style='background:#CCFFCC;color:#000000'
			} else if(value=="无"){
				metaData.style='background:#DFDFDF;color:#606060;'
			} else {
				metaData.style='background:#FFFF99;color:#000000'
			}
			return value;
		}
	},
	{text:'成立日期',	 dataIndex:'found',	filtable:true, style: "text-align:center;",align: 'center',width:60,renderer:new Ext.util.Format.dateRenderer("Y-m-d")},
	{text:'税前佣金',	 dataIndex:'commission_b_tax', filtable:true, style: "text-align:center;",align: 'right',width:80, 
		renderer: function(value,metaData,record,colIndex,store,view) {	
			if(value>0){
				return value.toFixed(3)+'%';
			} else {
				metaData.style='color:#8E8E8E';
			return 'N/A';
			}
		}
	},
	{text:'税后佣金',	 dataIndex:'commission_a_tax', filtable:true, style: "text-align:center;",align: 'right',width:80, 
		renderer: function(value,metaData,record,colIndex,store,view) {	
			if(value>0){
				return value.toFixed(3)+'%';
			} else {
				metaData.style='color:#8E8E8E';
			return 'N/A';
			}
		}
	},
	{text:'平台费用',	 dataIndex:'inner_commission', filtable:true, style: "text-align:center;",align: 'right',width:80, 
		renderer: function(value,metaData,record,colIndex,store,view) {	
			if(value>0){
				return value.toFixed(3)+'%';
			} else {
				metaData.style='color:#8E8E8E';
			return 'N/A';
			}
		}
	},
	{text:'费用',		 dataIndex:'outer_commission', filtable:true, style: "text-align:center;",align: 'right',width:80, 
		renderer: function(value,metaData,record,colIndex,store,view) {	
			if(value>0){
				return value.toFixed(3)+'%';
			} else {
				metaData.style='color:#8E8E8E';
			return 'N/A';
			}
		}
	},
	{text:'现结费用',	 dataIndex:'imm_payment', filtable:true, style:	"text-align:center;",align:	'right',width:80, 
		renderer: function(value,metaData,record,colIndex,store,view) {	
			if(value>0){
				return value.toFixed(3)+'%';
			} else {
				metaData.style='color:#8E8E8E';
			return 'N/A';
			}
		}
	},
	{text:'主销渠道',	 dataIndex:'main_channel', filtable:true, style: "text-align:center;",align: 'center',width:90},
	{text:'渠道公司',	 dataIndex:'channel_company', filtable:true, style:	"text-align:center;",align:	'center',width:90},
	{text:'渠道联系人', dataIndex:'channel_contact',	filtable:true, style: "text-align:center;",align: 'center',width:90},
	{text:'走帐公司',	 dataIndex:'billing_company', filtable:true, style:	"text-align:center;",align:	'center',width:90}
	]
});
var	RecentChangeGrid=Ext.create('Ext.grid.Panel',{
	store: fileListStore,
	border:1,
	title:'最新进展',
	emptyText:'暂无信息',
	minHeight:156,
	region:'south',
	flex:1,
	columns:[
	{
		xtype: 'actioncolumn',
		width:40,style:	"text-align:center;",align:	'center',
		sortable: false,
		items: [{
			icon: '/ts/misc/resources/icons/cross.gif',
			tooltip: '删除这条消息',
			handler: function(grid,	rowIndex, colIndex)	{
			}
		}]
	},{
		xtype: 'actioncolumn',
		width:40,style:	"text-align:center;",align:	'center',
		sortable: false,
		items: [{
			icon: '/ts/misc/resources/icons/download.gif',
			tooltip: '修改这条消息',
			handler: function(grid,	rowIndex, colIndex)	{
			}
		}]
	},
	{text:'时间',	dataIndex:'addtime', filtable:true,	style: "text-align:center;",align: 'left',width:100},
	{text:'修改信息', dataIndex:'messages',	filtable:true, style: "text-align:center;",align: 'right',width:680}
	]
});
var	sampleStoreFields=[
	{name:'proj_id'	,type:'integer'	},
	{name:'proj_detail_id' ,type:'integer' },
	{name:'total_share'	,type:'string' },
	{name:'status' ,type:'string' },
	{name:'exclusive' ,type:'string' },
	{name:'grade' ,type:'string' },
	{name:'category' ,type:'string'	},
	{name:'sub_category' ,type:'string'	},
	{name:'issue' ,type:'string' },
	{name:'name' ,type:'string'	},
	{name:'sub_name' ,type:'string'	},
	{name:'flow_of_fund' ,type:'string'	},
	{name:'highlights' ,type:'string' },
	{name:'month' ,type:'integer'},
	{name:'scale' ,type:'float'	},
	{name:'cycle' ,type:'string' },
	{name:'amount' ,type:'integer'},
	{name:'profit_property'	,type:'string' },
	{name:'profit' ,type:'float' },
	{name:'manager'	,type:'string' },
	{name:'contract' ,type:'string'	},
	{name:'remark' ,type:'string' },
	{name:'pay_account'	,type:'string' },
	{name:'countdown' ,type:'string' },
	{name:'commission_b_tax' ,type:'float' },
	{name:'commission_a_tax' ,type:'float' },
	{name:'inner_commission' ,type:'float' },
	{name:'outer_commission' ,type:'float' },
	{name:'imm_payment'	,type:'float' },
	{name:'found' ,type:'date' },
	{name:'main_channel' ,type:'string'	},
	{name:'channel_company'	,type:'string' },
	{name:'channel_contact'	,type:'string' },
	{name:'billing_company'	,type:'string' },
	{name:'manager_remark' ,type:'string' },
	{name:'create_ts' ,type:'date',dateFormat:"Y-m-d H:i:s"	}
]
var	projAllStore=Ext.create('Ext.data.JsonStore', {
 fields: sampleStoreFields,
 proxy:	{
	type: 'ajax',
	url: '/ts/index.php/proj/view',
	reader:	{
	 type: 'json',
	 root: 'data'
	}
 }
 });
var	sampleStoreC1=Ext.create('Ext.data.JsonStore', {
 fields: sampleStoreFields,
 proxy:	{
	type: 'ajax',
	url: '/ts/index.php/proj/view?c=1',
	reader:	{
	 type: 'json',
	 root: 'data'
	}
 }
 });

var	sampleStoreC2=Ext.create('Ext.data.JsonStore', {
 fields: sampleStoreFields,
 proxy:	{
	type: 'ajax',
	url: '/ts/index.php/proj/view?c=2',
	reader:	{
	 type: 'json',
	 root: 'data'
	}
 }
 });
var	sampleChanges=Ext.create('Ext.data.ArrayStore',	{
 fields:[
		{name:'operate_ts',type:'date',dateFormat:"Y-m-d H:i:s"},
		{name:'realname',type:'string'},
		{name:'operation',type:'string'}
 ],
 proxy:	{
		type: 'ajax',
		url:'/ts/index.php/proj/operation_history',
		reader:	{
		 type: 'json',
		 root: 'data'
		}
 }
});

var	filtersCfg = {
	ftype: 'filters',
	 autoReload: true, //don't reload automatically
	local: true, //only	filter locally
	// filters may be configured through the plugin,
	// or in the column	definition within the headers configuration
	filters: [
		{type:'list' ,dataIndex:'total_share' ,store: chTotalShareList},
		{type:'list' ,dataIndex:'status' ,store: chStatusList},
		{type:'list' ,dataIndex:'exclusive'	,store:	chExclusiveList},
		{type:'list' ,dataIndex:'grade'	,store:	chGradeList},
		{type:'list' ,dataIndex:'category' ,store: chCategoryList},
		{type:'string' ,dataIndex:'sub_category' },
		{type:'string' ,dataIndex:'issue' },
		{type:'string' ,dataIndex:'name' },
		{type:'string' ,dataIndex:'sub_name' },
		{type:'string' ,dataIndex:'flow_of_fund' },
		{type:'string' ,dataIndex:'highlights' },
		{type:'numeric',dataIndex:'month' },
		{type:'numeric',dataIndex:'scale' },
		{type:'string' ,dataIndex:'cycle' },
		{type:'numeric',dataIndex:'amount' },
		{type:'list' ,dataIndex:'profit_property' ,store: chProfitPropertyList},
		{type:'numeric',dataIndex:'profit' },
		{type:'list' ,dataIndex:'manager' ,store: chManagerList},
		{type:'string' ,dataIndex:'remark' },
		{type:'string' ,dataIndex:'pay_account'	},
		{type:'string' ,dataIndex:'countdown' },
		{type:'numeric',dataIndex:'commission_b_tax' },
		{type:'numeric',dataIndex:'commission_a_tax' },
		{type:'numeric',dataIndex:'inner_commission' },
		{type:'numeric',dataIndex:'outer_commission' },
		{type:'numeric',dataIndex:'imm_payment'	},
		{type:'date' ,dataIndex:'found'	},
		{type:'string' ,dataIndex:'main_channel' },
		{type:'string' ,dataIndex:'channel_company'	},
		{type:'string' ,dataIndex:'channel_contact'	},
		{type:'string' ,dataIndex:'billing_company'	},
		{type:'string' ,dataIndex:'manager_remark' },
		{type:'date' ,dataIndex:'create_ts'	}
	]
};

var	AmountDetailsGrid=Ext.create('Ext.grid.Panel',{
	store: projAllStore,
	border:1,
	title:'额度信息',
	region:'center',
	minHeight:156,
	flex:1,
	emptyText:'暂无额度信息',
	columns:[
	{text:'子名称',		 dataIndex:'sub_name', filtable:true, style: "text-align:center;",align: 'center',width:80},
	{text:'项目期限',	 dataIndex:'month',	filtable:true, style: "text-align:center;",align: 'center',width:80,renderer:function(value,metaData,record,colIndex,store,view) {return value+'个月';}},
	{text:'认购金额',	 dataIndex:'amount', filtable:true,	style: "text-align:center;",align: 'center',width:80,renderer:function(value,metaData,record,colIndex,store,view) {return value+'万';}},
	{text:'项目收益',	 dataIndex:'profit', filtable:true,	style: "text-align:center;",align: 'center',width:80,renderer:function(value,metaData,record,colIndex,store,view) {return value.toFixed(3)+'%';}},
	{text:'销售状态',	 dataIndex:'status', filtable:true,	style: "text-align:center;",align: 'center',width:80,
		renderer:function(value,metaData){
			if(value=="在售"){
				metaData.style='background:#CCFFCC;color:#000000'
			} else if(value=="结束"){
				metaData.style='background:#DFDFDF;color:#606060;'
			} else {
				metaData.style='background:#FFFF99;color:#000000'
			}
			return value;
		}
	},
	{text:'份额',		 dataIndex:'total_share', filtable:true, style:	"text-align:center;",align:	'center',width:60,
		renderer:function(value,metaData){
			if(value=="OPEN"){
				metaData.style='background:#CCFFCC;color:#000000'
			} else if(value=="无"){
				metaData.style='background:#DFDFDF;color:#606060;'
			} else {
				metaData.style='background:#FFFF99;color:#000000'
			}
			return value;
		}
	},
	{text:'成立日期',	 dataIndex:'found',	filtable:true, style: "text-align:center;",align: 'center',width:88,renderer:new Ext.util.Format.dateRenderer("Y-m-d")},
	{text:'税前佣金',	 dataIndex:'commission_b_tax', filtable:true, style: "text-align:center;",align: 'right',width:80,		 
		renderer: function(value,metaData,record,colIndex,store,view) {	 
			if(value>0){
				return value.toFixed(3)+'%';
			} else {
				metaData.style='color:#8E8E8E';
			return 'N/A';
			}
		}
	},
	{text:'税后佣金',	 dataIndex:'commission_a_tax', filtable:true, style: "text-align:center;",align: 'right',width:80,		 
		renderer: function(value,metaData,record,colIndex,store,view) {	 
			if(value>0){
				return value.toFixed(3)+'%';
			} else {
				metaData.style='color:#8E8E8E';
			return 'N/A';
			}
		}
	},
	{text:'平台费用',	 dataIndex:'inner_commission', filtable:true, style: "text-align:center;",align: 'right',width:80,		 
		renderer: function(value,metaData,record,colIndex,store,view) {	 
			if(value>0){
				return value.toFixed(3)+'%';
			} else {
				metaData.style='color:#8E8E8E';
			return 'N/A';
			}
		}
	},
	{text:'费用',		 dataIndex:'outer_commission', filtable:true, style: "text-align:center;",align: 'right',width:80,		 
		renderer: function(value,metaData,record,colIndex,store,view) {	 
			if(value>0){
				return value.toFixed(3)+'%';
			} else {
				metaData.style='color:#8E8E8E';
			return 'N/A';
			}
		}
	},
	{text:'现结费用',	 dataIndex:'imm_payment', filtable:true, style:	"text-align:center;",align:	'right',width:80,		
		renderer: function(value,metaData,record,colIndex,store,view) {	 
			if(value>0){
				return value.toFixed(3)+'%';
			} else {
				metaData.style='color:#8E8E8E';
			return 'N/A';
			}
		}
	},
	{text:'主销渠道',	 dataIndex:'main_channel', filtable:true, style: "text-align:center;",align: 'center',width:90},
	{text:'渠道公司',	 dataIndex:'channel_company', filtable:true, style:	"text-align:center;",align:	'center',width:90},
	{text:'渠道联系人',	dataIndex:'channel_contact', filtable:true,	style: "text-align:center;",align: 'center',width:90},
	{text:'走帐公司',	 dataIndex:'billing_company', filtable:true, style:	"text-align:center;",align:	'center',width:90}
	]
});

var	FileListGrid=Ext.create('Ext.grid.Panel',{
	store: fileListStore,
	border:1,
	title:'文件列表',
	emptyText:'暂无文件信息',
	minHeight:156,
	region:'south',
	flex:1,
	columns:[
	{
		xtype: 'actioncolumn',
		width:40,style:	"text-align:center;",align:	'center',
		sortable: false,
		items: [{
			icon: '/ts/misc/resources/icons/cross.gif',
			tooltip: '删除该文件',
			handler: function(grid,	rowIndex, colIndex)	{
				AmountEditForm.getForm().loadRecord(grid.getStore().getAt(rowIndex));
				AmountEditForm.getForm().submit({
						url: '/ts/index.php/proj/file_delete_submit',
						submitEmptyText: false,
						waitMsg: 'Saving Data...',
						success: function(form,	action)	{
							fileListStore.removeAt(rowIndex);
						} ,
						failure: function(form,	action)	{
							Ext.Msg.alert('错误！', '保存失败。如有问题请联系管理员。');
						}
				});
			}
		}]
	},{
		xtype: 'actioncolumn',
		width:40,style:	"text-align:center;",align:	'center',
		sortable: false,
		items: [{
			icon: '/ts/misc/resources/icons/download.gif',
			tooltip: '下载该文件',
			handler: function(grid,	rowIndex, colIndex)	{
				var	filename=grid.getStore().getAt(rowIndex).get("filename");
				window.open('/ts/index.php/upload/get?file='+filename);
			}
		}]
	},
	{text:'文件名',		 dataIndex:'filename',		filtable:true, style: "text-align:center;",align: 'left',width:300},
	{text:'文件大小',		dataIndex:'filesize',	   filtable:true, style: "text-align:center;",align: 'right',width:80,
		 renderer:function(value,metaData,record,colIndex,store,view) {
			 if(value>=1048676)	{var v=value/1048576;return	v.toFixed(2)+'MB';}
			 else if(value>=1024) {var v=value/1024;return v.toFixed(2)+'KB';}
			 else return value;
		 }
	},
	{text:'文件上传日期',	  dataIndex:'create_ts',	  filtable:true, width:120,renderer:new	Ext.util.Format.dateRenderer("Y-m-d")}
	]
});
var	RecentChangeGrid=Ext.create('Ext.grid.Panel',{
	store: fileListStore,
	border:1,
	title:'最新进展',
	emptyText:'暂无信息',
	minHeight:156,
	region:'north',
	flex:1,
	columns:[
	{
		xtype: 'actioncolumn',
		width:40,style:	"text-align:center;",align:	'center',
		sortable: false,
		items: [{
			icon: '/ts/misc/resources/icons/cross.gif',
			tooltip: '删除这条消息',
			handler: function(grid,	rowIndex, colIndex)	{
			}
		}]
	},{
		xtype: 'actioncolumn',
		width:40,style:	"text-align:center;",align:	'center',
		sortable: false,
		items: [{
			icon: '/ts/misc/resources/icons/download.gif',
			tooltip: '修改这条消息',
			handler: function(grid,	rowIndex, colIndex)	{
			}
		}]
	},
	{text:'时间',			dataIndex:'addtime',	  filtable:true, style:	"text-align:center;",align:	'left',width:100},
	{text:'修改信息',		dataIndex:'messages',	   filtable:true, style: "text-align:center;",align: 'right',width:580}
	]
});

var recommendStore=Ext.create('Ext.data.ArrayStore', {
	fields: ['proj_id'],
	data: [
	  ['498'],
	  ['498']
	]
});
var gradeFn=function(value) { 
	var res;
	if(value=="五星级"){
		res= '★★★★★'
	} else if (value=="四星级"){
		res= '★★★★'
	} else if (value=="三星级"){
		res= '★★★'
	} else if (value=="二星级"){
		res= '★★'
	} else if (value=="一星级"){
		res= '★'
	}
	return res;
};
var toolTipFn=function(value,metaData) { 
	metaData.tdAttr = 'data-qtip="'+value+'"'; 
	return value;
}
var commissionFn=function(value,metaData) { 
	if(value>0){
		return value+'%';
	} else {
		metaData.style='color:#8E8E8E';
		return 'N/A';
	}
}
var generatePanelFn=function(e){
	e.down('panel#projDetailPanel').add(AmountDetailsGrid).show();
	e.down('panel#projDetailPanel').add(RecentChangeGrid).show();
	e.down('panel#projDetailPanel').add(FileListGrid).show();
	e.
	var	foundRecords = projAllStore.query('proj_id',e.proj_id);
	if(foundRecords.getCount()>0){
		var	detailString;
		foundRecords.each(function(record){
			detailString+='<pre>'+record.get("sub_name")+record.get("month")+"个月, "+(record.get("amount")<10000?(record.get("amount")+"万"):(record.get("amount")/10000+"亿"))+':	'+record.get("profit")+'%</pre>';
		});
		e.proj_info_tpl = Ext.create('Ext.XTemplate',[
		'<table	style="border-collapse:collapse;">{pdt_status:this.cusPdtStatus()}<tr><td style="padding:20px;border:1px;"><table style="border-collapse:collapse;">',
		'<tr><td class="r_ex_td_pre"><b>分类</b></td><td class="r_ex_td_main"><pre>{category}: {sub_category}, {exclusive}</pre></td></tr>',
		'<tr><td class="r_ex_td_pre"><b>项目名称</b></td><td class="r_ex_td_main"><pre>{name}</pre></td></tr>',
		'<tr><td class="r_ex_td_pre"><b>基本情况</b></td><td class="r_ex_td_main"><b>{profit_property}收益</b>项目，由<b>{issue}</b>发行，融资规模<b>{scale:this.cusNum()}</b>，按<b>{cycle}</b>分配</td></tr>',
		'<tr><td class="r_ex_td_pre"><b>项目评级</b></td><td class="r_ex_td_main">{grade:this.cusGrade()}</td></tr>',
		'<tr><td class="r_ex_td_pre"><b>预期收益</b></td><td class="r_ex_td_main">',
		detailString, '</td></tr>',
		'<tr><td class="r_ex_td_pre"><b>资金投向</b></td><td class="r_ex_td_main"><pre>{flow_of_fund}</pre></td></tr>',
		'<tr><td class="r_ex_td_pre"><b>项目亮点</b></td><td class="r_ex_td_main"><pre>{highlights}</pre></td></tr>',
		'<tr><td class="r_ex_td_pre"><b>合同情况</b></td><td class="r_ex_td_main"><pre>{contract}</pre></td></tr>',
		'<tr><td class="r_ex_td_pre"><b>项目进度</b></td><td class="r_ex_td_main"><pre>{countdown}</pre></td></tr>',
		'<tr><td class="r_ex_td_pre"><b>打款账号</b></td><td class="r_ex_td_main"><pre>{pay_account}</pre></td></tr>',
		'<tr><td class="r_ex_td_pre"><b>备注</b></td><td class="r_ex_td_main"><pre>{remark}</pre></td></tr>',
		'<tr><td class="r_ex_td_pre"><b>项目经理备注</b></td><td class="r_ex_td_main"><pre>{manager_remark}</pre></td></tr>',
		'</table></td></tr></table>',
		{
			cusDate:function(d){return Ext.Date.format(d,'Y年m月d日');}
		},{
			cusPdtStatus:function(d){
				if(d!="上线通过"){
					return '<tr><td	style="padding:20px;border:1px;"><span style="background-color:#003366;color:#FFFFFF;font-size:20px;font_weight:bold;">请注意该项目尚未上线！</span></td></tr>';
				} else {
					return '';
				}
			}
		},{
			cusNum:function(n){return (n<1)?(n*10000+"万"):(n+"亿")}
		},{
			cusGrade:gradeFn
		}]);
	};
	e.proj_info_tpl.overwrite(e.down('panel#projInfoPanel').body,foundRecords.getAt(0).data);
	fileListStore.setProxy({
		type: 'ajax',
		url: '/ts/index.php/upload/get_list?proj_id='+e.proj_id,
		reader:	{
			type: 'json',
			root: 'data'
		}
	});
	fileListStore.load();
	projAllStore.clearFilter(true);
	projAllStore.filter([{
		filterFn:function(item)	{
			return item.get("proj_id") = e.proj_id; 
		}
	}]);
}
