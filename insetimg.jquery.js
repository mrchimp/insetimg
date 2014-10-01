(function ($) {

  $.fn.insetimg = function (options) {

    var elems = this,
        images = [],
        wrapper,
        wrap_inner,
        x;

    function doResize () {
      $('.insetimg-image').height($(window).height());
      doScroll();
    }

    function doScroll () {
      var x = 0,
          scrollTop = $(window).scrollTop();

      elems.each(function() {
        var offset = $(this).offset().top,
            top_dist = (offset - scrollTop) + $(this).height(),
            top_perc = 100 - (top_dist / $(window).height()) * 100;

        $('.insetimg-wrapper:eq('+x+')').css('bottom', top_perc + '%');

        x++;
      });
    }

    wrapper = $('<div />').
        addClass('insetimg');

    wrap_inner = $('<div />').
      addClass('insetimg-inner')
      .appendTo(wrapper);
    
    x = 0;

    $(this).each(function () {
      var img = $(this).children('img').first();

      var inner = $('<div />')
        .addClass('insetimg-image')
        .css({
          'background-image': 'url(' + img.attr('src') +')'
        });

      $('<div />')
        .addClass('insetimg-wrapper')
        .css('z-index', elems.length - x + 1)
        .html(inner)
        .appendTo(wrap_inner);

      $(this).addClass('loaded');

      img.remove();

      x++;
    });

    wrapper.prependTo($('body'));

    $(window).on('scroll', doScroll).on('resize', doResize);
    
    $(window).load(function () {
      doScroll();
      doResize();
    });

    return this;

  };

}(jQuery));