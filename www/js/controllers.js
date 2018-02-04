// carga los controladores de cada vista
$JSView.controller = {
  menu: function(e){
    // función que pasa datos a la vista
    // se puede ejecutar aquí o en el controller
    $JSView.dataView({},e)
  	menuController.init(e);
  },
  picDictionary: function(e){
  	dictionaryController.init(e);
  },
  picCategoryEdition: function(e){
    categoryEditionController.init(e);
  }
}
