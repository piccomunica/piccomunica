var categoryEditionController = {
  init: function(e){
    // attributos a renderizar en la vista
    $JSView.dataView({
      'title': '"Modificar Categoría"',
      'position': 'header',
      'gradient': 'green-gradient',
      'category_id': this.category.id,
      'category_name': this.category.name.capitalize(),
      'category_colour': this.category.colour,
      'category_pictos': this.category.pictos
    },e);
    this.cssChanges();
    this.renderPictos();
  },
  cssChanges: function(){
    // más espacio para el título
    this.changeHeaderGrid();
    // añade gradiente
    category_container = $('#container-category-edition');
    setInverseGradient('#acdc48',category_container);
  },
  changeHeaderGrid: function(){
    $($("#picCategoryEdition jsv-header")[0]).attr('style','grid-template-columns: 5% 90% 5%;');
  },
  // abre la opción
  open: function(e){
    // render new attributes
    var category_id = $(event.target).attr('category-id');
    // busqueda de categoría en bbdd y la setea como variable del controller
    this.category = app.dataBase.loadCategory(category_id);
    this.init(e);
    // animación al abrir
    $('#picCategoryEdition').show();
    $('#picCategoryEdition').css({animation: 'to-right 1s forwards;'});
    // setear eventos
    $(document).on('category-colour-modificated',this.changePictosColour);
  },
  // cierra la opción
  close: function(){
    // cierra el colapsable de la lista de categorías del menú (se quedó abierto)
    $('#categories-edit ul').toggle();
    // animación al cerrar
    $('#picCategoryEdition').css({animation: 'to-left 1s forwards;'});
    // espera a que termine la animación para ocultar
    setTimeout(function(){
      $('#picCategoryEdition').hide();
    }, 1200);
  },
  renderPictos: function(){
    var pictos_container = $('#category-edition-pictos-container');
    var category = this.category;
    var columns = 5.4;
    this.category.pictos.forEach(function(picto){
      // creación del componente picPicto y render
      var _picPicto = picPicto(picto,category.folder,category.colour,columns);
      pictos_container.append(_picPicto);
    });
  },
  changePictosColour: function(){
    var colour = $('pic-colour-input input')[0].value;
    $('#category-edition-pictos-container pic-picto').forEach(function(picto){
      setBackgroundColour(colour,picto);
    });
  },
  save: function(){
    var old_name = this.category.name;
    // actualizar atributos que pueden haber cambiado
    this.category.name = $('#container-category-edition input[type=text]')[0].value.toLowerCase();
    this.category.colour = $($('#rainbow-colours span[data-selected=true]')[0]).attr('data-colour');
    // actualiza la categoría en bbdd
    var new_category = new Category(this.category.id,this.category.name,this.category.folder,this.category.colour,this.category.pictos);
    app.dataBase.updateCategory(new_category);
    // emite evento para updatear la categoría
    var category_selector = 'pic-category[name="'+old_name+'"]';
    $(category_selector).trigger('updated-category');
    this.close();
    menuController.close();
  }
};