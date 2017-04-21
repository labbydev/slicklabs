/**
 * @file
 * A JavaScript file to scroll the navigation for the site.
 *
 * Our JavaScript must be wrapped in a closure.
 * @see https://drupal.org/node/1446420
 * @see http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
 *
 * @copyright Copyright 2017 Lauren A. Burroughs
 */

(function ($) {

  Drupal.behaviors.page_nav = {
    attach: function (context, settings) {
      var htmlBody = $('html, body');

      // Check the distance of the jump nav element from the top of the page.
      var headerJump = $('.header');
      var topScrollDistance = headerJump.offset().top;

      // Get the height of the jump link header.
      var headerJumpHeight = headerJump.outerHeight(true);

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

      // Scrollto Links for Page nav.
      var scrollLink = $(".link--scroll");

      scrollLink.click(function(event) {
        // Get current top scroll height in case it has cha=ged with viewport size.
        headerJumpHeight = headerJump.outerHeight(true);

        // Prevent default anchor behavior so scrolling can animate.
        event.preventDefault();

        // Get the destination ID from the href.
        var destinationLink = $(this).attr('href');
        var destinationOffset = $(destinationLink).offset().top;

        // Subtract  header height from top offset to get the scroll destination.
        destinationOffset = ($(destinationLink).offset().top - (headerJumpHeight));

        // Scroll to the destination.
        htmlBody.animate({
          scrollTop: destinationOffset
        }, Math.abs(window.scrollY - $(this.hash).offset().top));
      });

      // open the menu toggle
      var menuToggle = $('.main-nav__trigger');

      menuToggle.click(function (event) {
        // Prevent default anchor behavior so scrolling can animate.
        event.preventDefault();
        menuToggle.toggleClass('is-open');
        menuToggle.next('nav').toggleClass('is-open');
        menuToggle.parents('.header').toggleClass('is-open');
      })
    }
  };

})(jQuery, Drupal);