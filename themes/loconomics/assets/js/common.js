/* white line to prevent error with Hugo resources.Concat */
(function(global) {

  // Tracking code, only enabled on production
  var production = location.hostname === 'loconomics.com';

  function initHomeHeroSlideshow() {
    const list = ['/images/hero/home2.jpg', '/images/hero/home3.jpg', '/images/hero/home1.jpg'];
    const hero = document.querySelector('#home .HeroSection');
    let i = 0;
    if (hero) {
      setInterval(function(){
          hero.style.backgroundImage = 'url("' + list[i] + '")';
          if (i >= list.length - 1) i = 0;
          else i++;
      }, 5000);
    }
  }

  function initSlideshowSection() {
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
          ticking = false;
        });

        ticking = true;
      }
    });
  }

  function initFBPixel() {
    // Facebook Pixel custom events:
    // We have links to the coop site, will not get tracked as a PageView with
    // the standard snippet, so we track it as a ViewContent event providing
    // the coop domain and URL that was clicked.
    window.addEventListener('click', function(event) {
      var href = event.target && event.target.getAttribute('href') || '';
      var found = href.match(/loconomics\.coop\/.*$/);
      if (found) {
        if (production) {
          fbq('track', 'ViewContent', {
            content_name: found[0]
          });
        }
        else {
          console.warn('Will send fbq track ViewContent', found[0]);
        }
      }
    });
  }

  function initGTags() {
    // Google Analytics/Tags
    // Detect 'play' videos (Vimeo)
    if (window.Vimeo) {
      Array.slice.call(document.getElementsByTagName('iframe'), 0)
      .forEach(function(embedded) {
        var label = embedded.getAttribute('x-tag-label') || 'untagged: add x-tag-label attr to the video iframe';
        var player = new Vimeo.Player(embedded);
        player.on('play', function() {
          if (production) {
            gtag('play', {
              event_category: 'Videos',
              event_label: label
            });
          }
          else {
            console.warn('Will send gtag play video', label);
          }
        });
      });
    }
  }

  window.addEventListener('DOMContentLoaded', function () {
    initHomeHeroSlideshow();
    initSlideshowSection();
    initFBPixel();
    initGTags();
  });

})(window);
