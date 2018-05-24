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
	  // $(_picCategory).on('removed-category',this.removeCategory);
	},
	renderCategoriesAndPictos: function(){
    // se añaden categorías y pictos
		app.dataBase.categories.forEach(function(category){
			dictionaryController.buildCategoryAndPictos(category,'append');
	  });
    // añade envento que hace grande el picto
		$('pic-picto').on("click", extraPictoController.makeMeBig);
	},
  prependNewCategory: function(){
  	var category = app.dataBase.categories.last();
  	dictionaryController.buildCategoryAndPictos(category,'prepend');
    // añade envento que hace grande el picto
    $('pic-picto').on("click", extraPictoController.makeMeBig);
  	menuController.close();
  },
  removeCategory: function(){
  	$(event.target).remove();
  	menuController.close();
  }
};