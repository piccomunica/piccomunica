// constructor Category
function Category(id=generateUUID(),name,folder='undefined',colour,pictos=['nuevo']){
  this.id = id;
  this.name = name;
  this.folder = folder;
  this.colour = colour;
  this.pictos = function(){
    return dataBase.pictos.by_category(this.id);
  };
};

// constructor Pictos
function Picto(id=generateUUID(),name,description,category_id){
  this.id = id;
  this.name = name;
  this.description = description;
  this.category_id = category_id;
};