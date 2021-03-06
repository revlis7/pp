Ext.Loader.setConfig({enabled: true,disableCaching:false});
Ext.Loader.setPath('Ext.ux', '/ts/misc/ux');

Ext.require([
 'Ext.grid.*',
 'Ext.data.*',
 'Ext.util.*',
 'Ext.state.*',
 'Ext.ux.grid.FiltersFeature',
]);
var AmountDetailsGrid;
var gradeFn=function(value) { 
	var res;
	if(value=="5"){
    	res= '<span style="color:#245288">★★★★★</span>'
	} else if (value=="4"){
		res= '<span style="color:#245288">★★★★</span>'
	} else if (value=="3"){
		res= '<span style="color:#245288">★★★</span>'
	} else if (value=="2"){
		res= '<span style="color:#245288">★★</span>'
	} else if (value=="1"){
		res= '<span style="color:#245288">★</span>'
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
var baseLoadAff=function(records, operation, success){
	//if(success==false){
    //	Ext.Msg.alert('错误', '会话超时，请重新登录！',function(btn, text){
    //		window.location.href='/ts/index.php/auth';
    //	});
	//}
}
var chFixedList=Ext.create('Ext.data.ArrayStore', {
	fields: ['id', 'text'],
	data: [
		['集合信托：上市公司股票质押类','集合信托：上市公司股票质押类'],
		['集合信托：政府基建类','集合信托：政府基建类'],
		['集合信托：房地产类','集合信托：房地产类'],
		['集合信托：其他类','集合信托：其他类'],
		['私募基金','私募基金'],
		['资产管理计划','资产管理计划'],
		['P2P理财','P2P理财'],
		['其他','其他']
	]
});
var chFloatingList=Ext.create('Ext.data.ArrayStore', {
	fields: ['id', 'text'],
	data: [
		['债券基金','债券基金'],
		['证券基金','证券基金'],
		['股权基金','股权基金'],
		['其他','其他']
	]
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
	  ['5','五星级'],
	  ['4','四星级'],
	  ['3','三星级'],
	  ['2','二星级'],
	  ['1','一星级']
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
	  ['王璐','王璐'],
	  ['李汶洁','李汶洁'],
	  ['黄水丽','黄水丽']
	]
});
var chProjDirectorList=Ext.create('Ext.data.ArrayStore', {
	fields: ['id', 'text'],
	data: [
	  ['申玉玺','申玉玺'],
	  ['孟祥春','孟祥春'],
	  ['王琪','王琪'],
	  ['王栋生','王栋生'],
	  ['翟晓凤','翟晓凤'],
	  ['陈彪','陈彪'],
	  ['沈志远','沈志远']
	]
});

var	fileListStore=Ext.create('Ext.data.JsonStore', {
	fields:	[
	{name:'id'	,type:'integer'	},
	{name:'proj_id'	,type:'integer'	},
	{name:'filename'	,type:'string' },
	{name:'filesize'	,type:'integer'	},
	{name:'editor'	,type:'string' },
	{name:'create_ts'	,type:'date',dateFormat:"Y-m-d H:i:s" }
	],
	proxy: {
		type: 'ajax',
		url: '/ts/index.php/upload/get_list?proj_id=',
		reader:	{
			type: 'json',
			root: 'data'
		}
	},
    listeners:{
        load:{
            fn:baseLoadAff,
            scope:this
        }
    }
});
var	projAllStore=Ext.create('Ext.data.JsonStore', {
 fields: [
	{name:'proj_id'	,type:'integer'	},
	{name:'grade' ,type:'string' },
	{name:'category' ,type:'string'	},
	{name:'sub_category' ,type:'string'	},
	{name:'issue' ,type:'string' },
	{name:'name' ,type:'string'	},
	{name:'sub_name' ,type:'string'	},
	{name:'proj_director' ,type:'string'	},
	{name:'manager'	,type:'string' },
	{name:'min_month',type:'integer'},
	{name:'max_month',type:'integer'},
	{name:'min_profit',type:'float'},
	{name:'max_profit',type:'float'},
	{name:'min_amount',type:'integer'},
	{name:'profit_string',type:'string'},
	{name:'is_end',type:'integer'},
	{name:'flow_of_fund',type:'string'},
	{name:'create_ts' ,type:'date',dateFormat:"Y-m-d H:i:s"	}
],
	proxy:	{
		type: 'ajax',
		url: '/ts/index.php/proj/view',
		reader:	{
			type: 'json',
			root: 'data'
		}
	},
    listeners:{
        load:{
            fn:baseLoadAff,
            scope:this
        }
    }
});
var	projAllAdvStore=Ext.create('Ext.data.JsonStore', {
 fields: [
	{name:'proj_id'	,type:'integer'	},
	{name:'proj_detail_id' ,type:'integer' },
	{name:'total_share'	,type:'string' },
	{name:'flow_of_fund'	,type:'string' },
	{name:'status' ,type:'string' },
	{name:'exclusive' ,type:'string' },
	{name:'grade' ,type:'string' },
	{name:'category' ,type:'string'	},
	{name:'sub_category' ,type:'string'	},
	{name:'issue' ,type:'string' },
	{name:'name' ,type:'string'	},
	{name:'sub_name' ,type:'string'	},
	{name:'month' ,type:'integer'},
	{name:'scale' ,type:'float'	},
	{name:'cycle' ,type:'string' },
	{name:'amount' ,type:'integer'},
	{name:'profit_property'	,type:'string' },
	{name:'profit' ,type:'float' },
	{name:'proj_director' ,type:'string'	},
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
	{name:'found' ,type:'date',dateFormat:"Y-m-d H:i:s" },
	{name:'create_ts' ,type:'date',dateFormat:"Y-m-d H:i:s"	},
     {name:'commission_partner', type:'float'}
],
	proxy:	{
		type: 'ajax',
		url: '/ts/index.php/proj/view?adv=1',
		reader:	{
			type: 'json',
			root: 'data'
		}
	},
    listeners:{
        load:{
            fn:baseLoadAff,
            scope:this
        }
    }
});
var recentChangeStore=Ext.create('Ext.data.JsonStore', {
	fields: [
	{name:'proj_id',type:'integer'},
	{name:'create_ts',type:'date',dateFormat:"Y-m-d H:i:s"},
	{name:'msg_cat',type:'string'},
	{name:'message',type:'string'},
	{name:'last_update',type:'date',dateFormat:"Y-m-d H:i:s"},
	{name:'updater',type:'string'}
	],
	proxy: {
		type: 'ajax',
		url: '/ts/index.php/proj/detail_view?proj_id=',
		reader: {
			type: 'json',
			root: 'data'
		}
	},
    listeners:{
        load:{
            fn:baseLoadAff,
            scope:this
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
	{name:'found',type:'date',dateFormat:"Y-m-d H:i:s"},
        {name:'commission_partner',type:'float'}
	],
	proxy: {
		type: 'ajax',
		url: '/ts/index.php/proj/detail_view?proj_id=',
		reader: {
			type: 'json',
			root: 'data'
		}
	},
    listeners:{
        load:{
            fn:baseLoadAff,
            scope:this
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
	{name:'proj_director',type:'string'},
	{name:'min_month',type:'integer'},
	{name:'max_month',type:'integer'},
	{name:'min_profit',type:'float'},
	{name:'max_profit',type:'float'},
	{name:'min_amount',type:'integer'},
	{name:'profit_string',type:'string'},
	{name:'is_end',type:'integer'},
	{name:'create_ts',type:'date',dateFormat:"Y-m-d H:i:s"}
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
		{type:'list' ,dataIndex:'proj_director' },
		{type:'date' ,dataIndex:'create_ts'	},
        {type:'numeric',dataIndex:'commission_partner'}
	]
};

var	FileListGrid=Ext.create('Ext.grid.Panel',{
	store: fileListStore,
	//border:0,
	//title:'文件列表',
	emptyText:'暂无文件信息',
	minHeight:156,
	region:'south',
	flex:1,
	columns:[
	
	{text:'文件名',		 dataIndex:'filename',		filtable:true, style: "text-align:center;",align: 'left',width:522},
	{
		xtype: 'actioncolumn',
		width:40,style:	"text-align:center;",align:	'center',
		sortable: false,
		items: [{
			icon: '/ts/misc/resources/icons/download_16.png',
			tooltip: '下载该文件',
			handler: function(grid,	rowIndex, colIndex)	{
				var	fileid=grid.getStore().getAt(rowIndex).get("id");
				window.open('/ts/index.php/upload/get?fileid='+fileid);
			}
		}]
	},{text:'文件大小',		dataIndex:'filesize',	   filtable:true, style: "text-align:center;",align: 'right',width:120,
		 renderer:function(value,metaData,record,colIndex,store,view) {
			 if(value>=1048676)	{var v=value/1048576;return	v.toFixed(1)+' MB';}
			 else if(value>=1024) {var v=value/1024;return v.toFixed(1)+' KB';}
			 else return value;
		 }
	},
	{text:'文件上传日期',	  dataIndex:'create_ts',	  filtable:true, width:130,style: "text-align:center;",align: 'center',renderer:new Ext.util.Format.dateRenderer("Y-m-d")}
	]
});
var	RecentChangeGrid=Ext.create('Ext.grid.Panel',{
	store: recentChangeStore,
	//border:0,
	//title:'最新进展',
	emptyText:'暂无信息',
	minHeight:156,
	region:'north',
	flex:1,
	columns:[
	{text:'信息分类',			dataIndex:'msg_cat',	  filtable:true, style:	"text-align:center;",align:	'center',width:100},
	{text:'时间',			dataIndex:'create_ts',	  filtable:true, style:	"text-align:center;",align:	'center',width:100,renderer:new Ext.util.Format.dateRenderer("Y-m-d")},
	{text:'最新进展信息',		dataIndex:'message',	   filtable:true, style: "text-align:center;",align: 'left',width:600}
	]
});

var recommendStore=Ext.create('Ext.data.JsonStore', {
	fields: ['proj_id'],
	proxy: {
		type: 'ajax',
		url: '/ts/index.php/proj/proj_promote_view',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});
function generatePanelFn(e){
	e.down('panel#projDetailPanel').add(RecentChangeGrid).show();
	e.down('panel#projDetailPanel').add(AmountDetailsGrid).show();
	e.down('panel#projDetailPanel').add(FileListGrid).show();
    projStore.setProxy({
		type: 'ajax',
		url: '/ts/index.php/proj/proj_get?proj_id='+e.proj_id,
		reader:	{
			type: 'json',
			root: 'data'
		}
	});
	fileListStore.setProxy({
		type: 'ajax',
		url: '/ts/index.php/upload/get_list?proj_id='+e.proj_id,
		reader:	{
			type: 'json',
			root: 'data'
		}
	});
	projDetailStore.setProxy({
		type: 'ajax',
		url: '/ts/index.php/proj/detail_view?proj_id='+e.proj_id,
		reader: {
			type: 'json',
			root: 'data'
		}
	});
	recentChangeStore.setProxy({
		type: 'ajax',
		url: '/ts/index.php/proj/message_view?proj_id='+e.proj_id,
		reader: {
			type: 'json',
			root: 'data'
		}
	});
	fileListStore.load();
	recentChangeStore.load();
    
projStore.load(function(records, operation, success) {
	var detailString="";
	projDetailStore.load(function(detailRecs, operation, success) {
		//ProjInfoForm.getForm().loadRecord(records[0]);
		Ext.Array.forEach(detailRecs,function(record){
			detailString+='<pre>'+record.get("sub_name")+record.get("month")+"个月, "+(record.get("amount")<10000?(record.get("amount")+"万"):(record.get("amount")/10000+"亿"))+': '+record.get("profit")+'%</pre>';
		});
	e.proj_info_tpl = Ext.create('Ext.XTemplate',[
		'<table	style="border-collapse:collapse;"><tr><td style="padding:15px;border:1px;"><b>产品基本信息：</b><br /><br /><table style="border-collapse:collapse;">',
		'<tr><td class="r_ex_td_pre"><b>分类</b></td><td class="r_ex_td_main"><pre>{category}: {sub_category}</pre></td></tr>',
		'<tr><td class="r_ex_td_pre"><b>产品名称</b></td><td class="r_ex_td_main"><pre>{name}</pre></td></tr>',
		'<tr><td class="r_ex_td_pre"><b>基本情况</b></td><td class="r_ex_td_main"><b>{profit_property}收益</b>产品，由<b>{issue}</b>发行，融资规模<b>{scale:this.cusNum()}</b>，按<b>{cycle}</b>分配</td></tr>',
		'<tr><td class="r_ex_td_pre"><b>产品评级</b></td><td class="r_ex_td_main">{grade:this.cusGrade()}</td></tr>',
		'<tr><td class="r_ex_td_pre"><b>预期收益</b></td><td class="r_ex_td_main">',
		detailString, '</td></tr>',
		'<tr><td class="r_ex_td_pre"><b>资金投向</b></td><td class="r_ex_td_main"><pre>{flow_of_fund}</pre></td></tr>',
		'<tr><td class="r_ex_td_pre"><b>产品亮点</b></td><td class="r_ex_td_main"><pre>{highlights}</pre></td></tr>',
		'<tr><td class="r_ex_td_pre"><b>合同情况</b></td><td class="r_ex_td_main"><pre>{contract}</pre></td></tr>',
		//'<tr><td class="r_ex_td_pre"><b>产品进度</b></td><td class="r_ex_td_main"><pre>{countdown}</pre></td></tr>',
		'<tr><td class="r_ex_td_pre"><b>打款账号</b></td><td class="r_ex_td_main"><pre>{pay_account}</pre></td></tr>',
		'<tr><td class="r_ex_td_pre"><b>备注</b></td><td class="r_ex_td_main"><pre>{remark}</pre></td></tr>',
        '</table></td></tr><tr><td style="padding:15px;border:1px;"><b>产品补充信息：</b><br /><br /><table style="border-collapse:collapse;">',
        '<tr><td class="r_ex_td_pre"><b>产品添加时间</b></td><td class="r_ex_td_main"><pre>{create_ts:this.cusDate}</pre></td></tr>',
        '<tr><td class="r_ex_td_pre"><b>产品董事</b></td><td class="r_ex_td_main"><pre>{proj_director}</pre></td></tr>',
        '<tr><td class="r_ex_td_pre"><b>产品经理</b></td><td class="r_ex_td_main"><pre>{manager}</pre></td></tr>',
        '</td></tr></table></td></tr></table>',
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
	e.proj_info_tpl.overwrite(e.down('panel#projInfoPanel').body,records[0].data);
    //var headTitleTpl = Ext.create('Ext.XTemplate',['{issue} {name}']);
                                  
    //headTitleTpl.overwrite(Ext.getCmp('headerTitle').body,foundRecords.getAt(0).data);
    if(Ext.getCmp('headerTitle').getEl().dom.innerText.indexOf('推荐产品')<0){
    	Ext.getCmp('headerTitle').setText('<span class="app-header2">'+records[0].data.issue+' '+records[0].data.name+'</span>');
    }
	});
    
});
	
}

var cellClick=function(grid,td,cellIndex,record,tr,rowIndex){
	var proj_id = record.get("proj_id");
    window.open('/ts/index.php/proj?proj_id='+proj_id);
}

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
