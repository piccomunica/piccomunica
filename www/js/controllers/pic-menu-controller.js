var menuController = {
	init: function(e){
    // attributos a renderizar en la vista
	  $JSView.dataView({
	    'title': 'Configuración',
	    'position': 'menu',
	    'gradient': 'green-gradient',
	    'feature': 'menuController.close();',
	    'backfeature': true
	  },e);
    this.renderCategoryList();
    this.enableCategoryToggle();
	},
  // abre el menú
	open: function(){
    // setea la opción correcta de columnas
		$('input[value="'+app.dataBase.columns+'"]').prop('checked',true)
    // animación al abrir
		$('jsv-main').css({animation: 'to-right 1s forwards;'});
	},
  // cierra el menú
	close: function(){
    // animación al cerrar
		$('jsv-main').css({animation: 'to-left 1s forwards;'});
    // oculta el listado de categorías a editar
    $('#categories-edit ul').hide()
	},
  // esta función se lanza desde pic-menu.html al pulsar sobre alguna de las opciones de columnas
	updateStateOfColumns: function(){
    // busca el objeto input sobre el que se ha pulsado
    var pictoSize = findParentNode(event.target,'LABEL')
    pictoSize = pictoSize.firstElementChild;
    // setea la opción pulsada
    $(pictoSize).prop('checked',true);
    // reconfigura el número de columnas y cierra el menú
    menuController.updateNumberOfColumns(pictoSize);
    menuController.close();
  },
  // setea el nuevo valor de columnas
  updateNumberOfColumns: function(pictoSize){
    var columnsSize = parseInt(pictoSize.value);
    app.dataBase.columns = columnsSize;
    $('pic-category').forEach(function(category){
      category.setAttribute('columns',app.dataBase.columns);
    });
  },
  // añade listado de categorías disponibles
  renderCategoryList: function(){
    $('#categories-edit').append('<ul id="category-list" class="control"></ul>')
    app.dataBase.categories.forEach(function(category){
      $('#category-list').append('<li>'+category.name.capitalize()+'</li>')
    });
  },
  // des/pliega el listado categorías colapsable
  enableCategoryToggle: function(){
    $('#categories-edit p').bind('click',function(e){
      $('#categories-edit ul').toggle();
    });
  }
};