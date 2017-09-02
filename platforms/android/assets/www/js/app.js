var app = {
  configuration: configuration,
  // Application Constructor
  initialize: function() {
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
    $JSView.declareView({
      picDictionary: {
        url: '/pic-dictionary',
        template: 'views/pic-dictionary.html',
        controller: 'picDictionary'
      }
    });
    $JSView.declareModal({
      // modal: {
      //   url: '/modal',
      //   template: 'views/modal.html',
      //   controller: 'modal'
      // }
    });
    $JSView.initView('picDictionary');
  }
};