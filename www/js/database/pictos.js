// Pictos controller con basic crud
var Pictos = {
  init: function(){
    this.records = [];
    this.load();
    return this;
  },
  load: function(){
    var categories = dataBase.categories.records;
    var records = this.records;
    categories.forEach(function(category){
      var pictos = raw_info[category.name];
      pictos.forEach(function(picto_name){
        records.push(new Picto(undefined,picto_name,picto_name,category.id));
      });
    });
  },
  index: function(){
    return this.records;
  },
  read: function(id){
    return this.records.find(function(picto){ return picto.id == id })
  },
  create: function(picto){
    this.records.push(picto);
    // $('#pictos').trigger('new-picto');
  },
  // update: function(picto){
  //   var original = this.read(picto.id);
  //   original.name = picto.name;
  //   original.description = picto.description;
  //   original.category_id = picto.category_id;
  //   // original.pictos = changed.pictos;
  // },
  delete: function(picto){
    picto = this.read(picto.id);
    var index = this.records.indexOf(picto);
    this.records.splice(index, 1);
    // emite evento para remover picto
    var category_selector = 'pic-category[id="'+picto.category_id+'"]';
    $(category_selector).trigger('removed-picto');
  },
  // filters o scopes
  by_category: function(category_id){
    return this.records.filter(function(picto){ return picto.category_id == category_id })
  }
};