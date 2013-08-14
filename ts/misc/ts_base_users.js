Ext.Loader.setConfig({enabled: true,disableCaching:false});
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

  var strUserList=Ext.create('Ext.data.ArrayStore', {
    fields: ['loginname', 'realname','title','branch','tel','qq','mobile','email'],
    proxy: {
      type: 'ajax',
      //url: '/etc/proj_sample_data.json',
      url: '/ts/index.php/user/view',
      reader: {
          type: 'json',
          root: 'data'
      }
    }
  });

  var chTitleList=Ext.create('Ext.data.ArrayStore', {
    fields: ['id', 'text'],
    data: [
      ['CEO','CEO'],
      ['产品总监','产品总监'],
      ['产品经理','产品经理'],
      ['财富中心合伙人','财富中心合伙人'],
      ['独立理财顾问','独立理财顾问'],
      ['理财师','理财师'],
      ['大区总监','大区总监'],
      ['渠道经理','渠道经理'],
      ['CTO','CTO'],
      ['业务人员','业务人员'],
      ['外部兼职人员','外部兼职人员'],
      ['VIP客户','VIP客户'],
      ['其他人员','其他人员']
    ]
  });
  
  var chBranchList=Ext.create('Ext.data.ArrayStore', {
    fields: ['id', 'text'],
    data: [
      ['本部','本部'],
      ['北京','北京'],
      ['南京','南京'],
      ['上海','上海'],
      ['机构部','机构部'],
      ['东北区','东北区'],
      ['华北区','华北区'],
      ['华中区','华中区'],
      ['中南区','中南区'],
      ['华东区','华东区'],
      ['华南区','华南区'],
      ['西南区','西南区']
    ]
  });
