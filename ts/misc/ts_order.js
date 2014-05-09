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
	  {name:'comm_in'    ,type:'boolean' },
	  {name:'accept_order'    ,type:'boolean' },
	  {name:'invest_in'    ,type:'boolean' },
	  {name:'abort'    ,type:'boolean' },
	  {name:'confirm_order'    ,type:'boolean' },
	  {name:'manage_button'    ,type:'boolean' },
	  {name:'channel_choose'    ,type:'boolean' }
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
{name:'itemid',type:'integer'},
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
            text:'<span class="app-header2">预约与订单</span>'
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
					url: '/ts/index.php/order/'+baseUrl+'?is_confirmed=0&mode='+orderMode+'&status='+orderStatus+'&FSCChannel='+encodeURI(FSCChannel)+'&FSCManager='+encodeURI(FSCManager)+'&FSCDirector='+encodeURI(FSCDirector)+'&month='+orderMonth,
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
					url: '/ts/index.php/order/'+baseUrl+'?is_confirmed=0&mode='+orderMode+'&status='+orderStatus+'&FSCChannel='+encodeURI(FSCChannel)+'&FSCManager='+encodeURI(FSCManager)+'&FSCDirector='+encodeURI(FSCDirector)+'&month='+orderMonth,
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
		},{
			icon: '/ts/misc/resources/icons/folder_stroke.png',
            id:'BtnNewOrder',
			scale:'medium',
			text:'新建订单' ,
			handler:function(){
				//todo
				Ext.getBody().mask();
                newOrderWin.down('form').getForm().reset();
				newOrderWin.show();
            }
		}]
	});

var orderListStore=Ext.create('Ext.data.JsonStore', {
	pageSize : 100,
	remoteSort : true ,
	//autoLoad:true,
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
	{name:'proj_manager',type:'string'},
	{name:'proj_director',type:'string'},
	{name:'proj_category',type:'string'},
	{name:'proj_flow_of_fund',type:'string'},
	{name:'proj_grade',type:'string'},
	{name:'proj_issue',type:'string'},
	{name:'proj_profit_property',type:'string'},
	{name:'proj_profit_string',type:'string'},
	{name:'proj_sub_category',type:'string'},
	{name:'csr_remark',type:'string'},
	{name:'end_remark',type:'string'},
	{name:'comm_in_remark',type:'string'},
	{name:'comm_out_remark',type:'string'},
	{name:'advance_out_remark',type:'string'},
	{name:'finish_checker',type:'string'},
	{name:'finish_ts',type:'date',dateFormat:"Y-m-d H:i:s"},
	{name:'accept_checker',type:'string'},
	{name:'accept_ts',type:'date',dateFormat:"Y-m-d H:i:s"}
    ],
	proxy: {
		type: 'ajax',
		url: '/ts/index.php/order/view?is_confirmed=0',
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


var newOrderWin = Ext.create("Ext.window.Window", {
	resizeable: false,
	closeAction: "hide",
	closable: false,
	id: 'newOrderWin',
	title: '预约',
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
						url: '/ts/index.php/order/create_order_submit',
						submitEmptyText: false,
						waitMsg: 'Saving Data...',
						success: function(form, action) {
                            orderListStore.load();
							newOrderWin.hide();
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
		items: [
		/*csr_name,
                    csr_id,
                    csr_channel_name,
                    csr_channel_id,
                    csr_corp_name,
                    csr_corp_id,
                    amount,
                    proj_name,
                    proj_id
                    */
		{
            xtype: 'checkbox',
            boxLabel: '<b>我是实名预约</b>',
            id:'boxNewRealname',
            name:'is_realname',
            inputValue:'1'
        },{
			xtype: 'fieldset',
			layout: 'vbox',
			border: 0,
			items: [{
				xtype: 'textfield',
				fieldLabel: '项目名称',
                id:'fieldProjName',
                width:600,
				name: 'proj_name'
			},
			{
				xtype: 'hiddenfield',
				fieldLabel: 'proj_id',
				id:'fieldProjID',
                name: 'proj_id'
			},
			{
				xtype: 'button',
				text: '从项目列表中选择...',
				handler: function() {
					projWin.show();
					Ext.getCmp('newOrderWin').mask();
				}
			},{
				xtype: 'numberfield',
				fieldLabel: '预约金额(万)',
            	width:300,
				name: 'amount'
			}]
		},		{
			xtype: 'fieldset',
			layout: 'hbox',
            title: '客户',
			items: [  {
			xtype: 'fieldset',
			layout: 'vbox',
                flex:1,
			border: 0,
			items: [{
				xtype: 'radio',
				name: 'radioNewCsr',
				boxLabel: '个人与家庭客户',
				inputValue: 'person',
				hideLabel: true,
				scope: this,
				handler: function(box, checked) {
					var fieldset = box.ownerCt;
					Ext.Array.forEach(fieldset.query('textfield'),function(field) {
						field.setDisabled(checked ? false: true);
                    })
					Ext.Array.forEach(fieldset.query('button'), function(field) {
						field.setDisabled(checked ? false: true);
					});
					Ext.Array.forEach(fieldset.query('hiddenfield'), function(field) {
						field.setDisabled(checked ? false: true);
					});
				}
			},
			{
				xtype: 'hiddenfield',
				fieldLabel: 'csr_person_id',
				disabled: true,
                id:'fieldcsrPersonID',
				name: 'csr_person_id'
			},
			{
				xtype: 'textfield',
				fieldLabel: '客户姓名（个人）',
                lableWidth: 120,
				disabled: true,
                id:'fieldcsrPersonName',
				name: 'csr_person_name'
			},
			{
				xtype: 'button',
				text: '从我的客户列表中选择...',
				disabled: true,
				handler: function() {
					csrPersonWin.show();
					Ext.getCmp('newOrderWin').mask();
				}
			}]
		},
		{
			xtype: 'fieldset',
			layout: 'vbox',
            flex:1,
			border: 0,
			items: [{
				xtype: 'radio',
				name: 'radioNewCsr',
				inputValue: 'fm_corp',
				boxLabel: '机构客户',
				hideLabel: true,
				scope: this,
				handler: function(box, checked) {
					var fieldset = box.ownerCt;
					Ext.Array.forEach(fieldset.query('textfield'), function(field) {
						field.setDisabled(checked ? false: true);
					});
					Ext.Array.forEach(fieldset.query('button'), function(field) {
						field.setDisabled(checked ? false: true);
					});
					Ext.Array.forEach(fieldset.query('hiddenfield'), function(field) {
						field.setDisabled(checked ? false: true);
					});
				}
			},
			{
				xtype: 'hiddenfield',
				fieldLabel: 'csr_fm_corp_id',
                id:'fieldcsrFmCorpID',
				disabled: true,
				name: 'csr_fm_corp_id'
			},
			{
				xtype: 'textfield',
				fieldLabel: '客户姓名（机构）',
                id:'fieldcsrFmCorpName',
                lableWidth: 120,
				disabled: true,
				name: 'csr_fm_corp_name'
			},
			{
				xtype: 'button',
				text: '从我的客户列表中选择...',
				disabled: true,
				handler: function() {
					csrFmCorpWin.show();
					Ext.getCmp('newOrderWin').mask();
				}
			}]
        }]
        },{
			xtype: 'fieldset',
			layout: 'hbox',
            title: '经纪',
            id:'fs_channel',
            hidden:true,
			items: [    
		{
			xtype: 'fieldset',
			layout: 'vbox',
            flex:1,
			border: 0,
			items: [{
				xtype: 'radio',
				name: 'radioNewChannel',
				inputValue: 'channel',
				boxLabel: '经纪人选择',
				hideLabel: true,
				scope: this,
				handler: function(box, checked) {
					var fieldset = box.ownerCt;
					Ext.Array.forEach(fieldset.query('textfield'), function(field) {
						field.setDisabled(checked ? false: true);
					});
					Ext.Array.forEach(fieldset.query('button'), function(field) {
						field.setDisabled(checked ? false: true);
					});
					Ext.Array.forEach(fieldset.query('hiddenfield'), function(field) {
						field.setDisabled(checked ? false: true);
					});
				}
			},
			{
				xtype: 'hiddenfield',
				fieldLabel: 'csr_channel_id',
                id:'fieldcsrChannelID',
				disabled: true,
				name: 'csr_channel_id'
			},
			{
				xtype: 'textfield',
				fieldLabel: '经纪人姓名',
                id:'fieldcsrChannelName',
                lableWidth: 120,
				disabled: true,
				name: 'csr_channel_name'
			},
			{
				xtype: 'button',
				text: '从我的经纪人中选择...',
				disabled: true,
				handler: function() {
					csrChannelWin.show();
					Ext.getCmp('newOrderWin').mask();
				}
			}]
		},
		{
			xtype: 'fieldset',
			layout: 'vbox',
            flex:1,
			border: 0,
			items: [{
				xtype: 'radio',
				name: 'radioNewChannel',
				inputValue: 'corp',
				boxLabel: '经纪机构选择',
				hideLabel: true,
				scope: this,
				handler: function(box, checked) {
					var fieldset = box.ownerCt;
					Ext.Array.forEach(fieldset.query('textfield'), function(field) {
						field.setDisabled(checked ? false: true);
					});
					Ext.Array.forEach(fieldset.query('button'), function(field) {
						field.setDisabled(checked ? false: true);
					});
					Ext.Array.forEach(fieldset.query('hiddenfield'), function(field) {
						field.setDisabled(checked ? false: true);
					});
				}
			},
			{
				xtype: 'hiddenfield',
				fieldLabel: 'csr_corp_id',
                id:'fieldcsrCorpID',
				disabled: true,
				name: 'csr_corp_id'
			},
			{
				xtype: 'textfield',
				fieldLabel: '经纪机构姓名',
                id:'fieldcsrCorpName',
                lableWidth: 120,
				disabled: true,
				name: 'csr_corp_name'
			},
			{
				xtype: 'button',
				text: '从我的经纪机构中选择...',
				disabled: true,
				handler: function() {
					csrCorpWin.show();
					Ext.getCmp('newOrderWin').mask();
				}
			}]
		}]
                }]
	}]
});
var editOrderWin = Ext.create("Ext.window.Window", {
	resizeable: false,
	closeAction: "hide",
	closable: false,
	id: 'editOrderWin',
	title: '预约',
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
						url: '/ts/index.php/order/update_order_submit',
						submitEmptyText: false,
						waitMsg: 'Saving Data...',
						success: function(form, action) {
                            orderListStore.load();
							editOrderWin.hide();
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
		items: [
		/*csr_name,
                    csr_id,
                    csr_channel_name,
                    csr_channel_id,
                    csr_corp_name,
                    csr_corp_id,
                    amount,
                    proj_name,
                    proj_id
                    */
		{
			xtype: 'hiddenfield',
			fieldLabel: 'itemid',
			name: 'itemid'
		},{
			xtype: 'fieldset',
			layout: 'vbox',
			border: 0,
			items: [{
				xtype: 'textfield',
				fieldLabel: '项目名称',
                width:600,
                id:'editfieldProjName',
				name: 'proj_name'
			},
			{
				xtype: 'hiddenfield',
				fieldLabel: 'proj_id',
                id:'editfieldProjID',
				name: 'proj_id'
			},
			{
				xtype: 'button',
				text: '从项目列表中选择...',
				handler: function() {
					projWin.show();
					Ext.getCmp('newOrderWin').mask();
				}
			},{
				xtype: 'numberfield',
				fieldLabel: '预约金额(万)',
            	width:300,
				name: 'amount'
			}]
		},		{
			xtype: 'fieldset',
			layout: 'hbox',
            title: '客户',
			items: [  {
			xtype: 'fieldset',
			layout: 'vbox',
                flex:1,
			border: 0,
			items: [{
				xtype: 'radio',
				name: 'radioNewCsr',
				boxLabel: '个人与家庭客户',
				inputValue: 'person',
				hideLabel: true,
				scope: this,
				handler: function(box, checked) {
					var fieldset = box.ownerCt;
					Ext.Array.forEach(fieldset.query('textfield'), function(field) {
						field.setDisabled(checked ? false: true);
					});
					Ext.Array.forEach(fieldset.query('button'), function(field) {
						field.setDisabled(checked ? false: true);
					});
					Ext.Array.forEach(fieldset.query('hiddenfield'), function(field) {
						field.setDisabled(checked ? false: true);
					});
				}
			},
			{
				xtype: 'hiddenfield',
				fieldLabel: 'csr_person_id',
				disabled: true,
                id:'editfieldcsrPersonID',
				name: 'csr_person_id'
			},
			{
				xtype: 'textfield',
				fieldLabel: '客户姓名（个人）',
                lableWidth: 120,
				disabled: true,
                id:'editfieldcsrPersonName',
				name: 'csr_person_name'
			},
			{
				xtype: 'button',
				text: '从我的客户列表中选择...',
				disabled: true,
				handler: function() {
					csrPersonWin.show();
					Ext.getCmp('newOrderWin').mask();
				}
			}]
		},
		{
			xtype: 'fieldset',
			layout: 'vbox',
            flex:1,
			border: 0,
			items: [{
				xtype: 'radio',
				name: 'radioNewCsr',
				inputValue: 'fm_corp',
				boxLabel: '机构客户',
				hideLabel: true,
				scope: this,
				handler: function(box, checked) {
					var fieldset = box.ownerCt;
					Ext.Array.forEach(fieldset.query('textfield'), function(field) {
						field.setDisabled(checked ? false: true);
					});
					Ext.Array.forEach(fieldset.query('button'), function(field) {
						field.setDisabled(checked ? false: true);
					});
					Ext.Array.forEach(fieldset.query('hiddenfield'), function(field) {
						field.setDisabled(checked ? false: true);
					});
				}
			},
			{
				xtype: 'hiddenfield',
				fieldLabel: 'csr_fm_corp_id',
                id:'editfieldcsrFmCorpID',
				disabled: true,
				name: 'csr_person_id'
			},
			{
				xtype: 'textfield',
				fieldLabel: '客户姓名（机构）',
                id:'editfieldcsrFmCorpName',
                lableWidth: 120,
				disabled: true,
				name: 'csr_fm_corp_name'
			},
			{
				xtype: 'button',
				text: '从我的客户列表中选择...',
				disabled: true,
				handler: function() {
					csrFmCorpWin.show();
					Ext.getCmp('newOrderWin').mask();
				}
			}]
        }]
        },{
			xtype: 'fieldset',
			layout: 'hbox',
            title: '经纪',
			items: [    
		{
			xtype: 'fieldset',
			layout: 'vbox',
            flex:1,
			border: 0,
			items: [{
				xtype: 'radio',
				name: 'radioNewChannel',
				inputValue: 'channel',
				boxLabel: '经纪人选择',
				hideLabel: true,
				scope: this,
				handler: function(box, checked) {
					var fieldset = box.ownerCt;
					Ext.Array.forEach(fieldset.query('textfield'), function(field) {
						field.setDisabled(checked ? false: true);
					});
					Ext.Array.forEach(fieldset.query('button'), function(field) {
						field.setDisabled(checked ? false: true);
					});
					Ext.Array.forEach(fieldset.query('hiddenfield'), function(field) {
						field.setDisabled(checked ? false: true);
					});
				}
			},
			{
				xtype: 'hiddenfield',
				fieldLabel: 'csr_channel_id',
                id:'editfieldcsrChannelID',
				disabled: true,
				name: 'csr_channel_id'
			},
			{
				xtype: 'textfield',
				fieldLabel: '经纪人姓名',
                id:'editfieldcsrChannelName',
                lableWidth: 120,
				disabled: true,
				name: 'csr_channel_name'
			},
			{
				xtype: 'button',
				text: '从我的经纪人中选择...',
				disabled: true,
				handler: function() {
					csrChannelWin.show();
					Ext.getCmp('newOrderWin').mask();
				}
			}]
		},
		{
			xtype: 'fieldset',
			layout: 'vbox',
            flex:1,
			border: 0,
			items: [{
				xtype: 'radio',
				name: 'radioNewChannel',
				inputValue: 'corp',
				boxLabel: '经纪机构选择',
				hideLabel: true,
				scope: this,
				handler: function(box, checked) {
					var fieldset = box.ownerCt;
					Ext.Array.forEach(fieldset.query('textfield'), function(field) {
						field.setDisabled(checked ? false: true);
					});
					Ext.Array.forEach(fieldset.query('button'), function(field) {
						field.setDisabled(checked ? false: true);
					});
					Ext.Array.forEach(fieldset.query('hiddenfield'), function(field) {
						field.setDisabled(checked ? false: true);
					});
				}
			},
			{
				xtype: 'hiddenfield',
				fieldLabel: 'csr_corp_id',
                id:'editfieldcsrCorpID',
				disabled: true,
				name: 'csr_corp_id'
			},
			{
				xtype: 'textfield',
				fieldLabel: '经纪机构姓名',
                id:'editfieldcsrCorpName',
                lableWidth: 120,
				disabled: true,
				name: 'csr_corp_name'
			},
			{
				xtype: 'button',
				text: '从我的经纪机构中选择...',
				disabled: true,
				handler: function() {
					csrCorpWin.show();
					Ext.getCmp('newOrderWin').mask();
				}
			}]
		}]
                }]
	}]
});

