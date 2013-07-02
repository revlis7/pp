Ext.onReady(function() {
	Ext.QuickTips.init();

	var params=Ext.Object.fromQueryString(location.search.substring(1));
	var proj_info_tpl;
	
	var projStore=Ext.create('Ext.data.JsonStore', {
		fields: [
		{name:'proj_id',type:'integer'},
		{name:'category',type:'string'},
		{name:'sub_category',type:'string'},
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
		{name:'manager_remark',type:'string'}
		],
		proxy: {
			type: 'ajax',
			url: '/ts/index.php/proj/proj_get?proj_id='+params.proj_id,
			reader: {
				type: 'json',
				root: 'data'
			}
		}
	});

	var projdetailStore=Ext.create('Ext.data.JsonStore', {
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
			url: '/ts/index.php/proj/detail_view?proj_id='+params.proj_id,
			reader: {
				type: 'json',
				root: 'data'
			}
		}
	});
	
	var fileListStore=Ext.create('Ext.data.JsonStore', {
		fields: [
		{name:'id'	,type:'integer' },
		{name:'proj_id'	,type:'integer' },
		{name:'filename'	,type:'string' },
		{name:'filesize'	,type:'integer' },
		{name:'editor'	,type:'string' },
		{name:'create_ts'	,type:'date' },
		],
		proxy: {
			type: 'ajax',
			url: '/ts/index.php/upload/get_list?proj_id='+params.proj_id,
			reader: {
				type: 'json',
				root: 'data'
			}
		}
	});

//	var proj_detail_info_tpl=Ext.create('Ext.XTemplate',[
//		'<tr><td class="r_ex_td_pre"><b></b></td><td>',
//		'</td></tr>'
//	]);

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
						fieldLabel: '项目期限(月)*',
						name:'month'
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
			},{
				xtype:'box',
				html:'<span style="color:#666666">注：标记*号的是必填项。下列字段不会被渠道及外部用户所见：销售类别，产品经理备注。</span>'
			}]
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
								projdetailStore.load();
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
			
			buttons: [{
				text: '上传',
				handler: function() {
					var form = this.up('form').getForm();
					if(form.isValid()){
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
		}]
	});

	var AmountDetailsGrid=Ext.create('Ext.grid.Panel',{
		store: projdetailStore,
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
					Ext.Msg.show({
						title:'删除文件',
						msg: '您是否确认要删除认购金额为 '+amount+' 万？',
						buttons: Ext.Msg.OKCANCEL,
						icon: Ext.Msg.QUESTION,
						fn:function(buttonId){
							if(buttonId=='ok'){
								AmountEditForm=AmountEditWin.down('form').getForm();
								AmountEditForm.getForm().loadRecord(grid.getStore().getAt(rowIndex));
								AmountEditForm.getForm().submit({
									url: '/ts/index.php/proj/detail_delete_submit',
									submitEmptyText: false,
									waitMsg: 'Saving Data...',
									success: function(form, action) {
										projdetailStore.removeAt(rowIndex);
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
		{text:'现结费用',	 dataIndex:'imm_payment', filtable:true, style: "text-align:center;",align: 'right',width:80,       
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
					AmountEditForm.getForm().loadRecord(grid.getStore().getAt(rowIndex));
					AmountEditForm.getForm().submit({
							url: '/ts/index.php/proj/file_delete_submit',
							submitEmptyText: false,
							waitMsg: 'Saving Data...',
							success: function(form, action) {
								fileListStore.removeAt(rowIndex);
							} ,
							failure: function(form, action) {
								Ext.Msg.alert('错误！', '保存失败。如有问题请联系管理员。');
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
		{text:'文件名',         dataIndex:'filename',      filtable:true, style: "text-align:center;",align: 'left',width:300},
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
			width:40,style: "text-align:center;",align: 'center',
			sortable: false,
			items: [{
				icon: '/ts/misc/resources/icons/cross.gif',
				tooltip: '删除这条消息',
				handler: function(grid, rowIndex, colIndex) {
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
				}
			}]
		},
		{text:'时间',         dataIndex:'addtime',      filtable:true, style: "text-align:center;",align: 'left',width:100},
		{text:'修改信息',       dataIndex:'messages',      filtable:true, style: "text-align:center;",align: 'right',width:380}
		]
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
	
	var projAcceptForm = Ext.create('Ext.form.Panel', {
		bodyPadding: 5,
    	width: 350,
    	url: '/ts/index.php/proj/proj_accept_submit',
    	hidden:true,
    	items: [{
    		fieldLabel: 'proj_id',
        	name: 'proj_id',
        	allowBlank: false
    	}]
    });
	var projApplyForm = Ext.create('Ext.form.Panel', {
		bodyPadding: 5,
    	width: 350,
    	url: '/ts/index.php/proj/proj_apply_submit',
    	hidden:true,
    	items: [{
    		fieldLabel: 'proj_id',
        	name: 'proj_id',
        	allowBlank: false
    	}]
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
				text:'批准上线',
				scale:'medium',
				hidden:true,
				handler:function(){
					projAcceptForm.down('textfield[name="proj_id"]').setValue(params.proj_id);
					projAcceptForm.getForm.submit({
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
	
	projStore.load(function(records, operation, success) {
		projdetailStore.load(function(records, operation, success) {
			if(records.get("pdt_status")<>"上线通过" && records.get("pdt_status")<>"申请中"){
				Ext.getCmp('BtnPdtApply').show();
			}
			var loginname = Ext.util.Cookies.get("loginname");
			if(records.get("pdt_status")=="申请中" && loginname.indexOf("DR">0)){
				Ext.getCmp('BtnPdtAccept').show();
			}
			var detailString="";
			//ProjInfoForm.getForm().loadRecord(records[0]);
			Ext.Array.forEach(records,function(record){
			detailString+='<pre>'+record.get("sub_name")+record.get("month")+", "+(record.get("amount")<10000?(record.get("amount")+"万"):(record.get("amount")/10000+"亿"))+record.get("profit")+'%</pre>';
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
					if(d<>"上线通过"){
						return '<tr><td style="padding:20px;border:1px;"><span style="background-color:#003366;color:#FFFFFF">请注意该项目尚未上线！</span></td></tr>';
					} else {
						return '';
					}
				}
			},{
				cusNum:function(n){return (n<1)?(n*10000+"万"):(n+"亿")}
			},{
				cusGrade:function(value){  
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
				}
			}
			]);
			proj_info_tpl.overwrite(Ext.getCmp('projInfoPanel').body,projStore.getAt(0).data);
			//proj_info_window.show();
		});		
	});
	//projdetailStore.load();
	fileListStore.load();
	
});