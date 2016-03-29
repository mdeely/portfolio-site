$(document).ready(function() {
    init();

    function init() {
      gatherNodes(),
      initGrid(this.$gridEl);
      // linkBehavior(this.$linkNodes);
      menuTrigger(this.$menuTrigger);
      displayBackButton();
    };

    function gatherNodes() {
      $body = $('body'),
      this.$linkNodes   = $('body').find('.portfolioLink, .back'),
      this.$menuTrigger = $('.menu-trigger');
      this.$gridEl        = $('.grid');
    }

    function displayBackButton() {
      var $back = $(".nav-item.back");

      if (window.location.pathname !== "/") {
        $back.show();
      }
    };

    function linkBehavior(links) {
      links.on('click', function(evt) {
          evt.preventDefault();

          links.not(this).fadeOut(175);
          $body.fadeOut(500);

        var Link = $(this).attr("href");

        setTimeout(function() {
            window.location = Link;
        },515);
      });
    };

    function menuTrigger(triggers) {
      triggers.on('click', function(evt) {
        triggers.toggleClass('triggered');
        $('.menu-container').toggleClass('open');
        $(".container, .masthead, .project-header").toggleClass('fade');
      });
    };

    function initGrid(selector) {
      $gridEl.hide();

      var $gridInit = $('.grid');

      $gridInit.imagesLoaded().always( function( instance ) {

          var $grid = $gridInit.imagesLoaded( function() {
            // init Masonry after all images have loaded
              $grid.masonry({
                // options
                itemSelector: '.grid-item',
                columnWidth: '.grid-sizer',
                percentPosition: true
              });
          });
      });

      $('.grid').fadeIn(1000);
    };
});