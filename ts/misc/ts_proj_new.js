Ext.onReady(function() {
	Ext.QuickTips.init();

	//var params=Ext.Object.fromQueryString(location.search.substring(1));
	var proj_id;
	var proj_info_tpl;

	var ProjWin=Ext.create("Ext.window.Window",{
		resizeable:false,
		closeAction:"hide",
		closable:false,
		title:'编辑项目信息',
		titleAlign:'center',
		width:940,
		items:[
		{
			xtype:"form",
			bodyPadding:5,
			trackResetOnLoad:true,
			border:0,
			waitTitle:"Pleas wait...",
			layout:{
				type:'vbox',
				defaultMargins: {top: 5, right: 5, bottom: 5, left: 5}
			},
			fieldDefaults:{
				lableWidth:90,
				width:240,
				labelAlign:'right',
				allowBlank: false
			},
			dockedItems: [{
				dock: 'bottom',
				xtype: 'toolbar',
				bodyPadding: 5,
				items: [{
						xtype:'box',
						flex:1
				},{
					icon:'/ts/misc/resources/icons/grid.png',
					text: '确定',
					id:'ok_create',
					hidden:false,
					scale: 'medium',
					formBind: true, //only enabled once the form is valid
					disabled: true,
					handler: function() {
						this.up('form').getForm().submit({
							url: '/ts/index.php/proj/proj_create_submit',
							submitEmptyText: false,
							waitMsg: 'Saving Data...',
							success: function(form, action) {
								proj_id=action.result.proj_id;
								ProjWin.close();
								ProjWin.down('button[id=ok_edit]').setVisible(true);
								ProjWin.down('button[id=ok_create]').setVisible(false);
								ProjWin.down('button[id=cancel_edit]').setVisible(true);
								ProjWin.down('button[id=cancel_create]').setVisible(false);
								projStore.setProxy({
									type: 'ajax',
									url: '/ts/index.php/proj/proj_get?proj_id='+proj_id,
									reader: {
											type: 'json',
											root: 'data'
									}
								});
								projDetailStore.setProxy({
									type: 'ajax',
									url: '/ts/index.php/proj/detail_view?proj_id='+proj_id,
									reader: {
											type: 'json',
											root: 'data'
									}
								});
								fileListStore.setProxy({
									type: 'ajax',
									url: '/ts/index.php/upload/get_list?proj_id='+proj_id,
									reader: {
											type: 'json',
											root: 'data'
									}
								});
								fileListStore.load();
								projStore.load(function(records, operation, success) {
									projDetailStore.load(function(records, operation, success) {
										var detailString="";
										//ProjInfoForm.getForm().loadRecord(records[0]);
										Ext.Array.forEach(records,function(record){
											detailString+='<pre>'+record.get("sub_name")+record.get("month")+"个月, "+(record.get("amount")<10000?(record.get("amount")+"万"):(record.get("amount")/10000+"亿"))+': '+record.get("profit")+'%</pre>';
										});
										proj_info_tpl=Ext.create('Ext.XTemplate',[
    									'<table style="border-collapse:collapse;">{pdt_status:this.cusPdtStatus()}<tr><td style="padding:20px;border:1px;"><table style="border-collapse:collapse;">',
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
													return '<tr><td style="padding:20px;border:1px;"><span style="background-color:#003366;color:#FFFFFF;font-size:20px;font_weight:bold;">请注意该项目尚未上线！</span></td></tr>';
												} else {
													return '';
												}
											}
										},{
											cusNum:function(n){return (n<1)?(n*10000+"万"):(n+"亿")}
										},{
											cusGrade:gradeFn
										}
										]);
										proj_info_tpl.overwrite(Ext.getCmp('projInfoPanel').body,projStore.getAt(0).data);
									});
									if(records[0].get("pdt_status")=="上线通过" || records[0].get("pdt_status")=="申请中"){
										Ext.getCmp('BtnPdtApply').hide();
									} else {
										Ext.getCmp('BtnPdtApply').show();
									}
									var loginname = Ext.util.Cookies.get("loginname");
									if(records[0].get("pdt_status")=="申请中" && loginname.indexOf("DR">0)){
										Ext.getCmp('BtnPdtAccept').show();
										Ext.getCmp('BtnPdtRefuse').show();
									} else {
										Ext.getCmp('BtnPdtAccept').hide();
										Ext.getCmp('BtnPdtRefuse').hide();
									}
								});
							}
							//,
							//failure: function(form, action) {
							//  Ext.Msg.alert('alert', '保存失败。如有问题请联系管理员。');
							//}
						});
					}
				},{
					icon:'/ts/misc/resources/icons/grid.png',
					text: '确定',
					id:'ok_edit',
					hidden:true,
					scale: 'medium',
					formBind: true, //only enabled once the form is valid
					disabled: true,
					handler: function() {
						this.up('form').getForm().submit({
							url: '/ts/index.php/proj/proj_update_submit',
							submitEmptyText: false,
							waitMsg: 'Saving Data...',
							success: function(form, action) {
								ProjWin.close();
								projStore.load(function(records, operation, success) {
									projDetailStore.load(function(records, operation, success) {
										var detailString="";
										//ProjInfoForm.getForm().loadRecord(records[0]);
										Ext.Array.forEach(records,function(record){
											detailString+='<pre>'+record.get("sub_name")+record.get("month")+"个月, "+(record.get("amount")<10000?(record.get("amount")+"万"):(record.get("amount")/10000+"亿"))+': '+record.get("profit")+'%</pre>';
										});
										proj_info_tpl=Ext.create('Ext.XTemplate',[
        								'<table style="border-collapse:collapse;">{pdt_status:this.cusPdtStatus()}<tr><td style="padding:20px;border:1px;"><table style="border-collapse:collapse;">',
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
													return '<tr><td style="padding:20px;border:1px;"><span style="background-color:#003366;color:#FFFFFF">请注意该项目尚未上线！</span></td></tr>';
												} else {
													return '';
												}
											}
										},{
											cusNum:function(n){return (n<1)?(n*10000+"万"):(n+"亿")}
										},{
											cusGrade:gradeFn
										}
										]);
										var firstRec=projStore.getAt(0);
										proj_info_tpl.overwrite(Ext.getCmp('projInfoPanel').body,firstRec.data);
										//proj_info_window.show();
										if(firstRec.get("pdt_status")=="上线通过" || firstRec.get("pdt_status")=="申请中"){
												Ext.getCmp('BtnPdtApply').hide();
										} else {
											Ext.getCmp('BtnPdtApply').show();
										}
										Ext.Ajax.request({
									    	url: '/ts/index.php/proj/proj_operate_privilege',
											success: function(response){
												if (firstRec.get("pdt_status")=="申请中") {
													Ext.getCmp('BtnPdtAccept').show();
													Ext.getCmp('BtnPdtRefuse').show();
												}
										    }
										});
										//proj_info_window.show();
									});
								});
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
					id:'cancel_create',
					scale: 'medium',
					hidden:false,
					handler: function(){
						Ext.util.History.back();
					}
				},{
					icon:'/ts/misc/resources/icons/cross.gif',
					text: '取消',
					id:'cancel_edit',
					scale: 'medium',
					hidden:true,
					handler: function(){
						this.up('window').close();
					}
				},{
						xtype:'box',
						flex:1
				}]
			}],
			items:[
			{
				xtype:'panel',
				region:'east',
				border:0,
				layout: {
					type: 'hbox',
					defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
				},
				items:[
				{
					xtype:'fieldset',
					title: '====<b>项目基本信息</b>====',
					border:0,
					//collapsible: true,
					defaults: {
						labelWidth: 89,
						anchor: '100%',
						layout: {
							type: 'vbox'
						}
					},
					items:[{xtype:'box',height:10,border:0},
					{
						xtype:'hiddenfield',
						fieldLabel: 'proj_id',
						name:'proj_id'
					},
					{
						xtype:'fieldcontainer',
						layout:'hbox',
						flex:1,
						width:420,
						region:'north',
						labelAlign:'right',
						fieldLabel: '项目类别*',
						items:[
						{//主类别
							 xtype:'combo',
							 emptyText:"主类别...",
							 width:140,
							 name:'category',
							 store : chCategoryList,
							 queryMode : 'local',
							 forceSelection:true,
							 triggerAction: 'all',
							 valueField: 'id',   //value值字段
							 displayField: 'text',  //显示文本字段
							 listeners: { // 监听选择事件
									 select: function() {
											chSubCategoryList.removeAll();
											if (this.getValue() == '固定收益类') {
												 chSubCategoryList.loadData(chFixedList,true);
											} else if (this.getValue() == '浮动收益类') {
												 chSubCategoryList.loadData(chFloatingList,true);
											}
									 }
							 }
						},
						{//子类别
							 xtype:'combo',
							 emptyText:"子类别...",
							 width:170,
							 name:'sub_category',
							 store : chSubCategoryList,
							 queryMode: 'local',
							 triggerAction: 'all',
							 valueField: 'value',
							 displayField: 'text',
							 forceSelection:true,
							 listeners: {
									 select: function() {
//	                       alert(comboBuild.getValue() + '-' + comboRoom.getValue());
											}
							 }
						}]
					},{
						xtype:'textfield',
						fieldLabel: '发行方*',
						name:'issue',
						width:320
					},{
						xtype:'textfield',
						fieldLabel: '项目名称*',
						name:'name',
						width:400
					},{
						xtype:'numberfield',
						fieldLabel: '融资规模(亿)*',
						name:'scale'
					},{
						xtype:'combo',
						fieldLabel: '分配周期*',
						name:'cycle',
						queryMode : 'local',
						store : chCycleList,
						valueField: 'id',
						displayField: 'text',
						forceSelection:true
					},{
						xtype:'combo',
						fieldLabel: '项目收益属性*',
						name:'profit_property',
						queryMode : 'local',
						store : chProfitPropertyList,
						valueField: 'id',
						displayField: 'text',
						forceSelection:true
					},{
						xtype:'textfield',
						fieldLabel: '资金投向*',
						width:420,
						name:'flow_of_fund'
					},{
						xtype:'textareafield',
						fieldLabel: '项目亮点*',
						width:420,
						height:100,
						name:'highlights'
					}, {
						xtype:'combo',
						fieldLabel: '产品经理*',
						width:220,
						name:'manager',
						queryMode : 'local',
						store : chManagerList,
						valueField: 'id',
						displayField: 'text',
						forceSelection:true
					}, {
						xtype:'combo',
						fieldLabel: '产品等级*',
						width:220,
						name:'grade',
						queryMode : 'local',
						store : chGradeList,
						valueField: 'id',
						displayField: 'text',
						forceSelection:true
					},{
						xtype:'combo',
						fieldLabel: '销售类别*',
						name:'exclusive',
						width:220,
						queryMode : 'local',
						store : chExclusiveList,
						valueField: 'id',
						displayField: 'text',
						forceSelection:true
					}]
				},{
					xtype:'fieldset',
					title: '====<b>项目其他信息</b>====',
					border:0,
					//collapsible: true,
					defaults: {
						labelWidth: 89,
						anchor: '100%',
						labelAlign: 'top',
						layout: {
							type: 'hbox',
							defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
						}
					},
					items:[{xtype:'box',height:5,border:0},
					{
						xtype:'textareafield',
						fieldLabel: '合同情况',
						width:420,
						name:'contract',
						allowBlank: true
					},{
						xtype:'textareafield',
						fieldLabel: '打款账户',
						width:420,
						name:'pay_account',
						allowBlank: true
					},{
						xtype:'textareafield',
						fieldLabel: '项目进度',
						width:420,
						height:80,
						name:'countdown',
						allowBlank: true
					},{
						xtype:'textareafield',
						fieldLabel: '备注',
						width:420,
						height:80,
						name:'remark',
						allowBlank: true
					},{
						xtype:'textareafield',
						fieldLabel: '产品经理备注',
						width:420,
						height:80,
						name:'manager_remark',
						allowBlank: true
					 }]
				}]
			},{xtype:'box',html:'<span style="color:#666666">注：标记*号的是必填项。下列字段不会被渠道及外部用户所见：销售类别，产品经理备注。</span>'}]
		}]
	});
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
						var form = this.up('form').getForm();
						if(form.isValid())
						{
							form.submit({
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
	AmountEditWin.on({
    	hide: function(){
      		Ext.getBody().unmask();
    	}
	});
	uploadWin.on({
    	hide: function(){
      		Ext.getBody().unmask();
    	}
	});
	ProjWin.on({
    	hide: function(){
      		Ext.getBody().unmask();
    	}
	});

	var viewport = Ext.create('Ext.Viewport', {
		layout: {
			type: 'border'
		},
		defaults: {
		},
		items: [{
			xtype: 'toolbar',
			height:50,
			border:0,
			region:'north',
			items:[
			{
				xtype:'image',
				src:'/ts/misc/resources/firstshin.jpg',
				width:240,
				height:38
			},{
				xtype:'box',
				html:'<span class="app-header2">项目编辑</span>'
			},{
				xtype:'tbtext',
				text:'您可以：'
			},{
				text:'编辑项目信息',
				scale:'medium',
				icon: '/ts/misc/resources/icons/cog_edit.png',
				handler:function(){
					ProjWin.down('form').getForm().loadRecord(projStore.first());
					Ext.getBody().mask();
					ProjWin.show();
				}
			},{
				icon: '/ts/misc/resources/icons/add.gif',
				scale:'medium',
				text:'新增额度信息' ,
				handler:function(){
					//todo
					AmountEditForm=AmountEditWin.down('form');
					AmountEditForm.getForm().reset();
					AmountEditForm.down('hiddenfield[name="proj_id"]').setValue(proj_id);
					AmountEditForm.down('hiddenfield[name="proj_detail_id"]').setValue(-1);
					AmountEditForm.down('numberfield[name="amount"]').setValue(null);
					Ext.getBody().mask();
					AmountEditWin.show();
				}
			},{
				icon: '/ts/misc/resources/icons/upload.gif',
				text:'上传项目文件',
				scale:'medium',
				handler:function(){
					uploadWin.down('hiddenfield[name="proj_id"]').setValue(params.proj_id);
					Ext.getBody().mask();
					uploadWin.show();
				}
			},{
				icon: '/ts/misc/resources/icons/upload.gif',
				id:'BtnPdtApply',
				text:'申请上线',
				scale:'medium',
				hidden:true,
				handler:function(){
					projApplyForm.down('textfield[name="proj_id"]').setValue(params.proj_id);
					projApplyForm.getForm.submit({
						url:'/ts/index.php/proj/proj_apply_submit',
						submitEmptyText: false,
						waitMsg: '正在保存后台数据……',
						success: function(form, action) {
							Ext.getCmp('BtnPdtApply').hide();
						} ,
						failure: function(form, action) {
							Ext.Msg.alert('错误！', '保存失败。如有问题请联系管理员。');
						}
					})
				}
			},{
				icon: '/ts/misc/resources/icons/upload.gif',
				id:'BtnPdtAccept',
				text:'上线批准',
				scale:'medium',
				hidden:true,
				handler:function(){
					projApplyForm.down('textfield[name="proj_id"]').setValue(params.proj_id);
					projApplyForm.getForm.submit({
						url:'/ts/index.php/proj/proj_accept_submit',
						submitEmptyText: false,
						waitMsg: '正在保存后台数据……',
						success: function(form, action) {
							Ext.getCmp('BtnPdtAccept').hide();
						} ,
						failure: function(form, action) {
							Ext.Msg.alert('错误！', '保存失败。如有问题请联系管理员。');
						}
					})
				}
			},{
				icon: '/ts/misc/resources/icons/upload.gif',
				id:'BtnPdtRefuse',
				text:'上线驳回',
				scale:'medium',
				hidden:true,
				handler:function(){
					projApplyForm.down('textfield[name="proj_id"]').setValue(params.proj_id);
					projApplyForm.getForm.submit({
						url:'/ts/index.php/proj/proj_refuse_submit',
						submitEmptyText: false,
						waitMsg: '正在保存后台数据……',
						success: function(form, action) {
							Ext.getCmp('BtnPdtRefuse').hide();
						} ,
						failure: function(form, action) {
							Ext.Msg.alert('错误！', '保存失败。如有问题请联系管理员。');
						}
					})
				}
			},{
				xtype:'box',
				flex:1
			},{
				text:'返回项目管理列表',
				icon:'/ts/misc/resources/icons/plugin.gif',
				scale:'medium',
				handler:function(){window.location.href='/ts/index.php/proj/manage';}
			},{
				text:'关闭窗口',
				icon:'/ts/misc/resources/icons/cross.gif',
				scale:'medium',
				handler:function(){window.close();}
			}]
		},{
			xtype:'panel', 
			margin:'0 0 0 0',
			border:0,
			region:'center',
			layout:'border',
			items:[{
				id:'projInfoPanel',
				xtype:'panel',
				region:'west',
				width:480,
				title:'项目信息',
				html:'正在加载项目信息...',
				autoScroll :true
			}, {
				id:'projDetailPanel',
				xtype:'panel',
				width:800,
				region:'center',
				border:0,
				layout:{
					type:'vbox',
					align:'stretch'
				},
				items:[
					RecentChangeGrid,
					AmountDetailsGrid,
					FileListGrid
				]
			}]
		}]
	});
	Ext.getBody().mask();
	ProjWin.show();
});