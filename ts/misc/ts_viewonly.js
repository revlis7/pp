Ext.require(['Ext.ux.RowExpander']);

Ext.onReady(function() {
  Ext.QuickTips.init();
  var fullGrid;
  
  var recentChangeGrid=Ext.create('Ext.grid.Panel', {
  	region:'north',
  	collapsible:true,
  	collapseDirection:'top',
  	collapseMode:'header',
  	animCollapse : true,
    title:'最近更改',
    maxHeight:150,
    titleCollapse:true,
    border:0,
    store:sampleChanges,
    columns:[
    {text:'时间',             dataIndex:'operate_ts',     filtable:true, width:100,renderer:new Ext.util.Format.dateRenderer("Y-m-d")},
    {text:'修改人',           dataIndex:'realname',     filtable:true, width:100},
    {text:'修改内容',         dataIndex:'operation',     filtable:true, width:800}
    ]
  });
  	  
  var listControl=Ext.create('Ext.data.JsonStore', {
    fields: [
      {name:'proj_id'   ,type:'boolean' },
      {name:'proj_detail_id'   ,type:'boolean' },
      {name:'total_share'      ,type:'boolean' },
      {name:'status'           ,type:'boolean' },
      {name:'exclusive'        ,type:'boolean' },
      {name:'grade'            ,type:'boolean' },
      {name:'category'         ,type:'boolean' },
      {name:'sub_category'     ,type:'boolean' },
      {name:'issue'            ,type:'boolean' },
      {name:'name'             ,type:'boolean' },
      {name:'flow_of_fund'     ,type:'boolean' },
      {name:'highlights'       ,type:'boolean' },
      {name:'month'            ,type:'boolean' },
      {name:'scale'            ,type:'boolean' },
      {name:'cycle'            ,type:'boolean' },
      {name:'amount'           ,type:'boolean' },
      {name:'profit_property'  ,type:'boolean' },
      {name:'profit'           ,type:'boolean' },
      {name:'manager'          ,type:'boolean' },
      {name:'contract'         ,type:'boolean' },
      {name:'remark'           ,type:'boolean' },
      {name:'commission_b_tax' ,type:'boolean' },
      {name:'commission_a_tax' ,type:'boolean' },
      {name:'inner_commission' ,type:'boolean' },
      {name:'outer_commission' ,type:'boolean' },
      {name:'pay'              ,type:'boolean' },
      {name:'paid'             ,type:'boolean' },
      {name:'found'            ,type:'boolean' },
      {name:'quota'            ,type:'boolean' },
      {name:'quota_paid'       ,type:'boolean' },
      {name:'quota_remain'     ,type:'boolean' },
      {name:'main_channel'     ,type:'boolean' },
      {name:'channel_company'  ,type:'boolean' },
      {name:'channel_contact'  ,type:'boolean' },
      {name:'billing_company'  ,type:'boolean' },
      {name:'manager_remark'   ,type:'boolean' }
    ],
    proxy: {
      type: 'ajax',
      //url: '/etc/listControl.json',
      url: '/ts/index.php/api/access_fields',
      reader: {
          type: 'json',
          root: 'data'
      }
    },
    listener:{
    	datachanged:function(){
    	}
    }
  });
  


  listControl.load(function(records, operation, success) {
var strPay="";
if(records[0].get("pay")==false || records[0].get("paid")==false || records[0].get("found")==false){
  strPay += "<tr><td class=\"r_ex_td_pre\"><b>打款信息</b></td><td class=\"r_ex_td_main\"><table><tr>";
  if(records[0].get("pay")==false){
    strPay += "<td width=100px style=\"background: #fff;\">打款日期：</td><td width=100px style=\"background: #fff;\">{pay:this.cusDate()}</td>";
  }
  if(records[0].get("paid")==false){
    strPay += "<td width=100px style=\"background: #fff;\">已打款金额：</td><td width=100px style=\"background: #fff;\">{paid:this.cusNum()}</td>";
  }
  if(records[0].get("found")==false){
    strPay += "<td width=100px style=\"background: #fff;\">成立日期：</td><td width=100px style=\"background: #fff;\">{found:this.cusDate()}</td>";
  }
  strPay += "</tr></table></td></tr>"
}

var strQuota="";
if(records[0].get("quota")==false 
  || records[0].get("quota_paid")==false 
  || records[0].get("quota_remain")==false
){
  strQuota += "<tr><td class=\"r_ex_td_pre\"><b>包销进度信息</b></td><td class=\"r_ex_td_main\"><table><tr>";
  if(records[0].get("quota")==false){
    strQuota += "<td width=100px style=\"background: #fff;\">包销/分销额度：</td><td width=100px style=\"background: #fff;\">{quota:this.cusNum()}</td>";
  }
  if(records[0].get("quota_paid")==false){
    strQuota += "<td width=100px style=\"background: #fff;\">已打款额度：</td><td width=100px style=\"background: #fff;\">{quota_paid:this.cusNum()}</td>";
  }
  if(records[0].get("quota_remain")==false){
    strQuota += "<td width=100px style=\"background: #fff;\">剩余额度：</td><td width=100px style=\"background: #fff;\">{quota_remain:this.cusNum()}</td>";
  }
  strQuota += "</tr></table></td></tr>"
}

var strChannel="";
if(records[0].get("main_channel")==false 
  || records[0].get("channel_company")==false 
  || records[0].get("channel_contact")==false 
  || records[0].get("billing_company")==false 
){
  strChannel += "<tr><td class=\"r_ex_td_pre\"><b>渠道信息</b></td><td class=\"r_ex_td_main\"><table><tr>";
  if(records[0].get("main_channel")==false){
    strChannel += "<td width=100px style=\"background: #fff;\">主销渠道：</td><td width=100px style=\"background: #fff;\">{main_channel}&nbsp;</td>";
  }
  if(records[0].get("channel_company")==false){
    strChannel += "<td width=100px style=\"background: #fff;\">渠道公司：</td><td width=100px style=\"background: #fff;\">{channel_company}</td>";
  }
  if(records[0].get("channel_contact")==false){
    strChannel += "<td width=100px style=\"background: #fff;\">渠道联系人：</td><td width=100px style=\"background: #fff;\">{channel_contact}</td>";
  }
  if(records[0].get("billing_company")==false){
    strChannel += "<td width=100px style=\"background: #fff;\">走帐公司：</td><td width=150px style=\"background: #fff;\">{billing_company}</td>";
  }
  strChannel += "</tr></table></td></tr>"
}

var strManagerRemark="";
if(records[0].get("manager_remark")==false){
  strManagerRemark += "<tr><td class=\"r_ex_td_pre\"><b>产品经理备注</b></td><td class=\"r_ex_td_main\">{manager_remark}</td></tr>";
}
    fullGrid=Ext.create('Ext.grid.Panel', {
      store: sampleStore,
      region:'center',
      border:0,
      columnLines: true,
      columns: [
      {text:'项目状态',columns:[
        {text:'proj_id',     dataIndex:'proj_id',       filtable:true, width:100,hidden:true},
        {text:'proj_detail_id',     dataIndex:'proj_detail_id',       filtable:true, width:100,hidden:true},
        {text:'份额',         dataIndex:'total_share',     filtable:true,sortable : true, width:50,style: "text-align:center;",align: 'center',hidden:records[0].get("total_share"), 
          renderer:function(value,metaData){
            if(value=="OPEN"){
              metaData.style='background:#CCFFCC;color:#000000'
            }
            if(value=="大带小"){
              metaData.style='background:#FFFF99;color:#000000'
            }
            if(value=="无"){
              metaData.style='background:#DFDFDF;color:#606060;'
            }
            return value;
          }},
        {text:'销售状态',     dataIndex:'status',         filtable:true,sortable : true, width:50,style: "text-align:center;",align: 'center', hidden:records[0].get("status"), 
          renderer:function(value,metaData){
            if(value=="在售"){
              metaData.style='background:#CCFFCC;color:#000000'
            }
            if(value=="预约"){
              metaData.style='background:#FFFF99;color:#000000'
            }
            if(value=="结束"){
              metaData.style='background:#DFDFDF;color:#606060;'
            }
            return value;
          }}
      ]},
      {text:'产品信息',columns:[
        //{text:'销售类别',     dataIndex:'exclusive',      filtable:true,sortable : true, width:50, hidden:records[0].get("exclusive")},
        {text:'产品等级',     dataIndex:'grade',          filtable:true,sortable : true, width:50, hidden:records[0].get("grade")},
        //{text:'项目类别',     dataIndex:'category',       filtable:true,sortable : true, width:80, hidden:records[0].get("category")},
        {text:'类别',       dataIndex:'sub_category',    filtable:true,sortable : true, width:150,style: "text-align:center;",align: 'left', hidden:records[0].get("sub_category"),
          renderer: function(value,metaData,record,colIndex,store,view) {  
          var main_subject=record.data.category;
          metaData.tdAttr = 'data-qtip="'+main_subject+'：'+value+'"';
          return main_subject+'：'+value;
        }},
        {text:'发行方',       dataIndex:'issue',         filtable:true,sortable : true, width:100,style: "text-align:center;",align: 'center', hidden:records[0].get("issue")},
        {text:'项目名称',     dataIndex:'name',          filtable:true,sortable : true, width:180,style: "text-align:center;",align: 'left', hidden:records[0].get("name"),
        renderer: function(value,metaData,record,colIndex,store,view) {  
          //var ttip_flow_of_fund=record.data.flow_of_fund;
          //var ttip_highlights=record.data.highlights;
          //var ttip_remark=record.data.remark;
          
          //var ttip='<table><tr><td valign=top style="padding:5px"><b>资金投向:</b></td><td style="padding:5px"><pre>'+ttip_flow_of_fund+'</pre></td></tr>'+
          //    '<tr><td valign=top style="padding:5px"><b>项目亮点:</b></td><td style="padding:5px"><pre>'+ttip_highlights+'</pre></td></tr>'+
          //    '<tr><td valign=top style="padding:5px"><b>备注:</b></td><td style="padding:5px"><pre>'+ttip_remark+'</pre></td></tr></table>';
          metaData.tdAttr = 'data-qtip="'+value+'"';  
        //console.log(record);//在console中打印出record的值  
          return value; 
        }
       },
        //{text:'资金投向',     dataIndex:'flow_of_fund',    filtable:true, width:100, hidden:records[0].get("flow_of_fund")},
        //{text:'项目亮点',     dataIndex:'highlights',    filtable:true, width:100, hidden:records[0].get("highlights")},
        {text:'期限',     dataIndex:'month',           filtable:true,sortable : true, width:50,style: "text-align:center;",align: 'center', hidden:records[0].get("month"),
          renderer: function(value,metaData,record,colIndex,store,view) {  
          return value+'月';
        }},
        //{text:'融资规模',     dataIndex:'scale',           filtable:true,sortable : true, width:60, hidden:records[0].get("scale"),
        //renderer: function(value,metaData,record,colIndex,store,view) {  
        //  if(value>=10000){ return value/10000+'亿'; } 
        //  if(value<10000){ return value+'万'; } 
        //}},
        //{text:'分配',         dataIndex:'cycle',          filtable:true,sortable : true, width:50, hidden:records[0].get("cycle")},
        {text:'认购金额',     dataIndex:'amount',          filtable:true,sortable : true, width:60, style: "text-align:center;",align: 'center',hidden:records[0].get("amount"),
        renderer: function(value,metaData,record,colIndex,store,view) {  
          if(value>=10000){ return value/10000+'亿'; } 
          if(value<10000){ return value+'万'; } 
        }},
        //{text:'项目收益属性', dataIndex:'profit_property', filtable:true,sortable : true, width:90, hidden:records[0].get("profit_property")},
        {text:'收益',     dataIndex:'profit',          filtable:true,sortable : true, width:50, style: "text-align:center;",align: 'center',hidden:records[0].get("profit"),
        renderer: function(value,metaData,record,colIndex,store,view) {  
          return value+'%'; 
        }},
        {text:'产品经理',     dataIndex:'manager',        filtable:true,sortable : true, width:60, style: "text-align:center;",align: 'center',hidden:records[0].get("manager")},
        {text:'合同信息',     dataIndex:'contract',        filtable:true,sortable : true, width:100, style: "text-align:center;",align: 'center',hidden:records[0].get("contract"),
          renderer: function(value,metaData,record,colIndex,store,view) {  
            metaData.tdAttr = 'data-qtip="<pre>'+value+'</pre>"';  
            return value; 
          }}
      ]},
       //{text:'备注',         dataIndex:'remark',        filtable:true, width:100, hidden:records[0].get("remark")},
      {text:'佣金信息',columns:[
        //{text:'税前佣金',     dataIndex:'commission_b_tax',  filtable:true,sortable : true, width:50, hidden:records[0].get("commission_b_tax"),
        //renderer: function(value,metaData,record,colIndex,store,view) {  
        //  return value+'%'; 
        //}},
        {text:'税后佣金',     dataIndex:'commission_a_tax',  filtable:true,sortable : true, width:50, style: "text-align:center;",align: 'center',hidden:records[0].get("commission_a_tax"),
        renderer: function(value,metaData,record,colIndex,store,view) {  
          return value+'%'; 
        }},
        {text:'佣金',         dataIndex:'inner_commission', filtable:true,sortable : true, width:50, style: "text-align:center;",align: 'center',hidden:records[0].get("inner_commission"),
        renderer: function(value,metaData,record,colIndex,store,view) {  
          return value+'%'; 
        }},
        {text:'佣金（税后）', dataIndex:'outer_commission', filtable:true,sortable : true, width:50, style: "text-align:center;",align: 'center',hidden:records[0].get("outer_commission"),
        renderer: function(value,metaData,record,colIndex,store,view) {  
          return value+'%'; 
        }}
      ]},
      //{text:'打款信息',columns:[
      //  {text:'打款日期',     dataIndex:'pay',             filtable:true,sortable : true, width:90, renderer:new Ext.util.Format.dateRenderer("Y-m-d"), hidden:records[0].get("pay")},
      //  {text:'已打款金额',   dataIndex:'paid',            filtable:true,sortable : true, width:50, hidden:records[0].get("paid")},
      //  {text:'成立日期',     dataIndex:'found',           filtable:true,sortable : true, width:90, renderer:new Ext.util.Format.dateRenderer("Y-m-d"), hidden:records[0].get("found")}
      //]},
      //{text:'包销进度信息',columns:[
      //  {text:'包销/分销额度',dataIndex:'quota',           filtable:true,sortable : true, width:50, hidden:records[0].get("quota")},
      //  {text:'已打款额度',   dataIndex:'quota_paid',       filtable:true,sortable : true, width:50, hidden:records[0].get("quota_paid")},
      //  {text:'剩余额度',     dataIndex:'quota_remain',     filtable:true,sortable : true, width:50, hidden:records[0].get("quota_remain")}
      //]},
      //{text:'渠道信息',columns:[
      //  {text:'主销渠道',     dataIndex:'main_channel',   filtable:true,sortable : true, width:80, hidden:records[0].get("main_channel")},
      //  {text:'渠道公司',     dataIndex:'channel_company',filtable:true,sortable : true, width:80, hidden:records[0].get("channel_company")},
      //  {text:'渠道联系人',   dataIndex:'channel_contact',filtable:true,sortable : true, width:60, hidden:records[0].get("channel_contact")},
      //  {text:'走帐公司',     dataIndex:'billing_company',filtable:true,sortable : true, width:100, hidden:records[0].get("billing_company")}
      //]},
      //  {text:'产品经理备注', dataIndex:'manager_remark', filtable:true,sortable : true, width:150, hidden:records[0].get("manager_remark"),
      //  renderer: function(value,metaData,record,colIndex,store,view) {  
      //    metaData.tdAttr = 'data-qtip="'+value+'"';  
      //  //console.log(record);//在console中打印出record的值  
      //    return value; 
      //  }},
        {text:'备注', dataIndex:'remark', filtable:true,sortable : true, width:220, hidden:records[0].get("remark"),
          renderer: function(value,metaData,record,colIndex,store,view) {  
            metaData.tdAttr = 'data-qtip="<pre>'+value+'</pre>"';  
            return value; 
          }
        }
      ],
      title: '项目列表',
      viewConfig: {
        stripeRows: true,
        forceFit:true,
        sortAscText:'正序',
        sortDescText:'降序',
        getRowClass: function(record,rowIndex,rowParams,store){    
          var sumVal=0;
          for (var i=0;i<rowIndex;i++) {
            if(store.getAt(i+1).data.name!=store.getAt(i).data.name){
              sumVal++;
            }
          }
          return (sumVal%2==0) ? 'style_row_proj0':'style_row_proj1';
        }
      },
      loadMask: true,
      features: [filtersCfg],
      dockedItems: [Ext.create('Ext.toolbar.Paging', {
          dock: 'bottom',
          store: sampleStore
      })],
      plugins: [{
          ptype: 'rowexpander',
          selectRowOnExpand : true,
          rowBodyTpl : [
            '<table><tr><td style="padding:10px;border:1px;"><table>',
            '<tr><td class="r_ex_td_pre"><b>项目名称</b></td><td class="r_ex_td_main"><pre>{name}</pre></td></tr>',
            '<tr><td class="r_ex_td_pre"><b>基本情况</b></td><td class="r_ex_td_main"><b>{profit_property}收益</b>项目，由<b>{issue}</b>发行，期限<b>{month}</b>个月，融资规模<b>{scale:this.cusNum()}</b>，按<b>{cycle}</b>分配</td></tr>',
            //'{[(records[0].get("profit_property")==true)?"aaa":"bbb"]}',
            '<tr><td class="r_ex_td_pre"><b>资金投向</b></td><td class="r_ex_td_main"><pre>{flow_of_fund}</pre></td></tr>',
            '<tr><td class="r_ex_td_pre"><b>项目亮点</b></td><td class="r_ex_td_main"><pre style="overflow:auto;white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap;word-wrap:break-word;">{highlights}</pre></td></tr>',
            '<tr><td class="r_ex_td_pre"><b>备注</b></td><td class="r_ex_td_main"><pre> {remark}</pre></td></tr>',
            strPay+strQuota+strChannel+strManagerRemark,
            '</table></td></tr></table>',{
              cusDate:function(d){return Ext.Date.format(d,'Y年m月d日');}
            },{
              cusNum:function(n){return (n<10000)?(n+"万"):(n/10000+"亿")}
            }
        ]
      }],
      emptyText: '没有匹配的记录'
    });
    
    fullGrid.setLoading(true);

    fullGrid.child('pagingtoolbar').add([
        '->',
        {
            icon: '/ts/misc/resources/icons/delete.gif',
            text: '清除过滤条件',
            handler: function () {
                fullGrid.filters.clearFilters();
                sampleStore.load();
            } 
        }
    ]);
  
    var viewport = Ext.create('Ext.Viewport', {
      layout: {
          type: 'border',
          padding: 0
      },
      defaults: {
          split: true                //可改变窗体大小
      },
      baseCls:'customT',
      items: [{
        xtype:'toolbar',
        region:'north',
        height: 40,
        border:0,
        items:[
        {
        	xtype:'box',
        	html:'<span class="app-header1">彩虹桥</span>'
        },{
        	xtype:'box',
        	flex:1
        },{
        	text:'进入管理模式',
        	icon:'/ts/misc/resources/icons/plugin.gif',
        	handler:function(){window.location.href='/ts/index.php/proj/manage';}
        },{
        	text:'个人信息',
        	icon:'/ts/misc/resources/icons/user.png',
        	handler:function(){window.location.href='/ts/index.php/user/info';}
        },{
        	text:'退出',
        	icon:'/ts/misc/resources/icons/cross.gif',
        	handler:function(){window.location.href='/ts/index.php/logout';}
        }]
      },{
        xtype:'panel',
        height:41,
        border:0,
        region:'north',
        layout:'hbox',
        align:'stretch',
        resizable:false,
        padding:0,
        items:[{xtype:'box',border:0,height:41,baseCls:'customT',flex:1},
        {
          xtype:'image',
          id:'ad1',
          src:'/ts/misc/resources/ad.jpg',
          height:41,
          width:772
        },{xtype:'box',border:0,height:41,baseCls:'customT',flex:1}]
      },{
        xtype:'panel', 
        margin:'0 20 20 20',
        border:0,
        region:'center',
        layout:'border',
        resizable:false,
        items:[

        recentChangeGrid,{
          region:'north',
          xtype:'box',
          height:20,
          baseCls:'customT'
        },
        fullGrid]
      }]
    });
    
    Ext.create('Ext.tip.ToolTip', {
      target: 'ad1',
      trackMouse: true,
      html: '点击查看项目信息'
    });
    
    Ext.getCmp('ad1').el.on({
      click:function(e,t){
              sampleStore.filterBy(
                function(record,id){
                  return (record.get("name")=="兆云资产并购循环基金-锦冶")?true:false
                }
              );
      }
    });
  });
  sampleStore.load();
  sampleChanges.load();
});

 
 