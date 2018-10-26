window.addEventListener('DOMContentLoaded', function () {
  var slideIndex = 1;
  showSlides(slideIndex);

  // Next/previous controls
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  var prev = document.getElementsByClassName('SlideshowSection-prev')[0];
  var next = document.getElementsByClassName('SlideshowSection-next')[0];
  prev.addEventListener('click', function () { plusSlides(-1); });
  next.addEventListener('click', function () { plusSlides(1); });

  // Thumbnail image controls
  function currentSlide(n) {
    showSlides(slideIndex = n);
  }
  var slideIndex = document.getElementsByClassName('SlideshowSection-index')[0];
  slideIndex.addEventListener('click', function (event) {
    var slide = event.target.getAttribute('href');
    if (slide) {
      slide = slide.substr(1);
      currentSlide(slide);
    }
    event.preventDefault();
  });

  function showSlides(n) {
    var i;
    var slides = document.querySelectorAll(".SlideshowSection-content > li");
    if (slides.length) {
      var dots = document.querySelectorAll(".SlideshowSection-index > li");
      if (n > slides.length) {
        slideIndex = 1;
      }
      if (n < 1) {
        slideIndex = slides.length;
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].removeAttribute('aria-current');
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].removeAttribute('aria-current');
      }
      slides[slideIndex - 1].setAttribute('aria-current', 'true');
      dots[slideIndex - 1].setAttribute('aria-current', 'true');
    }
  }
});
