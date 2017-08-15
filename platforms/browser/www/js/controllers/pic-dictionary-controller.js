var dictionaryController = {
	init: function(e){
	  $JSView.dataView({
	    'title': 'PicDiccionario'
	  },e);
	  var categories = $('#categories')
	  dictionaryController.appendCategoriesAndPictos(categories);
	},
	appendCategoriesAndPictos: function(parent){
		app.configuration.categories.forEach(function(category){
	  	var picCategory = document.createElement("pic-category");
	  	picCategory.setAttribute('title', category.name.capitalize());
	  	picCategory.setAttribute('colour', category.colour);
	  	parent.append(picCategory);
	  	var picSection = $(picCategory.lastElementChild)
	  	dictionaryController.appendPictos(category,picSection);
	  });
	},
	appendPictos: function(category,parent){
		category.pictos.forEach(function(picto){
			var picPicto = document.createElement("pic-picto");
			picPicto.setAttribute('category', category.name);
			picPicto.setAttribute('description', picto);
			dictionaryController.setBackground(category,picPicto);
			parent.append(picPicto);
		});
	},
	setBackground: function(category,picto){
  	var color = tinycolor(category.colour).toString();
    $(picto).css({background: color});
  }
};