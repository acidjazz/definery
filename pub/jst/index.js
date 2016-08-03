var Index;

Index = {
  nav: ['definery', 'iterate', 'navigate', 'product'],
  timeout: 1000,
  transitTimeout: 1000,
  paused: false,
  currentSlide: false,
  tl: false,
  colors: {
    'definery': data.color.teal1,
    'iterate': data.color.blue1,
    'navigate': data.color.green1,
    'product': data.color.pink1
  },
  menucolors: {
    'about': data.color.teal1,
    'work': data.color.bblue,
    'services': data.color.bpink,
    'contact': data.color.bgreen
  },
  current: 0,
  menuNum: 1,
  menuOptions: ['about', 'work', 'services', 'contact'],
  menuSwiping: false,
  i: function() {
    Index.handlers();
    if (navigator.userAgent.toLowerCase().indexOf('android') > -1) {
      return Index.transitTimeout = 800;
    }
  },
  handlers: function() {
    $('.nav').on('click', Index.navHandler);
    $('.dots > .dot').on('click', Index.dotHandler);
    $('.menu > .option').on('click', Index.menuHandler);
    $('.section > .logo').on('click', function() {
      return $('.menu > .option.option_about').trigger('click');
    });
    $('.prod_contact_cta').on('click', Index.contact);
    Detect.handler(Index.navigate);
    return $('.content > .inner > .tapspace').swipe({
      swipe: function(event, direction, distance, duration, fingerCount) {

        /*
        direction  = 'down' if direction is 'up'
        direction  = 'up' if direction is 'down'
        direction  = 'left' if direction is 'right'
        direction  = 'right' if direction is 'left'
         */
        if (direction === null) {
          return true;
        }
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
    if (current === 'about') {
      Index.meta(Index.colors[Index.currentSlide], 200);
    } else {
      Index.meta(Index.menucolors[current], 200);
    }
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
    Index.navigate(direction);
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
      direction = 'up';
    } else {
      direction = 'down';
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
  meta: function(color, timeout) {
    return setTimeout(function() {
      $('meta[name=theme-color]').remove();
      return $('head').append('<meta name="theme-color" content="' + color + '">');
    }, timeout);
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
    Index.currentSlide = current;
    Index.meta(Index.colors[current], 500);
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
        var j, len1, ref1;
        ref1 = Index.nav;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          sect = ref1[j];
          if (sect !== current) {
            _.off(".background." + sect);
            _.off(".content." + sect);
          }
        }
        $(".background." + current).removeClass('inFromBottom');
        $(".background." + previous).removeClass('outToTop');
        $(".content." + current).removeClass('cInFromBottom');
        return $(".content." + previous).removeClass('cOutToTop');
      }, Index.transitTimeout);
    }
    if (direction === 'down' || direction === 'right') {
      _.on(".background." + current);
      $(".background." + current).addClass('inFromTop');
      $(".background." + previous).addClass('outToBottom');
      _.on(".content." + current);
      $(".content." + current).addClass('cInFromTop');
      $(".content." + previous).addClass('cOutToBottom');
      setTimeout(function() {
        var j, len1, ref1;
        ref1 = Index.nav;
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          sect = ref1[j];
          if (sect !== current) {
            _.off(".background." + sect);
            _.off(".content." + sect);
          }
        }
        $(".background." + previous).removeClass('outToBottom');
        $(".background." + current).removeClass('inFromTop');
        $(".content." + previous).removeClass('cOutToBottom');
        return $(".content." + current).removeClass('cInFromTop');
      }, Index.transitTimeout);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBOztBQUFBLEtBQUEsR0FFRTtFQUFBLEdBQUEsRUFBSyxDQUFDLFVBQUQsRUFBWSxTQUFaLEVBQXVCLFVBQXZCLEVBQW1DLFNBQW5DLENBQUw7RUFDQSxPQUFBLEVBQVMsSUFEVDtFQUVBLGNBQUEsRUFBZ0IsSUFGaEI7RUFHQSxNQUFBLEVBQVEsS0FIUjtFQUlBLFlBQUEsRUFBYyxLQUpkO0VBTUEsRUFBQSxFQUFJLEtBTko7RUFRQSxNQUFBLEVBQ0U7SUFBQSxVQUFBLEVBQVksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUF2QjtJQUNBLFNBQUEsRUFBVyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBRHRCO0lBRUEsVUFBQSxFQUFZLElBQUksQ0FBQyxLQUFLLENBQUMsTUFGdkI7SUFHQSxTQUFBLEVBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUh0QjtHQVRGO0VBY0EsVUFBQSxFQUNFO0lBQUEsT0FBQSxFQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBcEI7SUFDQSxNQUFBLEVBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQURuQjtJQUVBLFVBQUEsRUFBWSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBRnZCO0lBR0EsU0FBQSxFQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsTUFIdEI7R0FmRjtFQW9CQSxPQUFBLEVBQVMsQ0FwQlQ7RUFzQkEsT0FBQSxFQUFTLENBdEJUO0VBdUJBLFdBQUEsRUFBYSxDQUFDLE9BQUQsRUFBUyxNQUFULEVBQWdCLFVBQWhCLEVBQTJCLFNBQTNCLENBdkJiO0VBd0JBLFdBQUEsRUFBYSxLQXhCYjtFQTBCQSxDQUFBLEVBQUcsU0FBQTtJQUVELEtBQUssQ0FBQyxRQUFOLENBQUE7SUFFQSxJQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsV0FBcEIsQ0FBQSxDQUFpQyxDQUFDLE9BQWxDLENBQTBDLFNBQTFDLENBQUEsR0FBdUQsQ0FBQyxDQUEzRDthQUNFLEtBQUssQ0FBQyxjQUFOLEdBQXVCLElBRHpCOztFQUpDLENBMUJIO0VBa0NBLFFBQUEsRUFBVSxTQUFBO0lBRVIsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLEVBQVYsQ0FBYSxPQUFiLEVBQXNCLEtBQUssQ0FBQyxVQUE1QjtJQUNBLENBQUEsQ0FBRSxjQUFGLENBQWlCLENBQUMsRUFBbEIsQ0FBcUIsT0FBckIsRUFBOEIsS0FBSyxDQUFDLFVBQXBDO0lBQ0EsQ0FBQSxDQUFFLGlCQUFGLENBQW9CLENBQUMsRUFBckIsQ0FBd0IsT0FBeEIsRUFBaUMsS0FBSyxDQUFDLFdBQXZDO0lBQ0EsQ0FBQSxDQUFFLGtCQUFGLENBQXFCLENBQUMsRUFBdEIsQ0FBeUIsT0FBekIsRUFBa0MsU0FBQTthQUNoQyxDQUFBLENBQUUsOEJBQUYsQ0FBaUMsQ0FBQyxPQUFsQyxDQUEwQyxPQUExQztJQURnQyxDQUFsQztJQUlBLENBQUEsQ0FBRSxtQkFBRixDQUFzQixDQUFDLEVBQXZCLENBQTBCLE9BQTFCLEVBQW1DLEtBQUssQ0FBQyxPQUF6QztJQUtBLE1BQU0sQ0FBQyxPQUFQLENBQWUsS0FBSyxDQUFDLFFBQXJCO1dBQ0EsQ0FBQSxDQUFFLCtCQUFGLENBQWtDLENBQUMsS0FBbkMsQ0FDRTtNQUFBLEtBQUEsRUFBTyxTQUFDLEtBQUQsRUFBUSxTQUFSLEVBQW1CLFFBQW5CLEVBQTZCLFFBQTdCLEVBQXVDLFdBQXZDOztBQUNMOzs7Ozs7UUFNQSxJQUFlLFNBQUEsS0FBYSxJQUE1QjtBQUFBLGlCQUFPLEtBQVA7O1FBRUEsS0FBSyxDQUFDLFFBQU4sQ0FBZSxTQUFmO01BVEssQ0FBUDtNQVdBLEdBQUEsRUFBSyxTQUFDLEtBQUQsRUFBUSxNQUFSO2VBQ0gsT0FBTyxDQUFDLEdBQVIsQ0FBWSxLQUFaO01BREcsQ0FYTDtNQWFBLEtBQUEsRUFBTyxTQUFDLEtBQUQsRUFBUSxNQUFSO2VBQ0wsT0FBTyxDQUFDLEdBQVIsQ0FBWSxPQUFaO01BREssQ0FiUDtNQWVBLFNBQUEsRUFBVyxDQWZYO0tBREY7RUFmUSxDQWxDVjtFQW9FQSxPQUFBLEVBQVMsU0FBQTtXQUNQLENBQUEsQ0FBRSxnQ0FBRixDQUFtQyxDQUFDLE9BQXBDLENBQTRDLE9BQTVDO0VBRE8sQ0FwRVQ7RUF1RUEsV0FBQSxFQUFhLFNBQUE7QUFDWCxRQUFBO0lBQUEsSUFBZSxLQUFLLENBQUMsV0FBTixLQUFxQixJQUFwQztBQUFBLGFBQU8sS0FBUDs7SUFDQSxLQUFLLENBQUMsV0FBTixHQUFvQjtJQUVwQixPQUFBLEdBQVUsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLElBQVIsQ0FBYSxRQUFiO0lBQ1YsR0FBQSxHQUFNLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxJQUFSLENBQWEsS0FBYjtJQUVOLElBQUcsQ0FBQSxDQUFFLFVBQUEsR0FBVyxPQUFiLENBQXVCLENBQUMsUUFBeEIsQ0FBaUMsSUFBakMsQ0FBSDtNQUNFLEtBQUssQ0FBQyxXQUFOLEdBQW9CO0FBQ3BCLGFBQU8sS0FGVDs7SUFJQSxDQUFDLENBQUMsR0FBRixDQUFNLGlCQUFOO0lBQ0EsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxVQUFBLEdBQVcsT0FBaEI7SUFFQSxJQUFHLE9BQUEsS0FBVyxPQUFkO01BQ0UsS0FBSyxDQUFDLElBQU4sQ0FBVyxLQUFLLENBQUMsTUFBTyxDQUFBLEtBQUssQ0FBQyxZQUFOLENBQXhCLEVBQTZDLEdBQTdDLEVBREY7S0FBQSxNQUFBO01BR0UsS0FBSyxDQUFDLElBQU4sQ0FBVyxLQUFLLENBQUMsVUFBVyxDQUFBLE9BQUEsQ0FBNUIsRUFBc0MsR0FBdEMsRUFIRjs7QUFLQTtBQUFBLFNBQUEscUNBQUE7O01BQ0UsQ0FBQSxDQUFFLFNBQUYsQ0FBWSxDQUFDLFdBQWIsQ0FBeUIsU0FBQSxHQUFVLE1BQW5DO0FBREY7SUFHQSxJQUFHLEdBQUEsR0FBTSxLQUFLLENBQUMsT0FBZjtNQUE0QixHQUFBLEdBQU0sUUFBbEM7S0FBQSxNQUFBO01BQStDLEdBQUEsR0FBTSxPQUFyRDs7SUFDQSxLQUFLLENBQUMsT0FBTixHQUFnQjtJQUVoQixDQUFBLENBQUUsVUFBQSxHQUFXLEdBQWIsQ0FBbUIsQ0FBQyxRQUFwQixDQUE2QixTQUFBLEdBQVUsT0FBdkM7SUFDQSxDQUFDLENBQUMsRUFBRixDQUFLLFVBQUEsR0FBVyxHQUFoQjtJQUNBLFVBQUEsQ0FBVyxTQUFBO01BQ1QsQ0FBQyxDQUFDLEdBQUYsQ0FBTSxVQUFBLEdBQVcsR0FBakI7YUFDQSxLQUFLLENBQUMsV0FBTixHQUFvQjtJQUZYLENBQVgsRUFHRSxHQUhGO1dBS0EsVUFBQSxDQUFXLFNBQUE7TUFDVCxDQUFDLENBQUMsR0FBRixDQUFNLFVBQU47TUFDQSxJQUFHLE9BQUEsS0FBYSxPQUFoQjtlQUNFLENBQUMsQ0FBQyxFQUFGLENBQUssV0FBQSxHQUFZLE9BQWpCLEVBREY7O0lBRlMsQ0FBWCxFQUlFLEdBSkY7RUFoQ1csQ0F2RWI7RUE2R0EsVUFBQSxFQUFZLFNBQUE7QUFFVixRQUFBO0lBQUEsSUFBZSxLQUFLLENBQUMsTUFBckI7QUFBQSxhQUFPLEtBQVA7O0lBQ0EsQ0FBQSxHQUFJLENBQUEsQ0FBRSxJQUFGO0lBRUosUUFBQSxHQUFXLENBQUMsQ0FBQyxJQUFGLENBQU8sTUFBUDtJQUNYLE9BQUEsR0FBVSxDQUFDLENBQUMsSUFBRixDQUFPLElBQVA7SUFDVixTQUFBLEdBQVksQ0FBQyxDQUFDLElBQUYsQ0FBTyxLQUFQO0lBR1osS0FBSyxDQUFDLFFBQU4sQ0FBZSxTQUFmO0lBRUEsS0FBSyxDQUFDLE1BQU4sR0FBZTtXQUNmLFVBQUEsQ0FBVyxTQUFBO2FBQ1QsS0FBSyxDQUFDLE1BQU4sR0FBZTtJQUROLENBQVgsRUFFQyxLQUFLLENBQUMsT0FGUDtFQWJVLENBN0daO0VBK0hBLFVBQUEsRUFBWSxTQUFBO0FBRVYsUUFBQTtJQUFBLElBQWUsS0FBSyxDQUFDLE1BQXJCO0FBQUEsYUFBTyxLQUFQOztJQUVBLFFBQUEsR0FBVyxDQUFBLENBQUUsZUFBRixDQUFrQixDQUFDLElBQW5CLENBQXdCLE1BQXhCO0lBQ1gsSUFBQSxHQUFPLENBQUEsQ0FBRSxlQUFGLENBQWtCLENBQUMsSUFBbkIsQ0FBd0IsS0FBeEI7SUFDUCxPQUFBLEdBQVUsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLElBQVIsQ0FBYSxNQUFiO0lBQ1YsSUFBQSxHQUFPLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxJQUFSLENBQWEsS0FBYjtJQUVQLElBQUcsSUFBQSxHQUFPLElBQVY7TUFBb0IsU0FBQSxHQUFZLEtBQWhDO0tBQUEsTUFBQTtNQUEwQyxTQUFBLEdBQVksT0FBdEQ7O0lBRUEsS0FBSyxDQUFDLE9BQU4sQ0FBYyxRQUFkLEVBQXdCLE9BQXhCLEVBQWlDLFNBQWpDO0lBRUEsS0FBSyxDQUFDLE1BQU4sR0FBZTtJQUNmLEtBQUssQ0FBQyxPQUFOLEdBQWdCO1dBQ2hCLFVBQUEsQ0FBVyxTQUFBO2FBQ1QsS0FBSyxDQUFDLE1BQU4sR0FBZTtJQUROLENBQVgsRUFFRSxLQUFLLENBQUMsT0FGUjtFQWZVLENBL0haO0VBa0pBLFFBQUEsRUFBVSxTQUFDLFNBQUQ7QUFFUixRQUFBO0lBQUEsSUFBZSxDQUFBLENBQUUsZ0NBQUYsQ0FBbUMsQ0FBQyxRQUFwQyxDQUE2QyxJQUE3QyxDQUFmO0FBQUEsYUFBTyxLQUFQOztJQUNBLElBQWUsQ0FBQSxDQUFFLGlDQUFGLENBQW9DLENBQUMsUUFBckMsQ0FBOEMsSUFBOUMsQ0FBZjtBQUFBLGFBQU8sS0FBUDs7SUFDQSxJQUFlLENBQUEsQ0FBRSw2QkFBRixDQUFnQyxDQUFDLFFBQWpDLENBQTBDLElBQTFDLENBQWY7QUFBQSxhQUFPLEtBQVA7O0lBRUEsSUFBZSxLQUFLLENBQUMsTUFBckI7QUFBQSxhQUFPLEtBQVA7O0lBRUEsUUFBQSxHQUFXLEtBQUssQ0FBQyxHQUFJLENBQUEsS0FBSyxDQUFDLE9BQU47SUFFckIsSUFBRyxTQUFBLEtBQWEsSUFBYixJQUFxQixTQUFBLEtBQWEsTUFBckM7TUFDRSxJQUFJLEtBQUssQ0FBQyxPQUFOLEtBQWlCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFWLEdBQWlCLENBQWxCLENBQXJCO0FBQ0UsZUFBTyxLQURUO09BQUEsTUFBQTtRQUdFLEtBQUssQ0FBQyxPQUFOLEdBSEY7T0FERjs7SUFNQSxJQUFHLFNBQUEsS0FBYSxNQUFiLElBQXVCLFNBQUEsS0FBYSxPQUF2QztNQUNFLElBQUksS0FBSyxDQUFDLE9BQU4sS0FBaUIsQ0FBckI7QUFDRSxlQUFPLEtBRFQ7T0FBQSxNQUFBO1FBR0UsS0FBSyxDQUFDLE9BQU4sR0FIRjtPQURGOztJQU1BLE9BQUEsR0FBVSxLQUFLLENBQUMsR0FBSSxDQUFBLEtBQUssQ0FBQyxPQUFOO0lBRXBCLEtBQUssQ0FBQyxPQUFOLENBQWMsUUFBZCxFQUF3QixPQUF4QixFQUFpQyxTQUFqQztJQUVBLEtBQUssQ0FBQyxNQUFOLEdBQWU7V0FDZixVQUFBLENBQVcsU0FBQTthQUNULEtBQUssQ0FBQyxNQUFOLEdBQWU7SUFETixDQUFYLEVBRUUsS0FBSyxDQUFDLE9BRlI7RUEzQlEsQ0FsSlY7RUFpTEEsSUFBQSxFQUFNLFNBQUMsS0FBRCxFQUFRLE9BQVI7V0FDSixVQUFBLENBQVcsU0FBQTtNQUNULENBQUEsQ0FBRSx3QkFBRixDQUEyQixDQUFDLE1BQTVCLENBQUE7YUFDQSxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsTUFBVixDQUFpQixvQ0FBQSxHQUF1QyxLQUF2QyxHQUErQyxJQUFoRTtJQUZTLENBQVgsRUFHRSxPQUhGO0VBREksQ0FqTE47RUF1TEEsT0FBQSxFQUFTLFNBQUMsUUFBRCxFQUFXLE9BQVgsRUFBb0IsU0FBcEI7QUFFUCxRQUFBO0lBQUEsSUFBZSxRQUFBLEtBQVksTUFBM0I7QUFBQSxhQUFPLEtBQVA7O0lBRUEsSUFBRyxPQUFBLEtBQWEsVUFBaEI7TUFBZ0MsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxXQUFMLEVBQWhDO0tBQUEsTUFBQTtNQUFzRCxDQUFDLENBQUMsR0FBRixDQUFNLFdBQU4sRUFBdEQ7O0lBR0EsS0FBSyxDQUFDLFlBQU4sR0FBcUI7SUFDckIsS0FBSyxDQUFDLElBQU4sQ0FBVyxLQUFLLENBQUMsTUFBTyxDQUFBLE9BQUEsQ0FBeEIsRUFBa0MsR0FBbEM7QUFFQTtBQUFBLFNBQUEscUNBQUE7O01BQ0UsSUFBRyxJQUFBLEtBQVUsT0FBYjtRQUNFLENBQUEsQ0FBRSxjQUFGLENBQWlCLENBQUMsV0FBbEIsQ0FBOEIsT0FBQSxHQUFRLElBQXRDO1FBQ0EsQ0FBQSxDQUFFLFNBQUYsQ0FBWSxDQUFDLFdBQWIsQ0FBeUIsSUFBekI7UUFDQSxDQUFBLENBQUUsVUFBRixDQUFhLENBQUMsV0FBZCxDQUEwQixJQUExQixFQUhGOztBQURGO0lBTUEsQ0FBQSxDQUFFLGNBQUYsQ0FBaUIsQ0FBQyxRQUFsQixDQUEyQixPQUFBLEdBQVEsT0FBbkM7SUFDQSxDQUFBLENBQUUsU0FBRixDQUFZLENBQUMsUUFBYixDQUFzQixPQUF0QjtJQUNBLENBQUEsQ0FBRSxVQUFGLENBQWEsQ0FBQyxRQUFkLENBQXVCLE9BQXZCO0lBRUEsSUFBRyxTQUFBLEtBQWEsSUFBYixJQUFxQixTQUFBLEtBQWEsTUFBckM7TUFFRSxDQUFDLENBQUMsRUFBRixDQUFLLGNBQUEsR0FBZSxPQUFwQjtNQUNBLENBQUEsQ0FBRSxjQUFBLEdBQWUsT0FBakIsQ0FBMkIsQ0FBQyxRQUE1QixDQUFxQyxjQUFyQztNQUNBLENBQUEsQ0FBRSxjQUFBLEdBQWUsUUFBakIsQ0FBNEIsQ0FBQyxRQUE3QixDQUFzQyxVQUF0QztNQUVBLENBQUMsQ0FBQyxFQUFGLENBQUssV0FBQSxHQUFZLE9BQWpCO01BQ0EsQ0FBQSxDQUFFLFdBQUEsR0FBWSxPQUFkLENBQXdCLENBQUMsUUFBekIsQ0FBa0MsZUFBbEM7TUFDQSxDQUFBLENBQUUsV0FBQSxHQUFZLFFBQWQsQ0FBeUIsQ0FBQyxRQUExQixDQUFtQyxXQUFuQztNQUVBLFVBQUEsQ0FBVyxTQUFBO0FBRVQsWUFBQTtBQUFBO0FBQUEsYUFBQSx3Q0FBQTs7VUFDRSxJQUFHLElBQUEsS0FBVSxPQUFiO1lBQ0UsQ0FBQyxDQUFDLEdBQUYsQ0FBTSxjQUFBLEdBQWUsSUFBckI7WUFDQSxDQUFDLENBQUMsR0FBRixDQUFNLFdBQUEsR0FBWSxJQUFsQixFQUZGOztBQURGO1FBS0EsQ0FBQSxDQUFFLGNBQUEsR0FBZSxPQUFqQixDQUEyQixDQUFDLFdBQTVCLENBQXdDLGNBQXhDO1FBQ0EsQ0FBQSxDQUFFLGNBQUEsR0FBZSxRQUFqQixDQUE0QixDQUFDLFdBQTdCLENBQXlDLFVBQXpDO1FBRUEsQ0FBQSxDQUFFLFdBQUEsR0FBWSxPQUFkLENBQXdCLENBQUMsV0FBekIsQ0FBcUMsZUFBckM7ZUFDQSxDQUFBLENBQUUsV0FBQSxHQUFZLFFBQWQsQ0FBeUIsQ0FBQyxXQUExQixDQUFzQyxXQUF0QztNQVhTLENBQVgsRUFhRSxLQUFLLENBQUMsY0FiUixFQVZGOztJQXlCQSxJQUFHLFNBQUEsS0FBYSxNQUFiLElBQXVCLFNBQUEsS0FBYSxPQUF2QztNQUVFLENBQUMsQ0FBQyxFQUFGLENBQUssY0FBQSxHQUFlLE9BQXBCO01BQ0EsQ0FBQSxDQUFFLGNBQUEsR0FBZSxPQUFqQixDQUEyQixDQUFDLFFBQTVCLENBQXFDLFdBQXJDO01BQ0EsQ0FBQSxDQUFFLGNBQUEsR0FBZSxRQUFqQixDQUE0QixDQUFDLFFBQTdCLENBQXNDLGFBQXRDO01BRUEsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxXQUFBLEdBQVksT0FBakI7TUFDQSxDQUFBLENBQUUsV0FBQSxHQUFZLE9BQWQsQ0FBd0IsQ0FBQyxRQUF6QixDQUFrQyxZQUFsQztNQUNBLENBQUEsQ0FBRSxXQUFBLEdBQVksUUFBZCxDQUF5QixDQUFDLFFBQTFCLENBQW1DLGNBQW5DO01BRUEsVUFBQSxDQUFXLFNBQUE7QUFFVCxZQUFBO0FBQUE7QUFBQSxhQUFBLHdDQUFBOztVQUNFLElBQUcsSUFBQSxLQUFVLE9BQWI7WUFDRSxDQUFDLENBQUMsR0FBRixDQUFNLGNBQUEsR0FBZSxJQUFyQjtZQUNBLENBQUMsQ0FBQyxHQUFGLENBQU0sV0FBQSxHQUFZLElBQWxCLEVBRkY7O0FBREY7UUFLQSxDQUFBLENBQUUsY0FBQSxHQUFlLFFBQWpCLENBQTRCLENBQUMsV0FBN0IsQ0FBeUMsYUFBekM7UUFDQSxDQUFBLENBQUUsY0FBQSxHQUFlLE9BQWpCLENBQTJCLENBQUMsV0FBNUIsQ0FBd0MsV0FBeEM7UUFFQSxDQUFBLENBQUUsV0FBQSxHQUFZLFFBQWQsQ0FBeUIsQ0FBQyxXQUExQixDQUFzQyxjQUF0QztlQUNBLENBQUEsQ0FBRSxXQUFBLEdBQVksT0FBZCxDQUF3QixDQUFDLFdBQXpCLENBQXFDLFlBQXJDO01BWFMsQ0FBWCxFQWFFLEtBQUssQ0FBQyxjQWJSLEVBVkY7O0lBeUJBLENBQUMsQ0FBQyxHQUFGLENBQU0sY0FBTjtJQUNBLENBQUMsQ0FBQyxFQUFGLENBQUssbUJBQUEsR0FBb0IsT0FBekI7SUFFQSxFQUFBLEdBQVMsSUFBQSxXQUFBLENBQVk7TUFBQyxNQUFBLEVBQVEsQ0FBVDtLQUFaO1dBQ1QsRUFDRSxDQUFDLEVBREgsQ0FDTSxLQUROLEVBQ2EsR0FEYixFQUNrQjtNQUFDLFFBQUEsRUFBVSxHQUFBLEdBQUksT0FBSixHQUFZLEdBQXZCO01BQTJCLElBQUEsRUFBSyxNQUFNLENBQUMsU0FBdkM7S0FEbEIsRUFDcUUsT0FEckUsQ0FFRSxDQUFDLEVBRkgsQ0FFTSxLQUZOLEVBRWEsR0FGYixFQUVrQjtNQUFDLFFBQUEsRUFBVSxHQUFBLEdBQUksT0FBSixHQUFZLEdBQXZCO01BQTJCLElBQUEsRUFBSyxNQUFNLENBQUMsU0FBdkM7S0FGbEIsRUFFcUUsT0FGckUsQ0FHRSxDQUFDLEVBSEgsQ0FHTSxLQUhOLEVBR2EsR0FIYixFQUdrQjtNQUFDLFFBQUEsRUFBVSxHQUFBLEdBQUksT0FBSixHQUFZLEdBQXZCO01BQTJCLElBQUEsRUFBSyxNQUFNLENBQUMsU0FBdkM7S0FIbEIsRUFHcUUsT0FIckU7RUExRU8sQ0F2TFQiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJJbmRleCA9XG5cbiAgbmF2OiBbJ2RlZmluZXJ5JywnaXRlcmF0ZScsICduYXZpZ2F0ZScsICdwcm9kdWN0J11cbiAgdGltZW91dDogMTAwMFxuICB0cmFuc2l0VGltZW91dDogMTAwMFxuICBwYXVzZWQ6IGZhbHNlXG4gIGN1cnJlbnRTbGlkZTogZmFsc2VcblxuICB0bDogZmFsc2VcblxuICBjb2xvcnM6XG4gICAgJ2RlZmluZXJ5JzogZGF0YS5jb2xvci50ZWFsMVxuICAgICdpdGVyYXRlJzogZGF0YS5jb2xvci5ibHVlMVxuICAgICduYXZpZ2F0ZSc6IGRhdGEuY29sb3IuZ3JlZW4xXG4gICAgJ3Byb2R1Y3QnOiBkYXRhLmNvbG9yLnBpbmsxXG5cbiAgbWVudWNvbG9yczpcbiAgICAnYWJvdXQnOiBkYXRhLmNvbG9yLnRlYWwxXG4gICAgJ3dvcmsnOiBkYXRhLmNvbG9yLmJibHVlXG4gICAgJ3NlcnZpY2VzJzogZGF0YS5jb2xvci5icGlua1xuICAgICdjb250YWN0JzogZGF0YS5jb2xvci5iZ3JlZW5cblxuICBjdXJyZW50OiAwXG5cbiAgbWVudU51bTogMVxuICBtZW51T3B0aW9uczogWydhYm91dCcsJ3dvcmsnLCdzZXJ2aWNlcycsJ2NvbnRhY3QnXVxuICBtZW51U3dpcGluZzogZmFsc2VcblxuICBpOiAtPlxuXG4gICAgSW5kZXguaGFuZGxlcnMoKVxuXG4gICAgaWYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2FuZHJvaWQnKSA+IC0xXG4gICAgICBJbmRleC50cmFuc2l0VGltZW91dCA9IDgwMFxuXG5cbiAgaGFuZGxlcnM6IC0+XG5cbiAgICAkKCcubmF2Jykub24gJ2NsaWNrJywgSW5kZXgubmF2SGFuZGxlclxuICAgICQoJy5kb3RzID4gLmRvdCcpLm9uICdjbGljaycsIEluZGV4LmRvdEhhbmRsZXJcbiAgICAkKCcubWVudSA+IC5vcHRpb24nKS5vbiAnY2xpY2snLCBJbmRleC5tZW51SGFuZGxlclxuICAgICQoJy5zZWN0aW9uID4gLmxvZ28nKS5vbiAnY2xpY2snLCAtPlxuICAgICAgJCgnLm1lbnUgPiAub3B0aW9uLm9wdGlvbl9hYm91dCcpLnRyaWdnZXIgJ2NsaWNrJ1xuXG5cbiAgICAkKCcucHJvZF9jb250YWN0X2N0YScpLm9uICdjbGljaycsIEluZGV4LmNvbnRhY3RcblxuICAgICMkKGRvY3VtZW50KS5vbiAndG91Y2htb3ZlJywgLT5cbiAgICAjICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICBEZXRlY3QuaGFuZGxlciBJbmRleC5uYXZpZ2F0ZVxuICAgICQoJy5jb250ZW50ID4gLmlubmVyID4gLnRhcHNwYWNlJykuc3dpcGVcbiAgICAgIHN3aXBlOiAoZXZlbnQsIGRpcmVjdGlvbiwgZGlzdGFuY2UsIGR1cmF0aW9uLCBmaW5nZXJDb3VudCkgLT5cbiAgICAgICAgIyMjXG4gICAgICAgIGRpcmVjdGlvbiAgPSAnZG93bicgaWYgZGlyZWN0aW9uIGlzICd1cCdcbiAgICAgICAgZGlyZWN0aW9uICA9ICd1cCcgaWYgZGlyZWN0aW9uIGlzICdkb3duJ1xuICAgICAgICBkaXJlY3Rpb24gID0gJ2xlZnQnIGlmIGRpcmVjdGlvbiBpcyAncmlnaHQnXG4gICAgICAgIGRpcmVjdGlvbiAgPSAncmlnaHQnIGlmIGRpcmVjdGlvbiBpcyAnbGVmdCdcbiAgICAgICAgIyMjXG4gICAgICAgIHJldHVybiB0cnVlIGlmIGRpcmVjdGlvbiBpcyBudWxsXG4gICAgICAgICMkKCcuZGVidWcnKS5hcHBlbmQoJzE6IHN3aXBlOiAnICsgZGlyZWN0aW9uICsgJzxiciAvPiAnKVxuICAgICAgICBJbmRleC5uYXZpZ2F0ZSBkaXJlY3Rpb25cbiAgICAgICAgcmV0dXJuXG4gICAgICB0YXA6IChldmVudCwgdGFyZ2V0KSAtPlxuICAgICAgICBjb25zb2xlLmxvZyAndGFwJ1xuICAgICAgY2xpY2s6IChldmVudCwgdGFyZ2V0KSAtPlxuICAgICAgICBjb25zb2xlLmxvZyAnY2xpY2snXG4gICAgICB0aHJlc2hvbGQ6IDBcblxuXG4gIGNvbnRhY3Q6IC0+XG4gICAgJCgnLm1lbnUgPiAub3B0aW9uLm9wdGlvbl9jb250YWN0JykudHJpZ2dlciAnY2xpY2snXG5cbiAgbWVudUhhbmRsZXI6IC0+XG4gICAgcmV0dXJuIHRydWUgaWYgSW5kZXgubWVudVN3aXBpbmcgaXMgdHJ1ZVxuICAgIEluZGV4Lm1lbnVTd2lwaW5nID0gdHJ1ZVxuXG4gICAgY3VycmVudCA9ICQodGhpcykuZGF0YSAnb3B0aW9uJ1xuICAgIG51bSA9ICQodGhpcykuZGF0YSAnbnVtJ1xuXG4gICAgaWYgJChcIi5vcHRpb25fI3tjdXJyZW50fVwiKS5oYXNDbGFzcyAnb24nXG4gICAgICBJbmRleC5tZW51U3dpcGluZyA9IGZhbHNlXG4gICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgXy5vZmYgJy5tZW51ID4gLm9wdGlvbidcbiAgICBfLm9uIFwiLm9wdGlvbl8je2N1cnJlbnR9XCJcblxuICAgIGlmIGN1cnJlbnQgaXMgJ2Fib3V0J1xuICAgICAgSW5kZXgubWV0YSBJbmRleC5jb2xvcnNbSW5kZXguY3VycmVudFNsaWRlXSwgMjAwXG4gICAgZWxzZVxuICAgICAgSW5kZXgubWV0YSBJbmRleC5tZW51Y29sb3JzW2N1cnJlbnRdLCAyMDBcblxuICAgIGZvciBvcHRpb24gaW4gSW5kZXgubWVudU9wdGlvbnNcbiAgICAgICQoJy5zd2lwZXInKS5yZW1vdmVDbGFzcyhcInN3aXBlcl8je29wdGlvbn1cIilcblxuICAgIGlmIG51bSA+IEluZGV4Lm1lbnVOdW0gdGhlbiBkaXIgPSAncmlnaHQnIGVsc2UgZGlyID0gJ2xlZnQnXG4gICAgSW5kZXgubWVudU51bSA9IG51bVxuXG4gICAgJChcIi5zd2lwZXIuI3tkaXJ9XCIpLmFkZENsYXNzKFwic3dpcGVyXyN7Y3VycmVudH1cIilcbiAgICBfLm9uIFwiLnN3aXBlci4je2Rpcn1cIlxuICAgIHNldFRpbWVvdXQgLT5cbiAgICAgIF8ub2ZmIFwiLnN3aXBlci4je2Rpcn1cIlxuICAgICAgSW5kZXgubWVudVN3aXBpbmcgPSBmYWxzZVxuICAgICwgNzUwXG5cbiAgICBzZXRUaW1lb3V0IC0+XG4gICAgICBfLm9mZiAnLnNlY3Rpb24nXG4gICAgICBpZiBjdXJyZW50IGlzbnQgJ2Fib3V0J1xuICAgICAgICBfLm9uIFwiLnNlY3Rpb24uI3tjdXJyZW50fVwiXG4gICAgLCAzMDBcblxuICBuYXZIYW5kbGVyOiAtPlxuXG4gICAgcmV0dXJuIHRydWUgaWYgSW5kZXgucGF1c2VkXG4gICAgdCA9ICQodGhpcylcblxuICAgIHByZXZpb3VzID0gdC5kYXRhICdmcm9tJ1xuICAgIGN1cnJlbnQgPSB0LmRhdGEgJ3RvJ1xuICAgIGRpcmVjdGlvbiA9IHQuZGF0YSAnZGlyJ1xuXG4gICAgI0luZGV4LnRyYW5zaXQocHJldmlvdXMsIGN1cnJlbnQsIGRpcmVjdGlvbilcbiAgICBJbmRleC5uYXZpZ2F0ZSBkaXJlY3Rpb25cblxuICAgIEluZGV4LnBhdXNlZCA9IHRydWVcbiAgICBzZXRUaW1lb3V0IC0+XG4gICAgICBJbmRleC5wYXVzZWQgPSBmYWxzZVxuICAgICxJbmRleC50aW1lb3V0XG5cblxuICBkb3RIYW5kbGVyOiAtPlxuXG4gICAgcmV0dXJuIHRydWUgaWYgSW5kZXgucGF1c2VkXG5cbiAgICBwcmV2aW91cyA9ICQoJy5kb3RzIC5kb3Qub24nKS5kYXRhICdzZWN0J1xuICAgIHBudW0gPSAkKCcuZG90cyAuZG90Lm9uJykuZGF0YSAnbnVtJ1xuICAgIGN1cnJlbnQgPSAkKHRoaXMpLmRhdGEgJ3NlY3QnXG4gICAgY251bSA9ICQodGhpcykuZGF0YSAnbnVtJ1xuXG4gICAgaWYgY251bSA+IHBudW0gdGhlbiBkaXJlY3Rpb24gPSAndXAnIGVsc2UgZGlyZWN0aW9uID0gJ2Rvd24nXG5cbiAgICBJbmRleC50cmFuc2l0IHByZXZpb3VzLCBjdXJyZW50LCBkaXJlY3Rpb25cblxuICAgIEluZGV4LnBhdXNlZCA9IHRydWVcbiAgICBJbmRleC5jdXJyZW50ID0gY251bVxuICAgIHNldFRpbWVvdXQgLT5cbiAgICAgIEluZGV4LnBhdXNlZCA9IGZhbHNlXG4gICAgLCBJbmRleC50aW1lb3V0XG5cbiAgbmF2aWdhdGU6IChkaXJlY3Rpb24pIC0+XG5cbiAgICByZXR1cm4gdHJ1ZSBpZiAkKCcubWVudSA+IC5vcHRpb24ub3B0aW9uX2NvbnRhY3QnKS5oYXNDbGFzcygnb24nKVxuICAgIHJldHVybiB0cnVlIGlmICQoJy5tZW51ID4gLm9wdGlvbi5vcHRpb25fc2VydmljZXMnKS5oYXNDbGFzcygnb24nKVxuICAgIHJldHVybiB0cnVlIGlmICQoJy5tZW51ID4gLm9wdGlvbi5vcHRpb25fd29yaycpLmhhc0NsYXNzKCdvbicpXG5cbiAgICByZXR1cm4gdHJ1ZSBpZiBJbmRleC5wYXVzZWRcblxuICAgIHByZXZpb3VzID0gSW5kZXgubmF2W0luZGV4LmN1cnJlbnRdXG5cbiAgICBpZiBkaXJlY3Rpb24gaXMgJ3VwJyBvciBkaXJlY3Rpb24gaXMgJ2xlZnQnXG4gICAgICBpZiAoSW5kZXguY3VycmVudCA9PSAoSW5kZXgubmF2Lmxlbmd0aC0xKSlcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIGVsc2VcbiAgICAgICAgSW5kZXguY3VycmVudCsrXG5cbiAgICBpZiBkaXJlY3Rpb24gaXMgJ2Rvd24nIG9yIGRpcmVjdGlvbiBpcyAncmlnaHQnXG4gICAgICBpZiAoSW5kZXguY3VycmVudCA9PSAwKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgZWxzZVxuICAgICAgICBJbmRleC5jdXJyZW50LS1cblxuICAgIGN1cnJlbnQgPSBJbmRleC5uYXZbSW5kZXguY3VycmVudF1cblxuICAgIEluZGV4LnRyYW5zaXQocHJldmlvdXMsIGN1cnJlbnQsIGRpcmVjdGlvbilcblxuICAgIEluZGV4LnBhdXNlZCA9IHRydWVcbiAgICBzZXRUaW1lb3V0IC0+XG4gICAgICBJbmRleC5wYXVzZWQgPSBmYWxzZVxuICAgICwgSW5kZXgudGltZW91dFxuXG4gIG1ldGE6IChjb2xvciwgdGltZW91dCkgLT5cbiAgICBzZXRUaW1lb3V0IC0+XG4gICAgICAkKCdtZXRhW25hbWU9dGhlbWUtY29sb3JdJykucmVtb3ZlKClcbiAgICAgICQoJ2hlYWQnKS5hcHBlbmQoJzxtZXRhIG5hbWU9XCJ0aGVtZS1jb2xvclwiIGNvbnRlbnQ9XCInICsgY29sb3IgKyAnXCI+JylcbiAgICAsIHRpbWVvdXRcblxuICB0cmFuc2l0OiAocHJldmlvdXMsIGN1cnJlbnQsIGRpcmVjdGlvbikgLT5cblxuICAgIHJldHVybiB0cnVlIGlmIHByZXZpb3VzIGlzIHVuZGVmaW5lZFxuXG4gICAgaWYgY3VycmVudCBpc250ICdkZWZpbmVyeScgdGhlbiBfLm9uICcuYXJyb3cudXAnIGVsc2UgXy5vZmYgJy5hcnJvdy51cCdcblxuICAgICMgaSB3aWxsIGNoZXN0YnVtcCBteSBtb25pdG9yIGlmIHRoaXMgd29ya3NcbiAgICBJbmRleC5jdXJyZW50U2xpZGUgPSBjdXJyZW50XG4gICAgSW5kZXgubWV0YSBJbmRleC5jb2xvcnNbY3VycmVudF0sIDUwMFxuXG4gICAgZm9yIHNlY3QgaW4gSW5kZXgubmF2XG4gICAgICBpZiBzZWN0IGlzbnQgY3VycmVudFxuICAgICAgICAkKCcuY29sb3JzIC5zdmcnKS5yZW1vdmVDbGFzcyBcInN0YXJfI3tzZWN0fVwiXG4gICAgICAgICQoJy5ib3JkZXInKS5yZW1vdmVDbGFzcyBzZWN0XG4gICAgICAgICQoJy5iZ2NvbG9yJykucmVtb3ZlQ2xhc3Mgc2VjdFxuXG4gICAgJCgnLmNvbG9ycyAuc3ZnJykuYWRkQ2xhc3MgXCJzdGFyXyN7Y3VycmVudH1cIlxuICAgICQoJy5ib3JkZXInKS5hZGRDbGFzcyBjdXJyZW50XG4gICAgJCgnLmJnY29sb3InKS5hZGRDbGFzcyBjdXJyZW50XG5cbiAgICBpZiBkaXJlY3Rpb24gaXMgJ3VwJyBvciBkaXJlY3Rpb24gaXMgJ2xlZnQnXG5cbiAgICAgIF8ub24gXCIuYmFja2dyb3VuZC4je2N1cnJlbnR9XCJcbiAgICAgICQoXCIuYmFja2dyb3VuZC4je2N1cnJlbnR9XCIpLmFkZENsYXNzICdpbkZyb21Cb3R0b20nXG4gICAgICAkKFwiLmJhY2tncm91bmQuI3twcmV2aW91c31cIikuYWRkQ2xhc3MgJ291dFRvVG9wJ1xuXG4gICAgICBfLm9uIFwiLmNvbnRlbnQuI3tjdXJyZW50fVwiXG4gICAgICAkKFwiLmNvbnRlbnQuI3tjdXJyZW50fVwiKS5hZGRDbGFzcyAnY0luRnJvbUJvdHRvbSdcbiAgICAgICQoXCIuY29udGVudC4je3ByZXZpb3VzfVwiKS5hZGRDbGFzcyAnY091dFRvVG9wJ1xuXG4gICAgICBzZXRUaW1lb3V0IC0+XG5cbiAgICAgICAgZm9yIHNlY3QgaW4gSW5kZXgubmF2XG4gICAgICAgICAgaWYgc2VjdCBpc250IGN1cnJlbnRcbiAgICAgICAgICAgIF8ub2ZmIFwiLmJhY2tncm91bmQuI3tzZWN0fVwiXG4gICAgICAgICAgICBfLm9mZiBcIi5jb250ZW50LiN7c2VjdH1cIlxuXG4gICAgICAgICQoXCIuYmFja2dyb3VuZC4je2N1cnJlbnR9XCIpLnJlbW92ZUNsYXNzICdpbkZyb21Cb3R0b20nXG4gICAgICAgICQoXCIuYmFja2dyb3VuZC4je3ByZXZpb3VzfVwiKS5yZW1vdmVDbGFzcyAnb3V0VG9Ub3AnXG5cbiAgICAgICAgJChcIi5jb250ZW50LiN7Y3VycmVudH1cIikucmVtb3ZlQ2xhc3MgJ2NJbkZyb21Cb3R0b20nXG4gICAgICAgICQoXCIuY29udGVudC4je3ByZXZpb3VzfVwiKS5yZW1vdmVDbGFzcyAnY091dFRvVG9wJ1xuXG4gICAgICAsIEluZGV4LnRyYW5zaXRUaW1lb3V0XG5cbiAgICBpZiBkaXJlY3Rpb24gaXMgJ2Rvd24nIG9yIGRpcmVjdGlvbiBpcyAncmlnaHQnXG5cbiAgICAgIF8ub24gXCIuYmFja2dyb3VuZC4je2N1cnJlbnR9XCJcbiAgICAgICQoXCIuYmFja2dyb3VuZC4je2N1cnJlbnR9XCIpLmFkZENsYXNzICdpbkZyb21Ub3AnXG4gICAgICAkKFwiLmJhY2tncm91bmQuI3twcmV2aW91c31cIikuYWRkQ2xhc3MgJ291dFRvQm90dG9tJ1xuXG4gICAgICBfLm9uIFwiLmNvbnRlbnQuI3tjdXJyZW50fVwiXG4gICAgICAkKFwiLmNvbnRlbnQuI3tjdXJyZW50fVwiKS5hZGRDbGFzcyAnY0luRnJvbVRvcCdcbiAgICAgICQoXCIuY29udGVudC4je3ByZXZpb3VzfVwiKS5hZGRDbGFzcyAnY091dFRvQm90dG9tJ1xuXG4gICAgICBzZXRUaW1lb3V0IC0+XG5cbiAgICAgICAgZm9yIHNlY3QgaW4gSW5kZXgubmF2XG4gICAgICAgICAgaWYgc2VjdCBpc250IGN1cnJlbnRcbiAgICAgICAgICAgIF8ub2ZmIFwiLmJhY2tncm91bmQuI3tzZWN0fVwiXG4gICAgICAgICAgICBfLm9mZiBcIi5jb250ZW50LiN7c2VjdH1cIlxuXG4gICAgICAgICQoXCIuYmFja2dyb3VuZC4je3ByZXZpb3VzfVwiKS5yZW1vdmVDbGFzcyAnb3V0VG9Cb3R0b20nXG4gICAgICAgICQoXCIuYmFja2dyb3VuZC4je2N1cnJlbnR9XCIpLnJlbW92ZUNsYXNzICdpbkZyb21Ub3AnXG5cbiAgICAgICAgJChcIi5jb250ZW50LiN7cHJldmlvdXN9XCIpLnJlbW92ZUNsYXNzICdjT3V0VG9Cb3R0b20nXG4gICAgICAgICQoXCIuY29udGVudC4je2N1cnJlbnR9XCIpLnJlbW92ZUNsYXNzICdjSW5Gcm9tVG9wJ1xuXG4gICAgICAsIEluZGV4LnRyYW5zaXRUaW1lb3V0XG5cbiAgICBfLm9mZiAnLmRvdHMgPiAuZG90J1xuICAgIF8ub24gXCIuZG90cyA+IC5kb3QuZG90XyN7Y3VycmVudH1cIlxuXG4gICAgdGwgPSBuZXcgVGltZWxpbmVNYXgoe3JlcGVhdDogMH0pXG4gICAgdGxcbiAgICAgIC50byhcIi5kMVwiLCAwLjgsIHttb3JwaFNWRzogXCIuI3tjdXJyZW50fTFcIiwgZWFzZTpQb3dlcjMuZWFzZUluT3V0fSwgJy09MC44JylcbiAgICAgIC50byhcIi5kMlwiLCAwLjgsIHttb3JwaFNWRzogXCIuI3tjdXJyZW50fTJcIiwgZWFzZTpQb3dlcjMuZWFzZUluT3V0fSwgJy09MC44JylcbiAgICAgIC50byhcIi5kM1wiLCAwLjgsIHttb3JwaFNWRzogXCIuI3tjdXJyZW50fTNcIiwgZWFzZTpQb3dlcjMuZWFzZUluT3V0fSwgJy09MC44JylcblxuXG4iXX0=
