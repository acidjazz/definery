var Work;

Work = {
  active: false,
  gigs: ['likwid.jpg', 'lively_card.jpg', 'lw_labs.jpg', 'perricone_blog.jpg', 'lively_branding.jpg', 'lively_product.jpg', 'lw_site.jpg'],
  populate: function(complete) {
    var copy, dot, gig, image, index, j, len, ref;
    ref = this.gigs;
    for (index = j = 0, len = ref.length; j < len; index = ++j) {
      image = ref[index];
      gig = $('<div />', {
        "class": "gig off gig_" + index,
        style: "background-image: url(/images/work/thumbs/" + image + ")"
      });
      gig.append($('<div />', {
        "class": 'image off',
        style: "background-image: url(/images/work/" + image + ")"
      }));
      dot = $('<div></div>', {
        "class": "dot off dot_" + index,
        'data-num': index
      });
      dot.append($('<div />', {
        "class": 'inner'
      }));
      copy = $('<div />', {
        "class": "copy off copy_" + index
      });
      copy.append($('<div />', {
        "class": 'ctitle',
        html: 'this is the title'
      }));
      copy.append($('<div />', {
        "class": 'cdescription',
        html: 'this is the description'
      }));
      if (index === 0) {
        _.on(gig);
        _.on(dot);
        _.on(copy);
        gig.removeClass('down').addClass('up');
      }
      $('.section.work > .inner > .gigs').append(gig);
      $('.section.work > .inner > .dots').append(dot);
      $('.section.work > .inner > .copys').append(copy);
    }
    return $('.section.work > .inner > .gigs > .gig > .image.off').each(function(i, el) {
      var src;
      src = $(el).css('background-image').replace(/url\("?(.*?)"?\)/, "$1");
      image = new Image();
      image.src = src;
      return image.onload = function() {
        return _.on(el);
      };
    });
  },
  i: function() {
    this.active = true;
    return this.handlers.i();
  },
  d: function() {
    console.log('Work.d()');
    $('.section.work > .inner > .gigs > .gig').removeClass('up').removeClass('down');
    $('.section.work > .inner > .gigs > .gig.on').addClass('up');
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
    _.off(".section.work > .inner > .copys > .copy.copy_" + from);
    _.on(".section.work > .inner > .dots > .dot_" + to);
    _.on(".section.work > .inner > .gigs > .gig_" + to);
    return _.on(".section.work > .inner > .copys > .copy.copy_" + to);
  }
};

