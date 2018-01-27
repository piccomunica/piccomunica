// funciones utiles que se pueden utilizar en muchas partes del código

// pone en mayuscula la primera letra de un string
String.prototype.capitalize = function(){
  return this.charAt(0).toUpperCase() + this.slice(1);
};

// devuelve el último objeto de un array
Array.prototype.last = function(){
	return this[this.length-1];
}

// añade un nuevo método al atributo onclick de un elemento html
function changeOnClickJs(e,method){
	$(e).attr('onclick',method);
};

// genera un id para las categorías
function generateUUID(){ // Public Domain/MIT
  var d = new Date().getTime();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
      d += performance.now(); //use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

// añade el fondo de color a un picto
function setBackgroundColour(colour,picto){
  var colour = tinycolor(colour).toString();
  $(picto).css({background: colour});
};

// setea el fondo del elemento con un gradiente
function setGradient(basic_colour,element){
  var colorLeft = tinycolor(basic_colour).toString();
  var colorRight = tinycolor(colorLeft).spin(20).lighten(10).brighten(5).desaturate(10).toString();

  var bgWebkit = '-webkit-linear-gradient(left, '+colorRight+', '+colorLeft+')';
  var bgOpera = '-o-linear-gradient(left, '+colorRight+', '+colorLeft+')';
  var bgMoz = '-moz-linear-gradient(left, '+colorRight+', '+colorLeft+')';
  var bgNormal = 'linear-gradient(left, '+colorRight+', '+colorLeft+')';

  $(element)
    .css({background: colorLeft})
    .css({background: bgNormal})
    .css({background: bgWebkit})
    .css({background: bgMoz})
    .css({background: bgOpera});
};

// escala por el DOM hasta encontrar el nodo padre coincidente con el nombre
function findParentNode(element,node_name){
  while(element.nodeName != node_name){
    element = element.parentNode;
  };
  return element
};