var Index;

Index = {
  nav: ['definery', 'iterate', 'navigate', 'product'],
  timeout: 1000,
  paused: false,
  tl: false,
  colors: {
    'definery': data.color.teal1,
    'iterate': data.color.blue1,
    'navigate': data.color.green1,
    'product': data.color.pink1
  },
  current: 0,
  menuNum: 1,
  menuOptions: ['about', 'work', 'services', 'contact'],
  menuSwiping: false,
  i: function() {
    return Index.handlers();
  },
  handlers: function() {
    $('.nav').on('click', Index.navHandler);
    $('.dots > .dot').on('click', Index.dotHandler);
    $('.menu > .option').on('click', Index.menuHandler);
    $('.section > .logo').on('click', function() {
      return $('.menu > .option.option_about').trigger('click');
    });
    $('.prod_contact_cta').on('click', Index.contact);
    $(document).on('touchmove', function() {
      return event.preventDefault();
    });
    Detect.handler(Index.navigate);
    return $('.content > .inner > .tapspace').swipe({
      swipe: function(event, direction, distance, duration, fingerCount) {

        /*
        direction  = 'down' if direction is 'up'
        direction  = 'up' if direction is 'down'
        direction  = 'left' if direction is 'right'
        direction  = 'right' if direction is 'left'
         */
        $('.debug').append('1: swipe: ' + direction + '<br /> ');
        Index.navigate(direction);
      },
      tap: function(event, target) {
        return console.log('tap');
      },
      click: function(event, target) {
        return console.log('click');
      },
      threshold: 0
    });
  },
  contact: function() {
    return $('.menu > .option.option_contact').trigger('click');
  },
  menuHandler: function() {
    var current, dir, i, len, num, option, ref;
    if (Index.menuSwiping === true) {
      return true;
    }
    Index.menuSwiping = true;
    current = $(this).data('option');
    num = $(this).data('num');
    if ($(".option_" + current).hasClass('on')) {
      Index.menuSwiping = false;
      return true;
    }
    _.off('.menu > .option');
    _.on(".option_" + current);
    ref = Index.menuOptions;
    for (i = 0, len = ref.length; i < len; i++) {
      option = ref[i];
      $('.swiper').removeClass("swiper_" + option);
    }
    if (num > Index.menuNum) {
      dir = 'right';
    } else {
      dir = 'left';
    }
    Index.menuNum = num;
    $(".swiper." + dir).addClass("swiper_" + current);
    _.on(".swiper." + dir);
    setTimeout(function() {
      _.off(".swiper." + dir);
      return Index.menuSwiping = false;
    }, 750);
    return setTimeout(function() {
      _.off('.section');
      if (current !== 'about') {
        return _.on(".section." + current);
      }
    }, 300);
  },
  navHandler: function() {
    var current, direction, previous, t;
    if (Index.paused) {
      return true;
    }
    t = $(this);
    previous = t.data('from');
    current = t.data('to');
    direction = t.data('dir');
    Index.transit(previous, current, direction);
    Index.paused = true;
    return setTimeout(function() {
      return Index.paused = false;
    }, Index.timeout);
  },
  dotHandler: function() {
    var cnum, current, direction, pnum, previous;
    if (Index.paused) {
      return true;
    }
    previous = $('.dots .dot.on').data('sect');
    pnum = $('.dots .dot.on').data('num');
    current = $(this).data('sect');
    cnum = $(this).data('num');
    if (cnum > pnum) {
      direction = 'down';
    } else {
      direction = 'up';
    }
    Index.transit(previous, current, direction);
    Index.paused = true;
    Index.current = cnum;
    return setTimeout(function() {
      return Index.paused = false;
    }, Index.timeout);
  },
  navigate: function(direction) {
    var current, previous;
    if ($('.menu > .option.option_contact').hasClass('on')) {
      return true;
    }
    if ($('.menu > .option.option_services').hasClass('on')) {
      return true;
    }
    if ($('.menu > .option.option_work').hasClass('on')) {
      return true;
    }
    if (Index.paused) {
      return true;
    }
    previous = Index.nav[Index.current];
    if (direction === 'up' || direction === 'left') {
      if (Index.current === (Index.nav.length - 1)) {
        return true;
      } else {
        Index.current++;
      }
    }
    if (direction === 'down' || direction === 'right') {
      if (Index.current === 0) {
        return true;
      } else {
        Index.current--;
      }
    }
    current = Index.nav[Index.current];
    Index.transit(previous, current, direction);
    Index.paused = true;
    return setTimeout(function() {
      return Index.paused = false;
    }, Index.timeout);
  },
  transit: function(previous, current, direction) {
    var i, len, ref, sect, tl;
    if (previous === void 0) {
      return true;
    }
    if (current !== 'definery') {
      _.on('.arrow.up');
    } else {
      _.off('.arrow.up');
    }
    setTimeout(function() {
      $('meta[name=theme-color]').remove();
      return $('head').append('<meta name="theme-color" content="' + Index.colors[current] + '">');
    }, 500);
    ref = Index.nav;
    for (i = 0, len = ref.length; i < len; i++) {
      sect = ref[i];
      if (sect !== current) {
        $('.colors .svg').removeClass("star_" + sect);
        $('.border').removeClass(sect);
        $('.bgcolor').removeClass(sect);
      }
    }
    $('.colors .svg').addClass("star_" + current);
    $('.border').addClass(current);
    $('.bgcolor').addClass(current);
    if (direction === 'up' || direction === 'left') {
      _.on(".background." + current);
      $(".background." + current).addClass('inFromBottom');
      $(".background." + previous).addClass('outToTop');
      _.on(".content." + current);
      $(".content." + current).addClass('cInFromBottom');
      $(".content." + previous).addClass('cOutToTop');
      setTimeout(function() {
        var j, len1, ref1, results;
        $(".background." + current).removeClass('inFromBottom');
        $(".background." + previous).removeClass('outToTop');
        $(".content." + current).removeClass('cInFromBottom');
        $(".content." + previous).removeClass('cOutToTop');
        ref1 = Index.nav;
        results = [];
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          sect = ref1[j];
          if (sect !== current) {
            _.off(".background." + sect);
            results.push(_.off(".content." + sect));
          } else {
            results.push(void 0);
          }
        }
        return results;
      }, 1000);
    }
    if (direction === 'down' || direction === 'right') {
      _.on(".background." + current);
      $(".background." + current).addClass('inFromTop');
      $(".background." + previous).addClass('outToBottom');
      _.on(".content." + current);
      $(".content." + current).addClass('cInFromTop');
      $(".content." + previous).addClass('cOutToBottom');
      setTimeout(function() {
        var j, len1, ref1, results;
        $(".background." + previous).removeClass('outToBottom');
        $(".background." + current).removeClass('inFromTop');
        $(".content." + previous).removeClass('cOutToBottom');
        $(".content." + current).removeClass('cInFromTop');
        ref1 = Index.nav;
        results = [];
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          sect = ref1[j];
          if (sect !== current) {
            _.off(".background." + sect);
            results.push(_.off(".content." + sect));
          } else {
            results.push(void 0);
          }
        }
        return results;
      }, 1000);
    }
    _.off('.dots > .dot');
    _.on(".dots > .dot.dot_" + current);
    tl = new TimelineMax({
      repeat: 0
    });
    return tl.to(".d1", 0.8, {
      morphSVG: "." + current + "1",
      ease: Power3.easeInOut
    }, '-=0.8').to(".d2", 0.8, {
      morphSVG: "." + current + "2",
      ease: Power3.easeInOut
    }, '-=0.8').to(".d3", 0.8, {
      morphSVG: "." + current + "3",
      ease: Power3.easeInOut
    }, '-=0.8');
  }
};

