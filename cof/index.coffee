Index =

  nav: ['definery','iterate', 'navigate', 'product']
  timeout: 1000
  paused: false

  colors:
    'definery': data.color.teal1
    'iterate': data.color.blue1
    'navigate': data.color.green1
    'product': data.color.pink1

  current: 0

  i: ->

    Index.handlers()

  handlers: ->

    Detect.handler Index.navigate

    $('.nav').on 'click', Index.navHandler

  navHandler: ->

    return true if Index.paused
    t = $(this)

    previous = t.data 'from'
    current = t.data 'to'
    direction = t.data 'dir'

    Index.transit(previous, current, direction)

    Index.paused = true
    setTimeout ->
      Index.paused = false
    , 1000

  navigate: (direction) ->

    console.log 'Index.navigate() direction: ' + direction

    previous = Index.nav[Index.current]

    if direction is 'down' or direction is 'right'
      if (Index.current == (Index.nav.length-1))
        Index.current = 0
      else
        Index.current++

    if direction is 'up' or direction is 'left'
      if (Index.current == 0)
        Index.current = Index.nav.length-1
      else
        Index.current--

    current = Index.nav[Index.current]

    Index.transit(previous, current, direction)

  transit: (previous, current, direction) ->

    # i will chestbump my monitor if this works
    setTimeout ->
      $('meta[name=theme-color]').remove()
      $('head').append('<meta name="theme-color" content="' + Index.colors[current] + '">')
    , 500

    for sect in Index.nav
      if sect isnt current
        $('.colors .svg').removeClass sect
        $('.border').removeClass sect

    $('.colors .svg').addClass current
    $('.border').addClass current

    if direction is 'down' or direction is 'right'

      _.on ".background.#{current}"
      $(".background.#{current}").addClass 'inFromBottom'
      $(".background.#{previous}").addClass 'outToTop'

      _.on ".content.#{current}"
      $(".content.#{current}").addClass 'cInFromBottom'
      $(".content.#{previous}").addClass 'cOutToTop'

      setTimeout ->

        $(".background.#{current}").removeClass 'inFromBottom'
        $(".background.#{previous}").removeClass 'outToTop'
        _.off ".background.#{previous}"

        $(".content.#{current}").removeClass 'cInFromBottom'
        $(".content.#{previous}").removeClass 'cOutToTop'
        _.off ".content.#{previous}"

      , 1000

    if direction is 'up' or direction is 'left'

      _.on ".background.#{current}"
      $(".background.#{current}").addClass 'inFromTop'
      $(".background.#{previous}").addClass 'outToBottom'

      _.on ".content.#{current}"
      $(".content.#{current}").addClass 'cInFromTop'
      $(".content.#{previous}").addClass 'cOutToBottom'

      setTimeout ->

        $(".background.#{previous}").removeClass 'outToBottom'
        $(".background.#{current}").removeClass 'inFromTop'
        _.off ".background.#{previous}"

        $(".content.#{previous}").removeClass 'cOutToBottom'
        $(".content.#{current}").removeClass 'cInFromTop'
        _.off ".content.#{previous}"

      , 1000

    $(".to_#{current}").each (i, el) ->
      el.beginElement()
      console.log  "#{current}.beginElement()"

