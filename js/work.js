var Work;

Work = {
  populated: false,
  paused: false,
  timeout: 1000,
  active: false,
  gigs: ['likwid.jpg', 'lively_card.jpg', 'lw_labs.jpg', 'perricone_blog.jpg', 'lively_branding.jpg', 'lively_product.jpg', 'lw_site.jpg'],
  populate: function(complete) {
    return Basal.jsonp('structures', {
      client: '590a61f45aa59b01b02e2ec2'
    }, null, 'Work.callback');
  },
  callback: function(data) {
    var copy, description, dot, entries, entry, gig_desktop, gig_mobile, image, image_mobile, index, j, k, len, len1, name, ref, structure, thumbnail, thumbnail_mobile;
    ref = data.data;
    for (j = 0, len = ref.length; j < len; j++) {
      structure = ref[j];
      if (structure.name === 'work') {
        entries = structure.entries;
      }
    }
    for (index = k = 0, len1 = entries.length; k < len1; index = ++k) {
      entry = entries[index];
      image = entry.entities.image.value;
      thumbnail = entry.entities.image.thumbnails[20];
      image_mobile = entry.entities.image_mobile.value;
      thumbnail_mobile = entry.entities.image_mobile.thumbnails[20];
      name = entry.name;
      description = entry.entities.description.value;
      gig_desktop = $('<div />', {
        "class": "gig off down gig_" + index,
        style: "background-image: url(" + thumbnail + ")"
      });
      gig_desktop.append($('<div />', {
        "class": 'image off',
        style: "background-image: url(" + image + ")"
      }));
      gig_mobile = $('<div />', {
        "class": "gig off down gig_" + index,
        style: "background-image: url(" + thumbnail_mobile + ")"
      });
      gig_mobile.append($('<div />', {
        "class": 'image off',
        style: "background-image: url(" + image_mobile + ")"
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
        html: name
      }));
      copy.append($('<div />', {
        "class": 'cdescription',
        html: description
      }));
      if (index === 0) {
        _.on(gig_desktop);
        _.on(gig_mobile);
        _.on(dot);
        _.on(copy);
      }
      $('.section.work > .inner > .gigs.gigs_desktop').append(gig_desktop);
      $('.section.work > .inner > .gigs.gigs_mobile').append(gig_mobile);
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
    this.active = false;
    return this.handlers.d();
  },
  handlers: {
    i: function() {
      return $('.section.work > .inner').on('click', '.dots > .dot', this.dot);
    },
    d: function() {
      return $('.section.work > .inner').off('click', '.dots > .dot', this.dot);
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

//# sourceMappingURL=data:application/json;base64,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OiJ3b3JrLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiV29yayA9IFxuXG4gIHBvcHVsYXRlZDogZmFsc2VcblxuICBwYXVzZWQ6IGZhbHNlXG4gIHRpbWVvdXQ6IDEwMDBcblxuICBhY3RpdmU6IGZhbHNlXG5cbiAgZ2lnczogW1xuICAgICdsaWt3aWQuanBnJyxcbiAgICAnbGl2ZWx5X2NhcmQuanBnJyxcbiAgICAnbHdfbGFicy5qcGcnLFxuICAgICdwZXJyaWNvbmVfYmxvZy5qcGcnLFxuICAgICdsaXZlbHlfYnJhbmRpbmcuanBnJyxcbiAgICAnbGl2ZWx5X3Byb2R1Y3QuanBnJyxcbiAgICAnbHdfc2l0ZS5qcGcnLFxuICBdXG5cbiAgcG9wdWxhdGU6ICAoY29tcGxldGUpIC0+XG5cbiAgICBCYXNhbC5qc29ucCAnc3RydWN0dXJlcycsIGNsaWVudDogJzU5MGE2MWY0NWFhNTliMDFiMDJlMmVjMicsIG51bGwsICdXb3JrLmNhbGxiYWNrJ1xuXG4gIGNhbGxiYWNrOiAoZGF0YSkgLT5cblxuICAgIGZvciBzdHJ1Y3R1cmUgaW4gZGF0YS5kYXRhXG4gICAgICBpZiBzdHJ1Y3R1cmUubmFtZSBpcyAnd29yaydcbiAgICAgICAgZW50cmllcyA9IHN0cnVjdHVyZS5lbnRyaWVzXG5cbiAgICBmb3IgZW50cnksIGluZGV4IGluIGVudHJpZXNcblxuICAgICAgaW1hZ2UgPSBlbnRyeS5lbnRpdGllcy5pbWFnZS52YWx1ZVxuICAgICAgdGh1bWJuYWlsID0gZW50cnkuZW50aXRpZXMuaW1hZ2UudGh1bWJuYWlsc1syMF1cblxuICAgICAgaW1hZ2VfbW9iaWxlID0gZW50cnkuZW50aXRpZXMuaW1hZ2VfbW9iaWxlLnZhbHVlXG4gICAgICB0aHVtYm5haWxfbW9iaWxlID0gZW50cnkuZW50aXRpZXMuaW1hZ2VfbW9iaWxlLnRodW1ibmFpbHNbMjBdXG5cbiAgICAgIG5hbWUgPSBlbnRyeS5uYW1lXG4gICAgICBkZXNjcmlwdGlvbiA9IGVudHJ5LmVudGl0aWVzLmRlc2NyaXB0aW9uLnZhbHVlXG5cbiAgICAgIGdpZ19kZXNrdG9wID0gJCAnPGRpdiAvPicsIFxuICAgICAgICBjbGFzczogXCJnaWcgb2ZmIGRvd24gZ2lnXyN7aW5kZXh9XCJcbiAgICAgICAgc3R5bGU6IFwiYmFja2dyb3VuZC1pbWFnZTogdXJsKCN7dGh1bWJuYWlsfSlcIlxuXG4gICAgICBnaWdfZGVza3RvcC5hcHBlbmQgICQgJzxkaXYgLz4nLFxuICAgICAgICBjbGFzczogJ2ltYWdlIG9mZidcbiAgICAgICAgc3R5bGU6IFwiYmFja2dyb3VuZC1pbWFnZTogdXJsKCN7aW1hZ2V9KVwiXG5cbiAgICAgIGdpZ19tb2JpbGUgPSAkICc8ZGl2IC8+JywgXG4gICAgICAgIGNsYXNzOiBcImdpZyBvZmYgZG93biBnaWdfI3tpbmRleH1cIlxuICAgICAgICBzdHlsZTogXCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoI3t0aHVtYm5haWxfbW9iaWxlfSlcIlxuXG4gICAgICBnaWdfbW9iaWxlLmFwcGVuZCAgJCAnPGRpdiAvPicsXG4gICAgICAgIGNsYXNzOiAnaW1hZ2Ugb2ZmJ1xuICAgICAgICBzdHlsZTogXCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoI3tpbWFnZV9tb2JpbGV9KVwiXG5cbiAgICAgIGRvdCA9ICQgJzxkaXY+PC9kaXY+JywgXG4gICAgICAgIGNsYXNzOiBcImRvdCBvZmYgZG90XyN7aW5kZXh9XCJcbiAgICAgICAgJ2RhdGEtbnVtJzogaW5kZXhcblxuICAgICAgZG90LmFwcGVuZCAkICc8ZGl2IC8+JywgY2xhc3M6ICdpbm5lcidcblxuICAgICAgY29weSA9ICQgJzxkaXYgLz4nLCBcbiAgICAgICAgY2xhc3M6IFwiY29weSBvZmYgY29weV8je2luZGV4fVwiXG5cbiAgICAgIGNvcHkuYXBwZW5kICQgJzxkaXYgLz4nLFxuICAgICAgICBjbGFzczogJ2N0aXRsZSdcbiAgICAgICAgaHRtbDogbmFtZVxuXG4gICAgICBjb3B5LmFwcGVuZCAkICc8ZGl2IC8+JyxcbiAgICAgICAgY2xhc3M6ICdjZGVzY3JpcHRpb24nXG4gICAgICAgIGh0bWw6IGRlc2NyaXB0aW9uXG5cbiAgICAgIGlmIGluZGV4IGlzIDBcbiAgICAgICAgXy5vbiBnaWdfZGVza3RvcFxuICAgICAgICBfLm9uIGdpZ19tb2JpbGVcbiAgICAgICAgXy5vbiBkb3RcbiAgICAgICAgXy5vbiBjb3B5XG5cbiAgICAgICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZ2lncy5naWdzX2Rlc2t0b3AnKS5hcHBlbmQgZ2lnX2Rlc2t0b3BcbiAgICAgICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZ2lncy5naWdzX21vYmlsZScpLmFwcGVuZCBnaWdfbW9iaWxlXG4gICAgICAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmRvdHMnKS5hcHBlbmQgZG90XG4gICAgICAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmNvcHlzJykuYXBwZW5kIGNvcHlcblxuICAgICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZ2lncyA+IC5naWcgPiAuaW1hZ2Uub2ZmJykuZWFjaCAoaSwgZWwpIC0+XG4gICAgICBzcmMgPSAkKGVsKS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKS5yZXBsYWNlKC91cmxcXChcIj8oLio/KVwiP1xcKS8sIFwiJDFcIilcbiAgICAgIGltYWdlID0gbmV3IEltYWdlKClcbiAgICAgIGltYWdlLnNyYyA9IHNyY1xuICAgICAgaW1hZ2Uub25sb2FkID0gLT5cbiAgICAgICAgXy5vbiBlbFxuXG4gIGk6IC0+XG4gICAgQGFjdGl2ZSA9IHRydWVcbiAgICBAaGFuZGxlcnMuaSgpXG5cbiAgZDogLT5cbiAgICBAYWN0aXZlID0gZmFsc2VcbiAgICBAaGFuZGxlcnMuZCgpXG5cbiAgaGFuZGxlcnM6IFxuXG4gICAgaTogLT5cbiAgICAgICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXInKS5vbiAnY2xpY2snLCAnLmRvdHMgPiAuZG90JywgQGRvdFxuICAgIGQ6IC0+XG4gICAgICAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyJykub2ZmICdjbGljaycsICcuZG90cyA+IC5kb3QnLCBAZG90XG5cbiAgICBkb3Q6IC0+XG4gICAgICBwcmV2aW91cyA9ICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZG90cyA+IC5kb3Qub24nKS5kYXRhICdudW0nXG4gICAgICBjdXJyZW50ID0gJCh0aGlzKS5kYXRhICdudW0nXG5cbiAgICAgIGlmIHByZXZpb3VzIDwgY3VycmVudFxuICAgICAgICBXb3JrLnNsaWRlIHByZXZpb3VzLCBjdXJyZW50LCAnZG93bidcbiAgICAgIGVsc2VcbiAgICAgICAgV29yay5zbGlkZSBwcmV2aW91cywgY3VycmVudCwgJ3VwJ1xuXG4gIG5hdmlnYXRlOiAoZGlyZWN0aW9uKSAtPlxuXG4gICAgcmV0dXJuIHRydWUgaWYgV29yay5wYXVzZWQgaXMgdHJ1ZVxuXG4gICAgcHJldmlvdXMgPSAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmRvdHMgPiAuZG90Lm9uJykuZGF0YSAnbnVtJ1xuXG4gICAgaWYgZGlyZWN0aW9uIGlzICd1cCdcbiAgICAgIGN1cnJlbnQgPSBwcmV2aW91cysxXG4gICAgZWxzZVxuICAgICAgY3VycmVudCA9IHByZXZpb3VzLTFcblxuICAgIGN1cnJlbnQgPSBXb3JrLmdpZ3MubGVuZ3RoLTFpZiBjdXJyZW50IDwgMFxuXG4gICAgY3VycmVudCA9IDAgaWYgY3VycmVudCBpcyBXb3JrLmdpZ3MubGVuZ3RoXG5cbiAgICBAc2xpZGUgcHJldmlvdXMsIGN1cnJlbnQsIGRpcmVjdGlvblxuXG4gICAgV29yay5wYXVzZWQgPSB0cnVlXG4gICAgc2V0VGltZW91dCAtPlxuICAgICAgV29yay5wYXVzZWQgPSBmYWxzZVxuICAgICxXb3JrLnRpbWVvdXRcblxuICBzbGlkZTogKGZyb20sIHRvLCBkaXJlY3Rpb24pIC0+XG5cbiAgICBpZiBkaXJlY3Rpb24gaXMgJ3VwJ1xuICAgICAgJChcIi5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZ2lncyA+IC5naWcuZ2lnXyN7ZnJvbX1cIikuYWRkQ2xhc3MoJ3VwJykucmVtb3ZlQ2xhc3MoJ2Rvd24nKVxuICAgICAgJChcIi5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZ2lncyA+IC5naWcuZ2lnXyN7dG99XCIpLmFkZENsYXNzKCd1cCcpLnJlbW92ZUNsYXNzKCdkb3duJylcbiAgICBlbHNlIFxuICAgICAgJChcIi5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZ2lncyA+IC5naWcuZ2lnXyN7ZnJvbX1cIikuYWRkQ2xhc3MoJ2Rvd24nKS5yZW1vdmVDbGFzcygndXAnKVxuICAgICAgJChcIi5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZ2lncyA+IC5naWcuZ2lnXyN7dG99XCIpLmFkZENsYXNzKCdkb3duJykucmVtb3ZlQ2xhc3MoJ3VwJylcblxuICAgIF8ub2ZmIFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5kb3RzID4gLmRvdC5kb3RfI3tmcm9tfVwiXG4gICAgXy5vZmYgXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnLmdpZ18je2Zyb219XCIsIG9mZmluZzogdHJ1ZSwgb2ZmdGltZTogMC41XG4gICAgXy5vZmYgXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmNvcHlzID4gLmNvcHkuY29weV8je2Zyb219XCJcblxuICAgIF8ub24gXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmRvdHMgPiAuZG90XyN7dG99XCJcbiAgICBfLm9uIFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5naWdzID4gLmdpZ18je3RvfVwiXG4gICAgXy5vbiBcIi5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuY29weXMgPiAuY29weS5jb3B5XyN7dG99XCJcblxuIl19
