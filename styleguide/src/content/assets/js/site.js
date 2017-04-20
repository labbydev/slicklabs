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

})(jQuery, Drupal);
