// el valor de raw info se genera automáticamente lanzando en consola:
// ruta: scripts/
// sh pictionary.sh
// quitar la última coma de la última linea
var raw_info = {
  "acciones": ["apretar", "chillar", "cocinar", "dar", "enfadar", "lavarse_los_dientes", "leer", "llorar", "montar_a_caballo", "nadar", "sonarse", "sonreir"],
  "alimentacion": ["agua", "espaguetis", "galletas", "helado", "naranja-2", "pollo_asado", "salsa_ketchup", "tableta_de_chocolate", "tarta", "trozo_de_queso", "zumo"],
  "animales": ["cerdo", "delfin", "gato", "leon", "mono", "pajaro", "perro", "pez", "tortuga", "vaca"],
  "colores": ["amarillo", "azul", "blanco", "naranja", "negro", "rojo", "verde_claro", "verde_oscuro"],
  "instrumentos": ["armonica", "bateria", "guitarra", "guitarra_electrica", "maracas", "pandereta", "piano", "tambor", "trompeta", "violin"],
  "lugares": ["casas", "colegios", "edificio", "hospital", "parque", "parque_acuatico", "playa", "restaurante-2", "restaurante"],
  "ropa": ["abrigo", "calcetines", "camisa", "falda", "pantalon", "vestido", "zapatos-2", "zapatos"],
  "transportes": ["ambulancia", "autobus", "camion_de_bomberos", "camion_de_obras", "coches", "motocicletas", "policia", "taxi"]
};

var categories = Object.keys(raw_info);
var default_colours = ["cornflowerblue","gold","crimson","blueviolet","brown","cadetblue","chocolate","deeppink","darkblue","darkcyan","darkgoldenrod"];

// objeto base de datos
var dataBase = {
  init: function(categories){
    this.categories = []
    this.columns = 5;
    this.loadCategories(categories);
  },
  loadCategories: function(categories){
    var index = 0;
    categories.forEach(function(category_name){
      dataBase.categories.push(new Category(undefined,category_name,category_name,default_colours[index],raw_info[category_name]));
      index++;
    });
  },
  loadCategory: function(id){
    return this.categories.find(function(category){ return category.id == id })
  },
  createCategory: function(category){
    this.categories.push(category);
    $('#categories').trigger('new-category');
  },
  updateCategory: function(original,changed){
    var original = this.loadCategory(changed.id);
    var category_selector = 'pic-category[category="'+original.name+'"]';
    original.name = changed.name;
    original.colour = changed.colour;
    // original.pictos = changed.pictos;
    $(category_selector).trigger('updated-category');
  },
  removeCategory: function(category){
    var category_selector = 'pic-category[category="'+category.name+'"]';
    category = this.loadCategory(category.id);
    var index = this.categories.indexOf(category);
    this.categories.splice(index, 1);
    $(category_selector).trigger('removed-category');
  }
};