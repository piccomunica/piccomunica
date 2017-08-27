var menuController = {
	init: function(e){
	  $JSView.dataView({
	    'title': 'Configuración',
	    'position': 'menu',
	    'gradient': 'green_gradient',
	    'feature': 'menuController.close();',
	    'backfeature': true
	  },e);
	  this.renders = {
	  	'category-new': $('micro-configuration-mobile')[0].renderNewCategoryConfigurator,
	  	'categories-edit': $('micro-configuration-mobile')[0].renderCategoriesEditConfigurator,
			'columns-conf': $('micro-configuration-mobile')[0].renderColumnsConfigurator,
			'remove-conf': $('micro-configuration-mobile')[0].removeConfigurator
		};
	},
	open: function(){
		$('jsv-main').css({animation: 'to-right 1s forwards;'});
	},
	close: function(){
		menuController.disableMicroConfigurationMobile();
		$('jsv-main').css({animation: 'to-left 1s forwards;'});
	},
	setCssKeyframes: function(maxHeight){
		$.keyframe.define([
			{ name: 'roll-dow', '0%': { 'height': '27px' }, '100%': { 'height': maxHeight } },
	    { name: 'roll-up', '0%': { 'height': maxHeight }, '100%': { 'height': '27px' } }
		]);
	},
	setMicroConfigurationMobile: function(){
		var optionClicked = (event.type != 'animationend') ? event.target : menuController.optionClicked;
		menuController.renders[optionClicked.id]();
		var height = $('#micro-mobile').height()+7;
		var maxHeight = height+'px';
		menuController.setCssKeyframes(maxHeight);
		menuController.optionClicked = optionClicked;
		$('micro-configuration-mobile').playKeyframe(['roll-dow 0.7s ease 0s 1 normal forwards'], function(){
			changeOnClickJs(menuController.optionClicked,"menuController.disableMicroConfigurationMobile();")
		});
	},
	resetMicroConfigurationMobile: function(type){
		menuController.renders['remove-conf']();
		if(type == 'total'){menuController.optionClicked = null;};
		$('#roll-dow').remove();
		$('#roll-up').remove();
	},
	activeMicroConfigurationMobile: function(){
		$('jsv-option').removeClass('active');
		$(event.target).addClass('active');
		if($('#micro-mobile').html().length > 6){
			changeOnClickJs(menuController.optionClicked,"menuController.activeMicroConfigurationMobile();");
			menuController.optionClicked = event.target;
			$('micro-configuration-mobile').playKeyframe(['roll-up 0.7s ease 0s 1 normal forwards'],function(){
				menuController.resetMicroConfigurationMobile('partial');
				menuController.setMicroConfigurationMobile();
			});
		}else{
			menuController.setMicroConfigurationMobile();
		};
	},
	disableMicroConfigurationMobile: function(){
		$('jsv-option').removeClass('active');
		if(menuController.optionClicked == undefined){ menuController.optionClicked = event.target; };
		$('micro-configuration-mobile').playKeyframe(['roll-up 0.7s ease 0s 1 normal forwards'], function(){
			changeOnClickJs(menuController.optionClicked,"menuController.activeMicroConfigurationMobile();");
			menuController.resetMicroConfigurationMobile('total');
		});
	}
};