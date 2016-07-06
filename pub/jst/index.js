var Index;

Index = {
  nav: ['definery', 'iterate', 'navigate', 'product'],
  timeout: 1300,
  paused: false,
  tl: false,
  colors: {
    'definery': data.color.teal1,
    'iterate': data.color.blue1,
    'navigate': data.color.green1,
    'product': data.color.pink1
  },
  current: 0,
  i: function() {
    return Index.handlers();
  },
  handlers: function() {
    Detect.handler(Index.navigate);
    $('.nav').on('click', Index.navHandler);
    $('.dots > .dot').on('click', Index.dotHandler);
    $('.menu > .option').on('click', Index.menuHandler);
    return $('.contact_cta').on('click', Index.contact);
  },
  contact: function() {
    _.swap('.contact');
    return _.swap('.menu');
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
    return setTimeout(function() {
      return Index.paused = false;
    }, Index.timeout);
  },
  navigate: function(direction) {
    var current, previous;
    if (Index.paused) {
      return true;
    }
    previous = Index.nav[Index.current];
    if (direction === 'down' || direction === 'right') {
      if (Index.current === (Index.nav.length - 1)) {
        Index.current = 0;
      } else {
        Index.current++;
      }
    }
    if (direction === 'up' || direction === 'left') {
      if (Index.current === 0) {
        Index.current = Index.nav.length - 1;
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
      }
    }
    $('.colors .svg').addClass("star_" + current);
    $('.border').addClass(current);
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
    return tl.to("#d1a", 1, {
      morphSVG: "#" + current + "1a",
      ease: Back.easeOut
    }, '-=1').to("#d2a", 1, {
      morphSVG: "#" + current + "2a",
      ease: Back.easeOut
    }, '-=1').to("#d3a", 1, {
      morphSVG: "#" + current + "3a",
      ease: Back.easeOut
    }, '-=1').to("#d1b", 1, {
      morphSVG: "#" + current + "1b",
      ease: Back.easeOut
    }, '-=1').to("#d2b", 1, {
      morphSVG: "#" + current + "2b",
      ease: Back.easeOut
    }, '-=1').to("#d3b", 1, {
      morphSVG: "#" + current + "3b",
      ease: Back.easeOut
    }, '-=1');
  }
};

