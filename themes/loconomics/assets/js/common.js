/* white line to prevent error with Hugo resources.Concat */
(function(global) {

  window.addEventListener('DOMContentLoaded', function () {
      const list = ['/images/hero/hero2.jpg', '/images/hero/hero3.jpg', '/images/hero/hero1.jpg'];
      const hero = document.querySelector('#home .HeroSection');
      let i = 0;
      if (hero) {
        setInterval(function(){
            hero.style.backgroundImage = 'url("' + list[i] + '")';
            if (i >= list.length - 1) i = 0;
            else i++;
        }, 5000);
      }
    });

    let lastScrollPos = 0;
    let ticking = false;

    window.addEventListener('scroll', function(e) {
      lastScrollPos = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(function() {
          let element = document.getElementsByClassName("PrimaryNavbar")[0];
          if (lastScrollPos >= 100) {
            element.classList.add('is-scrolling');
          }
          else {
            element.classList.remove('is-scrolling');
          }

          if (lastScrollPos >= 100) {
            //element.classList.toggle("fadeOut");
          }
          ticking = false;
        });

        ticking = true;
      }
    });
})(window);
