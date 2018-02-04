Polymer({
  is: 'pic-category',
  properties: {
    id: {
      type: String
    },
    name: {
      type: String
    },
    title: {
      type: String
    },
    colour: {
      type: String
    },
    columns: {
      type: Number,
      observer: 'updateNumberOfColumns'
    },
    collapsibleicon: {
      type: String
    }
  },
  // este código se ejecuta cuando el componente está cargado
  attached: function(){
    this.loadCategory();
    // añade icono colapsable
    this.setCollapsibleIcon();
    // rellena el fondo con el gradiente
    setGradient(this.colour,this.firstElementChild);
    // setea el número de columnas
    this.setNumberOfColumns();
    // render de los pictos
    this.renderPictos();
    // activa el comportamiento del colapsable
    this.enableCategoryToggle();
    // subscripción a eventos
    $(this).on('updated-category',this.updateCategory);
    console.log('local DOM for pic-category initialized');
  },
  // busqueda de categoría en bbdd y la setea como variable del controller
  loadCategory: function(){
    this.category = app.dataBase.loadCategory(this.id);
  },
  // configura el formato de las columnas a través de css grid
  setNumberOfColumns: function(){
    var cssColumns = getCssColumns(this.columns);
    $('#'+this.name+'-section').css({'grid-template-columns': cssColumns});
  },
  // actualiza el número de columnas de la categoría y reajusta el tamaño de la fuente
  updateNumberOfColumns: function(e){
    $('#categories').data('columns',this.columns);
    this.setNumberOfColumns();
    var columns = this.columns;
    $('pic-category pic-picto').forEach(function(picto){
      picto.setAttribute('column_size',columns);
    });
  },
  renderPictos: function(){
    var parent = $(this.lastElementChild)[0];
    $(parent).empty();
    var category = this.category;
    var columns = this.columns;
    category.pictos.forEach(function(picto){
      // creación del componente picPicto y render
      var _picPicto = picPicto(picto,category.folder,category.colour,columns);
      parent.append(_picPicto);
    });
  },
  enableCategoryToggle: function(){
    // añade un evento sobre la categoría
    $('#'+this.name+'-category').on('click',function(e){
      // cambia el icono
      var picCategory = this.parentElement;
      picCategory.changeIcon(picCategory,e);
      // des/pliega el colapsable con los pictos
      $('#'+picCategory.name+'-section').toggle();
    })
  },
  changeIcon: function(picCategory,e){
    // borra el icono anterior
    $('#'+this.name+'-category i.'+picCategory.collapsibleicon).remove();
    // añade el nuevo icono colapsable
    var newIcon = picCategory.collapsibleicon == 'fa-chevron-up' ? 'fa-chevron-down' : 'fa-chevron-up';
    picCategory.collapsibleicon = newIcon;
    this.setCollapsibleIcon();
  },
  setCollapsibleIcon: function(){
    $('#'+this.name+'-category').append('<i aria-hidden="true" style="color: white;" class="style-scope pic-category fa '+this.collapsibleicon+' fa-1x"></i>');
  },
  updateCategory: function(){
    this.loadCategory();
    // actualiza datos
    this.setAttribute('title', this.category.name.capitalize());
    this.setAttribute('name', this.category.name);
    this.setAttribute('colour', this.category.colour);
    // actualiza el gradiente
    setGradient(this.colour,this.firstElementChild);
    // render new pictos
    this.renderPictos();
  }
});