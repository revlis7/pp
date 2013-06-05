//Ext.require(['Ext.ux.RowExpander']);

Ext.onReady(function() {
  Ext.QuickTips.init();
  var accPanel,fullGridC1,fullGridC2;
  
  var recentChangeGrid=Ext.create('Ext.grid.Panel', {
    border:0,
    store:sampleChanges,
    margin:10,
    columns:[
    {text:'时间',             dataIndex:'operate_ts',     filtable:true, width:100,renderer:new Ext.util.Format.dateRenderer("Y-m-d")},
    {text:'修改内容',         dataIndex:'operation',     filtable:true, width:820}
    ]
  });
  	  
  var FileListGrid=Ext.create('Ext.grid.Panel',{
    store: fileListStore,
    border:1,
    //title:'文件列表',
    emptyText:'本项目无可用文件可供下载',
    region:'center',
    flex:1,
    border:0,
    columns:[{
        xtype: 'actioncolumn',
        text:'下载',
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
      {text:'文件名',         dataIndex:'filename',      filtable:true,style: "text-align:center;",align: 'left', width:355},
      {text:'文件大小',       dataIndex:'filesize',      filtable:true,style: "text-align:center;",align: 'right', width:80,
         renderer:function(value,metaData,record,colIndex,store,view) {
           if(value>=1048676) {var v=value/1048576;return v.toFixed(2)+' MB';}
           else if(value>=1024) {var v=value/1024;return v.toFixed(2)+' KB';}
           else return value;
         }
      },
      {text:'文件上传日期',   dataIndex:'create_ts',      filtable:true, width:100,renderer:new Ext.util.Format.dateRenderer("Y-m-d")}
    ]
  });
  var fileWin=Ext.create('Ext.window.Window',{
    resizeable:false,
    closeAction:"hide",
    title:'文件列表',
    width:600,
    height:250,
    layout:'fit',
    items:FileListGrid
  });
  fileWin.on({
    hide: function(){
      Ext.getBody().unmask();
    }
  });
//  fileWin.show();

  var projInfoWin=Ext.create('Ext.window.Window',{
    resizeable:false,
    closeAction:"hide",
    title:'项目信息',
    width:900,
    layout:'fit',
    items:[{
      id:'projInfoPanel',
      xtype:'panel',
      html:'正在加载项目信息...'
    }]
  });
  projInfoWin.on({
    hide: function(){
      Ext.getBody().unmask();
    }
  });
  projInfoWin.show();
  var listControl=Ext.create('Ext.data.JsonStore', {
    fields: [
      {name:'manage_button'    ,type:'boolean' },
      {name:'proj_id'          ,type:'boolean' },
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
      {name:'pay_account'      ,type:'boolean' },
      {name:'countdown'        ,type:'boolean' },
      {name:'commission_b_tax' ,type:'boolean' },
      {name:'commission_a_tax' ,type:'boolean' },
      {name:'inner_commission' ,type:'boolean' },
      {name:'outer_commission' ,type:'boolean' },
      {name:'imm_payment'      ,type:'boolean' },
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
      {name:'manager_remark'   ,type:'boolean' },
      {name:'create_ts'  ,type:'boolean' }
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
  
  function slidepanel(co){co.animate({from:{left:500},to:{left:10}})};
  function slideproj(co){
    co.animate({from:{y:co.y-300},to:{y:co.y+88},easeing:'backOut',duration:500})
  };
  
  function cellclick(grid,td,cellIndex,record,tr,rowIndex,e) { 
            var tStore=grid.getStore();
            var queryResult=tStore.queryBy(function(record){
              return record.get("proj_id")==tStore.getAt(rowIndex).get("proj_id")?true:false;
            });
            var detailString="";
            Ext.Array.forEach(queryResult.items,function(record){
              detailString+=("<pre>"+((record.data.amount<10000)?(record.data.amount+"万"):(record.data.amount/10000+"亿"))+": "+record.data.profit+"%</pre>");
            });
            var proj_info_tpl=Ext.create('Ext.XTemplate',[
              '<table cellpadding=0 cellspacing=0><tr><td style="padding:10px;border:1px;"><table>',
              '<tr><td class="r_ex_td_pre"><b>分类</b></td><td class="r_ex_td_main"><pre>{category}->{sub_category}</pre></td></tr>',
              '<tr><td class="r_ex_td_pre"><b>项目名称</b></td><td class="r_ex_td_main"><b><pre>{issue} {name}</pre></b></td></tr>',
              '<tr><td class="r_ex_td_pre"><b>基本情况</b></td><td class="r_ex_td_main">{profit_property}收益项目，期限{month}个月，融资规模{scale:this.cusNum()}，按{cycle}分配</td></tr>',
              '<tr><td class="r_ex_td_pre"><b>预期收益</b></td><td class="r_ex_td_main">',
              detailString, '</td></tr>',
              '<tr><td class="r_ex_td_pre"><b>资金投向</b></td><td class="r_ex_td_main"><pre style="overflow:auto;white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap;word-wrap:break-word;">{flow_of_fund}</pre></td></tr>',
              '<tr><td class="r_ex_td_pre"><b>项目亮点</b></td><td class="r_ex_td_main"><pre style="overflow:auto;white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap;word-wrap:break-word;">{highlights}</pre></td></tr>',
              '<tr><td class="r_ex_td_pre"><b>合同情况</b></td><td class="r_ex_td_main"><pre style="overflow:auto;white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap;word-wrap:break-word;">{contract}</pre></td></tr>',
              '<tr><td class="r_ex_td_pre"><b>打款账号</b></td><td class="r_ex_td_main"><pre style="overflow:auto;white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap;word-wrap:break-word;">{pay_account}</pre></td></tr>',
              '<tr><td class="r_ex_td_pre"><b>打款进度</b></td><td class="r_ex_td_main"><pre style="overflow:auto;white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap;word-wrap:break-word;">{countdown}</pre></td></tr>',
              '<tr><td class="r_ex_td_pre"><b>备注</b></td><td class="r_ex_td_main"><pre style="overflow:auto;white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap;word-wrap:break-word;">{remark}</pre></td></tr>',
//              strPay+strQuota+strChannel+strManagerRemark,
              '</table></td></tr></table>',
              {
                cusDate:function(d){return Ext.Date.format(d,'Y年m月d日');}
              },{
                cusNum:function(n){return (n<1)?(n*10000+"万"):(n+"亿")}
              }
            ]);
            proj_info_tpl.overwrite(Ext.getCmp('projInfoPanel').body,queryResult.getAt(0).data);
            Ext.getBody().mask();
            projInfoWin.show();
            projInfoWin.setPosition(100,100);
          }
          
  function on_loadC1(store,records,success){
        if(success==true){
          var ad_list=[[463,0],[451,1],[427,3]]
          Ext.Array.forEach(ad_list,function(ad_item){
            var queryResult=store.queryBy(function(record){
              return record.get("proj_id")==ad_item[0]?true:false;
            });
            var detailString="";
            Ext.Array.forEach(queryResult.items,function(record){
              detailString+=("<pre>"+((record.data.amount<10000)?(record.data.amount+"万"):(record.data.amount/10000+"亿"))+": "+record.data.profit+"%</pre>");
            });
            var proj_info_tpl=Ext.create('Ext.XTemplate',[
              '<table cellpadding=0 cellspacing=0><tr><td style="padding:10px;border:1px;"><table>',
              '<tr><td class="r_ex_td_pre"><b>分类</b></td><td class="r_ex_td_main"><pre>{category}->{sub_category}</pre></td></tr>',
              '<tr><td class="r_ex_td_pre"><b>项目名称</b></td><td class="r_ex_td_main"><b><pre>{issue} {name}</pre></b></td></tr>',
              '<tr><td class="r_ex_td_pre"><b>基本情况</b></td><td class="r_ex_td_main">{profit_property}收益项目，期限{month}个月，融资规模{scale:this.cusNum()}，按{cycle}分配</td></tr>',
              '<tr><td class="r_ex_td_pre"><b>预期收益</b></td><td class="r_ex_td_main">',
              detailString, '</td></tr>',
              '<tr><td class="r_ex_td_pre"><b>资金投向</b></td><td class="r_ex_td_main"><pre style="overflow:auto;white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap;word-wrap:break-word;">{flow_of_fund}</pre></td></tr>',
              '<tr><td class="r_ex_td_pre"><b>项目亮点</b></td><td class="r_ex_td_main"><pre style="overflow:auto;white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap;word-wrap:break-word;">{highlights}</pre></td></tr>',
              '<tr><td class="r_ex_td_pre"><b>合同情况</b></td><td class="r_ex_td_main"><pre>{contract}</pre></td></tr>',
              '<tr><td class="r_ex_td_pre"><b>打款进度</b></td><td class="r_ex_td_main"><pre style="overflow:auto;white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap;word-wrap:break-word;">{countdown}</pre></td></tr>',
              '<tr><td class="r_ex_td_pre"><b>打款账号</b></td><td class="r_ex_td_main"><pre style="overflow:auto;white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap;word-wrap:break-word;">{pay_account}</pre></td></tr>',
              '<tr><td class="r_ex_td_pre"><b>备注</b></td><td class="r_ex_td_main"><pre style="overflow:auto;white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap;word-wrap:break-word;">{remark}</pre></td></tr>',
//              strPay+strQuota+strChannel+strManagerRemark,
              '</table></td></tr></table>',
              {
                cusDate:function(d){return Ext.Date.format(d,'Y年m月d日');}
              },{
                cusNum:function(n){return (n<1)?(n*10000+"万"):(n+"亿")}
              }
            ]);
            proj_info_tpl.overwrite(Ext.getCmp('ad'+ad_item[1]+'_table').body,queryResult.getAt(0).data);
            Ext.getCmp('ad'+ad_item[1]+'_table').hide();
          });
        } else {
          Ext.Msg.alert('超时','您已超时登出，请重新登录',function(){window.location.href='/ts/index.php/auth';});
        }
    };
    
  function on_loadC2(store,records,success){
        if(success==true){
          var ad_list=[[170,2],[293,4]]
          Ext.Array.forEach(ad_list,function(ad_item){
            var queryResult=store.queryBy(function(record){
              return record.get("proj_id")==ad_item[0]?true:false;
            });
            var detailString="";
            Ext.Array.forEach(queryResult.items,function(record){
              detailString+=("<pre>"+((record.data.amount<10000)?(record.data.amount+"万"):(record.data.amount/10000+"亿"))+": "+record.data.profit+"%</pre>");
            });
            var proj_info_tpl=Ext.create('Ext.XTemplate',[
              '<table cellpadding=0 cellspacing=0><tr><td style="padding:10px;border:1px;"><table>',
              '<tr><td class="r_ex_td_pre"><b>分类</b></td><td class="r_ex_td_main"><pre>{category}->{sub_category}</pre></td></tr>',
              '<tr><td class="r_ex_td_pre"><b>项目名称</b></td><td class="r_ex_td_main"><b><pre>{issue} {name}</pre></b></td></tr>',
              '<tr><td class="r_ex_td_pre"><b>基本情况</b></td><td class="r_ex_td_main">{profit_property}收益项目，期限{month}个月，融资规模{scale:this.cusNum()}，按{cycle}分配</td></tr>',
              '<tr><td class="r_ex_td_pre"><b>预期收益</b></td><td class="r_ex_td_main">',
              detailString, '</td></tr>',
              '<tr><td class="r_ex_td_pre"><b>资金投向</b></td><td class="r_ex_td_main"><pre style="overflow:auto;white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap;word-wrap:break-word;">{flow_of_fund}</pre></td></tr>',
              '<tr><td class="r_ex_td_pre"><b>项目亮点</b></td><td class="r_ex_td_main"><pre style="overflow:auto;white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap;word-wrap:break-word;">{highlights}</pre></td></tr>',
              '<tr><td class="r_ex_td_pre"><b>合同情况</b></td><td class="r_ex_td_main"><pre>{contract}</pre></td></tr>',
              '<tr><td class="r_ex_td_pre"><b>打款进度</b></td><td class="r_ex_td_main"><pre style="overflow:auto;white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap;word-wrap:break-word;">{countdown}</pre></td></tr>',
              '<tr><td class="r_ex_td_pre"><b>打款账号</b></td><td class="r_ex_td_main"><pre style="overflow:auto;white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap;word-wrap:break-word;">{pay_account}</pre></td></tr>',
              '<tr><td class="r_ex_td_pre"><b>备注</b></td><td class="r_ex_td_main"><pre style="overflow:auto;white-space: pre-wrap; white-space: -moz-pre-wrap; white-space: -pre-wrap; white-space: -o-pre-wrap;word-wrap:break-word;">{remark}</pre></td></tr>',
//              strPay+strQuota+strChannel+strManagerRemark,
              '</table></td></tr></table>',
              {
                cusDate:function(d){return Ext.Date.format(d,'Y年m月d日');}
              },{
                cusNum:function(n){return (n<1)?(n*10000+"万"):(n+"亿")}
              }
            ]);
            proj_info_tpl.overwrite(Ext.getCmp('ad'+ad_item[1]+'_table').body,queryResult.getAt(0).data);
            Ext.getCmp('ad'+ad_item[1]+'_table').hide();
          });
        } else {
          Ext.Msg.alert('超时','您已超时登出，请重新登录',function(){window.location.href='/ts/index.php/auth';});
        }
    };

listControl.load(function(records, operation, success) {
    var fullGridColumns=[

        {text:'proj_id',     dataIndex:'proj_id',       filtable:true, width:100,hidden:true},
        {text:'proj_detail_id',     dataIndex:'proj_detail_id',       filtable:true, width:100,hidden:true},
      {text:'产品信息',columns:[
        {text:'产品等级',     dataIndex:'grade',          filtable:true,sortable : true, width:94, hidden:records[0].get("grade"),
        renderer: function(value,metaData,record,rowIndex,colIndex,store,view) {  
//          metaData.tdAttr = 'data-qtip="'+value+'"';  
          var res;
          if(value=="五星级"){
            res= '<img src="/ts/misc/resources/icons/star.gif" /><img src="/ts/misc/resources/icons/star.gif" /><img src="/ts/misc/resources/icons/star.gif" /><img src="/ts/misc/resources/icons/star.gif" /><img src="/ts/misc/resources/icons/star.gif" />'
          } else if (value=="四星级"){
            res=  '<img src="/ts/misc/resources/icons/star.gif" /><img src="/ts/misc/resources/icons/star.gif" /><img src="/ts/misc/resources/icons/star.gif" /><img src="/ts/misc/resources/icons/star.gif" />'
          } else if (value=="三星级"){
            res=  '<img src="/ts/misc/resources/icons/star.gif" /><img src="/ts/misc/resources/icons/star.gif" /><img src="/ts/misc/resources/icons/star.gif" />'
          } else if (value=="二星级"){
            res=  '<img src="/ts/misc/resources/icons/star.gif" /><img src="/ts/misc/resources/icons/star.gif" />'
          } else if (value=="一星级"){
            res=  '<img src="/ts/misc/resources/icons/star.gif" />'
          };
          return res;
          //if(rowIndex==0){return res;}
          //return (store.getAt(rowIndex-1).data.name==record.data.name)?null:res; 
        }},
        {text:'项目名称',     dataIndex:'name',          filtable:true,sortable : true, width:220,style: "text-align:center;",align: 'left', hidden:records[0].get("name"),
        renderer: function(value,metaData,record,rowIndex,colIndex,store,view) {  
          metaData.tdAttr = 'data-qtip="'+value+'"';  
          //if(rowIndex==0){return '<b>'+value+'</b>';}
          //return (store.getAt(rowIndex-1).data.name==record.data.name)?null:'<b>'+value+'</b>'; 
          return '<b>'+value+'</b>';
        }},{
          xtype: 'actioncolumn',
          text:'下载文件',
          width:60,style: "text-align:center;",align: 'center', 
          sortable: false,
          items: [{
            icon: '/ts/misc/resources/icons/download.gif',
            tooltip: '查看该项目的文件，您可以下载它们',
            handler: function(grid, rowIndex, colIndex) {
              var proj_id=grid.getStore().getAt(rowIndex).get("proj_id");
              fileListStore.setProxy({
                type: 'ajax',
                url: '/ts/index.php/upload/get_list?proj_id='+proj_id,
                reader: {
                  type: 'json',
                  root: 'data'
                }
              });
              fileListStore.load();
              Ext.getBody().mask();
              fileWin.show();
            }
          }]
        },
        {text:'类别',       dataIndex:'sub_category',    filtable:true,sortable : true, width:150,style: "text-align:center;",align: 'left', hidden:records[0].get("sub_category"),
        renderer: function(value,metaData,record,rowIndex,colIndex,store,view) {  
          metaData.tdAttr = 'data-qtip="'+value+'"';  
          //if(rowIndex==0){return value;}
          //return (store.getAt(rowIndex-1).data.name==record.data.name)?null:value; 
          return value;
        }},
        {text:'发行方',       dataIndex:'issue',         filtable:true,sortable : true, width:86,style: "text-align:center;",align: 'center', hidden:records[0].get("issue"),
        renderer: function(value,metaData,record,rowIndex,colIndex,store,view) {  
          metaData.tdAttr = 'data-qtip="'+value+'"';  
          //if(rowIndex==0){return value;}
          //return (store.getAt(rowIndex-1).data.name==record.data.name)?null:value; 
          return value;
        }}
//        {text:'合同信息',     dataIndex:'contract',        filtable:true,sortable : true, width:100, style: "text-align:center;",align: 'center',hidden:records[0].get("contract"),
//          renderer: function(value,metaData,record,colIndex,store,view) {  
//            metaData.tdAttr = 'data-qtip="<pre>'+value+'</pre>"';  
//            return value; 
//          }}
      ]},
      {text:'认购信息',columns:[
        {text:'销售状态',     dataIndex:'status',         filtable:true,sortable : true, width:60,style: "text-align:center;",align: 'center', hidden:records[0].get("status"), 
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
          }},
        {text:'认购金额',     dataIndex:'amount',          filtable:true,sortable : true, width:60, style: "text-align:center;",align: 'center',hidden:records[0].get("amount"),
        renderer: function(value,metaData,record,rowIndex,colIndex,store,view) {  
          if(value>=10000){ return value/10000+'亿'; } 
          if(value<10000){ return value+'万'; } 
        }},
        {text:'期限',     dataIndex:'month',           filtable:true,sortable : true, width:50,style: "text-align:center;",align: 'center', hidden:records[0].get("month"),
        renderer: function(value,metaData,record,rowIndex,colIndex,store,view) {  
          return value+'月';
        }},
        {text:'收益',     dataIndex:'profit',          filtable:true,sortable : true, width:50, style: "text-align:center;",align: 'center',hidden:records[0].get("profit"),
        renderer: function(value,metaData,record,rowIndex,colIndex,store,view) {  
          return value+'%'; 
        }},
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
          }}
      ]},
      {text:'佣金信息',columns:[
        {text:'税前佣金',     dataIndex:'commission_b_tax',  filtable:true,sortable : true, width:60, style: "text-align:center;",align: 'center',hidden:records[0].get("commission_b_tax"),
        renderer: function(value,metaData,record,colIndex,store,view) { 
          if(value>0){
                return value+'%';
              } else {
                metaData.style='color:#8E8E8E';
                return 'N/A';
              }
        }},
        {text:'税后佣金',     dataIndex:'commission_a_tax',  filtable:true,sortable : true, width:60, style: "text-align:center;",align: 'center',hidden:records[0].get("commission_a_tax"),
        renderer: function(value,metaData,record,colIndex,store,view) {  
          if(value>0){
                return value+'%';
              } else {
                metaData.style='color:#8E8E8E';
                return 'N/A';
              }
        }},
        {text:'平台费用',         dataIndex:'inner_commission', filtable:true,sortable : true, width:60, style: "text-align:center;",align: 'center',hidden:records[0].get("inner_commission"),
        renderer: function(value,metaData,record,colIndex,store,view) {  
          if(value>0){
                return value+'%';
              } else {
                metaData.style='color:#8E8E8E';
                return 'N/A';
              }
        }},
        {text:'费用', dataIndex:'outer_commission', filtable:true,sortable : true, width:50, style: "text-align:center;",align: 'center',hidden:records[0].get("outer_commission"),
        renderer: function(value,metaData,record,colIndex,store,view) {  
          if(value>0){
                return value+'%';
              } else {
                metaData.style='color:#8E8E8E';
                return 'N/A';
              }
        }},
        {text:'现结费用', dataIndex:'imm_payment', filtable:true,sortable : true, width:60, style: "text-align:center;",align: 'center',hidden:records[0].get("imm_payment"),
        renderer: function(value,metaData,record,colIndex,store,view) {  
          if(value>0){
                return value+'%';
              } else {
                metaData.style='color:#8E8E8E';
                return 'N/A';
              }
        }}
      ]},
      {text:'附加信息',columns:[
        {text:'产品经理',     dataIndex:'manager',        filtable:true,sortable : true, width:60, style: "text-align:center;",align: 'center',hidden:records[0].get("manager"),
        renderer: function(value,metaData,record,rowIndex,colIndex,store,view) {  
          metaData.tdAttr = 'data-qtip="'+value+'"';  
          //if(rowIndex==0){return value;}
          //return (store.getAt(rowIndex-1).data.name==record.data.name)?null:value; 
          return value;
        }},
      {text:'渠道公司',dataIndex:'channel_company',filtable:true,sortable : true, width:72, style: "text-align:center;",align: 'center',hidden:records[0].get("channel_company")},
        {text:'添加时间',dataIndex:'create_ts',filtable:true,sortable : true, width:80, style: "text-align:center;",align: 'center',renderer:new Ext.util.Format.dateRenderer("Y-m-d")},
      {text:'打款进度', dataIndex:'countdown', filtable:true,sortable : true, minWidth:200,hidden:records[0].get("countdown"),
        renderer: function(value,metaData,record,rowIndex,colIndex,store,view) {  
          metaData.tdAttr = 'data-qtip="'+value+'"';  
          //if(rowIndex==0){return value;}
          //return (store.getAt(rowIndex-1).data.name==record.data.name)?null:value; 
          return value;
        }
        },
      {text:'备注', dataIndex:'remark', filtable:true,sortable : true, minWidth:200,hidden:records[0].get("remark"),
        renderer: function(value,metaData,record,rowIndex,colIndex,store,view) {  
          metaData.tdAttr = 'data-qtip="'+value+'"';  
          //if(rowIndex==0){return value;}
          //return (store.getAt(rowIndex-1).data.name==record.data.name)?null:value; 
          return value;
        }
      }]}
      ];
    
    fullGridC1=Ext.create('searchPanel', {
      store: sampleStoreC1,
      border:0,
      columnLines: true,
      //forceFit: true,
      width:1320,
        margin:10,
        columns: fullGridColumns,
//      title: '&nbsp;&nbsp;<b>&gt;&gt;&nbsp;固定收益产品&nbsp;&lt;&lt;</b>',
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
//      plugins: fullGridExpander,
      emptyText: '没有匹配的记录'
    });

    fullGridC2=Ext.create('searchPanel', {
      store: sampleStoreC2,
      border:0,
      width:1320,
//      title: '&nbsp;&nbsp;<b>&gt;&gt;&nbsp;浮动收益产品&nbsp;&lt;&lt;</b>',
        margin:10,
        columnLines: true,
      //forceFit: true,
      columns: fullGridColumns,
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
//      plugins: fullGridExpander,
      emptyText: '没有匹配的记录'
    });

    fullGridC1.child('toolbar').add([
            {
                xtype:'tbtext',
                text:'快速筛选：'
            },{
                xtype:'tbtext',
              scale:'medium',
              text:'【集合信托产品：'
            },{
                text:'上市公司股票质押',
              scale:'medium',
                handler:function(){
                  fullGridC1.filters.clearFilters();
                  sampleStoreC1.filterBy( function(record,id){
                    return record.get("sub_category")=="集合信托：上市公司股票质押类" ;
                  });
                }
            },{
                text:'政府基建',
              scale:'medium',
                handler:function(){
                  fullGridC1.filters.clearFilters();
                  sampleStoreC1.filterBy( function(record,id){
                    return record.get("sub_category")=="集合信托：政府基建类";
                  });
                }
            },{
                text:'房地产',
              scale:'medium',
                handler:function(){
                  fullGridC1.filters.clearFilters();
                  sampleStoreC1.filterBy( function(record,id){
                    return record.get("sub_category")=="集合信托：房地产类";
                  });
                }
            },{
                text:'其他信托',
              scale:'medium',
                handler:function(){
                  fullGridC1.filters.clearFilters();
                  sampleStoreC1.filterBy( function(record,id){
                    return record.get("sub_category")=="集合信托：其他类";
                  });
                }
            },{
                text:'所有信托】',
              scale:'medium',
                handler:function(){
                  fullGridC1.filters.clearFilters();
                  sampleStoreC1.filterBy( function(record,id){
                    return record.get("sub_category")=="集合信托：其他类" ||
                      record.get("sub_category")=="集合信托：房地产类" ||
                      record.get("sub_category")=="集合信托：政府基建类" ||
                      record.get("sub_category")=="集合信托：上市公司股票质押类";
                  });
                }
            },{
                text:'【私募基金】',
              scale:'medium',
                handler:function(){
                  fullGridC1.filters.clearFilters();
                  sampleStoreC1.filterBy( function(record,id){
                    return record.get("sub_category")=="私募基金";
                  });
                }
            },{
                text:'【P2P理财】',
              scale:'medium',
                handler:function(){
                  fullGridC1.filters.clearFilters();
                  sampleStoreC1.filterBy( function(record,id){
                    return record.get("sub_category")=="P2P理财";
                  });
                }
            },{
                text:'【其他固定收益产品】',
              scale:'medium',
                handler:function(){
                  fullGridC1.filters.clearFilters();
                  sampleStoreC1.filterBy( function(record,id){
                    return record.get("sub_category")=="其他" ;
                  });
                }
            },'-',{
                text:'全部显示',
              scale:'medium',
                icon:'/ts/misc/resources/icons/grid.png',
                handler:function(){
                  fullGridC1.filters.clearFilters();
                  sampleStoreC1.load();
                }
            }     
    ]);
    fullGridC2.child('toolbar').add([
            {
                xtype:'tbtext',
                text:'快速筛选：'
            },{
                text:'【债券基金】',
              scale:'medium',
                handler:function(){
                  fullGridC2.filters.clearFilters();
                  sampleStoreC2.filterBy( function(record,id){
                    return record.get("sub_category")=="债券基金";
                  });
                }
            },{
                text:'【证券基金】',
              scale:'medium',
                handler:function(){
                  fullGridC2.filters.clearFilters();
                  sampleStoreC2.filterBy( function(record,id){
                    return record.get("sub_category")=="证券基金";
                  });
                }
            },{
                text:'【股权基金】',
              scale:'medium',
                handler:function(){
                  fullGridC2.filters.clearFilters();
                  sampleStoreC2.filterBy( function(record,id){
                    return record.get("sub_category")=="股权基金";
                  });
                }
            },{
                text:'【其他浮动收益产品】',
              scale:'medium',
                handler:function(){
                  fullGridC2.filters.clearFilters();
                  sampleStoreC2.filterBy( function(record,id){
                    return record.get("sub_category")=="其他";
                  });
                }
            },'-',{
                text:'全部显示',
              scale:'medium',
                icon:'/ts/misc/resources/icons/grid.png',
                handler:function(){
                  fullGridC2.filters.clearFilters();
                  sampleStoreC2.load();
                }
            }     ]);
    
    var recommendPanel=Ext.create('Ext.panel.Panel',{
      layout:{
        type: 'vbox',
        align: 'center'
      },
      border:0,
      autoScroll :true,
      items:[{
          xtype:'panel',
          border:0,
          margin:10,
          layout:'hbox',
          height:60,
          width:842,
          items:[{
            xtype:'button',
            text:'玉尔财富推荐： <span class="promote_title">华澳信托 长信37号山西运城</span> 点击查看',
            height:60,
            width:842,
            border:0,
            handler:function(){
              if(this.text=='玉尔财富推荐： <span class="promote_title">华澳信托 长信37号山西运城</span> 点击查看'){
                this.setText('玉尔财富推荐： <span class="promote_title">华澳信托 长信37号山西运城</span> 点击收起');
                Ext.getCmp('ad0_table').show();
              } else {
                this.setText('玉尔财富推荐： <span class="promote_title">华澳信托 长信37号山西运城</span> 点击查看');
                Ext.getCmp('ad0_table').hide();
              }
            }
          }]
        },{
          xtype:'panel',
          border:0,
          id:'ad0_table'
        },{
          xtype:'panel',
          border:0,
          margin:10,
          layout:'hbox',
          height:60,
          width:842,
          items:[{
            xtype:'button',
            text:'玉尔财富推荐： <span class="promote_title">新华信托 南京六合</span> 点击查看',
            height:60,
            width:842,
            border:0,
            handler:function(){
              if(this.text=='玉尔财富推荐： <span class="promote_title">新华信托 南京六合</span> 点击查看'){
                this.setText('玉尔财富推荐： <span class="promote_title">新华信托 南京六合</span> 点击收起');
                Ext.getCmp('ad1_table').show();
              } else {
                this.setText('玉尔财富推荐： <span class="promote_title">新华信托 南京六合</span> 点击查看');
                Ext.getCmp('ad1_table').hide();
              }
            }
          }]
        },{
          xtype:'panel',
          border:0,
          id:'ad1_table'
        },{
          xtype:'panel',
          border:0,
          margin:10,
          layout:'hbox',
          height:60,
          width:842,
          items:[{
            xtype:'button',
            text:'玉尔财富推荐： <span class="promote_title">西部信托 信合东方集合资金信托计划</span> 点击查看',
            height:60,
            width:842,
            border:0,
            handler:function(){
              if(this.text=='玉尔财富推荐： <span class="promote_title">西部信托 信合东方集合资金信托计划</span> 点击查看'){
                this.setText('玉尔财富推荐： <span class="promote_title">西部信托 信合东方集合资金信托计划</span> 点击收起');
                Ext.getCmp('ad2_table').show();
              } else {
                this.setText('玉尔财富推荐： <span class="promote_title">西部信托 信合东方集合资金信托计划</span> 点击查看');
                Ext.getCmp('ad2_table').hide();
              }
            }
          }]
        },{
          xtype:'panel',
          border:0,
          id:'ad2_table'
        },{
          xtype:'panel',
          border:0,
          layout:'hbox',
          height:60,
          width:842,
          margin:10,
          items:[{
            xtype:'button',
            height:60,
            width:842,
            border:0,
            text:'玉尔财富推荐： <span class="promote_title">沿海景荣 金地集团武汉格林东郡A1类</span> 点击查看',
            handler:function(){
              if(this.text=='玉尔财富推荐： <span class="promote_title">沿海景荣 金地集团武汉格林东郡A1类</span> 点击查看'){
                this.setText('玉尔财富推荐： <span class="promote_title">沿海景荣 金地集团武汉格林东郡A1类</span> 点击收起');
                Ext.getCmp('ad3_table').show();
              } else {
                this.setText('玉尔财富推荐： <span class="promote_title">沿海景荣 金地集团武汉格林东郡A1类</span> 点击查看');
                Ext.getCmp('ad3_table').hide();
              }
            }
          }]
        },{
          xtype:'panel',
          border:0,
          id:'ad3_table'
        },{
          xtype:'panel',
          border:0,
          layout:'hbox',
          height:60,
          width:842,
          margin:10,
          items:[{
            xtype:'button',
            height:60,
            width:842,
            border:0,
            text:'玉尔财富推荐： <span class="promote_title">博弘数君基金管理公司 双隆量化对冲保收益基金</span> 点击查看',
            handler:function(){
              if(this.text=='玉尔财富推荐： <span class="promote_title">博弘数君基金管理公司 双隆量化对冲保收益基金</span> 点击查看'){
                this.setText('玉尔财富推荐： <span class="promote_title">博弘数君基金管理公司 双隆量化对冲保收益基金</span> 点击收起');
                Ext.getCmp('ad4_table').show();
              } else {
                this.setText('玉尔财富推荐： <span class="promote_title">博弘数君基金管理公司 双隆量化对冲保收益基金</span> 点击查看');
                Ext.getCmp('ad4_table').hide();
              }
            }
          }]
        },{
          xtype:'panel',
          border:0,
          id:'ad4_table'
        }]
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
                src:'/ts/misc/resources/firstshin.jpg',
          	width:240,
                height:38
        },{
        	xtype:'box',
        	flex:1
        },{
                xtype: 'tbtext',
                text:"小提示：双击可以查看项目详细信息。"
        },{
        	xtype:'box',
        	flex:1
        },{
        	text:'进入管理模式',
        	icon:'/ts/misc/resources/icons/plugin.gif',
        	scale:'medium',
                hidden:records[0].get("manage_button"),
        	handler:function(){window.location.href='/ts/index.php/proj/manage';}
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
      {
        xtype:'panel',
        height:150,
        id:'topInfo',
        region:'center',
        border:0,
        layout:'card',
        resizable:false,
        dockedItems: [{
          dock: 'top',
          xtype: 'toolbar',
          bodyPadding: 5,
          items: [{xtype:'box',flex:1},
          {
            text:'<b>【查看推荐产品】</b>',
            scale:'large',
            handler:function(){
              this.up('panel').getLayout().setActiveItem(recommendPanel);
            }
          },{
            text:'<b>【查看固定收益产品】</b>',
            scale:'large',
            handler:function(){
              this.up('panel').getLayout().setActiveItem(fullGridC1);
            }
          },{
            text:'<b>【查看浮动收益产品】</b>',
            scale:'large',
            handler:function(){
              this.up('panel').getLayout().setActiveItem(fullGridC2);
            }
          },{
            text:'<b>【查看最近修改】</b>',
            scale:'large',
            handler:function(){
              this.up('panel').getLayout().setActiveItem(recentChangeGrid);
              sampleChanges.load();
            }
          },{xtype:'box',flex:1}]
        }],
        items:[
          recommendPanel,
          fullGridC1,
          fullGridC2,
          recentChangeGrid
        ]
      },{
        xtype:'toolbar',
        region:'south',
        border:0,
        height:20,
        items:[{xtype:'box',flex:1},{
          xtype:'box',
          html:'版权所有。上海玉尔投资发展有限公司 - 2012-2013年'
        },{xtype:'box',flex:1}]
      }]
    });
    //Ext.getCmp('ad0_table').on({show:slideproj});
    //Ext.getCmp('ad1_table').on({show:slideproj});
    //Ext.getCmp('ad2_table').on({show:slideproj});
    //Ext.getCmp('ad3_table').on({show:slideproj});
    //Ext.getCmp('ad4_table').on({show:slideproj});
    
    fullGridC1.on({
      celldblclick:cellclick,
      show:slidepanel
    });
    fullGridC2.on({
      celldblclick:cellclick,
      show:slidepanel
    });
    recommendPanel.on({show:slidepanel});
    recentChangeGrid.on({show:slidepanel});
    sampleStoreC1.on({load:on_loadC1});
    sampleStoreC2.on({load:on_loadC2});
  });
  
  sampleStoreC1.load();
  sampleStoreC2.load();
//  fileWin.hide();
  projInfoWin.hide();
  window.setInterval(function(){
    sampleStoreC1.load();
    sampleStoreC2.load();
  },1200000);
});

 
 