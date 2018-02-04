// constructor Category
function Category(id=generateUUID(),name,folder='undefined',colour,pictos=['nuevo']){
  this.id = id;
  this.name = name;
  this.folder = folder;
  this.colour = colour;
  this.pictos = pictos;
};

// constructor componente pic-category
function picCategory(category){
  var picCategory = document.createElement("pic-category");
  picCategory.setAttribute('id', category.id);
  picCategory.setAttribute('title', category.name.capitalize());
  picCategory.setAttribute('name', category.name);
  picCategory.setAttribute('colour', category.colour);
  picCategory.setAttribute('columns', app.dataBase.columns);
  picCategory.setAttribute('collapsibleicon', 'fa-chevron-up');
  return picCategory;
};

// constructor componente pic-category
function picPicto(picto_name,category_folder,category_colour,column_size){
  var picPicto = document.createElement("pic-picto");
  picPicto.setAttribute('name', picto_name);
  picPicto.setAttribute('folder', category_folder);
  picPicto.setAttribute('colour', category_colour);
  picPicto.setAttribute('column_size',column_size)
  picPicto.setAttribute('description', picto_name.replace(/_/g,' '));
  setBackgroundColour(category_colour,picPicto);
  return picPicto;
};

