imageContainer = document.getElementById('inner-slider')
imageContainer.style.left = 0;
var sliderWidth = '500px';
var sliderHeight = '384px';
var imageChangeInterval = 2000; //in ms
var pixelsToSlide = 10; //per 10ms
var imageCount = 5;
imageContainer.style.width = sliderWidth * imageCount + 'px';
var SlideCount = 0;
var pixelsMoved = 0; //Internal variable, accessible to 2 functions, can't be passed!


function changeImage() {
  if (SlideCount >= imageCount - 1) {
    imageContainer.style.left = '0px';
    SlideCount = 0;
  }
  console.log(SlideCount);
  slideSingleImage()
  SlideCount++;
}

function slideSingleImage() {
  pixelsMoved = 0;
  y = setInterval(() => {
    imageContainer.style.left = parseInt(imageContainer.style.left) - pixelsToSlide + 'px';
    pixelsMoved += pixelsToSlide
    if (pixelsMoved >= parseInt(sliderWidth)) {
      clearInterval(y)
    }
  }, 10);
}

main = setInterval(() => {
  changeImage()
}, imageChangeInterval);
