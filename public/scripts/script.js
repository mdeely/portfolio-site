$(document).ready(function() {
    init();

    function init() {
      gatherNodes();
      projectListLoadBehavior();
      menuTrigger(this.$menuTrigger);
      fullscreenImages(this.$image, this.$fsImage);
      scrollToTop(this.$scrollToTop);
      lazyLoad();
    };

    function projectListLoadBehavior() {
      $('.container').addClass('fade');
      $('.portfolioLink').imagesLoaded( function() {
        $('.container').removeClass('fade');
      });
    }

    function lazyLoad() {
      $("img.lazy").lazyload({
        threshold : 350,
        effect : 'fadeIn'
      });
    }

    function gatherNodes() {
      $body = $('body'),
      this.$menuTrigger = $('.menu-trigger');
      this.$image       = $('img');
      this.$fsImage     = $('.fullscreen-image');
      this.$scrollToTop = $(".scrollToTop");
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
      if (image.parent().hasClass('hero'))
        return

      var src = image.attr('src');
      var desc = image.next().contents().text();

      // nextImg = image.parent().next(".collection").children('img');
      // prevImg = image.parent().prev(".collection").children('img');

      fsImage.append('<img src='+src+'><p>'+desc+'</p>');
      fsImage.fadeIn(200);
      toggleNoScroll();
    }

    function toggleNoScroll() {
      $('body').toggleClass('no-scroll');
    }

    function menuTrigger(triggers) {
      triggers.on('click', function(evt) {
        toggleMenuClasses(triggers);
      });

      $(".menu-fader").on('click', function(evt) {
        toggleMenuClasses(triggers);
      })
    };

    function toggleMenuClasses(triggers) {
      triggers.toggleClass('triggered');
      $('.menu-container').toggleClass('open');
      $(".menu-fader").toggleClass('active');
      toggleNoScroll();
    }

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
});