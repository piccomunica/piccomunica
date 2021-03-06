// app: objeto básico
var app = {
  editableCategory: false,
  // Application Constructor
  initialize: function(data_base,raw_info) {
    // setea las opciones by default
    this.dataBase = data_base.init(raw_info);
    this.onLoadImgReady();
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    app.receivedEvent('deviceready');
  },
  // Update DOM on a Received Event
  receivedEvent: function(id) {
    app.jsview();
  },
  onLoadImgReady: function(){
    var loadingImg = document.createElement('img');
    $(loadingImg).attr('src',"img/img_inicio.jpg");
    $(loadingImg).css({'width': window.innerWidth, 'height': window.innerHeight, 'position': 'absolute', 'top': 0, 'z-index': 11});
    $(loadingImg).attr('id','img-inicio');
    $('body').prepend(loadingImg);
    console.log("loading app!");
  },
  jsview: function(){
    // setea el tipo de menús disponibles
    $JSView.run('left');
    $JSView.declareMenu({
      menu: {
        url: '/menu',
        template: 'views/pic-menu.html',
        controller: 'menu'
      }
    });
    // setea las vistas
    $JSView.declareView({
      picDictionary: {
        url: '/pic-dictionary',
        template: 'views/pic-dictionary.html',
        // se setea en js/controllers.js
        controller: 'picDictionary'
      },
      picCategoryEdition: {
        url: '/pic-category-edition',
        template: 'views/pic-category-edition.html',
        // se setea en js/controllers.js
        controller: 'picCategoryEdition'
      }
    });
    $JSView.declareModal({
      // modal: {
      //   url: '/modal',
      //   template: 'views/modal.html',
      //   controller: 'modal'
      // }
    });
    // lanza la vista inicial
    $JSView.initView('picDictionary');
  }
};