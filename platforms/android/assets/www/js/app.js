var app = {
  // Application Constructor
  initialize: function() {
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
  jsview: function(){
    // setea el tipo de menús disponibles
    $JSView.run('left');
    $JSView.declareMenu({
      // menu: {
      //   url: '/menu',
      //   template: 'views/menuLeft.html',
      //   controller: 'menu'
      // }
    });
    $JSView.declareView({
      picDictionay: {
        url: '/pic-dictionary',
        template: 'views/pic-dictionary.html',
        controller: 'picDictionay'
      }
    });
    $JSView.declareModal({
      // modal: {
      //   url: '/modal',
      //   template: 'views/modal.html',
      //   controller: 'modal'
      // }
    });
    $JSView.initView('picDictionay');
  }
};