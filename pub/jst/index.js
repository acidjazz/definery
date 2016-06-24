var Index;

Index = {
  nav: ['definery', 'iterate', 'navigate', 'product'],
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
    t = $(this);
    previous = t.data('from');
    current = t.data('to');
    direction = t.data('dir');
    return Index.transit(previous, current, direction);
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
        $(".background." + current).removeClass('inFromBottom');
        $(".background." + previous).removeClass('outToTop');
        _.off(".background." + previous);
        $(".content." + current).removeClass('cInFromBottom');
        $(".content." + previous).removeClass('cOutToTop');
        return _.off(".content." + previous);
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
        $(".background." + previous).removeClass('outToBottom');
        $(".background." + current).removeClass('inFromTop');
        _.off(".background." + previous);
        $(".content." + previous).removeClass('cOutToBottom');
        $(".content." + current).removeClass('cInFromTop');
        return _.off(".content." + previous);
      }, 1000);
    }
    return $(".to_" + current).each(function(i, el) {
      return el.beginElement();
    });
  }
};

//# sourceMappingURL=data:application/json;base64,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RUUsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxjQUFBLEdBQWUsT0FBcEI7TUFDQSxDQUFBLENBQUUsY0FBQSxHQUFlLE9BQWpCLENBQTJCLENBQUMsUUFBNUIsQ0FBcUMsV0FBckM7TUFDQSxDQUFBLENBQUUsY0FBQSxHQUFlLFFBQWpCLENBQTRCLENBQUMsUUFBN0IsQ0FBc0MsYUFBdEM7TUFFQSxDQUFDLENBQUMsRUFBRixDQUFLLFdBQUEsR0FBWSxPQUFqQjtNQUNBLENBQUEsQ0FBRSxXQUFBLEdBQVksT0FBZCxDQUF3QixDQUFDLFFBQXpCLENBQWtDLFlBQWxDO01BQ0EsQ0FBQSxDQUFFLFdBQUEsR0FBWSxRQUFkLENBQXlCLENBQUMsUUFBMUIsQ0FBbUMsY0FBbkM7TUFFQSxVQUFBLENBQVcsU0FBQTtRQUVULENBQUEsQ0FBRSxjQUFBLEdBQWUsUUFBakIsQ0FBNEIsQ0FBQyxXQUE3QixDQUF5QyxhQUF6QztRQUNBLENBQUEsQ0FBRSxjQUFBLEdBQWUsT0FBakIsQ0FBMkIsQ0FBQyxXQUE1QixDQUF3QyxXQUF4QztRQUNBLENBQUMsQ0FBQyxHQUFGLENBQU0sY0FBQSxHQUFlLFFBQXJCO1FBRUEsQ0FBQSxDQUFFLFdBQUEsR0FBWSxRQUFkLENBQXlCLENBQUMsV0FBMUIsQ0FBc0MsY0FBdEM7UUFDQSxDQUFBLENBQUUsV0FBQSxHQUFZLE9BQWQsQ0FBd0IsQ0FBQyxXQUF6QixDQUFxQyxZQUFyQztlQUNBLENBQUMsQ0FBQyxHQUFGLENBQU0sV0FBQSxHQUFZLFFBQWxCO01BUlMsQ0FBWCxFQVVFLElBVkYsRUFWRjs7V0FzQkEsQ0FBQSxDQUFFLE1BQUEsR0FBTyxPQUFULENBQW1CLENBQUMsSUFBcEIsQ0FBeUIsU0FBQyxDQUFELEVBQUksRUFBSjthQUN2QixFQUFFLENBQUMsWUFBSCxDQUFBO0lBRHVCLENBQXpCO0VBNURPLENBbkRUIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiSW5kZXggPVxuXG4gIG5hdjogWydkZWZpbmVyeScsJ2l0ZXJhdGUnLCAnbmF2aWdhdGUnLCAncHJvZHVjdCddXG5cbiAgY29sb3JzOlxuICAgICdkZWZpbmVyeSc6IGRhdGEuY29sb3IudGVhbDFcbiAgICAnaXRlcmF0ZSc6IGRhdGEuY29sb3IuYmx1ZTFcbiAgICAnbmF2aWdhdGUnOiBkYXRhLmNvbG9yLmdyZWVuMVxuICAgICdwcm9kdWN0JzogZGF0YS5jb2xvci5waW5rMVxuXG4gIGN1cnJlbnQ6IDBcblxuICBpOiAtPlxuXG4gICAgSW5kZXguaGFuZGxlcnMoKVxuXG4gIGhhbmRsZXJzOiAtPlxuXG4gICAgRGV0ZWN0LmhhbmRsZXIgSW5kZXgubmF2aWdhdGVcblxuICAgICQoJy5uYXYnKS5vbiAnY2xpY2snLCBJbmRleC5uYXZIYW5kbGVyXG5cbiAgbmF2SGFuZGxlcjogLT5cbiAgICB0ID0gJCh0aGlzKVxuXG4gICAgcHJldmlvdXMgPSB0LmRhdGEgJ2Zyb20nXG4gICAgY3VycmVudCA9IHQuZGF0YSAndG8nXG4gICAgZGlyZWN0aW9uID0gdC5kYXRhICdkaXInXG5cbiAgICBJbmRleC50cmFuc2l0KHByZXZpb3VzLCBjdXJyZW50LCBkaXJlY3Rpb24pXG5cbiAgbmF2aWdhdGU6IChkaXJlY3Rpb24pIC0+XG5cbiAgICBjb25zb2xlLmxvZyAnSW5kZXgubmF2aWdhdGUoKSBkaXJlY3Rpb246ICcgKyBkaXJlY3Rpb25cblxuICAgIHByZXZpb3VzID0gSW5kZXgubmF2W0luZGV4LmN1cnJlbnRdXG5cbiAgICBpZiBkaXJlY3Rpb24gaXMgJ2Rvd24nIG9yIGRpcmVjdGlvbiBpcyAncmlnaHQnXG4gICAgICBpZiAoSW5kZXguY3VycmVudCA9PSAoSW5kZXgubmF2Lmxlbmd0aC0xKSlcbiAgICAgICAgSW5kZXguY3VycmVudCA9IDBcbiAgICAgIGVsc2VcbiAgICAgICAgSW5kZXguY3VycmVudCsrXG5cbiAgICBpZiBkaXJlY3Rpb24gaXMgJ3VwJyBvciBkaXJlY3Rpb24gaXMgJ2xlZnQnXG4gICAgICBpZiAoSW5kZXguY3VycmVudCA9PSAwKVxuICAgICAgICBJbmRleC5jdXJyZW50ID0gSW5kZXgubmF2Lmxlbmd0aC0xXG4gICAgICBlbHNlXG4gICAgICAgIEluZGV4LmN1cnJlbnQtLVxuXG4gICAgY3VycmVudCA9IEluZGV4Lm5hdltJbmRleC5jdXJyZW50XVxuXG4gICAgSW5kZXgudHJhbnNpdChwcmV2aW91cywgY3VycmVudCwgZGlyZWN0aW9uKVxuXG4gIHRyYW5zaXQ6IChwcmV2aW91cywgY3VycmVudCwgZGlyZWN0aW9uKSAtPlxuXG4gICAgIyBpIHdpbGwgY2hlc3RidW1wIG15IG1vbml0b3IgaWYgdGhpcyB3b3Jrc1xuICAgIHNldFRpbWVvdXQgLT5cbiAgICAgICQoJ21ldGFbbmFtZT10aGVtZS1jb2xvcl0nKS5yZW1vdmUoKVxuICAgICAgJCgnaGVhZCcpLmFwcGVuZCgnPG1ldGEgbmFtZT1cInRoZW1lLWNvbG9yXCIgY29udGVudD1cIicgKyBJbmRleC5jb2xvcnNbY3VycmVudF0gKyAnXCI+JylcbiAgICAsIDUwMFxuXG4gICAgZm9yIHNlY3QgaW4gSW5kZXgubmF2XG4gICAgICBpZiBzZWN0IGlzbnQgY3VycmVudFxuICAgICAgICAkKCcuY29sb3JzIC5zdmcnKS5yZW1vdmVDbGFzcyBzZWN0XG4gICAgICAgICQoJy5ib3JkZXInKS5yZW1vdmVDbGFzcyBzZWN0XG5cbiAgICAkKCcuY29sb3JzIC5zdmcnKS5hZGRDbGFzcyBjdXJyZW50XG4gICAgJCgnLmJvcmRlcicpLmFkZENsYXNzIGN1cnJlbnRcblxuICAgIGlmIGRpcmVjdGlvbiBpcyAnZG93bicgb3IgZGlyZWN0aW9uIGlzICdyaWdodCdcblxuICAgICAgXy5vbiBcIi5iYWNrZ3JvdW5kLiN7Y3VycmVudH1cIlxuICAgICAgJChcIi5iYWNrZ3JvdW5kLiN7Y3VycmVudH1cIikuYWRkQ2xhc3MgJ2luRnJvbUJvdHRvbSdcbiAgICAgICQoXCIuYmFja2dyb3VuZC4je3ByZXZpb3VzfVwiKS5hZGRDbGFzcyAnb3V0VG9Ub3AnXG5cbiAgICAgIF8ub24gXCIuY29udGVudC4je2N1cnJlbnR9XCJcbiAgICAgICQoXCIuY29udGVudC4je2N1cnJlbnR9XCIpLmFkZENsYXNzICdjSW5Gcm9tQm90dG9tJ1xuICAgICAgJChcIi5jb250ZW50LiN7cHJldmlvdXN9XCIpLmFkZENsYXNzICdjT3V0VG9Ub3AnXG5cbiAgICAgIHNldFRpbWVvdXQgLT5cblxuICAgICAgICAkKFwiLmJhY2tncm91bmQuI3tjdXJyZW50fVwiKS5yZW1vdmVDbGFzcyAnaW5Gcm9tQm90dG9tJ1xuICAgICAgICAkKFwiLmJhY2tncm91bmQuI3twcmV2aW91c31cIikucmVtb3ZlQ2xhc3MgJ291dFRvVG9wJ1xuICAgICAgICBfLm9mZiBcIi5iYWNrZ3JvdW5kLiN7cHJldmlvdXN9XCJcblxuICAgICAgICAkKFwiLmNvbnRlbnQuI3tjdXJyZW50fVwiKS5yZW1vdmVDbGFzcyAnY0luRnJvbUJvdHRvbSdcbiAgICAgICAgJChcIi5jb250ZW50LiN7cHJldmlvdXN9XCIpLnJlbW92ZUNsYXNzICdjT3V0VG9Ub3AnXG4gICAgICAgIF8ub2ZmIFwiLmNvbnRlbnQuI3twcmV2aW91c31cIlxuXG4gICAgICAsIDEwMDBcblxuICAgIGlmIGRpcmVjdGlvbiBpcyAndXAnIG9yIGRpcmVjdGlvbiBpcyAnbGVmdCdcblxuICAgICAgXy5vbiBcIi5iYWNrZ3JvdW5kLiN7Y3VycmVudH1cIlxuICAgICAgJChcIi5iYWNrZ3JvdW5kLiN7Y3VycmVudH1cIikuYWRkQ2xhc3MgJ2luRnJvbVRvcCdcbiAgICAgICQoXCIuYmFja2dyb3VuZC4je3ByZXZpb3VzfVwiKS5hZGRDbGFzcyAnb3V0VG9Cb3R0b20nXG5cbiAgICAgIF8ub24gXCIuY29udGVudC4je2N1cnJlbnR9XCJcbiAgICAgICQoXCIuY29udGVudC4je2N1cnJlbnR9XCIpLmFkZENsYXNzICdjSW5Gcm9tVG9wJ1xuICAgICAgJChcIi5jb250ZW50LiN7cHJldmlvdXN9XCIpLmFkZENsYXNzICdjT3V0VG9Cb3R0b20nXG5cbiAgICAgIHNldFRpbWVvdXQgLT5cblxuICAgICAgICAkKFwiLmJhY2tncm91bmQuI3twcmV2aW91c31cIikucmVtb3ZlQ2xhc3MgJ291dFRvQm90dG9tJ1xuICAgICAgICAkKFwiLmJhY2tncm91bmQuI3tjdXJyZW50fVwiKS5yZW1vdmVDbGFzcyAnaW5Gcm9tVG9wJ1xuICAgICAgICBfLm9mZiBcIi5iYWNrZ3JvdW5kLiN7cHJldmlvdXN9XCJcblxuICAgICAgICAkKFwiLmNvbnRlbnQuI3twcmV2aW91c31cIikucmVtb3ZlQ2xhc3MgJ2NPdXRUb0JvdHRvbSdcbiAgICAgICAgJChcIi5jb250ZW50LiN7Y3VycmVudH1cIikucmVtb3ZlQ2xhc3MgJ2NJbkZyb21Ub3AnXG4gICAgICAgIF8ub2ZmIFwiLmNvbnRlbnQuI3twcmV2aW91c31cIlxuXG4gICAgICAsIDEwMDBcblxuICAgICQoXCIudG9fI3tjdXJyZW50fVwiKS5lYWNoIChpLCBlbCkgLT5cbiAgICAgIGVsLmJlZ2luRWxlbWVudCgpXG5cbiJdfQ==
