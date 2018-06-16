Polymer({
  is: 'pic-picto',
  properties: {
    id: {
      type: String
    },
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
      type: String,
      observer: 'setBackgroundColour'
    },
    column_size: {
      type: Number,
      observer: 'setFontSize'
    }
  },
  // este código se ejecuta cuando el componente está cargado
  attached: function(){
    this.setFontSize.bind(this);
    console.log('local DOM for pic-picto initialized');
  },
  // ajusta el tamaño de la fuente
  setFontSize: function(){
    var column_width = window.innerWidth/this.column_size;
    var percent_size = column_width/768;
    var pixels_ref = window.innerWidth/25;
    var size = pixels_ref+(pixels_ref*percent_size);
    $(this).css({'font-size': size+'px'});
  },
  setBackgroundColour(){
    setBackgroundColour(this.colour,this);
  }
});