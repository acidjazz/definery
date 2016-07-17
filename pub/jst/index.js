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
    Detect.handler(Index.navigate);
    $('.nav').on('click', Index.navHandler);
    $('.dots > .dot').on('click', Index.dotHandler);
    $('.menu > .option').on('click', Index.menuHandler);
    $('.contact_cta').on('click', Index.contact);
    $('.blend-multiply').on('touchmove', function() {
      return event.preventDefault();
    });
    return window.onresize = function() {
      return document.location.reload(true);
    };
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
    if ($(this).hasClass('on')) {
      Index.menuSwiping = false;
      return true;
    }
    _.off('.menu > .option');
    _.on(this);
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
    if (direction === 'down' || direction === 'right') {
      if (Index.current === (Index.nav.length - 1)) {
        return true;
      } else {
        Index.current++;
      }
    }
    if (direction === 'up' || direction === 'left') {
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
    if (direction === 'down' || direction === 'right') {
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
    if (direction === 'up' || direction === 'left') {
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

//# sourceMappingURL=data:application/json;base64,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QUFyQjt5QkFDQSxDQUFDLENBQUMsR0FBRixDQUFNLFdBQUEsR0FBWSxJQUFsQixHQUZGO1dBQUEsTUFBQTtpQ0FBQTs7QUFERjs7TUFSUyxDQUFYLEVBYUUsSUFiRixFQVZGOztJQXlCQSxDQUFDLENBQUMsR0FBRixDQUFNLGNBQU47SUFDQSxDQUFDLENBQUMsRUFBRixDQUFLLG1CQUFBLEdBQW9CLE9BQXpCO0lBRUEsRUFBQSxHQUFTLElBQUEsV0FBQSxDQUFZO01BQUMsTUFBQSxFQUFRLENBQVQ7S0FBWjtXQUNULEVBQ0UsQ0FBQyxFQURILENBQ00sS0FETixFQUNhLEdBRGIsRUFDa0I7TUFBQyxRQUFBLEVBQVUsR0FBQSxHQUFJLE9BQUosR0FBWSxHQUF2QjtNQUEyQixJQUFBLEVBQUssTUFBTSxDQUFDLFNBQXZDO0tBRGxCLEVBQ3FFLE9BRHJFLENBRUUsQ0FBQyxFQUZILENBRU0sS0FGTixFQUVhLEdBRmIsRUFFa0I7TUFBQyxRQUFBLEVBQVUsR0FBQSxHQUFJLE9BQUosR0FBWSxHQUF2QjtNQUEyQixJQUFBLEVBQUssTUFBTSxDQUFDLFNBQXZDO0tBRmxCLEVBRXFFLE9BRnJFLENBR0UsQ0FBQyxFQUhILENBR00sS0FITixFQUdhLEdBSGIsRUFHa0I7TUFBQyxRQUFBLEVBQVUsR0FBQSxHQUFJLE9BQUosR0FBWSxHQUF2QjtNQUEyQixJQUFBLEVBQUssTUFBTSxDQUFDLFNBQXZDO0tBSGxCLEVBR3FFLE9BSHJFO0VBNUVPLENBN0lUIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiSW5kZXggPVxuXG4gIG5hdjogWydkZWZpbmVyeScsJ2l0ZXJhdGUnLCAnbmF2aWdhdGUnLCAncHJvZHVjdCddXG4gIHRpbWVvdXQ6IDEwMDBcbiAgcGF1c2VkOiBmYWxzZVxuXG4gIHRsOiBmYWxzZVxuXG4gIGNvbG9yczpcbiAgICAnZGVmaW5lcnknOiBkYXRhLmNvbG9yLnRlYWwxXG4gICAgJ2l0ZXJhdGUnOiBkYXRhLmNvbG9yLmJsdWUxXG4gICAgJ25hdmlnYXRlJzogZGF0YS5jb2xvci5ncmVlbjFcbiAgICAncHJvZHVjdCc6IGRhdGEuY29sb3IucGluazFcblxuICBjdXJyZW50OiAwXG5cbiAgbWVudU51bTogMVxuICBtZW51T3B0aW9uczogWydhYm91dCcsJ3dvcmsnLCdzZXJ2aWNlcycsJ2NvbnRhY3QnXVxuICBtZW51U3dpcGluZzogZmFsc2VcblxuICBpOiAtPlxuXG4gICAgSW5kZXguaGFuZGxlcnMoKVxuXG4gIGhhbmRsZXJzOiAtPlxuXG4gICAgRGV0ZWN0LmhhbmRsZXIgSW5kZXgubmF2aWdhdGVcblxuICAgICQoJy5uYXYnKS5vbiAnY2xpY2snLCBJbmRleC5uYXZIYW5kbGVyXG4gICAgJCgnLmRvdHMgPiAuZG90Jykub24gJ2NsaWNrJywgSW5kZXguZG90SGFuZGxlclxuICAgICQoJy5tZW51ID4gLm9wdGlvbicpLm9uICdjbGljaycsIEluZGV4Lm1lbnVIYW5kbGVyXG4gICAgJCgnLmNvbnRhY3RfY3RhJykub24gJ2NsaWNrJywgSW5kZXguY29udGFjdFxuICAgICQoJy5ibGVuZC1tdWx0aXBseScpLm9uICd0b3VjaG1vdmUnLCAtPlxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG4gICAgd2luZG93Lm9ucmVzaXplID0gLT5cbiAgICAgIGRvY3VtZW50LmxvY2F0aW9uLnJlbG9hZCB0cnVlXG5cbiAgY29udGFjdDogLT5cbiAgICAkKCcubWVudSA+IC5vcHRpb24ub3B0aW9uX2NvbnRhY3QnKS50cmlnZ2VyICdjbGljaydcbiAgbWVudUhhbmRsZXI6IC0+XG5cbiAgICByZXR1cm4gdHJ1ZSBpZiBJbmRleC5tZW51U3dpcGluZyBpcyB0cnVlXG4gICAgSW5kZXgubWVudVN3aXBpbmcgPSB0cnVlXG5cbiAgICBjdXJyZW50ID0gJCh0aGlzKS5kYXRhICdvcHRpb24nXG4gICAgbnVtID0gJCh0aGlzKS5kYXRhICdudW0nXG5cbiAgICBpZiAkKHRoaXMpLmhhc0NsYXNzICdvbidcbiAgICAgIEluZGV4Lm1lbnVTd2lwaW5nID0gZmFsc2VcbiAgICAgIHJldHVybiB0cnVlXG5cbiAgICBfLm9mZiAnLm1lbnUgPiAub3B0aW9uJ1xuICAgIF8ub24gdGhpc1xuXG4gICAgZm9yIG9wdGlvbiBpbiBJbmRleC5tZW51T3B0aW9uc1xuICAgICAgJCgnLnN3aXBlcicpLnJlbW92ZUNsYXNzKFwic3dpcGVyXyN7b3B0aW9ufVwiKVxuXG4gICAgaWYgbnVtID4gSW5kZXgubWVudU51bSB0aGVuIGRpciA9ICdyaWdodCcgZWxzZSBkaXIgPSAnbGVmdCdcbiAgICBJbmRleC5tZW51TnVtID0gbnVtXG5cbiAgICAkKFwiLnN3aXBlci4je2Rpcn1cIikuYWRkQ2xhc3MoXCJzd2lwZXJfI3tjdXJyZW50fVwiKVxuICAgIF8ub24gXCIuc3dpcGVyLiN7ZGlyfVwiXG4gICAgc2V0VGltZW91dCAtPlxuICAgICAgXy5vZmYgXCIuc3dpcGVyLiN7ZGlyfVwiXG4gICAgICBJbmRleC5tZW51U3dpcGluZyA9IGZhbHNlXG4gICAgLCA3NTBcblxuICAgIHNldFRpbWVvdXQgLT5cbiAgICAgIF8ub2ZmICcuc2VjdGlvbidcbiAgICAgIGlmIGN1cnJlbnQgaXNudCAnYWJvdXQnXG4gICAgICAgIF8ub24gXCIuc2VjdGlvbi4je2N1cnJlbnR9XCJcbiAgICAsIDMwMFxuXG4gIG5hdkhhbmRsZXI6IC0+XG5cbiAgICByZXR1cm4gdHJ1ZSBpZiBJbmRleC5wYXVzZWRcbiAgICB0ID0gJCh0aGlzKVxuXG4gICAgcHJldmlvdXMgPSB0LmRhdGEgJ2Zyb20nXG4gICAgY3VycmVudCA9IHQuZGF0YSAndG8nXG4gICAgZGlyZWN0aW9uID0gdC5kYXRhICdkaXInXG5cbiAgICBJbmRleC50cmFuc2l0KHByZXZpb3VzLCBjdXJyZW50LCBkaXJlY3Rpb24pXG5cbiAgICBJbmRleC5wYXVzZWQgPSB0cnVlXG4gICAgc2V0VGltZW91dCAtPlxuICAgICAgSW5kZXgucGF1c2VkID0gZmFsc2VcbiAgICAsSW5kZXgudGltZW91dFxuXG5cbiAgZG90SGFuZGxlcjogLT5cblxuICAgIHJldHVybiB0cnVlIGlmIEluZGV4LnBhdXNlZFxuXG4gICAgcHJldmlvdXMgPSAkKCcuZG90cyAuZG90Lm9uJykuZGF0YSAnc2VjdCdcbiAgICBwbnVtID0gJCgnLmRvdHMgLmRvdC5vbicpLmRhdGEgJ251bSdcbiAgICBjdXJyZW50ID0gJCh0aGlzKS5kYXRhICdzZWN0J1xuICAgIGNudW0gPSAkKHRoaXMpLmRhdGEgJ251bSdcblxuICAgIGlmIGNudW0gPiBwbnVtIHRoZW4gZGlyZWN0aW9uID0gJ2Rvd24nIGVsc2UgZGlyZWN0aW9uID0gJ3VwJ1xuXG4gICAgSW5kZXgudHJhbnNpdCBwcmV2aW91cywgY3VycmVudCwgZGlyZWN0aW9uXG5cbiAgICBJbmRleC5wYXVzZWQgPSB0cnVlXG4gICAgSW5kZXguY3VycmVudCA9IGNudW1cbiAgICBzZXRUaW1lb3V0IC0+XG4gICAgICBJbmRleC5wYXVzZWQgPSBmYWxzZVxuICAgICwgSW5kZXgudGltZW91dFxuXG4gIG5hdmlnYXRlOiAoZGlyZWN0aW9uKSAtPlxuXG4gICAgcmV0dXJuIHRydWUgaWYgJCgnLm1lbnUgPiAub3B0aW9uLm9wdGlvbl9jb250YWN0JykuaGFzQ2xhc3MoJ29uJylcbiAgICByZXR1cm4gdHJ1ZSBpZiAkKCcubWVudSA+IC5vcHRpb24ub3B0aW9uX3NlcnZpY2VzJykuaGFzQ2xhc3MoJ29uJylcbiAgICByZXR1cm4gdHJ1ZSBpZiAkKCcubWVudSA+IC5vcHRpb24ub3B0aW9uX3dvcmsnKS5oYXNDbGFzcygnb24nKVxuXG4gICAgcmV0dXJuIHRydWUgaWYgSW5kZXgucGF1c2VkXG5cbiAgICBwcmV2aW91cyA9IEluZGV4Lm5hdltJbmRleC5jdXJyZW50XVxuXG4gICAgaWYgZGlyZWN0aW9uIGlzICdkb3duJyBvciBkaXJlY3Rpb24gaXMgJ3JpZ2h0J1xuICAgICAgaWYgKEluZGV4LmN1cnJlbnQgPT0gKEluZGV4Lm5hdi5sZW5ndGgtMSkpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICNJbmRleC5jdXJyZW50ID0gMFxuICAgICAgZWxzZVxuICAgICAgICBJbmRleC5jdXJyZW50KytcblxuICAgIGlmIGRpcmVjdGlvbiBpcyAndXAnIG9yIGRpcmVjdGlvbiBpcyAnbGVmdCdcbiAgICAgIGlmIChJbmRleC5jdXJyZW50ID09IDApXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICNJbmRleC5jdXJyZW50ID0gSW5kZXgubmF2Lmxlbmd0aC0xXG4gICAgICBlbHNlXG4gICAgICAgIEluZGV4LmN1cnJlbnQtLVxuXG4gICAgY3VycmVudCA9IEluZGV4Lm5hdltJbmRleC5jdXJyZW50XVxuXG4gICAgSW5kZXgudHJhbnNpdChwcmV2aW91cywgY3VycmVudCwgZGlyZWN0aW9uKVxuXG4gICAgSW5kZXgucGF1c2VkID0gdHJ1ZVxuICAgIHNldFRpbWVvdXQgLT5cbiAgICAgIEluZGV4LnBhdXNlZCA9IGZhbHNlXG4gICAgLCBJbmRleC50aW1lb3V0XG5cbiAgdHJhbnNpdDogKHByZXZpb3VzLCBjdXJyZW50LCBkaXJlY3Rpb24pIC0+XG5cbiAgICByZXR1cm4gdHJ1ZSBpZiBwcmV2aW91cyBpcyB1bmRlZmluZWRcblxuICAgIGlmIGN1cnJlbnQgaXNudCAnZGVmaW5lcnknIHRoZW4gXy5vbiAnLmFycm93LnVwJyBlbHNlIF8ub2ZmICcuYXJyb3cudXAnXG5cbiAgICAjIGkgd2lsbCBjaGVzdGJ1bXAgbXkgbW9uaXRvciBpZiB0aGlzIHdvcmtzXG4gICAgc2V0VGltZW91dCAtPlxuICAgICAgJCgnbWV0YVtuYW1lPXRoZW1lLWNvbG9yXScpLnJlbW92ZSgpXG4gICAgICAkKCdoZWFkJykuYXBwZW5kKCc8bWV0YSBuYW1lPVwidGhlbWUtY29sb3JcIiBjb250ZW50PVwiJyArIEluZGV4LmNvbG9yc1tjdXJyZW50XSArICdcIj4nKVxuICAgICwgNTAwXG5cbiAgICBmb3Igc2VjdCBpbiBJbmRleC5uYXZcbiAgICAgIGlmIHNlY3QgaXNudCBjdXJyZW50XG4gICAgICAgICQoJy5jb2xvcnMgLnN2ZycpLnJlbW92ZUNsYXNzIFwic3Rhcl8je3NlY3R9XCJcbiAgICAgICAgJCgnLmJvcmRlcicpLnJlbW92ZUNsYXNzIHNlY3RcbiAgICAgICAgJCgnLmJnY29sb3InKS5yZW1vdmVDbGFzcyBzZWN0XG5cbiAgICAkKCcuY29sb3JzIC5zdmcnKS5hZGRDbGFzcyBcInN0YXJfI3tjdXJyZW50fVwiXG4gICAgJCgnLmJvcmRlcicpLmFkZENsYXNzIGN1cnJlbnRcbiAgICAkKCcuYmdjb2xvcicpLmFkZENsYXNzIGN1cnJlbnRcblxuICAgIGlmIGRpcmVjdGlvbiBpcyAnZG93bicgb3IgZGlyZWN0aW9uIGlzICdyaWdodCdcblxuICAgICAgXy5vbiBcIi5iYWNrZ3JvdW5kLiN7Y3VycmVudH1cIlxuICAgICAgJChcIi5iYWNrZ3JvdW5kLiN7Y3VycmVudH1cIikuYWRkQ2xhc3MgJ2luRnJvbUJvdHRvbSdcbiAgICAgICQoXCIuYmFja2dyb3VuZC4je3ByZXZpb3VzfVwiKS5hZGRDbGFzcyAnb3V0VG9Ub3AnXG5cbiAgICAgIF8ub24gXCIuY29udGVudC4je2N1cnJlbnR9XCJcbiAgICAgICQoXCIuY29udGVudC4je2N1cnJlbnR9XCIpLmFkZENsYXNzICdjSW5Gcm9tQm90dG9tJ1xuICAgICAgJChcIi5jb250ZW50LiN7cHJldmlvdXN9XCIpLmFkZENsYXNzICdjT3V0VG9Ub3AnXG5cbiAgICAgIHNldFRpbWVvdXQgLT5cblxuICAgICAgICAkKFwiLmJhY2tncm91bmQuI3tjdXJyZW50fVwiKS5yZW1vdmVDbGFzcyAnaW5Gcm9tQm90dG9tJ1xuICAgICAgICAkKFwiLmJhY2tncm91bmQuI3twcmV2aW91c31cIikucmVtb3ZlQ2xhc3MgJ291dFRvVG9wJ1xuXG4gICAgICAgICQoXCIuY29udGVudC4je2N1cnJlbnR9XCIpLnJlbW92ZUNsYXNzICdjSW5Gcm9tQm90dG9tJ1xuICAgICAgICAkKFwiLmNvbnRlbnQuI3twcmV2aW91c31cIikucmVtb3ZlQ2xhc3MgJ2NPdXRUb1RvcCdcblxuICAgICAgICBmb3Igc2VjdCBpbiBJbmRleC5uYXZcbiAgICAgICAgICBpZiBzZWN0IGlzbnQgY3VycmVudFxuICAgICAgICAgICAgXy5vZmYgXCIuYmFja2dyb3VuZC4je3NlY3R9XCJcbiAgICAgICAgICAgIF8ub2ZmIFwiLmNvbnRlbnQuI3tzZWN0fVwiXG5cbiAgICAgICwgMTAwMFxuXG4gICAgaWYgZGlyZWN0aW9uIGlzICd1cCcgb3IgZGlyZWN0aW9uIGlzICdsZWZ0J1xuXG4gICAgICBfLm9uIFwiLmJhY2tncm91bmQuI3tjdXJyZW50fVwiXG4gICAgICAkKFwiLmJhY2tncm91bmQuI3tjdXJyZW50fVwiKS5hZGRDbGFzcyAnaW5Gcm9tVG9wJ1xuICAgICAgJChcIi5iYWNrZ3JvdW5kLiN7cHJldmlvdXN9XCIpLmFkZENsYXNzICdvdXRUb0JvdHRvbSdcblxuICAgICAgXy5vbiBcIi5jb250ZW50LiN7Y3VycmVudH1cIlxuICAgICAgJChcIi5jb250ZW50LiN7Y3VycmVudH1cIikuYWRkQ2xhc3MgJ2NJbkZyb21Ub3AnXG4gICAgICAkKFwiLmNvbnRlbnQuI3twcmV2aW91c31cIikuYWRkQ2xhc3MgJ2NPdXRUb0JvdHRvbSdcblxuICAgICAgc2V0VGltZW91dCAtPlxuXG4gICAgICAgICQoXCIuYmFja2dyb3VuZC4je3ByZXZpb3VzfVwiKS5yZW1vdmVDbGFzcyAnb3V0VG9Cb3R0b20nXG4gICAgICAgICQoXCIuYmFja2dyb3VuZC4je2N1cnJlbnR9XCIpLnJlbW92ZUNsYXNzICdpbkZyb21Ub3AnXG5cbiAgICAgICAgJChcIi5jb250ZW50LiN7cHJldmlvdXN9XCIpLnJlbW92ZUNsYXNzICdjT3V0VG9Cb3R0b20nXG4gICAgICAgICQoXCIuY29udGVudC4je2N1cnJlbnR9XCIpLnJlbW92ZUNsYXNzICdjSW5Gcm9tVG9wJ1xuXG4gICAgICAgIGZvciBzZWN0IGluIEluZGV4Lm5hdlxuICAgICAgICAgIGlmIHNlY3QgaXNudCBjdXJyZW50XG4gICAgICAgICAgICBfLm9mZiBcIi5iYWNrZ3JvdW5kLiN7c2VjdH1cIlxuICAgICAgICAgICAgXy5vZmYgXCIuY29udGVudC4je3NlY3R9XCJcblxuICAgICAgLCAxMDAwXG5cbiAgICBfLm9mZiAnLmRvdHMgPiAuZG90J1xuICAgIF8ub24gXCIuZG90cyA+IC5kb3QuZG90XyN7Y3VycmVudH1cIlxuXG4gICAgdGwgPSBuZXcgVGltZWxpbmVNYXgoe3JlcGVhdDogMH0pXG4gICAgdGxcbiAgICAgIC50byhcIi5kMVwiLCAwLjgsIHttb3JwaFNWRzogXCIuI3tjdXJyZW50fTFcIiwgZWFzZTpQb3dlcjMuZWFzZUluT3V0fSwgJy09MC44JylcbiAgICAgIC50byhcIi5kMlwiLCAwLjgsIHttb3JwaFNWRzogXCIuI3tjdXJyZW50fTJcIiwgZWFzZTpQb3dlcjMuZWFzZUluT3V0fSwgJy09MC44JylcbiAgICAgIC50byhcIi5kM1wiLCAwLjgsIHttb3JwaFNWRzogXCIuI3tjdXJyZW50fTNcIiwgZWFzZTpQb3dlcjMuZWFzZUluT3V0fSwgJy09MC44JylcblxuXG4iXX0=
