(function() {
  function setupSlideshow(slideshow) {
    // Cache DOM elements
    var slides = slideshow.querySelectorAll(".SlideshowSection-content > li");
    var prev = slideshow.querySelector('.SlideshowSection-prev');
    var next = slideshow.querySelector('.SlideshowSection-next');
    var dots = slideshow.querySelectorAll(".SlideshowSection-index > li");
    var indexElement = slideshow.querySelector('.SlideshowSection-index');
    // First slide
    var slideIndex = 1;
    // Next/previous controls
    function plusSlides(n) {
      showSlides(slideIndex += n);
    }
    prev.addEventListener('click', function () { plusSlides(-1); });
    next.addEventListener('click', function () { plusSlides(1); });

    // Thumbnail image controls
    function currentSlide(n) {
      showSlides(slideIndex = n);
    }
    indexElement.addEventListener('click', function (event) {
      var slide = event.target.getAttribute('href');
      if (slide) {
        slide = slide.match(/-(\d)$/);
        slide = slide && slide[1];
        currentSlide(slide);
      }
      event.preventDefault();
    });
    // Display specific slide
    function showSlides(n) {
      var i;
      if (slides.length) {
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

    // Start showing slides
    showSlides(slideIndex);
  };

  window.addEventListener('DOMContentLoaded', function () {
    Array.prototype.slice.call(document.getElementsByClassName('SlideshowSection'))
    .forEach(setupSlideshow);
  });

})();
