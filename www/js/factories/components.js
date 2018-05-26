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
function picPicto(picto,category_folder,category_colour,column_size){
  var picPicto = document.createElement("pic-picto");
  picPicto.setAttribute('id', picto.id);
  picPicto.setAttribute('name', picto.name);
  picPicto.setAttribute('folder', category_folder);
  picPicto.setAttribute('colour', category_colour);
  picPicto.setAttribute('column_size',column_size)
  picPicto.setAttribute('description', picto.description.replace(/_/g,' '));
  setBackgroundColour(category_colour,picPicto);
  // añade envento que hace grande el picto
  $(picPicto).on("click", extraPictoController.makeMeBig);
  return picPicto;
};

// constructor container big picto
function containerBigPicto(){
  var container = document.createElement("div");
  container.setAttribute('id','container-big-picto');
  return container;
};

// constructor delete picto button
function closePictoButton(picto){
  var icon = document.createElement("i");
  icon.setAttribute('id','exit-picto-icon');
  icon.setAttribute('class',"fa fa-reply fa-3x exit-icon");
  icon.setAttribute('aria-hidden',true);
  icon.setAttribute('style','color: '+picto.colour)
  $(icon).on("click",extraPictoController.makeMeSmall);
  return icon;
};

// constructor delete picto button
function deletePictoButton(picto){
  var icon = document.createElement("i");
  icon.setAttribute('id','delete-picto-icon');
  icon.setAttribute('class',"fa fa-minus-circle fa-4x delete-icon");
  icon.setAttribute('aria-hidden',true);
  icon.setAttribute('data-picto-id',picto.id);
  icon.setAttribute('style','color: '+picto.colour)
  $(icon).on("click",categoryEditionController.temporalDelete.bind(categoryEditionController,picto));
  $(icon).on("click",extraPictoController.makeMeSmall);
  return icon;
};

