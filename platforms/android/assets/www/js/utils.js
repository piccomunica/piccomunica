String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

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