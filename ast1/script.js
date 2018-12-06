var IMAGE_CHANGE_INTERVAL = 2000; //in ms
var PIXELS_TO_SLIDE = 10; //per 10ms
var SLIDER_HEIGHT = '384px';
var SLIDER_WIDTH = '500px';
var PREVIOUS = 'a';
var NEXT = 's';

imageContainer = document.getElementById('inner-slider');
var imageCount = 5;
var slideIndex = 0;
var directionFlag = 1; // 1 -> Left!
imageContainer.style.left = 0;
imageContainer.style.width = parseInt(SLIDER_WIDTH) * imageCount + 'px';

function changeImage() {
  slideSingleImage(directionFlag);
  slideIndex += directionFlag;
  setPosition()
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
  if (slideIndex < imageCount - 1) {
    slideIndex++;
    imageContainer.style.left =
      parseInt(imageContainer.style.left) - parseInt(SLIDER_WIDTH) + 'px';
  }
}


function customMove(direction) {
  // No nothing without NEXT or PREVIOUS!
  if (direction == PREVIOUS || direction == NEXT) {
    clearInterval(main)
    if ((direction == PREVIOUS)) {
      previousImage()
    } else { // else NEXT !
      nextImage()
    }
    // FIX position!
    setPosition()
    main = setInterval(changeImage, IMAGE_CHANGE_INTERVAL);
  }
}

function setPosition(params) {
  if (slideIndex >= imageCount - 1) {
    slideIndex = imageCount - 1;
    directionFlag = -1;
  } else if (slideIndex <= 0) {
    slideIndex = 0;
    directionFlag = 1;
  }
}

document.addEventListener('keypress', function (e) {
  customMove(e.key)
});


function start() {
  main = setInterval(changeImage, IMAGE_CHANGE_INTERVAL);
}

start();
