Polymer({
  is: 'pic-picto',
  properties: {
    name: {
      type: String
    },
    description: {
      type: String
    },
    folder: {
      type: String
    },
    colour: {
      type: String
    },
    column_size: {
      type: Number,
      observer: 'setFontSize'
    }
  },
  // este código se ejecuta cuando el componente está cargado
  attached: function(){
    this.setFontSize();
    console.log('local DOM for pic-picto initialized');
  },
  // ajusta el tamaño de la fuente
  setFontSize: function(){
    var size = 1.8-(0.25*(this.column_size-1));
    $('pic-picto[name="'+this.name+'"] figcaption').css({'font-size': size+'em'});
  },
});