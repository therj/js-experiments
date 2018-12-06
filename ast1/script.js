var imageContainer = document.getElementById('inner-slider');
var IMAGE_CHANGE_INTERVAL = 2000; //in ms
var IMAGE_COUNT = imageContainer.childElementCount;
var PIXELS_TO_SLIDE = 20; //per 10ms
var SLIDER_HEIGHT = '400px';
var SLIDER_WIDTH = '800px';
var PREVIOUS = 'a';
var NEXT = 's';

var arrowLeft = document.getElementById('arrow-left');
var arrowRight = document.getElementById('arrow-right');
arrowLeft.classList.add('hidden');
var slideIndex = 0;
var directionFlag = 1; // 1 -> Left!
imageContainer.style.left = 0;
imageContainer.style.width = parseInt(SLIDER_WIDTH) * IMAGE_COUNT + 'px';

function changeImage() {
  slideSingleImage(directionFlag);
  slideIndex += directionFlag;
  setPosition();
}

function slideSingleImage(directionFlag) {
  var pixelsMoved = 0;
  internalSlide = setInterval(() => {
    // console.log('slideSingleImage!');
    imageContainer.style.left =
      parseInt(imageContainer.style.left) -
      directionFlag * PIXELS_TO_SLIDE +
      'px';
    pixelsMoved += PIXELS_TO_SLIDE;
    if (pixelsMoved >= parseInt(SLIDER_WIDTH)) {
      clearInterval(internalSlide);
    }
  }, 10);
}

function previousImage() {
  // If slideIndex is not 0: LEFT!
  if (slideIndex) {
    imageContainer.style.left =
      parseInt(imageContainer.style.left) + parseInt(SLIDER_WIDTH) + 'px';
    slideIndex--;
  }
}

function nextImage() {
  // console.log(slideIndex);
  // if NOT last
  if (slideIndex < IMAGE_COUNT - 1) {
    slideIndex++;
    imageContainer.style.left =
      parseInt(imageContainer.style.left) - parseInt(SLIDER_WIDTH) + 'px';
  }
}

function customMove(direction) {
  // Do nothing without NEXT or PREVIOUS!
  if (direction == PREVIOUS || direction == NEXT) {
    clearInterval(main);
    if (direction == PREVIOUS) {
      previousImage();
    } else {
      // else NEXT !
      nextImage();
    }
    // FIX position!
    setPosition();
    main = setInterval(changeImage, IMAGE_CHANGE_INTERVAL);
  }
}

function setPosition() {
  arrowLeft.classList.remove('hidden');
  arrowRight.classList.remove('hidden');
  if (slideIndex >= IMAGE_COUNT - 1) {
    slideIndex = IMAGE_COUNT - 1;
    arrowRight.classList.add('hidden');
    directionFlag = -1;
  } else if (slideIndex <= 0) {
    arrowLeft.classList.add('hidden');
    slideIndex = 0;
    directionFlag = 1;
  }
}

document.addEventListener('keypress', function(e) {
  // console.log(e.key);
  customMove(e.key);
});
arrowLeft.addEventListener('click', function(e) {
  customMove((direction = PREVIOUS));
});
arrowRight.addEventListener('click', function(e) {
  customMove((direction = NEXT));
});

function start() {
  main = setInterval(changeImage, IMAGE_CHANGE_INTERVAL);
}

start();
