Ext.Loader.setConfig({enabled: true,disableCaching:false});
Ext.Loader.setPath('Ext.ux', '/ts/misc/ux');
Ext.require(['Ext.ux.form.SearchField']);

Ext.require([
 'Ext.grid.*',
 'Ext.data.*',
 'Ext.util.*',
 'Ext.state.*',
 'Ext.ux.grid.FiltersFeature',
]);
Ext.onReady(function(){
  var params=Ext.Object.fromQueryString(location.search.substring(1));

  var strUserList=Ext.create('Ext.data.ArrayStore', {
    fields: ['loginname', 'realname','title','branch','tel','qq','email'],
    proxy: {
      type: 'ajax',
      //url: '/etc/proj_sample_data.json',
      url: '/ts/index.php/user/get_info',
      reader: {
          type: 'json',
          root: 'data'
      }
    }
  });

var orderListGrid;
var orderMode=0;
var FSCChannel='null';
var FSCManager='null';
var FSCDirector='null';
var orderMonth='';
var orderStatus='';
var baseUrl='view';

var listControl=Ext.create('Ext.data.JsonStore', {
	fields: [
	  {name:'manage_button'    ,type:'boolean' },
	  {name:'admin_button'    ,type:'boolean' }
	],
	proxy: {
	  type: 'ajax',
	  url: '/ts/index.php/api/access_fields_order',
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

var flowStore=Ext.create('Ext.data.JsonStore', {
	fields: [
{name:'id',type:'integer'},
{name:'category',type:'string'},
{name:'title',type:'string'},
{name:'content',type:'string'},
{name:'attachment',type:'string'},
{name:'link',type:'string'},
{name:'flow_path',type:'string'},
{name:'flow_is_current',type:'integer'},
{name:'creator',type:'string'},
{name:'create_ts',type:'string'},
{name:'editor',type:'string'},
{name:'update_ts',type:'date'},
{name:'remind_ts',type:'date'},
{name:'assigner',type:'string'},
{name:'assignee',type:'string'},
{name:'assign_ts',type:'date'},
{name:'finish_user',type:'string'},
{name:'finish_ts',type:'date'},
{name:'status',type:'string'},
{name:'remark',type:'string'},
{name:'last_message',type:'string'},
{name:'batchid',type:'integer'},
{name:'flow_step',type:'string'}
	],
	proxy: {
	  type: 'ajax',
	  url: '/ts/index.php/reminder/view_flow',
	  reader: {
		  type: 'json',
		  root: 'data'
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
            text:'<span class="app-header2">成交管理</span>'
		},{
			xtype:'box',
			flex:1
		},{
			icon: '/ts/misc/resources/icons/folder_stroke.png',
			scale:'medium',
			text:'按项目管理订单' ,
            hidden:true,
            enableToggle:true,
            toggleGroup : 'btnGroupProj',
            id:'btnProjManage',
			handler:function(){
                baseUrl='view_proj_manage';
                orderListStore.setProxy({
					type: 'ajax',
					url: '/ts/index.php/order/'+baseUrl+'?is_confirmed=1',
					reader: {
						type: 'json',
						root: 'data'
					}
				});
                orderListStore.load();
            }
		},{
			icon: '/ts/misc/resources/icons/folder_stroke.png',
			scale:'medium',
			text:'我的订单' ,
            hidden:true,
            enableToggle:true,
            toggleGroup : 'btnGroupProj',
            id:'btnNoProjManage',
			handler:function(){
                baseUrl='view';
                orderListStore.setProxy({
					type: 'ajax',
					url: '/ts/index.php/order/'+baseUrl+'?is_confirmed=1',
					reader: {
						type: 'json',
						root: 'data'
					}
				});
                orderListStore.load();
            }
		}]
	});

var orderListStore=Ext.create('Ext.data.JsonStore', {
	pageSize : 100,
	remoteSort : true ,
//	autoLoad:true,
	leadingBufferZone: 300,
	buffered: true,
//    sorters:[{property:'csr_person_id',direction:'ASC'}],
	extraParams:{total:50000},
//    simpleSortMode:true,
	fields: [
	{name:'itemid',type:'integer'},
	{name:'state',type:'string'},
	{name:'is_realname',type:'string'},
	{name:'csr_type',type:'string'},
	{name:'csr_name',type:'string'},
	{name:'csr_id',type:'integer'},
	{name:'channel_type',type:'string'},
	{name:'channel_name',type:'string'},
	{name:'channel_id',type:'integer'},
	{name:'amount',type:'integer'},
	{name:'proj_name',type:'string'},
	{name:'proj_id',type:'integer'},
	{name:'comm_in_percent',type:'float'},
	{name:'comm_out_percent',type:'float'},
	{name:'advance_out',type:'float'},
	{name:'advance_out_request',type:'float'},
	{name:'advance_out_request_ts',type:'date'},
	{name:'create_ts',type:'date',dateFormat:"Y-m-d H:i:s"},
	{name:'creator',type:'string'},
	{name:'update_ts',type:'date',dateFormat:"Y-m-d H:i:s"},
	{name:'editor',type:'string'},
	{name:'invest_ts',type:'date',dateFormat:"Y-m-d H:i:s"},
	{name:'invest_checker',type:'string'},
	{name:'comm_in_ts',type:'date',dateFormat:"Y-m-d H:i:s"},
	{name:'comm_in_checker',type:'string'},
	{name:'comm_out_ts',type:'date',dateFormat:"Y-m-d H:i:s"},
	{name:'comm_out_checker',type:'string'},
	{name:'advance_out_ts',type:'date',dateFormat:"Y-m-d H:i:s"},
	{name:'advance_out_checker',type:'string'},
	{name:'csr_remark',type:'string'},
	{name:'end_remark',type:'string'},
	{name:'comm_in_remark',type:'string'},
	{name:'comm_out_remark',type:'string'},
	{name:'advance_out_remark',type:'string'},
	{name:'finish_checker',type:'string'},
	{name:'finish_ts',type:'date',dateFormat:"Y-m-d H:i:s"},
	{name:'accept_checker',type:'string'},
	{name:'accept_ts',type:'date',dateFormat:"Y-m-d H:i:s"}	],
	proxy: {
		type: 'ajax',
		url: '/ts/index.php/order/view?is_confirmed=1',
		reader: {
			type: 'json',
			root: 'data'
		}
	},
	listeners: {
		totalcountchange: function(){
			orderListGrid.down('component#status').update({count: orderListStore.getTotalCount()});
		}
	}
});


var enterItem=function(grid,td,cellIndex,record,tr,rowIndex){
    window.open(record.get("link"));
}



var flowWin = Ext.create("Ext.window.Window", {
	resizeable: false,
	closeAction: "hide",
	closable: false,
	id: 'flowWin',
	title: '流程标题',
	titleAlign: "center",
	width: 980,
	items: [{
        xtype:'grid',
        height:300,
        store:flowStore,
        columns:[
        {text:'',	 dataIndex:'flow_is_current', width:80,filtable:true,style: "text-align:center;",align: 'center',
             renderer:function(value,metaData){
				if(value==1){
	                return "当前步骤";
	            } else {
	                return "";
	            }
			}},
        {text:'时间',	 dataIndex:'finish_ts', width:80,filtable:true,style: "text-align:center;",align: 'center',renderer:new Ext.util.Format.dateRenderer("Y-m-d")},
        {text:'负责人',	 dataIndex:'assignee', width:80,filtable:true,style: "text-align:center;",align: 'center'},
        {text:'流程进展',	 dataIndex:'status', width:80,filtable:true,style: "text-align:center;",align: 'center'},
        {text:'标题',	 dataIndex:'title', width:180,filtable:true,style: "text-align:center;",align: 'left'},
        {text:'说明',	 dataIndex:'remark', width:200,filtable:true,style: "text-align:center;",align: 'left'},
        {
			xtype: 'actioncolumn',
			width:40,style: "text-align:center;",align: 'center',
            text:'附件',
			sortable: false,
			items: [{
				icon: '/ts/misc/resources/icons/download_16.png',
				tooltip: '下载该文件',
		        getClass:function(v,m,r){
		       		if(r.get('attachment').length<3){
		           	   return 'x-hidden';
		           	}
			    },
				handler: function(grid, rowIndex, colIndex) {
					var itemid=grid.getStore().getAt(rowIndex).get("itemid");
					window.open('/ts/index.php/order/attach_get?itemid='+itemid);
				}
			}]
		}]
    },{
		xtype: "form",
		bodyPadding: 5,
		trackResetOnLoad: true,
		border: 0,
		waitTitle: "Pleas wait...",
		layout: {
			type: 'vbox',
            align:'stretch',
			defaultMargins: {
				top: 0,
				right: 5,
				bottom: 0,
				left: 5
			}
		},
		fieldDefaults: {
			lableWidth: 120,
			width: 340,
			labelAlign: 'right'
		},
		dockedItems: [{
			dock: 'bottom',
			xtype: 'toolbar',
			bodyPadding: 5,
			items: [{
				xtype: 'box',
				flex: 1
			},
			{
				icon: '/ts/misc/resources/icons/check_24.png',
				text: '确定',
				scale: 'medium',
				formBind: true,
				//only enabled once the form is valid
				disabled: true,
				handler: function() {
					this.up('form').getForm().submit({
						url: '/ts/index.php/order/invest_in_submit',
						submitEmptyText: false,
						waitMsg: 'Saving Data...',
						success: function(form, action) {
                            orderListStore.load();
							flowWin.hide();
						}
						//,
						//failure: function(form, action) {
						//	Ext.Msg.alert('alert', '保存失败。如有问题请联系管理员。');
						//}
					});
				}
			},
			{
				icon: '/ts/misc/resources/icons/x_24.png',
				text: '取消',
				scale: 'medium',
				handler: function() {
					this.up('window').close();
				}
			},
			{
				xtype: 'box',
				flex: 1
			}]
		}],
        items: [{
			xtype: 'hiddenfield',
			fieldLabel: 'itemid',
			name: 'itemid'
        },{
			xtype: 'radio',
			fieldLabel: '同意',
            id:'radioFlowAgree',
           	width:300,
            inputValue:'agree',
			name: 'result'
		},{
			xtype: 'radio',
			fieldLabel: '反对',
            id:'radioFlowDisagree',
           	width:300,
            inputValue:'disagree',
			name: 'result'
		},{
            xtype:'textareafield',
            fieldLabel: '说明',
            name:'content'
        },{
            xtype:'filefield',
            fieldLabel: '上传附件',
            name:'attachment'
        }]
    }]
});

var newCommInWin = Ext.create("Ext.window.Window", {
	resizeable: false,
	closeAction: "hide",
	closable: false,
	id: 'newCommInWin',
	title: '进款申请',
	titleAlign: "center",
	width: 980,
	items: [{
		xtype: "form",
		bodyPadding: 5,
		trackResetOnLoad: true,
		border: 0,
		waitTitle: "Pleas wait...",
		layout: {
			type: 'vbox',
            align:'stretch',
			defaultMargins: {
				top: 0,
				right: 5,
				bottom: 0,
				left: 5
			}
		},
		fieldDefaults: {
			lableWidth: 120,
			width: 340,
			labelAlign: 'right'
		},
		dockedItems: [{
			dock: 'bottom',
			xtype: 'toolbar',
			bodyPadding: 5,
			items: [{
				xtype: 'box',
				flex: 1
			},
			{
				icon: '/ts/misc/resources/icons/check_24.png',
				text: '确定',
				scale: 'medium',
				formBind: true,
				//only enabled once the form is valid
				disabled: true,
				handler: function() {
					this.up('form').getForm().submit({
						url: '/ts/index.php/order/invest_in_request',
						submitEmptyText: false,
						waitMsg: 'Saving Data...',
						success: function(form, action) {
                            orderListStore.load();
							newInvestWin.hide();
                            
						}
						//,
						//failure: function(form, action) {
						//	Ext.Msg.alert('alert', '保存失败。如有问题请联系管理员。');
						//}
					});
				}
			},
			{
				icon: '/ts/misc/resources/icons/x_24.png',
				text: '取消',
				scale: 'medium',
				handler: function() {
					this.up('window').close();
				}
			},
			{
				xtype: 'box',
				flex: 1
			}]
		}],
        items: [{
			xtype: 'hiddenfield',
			fieldLabel: 'itemid',
			name: 'itemid'
        },{
            xtype:'textareafield',
            fieldLabel: '补充说明',
            name:'content'
        }]
    }]
});
var newCommOutWin = Ext.create("Ext.window.Window", {
	resizeable: false,
	closeAction: "hide",
	closable: false,
	id: 'newCommOutWin',
	title: '付款申请',
	titleAlign: "center",
	width: 980,
	items: [{
		xtype: "form",
		bodyPadding: 5,
		trackResetOnLoad: true,
		border: 0,
		waitTitle: "Pleas wait...",
		layout: {
			type: 'vbox',
            align:'stretch',
			defaultMargins: {
				top: 0,
				right: 5,
				bottom: 0,
				left: 5
			}
		},
		fieldDefaults: {
			lableWidth: 120,
			width: 340,
			labelAlign: 'right'
		},
		dockedItems: [{
			dock: 'bottom',
			xtype: 'toolbar',
			bodyPadding: 5,
			items: [{
				xtype: 'box',
				flex: 1
			},
			{
				icon: '/ts/misc/resources/icons/check_24.png',
				text: '确定',
				scale: 'medium',
				formBind: true,
				//only enabled once the form is valid
				disabled: true,
				handler: function() {
					this.up('form').getForm().submit({
						url: '/ts/index.php/order/invest_in_request',
						submitEmptyText: false,
						waitMsg: 'Saving Data...',
						success: function(form, action) {
                            orderListStore.load();
							newInvestWin.hide();
                            
						}
						//,
						//failure: function(form, action) {
						//	Ext.Msg.alert('alert', '保存失败。如有问题请联系管理员。');
						//}
					});
				}
			},
			{
				icon: '/ts/misc/resources/icons/x_24.png',
				text: '取消',
				scale: 'medium',
				handler: function() {
					this.up('window').close();
				}
			},
			{
				xtype: 'box',
				flex: 1
			}]
		}],
        items: [{
			xtype: 'hiddenfield',
			fieldLabel: 'itemid',
			name: 'itemid'
        },{
            xtype:'textareafield',
            fieldLabel: '补充说明',
            name:'content'
        }]
    }]
});

var newAdvanceRequestWin = Ext.create("Ext.window.Window", {
	resizeable: false,
	closeAction: "hide",
	closable: false,
	id: 'newAdvanceRequestWin',
	title: '垫款申请',
	titleAlign: "center",
	width: 980,
	items: [{
		xtype: "form",
		bodyPadding: 5,
		trackResetOnLoad: true,
		border: 0,
		waitTitle: "Pleas wait...",
		layout: {
			type: 'vbox',
            align:'stretch',
			defaultMargins: {
				top: 0,
				right: 5,
				bottom: 0,
				left: 5
			}
		},
		fieldDefaults: {
			lableWidth: 120,
			width: 340,
			labelAlign: 'right'
		},
		dockedItems: [{
			dock: 'bottom',
			xtype: 'toolbar',
			bodyPadding: 5,
			items: [{
				xtype: 'box',
				flex: 1
			},
			{
				icon: '/ts/misc/resources/icons/check_24.png',
				text: '确定',
				scale: 'medium',
				formBind: true,
				//only enabled once the form is valid
				disabled: true,
				handler: function() {
					this.up('form').getForm().submit({
						url: '/ts/index.php/order/invest_in_request',
						submitEmptyText: false,
						waitMsg: 'Saving Data...',
						success: function(form, action) {
                            orderListStore.load();
							newInvestWin.hide();
                            
						}
						//,
						//failure: function(form, action) {
						//	Ext.Msg.alert('alert', '保存失败。如有问题请联系管理员。');
						//}
					});
				}
			},
			{
				icon: '/ts/misc/resources/icons/x_24.png',
				text: '取消',
				scale: 'medium',
				handler: function() {
					this.up('window').close();
				}
			},
			{
				xtype: 'box',
				flex: 1
			}]
		}],
        items: [{
			xtype: 'hiddenfield',
			fieldLabel: 'itemid',
			name: 'itemid'
        },{
            xtype:'filefield',
            fieldLabel: '上传附件',
            name:'attachment'
        },{
            xtype:'textareafield',
            fieldLabel: '补充说明',
            name:'content'
        }]
    }]
});

flowWin.on({
		hide: function() {
			Ext.getBody().unmask();
		}
	});
	newCommInWin.on({
		hide: function() {
			Ext.getBody().unmask();
		}
	});

	newCommOutWin.on({
		hide: function() {
			Ext.getBody().unmask();
		}
	});
	newAdvanceRequestWin.on({
		hide: function() {
			Ext.getBody().unmask();
		}
	});

	Ext.getCmp('viewport').add(topToolbar);
	Ext.getCmp('viewport').add(controlTree);

var reportersStore=Ext.create('Ext.data.JsonStore', {
	fields:[
		{name:'userid',type:'integer'},
		{name:'loginname',type:'string'},
		{name:'title',type:'string'},
		{name:'realname',type:'string'},
		{name:'branch',type:'string'}
	],
	proxy: {
		type: 'ajax',
		url: '/ts/index.php/user/view_reporters?access_mode=csr_provider/save',
		reader: {
			type: 'json',
			root: 'data'
		}
	}
});

strUserList.load(function(rec, oper) {
listControl.load(function(records, operation, success) {

    if(records[0].get("manage_button")==true){
        Ext.getCmp("btnProjManage").show();
        Ext.getCmp("btnNoProjManage").show();
    }

orderListGrid=Ext.create('Ext.grid.Panel',{
	store: orderListStore,
    region:'center',
	//border:0,
	//title:'文件列表',
	emptyText:'暂无预约或业绩',
	verticalScroller : {
		xtype : 'paginggridscroller'
	} ,
	selModel: {
		pruneRemoved: false
	},
	features:[{
		ftype: 'grouping',
		hideGroupedHeader: false
	}],
	viewConfig: {
		trackOver: false
	},
	multiSelect: true,
    columnLines: true,
	dockedItems:[{
		xtype:'toolbar',
		dock:'top',
		height:48,
		enableOverflow: true,
		padding:3,
		items:[
		{
			width: 400,
			fieldLabel: '查找',
			labelWidth: 50,
			xtype: 'searchfield',
			store: orderListStore
		},'->',{
			xtype: 'component',
			itemId: 'status',
            tpl: '<span style="font-size:16px">订单数：<b>{count}</b>，总投资数：<b>{amount_sum}</b>万元，总费用：<b>{comm_out_sum}</b>元。</span>可搜索客户姓名，产品名称、类别、发行方。',
			style: 'margin-left:10px;margin-right:10px'
		}]
	},{
		xtype:'toolbar',
		id:'order_list_topbar',
		dock:'top',
        height:48,
		items:[{
			xtype:'tbtext',
			text:'订单状态筛选：'
		},{
			xtype:'cycle',
			showText:true,
			menu:{
				items:[{
					icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
					text: '所有状态'
				},{
					icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
					text: '已成立'
				},{
					icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
					text: '已收费用'
				},{
					icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
					text: '已付费用'
				},{
					icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
					text: '后期'
				}]
			},
			changeHandler: function(cycleBtn, activeItem) {
				if(activeItem.text=='所有状态') {
					orderStatus='all';
				} else if(activeItem.text=='已成立') {
					orderStatus='confirmed';
				} else if(activeItem.text=='已收费用') {
					orderStatus='comm_in';
				} else if(activeItem.text=='已付费用') {
					orderStatus='comm_out';
				} else if(activeItem.text=='后期') {
					orderStatus='maintenance';
				}
				orderListStore.setProxy({
					type: 'ajax',
					url:'/ts/index.php/order/'+baseUrl+'?is_confirmed=1&mode='+orderMode+'&status='+orderStatus+'&FSCChannel='+encodeURI(FSCChannel)+'&FSCManager='+encodeURI(FSCManager)+'&FSCDirector='+encodeURI(FSCDirector)+'&month='+orderMonth,
					reader: {
						type: 'json',
						root: 'data',
						totalProperty: 'totalCount'
					},
					simpleSortMode: true,
					filterParam: 'query',
					encodeFilters: function(filters) {
						return filters[0].value;
					}
				});
				orderListStore.load();
			}
		},'->',{
			xtype:'tbtext',
			text:'责任人：'
		}]
	}],
    columns:[
	{dataIndex:'state',text:'状态',width:80,style: "text-align:center;",align: 'center',
			renderer:function(value,metaData,record,rowIndex,colIndex,store,view) { 
                if(value=='confirmed'){
                    return '已成立';
                } else if(value=='comm_in'){
                    return '已收费用';
                } else if(value=='comm_out'){
                    return '已付费用';
                } else if(value=='maintenance'){
                    return '后期';
                }
            }},
    {dataIndex:'itemid',text:'订单号',width:60,style: "text-align:center;",align: 'center'},
	{dataIndex:'invest_ts',text:'打款时间',style: "text-align:center;",align: 'center',renderer:new Ext.util.Format.dateRenderer("Y-m-d")},
	{dataIndex:'csr_name',text:'客户名称',style: "text-align:center;",align: 'center'},
	{dataIndex:'amount',text:'投资数额',width:76,style: "text-align:center;",align: 'right'},
    {dataIndex:'proj_name',text:'产品名称',width:220,style: "text-align:center;",align: 'center'},
    {dataIndex:'csr_id',text:'csr_id',hidden:true},
	{dataIndex:'channel_name',text:'经纪名称',style: "text-align:center;",align: 'center'},
	{dataIndex:'channel_id',text:'channel_id',hidden:true},
	{dataIndex:'proj_id',text:'proj_id',hidden:true},
        {dataIndex:'comm_in',text:'内部费用',width:76,style: "text-align:center;",align: 'right',hidden:records[0].get("comm_in"),
			renderer:function(value,metaData,record,rowIndex,colIndex,store,view) { 
                return Math.round(record.get('comm_in_percent')*record.get('amount')*100)
			}},
	{dataIndex:'comm_out',text:'外部费用',width:76,style: "text-align:center;",align: 'right',
			renderer:function(value,metaData,record,rowIndex,colIndex,store,view) { 
                return Math.round(record.get('comm_out_percent')*record.get('amount')*100)-(record.get('advance_out')>0?record.get('advance_out'):0)
			}
        },
	{dataIndex:'advance_out',text:'垫款',width:76,style: "text-align:center;",align: 'right'},
	{dataIndex:'comm_in_ts',text:'费用收款时间',style: "text-align:center;",align: 'center',hidden:records[0].get("comm_in"),renderer:new Ext.util.Format.dateRenderer("Y-m-d")},
	{dataIndex:'comm_out_ts',text:'费用付款时间',style: "text-align:center;",align: 'center',renderer:new Ext.util.Format.dateRenderer("Y-m-d")},
	{dataIndex:'creator',text:'创建人',width:76,style: "text-align:center;",align: 'center'},
    {
		xtype: 'actioncolumn',
		width:50,style: "text-align:center;",align: 'center',
		sortable: false,
        text:'收款',
		items: [{
			icon: '/ts/misc/resources/icons/minus_16.png',
			tooltip: '收款流程',
            getClass:function(v,m,r){
          	  if(r.get('state')!='confirmed'){
            	   return 'x-hidden';
               	}
	        },
			handler: function(grid, rowIndex, colIndex) {
                record=grid.getStore().getAt(rowIndex);
                if(record.get("comm_in_checker")!=""){
					flowWin.setTitle('收款流程');
   					flowWin.down('form').getForm().loadRecord(record);
                	flowStore.setProxy({
						type: 'ajax',
						url: '/ts/index.php/reminder/view_flow?type=comm_in&batchid='+record.get("itemid"),
						reader: {
							type: 'json',
							root: 'data'
						}
					});
                	flowStore.load();
                    Ext.getBody().mask();
                	flowWin.show();
                } else {
					newCommInWin.setTitle('新建收款流程');
                	newCommInWin.down('form').getForm().reset();
   					newCommInWin.down('form').getForm().loadRecord(record);
                    //Ext.getCmp('fieldNewFlow').setValue('invest');
                    Ext.getBody().mask();
                	newCommInWin.show();
                }
			}
		}]
	},
    {
		xtype: 'actioncolumn',
		width:50,style: "text-align:center;",align: 'center',
		sortable: false,
        text:'付款',
		items: [{
			icon: '/ts/misc/resources/icons/minus_16.png',
			tooltip: '打开',
            getClass:function(v,m,r){
          	  if(r.get('state')!='comm_in'){
            	   return 'x-hidden';
               	}
	        },
			handler: function(grid, rowIndex, colIndex) {
                record=grid.getStore().getAt(rowIndex);
                if(record.get("comm_out_checker")!=""){
					flowWin.setTitle('付款流程');
   					flowWin.down('form').getForm().loadRecord(record);
                	flowStore.setProxy({
						type: 'ajax',
						url: '/ts/index.php/reminder/view_flow?type=comm_out&batchid='+record.get("itemid"),
						reader: {
							type: 'json',
							root: 'data'
						}
					});
                	flowStore.load();
                    Ext.getBody().mask();
                	flowWin.show();
                } else {
					newCommOutWin.setTitle('新建付款流程');
                	newCommOutWin.down('form').getForm().reset();
   					newCommOutWin.down('form').getForm().loadRecord(record);
                    //Ext.getCmp('fieldNewFlow').setValue('invest');
                    Ext.getBody().mask();
                	newCommOutWin.show();
                }
			}
		}]
	},
    {
		xtype: 'actioncolumn',
		width:50,style: "text-align:center;",align: 'center',
		sortable: false,
        text:'垫款',
		items: [{
			icon: '/ts/misc/resources/icons/minus_16.png',
			tooltip: '打开',
            getClass:function(v,m,r){
          	  if(r.get('state')!='confirmed' || r.get('state')!='comm_in'){
            	   return 'x-hidden';
               	}
	        },
			handler: function(grid, rowIndex, colIndex) {
                record=grid.getStore().getAt(rowIndex);
                if(record.get("advance_out_checker")!=""){
					flowWin.setTitle('垫款流程');
   					flowWin.down('form').getForm().loadRecord(record);
                	flowStore.setProxy({
						type: 'ajax',
						url: '/ts/index.php/reminder/view_flow?type=order_advance&batchid='+record.get("itemid"),
						reader: {
							type: 'json',
							root: 'data'
						}
					});
                	flowStore.load();
                    Ext.getBody().mask();
                	flowWin.show();
                } else {
					newAdvanceRequestWin.setTitle('新建垫款流程');
                	newAdvanceRequestWin.down('form').getForm().reset();
   					newAdvanceRequestWin.down('form').getForm().loadRecord(record);
                    //Ext.getCmp('fieldNewFlow').setValue('invest');
                    Ext.getBody().mask();
                	newAdvanceRequestWin.show();
                }
			}
		}]
	}
	]
});

orderListGrid.on({
    celldblclick:enterItem
});


	Ext.getCmp('viewport').add(orderListGrid);
	reportersStore.load(function(records, operation, success) {
		defaultCycleItem=[{
            icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
			text: '只看自己'
		},{
            icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
			text: '管理客户'
		}];
		
		Ext.Array.forEach(records,function(record){
				defaultCycleItem.push({
						text:record.get('realname'),
						icon:'/ts/misc/resources/icons/user_24.png'
				});
		});

		if(Ext.getCmp('CycleFSCChannel')!=undefined){
			Ext.getCmp('CycleFSCChannel').remove();
		}
		Ext.getCmp('order_list_topbar').add(Ext.create('Ext.button.Cycle',{
				showText:true,
				id:'CycleFSCChannel',
				menu:{
				items:defaultCycleItem
			},
			changeHandler: function(cycleBtn, activeItem) {
				if(activeItem.text=='管理客户') {
					orderMode=1;
					FSCChannel='null';
				} else if(activeItem.text=='只看自己') {
					orderMode=0;
					FSCChannel='null';
				} else {
					orderMode=0;
					FSCChannel=activeItem.text;
				}
				orderListStore.setProxy({
					type: 'ajax',
					url:'/ts/index.php/order/'+baseUrl+'?is_confirmed=1&mode='+orderMode+'&orderStatus='+orderStatus+'&FSCChannel='+encodeURI(FSCChannel)+'&FSCManager='+encodeURI(FSCManager)+'&FSCDirector='+encodeURI(FSCDirector)+'&month='+orderMonth,
					reader: {
						type: 'json',
						root: 'data',
						totalProperty: 'totalCount'
					},
					simpleSortMode: true,
					filterParam: 'query',
					encodeFilters: function(filters) {
						return filters[0].value;
					}
				});
    if(params.itemid>0) {
        orderListStore.setProxy({
			type: 'ajax',
			url:'/ts/index.php/order/'+baseUrl+'?itemid='+params.itemid,
			reader: {
				type: 'json',
				root: 'data',
				totalProperty: 'totalCount'
			},
			simpleSortMode: true,
			filterParam: 'query',
			encodeFilters: function(filters) {
				return filters[0].value;
			}
		});
	    orderListStore.load();
    } else {
        orderListStore.load();
    }
			}
		}));
	});
    
});
});
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
