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

  this.gs = gs;
  this.cards = [];
  this.cardsMapped = []; //vector de boolean
  this.finished;
  this.message;

  this.MemoryGame = function(gs){

  };

  this.initGame = function(){
    let types = ["8-ball", "potato", "dinosaur", "kronos", "rocket", "unicorn", "guy", "zeppelin"];
    //introducimos dos cartas de cada tipo en el array de cartas
    for(let i = 0; i < 8; ++i){
      for(let j = 0; j < 2; ++j){
        this.cards.push(new MemoryGameCard(types[i]));
      }
    }
    //mezclamos el array de cartas
    shuffle(this.cards);
    this.loop();
  };

  this.draw = function(){
    //escribimos el mensaje
    this.gs.drawMessage("Inicio");

    //dibujamos la carta de la posion i del array de cartas
    //en el tablero en la posicion i
    for(i in this.cards){
      this.cards[i].draw(gs,i);
    }

  };

  this.loop = function(){
    this.draw();
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
  this.id = id;
  this.state = 'up'

/**
 * Esta funcion cambia el estado de la carta
 * @return {[type]} [description]
 */
  this.flip = function(){
    switch(this.state){
      case 'up':

        break;
      case 'found':

        break;
      case '':

        break;
      default:

        break;
    }
  };

  this.found = function(){
    this.state = 'found'
  };

  this.compareTo = function(){

  };
  this.draw = function(gs, pos){
    if(this.state === 'down')
      gs.draw('back');
    else
      gs.draw(this.id, pos);
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
