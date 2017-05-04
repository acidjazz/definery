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
        "class": "gig off down gig_" + index,
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
      console.log(src);
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
      if (previous < current) {
        return Work.slide(previous, current, 'down');
      } else {
        return Work.slide(previous, current, 'up');
      }
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
    return this.slide(previous, current, direction);
  },
  slide: function(from, to, direction) {
    if (direction === 'up') {
      $(".section.work > .inner > .gigs > .gig.gig_" + from).addClass('up').removeClass('down');
      $(".section.work > .inner > .gigs > .gig.gig_" + to).addClass('up').removeClass('down');
    } else {
      $(".section.work > .inner > .gigs > .gig.gig_" + from).addClass('down').removeClass('up');
      $(".section.work > .inner > .gigs > .gig.gig_" + to).addClass('down').removeClass('up');
    }
    _.off(".section.work > .inner > .dots > .dot.dot_" + from);
    _.off(".section.work > .inner > .gigs > .gig.gig_" + from, {
      offing: true,
      offtime: 0.5
    });
    _.off(".section.work > .inner > .copys > .copy.copy_" + from);
    _.on(".section.work > .inner > .dots > .dot_" + to);
    _.on(".section.work > .inner > .gigs > .gig_" + to);
    return _.on(".section.work > .inner > .copys > .copy.copy_" + to);
  }
};

