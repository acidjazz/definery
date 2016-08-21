var Detect;

Detect = {
  timeout: 1000,
  paused: false,
  xDown: null,
  yDown: null,
  i: function() {},
  exec: function(callback, direction) {
    return callback(direction);
  },
  handler: function(callback) {

    /*
    $(document).bind 'touchstart', (e) ->
      return true if Detect.paused
      Detect.xDown = e.originalEvent.touches[0].clientX
      Detect.yDown = e.originalEvent.touches[0].clientY
    
    $(document).bind 'touchmove', (e) ->
      return true if Detect.paused
    
      xUp = e.originalEvent.touches[0].clientX
      yUp = e.originalEvent.touches[0].clientY
    
      xDiff = Detect.xDown - xUp
      yDiff = Detect.yDown - yUp
    
      if Math.abs(xDiff) > 50
        if xDiff > 0 then Detect.exec callback, 'right' else Detect.exec callback, 'left'
        Detect.pause()
        return true
      if Math.abs(yDiff) > 50
        if yDiff > 0 then Detect.exec callback, 'down' else Detect.exec callback, 'up'
        Detect.pause()
        return true
     */
    $(document).bind('mousewheel', function(e) {
      var wheel;
      if (Detect.paused) {
        return true;
      }
      wheel = e.originalEvent.wheelDelta;
      if (Math.abs(wheel) > 200) {
        if (wheel < 0) {
          Detect.exec(callback, 'up');
        } else {
          Detect.exec(callback, 'down');
        }
        return Detect.pause();
      }
    });
    return $(document).bind('DOMMouseScroll', function(e) {
      if (e.originalEvent.detail > 0) {
        Detect.exec(callback, 'up');
      } else {
        Detect.exec(callback, 'down');
      }
      return Detect.pause();
    });
  },
  pause: function() {
    Detect.paused = true;
    return setTimeout(function() {
      return Detect.paused = false;
    }, Detect.timeout);
  }
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGVjdC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxNQUFBLEdBRUU7RUFBQSxPQUFBLEVBQVMsSUFBVDtFQUNBLE1BQUEsRUFBUSxLQURSO0VBRUEsS0FBQSxFQUFPLElBRlA7RUFHQSxLQUFBLEVBQU8sSUFIUDtFQUtBLENBQUEsRUFBRyxTQUFBLEdBQUEsQ0FMSDtFQU9BLElBQUEsRUFBTSxTQUFDLFFBQUQsRUFBVyxTQUFYO1dBQ0osUUFBQSxDQUFTLFNBQVQ7RUFESSxDQVBOO0VBVUEsT0FBQSxFQUFTLFNBQUMsUUFBRDs7QUFFUDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBeUJBLENBQUEsQ0FBRSxRQUFGLENBQVcsQ0FBQyxJQUFaLENBQWlCLFlBQWpCLEVBQStCLFNBQUMsQ0FBRDtBQUU3QixVQUFBO01BQUEsSUFBZSxNQUFNLENBQUMsTUFBdEI7QUFBQSxlQUFPLEtBQVA7O01BQ0EsS0FBQSxHQUFRLENBQUMsQ0FBQyxhQUFhLENBQUM7TUFDeEIsSUFBRyxJQUFJLENBQUMsR0FBTCxDQUFTLEtBQVQsQ0FBQSxHQUFrQixHQUFyQjtRQUNFLElBQUcsS0FBQSxHQUFRLENBQVg7VUFBa0IsTUFBTSxDQUFDLElBQVAsQ0FBWSxRQUFaLEVBQXNCLElBQXRCLEVBQWxCO1NBQUEsTUFBQTtVQUFrRCxNQUFNLENBQUMsSUFBUCxDQUFZLFFBQVosRUFBc0IsTUFBdEIsRUFBbEQ7O2VBQ0EsTUFBTSxDQUFDLEtBQVAsQ0FBQSxFQUZGOztJQUo2QixDQUEvQjtXQVFBLENBQUEsQ0FBRSxRQUFGLENBQVcsQ0FBQyxJQUFaLENBQWlCLGdCQUFqQixFQUFtQyxTQUFDLENBQUQ7TUFFakMsSUFBRyxDQUFDLENBQUMsYUFBYSxDQUFDLE1BQWhCLEdBQXlCLENBQTVCO1FBQW1DLE1BQU0sQ0FBQyxJQUFQLENBQVksUUFBWixFQUFzQixJQUF0QixFQUFuQztPQUFBLE1BQUE7UUFBbUUsTUFBTSxDQUFDLElBQVAsQ0FBWSxRQUFaLEVBQXNCLE1BQXRCLEVBQW5FOzthQUNBLE1BQU0sQ0FBQyxLQUFQLENBQUE7SUFIaUMsQ0FBbkM7RUFuQ08sQ0FWVDtFQWtEQSxLQUFBLEVBQU8sU0FBQTtJQUNMLE1BQU0sQ0FBQyxNQUFQLEdBQWdCO1dBQ2hCLFVBQUEsQ0FBVyxTQUFBO2FBQ1QsTUFBTSxDQUFDLE1BQVAsR0FBZ0I7SUFEUCxDQUFYLEVBRUUsTUFBTSxDQUFDLE9BRlQ7RUFGSyxDQWxEUCIsImZpbGUiOiJkZXRlY3QuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJEZXRlY3QgPVxuXG4gIHRpbWVvdXQ6IDEwMDBcbiAgcGF1c2VkOiBmYWxzZVxuICB4RG93bjogbnVsbFxuICB5RG93bjogbnVsbFxuXG4gIGk6IC0+XG5cbiAgZXhlYzogKGNhbGxiYWNrLCBkaXJlY3Rpb24pIC0+XG4gICAgY2FsbGJhY2sgZGlyZWN0aW9uXG5cbiAgaGFuZGxlcjogKGNhbGxiYWNrKSAtPlxuXG4gICAgIyMjXG4gICAgJChkb2N1bWVudCkuYmluZCAndG91Y2hzdGFydCcsIChlKSAtPlxuICAgICAgcmV0dXJuIHRydWUgaWYgRGV0ZWN0LnBhdXNlZFxuICAgICAgRGV0ZWN0LnhEb3duID0gZS5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WFxuICAgICAgRGV0ZWN0LnlEb3duID0gZS5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WVxuXG4gICAgJChkb2N1bWVudCkuYmluZCAndG91Y2htb3ZlJywgKGUpIC0+XG4gICAgICByZXR1cm4gdHJ1ZSBpZiBEZXRlY3QucGF1c2VkXG5cbiAgICAgIHhVcCA9IGUub3JpZ2luYWxFdmVudC50b3VjaGVzWzBdLmNsaWVudFhcbiAgICAgIHlVcCA9IGUub3JpZ2luYWxFdmVudC50b3VjaGVzWzBdLmNsaWVudFlcblxuICAgICAgeERpZmYgPSBEZXRlY3QueERvd24gLSB4VXBcbiAgICAgIHlEaWZmID0gRGV0ZWN0LnlEb3duIC0geVVwXG5cbiAgICAgIGlmIE1hdGguYWJzKHhEaWZmKSA+IDUwXG4gICAgICAgIGlmIHhEaWZmID4gMCB0aGVuIERldGVjdC5leGVjIGNhbGxiYWNrLCAncmlnaHQnIGVsc2UgRGV0ZWN0LmV4ZWMgY2FsbGJhY2ssICdsZWZ0J1xuICAgICAgICBEZXRlY3QucGF1c2UoKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgaWYgTWF0aC5hYnMoeURpZmYpID4gNTBcbiAgICAgICAgaWYgeURpZmYgPiAwIHRoZW4gRGV0ZWN0LmV4ZWMgY2FsbGJhY2ssICdkb3duJyBlbHNlIERldGVjdC5leGVjIGNhbGxiYWNrLCAndXAnXG4gICAgICAgIERldGVjdC5wYXVzZSgpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgIyMjXG5cbiAgICAkKGRvY3VtZW50KS5iaW5kICdtb3VzZXdoZWVsJywgKGUpIC0+XG5cbiAgICAgIHJldHVybiB0cnVlIGlmIERldGVjdC5wYXVzZWRcbiAgICAgIHdoZWVsID0gZS5vcmlnaW5hbEV2ZW50LndoZWVsRGVsdGFcbiAgICAgIGlmIE1hdGguYWJzKHdoZWVsKSA+IDIwMFxuICAgICAgICBpZiB3aGVlbCA8IDAgdGhlbiBEZXRlY3QuZXhlYyBjYWxsYmFjaywgJ3VwJyBlbHNlIERldGVjdC5leGVjIGNhbGxiYWNrLCAnZG93bidcbiAgICAgICAgRGV0ZWN0LnBhdXNlKClcblxuICAgICQoZG9jdW1lbnQpLmJpbmQgJ0RPTU1vdXNlU2Nyb2xsJywgKGUpIC0+XG5cbiAgICAgIGlmIGUub3JpZ2luYWxFdmVudC5kZXRhaWwgPiAwIHRoZW4gRGV0ZWN0LmV4ZWMgY2FsbGJhY2ssICd1cCcgZWxzZSBEZXRlY3QuZXhlYyBjYWxsYmFjaywgJ2Rvd24nXG4gICAgICBEZXRlY3QucGF1c2UoKVxuXG4gIHBhdXNlOiAoKSAtPlxuICAgIERldGVjdC5wYXVzZWQgPSB0cnVlXG4gICAgc2V0VGltZW91dCAtPlxuICAgICAgRGV0ZWN0LnBhdXNlZCA9IGZhbHNlXG4gICAgLCBEZXRlY3QudGltZW91dFxuXG4iXX0=
