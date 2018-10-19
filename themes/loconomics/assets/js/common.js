/* white line to prevent error with Hugo resources.Concat */
(function(global) {
    let list = ['images/hero1.jpg', 'images/hero2.jpg', 'images/hero3.jpg'];
    let i = 0;

    // setInterval(function(){
    //     document.getElementById('div-home-hero-bg').style.backgroundImage = 'url("' + list[i] + '")';
    //     if (i >= list.length - 1) i = 0; else i++;
    // }, 5000);

    let lastScrollPos = 0;
    let ticking = false;

    window.addEventListener('scroll', function(e) {
      lastScrollPos = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(function() {
          let element = document.getElementById("primary-nav");
          if (lastScrollPos >= 100) {
            element.className = element.className.replace(/\bbg-transparent\b/g, "");
          }
          else {
            element.classList.add("bg-transparent");
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
