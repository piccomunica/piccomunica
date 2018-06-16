// Categories controller con basic crud
var Categories = {
  init: function(raw_info){
    this.records = [];
    this.load(raw_info);
    return this;
  },
  load: function(raw_info){
    var categories = Object.keys(raw_info);
    var index = 0;
    var records = this.records;
    categories.forEach(function(category_name){
      records.push(new Category(undefined,category_name,category_name,dataBase.colours[index]));
      index++;
    });
  },
  index: function(){
    return this.records;
  },
  read: function(id){
    return this.records.find(function(category){ return category.id == id })
  },
  create: function(category){
    this.records.unshift(category);
    $('#categories').trigger('new-category');
  },
  update: function(category){
    var original = this.read(category.id);
    var old_name = original.name;
    original.name = category.name;
    original.colour = category.colour;
    // emite evento para updatear la categoría
    var category_selector = 'pic-category[name="'+old_name+'"]';
    $(category_selector).trigger('updated-category');
  },
  // delete: function(category){
  //   var category_selector = 'pic-category[category="'+category.name+'"]';
  //   category = this.read(category.id);
  //   var index = this.records.indexOf(category);
  //   this.records.splice(index, 1);
  //   $(category_selector).trigger('removed-category');
  // }
};