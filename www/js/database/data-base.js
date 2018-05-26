// el valor de raw info se genera automáticamente lanzando en consola:
// ruta: scripts/
// sh pictionary.sh
// del archivo resultante, quitar la última coma de la última linea
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

// objeto base de datos
var dataBase = {
  init: function(raw_info){
    this.colours = ["cornflowerblue","gold","crimson","blueviolet","brown","cadetblue","chocolate","deeppink","darkblue","darkcyan","darkgoldenrod"];
    this.categories = Categories.init(raw_info);
    this.pictos = Pictos.init();
    this.columns = 5;
    return this;
  }
};