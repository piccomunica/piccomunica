$JSView.controller = {
  menu: function(e){
    $JSView.dataView({},e)
  	menuController.init(e);
  },
  picDictionary: function(e){
  	dictionaryController.init(e);
  }
}
