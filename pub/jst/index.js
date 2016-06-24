var Index;

Index = {
  nav: ['definery', 'iterate', 'navigate', 'product'],
  timeout: 1000,
  paused: false,
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
    return $('.nav').on('click', Index.navHandler);
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
    }, 1000);
  },
  navigate: function(direction) {
    var current, previous;
    console.log('Index.navigate() direction: ' + direction);
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
    return Index.transit(previous, current, direction);
  },
  transit: function(previous, current, direction) {
    var j, len, ref, sect;
    setTimeout(function() {
      $('meta[name=theme-color]').remove();
      return $('head').append('<meta name="theme-color" content="' + Index.colors[current] + '">');
    }, 500);
    ref = Index.nav;
    for (j = 0, len = ref.length; j < len; j++) {
      sect = ref[j];
      if (sect !== current) {
        $('.colors .svg').removeClass(sect);
        $('.border').removeClass(sect);
      }
    }
    $('.colors .svg').addClass(current);
    $('.border').addClass(current);
    if (direction === 'down' || direction === 'right') {
      _.on(".background." + current);
      $(".background." + current).addClass('inFromBottom');
      $(".background." + previous).addClass('outToTop');
      _.on(".content." + current);
      $(".content." + current).addClass('cInFromBottom');
      $(".content." + previous).addClass('cOutToTop');
      setTimeout(function() {
        var k, len1, ref1, results;
        $(".background." + current).removeClass('inFromBottom');
        $(".background." + previous).removeClass('outToTop');
        $(".content." + current).removeClass('cInFromBottom');
        $(".content." + previous).removeClass('cOutToTop');
        ref1 = Index.nav;
        results = [];
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          sect = ref1[k];
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
        var k, len1, ref1, results;
        $(".background." + previous).removeClass('outToBottom');
        $(".background." + current).removeClass('inFromTop');
        $(".content." + previous).removeClass('cOutToBottom');
        $(".content." + current).removeClass('cInFromTop');
        ref1 = Index.nav;
        results = [];
        for (k = 0, len1 = ref1.length; k < len1; k++) {
          sect = ref1[k];
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
    return $(".to_" + current).each(function(i, el) {
      el.beginElement();
      return console.log(current + ".beginElement()");
    });
  }
};

//# sourceMappingURL=data:application/json;base64,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QUMsQ0FBQyxHQUFGLENBQU0sY0FBQSxHQUFlLElBQXJCO3lCQUNBLENBQUMsQ0FBQyxHQUFGLENBQU0sV0FBQSxHQUFZLElBQWxCLEdBRkY7V0FBQSxNQUFBO2lDQUFBOztBQURGOztNQVJTLENBQVgsRUFhRSxJQWJGLEVBVkY7O1dBeUJBLENBQUEsQ0FBRSxNQUFBLEdBQU8sT0FBVCxDQUFtQixDQUFDLElBQXBCLENBQXlCLFNBQUMsQ0FBRCxFQUFJLEVBQUo7TUFDdkIsRUFBRSxDQUFDLFlBQUgsQ0FBQTthQUNBLE9BQU8sQ0FBQyxHQUFSLENBQWdCLE9BQUQsR0FBUyxpQkFBeEI7SUFGdUIsQ0FBekI7RUFsRU8sQ0E1RFQiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJJbmRleCA9XG5cbiAgbmF2OiBbJ2RlZmluZXJ5JywnaXRlcmF0ZScsICduYXZpZ2F0ZScsICdwcm9kdWN0J11cbiAgdGltZW91dDogMTAwMFxuICBwYXVzZWQ6IGZhbHNlXG5cbiAgY29sb3JzOlxuICAgICdkZWZpbmVyeSc6IGRhdGEuY29sb3IudGVhbDFcbiAgICAnaXRlcmF0ZSc6IGRhdGEuY29sb3IuYmx1ZTFcbiAgICAnbmF2aWdhdGUnOiBkYXRhLmNvbG9yLmdyZWVuMVxuICAgICdwcm9kdWN0JzogZGF0YS5jb2xvci5waW5rMVxuXG4gIGN1cnJlbnQ6IDBcblxuICBpOiAtPlxuXG4gICAgSW5kZXguaGFuZGxlcnMoKVxuXG4gIGhhbmRsZXJzOiAtPlxuXG4gICAgRGV0ZWN0LmhhbmRsZXIgSW5kZXgubmF2aWdhdGVcblxuICAgICQoJy5uYXYnKS5vbiAnY2xpY2snLCBJbmRleC5uYXZIYW5kbGVyXG5cbiAgbmF2SGFuZGxlcjogLT5cblxuICAgIHJldHVybiB0cnVlIGlmIEluZGV4LnBhdXNlZFxuICAgIHQgPSAkKHRoaXMpXG5cbiAgICBwcmV2aW91cyA9IHQuZGF0YSAnZnJvbSdcbiAgICBjdXJyZW50ID0gdC5kYXRhICd0bydcbiAgICBkaXJlY3Rpb24gPSB0LmRhdGEgJ2RpcidcblxuICAgIEluZGV4LnRyYW5zaXQocHJldmlvdXMsIGN1cnJlbnQsIGRpcmVjdGlvbilcblxuICAgIEluZGV4LnBhdXNlZCA9IHRydWVcbiAgICBzZXRUaW1lb3V0IC0+XG4gICAgICBJbmRleC5wYXVzZWQgPSBmYWxzZVxuICAgICwgMTAwMFxuXG4gIG5hdmlnYXRlOiAoZGlyZWN0aW9uKSAtPlxuXG4gICAgY29uc29sZS5sb2cgJ0luZGV4Lm5hdmlnYXRlKCkgZGlyZWN0aW9uOiAnICsgZGlyZWN0aW9uXG5cbiAgICBwcmV2aW91cyA9IEluZGV4Lm5hdltJbmRleC5jdXJyZW50XVxuXG4gICAgaWYgZGlyZWN0aW9uIGlzICdkb3duJyBvciBkaXJlY3Rpb24gaXMgJ3JpZ2h0J1xuICAgICAgaWYgKEluZGV4LmN1cnJlbnQgPT0gKEluZGV4Lm5hdi5sZW5ndGgtMSkpXG4gICAgICAgIEluZGV4LmN1cnJlbnQgPSAwXG4gICAgICBlbHNlXG4gICAgICAgIEluZGV4LmN1cnJlbnQrK1xuXG4gICAgaWYgZGlyZWN0aW9uIGlzICd1cCcgb3IgZGlyZWN0aW9uIGlzICdsZWZ0J1xuICAgICAgaWYgKEluZGV4LmN1cnJlbnQgPT0gMClcbiAgICAgICAgSW5kZXguY3VycmVudCA9IEluZGV4Lm5hdi5sZW5ndGgtMVxuICAgICAgZWxzZVxuICAgICAgICBJbmRleC5jdXJyZW50LS1cblxuICAgIGN1cnJlbnQgPSBJbmRleC5uYXZbSW5kZXguY3VycmVudF1cblxuICAgIEluZGV4LnRyYW5zaXQocHJldmlvdXMsIGN1cnJlbnQsIGRpcmVjdGlvbilcblxuICB0cmFuc2l0OiAocHJldmlvdXMsIGN1cnJlbnQsIGRpcmVjdGlvbikgLT5cblxuICAgICMgaSB3aWxsIGNoZXN0YnVtcCBteSBtb25pdG9yIGlmIHRoaXMgd29ya3NcbiAgICBzZXRUaW1lb3V0IC0+XG4gICAgICAkKCdtZXRhW25hbWU9dGhlbWUtY29sb3JdJykucmVtb3ZlKClcbiAgICAgICQoJ2hlYWQnKS5hcHBlbmQoJzxtZXRhIG5hbWU9XCJ0aGVtZS1jb2xvclwiIGNvbnRlbnQ9XCInICsgSW5kZXguY29sb3JzW2N1cnJlbnRdICsgJ1wiPicpXG4gICAgLCA1MDBcblxuICAgIGZvciBzZWN0IGluIEluZGV4Lm5hdlxuICAgICAgaWYgc2VjdCBpc250IGN1cnJlbnRcbiAgICAgICAgJCgnLmNvbG9ycyAuc3ZnJykucmVtb3ZlQ2xhc3Mgc2VjdFxuICAgICAgICAkKCcuYm9yZGVyJykucmVtb3ZlQ2xhc3Mgc2VjdFxuXG4gICAgJCgnLmNvbG9ycyAuc3ZnJykuYWRkQ2xhc3MgY3VycmVudFxuICAgICQoJy5ib3JkZXInKS5hZGRDbGFzcyBjdXJyZW50XG5cbiAgICBpZiBkaXJlY3Rpb24gaXMgJ2Rvd24nIG9yIGRpcmVjdGlvbiBpcyAncmlnaHQnXG5cbiAgICAgIF8ub24gXCIuYmFja2dyb3VuZC4je2N1cnJlbnR9XCJcbiAgICAgICQoXCIuYmFja2dyb3VuZC4je2N1cnJlbnR9XCIpLmFkZENsYXNzICdpbkZyb21Cb3R0b20nXG4gICAgICAkKFwiLmJhY2tncm91bmQuI3twcmV2aW91c31cIikuYWRkQ2xhc3MgJ291dFRvVG9wJ1xuXG4gICAgICBfLm9uIFwiLmNvbnRlbnQuI3tjdXJyZW50fVwiXG4gICAgICAkKFwiLmNvbnRlbnQuI3tjdXJyZW50fVwiKS5hZGRDbGFzcyAnY0luRnJvbUJvdHRvbSdcbiAgICAgICQoXCIuY29udGVudC4je3ByZXZpb3VzfVwiKS5hZGRDbGFzcyAnY091dFRvVG9wJ1xuXG4gICAgICBzZXRUaW1lb3V0IC0+XG5cbiAgICAgICAgJChcIi5iYWNrZ3JvdW5kLiN7Y3VycmVudH1cIikucmVtb3ZlQ2xhc3MgJ2luRnJvbUJvdHRvbSdcbiAgICAgICAgJChcIi5iYWNrZ3JvdW5kLiN7cHJldmlvdXN9XCIpLnJlbW92ZUNsYXNzICdvdXRUb1RvcCdcblxuICAgICAgICAkKFwiLmNvbnRlbnQuI3tjdXJyZW50fVwiKS5yZW1vdmVDbGFzcyAnY0luRnJvbUJvdHRvbSdcbiAgICAgICAgJChcIi5jb250ZW50LiN7cHJldmlvdXN9XCIpLnJlbW92ZUNsYXNzICdjT3V0VG9Ub3AnXG5cbiAgICAgICAgZm9yIHNlY3QgaW4gSW5kZXgubmF2XG4gICAgICAgICAgaWYgc2VjdCBpc250IGN1cnJlbnRcbiAgICAgICAgICAgIF8ub2ZmIFwiLmJhY2tncm91bmQuI3tzZWN0fVwiXG4gICAgICAgICAgICBfLm9mZiBcIi5jb250ZW50LiN7c2VjdH1cIlxuXG4gICAgICAsIDEwMDBcblxuICAgIGlmIGRpcmVjdGlvbiBpcyAndXAnIG9yIGRpcmVjdGlvbiBpcyAnbGVmdCdcblxuICAgICAgXy5vbiBcIi5iYWNrZ3JvdW5kLiN7Y3VycmVudH1cIlxuICAgICAgJChcIi5iYWNrZ3JvdW5kLiN7Y3VycmVudH1cIikuYWRkQ2xhc3MgJ2luRnJvbVRvcCdcbiAgICAgICQoXCIuYmFja2dyb3VuZC4je3ByZXZpb3VzfVwiKS5hZGRDbGFzcyAnb3V0VG9Cb3R0b20nXG5cbiAgICAgIF8ub24gXCIuY29udGVudC4je2N1cnJlbnR9XCJcbiAgICAgICQoXCIuY29udGVudC4je2N1cnJlbnR9XCIpLmFkZENsYXNzICdjSW5Gcm9tVG9wJ1xuICAgICAgJChcIi5jb250ZW50LiN7cHJldmlvdXN9XCIpLmFkZENsYXNzICdjT3V0VG9Cb3R0b20nXG5cbiAgICAgIHNldFRpbWVvdXQgLT5cblxuICAgICAgICAkKFwiLmJhY2tncm91bmQuI3twcmV2aW91c31cIikucmVtb3ZlQ2xhc3MgJ291dFRvQm90dG9tJ1xuICAgICAgICAkKFwiLmJhY2tncm91bmQuI3tjdXJyZW50fVwiKS5yZW1vdmVDbGFzcyAnaW5Gcm9tVG9wJ1xuXG4gICAgICAgICQoXCIuY29udGVudC4je3ByZXZpb3VzfVwiKS5yZW1vdmVDbGFzcyAnY091dFRvQm90dG9tJ1xuICAgICAgICAkKFwiLmNvbnRlbnQuI3tjdXJyZW50fVwiKS5yZW1vdmVDbGFzcyAnY0luRnJvbVRvcCdcblxuICAgICAgICBmb3Igc2VjdCBpbiBJbmRleC5uYXZcbiAgICAgICAgICBpZiBzZWN0IGlzbnQgY3VycmVudFxuICAgICAgICAgICAgXy5vZmYgXCIuYmFja2dyb3VuZC4je3NlY3R9XCJcbiAgICAgICAgICAgIF8ub2ZmIFwiLmNvbnRlbnQuI3tzZWN0fVwiXG5cbiAgICAgICwgMTAwMFxuXG4gICAgJChcIi50b18je2N1cnJlbnR9XCIpLmVhY2ggKGksIGVsKSAtPlxuICAgICAgZWwuYmVnaW5FbGVtZW50KClcbiAgICAgIGNvbnNvbGUubG9nICBcIiN7Y3VycmVudH0uYmVnaW5FbGVtZW50KClcIlxuXG4iXX0=
