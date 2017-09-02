Polymer({
  is: 'pic-header',
  properties: {
    logo: {
      type: String
    },
    position: {
      type: String
    },
    gradient: {
      type: String
    },
    feature: {
      type: String
    },
    backfeature: {
      type: String
    }
  },
  attached: function(){
  	this.addCssClass();
  	if(this.backfeature != 'false'){
  		this.addBackFeature(this.feature);
  	};
  },
  addCssClass: function(){
  	$('pic-header header').addClass('style-scope pic-header');
  	$('pic-header header').addClass(this.position);
  	$('pic-header header').addClass(this.gradient);
  },
  addBackFeature: function(feature){
  	var iconBack = '<i class="fa fa-chevron-left fa-2x" aria-hidden="true" style="color: white;" onclick="'+feature+'"></i>';
  	$('#'+this.position+'-icon-back').html(iconBack);
  }
});