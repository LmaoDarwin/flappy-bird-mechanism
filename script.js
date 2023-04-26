/** @type {HTMLCanvasElement} */
const cvs = document.getElementById('cvs');
/** @type {CanvasRenderingContext2D} */
const ctx = cvs.getContext('2d');
cvs.width = 500;
cvs.height = 500;

class Game {
  constructor(height, width) {
    this.width = width;
    this.height = height;
    this.ufo = new UFO(this);
  }
  /**
   * to constantly draw on canvas
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    this.ufo.draw(ctx);
  }
  /** Any update without drawing context goes below */
  update() {
    this.ufo.controller();
    this.ufo.outOfBound();
  }
}
class UFO {
  /** @param {Game} game */
  constructor(game) {
    this.game = game;
    this.x = this.game.width / 2 - this.size / 2; //start at middle
    this.y = this.game.height / 2; //start at middle
    window.addEventListener('keydown', ({ key }) => {
      if (this.state === 'fly') return; //prevent double click
      if (key === ' ') (this.state = 'fly'), (this.speed = -10); //fly up by changing speed
    });
    window.addEventListener('keyup', ({ key }) => key === ' ' && (this.state = '')); //reset state back to '' after space keyup
  }

  //    --- PROPERTIES ---
  size = 20; //size of cube
  state = ''; //state = 'fly' || ''
  speed = 0; //speed of cube

  //    --- METHODS ---
  /** @param {CanvasRenderingContext2D} ctx */
  draw(ctx) {
    ctx.fillStyle = 'orangered';
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
  /** to prevent cube going beyond the canvas */
  outOfBound() {
    if (this.y < 0) (this.y = 0), (this.speed = 0); //ocollide with above
    if (this.y >= this.game.height - this.size) (this.y = this.game.height - this.size), (this.speed = 0); // oncollide with bottom
  }
  /** control the movement of the cube. fall or fly */
  controller() {
    this.y += this.speed; // move cube to fly or fall
    this.speed += 0.5; // constanly falling
  }
}
const myGame = new Game(cvs.height, cvs.width); //init game class
/** to start animation loop */
function animate() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  myGame.draw(ctx);
  myGame.update();
  requestAnimationFrame(animate);
}
animate();