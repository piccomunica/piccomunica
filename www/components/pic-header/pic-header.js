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
  // este código se ejecuta cuando el componente está cargado
  attached: function(){
    // añade estilos css
  	this.addCssClass();
  	if(this.backfeature == 'true'){
      // añade el icono que permite la funcionalidad de regresar
  		this.addBackFeature(this.feature);
  	};
  },
  addCssClass: function(){
  	$('pic-header jsv-header').addClass('style-scope pic-header');
  	$('pic-header jsv-header').addClass(this.position);
  	$('pic-header jsv-header').addClass(this.gradient);
  },
  addBackFeature: function(feature){
  	var iconBack = '<i class="fa fa-chevron-left fa-2x" aria-hidden="true" style="color: white;" onclick="'+feature+'"></i>';
  	$('#'+this.position+'-icon-back').html(iconBack);
  }
});