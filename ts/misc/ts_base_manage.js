Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', '/ts/misc/ux');

Ext.require([
 'Ext.grid.*',
 'Ext.data.*',
 'Ext.util.*',
 'Ext.state.*',
 'Ext.ux.grid.FiltersFeature',
]);
var gradeFn=function(value) { 
	var res;
	if(value=="五星级"){
		res= '<span style="color:#003366">★★★★★</span>'
	} else if (value=="四星级"){
		res= '<span style="color:#003366">★★★★</span>'
	} else if (value=="三星级"){
		res= '<span style="color:#003366">★★★</span>'
	} else if (value=="二星级"){
		res= '<span style="color:#003366">★★</span>'
	} else if (value=="一星级"){
		res= '<span style="color:#003366">★</span>'
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
var chFixedList=[
		['集合信托：上市公司股票质押类','集合信托：上市公司股票质押类'],
		['集合信托：政府基建类','集合信托：政府基建类'],
		['集合信托：房地产类','集合信托：房地产类'],
		['集合信托：其他类','集合信托：其他类'],
		['私募基金','私募基金'],
		['P2P理财','P2P理财'],
		['其他','其他']
	];
var chFloatingList=[
		['债券基金','债券基金'],
		['证券基金','证券基金'],
		['股权基金','股权基金'],
		['其他','其他']
	];

var chSubCategoryList = Ext.create('Ext.data.Store', {
	fields: ['value', 'text'],
	data:[],
	autoLoad : true
});

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
var projDetailStore=Ext.create('Ext.data.JsonStore', {
	fields: [
	{name:'proj_id',type:'integer'},
	{name:'proj_detail_id',type:'integer'},
	{name:'sub_name',type:'string'},
	{name:'month',type:'integer'},
	{name:'total_share',type:'string'},
	{name:'status',type:'string'},
	{name:'amount',type:'integer'},
	{name:'profit',type:'float'},
	{name:'commission_b_tax',type:'float'},
	{name:'commission_a_tax',type:'float'},
	{name:'inner_commission',type:'float'},
	{name:'outer_commission',type:'float'},
	{name:'imm_payment',type:'float'},
	{name:'found',type:'date'},
	{name:'main_channel',type:'string'},
	{name:'channel_company',type:'string'},
	{name:'channel_contact',type:'string'},
	{name:'billing_company',type:'string'}
	],
	proxy: {
		type: 'ajax',
		url: '/ts/index.php/proj/detail_view?proj_id=',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});
var projStore=Ext.create('Ext.data.JsonStore', {
	fields: [
	{name:'proj_id',type:'integer'},
	{name:'category',type:'string'},
	{name:'sub_category',type:'string'},
	{name:'exclusive',type:'string'},
	{name:'issue',type:'string'},
	{name:'name',type:'string'},
	{name:'flow_of_fund',type:'string'},
	{name:'highlights',type:'string'},
	{name:'scale',type:'float'},
	{name:'cycle',type:'string'},
	{name:'profit_property',type:'string'},
	{name:'manager',type:'string'},
	{name:'contract',type:'string'},
	{name:'remark',type:'string'},
	{name:'pay_account',type:'string'},
	{name:'countdown',type:'string'},
	{name:'exclusive',type:'string'},
	{name:'grade',type:'string'},
	{name:'manager_remark',type:'string'},
	{name:'create_ts',type:'date',dateFormat:"Y-m-d H:i:s"},
	{name:'pdt_status',type:'string'}
	],
	proxy: {
		type: 'ajax',
		url: '/ts/index.php/proj/proj_get?proj_id=',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});
var	projAllStore=Ext.create('Ext.data.JsonStore', {
 fields: [
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
	{name:'create_ts' ,type:'date',dateFormat:"Y-m-d H:i:s"	},
	{name:'pdt_status',type:'string'}
],
 proxy:	{
	type: 'ajax',
	url: '/ts/index.php/proj/view',
	reader:	{
	 type: 'json',
	 root: 'data'
	}
 }
 });
var recentChangeStore=Ext.create('Ext.data.JsonStore', {
	fields: [
	{name:'message_id',type:'integer'},
	{name:'proj_id',type:'integer'},
	{name:'msg_date',type:'date'},
	{name:'msg_cat',type:'string'},
	{name:'message',type:'string'},
	{name:'last_update',type:'date'},
	{name:'updater',type:'string'}
	],
	proxy: {
		type: 'ajax',
		url: '/ts/index.php/proj/detail_view?proj_id=',
		reader: {
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

var AmountDetailsGrid=Ext.create('Ext.grid.Panel',{
	store: projDetailStore,
	border:1,
	title:'额度信息',
	region:'south',
	minHeight:156,
	flex:1,
	emptyText:'暂无额度信息',
	columns:[{
		xtype: 'actioncolumn',
		//text:'删除',
		width:40,
		style: "text-align:center;",
		align: 'center',
		sortable: false,
		items: [{
			icon: '/ts/misc/resources/icons/cross.gif',
			tooltip: '删除此条记录',
			handler: function(grid, rowIndex, colIndex) {
				var amount=grid.getStore().getAt(rowIndex).get("amount");
				var profit=grid.getStore().getAt(rowIndex).get("profit");
				var sub_name=grid.getStore().getAt(rowIndex).get("sub_name");
				var month=grid.getStore().getAt(rowIndex).get("month");
				Ext.Msg.show({
					title:'删除额度记录',
					msg: '您是否确认要删除'+sub_name+month+'个月，认购金额为 '+amount+' 万, 收益为 '+profit+' 的条目吗？',
					buttons: Ext.Msg.OKCANCEL,
					icon: Ext.Msg.QUESTION,
					fn:function(buttonId){
						if(buttonId=='ok'){
							AmountEditForm=AmountEditWin.down('form').getForm();
							AmountEditForm.loadRecord(grid.getStore().getAt(rowIndex));
							AmountEditForm.submit({
								url: '/ts/index.php/proj/detail_delete_submit',
								submitEmptyText: false,
								waitMsg: 'Saving Data...',
								success: function(form, action) {
									projDetailStore.removeAt(rowIndex);
								} ,
								failure: function(form, action) {
									Ext.Msg.alert('错误！', '保存失败。如有问题请联系管理员。');
								}
							});
						}
					}
				});
			}
		}]
	}, {
		xtype: 'actioncolumn',
		width:40,style: "text-align:center;",align: 'center',
		sortable: false,
		items: [{
			icon: '/ts/misc/resources/icons/cog_edit.png',
			tooltip: '编辑此条记录',
			handler: function(grid, rowIndex, colIndex) {
				//sampleStore.removeAt(rowIndex);
				AmountEditWin.down('form').getForm().loadRecord(grid.getStore().getAt(rowIndex));
				Ext.getBody().mask();
				AmountEditWin.show();
			}
		}]
	},
	{text:'子名称',		 dataIndex:'sub_name', filtable:true, style: "text-align:center;",align: 'center',width:80},
	{text:'项目期限',	 dataIndex:'month', filtable:true, style: "text-align:center;",align: 'center',width:80,renderer:function(value,metaData,record,colIndex,store,view) {return value+'个月';}},
	{text:'认购金额',	 dataIndex:'amount', filtable:true, style: "text-align:center;",align: 'center',width:80,renderer:function(value,metaData,record,colIndex,store,view) {return value+'万';}},
	{text:'项目收益',	 dataIndex:'profit', filtable:true, style: "text-align:center;",align: 'center',width:80,renderer:function(value,metaData,record,colIndex,store,view) {return value.toFixed(3)+'%';}},
	{text:'销售状态',	 dataIndex:'status', filtable:true, style: "text-align:center;",align: 'center',width:80,
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
	{text:'份额',		 dataIndex:'total_share', filtable:true, style: "text-align:center;",align: 'center',width:60,
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
	{text:'成立日期',	 dataIndex:'found', filtable:true, style: "text-align:center;",align: 'center',width:88,renderer:new Ext.util.Format.dateRenderer("Y-m-d")},
	{text:'税前佣金',	 dataIndex:'commission_b_tax', filtable:true, style: "text-align:center;",align: 'right',width:80,       
		renderer: commissionFn
	},
	{text:'税后佣金',	 dataIndex:'commission_a_tax', filtable:true, style: "text-align:center;",align: 'right',width:80,       
		renderer: commissionFn
	},
	{text:'平台费用',	 dataIndex:'inner_commission', filtable:true, style: "text-align:center;",align: 'right',width:80,       
		renderer: commissionFn
	},
	{text:'费用',		 dataIndex:'outer_commission', filtable:true, style: "text-align:center;",align: 'right',width:80,       
		renderer: commissionFn
	},
	{text:'现结费用',	 dataIndex:'imm_payment', filtable:true, style: "text-align:center;",align: 'right',width:80,       
		renderer: commissionFn
	},
	{text:'主销渠道',	 dataIndex:'main_channel', filtable:true, style: "text-align:center;",align: 'center',width:90},
	{text:'渠道公司',	 dataIndex:'channel_company', filtable:true, style: "text-align:center;",align: 'center',width:90},
	{text:'渠道联系人',  dataIndex:'channel_contact', filtable:true, style: "text-align:center;",align: 'center',width:90},
	{text:'走帐公司',	 dataIndex:'billing_company', filtable:true, style: "text-align:center;",align: 'center',width:90}
	]
});

var FileListGrid=Ext.create('Ext.grid.Panel',{
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
		width:40,style: "text-align:center;",align: 'center',
		sortable: false,
		items: [{
			icon: '/ts/misc/resources/icons/cross.gif',
			tooltip: '删除该文件',
			handler: function(grid, rowIndex, colIndex) {
				var filename=grid.getStore().getAt(rowIndex).get("filename");
				Ext.Msg.show({
					title:'删除文件',
					msg: '您是否确认要删除文件 '+filename+' ？',
					buttons: Ext.Msg.OKCANCEL,
					icon: Ext.Msg.QUESTION,
					fn:function(buttonId){
						if(buttonId=='ok'){
							Ext.Ajax.request({
								url: '/ts/index.php/upload/delete?file='+filename,
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
		sortable: false,
		items: [{
			icon: '/ts/misc/resources/icons/download.gif',
			tooltip: '下载该文件',
			handler: function(grid, rowIndex, colIndex) {
				var filename=grid.getStore().getAt(rowIndex).get("filename");
				window.open('/ts/index.php/upload/get?file='+filename);
			}
		}]
	},
	{text:'文件名',         dataIndex:'filename',      filtable:true, style: "text-align:center;",align: 'left',width:580},
	{text:'文件大小',       dataIndex:'filesize',      filtable:true, style: "text-align:center;",align: 'right',width:80,
		 renderer:function(value,metaData,record,colIndex,store,view) {
			 if(value>=1048676) {var v=value/1048576;return v.toFixed(2)+'MB';}
			 else if(value>=1024) {var v=value/1024;return v.toFixed(2)+'KB';}
			 else return value;
		 }
	},
	{text:'文件上传日期',   dataIndex:'create_ts',      filtable:true, width:120,renderer:new Ext.util.Format.dateRenderer("Y-m-d")}
	]
});
var RecentChangeGrid=Ext.create('Ext.grid.Panel',{
	store: recentChangeStore,
	border:1,
	title:'最新进展',
	emptyText:'暂无信息',
	minHeight:156,
	region:'south',
	flex:1,
	defaults:{
		filtable:true, style: "text-align:center;", align: 'left'
	},
	columns:[
	{
		xtype: 'actioncolumn',
		width:40,style: "text-align:center;",align: 'center',
		sortable: false,
		items: [{
			icon: '/ts/misc/resources/icons/cross.gif',
			tooltip: '删除这条消息',
			handler: function(grid, rowIndex, colIndex) {
				var message=grid.getStore().getAt(rowIndex).get("message");
				Ext.Msg.show({
					title:'删除文件',
					msg: '您是否确认要删除此消息: '+message,
					buttons: Ext.Msg.OKCANCEL,
					icon: Ext.Msg.QUESTION,
					fn:function(buttonId){
						if(buttonId=='ok'){
							messageForm=messageWin.down('form').getForm();
							messageForm.loadRecord(grid.getStore().getAt(rowIndex));
							messageForm.submit({
								url: '/ts/index.php/proj/message_delete_submit',
								submitEmptyText: false,
								waitMsg: 'Saving Data...',
								success: function(form, action) {
									recentChangeStore.removeAt(rowIndex);
								},
								failure: function(form, action) {
									Ext.Msg.alert('错误！', '保存失败。如有问题请联系管理员。');
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
		sortable: false,
		items: [{
			icon: '/ts/misc/resources/icons/download.gif',
			tooltip: '修改这条消息',
			handler: function(grid, rowIndex, colIndex) {
				//sampleStore.removeAt(rowIndex);
				messageWin.down('form').getForm().loadRecord(grid.getStore().getAt(rowIndex));
				Ext.getBody().mask();
				messageWin.show();
			}
		}]
	},{
		xtype: 'actioncolumn',
		width:40,style: "text-align:center;",align: 'center',
		sortable: false,
		items: [{
			icon: '/ts/misc/resources/icons/download.gif',
			tooltip: '短信推送！',
			handler: function(grid, rowIndex, colIndex) {
				var message=grid.getStore().getAt(rowIndex).get("message");
				Ext.Msg.show({
					title:'推送消息',
					msg: '请确认将短信推送此消息: '+message,
					buttons: Ext.Msg.OKCANCEL,
					icon: Ext.Msg.QUESTION,
					fn:function(buttonId){
						if(buttonId=='ok'){
							messageForm=messageWin.down('form').getForm();
							messageForm.loadRecord(grid.getStore().getAt(rowIndex));
							messageForm.submit({
								url: '/ts/index.php/proj/message_push_submit',
								submitEmptyText: false,
								waitMsg: 'Saving Data...',
								success: function(form, action) {
									Ext.Msg.alert('消息', '消息推送成功！');
								} ,
								failure: function(form, action) {
									Ext.Msg.alert('错误', '推送失败。如有问题请联系管理员。');
								}
							});
						}
					}
				});
			}
		}]
	},
	{text:'时间',         dataIndex:'msg_time',    width:100},
	{text:'修改信息',     dataIndex:'message',    width:780}
	]
});

var recommendStore=Ext.create('Ext.data.ArrayStore', {
	fields: ['proj_id'],
	data: [
	  ['498'],
	  ['499']
	]
});
var generatePanelFn=function(e){
	e.down('panel#projDetailPanel').add(RecentChangeGrid).show();
	e.down('panel#projDetailPanel').add(AmountDetailsGrid).show();
	e.down('panel#projDetailPanel').add(FileListGrid).show();
	var	foundRecords = projAllStore.query('proj_id',e.proj_id);
	if(foundRecords.getCount()>0){
		var	detailString;
		foundRecords.each(function(record){
			detailString+='<pre>'+record.get("sub_name")+record.get("month")+"个月, "+(record.get("amount")<10000?(record.get("amount")+"万"):(record.get("amount")/10000+"亿"))+':	'+record.get("profit")+'%</pre>';
		});
		e.proj_info_tpl = Ext.create('Ext.XTemplate',[
		'<table	style="border-collapse:collapse;"><tr><td style="padding:15px;border:1px;"><table style="border-collapse:collapse;">',
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
			cusDate:function(d){
				return Ext.Date.format(d,'Y年m月d日');
			}
		},{
			cusNum:function(n){
				return (n<1)?(n*10000+"万"):(n+"亿")
			}
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
			return item.get("proj_id") == e.proj_id; 
		}
	}]);
}
var AmountEditWin=Ext.create('Ext.window.Window',{
	resizeable:false,
	closeAction:"hide",
	closable:false,
	title:'额度信息编辑',
	titleAlign:'center',
	width:1006,
	items:[
	{
		xtype:"form",
		width:990,
		margin:'0 0 0 2',
		bodyPadding:5,
		autoScroll :true,
		//hidden:true,
		//collapsible:true,
		//collapseDirection : 'left',
		//collapsed : true,
		//title:'额度信息编辑',
		trackResetOnLoad:true,
		border:0,
		waitTitle:"Pleas wait...",
		layout:{
			type:'hbox',
			align: 'stretch',
			defaultMargins: {top: 0, right: 5, bottom: 0, left: 5}
		},
		fieldDefaults:{
			lableWidth:90,
			width:240,
			allowBlank: false,
			labelAlign:'right'
		},
		dockedItems: [{
			dock: 'bottom',
			xtype: 'toolbar',
			scale:'medium',
			bodyPadding: 5,
			items: [{xtype:'box',flex:1},{
				icon:'/ts/misc/resources/icons/accept.gif',
				text: '确认',
				scale:'medium',
				formBind: true, //only enabled once the form is valid
				disabled: true,
				handler: function() {
					this.up('form').getForm().submit({
						url: '/ts/index.php/proj/detail_create_submit',
						submitEmptyText: false,
						waitMsg: 'Saving Data...',
						success: function(form, action) {
							AmountEditWin.hide();
							projDetailStore.load();
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
				scale:'medium',
				handler: function(){
					this.up('form').getForm().reset();
					this.up('window').hide();
				}
			},{xtype:'box',flex:1}]
		}],
		items:[
		{
			xtype:'fieldset',
			title: '====<b>基本信息</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[{
				xtype:'textfield',
				fieldLabel: '子名称',
				name:'sub_name',
				width:320,
				allowBlank: true
			},{
				xtype:'numberfield',
				fieldLabel: '项目期限(月)*',
				name:'month'
			},{
				xtype:'numberfield',
				fieldLabel: '认购金额(万)*',
				name:'amount'
			},{
				xtype:'numberfield',
				fieldLabel: '项目收益(%)*',
				name:'profit'
			},{
				xtype:'combo',
				fieldLabel: '销售状态*',
				name:'status',
				queryMode : 'local',
				store : chStatusList,
				valueField: 'id',
				displayField: 'text',
				forceSelection:true
			}, {
				xtype:'combo',
				fieldLabel: '份额*',
				name:'total_share',
				queryMode : 'local',
				store : chTotalShareList,
				valueField: 'id',
				displayField: 'text',
				forceSelection:true
			}, {
				xtype:'datefield',
				fieldLabel: '成立日期',
				name:'found',
				width:300,
				forceSelection:true,
				allowBlank: true
			}]
		},{
			xtype:'fieldset',
			title: '====<b>佣金信息</b>====',
			border:0,
			layout: {
				type: 'vbox',
				defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
			},
			items:[{
				xtype:'numberfield',
				fieldLabel: '税前佣金(%)*',
				name:'commission_b_tax',
				decimalPrecision:3
			},{
				xtype:'numberfield',
				fieldLabel: '税后佣金(%)*',
				name:'commission_a_tax',
				decimalPrecision:3
			},{
				xtype:'numberfield',
				fieldLabel: '平台费用(%)*',
				name:'inner_commission',
				decimalPrecision:3
			},{
				xtype:'numberfield',
				fieldLabel: '费用(%)*',
				name:'outer_commission',
				decimalPrecision:3
			},{
				xtype:'numberfield',
				fieldLabel: '现结费用(%)*',
				name:'imm_payment',
				decimalPrecision:3
			},{
				xtype:'hiddenfield',
				fieldLabel: 'proj_id',
				name:'proj_id'
			},{
				xtype:'hiddenfield',
				fieldLabel: 'proj_detail_id',
				name:'proj_detail_id'
			}]
		},{
			xtype:'fieldset',
			title: '====<b>渠道信息</b>====',
			border:0,  
			layout: {
				type: 'vbox',
				defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
			},
			items:[{
				xtype:'textfield',
				fieldLabel: '主销渠道',
				width:320,
				name:'main_channel',
				allowBlank: true
			},{
				xtype:'textfield',
				fieldLabel: '渠道公司',
				width:320,
				name:'channel_company',
				allowBlank: true
			},{
				xtype:'textfield',
				fieldLabel: '渠道联系人',
				width:320,
				name:'channel_contact',
				allowBlank: true
			},{
				xtype:'textfield',
				fieldLabel: '走帐公司',
				width:320,
				name:'billing_company',
				allowBlank: true
			}]
		}]
	}]
});

var uploadWin=Ext.create("Ext.window.Window",{
	title: '上传项目文件',
	width: 550,
	resizeable:false,
	closeAction:"hide",
	closable:true,
	bodyPadding: 10,
	items:[
	{
		xtype:"form",
		bodyPadding:5,
		trackResetOnLoad:true,
		border:0,
		waitTitle:"Pleas wait...",
		layout:'fit',
		items: [{
			xtype:'hiddenfield',
			name:'proj_id',
			allowBlank:false
		}, {
			xtype: 'filefield',
			name: 'file',
			fieldLabel: '文件',
			labelWidth: 50,
			width:500,
			msgTarget: 'side',
			allowBlank: false,
			anchor: '100%',
			buttonText: '选择文件...'
		}],

		bbar: {
			items:['->',{
				text: '上传',
				scale:'medium',
				handler: function() {
					var fform = this.up('form').getForm();
					if(fform.isValid())
					{
						fform.submit({
							url: '/ts/index.php/upload/submit',
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
		}
	}]
});

var messageWin=Ext.create("Ext.window.Window",{
	title: '项目消息',
	width: 550,
	resizeable:false,
	closeAction:"hide",
	closable:true,
	dockedItems: [{
		dock: 'bottom',
		xtype: 'toolbar',
		scale:'medium',
		bodyPadding: 5,
		items: [{xtype:'box',flex:1},{
			icon:'/ts/misc/resources/icons/accept.gif',
			text: '确认',
			scale:'medium',
			formBind: true, //only enabled once the form is valid
			handler: function() {
				this.up('window').down('form').getForm().submit({
					url: '/ts/index.php/proj/message_submit',
					submitEmptyText: false,
					waitMsg: 'Saving Data...',
					success: function(form, action) {
						messageWin.hide();
						recentChangeStore.load();
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
			scale:'medium',
			handler: function(){
				this.up('window').hide();
			}
		},{xtype:'box',flex:1}]
	}],
	items:[
	{
		xtype:"form",
		bodyPadding:5,
		trackResetOnLoad:true,
		border:0,
		waitTitle:"Pleas wait...",
		layout:{
			type: 'vbox',
			defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
		},
		items: [{
			xtype:'hiddenfield',
			name:'proj_id',
			allowBlank:false
		}, {
			xtype:'hiddenfield',
			name:'message_id',
			allowBlank:false
		}, {
			xtype:'fieldcontainer',
			fieldLabel: '信息分类',
			defaultType: 'radiofield',
			labelAlign:'right',
			defaults: {
				flex: 1
			},
			items:[{
				name:'msg_cat',
				boxLabel:'包含产品内部信息',
				inputValue:'内部消息'
			},{
				name:'msg_cat',
				boxLabel:'包含产品渠道信息',
				inputValue:'渠道消息'
			},{
				name:'msg_cat',
				boxLabel:'产品公开信息',
				inputValue:'公开信息'
			}]
		}, {
			xtype:'textareafield',
			fieldLabel: '最新进展信息',
			width:500,
			name:'message',
			labelAlign:'right',
			enforceMaxLength:true,
			maxLength:140,
			allowBlank: false
		}]
	}]
});
var projApplyForm = Ext.create('Ext.form.Panel', {
	bodyPadding: 5,
   	width: 350,
   	hidden:true,
   	items: [{
   		fieldLabel: 'proj_id',
       	name: 'proj_id',
       	allowBlank: false
   	}]
});
