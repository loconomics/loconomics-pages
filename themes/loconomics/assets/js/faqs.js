/* white line to prevent error with Hugo resources.Concat */
(function() {

  function collapse(term, def) {
    term.setAttribute('aria-expanded', 'false');
    def.setAttribute('hidden', 'hidden');
  }

  function expand(term, def) {
    term.setAttribute('aria-expanded', 'true');
    def.removeAttribute('hidden');
  }

  window.addEventListener('DOMContentLoaded', function () {
      Array.prototype.slice
      .apply(document.querySelectorAll('.Faqs > dl > dt'))
      .forEach(function(term) {
          var def = term.nextElementSibling;
          // Initial state: definition collapsed
          collapse(term, def);
          // Toggle on click
          term.addEventListener('click', function(event) {
            if (term.getAttribute('aria-expanded') === 'false') {
                expand(term, def);
            }
            else {
                collapse(term, def);
            }
            event.preventDefault();
          });
      });
  });
})();
