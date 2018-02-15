/**
 * MemoryGame es la clase que representa nuestro juego. Contiene un array con la cartas del juego,
 * el número de cartas encontradas (para saber cuándo hemos terminado el juego) y un texto con el mensaje
 * que indica en qué estado se encuentra el juego
 */
var MemoryGame = MemoryGame || {};

/**
 * Constructora de MemoryGame
 */
MemoryGame = function(gs) {

  this.cards = [];
  this.cardsMapped = []; //vector de boolean
  this.finished = false;
  this.message =

  this.MemoryGame = function(gs){

  };

  this.initGame = function(){
    //creamos un aleatorio, cogemos la carta del json y guardamos el nombre de la
    //carta en un array dos veces en el numero aleatorio

  };

  this.draw = function(){

  };

  this.loop = function(){

  };

  this.onClikc = function(){

  };

};

/**
 * Constructora de las cartas del juego. Recibe como parámetro el nombre del sprite que representa la carta.
 * Dos cartas serán iguales si tienen el mismo sprite.
 * La carta puede guardar la posición que ocupa dentro del tablero para luego poder dibujarse
 * @param {string} id Nombre del sprite que representa la carta
 */
MemoryGameCard = function(id) {
  this.MemoryGameCard = function(sprites){

  };
  this.flip = function(){

  };
  this.found = function(){

  };
  this.compareTo = function(){

  };
  this.draw = function(gs, pos){

  };
};

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
