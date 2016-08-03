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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRldGVjdC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQTs7QUFBQSxNQUFBLEdBRUU7RUFBQSxPQUFBLEVBQVMsSUFBVDtFQUNBLE1BQUEsRUFBUSxLQURSO0VBRUEsS0FBQSxFQUFPLElBRlA7RUFHQSxLQUFBLEVBQU8sSUFIUDtFQUtBLENBQUEsRUFBRyxTQUFBO1dBRUQsT0FBTyxDQUFDLEdBQVIsQ0FBWSxZQUFaO0VBRkMsQ0FMSDtFQVNBLElBQUEsRUFBTSxTQUFDLFFBQUQsRUFBVyxTQUFYO0lBRUosT0FBTyxDQUFDLEdBQVIsQ0FBWSxTQUFaO1dBQ0EsUUFBQSxDQUFTLFNBQVQ7RUFISSxDQVROO0VBY0EsT0FBQSxFQUFTLFNBQUMsUUFBRDs7QUFFUDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBeUJBLENBQUEsQ0FBRSxRQUFGLENBQVcsQ0FBQyxJQUFaLENBQWlCLFlBQWpCLEVBQStCLFNBQUMsQ0FBRDtBQUU3QixVQUFBO01BQUEsSUFBZSxNQUFNLENBQUMsTUFBdEI7QUFBQSxlQUFPLEtBQVA7O01BQ0EsS0FBQSxHQUFRLENBQUMsQ0FBQyxhQUFhLENBQUM7TUFDeEIsSUFBRyxJQUFJLENBQUMsR0FBTCxDQUFTLEtBQVQsQ0FBQSxHQUFrQixHQUFyQjtRQUNFLElBQUcsS0FBQSxHQUFRLENBQVg7VUFBa0IsTUFBTSxDQUFDLElBQVAsQ0FBWSxRQUFaLEVBQXNCLElBQXRCLEVBQWxCO1NBQUEsTUFBQTtVQUFrRCxNQUFNLENBQUMsSUFBUCxDQUFZLFFBQVosRUFBc0IsTUFBdEIsRUFBbEQ7O2VBQ0EsTUFBTSxDQUFDLEtBQVAsQ0FBQSxFQUZGOztJQUo2QixDQUEvQjtXQVFBLENBQUEsQ0FBRSxRQUFGLENBQVcsQ0FBQyxJQUFaLENBQWlCLGdCQUFqQixFQUFtQyxTQUFDLENBQUQ7TUFFakMsSUFBRyxDQUFDLENBQUMsYUFBYSxDQUFDLE1BQWhCLEdBQXlCLENBQTVCO1FBQW1DLE1BQU0sQ0FBQyxJQUFQLENBQVksUUFBWixFQUFzQixJQUF0QixFQUFuQztPQUFBLE1BQUE7UUFBbUUsTUFBTSxDQUFDLElBQVAsQ0FBWSxRQUFaLEVBQXNCLE1BQXRCLEVBQW5FOzthQUNBLE1BQU0sQ0FBQyxLQUFQLENBQUE7SUFIaUMsQ0FBbkM7RUFuQ08sQ0FkVDtFQXNEQSxLQUFBLEVBQU8sU0FBQTtJQUNMLE1BQU0sQ0FBQyxNQUFQLEdBQWdCO1dBQ2hCLFVBQUEsQ0FBVyxTQUFBO2FBQ1QsTUFBTSxDQUFDLE1BQVAsR0FBZ0I7SUFEUCxDQUFYLEVBRUUsTUFBTSxDQUFDLE9BRlQ7RUFGSyxDQXREUCIsImZpbGUiOiJkZXRlY3QuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJEZXRlY3QgPVxuXG4gIHRpbWVvdXQ6IDEwMDBcbiAgcGF1c2VkOiBmYWxzZVxuICB4RG93bjogbnVsbFxuICB5RG93bjogbnVsbFxuXG4gIGk6IC0+XG5cbiAgICBjb25zb2xlLmxvZyAnRGV0ZWN0LmkoKSdcblxuICBleGVjOiAoY2FsbGJhY2ssIGRpcmVjdGlvbikgLT5cbiAgICAjJCgnLmRlYnVnJykuYXBwZW5kKCcyOiBzd2lwZTogJyArIGRpcmVjdGlvbiArICc8YnIgLz4gJylcbiAgICBjb25zb2xlLmxvZyBkaXJlY3Rpb25cbiAgICBjYWxsYmFjayBkaXJlY3Rpb25cblxuICBoYW5kbGVyOiAoY2FsbGJhY2spIC0+XG5cbiAgICAjIyNcbiAgICAkKGRvY3VtZW50KS5iaW5kICd0b3VjaHN0YXJ0JywgKGUpIC0+XG4gICAgICByZXR1cm4gdHJ1ZSBpZiBEZXRlY3QucGF1c2VkXG4gICAgICBEZXRlY3QueERvd24gPSBlLm9yaWdpbmFsRXZlbnQudG91Y2hlc1swXS5jbGllbnRYXG4gICAgICBEZXRlY3QueURvd24gPSBlLm9yaWdpbmFsRXZlbnQudG91Y2hlc1swXS5jbGllbnRZXG5cbiAgICAkKGRvY3VtZW50KS5iaW5kICd0b3VjaG1vdmUnLCAoZSkgLT5cbiAgICAgIHJldHVybiB0cnVlIGlmIERldGVjdC5wYXVzZWRcblxuICAgICAgeFVwID0gZS5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WFxuICAgICAgeVVwID0gZS5vcmlnaW5hbEV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WVxuXG4gICAgICB4RGlmZiA9IERldGVjdC54RG93biAtIHhVcFxuICAgICAgeURpZmYgPSBEZXRlY3QueURvd24gLSB5VXBcblxuICAgICAgaWYgTWF0aC5hYnMoeERpZmYpID4gNTBcbiAgICAgICAgaWYgeERpZmYgPiAwIHRoZW4gRGV0ZWN0LmV4ZWMgY2FsbGJhY2ssICdyaWdodCcgZWxzZSBEZXRlY3QuZXhlYyBjYWxsYmFjaywgJ2xlZnQnXG4gICAgICAgIERldGVjdC5wYXVzZSgpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICBpZiBNYXRoLmFicyh5RGlmZikgPiA1MFxuICAgICAgICBpZiB5RGlmZiA+IDAgdGhlbiBEZXRlY3QuZXhlYyBjYWxsYmFjaywgJ2Rvd24nIGVsc2UgRGV0ZWN0LmV4ZWMgY2FsbGJhY2ssICd1cCdcbiAgICAgICAgRGV0ZWN0LnBhdXNlKClcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAjIyNcblxuICAgICQoZG9jdW1lbnQpLmJpbmQgJ21vdXNld2hlZWwnLCAoZSkgLT5cblxuICAgICAgcmV0dXJuIHRydWUgaWYgRGV0ZWN0LnBhdXNlZFxuICAgICAgd2hlZWwgPSBlLm9yaWdpbmFsRXZlbnQud2hlZWxEZWx0YVxuICAgICAgaWYgTWF0aC5hYnMod2hlZWwpID4gMjAwXG4gICAgICAgIGlmIHdoZWVsIDwgMCB0aGVuIERldGVjdC5leGVjIGNhbGxiYWNrLCAndXAnIGVsc2UgRGV0ZWN0LmV4ZWMgY2FsbGJhY2ssICdkb3duJ1xuICAgICAgICBEZXRlY3QucGF1c2UoKVxuXG4gICAgJChkb2N1bWVudCkuYmluZCAnRE9NTW91c2VTY3JvbGwnLCAoZSkgLT5cblxuICAgICAgaWYgZS5vcmlnaW5hbEV2ZW50LmRldGFpbCA+IDAgdGhlbiBEZXRlY3QuZXhlYyBjYWxsYmFjaywgJ3VwJyBlbHNlIERldGVjdC5leGVjIGNhbGxiYWNrLCAnZG93bidcbiAgICAgIERldGVjdC5wYXVzZSgpXG5cbiAgcGF1c2U6ICgpIC0+XG4gICAgRGV0ZWN0LnBhdXNlZCA9IHRydWVcbiAgICBzZXRUaW1lb3V0IC0+XG4gICAgICBEZXRlY3QucGF1c2VkID0gZmFsc2VcbiAgICAsIERldGVjdC50aW1lb3V0XG5cbiJdfQ==
