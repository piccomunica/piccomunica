Polymer({
  is: 'pic-category',
  properties: {
    title: {
      type: String
    },
    category: {
      type: String
    },
    colour: {
      type: String
    },
    collapsibleicon: {
      type: String
    }
  },
  // este código se ejecuta cuando el componente está cargado
  attached: function(){
    // añade icono colapsable
    this.setCollapsibleIcon();
    // rellena el fondo con el gradiente
  	setGradient(this.colour,this.firstElementChild);
    // setea el número de columnas
    this.setNumberOfColumns();
    // setea el comportamiento del colapsable
    this.categoryToggle();
    console.log('local DOM for pic-category initialized');
  },
  // devuelve el valor css para el atributo grid según el número de columnas
  getCssColumns: function(){
    var cssColumns = " ";
    var i = 0;
    var percent = 100/app.dataBase.columns
    while(i<app.dataBase.columns){
      cssColumns = cssColumns + percent + '% ';
      i++;
    };
    return cssColumns;
  },
  // configura el formato de las columnas a través de css grid
  setNumberOfColumns: function(){
    var cssColumns = this.getCssColumns();
    $('#'+this.category+'-section').css({'grid-template-columns': cssColumns});
  },
  categoryToggle: function(){
    // añade un evento sobre la categoría
    $('#'+this.category+'-category').on('click',function(e){
      // cambia el icono
      var picCategory = this.parentElement;
      picCategory.changeIcon(picCategory,e);
      // des/pliega el colapsable con los pictos
      $('#'+picCategory.category+'-section').toggle();
    })
  },
  changeIcon: function(picCategory,e){
    // borra el icono anterior
    $('#'+this.category+'-category i.'+picCategory.collapsibleicon).remove();
    // añade el nuevo icono colapsable
    var newIcon = picCategory.collapsibleicon == 'fa-chevron-up' ? 'fa-chevron-down' : 'fa-chevron-up';
    picCategory.collapsibleicon = newIcon;
    this.setCollapsibleIcon();
  },
  setCollapsibleIcon: function(){
    $('#'+this.category+'-category').append('<i aria-hidden="true" style="color: white;" class="style-scope pic-category fa '+this.collapsibleicon+' fa-1x"></i>');
  },
  updateCategory: function(category){
    // actualiza datos
    this.setAttribute('title', category.name.capitalize());
    this.setAttribute('category', category.name);
    this.setAttribute('colour', category.colour);
    // actualiza el gradiente
    setGradient(this.colour,this.firstElementChild);
  }
});