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
		$('jsv-main').css({animation: 'to-right 1s forwards;'});
	},
	close: function(){
		$('jsv-main').css({animation: 'to-left 1s forwards;'});
	}
};