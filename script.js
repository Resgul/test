/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
resizeCanvas();
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// ресайз окна
window.addEventListener('resize', resizeCanvas)

class Player {
  constructor() {
    this.x = 900;
    this.y = 1000;
    this.width = 100;
    this.height = 100;
    this.color = 'black';
  }

  update(newX, newY, speed) {
    const catetX = newX-this.x;
    const catetY = newY-this.y;
    const gip = Math.sqrt((catetX)**2 + (catetY)**2);

    if (newX - this.x != 0) {
      this.x += (catetX / gip) * speed;
    }
    if (newY - this.y != 0) {
      this.y += (catetY / gip) * speed;
    }
    // console.log(gip);
  }


  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }
}

const player = new Player()

function animate() {
  player.draw();
  player.update(100, 100, 3);
  requestAnimationFrame(animate);
}

animate();