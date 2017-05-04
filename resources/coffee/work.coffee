Work = 

  populated: false

  paused: false
  timeout: 1000

  active: false

  gigs: [
    'likwid.jpg',
    'lively_card.jpg',
    'lw_labs.jpg',
    'perricone_blog.jpg',
    'lively_branding.jpg',
    'lively_product.jpg',
    'lw_site.jpg',
  ]

  populate:  (complete) ->

    Basal.jsonp 'structures', client: '590a61f45aa59b01b02e2ec2', null, 'Work.callback'

  callback: (data) ->

    for structure in data.data
      if structure.name is 'work'
        entries = structure.entries

    for entry, index in entries

      image = entry.entities.image.value
      thumbnail = entry.entities.thumbnail.value
      name = entry.name
      description = entry.entities.description.value


      gig = $ '<div />', 
        class: "gig off down gig_#{index}"
        style: "background-image: url(#{thumbnail})"

      gig.append  $ '<div />',
        class: 'image off'
        style: "background-image: url(#{image})"

      dot = $ '<div></div>', 
        class: "dot off dot_#{index}"
        'data-num': index

      dot.append $ '<div />', class: 'inner'

      copy = $ '<div />', 
        class: "copy off copy_#{index}"

      copy.append $ '<div />',
        class: 'ctitle'
        html: name

      copy.append $ '<div />',
        class: 'cdescription'
        html: description

      if index is 0
        _.on gig
        _.on dot
        _.on copy

      $('.section.work > .inner > .gigs').append gig
      $('.section.work > .inner > .dots').append dot
      $('.section.work > .inner > .copys').append copy

    $('.section.work > .inner > .gigs > .gig > .image.off').each (i, el) ->
      src = $(el).css('background-image').replace(/url\("?(.*?)"?\)/, "$1")
      image = new Image()
      image.src = src
      image.onload = ->
        _.on el

  i: ->
    @active = true
    @handlers.i()

  d: ->
    @active = false
    @handlers.d()

  handlers: 

    i: ->
      $('.section.work > .inner > .dots > .dot').on 'click', @dot
    d: ->
      $('.section.work > .inner > .dots > .dot').off 'click', @dot

    dot: ->
      previous = $('.section.work > .inner > .dots > .dot.on').data 'num'
      current = $(this).data 'num'

      if previous < current
        Work.slide previous, current, 'down'
      else
        Work.slide previous, current, 'up'

  navigate: (direction) ->

    return true if Work.paused is true

    previous = $('.section.work > .inner > .dots > .dot.on').data 'num'

    if direction is 'up'
      current = previous+1
    else
      current = previous-1

    current = Work.gigs.length-1if current < 0

    current = 0 if current is Work.gigs.length

    @slide previous, current, direction

    Work.paused = true
    setTimeout ->
      Work.paused = false
    ,Work.timeout

  slide: (from, to, direction) ->

    if direction is 'up'
      $(".section.work > .inner > .gigs > .gig.gig_#{from}").addClass('up').removeClass('down')
      $(".section.work > .inner > .gigs > .gig.gig_#{to}").addClass('up').removeClass('down')
    else 
      $(".section.work > .inner > .gigs > .gig.gig_#{from}").addClass('down').removeClass('up')
      $(".section.work > .inner > .gigs > .gig.gig_#{to}").addClass('down').removeClass('up')

    _.off ".section.work > .inner > .dots > .dot.dot_#{from}"
    _.off ".section.work > .inner > .gigs > .gig.gig_#{from}", offing: true, offtime: 0.5
    _.off ".section.work > .inner > .copys > .copy.copy_#{from}"

    _.on ".section.work > .inner > .dots > .dot_#{to}"
    _.on ".section.work > .inner > .gigs > .gig_#{to}"
    _.on ".section.work > .inner > .copys > .copy.copy_#{to}"

