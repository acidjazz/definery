Index =

  nav: ['definery','iterate', 'navigate', 'product']
  current: 0

  i: ->

    Index.handlers()

  handlers: ->

    Detect.handler Index.navigate

  navigate: (direction) ->

    console.log 'Index.navigate() direction: ' + direction

    previous = Index.nav[Index.current]

    if direction is 'down'
      if (Index.current == (Index.nav.length-1))
        Index.current = 0
      else
        Index.current++

    if direction is 'up'
      if (Index.current == 0)
        Index.current = Index.nav.length-1
      else
        Index.current--

    current = Index.nav[Index.current]

    for sect in Index.nav
      if sect isnt current
        $('.colors .svg').removeClass sect
        $('.border').removeClass sect

    $('.colors .svg').addClass current
    $('.border').addClass current

    _.off $(".content")
    _.on ".content.#{current}"

    console.log direction
    if direction is 'down'

      _.on ".background.#{current}"
      $(".background.#{current}").addClass 'inFromBottom'
      #$(".background.#{previous}").addClass 'outToTop'
      setTimeout ->

        $(".background.#{current}").removeClass 'inFromBottom'

        #$(".background.#{previous}").removeClass 'outToTop'
        _.off ".background.#{previous}"

      , 1000

    if direction is 'up'

      $(".background.#{current}").addClass 'inFromTop'
      _.on ".background.#{current}"
      #$(".background.#{previous}").addClass 'outToBottom'
      setTimeout ->
        #$(".background.#{previous}").removeClass 'outToBottom'
        $(".background.#{current}").removeClass 'inFromTop'
        _.off ".background.#{previous}"
      , 1000



    $(".to_#{current}").each (i, el) ->
      el.beginElement()

