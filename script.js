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
   * Canvas render context 2d
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    this.ufo.draw(ctx);
  }
  /** Any update without drawing context goes below*/
  update() {
    this.ufo.controller();
    this.ufo.outOfBound();
  }
}
class UFO {
  /**
   * @param {Game} game
   */
  constructor(game) {
    this.game = game;
    this.x = this.game.width / 2;
    this.y = this.game.height / 2;
    window.addEventListener(
      'keydown',
      ({ key }) => key === ' ' && ((this.state = 'fly'), (this.speed = -10))
    );
    window.addEventListener('keyup', ({ key }) => key === ' ' && ((this.state = '')));
  }

  //    --- properties ---
  size = 20;
  state = '';
  speed = 0;

  //    --- methods ---
  /**
   * Canvas render context 2d
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.fillStyle = 'orangered';
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
  outOfBound() {
    if (this.y < 0) (this.y = 0), (this.speed = 0);
    if (this.y >= this.game.height - this.size) (this.y = this.game.height - this.size), (this.speed = 0); // oncollide with bottom
  }
  controller() {
    console.log(this.speed);
    this.y += this.speed; // fly up
    if ((this.state === '') || this.state === 'fly')return this.speed++; // fall if no key pressed(state '')
  }
}
const myGame = new Game(cvs.height, cvs.width);

function animate() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  myGame.draw(ctx);
  myGame.update();
  requestAnimationFrame(animate);
}
animate();