//# sourceMappingURL=data:application/json;base64,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LElBQUksQ0FBQyxPQUF0QztLQUpqQixFQUlpRSxLQUpqRSxDQUtFLENBQUMsRUFMSCxDQUtNLE1BTE4sRUFLYyxDQUxkLEVBS2lCO01BQUMsUUFBQSxFQUFVLEdBQUEsR0FBSSxPQUFKLEdBQVksSUFBdkI7TUFBNEIsSUFBQSxFQUFLLElBQUksQ0FBQyxPQUF0QztLQUxqQixFQUtpRSxLQUxqRSxDQU1FLENBQUMsRUFOSCxDQU1NLE1BTk4sRUFNYyxDQU5kLEVBTWlCO01BQUMsUUFBQSxFQUFVLEdBQUEsR0FBSSxPQUFKLEdBQVksSUFBdkI7TUFBNEIsSUFBQSxFQUFLLElBQUksQ0FBQyxPQUF0QztLQU5qQixFQU1pRSxLQU5qRTtFQXhFTyxDQXhHVCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIkluZGV4ID1cblxuICBuYXY6IFsnZGVmaW5lcnknLCdpdGVyYXRlJywgJ25hdmlnYXRlJywgJ3Byb2R1Y3QnXVxuICB0aW1lb3V0OiAxMzAwXG4gIHBhdXNlZDogZmFsc2VcblxuICB0bDogZmFsc2VcblxuICBjb2xvcnM6XG4gICAgJ2RlZmluZXJ5JzogZGF0YS5jb2xvci50ZWFsMVxuICAgICdpdGVyYXRlJzogZGF0YS5jb2xvci5ibHVlMVxuICAgICduYXZpZ2F0ZSc6IGRhdGEuY29sb3IuZ3JlZW4xXG4gICAgJ3Byb2R1Y3QnOiBkYXRhLmNvbG9yLnBpbmsxXG5cbiAgY3VycmVudDogMFxuXG4gIGk6IC0+XG5cbiAgICAjVHdlZW5MaXRlLnNldChcInN2Z1wiLCB7dmlzaWJpbGl0eTpcInZpc2libGVcIn0pXG5cbiAgICAjSW5kZXgudGwudG8oXCIjZDFhXCIsIDEsIHttb3JwaFNWRzogXCIjZGVmaW5lcnkxYVwifSwgJy09MScpXG4gICAgI0luZGV4LnRsLnRvKFwiI2QyYVwiLCAxLCB7bW9ycGhTVkc6IFwiI2RlZmluZXJ5MmFcIn0sICctPTEnKVxuICAgICNJbmRleC50bC50byhcIiNkM2FcIiwgMSwge21vcnBoU1ZHOiBcIiNkZWZpbmVyeTNhXCJ9LCAnLT0xJylcblxuICAgICNJbmRleC50bC50byhcIiNkMWJcIiwgMSwge21vcnBoU1ZHOiBcIiNkZWZpbmVyeTFiXCJ9LCAnLT0xJylcbiAgICAjSW5kZXgudGwudG8oXCIjZDJiXCIsIDEsIHttb3JwaFNWRzogXCIjZGVmaW5lcnkyYlwifSwgJy09MScpXG4gICAgI0luZGV4LnRsLnRvKFwiI2QzYlwiLCAxLCB7bW9ycGhTVkc6IFwiI2RlZmluZXJ5M2JcIn0sICctPTEnKVxuXG4gICAgSW5kZXguaGFuZGxlcnMoKVxuXG4gIGhhbmRsZXJzOiAtPlxuXG4gICAgRGV0ZWN0LmhhbmRsZXIgSW5kZXgubmF2aWdhdGVcblxuICAgICQoJy5uYXYnKS5vbiAnY2xpY2snLCBJbmRleC5uYXZIYW5kbGVyXG4gICAgJCgnLmRvdHMgPiAuZG90Jykub24gJ2NsaWNrJywgSW5kZXguZG90SGFuZGxlclxuICAgICQoJy5tZW51ID4gLm9wdGlvbicpLm9uICdjbGljaycsIEluZGV4Lm1lbnVIYW5kbGVyXG5cbiAgICAkKCcuY29udGFjdF9jdGEnKS5vbiAnY2xpY2snLCBJbmRleC5jb250YWN0XG5cbiAgY29udGFjdDogLT5cbiAgICBfLnN3YXAgJy5jb250YWN0J1xuICAgIF8uc3dhcCAnLm1lbnUnXG5cbiAgbmF2SGFuZGxlcjogLT5cblxuICAgIHJldHVybiB0cnVlIGlmIEluZGV4LnBhdXNlZFxuICAgIHQgPSAkKHRoaXMpXG5cbiAgICBwcmV2aW91cyA9IHQuZGF0YSAnZnJvbSdcbiAgICBjdXJyZW50ID0gdC5kYXRhICd0bydcbiAgICBkaXJlY3Rpb24gPSB0LmRhdGEgJ2RpcidcblxuICAgIEluZGV4LnRyYW5zaXQocHJldmlvdXMsIGN1cnJlbnQsIGRpcmVjdGlvbilcblxuICAgIEluZGV4LnBhdXNlZCA9IHRydWVcbiAgICBzZXRUaW1lb3V0IC0+XG4gICAgICBJbmRleC5wYXVzZWQgPSBmYWxzZVxuICAgICxJbmRleC50aW1lb3V0XG5cblxuICBkb3RIYW5kbGVyOiAtPlxuXG4gICAgcmV0dXJuIHRydWUgaWYgSW5kZXgucGF1c2VkXG5cbiAgICBwcmV2aW91cyA9ICQoJy5kb3RzIC5kb3Qub24nKS5kYXRhICdzZWN0J1xuICAgIHBudW0gPSAkKCcuZG90cyAuZG90Lm9uJykuZGF0YSAgJ251bSdcbiAgICBjdXJyZW50ID0gJCh0aGlzKS5kYXRhICdzZWN0J1xuICAgIGNudW0gPSAkKHRoaXMpLmRhdGEgJ251bSdcblxuICAgIGlmIGNudW0gPiBwbnVtIHRoZW4gZGlyZWN0aW9uID0gJ2Rvd24nIGVsc2UgZGlyZWN0aW9uID0gJ3VwJ1xuXG4gICAgSW5kZXgudHJhbnNpdCBwcmV2aW91cywgY3VycmVudCwgZGlyZWN0aW9uXG5cbiAgICBJbmRleC5wYXVzZWQgPSB0cnVlXG4gICAgc2V0VGltZW91dCAtPlxuICAgICAgSW5kZXgucGF1c2VkID0gZmFsc2VcbiAgICAsIEluZGV4LnRpbWVvdXRcblxuICBuYXZpZ2F0ZTogKGRpcmVjdGlvbikgLT5cblxuICAgIHJldHVybiB0cnVlIGlmIEluZGV4LnBhdXNlZFxuXG4gICAgcHJldmlvdXMgPSBJbmRleC5uYXZbSW5kZXguY3VycmVudF1cblxuICAgIGlmIGRpcmVjdGlvbiBpcyAnZG93bicgb3IgZGlyZWN0aW9uIGlzICdyaWdodCdcbiAgICAgIGlmIChJbmRleC5jdXJyZW50ID09IChJbmRleC5uYXYubGVuZ3RoLTEpKVxuICAgICAgICBJbmRleC5jdXJyZW50ID0gMFxuICAgICAgZWxzZVxuICAgICAgICBJbmRleC5jdXJyZW50KytcblxuICAgIGlmIGRpcmVjdGlvbiBpcyAndXAnIG9yIGRpcmVjdGlvbiBpcyAnbGVmdCdcbiAgICAgIGlmIChJbmRleC5jdXJyZW50ID09IDApXG4gICAgICAgIEluZGV4LmN1cnJlbnQgPSBJbmRleC5uYXYubGVuZ3RoLTFcbiAgICAgIGVsc2VcbiAgICAgICAgSW5kZXguY3VycmVudC0tXG5cbiAgICBjdXJyZW50ID0gSW5kZXgubmF2W0luZGV4LmN1cnJlbnRdXG5cbiAgICBJbmRleC50cmFuc2l0KHByZXZpb3VzLCBjdXJyZW50LCBkaXJlY3Rpb24pXG5cbiAgICBJbmRleC5wYXVzZWQgPSB0cnVlXG4gICAgc2V0VGltZW91dCAtPlxuICAgICAgSW5kZXgucGF1c2VkID0gZmFsc2VcbiAgICAsIEluZGV4LnRpbWVvdXRcblxuICB0cmFuc2l0OiAocHJldmlvdXMsIGN1cnJlbnQsIGRpcmVjdGlvbikgLT5cblxuICAgIHJldHVybiB0cnVlIGlmIHByZXZpb3VzIGlzIHVuZGVmaW5lZFxuXG4gICAgIyBpIHdpbGwgY2hlc3RidW1wIG15IG1vbml0b3IgaWYgdGhpcyB3b3Jrc1xuICAgIHNldFRpbWVvdXQgLT5cbiAgICAgICQoJ21ldGFbbmFtZT10aGVtZS1jb2xvcl0nKS5yZW1vdmUoKVxuICAgICAgJCgnaGVhZCcpLmFwcGVuZCgnPG1ldGEgbmFtZT1cInRoZW1lLWNvbG9yXCIgY29udGVudD1cIicgKyBJbmRleC5jb2xvcnNbY3VycmVudF0gKyAnXCI+JylcbiAgICAsIDUwMFxuXG4gICAgZm9yIHNlY3QgaW4gSW5kZXgubmF2XG4gICAgICBpZiBzZWN0IGlzbnQgY3VycmVudFxuICAgICAgICAkKCcuY29sb3JzIC5zdmcnKS5yZW1vdmVDbGFzcyBcInN0YXJfI3tzZWN0fVwiXG4gICAgICAgICQoJy5ib3JkZXInKS5yZW1vdmVDbGFzcyBzZWN0XG5cbiAgICAkKCcuY29sb3JzIC5zdmcnKS5hZGRDbGFzcyBcInN0YXJfI3tjdXJyZW50fVwiXG4gICAgJCgnLmJvcmRlcicpLmFkZENsYXNzIGN1cnJlbnRcblxuICAgIGlmIGRpcmVjdGlvbiBpcyAnZG93bicgb3IgZGlyZWN0aW9uIGlzICdyaWdodCdcblxuICAgICAgXy5vbiBcIi5iYWNrZ3JvdW5kLiN7Y3VycmVudH1cIlxuICAgICAgJChcIi5iYWNrZ3JvdW5kLiN7Y3VycmVudH1cIikuYWRkQ2xhc3MgJ2luRnJvbUJvdHRvbSdcbiAgICAgICQoXCIuYmFja2dyb3VuZC4je3ByZXZpb3VzfVwiKS5hZGRDbGFzcyAnb3V0VG9Ub3AnXG5cbiAgICAgIF8ub24gXCIuY29udGVudC4je2N1cnJlbnR9XCJcbiAgICAgICQoXCIuY29udGVudC4je2N1cnJlbnR9XCIpLmFkZENsYXNzICdjSW5Gcm9tQm90dG9tJ1xuICAgICAgJChcIi5jb250ZW50LiN7cHJldmlvdXN9XCIpLmFkZENsYXNzICdjT3V0VG9Ub3AnXG5cbiAgICAgIHNldFRpbWVvdXQgLT5cblxuICAgICAgICAkKFwiLmJhY2tncm91bmQuI3tjdXJyZW50fVwiKS5yZW1vdmVDbGFzcyAnaW5Gcm9tQm90dG9tJ1xuICAgICAgICAkKFwiLmJhY2tncm91bmQuI3twcmV2aW91c31cIikucmVtb3ZlQ2xhc3MgJ291dFRvVG9wJ1xuXG4gICAgICAgICQoXCIuY29udGVudC4je2N1cnJlbnR9XCIpLnJlbW92ZUNsYXNzICdjSW5Gcm9tQm90dG9tJ1xuICAgICAgICAkKFwiLmNvbnRlbnQuI3twcmV2aW91c31cIikucmVtb3ZlQ2xhc3MgJ2NPdXRUb1RvcCdcblxuICAgICAgICBmb3Igc2VjdCBpbiBJbmRleC5uYXZcbiAgICAgICAgICBpZiBzZWN0IGlzbnQgY3VycmVudFxuICAgICAgICAgICAgXy5vZmYgXCIuYmFja2dyb3VuZC4je3NlY3R9XCJcbiAgICAgICAgICAgIF8ub2ZmIFwiLmNvbnRlbnQuI3tzZWN0fVwiXG5cbiAgICAgICwgMTAwMFxuXG4gICAgaWYgZGlyZWN0aW9uIGlzICd1cCcgb3IgZGlyZWN0aW9uIGlzICdsZWZ0J1xuXG4gICAgICBfLm9uIFwiLmJhY2tncm91bmQuI3tjdXJyZW50fVwiXG4gICAgICAkKFwiLmJhY2tncm91bmQuI3tjdXJyZW50fVwiKS5hZGRDbGFzcyAnaW5Gcm9tVG9wJ1xuICAgICAgJChcIi5iYWNrZ3JvdW5kLiN7cHJldmlvdXN9XCIpLmFkZENsYXNzICdvdXRUb0JvdHRvbSdcblxuICAgICAgXy5vbiBcIi5jb250ZW50LiN7Y3VycmVudH1cIlxuICAgICAgJChcIi5jb250ZW50LiN7Y3VycmVudH1cIikuYWRkQ2xhc3MgJ2NJbkZyb21Ub3AnXG4gICAgICAkKFwiLmNvbnRlbnQuI3twcmV2aW91c31cIikuYWRkQ2xhc3MgJ2NPdXRUb0JvdHRvbSdcblxuICAgICAgc2V0VGltZW91dCAtPlxuXG4gICAgICAgICQoXCIuYmFja2dyb3VuZC4je3ByZXZpb3VzfVwiKS5yZW1vdmVDbGFzcyAnb3V0VG9Cb3R0b20nXG4gICAgICAgICQoXCIuYmFja2dyb3VuZC4je2N1cnJlbnR9XCIpLnJlbW92ZUNsYXNzICdpbkZyb21Ub3AnXG5cbiAgICAgICAgJChcIi5jb250ZW50LiN7cHJldmlvdXN9XCIpLnJlbW92ZUNsYXNzICdjT3V0VG9Cb3R0b20nXG4gICAgICAgICQoXCIuY29udGVudC4je2N1cnJlbnR9XCIpLnJlbW92ZUNsYXNzICdjSW5Gcm9tVG9wJ1xuXG4gICAgICAgIGZvciBzZWN0IGluIEluZGV4Lm5hdlxuICAgICAgICAgIGlmIHNlY3QgaXNudCBjdXJyZW50XG4gICAgICAgICAgICBfLm9mZiBcIi5iYWNrZ3JvdW5kLiN7c2VjdH1cIlxuICAgICAgICAgICAgXy5vZmYgXCIuY29udGVudC4je3NlY3R9XCJcblxuICAgICAgLCAxMDAwXG5cbiAgICBfLm9mZiAnLmRvdHMgPiAuZG90J1xuICAgIF8ub24gXCIuZG90cyA+IC5kb3QuZG90XyN7Y3VycmVudH1cIlxuXG4gICAgdGwgPSBuZXcgVGltZWxpbmVNYXgoe3JlcGVhdDogMH0pXG4gICAgdGxcbiAgICAgIC50byhcIiNkMWFcIiwgMSwge21vcnBoU1ZHOiBcIiMje2N1cnJlbnR9MWFcIiwgZWFzZTpCYWNrLmVhc2VPdXR9LCAnLT0xJylcbiAgICAgIC50byhcIiNkMmFcIiwgMSwge21vcnBoU1ZHOiBcIiMje2N1cnJlbnR9MmFcIiwgZWFzZTpCYWNrLmVhc2VPdXR9LCAnLT0xJylcbiAgICAgIC50byhcIiNkM2FcIiwgMSwge21vcnBoU1ZHOiBcIiMje2N1cnJlbnR9M2FcIiwgZWFzZTpCYWNrLmVhc2VPdXR9LCAnLT0xJylcbiAgICAgIC50byhcIiNkMWJcIiwgMSwge21vcnBoU1ZHOiBcIiMje2N1cnJlbnR9MWJcIiwgZWFzZTpCYWNrLmVhc2VPdXR9LCAnLT0xJylcbiAgICAgIC50byhcIiNkMmJcIiwgMSwge21vcnBoU1ZHOiBcIiMje2N1cnJlbnR9MmJcIiwgZWFzZTpCYWNrLmVhc2VPdXR9LCAnLT0xJylcbiAgICAgIC50byhcIiNkM2JcIiwgMSwge21vcnBoU1ZHOiBcIiMje2N1cnJlbnR9M2JcIiwgZWFzZTpCYWNrLmVhc2VPdXR9LCAnLT0xJylcblxuIl19
