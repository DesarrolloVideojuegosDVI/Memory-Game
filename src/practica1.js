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
  this.countFounded = 0; //variable que guarda el numero de parejas encontradas
  this.finished = false;
  this.message = 'Memory Game';
  this.lock = false;
  this.flipped = -1;

  this.initGame = function(){
    let types = ["8-ball", "potato", "dinosaur", "kronos", "rocket", "unicorn", "guy", "zeppelin"];

    for(let i = 0; i < 8; ++i){
      for(let j = 0; j < 2; ++j){
        this.cards.push(new MemoryGameCard(types[i]));
      }
    }

    shuffle(this.cards);
    this.loop();
  };

  this.draw = function(){
    this.gs.drawMessage(this.message);

    for(i in this.cards){
      this.cards[i].draw(gs,i);
    }
  };

  this.loop = function(){
    setInterval(this.draw.bind(this),16);
  };

  this.onClick = function(cardId){
    //TODO hacerlo bien, quitar el for y declarar una variable que guarde la posicion de
    //TODO una carta que ya ha sido dada la vuelta y esta a la espera de ser comprobada
    //TODO por otra.
    var self = this;
    let foundOne = false;
    if (!this.finished && !this.lock) {
      this.lock = true;
      this.cards[cardId].flip();
      for(let i = 0; i < this.cards.length && !foundOne; ++i){
        if(i === cardId) {
          foundOne = true;
          this.lock = false;
        } else if(this.cards[i].state === 'up') {
          //si encuentra una carta que ya este dada la vuelta, las compara
          //y si son iguales, las marca como 'resueltas'
          if(this.cards[i].compareTo(this.cards[cardId])){
            this.cards[i].found();
            this.cards[cardId].found();
            foundOne = true; // paramos de buscar mas cartas
            this.countFounded++;
            this.message = 'Match found!';
            if(this.countFounded >= 8) {
              this.finished = true;
              this.message = 'You Win!!';
            }
            this.lock = false;
          }else{
            this.message = 'Try again';
            foundOne = true;
            setTimeout(function(){
              self.cards[i].flip();
              self.cards[cardId].flip();
              self.lock = false;
              console.log("Damos la vuelta a las cartas");
            },1000);
          }
        }
      }

    }
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
  this.state = 'down';

  this.flip = function(){
    switch(this.state){
      case 'up':
        this.state = 'down';
        break;
      case 'down':
        this.state = 'up';
        break;
      case 'found':
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
