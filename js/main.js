const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// Obtiene las dimensiones de la pantalla actual
const window_height = window.innerHeight;
const window_width = window.innerWidth;

// El canvas tiene las mismas dimensiones que la pantalla
canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "#ff8";

class Circle {
  constructor(x, y, radius, color, text, speed) {
    this.posX = x;
    this.posY = y;
    this.color = color;
    this.radius = radius;
    this.text = text;
    this.speed = speed;
    this.dx = 1 * this.speed;
    this.dy = 1 * this.speed;
  }

  draw(context) {
    context.beginPath();
    context.strokeStyle = this.color;
    context.textAlign = "center";
    context.textBaseLine = "middle";
    context.font = "20px Arial";
    context.fillText(this.text, this.posX, this.posY);
    context.lineWidth = 4;
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();
  }

  update(context) {
    this.draw(context);
    /* Si el circulo supera el margen der entonces se mueve a la izq */
    if (this.posX + this.radius > window_width) {
      this.dx = -this.dx;
    }
    /* Si el circulo supera el margen izq entonces se mueve a la der */
    if (this.posX - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.posY - this.radius < 0) {
      this.dy = -this.dy;
    }

    if (this.posY + this.radius > window_height) {
      this.dy = -this.dy;
    }
    this.posX += this.dx;
    this.posY += this.dy;
  }
}

/* let arrayCircle = [];

for (let i = 0; i < 10; i++) {
  let randomX = Math.random() * window_width;
  let randomY = Math.random() * window_height;
  let randomRadius = Math.floor(Math.random() * 100 + 20);
  let myCircle = new Circle(randomX, randomY, randomRadius, "blue", i + 1);
  arrayCircle.push(myCircle);
  arrayCircle[i].draw(ctx);
} */

let getColor = function () {
  return (
    "#" +
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]
      .sort(() => 0.5 - Math.random())
      .slice(0, 6)
      .join("")
  );
};

let arrayCircle = [];
for (let i = 0; i < 10; i++) {
  let randomX = Math.random() * window_width;
  let randomY = Math.random() * window_height;
  let randomRadius = Math.floor(Math.random() * 100 + 20);
  let myCircle = new Circle(
    randomX,
    randomY,
    randomRadius,
    getColor(),
    i + 1,
    2
  );
  arrayCircle.push(myCircle);
  arrayCircle[i].draw(ctx);
  arrayCircle[i].update(ctx);
}

let updateCircle = function () {
  ctx.clearRect(0, 0, window_width, window_height);
  requestAnimationFrame(updateCircle);
  for (let i = 0; i < arrayCircle.length; i++) {
    arrayCircle[i].update(ctx);
  }
  console.log(arrayCircle);
};

updateCircle();

/* for (let i = 0; i < 10; i++) {
  let randomX = Math.random() * window_width;
  let randomY = Math.random() * window_height;
  let randomRadius = Math.floor(Math.random() * 100 + 20);
  let myCircle = new Circle(randomX, randomY, randomRadius, "blue", i + 1);
  arrayCircle.push(myCircle);
  arrayCircle[i].draw(ctx);
} */

/* let myCircle2 = new Circle(270, 270, 50, "red", "Pachuca");
myCircle2.draw(ctx); */
