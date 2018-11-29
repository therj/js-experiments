// circle  sizes!
var MIN_SIZE = 20
var MAX_SIZE = 30
// Height width WITHOUT px!
var containerWidth = 800;
var containerHeight = 500

function Ball(numberOfBalls) {
  var balls = []
  var container = document.getElementById('container');
  var ballInterval; //random!
  var isMoving = false //toggle the state on init!
  _ = this //coz that's tooo longg!

  this.init = function () {
    var dx = 1;
    var dy = 1
    for (let i = 0; i < numberOfBalls; i++) {
      var oneBall = createOneBall()
      balls.push(oneBall)
      container.appendChild(balls[i].div);
    }
    this.toggleState()
  }

  this.toggleState = function () {
    // console.log('Hello Toggling!');
    if (isMoving) {
      clearInterval(ballInterval);
    } else {
      ballInterval = setInterval(moveAllBalls, 1);
    }
    isMoving = !isMoving
  }

  function moveAllBalls() {
    for (var i = 0; i < balls.length; i++) {
      moveOneBall(i);
    }
  }
  moveOneBall = (i) => {
    // console.log('from MoveBalls!');
    // console.log(i);
    var boundaryCondition = checkBoundary(balls[i]);
    // var boundaryCondition = 'x'
    switch (boundaryCondition) {
      case 'x':
        balls[i].dx *= -1;
        break;
      case 'y':
        balls[i].dy *= -1;
        break;

      default:
        if (!checkCollision(balls[i], 0, balls.length - 1, i)) {
          balls[i].div.style.left = balls[i].x + 'px';
          balls[i].div.style.top = balls[i].y + 'px';
        } else {
          balls[i].dx *= -1;
          balls[i].dy *= -1;
        }
        break;
    }
    balls[i].x = balls[i].x + (balls[i].dx * balls[i].vx);
    balls[i].y = balls[i].y + (balls[i].dy * balls[i].vy);
  }

  function checkBoundary(obj) {
    if (obj.x <= 0 || (obj.x + obj.radius) >= containerWidth) return 'x'
    else if (obj.y <= 0 || (obj.y + obj.radius) >= containerHeight) return 'y'
    return 'z';
  }


  function createOneBall() {
    // var run = false;
    // do {
    var ball = {};
    ball.div = document.createElement('div');
    ball.radius = randomNumber(MIN_SIZE, MAX_SIZE);
    ball.x = randomNumber(5, 645);
    ball.y = randomNumber(5, 345);
    run = checkCollision(ball, 0, balls.length - 1, -1);
    // checkCollision on creation!
    ball.vx = randomNumber(.2, 1);
    ball.vy = randomNumber(.2, 1);
    // Randomize individual velocity!
    ball.dx = randomNumber(1, 10) % 2 ? 1 : -1;
    ball.dy = randomNumber(1, 10) % 2 ? 1 : -1;
    // console.log(ball.dx);
    ball.div.style.position = 'absolute';
    ball.div.style.left = ball.x + 'px';
    ball.div.style.top = ball.y + 'px';
    ball.div.style.borderRadius = '50%';
    ball.div.style.height = ball.radius + 'px';
    ball.div.style.width = ball.radius + 'px';
    ball.div.style.backgroundColor = getRandomColor();
    // } while (run);
    console.log(ball);
    return ball;
  }

  function checkCollision(obj, start, end, position) {
    for (var i = start; i < end; i++) {
      //obj -> Ball
      // balls -> Array of balls
      // Start end -> To check
      // position of current ball in array!
      if (position != i) {
        // Doesn't check wit self 
        // -> Optimize to remove this check, limit while passing!
        if (obj.x <= (balls[i].x + balls[i].radius) && (obj.x + obj.radius) >= balls[i].x && obj.y <= (balls[i].y + balls[i].radius) && (obj.y + obj.radius) >= balls[i].y) {
          console.log('collide');
          return true;
        }
      }

    }
    return false;
  }
}

function randomNumber(min, max) {
  return (Math.random() * (max - min)) + min;
}

function getRandomColor() {
  // return '#'.join(Math.floor(Math.random() * 16777215).toString(16));
  var red = randomNumber(0, 255);
  var blue = randomNumber(0, 255);
  var green = randomNumber(0, 255);
  var alpha = randomNumber(0.5, 1)
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`

}

var ball = new Ball(10);
ball.init();