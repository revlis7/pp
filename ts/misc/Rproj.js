Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', '/ts/misc/ux');
Ext.require(['Ext.ux.RowExpander']);

Ext.onReady(function() {
var fgrid=0;
  var chStatusList=Ext.create('Ext.data.ArrayStore', {
    fields: ['id', 'text'],
    data: [
      ['顺利','顺利'],
      ['等待','等待'],
      ['停滞','停滞']
    ]
  });

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

var gridStore=Ext.create('Ext.data.Store',{
  model: 'Rproj'
});

var contentStore=Ext.create('Ext.data.JsonStore', {
  fields: [
    {name:'id',type:'int'},
    {name:'company_id',type:'integer'},
    {name:'proj_id',type:'integer'},
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
  width:470,
  height:500,
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
              projEditWin.hide();
              gridStore.load();
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
      width:400,
      allowBlank: false
    },{
    	xtype:'numberfield',
    	fieldLabel:'融资额(万)',
      name:'amount',
      width:300,
      allowBlank: false
    },{
    	xtype:'numberfield',
    	fieldLabel:'融资期限(月)',
      name:'month',
      width:300,
      allowBlank: false
    },{
    	xtype:'numberfield',
    	fieldLabel:'融资最高成本(%)',
      width:300,
      name:'profit_max',
      allowBlank: false
    },{
    	xtype:'numberfield',
    	fieldLabel:'融资建议成本(%)',
      width:300,
      name:'profit_suggest',
      allowBlank: false
    },{
    	xtype:'textareafield',
    	fieldLabel:'担保方式',
      width:400,
      name:'guarantee_mode',
      allowBlank: false
    },{
    	xtype:'textareafield',
    	fieldLabel:'还款来源',
      width:400,
      name:'repayment',
      allowBlank: false
    },{
    	xtype:'textareafield',
    	fieldLabel:'项目关系',
      width:400,
      name:'proj_rel',
      allowBlank: false
    },{
    	xtype:'datefield',
    	fieldLabel:'项目截止期',
      width:300,
      name:'proj_deadline',
      allowBlank: false
    },{
    	xtype:'textareafield',
    	fieldLabel:'备注',
      width:400,
      name:'remark',
      allowBlank: false
    }]
  }]
});

projEditWin.on({
    hide: function(){
      Ext.getBody().unmask();
    }
  });
var contentWin=Ext.create('Ext.window.Window', {
  resizeable:false,
  closeAction:"hide",
  title:'项目历史',
  width:526,
  height:400,
  layout:'vbox',
  dockedItems: [{
    dock: 'top',
    xtype: 'toolbar',
    bodyPadding: 5,
    items: [{
      icon:'/ts/misc/resources/icons/grid.png',
      text: '更新状态',
      scale:'medium',
      formBind: true, //only enabled once the form is valid
      handler: function() {
        this.up('toolbar').hide();
        this.up('window').down('form').show();
      }
    }]
  }],
  items:[{
    xtype:'form',
    hidden:true,
    bodyPadding:5,
    trackResetOnLoad:true,
    border:0,
    width:520,
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
            url: '/ts/index.php/relation/relation_update',
            submitEmptyText: false,
            waitMsg: 'Saving Data...',
            success: function(form, action) {
              form.owner.hide();
              contentWin.down('toolbar').show();
              contentStore.load();
              gridStore.load();
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
          this.up('window').down('toolbar').show();
        }
      }]
    }],
    items:[
    {
      xtype:'hiddenfield',
      fieldLabel: 'company_id',
      name:'company_id',
      allowBlank: false
    },{
      xtype:'hiddenfield',
      fieldLabel: 'proj_id',
      name:'proj_id',
      allowBlank: false
    },{
      xtype:'datefield',
      width:300,
      fieldLabel: '更新日期',
      name:'update_ts',
      allowBlank: false
    },{
    	xtype:'combo',
      width:300,
    	fieldLabel:'项目状态',
              queryMode : 'local',
              store : chStatusList,
              valueField: 'id',
              displayField: 'text',
              forceSelection:true,
      name:'status',
      allowBlank: false
    },{
    	xtype:'textareafield',
      width:400,
    	fieldLabel:'备注',
      name:'update_remark'
    }]
  },{
    xtype:'grid',
    store:contentStore,
    height:370,
    columns:[
      {text:"更新时间",width:120,dataIndex:"create_ts",renderer:new Ext.util.Format.dateRenderer("Y-m-d")},
      {text:"项目状态",width:100,dataIndex:"status",type:"string"},
      {text:"更新说明",width:300,dataIndex:"update_remark",type:"string"}
    ]
  }]
});
contentWin.on({
    hide: function(){
      Ext.getBody().unmask();
    }
  });
