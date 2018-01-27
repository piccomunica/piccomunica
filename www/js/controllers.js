// carga los controladores de cada vista
$JSView.controller = {
  menu: function(e){
    // función que pasa datos a la vista
    $JSView.dataView({},e)
  	menuController.init(e);
  },
  picDictionary: function(e){
  	dictionaryController.init(e);
  }
}
