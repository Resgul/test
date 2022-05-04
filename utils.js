export function drawStatusText(context, input, player) {
  context.font = '28px Helvetica';
  context.fillText('Last input: ' + input.lastKey, 20, 50);
  context.fillText('Active state: ' + player.currientState.state, 20, 90);
  context.fillText('Speed: ' + player.speed, 20, 130);
  context.fillText('Angle: ' + player.angleDeg, 20, 170);
}