var acceptOrderWin = Ext.create("Ext.window.Window", {
	resizeable: false,
	closeAction: "hide",
	closable: false,
	id: 'acceptOrderWin',
	title: '预约',
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
						url: '/ts/index.php/order/confirm_order_submit',
						submitEmptyText: false,
						waitMsg: 'Saving Data...',
						success: function(form, action) {
                            orderListStore.load();
							acceptOrderWin.hide();
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
			xtype: 'numberfield',
			fieldLabel: '进款费用（%）',
           	width:300,
			name: 'comm_in_percent',
				decimalPrecision:4
		},{
			xtype: 'numberfield',
			fieldLabel: '付款费用（%）',
           	width:300,
			name: 'comm_out_percent',
				decimalPrecision:4
		}]
    }]
});

var endOrderWin = Ext.create("Ext.window.Window", {
	resizeable: false,
	closeAction: "hide",
	closable: false,
	id: 'endOrderWin',
	title: '结束预约',
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
						url: '/ts/index.php/order/end_order_submit',
						submitEmptyText: false,
						waitMsg: 'Saving Data...',
						success: function(form, action) {
                            orderListStore.load();
							endOrderWin.hide();
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
			fieldLabel: '终止预约',
            id:'radioAbort',
           	width:300,
            hidden:true,
            inputValue:'abort',
			name: 'state'
		},{
			xtype: 'radio',
			fieldLabel: '预约成立',
            id:'radioConfirm',
           	width:300,
            hidden:true,
            inputValue:'confirmed',
			name: 'state'
		}]
    }]
});


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
        {text:'说明',	 dataIndex:'remark', width:280,filtable:true,style: "text-align:center;",align: 'left'},
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
			fieldLabel: '同意/确定',
            id:'radioFlowAgree',
           	width:300,
            inputValue:'agree',
			name: 'result'
		},{
			xtype: 'radio',
			fieldLabel: '反对/取消',
            id:'radioFlowDisagree',
           	width:300,
            inputValue:'disagree',
			name: 'result'
		},{
            xtype:'textareafield',
            fieldLabel: '说明',
            name:'content'
        }]
    }]
});

var newInvestWin = Ext.create("Ext.window.Window", {
	resizeable: false,
	closeAction: "hide",
	closable: false,
	id: 'newInvestWin',
	title: '打款',
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
            name:'file'
        },{
            xtype:'textareafield',
            fieldLabel: '补充说明',
            name:'content'
        }]
    }]
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
		url: '/ts/index.php/proj/view?c=1',
        noCache: false,
		reader:	{
			type: 'json',
			root: 'data'
		}
	},
    autoLoad:true
});


