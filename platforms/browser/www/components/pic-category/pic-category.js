Polymer({
  is: 'pic-category',
  properties: {
    title: {
      type: String
    },
    colour: {
      type: String
    }
  },
  attached: function(){
  	this.setGradient();
  	this.categoryToggle();

    console.log('local DOM initialized');
  },
  categoryToggle: function(){
  	$('#'+this.title+'-category').on('click',function(e){
  		$('#'+this.parentElement.title+'-section').toggle();
  	})
  },
  setGradient: function(){
  	var colorLeft = tinycolor(this.colour).toString();
    var colorRight = tinycolor(colorLeft).spin(20).lighten(10).brighten(5).desaturate(10).toString();

    var bgWebkit = '-webkit-linear-gradient(left, '+colorRight+', '+colorLeft+')';
    var bgOpera = '-o-linear-gradient(left, '+colorRight+', '+colorLeft+')';
    var bgMoz = '-moz-linear-gradient(left, '+colorRight+', '+colorLeft+')';
    var bgNormal = 'linear-gradient(left, '+colorRight+', '+colorLeft+')';

    $(this.firstElementChild)
      .css({background: colorLeft})
      .css({background: bgNormal})
      .css({background: bgWebkit})
      .css({background: bgMoz})
      .css({background: bgOpera});
  }
});