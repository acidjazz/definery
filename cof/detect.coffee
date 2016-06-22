Detect =

  timeout: 1000
  paused: false

  i: ->

    console.log 'Detect.i()'

  handler: (callback) ->

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

