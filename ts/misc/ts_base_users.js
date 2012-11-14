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

  var strUserList=Ext.create('Ext.data.ArrayStore', {
    fields: ['loginname', 'realname','title','branch','tel','qq','email'],
    proxy: {
      type: 'ajax',
      //url: '/etc/proj_sample_data.json',
      url: '/ts/index.php/user/view',
      reader: {
          type: 'json',
          root: 'data'
      }
    }
//    data: [
//      ['loginname1','张三','产品经理','上海第一财富中心','13911111111','12345678','abc@def.com'],
//      ['loginname2','李四','业务人员','上海第一财富中心','18622222222','87654321','ghi@jkl.com']
//    ]
  });
  
  var chTitleList=Ext.create('Ext.data.ArrayStore', {
    fields: ['id', 'text'],
    data: [
      ['CEO','CEO'],
      ['产品与研究部总监','产品与研究部总监'],
      ['产品与研究部副总监','产品与研究部副总监'],
      ['产品经理','产品经理'],
      ['业务人员','业务人员'],
      ['外部兼职人员','外部兼职人员']
    ]
  });
  
  var chBranchList=Ext.create('Ext.data.ArrayStore', {
    fields: ['id', 'text'],
    data: [
      ['上海第一财富中心','上海第一财富中心'],
      ['上海第二财富中心','上海第二财富中心'],
      ['北京财富中心','北京财富中心'],
      ['温州财富中心','温州财富中心'],
      ['重庆财富中心','重庆财富中心'],
      ['厦门财富中心','厦门财富中心']
    ]
  });
