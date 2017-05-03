
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

  d: ->
    console.log 'Work.d()'
    @active = false


  handlers: 

    i: ->
      $('.section.work > .inner > .dots > .dot').on 'click', @dot
    d: ->
      $('.section.work > .inner > .dots > .dot').off 'click', @dot

    dot: ->
      previous = $('.section.work > .inner > .dots > .dot.on')
      current = $(this)
      num = current.data 'num'
      _.off '.section.work > .inner > .dots > .dot'
      _.off '.section.work > .inner > .gigs > .gig'

      _.on ".section.work > .inner > .dots > .dot_#{num}"
      _.on ".section.work > .inner > .gigs > .gig_#{num}"

  navigate: (direction) ->
    previous = $('.section.work > .inner > .dots > .dot.on').data 'num'

    if direction is 'up'
      next = previous+1
    else
      next = previous-1

    next = Work.gigs.length-1 if next < 0
    next = 0 if next is Work.gigs.length-1

    console.log next

    _.off '.section.work > .inner > .dots > .dot'
    _.off '.section.work > .inner > .gigs > .gig'

    _.on ".section.work > .inner > .dots > .dot_#{next}"
    _.on ".section.work > .inner > .gigs > .gig_#{next}"


