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
  this.countFounded = 0;
  this.finished = false;
  this.message;

  this.initGame = function(){
    let types = ["8-ball", "potato", "dinosaur", "kronos", "rocket", "unicorn", "guy", "zeppelin"];
    //introducimos dos cartas de cada tipo en el array de cartas
    for(let i = 0; i < 8; ++i){
      for(let j = 0; j < 2; ++j){
        this.cards.push(new MemoryGameCard(types[i]));
      }
    }
    //mezclamos el array de cartas
    //shuffle(this.cards);
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
    //FIXME no se como se hace para que se ejecute cada 16ms y ademas escuche las peticiones que se hagan a onClick
    setTimeout(this.draw(), 16);
  };

  this.onClick = function(cardId){
    let foundOne = false;
    this.cards[cardId].flip();
    for(let i = 0; i < this.cards.length && !foundOne; ++i){
      if(this.cards[i].state === 'up'){
        //si encuentra una carta que ya este dada la vuelta, las compara
        //y si son iguales, las marca como 'resultas'
        if(i !== cardId && this.cards[i].compareTo(this.cards[cardId])){
          this.cards[i].found();
          this.cards[cardId].found();
          foundOne = true;
          this.countFounded++;
          if(this.countFounded >= 8)
            this.finished = true;
        }else{
          //damos la vuelta a las dos cartas
          this.cards[i].flip();
          this.cards[cardId].flip();
        }
      }
    }
    this.loop();
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
  this.state = 'down'

/**
 * Esta funcion cambia el estado de la carta
 * @return {[type]} [description]
 */
  this.flip = function(){
    switch(this.state){
      case 'up':
        this.state = 'down';
        break;
      case 'down':
        this.state = 'up';
        break;
    }
  };

  this.found = function(){
    this.state = 'found'
  };

  this.compareTo = function(otherCard){
    return this.id === otherCard.id;
  };

  this.draw = function(gs, pos){
    if(this.state === 'down')
      gs.draw('back', pos);
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
