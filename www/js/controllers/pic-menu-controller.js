var menuController = {
	init: function(e){
	  $JSView.dataView({
	    'title': 'Configuración',
	    'position': 'menu',
	    'gradient': 'green_gradient',
	    'feature': 'menuController.close();',
	    'backfeature': true
	  },e);
	},
	open: function(){
		$('input[value="'+app.configuration.columns+'"]').prop('checked',true)
		$('jsv-main').css({animation: 'to-right 1s forwards;'});
	},
	close: function(){
		$('jsv-main').css({animation: 'to-left 1s forwards;'});
	},
	updateStateOfColumns: function(){
		var pictoSize = event.target.firstElementChild;
    $(pictoSize).prop('checked',true);
    menuController.updateNumberOfColumns(pictoSize);
    menuController.close();
  },
  updateNumberOfColumns: function(pictoSize){
    var columnsSize = parseInt(pictoSize.value);
    configuration.columns = columnsSize;
    $('#categories').data('columns',configuration.columns);
    $(document).trigger('number-columns-modificated');
  },
};