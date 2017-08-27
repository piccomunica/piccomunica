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
  attached: function(){
    this.setCollapsibleIcon();
  	this.setGradient();
    this.setNumberOfColumns();
    this.categoryToggle();

    console.log('local DOM initialized');
  },
  setNumberOfColumns: function(){
    var cssColumns = getCssColumns();
    $('#'+this.category+'-section').css({'grid-template-columns': cssColumns});
  },
  categoryToggle: function(){
    $('#'+this.category+'-category').on('click',function(e){
      var picCategory = this.parentElement;
      picCategory.changeIcon(picCategory,e);
      $('#'+picCategory.category+'-section').toggle();
    })
  },
  changeIcon: function(picCategory,e){
    var newIcon = picCategory.collapsibleicon == 'fa-chevron-up' ? 'fa-chevron-down' : 'fa-chevron-up';
    $('#'+this.category+'-category i.'+picCategory.collapsibleicon).remove();
    picCategory.collapsibleicon = newIcon;
    this.setCollapsibleIcon();
  },
  setCollapsibleIcon: function(){
    $('#'+this.category+'-category').append('<i aria-hidden="true" style="color: white;" class="style-scope pic-category fa '+this.collapsibleicon+' fa-1x"></i>');
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