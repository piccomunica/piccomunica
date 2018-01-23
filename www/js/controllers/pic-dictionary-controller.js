var dictionaryController = {
	init: function(e){
	  $JSView.dataView({
	    'title': 'PicDiccionario',
	    'position': 'header',
	    'gradient': 'green_gradient',
	    'backfeature': 'false',
	    'columns': app.configuration.columns
	  },e);
	  $('#categories').on('new-category',this.prependNewCategory);
	  $(document).on('number-columns-modificated',this.updateNumberOfColumns);
	  dictionaryController.appendCategoriesAndPictos();
	  setTimeout(function(){
	  	$('#img-inicio').velocity("fadeOut", {duration:1000});
    }, 700);
	},
	aditionCategoryAndPictos: function(category,adition){
  	var picCategory = document.createElement("pic-category");
  	picCategory.setAttribute('title', category.name.capitalize());
  	picCategory.setAttribute('category', category.name);
  	picCategory.setAttribute('colour', category.colour);
  	picCategory.setAttribute('collapsibleicon', 'fa-chevron-up');
  	(adition != 'prepend')? $('#categories').append(picCategory) : $('#categories').prepend(picCategory);
	  $(picCategory).on('updated-category',this.updateCategory);
	  $(picCategory).on('removed-category',this.removeCategory);
  	var picSection = $(picCategory.lastElementChild)
  	dictionaryController.appendPictos(category,picSection);
	},
	appendCategoriesAndPictos: function(){
		app.configuration.categories.forEach(function(category){
			dictionaryController.aditionCategoryAndPictos(category,'append');
	  });
		$('pic-picto').on("click", this.makeMeBig);
	},
	renderPicto: function(name,folder,colour){
		var picPicto = document.createElement("pic-picto");
		picPicto.setAttribute('name', name);
		picPicto.setAttribute('folder', folder);
		picPicto.setAttribute('colour', colour);
		picPicto.setAttribute('description', name.replace(/_/g,' '));
		dictionaryController.setBackground(colour,picPicto);
		return picPicto;
	},
	appendPictos: function(category,parent){
		category.pictos.forEach(function(picto){
			var picPicto = dictionaryController.renderPicto(picto,category.folder,category.colour);
			parent.append(picPicto);
		});
	},
	makeMeBig: function(event){
		var blanco = event.target;
		while(blanco.nodeName != "PIC-PICTO"){
			blanco = blanco.parentNode;
		};
		var folder = blanco.folder;
		var name = blanco.name;
		var colour = blanco.colour;

		var picPicto = dictionaryController.renderPicto(name,folder,colour);

		$(picPicto).addClass('style-scope pic-picto big');
		$("#fondo-picto").append(picPicto);
		dictionaryController.bigPictoControler(picPicto);
	},
	bigPictoControler: function(picto){
		var $body = $("body");
		var fondo = $("#fondo-picto");
		//Prevenir scrolling
		fondo.bind('scroll touchmove mousewheel', function(e){
  			e.preventDefault();
  			e.stopPropagation();
  		return false;
		})
		$body.css("overflow", "hidden");
		fondo.css("height", window.innerHeight);
		fondo.addClass("picto-big").removeClass("picto-small");

		//salir vista picto grande
		$(picto).on("click", function(){
			fondo.unbind('scroll touchmove mousewheel');
      $body.removeAttr('style');
			fondo.removeClass("picto-big").addClass("picto-small").css('height',0);
			// marco.removeClass("marco-pic-grande");
			fondo.html("");
		})
	},
	setBackground: function(colour,picto){
  	var colour = tinycolor(colour).toString();
    $(picto).css({background: colour});
  },
  updateNumberOfColumns: function(e){
  	$('pic-category').forEach(function(category){
  		category.setNumberOfColumns();
  	});
  	$('pic-picto').forEach(function(picto){
  		picto.setFontSize();
  	});
  },
  prependNewCategory: function(){
  	var category = app.configuration.categories.last();
  	dictionaryController.aditionCategoryAndPictos(category,'prepend');
  	menuController.close();
  },
  updateCategory: function(){
  	var picCategory = event.target;
  	var picSection = $(picCategory.lastElementChild)
  	var category = $('micro-configuration-mobile')[0].getCategory();
  	picCategory.updateCategory(category);
  	$(picSection).empty();
  	dictionaryController.appendPictos(category,picSection);
  	menuController.close();
  },
  removeCategory: function(){
  	$(event.target).remove();
  	menuController.close();
  }
};