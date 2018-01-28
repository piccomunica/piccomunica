// extra picto controller
var extraPictoController = {
  makeMeBig: function(event){
    // encuentra el picto
    var picto = findParentNode(event.target,'PIC-PICTO')
    // creación del componente big picPicto
    var _picPicto = picPicto(picto.name,picto.folder,picto.colour);
    $(_picPicto).addClass('style-scope pic-picto big');
    // render big picPicto with exit icon
    var container = $("#container-big-picto");
    extraPictoController.resizeContainer(container);
    extraPictoController.addExitFeature(container,picto.colour);
    container.append(_picPicto);
    // añade funcionalidad a big picPicto
    extraPictoController.disableScrolling(container);
    $("#exit-icon").on("click",extraPictoController.makeMeSmall);
  },
  //salir vista picto grande
  makeMeSmall: function(){
    var container = $("#container-big-picto");
    extraPictoController.enableScrolling(container);
    extraPictoController.resetContainer(container);
    // marco.removeClass("marco-pic-grande");
  },
  resizeContainer: function(container){
    var $body = $("body");
    $body.css("overflow", "hidden");
    container.css("height", window.innerHeight);
    container.addClass("picto-big").removeClass("picto-small");
  },
  resetContainer: function(container){
    container.removeClass("picto-big").addClass("picto-small").css('height',0);
    container.html("");
    $("body").removeAttr('style');
  },
  enableScrolling: function(container){
    container.unbind('scroll touchmove mousewheel');
  },
  // previene el scrolling
  disableScrolling: function(container){
    container.bind('scroll touchmove mousewheel', function(e){
        e.preventDefault();
        e.stopPropagation();
      return false;
    });
  },
  addExitFeature: function(container,colour){
    var iconBack = '<i id="exit-icon" class="fa fa-reply fa-3x" aria-hidden="true" style="color: '+colour+';"></i>';
    container.html(iconBack);
  }
};
