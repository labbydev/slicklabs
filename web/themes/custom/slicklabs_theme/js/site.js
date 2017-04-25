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
  BackgroundCheck.init({
    targets: '.button--transparent',
    images: '.has-bkg-img'
  });

  Drupal.behaviors.custom_waypoints = {
    attach: function (context, settings) {
    }
  };

  Drupal.behaviors.input_filled = {
    attach: function (context, settings) {
      $('input').blur(function(){
        if($(this).val()!=null&&$(this).val()!=''){
          $(this).addClass('' + 'is-filled')
        } else {
          $(this).removeClass('is-filled')
        }
      });
    }
  };

  // Hide Header on on scroll down
  var didScroll;
  var lastScrollTop = 0;
  var navbarHeight = $('header').outerHeight();

  $(window).scroll(function(event){
    didScroll = true;
  });

  setInterval(function() {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  function hasScrolled() {
    var st = $(this).scrollTop();

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop){
      $('header').removeClass('nav-down').addClass('nav-up');
    } else {
      $('header').removeClass('nav-up').addClass('nav-down');
    }
    lastScrollTop = st;
  }

})(jQuery, Drupal);
