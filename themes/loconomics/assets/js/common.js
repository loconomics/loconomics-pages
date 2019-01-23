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

  function initCoopButtonsTracking() {
    // Facebook Pixel:
    // We have links to the coop site, will not get tracked as a PageView with
    // the standard snippet, so we track it as a ViewContent event providing
    // the coop domain and URL that was clicked.
    window.addEventListener('click', function(event) {
      var href = event.target && event.target.getAttribute('href') || '';
      var found = href.match(/loconomics\.coop\/.*$/);
      if (found) {
        var label = event.target.getAttribute('x-tag-label') || 'untagged: add x-tag-label attr to all coop links';
        if (production) {
          fbq('track', 'ViewContent', {
            content_name: label
          });
          gtag('event', 'join_90_days_free', {
            event_category: 'Buttons',
            event_label: label
          })
        }
        else {
          console.warn('Will send fbq track ViewContent', label);
          console.warn('Will send gtag track join_90_days_free', label);
        }
      }
    });
  }

  function initVideoTracking() {
    // Google Analytics/Tags
    // Detect 'play' videos (Vimeo)
    if (window.Vimeo) {
      Array.prototype.slice.call(document.getElementsByTagName('iframe'), 0)
      .forEach(function(embedded) {
        var label = embedded.getAttribute('x-tag-label') || 'untagged: add x-tag-label attr to all video iframes';
        var player = new Vimeo.Player(embedded);
        player.on('play', function() {
          if (production) {
            gtag('event', 'play', {
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
    initCoopButtonsTracking();
    initVideoTracking();
  });

})(window);
