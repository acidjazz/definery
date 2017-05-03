var Work;

Work = {
  active: false,
  gigs: ['likwid.jpg', 'lively_card.jpg', 'lw_labs.jpg', 'perricone_blog.jpg', 'lively_branding.jpg', 'lively_product.jpg', 'lw_site.jpg'],
  populate: function(complete) {
    var dot, gig, i, image, index, len, ref, results;
    ref = this.gigs;
    results = [];
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      image = ref[index];
      gig = $('<div />', {
        "class": "gig off gig_" + index,
        style: "background-image: url(/images/work/" + image + ")"
      });
      dot = $('<div></div>', {
        "class": "dot off dot_" + index,
        'data-num': index
      });
      dot.append($('<div />', {
        "class": 'inner'
      }));
      if (index === 0) {
        _.on(gig);
        _.on(dot);
      }
      $('.section.work > .inner > .gigs').append(gig);
      results.push($('.section.work > .inner > .dots').append(dot));
    }
    return results;
  },
  i: function() {
    console.log('Work.i()');
    this.active = true;
    this.handlers.i();
    return _.off('.content');
  },
  d: function() {
    console.log('Work.d()');
    return this.active = false;
  },
  handlers: {
    i: function() {
      return $('.section.work > .inner > .dots > .dot').on('click', this.dot);
    },
    d: function() {
      return $('.section.work > .inner > .dots > .dot').off('click', this.dot);
    },
    dot: function() {
      var current, previous;
      previous = $('.section.work > .inner > .dots > .dot.on').data('num');
      current = $(this).data('num');
      return Work.slide(previous, current);
    }
  },
  navigate: function(direction) {
    var current, previous;
    previous = $('.section.work > .inner > .dots > .dot.on').data('num');
    if (direction === 'up') {
      current = previous + 1;
    } else {
      current = previous - 1;
    }
    if (current < 0) {
      current = Work.gigs.length - 1;
    }
    if (current === Work.gigs.length) {
      current = 0;
    }
    return this.slide(previous, current);
  },
  slide: function(from, to) {
    if (to > from) {
      $(".section.work > .inner > .gigs > .gig.gig_" + from).addClass('up').removeClass('down');
      $(".section.work > .inner > .gigs > .gig.gig_" + to).addClass('up').removeClass('down');
    } else {
      $(".section.work > .inner > .gigs > .gig.gig_" + from).addClass('down').removeClass('up');
      $(".section.work > .inner > .gigs > .gig.gig_" + to).addClass('down').removeClass('up');
    }
    _.off(".section.work > .inner > .dots > .dot.dot_" + from);
    _.off(".section.work > .inner > .gigs > .gig.gig_" + from);
    _.on(".section.work > .inner > .dots > .dot_" + to);
    return _.on(".section.work > .inner > .gigs > .gig_" + to);
  }
};

