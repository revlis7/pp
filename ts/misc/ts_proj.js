Ext.onReady(function() {
	Ext.QuickTips.init();
	
	var params=Ext.Object.fromQueryString(location.search.substring(1));
	var proj_info_tpl;
	fileListStore.setProxy({
		type: 'ajax',
		url: '/ts/index.php/upload/get_list?proj_id='+params.proj_id,
		reader:	{
			type: 'json',
			root: 'data'
		}
	});
	projDetailStore.setProxy({
		type: 'ajax',
		url: '/ts/index.php/proj/detail_view?proj_id='+params.proj_id,
		reader: {
			type: 'json',
			root: 'data'
		}
	});
	projStore.setProxy({
		type: 'ajax',
		url: '/ts/index.php/proj/proj_get?proj_id='+params.proj_id,
		reader: {
			type: 'json',
			root: 'data'
		}
	});
	var ProjWin=Ext.create("Ext.window.Window",{
		resizeable:false,
		closeAction:"hide",
		closable:false,
		title:'编辑项目',
		titleAlign : "center",
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
				defaultMargins: {top: 0, right: 5, bottom: 0, left: 5}
			},
			fieldDefaults:{
				lableWidth:90,
				width:240,
				labelAlign:'right',
				allowBlank: false
			},
			dockedItems: [{
				xtype:'box',
				flex:1
			},{
				dock: 'bottom',
				xtype: 'toolbar',
				bodyPadding: 5,
				items: [{
					icon:'/ts/misc/resources/icons/grid.png',
					text: '确定',
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
						//		ProjInfoForm.getForm().loadRecord(records[0]);
							proj_info_tpl.overwrite(Ext.getCmp('projInfoPanel').body,projStore.getAt(0).data);
							});
						} 
						//,
						//failure: function(form, action) {
						//	Ext.Msg.alert('alert', '保存失败。如有问题请联系管理员。');
						//}
						});
					}
				},{
					icon:'/ts/misc/resources/icons/cross.gif',
					text: '取消',
						scale: 'medium',
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
							 valueField: 'id',	 //value值字段
							 displayField: 'text',	//显示文本字段
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
							 xtype:'textfield',
							 emptyText:"子类别...",
							 width:170,
							 name:'sub_category'
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
			},{
				xtype:'box',
				html:'<span style="color:#666666">注：标记*号的是必填项。下列字段不会被渠道及外部用户所见：销售类别，产品经理备注。</span>'
			}]
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
	messageWin.on({
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
				text:'编辑项目',
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
				text:'新增项目消息' ,
				handler:function(){
					//todo
					messageForm=messageWin.down('form');
					messageForm.getForm().reset();
					messageForm.down('hiddenfield[name="proj_id"]').setValue(params.proj_id);
					messageForm.down('hiddenfield[name="id"]').setValue(-1);
					Ext.getBody().mask();
					messageWin.show();
				}
			},{
				icon: '/ts/misc/resources/icons/add.gif',
				scale:'medium',
				text:'新增额度信息' ,
				handler:function(){
					//todo
					AmountEditForm=AmountEditWin.down('form');
					AmountEditForm.getForm().reset();
					AmountEditForm.down('hiddenfield[name="proj_id"]').setValue(params.proj_id);
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
					AmountEditWin.down('form').getForm().reset();
					uploadWin.down('hiddenfield[name="proj_id"]').setValue(params.proj_id);
					Ext.getBody().mask();
					uploadWin.show();
				}
			},{
				icon: '/ts/misc/resources/icons/upload.gif',
				text:'一键结束该项目',
				scale:'medium',
				handler:function(){
					Ext.Msg.show({
						title:'结束项目',
						msg: '您是否确认要结束该项目？',
						buttons: Ext.Msg.OKCANCEL,
						icon: Ext.Msg.QUESTION,
						fn:function(buttonId){
							if(buttonId=='ok'){
								Ext.Ajax.request({
									url: '/ts/index.php/proj/proj_close_submit?proj_id='+params.proj_id,
									success: function(response){
										projDetailStore.load();
									}
								});
							}
						}
					});
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
				autoScroll :true,
				dockedItems:[{
					dock: 'top',
					xtype: 'toolbar',
					bodyPadding: 5,
					items: [{
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
									Ext.getCmp('BtnPdtRefuse').hide();
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
									Ext.getCmp('BtnPdtAccept').hide();
									Ext.getCmp('BtnPdtRefuse').hide();
								} ,
								failure: function(form, action) {
									Ext.Msg.alert('错误！', '保存失败。如有问题请联系管理员。');
								}
							})
						}
					}]
				}]
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
		});		
	});

	fileListStore.load();
	
});