//# sourceMappingURL=data:application/json;base64,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QUFBLEtBQWEsSUFBaEI7TUFDRSxDQUFBLENBQUUsNENBQUEsR0FBNkMsSUFBL0MsQ0FBc0QsQ0FBQyxRQUF2RCxDQUFnRSxJQUFoRSxDQUFxRSxDQUFDLFdBQXRFLENBQWtGLE1BQWxGO01BQ0EsQ0FBQSxDQUFFLDRDQUFBLEdBQTZDLEVBQS9DLENBQW9ELENBQUMsUUFBckQsQ0FBOEQsSUFBOUQsQ0FBbUUsQ0FBQyxXQUFwRSxDQUFnRixNQUFoRixFQUZGO0tBQUEsTUFBQTtNQUlFLENBQUEsQ0FBRSw0Q0FBQSxHQUE2QyxJQUEvQyxDQUFzRCxDQUFDLFFBQXZELENBQWdFLE1BQWhFLENBQXVFLENBQUMsV0FBeEUsQ0FBb0YsSUFBcEY7TUFDQSxDQUFBLENBQUUsNENBQUEsR0FBNkMsRUFBL0MsQ0FBb0QsQ0FBQyxRQUFyRCxDQUE4RCxNQUE5RCxDQUFxRSxDQUFDLFdBQXRFLENBQWtGLElBQWxGLEVBTEY7O0lBT0EsQ0FBQyxDQUFDLEdBQUYsQ0FBTSw0Q0FBQSxHQUE2QyxJQUFuRDtJQUNBLENBQUMsQ0FBQyxHQUFGLENBQU0sNENBQUEsR0FBNkMsSUFBbkQsRUFBMkQ7TUFBQSxNQUFBLEVBQVEsSUFBUjtNQUFjLE9BQUEsRUFBUyxHQUF2QjtLQUEzRDtJQUNBLENBQUMsQ0FBQyxHQUFGLENBQU0sK0NBQUEsR0FBZ0QsSUFBdEQ7SUFFQSxDQUFDLENBQUMsRUFBRixDQUFLLHdDQUFBLEdBQXlDLEVBQTlDO0lBQ0EsQ0FBQyxDQUFDLEVBQUYsQ0FBSyx3Q0FBQSxHQUF5QyxFQUE5QztXQUNBLENBQUMsQ0FBQyxFQUFGLENBQUssK0NBQUEsR0FBZ0QsRUFBckQ7RUFmSyxDQS9GUCIsImZpbGUiOiJ3b3JrLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiV29yayA9IFxuXG4gIGFjdGl2ZTogZmFsc2VcblxuICBnaWdzOiBbXG4gICAgJ2xpa3dpZC5qcGcnLFxuICAgICdsaXZlbHlfY2FyZC5qcGcnLFxuICAgICdsd19sYWJzLmpwZycsXG4gICAgJ3BlcnJpY29uZV9ibG9nLmpwZycsXG4gICAgJ2xpdmVseV9icmFuZGluZy5qcGcnLFxuICAgICdsaXZlbHlfcHJvZHVjdC5qcGcnLFxuICAgICdsd19zaXRlLmpwZycsXG4gIF1cblxuICBwb3B1bGF0ZTogIChjb21wbGV0ZSktPlxuXG4gICAgZm9yIGltYWdlLCBpbmRleCBpbiBAZ2lnc1xuXG4gICAgICBnaWcgPSAkICc8ZGl2IC8+JywgXG4gICAgICAgIGNsYXNzOiBcImdpZyBvZmYgZG93biBnaWdfI3tpbmRleH1cIlxuICAgICAgICBzdHlsZTogXCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoL2ltYWdlcy93b3JrL3RodW1icy8je2ltYWdlfSlcIlxuXG4gICAgICBnaWcuYXBwZW5kICAkICc8ZGl2IC8+JyxcbiAgICAgICAgY2xhc3M6ICdpbWFnZSBvZmYnXG4gICAgICAgIHN0eWxlOiBcImJhY2tncm91bmQtaW1hZ2U6IHVybCgvaW1hZ2VzL3dvcmsvI3tpbWFnZX0pXCJcblxuICAgICAgZG90ID0gJCAnPGRpdj48L2Rpdj4nLCBcbiAgICAgICAgY2xhc3M6IFwiZG90IG9mZiBkb3RfI3tpbmRleH1cIlxuICAgICAgICAnZGF0YS1udW0nOiBpbmRleFxuXG4gICAgICBkb3QuYXBwZW5kICQgJzxkaXYgLz4nLCBjbGFzczogJ2lubmVyJ1xuXG4gICAgICBjb3B5ID0gJCAnPGRpdiAvPicsIFxuICAgICAgICBjbGFzczogXCJjb3B5IG9mZiBjb3B5XyN7aW5kZXh9XCJcblxuICAgICAgY29weS5hcHBlbmQgJCAnPGRpdiAvPicsXG4gICAgICAgIGNsYXNzOiAnY3RpdGxlJ1xuICAgICAgICBodG1sOiAndGhpcyBpcyB0aGUgdGl0bGUnXG5cbiAgICAgIGNvcHkuYXBwZW5kICQgJzxkaXYgLz4nLFxuICAgICAgICBjbGFzczogJ2NkZXNjcmlwdGlvbidcbiAgICAgICAgaHRtbDogJ3RoaXMgaXMgdGhlIGRlc2NyaXB0aW9uJ1xuXG4gICAgICBpZiBpbmRleCBpcyAwXG4gICAgICAgIF8ub24gZ2lnXG4gICAgICAgIF8ub24gZG90XG4gICAgICAgIF8ub24gY29weVxuXG4gICAgICAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MnKS5hcHBlbmQgZ2lnXG4gICAgICAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmRvdHMnKS5hcHBlbmQgZG90XG4gICAgICAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmNvcHlzJykuYXBwZW5kIGNvcHlcblxuICAgICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZ2lncyA+IC5naWcgPiAuaW1hZ2Uub2ZmJykuZWFjaCAoaSwgZWwpIC0+XG4gICAgICBzcmMgPSAkKGVsKS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKS5yZXBsYWNlKC91cmxcXChcIj8oLio/KVwiP1xcKS8sIFwiJDFcIilcbiAgICAgIGltYWdlID0gbmV3IEltYWdlKClcbiAgICAgIGltYWdlLnNyYyA9IHNyY1xuICAgICAgY29uc29sZS5sb2cgc3JjXG4gICAgICBpbWFnZS5vbmxvYWQgPSAtPlxuICAgICAgICBfLm9uIGVsXG5cbiAgaTogLT5cbiAgICBAYWN0aXZlID0gdHJ1ZVxuICAgIEBoYW5kbGVycy5pKClcblxuICBkOiAtPlxuICAgIEBhY3RpdmUgPSBmYWxzZVxuXG4gIGhhbmRsZXJzOiBcblxuICAgIGk6IC0+XG4gICAgICAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmRvdHMgPiAuZG90Jykub24gJ2NsaWNrJywgQGRvdFxuICAgIGQ6IC0+XG4gICAgICAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmRvdHMgPiAuZG90Jykub2ZmICdjbGljaycsIEBkb3RcblxuICAgIGRvdDogLT5cbiAgICAgIHByZXZpb3VzID0gJCgnLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5kb3RzID4gLmRvdC5vbicpLmRhdGEgJ251bSdcbiAgICAgIGN1cnJlbnQgPSAkKHRoaXMpLmRhdGEgJ251bSdcblxuICAgICAgaWYgcHJldmlvdXMgPCBjdXJyZW50XG4gICAgICAgIFdvcmsuc2xpZGUgcHJldmlvdXMsIGN1cnJlbnQsICdkb3duJ1xuICAgICAgZWxzZVxuICAgICAgICBXb3JrLnNsaWRlIHByZXZpb3VzLCBjdXJyZW50LCAndXAnXG5cbiAgbmF2aWdhdGU6IChkaXJlY3Rpb24pIC0+XG4gICAgcHJldmlvdXMgPSAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmRvdHMgPiAuZG90Lm9uJykuZGF0YSAnbnVtJ1xuXG4gICAgaWYgZGlyZWN0aW9uIGlzICd1cCdcbiAgICAgIGN1cnJlbnQgPSBwcmV2aW91cysxXG4gICAgZWxzZVxuICAgICAgY3VycmVudCA9IHByZXZpb3VzLTFcblxuICAgIGN1cnJlbnQgPSBXb3JrLmdpZ3MubGVuZ3RoLTFpZiBjdXJyZW50IDwgMFxuXG4gICAgY3VycmVudCA9IDAgaWYgY3VycmVudCBpcyBXb3JrLmdpZ3MubGVuZ3RoXG5cbiAgICBAc2xpZGUgcHJldmlvdXMsIGN1cnJlbnQsIGRpcmVjdGlvblxuXG4gIHNsaWRlOiAoZnJvbSwgdG8sIGRpcmVjdGlvbikgLT5cblxuICAgIGlmIGRpcmVjdGlvbiBpcyAndXAnXG4gICAgICAkKFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5naWdzID4gLmdpZy5naWdfI3tmcm9tfVwiKS5hZGRDbGFzcygndXAnKS5yZW1vdmVDbGFzcygnZG93bicpXG4gICAgICAkKFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5naWdzID4gLmdpZy5naWdfI3t0b31cIikuYWRkQ2xhc3MoJ3VwJykucmVtb3ZlQ2xhc3MoJ2Rvd24nKVxuICAgIGVsc2UgXG4gICAgICAkKFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5naWdzID4gLmdpZy5naWdfI3tmcm9tfVwiKS5hZGRDbGFzcygnZG93bicpLnJlbW92ZUNsYXNzKCd1cCcpXG4gICAgICAkKFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5naWdzID4gLmdpZy5naWdfI3t0b31cIikuYWRkQ2xhc3MoJ2Rvd24nKS5yZW1vdmVDbGFzcygndXAnKVxuXG4gICAgXy5vZmYgXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmRvdHMgPiAuZG90LmRvdF8je2Zyb219XCJcbiAgICBfLm9mZiBcIi5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZ2lncyA+IC5naWcuZ2lnXyN7ZnJvbX1cIiwgb2ZmaW5nOiB0cnVlLCBvZmZ0aW1lOiAwLjVcbiAgICBfLm9mZiBcIi5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuY29weXMgPiAuY29weS5jb3B5XyN7ZnJvbX1cIlxuXG4gICAgXy5vbiBcIi5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZG90cyA+IC5kb3RfI3t0b31cIlxuICAgIF8ub24gXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnXyN7dG99XCJcbiAgICBfLm9uIFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5jb3B5cyA+IC5jb3B5LmNvcHlfI3t0b31cIlxuXG4iXX0=
