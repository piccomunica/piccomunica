Polymer({
  is: 'menu-columns',
  properties: {
    title: {
      type: String
    }
  },
  attached: function(){
    this.renderColums();
    $('menu-columns').on('click',this.updateStateOfColumns);
    console.log('local DOM initialized');
  },
  buildColumn: function(state,text){
    var column = document.createElement('div');
    $(column).addClass('style-scope menu-columns celda '+state);
    $(column).data('value',text);
    $(column).text(text);
    return column;
  },
  renderColums: function(){
    var i = 1;
    while(i <= configuration.columns){
      var activeColumn = this.buildColumn('active',i);
      $('menu-columns .grid').append(activeColumn);
      i++;
    };
    while(i <= 6){
      var inactiveColumn = this.buildColumn('inactive',i);
      $('menu-columns .grid').append(inactiveColumn);
      i++;
    };
  },
  updateStateOfColumns: function(e){
    this.renderStateOfColumns(e);
    this.updateNumberOfColumns(e);
    menuController.close();
  },
  renderStateOfColumns: function(e){
    var number = $(e.target).data('value');
    var i = 0;
    while(i<=6){
      if(i>number){
        $('.celda[data-value="'+i+'"]').removeClass('active').addClass('inactive');
      }else{
        $('.celda[data-value="'+i+'"]').removeClass('inactive').addClass('active');
      };
      i++;
    };
  },
  updateNumberOfColumns: function(e){
    var columnsSize = parseInt($(e.target).text());
    configuration.columns = columnsSize;
    $('#categories').data('columns',configuration.columns);
    $(document).trigger('number-columns-modificated');
  }
});