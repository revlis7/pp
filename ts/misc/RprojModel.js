Ext.define('Rproj', {
    extend: 'Ext.data.Model',
    fields: [
      {name:"id",type:"integer"},
      {name:"proj_name",type:"string"},
      {name:"amount",type:"integer"},
      {name:"month",type:"integer"},
      {name:"profit_max",type:"float"},
      {name:"profit_suggest",type:"float"},
      {name:"guarantee_mode",type:"string"},
      {name:"repayment",type:"string"},
      {name:"proj_rel",type:"string"},
      {name:"proj_deadline",type:"date"},
      {name:"remark",type:"string"},
      {name:"operation",type:"string"}
    ],
    hasMany: {model: 'Relation', name: 'relation'},
    proxy: {
        type: 'ajax',
        url : '/ts/index.php/relation/proj',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});

Ext.define('Relation', {
    extend: 'Ext.data.Model',
    fields: [
      'id',
      'proj_id',
      'company_id',
      'status',
      'contact_person',
      'update_ts',
      'operation'
    ],

    belongsTo: 'Rproj'
});