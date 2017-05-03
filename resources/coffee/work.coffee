
Work = 

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

  populate:  (complete)->

    for image, index in @gigs

      gig = $('<div />', 
        class: "gig off gig_#{index}"
        style: "background-image: url(/images/work/#{image})"
      )

      dot = $('<div></div>', 
        class: "dot off dot_#{index}"
        'data-num': index
      )
      dot.append $('<div />', class: 'inner')


      if index is 0
        _.on gig
        _.on dot

      $('.section.work > .inner > .gigs').append gig
      $('.section.work > .inner > .dots').append dot

  i: ->
    console.log 'Work.i()'
    @active = true
    @handlers.i()
    _.off '.content'

  d: ->
    console.log 'Work.d()'
    @active = false


  handlers: 

    i: ->
      $('.section.work > .inner > .dots > .dot').on 'click', @dot
    d: ->
      $('.section.work > .inner > .dots > .dot').off 'click', @dot

    dot: ->
      previous = $('.section.work > .inner > .dots > .dot.on').data 'num'
      current = $(this).data 'num'

      Work.slide previous, current

  navigate: (direction) ->
    previous = $('.section.work > .inner > .dots > .dot.on').data 'num'

    if direction is 'up'
      current = previous+1
    else
      current = previous-1

    current = Work.gigs.length-1if current < 0

    current = 0 if current is Work.gigs.length

    @slide previous, current

  slide: (from, to) ->

    if to > from
      $(".section.work > .inner > .gigs > .gig.gig_#{from}").addClass('up').removeClass('down')
      $(".section.work > .inner > .gigs > .gig.gig_#{to}").addClass('up').removeClass('down')
    else
      $(".section.work > .inner > .gigs > .gig.gig_#{from}").addClass('down').removeClass('up')
      $(".section.work > .inner > .gigs > .gig.gig_#{to}").addClass('down').removeClass('up')

    _.off ".section.work > .inner > .dots > .dot.dot_#{from}"
    _.off ".section.work > .inner > .gigs > .gig.gig_#{from}"

    _.on ".section.work > .inner > .dots > .dot_#{to}"
    _.on ".section.work > .inner > .gigs > .gig_#{to}"




