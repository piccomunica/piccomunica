// extra picto controller
var extraPictoController = {
  makeMeBig: function(event){
    // encuentra el picto
    var picto = findParentNode(event.target,'PIC-PICTO')
    // creación del componente big picPicto
    var _picPicto = picPicto(picto,picto.folder,picto.colour);
    $(_picPicto).addClass('style-scope pic-picto big');
    // render big picPicto with exit icon
    var container = $("#container-big-picto");
    extraPictoController.resizeContainer(container);
    container.append(_picPicto);
    // deshabilitar cabecera y scroll
    extraPictoController.disableHeader();
    extraPictoController.disableScrolling(container);
    // añade funcionalidad a big picPicto
    extraPictoController.addExitFeature(container,picto);
    if(app.editableCategory){
      extraPictoController.addDeleteFeature(container,picto);
    };
  },
  //salir vista picto grande
  makeMeSmall: function(){
    var container = $("#container-big-picto");
    extraPictoController.enableScrolling(container);
    extraPictoController.enableHeader();
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
  enableHeader: function(){
    $('.pic-header.icon i').forEach(function(icon){
      $(icon).show();
    });
  },
  // previene el scrolling
  disableScrolling: function(container){
    container.bind('scroll touchmove mousewheel', function(e){
        e.preventDefault();
        e.stopPropagation();
      return false;
    });
  },
  // evita navegar por los menús mientras está el picto en grande
  disableHeader: function(){
    $('.pic-header.icon i').forEach(function(icon){
      $(icon).hide();
    });
  },
  addExitFeature: function(container,colour){
    var iconBack = closePictoButton(colour);
    container.append(iconBack);
  },
  // borra el picto de la bbdd
  addDeleteFeature: function(container,colour){
    var iconDelete = deletePictoButton(colour);
    container.append(iconDelete);
  }
};
