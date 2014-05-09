Ext.onReady(function() {
Ext.QuickTips.init();
  var listControl=Ext.create('Ext.data.JsonStore', {
	fields: [
	  {name:'csr_corp'  ,type:'boolean' },
	  {name:'csr_channel'  ,type:'boolean' },
	  {name:'csr_person'  ,type:'boolean' }
	],
	proxy: {
	  type: 'ajax',
	  url: '/ts/index.php/api/access_fields_csr',
	  reader: {
		  type: 'json',
		  root: 'data'
	  }
	}
  });
var corp_list = Ext.create('searchPanel', {
    id:'corp_list',
	store: csrCorpStore,
	border:0,
	columnLines: true,
	title: '公司客户',
	margin:10,
	columns: [
		{
			xtype: 'actioncolumn',
			width:40,style: "text-align:center;",align: 'center',
			sortable: false,
			items: [{
				icon: '/ts/misc/resources/icons/cog_16.png',
				tooltip: '编辑此条记录',
				handler: function(grid, rowIndex, colIndex) {
					//sampleStore.removeAt(rowIndex);
					Ext.getBody().mask();
					csrCorpEditWin.show();
					csrCorpEditWin.down('form').getForm().loadRecord(grid.getStore().getAt(rowIndex));
				}
			}]
		},{
			xtype: 'actioncolumn',
			width:40,style: "text-align:center;",align: 'center',
			sortable: false,
			items: [{
				icon: '/ts/misc/resources/icons/document_alt_stroke_24.png',
				tooltip: '跟进登记',
				handler: function(grid, rowIndex, colIndex) {
					//sampleStore.removeAt(rowIndex);
					//csrCorpEditWin.down('form').getForm().loadRecord(grid.getStore().getAt(rowIndex));
                    var temp_csr_corp_id=grid.getStore().getAt(rowIndex).get("csr_corp_id");
                    csrCorpFollowWin.down('form').down('hiddenfield[name="csr_corp_id"]').setValue(temp_csr_corp_id);
					csrCorpFollowStore.setProxy({
						type: 'ajax',
						url: '/ts/index.php/csr_corp/follow_view?csr_corp_id='+temp_csr_corp_id,
						reader: {
							type: 'json',
							root: 'data'
						}
					});
                    csrCorpFollowStore.load();
                    Ext.getBody().mask();
					csrCorpFollowWin.show();
				}
			}]
		},
		{dataIndex:'csr_corp_cat'             ,text:'客户类别', filtable:true, style: "text-align:center;",align: 'center',width:80},
        {dataIndex:''             ,text:'大区', filtable:true, style: "text-align:center;",align: 'center',width:80},
		{dataIndex:'csr_corp_name'            ,text:'公司名称', filtable:true, style: "text-align:center;",align: 'center',width:180},
		{dataIndex:'csr_corp_industry'            ,text:'公司行业', filtable:true, style: "text-align:center;",align: 'center',width:80},
        {dataIndex:'csr_corp_web'             ,text:'公司网址', filtable:true, style: "text-align:center;",align: 'center',width:190,
         renderer:function(value,metaData,record,colIndex,store,view) {
             if(value.indexOf('http://')>0){
             	return '<a href=\''+value+'\' target=\'_blank\'>'+value+'</a>';
                } else {
                return '<a href=\'http://'+value+'\' target=\'_blank\'>'+value+'</a>';
                }
         }
        },
		{dataIndex:'csr_corp_contact1_name'   ,text:'联系人1姓名', filtable:true, style: "text-align:center;",align: 'center',width:80},
		{dataIndex:'csr_corp_contact1_title'  ,text:'联系人1职位', filtable:true, style: "text-align:center;",align: 'center',width:80},
		{dataIndex:'csr_corp_contact1_phone'  ,text:'联系人1电话', filtable:true, style: "text-align:center;",align: 'center',width:120},
		{dataIndex:'csr_corp_contact1_email'  ,text:'联系人1邮箱', filtable:true, style: "text-align:center;",align: 'center',width:180}/*,
		{dataIndex:'csr_corp_FSC_channel'     ,text:'我司渠道部负责人', filtable:true, style: "text-align:center;",align: 'center',width:90},
		{dataIndex:'csr_corp_FSC_pdt'         ,text:'我司产品部负责人', filtable:true, style: "text-align:center;",align: 'center',width:90},
    {dataIndex:'csr_corp_follow_creator',text:'最后跟进人', filtable:true, style: "text-align:center;",align: 'center',width:90},
    {dataIndex:'csr_corp_follow_update_ts',text:'最后跟进时间', filtable:true, style: "text-align:center;",align: 'center',width:90,renderer:new Ext.util.Format.dateRenderer("Y-m-d")},
    {dataIndex:'csr_corp_creator',text:'创建人', filtable:true, style: "text-align:center;",align: 'center',width:90},
    {dataIndex:'csr_corp_create_ts',text:'创建时间', filtable:true, style: "text-align:center;",align: 'center',width:90,renderer:new Ext.util.Format.dateRenderer("Y-m-d")},
    {dataIndex:'csr_corp_editor',text:'用户资料更新人', filtable:true, style: "text-align:center;",align: 'center',width:90},
    {dataIndex:'csr_corp_update_ts',text:'用户资料更新时间', filtable:true, style: "text-align:center;",align: 'center',width:90,renderer:new Ext.util.Format.dateRenderer("Y-m-d")}*/
	],
	viewConfig: {
		stripeRows: true,
		forceFit:true,
		sortAscText:'正序',
		sortDescText:'降序'
	},
	loadMask: true,
	emptyText: '没有匹配的记录'
});
var channel_list = Ext.create('searchPanel', {
    id:'channel_list',
	store: csrChannelStore,
	border:0,
	columnLines: true,
	title: '渠道客户',
    verticalScroller : {
	 xtype : 'paginggridscroller'
	 } ,
	selModel: {
            pruneRemoved: false
        },features:[{
            ftype: 'grouping',
            hideGroupedHeader: false
        }],viewConfig: {
            trackOver: false
        },multiSelect: true,
	columns: [
		{
			xtype: 'actioncolumn',
			width:40,style: "text-align:center;",align: 'center',
			sortable: false,
			items: [{
				icon: '/ts/misc/resources/icons/cog_16.png',
				tooltip: '编辑此条记录',
				handler: function(grid, rowIndex, colIndex) {
					//sampleStore.removeAt(rowIndex);
					Ext.getBody().mask();
					csrChannelEditWin.show();
					csrChannelEditWin.down('form').getForm().loadRecord(grid.getStore().getAt(rowIndex));
				}
			}]
		},{
			xtype: 'actioncolumn',
			width:40,style: "text-align:center;",align: 'center',
			sortable: false,
			items: [{
				icon: '/ts/misc/resources/icons/document_alt_stroke_24.png',
				tooltip: '跟进登记',
				handler: function(grid, rowIndex, colIndex) {
					//sampleStore.removeAt(rowIndex);
					//csrCorpEditWin.down('form').getForm().loadRecord(grid.getStore().getAt(rowIndex));
                    var temp_csr_channel_id=grid.getStore().getAt(rowIndex).get("csr_channel_id");
                    csrChannelFollowWin.down('form').down('hiddenfield[name="csr_channel_id"]').setValue(temp_csr_channel_id);
					csrChannelFollowStore.setProxy({
						type: 'ajax',
						url: '/ts/index.php/csr_channel/follow_view?csr_channel_id='+temp_csr_channel_id,
						reader: {
							type: 'json',
							root: 'data'
						}
					});
                    csrChannelFollowStore.load();
                    Ext.getBody().mask();
					csrChannelFollowWin.show();
				}
			}]
		},
		{dataIndex:'csr_channel_cat',text:'客户类别', filtable:true, style: "text-align:center;",align: 'center',width:80},
		{dataIndex:'',text:'大区', filtable:true, style: "text-align:center;",align: 'center',width:80},
		{dataIndex:'csr_channel_name',text:'姓名', filtable:true, style: "text-align:center;",align: 'center',width:80},
		{dataIndex:'csr_channel_gender',text:'性别', filtable:true, style: "text-align:center;",align: 'center',width:60},
		{dataIndex:'csr_channel_telephone',text:'固定电话', filtable:true, style: "text-align:center;",align: 'center',width:120},
		{dataIndex:'csr_channel_mobile',text:'手机', filtable:true, style: "text-align:center;",align: 'center',width:100},
		{dataIndex:'csr_channel_qq',text:'qq', filtable:true, style: "text-align:center;",align: 'center',width:100},
		{dataIndex:'csr_channel_email',text:'邮箱', filtable:true, style: "text-align:center;",align: 'center',width:180},
		{dataIndex:'csr_channel_corp_industry',text:'服务行业', filtable:true, style: "text-align:center;",align: 'center',width:120},
		{dataIndex:'csr_channel_corp_name',text:'公司名称', filtable:true, style: "text-align:center;",align: 'center',width:120},
		{dataIndex:'csr_channel_corp_depart',text:'部门', filtable:true, style: "text-align:center;",align: 'center',width:90},
		{dataIndex:'csr_channel_corp_title',text:'职位', filtable:true, style: "text-align:center;",align: 'center',width:90}/*,
		{dataIndex:'csr_channel_FSC_channel',text:'责任人', filtable:true, style: "text-align:center;",align: 'center',width:90},
    {dataIndex:'csr_channel_follow_creator',text:'最后跟进人', filtable:true, style: "text-align:center;",align: 'center',width:90},
    {dataIndex:'csr_channel_follow_update_ts',text:'最后跟进时间', filtable:true, style: "text-align:center;",align: 'center',width:90,renderer:new Ext.util.Format.dateRenderer("Y-m-d")},
    {dataIndex:'csr_channel_creator',text:'创建人', filtable:true, style: "text-align:center;",align: 'center',width:90},
    {dataIndex:'csr_channel_create_ts',text:'创建时间', filtable:true, style: "text-align:center;",align: 'center',width:90,renderer:new Ext.util.Format.dateRenderer("Y-m-d")},
    {dataIndex:'csr_channel_editor',text:'用户资料更新人', filtable:true, style: "text-align:center;",align: 'center',width:90},
    {dataIndex:'csr_channel_update_ts',text:'用户资料更新时间', filtable:true, style: "text-align:center;",align: 'center',width:90,renderer:new Ext.util.Format.dateRenderer("Y-m-d")}*/
	],
	viewConfig: {
		stripeRows: true,
		forceFit:true,
		sortAscText:'正序',
		sortDescText:'降序'
	},
	loadMask: true,
	emptyText: '没有匹配的记录'
});
var person_list = Ext.create('Ext.grid.GridPanel', {
    id:'person_list',
	store: csrPersonStore,
	border:0,
	columnLines: true,
	title: '个人客户',
    verticalScroller : {
	 xtype : 'paginggridscroller'
	 } ,
	selModel: {
            pruneRemoved: false
        },features:[{
            ftype: 'grouping',
            hideGroupedHeader: false
        }],viewConfig: {
            trackOver: false
        },multiSelect: true,
	dockedItems: [{
            dock: 'top',
            xtype: 'toolbar',
            items: [{
                width: 400,
                fieldLabel: '&nbsp;查找',
                labelWidth: 40,
                xtype: 'searchfield',
                store: csrPersonStore
            }, '->', {
                xtype: 'component',
                itemId: 'status',
                tpl: '匹配行数: {count}',
                style: 'margin-right:5px'
            }]
        }],
        columns: [
		{
			xtype: 'actioncolumn',
			width:40,style: "text-align:center;",align: 'center',
			sortable: false,
			items: [{
				icon: '/ts/misc/resources/icons/cog_16.png',
				tooltip: '编辑此条记录',
				handler: function(grid, rowIndex, colIndex) {
					//sampleStore.removeAt(rowIndex);
					Ext.getBody().mask();
					csrPersonEditWin.show();
					csrPersonEditWin.down('form').getForm().loadRecord(grid.getStore().getAt(rowIndex));
				}
			}]
		},{
			xtype: 'actioncolumn',
			width:40,style: "text-align:center;",align: 'center',
			sortable: false,
			items: [{
				icon: '/ts/misc/resources/icons/document_alt_stroke_24.png',
				tooltip: '跟进登记',
				handler: function(grid, rowIndex, colIndex) {
					//sampleStore.removeAt(rowIndex);
					//csrCorpEditWin.down('form').getForm().loadRecord(grid.getStore().getAt(rowIndex));
                    var temp_csr_person_id=grid.getStore().getAt(rowIndex).get("csr_person_id");
                    csrPersonFollowWin.down('form').down('hiddenfield[name="csr_person_id"]').setValue(temp_csr_person_id);
					csrPersonFollowStore.setProxy({
						type: 'ajax',
						url: '/ts/index.php/csr_person/follow_view?csr_person_id='+temp_csr_person_id,
						reader: {
							type: 'json',
							root: 'data'
						}
					});
                    csrPersonFollowStore.load();
                    Ext.getBody().mask();
					csrPersonFollowWin.show();
				}
			}]
		},
		{dataIndex:'csr_person_cat',text:'客户类别', filtable:true, style: "text-align:center;",align: 'center',width:80},
		{dataIndex:'csr_person_name',text:'姓名', filtable:true, style: "text-align:center;",align: 'center',width:80},
		{dataIndex:'csr_person_gender',text:'性别', filtable:true, style: "text-align:center;",align: 'center',width:60},
		{dataIndex:'csr_person_telephone',text:'固定电话', filtable:true, style: "text-align:center;",align: 'center',width:120},
		{dataIndex:'csr_person_mobile',text:'手机', filtable:true, style: "text-align:center;",align: 'center',width:100},
		{dataIndex:'csr_person_qq',text:'qq', filtable:true, style: "text-align:center;",align: 'center',width:100},
		{dataIndex:'csr_person_email',text:'邮箱', filtable:true, style: "text-align:center;",align: 'center',width:180},
		{dataIndex:'csr_person_financial_pref',text:'客户理财偏好', filtable:true, style: "text-align:center;",align: 'center',width:160},
		{dataIndex:'csr_person_financial_demand',text:'客户理财需求', filtable:true, style: "text-align:center;",align: 'center',width:160}/*,
		{dataIndex:'csr_person_FSC_channel',text:'责任人', filtable:true, style: "text-align:center;",align: 'center',width:90},
    {dataIndex:'csr_person_follow_creator',text:'最后跟进人', filtable:true, style: "text-align:center;",align: 'center',width:80},
    {dataIndex:'csr_person_follow_update_ts',text:'最后跟进时间', filtable:true, style: "text-align:center;",align: 'center',width:90,renderer:new Ext.util.Format.dateRenderer("Y-m-d")},
    {dataIndex:'csr_person_creator',text:'创建人', filtable:true, style: "text-align:center;",align: 'center',width:80},
    {dataIndex:'csr_person_create_ts',text:'创建时间', filtable:true, style: "text-align:center;",align: 'center',width:90,renderer:new Ext.util.Format.dateRenderer("Y-m-d")},
    {dataIndex:'csr_person_editor',text:'用户资料更新人', filtable:true, style: "text-align:center;",align: 'center',width:80},
    {dataIndex:'csr_person_update_ts',text:'用户资料更新时间', filtable:true, style: "text-align:center;",align: 'center',width:90,renderer:new Ext.util.Format.dateRenderer("Y-m-d")}*/
	],
	viewConfig: {
		stripeRows: true,
		forceFit:true,
		sortAscText:'正序',
		sortDescText:'降序'
	},
	loadMask: true,
	emptyText: '没有匹配的记录'
});

var customerPanel=Ext.create('Ext.tab.Panel', {
	region:'center',
    items: [corp_list,channel_list,person_list]
});  

var csrCorpEditWin=Ext.create('Ext.window.Window',{
	resizeable:false,
	closeAction:"hide",
	closable:false,
	title:'公司客户编辑',
	titleAlign:'center',
	autoScroll:true,
	layout:{
		type:'vbox',
		//defaultMargins: {top: 0, right: 5, bottom: 0, left: 5},
        align:'stretch'
	},
	width:920,
	items:[
	{
		xtype:"form",
		width:890,
		height:500,
		//margin:'10 0 0 0',
        //padding:'10 0 0 0',
		autoScroll:true,
		//hidden:true,
		//collapsible:true,
		//collapseDirection : 'left',
		//collapsed : true,
		//title:'额度信息编辑',
		trackResetOnLoad:true,
		border:0,
		waitTitle:"Pleas wait...",
		layout:{
			type:'vbox',
			align: 'stretch',
			defaultMargins: 5
		},
		fieldDefaults:{
			lableWidth:120,
			width:440,
			allowBlank: true,
			labelAlign:'right'
		},
		dockedItems: [{
			dock: 'bottom',
			xtype: 'toolbar',
			scale:'medium',
            border:0,
			bodyPadding: 5,
			items: [{xtype:'box',flex:1},{
				icon:'/ts/misc/resources/icons/x_24.png',
				text: '重置',
				scale:'medium',
				handler: function(){
					this.up('form').getForm().reset(true);
				}
			},{
				icon:'/ts/misc/resources/icons/check_24.png',
				text: '确认',
				scale:'medium',
				formBind: true, //only enabled once the form is valid
				disabled: true,
				handler: function() {
					this.up('form').getForm().submit({
						url: '/ts/index.php/csr_corp/save',
						submitEmptyText: false,
						waitMsg: 'Saving Data...',
						success: function(form, action) {
							csrCorpEditWin.hide();
							csrCorpStore.load();
						}
						//,
						//failure: function(form, action) {
						//  Ext.Msg.alert('alert', '保存失败。如有问题请联系管理员。');
						//}
					});
				}
			},{
				icon:'/ts/misc/resources/icons/x_24.png',
				text: '取消',
				scale:'medium',
				handler: function(){
					this.up('form').getForm().reset(true);
					this.up('window').hide();
				}
			},{xtype:'box',flex:1}]
		}],
		items:[
		{xtype:'hiddenfield',name:'csr_corp_id'},
		{
			xtype:'fieldset',
			title: '====<b>类别</b>====',
			border:0,
			layout: {
				type: 'hbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			items:[
			{xtype:'combo',queryMode:'local',store:chCorpCatList,valueField:'id',displayField:'text',forceSelection:true,width:300,name:'csr_corp_cat'             ,fieldLabel:'客户类别'},
			{xtype:'textfield',name:'csr_corp_cat_reason'      ,fieldLabel:'客户类别评判理由'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>公司基本信息</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
			{xtype:'textfield',width:500,name:'csr_corp_name'            ,fieldLabel:'公司名称'},
			{xtype:'textfield',name:'csr_corp_bname'           ,fieldLabel:'公司简称'},
			{xtype:'textfield',width:300,name:'csr_corp_industry'            ,fieldLabel:'公司所属行业'},
			{xtype:'textfield',width:700,name:'csr_corp_addr_reg'        ,fieldLabel:'公司注册地址'},
			{xtype:'textfield',width:700,name:'csr_corp_addr_main'       ,fieldLabel:'公司主要办公地址'},
			{xtype:'textfield',name:'csr_corp_regcpt'          ,fieldLabel:'公司注册资本'},
			{xtype:'textfield',width:700,name:'csr_corp_biz'             ,fieldLabel:'公司主营业务'},
			{xtype:'textfield',name:'csr_corp_web'             ,fieldLabel:'公司网址'},
			{xtype:'textareafield',width:700,name:'csr_corp_plusinfo'        ,fieldLabel:'公司其他主要信息'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>公司人员信息</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
			{xtype:'textareafield',width:700,name:'csr_corp_director'        ,fieldLabel:'公司主要股东及其主要履历'},
			{xtype:'textareafield',width:700,name:'csr_corp_legalperson'     ,fieldLabel:'公司法人及主要履历'},
			{xtype:'textareafield',width:700,name:'csr_corp_CEO'             ,fieldLabel:'公司总经理及主要履历'},
			{xtype:'textareafield',width:700,name:'csr_corp_manager'         ,fieldLabel:'公司主要高管及主要履历'},
			{
			xtype:'fieldset',
			title: '====<b>联系人1</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
				{xtype:'textfield',width:300,name:'csr_corp_contact1_name'   ,fieldLabel:'联系人1姓名'},
				{xtype:'textfield',name:'csr_corp_contact1_title'  ,fieldLabel:'联系人1职位'},
				{xtype:'textfield',name:'csr_corp_contact1_phone'  ,fieldLabel:'联系人1电话'},
				{xtype:'textfield',name:'csr_corp_contact1_email'  ,fieldLabel:'联系人1邮箱'},
				{xtype:'textareafield',width:700,name:'csr_corp_contact1_CV'     ,fieldLabel:'联系人1主要履历'}
				]
			},{
			xtype:'fieldset',
			title: '====<b>联系人2</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
				{xtype:'textfield',width:300,name:'csr_corp_contact2_name'   ,fieldLabel:'联系人2姓名'},
				{xtype:'textfield',name:'csr_corp_contact2_title'  ,fieldLabel:'联系人2职位'},
				{xtype:'textfield',name:'csr_corp_contact2_phone'  ,fieldLabel:'联系人2电话'},
				{xtype:'textfield',name:'csr_corp_contact2_email'  ,fieldLabel:'联系人2邮箱'},
				{xtype:'textareafield',width:700,name:'csr_corp_contact2_CV'     ,fieldLabel:'联系人2主要履历'}
				]
			},{
			xtype:'fieldset',
			title: '====<b>联系人3</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
				{xtype:'textfield',width:300,name:'csr_corp_contact3_name'   ,fieldLabel:'联系人3姓名'},
				{xtype:'textfield',name:'csr_corp_contact3_title'  ,fieldLabel:'联系人3职位'},
				{xtype:'textfield',name:'csr_corp_contact3_phone'  ,fieldLabel:'联系人3电话'},
				{xtype:'textfield',name:'csr_corp_contact3_email'  ,fieldLabel:'联系人3邮箱'},
				{xtype:'textareafield',width:700,name:'csr_corp_contact3_CV'     ,fieldLabel:'联系人3主要履历'}
				]
			}]
		},{
			xtype:'fieldset',
			title: '====<b>理财团队</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
			{xtype:'textfield',name:'csr_corp_yearly_amount'   ,fieldLabel:'公司最近年度募资额'},
			{xtype:'numberfield',width:300,name:'csr_corp_FP_no'           ,fieldLabel:'公司理财师人数'},
			{xtype:'numberfield',width:300,name:'csr_corp_branch_no'       ,fieldLabel:'公司分公司个数'},
			{xtype:'combo',queryMode:'local',store:chCorpBizStyleList,valueField:'id',displayField:'text',forceSelection:true,name:'csr_corp_biz_style',fieldLabel:'公司销售风格'},
			{xtype:'textfield',name:'csr_corp_biz_dir_percent' ,fieldLabel:'公司直销占销售额比例'},
			{xtype:'textfield',name:'csr_corp_biz_type'        ,fieldLabel:'公司主销产品类别'},
			{xtype:'textfield',name:'csr_corp_biz_partner'     ,fieldLabel:'公司主要金融机构合作伙伴'},
			{xtype:'textareafield',width:700,name:'csr_corp_biz_plusinfo'    ,fieldLabel:'公司理财业务其他情况'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>投行团队</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
			{xtype:'textfield',name:'csr_corp_yearly_issue'    ,fieldLabel:'公司最近年度发行额'},
			{xtype:'numberfield',width:300,name:'csr_corp_IP_no'           ,fieldLabel:'公司投行团队人数'},
			{xtype:'combo',queryMode:'local',store:chCorpInvStyleList,valueField:'id',displayField:'text',forceSelection:true,name:'csr_corp_inv_style'       ,fieldLabel:'公司投行发行风格'},
			{xtype:'combo',queryMode:'local',store:chCorpInvChtypeList,valueField:'id',displayField:'text',forceSelection:true,width:500,name:'csr_corp_inv_chtype'      ,fieldLabel:'公司投行发行渠道'},
			{xtype:'textareafield',width:700,name:'csr_corp_inv_case'        ,fieldLabel:'公司投行业务的成功案例'},
			{xtype:'textareafield',width:700,name:'csr_corp_inv_plusinfo'    ,fieldLabel:'公司投行业务的其他情况'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>合作信息</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
			{xtype:'textfield',name:'csr_corp_coop_partner'    ,fieldLabel:'目前主要合作的竞争方'},
			{xtype:'textfield',name:'csr_corp_coop_FSC_dir'    ,fieldLabel:'与我司合作方向'},
			{xtype:'textfield',name:'csr_corp_coop_FSC_wish'   ,fieldLabel:'与我司合作意愿'},
			{xtype:'textfield',name:'csr_corp_follow'          ,fieldLabel:'后续跟进策略'},
			{xtype:'textfield',name:'csr_corp_FSC_channel'     ,fieldLabel:'我司渠道部负责人'},
			{xtype:'textfield',name:'csr_corp_FSC_pdt'         ,fieldLabel:'我司产品部负责人'}
			]
		}]
	}]
});
var csrChannelEditWin=Ext.create('Ext.window.Window',{
	resizeable:false,
	closeAction:"hide",
	closable:false,
	title:'额度信息编辑',
	titleAlign:'center',
	layout:{
		type:'vbox',
		//defaultMargins: {top: 0, right: 5, bottom: 0, left: 5},
        align:'stretch'
	},
	width:920,
	items:[
	{
		xtype:"form",
		width:890,
		height:500,
		//margin:'10 0 0 0',
        //padding:'10 0 0 0',
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
			type:'vbox',
			align: 'stretch',
			defaultMargins: {top: 0, right: 5, bottom: 0, left: 5}
		},
		fieldDefaults:{
			lableWidth:120,
			width:440,
			allowBlank: true,
			labelAlign:'right'
		},
		dockedItems: [{
			dock: 'bottom',
			xtype: 'toolbar',
			scale:'medium',
            border:0,
			bodyPadding: 5,
			items: [{xtype:'box',flex:1},{
				icon:'/ts/misc/resources/icons/check_24.png',
				text: '确认',
				scale:'medium',
				formBind: true, //only enabled once the form is valid
				disabled: true,
				handler: function() {
					this.up('form').getForm().submit({
						url: '/ts/index.php/csr_channel/save',
						submitEmptyText: false,
						waitMsg: 'Saving Data...',
						success: function(form, action) {
							csrChannelEditWin.hide();
							csrChannelStore.load();
						}
						//,
						//failure: function(form, action) {
						//  Ext.Msg.alert('alert', '保存失败。如有问题请联系管理员。');
						//}
					});
				}
			},{
				icon:'/ts/misc/resources/icons/x_24.png',
				text: '取消',
				scale:'medium',
				handler: function(){
					this.up('form').getForm().reset(true);
					this.up('window').hide();
				}
			},{xtype:'box',flex:1}]
		}],
		items:[
		{xtype:'hiddenfield',name:'csr_channel_id'},
		{
			xtype:'fieldset',
			title: '====<b>类别</b>====',
			border:0,
			layout: {
				type: 'hbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			items:[
			{xtype:'combo',queryMode:'local',store:chChannelCatList,valueField:'id',displayField:'text',forceSelection:true,width:300,name:'csr_channel_cat',fieldLabel:'客户类别'},
			{xtype:'textfield',name:'csr_channel_cat_reason',fieldLabel:'客户类别评判理由'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>渠道人员基本信息</b>====',
			border:0,
			layout: {
				type: 'vbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			items:[
			{xtype:'textfield',name:'csr_channel_name',fieldLabel:'姓名'},
			{xtype:'textfield',name:'csr_channel_gender',fieldLabel:'性别'},
			{xtype:'textfield',name:'csr_channel_age',fieldLabel:'年龄'},
			{xtype:'textfield',name:'csr_channel_hometown',fieldLabel:'籍贯'},
			{xtype:'textfield',name:'csr_channel_telephone',fieldLabel:'固定电话'},
			{xtype:'textfield',name:'csr_channel_mobile',fieldLabel:'手机'},
			{xtype:'textfield',name:'csr_channel_qq',fieldLabel:'qq'},
			{xtype:'textfield',name:'csr_channel_fax',fieldLabel:'传真'},
			{xtype:'textfield',name:'csr_channel_wechat',fieldLabel:'微信'},
			{xtype:'textfield',name:'csr_channel_email',fieldLabel:'邮箱'},
			{xtype:'textfield',name:'csr_channel_email',fieldLabel:'第二邮箱'},
			{xtype:'textfield',width:700,name:'csr_channel_interests',fieldLabel:'兴趣爱好'},
			{xtype:'textfield',width:700,name:'csr_channel_proper_comm',fieldLabel:'比较接受的沟通方式'},
			{xtype:'textareafield',width:700,name:'csr_channel_person_plusinfo',fieldLabel:'个人其他需要说明的状况'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>渠道公司信息</b>====',
			border:0,
			layout: {
				type: 'vbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			items:[
			{xtype:'textfield',name:'csr_channel_corp_industry',fieldLabel:'服务行业'},
			{xtype:'textfield',width:700,name:'csr_channel_corp_name',fieldLabel:'公司名称'},
			{xtype:'textfield',name:'csr_channel_corp_depart',fieldLabel:'部门'},
			{xtype:'textfield',name:'csr_channel_corp_title',fieldLabel:'职位'},
			{xtype:'textareafield',width:700,name:'csr_channel_past_work',fieldLabel:'过往主要任职经历'},
			{xtype:'textareafield',width:700,name:'csr_channel_edu',fieldLabel:'过往主要教育经历'},
			{xtype:'textareafield',width:700,name:'csr_channel_prof_plusinfo',fieldLabel:'职业其他需要说明的状况'},
			{xtype:'combo',queryMode:'local',store:chChannelCsrTypeList,valueField:'id',displayField:'text',forceSelection:true,name:'csr_channel_csr_type',fieldLabel:'服务客户类别'},
			{xtype:'combo',queryMode:'local',store:chChannelCsrStyleList,valueField:'id',displayField:'text',forceSelection:true,name:'csr_channel_csr_style',fieldLabel:'服务客户偏好'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>合作信息</b>====',
			border:0,
			layout: {
				type: 'vbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			items:[
			{xtype:'textfield',name:'csr_channel_pdt_channel',fieldLabel:'目前接触理财产品渠道'},
			{xtype:'textfield',name:'csr_channel_coop_FSC_dir',fieldLabel:'与我司合作方向'},
			{xtype:'textfield',name:'csr_channel_coop_FSC_wish',fieldLabel:'与我司合作意愿'},
			{xtype:'textfield',name:'csr_channel_follow',fieldLabel:'后续跟进策略'}
			]
		}]
	}]
});
var csrPersonEditWin=Ext.create('Ext.window.Window',{
	resizeable:false,
	closeAction:"hide",
	closable:false,
	title:'个人客户信息编辑',
	titleAlign:'center',
	layout:{
		type:'vbox',
		//defaultMargins: {top: 0, right: 5, bottom: 0, left: 5},
        align:'stretch'
	},
	width:870,
	items:[
	{
		xtype:"form",
		width:850,
		height:500,
		//margin:'10 0 0 0',
        //padding:'10 0 0 0',
		autoScroll :true,
		//hidden:true,
		//collapsible:true,
		//collapseDirection : 'left',
		//collapsed : true,
		//title:'个人客户信息编辑',
		trackResetOnLoad:true,
		border:0,
		waitTitle:"Pleas wait...",
		layout:{
			type:'vbox',
			align: 'stretch',
			defaultMargins: {top: 0, right: 5, bottom: 0, left: 5}
		},
		fieldDefaults:{
			lableWidth:50,
			width:440,
			allowBlank: true,
			labelAlign:'right'
		},
		dockedItems: [{
			dock: 'bottom',
			xtype: 'toolbar',
			scale:'medium',
            border:0,
			bodyPadding: 5,
			items: [{xtype:'box',flex:1},{
				icon:'/ts/misc/resources/icons/check_24.png',
				text: '确认',
				scale:'medium',
				formBind: true, //only enabled once the form is valid
				disabled: true,
				handler: function() {
					this.up('form').getForm().submit({
						url: '/ts/index.php/csr_person/save',
						submitEmptyText: false,
						waitMsg: 'Saving Data...',
						success: function(form, action) {
							csrPersonEditWin.hide();
							csrPersonStore.load();
						}
						//,
						//failure: function(form, action) {
						//  Ext.Msg.alert('alert', '保存失败。如有问题请联系管理员。');
						//}
					});
				}
			},{
				icon:'/ts/misc/resources/icons/x_24.png',
				text: '取消',
				scale:'medium',
				handler: function(){
					this.up('form').getForm().reset(true);
					this.up('window').hide();
				}
			},{xtype:'box',flex:1}]
		}],
		items:[
		{xtype:'hiddenfield',name:'csr_person_id'},
		{
			xtype:'fieldset',
			title: '====<b>类别</b>====',
			border:0,
			layout: {
				type: 'hbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			items:[
			{xtype:'combo',queryMode:'local',store:chPersonCatList,valueField:'id',displayField:'text',forceSelection:true,width:300,name:'csr_person_cat',fieldLabel:'客户类别'},
			{xtype:'textfield',name:'csr_person_cat_reason',fieldLabel:'客户类别评判理由'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>客户基本信息</b>====',
			border:0,
			layout: {
				type: 'vbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			fieldDefaults:{
				lableWidth:100,
				width:440,
				allowBlank: true,
				labelAlign:'right'
			},
			items:[
			{xtype:'textfield',width:300,name:'csr_person_name',fieldLabel:'姓名'},
			{xtype:'textfield',width:300,name:'csr_person_gender',fieldLabel:'性别'},
			{xtype:'textfield',width:300,name:'csr_person_age',fieldLabel:'年龄'},
			{xtype:'textfield',width:300,name:'csr_person_hometown',fieldLabel:'籍贯'},
			{xtype:'textfield',width:300,name:'csr_person_telephone',fieldLabel:'固定电话'},
			{xtype:'textfield',width:300,name:'csr_person_mobile',fieldLabel:'手机'},
			{xtype:'textfield',width:300,name:'csr_person_qq',fieldLabel:'qq'},
			{xtype:'textfield',width:300,name:'csr_person_wechat',fieldLabel:'微信'},
			{xtype:'textfield',width:300,name:'csr_person_email',fieldLabel:'邮箱'},
			{xtype:'textfield',width:700,name:'csr_person_interests',fieldLabel:'兴趣爱好'},
			{xtype:'textfield',width:700,name:'csr_person_proper_comm',fieldLabel:'比较接受的<br />沟通方式'},
			{xtype:'textareafield',width:700,name:'csr_person_plusinfo',fieldLabel:'个人其他需要<br />说明的状况'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>客户职业信息</b>====',
			border:0,
			layout: {
				type: 'vbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			fieldDefaults:{
				lableWidth:120,
				width:440,
				allowBlank: true,
				labelAlign:'right'
			},
			items:[
			{xtype:'textfield',width:300,name:'csr_person_corp_industry',fieldLabel:'服务行业'},
			{xtype:'textfield',width:700,name:'csr_person_corp_name',fieldLabel:'公司名称'},
			{xtype:'textfield',width:300,name:'csr_person_corp_property',fieldLabel:'公司性质'},
			{xtype:'textfield',width:300,name:'csr_person_corp_title',fieldLabel:'职位'},
			{xtype:'textareafield',width:700,name:'csr_person_past_work',fieldLabel:'过往主要任职经历'},
			{xtype:'textareafield',width:700,name:'csr_person_edu',fieldLabel:'过往主要教育经历'},
			{xtype:'textareafield',width:700,name:'csr_person_prof_plusinfo',fieldLabel:'职业其他需要说明的状况'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>客户家庭信息</b>====',
			border:0,
			layout: {
				type: 'vbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			fieldDefaults:{
				lableWidth:120,
				width:440,
				allowBlank: true,
				labelAlign:'right'
			},
			items:[
			{xtype:'textfield',name:'csr_person_marriage',fieldLabel:'婚姻状况'},
			{xtype:'textfield',name:'csr_person_child',fieldLabel:'生育状况'},
			{xtype:'textfield',name:'csr_person_child_no',fieldLabel:'子女个数'},
			{xtype:'textfield',name:'csr_person_child1_age',fieldLabel:'子女1年龄'},
			{xtype:'textfield',name:'csr_person_child2_age',fieldLabel:'子女2年龄'},
			{xtype:'textareafield',width:700,name:'csr_person_family_plusinfo',fieldLabel:'家庭其他需要说明的状况'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>客户资产状况</b>====',
			border:0,
			layout: {
				type: 'vbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			fieldDefaults:{
				lableWidth:120,
				width:440,
				allowBlank: true,
				labelAlign:'right'
			},
			items:[
			{xtype:'textfield',name:'csr_person_income_p',fieldLabel:'个人年收入'},
			{xtype:'textfield',name:'csr_person_assets_p',fieldLabel:'个人总资产'},
			{xtype:'textfield',name:'csr_person_income_h',fieldLabel:'家庭年收入'},
			{xtype:'textfield',name:'csr_person_assets_h',fieldLabel:'家庭总资产'},
			{xtype:'textfield',name:'csr_person_financial_dicision',fieldLabel:'家庭理财决策模式'},
			{xtype:'textareafield',width:700,name:'csr_person_financial_plusinfo',fieldLabel:'资产其他需要说明的状况'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>资产配置状况</b>====',
			border:0,
			layout: {
				type: 'vbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			fieldDefaults:{
				lableWidth:120,
				width:440,
				allowBlank: true,
				labelAlign:'right'
			},
			items:[
			{xtype:'textfield',width:700,name:'csr_person_assets_estate',fieldLabel:'房产'},
			{xtype:'textfield',width:700,name:'csr_person_assets_trusts',fieldLabel:'信托类'},
			{xtype:'textfield',width:700,name:'csr_person_assets_fixed',fieldLabel:'其他固定收益类'},
			{xtype:'textfield',width:700,name:'csr_person_assets_stock',fieldLabel:'股票类'},
			{xtype:'textfield',width:700,name:'csr_person_assets_PE',fieldLabel:'股权投资类'},
			{xtype:'textfield',width:700,name:'csr_person_assets_float',fieldLabel:'其他浮动收益类'},
			{xtype:'textfield',width:700,name:'csr_person_assets_other',fieldLabel:'另类'},
			{xtype:'textfield',width:700,name:'csr_person_assets_oversea',fieldLabel:'海外'},
			{xtype:'textareafield',width:700,name:'csr_person_assets_plusinfo',fieldLabel:'资产配置其他需要说明的状况'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>合作信息</b>====',
			border:0,
			layout: {
				type: 'vbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			fieldDefaults:{
				lableWidth:120,
				width:440,
				allowBlank: true,
				labelAlign:'right'
			},
			items:[
			{xtype:'textfield',name:'csr_person_financial_pref',fieldLabel:'客户理财偏好'},
			{xtype:'textfield',name:'csr_person_financial_demand',fieldLabel:'客户理财需求'},
			{xtype:'textfield',name:'csr_person_financial_channel',fieldLabel:'目前的理财渠道'},
			{xtype:'textfield',name:'csr_person_offer_pdt',fieldLabel:'可能提供服务的产品'},
			{xtype:'textfield',name:'csr_person_offer_mode',fieldLabel:'可能提供服务的模式'}
			]
		}]
	}]
});
var csrCorpNewWin=Ext.create('Ext.window.Window',{
	resizeable:false,
	closeAction:"hide",
	closable:false,
	title:'公司客户编辑',
	titleAlign:'center',
	autoScroll:true,
	layout:{
		type:'vbox',
		//defaultMargins: {top: 0, right: 5, bottom: 0, left: 5},
        align:'stretch'
	},
	width:920,
	items:[
	{
		xtype:"form",
		width:890,
		height:500,
		//margin:'10 0 0 0',
        //padding:'10 0 0 0',
		autoScroll:true,
		//hidden:true,
		//collapsible:true,
		//collapseDirection : 'left',
		//collapsed : true,
		//title:'额度信息编辑',
		border:0,
		waitTitle:"Pleas wait...",
		layout:{
			type:'vbox',
			align: 'stretch',
			defaultMargins: 5
		},
		fieldDefaults:{
			lableWidth:120,
			width:440,
			allowBlank: true,
			labelAlign:'right'
		},
		dockedItems: [{
			dock: 'bottom',
			xtype: 'toolbar',
			scale:'medium',
            border:0,
			bodyPadding: 5,
			items: [{xtype:'box',flex:1},{
				icon:'/ts/misc/resources/icons/x_24.png',
				text: '重置',
				scale:'medium',
				handler: function(){
					this.up('form').getForm().reset(true);
				}
			},{
				icon:'/ts/misc/resources/icons/check_24.png',
				text: '确认',
				scale:'medium',
				formBind: true, //only enabled once the form is valid
				disabled: true,
				handler: function() {
					this.up('form').getForm().submit({
						url: '/ts/index.php/csr_corp/save',
						submitEmptyText: false,
						waitMsg: 'Saving Data...',
						success: function(form, action) {
							csrCorpNewWin.hide();
							csrCorpStore.load();
						}
						//,
						//failure: function(form, action) {
						//  Ext.Msg.alert('alert', '保存失败。如有问题请联系管理员。');
						//}
					});
				}
			},{
				icon:'/ts/misc/resources/icons/x_24.png',
				text: '取消',
				scale:'medium',
				handler: function(){
					this.up('form').getForm().reset(true);
					this.up('window').hide();
				}
			},{xtype:'box',flex:1}]
		}],
		items:[
		{xtype:'hiddenfield',name:'csr_corp_id'},
		{
			xtype:'fieldset',
			title: '====<b>类别</b>====',
			border:0,
			layout: {
				type: 'hbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			items:[
			{xtype:'combo',queryMode:'local',store:chCorpCatList,valueField:'id',displayField:'text',forceSelection:true,width:300,name:'csr_corp_cat'             ,fieldLabel:'客户类别'},
			{xtype:'textfield',name:'csr_corp_cat_reason'      ,fieldLabel:'客户类别评判理由'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>公司基本信息</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
			{xtype:'textfield',width:500,name:'csr_corp_name'            ,fieldLabel:'公司名称'},
			{xtype:'textfield',name:'csr_corp_bname'           ,fieldLabel:'公司简称'},
			{xtype:'textfield',width:300,name:'csr_corp_industry'            ,fieldLabel:'公司所属行业'},
			{xtype:'textfield',width:700,name:'csr_corp_addr_reg'        ,fieldLabel:'公司注册地址'},
			{xtype:'textfield',width:700,name:'csr_corp_addr_main'       ,fieldLabel:'公司主要办公地址'},
			{xtype:'textfield',name:'csr_corp_regcpt'          ,fieldLabel:'公司注册资本'},
			{xtype:'textfield',width:700,name:'csr_corp_biz'             ,fieldLabel:'公司主营业务'},
			{xtype:'textfield',name:'csr_corp_web'             ,fieldLabel:'公司网址'},
			{xtype:'textareafield',width:700,name:'csr_corp_plusinfo'        ,fieldLabel:'公司其他主要信息'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>公司人员信息</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
			{xtype:'textareafield',width:700,name:'csr_corp_director'        ,fieldLabel:'公司主要股东及其主要履历'},
			{xtype:'textareafield',width:700,name:'csr_corp_legalperson'     ,fieldLabel:'公司法人及主要履历'},
			{xtype:'textareafield',width:700,name:'csr_corp_CEO'             ,fieldLabel:'公司总经理及主要履历'},
			{xtype:'textareafield',width:700,name:'csr_corp_manager'         ,fieldLabel:'公司主要高管及主要履历'},
			{
			xtype:'fieldset',
			title: '====<b>联系人1</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
				{xtype:'textfield',width:300,name:'csr_corp_contact1_name'   ,fieldLabel:'联系人1姓名'},
				{xtype:'textfield',name:'csr_corp_contact1_title'  ,fieldLabel:'联系人1职位'},
				{xtype:'textfield',name:'csr_corp_contact1_phone'  ,fieldLabel:'联系人1电话'},
				{xtype:'textfield',name:'csr_corp_contact1_email'  ,fieldLabel:'联系人1邮箱'},
				{xtype:'textareafield',width:700,name:'csr_corp_contact1_CV'     ,fieldLabel:'联系人1主要履历'}
				]
			},{
			xtype:'fieldset',
			title: '====<b>联系人2</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
				{xtype:'textfield',width:300,name:'csr_corp_contact2_name'   ,fieldLabel:'联系人2姓名'},
				{xtype:'textfield',name:'csr_corp_contact2_title'  ,fieldLabel:'联系人2职位'},
				{xtype:'textfield',name:'csr_corp_contact2_phone'  ,fieldLabel:'联系人2电话'},
				{xtype:'textfield',name:'csr_corp_contact2_email'  ,fieldLabel:'联系人2邮箱'},
				{xtype:'textareafield',width:700,name:'csr_corp_contact2_CV'     ,fieldLabel:'联系人2主要履历'}
				]
			},{
			xtype:'fieldset',
			title: '====<b>联系人3</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
				{xtype:'textfield',width:300,name:'csr_corp_contact3_name'   ,fieldLabel:'联系人3姓名'},
				{xtype:'textfield',name:'csr_corp_contact3_title'  ,fieldLabel:'联系人3职位'},
				{xtype:'textfield',name:'csr_corp_contact3_phone'  ,fieldLabel:'联系人3电话'},
				{xtype:'textfield',name:'csr_corp_contact3_email'  ,fieldLabel:'联系人3邮箱'},
				{xtype:'textareafield',width:700,name:'csr_corp_contact3_CV'     ,fieldLabel:'联系人3主要履历'}
				]
			}]
		},{
			xtype:'fieldset',
			title: '====<b>理财团队</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
			{xtype:'textfield',name:'csr_corp_yearly_amount'   ,fieldLabel:'公司最近年度募资额'},
			{xtype:'numberfield',width:300,name:'csr_corp_FP_no'           ,fieldLabel:'公司理财师人数'},
			{xtype:'numberfield',width:300,name:'csr_corp_branch_no'       ,fieldLabel:'公司分公司个数'},
			{xtype:'combo',queryMode:'local',store:chCorpBizStyleList,valueField:'id',displayField:'text',forceSelection:true,name:'csr_corp_biz_style',fieldLabel:'公司销售风格'},
			{xtype:'textfield',name:'csr_corp_biz_dir_percent' ,fieldLabel:'公司直销占销售额比例'},
			{xtype:'textfield',name:'csr_corp_biz_type'        ,fieldLabel:'公司主销产品类别'},
			{xtype:'textfield',name:'csr_corp_biz_partner'     ,fieldLabel:'公司主要金融机构合作伙伴'},
			{xtype:'textareafield',width:700,name:'csr_corp_biz_plusinfo'    ,fieldLabel:'公司理财业务其他情况'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>投行团队</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
			{xtype:'textfield',name:'csr_corp_yearly_issue'    ,fieldLabel:'公司最近年度发行额'},
			{xtype:'numberfield',width:300,name:'csr_corp_IP_no'           ,fieldLabel:'公司投行团队人数'},
			{xtype:'combo',queryMode:'local',store:chCorpInvStyleList,valueField:'id',displayField:'text',forceSelection:true,name:'csr_corp_inv_style'       ,fieldLabel:'公司投行发行风格'},
			{xtype:'combo',queryMode:'local',store:chCorpInvChtypeList,valueField:'id',displayField:'text',forceSelection:true,width:500,name:'csr_corp_inv_chtype'      ,fieldLabel:'公司投行发行渠道'},
			{xtype:'textareafield',width:700,name:'csr_corp_inv_case'        ,fieldLabel:'公司投行业务的成功案例'},
			{xtype:'textareafield',width:700,name:'csr_corp_inv_plusinfo'    ,fieldLabel:'公司投行业务的其他情况'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>合作信息</b>====',
			border:0,
			layout: {
				type: 'vbox'
			},
			items:[
			{xtype:'textfield',name:'csr_corp_coop_partner'    ,fieldLabel:'目前主要合作的竞争方'},
			{xtype:'textfield',name:'csr_corp_coop_FSC_dir'    ,fieldLabel:'与我司合作方向'},
			{xtype:'textfield',name:'csr_corp_coop_FSC_wish'   ,fieldLabel:'与我司合作意愿'},
			{xtype:'textfield',name:'csr_corp_follow'          ,fieldLabel:'后续跟进策略'},
			{xtype:'textfield',name:'csr_corp_FSC_channel'     ,fieldLabel:'我司渠道部负责人'},
			{xtype:'textfield',name:'csr_corp_FSC_pdt'         ,fieldLabel:'我司产品部负责人'}
			]
		}]
	}]
});
var csrChannelNewWin=Ext.create('Ext.window.Window',{
	resizeable:false,
	closeAction:"hide",
	closable:false,
	title:'额度信息编辑',
	titleAlign:'center',
	layout:{
		type:'vbox',
		//defaultMargins: {top: 0, right: 5, bottom: 0, left: 5},
        align:'stretch'
	},
	width:920,
	items:[
	{
		xtype:"form",
		width:890,
		height:500,
		//margin:'10 0 0 0',
        //padding:'10 0 0 0',
		autoScroll :true,
		//hidden:true,
		//collapsible:true,
		//collapseDirection : 'left',
		//collapsed : true,
		//title:'额度信息编辑',
		border:0,
		waitTitle:"Pleas wait...",
		layout:{
			type:'vbox',
			align: 'stretch',
			defaultMargins: {top: 0, right: 5, bottom: 0, left: 5}
		},
		fieldDefaults:{
			lableWidth:120,
			width:440,
			allowBlank: true,
			labelAlign:'right'
		},
		dockedItems: [{
			dock: 'bottom',
			xtype: 'toolbar',
			scale:'medium',
            border:0,
			bodyPadding: 5,
			items: [{xtype:'box',flex:1},{
				icon:'/ts/misc/resources/icons/check_24.png',
				text: '确认',
				scale:'medium',
				formBind: true, //only enabled once the form is valid
				disabled: true,
				handler: function() {
					this.up('form').getForm().submit({
						url: '/ts/index.php/csr_channel/save',
						submitEmptyText: false,
						waitMsg: 'Saving Data...',
						success: function(form, action) {
							csrChannelNewWin.hide();
							csrChannelStore.load();
						}
						//,
						//failure: function(form, action) {
						//  Ext.Msg.alert('alert', '保存失败。如有问题请联系管理员。');
						//}
					});
				}
			},{
				icon:'/ts/misc/resources/icons/x_24.png',
				text: '取消',
				scale:'medium',
				handler: function(){
					this.up('form').getForm().reset(true);
					this.up('window').hide();
				}
			},{xtype:'box',flex:1}]
		}],
		items:[
		{xtype:'hiddenfield',name:'csr_channel_id'},
		{
			xtype:'fieldset',
			title: '====<b>类别</b>====',
			border:0,
			layout: {
				type: 'hbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			items:[
			{xtype:'combo',queryMode:'local',store:chChannelCatList,valueField:'id',displayField:'text',forceSelection:true,width:300,name:'csr_channel_cat',fieldLabel:'客户类别'},
			{xtype:'textfield',name:'csr_channel_cat_reason',fieldLabel:'客户类别评判理由'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>渠道人员基本信息</b>====',
			border:0,
			layout: {
				type: 'vbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			items:[
			{xtype:'textfield',name:'csr_channel_name',fieldLabel:'姓名'},
			{xtype:'textfield',name:'csr_channel_gender',fieldLabel:'性别'},
			{xtype:'textfield',name:'csr_channel_age',fieldLabel:'年龄'},
			{xtype:'textfield',name:'csr_channel_hometown',fieldLabel:'籍贯'},
			{xtype:'textfield',name:'csr_channel_telephone',fieldLabel:'固定电话'},
			{xtype:'textfield',name:'csr_channel_mobile',fieldLabel:'手机'},
			{xtype:'textfield',name:'csr_channel_qq',fieldLabel:'qq'},
			{xtype:'textfield',name:'csr_channel_fax',fieldLabel:'传真'},
			{xtype:'textfield',name:'csr_channel_wechat',fieldLabel:'微信'},
			{xtype:'textfield',name:'csr_channel_email',fieldLabel:'邮箱'},
			{xtype:'textfield',name:'csr_channel_email',fieldLabel:'第二邮箱'},
			{xtype:'textfield',width:700,name:'csr_channel_interests',fieldLabel:'兴趣爱好'},
			{xtype:'textfield',width:700,name:'csr_channel_proper_comm',fieldLabel:'比较接受的沟通方式'},
			{xtype:'textareafield',width:700,name:'csr_channel_person_plusinfo',fieldLabel:'个人其他需要说明的状况'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>渠道公司信息</b>====',
			border:0,
			layout: {
				type: 'vbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			items:[
			{xtype:'textfield',name:'csr_channel_corp_industry',fieldLabel:'服务行业'},
			{xtype:'textfield',width:700,name:'csr_channel_corp_name',fieldLabel:'公司名称'},
			{xtype:'textfield',name:'csr_channel_corp_depart',fieldLabel:'部门'},
			{xtype:'textfield',name:'csr_channel_corp_title',fieldLabel:'职位'},
			{xtype:'textareafield',width:700,name:'csr_channel_past_work',fieldLabel:'过往主要任职经历'},
			{xtype:'textareafield',width:700,name:'csr_channel_edu',fieldLabel:'过往主要教育经历'},
			{xtype:'textareafield',width:700,name:'csr_channel_prof_plusinfo',fieldLabel:'职业其他需要说明的状况'},
			{xtype:'combo',queryMode:'local',store:chChannelCsrTypeList,valueField:'id',displayField:'text',forceSelection:true,name:'csr_channel_csr_type',fieldLabel:'服务客户类别'},
			{xtype:'combo',queryMode:'local',store:chChannelCsrStyleList,valueField:'id',displayField:'text',forceSelection:true,name:'csr_channel_csr_style',fieldLabel:'服务客户偏好'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>合作信息</b>====',
			border:0,
			layout: {
				type: 'vbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			items:[
			{xtype:'textfield',name:'csr_channel_pdt_channel',fieldLabel:'目前接触理财产品渠道'},
			{xtype:'textfield',name:'csr_channel_coop_FSC_dir',fieldLabel:'与我司合作方向'},
			{xtype:'textfield',name:'csr_channel_coop_FSC_wish',fieldLabel:'与我司合作意愿'},
			{xtype:'textfield',name:'csr_channel_follow',fieldLabel:'后续跟进策略'}
			]
		}]
	}]
});
var csrPersonNewWin=Ext.create('Ext.window.Window',{
	resizeable:false,
	closeAction:"hide",
	closable:false,
	title:'个人客户信息编辑',
	titleAlign:'center',
	layout:{
		type:'vbox',
		//defaultMargins: {top: 0, right: 5, bottom: 0, left: 5},
        align:'stretch'
	},
	width:870,
	items:[
	{
		xtype:"form",
		width:850,
		height:500,
		//margin:'10 0 0 0',
        //padding:'10 0 0 0',
		autoScroll :true,
		//hidden:true,
		//collapsible:true,
		//collapseDirection : 'left',
		//collapsed : true,
		//title:'个人客户信息编辑',
		border:0,
		waitTitle:"Pleas wait...",
		layout:{
			type:'vbox',
			align: 'stretch',
			defaultMargins: {top: 0, right: 5, bottom: 0, left: 5}
		},
		fieldDefaults:{
			lableWidth:50,
			width:440,
			allowBlank: true,
			labelAlign:'right'
		},
		dockedItems: [{
			dock: 'bottom',
			xtype: 'toolbar',
			scale:'medium',
            border:0,
			bodyPadding: 5,
			items: [{xtype:'box',flex:1},{
				icon:'/ts/misc/resources/icons/check_24.png',
				text: '确认',
				scale:'medium',
				formBind: true, //only enabled once the form is valid
				disabled: true,
				handler: function() {
					this.up('form').getForm().submit({
						url: '/ts/index.php/csr_person/save',
						submitEmptyText: false,
						waitMsg: 'Saving Data...',
						success: function(form, action) {
							csrPersonNewWin.hide();
							csrPersonStore.load();
						}
						//,
						//failure: function(form, action) {
						//  Ext.Msg.alert('alert', '保存失败。如有问题请联系管理员。');
						//}
					});
				}
			},{
				icon:'/ts/misc/resources/icons/x_24.png',
				text: '取消',
				scale:'medium',
				handler: function(){
					this.up('form').getForm().reset(true);
					this.up('window').hide();
				}
			},{xtype:'box',flex:1}]
		}],
		items:[
		{xtype:'hiddenfield',name:'csr_person_id'},
		{
			xtype:'fieldset',
			title: '====<b>类别</b>====',
			border:0,
			layout: {
				type: 'hbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			items:[
			{xtype:'combo',queryMode:'local',store:chPersonCatList,valueField:'id',displayField:'text',forceSelection:true,width:300,name:'csr_person_cat',fieldLabel:'客户类别'},
			{xtype:'textfield',name:'csr_person_cat_reason',fieldLabel:'客户类别评判理由'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>客户基本信息</b>====',
			border:0,
			layout: {
				type: 'vbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			fieldDefaults:{
				lableWidth:100,
				width:440,
				allowBlank: true,
				labelAlign:'right'
			},
			items:[
			{xtype:'textfield',width:300,name:'csr_person_name',fieldLabel:'姓名'},
			{xtype:'textfield',width:300,name:'csr_person_gender',fieldLabel:'性别'},
			{xtype:'textfield',width:300,name:'csr_person_age',fieldLabel:'年龄'},
			{xtype:'textfield',width:300,name:'csr_person_hometown',fieldLabel:'籍贯'},
			{xtype:'textfield',width:300,name:'csr_person_telephone',fieldLabel:'固定电话'},
			{xtype:'textfield',width:300,name:'csr_person_mobile',fieldLabel:'手机'},
			{xtype:'textfield',width:300,name:'csr_person_qq',fieldLabel:'qq'},
			{xtype:'textfield',width:300,name:'csr_person_wechat',fieldLabel:'微信'},
			{xtype:'textfield',width:300,name:'csr_person_email',fieldLabel:'邮箱'},
			{xtype:'textfield',width:700,name:'csr_person_interests',fieldLabel:'兴趣爱好'},
			{xtype:'textfield',width:700,name:'csr_person_proper_comm',fieldLabel:'比较接受的<br />沟通方式'},
			{xtype:'textareafield',width:700,name:'csr_person_plusinfo',fieldLabel:'个人其他需要<br />说明的状况'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>客户职业信息</b>====',
			border:0,
			layout: {
				type: 'vbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			fieldDefaults:{
				lableWidth:120,
				width:440,
				allowBlank: true,
				labelAlign:'right'
			},
			items:[
			{xtype:'textfield',width:300,name:'csr_person_corp_industry',fieldLabel:'服务行业'},
			{xtype:'textfield',width:700,name:'csr_person_corp_name',fieldLabel:'公司名称'},
			{xtype:'textfield',width:300,name:'csr_person_corp_property',fieldLabel:'公司性质'},
			{xtype:'textfield',width:300,name:'csr_person_corp_title',fieldLabel:'职位'},
			{xtype:'textareafield',width:700,name:'csr_person_past_work',fieldLabel:'过往主要任职经历'},
			{xtype:'textareafield',width:700,name:'csr_person_edu',fieldLabel:'过往主要教育经历'},
			{xtype:'textareafield',width:700,name:'csr_person_prof_plusinfo',fieldLabel:'职业其他需要说明的状况'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>客户家庭信息</b>====',
			border:0,
			layout: {
				type: 'vbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			fieldDefaults:{
				lableWidth:120,
				width:440,
				allowBlank: true,
				labelAlign:'right'
			},
			items:[
			{xtype:'textfield',name:'csr_person_marriage',fieldLabel:'婚姻状况'},
			{xtype:'textfield',name:'csr_person_child',fieldLabel:'生育状况'},
			{xtype:'textfield',name:'csr_person_child_no',fieldLabel:'子女个数'},
			{xtype:'textfield',name:'csr_person_child1_age',fieldLabel:'子女1年龄'},
			{xtype:'textfield',name:'csr_person_child2_age',fieldLabel:'子女2年龄'},
			{xtype:'textareafield',width:700,name:'csr_person_family_plusinfo',fieldLabel:'家庭其他需要说明的状况'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>客户资产状况</b>====',
			border:0,
			layout: {
				type: 'vbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			fieldDefaults:{
				lableWidth:120,
				width:440,
				allowBlank: true,
				labelAlign:'right'
			},
			items:[
			{xtype:'textfield',name:'csr_person_income_p',fieldLabel:'个人年收入'},
			{xtype:'textfield',name:'csr_person_assets_p',fieldLabel:'个人总资产'},
			{xtype:'textfield',name:'csr_person_income_h',fieldLabel:'家庭年收入'},
			{xtype:'textfield',name:'csr_person_assets_h',fieldLabel:'家庭总资产'},
			{xtype:'textfield',name:'csr_person_financial_dicision',fieldLabel:'家庭理财决策模式'},
			{xtype:'textareafield',width:700,name:'csr_person_financial_plusinfo',fieldLabel:'资产其他需要说明的状况'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>资产配置状况</b>====',
			border:0,
			layout: {
				type: 'vbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			fieldDefaults:{
				lableWidth:120,
				width:440,
				allowBlank: true,
				labelAlign:'right'
			},
			items:[
			{xtype:'textfield',width:700,name:'csr_person_assets_estate',fieldLabel:'房产'},
			{xtype:'textfield',width:700,name:'csr_person_assets_trusts',fieldLabel:'信托类'},
			{xtype:'textfield',width:700,name:'csr_person_assets_fixed',fieldLabel:'其他固定收益类'},
			{xtype:'textfield',width:700,name:'csr_person_assets_stock',fieldLabel:'股票类'},
			{xtype:'textfield',width:700,name:'csr_person_assets_PE',fieldLabel:'股权投资类'},
			{xtype:'textfield',width:700,name:'csr_person_assets_float',fieldLabel:'其他浮动收益类'},
			{xtype:'textfield',width:700,name:'csr_person_assets_other',fieldLabel:'另类'},
			{xtype:'textfield',width:700,name:'csr_person_assets_oversea',fieldLabel:'海外'},
			{xtype:'textareafield',width:700,name:'csr_person_assets_plusinfo',fieldLabel:'资产配置其他需要说明的状况'}
			]
		},{
			xtype:'fieldset',
			title: '====<b>合作信息</b>====',
			border:0,
			layout: {
				type: 'vbox',
				defaultMargins: {top:0,left:10,buttom:0,right:10}
			},
			fieldDefaults:{
				lableWidth:120,
				width:440,
				allowBlank: true,
				labelAlign:'right'
			},
			items:[
			{xtype:'textfield',name:'csr_person_financial_pref',fieldLabel:'客户理财偏好'},
			{xtype:'textfield',name:'csr_person_financial_demand',fieldLabel:'客户理财需求'},
			{xtype:'textfield',name:'csr_person_financial_channel',fieldLabel:'目前的理财渠道'},
			{xtype:'textfield',name:'csr_person_offer_pdt',fieldLabel:'可能提供服务的产品'},
			{xtype:'textfield',name:'csr_person_offer_mode',fieldLabel:'可能提供服务的模式'}
			]
		}]
	}]
});
csrCorpEditWin.on({
	hide: function(){
  		Ext.getBody().unmask();
	}
});
csrChannelEditWin.on({
	hide: function(){
  		Ext.getBody().unmask();
	}
});
csrPersonEditWin.on({
	hide: function(){
  		Ext.getBody().unmask();
	}
});
csrCorpNewWin.on({
	hide: function(){
  		Ext.getBody().unmask();
	}
});
csrChannelNewWin.on({
	hide: function(){
  		Ext.getBody().unmask();
	}
});
csrPersonNewWin.on({
	hide: function(){
  		Ext.getBody().unmask();
	}
});

csrCorpFollowWin.on({
	hide: function(){
  		Ext.getBody().unmask();
	}
});
csrChannelFollowWin.on({
	hide: function(){
  		Ext.getBody().unmask();
	}
});
csrPersonFollowWin.on({
	hide: function(){
  		Ext.getBody().unmask();
	}
});
var viewport = Ext.create('Ext.Viewport', {
	layout: {
		type: 'border',
		padding: 0
	},
	baseCls:'customT',
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
			xtype:'box',
			flex:1
		},{
			icon: '/ts/misc/resources/icons/message_add.png',
			scale:'medium',
			text:'新增公司客户' ,
            id:'BtnNewCorp',
			handler:function(){
				//todo
				corpForm=csrCorpNewWin.down('form');
				Ext.getBody().mask();
				csrCorpNewWin.show();
				corpForm.getForm().reset(true);
				corpForm.down('hiddenfield[name="csr_corp_id"]').setValue(-1);
			}
		},{
			icon: '/ts/misc/resources/icons/document_recommend_24.png',
			scale:'medium',
			text:'查看公司客户跟进' ,
            id:'BtnCorpFollows',
			handler:function(){
				//todo
				//personForm=csrPersonEditWin.down('form');
				//personForm.getForm().reset(true);
				//personForm.down('hiddenfield[name="csr_person_id"]').setValue(-1);
				//Ext.getBody().mask();
				//csrPersonEditWin.show();
			}
		},{
			icon: '/ts/misc/resources/icons/message_add.png',
			scale:'medium',
			text:'新增渠道客户' ,
            id:'BtnNewChannel',
			handler:function(){
				//todo
				channelForm=csrChannelNewWin.down('form');
				Ext.getBody().mask();
				csrChannelNewWin.show();
				channelForm.getForm().reset(true);
				channelForm.down('hiddenfield[name="csr_channel_id"]').setValue(-1);
			}
		},{
			icon: '/ts/misc/resources/icons/document_recommend_24.png',
			scale:'medium',
			text:'查看渠道客户跟进' ,
            id:'BtnChannelFollows',
			handler:function(){
				//todo
				//personForm=csrPersonEditWin.down('form');
				//personForm.getForm().reset(true);
				//personForm.down('hiddenfield[name="csr_person_id"]').setValue(-1);
				//Ext.getBody().mask();
				//csrPersonEditWin.show();
			}
		},{
			icon: '/ts/misc/resources/icons/message_add.png',
			scale:'medium',
			text:'新增个人客户' ,
            id:'BtnNewPerson',
			handler:function(){
				//todo
				personForm=csrPersonNewWin.down('form');
				Ext.getBody().mask();
				csrPersonNewWin.show();
				personForm.getForm().reset(true);
				personForm.down('hiddenfield[name="csr_person_id"]').setValue(-1);
			}
		},{
			icon: '/ts/misc/resources/icons/document_recommend_24.png',
			scale:'medium',
			text:'查看个人客户跟进' ,
            id:'BtnPersonFollows',
			handler:function(){
				//todo
				//personForm=csrPersonEditWin.down('form');
				//personForm.getForm().reset(true);
				//personForm.down('hiddenfield[name="csr_person_id"]').setValue(-1);
				//Ext.getBody().mask();
				//csrPersonEditWin.show();
			}
		},{
			text:'返回功能选择',
			scale:'medium',
			icon:'/ts/misc/resources/icons/curved_arrow_24.png',
			handler:function(){window.location.href='/ts/index.php/tsmain';}
		}]
	}, customerPanel, 
	{
		xtype:'toolbar',
		region:'south',
		border:0,
		height:20,
		items:[{
			xtype:'box',flex:1
		},{
			xtype:'box',
			html:'版权所有。上海玉尔投资发展有限公司 - 2012-2013年'
		},{
			xtype:'box',flex:1
		}]
	}]
});

csrCorpStore.load();
//csrChannelStore.load();
//csrPersonStore.loadPage(1);
listControl.load(function(records, operation, success) {
    if(records[0].get("csr_corp") == true){
        customerPanel.remove(Ext.getCmp('corp_list'));
        Ext.getCmp('BtnNewCorp').hide();
    }
    if(records[0].get("csr_channel") == true){
        customerPanel.remove(Ext.getCmp('channel_list'));
        Ext.getCmp('BtnNewChannel').hide();
    }
    if(records[0].get("csr_person") == true){
        customerPanel.remove(Ext.getCmp('person_list'));
        Ext.getCmp('BtnNewPerson').hide();
    }

});

});