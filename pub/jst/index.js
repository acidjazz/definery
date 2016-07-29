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
    $('.prod_contact_cta').on('click', Index.contact);
    $('.container').on('mousedown', function() {
      return console.log('mousedown');
    });
    return $(document).swipe({
      swipe: function(event, direction, distance, duration, fingerCount) {
        Index.navigate(direction);
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

//# sourceMappingURL=data:application/json;base64,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Q0UsSUFBRyxJQUFBLEtBQVUsT0FBYjtZQUNFLENBQUMsQ0FBQyxHQUFGLENBQU0sY0FBQSxHQUFlLElBQXJCO3lCQUNBLENBQUMsQ0FBQyxHQUFGLENBQU0sV0FBQSxHQUFZLElBQWxCLEdBRkY7V0FBQSxNQUFBO2lDQUFBOztBQURGOztNQVJTLENBQVgsRUFhRSxJQWJGLEVBVkY7O0lBeUJBLENBQUMsQ0FBQyxHQUFGLENBQU0sY0FBTjtJQUNBLENBQUMsQ0FBQyxFQUFGLENBQUssbUJBQUEsR0FBb0IsT0FBekI7SUFFQSxFQUFBLEdBQVMsSUFBQSxXQUFBLENBQVk7TUFBQyxNQUFBLEVBQVEsQ0FBVDtLQUFaO1dBQ1QsRUFDRSxDQUFDLEVBREgsQ0FDTSxLQUROLEVBQ2EsR0FEYixFQUNrQjtNQUFDLFFBQUEsRUFBVSxHQUFBLEdBQUksT0FBSixHQUFZLEdBQXZCO01BQTJCLElBQUEsRUFBSyxNQUFNLENBQUMsU0FBdkM7S0FEbEIsRUFDcUUsT0FEckUsQ0FFRSxDQUFDLEVBRkgsQ0FFTSxLQUZOLEVBRWEsR0FGYixFQUVrQjtNQUFDLFFBQUEsRUFBVSxHQUFBLEdBQUksT0FBSixHQUFZLEdBQXZCO01BQTJCLElBQUEsRUFBSyxNQUFNLENBQUMsU0FBdkM7S0FGbEIsRUFFcUUsT0FGckUsQ0FHRSxDQUFDLEVBSEgsQ0FHTSxLQUhOLEVBR2EsR0FIYixFQUdrQjtNQUFDLFFBQUEsRUFBVSxHQUFBLEdBQUksT0FBSixHQUFZLEdBQXZCO01BQTJCLElBQUEsRUFBSyxNQUFNLENBQUMsU0FBdkM7S0FIbEIsRUFHcUUsT0FIckU7RUE1RU8sQ0F0SlQiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJJbmRleCA9XG5cbiAgbmF2OiBbJ2RlZmluZXJ5JywnaXRlcmF0ZScsICduYXZpZ2F0ZScsICdwcm9kdWN0J11cbiAgdGltZW91dDogMTAwMFxuICBwYXVzZWQ6IGZhbHNlXG5cbiAgdGw6IGZhbHNlXG5cbiAgY29sb3JzOlxuICAgICdkZWZpbmVyeSc6IGRhdGEuY29sb3IudGVhbDFcbiAgICAnaXRlcmF0ZSc6IGRhdGEuY29sb3IuYmx1ZTFcbiAgICAnbmF2aWdhdGUnOiBkYXRhLmNvbG9yLmdyZWVuMVxuICAgICdwcm9kdWN0JzogZGF0YS5jb2xvci5waW5rMVxuXG4gIGN1cnJlbnQ6IDBcblxuICBtZW51TnVtOiAxXG4gIG1lbnVPcHRpb25zOiBbJ2Fib3V0Jywnd29yaycsJ3NlcnZpY2VzJywnY29udGFjdCddXG4gIG1lbnVTd2lwaW5nOiBmYWxzZVxuXG4gIGk6IC0+XG5cbiAgICBJbmRleC5oYW5kbGVycygpXG5cbiAgaGFuZGxlcnM6IC0+XG5cbiAgICAjRGV0ZWN0LmhhbmRsZXIgSW5kZXgubmF2aWdhdGVcblxuICAgICQoJy5uYXYnKS5vbiAnY2xpY2snLCBJbmRleC5uYXZIYW5kbGVyXG4gICAgJCgnLmRvdHMgPiAuZG90Jykub24gJ2NsaWNrJywgSW5kZXguZG90SGFuZGxlclxuICAgICQoJy5tZW51ID4gLm9wdGlvbicpLm9uICdjbGljaycsIEluZGV4Lm1lbnVIYW5kbGVyXG4gICAgJCgnLnByb2RfY29udGFjdF9jdGEnKS5vbiAnY2xpY2snLCBJbmRleC5jb250YWN0XG5cbiAgICAjJChkb2N1bWVudCkub24gJ3RvdWNobW92ZScsIC0+XG4gICAgIyAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICNcbiAgICAjXG4gICAgJCgnLmNvbnRhaW5lcicpLiBvbiAnbW91c2Vkb3duJywgLT5cbiAgICAgIGNvbnNvbGUubG9nICdtb3VzZWRvd24nXG5cbiAgICAkKGRvY3VtZW50KS5zd2lwZVxuICAgICAgc3dpcGU6IChldmVudCwgZGlyZWN0aW9uLCBkaXN0YW5jZSwgZHVyYXRpb24sIGZpbmdlckNvdW50KSAtPlxuICAgICAgICBJbmRleC5uYXZpZ2F0ZSBkaXJlY3Rpb25cbiAgICAgICAgcmV0dXJuXG4gICAgICB0aHJlc2hvbGQ6IDBcblxuXG4gIGNvbnRhY3Q6IC0+XG4gICAgJCgnLm1lbnUgPiAub3B0aW9uLm9wdGlvbl9jb250YWN0JykudHJpZ2dlciAnY2xpY2snXG5cbiAgbWVudUhhbmRsZXI6IC0+XG4gICAgcmV0dXJuIHRydWUgaWYgSW5kZXgubWVudVN3aXBpbmcgaXMgdHJ1ZVxuICAgIEluZGV4Lm1lbnVTd2lwaW5nID0gdHJ1ZVxuXG4gICAgY3VycmVudCA9ICQodGhpcykuZGF0YSAnb3B0aW9uJ1xuICAgIG51bSA9ICQodGhpcykuZGF0YSAnbnVtJ1xuXG4gICAgaWYgJCh0aGlzKS5oYXNDbGFzcyAnb24nXG4gICAgICBJbmRleC5tZW51U3dpcGluZyA9IGZhbHNlXG4gICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgXy5vZmYgJy5tZW51ID4gLm9wdGlvbidcbiAgICBfLm9uIHRoaXNcblxuICAgIGZvciBvcHRpb24gaW4gSW5kZXgubWVudU9wdGlvbnNcbiAgICAgICQoJy5zd2lwZXInKS5yZW1vdmVDbGFzcyhcInN3aXBlcl8je29wdGlvbn1cIilcblxuICAgIGlmIG51bSA+IEluZGV4Lm1lbnVOdW0gdGhlbiBkaXIgPSAncmlnaHQnIGVsc2UgZGlyID0gJ2xlZnQnXG4gICAgSW5kZXgubWVudU51bSA9IG51bVxuXG4gICAgJChcIi5zd2lwZXIuI3tkaXJ9XCIpLmFkZENsYXNzKFwic3dpcGVyXyN7Y3VycmVudH1cIilcbiAgICBfLm9uIFwiLnN3aXBlci4je2Rpcn1cIlxuICAgIHNldFRpbWVvdXQgLT5cbiAgICAgIF8ub2ZmIFwiLnN3aXBlci4je2Rpcn1cIlxuICAgICAgSW5kZXgubWVudVN3aXBpbmcgPSBmYWxzZVxuICAgICwgNzUwXG5cbiAgICBzZXRUaW1lb3V0IC0+XG4gICAgICBfLm9mZiAnLnNlY3Rpb24nXG4gICAgICBpZiBjdXJyZW50IGlzbnQgJ2Fib3V0J1xuICAgICAgICBfLm9uIFwiLnNlY3Rpb24uI3tjdXJyZW50fVwiXG4gICAgLCAzMDBcblxuICBuYXZIYW5kbGVyOiAtPlxuXG4gICAgcmV0dXJuIHRydWUgaWYgSW5kZXgucGF1c2VkXG4gICAgdCA9ICQodGhpcylcblxuICAgIHByZXZpb3VzID0gdC5kYXRhICdmcm9tJ1xuICAgIGN1cnJlbnQgPSB0LmRhdGEgJ3RvJ1xuICAgIGRpcmVjdGlvbiA9IHQuZGF0YSAnZGlyJ1xuXG4gICAgSW5kZXgudHJhbnNpdChwcmV2aW91cywgY3VycmVudCwgZGlyZWN0aW9uKVxuXG4gICAgSW5kZXgucGF1c2VkID0gdHJ1ZVxuICAgIHNldFRpbWVvdXQgLT5cbiAgICAgIEluZGV4LnBhdXNlZCA9IGZhbHNlXG4gICAgLEluZGV4LnRpbWVvdXRcblxuXG4gIGRvdEhhbmRsZXI6IC0+XG5cbiAgICByZXR1cm4gdHJ1ZSBpZiBJbmRleC5wYXVzZWRcblxuICAgIHByZXZpb3VzID0gJCgnLmRvdHMgLmRvdC5vbicpLmRhdGEgJ3NlY3QnXG4gICAgcG51bSA9ICQoJy5kb3RzIC5kb3Qub24nKS5kYXRhICdudW0nXG4gICAgY3VycmVudCA9ICQodGhpcykuZGF0YSAnc2VjdCdcbiAgICBjbnVtID0gJCh0aGlzKS5kYXRhICdudW0nXG5cbiAgICBpZiBjbnVtID4gcG51bSB0aGVuIGRpcmVjdGlvbiA9ICdkb3duJyBlbHNlIGRpcmVjdGlvbiA9ICd1cCdcblxuICAgIEluZGV4LnRyYW5zaXQgcHJldmlvdXMsIGN1cnJlbnQsIGRpcmVjdGlvblxuXG4gICAgSW5kZXgucGF1c2VkID0gdHJ1ZVxuICAgIEluZGV4LmN1cnJlbnQgPSBjbnVtXG4gICAgc2V0VGltZW91dCAtPlxuICAgICAgSW5kZXgucGF1c2VkID0gZmFsc2VcbiAgICAsIEluZGV4LnRpbWVvdXRcblxuICBuYXZpZ2F0ZTogKGRpcmVjdGlvbikgLT5cblxuICAgIHJldHVybiB0cnVlIGlmICQoJy5tZW51ID4gLm9wdGlvbi5vcHRpb25fY29udGFjdCcpLmhhc0NsYXNzKCdvbicpXG4gICAgcmV0dXJuIHRydWUgaWYgJCgnLm1lbnUgPiAub3B0aW9uLm9wdGlvbl9zZXJ2aWNlcycpLmhhc0NsYXNzKCdvbicpXG4gICAgcmV0dXJuIHRydWUgaWYgJCgnLm1lbnUgPiAub3B0aW9uLm9wdGlvbl93b3JrJykuaGFzQ2xhc3MoJ29uJylcblxuICAgIHJldHVybiB0cnVlIGlmIEluZGV4LnBhdXNlZFxuXG4gICAgcHJldmlvdXMgPSBJbmRleC5uYXZbSW5kZXguY3VycmVudF1cblxuICAgIGlmIGRpcmVjdGlvbiBpcyAndXAnIG9yIGRpcmVjdGlvbiBpcyAnbGVmdCdcbiAgICAgIGlmIChJbmRleC5jdXJyZW50ID09IChJbmRleC5uYXYubGVuZ3RoLTEpKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAjSW5kZXguY3VycmVudCA9IDBcbiAgICAgIGVsc2VcbiAgICAgICAgSW5kZXguY3VycmVudCsrXG5cbiAgICBpZiBkaXJlY3Rpb24gaXMgJ2Rvd24nIG9yIGRpcmVjdGlvbiBpcyAncmlnaHQnXG4gICAgICBpZiAoSW5kZXguY3VycmVudCA9PSAwKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAjSW5kZXguY3VycmVudCA9IEluZGV4Lm5hdi5sZW5ndGgtMVxuICAgICAgZWxzZVxuICAgICAgICBJbmRleC5jdXJyZW50LS1cblxuICAgIGN1cnJlbnQgPSBJbmRleC5uYXZbSW5kZXguY3VycmVudF1cblxuICAgIEluZGV4LnRyYW5zaXQocHJldmlvdXMsIGN1cnJlbnQsIGRpcmVjdGlvbilcblxuICAgIEluZGV4LnBhdXNlZCA9IHRydWVcbiAgICBzZXRUaW1lb3V0IC0+XG4gICAgICBJbmRleC5wYXVzZWQgPSBmYWxzZVxuICAgICwgSW5kZXgudGltZW91dFxuXG4gIHRyYW5zaXQ6IChwcmV2aW91cywgY3VycmVudCwgZGlyZWN0aW9uKSAtPlxuXG4gICAgcmV0dXJuIHRydWUgaWYgcHJldmlvdXMgaXMgdW5kZWZpbmVkXG5cbiAgICBpZiBjdXJyZW50IGlzbnQgJ2RlZmluZXJ5JyB0aGVuIF8ub24gJy5hcnJvdy51cCcgZWxzZSBfLm9mZiAnLmFycm93LnVwJ1xuXG4gICAgIyBpIHdpbGwgY2hlc3RidW1wIG15IG1vbml0b3IgaWYgdGhpcyB3b3Jrc1xuICAgIHNldFRpbWVvdXQgLT5cbiAgICAgICQoJ21ldGFbbmFtZT10aGVtZS1jb2xvcl0nKS5yZW1vdmUoKVxuICAgICAgJCgnaGVhZCcpLmFwcGVuZCgnPG1ldGEgbmFtZT1cInRoZW1lLWNvbG9yXCIgY29udGVudD1cIicgKyBJbmRleC5jb2xvcnNbY3VycmVudF0gKyAnXCI+JylcbiAgICAsIDUwMFxuXG4gICAgZm9yIHNlY3QgaW4gSW5kZXgubmF2XG4gICAgICBpZiBzZWN0IGlzbnQgY3VycmVudFxuICAgICAgICAkKCcuY29sb3JzIC5zdmcnKS5yZW1vdmVDbGFzcyBcInN0YXJfI3tzZWN0fVwiXG4gICAgICAgICQoJy5ib3JkZXInKS5yZW1vdmVDbGFzcyBzZWN0XG4gICAgICAgICQoJy5iZ2NvbG9yJykucmVtb3ZlQ2xhc3Mgc2VjdFxuXG4gICAgJCgnLmNvbG9ycyAuc3ZnJykuYWRkQ2xhc3MgXCJzdGFyXyN7Y3VycmVudH1cIlxuICAgICQoJy5ib3JkZXInKS5hZGRDbGFzcyBjdXJyZW50XG4gICAgJCgnLmJnY29sb3InKS5hZGRDbGFzcyBjdXJyZW50XG5cbiAgICBpZiBkaXJlY3Rpb24gaXMgJ2Rvd24nIG9yIGRpcmVjdGlvbiBpcyAncmlnaHQnXG5cbiAgICAgIF8ub24gXCIuYmFja2dyb3VuZC4je2N1cnJlbnR9XCJcbiAgICAgICQoXCIuYmFja2dyb3VuZC4je2N1cnJlbnR9XCIpLmFkZENsYXNzICdpbkZyb21Cb3R0b20nXG4gICAgICAkKFwiLmJhY2tncm91bmQuI3twcmV2aW91c31cIikuYWRkQ2xhc3MgJ291dFRvVG9wJ1xuXG4gICAgICBfLm9uIFwiLmNvbnRlbnQuI3tjdXJyZW50fVwiXG4gICAgICAkKFwiLmNvbnRlbnQuI3tjdXJyZW50fVwiKS5hZGRDbGFzcyAnY0luRnJvbUJvdHRvbSdcbiAgICAgICQoXCIuY29udGVudC4je3ByZXZpb3VzfVwiKS5hZGRDbGFzcyAnY091dFRvVG9wJ1xuXG4gICAgICBzZXRUaW1lb3V0IC0+XG5cbiAgICAgICAgJChcIi5iYWNrZ3JvdW5kLiN7Y3VycmVudH1cIikucmVtb3ZlQ2xhc3MgJ2luRnJvbUJvdHRvbSdcbiAgICAgICAgJChcIi5iYWNrZ3JvdW5kLiN7cHJldmlvdXN9XCIpLnJlbW92ZUNsYXNzICdvdXRUb1RvcCdcblxuICAgICAgICAkKFwiLmNvbnRlbnQuI3tjdXJyZW50fVwiKS5yZW1vdmVDbGFzcyAnY0luRnJvbUJvdHRvbSdcbiAgICAgICAgJChcIi5jb250ZW50LiN7cHJldmlvdXN9XCIpLnJlbW92ZUNsYXNzICdjT3V0VG9Ub3AnXG5cbiAgICAgICAgZm9yIHNlY3QgaW4gSW5kZXgubmF2XG4gICAgICAgICAgaWYgc2VjdCBpc250IGN1cnJlbnRcbiAgICAgICAgICAgIF8ub2ZmIFwiLmJhY2tncm91bmQuI3tzZWN0fVwiXG4gICAgICAgICAgICBfLm9mZiBcIi5jb250ZW50LiN7c2VjdH1cIlxuXG4gICAgICAsIDEwMDBcblxuICAgIGlmIGRpcmVjdGlvbiBpcyAndXAnIG9yIGRpcmVjdGlvbiBpcyAnbGVmdCdcblxuICAgICAgXy5vbiBcIi5iYWNrZ3JvdW5kLiN7Y3VycmVudH1cIlxuICAgICAgJChcIi5iYWNrZ3JvdW5kLiN7Y3VycmVudH1cIikuYWRkQ2xhc3MgJ2luRnJvbVRvcCdcbiAgICAgICQoXCIuYmFja2dyb3VuZC4je3ByZXZpb3VzfVwiKS5hZGRDbGFzcyAnb3V0VG9Cb3R0b20nXG5cbiAgICAgIF8ub24gXCIuY29udGVudC4je2N1cnJlbnR9XCJcbiAgICAgICQoXCIuY29udGVudC4je2N1cnJlbnR9XCIpLmFkZENsYXNzICdjSW5Gcm9tVG9wJ1xuICAgICAgJChcIi5jb250ZW50LiN7cHJldmlvdXN9XCIpLmFkZENsYXNzICdjT3V0VG9Cb3R0b20nXG5cbiAgICAgIHNldFRpbWVvdXQgLT5cblxuICAgICAgICAkKFwiLmJhY2tncm91bmQuI3twcmV2aW91c31cIikucmVtb3ZlQ2xhc3MgJ291dFRvQm90dG9tJ1xuICAgICAgICAkKFwiLmJhY2tncm91bmQuI3tjdXJyZW50fVwiKS5yZW1vdmVDbGFzcyAnaW5Gcm9tVG9wJ1xuXG4gICAgICAgICQoXCIuY29udGVudC4je3ByZXZpb3VzfVwiKS5yZW1vdmVDbGFzcyAnY091dFRvQm90dG9tJ1xuICAgICAgICAkKFwiLmNvbnRlbnQuI3tjdXJyZW50fVwiKS5yZW1vdmVDbGFzcyAnY0luRnJvbVRvcCdcblxuICAgICAgICBmb3Igc2VjdCBpbiBJbmRleC5uYXZcbiAgICAgICAgICBpZiBzZWN0IGlzbnQgY3VycmVudFxuICAgICAgICAgICAgXy5vZmYgXCIuYmFja2dyb3VuZC4je3NlY3R9XCJcbiAgICAgICAgICAgIF8ub2ZmIFwiLmNvbnRlbnQuI3tzZWN0fVwiXG5cbiAgICAgICwgMTAwMFxuXG4gICAgXy5vZmYgJy5kb3RzID4gLmRvdCdcbiAgICBfLm9uIFwiLmRvdHMgPiAuZG90LmRvdF8je2N1cnJlbnR9XCJcblxuICAgIHRsID0gbmV3IFRpbWVsaW5lTWF4KHtyZXBlYXQ6IDB9KVxuICAgIHRsXG4gICAgICAudG8oXCIuZDFcIiwgMC44LCB7bW9ycGhTVkc6IFwiLiN7Y3VycmVudH0xXCIsIGVhc2U6UG93ZXIzLmVhc2VJbk91dH0sICctPTAuOCcpXG4gICAgICAudG8oXCIuZDJcIiwgMC44LCB7bW9ycGhTVkc6IFwiLiN7Y3VycmVudH0yXCIsIGVhc2U6UG93ZXIzLmVhc2VJbk91dH0sICctPTAuOCcpXG4gICAgICAudG8oXCIuZDNcIiwgMC44LCB7bW9ycGhTVkc6IFwiLiN7Y3VycmVudH0zXCIsIGVhc2U6UG93ZXIzLmVhc2VJbk91dH0sICctPTAuOCcpXG5cblxuIl19
