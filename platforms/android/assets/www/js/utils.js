String.prototype.capitalize = function(){
  return this.charAt(0).toUpperCase() + this.slice(1);
};

Array.prototype.last = function(){
	return this[this.length-1];
}

function getCssColumns(){
	var cssColumns = " ";
  var i = 0;
  var percent = 100/configuration.columns
  while(i<configuration.columns){
    cssColumns = cssColumns + percent + '% ';
    i++;
  };
  return cssColumns;
};

function changeOnClickJs(e,method){
	$(e).attr('onclick',method);
};

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