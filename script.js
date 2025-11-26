const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const resetBtn = document.getElementById("reset");

const box = 20; // tamanho da célula
let snake, direction, food, score, game;

function init() {
  snake = [{ x: 9 * box, y: 10 * box }];
  direction = "RIGHT";
  food = {
    x: Math.floor(Math.random() * 19) * box,
    y: Math.floor(Math.random() * 19) * box
  };
  score = 0;
  scoreEl.textContent = "Pontuação: " + score;
  clearInterval(game);
  game = setInterval(draw, 100);
}

document.addEventListener("keydown", event => {
  if (event.code === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (event.code === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (event.code === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  if (event.code === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

resetBtn.addEventListener("click", init);

function draw() {
  ctx.fillStyle = "#1f2937";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // desenha cobra
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#3b82f6" : "#22c55e";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "#0c0f16";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  // desenha comida
  ctx.fillStyle = "#ef4444";
  ctx.fillRect(food.x, food.y, box, box);

  // posição inicial da cabeça
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction === "LEFT") snakeX -= box;
  if (direction === "UP") snakeY -= box;
  if (direction === "RIGHT") snakeX += box;
  if (direction === "DOWN") snakeY += box;

  // se comer comida
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    scoreEl.textContent = "Pontuação: " + score;
    food = {
      x: Math.floor(Math.random() * 19) * box,
      y: Math.floor(Math.random() * 19) * box
    };
  } else {
    snake.pop(); // remove último segmento
  }

  const newHead = { x: snakeX, y: snakeY };

  // game over
  if (
    snakeX < 0 || snakeX >= canvas.width ||
    snakeY < 0 || snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    alert("Game Over! Pontuação final: " + score);
  }

  snake.unshift(newHead);
}

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}

init();
