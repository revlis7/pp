Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', '/ts/misc/ux');

Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*',
    'Ext.ux.grid.FiltersFeature',
    'Ext.ux.ajax.JsonSimlet',
    'Ext.ux.ajax.SimManager'
]);

  var sampleData=[
['OPEN','在售','销售类别','产品等级','项目类别','子类别','发行方','项目名称','资金投向','项目亮点','24','40000','分配','100','项目收益属性','9.5','产品经理','备注','8','7','3.2','3.5',new Date(2012,05,12),'1000',new Date(2012,05,12),'500','1000','3000','主销渠道','渠道公司','渠道联系人','走帐公司','产品经理备注']

//  ['上市公司股票质押','分销','中融信托','华夏幸福股权收益权投资（4期）',12,0.5,'半年','钱'],
//  ['上市公司股票质押','包销','山东信托','恒鑫47号辉丰股份股权质押项目',12,0.53,'年','孙'],
//  ['政府基建','分销','方正东亚','东达蒙古王公路权益投资',15,1,'季','李'],
//  ['工商企业流动资金贷款','分销','长安信托','鄂尔多斯市投资担保有限公司股权投资',18,1.3,'年','周'],
//  ['住宅房地产','包销','五矿信托','福建鸿博股权投资（3期）','18','1.5','年','吴'],
//  ['工商企业流动资金贷款','分包','吉林信托','新湖控股应收债权转让及回购项目（2期）','18','2.84','年','郑'],
//  ['政府基建','分包','吉林信托','蓝色港湾','24','2','季','王'],
//  ['矿产能源类','分包','吉林信托','南山建材','18','1.5','半年','冯'],
//  ['金融公司股权质押','分销','四川信托','廊坊银行股权及次级债质押贷款','24','1.2','年','陈']
  ];

  var sampleChangeData=[
[new Date(2012,05,12),'孟祥春','把啥啥啥改成了啥啥啥'],
[new Date(2012,05,13),'孟祥春','把啥啥啥改成了啥啥啥'],
[new Date(2012,05,14),'孟祥春','把啥啥啥改成了啥啥啥'],
[new Date(2012,05,15),'孟祥春','把啥啥啥改成了啥啥啥'],
[new Date(2012,05,16),'孟祥春','把啥啥啥改成了啥啥啥'],
[new Date(2012,05,17),'孟祥春','把啥啥啥改成了啥啥啥']


//  ['上市公司股票质押','分销','中融信托','华夏幸福股权收益权投资（4期）',12,0.5,'半年','钱'],
//  ['上市公司股票质押','包销','山东信托','恒鑫47号辉丰股份股权质押项目',12,0.53,'年','孙'],
//  ['政府基建','分销','方正东亚','东达蒙古王公路权益投资',15,1,'季','李'],
//  ['工商企业流动资金贷款','分销','长安信托','鄂尔多斯市投资担保有限公司股权投资',18,1.3,'年','周'],
//  ['住宅房地产','包销','五矿信托','福建鸿博股权投资（3期）','18','1.5','年','吴'],
//  ['工商企业流动资金贷款','分包','吉林信托','新湖控股应收债权转让及回购项目（2期）','18','2.84','年','郑'],
//  ['政府基建','分包','吉林信托','蓝色港湾','24','2','季','王'],
//  ['矿产能源类','分包','吉林信托','南山建材','18','1.5','半年','冯'],
//  ['金融公司股权质押','分销','四川信托','廊坊银行股权及次级债质押贷款','24','1.2','年','陈']
  ];
  
  var chTotalShareList=Ext.create('Ext.data.ArrayStore', {
    fields: ['id', 'text'],
    data: [
      ['OPEN','OPEN'],
      ['大带小','大带小'],
      ['无','无']
    ]
  });

  var chStatusList=Ext.create('Ext.data.ArrayStore', {
    fields: ['id', 'text'],
    data: [
      ['在售','在售'],
      ['预约','预约'],
      ['结束','结束']
    ]
  });

  var chExclusiveList=Ext.create('Ext.data.ArrayStore', {
    fields: ['id', 'text'],
    data: [
      ['包销类','包销类'],
      ['分销类','分销类'],
      ['通道类','通道类']
    ]
  });

  var chGradeList=Ext.create('Ext.data.ArrayStore', {
    fields: ['id', 'text'],
    data: [
      ['五星级','五星级'],
      ['四星级','四星级'],
      ['三星级','三星级'],
      ['二星级','二星级'],
      ['一星级','一星级']
    ]
  });

  var chCategoryList=Ext.create('Ext.data.ArrayStore', {
    fields: ['id', 'text'],
    data: [
      ['信托类','信托类'],
      ['债券类','债券类'],
      ['私募证券类','私募证券类'],
      ['私募股权类','私募股权类'],
      ['其他类','其他类']
    ]
  });

  var chCycleList=Ext.create('Ext.data.ArrayStore', {
    fields: ['id', 'text'],
    data: [
      ['项目期','项目期'],
      ['年','年'],
      ['半年','半年'],
      ['季度','季度'],
      ['月','月'],
      ['其他','其他'],
      ['不适用','不适用']
    ]
  });

  var chProfitPropertyList=Ext.create('Ext.data.ArrayStore', {
    fields: ['id', 'text'],
    data: [
      ['固定','固定'],
      ['浮动','浮动'],
      ['固定加浮动','固定加浮动'],
      ['其他','其他']
    ]
  });

  var chManagerList=Ext.create('Ext.data.ArrayStore', {
    fields: ['id', 'text'],
    data: [
      ['申玉玺','申玉玺'],
      ['孟祥春','孟祥春'],
      ['王琪','王琪'],
      ['王璐','王璐'],
      ['郭晶晶','郭晶晶']
    ]
  });
  var chSubCategoryList = Ext.create('Ext.data.Store', {
       fields: ['value', 'text'],
       data:[],
       autoLoad : true
  });

  var subTrustList=[
      ['非商业地产房地产类','非商业地产房地产类'],
      ['商业地产类','商业地产类'],
      ['政府基建类','政府基建类'],
      ['上市公司股票质押类','上市公司股票质押类'],
      ['非上市金融公司股票质押类','非上市金融公司股票质押类'],
      ['一般工商企业流动资金贷款','一般工商企业流动资金贷款'],
      ['FOT','FOT'],
      ['TOT','TOT'],
      ['其他信托','其他信托']
    ]

  var subBondList=[
      ['公司债','公司债'],
      ['企业债','企业债'],
      ['央行债券','央行债券'],
      ['中小企业私募债','中小企业私募债'],
      ['有限合伙制债权基金','有限合伙制债权基金'],
      ['其他债券','其他债券']
    ]

  var subPrivateSecuritiesList=[
      ['券商集合理财','券商集合理财'],
      ['阳光私募基金','阳光私募基金'],
      ['公募基金','公募基金'],
      ['专户“一对多”','专户“一对多”'],
      ['私募证券FOF','私募证券FOF'],
      ['其他私募证券基金','其他私募证券基金']
    ]

  var subPrivateEquityList=[
      ['PE','PE'],
      ['VC','VC'],
      ['PE FOF','PE FOF'],
      ['VC FOF','VC FOF'],
      ['PIPE','PIPE'],
      ['并购基金','并购基金'],
      ['地产基金','地产基金'],
      ['Reits','Reits'],
      ['其他私募股权基金','其他私募股权基金']
    ]

  var subOtherList=[
      ['混合型FOF','混合型FOF'],
      ['对冲基金','对冲基金'],
      ['其他不便归类基金','其他不便归类基金']
    ]

  var sampleStore=Ext.create('Ext.data.JsonStore', {
      fields: [
        {name:'proj_id'      ,type:'integer' },
        {name:'proj_detail_id'      ,type:'integer' },
        {name:'total_share'      ,type:'string' },
        {name:'status'           ,type:'string' },
        {name:'exclusive'        ,type:'string' },
        {name:'grade'            ,type:'string' },
        {name:'category'         ,type:'string' },
        {name:'sub_category'     ,type:'string' },
        {name:'issue'            ,type:'string' },
        {name:'name'             ,type:'string' },
        {name:'flow_of_fund'     ,type:'string' },
        {name:'highlights'       ,type:'string' },
        {name:'month'            ,type:'integer'},
        {name:'scale'            ,type:'integer'},
        {name:'cycle'            ,type:'string' },
        {name:'amount'           ,type:'integer'},
        {name:'profit_property'  ,type:'string' },
        {name:'profit'           ,type:'float'  },
        {name:'manager'          ,type:'string' },
        {name:'contract'      ,type:'string' },
        {name:'remark'           ,type:'string' },
        {name:'commission_b_tax' ,type:'float'  },
        {name:'commission_a_tax' ,type:'float'  },
        {name:'inner_commission' ,type:'float'  },
        {name:'outer_commission' ,type:'float'  },
        {name:'pay'              ,type:'date'   },
        {name:'paid'             ,type:'integer'},
        {name:'found'            ,type:'date'   },
        {name:'quota'            ,type:'integer'},
        {name:'quota_paid'       ,type:'integer'},
        {name:'quota_remain'     ,type:'integer'},
        {name:'main_channel'     ,type:'string' },
        {name:'channel_company'  ,type:'string' },
        {name:'channel_contact'  ,type:'string' },
        {name:'billing_company'  ,type:'string' },
        {name:'manager_remark'   ,type:'string' }
      ],
      proxy: {
        type: 'ajax',
        //url: '/etc/proj_sample_data.json',
        url: '/ts/index.php/proj/view',
        reader: {
            type: 'json',
            root: 'data'
        }
      }
    });
  
  var sampleChanges=Ext.create('Ext.data.ArrayStore', {
  	fields:[
  	  {name:'changeDate',type:'date'},
  	  {name:'changePerson',type:'string'},
  	  {name:'changes',type:'string'}
  	],
      proxy: {
        type: 'ajax',
        url: '/ts/index.php/etc/recent_change_data.json',
        reader: {
            type: 'json',
            root: 'data'
        }
      }
  });
  
  var filtersCfg = {
      ftype: 'filters',
//      autoReload: true, //don't reload automatically
      local: true, //only filter locally
      // filters may be configured through the plugin,
      // or in the column definition within the headers configuration
      filters: [
        {type:'list'   ,dataIndex:'total_share'      ,store: chTotalShareList},
        {type:'list'   ,dataIndex:'status'           ,store: chStatusList},
        {type:'list'   ,dataIndex:'exclusive'        ,store: chExclusiveList},
        {type:'list'   ,dataIndex:'grade'            ,store: chGradeList},
        {type:'list'   ,dataIndex:'category'         ,store: chCategoryList},
        {type:'string' ,dataIndex:'sub_category'     },
        {type:'string' ,dataIndex:'issue'            },
        {type:'string' ,dataIndex:'name'             },
        {type:'string' ,dataIndex:'flow_of_fund'     },
        {type:'string' ,dataIndex:'highlights'       },
        {type:'numeric',dataIndex:'month'            },
        {type:'numeric',dataIndex:'scale'            },
        {type:'string' ,dataIndex:'cycle'            },
        {type:'numeric',dataIndex:'amount'           },
        {type:'list'   ,dataIndex:'profit_property'  ,store: chProfitPropertyList},
        {type:'numeric',dataIndex:'profit'           },
        {type:'list'   ,dataIndex:'manager'          ,store: chManagerList},
        {type:'string' ,dataIndex:'remark'           },
        {type:'numeric',dataIndex:'commission_b_tax' },
        {type:'numeric',dataIndex:'commission_a_tax' },
        {type:'numeric',dataIndex:'inner_commission' },
        {type:'numeric',dataIndex:'outer_commission' },
        {type:'date'   ,dataIndex:'pay'              },
        {type:'numeric',dataIndex:'paid'             },
        {type:'date'   ,dataIndex:'found'            },
        {type:'numeric',dataIndex:'quota'            },
        {type:'numeric',dataIndex:'quota_paid'       },
        {type:'numeric',dataIndex:'quota_remain'     },
        {type:'string' ,dataIndex:'main_channel'     },
        {type:'string' ,dataIndex:'channel_company'  },
        {type:'string' ,dataIndex:'channel_contact'  },
        {type:'string' ,dataIndex:'billing_company'  },
        {type:'string' ,dataIndex:'manager_remark'   }
      ]
  };    
