Index =

  nav: ['definery','iterate', 'navigate', 'product']
  current: 0

  i: ->

    Index.handlers()

  handlers: ->

    Detect.handler Index.navigate

  navigate: (direction) ->

    console.log 'Index.navigate() direction: ' + direction

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

    _.off $(".background.on")
    _.on ".background.#{current}"

    _.off $(".content")
    _.on ".content.#{current}"

    $('.colors .svg').addClass current

    $(".to_#{current}").each (i, el) ->
      el.beginElement()

