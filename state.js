export const states = {
  STANDING: 0,
  MOVE_FORWARD: 1,
  MOVE_BACKWARD: 2,
}

class State {
  constructor(state) {
    this.state = state;
  }
}

export class Standing extends State {
  constructor(player) {
    super('STANDING');
    this.player = player;
  }
  
  enter() {
    this.player.frameY = 0;

  }

  handleInput(input) {
    if (input === 'PRESS up') this.player.setState(states.MOVE_FORWARD)
    if (input === 'PRESS down') this.player.setState(states.MOVE_BACKWARD)
  }
}

export class MoveForward extends State {
  constructor(player) {
    super('MOVE FORWARD');
    this.player = player;
  }
  
  enter() {
    this.player.frameY = 1;
  }

  handleInput(input) {
    if (input === 'RELEASE up') this.player.setState(states.STANDING);
  }
}

export class MoveBackward extends State {
  constructor(player) {
    super('MOVE BACKWARD');
    this.player = player;
  }
  
  enter() {
    this.player.frameY = 1;
  }

  handleInput(input) {
    if (input === 'RELEASE down') this.player.setState(states.STANDING);
  }
}