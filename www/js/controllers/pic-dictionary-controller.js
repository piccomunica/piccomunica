var dictionaryController = {
	init: function(e){
	  $JSView.dataView({
	    'title': 'PicDiccionario',
	    'position': 'header',
	    'gradient': 'green_gradient',
	    'backfeature': 'false',
	    'columns': configuration.columns
	  },e);
	  var categories = $('#categories');
	  $(document).on('number-columns-modificated',this.updateNumberOfColumns);
	  dictionaryController.appendCategoriesAndPictos(categories);
	  setTimeout(function(){
	  	$('#img-inicio').velocity("fadeOut", {duration:1000});
    }, 700);
	},
	appendCategoriesAndPictos: function(parent){
		app.configuration.categories.forEach(function(category){
	  	var picCategory = document.createElement("pic-category");
	  	picCategory.setAttribute('title', category.name.capitalize());
	  	picCategory.setAttribute('category', category.name);
	  	picCategory.setAttribute('colour', category.colour);
	  	picCategory.setAttribute('collapsibleicon', 'fa-chevron-up');
	  	parent.append(picCategory);
	  	var picSection = $(picCategory.lastElementChild)
	  	dictionaryController.appendPictos(category,picSection);
	  });
	},
	appendPictos: function(category,parent){
		category.pictos.forEach(function(picto){
			var picPicto = document.createElement("pic-picto");
			picPicto.setAttribute('category', category.name);
			picPicto.setAttribute('name', picto);
			picPicto.setAttribute('description', picto.replace(/_/g,' '));
			dictionaryController.setBackground(category,picPicto);
			parent.append(picPicto);
		});
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
  }
};