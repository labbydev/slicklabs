/**
 * @file
 * A JavaScript file for the site.
 *
 * Our JavaScript must be wrapped in a closure.
 * @see https://drupal.org/node/1446420
 * @see http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 *
 * @copyright Copyright 2017 Lauren A. Burroughs
 */

(function ($) {

  // Check tranparent buttons against images for contrast
  console.log('background check is running');
  BackgroundCheck.init({
    targets: '.button--transparent',
    images: '.has-bkg-img'
  });

  Drupal.behaviors.scroll_links = {
    attach: function (context, settings) {
      var htmlBody = $('html, body');

      // Get the window and window width.
      var $window = $(window);
      var window_width = $window.width();

      // Debounce function to keep scroll and resize events from firing to frequently.
      function debounce(method, delay) {
        clearTimeout(method._tId);
        method._tId= setTimeout(function(){
          method();
        }, delay);
      }

      // Scrollto Links
      var scrollLink = $(".link--scroll");

      scrollLink.click(function(event) {
        // Prevent default anchor behavior so scrolling can animate.
        event.preventDefault();

        // Get the destination ID from the href.
        var destinationLink = $(this).attr('href');
        var destinationOffset = $(destinationLink).offset().top;

        // Scroll to the destination.
        htmlBody.animate({
          scrollTop: destinationOffset
        }, 500);
      });
    }
  };

})(jQuery, Drupal);
