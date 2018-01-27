var dictionaryController = {
	init: function(e){
    // attributos a renderizar en la vista
	  $JSView.dataView({
	    'title': 'PicDiccionario',
	    'position': 'header',
	    'gradient': 'green-gradient',
	    'backfeature': 'false',
	    'columns': app.dataBase.columns
	  },e);
    // subscripción a eventos
	  $('#categories').on('new-category',this.prependNewCategory);
	  $(document).on('number-columns-modificated',this.updateNumberOfColumns);
	  // render pictionary
    this.renderCategoriesAndPictos();
    // render imagen inicio
	  setTimeout(function(){
	  	$('#img-inicio').velocity("fadeOut", {duration:1000});
    }, 700);
	},
  // renderiza categorías y pictos
	buildCategoryAndPictos: function(category,adition){
    // creación del componente picCategory
  	var _picCategory = picCategory(category);
    // pone al principio o al final de las categorías
  	(adition != 'prepend')? $('#categories').append(_picCategory) : $('#categories').prepend(_picCategory);
    // suscripción a los eventos sobre una categoría
	  $(_picCategory).on('updated-category',this.updateCategory);
	  $(_picCategory).on('removed-category',this.removeCategory);
    // se añaden los pictos a la categoría
  	var picSection = $(_picCategory.lastElementChild)
  	dictionaryController.renderPictos(category,picSection);
	},
	renderCategoriesAndPictos: function(){
    // se añaden categorías y pictos
		app.dataBase.categories.forEach(function(category){
			dictionaryController.buildCategoryAndPictos(category,'append');
	  });
    // añade envento que hace grande el picto
		$('pic-picto').on("click", extraPictoController.makeMeBig);
	},
	renderPictos: function(category,parent){
		category.pictos.forEach(function(picto){
			// creación del componente picPicto y render
      var _picPicto = picPicto(picto,category.folder,category.colour);
			parent.append(_picPicto);
		});
	},
  // actualiza el número de columnas del pictionary y reajusta el tamaño de la fuente
  updateNumberOfColumns: function(e){
    $('#categories').data('columns',app.dataBase.columns);
  	$('pic-category').forEach(function(category){
  		category.setNumberOfColumns();
  	});
  	$('pic-picto').forEach(function(picto){
  		picto.setFontSize();
  	});
  },
  prependNewCategory: function(){
  	var category = app.dataBase.categories.last();
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