var companyEditWin=Ext.create('Ext.window.Window',{
  resizeable:false,
  closeAction:"hide",
  title:'新建公司',
  width:480,
  height:180,
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
              companyEditWin.hide();
              colStore.load();
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
                  width:400,
      allowBlank: false
    },{
      xtype:'textareafield',
      name:'remark',
      fieldLabel:'公司备注',
                  width:400,
      allowBlank: true
    }]
  }]
			
});

companyEditWin.on({
    hide: function(){
      Ext.getBody().unmask();
    }
  });

var relationEditWin=Ext.create('Ext.window.Window',{
  resizeable:false,
  closeAction:"hide",
  title:'新建投资关系',
  width:540,
  height:300,
  layout:'fit',
  items:[{
    xtype:'form',
    bodyPadding:5,
    trackResetOnLoad:true,
    border:0,
    height:200,
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
              relationEditWin.hide();
              gridStore.load();
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
      width:300,
      name:'contact_person',
      allowBlank: false
    },{
      xtype:'datefield',
      fieldLabel: '更新日期',
      width:300,
      name:'update_ts',
      allowBlank: false
    },{
    	xtype:'combo',
      width:300,
    	fieldLabel:'项目状态',
              queryMode : 'local',
              store : chStatusList,
              valueField: 'id',
              displayField: 'text',
              forceSelection:true,
      name:'status',
      allowBlank: false
    },{
    	xtype:'textareafield',
      width:400,
    	fieldLabel:'备注',
      name:'update_remark',
      allowBlank: false
    }]
  }]
			
});

relationEditWin.on({
    hide: function(){
      Ext.getBody().unmask();
    }
  });

colStore.on("load",function(records, operation, success) {
  var gridColConfig=[{name:"proj_name",width:160,dataIndex:"proj_name",type:"string"}];
  
  var recs=records.data.items;
  recs.forEach(function(record){
  	var company_name=record.get("company_name");
  	var company_id=record.get("id");
  	
    gridColConfig.push({
    	text:company_name,
        width:130,
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

  gridStore.load();
  
  if(fgrid!=0){fgrid.destroy()};
  fgrid=Ext.create('Ext.grid.Panel',{
    margin:5,
    region:'center',
    store:gridStore,
    columns:gridColConfig,
    dockedItems:[{
      dock: 'top',
      xtype: 'toolbar',
      bodyPadding: 5,
      items: [{
              xtype:'tbtext',
              text:'您可以：'
            },{
        text: '<b>新增项目</b>',
        icon: '/ts/misc/resources/icons/add.gif',
        scale:'medium',
        handler:function(){
            Ext.getBody().mask();
          projEditWin.show();
        }
      },{
        text: '<b>新增公司</b>',
        icon: '/ts/misc/resources/icons/add.gif',
        scale:'medium',
        handler:function(){
            Ext.getBody().mask();
          companyEditWin.show();
        }
      }]
    }],
    //height:600,
    //renderTo:Ext.getBody(),
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
        '</table></td></tr></table>',
        {
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
            Ext.getBody().mask();
            contentStore.load();
            contentWin.setTitle(record.get("proj_name"));
            contentWin.down('hiddenfield[name="proj_id"]').setValue(record.get("id"));
            contentWin.down('hiddenfield[name="company_id"]').setValue(company_id);
            contentWin.show();
          } else {
            Ext.getBody().mask();
            relationEditWin.down('hiddenfield[name="proj_id"]').setValue(record.get("id"));
            relationEditWin.down('hiddenfield[name="company_id"]').setValue(company_id);
            relationEditWin.show();
          }
        }
      } 
    }
  });
    var loginname = Ext.util.Cookies.get("loginname");
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
        items:[
        {
        	xtype:'image',
                src:'/ts/misc/resources/firstshin_capital.jpg',
          	width:240,
                height:38
        },{
        	xtype:'box',
        	flex:1
        },/*{
                xtype: 'tbtext',
                text:"小提示：双击可以查看项目详细信息。"
        },{
        	xtype:'box',
        	flex:1
        },*/{
        	text:'玉尔财富 - 彩虹桥',
        	icon:'/ts/misc/resources/icons/plugin.gif',
        	scale:'medium',
//                hidden:records[0].get("manage_button"),
        	handler:function(){window.location.href='/ts/index.php/proj/';}
        },{
        	text:'个人信息：'+loginname,
        	icon:'/ts/misc/resources/icons/user.png',
        	scale:'medium',
        	handler:function(){window.location.href='/ts/index.php/user/info';}
        },{
        	text:'退出',
        	scale:'medium',
        	icon:'/ts/misc/resources/icons/cross.gif',
        	handler:function(){window.location.href='/ts/index.php/logout';}
        }]
      },{xtype:'box',height:5,border:0,region:'north'},
      fgrid
      ]
    });
},this);

colStore.load();
});
