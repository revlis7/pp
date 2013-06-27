Ext.require(['Ext.ux.RowExpander']);

var loginname = Ext.util.Cookies.get("loginname");

var e=-1;

Ext.onReady(function() {
  Ext.QuickTips.init();
  var projInfoWin=Ext.create('Ext.window.Window',{
    resizeable:false,
    closeAction:"hide",
    title:'项目信息',
    width:944,
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
    var strPay="";
//    if(records[0].get("pay")==false || records[0].get("paid")==false || records[0].get("found")==false){
      strPay += "<tr><td class=\"r_ex_td_pre\"><b>打款信息</b></td><td class=\"r_ex_td_main\"><table><tr>";
//      if(records[0].get("pay")==false){
        strPay += "<td width=100px style=\"background: #fff;\">打款日期：</td><td width=100px style=\"background: #fff;\">{pay:this.cusDate()}</td>";
//      }
//      if(records[0].get("paid")==false){
        strPay += "<td width=100px style=\"background: #fff;\">已打款金额：</td><td width=100px style=\"background: #fff;\">{paid:this.cusNum()}</td>";
//      }
//      if(records[0].get("found")==false){
        strPay += "<td width=100px style=\"background: #fff;\">成立日期：</td><td width=100px style=\"background: #fff;\">{found:this.cusDate()}</td>";
//      }
      strPay += "</tr></table></td></tr>"
//    }
    
    var strQuota="";
//    if(records[0].get("quota")==false 
//      || records[0].get("quota_paid")==false 
//      || records[0].get("quota_remain")==false
//    ){
      strQuota += "<tr><td class=\"r_ex_td_pre\"><b>包销进度信息</b></td><td class=\"r_ex_td_main\"><table><tr>";
//      if(records[0].get("quota")==false){
        strQuota += "<td width=100px style=\"background: #fff;\">包销/分销额度：</td><td width=100px style=\"background: #fff;\">{quota:this.cusNum()}</td>";
//      }
//      if(records[0].get("quota_paid")==false){
        strQuota += "<td width=100px style=\"background: #fff;\">已打款额度：</td><td width=100px style=\"background: #fff;\">{quota_paid:this.cusNum()}</td>";
//      }
//      if(records[0].get("quota_remain")==false){
        strQuota += "<td width=100px style=\"background: #fff;\">剩余额度：</td><td width=100px style=\"background: #fff;\">{quota_remain:this.cusNum()}</td>";
//      }
      strQuota += "</tr></table></td></tr>"
//    }
    
    var strChannel="";
//    if(records[0].get("main_channel")==false 
//      || records[0].get("channel_company")==false 
//      || records[0].get("channel_contact")==false 
//      || records[0].get("billing_company")==false 
//    ){
      strChannel += "<tr><td class=\"r_ex_td_pre\"><b>渠道信息</b></td><td class=\"r_ex_td_main\"><table><tr>";
//      if(records[0].get("main_channel")==false){
        strChannel += "<td width=100px style=\"background: #fff;\">主销渠道：</td><td width=100px style=\"background: #fff;\">{main_channel}&nbsp;</td>";
//      }
//      if(records[0].get("channel_company")==false){
        strChannel += "<td width=100px style=\"background: #fff;\">渠道公司：</td><td width=100px style=\"background: #fff;\">{channel_company}</td>";
//      }
//      if(records[0].get("channel_contact")==false){
        strChannel += "<td width=100px style=\"background: #fff;\">渠道联系人：</td><td width=100px style=\"background: #fff;\">{channel_contact}</td>";
//      }
//      if(records[0].get("billing_company")==false){
        strChannel += "<td width=100px style=\"background: #fff;\">走帐公司：</td><td width=150px style=\"background: #fff;\">{billing_company}</td>";
//      }
      strChannel += "</tr></table></td></tr>"
//    }
    
    var strManagerRemark="";
//    if(records[0].get("manager_remark")==false){
      strManagerRemark += "<tr><td class=\"r_ex_td_pre\"><b>产品经理备注</b></td><td class=\"r_ex_td_main\">{manager_remark}</td></tr>";
//    }
    
  function cellclick(grid,td,cellIndex,record,tr,rowIndex,e) { 
    if(cellIndex>1){
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
              '<tr><td class="r_ex_td_pre"><b>项目名称</b></td><td class="r_ex_td_main"><b><pre>{issue}　{name}</pre></b></td></tr>',
              '<tr><td class="r_ex_td_pre"><b>基本情况</b></td><td class="r_ex_td_main">{profit_property}收益项目，期限{month}个月，融资规模{scale:this.cusNum()}，按{cycle}分配</td></tr>',
              '<tr><td class="r_ex_td_pre"><b>预期收益</b></td><td class="r_ex_td_main">',
              detailString, '</td></tr>',
              '<tr><td class="r_ex_td_pre"><b>资金投向</b></td><td class="r_ex_td_main"><pre>{flow_of_fund}</pre></td></tr>',
              '<tr><td class="r_ex_td_pre"><b>项目亮点</b></td><td class="r_ex_td_main"><pre>{highlights}</pre></td></tr>',
              '<tr><td class="r_ex_td_pre"><b>合同情况</b></td><td class="r_ex_td_main"><pre>{contract}</pre></td></tr>',
              '<tr><td class="r_ex_td_pre"><b>打款进度</b></td><td class="r_ex_td_main"><pre>{countdown}</pre></td></tr>',
              '<tr><td class="r_ex_td_pre"><b>打款账号</b></td><td class="r_ex_td_main"><pre>{pay_account}</pre></td></tr>',
              '<tr><td class="r_ex_td_pre"><b>备注</b></td><td class="r_ex_td_main"><pre>{remark}</pre></td></tr>',
              strPay+strQuota+strChannel+strManagerRemark,
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
  };
    var fullGridColumns=[{
        xtype: 'actioncolumn',
        text:'编辑',
        width:36,style: "text-align:center;",align: 'center',
        sortable: false,
        items: [{
          icon: '/ts/misc/resources/icons/cog_edit.png',
          tooltip: '编辑此条记录',
          handler: function(grid, rowIndex, colIndex) {
            //sampleStore.removeAt(rowIndex);      
            var proj_id=grid.getStore().getAt(rowIndex).get("proj_id");
            window.open('/ts/index.php/proj/update?proj_id='+proj_id);
          }
        }]
      },
        {text:'proj_id',     dataIndex:'proj_id',       filtable:true, width:100,hidden:true},
        {text:'proj_detail_id',     dataIndex:'proj_detail_id',       filtable:true, width:100,hidden:true},
        {text:'销售<br>状态',     dataIndex:'status',         filtable:true,sortable : true, width:50,style: "text-align:center;",align: 'center',
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
        {text:'份额',         dataIndex:'total_share',     filtable:true,sortable : true, width:50,style: "text-align:center;",align: 'center',
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
      {text:'产品信息',columns:[
        {text:'产品等级',     dataIndex:'grade',          filtable:true,sortable : true, width:90, 
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
          }
//          if(rowIndex==0){return res;}
//          return (store.getAt(rowIndex-1).data.name==record.data.name)?null:res; 
          return res;
        }},
        {text:'类别',       dataIndex:'sub_category',    filtable:true,sortable : true, width:150,style: "text-align:center;",align: 'left', 
        renderer: function(value,metaData,record,rowIndex,colIndex,store,view) {  
          metaData.tdAttr = 'data-qtip="'+value+'"';  
//          if(rowIndex==0){return value;}
//          return (store.getAt(rowIndex-1).data.name==record.data.name)?null:value; 
          return value;
        }},
        {text:'发行方',       dataIndex:'issue',         filtable:true,sortable : true, width:86,style: "text-align:center;",align: 'center', 
        renderer: function(value,metaData,record,rowIndex,colIndex,store,view) {  
          metaData.tdAttr = 'data-qtip="'+value+'"';  
//          if(rowIndex==0){return value;}
//          return (store.getAt(rowIndex-1).data.name==record.data.name)?null:value; 
          return value;
        }},
        {text:'项目名称',     dataIndex:'name',          filtable:true,sortable : true, width:180,style: "text-align:center;",align: 'left', 
        renderer: function(value,metaData,record,rowIndex,colIndex,store,view) {  
          metaData.tdAttr = 'data-qtip="'+value+'"';  
//          if(rowIndex==0){return '<b>'+value+'</b>';}
//          return (store.getAt(rowIndex-1).data.name==record.data.name)?null:'<b>'+value+'</b>'; 
          return '<b>'+value+'</b>';
        }
       }
//        {text:'合同信息',     dataIndex:'contract',        filtable:true,sortable : true, width:100, style: "text-align:center;",align: 'center',hidden:records[0].get("contract"),
//          renderer: function(value,metaData,record,colIndex,store,view) {  
//            metaData.tdAttr = 'data-qtip="<pre>'+value+'</pre>"';  
//            return value; 
//          }}
      ]},
      {text:'认购信息',columns:[
        {text:'认购金额',     dataIndex:'amount',          filtable:true,sortable : true, width:60, style: "text-align:center;",align: 'center',
        renderer: function(value,metaData,record,rowIndex,colIndex,store,view) {  
          if(value>=10000){ return value/10000+'亿'; } 
          if(value<10000){ return value+'万'; } 
        }},
        {text:'期限',     dataIndex:'month',           filtable:true,sortable : true, width:50,style: "text-align:center;",align: 'center', 
        renderer: function(value,metaData,record,rowIndex,colIndex,store,view) {  
          return value+'月';
        }},
        {text:'收益',     dataIndex:'profit',          filtable:true,sortable : true, width:50, style: "text-align:center;",align: 'center',
        renderer: function(value,metaData,record,rowIndex,colIndex,store,view) {  
          return value+'%'; 
        }}
      ]},
      {text:'佣金信息',columns:[
        {text:'税前佣金',     dataIndex:'commission_b_tax',  filtable:true,sortable : true, width:60, style: "text-align:center;",align: 'center',
        renderer: function(value,metaData,record,colIndex,store,view) { 
          if(value>0){
                return value+'%';
              } else {
                metaData.style='color:#8E8E8E';
                return 'N/A';
              }
        }},
        {text:'税后佣金',     dataIndex:'commission_a_tax',  filtable:true,sortable : true, width:60, style: "text-align:center;",align: 'center',
        renderer: function(value,metaData,record,colIndex,store,view) {  
          if(value>0){
                return value+'%';
              } else {
                metaData.style='color:#8E8E8E';
                return 'N/A';
              }
        }},
        {text:'平台费用',         dataIndex:'inner_commission', filtable:true,sortable : true, width:60, style: "text-align:center;",align: 'center',
        renderer: function(value,metaData,record,colIndex,store,view) {  
          if(value>0){
                return value+'%';
              } else {
                metaData.style='color:#8E8E8E';
                return 'N/A';
              }
        }},
        {text:'费用', dataIndex:'outer_commission', filtable:true,sortable : true, width:50, style: "text-align:center;",align: 'center',
        renderer: function(value,metaData,record,colIndex,store,view) {  
          if(value>0){
                return value+'%';
              } else {
                metaData.style='color:#8E8E8E';
                return 'N/A';
              }
        }},
        {text:'现结费用', dataIndex:'imm_payment', filtable:true,sortable : true, width:50, style: "text-align:center;",align: 'center',
        renderer: function(value,metaData,record,colIndex,store,view) {  
          if(value>0){
                return value+'%';
              } else {
                metaData.style='color:#8E8E8E';
                return 'N/A';
              }
        }}
      ]},
        {text:'产品<br>经理',     dataIndex:'manager',        filtable:true,sortable : true, width:50, style: "text-align:center;",align: 'center',
        renderer: function(value,metaData,record,rowIndex,colIndex,store,view) {  
          metaData.tdAttr = 'data-qtip="'+value+'"';  
//          if(rowIndex==0){return value;}
//          return (store.getAt(rowIndex-1).data.name==record.data.name)?null:value; 
          return value;
        }},
      {text:'添加时间',dataIndex:'create_ts',filtable:true,sortable : true, width:84, style: "text-align:center;",align: 'center',renderer:new Ext.util.Format.dateRenderer("Y-m-d")},
      {text:'打款进度', dataIndex:'countdown', filtable:true,sortable : true, minWidth:200,
        renderer: function(value,metaData,record,rowIndex,colIndex,store,view) {  
          metaData.tdAttr = 'data-qtip="'+value+'"';  
//          if(rowIndex==0){return value;}
//          return (store.getAt(rowIndex-1).data.name==record.data.name)?null:value; 
          return value;
        }
        },
      {text:'备注', dataIndex:'remark', filtable:true,sortable : true, minWidth:200,
        renderer: function(value,metaData,record,rowIndex,colIndex,store,view) {  
          metaData.tdAttr = 'data-qtip="'+value+'"';  
//          if(rowIndex==0){return value;}
//          return (store.getAt(rowIndex-1).data.name==record.data.name)?null:value; 
          return value;
        }
        }
      ];
    
    var fullGridExpander=[{
          ptype: 'rowexpander',
          selectRowOnExpand : true,
          rowBodyTpl : [
            '<table><tr><td style="padding:10px;border:1px;"><table>',
            '<tr><td class="r_ex_td_pre"><b>项目名称</b></td><td class="r_ex_td_main"><pre>{name}</pre></td></tr>',
            '<tr><td class="r_ex_td_pre"><b>基本情况</b></td><td class="r_ex_td_main"><b>{profit_property}收益</b>项目，由<b>{issue}</b>发行，期限<b>{month}</b>个月，融资规模<b>{scale:this.cusNum()}</b>，按<b>{cycle}</b>分配</td></tr>',
            //'{[(records[0].get("profit_property")==true)?"aaa":"bbb"]}',
            '<tr><td class="r_ex_td_pre"><b>分类</b></td><td class="r_ex_td_main"><pre>{category}->{sub_category}, {exclusive}</pre></td></tr>',
            '<tr><td class="r_ex_td_pre"><b>资金投向</b></td><td class="r_ex_td_main"><pre>{flow_of_fund}</pre></td></tr>',
            '<tr><td class="r_ex_td_pre"><b>项目亮点</b></td><td class="r_ex_td_main"><pre>{highlights}</pre></td></tr>',
            '<tr><td class="r_ex_td_pre"><b>合同情况</b></td><td class="r_ex_td_main"><pre>{contract}</pre></td></tr>',
            '<tr><td class="r_ex_td_pre"><b>备注</b></td><td class="r_ex_td_main"><pre>{remark}</pre></td></tr>',
            strPay+strQuota+strChannel+strManagerRemark,
            '</table></td></tr></table>',{
              cusDate:function(d){return Ext.Date.format(d,'Y年m月d日');}
            },{
              cusNum:function(n){return (n<10000)?(n+"万"):(n/10000+"亿")}
            }
        ]
      }];
    var fullGridC1=Ext.create('searchPanel', {
      store: sampleStoreC1,
      border:0,
      columnLines: true,
//      forceFit: true,
      width:1320,
      columns: fullGridColumns,
      title: '&nbsp;&nbsp;<b>&gt;&gt;&nbsp;固定收益产品&nbsp;&lt;&lt;</b> -- 点击折叠',
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

    var fullGridC2=Ext.create('searchPanel', {
      store: sampleStoreC2,
      border:0,
      width:1320,
      title: '&nbsp;&nbsp;<b>&gt;&gt;&nbsp;浮动收益产品&nbsp;&lt;&lt;</b> -- 点击展开',
      columnLines: true,
//      forceFit: true,
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
              text:'【集合信托产品：'
            },{
                text:'上市公司股票质押',
                handler:function(){
                  fullGridC1.filters.clearFilters();
                  sampleStoreC1.filterBy( function(record,id){
                    return record.get("sub_category")=="集合信托：上市公司股票质押类" ;
                  });
                }
            },{
                text:'政府基建',
                handler:function(){
                  fullGridC1.filters.clearFilters();
                  sampleStoreC1.filterBy( function(record,id){
                    return record.get("sub_category")=="集合信托：政府基建类";
                  });
                }
            },{
                text:'房地产',
                handler:function(){
                  fullGridC1.filters.clearFilters();
                  sampleStoreC1.filterBy( function(record,id){
                    return record.get("sub_category")=="集合信托：房地产类";
                  });
                }
            },{
                text:'其他信托',
                handler:function(){
                  fullGridC1.filters.clearFilters();
                  sampleStoreC1.filterBy( function(record,id){
                    return record.get("sub_category")=="集合信托：其他类";
                  });
                }
            },{
                text:'所有信托】',
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
                handler:function(){
                  fullGridC1.filters.clearFilters();
                  sampleStoreC1.filterBy( function(record,id){
                    return record.get("sub_category")=="私募基金";
                  });
                }
            },{
                text:'【P2P理财】',
                handler:function(){
                  fullGridC1.filters.clearFilters();
                  sampleStoreC1.filterBy( function(record,id){
                    return record.get("sub_category")=="P2P理财";
                  });
                }
            },{
                text:'【其他固定收益产品】',
                handler:function(){
                  fullGridC1.filters.clearFilters();
                  sampleStoreC1.filterBy( function(record,id){
                    return record.get("sub_category")=="其他" ;
                  });
                }
            },'-',{
                text:'全部显示',
                icon:'/ts/misc/resources/icons/grid.png',
                handler:function(){
                  fullGridC1.filters.clearFilters();
                  sampleStoreC1.load();
                }
            },'-',{
                text:'导出',
                icon:'/ts/misc/resources/icons/folder_go.png',
                handler:function(){
                  window.open('/ts/index.php/proj/view?c=1&format=csv');
                }
            }     
    ]);
    fullGridC2.child('toolbar').add([
            {
                xtype:'tbtext',
                text:'快速筛选：'
            },{
                text:'【债券基金】',
                handler:function(){
                  fullGridC2.filters.clearFilters();
                  sampleStoreC2.filterBy( function(record,id){
                    return record.get("sub_category")=="债券基金";
                  });
                }
            },{
                text:'【证券基金】',
                handler:function(){
                  fullGridC2.filters.clearFilters();
                  sampleStoreC2.filterBy( function(record,id){
                    return record.get("sub_category")=="证券基金";
                  });
                }
            },{
                text:'【股权基金】',
                handler:function(){
                  fullGridC2.filters.clearFilters();
                  sampleStoreC2.filterBy( function(record,id){
                    return record.get("sub_category")=="股权基金";
                  });
                }
            },{
                text:'【其他浮动收益产品】',
                handler:function(){
                  fullGridC2.filters.clearFilters();
                  sampleStoreC2.filterBy( function(record,id){
                    return record.get("sub_category")=="其他";
                  });
                }
            },'-',{
                text:'全部显示',
                icon:'/ts/misc/resources/icons/grid.png',
                handler:function(){
                  fullGridC2.filters.clearFilters();
                  sampleStoreC2.load();
                }
            },'-',{
                text:'导出',
                icon:'/ts/misc/resources/icons/folder_go.png',
                handler:function(){
                  window.open('/ts/index.php/proj/view?c=2&format=csv');
                }
            }
        ]);
    

    fullGridC1.on({
      beforeExpand:function(p){
        p.setTitle('&nbsp;&nbsp;<b>&gt;&gt;&nbsp;固定收益产品&nbsp;&lt;&lt;</b> -- 点击折叠');
      },
      beforeCollapse:function(p){
        p.setTitle('&nbsp;&nbsp;<b>&gt;&gt;&nbsp;固定收益产品&nbsp;&lt;&lt;</b> -- 点击展开');
      },
      celldblclick:cellclick
    });
    
    fullGridC2.on({
      beforeExpand:function(p){
        p.setTitle('&nbsp;&nbsp;<b>&gt;&gt;&nbsp;浮动收益产品&nbsp;&lt;&lt;</b> -- 点击折叠');
      },
      beforeCollapse:function(p){
        p.setTitle('&nbsp;&nbsp;<b>&gt;&gt;&nbsp;浮动收益产品&nbsp;&lt;&lt;</b> -- 点击展开');
      },
      celldblclick:cellclick
    });
    
  var viewport = Ext.create('Ext.Viewport', {
    layout: {
        type: 'border',
        padding: 0
    },
    defaults: {
        split: false                //可改变窗体大小
    },
    items: [{
    	  xtype:'toolbar',
    	  region:'north',
    	  height: 40,
    	  border:0,
        items:[
        {
        	xtype:'image',
                src:'/ts/misc/resources/firstshin.jpg',
          	width:240,
                height:38
        },{
        	xtype:'box',
        	html:'<span class="app-header2">管理模式</span>'
        },{
                xtype: 'tbtext',
                text:"小提示：双击可以查看项目详细信息。"
        },{
        	xtype:'box',
        	flex:1
        },{
          //icon: '/ts/misc/resources/icons/add.gif',
          text: '查看已结束项目',
              scale:'medium',
          handler: function () {
            if ( e == 1 ) {
              e = -1;
              sampleStoreC1.setProxy({
                type: 'ajax',
                url: '/ts/index.php/proj/view?c=1&e='+e,
                reader: {
                    type: 'json',
                    root: 'data'
                }
              });
              sampleStoreC1.load();
              sampleStoreC2.setProxy({
                type: 'ajax',
                url: '/ts/index.php/proj/view?c=2&e='+e,
                reader: {
                    type: 'json',
                    root: 'data'
                }
              });
              sampleStoreC2.load();
              this.setText('查看已结束项目');
            } else {
              e = 1;
              sampleStoreC1.setProxy({
                type: 'ajax',
                url: '/ts/index.php/proj/view?c=1&e='+e,
                reader: {
                    type: 'json',
                    root: 'data'
                }
              });
              sampleStoreC1.load();
              sampleStoreC2.setProxy({
                type: 'ajax',
                url: '/ts/index.php/proj/view?c=2&e='+e,
                reader: {
                    type: 'json',
                    root: 'data'
                }
              });
              sampleStoreC2.load();
              this.setText('查看在售和预约项目');
            };
          }
        },{
          icon: '/ts/misc/resources/icons/add.gif',
          text: '新增项目',
              scale:'medium',
          handler: function () {window.location.href='/ts/index.php/proj/create';} 
        },{
        	text:'用户管理',
              scale:'medium',
        	icon:'/ts/misc/resources/icons/user_edit.png',
        	handler:function(){window.location.href='/ts/index.php/user';}
        },{
        	text:'离开管理员模式',
              scale:'medium',
        	icon:'/ts/misc/resources/icons/cross.gif',
        	handler:function(){window.location.href='/ts/index.php/proj';}
        }]
      },{xtype:'panel',height:5,border:0,region:'north'},      {
        xtype:'panel',
        border:0,
        width:1320,
        region:'center',
        layout:{
          type: 'accordion',
          animate: true,
          titleCollapse: true,
          activeOnTop: true
        },
        items:[
          fullGridC1,
          fullGridC2
        ]
      },{xtype:'panel',height:5,border:0,region:'south'},{
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
  sampleStoreC1.load();
  sampleStoreC2.load();
  projInfoWin.hide();
});
