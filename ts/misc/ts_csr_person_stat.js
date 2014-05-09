var personStatDailyStore;
var checkResult;

Ext.onReady(function(){

var csrPersonFollowsStore=Ext.create('Ext.data.JsonStore', {
    pageSize : 100,
    remoteSort : true ,
	autoLoad:true,
    leadingBufferZone: 100,
    buffered: true,
//    sorters:[{property:'csr_person_id',direction:'ASC'}],
    extraParams:{total:50000},
//    simpleSortMode:true,
	fields: [
		{name:'csr_person_id',type:'integer'},
		{name:'csr_person_FSC_follow_status',type:'string'},
		{name:'csr_person_FSC_opp_and_prob',type:'string'},
		{name:'csr_person_FSC_solution',type:'string'},
		{name:'csr_person_follow_update_ts',type:'date',dateFormat:"Y-m-d H:i:s"	},
		{name:'id',type:'integer'},
		{name:'csr_person_follow_creator',type:'string'},
		{name:'csr_person_cat',type:'string'},
		{name:'csr_person_name',type:'string'},
		{name:'csr_person_gender',type:'string'},
		{name:'csr_person_mobile',type:'string'},
	],
	proxy: {
		type: 'ajax',
		url: '/ts/index.php/csr_person/follows_view',
		reader: {
			type: 'json',
			root: 'data',
   		    totalProperty: 'totalCount'
		},
   		simpleSortMode: true,
        filterParam: 'query',
		encodeFilters: function(filters) {
	   		return filters[0].value;
      	}
	}
});

var reportersStore=Ext.create('Ext.data.JsonStore', {
    fields:[
		{name:'userid',type:'integer'},
		{name:'loginname',type:'string'},
		{name:'title',type:'string'},
		{name:'realname',type:'string'},
		{name:'branch',type:'string'}
        ],
    proxy: {
		type: 'ajax',
		url: '/ts/index.php/user/view_reporters?access_mode=csr_person/save',
		reader: {
			type: 'json',
			root: 'data'
		}
    }
    
});

var csrPersonFollowWin=Ext.create('Ext.window.Window',{
	resizeable:false,
	closeAction:"hide",
	closable:true,
	title:'个人客户跟踪',
	titleAlign:'center',
	width:920,
    height:600,
	layout:'fit',
	items:[
{
    xtype:'grid',
    id:'follows_list',
	store: csrPersonFollowsStore,
	border:0,
	columnLines: true,
        
	//title: '渠道客户',
    verticalScroller : {
		xtype : 'paginggridscroller'
	} ,
	selModel: {
        pruneRemoved: false
    },
    features:[{
        ftype: 'grouping',
        hideGroupedHeader: false
    }],
    viewConfig: {
        trackOver: false
    },
    multiSelect: true,
    listeners:{
    	celldblclick:function(grid,td,cellIndex,record,tr,rowIndex){
			//sampleStore.removeAt(rowIndex);
	        var temp_csr_person_id=grid.getStore().getAt(rowIndex).get("csr_person_id");
	        window.open('/ts/index.php/csr_person?csr_person_id='+temp_csr_person_id);
	    }
	},
	columns: [
		/*{
			xtype: 'actioncolumn',
			width:80,style: "text-align:center;",align: 'center',
			sortable: false,
			items: [{
				icon: '/ts/misc/resources/icons/cog_16.png',
				tooltip: '编辑此条记录',
				handler: function(grid, rowIndex, colIndex) {
					//sampleStore.removeAt(rowIndex);
					Ext.getCmp('infoForm').getForm().loadRecord(grid.getStore().getAt(rowIndex));
                    var temp_csr_person_id=grid.getStore().getAt(rowIndex).get("csr_person_id");
                    followpanel.down('form').down('hiddenfield[name="csr_person_id"]').setValue(temp_csr_person_id);
					csrPersonFollowStore.setProxy({
						type: 'ajax',
						url: '/ts/index.php/csr_person/follow_view?csr_person_id='+temp_csr_person_id,
						reader: {
							type: 'json',
							root: 'data'
						}
					});
                    csrPersonFollowStore.load();
                    this.up('panel').up('panel').getLayout().setActiveItem(1);
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
		},*/
		{
			xtype: 'actioncolumn',
			width:60,style: "text-align:center;",align: 'center', 
			sortable: false,
			items: [{
				icon: '/ts/misc/resources/icons/magnifying_glass_16.png',
				tooltip: '查看该用户的详细信息',
				handler: function(grid, rowIndex, colIndex) {
					//e=Ext.getCmp('projPanel');
					//e.proj_id=grid.getStore().getAt(rowIndex).get("proj_id");
					//e.setTitle(grid.getStore().getAt(rowIndex).get("issue")+" "+grid.getStore().getAt(rowIndex).get("name"))
					//Ext.getCmp('topInfo').getLayout().setActiveItem(2);
			        var temp_csr_person_id=grid.getStore().getAt(rowIndex).get("csr_person_id");
			        window.open('/ts/index.php/csr_person?csr_person_id='+temp_csr_person_id);
				}
          }]
        },
        {dataIndex:'csr_person_cat',text:'客户类别', filtable:true, style: "text-align:center;",align: 'center',width:80},
		{dataIndex:'csr_person_name',text:'姓名', filtable:true, style: "text-align:center;",align: 'center',width:80},
		{dataIndex:'csr_person_gender',text:'性别', filtable:true, style: "text-align:center;",align: 'center',width:60},
		{dataIndex:'csr_person_mobile',text:'手机', filtable:true, style: "text-align:center;",align: 'center',width:100},
    	{dataIndex:'csr_person_follow_creator',text:'最后跟进人', filtable:true, style: "text-align:center;",align: 'center',width:120},
			{text:'跟进时间',dataIndex:'csr_person_follow_update_ts',filtable:true, style: "text-align:center;",align: 'center',width:100,renderer:new Ext.util.Format.dateRenderer("Y-m-d")},
			{text:'跟进状况',dataIndex:'csr_person_FSC_follow_status',filtable:true, style: "text-align:center;",align: 'left',width:350,renderer: function(value, meta, record) {    
         		return '<div style="white-space:normal;">' + value + '</div>';
		    	}  
            },
			{text:'机会和问题',dataIndex:'csr_person_FSC_opp_and_prob',filtable:true, style: "text-align:center;",align: 'left',width:250,renderer: function(value, meta, record) {    
         		return '<div style="white-space:normal;">' + value + '</div>';
		    	}  
            },
			{text:'解决方案',dataIndex:'csr_person_FSC_solution',filtable:true, style: "text-align:center;",align: 'left',width:200,renderer: function(value, meta, record) {    
         		return '<div style="white-space:normal;">' + value + '</div>';
		    	}  
            }
	],
	viewConfig: {
		stripeRows: true,
		forceFit:true,
		sortAscText:'正序',
		sortDescText:'降序'
	},
	loadMask: true,
	emptyText: '没有匹配的记录'
}]
});
    
function checkFormChange(f,newValue){
    checkResult[f.innerCheckId][1]=newValue;
    if(typeof(FollowsMainChart)!='undefined'){
    	FollowsMainChart.destroy();
    }
    dataArray=[];
    for(i=0;i<checkResult.length;i++){
        if(checkResult[i][1]==true){
            dataArray.push(checkResult[i][0]);
        }
    }
    endDate=new Date();
FollowsMainChart=Ext.create('Ext.chart.Chart', {
    //renderTo:Ext.getBody(),
    region:'center',
    style: 'background:#fff',
    animate: true,
    shadow: true,
    store: personStatDailyStore,
    legend: {
      position: 'right'  
    },
    axes: [{
        type: 'time',
        position: 'bottom',
        fields: ['sday'],
        title: '日期',
        constrain: true,
        dateFormat: 'M d',
        fromDate: Ext.Date.add(endDate, Ext.Date.DAY, -15),
        toDate: endDate
    },{
        type: 'Numeric',
        position: 'left',
        fields: dataArray,
        //minimum: 0,
        //maximum: 100,
        label: {
            renderer: Ext.util.Format.numberRenderer('0,0')
        },
        grid: true,
        title: '数量'
    }],
    series: [{
        type: 'column',
        axis: 'bottom',
        xField: ['sday'],
        yField: dataArray,
        label:{
        	display: 'insideEnd',
       		'text-anchor': 'middle',
        	field: dataArray,
        	renderer: Ext.util.Format.numberRenderer('0'),
        	orientation: 'vertical',
        	color: '#333'
    	},
        tips: {
            trackMouse: true,
            width: 200,
            height: 52,
            renderer: function(storeItem, item) {
                //this.setTitle(storeItem.get('realname') + ' <br /> ' + storeItem.get('sday').toLocaleDateString() + ' 星期' + storeItem.get('sday').getDay() + ' <br /> 新增跟进数 ' + storeItem.get('no_follows') + ' 人');
                this.setTitle(item.yField + ' <br /> ' + item.value[0].toLocaleDateString() + ' 星期' + item.value[0].getDay() + ' <br /> 新增跟进数 ' + item.value[1] + ' 人');
            }
        },
        listeners:{
            'itemclick': function(a,b,c) {
                //Ext.Msg.alert('测试','姓名: '+a.storeItem.data.realname+'<br />跟进客户数: '+a.storeItem.data.no_distfollows+'<br />跟进数: '+a.storeItem.data.no_follows+'<br />日期: '+a.storeItem.data.sday.toLocaleDateString());
                csrPersonFollowsStore.setProxy({
					type: 'ajax',
                    url: '/ts/index.php/csr_person/follows_view?s_username='+encodeURI(a.yField)+'&s_day='+ (( a.value[0].getYear() < 1900 ) ? ( 1900 + a.value[0].getYear() ) : a.value[0].getYear())+"-"+(a.value[0].getMonth()+1)+"-"+a.value[0].getDate()+'&s_mode=day',
					reader: {
						type: 'json',
						root: 'data',
   					    totalProperty: 'totalCount'
					},
   					simpleSortMode: true,
        			filterParam: 'query',
					encodeFilters: function(filters) {
	   					return filters[0].value;
      				}
				});
                csrPersonFollowsStore.load();
                csrPersonFollowWin.show();
            }
        }
    }]
});
    Ext.getCmp('viewport').add(FollowsMainChart);
}

reportersStore.load(function(records, operation, success) {
    NJCheckFormFields=[];
    SHCheckFormFields=[];
    OtherCheckFormFields=[];
    checkResult=[];
    personStatDailyFields=[
		{name:'sday'    ,type:'date' ,dateFormat:"Y-m-d"	}];
    Ext.Array.forEach(records,function(record){
        if(record.get("branch")=="南京财富中心"){
            NJCheckFormFields.push({
		        boxLabel  : record.get('realname'),
		        name      : record.get('realname'),
                loginname : record.get("loginname"),
		        inputValue: false,
		        innerCheckId:reportersStore.indexOf(record),
		        listeners:{
		            change:checkFormChange
		        }
		    });
            personStatDailyFields.push({name:unescape(record.get('realname')) ,type:'integer' });
            checkResult[reportersStore.indexOf(record)]=[record.get('realname'),false];
        }
        
    });
    Ext.Array.forEach(records,function(record){
        if(record.get("branch")=="上海财富中心"){
            SHCheckFormFields.push({
		        boxLabel  : record.get('realname'),
		        name      : record.get('realname'),
                loginname : record.get("loginname"),
		        inputValue: false,
		        innerCheckId:reportersStore.indexOf(record),
		        listeners:{
		            change:checkFormChange
		        }
		    });
            personStatDailyFields.push({name:unescape(record.get('realname')) ,type:'integer' });
            checkResult[reportersStore.indexOf(record)]=[record.get('realname'),false];
        }
    });
    Ext.Array.forEach(records,function(record){
        if(record.get("branch")!="南京财富中心" && record.get("branch")!="上海财富中心"){
            OtherCheckFormFields.push({
		        boxLabel  : record.get('realname'),
		        name      : record.get('realname'),
                loginname : record.get("loginname"),
		        inputValue: false,
		        innerCheckId:reportersStore.indexOf(record),
		        listeners:{
		            change:checkFormChange
		        }
		    });
            personStatDailyFields.push({name:unescape(record.get('realname')) ,type:'integer' });
            checkResult[reportersStore.indexOf(record)]=[record.get('realname'),false];
        }
    });

    personStatDailyStore=Ext.create('Ext.data.JsonStore', {
    	//autoLoad:true,
		fields: personStatDailyFields,
		proxy: {
			type: 'ajax',
			url: '/ts/index.php/csr_person/get_daily_stats',
			reader: {
				type: 'json',
				root: 'data'
			}
		}
	});
    personStatDailyStore.load(function(records, operation, success) {
    if(NJCheckFormFields.length>0){
    	var NJCheckForm = Ext.create('Ext.form.Panel', {
    		region:'north',
    		defaultType: 'checkboxfield',
            items:[{
        		xtype: 'checkboxgroup',
        		fieldLabel: '南京财富中心',
                vertical: true,
                columns: 6,
        		items: NJCheckFormFields
            }],
            listeners:{
                added:function( el, container, pos, eOpts){
	    			if(NJCheckForm.down('checkboxgroup').down('checkbox[loginname="'+Ext.util.Cookies.get("loginname")+'"]') != null){
            			NJCheckForm.down('checkboxgroup').down('checkbox[loginname="'+Ext.util.Cookies.get("loginname")+'"]').setValue(true);
    				}
                }
            }
    	});
		Ext.getCmp('viewport').add(NJCheckForm);
    }
    if(SHCheckFormFields.length>0){
    	var SHCheckForm = Ext.create('Ext.form.Panel', {
    		region:'north',
    		defaultType: 'checkboxfield',
            items:[{
        		xtype: 'checkboxgroup',
        		fieldLabel: '上海财富中心',
                vertical: true,
                columns: 6,
        		items: SHCheckFormFields
            }],
            listeners:{
                added:function( el, container, pos, eOpts){
    				if(SHCheckForm.down('checkboxgroup').down('checkbox[loginname="'+Ext.util.Cookies.get("loginname")+'"]') != null){
                		SHCheckForm.down('checkboxgroup').down('checkbox[loginname="'+Ext.util.Cookies.get("loginname")+'"]').setValue(true);
    				}
                }
            }
    	});
		Ext.getCmp('viewport').add(SHCheckForm);
    }
    if(OtherCheckFormFields.length>0){
	    var OtherCheckForm = Ext.create('Ext.form.Panel', {
    		region:'north',
	    	defaultType: 'checkboxfield',
            items:[{
        		xtype: 'checkboxgroup',
        		fieldLabel: '其他人员',
                vertical: true,
                columns: 6,
        		items: OtherCheckFormFields
            }],
            listeners:{
                added:function( el, container, pos, eOpts){
    				if(OtherCheckForm.down('checkboxgroup').down('checkbox[loginname="'+Ext.util.Cookies.get("loginname")+'"]') != null){
            			OtherCheckForm.down('checkboxgroup').down('checkbox[loginname="'+Ext.util.Cookies.get("loginname")+'"]').setValue(true);
    				}
                }
            }
    	});
		Ext.getCmp('viewport').add(OtherCheckForm);
    }
    });

});

});
