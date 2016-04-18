$(document).ready(function() {
    init();

    function init() {
      gatherNodes();
      initGrid(this.$grid);
      hideElements();
      // linkBehavior(this.$linkNodes);
      menuTrigger(this.$menuTrigger);
      fullscreenImages(this.$image, this.$fsImage);
      scrollToTop(this.$scrollToTop);
      // nightTime();
    };

    function nightTime() {
      $('p').on('click', function () {
        $('body').toggleClass('night-time');
      });
    }

    function gatherNodes() {
      $body = $('body'),
      // this.$linkNodes   = $('body').find('.portfolioLink, .back');
      this.$menuTrigger = $('.menu-trigger');
      this.$grid        = $('.grid');
      this.$image       = $('img');
      this.$fsImage     = $('.fullscreen-image');
      this.$scrollToTop = $(".scrollToTop");
    }

    function hideElements() {
      this.$fsImage.hide();
    }

    function fullscreenImages(images, fsImage) {
      images.on('click', function(evt) {
        handleImageClick($(this), fsImage);
      });

      fsImage.on('click', function(evt) {
        handleFsImageClick(fsImage);
      });
    };

    function handleFsImageClick(fsImage) {
      fsImage.empty().fadeOut(300);
      toggleNoScroll();
    }

    function handleImageClick(image, fsImage) {
        var src = image.attr('src');
        var desc = image.next().contents().text();

        // nextImg = image.parent().next(".collection").children('img');
        // prevImg = image.parent().prev(".collection").children('img');

        fsImage.append('<img src='+src+'><p>'+desc+'</p>');
        fsImage.fadeIn(200);
        toggleNoScroll();
        console.log(desc)
    }

    function toggleNoScroll() {
      $('body').toggleClass('no-scroll');
    }

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

    function scrollToTop(el) {
      $(document).scroll(function () {
          var y = $(this).scrollTop();
          if (y > 960) {
              el.fadeIn(200);
          } else {
              el.fadeOut(200);
          }
      });

      el.on('click', function(evt) {
        evt.preventDefault;
        $('html, body').animate({scrollTop:0},1000);
      });
    };

    function initGrid(selector) {
      $('.grid').hide();

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