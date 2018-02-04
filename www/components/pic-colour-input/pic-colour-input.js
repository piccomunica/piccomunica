Polymer({
  is: 'pic-colour-input',
  properties: {
    colour: {
      type: String
    },
    colours: {
      type: Array
    }
  },
  // este código se ejecuta cuando el componente está cargado
  attached: function(){
    // carga el array de colores
    this.colours = default_colours;
    this.renderRainbowColours();
    // selecciona el color de la categoría inicial
    this.selectColourCell();
    // activa evento para cambiar el color seleccionado
    $('#rainbow-colours span').on('click',this.selectColourCell);
  },
  // añade las celdas de color
  renderRainbowColours: function(){
    var rainbow = document.createElement("div");
    rainbow.setAttribute('id', 'rainbow-colours');
    var grid_value = '';
    var grid_percent = 100/this.colours.length;
    var cell_colour_size = document.body.clientHeight*0.075;
    this.colours.forEach(function(colour){
      grid_value = grid_value + grid_percent + '% ';
      var cell_colour = document.createElement("span");
      cell_colour.setAttribute('id', 'cell-colour-'+colour);
      cell_colour.setAttribute('data-colour', colour);
      $(cell_colour).css({height: cell_colour_size});
      setBackgroundColour(colour,cell_colour);
      rainbow.append(cell_colour);
    });
    $(rainbow).css({width: '100%'});
    $(rainbow).css({display: 'inline-grid'});
    $(rainbow).css({'grid-template-columns': grid_value});
    this.append(rainbow);
  },
  selectColourCell: function(){
    // deselecciona anterior color
    $('pic-colour-input')[0].unselectedColourCell();
    // asigna el valor de colour según de donde proceda el evento: del menú o de los colores
    var colour = event.target.nodeName == 'LI' ? this.colour : $(event.target).attr('data-colour');
    // añade el borde interior al color seleccionado
    var colour_hex = '#'+tinycolor(colour).toHex();
    $('#cell-colour-'+colour).attr('data-selected',true);
    $('#cell-colour-'+colour).css({'box-shadow': 'inset 0 0 0 0.15em oldlace'});
    // cambia el valor del color en el input
    $('pic-colour-input input').attr('value',colour_hex);
    // lanza evento
    $(document).trigger('category-colour-modificated');
  },
  // selecciona color activo y borra sus atributos
  unselectedColourCell: function(){
    var selected = $('#rainbow-colours span[data-selected=true]')[0];
    if(selected){
      $(selected).removeAttr('data-selected');
      $(selected).css({'box-shadow':''});
    };
  }
});