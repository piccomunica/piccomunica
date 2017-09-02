Polymer({
  is: 'micro-configuration-mobile',
  properties: {},
  attached: function(){
    console.log('local DOM initialized');
  },
  buildColumn: function(state,text){
    var column = document.createElement('div');
    $(column).addClass('style-scope micro-configuration-mobile celda '+state);
    $(column).data('value',text);
    $(column).text(text);
    return column;
  },
  renderColums: function(){
    var i = 1;
    while(i <= configuration.columns){
      var activeColumn = this.buildColumn('active',i);
      $('micro-configuration-mobile .grid').append(activeColumn);
      i++;
    };
    while(i <= 6){
      var inactiveColumn = this.buildColumn('inactive',i);
      $('micro-configuration-mobile .grid').append(inactiveColumn);
      i++;
    };
  },
  updateStateOfColumns: function(e){
    var thisController = $('micro-configuration-mobile')[0];
    thisController.renderStateOfColumns(e);
    thisController.updateNumberOfColumns(e);
    menuController.option_clicked = $('#columns-conf');
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
  },
  renderColumnsConfigurator: function(){
    var thisController = $('micro-configuration-mobile')[0];
    var categoriesConf = document.createElement('div');
    var columnsGrid = document.createElement('div');
    $(categoriesConf).text('Categoría');
    $(categoriesConf).addClass('style-scope micro-configuration-mobile categories-conf');
    $(columnsGrid).addClass('style-scope micro-configuration-mobile grid');
    $('#micro-mobile').append(categoriesConf);
    $('#micro-mobile').append(columnsGrid);
    thisController.renderColums();
    $('micro-configuration-mobile div.celda').on('click',thisController.updateStateOfColumns);
  },
  renderSelectCategories: function(){
    var thisController = $('micro-configuration-mobile')[0];
    var select = document.createElement('select');
    $(select).addClass('style-scope micro-configuration-mobile select_categories');
    var option = document.createElement('option');
    $(option).text('Selecciona una categoría');
    $(option).prop('disabled',true);
    $(option).prop('selected',true);
    $(select).append(option);
    app.configuration.categories.forEach(function(category){
      option = document.createElement('option');
      $(option).text(category.name.capitalize());
      $(option).val(category.id);
      $(select).append(option);
    });
    $('#micro-mobile').append(select);
  },
  renderInfoCategory: function(action){
    var thisController = $('micro-configuration-mobile')[0];
    var containerDiv = document.createElement('div');
    $(containerDiv).addClass('style-scope micro-configuration-mobile category-info-container');
    if(action == 'edit'){ $(containerDiv).addClass('container-disabled'); };
      var nameRowDiv = document.createElement('div');
      $(nameRowDiv).addClass('style-scope micro-configuration-mobile row-info-category-name');
        var labelName = document.createElement('label');
        $(labelName).addClass('style-scope micro-configuration-mobile input-category');
        $(labelName).attr('for','input-category-name');
        $(labelName).text('Nombre:');
        var inputName = document.createElement('input');
        $(inputName).addClass('style-scope micro-configuration-mobile input-style');
        $(inputName).attr('id','input-category-name');
        $(inputName).attr('type','text');
        $(nameRowDiv).append(labelName);
        $(nameRowDiv).append(inputName);
      $(containerDiv).append(nameRowDiv);
      var colourRowDiv = document.createElement('div');
      $(colourRowDiv).addClass('style-scope micro-configuration-mobile row-info-category-colour');
        var labelColour = document.createElement('label');
        $(labelColour).addClass('style-scope micro-configuration-mobile input-category');
        $(labelColour).attr('for','input-category-colour');
        $(labelColour).text('Color:');
        var inputColour = document.createElement('input');
        $(inputColour).addClass('style-scope micro-configuration-mobile input-style');
        $(inputColour).attr('id','input-category-colour');
        $(inputColour).attr('type','color');
        $(colourRowDiv).append(labelColour);
        $(colourRowDiv).append(inputColour);
      $(containerDiv).append(colourRowDiv);
      var buttonsRowDiv = document.createElement('div');
      $(buttonsRowDiv).addClass('style-scope micro-configuration-mobile row-buttons');
        var cancelButton = document.createElement('div');
        $(cancelButton).addClass('style-scope micro-configuration-mobile button');
        $(cancelButton).css('justify-self: start;');
        if(action == 'edit'){
          var textCancel = 'BORRAR';
          var method = "$('micro-configuration-mobile')[0].removeCategory();";
        }else{
          var textCancel = 'CANCELAR';
          var method = "menuController.disableMicroConfigurationMobile();";
        };
        changeOnClickJs(cancelButton,method);
        $(cancelButton).text(textCancel);
        var acceptButton = document.createElement('div');
        $(acceptButton).addClass('style-scope micro-configuration-mobile button');
        $(acceptButton).css('justify-self: end;');
        changeOnClickJs(acceptButton,"$('micro-configuration-mobile')[0].writeCategory('"+action+"');")
        $(acceptButton).text('GUARDAR');
        $(buttonsRowDiv).append(cancelButton);
        $(buttonsRowDiv).append(acceptButton);
      $(containerDiv).append(buttonsRowDiv);
    $('#micro-mobile').append(containerDiv);
  },
  setInfoCategory: function(category){
    $('div.category-info-container').removeClass('container-disabled');
    $('#micro-mobile input[type="text"]').val(category.name);
    $('#micro-mobile input[type="color"]').val(tinycolor(category.colour).toHexString());
  },
  getCategory: function(){
    var name = $('#micro-mobile input[type="text"]').val();
    var colour = $('#micro-mobile input[type="color"]').val();
    var id = $('select').val();
    var category = app.configuration.loadCategory(id);
    var folder = (category)? category.folder : undefined;
    var pictos = (category)? category.pictos : undefined;
    return new Category(id,name,folder,colour,pictos);
  },
  removeCategory: function(){
    var thisController = $('micro-configuration-mobile')[0];
    var category = thisController.getCategory();
    app.configuration.removeCategory(category);
  },
  writeCategory: function(action){
    var thisController = $('micro-configuration-mobile')[0];
    var category = thisController.getCategory();
    if(action == 'edit'){
      app.configuration.updateCategory(app.editableCategory,category);
    }else{
      app.configuration.createCategory(category);
    };
  },
  renderNewCategoryConfigurator: function(){
    var thisController = $('micro-configuration-mobile')[0];
    thisController.renderInfoCategory('new');
  },
  renderCategoriesEditConfigurator: function(){
    var thisController = $('micro-configuration-mobile')[0];
    thisController.renderSelectCategories();
    thisController.renderInfoCategory('edit');
    $('#micro-mobile select').on('change',function(){
      var category = app.configuration.loadCategory(event.target.value);
      thisController.setInfoCategory(category);
    });
  },
  removeConfigurator: function(){
    $('#micro-mobile').empty();
  }
});