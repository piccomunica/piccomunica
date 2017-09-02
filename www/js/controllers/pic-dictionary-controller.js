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
		$('pic-picto').on("click", this.makeMeBig);
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
	makeMeBig: function(event){
		var enlace;
		var blanco = event.target;
		var picImg = document.createElement("img");
		picImg.setAttribute("alt", "Imagen aumentada de un picto");
		picImg.setAttribute("width", "100%");
		picImg.setAttribute("height", "100%");
		while(blanco.nodeName != "PIC-PICTO"){
			blanco = blanco.parentNode;
		}
		enlace = "img/pictionary/"+blanco.category+"/"+blanco.name+".png";
		console.log(enlace);
		picImg.setAttribute("src", enlace);
		$("#marco-picto").html(picImg);
		this.bigPictoControler;
	},
	bigPictoControler: function(){
		$("body").addClass("stop-scrolling");
		$("#categories").addClass("stop-scrolling");
		$('body').bind('touchmove', function(e){e.preventDefault()})
		$("#fondo-picto").addClass("picto-big").removeClass("picto-small");

		//$("picto-grande").click();
		$("#marco-picto").on("click", function(){
			$("body").removeClass("stop-scrolling");
			$("#categories").removeClass("stop-scrolling");
			$('body').unbind('touchmove');
			$("#fondo-picto").addClass("picto-big").removeClass("picto-small");
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
  }
};