//# sourceMappingURL=data:application/json;base64,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QUFJLE9BQUosR0FBWSxHQUF2QjtNQUEyQixJQUFBLEVBQUssTUFBTSxDQUFDLFNBQXZDO0tBRmxCLEVBRXFFLE9BRnJFLENBR0UsQ0FBQyxFQUhILENBR00sS0FITixFQUdhLEdBSGIsRUFHa0I7TUFBQyxRQUFBLEVBQVUsR0FBQSxHQUFJLE9BQUosR0FBWSxHQUF2QjtNQUEyQixJQUFBLEVBQUssTUFBTSxDQUFDLFNBQXZDO0tBSGxCLEVBR3FFLE9BSHJFO0VBNUVPLENBbEtUIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiSW5kZXggPVxuXG4gIG5hdjogWydkZWZpbmVyeScsJ2l0ZXJhdGUnLCAnbmF2aWdhdGUnLCAncHJvZHVjdCddXG4gIHRpbWVvdXQ6IDEwMDBcbiAgcGF1c2VkOiBmYWxzZVxuXG4gIHRsOiBmYWxzZVxuXG4gIGNvbG9yczpcbiAgICAnZGVmaW5lcnknOiBkYXRhLmNvbG9yLnRlYWwxXG4gICAgJ2l0ZXJhdGUnOiBkYXRhLmNvbG9yLmJsdWUxXG4gICAgJ25hdmlnYXRlJzogZGF0YS5jb2xvci5ncmVlbjFcbiAgICAncHJvZHVjdCc6IGRhdGEuY29sb3IucGluazFcblxuICBjdXJyZW50OiAwXG5cbiAgbWVudU51bTogMVxuICBtZW51T3B0aW9uczogWydhYm91dCcsJ3dvcmsnLCdzZXJ2aWNlcycsJ2NvbnRhY3QnXVxuICBtZW51U3dpcGluZzogZmFsc2VcblxuICBpOiAtPlxuXG4gICAgSW5kZXguaGFuZGxlcnMoKVxuXG4gIGhhbmRsZXJzOiAtPlxuXG5cbiAgICAkKCcubmF2Jykub24gJ2NsaWNrJywgSW5kZXgubmF2SGFuZGxlclxuICAgICQoJy5kb3RzID4gLmRvdCcpLm9uICdjbGljaycsIEluZGV4LmRvdEhhbmRsZXJcbiAgICAkKCcubWVudSA+IC5vcHRpb24nKS5vbiAnY2xpY2snLCBJbmRleC5tZW51SGFuZGxlclxuICAgICQoJy5zZWN0aW9uID4gLmxvZ28nKS5vbiAnY2xpY2snLCAtPlxuICAgICAgJCgnLm1lbnUgPiAub3B0aW9uLm9wdGlvbl9hYm91dCcpLnRyaWdnZXIgJ2NsaWNrJ1xuXG5cbiAgICAkKCcucHJvZF9jb250YWN0X2N0YScpLm9uICdjbGljaycsIEluZGV4LmNvbnRhY3RcblxuICAgICQoZG9jdW1lbnQpLm9uICd0b3VjaG1vdmUnLCAtPlxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG4gICAgRGV0ZWN0LmhhbmRsZXIgSW5kZXgubmF2aWdhdGVcbiAgICAkKCcuY29udGVudCA+IC5pbm5lciA+IC50YXBzcGFjZScpLnN3aXBlXG4gICAgICBzd2lwZTogKGV2ZW50LCBkaXJlY3Rpb24sIGRpc3RhbmNlLCBkdXJhdGlvbiwgZmluZ2VyQ291bnQpIC0+XG4gICAgICAgICMjI1xuICAgICAgICBkaXJlY3Rpb24gID0gJ2Rvd24nIGlmIGRpcmVjdGlvbiBpcyAndXAnXG4gICAgICAgIGRpcmVjdGlvbiAgPSAndXAnIGlmIGRpcmVjdGlvbiBpcyAnZG93bidcbiAgICAgICAgZGlyZWN0aW9uICA9ICdsZWZ0JyBpZiBkaXJlY3Rpb24gaXMgJ3JpZ2h0J1xuICAgICAgICBkaXJlY3Rpb24gID0gJ3JpZ2h0JyBpZiBkaXJlY3Rpb24gaXMgJ2xlZnQnXG4gICAgICAgICMjI1xuICAgICAgICAkKCcuZGVidWcnKS5hcHBlbmQoJzE6IHN3aXBlOiAnICsgZGlyZWN0aW9uICsgJzxiciAvPiAnKVxuICAgICAgICBJbmRleC5uYXZpZ2F0ZSBkaXJlY3Rpb25cbiAgICAgICAgcmV0dXJuXG4gICAgICB0YXA6IChldmVudCwgdGFyZ2V0KSAtPlxuICAgICAgICBjb25zb2xlLmxvZyAndGFwJ1xuICAgICAgY2xpY2s6IChldmVudCwgdGFyZ2V0KSAtPlxuICAgICAgICBjb25zb2xlLmxvZyAnY2xpY2snXG4gICAgICB0aHJlc2hvbGQ6IDBcblxuXG4gIGNvbnRhY3Q6IC0+XG4gICAgJCgnLm1lbnUgPiAub3B0aW9uLm9wdGlvbl9jb250YWN0JykudHJpZ2dlciAnY2xpY2snXG5cbiAgbWVudUhhbmRsZXI6IC0+XG4gICAgcmV0dXJuIHRydWUgaWYgSW5kZXgubWVudVN3aXBpbmcgaXMgdHJ1ZVxuICAgIEluZGV4Lm1lbnVTd2lwaW5nID0gdHJ1ZVxuXG4gICAgY3VycmVudCA9ICQodGhpcykuZGF0YSAnb3B0aW9uJ1xuICAgIG51bSA9ICQodGhpcykuZGF0YSAnbnVtJ1xuXG4gICAgaWYgJChcIi5vcHRpb25fI3tjdXJyZW50fVwiKS5oYXNDbGFzcyAnb24nXG4gICAgICBJbmRleC5tZW51U3dpcGluZyA9IGZhbHNlXG4gICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgXy5vZmYgJy5tZW51ID4gLm9wdGlvbidcbiAgICBfLm9uIFwiLm9wdGlvbl8je2N1cnJlbnR9XCJcblxuICAgIGZvciBvcHRpb24gaW4gSW5kZXgubWVudU9wdGlvbnNcbiAgICAgICQoJy5zd2lwZXInKS5yZW1vdmVDbGFzcyhcInN3aXBlcl8je29wdGlvbn1cIilcblxuICAgIGlmIG51bSA+IEluZGV4Lm1lbnVOdW0gdGhlbiBkaXIgPSAncmlnaHQnIGVsc2UgZGlyID0gJ2xlZnQnXG4gICAgSW5kZXgubWVudU51bSA9IG51bVxuXG4gICAgJChcIi5zd2lwZXIuI3tkaXJ9XCIpLmFkZENsYXNzKFwic3dpcGVyXyN7Y3VycmVudH1cIilcbiAgICBfLm9uIFwiLnN3aXBlci4je2Rpcn1cIlxuICAgIHNldFRpbWVvdXQgLT5cbiAgICAgIF8ub2ZmIFwiLnN3aXBlci4je2Rpcn1cIlxuICAgICAgSW5kZXgubWVudVN3aXBpbmcgPSBmYWxzZVxuICAgICwgNzUwXG5cbiAgICBzZXRUaW1lb3V0IC0+XG4gICAgICBfLm9mZiAnLnNlY3Rpb24nXG4gICAgICBpZiBjdXJyZW50IGlzbnQgJ2Fib3V0J1xuICAgICAgICBfLm9uIFwiLnNlY3Rpb24uI3tjdXJyZW50fVwiXG4gICAgLCAzMDBcblxuICBuYXZIYW5kbGVyOiAtPlxuXG4gICAgcmV0dXJuIHRydWUgaWYgSW5kZXgucGF1c2VkXG4gICAgdCA9ICQodGhpcylcblxuICAgIHByZXZpb3VzID0gdC5kYXRhICdmcm9tJ1xuICAgIGN1cnJlbnQgPSB0LmRhdGEgJ3RvJ1xuICAgIGRpcmVjdGlvbiA9IHQuZGF0YSAnZGlyJ1xuXG4gICAgSW5kZXgudHJhbnNpdChwcmV2aW91cywgY3VycmVudCwgZGlyZWN0aW9uKVxuXG4gICAgSW5kZXgucGF1c2VkID0gdHJ1ZVxuICAgIHNldFRpbWVvdXQgLT5cbiAgICAgIEluZGV4LnBhdXNlZCA9IGZhbHNlXG4gICAgLEluZGV4LnRpbWVvdXRcblxuXG4gIGRvdEhhbmRsZXI6IC0+XG5cbiAgICByZXR1cm4gdHJ1ZSBpZiBJbmRleC5wYXVzZWRcblxuICAgIHByZXZpb3VzID0gJCgnLmRvdHMgLmRvdC5vbicpLmRhdGEgJ3NlY3QnXG4gICAgcG51bSA9ICQoJy5kb3RzIC5kb3Qub24nKS5kYXRhICdudW0nXG4gICAgY3VycmVudCA9ICQodGhpcykuZGF0YSAnc2VjdCdcbiAgICBjbnVtID0gJCh0aGlzKS5kYXRhICdudW0nXG5cbiAgICBpZiBjbnVtID4gcG51bSB0aGVuIGRpcmVjdGlvbiA9ICdkb3duJyBlbHNlIGRpcmVjdGlvbiA9ICd1cCdcblxuICAgIEluZGV4LnRyYW5zaXQgcHJldmlvdXMsIGN1cnJlbnQsIGRpcmVjdGlvblxuXG4gICAgSW5kZXgucGF1c2VkID0gdHJ1ZVxuICAgIEluZGV4LmN1cnJlbnQgPSBjbnVtXG4gICAgc2V0VGltZW91dCAtPlxuICAgICAgSW5kZXgucGF1c2VkID0gZmFsc2VcbiAgICAsIEluZGV4LnRpbWVvdXRcblxuICBuYXZpZ2F0ZTogKGRpcmVjdGlvbikgLT5cblxuICAgIHJldHVybiB0cnVlIGlmICQoJy5tZW51ID4gLm9wdGlvbi5vcHRpb25fY29udGFjdCcpLmhhc0NsYXNzKCdvbicpXG4gICAgcmV0dXJuIHRydWUgaWYgJCgnLm1lbnUgPiAub3B0aW9uLm9wdGlvbl9zZXJ2aWNlcycpLmhhc0NsYXNzKCdvbicpXG4gICAgcmV0dXJuIHRydWUgaWYgJCgnLm1lbnUgPiAub3B0aW9uLm9wdGlvbl93b3JrJykuaGFzQ2xhc3MoJ29uJylcblxuICAgIHJldHVybiB0cnVlIGlmIEluZGV4LnBhdXNlZFxuXG4gICAgcHJldmlvdXMgPSBJbmRleC5uYXZbSW5kZXguY3VycmVudF1cblxuXG4gICAgaWYgZGlyZWN0aW9uIGlzICd1cCcgb3IgZGlyZWN0aW9uIGlzICdsZWZ0J1xuICAgICAgaWYgKEluZGV4LmN1cnJlbnQgPT0gKEluZGV4Lm5hdi5sZW5ndGgtMSkpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICNJbmRleC5jdXJyZW50ID0gMFxuICAgICAgZWxzZVxuICAgICAgICBJbmRleC5jdXJyZW50KytcblxuICAgIGlmIGRpcmVjdGlvbiBpcyAnZG93bicgb3IgZGlyZWN0aW9uIGlzICdyaWdodCdcbiAgICAgIGlmIChJbmRleC5jdXJyZW50ID09IDApXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICNJbmRleC5jdXJyZW50ID0gSW5kZXgubmF2Lmxlbmd0aC0xXG4gICAgICBlbHNlXG4gICAgICAgIEluZGV4LmN1cnJlbnQtLVxuXG4gICAgY3VycmVudCA9IEluZGV4Lm5hdltJbmRleC5jdXJyZW50XVxuXG4gICAgSW5kZXgudHJhbnNpdChwcmV2aW91cywgY3VycmVudCwgZGlyZWN0aW9uKVxuXG4gICAgSW5kZXgucGF1c2VkID0gdHJ1ZVxuICAgIHNldFRpbWVvdXQgLT5cbiAgICAgIEluZGV4LnBhdXNlZCA9IGZhbHNlXG4gICAgLCBJbmRleC50aW1lb3V0XG5cbiAgdHJhbnNpdDogKHByZXZpb3VzLCBjdXJyZW50LCBkaXJlY3Rpb24pIC0+XG5cbiAgICByZXR1cm4gdHJ1ZSBpZiBwcmV2aW91cyBpcyB1bmRlZmluZWRcblxuICAgIGlmIGN1cnJlbnQgaXNudCAnZGVmaW5lcnknIHRoZW4gXy5vbiAnLmFycm93LnVwJyBlbHNlIF8ub2ZmICcuYXJyb3cudXAnXG5cbiAgICAjIGkgd2lsbCBjaGVzdGJ1bXAgbXkgbW9uaXRvciBpZiB0aGlzIHdvcmtzXG4gICAgc2V0VGltZW91dCAtPlxuICAgICAgJCgnbWV0YVtuYW1lPXRoZW1lLWNvbG9yXScpLnJlbW92ZSgpXG4gICAgICAkKCdoZWFkJykuYXBwZW5kKCc8bWV0YSBuYW1lPVwidGhlbWUtY29sb3JcIiBjb250ZW50PVwiJyArIEluZGV4LmNvbG9yc1tjdXJyZW50XSArICdcIj4nKVxuICAgICwgNTAwXG5cbiAgICBmb3Igc2VjdCBpbiBJbmRleC5uYXZcbiAgICAgIGlmIHNlY3QgaXNudCBjdXJyZW50XG4gICAgICAgICQoJy5jb2xvcnMgLnN2ZycpLnJlbW92ZUNsYXNzIFwic3Rhcl8je3NlY3R9XCJcbiAgICAgICAgJCgnLmJvcmRlcicpLnJlbW92ZUNsYXNzIHNlY3RcbiAgICAgICAgJCgnLmJnY29sb3InKS5yZW1vdmVDbGFzcyBzZWN0XG5cbiAgICAkKCcuY29sb3JzIC5zdmcnKS5hZGRDbGFzcyBcInN0YXJfI3tjdXJyZW50fVwiXG4gICAgJCgnLmJvcmRlcicpLmFkZENsYXNzIGN1cnJlbnRcbiAgICAkKCcuYmdjb2xvcicpLmFkZENsYXNzIGN1cnJlbnRcblxuICAgIGlmIGRpcmVjdGlvbiBpcyAndXAnIG9yIGRpcmVjdGlvbiBpcyAnbGVmdCdcblxuICAgICAgXy5vbiBcIi5iYWNrZ3JvdW5kLiN7Y3VycmVudH1cIlxuICAgICAgJChcIi5iYWNrZ3JvdW5kLiN7Y3VycmVudH1cIikuYWRkQ2xhc3MgJ2luRnJvbUJvdHRvbSdcbiAgICAgICQoXCIuYmFja2dyb3VuZC4je3ByZXZpb3VzfVwiKS5hZGRDbGFzcyAnb3V0VG9Ub3AnXG5cbiAgICAgIF8ub24gXCIuY29udGVudC4je2N1cnJlbnR9XCJcbiAgICAgICQoXCIuY29udGVudC4je2N1cnJlbnR9XCIpLmFkZENsYXNzICdjSW5Gcm9tQm90dG9tJ1xuICAgICAgJChcIi5jb250ZW50LiN7cHJldmlvdXN9XCIpLmFkZENsYXNzICdjT3V0VG9Ub3AnXG5cbiAgICAgIHNldFRpbWVvdXQgLT5cblxuICAgICAgICAkKFwiLmJhY2tncm91bmQuI3tjdXJyZW50fVwiKS5yZW1vdmVDbGFzcyAnaW5Gcm9tQm90dG9tJ1xuICAgICAgICAkKFwiLmJhY2tncm91bmQuI3twcmV2aW91c31cIikucmVtb3ZlQ2xhc3MgJ291dFRvVG9wJ1xuXG4gICAgICAgICQoXCIuY29udGVudC4je2N1cnJlbnR9XCIpLnJlbW92ZUNsYXNzICdjSW5Gcm9tQm90dG9tJ1xuICAgICAgICAkKFwiLmNvbnRlbnQuI3twcmV2aW91c31cIikucmVtb3ZlQ2xhc3MgJ2NPdXRUb1RvcCdcblxuICAgICAgICBmb3Igc2VjdCBpbiBJbmRleC5uYXZcbiAgICAgICAgICBpZiBzZWN0IGlzbnQgY3VycmVudFxuICAgICAgICAgICAgXy5vZmYgXCIuYmFja2dyb3VuZC4je3NlY3R9XCJcbiAgICAgICAgICAgIF8ub2ZmIFwiLmNvbnRlbnQuI3tzZWN0fVwiXG5cbiAgICAgICwgMTAwMFxuXG4gICAgaWYgZGlyZWN0aW9uIGlzICdkb3duJyBvciBkaXJlY3Rpb24gaXMgJ3JpZ2h0J1xuXG4gICAgICBfLm9uIFwiLmJhY2tncm91bmQuI3tjdXJyZW50fVwiXG4gICAgICAkKFwiLmJhY2tncm91bmQuI3tjdXJyZW50fVwiKS5hZGRDbGFzcyAnaW5Gcm9tVG9wJ1xuICAgICAgJChcIi5iYWNrZ3JvdW5kLiN7cHJldmlvdXN9XCIpLmFkZENsYXNzICdvdXRUb0JvdHRvbSdcblxuICAgICAgXy5vbiBcIi5jb250ZW50LiN7Y3VycmVudH1cIlxuICAgICAgJChcIi5jb250ZW50LiN7Y3VycmVudH1cIikuYWRkQ2xhc3MgJ2NJbkZyb21Ub3AnXG4gICAgICAkKFwiLmNvbnRlbnQuI3twcmV2aW91c31cIikuYWRkQ2xhc3MgJ2NPdXRUb0JvdHRvbSdcblxuICAgICAgc2V0VGltZW91dCAtPlxuXG4gICAgICAgICQoXCIuYmFja2dyb3VuZC4je3ByZXZpb3VzfVwiKS5yZW1vdmVDbGFzcyAnb3V0VG9Cb3R0b20nXG4gICAgICAgICQoXCIuYmFja2dyb3VuZC4je2N1cnJlbnR9XCIpLnJlbW92ZUNsYXNzICdpbkZyb21Ub3AnXG5cbiAgICAgICAgJChcIi5jb250ZW50LiN7cHJldmlvdXN9XCIpLnJlbW92ZUNsYXNzICdjT3V0VG9Cb3R0b20nXG4gICAgICAgICQoXCIuY29udGVudC4je2N1cnJlbnR9XCIpLnJlbW92ZUNsYXNzICdjSW5Gcm9tVG9wJ1xuXG4gICAgICAgIGZvciBzZWN0IGluIEluZGV4Lm5hdlxuICAgICAgICAgIGlmIHNlY3QgaXNudCBjdXJyZW50XG4gICAgICAgICAgICBfLm9mZiBcIi5iYWNrZ3JvdW5kLiN7c2VjdH1cIlxuICAgICAgICAgICAgXy5vZmYgXCIuY29udGVudC4je3NlY3R9XCJcblxuICAgICAgLCAxMDAwXG5cbiAgICBfLm9mZiAnLmRvdHMgPiAuZG90J1xuICAgIF8ub24gXCIuZG90cyA+IC5kb3QuZG90XyN7Y3VycmVudH1cIlxuXG4gICAgdGwgPSBuZXcgVGltZWxpbmVNYXgoe3JlcGVhdDogMH0pXG4gICAgdGxcbiAgICAgIC50byhcIi5kMVwiLCAwLjgsIHttb3JwaFNWRzogXCIuI3tjdXJyZW50fTFcIiwgZWFzZTpQb3dlcjMuZWFzZUluT3V0fSwgJy09MC44JylcbiAgICAgIC50byhcIi5kMlwiLCAwLjgsIHttb3JwaFNWRzogXCIuI3tjdXJyZW50fTJcIiwgZWFzZTpQb3dlcjMuZWFzZUluT3V0fSwgJy09MC44JylcbiAgICAgIC50byhcIi5kM1wiLCAwLjgsIHttb3JwaFNWRzogXCIuI3tjdXJyZW50fTNcIiwgZWFzZTpQb3dlcjMuZWFzZUluT3V0fSwgJy09MC44JylcblxuXG4iXX0=
