var categoryEditionController = {
  init: function(e){
    // attributos a renderizar en la vista
    $JSView.dataView({
      'title': this.title,
      'position': 'header',
      'gradient': 'green-gradient',
      'category_id': this.category.id,
      'category_name': this.category.name.capitalize(),
      'category_colour': this.category.colour
    },e);
    this.cssChanges();
    if (this.category) {
      // carga de pictos temporal
      this.category_pictos = this.category.pictos();
      this.pictos_to_remove = [];
      this.renderPictos.bind(this)();
    };
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
    app.editableCategory = true;
    // render new attributes
    var category_id = $(event.target).attr('category-id');
    this.title = category_id ? '"Modificar Categoría"' : '"Categoría nueva"';
    // busqueda de categoría en bbdd y la setea como variable del controller
    if (category_id) {
      this.new = false;
      var category = app.dataBase.categories.read(category_id);
      // categoría clonada para evitar referenciar el objeto original y que los cambios se ejecuten sobre este
      this.category = new Category(category.id,category.name,category.folder,category.colour);
    } else {
      this.new = true;
      this.category = new Category(undefined,"",'undefined',app.dataBase.colours[0]);
      // creación de un picto por defecto
      dataBase.pictos.create(new Picto(undefined,'nuevo','nuevo',this.category.id))
    };
    this.init(e);
    // animación al abrir
    $('#picCategoryEdition').show();
    $('#picCategoryEdition').css({animation: 'to-right 1s forwards;'});
    // setear eventos
    $('pic-colour-input').on('category-colour-modificated',this.changePictosColour.bind(this));
    $('#category-edition-pictos-container').on('removed-picto',this.renderPictos.bind(this));
  },
  // cierra la opción
  close: function(){
    app.editableCategory = false;
    // cierra el colapsable de la lista de categorías del menú (si se quedó abierto)
    $('#categories-edit ul').hide();
    // animación al cerrar
    $('#picCategoryEdition').css({animation: 'to-left 1s forwards;'});
    // espera a que termine la animación para ocultar
    setTimeout(function(){
      $('#picCategoryEdition').hide();
    }, 1200);
  },
  renderPictos: function(){
    var pictos_container = $('#category-edition-pictos-container');
    // limpia el contenedor para evitar duplicar pictos
    $(pictos_container).empty();
    var category = this.category;
    var columns = 5.4;
    // se renderizan los pictos cargados en el componente
    this.category_pictos.forEach(function(picto){
      // creación del componente picPicto y render
      var _picPicto = picPicto(picto,category.folder,category.colour,columns);
      pictos_container.append(_picPicto);
    });
  },
  changePictosColour: function(){
    var colour = $('pic-colour-input input')[0].value;
    $('#category-edition-pictos-container pic-picto').forEach(function(picto){
      // setea el color a ser guardado de modo temporal
      this.category.colour = colour;
      // setea el color
      picto.setAttribute('colour', colour);
    }.bind(this));
  },
  temporalDelete: function(picto){
    picto = app.dataBase.pictos.read(picto.id);
    var index = this.category_pictos.indexOf(picto);
    this.category_pictos.splice(index, 1);
    this.pictos_to_remove.push(picto);
    // emite evento para remover picto de modo temporal
    $('#category-edition-pictos-container').trigger('removed-picto');
  },
  save: function(){
    // actualizar atributos que pueden haber cambiado
    this.category.name = $('#container-category-edition input[type=text]')[0].value.toLowerCase();
    this.category.colour = $($('#rainbow-colours span[data-selected=true]')[0]).attr('data-colour');
    // actualiza o crea la categoría en bbdd
    !this.new ? app.dataBase.categories.update(this.category) : app.dataBase.categories.create(this.category);
    // borra los pictos definitivamente
    this.pictos_to_remove.forEach(function(picto){
      app.dataBase.pictos.delete(picto);
    });
    this.close();
    menuController.close();
  }
};