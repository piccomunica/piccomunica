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
  // setea el nuevo valor de columnas y lanza evento a pic-dictionary controller
  updateNumberOfColumns: function(pictoSize){
    var columnsSize = parseInt(pictoSize.value);
    app.dataBase.columns = columnsSize;
    $(document).trigger('number-columns-modificated');
  },
};