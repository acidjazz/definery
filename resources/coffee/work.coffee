Work = 

  populated: false

  paused: false
  timeout: 1000

  active: false

  populate:  (complete) ->

    Basal.jsonp 'entries', 
      structure: '590ba6be5aa59b01b02e2ec4'
      sort: 'order',
      asc: 'true',
      active: 'true',
    , null, 'Work.callback'

  callback: (data) ->

    Work.entries = data.data

    for entry, index in Work.entries     

      image = entry.entities.image.value
      thumbnail = entry.entities.image.thumbnails[20]

      image_mobile = entry.entities.image_mobile.value
      thumbnail_mobile = entry.entities.image_mobile.thumbnails[20]

      name = entry.name
      description = entry.entities.description.value

      gig_desktop = $ '<div />', 
        class: "gig off gig_#{index}"
        style: "background-image: url(#{thumbnail})"

      gig_desktop.append  $ '<div />',
        class: 'image off'
        style: "background-image: url(#{image})"

      gig_mobile = $ '<div />', 
        class: "gig off gig_#{index}"
        style: "background-image: url(#{thumbnail_mobile})"

      gig_mobile.append  $ '<div />',
        class: 'image off'
        style: "background-image: url(#{image_mobile})"

      dot = $ '<div></div>', 
        class: "dot off dot_#{index}"
        'data-num': index

      dot.append $ '<div />', class: 'inner'

      copy = $ '<a />', 
        class: "copy off copy_#{index}"

      copy.append $ '<div />',
        class: 'ctitle'
        html: name

      if entry.entities.link.value
        copy.append $('.copylink_template').children().clone()
        copy.addClass 'linked'
        copy.attr 'href', entry.entities.link.value
        copy.attr 'target', '_new'

      copy.append $ '<div />',
        class: 'cdescription'
        html: description

      if index is 0
        _.on gig_desktop
        _.on gig_mobile
        _.on dot
        _.on copy

      $('.section.work > .inner > .gigs.gigs_desktop').append gig_desktop
      $('.section.work > .inner > .gigs.gigs_mobile').append gig_mobile
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
      $('.section.work > .inner').on 'click', '.dots > .dot', @dot
    d: ->
      $('.section.work > .inner').off 'click', '.dots > .dot', @dot

    dot: ->
      previous = $('.section.work > .inner > .dots > .dot.on').data 'num'
      current = $(this).data 'num'

      if previous < current
        Work.slide previous, current, 'up'
      else
        Work.slide previous, current, 'down'

  navigate: (direction) ->

    return true if Work.paused is true

    previous = $('.section.work > .inner > .dots > .dot.on').data 'num'

    if direction is 'up'
      current = previous+1
    else
      current = previous-1

    current = Work.entries.length-1 if current < 0

    current = 0 if current is Work.entries.length

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

