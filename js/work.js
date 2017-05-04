var Work;

Work = {
  paused: false,
  timeout: 1000,
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
    if (Work.paused === true) {
      return true;
    }
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
    this.slide(previous, current, direction);
    Work.paused = true;
    return setTimeout(function() {
      return Work.paused = false;
    }, Work.timeout);
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

//# sourceMappingURL=data:application/json;base64,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cyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIldvcmsgPSBcblxuICBwYXVzZWQ6IGZhbHNlXG4gIHRpbWVvdXQ6IDEwMDBcblxuICBhY3RpdmU6IGZhbHNlXG5cbiAgZ2lnczogW1xuICAgICdsaWt3aWQuanBnJyxcbiAgICAnbGl2ZWx5X2NhcmQuanBnJyxcbiAgICAnbHdfbGFicy5qcGcnLFxuICAgICdwZXJyaWNvbmVfYmxvZy5qcGcnLFxuICAgICdsaXZlbHlfYnJhbmRpbmcuanBnJyxcbiAgICAnbGl2ZWx5X3Byb2R1Y3QuanBnJyxcbiAgICAnbHdfc2l0ZS5qcGcnLFxuICBdXG5cbiAgcG9wdWxhdGU6ICAoY29tcGxldGUpLT5cblxuICAgIGZvciBpbWFnZSwgaW5kZXggaW4gQGdpZ3NcblxuICAgICAgZ2lnID0gJCAnPGRpdiAvPicsIFxuICAgICAgICBjbGFzczogXCJnaWcgb2ZmIGRvd24gZ2lnXyN7aW5kZXh9XCJcbiAgICAgICAgc3R5bGU6IFwiYmFja2dyb3VuZC1pbWFnZTogdXJsKC9pbWFnZXMvd29yay90aHVtYnMvI3tpbWFnZX0pXCJcblxuICAgICAgZ2lnLmFwcGVuZCAgJCAnPGRpdiAvPicsXG4gICAgICAgIGNsYXNzOiAnaW1hZ2Ugb2ZmJ1xuICAgICAgICBzdHlsZTogXCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoL2ltYWdlcy93b3JrLyN7aW1hZ2V9KVwiXG5cbiAgICAgIGRvdCA9ICQgJzxkaXY+PC9kaXY+JywgXG4gICAgICAgIGNsYXNzOiBcImRvdCBvZmYgZG90XyN7aW5kZXh9XCJcbiAgICAgICAgJ2RhdGEtbnVtJzogaW5kZXhcblxuICAgICAgZG90LmFwcGVuZCAkICc8ZGl2IC8+JywgY2xhc3M6ICdpbm5lcidcblxuICAgICAgY29weSA9ICQgJzxkaXYgLz4nLCBcbiAgICAgICAgY2xhc3M6IFwiY29weSBvZmYgY29weV8je2luZGV4fVwiXG5cbiAgICAgIGNvcHkuYXBwZW5kICQgJzxkaXYgLz4nLFxuICAgICAgICBjbGFzczogJ2N0aXRsZSdcbiAgICAgICAgaHRtbDogJ3RoaXMgaXMgdGhlIHRpdGxlJ1xuXG4gICAgICBjb3B5LmFwcGVuZCAkICc8ZGl2IC8+JyxcbiAgICAgICAgY2xhc3M6ICdjZGVzY3JpcHRpb24nXG4gICAgICAgIGh0bWw6ICd0aGlzIGlzIHRoZSBkZXNjcmlwdGlvbidcblxuICAgICAgaWYgaW5kZXggaXMgMFxuICAgICAgICBfLm9uIGdpZ1xuICAgICAgICBfLm9uIGRvdFxuICAgICAgICBfLm9uIGNvcHlcblxuICAgICAgJCgnLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5naWdzJykuYXBwZW5kIGdpZ1xuICAgICAgJCgnLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5kb3RzJykuYXBwZW5kIGRvdFxuICAgICAgJCgnLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5jb3B5cycpLmFwcGVuZCBjb3B5XG5cbiAgICAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnID4gLmltYWdlLm9mZicpLmVhY2ggKGksIGVsKSAtPlxuICAgICAgc3JjID0gJChlbCkuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJykucmVwbGFjZSgvdXJsXFwoXCI/KC4qPylcIj9cXCkvLCBcIiQxXCIpXG4gICAgICBpbWFnZSA9IG5ldyBJbWFnZSgpXG4gICAgICBpbWFnZS5zcmMgPSBzcmNcbiAgICAgIGltYWdlLm9ubG9hZCA9IC0+XG4gICAgICAgIF8ub24gZWxcblxuICBpOiAtPlxuICAgIEBhY3RpdmUgPSB0cnVlXG4gICAgQGhhbmRsZXJzLmkoKVxuXG4gIGQ6IC0+XG4gICAgQGFjdGl2ZSA9IGZhbHNlXG5cbiAgaGFuZGxlcnM6IFxuXG4gICAgaTogLT5cbiAgICAgICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZG90cyA+IC5kb3QnKS5vbiAnY2xpY2snLCBAZG90XG4gICAgZDogLT5cbiAgICAgICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZG90cyA+IC5kb3QnKS5vZmYgJ2NsaWNrJywgQGRvdFxuXG4gICAgZG90OiAtPlxuICAgICAgcHJldmlvdXMgPSAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmRvdHMgPiAuZG90Lm9uJykuZGF0YSAnbnVtJ1xuICAgICAgY3VycmVudCA9ICQodGhpcykuZGF0YSAnbnVtJ1xuXG4gICAgICBpZiBwcmV2aW91cyA8IGN1cnJlbnRcbiAgICAgICAgV29yay5zbGlkZSBwcmV2aW91cywgY3VycmVudCwgJ2Rvd24nXG4gICAgICBlbHNlXG4gICAgICAgIFdvcmsuc2xpZGUgcHJldmlvdXMsIGN1cnJlbnQsICd1cCdcblxuICBuYXZpZ2F0ZTogKGRpcmVjdGlvbikgLT5cblxuICAgIHJldHVybiB0cnVlIGlmIFdvcmsucGF1c2VkIGlzIHRydWVcblxuICAgIHByZXZpb3VzID0gJCgnLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5kb3RzID4gLmRvdC5vbicpLmRhdGEgJ251bSdcblxuICAgIGlmIGRpcmVjdGlvbiBpcyAndXAnXG4gICAgICBjdXJyZW50ID0gcHJldmlvdXMrMVxuICAgIGVsc2VcbiAgICAgIGN1cnJlbnQgPSBwcmV2aW91cy0xXG5cbiAgICBjdXJyZW50ID0gV29yay5naWdzLmxlbmd0aC0xaWYgY3VycmVudCA8IDBcblxuICAgIGN1cnJlbnQgPSAwIGlmIGN1cnJlbnQgaXMgV29yay5naWdzLmxlbmd0aFxuXG4gICAgQHNsaWRlIHByZXZpb3VzLCBjdXJyZW50LCBkaXJlY3Rpb25cblxuICAgIFdvcmsucGF1c2VkID0gdHJ1ZVxuICAgIHNldFRpbWVvdXQgLT5cbiAgICAgIFdvcmsucGF1c2VkID0gZmFsc2VcbiAgICAsV29yay50aW1lb3V0XG5cbiAgc2xpZGU6IChmcm9tLCB0bywgZGlyZWN0aW9uKSAtPlxuXG4gICAgaWYgZGlyZWN0aW9uIGlzICd1cCdcbiAgICAgICQoXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnLmdpZ18je2Zyb219XCIpLmFkZENsYXNzKCd1cCcpLnJlbW92ZUNsYXNzKCdkb3duJylcbiAgICAgICQoXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnLmdpZ18je3RvfVwiKS5hZGRDbGFzcygndXAnKS5yZW1vdmVDbGFzcygnZG93bicpXG4gICAgZWxzZSBcbiAgICAgICQoXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnLmdpZ18je2Zyb219XCIpLmFkZENsYXNzKCdkb3duJykucmVtb3ZlQ2xhc3MoJ3VwJylcbiAgICAgICQoXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnLmdpZ18je3RvfVwiKS5hZGRDbGFzcygnZG93bicpLnJlbW92ZUNsYXNzKCd1cCcpXG5cbiAgICBfLm9mZiBcIi5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZG90cyA+IC5kb3QuZG90XyN7ZnJvbX1cIlxuICAgIF8ub2ZmIFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5naWdzID4gLmdpZy5naWdfI3tmcm9tfVwiLCBvZmZpbmc6IHRydWUsIG9mZnRpbWU6IDAuNVxuICAgIF8ub2ZmIFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5jb3B5cyA+IC5jb3B5LmNvcHlfI3tmcm9tfVwiXG5cbiAgICBfLm9uIFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5kb3RzID4gLmRvdF8je3RvfVwiXG4gICAgXy5vbiBcIi5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZ2lncyA+IC5naWdfI3t0b31cIlxuICAgIF8ub24gXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmNvcHlzID4gLmNvcHkuY29weV8je3RvfVwiXG5cbiJdfQ==
