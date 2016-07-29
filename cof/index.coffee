Index =

  nav: ['definery','iterate', 'navigate', 'product']
  timeout: 1000
  paused: false

  tl: false

  colors:
    'definery': data.color.teal1
    'iterate': data.color.blue1
    'navigate': data.color.green1
    'product': data.color.pink1

  current: 0

  menuNum: 1
  menuOptions: ['about','work','services','contact']
  menuSwiping: false

  i: ->

    Index.handlers()

  handlers: ->


    $('.nav').on 'click', Index.navHandler
    $('.dots > .dot').on 'click', Index.dotHandler
    $('.menu > .option').on 'click', Index.menuHandler
    $('.section > .logo').on 'click', ->
      $('.menu > .option.option_about').trigger 'click'


    $('.prod_contact_cta').on 'click', Index.contact

    $(document).on 'touchmove', ->
      event.preventDefault()

    Detect.handler Index.navigate
    $('.content > .inner > .tapspace').swipe
      swipe: (event, direction, distance, duration, fingerCount) ->
        direction  = 'up' if direction is 'down'
        direction  = 'down' if direction is 'up'
        direction  = 'left' if direction is 'right'
        direction  = 'right' if direction is 'left'
        Index.navigate direction
        return
      tap: (event, target) ->
        console.log 'tap'
      click: (event, target) ->
        console.log 'click'
      threshold: 0


  contact: ->
    $('.menu > .option.option_contact').trigger 'click'

  menuHandler: ->
    return true if Index.menuSwiping is true
    Index.menuSwiping = true

    current = $(this).data 'option'
    num = $(this).data 'num'

    if $(".option_#{current}").hasClass 'on'
      Index.menuSwiping = false
      return true

    _.off '.menu > .option'
    _.on ".option_#{current}"

    for option in Index.menuOptions
      $('.swiper').removeClass("swiper_#{option}")

    if num > Index.menuNum then dir = 'right' else dir = 'left'
    Index.menuNum = num

    $(".swiper.#{dir}").addClass("swiper_#{current}")
    _.on ".swiper.#{dir}"
    setTimeout ->
      _.off ".swiper.#{dir}"
      Index.menuSwiping = false
    , 750

    setTimeout ->
      _.off '.section'
      if current isnt 'about'
        _.on ".section.#{current}"
    , 300

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
    ,Index.timeout


  dotHandler: ->

    return true if Index.paused

    previous = $('.dots .dot.on').data 'sect'
    pnum = $('.dots .dot.on').data 'num'
    current = $(this).data 'sect'
    cnum = $(this).data 'num'

    if cnum > pnum then direction = 'down' else direction = 'up'

    Index.transit previous, current, direction

    Index.paused = true
    Index.current = cnum
    setTimeout ->
      Index.paused = false
    , Index.timeout

  navigate: (direction) ->

    return true if $('.menu > .option.option_contact').hasClass('on')
    return true if $('.menu > .option.option_services').hasClass('on')
    return true if $('.menu > .option.option_work').hasClass('on')

    return true if Index.paused

    previous = Index.nav[Index.current]

    $('.debug').append('swipe: ' + direction + '<br /> ')

    if direction is 'down' or direction is 'right'
      if (Index.current == (Index.nav.length-1))
        return true
        #Index.current = 0
      else
        Index.current++

    if direction is 'up' or direction is 'left'
      if (Index.current == 0)
        return true
        #Index.current = Index.nav.length-1
      else
        Index.current--

    current = Index.nav[Index.current]

    Index.transit(previous, current, direction)

    Index.paused = true
    setTimeout ->
      Index.paused = false
    , Index.timeout

  transit: (previous, current, direction) ->

    return true if previous is undefined

    if current isnt 'definery' then _.on '.arrow.up' else _.off '.arrow.up'

    # i will chestbump my monitor if this works
    setTimeout ->
      $('meta[name=theme-color]').remove()
      $('head').append('<meta name="theme-color" content="' + Index.colors[current] + '">')
    , 500

    for sect in Index.nav
      if sect isnt current
        $('.colors .svg').removeClass "star_#{sect}"
        $('.border').removeClass sect
        $('.bgcolor').removeClass sect

    $('.colors .svg').addClass "star_#{current}"
    $('.border').addClass current
    $('.bgcolor').addClass current

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

        $(".content.#{current}").removeClass 'cInFromBottom'
        $(".content.#{previous}").removeClass 'cOutToTop'

        for sect in Index.nav
          if sect isnt current
            _.off ".background.#{sect}"
            _.off ".content.#{sect}"

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

        $(".content.#{previous}").removeClass 'cOutToBottom'
        $(".content.#{current}").removeClass 'cInFromTop'

        for sect in Index.nav
          if sect isnt current
            _.off ".background.#{sect}"
            _.off ".content.#{sect}"

      , 1000

    _.off '.dots > .dot'
    _.on ".dots > .dot.dot_#{current}"

    tl = new TimelineMax({repeat: 0})
    tl
      .to(".d1", 0.8, {morphSVG: ".#{current}1", ease:Power3.easeInOut}, '-=0.8')
      .to(".d2", 0.8, {morphSVG: ".#{current}2", ease:Power3.easeInOut}, '-=0.8')
      .to(".d3", 0.8, {morphSVG: ".#{current}3", ease:Power3.easeInOut}, '-=0.8')


