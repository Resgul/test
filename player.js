import {Standing, MoveForward, MoveBackward, RotateRight, RotateLeft, Braking, BrakingBack} from './state.js'

export default class Player {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.states = [new Standing(this), new MoveForward(this), new MoveBackward(this), new RotateRight(this), new RotateLeft(this), new Braking(this), new BrakingBack(this)];
    this.currientState = this.states[0];
    this.image = tank;
    this.width = 60;
    this.height = 76;
    this.x = this.gameWidth * 0.5 - this.width * 0.5;
    this.y = this.gameHeight * 0.5 - this.height * 0.5;
    this.frameX = 0;
    this.frameY = 0;
    this.speed = 0;
    this.speedBack = 0;
    this.maxSpeed = 2;
    this.angleDeg = -90;
    this.angleStep = 0;
    this.position = [this.x, this.y];
    this.weight = 0.02;
  }

  draw(context) {
    //отрисовка и вращение на заданный угол
    context.save();
    context.translate(this.x + this.width * 0.5, this.y + this.height * 0.5);
    context.rotate((this.angleDeg + 90)* 2 * Math.PI / 360);
    context.drawImage(this.image, this.width * this.frameX, this.height * this.frameY, this.width, this.height, 0 - this.width * 0.5, 0 - this.height * 0.5, this.width, this.height)
    context.restore();
  }

  update(input) {
    this.currientState.handleInput(input);

    //анимация
    this.frameX++;
    if (this.frameX > 1) this.frameX = 0;
    
    //вектор движения
    this.angleDeg += this.angleStep;
    const angle = this.angleDeg * Math.PI / 180;
    this.x = (this.x + Math.cos(angle) * this.speed);
    this.y = (this.y + Math.sin(angle) * this.speed);
    //бля сработало T_T


    //торможение и занос
    if (this.currientState === this.states[5] || this.currientState === this.states[3] || this.currientState === this.states[4]) {
      this.speed -= this.weight;
      if (this.speed <= 0) this.speed = 0;
    }
    if (this.currientState === this.states[6]) {
      this.speed += this.weight;
      if (this.speed >= 0) this.speed = 0;
    }



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