var projGrid=Ext.create('searchPanel', {
			store: projAllStore,
			border:0,
			columnLines: true,
			//title: '&nbsp;&nbsp;<b>&gt;&gt;&nbsp;固定收益产品&nbsp;&lt;&lt;</b> -- 点击折叠',
			columns: 	[{
				xtype: 'actioncolumn',
				width: 80,
				style: "text-align:center;",
				align: 'center',
                text:'选择此产品',
				sortable: false,
				stopSelection: false,
				items: [{
					icon: '/ts/misc/resources/icons/cog_16.png',
					tooltip: '选择此产品',
					handler: function(grid, rowIndex, colIndex) {
						//sampleStore.removeAt(rowIndex);
						Ext.getCmp('fieldProjName').setValue(grid.getStore().getAt(rowIndex).get("name"));
						Ext.getCmp('fieldProjID').setValue(grid.getStore().getAt(rowIndex).get("proj_id"));
						Ext.getCmp('editfieldProjName').setValue(grid.getStore().getAt(rowIndex).get("name"));
						Ext.getCmp('editfieldProjID').setValue(grid.getStore().getAt(rowIndex).get("proj_id"));
						grid.up('window').close();
					}
				}]
			},{
		text:'proj_id', dataIndex:'id', filterable:true, width:100,hidden:true
	}, {
		text:'产品信息',columns:[
		{
			text:'产品等级', dataIndex:'grade', filterable:true,sortable : true, width:96,style: "text-align:center;",menuDisabled:true,align: 'center', renderer: function(value) { 
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
}
		}, {
			text:'类别', dataIndex:'sub_category', filterable:true,sortable : true, width:180,style: "text-align:center;",menuDisabled:true,align: 'left'
		}, {
			text:'发行方', dataIndex:'issue', filterable:true,sortable : true, width:116,style: "text-align:center;",menuDisabled:true,align: 'center'
		}, {
			text:'产品名称', dataIndex:'name', filterable:true,sortable : true, width:240,style: "text-align:center;",menuDisabled:true,align: 'left', 
             renderer:function(value,metaData,record,rowIndex,colIndex,store,view) { 
           		metaData.tdAttr = 'data-qtip="'+value+'"'; 
                 return '<table><tr><td style="height:22px;vertical-align:middle"><b>'+value+'</b></td><tr></table>';
            }
		}, {
			xtype: 'actioncolumn',
			width:60,style: "text-align:center;",align: 'center', menuDisabled:true,
			sortable: false,
			items: [{
				icon: '/ts/misc/resources/icons/magnifying_glass_16.png',
				tooltip: '查看该产品的详细信息',
				handler: function(grid, rowIndex, colIndex) {
					//e=Ext.getCmp('projPanel');
					//e.proj_id=grid.getStore().getAt(rowIndex).get("proj_id");
					//e.setTitle(grid.getStore().getAt(rowIndex).get("issue")+" "+grid.getStore().getAt(rowIndex).get("name"))
					//Ext.getCmp('topInfo').getLayout().setActiveItem(2);
                    var proj_id=grid.getStore().getAt(rowIndex).get("proj_id");
					window.open('/ts/index.php/proj?proj_id='+proj_id);
				}
          }]
        }]
	}, {
		text:'认购信息',columns:[
			{
             text:'起购金额', dataIndex:'min_amount', filterable:true,sortable : true, width:100,style: "text-align:center;",menuDisabled:true,align: 'center',
             renderer:function(value,metaData,record,rowIndex,colIndex,store,view) { 
                 return value+'万元';
             }
            },            {
             text:'期限', dataIndex:'min_month', filterable:true,sortable : true, width:120,style: "text-align:center;",menuDisabled:true,align: 'center',
             renderer:function(value,metaData,record,rowIndex,colIndex,store,view) { 
                 if(record.get("min_month")==record.get("max_month")) {
                 	return record.get("min_month")+"个月"
                 } else {
                    return record.get("min_month")+"～"+record.get("max_month")+"个月"
                 }
             }
            },
            {text:'收益', dataIndex:'min_profit', filterable:true,sortable : true, width:120,style: "text-align:center;",menuDisabled:true,align: 'center', 
             renderer:function(value,metaData,record,rowIndex,colIndex,store,view) { 
                 if(record.get("min_profit")==record.get("max_profit")) {
                 	return record.get("min_profit")+"%"
                 } else {
                    return record.get("min_profit")+"%～"+record.get("max_profit")+"%"
                 }
             }
            }]
	}, {
		text:'附加信息',columns:[
		{
			text:'产品董事', dataIndex:'proj_director', filterable:true,sortable : true, width:86, style: "text-align:center;",menuDisabled:true,align: 'center'
		}, {
			text:'产品经理', dataIndex:'manager', filterable:true,sortable : true, width:86, style: "text-align:center;",menuDisabled:true,align: 'center'
		}, {
			text:'添加时间',dataIndex:'create_ts',filterable:true,sortable : true, width:116, style: "text-align:center;",menuDisabled:true,align: 'center',renderer:new Ext.util.Format.dateRenderer("Y-m-d")
		}]
	}],
			viewConfig: {
				stripeRows: true,
				forceFit:true,
				sortAscText:'正序',
				sortDescText:'降序'//,
				//getRowClass: function(record,rowIndex,rowParams,store){
				//	var sumVal=0;
				//	for (var i=0;i<rowIndex;i++) {
				//		if(store.getAt(i+1).data.name!=store.getAt(i).data.name){
				//			sumVal++;
				//		}
				//	}
				//	return (sumVal%2==0) ? 'style_row_proj0':'style_row_proj1';
				//}
			},
			loadMask: true,
			emptyText: '没有匹配的记录',
            listeners:{
                celldblclick:function(grid,td,cellIndex,record,tr,rowIndex){
					Ext.getCmp('fieldProjName').setValue(grid.getStore().getAt(rowIndex).get("name"));
					Ext.getCmp('fieldProjID').setValue(grid.getStore().getAt(rowIndex).get("proj_id"));
					Ext.getCmp('editfieldProjName').setValue(grid.getStore().getAt(rowIndex).get("name"));
					Ext.getCmp('editfieldProjID').setValue(grid.getStore().getAt(rowIndex).get("proj_id"));
					grid.up('window').close();
                }
            }
        });


		projGrid.child('toolbar').add([{
				text: '切换至已结束项目',
                id:'btnEndProj',
                handler:function(){
                projAllStore.setProxy({
					type: 'ajax',
					url: '/ts/index.php/proj/view?c=1&e=1',
                    noCache: false,
					reader:	{
						type: 'json',
						root: 'data'
					}
				});
                Ext.getCmp('btnIngProj').show();
                Ext.getCmp('btnEndProj').hide();
                projAllStore.load();
                }
			},{
				text: '切换至在售项目',
                id: 'btnIngProj',
                hidden:true,
                handler:function(){
                projAllStore.setProxy({
					type: 'ajax',
					url: '/ts/index.php/proj/view?c=1',
                    noCache: false,
					reader:	{
						type: 'json',
						root: 'data'
					}
				});
                Ext.getCmp('btnEndProj').show();
                Ext.getCmp('btnIngProj').hide();
                projAllStore.load();
                }
			}]);
	var projWin = Ext.create('Ext.window.Window', {
		resizeable: false,
		closeAction: "hide",
        id:'projWin',
		title: '选择产品',
		titleAlign: 'center',
    maximized:true,
		width: 870,
		height: 500,
		layout: 'fit',
		items: projGrid
    });
	var comode = 0;
	var corecentMode = 'null';
	var coendMode = 0;
	var coFSCChannel = 'null';
	var coPStart = '';
	var coPEnd = '';
	var colastFollow = '';
	var csrCorpListStore = Ext.create('Ext.data.JsonStore', {
		fields: [{
			name: 'csr_corp_id',
			type: 'int'
		},
		{
			name: 'csr_corp_cat'
		},
		{
			name: 'csr_corp_cat_reason'
		},
		{
			name: 'csr_corp_name'
		},
		{
			name: 'csr_corp_bname'
		},
		{
			name: 'csr_corp_industry'
		},
		{
			name: 'csr_corp_addr_reg'
		},
		{
			name: 'csr_corp_addr_main'
		},
		{
			name: 'csr_corp_regcpt'
		},
		{
			name: 'csr_corp_biz'
		},
		{
			name: 'csr_corp_web'
		},
		{
			name: 'csr_corp_plusinfo'
		},
		{
			name: 'csr_corp_director'
		},
		{
			name: 'csr_corp_legalperson'
		},
		{
			name: 'csr_corp_CEO'
		},
		{
			name: 'csr_corp_manager'
		},
		{
			name: 'csr_corp_contact1_name'
		},
		{
			name: 'csr_corp_contact1_title'
		},
		{
			name: 'csr_corp_contact1_phone'
		},
		{
			name: 'csr_corp_contact1_email'
		},
		{
			name: 'csr_corp_contact1_CV'
		},
		{
			name: 'csr_corp_contact2_name'
		},
		{
			name: 'csr_corp_contact2_title'
		},
		{
			name: 'csr_corp_contact2_phone'
		},
		{
			name: 'csr_corp_contact2_email'
		},
		{
			name: 'csr_corp_contact2_CV'
		},
		{
			name: 'csr_corp_contact3_name'
		},
		{
			name: 'csr_corp_contact3_title'
		},
		{
			name: 'csr_corp_contact3_phone'
		},
		{
			name: 'csr_corp_contact3_email'
		},
		{
			name: 'csr_corp_contact3_CV'
		},
		{
			name: 'csr_corp_yearly_amount'
		},
		{
			name: 'csr_corp_FP_no'
		},
		{
			name: 'csr_corp_branch_no'
		},
		{
			name: 'csr_corp_biz_style'
		},
		{
			name: 'csr_corp_biz_dir_percent'
		},
		{
			name: 'csr_corp_biz_type'
		},
		{
			name: 'csr_corp_biz_partner'
		},
		{
			name: 'csr_corp_biz_plusinfo'
		},
		{
			name: 'csr_corp_yearly_issue'
		},
		{
			name: 'csr_corp_IP_no'
		},
		{
			name: 'csr_corp_inv_style'
		},
		{
			name: 'csr_corp_inv_chtype'
		},
		{
			name: 'csr_corp_inv_case'
		},
		{
			name: 'csr_corp_inv_plusinfo'
		},
		{
			name: 'csr_corp_coop_partner'
		},
		{
			name: 'csr_corp_coop_FSC_dir'
		},
		{
			name: 'csr_corp_coop_FSC_wish'
		},
		{
			name: 'csr_corp_follow'
		},
		{
			name: 'csr_corp_FSC_channel'
		},
		{
			name: 'csr_corp_FSC_pdt'
		},
		{
			name: 'csr_corp_FSC_follow_status'
		},
		{
			name: 'csr_corp_FSC_opp_and_prob'
		},
		{
			name: 'csr_corp_FSC_solution'
		},
		{
			name: 'csr_corp_follow_creator'
		},
		{
			name: 'csr_corp_follow_update_ts',
			dateFormat: "Y-m-d H:i:s"
		},
		{
			name: 'csr_corp_creator'
		},
		{
			name: 'csr_corp_create_ts',
			dateFormat: "Y-m-d H:i:s"
		},
		{
			name: 'csr_corp_editor'
		},
		{
			name: 'csr_corp_update_ts',
			dateFormat: "Y-m-d H:i:s"
		}],
		pageSize: 100,
		remoteSort: true,
		autoLoad: true,
		leadingBufferZone: 100,
		buffered: true,
		//    sorters:[{property:'csr_corp_id',direction:'ASC'}],
		extraParams: {
			total: 50000
		},
		proxy: {
			type: 'ajax',
			url: '/ts/index.php/csr_corp/view',
            noCache: false,
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
		},
        listeners: {
            totalcountchange: function(){
                Ext.getCmp('csrCorpWin').down('component#status').update({count: csrCorpListStore.getTotalCount()});
			}
		}
	});

	var csrCorpWin = Ext.create('Ext.window.Window', {
		resizeable: false,
		closeAction: "hide",
        id:'csrCorpWin',
		title: '选择经纪机构',
		titleAlign: 'center',
    maximized:true,
		width: 870,
		height: 500,
		layout: 'fit',
		items: [{
			xtype: 'grid',
			id: 'csr_corp_list',
			store: csrCorpListStore,
			border: 0,
			columnLines: true,
			//title: '渠道客户',
			verticalScroller: {
				xtype: 'paginggridscroller'
			},
			selModel: {
				pruneRemoved: false
			},
			features: [{
				ftype: 'grouping',
				hideGroupedHeader: false
			}],
			viewConfig: {
				trackOver: false
			},
			multiSelect: true,
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				height: 48,
				enableOverflow: true,
				padding: 3,
				items: [{
					width: 400,
					fieldLabel: '查找',
					labelWidth: 50,
					xtype: 'searchfield',
					store: csrCorpListStore
				},
				{
					xtype: 'component',
					itemId: 'status',
					tpl: '<span style="font-size:16px">记录数: <b>{count}</b>。</span>可搜索项目名称，供应商名称，供应商联系人。',
					style: 'margin-left:10px;margin-right:10px'
				}]
			},
			{
				xtype: 'toolbar',
				id: 'csr_corp_list_topbar',
				dock: 'top',
				height: 48,
				items: [{
					xtype: 'tbtext',
					text: '客户类别筛选：'
				},
				{
					xtype: 'cycle',
					showText: true,
					menu: {
						items: [{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '所有客户'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '目标客户'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '潜在客户'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '意向客户'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '成交客户'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '未标明客户类别的客户'
						}]
					},
					changeHandler: function(cycleBtn, activeItem) {
						if (activeItem.text == '目标客户') {
							catMode = 'lv1';
						} else if (activeItem.text == '潜在客户') {
							catMode = 'lv2';
						} else if (activeItem.text == '意向客户') {
							catMode = 'lv3';
						} else if (activeItem.text == '成交客户') {
							catMode = 'lv4';
						} else if (activeItem.text == '未标明客户类别的客户') {
							catMode = 'lv0';
						} else if (activeItem.text == '所有客户') {
							catMode = 'all';
						}
						csrCorpListStore.setProxy({
							type: 'ajax',
							url: '/ts/index.php/csr_corp/view?mode=' + comode + '&recentMode=' + corecentMode +'&FSCChannel=' + encodeURI(coFSCChannel) + '&PStart=' + coPStart + '&PEnd=' + coPEnd + '&lastFollow=' + encodeURI(colastFollow),
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
						csrCorpListStore.load();
					}
				},
				{
					xtype: 'tbtext',
					text: '跟进结果筛选：'
				},
				{
					xtype: 'cycle',
					showText: true,
					menu: {
						items: [{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '所有跟进结果'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '还未跟进'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '实施面谈'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '成功约见'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '接通但未约见'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '仅成功接通'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '未找到人'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '接通但人很忙'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '无人接听'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '小秘书'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '挂断'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '放弃'
						}]
					},
					changeHandler: function(cycleBtn, activeItem) {
						if (activeItem.text == '所有跟进结果') {
							colastFollow = '';
						} else if (activeItem.text == '还未跟进') {
							colastFollow = 'not_follow';
						} else {
							colastFollow = activeItem.text;
						}
						csrCorpListStore.setProxy({
							type: 'ajax',
							url: '/ts/index.php/csr_corp/view?mode=' + comode + '&recentMode=' + corecentMode +'&FSCChannel=' + encodeURI(coFSCChannel) + '&PStart=' + coPStart + '&PEnd=' + coPEnd + '&lastFollow=' + encodeURI(colastFollow),
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
						csrCorpListStore.load();
					}
				},
				{
					xtype: 'tbtext',
					text: '跟进时间筛选：'
				},
				{
					xtype: 'cycle',
					showText: true,
					menu: {
						items: [
						// these will render as dropdown menu items when the arrow is clicked:
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '所有记录'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '最近7天跟进'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '最近30天跟进'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '最近7天未跟进'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '最近30天未跟进'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '没有跟进记录'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '高级'
						}]
					},
					changeHandler: function(cycleBtn, activeItem) {
						if (activeItem.text != '高级') {
							var PStartChoose = Ext.getCmp('csrCorpPStartChoose');
							if (PStartChoose != undefined) {
								PStartChoose.hide();
								PStartChoose.reset();
								coPStart = '';
							}
							var PEndChoose = Ext.getCmp('csrCorpPEndChoose');
							if (PEndChoose != undefined) {
								PEndChoose.hide();
								PEndChoose.reset();
								coPEnd = '';
							}
							if (activeItem.text == '所有记录') {
								corecentMode = 'null';
							} else if (activeItem.text == '最近7天跟进') {
								corecentMode = 'lt7';
							} else if (activeItem.text == '最近7天未跟进') {
								corecentMode = 'gt7';
							} else if (activeItem.text == '最近30天跟进') {
								corecentMode = 'lt30';
							} else if (activeItem.text == '最近30天未跟进') {
								corecentMode = 'gt30';
							} else if (activeItem.text == '没有跟进记录') {
								corecentMode = 'nofollow';
							}
							csrCorpListStore.setProxy({
								type: 'ajax',
							url: '/ts/index.php/csr_corp/view?mode=' + comode + '&recentMode=' + corecentMode +'&FSCChannel=' + encodeURI(coFSCChannel) + '&PStart=' + coPStart + '&PEnd=' + coPEnd + '&lastFollow=' + encodeURI(colastFollow),
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
							csrCorpListStore.load();
						} else {
							Ext.getCmp('csrCorpPStartChoose').show();
							Ext.getCmp('csrCorpPStartChoose').reset();
							PStart = '';
							Ext.getCmp('csrCorpPEndChoose').show();
							Ext.getCmp('csrCorpPEndChoose').reset();
							PEnd = '';
						}
					}
				},
				{
					id: 'csrCorpPStartChoose',
					hidden: true,
					xtype: 'datefield',
					width: 120,
					name: 'PStart',
					maxValue: new Date(),
					format: 'Y-m-d',
					listeners: {
						change: function(me, newValue, oldValue) {
							coPStart = ((newValue.getYear() < 1900) ? (1900 + newValue.getYear()) : newValue.getYear()) + "-" + (newValue.getMonth() + 1) + "-" + newValue.getDate();
							if (coPStart != '' && coPEnd != '') {
								csrCorpListStore.setProxy({
									type: 'ajax',
							url: '/ts/index.php/csr_corp/view?mode=' + comode + '&recentMode=' + corecentMode +'&FSCChannel=' + encodeURI(coFSCChannel) + '&PStart=' + coPStart + '&PEnd=' + coPEnd + '&lastFollow=' + encodeURI(colastFollow),
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
								csrCorpListStore.load();
							}
						}
					}
				},
				{
					xtype: 'tbtext',
					text: ' - '
				},
				{
					id: 'csrCorpPEndChoose',
					hidden: true,
					xtype: 'datefield',
					width: 120,
					name: 'PEnd',
					maxValue: new Date(),
					format: 'Y-m-d',
					listeners: {
						change: function(me, newValue, oldValue) {
							coPEnd = ((newValue.getYear() < 1900) ? (1900 + newValue.getYear()) : newValue.getYear()) + "-" + (newValue.getMonth() + 1) + "-" + newValue.getDate();
							if (coPStart != '' && coPEnd != '') {
								csrCorpListStore.setProxy({
									type: 'ajax',
							url: '/ts/index.php/csr_corp/view?mode=' + comode + '&recentMode=' + corecentMode +'&FSCChannel=' + encodeURI(coFSCChannel) + '&PStart=' + coPStart + '&PEnd=' + coPEnd + '&lastFollow=' + encodeURI(colastFollow),
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
								csrCorpListStore.load();
							}
						}
					}
				}]
			}],
			columns: [{
				xtype: 'actioncolumn',
				width: 80,
				style: "text-align:center;",
				align: 'center',
				sortable: false,
				stopSelection: false,
				items: [{
					icon: '/ts/misc/resources/icons/cog_16.png',
					tooltip: '选择此客户',
					handler: function(grid, rowIndex, colIndex) {
						//sampleStore.removeAt(rowIndex);
						Ext.getCmp('fieldcsrCorpName').setValue(grid.getStore().getAt(rowIndex).get("csr_corp_name"));
						Ext.getCmp('fieldcsrCorpID').setValue(grid.getStore().getAt(rowIndex).get("csr_corp_id"));
						Ext.getCmp('editfieldcsrCorpName').setValue(grid.getStore().getAt(rowIndex).get("csr_corp_name"));
						Ext.getCmp('editfieldcsrCorpID').setValue(grid.getStore().getAt(rowIndex).get("csr_corp_id"));
						grid.up('window').close();
					}
				}]
			},
			{
				dataIndex: 'csr_corp_cat',
				text: '客户类别',
				filtable: true,
				style: "text-align:center;",
				align: 'center',
				width: 120
			},
			{
				dataIndex: '',
				text: '大区',
				filtable: true,
				style: "text-align:center;",
				align: 'center',
				width: 80
			},
			{
				dataIndex: 'csr_corp_name',
				text: '公司名称',
				filtable: true,
				style: "text-align:center;",
				align: 'center',
				width: 180
			},
			{
				dataIndex: 'csr_corp_industry',
				text: '公司行业',
				filtable: true,
				style: "text-align:center;",
				align: 'center',
				width: 120
			},
			{
				dataIndex: 'csr_corp_web',
				text: '公司网址',
				filtable: true,
				style: "text-align:center;",
				align: 'center',
				width: 210,
				renderer: function(value, metaData, record, colIndex, store, view) {
					if (value.indexOf('http://') > 0) {
						return '<a href=\'' + value + '\' target=\'_blank\'>' + value + '</a>';
					} else {
						return '<a href=\'http://' + value + '\' target=\'_blank\'>' + value + '</a>';
					}
				}
			}],
			viewConfig: {
				stripeRows: true,
				forceFit: true,
				sortAscText: '正序',
				sortDescText: '降序'
			},
			loadMask: true,
			emptyText: '没有匹配的记录',
            listeners:{
                celldblclick:function(grid,td,cellIndex,record,tr,rowIndex){
						//sampleStore.removeAt(rowIndex);
						Ext.getCmp('fieldcsrCorpName').setValue(grid.getStore().getAt(rowIndex).get("csr_corp_name"));
						Ext.getCmp('fieldcsrCorpID').setValue(grid.getStore().getAt(rowIndex).get("csr_corp_id"));
						Ext.getCmp('editfieldcsrCorpName').setValue(grid.getStore().getAt(rowIndex).get("csr_corp_name"));
						Ext.getCmp('editfieldcsrCorpID').setValue(grid.getStore().getAt(rowIndex).get("csr_corp_id"));
					grid.up('window').close();
                }
            }
		}]
	});

	var cofmmode = 0;
	var cofmrecentMode = 'null';
	var cofmendMode = 0;
	var cofmFSCChannel = 'null';
	var cofmPStart = '';
	var cofmPEnd = '';
	var cofmlastFollow = '';
	var csrFmCorpListStore = Ext.create('Ext.data.JsonStore', {
		fields: [{
			name: 'csr_fm_corp_id',
			type: 'int'
		},
		{
			name: 'csr_fm_corp_cat'
		},
		{
			name: 'csr_fm_corp_cat_reason'
		},
		{
			name: 'csr_fm_corp_name'
		},
		{
			name: 'csr_fm_corp_bname'
		},
		{
			name: 'csr_fm_corp_industry'
		},
		{
			name: 'csr_fm_corp_addr_reg'
		},
		{
			name: 'csr_fm_corp_addr_main'
		},
		{
			name: 'csr_fm_corp_regcpt'
		},
		{
			name: 'csr_fm_corp_biz'
		},
		{
			name: 'csr_fm_corp_web'
		},
		{
			name: 'csr_fm_corp_plusinfo'
		},
		{
			name: 'csr_fm_corp_director'
		},
		{
			name: 'csr_fm_corp_legalperson'
		},
		{
			name: 'csr_fm_corp_CEO'
		},
		{
			name: 'csr_fm_corp_manager'
		},
		{
			name: 'csr_fm_corp_contact1_name'
		},
		{
			name: 'csr_fm_corp_contact1_title'
		},
		{
			name: 'csr_fm_corp_contact1_phone'
		},
		{
			name: 'csr_fm_corp_contact1_email'
		},
		{
			name: 'csr_fm_corp_contact1_CV'
		},
		{
			name: 'csr_fm_corp_contact2_name'
		},
		{
			name: 'csr_fm_corp_contact2_title'
		},
		{
			name: 'csr_fm_corp_contact2_phone'
		},
		{
			name: 'csr_fm_corp_contact2_email'
		},
		{
			name: 'csr_fm_corp_contact2_CV'
		},
		{
			name: 'csr_fm_corp_contact3_name'
		},
		{
			name: 'csr_fm_corp_contact3_title'
		},
		{
			name: 'csr_fm_corp_contact3_phone'
		},
		{
			name: 'csr_fm_corp_contact3_email'
		},
		{
			name: 'csr_fm_corp_contact3_CV'
		},
		{
			name: 'csr_fm_corp_yearly_amount'
		},
		{
			name: 'csr_fm_corp_FP_no'
		},
		{
			name: 'csr_fm_corp_branch_no'
		},
		{
			name: 'csr_fm_corp_biz_style'
		},
		{
			name: 'csr_fm_corp_biz_dir_percent'
		},
		{
			name: 'csr_fm_corp_biz_type'
		},
		{
			name: 'csr_fm_corp_biz_partner'
		},
		{
			name: 'csr_fm_corp_biz_plusinfo'
		},
		{
			name: 'csr_fm_corp_yearly_issue'
		},
		{
			name: 'csr_fm_corp_IP_no'
		},
		{
			name: 'csr_fm_corp_inv_style'
		},
		{
			name: 'csr_fm_corp_inv_chtype'
		},
		{
			name: 'csr_fm_corp_inv_case'
		},
		{
			name: 'csr_fm_corp_inv_plusinfo'
		},
		{
			name: 'csr_fm_corp_coop_partner'
		},
		{
			name: 'csr_fm_corp_coop_FSC_dir'
		},
		{
			name: 'csr_fm_corp_coop_FSC_wish'
		},
		{
			name: 'csr_fm_corp_follow'
		},
		{
			name: 'csr_fm_corp_FSC_channel'
		},
		{
			name: 'csr_fm_corp_FSC_pdt'
		},
		{
			name: 'csr_fm_corp_FSC_follow_status'
		},
		{
			name: 'csr_fm_corp_FSC_opp_and_prob'
		},
		{
			name: 'csr_fm_corp_FSC_solution'
		},
		{
			name: 'csr_fm_corp_follow_creator'
		},
		{
			name: 'csr_fm_corp_follow_update_ts',
			dateFormat: "Y-m-d H:i:s"
		},
		{
			name: 'csr_fm_corp_creator'
		},
		{
			name: 'csr_fm_corp_create_ts',
			dateFormat: "Y-m-d H:i:s"
		},
		{
			name: 'csr_fm_corp_editor'
		},
		{
			name: 'csr_fm_corp_update_ts',
			dateFormat: "Y-m-d H:i:s"
		}],
		pageSize: 100,
		remoteSort: true,
		autoLoad: true,
		leadingBufferZone: 100,
		buffered: true,
		//    sorters:[{property:'csr_fm_corp_id',direction:'ASC'}],
		extraParams: {
			total: 50000
		},
		proxy: {
			type: 'ajax',
			url: '/ts/index.php/csr_fm_corp/view',
            noCache: false,
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
		},
        listeners: {
            totalcountchange: function(){
                Ext.getCmp('csrFmCorpWin').down('component#status').update({count: csrFmCorpListStore.getTotalCount()});
			}
		}
    });
	var csrFmCorpWin = Ext.create('Ext.window.Window', {
		resizeable: false,
		closeAction: "hide",
        id:'csrFmCorpWin',
		title: '选择机构客户',
		titleAlign: 'center',
    maximized:true,
		width: 870,
		height: 500,
		layout: 'fit',
		items: [{
			xtype: 'grid',
			id: 'csr_fm_corp_list',
			store: csrFmCorpListStore,
			border: 0,
			columnLines: true,
			//title: '渠道客户',
			verticalScroller: {
				xtype: 'paginggridscroller'
			},
			selModel: {
				pruneRemoved: false
			},
			features: [{
				ftype: 'grouping',
				hideGroupedHeader: false
			}],
			viewConfig: {
				trackOver: false
			},
			multiSelect: true,
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				height: 48,
				enableOverflow: true,
				padding: 3,
				items: [{
					width: 400,
					fieldLabel: '查找',
					labelWidth: 50,
					xtype: 'searchfield',
					store: csrFmCorpListStore
				},
				{
					xtype: 'component',
					itemId: 'status',
					tpl: '<span style="font-size:16px">记录数: <b>{count}</b>。</span>可搜索项目名称，供应商名称，供应商联系人。',
					style: 'margin-left:10px;margin-right:10px'
				}]
			},
			{
				xtype: 'toolbar',
				id: 'csr_fm_corp_list_topbar',
				dock: 'top',
				height: 48,
				items: [{
					xtype: 'tbtext',
					text: '客户类别筛选：'
				},
				{
					xtype: 'cycle',
					showText: true,
					menu: {
						items: [{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '所有客户'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '目标客户'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '潜在客户'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '意向客户'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '成交客户'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '未标明客户类别的客户'
						}]
					},
					changeHandler: function(cycleBtn, activeItem) {
						if (activeItem.text == '目标客户') {
							catMode = 'lv1';
						} else if (activeItem.text == '潜在客户') {
							catMode = 'lv2';
						} else if (activeItem.text == '意向客户') {
							catMode = 'lv3';
						} else if (activeItem.text == '成交客户') {
							catMode = 'lv4';
						} else if (activeItem.text == '未标明客户类别的客户') {
							catMode = 'lv0';
						} else if (activeItem.text == '所有客户') {
							catMode = 'all';
						}
						csrFmCorpListStore.setProxy({
							type: 'ajax',
							url: '/ts/index.php/csr_fm_corp/view?mode=' + cofmmode + '&recentMode=' + cofmrecentMode +'&FSCChannel=' + encodeURI(cofmFSCChannel) + '&PStart=' + cofmPStart + '&PEnd=' + cofmPEnd + '&lastFollow=' + encodeURI(cofmlastFollow),
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
						csrFmCorpListStore.load();
					}
				},
				{
					xtype: 'tbtext',
					text: '跟进结果筛选：'
				},
				{
					xtype: 'cycle',
					showText: true,
					menu: {
						items: [{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '所有跟进结果'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '还未跟进'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '实施面谈'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '成功约见'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '接通但未约见'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '仅成功接通'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '未找到人'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '接通但人很忙'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '无人接听'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '小秘书'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '挂断'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '放弃'
						}]
					},
					changeHandler: function(cycleBtn, activeItem) {
						if (activeItem.text == '所有跟进结果') {
							lastFollow = '';
						} else if (activeItem.text == '还未跟进') {
							lastFollow = 'not_follow';
						} else {
							lastFollow = activeItem.text;
						}
						csrFmCorpListStore.setProxy({
							type: 'ajax',
							url: '/ts/index.php/csr_fm_corp/view?mode=' + cofmmode + '&recentMode=' + cofmrecentMode +'&FSCChannel=' + encodeURI(cofmFSCChannel) + '&PStart=' + cofmPStart + '&PEnd=' + cofmPEnd + '&lastFollow=' + encodeURI(cofmlastFollow),
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
						csrFmCorpListStore.load();
					}
				},
				{
					xtype: 'tbtext',
					text: '跟进时间筛选：'
				},
				{
					xtype: 'cycle',
					showText: true,
					menu: {
						items: [
						// these will render as dropdown menu items when the arrow is clicked:
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '所有记录'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '最近7天跟进'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '最近30天跟进'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '最近7天未跟进'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '最近30天未跟进'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '没有跟进记录'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '高级'
						}]
					},
					changeHandler: function(cycleBtn, activeItem) {
						if (activeItem.text != '高级') {
							var PStartChoose = Ext.getCmp('csrFmCorpPStartChoose');
							if (PStartChoose != undefined) {
								PStartChoose.hide();
								PStartChoose.reset();
								PStart = '';
							}
							var PEndChoose = Ext.getCmp('csrFmCorpPEndChoose');
							if (PEndChoose != undefined) {
								PEndChoose.hide();
								PEndChoose.reset();
								PEnd = '';
							}
							if (activeItem.text == '所有记录') {
								recentMode = 'null';
							} else if (activeItem.text == '最近7天跟进') {
								recentMode = 'lt7';
							} else if (activeItem.text == '最近7天未跟进') {
								recentMode = 'gt7';
							} else if (activeItem.text == '最近30天跟进') {
								recentMode = 'lt30';
							} else if (activeItem.text == '最近30天未跟进') {
								recentMode = 'gt30';
							} else if (activeItem.text == '没有跟进记录') {
								recentMode = 'nofollow';
							}
							csrFmCorpListStore.setProxy({
								type: 'ajax',
							url: '/ts/index.php/csr_fm_corp/view?mode=' + cofmmode + '&recentMode=' + cofmrecentMode +'&FSCChannel=' + encodeURI(cofmFSCChannel) + '&PStart=' + cofmPStart + '&PEnd=' + cofmPEnd + '&lastFollow=' + encodeURI(cofmlastFollow),
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
							csrFmCorpListStore.load();
						} else {
							Ext.getCmp('csrFmCorpPStartChoose').show();
							Ext.getCmp('csrFmCorpPStartChoose').reset();
							PStart = '';
							Ext.getCmp('csrFmCorpPEndChoose').show();
							Ext.getCmp('csrFmCorpPEndChoose').reset();
							PEnd = '';
						}
					}
				},
				{
					id: 'csrFmCorpPStartChoose',
					hidden: true,
					xtype: 'datefield',
					width: 120,
					name: 'PStart',
					maxValue: new Date(),
					format: 'Y-m-d',
					listeners: {
						change: function(me, newValue, oldValue) {
							PStart = ((newValue.getYear() < 1900) ? (1900 + newValue.getYear()) : newValue.getYear()) + "-" + (newValue.getMonth() + 1) + "-" + newValue.getDate();
							if (PStart != '' && PEnd != '') {
								csrFmCorpListStore.setProxy({
									type: 'ajax',
							url: '/ts/index.php/csr_fm_corp/view?mode=' + cofmmode + '&recentMode=' + cofmrecentMode +'&FSCChannel=' + encodeURI(cofmFSCChannel) + '&PStart=' + cofmPStart + '&PEnd=' + cofmPEnd + '&lastFollow=' + encodeURI(cofmlastFollow),
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
								csrFmCorpListStore.load();
							}
						}
					}
				},
				{
					xtype: 'tbtext',
					text: ' - '
				},
				{
					id: 'csrFmCorpPEndChoose',
					hidden: true,
					xtype: 'datefield',
					width: 120,
					name: 'PEnd',
					maxValue: new Date(),
					format: 'Y-m-d',
					listeners: {
						change: function(me, newValue, oldValue) {
							PEnd = ((newValue.getYear() < 1900) ? (1900 + newValue.getYear()) : newValue.getYear()) + "-" + (newValue.getMonth() + 1) + "-" + newValue.getDate();
							if (PStart != '' && PEnd != '') {
								csrFmCorpListStore.setProxy({
									type: 'ajax',
							url: '/ts/index.php/csr_fm_corp/view?mode=' + cofmmode + '&recentMode=' + cofmrecentMode +'&FSCChannel=' + encodeURI(cofmFSCChannel) + '&PStart=' + cofmPStart + '&PEnd=' + cofmPEnd + '&lastFollow=' + encodeURI(cofmlastFollow),
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
								csrFmCorpListStore.load();
							}
						}
					}
				}]
			}],
			columns: [{
				xtype: 'actioncolumn',
				width: 80,
				style: "text-align:center;",
				align: 'center',
				sortable: false,
				stopSelection: false,
				items: [{
					icon: '/ts/misc/resources/icons/cog_16.png',
					tooltip: '选择此客户',
					handler: function(grid, rowIndex, colIndex) {
						//sampleStore.removeAt(rowIndex);
						Ext.getCmp('fieldcsrFmCorpName').setValue(grid.getStore().getAt(rowIndex).get("csr_fm_corp_name"));
						Ext.getCmp('fieldcsrFmCorpID').setValue(grid.getStore().getAt(rowIndex).get("csr_fm_corp_id"));
						Ext.getCmp('editfieldcsrFmCorpName').setValue(grid.getStore().getAt(rowIndex).get("csr_fm_corp_name"));
						Ext.getCmp('editfieldcsrFmCorpID').setValue(grid.getStore().getAt(rowIndex).get("csr_fm_corp_id"));
						grid.up('window').close();
					}
				}]
			},
			{
				dataIndex: 'csr_fm_corp_cat',
				text: '客户类别',
				filtable: true,
				style: "text-align:center;",
				align: 'center',
				width: 120
			},
			{
				dataIndex: '',
				text: '大区',
				filtable: true,
				style: "text-align:center;",
				align: 'center',
				width: 80
			},
			{
				dataIndex: 'csr_fm_corp_name',
				text: '公司名称',
				filtable: true,
				style: "text-align:center;",
				align: 'center',
				width: 180
			},
			{
				dataIndex: 'csr_fm_corp_industry',
				text: '公司行业',
				filtable: true,
				style: "text-align:center;",
				align: 'center',
				width: 120
			},
			{
				dataIndex: 'csr_fm_corp_web',
				text: '公司网址',
				filtable: true,
				style: "text-align:center;",
				align: 'center',
				width: 210,
				renderer: function(value, metaData, record, colIndex, store, view) {
					if (value.indexOf('http://') > 0) {
						return '<a href=\'' + value + '\' target=\'_blank\'>' + value + '</a>';
					} else {
						return '<a href=\'http://' + value + '\' target=\'_blank\'>' + value + '</a>';
					}
				}
			}],
			viewConfig: {
				stripeRows: true,
				forceFit: true,
				sortAscText: '正序',
				sortDescText: '降序'
			},
			loadMask: true,
			emptyText: '没有匹配的记录',
            listeners:{
                celldblclick:function(grid,td,cellIndex,record,tr,rowIndex){
						//sampleStore.removeAt(rowIndex);
						Ext.getCmp('fieldcsrFmCorpName').setValue(grid.getStore().getAt(rowIndex).get("csr_fm_corp_name"));
						Ext.getCmp('fieldcsrFmCorpID').setValue(grid.getStore().getAt(rowIndex).get("csr_fm_corp_id"));
						Ext.getCmp('editfieldcsrFmCorpName').setValue(grid.getStore().getAt(rowIndex).get("csr_fm_corp_name"));
						Ext.getCmp('editfieldcsrFmCorpID').setValue(grid.getStore().getAt(rowIndex).get("csr_fm_corp_id"));
					grid.up('window').close();
                }
            }
		}]
	});
	var psmode = 0;
	var psrecentMode = 'null';
	var psendMode = 0;
	var psFSCChannel = 'null';
	var psPStart = '';
	var psPEnd = '';
	var pslastFollow = '';
	var csrPersonListStore = Ext.create('Ext.data.JsonStore', {
		fields: [
		{name:'csr_person_id'},
		{name:'csr_person_cat'},
		{name:'csr_person_name'},
		{name:'csr_person_gender'},
		{name:'csr_person_age'},
		{name:'csr_person_telephone'},
		{name:'csr_person_mobile'},
		{name:'csr_person_qq'},
		{name:'csr_person_email'},
		{name:'csr_person_financial_pref'},
		{name:'csr_person_financial_demand'},
		{name:'csr_person_FSC_follow_status'},
		{name:'csr_person_FSC_follow_result'},
		{name:'csr_person_FSC_channel'},
		{name:'csr_person_creator'},
		{name:'csr_person_create_ts',type:'date',dateFormat:"Y-m-d H:i:s"	},
		{name:'csr_person_editor'},
		{name:'csr_person_update_ts',type:'date',dateFormat:"Y-m-d H:i:s"	},
		{name:'csr_person_follow_creator'},
		{name:'csr_person_follow_result'},
		{name:'csr_person_follow_update_ts',type:'date',dateFormat:"Y-m-d H:i:s"	}
		],
		pageSize: 100,
		remoteSort: true,
		autoLoad: true,
		leadingBufferZone: 100,
		buffered: true,
		//    sorters:[{property:'csr_person_id',direction:'ASC'}],
		extraParams: {
			total: 50000
		},
		proxy: {
			type: 'ajax',
			url: '/ts/index.php/csr_person/view',
            noCache: false,
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
		},
        listeners: {
            totalcountchange: function(){
                Ext.getCmp('csrPersonWin').down('component#status').update({count: csrPersonListStore.getTotalCount()});
			}
		}
	});
	var csrPersonWin = Ext.create('Ext.window.Window', {
		resizeable: false,
		closeAction: "hide",
        id:'csrPersonWin',
		title: '选择个人及家庭客户',
		titleAlign: 'center',
    maximized:true,
		width: 870,
		height: 500,
		layout: 'fit',
		items: [{
			xtype: 'grid',
			id: 'csr_person_list',
			store: csrPersonListStore,
			border: 0,
			columnLines: true,
			//title: '渠道客户',
			verticalScroller: {
				xtype: 'paginggridscroller'
			},
			selModel: {
				pruneRemoved: false
			},
			features: [{
				ftype: 'grouping',
				hideGroupedHeader: false
			}],
			viewConfig: {
				trackOver: false
			},
			multiSelect: true,
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				height: 48,
				enableOverflow: true,
				padding: 3,
				items: [{
					width: 400,
					fieldLabel: '查找',
					labelWidth: 50,
					xtype: 'searchfield',
					store: csrPersonListStore
				},
				{
					xtype: 'component',
					itemId: 'status',
					tpl: '<span style="font-size:16px">记录数: <b>{count}</b>。</span>可搜索客户姓名，电话，电子邮箱，QQ号，所在城市。',
					style: 'margin-left:10px;margin-right:10px'
				}]
			},
			{
				xtype: 'toolbar',
				id: 'csr_person_list_topbar',
				dock: 'top',
				height: 48,
				items: [{
					xtype: 'tbtext',
					text: '客户类别筛选：'
				},
				{
					xtype: 'cycle',
					showText: true,
					menu: {
						items: [{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '所有客户'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '目标客户'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '潜在客户'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '意向客户'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '成交客户'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '未标明客户类别的客户'
						}]
					},
					changeHandler: function(cycleBtn, activeItem) {
						if (activeItem.text == '目标客户') {
							catMode = 'lv1';
						} else if (activeItem.text == '潜在客户') {
							catMode = 'lv2';
						} else if (activeItem.text == '意向客户') {
							catMode = 'lv3';
						} else if (activeItem.text == '成交客户') {
							catMode = 'lv4';
						} else if (activeItem.text == '未标明客户类别的客户') {
							catMode = 'lv0';
						} else if (activeItem.text == '所有客户') {
							catMode = 'all';
						}
						csrPersonListStore.setProxy({
							type: 'ajax',
							url: '/ts/index.php/csr_person/view?mode=' + psmode + '&recentMode=' + psrecentMode +'&FSCChannel=' + encodeURI(psFSCChannel) + '&PStart=' + psPStart + '&PEnd=' + psPEnd + '&lastFollow=' + encodeURI(pslastFollow),
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
						csrPersonListStore.load();
					}
				},
				{
					xtype: 'tbtext',
					text: '跟进结果筛选：'
				},
				{
					xtype: 'cycle',
					showText: true,
					menu: {
						items: [{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '所有跟进结果'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '还未跟进'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '实施面谈'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '成功约见'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '接通但未约见'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '仅成功接通'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '未找到人'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '接通但人很忙'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '无人接听'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '小秘书'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '挂断'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '放弃'
						}]
					},
					changeHandler: function(cycleBtn, activeItem) {
						if (activeItem.text == '所有跟进结果') {
							lastFollow = '';
						} else if (activeItem.text == '还未跟进') {
							lastFollow = 'not_follow';
						} else {
							lastFollow = activeItem.text;
						}
						csrPersonListStore.setProxy({
							type: 'ajax',
							url: '/ts/index.php/csr_person/view?mode=' + psmode + '&recentMode=' + psrecentMode +'&FSCChannel=' + encodeURI(psFSCChannel) + '&PStart=' + psPStart + '&PEnd=' + psPEnd + '&lastFollow=' + encodeURI(pslastFollow),
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
						csrPersonListStore.load();
					}
				},
				{
					xtype: 'tbtext',
					text: '跟进时间筛选：'
				},
				{
					xtype: 'cycle',
					showText: true,
					menu: {
						items: [
						// these will render as dropdown menu items when the arrow is clicked:
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '所有记录'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '最近7天跟进'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '最近30天跟进'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '最近7天未跟进'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '最近30天未跟进'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '没有跟进记录'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '高级'
						}]
					},
					changeHandler: function(cycleBtn, activeItem) {
						if (activeItem.text != '高级') {
							var PStartChoose = Ext.getCmp('csrPersonPStartChoose');
							if (PStartChoose != undefined) {
								PStartChoose.hide();
								PStartChoose.reset();
								PStart = '';
							}
							var PEndChoose = Ext.getCmp('csrPersonPEndChoose');
							if (PEndChoose != undefined) {
								PEndChoose.hide();
								PEndChoose.reset();
								PEnd = '';
							}
							if (activeItem.text == '所有记录') {
								recentMode = 'null';
							} else if (activeItem.text == '最近7天跟进') {
								recentMode = 'lt7';
							} else if (activeItem.text == '最近7天未跟进') {
								recentMode = 'gt7';
							} else if (activeItem.text == '最近30天跟进') {
								recentMode = 'lt30';
							} else if (activeItem.text == '最近30天未跟进') {
								recentMode = 'gt30';
							} else if (activeItem.text == '没有跟进记录') {
								recentMode = 'nofollow';
							}
							csrPersonListStore.setProxy({
								type: 'ajax',
							url: '/ts/index.php/csr_person/view?mode=' + psmode + '&recentMode=' + psrecentMode +'&FSCChannel=' + encodeURI(psFSCChannel) + '&PStart=' + psPStart + '&PEnd=' + psPEnd + '&lastFollow=' + encodeURI(pslastFollow),
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
							csrPersonListStore.load();
						} else {
							Ext.getCmp('csrPersonPStartChoose').show();
							Ext.getCmp('csrPersonPStartChoose').reset();
							PStart = '';
							Ext.getCmp('csrPersonPEndChoose').show();
							Ext.getCmp('csrPersonPEndChoose').reset();
							PEnd = '';
						}
					}
				},
				{
					id: 'csrPersonPStartChoose',
					hidden: true,
					xtype: 'datefield',
					width: 120,
					name: 'PStart',
					maxValue: new Date(),
					format: 'Y-m-d',
					listeners: {
						change: function(me, newValue, oldValue) {
							PStart = ((newValue.getYear() < 1900) ? (1900 + newValue.getYear()) : newValue.getYear()) + "-" + (newValue.getMonth() + 1) + "-" + newValue.getDate();
							if (PStart != '' && PEnd != '') {
								csrPersonListStore.setProxy({
									type: 'ajax',
							url: '/ts/index.php/csr_person/view?mode=' + psmode + '&recentMode=' + psrecentMode +'&FSCChannel=' + encodeURI(psFSCChannel) + '&PStart=' + psPStart + '&PEnd=' + psPEnd + '&lastFollow=' + encodeURI(pslastFollow),
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
								csrPersonListStore.load();
							}
						}
					}
				},
				{
					xtype: 'tbtext',
					text: ' - '
				},
				{
					id: 'csrPersonPEndChoose',
					hidden: true,
					xtype: 'datefield',
					width: 120,
					name: 'PEnd',
					maxValue: new Date(),
					format: 'Y-m-d',
					listeners: {
						change: function(me, newValue, oldValue) {
							PEnd = ((newValue.getYear() < 1900) ? (1900 + newValue.getYear()) : newValue.getYear()) + "-" + (newValue.getMonth() + 1) + "-" + newValue.getDate();
							if (PStart != '' && PEnd != '') {
								csrPersonListStore.setProxy({
									type: 'ajax',
							url: '/ts/index.php/csr_person/view?mode=' + psmode + '&recentMode=' + psrecentMode +'&FSCChannel=' + encodeURI(psFSCChannel) + '&PStart=' + psPStart + '&PEnd=' + psPEnd + '&lastFollow=' + encodeURI(pslastFollow),
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
								csrPersonListStore.load();
							}
						}
					}
				}]
			}],
			columns: [{
				xtype: 'actioncolumn',
				width: 80,
				style: "text-align:center;",
				align: 'center',
				sortable: false,
				stopSelection: false,
				items: [{
					icon: '/ts/misc/resources/icons/cog_16.png',
					tooltip: '选择此客户',
					handler: function(grid, rowIndex, colIndex) {
						//sampleStore.removeAt(rowIndex);
						Ext.getCmp('fieldcsrPersonName').setValue(grid.getStore().getAt(rowIndex).get("csr_person_name"));
						Ext.getCmp('fieldcsrPersonID').setValue(grid.getStore().getAt(rowIndex).get("csr_person_id"));
						Ext.getCmp('editfieldcsrPersonName').setValue(grid.getStore().getAt(rowIndex).get("csr_person_name"));
						Ext.getCmp('editfieldcsrPersonID').setValue(grid.getStore().getAt(rowIndex).get("csr_person_id"));
						grid.up('window').close();
					}
				}]
			},
				{dataIndex:'csr_person_cat',text:'客户类别', filtable:true, style: "text-align:center;",align: 'center',width:80},
	{dataIndex:'csr_person_name',text:'姓名', filtable:true, style: "text-align:center;",align: 'center',width:80},
	{dataIndex:'csr_person_gender',text:'性别', filtable:true, style: "text-align:center;",align: 'center',width:60},
	{dataIndex:'csr_person_telephone',text:'固定电话', filtable:true, style: "text-align:center;",align: 'center',width:120},
	{dataIndex:'csr_person_mobile',text:'手机', filtable:true, style: "text-align:center;",align: 'center',width:110,renderer:function(value){return value.substring(0,3)+'-'+value.substring(3,7)+'-'+value.substring(7,11)}},
	{dataIndex:'csr_person_qq',text:'qq', filtable:true, style: "text-align:center;",align: 'center',width:100},
	{dataIndex:'csr_person_email',text:'邮箱', filtable:true, style: "text-align:center;",align: 'center',width:180},
	{dataIndex:'csr_person_FSC_channel',text:'责任人', filtable:true, style: "text-align:center;",align: 'center',width:90},
	{dataIndex:'csr_person_follow_result',text:'跟进结果', filtable:true, style: "text-align:center;",align: 'center',width:120},
	{dataIndex:'csr_person_FSC_follow_status',text:'跟进状态', filtable:true, style: "text-align:center;",align: 'center',width:180},
	{dataIndex:'csr_person_follow_update_ts',text:'最后跟进时间', filtable:true, style: "text-align:center;",align: 'center',width:120,renderer:new Ext.util.Format.dateRenderer("Y-m-d")}
],
			viewConfig: {
				stripeRows: true,
				forceFit: true,
				sortAscText: '正序',
				sortDescText: '降序'
			},
			loadMask: true,
			emptyText: '没有匹配的记录',
            listeners:{
                celldblclick:function(grid,td,cellIndex,record,tr,rowIndex){
						//sampleStore.removeAt(rowIndex);
						Ext.getCmp('fieldcsrPersonName').setValue(grid.getStore().getAt(rowIndex).get("csr_person_name"));
						Ext.getCmp('fieldcsrPersonID').setValue(grid.getStore().getAt(rowIndex).get("csr_person_id"));
						Ext.getCmp('editfieldcsrPersonName').setValue(grid.getStore().getAt(rowIndex).get("csr_person_name"));
						Ext.getCmp('editfieldcsrPersonID').setValue(grid.getStore().getAt(rowIndex).get("csr_person_id"));
					grid.up('window').close();
                }
            }
		}]
	});

	var chmode = 0;
	var chrecentMode = 'null';
	var chendMode = 0;
	var chFSCChannel = 'null';
	var chPStart = '';
	var chPEnd = '';
	var chlastFollow = '';
	var csrChannelListStore = Ext.create('Ext.data.JsonStore', {
		fields: [
	{name:'csr_channel_id'},
	{name:'csr_channel_cat'},
	{name:'csr_channel_name'},
	{name:'csr_channel_gender'},
	{name:'csr_channel_telephone'},
	{name:'csr_channel_mobile'},
	{name:'csr_channel_email'},
	{name:'csr_channel_corp_industry'},
	{name:'csr_channel_corp_name'},
	{name:'csr_channel_corp_depart'},
	{name:'csr_channel_corp_title'},
    {name:'csr_channel_FSC_follow_status'},
    {name:'csr_channel_FSC_channel'},
    {name:'csr_channel_creator'},
    {name:'csr_channel_create_ts',type:'date',dateFormat:"Y-m-d H:i:s"	},
    {name:'csr_channel_editor'},
    {name:'csr_channel_update_ts',type:'date',dateFormat:"Y-m-d H:i:s"	},
    {name:'csr_channel_follow_creator'},
    {name:'csr_channel_follow_update_ts',type:'date',dateFormat:"Y-m-d H:i:s"	}
		],
		pageSize: 100,
		remoteSort: true,
		autoLoad: true,
		leadingBufferZone: 100,
		buffered: true,
		//    sorters:[{property:'csr_channel_id',direction:'ASC'}],
		extraParams: {
			total: 50000
		},
		proxy: {
			type: 'ajax',
			url: '/ts/index.php/csr_channel/view',
            noCache: false,
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
		},
        listeners: {
            totalcountchange: function(){
                Ext.getCmp('csrChannelWin').down('component#status').update({count: csrChannelListStore.getTotalCount()});
			}
		}
	});
	var csrChannelWin = Ext.create('Ext.window.Window', {
		resizeable: false,
		closeAction: "hide",
        id:'csrChannelWin',
		title: '选择经纪人',
		titleAlign: 'center',
    maximized:true,
		width: 870,
		height: 500,
		layout: 'fit',
		items: [{
			xtype: 'grid',
			id: 'csr_channel_list',
			store: csrChannelListStore,
			border: 0,
			columnLines: true,
			//title: '渠道客户',
			verticalScroller: {
				xtype: 'paginggridscroller'
			},
			selModel: {
				pruneRemoved: false
			},
			features: [{
				ftype: 'grouping',
				hideGroupedHeader: false
			}],
			viewConfig: {
				trackOver: false
			},
			multiSelect: true,
			dockedItems: [{
				xtype: 'toolbar',
				dock: 'top',
				height: 48,
				enableOverflow: true,
				padding: 3,
				items: [{
					width: 400,
					fieldLabel: '查找',
					labelWidth: 50,
					xtype: 'searchfield',
					store: csrChannelListStore
				},
				{
					xtype: 'component',
					itemId: 'status',
					tpl: '<span style="font-size:16px">记录数: <b>{count}</b>。</span>可搜索客户姓名，电话，电子邮箱，QQ号，所在城市。',
					style: 'margin-left:10px;margin-right:10px'
				}]
			},
			{
				xtype: 'toolbar',
				id: 'csr_channel_list_topbar',
				dock: 'top',
				height: 48,
				items: [{
					xtype: 'tbtext',
					text: '客户类别筛选：'
				},
				{
					xtype: 'cycle',
					showText: true,
					menu: {
						items: [{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '所有客户'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '目标客户'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '潜在客户'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '意向客户'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '成交客户'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '未标明客户类别的客户'
						}]
					},
					changeHandler: function(cycleBtn, activeItem) {
						if (activeItem.text == '目标客户') {
							catMode = 'lv1';
						} else if (activeItem.text == '潜在客户') {
							catMode = 'lv2';
						} else if (activeItem.text == '意向客户') {
							catMode = 'lv3';
						} else if (activeItem.text == '成交客户') {
							catMode = 'lv4';
						} else if (activeItem.text == '未标明客户类别的客户') {
							catMode = 'lv0';
						} else if (activeItem.text == '所有客户') {
							catMode = 'all';
						}
						csrChannelListStore.setProxy({
							type: 'ajax',
							url: '/ts/index.php/csr_channel/'+baseUrl+'?mode=' + chmode + '&recentMode=' + chrecentMode +'&FSCChannel=' + encodeURI(chFSCChannel) + '&PStart=' + chPStart + '&PEnd=' + chPEnd + '&lastFollow=' + encodeURI(chlastFollow),
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
						csrChannelListStore.load();
					}
				},
				{
					xtype: 'tbtext',
					text: '跟进结果筛选：'
				},
				{
					xtype: 'cycle',
					showText: true,
					menu: {
						items: [{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '所有跟进结果'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '还未跟进'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '实施面谈'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '成功约见'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '接通但未约见'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '仅成功接通'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '未找到人'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '接通但人很忙'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '无人接听'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '小秘书'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '挂断'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '放弃'
						}]
					},
					changeHandler: function(cycleBtn, activeItem) {
						if (activeItem.text == '所有跟进结果') {
							lastFollow = '';
						} else if (activeItem.text == '还未跟进') {
							lastFollow = 'not_follow';
						} else {
							lastFollow = activeItem.text;
						}
						csrChannelListStore.setProxy({
							type: 'ajax',
							url: '/ts/index.php/csr_channel/'+baseUrl+'?mode=' + chmode + '&recentMode=' + chrecentMode +'&FSCChannel=' + encodeURI(chFSCChannel) + '&PStart=' + chPStart + '&PEnd=' + chPEnd + '&lastFollow=' + encodeURI(chlastFollow),
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
						csrChannelListStore.load();
					}
				},
				{
					xtype: 'tbtext',
					text: '跟进时间筛选：'
				},
				{
					xtype: 'cycle',
					showText: true,
					menu: {
						items: [
						// these will render as dropdown menu items when the arrow is clicked:
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '所有记录'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '最近7天跟进'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '最近30天跟进'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '最近7天未跟进'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '最近30天未跟进'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '没有跟进记录'
						},
						{
							icon: '/ts/misc/resources/icons/pen_alt_stroke_24.png',
							text: '高级'
						}]
					},
					changeHandler: function(cycleBtn, activeItem) {
						if (activeItem.text != '高级') {
							var PStartChoose = Ext.getCmp('csrChannelPStartChoose');
							if (PStartChoose != undefined) {
								PStartChoose.hide();
								PStartChoose.reset();
								PStart = '';
							}
							var PEndChoose = Ext.getCmp('csrChannelPEndChoose');
							if (PEndChoose != undefined) {
								PEndChoose.hide();
								PEndChoose.reset();
								PEnd = '';
							}
							if (activeItem.text == '所有记录') {
								recentMode = 'null';
							} else if (activeItem.text == '最近7天跟进') {
								recentMode = 'lt7';
							} else if (activeItem.text == '最近7天未跟进') {
								recentMode = 'gt7';
							} else if (activeItem.text == '最近30天跟进') {
								recentMode = 'lt30';
							} else if (activeItem.text == '最近30天未跟进') {
								recentMode = 'gt30';
							} else if (activeItem.text == '没有跟进记录') {
								recentMode = 'nofollow';
							}
							csrChannelListStore.setProxy({
								type: 'ajax',
							url: '/ts/index.php/csr_channel/'+baseUrl+'?mode=' + chmode + '&recentMode=' + chrecentMode +'&FSCChannel=' + encodeURI(chFSCChannel) + '&PStart=' + chPStart + '&PEnd=' + chPEnd + '&lastFollow=' + encodeURI(chlastFollow),
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
							csrChannelListStore.load();
						} else {
							Ext.getCmp('csrChannelPStartChoose').show();
							Ext.getCmp('csnChannelPStartChoose').reset();
							PStart = '';
							Ext.getCmp('csrChannelPEndChoose').show();
							Ext.getCmp('csrChannelPEndChoose').reset();
							PEnd = '';
						}
					}
				},
				{
					id: 'csrChannelPStartChoose',
					hidden: true,
					xtype: 'datefield',
					width: 120,
					name: 'PStart',
					maxValue: new Date(),
					format: 'Y-m-d',
					listeners: {
						change: function(me, newValue, oldValue) {
							PStart = ((newValue.getYear() < 1900) ? (1900 + newValue.getYear()) : newValue.getYear()) + "-" + (newValue.getMonth() + 1) + "-" + newValue.getDate();
							if (PStart != '' && PEnd != '') {
								csrChannelListStore.setProxy({
									type: 'ajax',
							url: '/ts/index.php/csr_channel/'+baseUrl+'?mode=' + chmode + '&recentMode=' + chrecentMode +'&FSCChannel=' + encodeURI(chFSCChannel) + '&PStart=' + chPStart + '&PEnd=' + chPEnd + '&lastFollow=' + encodeURI(chlastFollow),
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
								csrChannelListStore.load();
							}
						}
					}
				},
				{
					xtype: 'tbtext',
					text: ' - '
				},
				{
					id: 'csrChannelPEndChoose',
					hidden: true,
					xtype: 'datefield',
					width: 120,
					name: 'PEnd',
					maxValue: new Date(),
					format: 'Y-m-d',
					listeners: {
						change: function(me, newValue, oldValue) {
							PEnd = ((newValue.getYear() < 1900) ? (1900 + newValue.getYear()) : newValue.getYear()) + "-" + (newValue.getMonth() + 1) + "-" + newValue.getDate();
							if (PStart != '' && PEnd != '') {
								csrChannelListStore.setProxy({
									type: 'ajax',
							url: '/ts/index.php/csr_channel/'+baseUrl+'?mode=' + chmode + '&recentMode=' + chrecentMode +'&FSCChannel=' + encodeURI(chFSCChannel) + '&PStart=' + chPStart + '&PEnd=' + chPEnd + '&lastFollow=' + encodeURI(chlastFollow),
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
								csrChannelListStore.load();
							}
						}
					}
				}]
			}],
			columns: [{
				xtype: 'actioncolumn',
				width: 80,
				style: "text-align:center;",
				align: 'center',
				sortable: false,
				stopSelection: false,
				items: [{
					icon: '/ts/misc/resources/icons/cog_16.png',
					tooltip: '选择此客户',
					handler: function(grid, rowIndex, colIndex) {
						//sampleStore.removeAt(rowIndex);
						Ext.getCmp('fieldcsrChannelName').setValue(grid.getStore().getAt(rowIndex).get("csr_channel_name"));
						Ext.getCmp('fieldcsrChannelID').setValue(grid.getStore().getAt(rowIndex).get("csr_channel_id"));
						Ext.getCmp('editfieldcsrChannelName').setValue(grid.getStore().getAt(rowIndex).get("csr_channel_name"));
						Ext.getCmp('editfieldcsrChannelID').setValue(grid.getStore().getAt(rowIndex).get("csr_channel_id"));
						grid.up('window').close();
					}
				}]
			},
		{dataIndex:'csr_channel_cat',text:'客户类别', filtable:true, style: "text-align:center;",align: 'center',width:80},
		{dataIndex:'',text:'大区', filtable:true, style: "text-align:center;",align: 'center',width:80},
		{dataIndex:'csr_channel_name',text:'姓名', filtable:true, style: "text-align:center;",align: 'center',width:80},
		{dataIndex:'csr_channel_gender',text:'性别', filtable:true, style: "text-align:center;",align: 'center',width:60},
		{dataIndex:'csr_channel_telephone',text:'固定电话', filtable:true, style: "text-align:center;",align: 'center',width:120},
            {dataIndex:'csr_channel_mobile',text:'手机', filtable:true, style: "text-align:center;",align: 'center',width:110,renderer:function(value){return value.substring(0,3)+'-'+value.substring(3,7)+'-'+value.substring(7,11)}},
		{dataIndex:'csr_channel_email',text:'邮箱', filtable:true, style: "text-align:center;",align: 'center',width:180},
		{dataIndex:'csr_channel_corp_industry',text:'服务行业', filtable:true, style: "text-align:center;",align: 'center',width:120},
		{dataIndex:'csr_channel_corp_name',text:'公司名称', filtable:true, style: "text-align:center;",align: 'center',width:120},
		{dataIndex:'csr_channel_corp_depart',text:'部门', filtable:true, style: "text-align:center;",align: 'center',width:90},
		{dataIndex:'csr_channel_corp_title',text:'职位', filtable:true, style: "text-align:center;",align: 'center',width:90},
		{dataIndex:'csr_channel_FSC_channel',text:'责任人', filtable:true, style: "text-align:center;",align: 'center',width:90},
    	{dataIndex:'csr_channel_follow_update_ts',text:'最后跟进时间', filtable:true, style: "text-align:center;",align: 'center',width:120,renderer:new Ext.util.Format.dateRenderer("Y-m-d")}
],
			viewConfig: {
				stripeRows: true,
				forceFit: true,
				sortAscText: '正序',
				sortDescText: '降序'
			},
			loadMask: true,
			emptyText: '没有匹配的记录',
            listeners:{
                celldblclick:function(grid,td,cellIndex,record,tr,rowIndex){
						//sampleStore.removeAt(rowIndex);
						Ext.getCmp('fieldcsrChannelName').setValue(grid.getStore().getAt(rowIndex).get("csr_channel_name"));
						Ext.getCmp('fieldcsrChannelID').setValue(grid.getStore().getAt(rowIndex).get("csr_channel_id"));
						Ext.getCmp('editfieldcsrChannelName').setValue(grid.getStore().getAt(rowIndex).get("csr_channel_name"));
						Ext.getCmp('editfieldcsrChannelID').setValue(grid.getStore().getAt(rowIndex).get("csr_channel_id"));
					grid.up('window').close();
                }
            }
		}]
	});
	endOrderWin.on({
		hide: function() {
			Ext.getBody().unmask();
		}
	});
	acceptOrderWin.on({
		hide: function() {
			Ext.getBody().unmask();
		}
	});
	newOrderWin.on({
		hide: function() {
			Ext.getBody().unmask();
		}
	});
	editOrderWin.on({
		hide: function() {
			Ext.getBody().unmask();
		}
	});
	flowWin.on({
		hide: function() {
			Ext.getBody().unmask();
		}
	});
	newInvestWin.on({
		hide: function() {
			Ext.getBody().unmask();
		}
	});
	projWin.on({
		hide: function() {
			Ext.getCmp('newOrderWin').unmask();
			Ext.getCmp('editOrderWin').unmask();
		}
	});
	csrPersonWin.on({
		hide: function() {
			Ext.getCmp('newOrderWin').unmask();
			Ext.getCmp('editOrderWin').unmask();
		}
	});
	csrFmCorpWin.on({
		hide: function() {
			Ext.getCmp('newOrderWin').unmask();
			Ext.getCmp('editOrderWin').unmask();
		}
	});
	csrCorpWin.on({
		hide: function() {
			Ext.getCmp('newOrderWin').unmask();
			Ext.getCmp('editOrderWin').unmask();
		}
	});
	csrChannelWin.on({
		hide: function() {
			Ext.getCmp('newOrderWin').unmask();
			Ext.getCmp('editOrderWin').unmask();
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
    
    if(records[0].get("manage_button")==false){
        Ext.getCmp("btnProjManage").show();
        Ext.getCmp("btnNoProjManage").show();
    }
    
    if(records[0].get("channel_choose")==false){
        Ext.getCmp("fs_channel").show();
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
					text: '预约'
				},{
					icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
					text: '预约确认'
				},{
					icon:'/ts/misc/resources/icons/pen_alt_stroke_24.png',
					text: '已打款'
				}]
			},
			changeHandler: function(cycleBtn, activeItem) {
				if(activeItem.text=='所有状态') {
					orderStatus='all';
				} else if(activeItem.text=='预约') {
					orderStatus='subscribing';
				} else if(activeItem.text=='预约确认') {
					orderStatus='accepted';
				} else if(activeItem.text=='已打款') {
					orderStatus='invested';
				} else if(activeItem.text=='已成立') {
					orderStatus='confirmed';
				} else if(activeItem.text=='终止') {
					orderStatus='abort';
				} else if(activeItem.text=='已收费用') {
					orderStatus='comm_in';
				} else if(activeItem.text=='已付费用') {
					orderStatus='comm_out';
				} else if(activeItem.text=='后期') {
					orderStatus='maintenance';
				}
				orderListStore.setProxy({
					type: 'ajax',
					url:'/ts/index.php/order/'+baseUrl+'?is_confirmed=0&mode='+orderMode+'&status='+orderStatus+'&FSCChannel='+encodeURI(FSCChannel)+'&FSCManager='+encodeURI(FSCManager)+'&FSCDirector='+encodeURI(FSCDirector)+'&month='+orderMonth,
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
                if(value=='subscribing'){
                    return '预约';
                } else if(value=='accepted'){
                    return '预约确认';
                } else if(value=='invested'){
                    return '已打款';
                }
            }},
    {dataIndex:'itemid',text:'订单号',width:60,style: "text-align:center;",align: 'center'},
    {dataIndex:'is_realname',text:'实名?',width:60,style: "text-align:center;",align: 'center',
         renderer:function(value,metaData,record,rowIndex,colIndex,store,view) {
            if(value==0){
                return '否'
            } else if (value==1){
                return '是'
            }
        }},
	{dataIndex:'create_ts',text:'创建时间',style: "text-align:center;",align: 'center',renderer:new Ext.util.Format.dateRenderer("Y-m-d")},
	{dataIndex:'csr_name',text:'客户名称',style: "text-align:center;",align: 'center'},
	{dataIndex:'amount',text:'投资数额',width:76,style: "text-align:center;",align: 'right'},
    {dataIndex:'proj_name',text:'产品名称',width:220,style: "text-align:center;",align: 'center'},
    {dataIndex:'csr_id',text:'csr_id',hidden:true},
	{dataIndex:'channel_name',text:'经纪名称',style: "text-align:center;",align: 'center'},
	{dataIndex:'channel_id',text:'channel_id',hidden:true},
	{dataIndex:'proj_id',text:'proj_id',hidden:true},
	{dataIndex:'invest_in_ts',text:'打款时间',style: "text-align:center;",align: 'center',renderer:new Ext.util.Format.dateRenderer("Y-m-d")},
    {dataIndex:'comm_in',text:'内部费用',width:76,style: "text-align:center;",align: 'right',hidden:records[0].get("comm_in"),
			renderer:function(value,metaData,record,rowIndex,colIndex,store,view) { 
                return Math.round(record.get('comm_in_percent')*record.get('amount')*100)
			}},
	{dataIndex:'comm_out',text:'外部费用',width:76,style: "text-align:center;",align: 'right',
			renderer:function(value,metaData,record,rowIndex,colIndex,store,view) { 
                return Math.round(record.get('comm_out_percent')*record.get('amount')*100)
			}
        },
	//{dataIndex:'advance_out',text:'垫款',width:76,style: "text-align:center;",align: 'right'},
	{dataIndex:'creator',text:'创建人',width:76,style: "text-align:center;",align: 'center'},
    {
		xtype: 'actioncolumn',
		width:50,style: "text-align:center;",align: 'center',
		sortable: false,
        text:'修改',
		items: [{
			icon: '/ts/misc/resources/icons/minus_16.png',
			tooltip: '修改预约',
            getClass:function(v,m,r){
          		if(r.get('state')!='subscribing' && r.get('state')!='accepted' && r.get('state')!='invested'){
            	   return 'x-hidden';
               	}
                if(rec[0].get('realname')!=r.get('creator')) {
                   return 'x-hidden';
                }
	        },
			handler: function(grid, rowIndex, colIndex) {
                record=grid.getStore().getAt(rowIndex)
				editOrderWin.down('form').getForm().loadRecord(record);
                if(record.get('csr_type')=='person') {
                    Ext.getCmp('editfieldcsrPersonName').up('fieldset').down('radio').setValue(true);
                    Ext.getCmp('editfieldcsrPersonName').setValue(record.get('csr_name'));
                    Ext.getCmp('editfieldcsrPersonID').setValue(record.get('csr_id'));
                } else if (record.get('csr_type')=='fm_corp') {
                    Ext.getCmp('editfieldcsrFmCorpName').up('fieldset').down('radio').setValue(true);
                    Ext.getCmp('editfieldcsrFmCorpName').setValue(record.get('csr_name'));
                    Ext.getCmp('editfieldcsrFmCorpID').setValue(record.get('csr_id'));
                }
                if(record.get('channel_type')=='channel') {
                    Ext.getCmp('editfieldcsrChannelName').up('fieldset').down('radio').setValue(true);
                    Ext.getCmp('editfieldcsrChannelName').setValue(record.get('channel_name'));
                    Ext.getCmp('editfieldcsrChannelID').setValue(record.get('channel_id'));
                } else if (record.get('channel_type')=='corp') {
                    Ext.getCmp('editfieldcsrCorpName').up('fieldset').down('radio').setValue(true);
                    Ext.getCmp('editfieldcsrCorpName').setValue(record.get('channel_name'));
                    Ext.getCmp('editfieldcsrCorpID').setValue(record.get('channel_id'));
                }
                editOrderWin.show();
			}
		}]
	},
    {
		xtype: 'actioncolumn',
		width:50,style: "text-align:center;",align: 'center',
		sortable: false,
        text:'确认',
        hidden:records[0].get("accept_order"),
		items: [{
			icon: '/ts/misc/resources/icons/minus_16.png',
			tooltip: '确认',
            getClass:function(v,m,r){
          	    if(r.get('state')!='subscribing' && r.get('state')!='accepted' && r.get('state')!='invested'){
            	   return 'x-hidden';
               	}
                if(rec[0].get('realname')!=r.get('proj_manager')) {
                   return 'x-hidden';
                }
	        },
			handler: function(grid, rowIndex, colIndex) {
                record=grid.getStore().getAt(rowIndex)
				acceptOrderWin.down('form').getForm().loadRecord(record);
				acceptOrderWin.show();
			}
		}]
	},
    {
		xtype: 'actioncolumn',
		width:50,style: "text-align:center;",align: 'center',
		sortable: false,
        text:'终止',
		items: [{
			icon: '/ts/misc/resources/icons/minus_16.png',
			tooltip: '打开',
            getClass:function(v,m,r){
          	  if(r.get('state')!='subscribing' && r.get('state')!='accepted' && r.get('state')!='invested'){
            	   return 'x-hidden';
               	}
                if(rec[0].get('realname')!=r.get('proj_manager') && rec[0].get('realname')!=r.get('creator')) {
                   return 'x-hidden';
                }
	        },
			handler: function(grid, rowIndex, colIndex) {
                record=grid.getStore().getAt(rowIndex)
   				endOrderWin.down('form').getForm().loadRecord(record);
                Ext.getCmp('radioConfirm').setValue(false);
                Ext.getCmp('radioConfirm').hide();
                Ext.getCmp('radioAbort').setValue(true);
                Ext.getCmp('radioAbort').show();
				endOrderWin.show();
			}
		}]
	},
    {
		xtype: 'actioncolumn',
		width:50,style: "text-align:center;",align: 'center',
		sortable: false,
        text:'打款',
		items: [{
			icon: '/ts/misc/resources/icons/minus_16.png',
			tooltip: '打开',
            getClass:function(v,m,r){
          	  if(r.get('state')!='accepted'){
            	   return 'x-hidden';
               	}
                if(rec[0].get('realname')!=r.get('proj_manager') && rec[0].get('realname')!=r.get('creator')) {
                   return 'x-hidden';
                }
                if(rec[0].get('realname')==r.get('proj_manager') && r.get("invest_checker")==""){
                   return 'x-hidden';
                }
                if(rec[0].get('realname')==r.get('creator') && r.get("invest_checker")!=""){
                   return 'x-hidden';
                }
	        },
			handler: function(grid, rowIndex, colIndex) {
                record=grid.getStore().getAt(rowIndex);
                if(record.get("invest_checker")!=""){
					flowWin.setTitle('打款流程');
   					flowWin.down('form').getForm().loadRecord(record);
                	flowStore.setProxy({
						type: 'ajax',
						url: '/ts/index.php/reminder/view_flow?type=order_invest&batchid='+record.get("itemid"),
						reader: {
							type: 'json',
							root: 'data'
						}
					});
                	flowStore.load();
                    Ext.getBody().mask();
                	flowWin.show();
                } else {
					newInvestWin.setTitle('新建打款流程');
                	newInvestWin.down('form').getForm().reset();
   					newInvestWin.down('form').getForm().loadRecord(record);
                    //Ext.getCmp('fieldNewFlow').setValue('invest');
                    Ext.getBody().mask();
                	newInvestWin.show();
                }
			}
		}]
	},
    {
		xtype: 'actioncolumn',
		width:50,style: "text-align:center;",align: 'center',
		sortable: false,
        text:'成立',
        hidden:records[0].get("confirm_order"),
		items: [{
			icon: '/ts/misc/resources/icons/minus_16.png',
			tooltip: '打开',
	        getClass:function(v,m,r){
	        	if(r.get('state')!='invested'){
	            	return 'x-hidden';
	            }
                if(rec[0].get('realname')!=r.get('proj_manager')) {
                   return 'x-hidden';
                }
		    },
			handler: function(grid, rowIndex, colIndex) {
                record=grid.getStore().getAt(rowIndex)
   				endOrderWin.down('form').getForm().loadRecord(record);
                Ext.getCmp('radioConfirm').setValue(true);
                Ext.getCmp('radioConfirm').show();
                Ext.getCmp('radioAbort').setValue(false);
                Ext.getCmp('radioAbort').hide();
				endOrderWin.show();
			}
		}]
	}]
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
					url:'/ts/index.php/order/'+baseUrl+'?is_confirmed=0&mode='+orderMode+'&orderStatus='+orderStatus+'&FSCChannel='+encodeURI(FSCChannel)+'&FSCManager='+encodeURI(FSCManager)+'&FSCDirector='+encodeURI(FSCDirector)+'&month='+orderMonth,
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
