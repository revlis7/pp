Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', '/ts/misc/ux');
Ext.require(['Ext.ux.RowExpander']);

Ext.onReady(function() {

var colStore=Ext.create('Ext.data.JsonStore', {
  fields: [
    {name:'company_id',type:'string',dataIndex:'id'},
    {name:'company_name',type:'string'},
    {name:'text',type:'string'}
  ],
  proxy: {
    type: 'ajax',
    url: '/ts/index.php/relation/company',
    reader: {
      type: 'json',
      root: 'data'
    }
  }
});

var contentStore=Ext.create('Ext.data.JsonStore', {
  fields: [
    {name:'update_ts',type:'date'},
    {name:'status',type:'string'},
    {name:'update_remark',type:'string'}
  ],
  proxy: {
    type: 'ajax',
    url: '/ts/index.php/relation/detail?relation_id=1',
    reader: {
      type: 'json',
      root: 'data'
    }
  }
});
var projEditWin=Ext.create('Ext.window.Window', {
  resizeable:false,
  closeAction:"hide",
  title:'新增项目',
  width:540,
  height:600,
  layout:'fit',
  items:[{
  	xtype:'form',
    bodyPadding:5,
    trackResetOnLoad:true,
    border:0,
    height:550,
    waitTitle:"Pleas wait...",
    layout:{
      type:'vbox',
      defaultMargins: {top: 0, right: 5, bottom: 0, left: 5}
    },
    dockedItems: [{
      dock: 'bottom',
      xtype: 'toolbar',
      bodyPadding: 5,
      items: [{
        icon:'/ts/misc/resources/icons/grid.png',
        text: '确定',
        formBind: true, //only enabled once the form is valid
        disabled: true,
        handler: function() {
          this.up('form').getForm().submit({
            url: '/ts/index.php/relation/proj_create',
            submitEmptyText: false,
            waitMsg: 'Saving Data...',
            success: function(form, action) {
              this.up('window').hide();
              contentStore.load();
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
        handler: function(){
          this.up('window').hide();
        }
      }]
    }],
    items:[
    {
    	xtype:'textfield',
    	fieldLabel:'项目名称',
      name:'proj_name',
      allowBlank: false
    },{
    	xtype:'textfield',
    	fieldLabel:'融资额(万)',
      name:'amount',
      allowBlank: false
    },{
    	xtype:'textfield',
    	fieldLabel:'融资期限(月)',
      name:'month',
      allowBlank: false
    },{
    	xtype:'textfield',
    	fieldLabel:'融资最高成本(%)',
      name:'profit_max',
      allowBlank: false
    },{
    	xtype:'textfield',
    	fieldLabel:'融资建议成本(%)',
      name:'profit_suggest',
      allowBlank: false
    },{
    	xtype:'textfield',
    	fieldLabel:'担保方式',
      name:'guarantee_mode',
      allowBlank: false
    },{
    	xtype:'textfield',
    	fieldLabel:'还款来源',
      name:'repayment',
      allowBlank: false
    },{
    	xtype:'textfield',
    	fieldLabel:'项目关系',
      name:'proj_rel',
      allowBlank: false
    },{
    	xtype:'datefield',
    	fieldLabel:'项目截止期',
      name:'proj_deadline',
      allowBlank: false
    },{
    	xtype:'textfield',
    	fieldLabel:'备注',
      name:'remark',
      allowBlank: false
    }]
  }]
});

var contentWin=Ext.create('Ext.window.Window', {
  resizeable:false,
  closeAction:"hide",
  title:'项目历史',
  width:540,
  height:600,
  layout:'vbox',
  items:[{
  	xtype:'form',
  	hidden:true,
    bodyPadding:5,
    trackResetOnLoad:true,
    border:0,
    waitTitle:"Pleas wait...",
    layout:{
      type:'vbox',
      defaultMargins: {top: 0, right: 5, bottom: 0, left: 5}
    },
    dockedItems: [{
      dock: 'bottom',
      xtype: 'toolbar',
      bodyPadding: 5,
      items: [{
        icon:'/ts/misc/resources/icons/grid.png',
        text: '确定',
        formBind: true, //only enabled once the form is valid
        disabled: true,
        handler: function() {
          this.up('form').getForm().submit({
            url: '/ts/index.php/proj/proj_update_submit',
            submitEmptyText: false,
            waitMsg: 'Saving Data...',
            success: function(form, action) {
              this.up('window').hide();
              contentStore.load();
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
        handler: function(){
          this.up('form').hide();
        }
      }]
    }],
    items:[
    {
      xtype:'hiddenfield',
      fieldLabel: 'relation_id',
      name:'relation_id',
      allowBlank: false
    },{
      xtype:'datefield',
      fieldLabel: '更新日期',
      name:'update_ts',
      allowBlank: false
    },{
    	xtype:'textfield',
    	fieldLabel:'项目状态',
      name:'status',
      allowBlank: false
    },{
    	xtype:'textfield',
    	fieldLabel:'备注',
      name:'update_remark',
      allowBlank: false
    }]
  },{
  	xtype:'button',
  	text:'更新状态',
  	handler:function(){
  		this.up('window').down('form').show();
  	}
  },{
  	xtype:'grid',
  	store:contentStore,
  	height:300,
  	columns:[
  	  {text:"更新时间",dataIndex:"create_ts",type:"date"},
  	  {text:"项目状态",dataIndex:"status",type:"string"},
  	  {text:"更新说明",dataIndex:"update_remark",type:"string"}
    ]
  }]
});

var companyEditWin=Ext.create('Ext.window.Window',{
  resizeable:false,
  closeAction:"hide",
  title:'新建公司',
  width:540,
  height:600,
  layout:'fit',
  items:[{
  	xtype:'form',
    bodyPadding:5,
    trackResetOnLoad:true,
    border:0,
    height:300,
    waitTitle:"Pleas wait...",
    layout:{
      type:'vbox',
      defaultMargins: {top: 0, right: 5, bottom: 0, left: 5}
    },
    dockedItems: [{
      dock: 'bottom',
      xtype: 'toolbar',
      bodyPadding: 5,
      items: [{
        icon:'/ts/misc/resources/icons/grid.png',
        text: '确定',
        formBind: true, //only enabled once the form is valid
        disabled: true,
        handler: function() {
          this.up('form').getForm().submit({
            url: '/ts/index.php/relation/company_create',
            submitEmptyText: false,
            waitMsg: 'Saving Data...',
            success: function(form, action) {
              this.up('window').hide();
              contentStore.load();
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
        handler: function(){
          this.up('window').hide();
        }
      }]
    }],
		items:[{
      xtype:'textfield',
      name:'company_name',
      fieldLabel:'公司名',
      allowBlank: false
    },{
      xtype:'textfield',
      name:'remark',
      fieldLabel:'公司备注',
      allowBlank: true
    }]
  }]
			
});

var relationEditWin=Ext.create('Ext.window.Window',{
  resizeable:false,
  closeAction:"hide",
  title:'新建投资关系',
  width:540,
  height:600,
  layout:'fit',
  items:[{
  	xtype:'form',
    bodyPadding:5,
    trackResetOnLoad:true,
    border:0,
    height:300,
    waitTitle:"Pleas wait...",
    layout:{
      type:'vbox',
      defaultMargins: {top: 0, right: 5, bottom: 0, left: 5}
    },
    dockedItems: [{
      dock: 'bottom',
      xtype: 'toolbar',
      bodyPadding: 5,
      items: [{
        icon:'/ts/misc/resources/icons/grid.png',
        text: '确定',
        formBind: true, //only enabled once the form is valid
        disabled: true,
        handler: function() {
          this.up('form').getForm().submit({
            url: '/ts/index.php/relation/relation_create',
            submitEmptyText: false,
            waitMsg: 'Saving Data...',
            success: function(form, action) {
              this.up('window').hide();
              contentStore.load();
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
        handler: function(){
          this.up('window').hide();
        }
      }]
    }],
		items:[{
      xtype:'hiddenfield',
      name:'company_id',
      allowBlank: false
    },{
      xtype:'hiddenfield',
      name:'proj_id',
      allowBlank: false
    },{
      xtype:'textfield',
      fieldLabel: '联系人',
      name:'contact_person',
      allowBlank: false
    },{
      xtype:'datefield',
      fieldLabel: '更新日期',
      name:'update_ts',
      allowBlank: false
    },{
    	xtype:'textfield',
    	fieldLabel:'项目状态',
      name:'status',
      allowBlank: false
    },{
    	xtype:'textfield',
    	fieldLabel:'备注',
      name:'update_remark',
      allowBlank: false
    }]
  }]
			
});

colStore.load(function(records, operation, success) {
  var gridColConfig=[{name:"proj_name",dataIndex:"proj_name",type:"string"}];
  
  records.forEach(function(record){
  	var company_name=record.get("company_name");
  	var company_id=record.get("id");
  	
    gridColConfig.push({
    	text:company_name,
    	dataIndex:company_id,
    	type:record.get("type"),
    	renderer:function (val, metadata, record) {
        metadata.style = 'cursor: pointer;';
        var status=record.relation().queryBy(function(record){
          return record.get("company_id")==company_id
        });
        if(status.length>0){
          return status.first().get("status")
        } else return "";
      }
    });
  });

  var gridStore=Ext.create('Ext.data.Store',{
    model: 'Rproj'
  });
  
  gridStore.load();
  
  var fgrid=Ext.create('Ext.grid.Panel',{
  	store:gridStore,
  	columns:gridColConfig,
  	dockedItems:[{
      dock: 'bottom',
      xtype: 'toolbar',
      bodyPadding: 5,
      items: [{
        text: '新增项目',
        handler:function(){
        	projEditWin.show();
        }
      },{
        text: '新增公司',
        handler:function(){
        	companyEditWin.show();
        }
      }]
    }],
  	height:600,
  	renderTo:Ext.getBody(),
  	plugins:[{
      ptype: 'rowexpander',
      selectRowOnExpand : true,
      rowBodyTpl : [
        '<table><tr><td style="padding:10px;border:1px;"><table>',
        '<tr><td class="r_ex_td_pre"><b>项目名称</b></td><td class="r_ex_td_main"><pre>{proj_name}</pre></td></tr>',
        '<tr><td class="r_ex_td_pre"><b>融资额</b></td><td class="r_ex_td_main"><pre>{amount:this.cusNum()}</pre></td></tr>',
        '<tr><td class="r_ex_td_pre"><b>融资期限</b></td><td class="r_ex_td_main"><pre>{month}</pre></td></tr>',
        '<tr><td class="r_ex_td_pre"><b>融资最高成本</b></td><td class="r_ex_td_main"><pre>{profit_max}</pre>%</td></tr>',
        '<tr><td class="r_ex_td_pre"><b>融资建议成本</b></td><td class="r_ex_td_main"><pre>{profit_suggest}</pre>%</td></tr>',
        '<tr><td class="r_ex_td_pre"><b>担保方式</b></td><td class="r_ex_td_main"><pre>{guarantee_mode}</pre></td></tr>',
        '<tr><td class="r_ex_td_pre"><b>还款来源</b></td><td class="r_ex_td_main"><pre>{repayment}</pre></td></tr>',
        '<tr><td class="r_ex_td_pre"><b>项目关系</b></td><td class="r_ex_td_main"><pre>{proj_rel}</pre></td></tr>',
        '<tr><td class="r_ex_td_pre"><b>项目截止期</b></td><td class="r_ex_td_main"><pre>{proj_deadline:this.cusDate()}</pre></td></tr>',
        '<tr><td class="r_ex_td_pre"><b>备注</b></td><td class="r_ex_td_main"><pre>{remark}</pre></td></tr>',
        '</table></td></tr></table>',{
          cusDate:function(d){return Ext.Date.format(d,'Y年m月d日');}
        },{
          cusNum:function(n){return (n<10000)?(n+"万"):(n/10000+"亿")}
        }
      ]
    }],
  	listeners:{ 
      'cellclick':function(grid,td,cellIndex,record,tr,rowIndex){
      	if(cellIndex>1){
      		var company_id=grid.getHeaderCt().getHeaderAtIndex(cellIndex).dataIndex;
      		var companyData=record.relation().queryBy(function(record){return record.get("company_id")==company_id});
      		if(companyData.items.length>0){
      	    contentStore.setProxy({
              type: 'ajax',
              url: '/ts/index.php/relation/detail?relation_id='+companyData.items[0].data.id,
              reader: {
                type: 'json',
                root: 'data'
              }
            });
            contentStore.load();
            contentWin.setTitle(record.get("proj_name"));
            relationEditWin.down('hiddenfield[name="relation_id"]').setValue(companyData.items[0].data.id);
            contentWin.show();
          } else {
          	relationEditWin.down('hiddenfield[name="proj_id"]').setValue(record.get("id"));
          	relationEditWin.down('hiddenfield[name="company_id"]').setValue(company_id);
          	relationEditWin.show();
          }
        }
      } 
    }
  });
});

});
