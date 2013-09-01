Ext.onReady(function() {
Ext.QuickTips.init();

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
							projDetailStore.load();
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
					this.up('form').getForm().reset();
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
							projDetailStore.load();
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
					this.up('form').getForm().reset();
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
			{xtype:'textfield',name:'csr_channel_wechat',fieldLabel:'微信'},
			{xtype:'textfield',name:'csr_channel_email',fieldLabel:'邮箱'},
			{xtype:'textfield',name:'csr_channel_interests',fieldLabel:'兴趣爱好'},
			{xtype:'textfield',name:'csr_channel_proper_comm',fieldLabel:'比较接受的沟通方式'},
			{xtype:'textareafield',name:'csr_channel_person_plusinfo',fieldLabel:'个人其他需要说明的状况'}
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
			{xtype:'textfield',name:'csr_channel_corp_name',fieldLabel:'公司名称'},
			{xtype:'textfield',name:'csr_channel_corp_depart',fieldLabel:'部门'},
			{xtype:'textfield',name:'csr_channel_corp_title',fieldLabel:'职位'},
			{xtype:'textfield',name:'csr_channel_past_work',fieldLabel:'过往主要任职经历'},
			{xtype:'textfield',name:'csr_channel_edu',fieldLabel:'过往主要教育经历'},
			{xtype:'textareafield',name:'csr_channel_prof_plusinfo',fieldLabel:'职业其他需要说明的状况'},
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
							projDetailStore.load();
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
					this.up('form').getForm().reset();
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
			handler:function(){
				//todo
				corpForm=csrCorpEditWin.down('form');
				corpForm.getForm().reset();
				corpForm.down('hiddenfield[name="csr_corp_id"]').setValue(-1);
				Ext.getBody().mask();
				csrCorpEditWin.show();
			}
		},{
			icon: '/ts/misc/resources/icons/message_add.png',
			scale:'medium',
			text:'新增渠道客户' ,
			handler:function(){
				//todo
				channelForm=csrChannelEditWin.down('form');
				channelForm.getForm().reset();
				channelForm.down('hiddenfield[name="csr_channel_id"]').setValue(-1);
				Ext.getBody().mask();
				csrChannelEditWin.show();
			}
		},{
			icon: '/ts/misc/resources/icons/message_add.png',
			scale:'medium',
			text:'新增个人客户' ,
			handler:function(){
				//todo
				personForm=csrPersonEditWin.down('form');
				personForm.getForm().reset();
				personForm.down('hiddenfield[name="csr_person_id"]').setValue(-1);
				Ext.getBody().mask();
				csrPersonEditWin.show();
			}
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

});