//# sourceMappingURL=data:application/json;base64,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LENBM0RWO0VBeUVBLEtBQUEsRUFBTyxTQUFDLElBQUQsRUFBTyxFQUFQO0lBRUwsSUFBRyxFQUFBLEdBQUssSUFBUjtNQUNFLENBQUEsQ0FBRSw0Q0FBQSxHQUE2QyxJQUEvQyxDQUFzRCxDQUFDLFFBQXZELENBQWdFLElBQWhFLENBQXFFLENBQUMsV0FBdEUsQ0FBa0YsTUFBbEY7TUFDQSxDQUFBLENBQUUsNENBQUEsR0FBNkMsRUFBL0MsQ0FBb0QsQ0FBQyxRQUFyRCxDQUE4RCxJQUE5RCxDQUFtRSxDQUFDLFdBQXBFLENBQWdGLE1BQWhGLEVBRkY7S0FBQSxNQUFBO01BSUUsQ0FBQSxDQUFFLDRDQUFBLEdBQTZDLElBQS9DLENBQXNELENBQUMsUUFBdkQsQ0FBZ0UsTUFBaEUsQ0FBdUUsQ0FBQyxXQUF4RSxDQUFvRixJQUFwRjtNQUNBLENBQUEsQ0FBRSw0Q0FBQSxHQUE2QyxFQUEvQyxDQUFvRCxDQUFDLFFBQXJELENBQThELE1BQTlELENBQXFFLENBQUMsV0FBdEUsQ0FBa0YsSUFBbEYsRUFMRjs7SUFPQSxDQUFDLENBQUMsR0FBRixDQUFNLDRDQUFBLEdBQTZDLElBQW5EO0lBQ0EsQ0FBQyxDQUFDLEdBQUYsQ0FBTSw0Q0FBQSxHQUE2QyxJQUFuRDtJQUVBLENBQUMsQ0FBQyxFQUFGLENBQUssd0NBQUEsR0FBeUMsRUFBOUM7V0FDQSxDQUFDLENBQUMsRUFBRixDQUFLLHdDQUFBLEdBQXlDLEVBQTlDO0VBYkssQ0F6RVAiLCJmaWxlIjoid29yay5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIlxuV29yayA9IFxuXG4gIGFjdGl2ZTogZmFsc2VcblxuICBnaWdzOiBbXG4gICAgJ2xpa3dpZC5qcGcnLFxuICAgICdsaXZlbHlfY2FyZC5qcGcnLFxuICAgICdsd19sYWJzLmpwZycsXG4gICAgJ3BlcnJpY29uZV9ibG9nLmpwZycsXG4gICAgJ2xpdmVseV9icmFuZGluZy5qcGcnLFxuICAgICdsaXZlbHlfcHJvZHVjdC5qcGcnLFxuICAgICdsd19zaXRlLmpwZycsXG4gIF1cblxuICBwb3B1bGF0ZTogIChjb21wbGV0ZSktPlxuXG4gICAgZm9yIGltYWdlLCBpbmRleCBpbiBAZ2lnc1xuXG4gICAgICBnaWcgPSAkKCc8ZGl2IC8+JywgXG4gICAgICAgIGNsYXNzOiBcImdpZyBvZmYgZ2lnXyN7aW5kZXh9XCJcbiAgICAgICAgc3R5bGU6IFwiYmFja2dyb3VuZC1pbWFnZTogdXJsKC9pbWFnZXMvd29yay8je2ltYWdlfSlcIlxuICAgICAgKVxuXG4gICAgICBkb3QgPSAkKCc8ZGl2PjwvZGl2PicsIFxuICAgICAgICBjbGFzczogXCJkb3Qgb2ZmIGRvdF8je2luZGV4fVwiXG4gICAgICAgICdkYXRhLW51bSc6IGluZGV4XG4gICAgICApXG4gICAgICBkb3QuYXBwZW5kICQoJzxkaXYgLz4nLCBjbGFzczogJ2lubmVyJylcblxuXG4gICAgICBpZiBpbmRleCBpcyAwXG4gICAgICAgIF8ub24gZ2lnXG4gICAgICAgIF8ub24gZG90XG5cbiAgICAgICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZ2lncycpLmFwcGVuZCBnaWdcbiAgICAgICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZG90cycpLmFwcGVuZCBkb3RcblxuICBpOiAtPlxuICAgIGNvbnNvbGUubG9nICdXb3JrLmkoKSdcbiAgICBAYWN0aXZlID0gdHJ1ZVxuICAgIEBoYW5kbGVycy5pKClcbiAgICBfLm9mZiAnLmNvbnRlbnQnXG5cbiAgZDogLT5cbiAgICBjb25zb2xlLmxvZyAnV29yay5kKCknXG4gICAgQGFjdGl2ZSA9IGZhbHNlXG5cblxuICBoYW5kbGVyczogXG5cbiAgICBpOiAtPlxuICAgICAgJCgnLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5kb3RzID4gLmRvdCcpLm9uICdjbGljaycsIEBkb3RcbiAgICBkOiAtPlxuICAgICAgJCgnLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5kb3RzID4gLmRvdCcpLm9mZiAnY2xpY2snLCBAZG90XG5cbiAgICBkb3Q6IC0+XG4gICAgICBwcmV2aW91cyA9ICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZG90cyA+IC5kb3Qub24nKS5kYXRhICdudW0nXG4gICAgICBjdXJyZW50ID0gJCh0aGlzKS5kYXRhICdudW0nXG5cbiAgICAgIFdvcmsuc2xpZGUgcHJldmlvdXMsIGN1cnJlbnRcblxuICBuYXZpZ2F0ZTogKGRpcmVjdGlvbikgLT5cbiAgICBwcmV2aW91cyA9ICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZG90cyA+IC5kb3Qub24nKS5kYXRhICdudW0nXG5cbiAgICBpZiBkaXJlY3Rpb24gaXMgJ3VwJ1xuICAgICAgY3VycmVudCA9IHByZXZpb3VzKzFcbiAgICBlbHNlXG4gICAgICBjdXJyZW50ID0gcHJldmlvdXMtMVxuXG4gICAgY3VycmVudCA9IFdvcmsuZ2lncy5sZW5ndGgtMWlmIGN1cnJlbnQgPCAwXG5cbiAgICBjdXJyZW50ID0gMCBpZiBjdXJyZW50IGlzIFdvcmsuZ2lncy5sZW5ndGhcblxuICAgIEBzbGlkZSBwcmV2aW91cywgY3VycmVudFxuXG4gIHNsaWRlOiAoZnJvbSwgdG8pIC0+XG5cbiAgICBpZiB0byA+IGZyb21cbiAgICAgICQoXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnLmdpZ18je2Zyb219XCIpLmFkZENsYXNzKCd1cCcpLnJlbW92ZUNsYXNzKCdkb3duJylcbiAgICAgICQoXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnLmdpZ18je3RvfVwiKS5hZGRDbGFzcygndXAnKS5yZW1vdmVDbGFzcygnZG93bicpXG4gICAgZWxzZVxuICAgICAgJChcIi5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZ2lncyA+IC5naWcuZ2lnXyN7ZnJvbX1cIikuYWRkQ2xhc3MoJ2Rvd24nKS5yZW1vdmVDbGFzcygndXAnKVxuICAgICAgJChcIi5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZ2lncyA+IC5naWcuZ2lnXyN7dG99XCIpLmFkZENsYXNzKCdkb3duJykucmVtb3ZlQ2xhc3MoJ3VwJylcblxuICAgIF8ub2ZmIFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5kb3RzID4gLmRvdC5kb3RfI3tmcm9tfVwiXG4gICAgXy5vZmYgXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnLmdpZ18je2Zyb219XCJcblxuICAgIF8ub24gXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmRvdHMgPiAuZG90XyN7dG99XCJcbiAgICBfLm9uIFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5naWdzID4gLmdpZ18je3RvfVwiXG5cblxuXG5cbiJdfQ==
