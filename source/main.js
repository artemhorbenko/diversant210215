$(document).ready(function(){
  $('.hero-slick').slick({
    infinite: true,
    dots: true,
    arrows: false
  });

  $(window).scroll(function (event) {
    var windowScrollPosition = $(window).scrollTop(),
        navbar = $('#navbar'); 
    if(windowScrollPosition > 75 && navbar.height() == 150){ 
      navbar.stop().animate({
        height: 75
      }, 300);
    }
    if(windowScrollPosition < 76 && navbar.height() == 75){ 
      navbar.stop().animate({
        height: 150
      }, 300);
    }
  });

  $('.smooth-scroll')
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        event.preventDefault();
        $('html, body').stop().animate({
          scrollTop: target.offset().top - 75
        }, 1000, function() {
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) {
            return false;
          } else {
            $target.attr('tabindex','-1');
            $target.focus();
          };
        });
      }
    }
  });

  $('#lightboxModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget)
    var imageTitle = button.data('whatever')
    var modal = $(this)
    $('#lightboxImg').attr({
      src: "./img/"+imageTitle+".png",
      title: imageTitle,
      alt: imageTitle
    });
  })

});