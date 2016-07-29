var Detect;

Detect = {
  timeout: 1000,
  paused: false,
  xDown: null,
  yDown: null,
  i: function() {
    return console.log('Detect.i()');
  },
  exec: function(callback, direction) {
    $('.debug').append('2: swipe: ' + direction + '<br /> ');
    console.log(direction);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGVjdC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxNQUFBLEdBRUU7RUFBQSxPQUFBLEVBQVMsSUFBVDtFQUNBLE1BQUEsRUFBUSxLQURSO0VBRUEsS0FBQSxFQUFPLElBRlA7RUFHQSxLQUFBLEVBQU8sSUFIUDtFQUtBLENBQUEsRUFBRyxTQUFBO1dBRUQsT0FBTyxDQUFDLEdBQVIsQ0FBWSxZQUFaO0VBRkMsQ0FMSDtFQVNBLElBQUEsRUFBTSxTQUFDLFFBQUQsRUFBVyxTQUFYO0lBQ0osQ0FBQSxDQUFFLFFBQUYsQ0FBVyxDQUFDLE1BQVosQ0FBbUIsWUFBQSxHQUFlLFNBQWYsR0FBMkIsU0FBOUM7SUFDQSxPQUFPLENBQUMsR0FBUixDQUFZLFNBQVo7V0FDQSxRQUFBLENBQVMsU0FBVDtFQUhJLENBVE47RUFjQSxPQUFBLEVBQVMsU0FBQyxRQUFEOztBQUVQOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF5QkEsQ0FBQSxDQUFFLFFBQUYsQ0FBVyxDQUFDLElBQVosQ0FBaUIsWUFBakIsRUFBK0IsU0FBQyxDQUFEO0FBRTdCLFVBQUE7TUFBQSxJQUFlLE1BQU0sQ0FBQyxNQUF0QjtBQUFBLGVBQU8sS0FBUDs7TUFDQSxLQUFBLEdBQVEsQ0FBQyxDQUFDLGFBQWEsQ0FBQztNQUN4QixJQUFHLElBQUksQ0FBQyxHQUFMLENBQVMsS0FBVCxDQUFBLEdBQWtCLEdBQXJCO1FBQ0UsSUFBRyxLQUFBLEdBQVEsQ0FBWDtVQUFrQixNQUFNLENBQUMsSUFBUCxDQUFZLFFBQVosRUFBc0IsSUFBdEIsRUFBbEI7U0FBQSxNQUFBO1VBQWtELE1BQU0sQ0FBQyxJQUFQLENBQVksUUFBWixFQUFzQixNQUF0QixFQUFsRDs7ZUFDQSxNQUFNLENBQUMsS0FBUCxDQUFBLEVBRkY7O0lBSjZCLENBQS9CO1dBUUEsQ0FBQSxDQUFFLFFBQUYsQ0FBVyxDQUFDLElBQVosQ0FBaUIsZ0JBQWpCLEVBQW1DLFNBQUMsQ0FBRDtNQUVqQyxJQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsTUFBaEIsR0FBeUIsQ0FBNUI7UUFBbUMsTUFBTSxDQUFDLElBQVAsQ0FBWSxRQUFaLEVBQXNCLElBQXRCLEVBQW5DO09BQUEsTUFBQTtRQUFtRSxNQUFNLENBQUMsSUFBUCxDQUFZLFFBQVosRUFBc0IsTUFBdEIsRUFBbkU7O2FBQ0EsTUFBTSxDQUFDLEtBQVAsQ0FBQTtJQUhpQyxDQUFuQztFQW5DTyxDQWRUO0VBc0RBLEtBQUEsRUFBTyxTQUFBO0lBQ0wsTUFBTSxDQUFDLE1BQVAsR0FBZ0I7V0FDaEIsVUFBQSxDQUFXLFNBQUE7YUFDVCxNQUFNLENBQUMsTUFBUCxHQUFnQjtJQURQLENBQVgsRUFFRSxNQUFNLENBQUMsT0FGVDtFQUZLLENBdERQIiwiZmlsZSI6ImRldGVjdC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIkRldGVjdCA9XG5cbiAgdGltZW91dDogMTAwMFxuICBwYXVzZWQ6IGZhbHNlXG4gIHhEb3duOiBudWxsXG4gIHlEb3duOiBudWxsXG5cbiAgaTogLT5cblxuICAgIGNvbnNvbGUubG9nICdEZXRlY3QuaSgpJ1xuXG4gIGV4ZWM6IChjYWxsYmFjaywgZGlyZWN0aW9uKSAtPlxuICAgICQoJy5kZWJ1ZycpLmFwcGVuZCgnMjogc3dpcGU6ICcgKyBkaXJlY3Rpb24gKyAnPGJyIC8+ICcpXG4gICAgY29uc29sZS5sb2cgZGlyZWN0aW9uXG4gICAgY2FsbGJhY2sgZGlyZWN0aW9uXG5cbiAgaGFuZGxlcjogKGNhbGxiYWNrKSAtPlxuXG4gICAgIyMjXG4gICAgJChkb2N1bWVudCkuYmluZCAndG91Y2hzdGFydCcsIChlKSAtPlxuICAgICAgcmV0dXJuIHRydWUgaWYgRGV0ZWN0LnBhdXNlZFxuICAgICAgRGV0ZWN0LnhEb3duID0gZS5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WFxuICAgICAgRGV0ZWN0LnlEb3duID0gZS5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WVxuXG4gICAgJChkb2N1bWVudCkuYmluZCAndG91Y2htb3ZlJywgKGUpIC0+XG4gICAgICByZXR1cm4gdHJ1ZSBpZiBEZXRlY3QucGF1c2VkXG5cbiAgICAgIHhVcCA9IGUub3JpZ2luYWxFdmVudC50b3VjaGVzWzBdLmNsaWVudFhcbiAgICAgIHlVcCA9IGUub3JpZ2luYWxFdmVudC50b3VjaGVzWzBdLmNsaWVudFlcblxuICAgICAgeERpZmYgPSBEZXRlY3QueERvd24gLSB4VXBcbiAgICAgIHlEaWZmID0gRGV0ZWN0LnlEb3duIC0geVVwXG5cbiAgICAgIGlmIE1hdGguYWJzKHhEaWZmKSA+IDUwXG4gICAgICAgIGlmIHhEaWZmID4gMCB0aGVuIERldGVjdC5leGVjIGNhbGxiYWNrLCAncmlnaHQnIGVsc2UgRGV0ZWN0LmV4ZWMgY2FsbGJhY2ssICdsZWZ0J1xuICAgICAgICBEZXRlY3QucGF1c2UoKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgaWYgTWF0aC5hYnMoeURpZmYpID4gNTBcbiAgICAgICAgaWYgeURpZmYgPiAwIHRoZW4gRGV0ZWN0LmV4ZWMgY2FsbGJhY2ssICdkb3duJyBlbHNlIERldGVjdC5leGVjIGNhbGxiYWNrLCAndXAnXG4gICAgICAgIERldGVjdC5wYXVzZSgpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgIyMjXG5cbiAgICAkKGRvY3VtZW50KS5iaW5kICdtb3VzZXdoZWVsJywgKGUpIC0+XG5cbiAgICAgIHJldHVybiB0cnVlIGlmIERldGVjdC5wYXVzZWRcbiAgICAgIHdoZWVsID0gZS5vcmlnaW5hbEV2ZW50LndoZWVsRGVsdGFcbiAgICAgIGlmIE1hdGguYWJzKHdoZWVsKSA+IDIwMFxuICAgICAgICBpZiB3aGVlbCA8IDAgdGhlbiBEZXRlY3QuZXhlYyBjYWxsYmFjaywgJ3VwJyBlbHNlIERldGVjdC5leGVjIGNhbGxiYWNrLCAnZG93bidcbiAgICAgICAgRGV0ZWN0LnBhdXNlKClcblxuICAgICQoZG9jdW1lbnQpLmJpbmQgJ0RPTU1vdXNlU2Nyb2xsJywgKGUpIC0+XG5cbiAgICAgIGlmIGUub3JpZ2luYWxFdmVudC5kZXRhaWwgPiAwIHRoZW4gRGV0ZWN0LmV4ZWMgY2FsbGJhY2ssICd1cCcgZWxzZSBEZXRlY3QuZXhlYyBjYWxsYmFjaywgJ2Rvd24nXG4gICAgICBEZXRlY3QucGF1c2UoKVxuXG4gIHBhdXNlOiAoKSAtPlxuICAgIERldGVjdC5wYXVzZWQgPSB0cnVlXG4gICAgc2V0VGltZW91dCAtPlxuICAgICAgRGV0ZWN0LnBhdXNlZCA9IGZhbHNlXG4gICAgLCBEZXRlY3QudGltZW91dFxuXG4iXX0=