//# sourceMappingURL=data:application/json;base64,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LENBakZWO0VBK0ZBLEtBQUEsRUFBTyxTQUFDLElBQUQsRUFBTyxFQUFQO0lBRUwsSUFBRyxFQUFBLEdBQUssSUFBUjtNQUNFLENBQUEsQ0FBRSw0Q0FBQSxHQUE2QyxJQUEvQyxDQUFzRCxDQUFDLFFBQXZELENBQWdFLElBQWhFLENBQXFFLENBQUMsV0FBdEUsQ0FBa0YsTUFBbEY7TUFDQSxDQUFBLENBQUUsNENBQUEsR0FBNkMsRUFBL0MsQ0FBb0QsQ0FBQyxRQUFyRCxDQUE4RCxJQUE5RCxDQUFtRSxDQUFDLFdBQXBFLENBQWdGLE1BQWhGLEVBRkY7S0FBQSxNQUFBO01BSUUsQ0FBQSxDQUFFLDRDQUFBLEdBQTZDLElBQS9DLENBQXNELENBQUMsUUFBdkQsQ0FBZ0UsTUFBaEUsQ0FBdUUsQ0FBQyxXQUF4RSxDQUFvRixJQUFwRjtNQUNBLENBQUEsQ0FBRSw0Q0FBQSxHQUE2QyxFQUEvQyxDQUFvRCxDQUFDLFFBQXJELENBQThELE1BQTlELENBQXFFLENBQUMsV0FBdEUsQ0FBa0YsSUFBbEYsRUFMRjs7SUFPQSxDQUFDLENBQUMsR0FBRixDQUFNLDRDQUFBLEdBQTZDLElBQW5EO0lBQ0EsQ0FBQyxDQUFDLEdBQUYsQ0FBTSw0Q0FBQSxHQUE2QyxJQUFuRDtJQUNBLENBQUMsQ0FBQyxHQUFGLENBQU0sK0NBQUEsR0FBZ0QsSUFBdEQ7SUFFQSxDQUFDLENBQUMsRUFBRixDQUFLLHdDQUFBLEdBQXlDLEVBQTlDO0lBQ0EsQ0FBQyxDQUFDLEVBQUYsQ0FBSyx3Q0FBQSxHQUF5QyxFQUE5QztXQUNBLENBQUMsQ0FBQyxFQUFGLENBQUssK0NBQUEsR0FBZ0QsRUFBckQ7RUFmSyxDQS9GUCIsImZpbGUiOiJ3b3JrLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiV29yayA9IFxuXG4gIGFjdGl2ZTogZmFsc2VcblxuICBnaWdzOiBbXG4gICAgJ2xpa3dpZC5qcGcnLFxuICAgICdsaXZlbHlfY2FyZC5qcGcnLFxuICAgICdsd19sYWJzLmpwZycsXG4gICAgJ3BlcnJpY29uZV9ibG9nLmpwZycsXG4gICAgJ2xpdmVseV9icmFuZGluZy5qcGcnLFxuICAgICdsaXZlbHlfcHJvZHVjdC5qcGcnLFxuICAgICdsd19zaXRlLmpwZycsXG4gIF1cblxuICBwb3B1bGF0ZTogIChjb21wbGV0ZSktPlxuXG4gICAgZm9yIGltYWdlLCBpbmRleCBpbiBAZ2lnc1xuXG4gICAgICBnaWcgPSAkICc8ZGl2IC8+JywgXG4gICAgICAgIGNsYXNzOiBcImdpZyBvZmYgZ2lnXyN7aW5kZXh9XCJcbiAgICAgICAgc3R5bGU6IFwiYmFja2dyb3VuZC1pbWFnZTogdXJsKC9pbWFnZXMvd29yay90aHVtYnMvI3tpbWFnZX0pXCJcblxuICAgICAgZ2lnLmFwcGVuZCAgJCAnPGRpdiAvPicsXG4gICAgICAgIGNsYXNzOiAnaW1hZ2Ugb2ZmJ1xuICAgICAgICBzdHlsZTogXCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoL2ltYWdlcy93b3JrLyN7aW1hZ2V9KVwiXG5cbiAgICAgIGRvdCA9ICQgJzxkaXY+PC9kaXY+JywgXG4gICAgICAgIGNsYXNzOiBcImRvdCBvZmYgZG90XyN7aW5kZXh9XCJcbiAgICAgICAgJ2RhdGEtbnVtJzogaW5kZXhcblxuICAgICAgZG90LmFwcGVuZCAkICc8ZGl2IC8+JywgY2xhc3M6ICdpbm5lcidcblxuICAgICAgY29weSA9ICQgJzxkaXYgLz4nLCBcbiAgICAgICAgY2xhc3M6IFwiY29weSBvZmYgY29weV8je2luZGV4fVwiXG5cbiAgICAgIGNvcHkuYXBwZW5kICQgJzxkaXYgLz4nLFxuICAgICAgICBjbGFzczogJ2N0aXRsZSdcbiAgICAgICAgaHRtbDogJ3RoaXMgaXMgdGhlIHRpdGxlJ1xuXG4gICAgICBjb3B5LmFwcGVuZCAkICc8ZGl2IC8+JyxcbiAgICAgICAgY2xhc3M6ICdjZGVzY3JpcHRpb24nXG4gICAgICAgIGh0bWw6ICd0aGlzIGlzIHRoZSBkZXNjcmlwdGlvbidcblxuICAgICAgaWYgaW5kZXggaXMgMFxuICAgICAgICBfLm9uIGdpZ1xuICAgICAgICBfLm9uIGRvdFxuICAgICAgICBfLm9uIGNvcHlcbiAgICAgICAgZ2lnLnJlbW92ZUNsYXNzKCdkb3duJykuYWRkQ2xhc3MgJ3VwJ1xuXG4gICAgICAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MnKS5hcHBlbmQgZ2lnXG4gICAgICAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmRvdHMnKS5hcHBlbmQgZG90XG4gICAgICAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmNvcHlzJykuYXBwZW5kIGNvcHlcblxuICAgICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZ2lncyA+IC5naWcgPiAuaW1hZ2Uub2ZmJykuZWFjaCAoaSwgZWwpIC0+XG4gICAgICBzcmMgPSAkKGVsKS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKS5yZXBsYWNlKC91cmxcXChcIj8oLio/KVwiP1xcKS8sIFwiJDFcIilcbiAgICAgIGltYWdlID0gbmV3IEltYWdlKClcbiAgICAgIGltYWdlLnNyYyA9IHNyY1xuICAgICAgaW1hZ2Uub25sb2FkID0gLT5cbiAgICAgICAgXy5vbiBlbFxuXG4gIGk6IC0+XG4gICAgQGFjdGl2ZSA9IHRydWVcbiAgICBAaGFuZGxlcnMuaSgpXG5cbiAgZDogLT5cbiAgICBjb25zb2xlLmxvZyAnV29yay5kKCknXG4gICAgJCgnLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5naWdzID4gLmdpZycpLnJlbW92ZUNsYXNzKCd1cCcpLnJlbW92ZUNsYXNzKCdkb3duJylcbiAgICAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnLm9uJykuYWRkQ2xhc3MoJ3VwJylcbiAgICBAYWN0aXZlID0gZmFsc2VcblxuICBoYW5kbGVyczogXG5cbiAgICBpOiAtPlxuICAgICAgJCgnLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5kb3RzID4gLmRvdCcpLm9uICdjbGljaycsIEBkb3RcbiAgICBkOiAtPlxuICAgICAgJCgnLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5kb3RzID4gLmRvdCcpLm9mZiAnY2xpY2snLCBAZG90XG5cbiAgICBkb3Q6IC0+XG4gICAgICBwcmV2aW91cyA9ICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZG90cyA+IC5kb3Qub24nKS5kYXRhICdudW0nXG4gICAgICBjdXJyZW50ID0gJCh0aGlzKS5kYXRhICdudW0nXG5cbiAgICAgIFdvcmsuc2xpZGUgcHJldmlvdXMsIGN1cnJlbnRcblxuICBuYXZpZ2F0ZTogKGRpcmVjdGlvbikgLT5cbiAgICBwcmV2aW91cyA9ICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZG90cyA+IC5kb3Qub24nKS5kYXRhICdudW0nXG5cbiAgICBpZiBkaXJlY3Rpb24gaXMgJ3VwJ1xuICAgICAgY3VycmVudCA9IHByZXZpb3VzKzFcbiAgICBlbHNlXG4gICAgICBjdXJyZW50ID0gcHJldmlvdXMtMVxuXG4gICAgY3VycmVudCA9IFdvcmsuZ2lncy5sZW5ndGgtMWlmIGN1cnJlbnQgPCAwXG5cbiAgICBjdXJyZW50ID0gMCBpZiBjdXJyZW50IGlzIFdvcmsuZ2lncy5sZW5ndGhcblxuICAgIEBzbGlkZSBwcmV2aW91cywgY3VycmVudFxuXG4gIHNsaWRlOiAoZnJvbSwgdG8pIC0+XG5cbiAgICBpZiB0byA+IGZyb21cbiAgICAgICQoXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnLmdpZ18je2Zyb219XCIpLmFkZENsYXNzKCd1cCcpLnJlbW92ZUNsYXNzKCdkb3duJylcbiAgICAgICQoXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnLmdpZ18je3RvfVwiKS5hZGRDbGFzcygndXAnKS5yZW1vdmVDbGFzcygnZG93bicpXG4gICAgZWxzZVxuICAgICAgJChcIi5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZ2lncyA+IC5naWcuZ2lnXyN7ZnJvbX1cIikuYWRkQ2xhc3MoJ2Rvd24nKS5yZW1vdmVDbGFzcygndXAnKVxuICAgICAgJChcIi5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZ2lncyA+IC5naWcuZ2lnXyN7dG99XCIpLmFkZENsYXNzKCdkb3duJykucmVtb3ZlQ2xhc3MoJ3VwJylcblxuICAgIF8ub2ZmIFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5kb3RzID4gLmRvdC5kb3RfI3tmcm9tfVwiXG4gICAgXy5vZmYgXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnLmdpZ18je2Zyb219XCJcbiAgICBfLm9mZiBcIi5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuY29weXMgPiAuY29weS5jb3B5XyN7ZnJvbX1cIlxuXG4gICAgXy5vbiBcIi5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZG90cyA+IC5kb3RfI3t0b31cIlxuICAgIF8ub24gXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnXyN7dG99XCJcbiAgICBfLm9uIFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5jb3B5cyA+IC5jb3B5LmNvcHlfI3t0b31cIlxuXG5cblxuXG4iXX0=
