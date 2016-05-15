Index =
  player: false

  states:
    '-1': 'unstarted',
    0: 'ended',
    1: 'playing',
    2: 'paused',
    3: 'buffering',
    5: 'video cued'

  i: ->

    console.log 'Index.i()'
    Index.ytApi()

  ytApi: ->
    tag = document.createElement 'script'
    tag.src = 'https://www.youtube.com/iframe_api'
    tag.type = 'text/javascript'
    tag.async = true
    first = document.getElementsByTagName('script')[0]
    first.parentNode.insertBefore tag, first

  ready: (event) ->
    console.log 'youtube is ready'

    width = '100%'
    height = '100%'

    Index.player = new YT.Player('video',
      width: width
      height: height
      videoId: 'ZNxIDWFVNVc'
      events:
        onReady: Index.playerReady
        onStateChange: Index.stateChange
      playerVars:
        allowfullscreen: 1
        modestbranding: 1
        enablejsapi: 1
        origin: Index.origin
        version: 3
        rel: 0
        disablekb: 1
        loop: 1
        html5: 1
        controls: 0
        theme: 'light'
        wmode: 'opaque'
    )

  playerReady: (event) ->
    setTimeout ->
      Index.player.playVideo()
      #Index.player.mute()
    , 100
  stateChange: (event) ->
    Index.cstate = Index.states[event.data]
    #_.t 'Details', watch.cstate, watch.title



onYouTubeIframeAPIReady = (event) ->
  Index.ready(event)

