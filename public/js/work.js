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

//# sourceMappingURL=data:application/json;base64,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QyxDQUFvRCxDQUFDLFFBQXJELENBQThELElBQTlELENBQW1FLENBQUMsV0FBcEUsQ0FBZ0YsTUFBaEYsRUFGRjtLQUFBLE1BQUE7TUFJRSxDQUFBLENBQUUsNENBQUEsR0FBNkMsSUFBL0MsQ0FBc0QsQ0FBQyxRQUF2RCxDQUFnRSxNQUFoRSxDQUF1RSxDQUFDLFdBQXhFLENBQW9GLElBQXBGO01BQ0EsQ0FBQSxDQUFFLDRDQUFBLEdBQTZDLEVBQS9DLENBQW9ELENBQUMsUUFBckQsQ0FBOEQsTUFBOUQsQ0FBcUUsQ0FBQyxXQUF0RSxDQUFrRixJQUFsRixFQUxGOztJQU9BLENBQUMsQ0FBQyxHQUFGLENBQU0sNENBQUEsR0FBNkMsSUFBbkQ7SUFDQSxDQUFDLENBQUMsR0FBRixDQUFNLDRDQUFBLEdBQTZDLElBQW5EO0lBQ0EsQ0FBQyxDQUFDLEdBQUYsQ0FBTSwrQ0FBQSxHQUFnRCxJQUF0RDtJQUVBLENBQUMsQ0FBQyxFQUFGLENBQUssd0NBQUEsR0FBeUMsRUFBOUM7SUFDQSxDQUFDLENBQUMsRUFBRixDQUFLLHdDQUFBLEdBQXlDLEVBQTlDO1dBQ0EsQ0FBQyxDQUFDLEVBQUYsQ0FBSywrQ0FBQSxHQUFnRCxFQUFyRDtFQWZLLENBNUZQIiwiZmlsZSI6IndvcmsuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJXb3JrID0gXG5cbiAgYWN0aXZlOiBmYWxzZVxuXG4gIGdpZ3M6IFtcbiAgICAnbGlrd2lkLmpwZycsXG4gICAgJ2xpdmVseV9jYXJkLmpwZycsXG4gICAgJ2x3X2xhYnMuanBnJyxcbiAgICAncGVycmljb25lX2Jsb2cuanBnJyxcbiAgICAnbGl2ZWx5X2JyYW5kaW5nLmpwZycsXG4gICAgJ2xpdmVseV9wcm9kdWN0LmpwZycsXG4gICAgJ2x3X3NpdGUuanBnJyxcbiAgXVxuXG4gIHBvcHVsYXRlOiAgKGNvbXBsZXRlKS0+XG5cbiAgICBmb3IgaW1hZ2UsIGluZGV4IGluIEBnaWdzXG5cbiAgICAgIGdpZyA9ICQgJzxkaXYgLz4nLCBcbiAgICAgICAgY2xhc3M6IFwiZ2lnIG9mZiBnaWdfI3tpbmRleH1cIlxuICAgICAgICBzdHlsZTogXCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoL2ltYWdlcy93b3JrL3RodW1icy8je2ltYWdlfSlcIlxuXG4gICAgICBnaWcuYXBwZW5kICAkICc8ZGl2IC8+JyxcbiAgICAgICAgY2xhc3M6ICdpbWFnZSBvZmYnXG4gICAgICAgIHN0eWxlOiBcImJhY2tncm91bmQtaW1hZ2U6IHVybCgvaW1hZ2VzL3dvcmsvI3tpbWFnZX0pXCJcblxuICAgICAgZG90ID0gJCAnPGRpdj48L2Rpdj4nLCBcbiAgICAgICAgY2xhc3M6IFwiZG90IG9mZiBkb3RfI3tpbmRleH1cIlxuICAgICAgICAnZGF0YS1udW0nOiBpbmRleFxuXG4gICAgICBkb3QuYXBwZW5kICQgJzxkaXYgLz4nLCBjbGFzczogJ2lubmVyJ1xuXG4gICAgICBjb3B5ID0gJCAnPGRpdiAvPicsIFxuICAgICAgICBjbGFzczogXCJjb3B5IG9mZiBjb3B5XyN7aW5kZXh9XCJcblxuICAgICAgY29weS5hcHBlbmQgJCAnPGRpdiAvPicsXG4gICAgICAgIGNsYXNzOiAnY3RpdGxlJ1xuICAgICAgICBodG1sOiAndGhpcyBpcyB0aGUgdGl0bGUnXG5cbiAgICAgIGNvcHkuYXBwZW5kICQgJzxkaXYgLz4nLFxuICAgICAgICBjbGFzczogJ2NkZXNjcmlwdGlvbidcbiAgICAgICAgaHRtbDogJ3RoaXMgaXMgdGhlIGRlc2NyaXB0aW9uJ1xuXG4gICAgICBpZiBpbmRleCBpcyAwXG4gICAgICAgIF8ub24gZ2lnXG4gICAgICAgIF8ub24gZG90XG4gICAgICAgIF8ub24gY29weVxuXG4gICAgICAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MnKS5hcHBlbmQgZ2lnXG4gICAgICAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmRvdHMnKS5hcHBlbmQgZG90XG4gICAgICAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmNvcHlzJykuYXBwZW5kIGNvcHlcblxuICAgICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZ2lncyA+IC5naWcgPiAuaW1hZ2Uub2ZmJykuZWFjaCAoaSwgZWwpIC0+XG4gICAgICBzcmMgPSAkKGVsKS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKS5yZXBsYWNlKC91cmxcXChcIj8oLio/KVwiP1xcKS8sIFwiJDFcIilcbiAgICAgIGltYWdlID0gbmV3IEltYWdlKClcbiAgICAgIGltYWdlLnNyYyA9IHNyY1xuICAgICAgaW1hZ2Uub25sb2FkID0gLT5cbiAgICAgICAgXy5vbiBlbFxuXG4gIGk6IC0+XG4gICAgQGFjdGl2ZSA9IHRydWVcbiAgICBAaGFuZGxlcnMuaSgpXG5cbiAgZDogLT5cbiAgICBjb25zb2xlLmxvZyAnV29yay5kKCknXG4gICAgQGFjdGl2ZSA9IGZhbHNlXG5cbiAgaGFuZGxlcnM6IFxuXG4gICAgaTogLT5cbiAgICAgICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZG90cyA+IC5kb3QnKS5vbiAnY2xpY2snLCBAZG90XG4gICAgZDogLT5cbiAgICAgICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZG90cyA+IC5kb3QnKS5vZmYgJ2NsaWNrJywgQGRvdFxuXG4gICAgZG90OiAtPlxuICAgICAgcHJldmlvdXMgPSAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmRvdHMgPiAuZG90Lm9uJykuZGF0YSAnbnVtJ1xuICAgICAgY3VycmVudCA9ICQodGhpcykuZGF0YSAnbnVtJ1xuXG4gICAgICBXb3JrLnNsaWRlIHByZXZpb3VzLCBjdXJyZW50XG5cbiAgbmF2aWdhdGU6IChkaXJlY3Rpb24pIC0+XG4gICAgcHJldmlvdXMgPSAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmRvdHMgPiAuZG90Lm9uJykuZGF0YSAnbnVtJ1xuXG4gICAgaWYgZGlyZWN0aW9uIGlzICd1cCdcbiAgICAgIGN1cnJlbnQgPSBwcmV2aW91cysxXG4gICAgZWxzZVxuICAgICAgY3VycmVudCA9IHByZXZpb3VzLTFcblxuICAgIGN1cnJlbnQgPSBXb3JrLmdpZ3MubGVuZ3RoLTFpZiBjdXJyZW50IDwgMFxuXG4gICAgY3VycmVudCA9IDAgaWYgY3VycmVudCBpcyBXb3JrLmdpZ3MubGVuZ3RoXG5cbiAgICBAc2xpZGUgcHJldmlvdXMsIGN1cnJlbnRcblxuICBzbGlkZTogKGZyb20sIHRvKSAtPlxuXG4gICAgaWYgdG8gPiBmcm9tXG4gICAgICAkKFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5naWdzID4gLmdpZy5naWdfI3tmcm9tfVwiKS5hZGRDbGFzcygndXAnKS5yZW1vdmVDbGFzcygnZG93bicpXG4gICAgICAkKFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5naWdzID4gLmdpZy5naWdfI3t0b31cIikuYWRkQ2xhc3MoJ3VwJykucmVtb3ZlQ2xhc3MoJ2Rvd24nKVxuICAgIGVsc2VcbiAgICAgICQoXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnLmdpZ18je2Zyb219XCIpLmFkZENsYXNzKCdkb3duJykucmVtb3ZlQ2xhc3MoJ3VwJylcbiAgICAgICQoXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnLmdpZ18je3RvfVwiKS5hZGRDbGFzcygnZG93bicpLnJlbW92ZUNsYXNzKCd1cCcpXG5cbiAgICBfLm9mZiBcIi5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZG90cyA+IC5kb3QuZG90XyN7ZnJvbX1cIlxuICAgIF8ub2ZmIFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5naWdzID4gLmdpZy5naWdfI3tmcm9tfVwiXG4gICAgXy5vZmYgXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmNvcHlzID4gLmNvcHkuY29weV8je2Zyb219XCJcblxuICAgIF8ub24gXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmRvdHMgPiAuZG90XyN7dG99XCJcbiAgICBfLm9uIFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5naWdzID4gLmdpZ18je3RvfVwiXG4gICAgXy5vbiBcIi5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuY29weXMgPiAuY29weS5jb3B5XyN7dG99XCJcblxuXG5cblxuIl19
