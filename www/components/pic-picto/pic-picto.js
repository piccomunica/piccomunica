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
    }
  },
  attached: function(){
    this.setFontSize();

    console.log('local DOM initialized');
  },
  setFontSize: function(){
    var size = 1.8-(0.25*(configuration.columns-1));
    $('pic-picto[name="'+this.name+'"] figcaption').css({'font-size': size+'em'});
  }
});