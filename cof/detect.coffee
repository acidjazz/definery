Detect =

  timeout: 1000
  paused: false
  xDown: null
  yDown: null

  i: ->

    console.log 'Detect.i()'

  handler: (callback) ->

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

      console.log xDiff, yDiff
      
      if Math.abs(xDiff) > 25
        if xDiff > 0 then callback 'right' else callback 'left'
        Detect.pause()
        return true
      if Math.abs(yDiff) > 25
        if yDiff > 0 then callback 'down' else callback 'up'
        Detect.pause()
        return true

    $(document).bind 'mousewheel', (e) ->

      return true if Detect.paused
      wheel = e.originalEvent.wheelDelta
      if Math.abs(wheel) > 200
        if wheel < 0 then callback 'down' else callback 'up'
        Detect.pause()

    $(document).bind 'DOMMouseScroll', (e) ->

      if e.originalEvent.detail > 0 then callback 'down' else callback 'up'
      Detect.pause()

  pause: () ->
    Detect.paused = true
    setTimeout ->
      Detect.paused = false
    , Detect.timeout

