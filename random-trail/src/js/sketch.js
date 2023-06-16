let trail = [];
let trailsize = 150;
let stepsize = 1;

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background('rgba(100%,100%,100%,0.1)');

  // Añadir la posición actual del ratón al arreglo
  trail.push(createVector(mouseX, mouseY));

  // Limitar la longitud del trail a 100 posiciones
  if (trail.length > trailsize) {
    trail.shift();
  }

  // Iterar sobre el trail y dibujar las líneas
  for (let i = 0; i < trail.length - 1; i++) {
    let startPoint = trail[i];
    let endPoint = trail[i + 1];

    // Añadir valores aleatorios a las coordenadas de los puntos
    startPoint.x += random(-stepsize, stepsize);
    startPoint.y += random(-stepsize, stepsize);
    endPoint.x += random(-stepsize, stepsize);
    endPoint.y += random(-stepsize, stepsize);

    // Dibujar la línea entre los puntos
    stroke(255-i*1, 255-i*2, 255-i*3);
    line(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
  }
}
