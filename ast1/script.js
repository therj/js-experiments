imageContainer = document.getElementById('inner-slider')
imageContainer.style.left = 0;
imageContainer.style.width = 500 * 5 + 'px';
var imageCount = 5;
var SlideCount = 0;

function changeImage() {
  // return 0;
  SlideCount++;
  console.log(SlideCount);
  slideSingleImage()

  if (SlideCount >= 4) {
    SlideCount = 0;
    imageContainer.style.left = '0px'
  }

}

function slideSingleImage() {
  var pixelsMoved = 0;
  y = setInterval(() => {
    imageContainer.style.left = parseInt(imageContainer.style.left) - 10 + 'px';
    pixelsMoved += 10
    if (pixelsMoved >= 500) {
      clearInterval(y)
    }
  }, 10);
}

setInterval(() => {
  changeImage()
}, 2000);

