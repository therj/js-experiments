// circle  sizes!
var MIN_SIZE = 35;
var MAX_SIZE = 40;
// Height width WITHOUT px!
var WIDTH = 800;
var HEIGHT = 400;

var container = document.getElementById('container');
container.style.width = WIDTH + 'px';
container.style.height = HEIGHT + 'px';

function Ball(numberOfBalls) {
  var balls = []
  var container = document.getElementById('container');
  var ballInterval; //random!
  var isMoving = false //toggle the state on init!
  // Allow users to pause motion in future!!
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
        if (!checkCollision(balls[i], 0, balls.length, i)) {
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
    if (obj.x <= 0 || (obj.x + obj.radius) >= WIDTH) return 'x'
    else if (obj.y <= 0 || (obj.y + obj.radius) >= HEIGHT) return 'y'
    return 'z';
  }


  function createOneBall() {
    var again
    // Regenerate until non-colliding is found!
    do {
      var ball = {};
      ball.div = document.createElement('div');
      ball.radius = randomNumber(MIN_SIZE, MAX_SIZE);
      //  Avoid freezing balls on floor and right wall
      ball.x = randomNumber(ball.radius, WIDTH - ball.radius);
      ball.y = randomNumber(ball.radius, HEIGHT - ball.radius);
      // checkCollision on creation!
      again = checkCollision(ball, 0, balls.length, -1);
      ball.vx = randomNumber(.4, 1);
      ball.vy = randomNumber(.4, 1);
      // Randomize individual velocity!
      ball.dx = randomNumber(-1, 1) < 0 ? -1 : 1;
      ball.dy = randomNumber(-1, 1) < 0 ? -1 : 1;
      // console.log(ball.dx);
      ball.div.style.position = 'absolute';
      ball.div.style.left = ball.x + 'px';
      ball.div.style.top = ball.y + 'px';
      ball.div.style.borderRadius = '50%';
      ball.div.style.height = ball.radius + 'px';
      ball.div.style.width = ball.radius + 'px';
      ball.div.style.backgroundColor = getRandomColor();
    } while (again);
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
          console.log('collision!');
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
  return '#' + (Math.floor(Math.random() * 16777216).toString(16));
}

var ball = new Ball(10);
ball.init();
