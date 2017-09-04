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
	appendPictos: function(category,parent){
		category.pictos.forEach(function(picto){
			var picPicto = document.createElement("pic-picto");
			picPicto.setAttribute('name', picto);
			picPicto.setAttribute('folder', category.folder);
			picPicto.setAttribute('description', picto.replace(/_/g,' '));
			dictionaryController.setBackground(category,picPicto);
			parent.append(picPicto);
		});
	},
	makeMeBig: function(event){
		var enlace;
		var blanco = event.target;
		var picImg = document.createElement("img");
		picImg.setAttribute("alt", "Imagen aumentada de un picto");
		picImg.setAttribute("width", "270px");
		picImg.setAttribute("height", "270px");
		while(blanco.nodeName != "PIC-PICTO"){
			blanco = blanco.parentNode;
		}
		console.log(blanco);
		enlace = "img/pictionary/"+blanco.folder+"/"+blanco.name+".png";
		console.log(enlace);
		picImg.setAttribute("src", enlace);
		var marco = $("#marco-picto");
		marco.html(picImg);
		
		var category_colour = blanco.parentNode.parentNode.colour;
		var pic_color = tinycolor(category_colour).toString();
    	marco.css("border-color", pic_color);
		var leyenda = document.createElement("figcaption");
		leyenda.textContent= blanco.description;
		marco.append(leyenda);
		
		dictionaryController.bigPictoControler(marco);
	},
	bigPictoControler: function(marco){
		var $body = $("body");
		var fondo = $("#fondo-picto"); 
		//Prevenir scrolling
		$body.on('scroll touchmove mousewheel', function(e){
  			e.preventDefault();
  			e.stopPropagation();
  		return false;
		})
		$body.css("overflow", "hidden");
		fondo.css("height", window.innerHeight);
		fondo.addClass("picto-big").removeClass("picto-small");
		marco.addClass("marco-pic-grande");
	
		//salir vista picto grande
		marco.on("click", function(){
			$body.off('scroll touchmove mousewheel');
			fondo.removeClass("picto-big").addClass("picto-small");
			marco.removeClass("marco-pic-grande");
			marco.html("");
		})
	},
	setBackground: function(category,picto){
  	var color = tinycolor(category.colour).toString();
    $(picto).css({background: color});
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