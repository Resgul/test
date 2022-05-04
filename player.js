import {Standing, MoveForward, MoveBackward} from './state.js'

export default class Player {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.states = [new Standing(this), new MoveForward(this), new MoveBackward(this)];
    this.currientState = this.states[0];
    this.image = tank;
    this.width = 60;
    this.height = 75;
    this.x = this.gameWidth * 0.5 - this.width * 0.5;
    this.y = this.gameHeight * 0.5 - this.height * 0.5;
    this.frameX = 0;
    this.frameY = 0;
    this.speed = 0;
    this.maxSpeed = 1;
    this.angle = -(90);
    this.position = [this.x, this.y];
  }

  draw(context) {
    context.drawImage(this.image, this.width * this.frameX, this.height * this.frameY, this.width, this.height, this.x, this.y, this.width, this.height)
  }

  update(input) {
    this.currientState.handleInput(input);

    //анимация
    this.frameX++;
    if (this.frameX > 1) this.frameX = 0;

    
    //вектор движения
    const angle = this.angle * Math.PI / 180;
    //бля сработало
    this.x = (this.x + Math.cos(angle) * this.speed);
    this.y = (this.y + Math.sin(angle) * this.speed);

    // удержание в окне
    if (this.x < 0) this.x = 0;
    else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width;
    if (this.y < 0) this.y = 0;
    else if (this.y > this.gameHeight - this.height) this.y = this.gameHeight - this.height;

  }

  setState(state) {
    this.currientState = this.states[state];
    this.currientState.enter();
  }
}