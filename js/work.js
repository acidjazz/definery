var Work;

Work = {
  populated: false,
  paused: false,
  timeout: 1000,
  active: false,
  gigs: ['likwid.jpg', 'lively_card.jpg', 'lw_labs.jpg', 'perricone_blog.jpg', 'lively_branding.jpg', 'lively_product.jpg', 'lw_site.jpg'],
  populate: function(complete) {
    return Basal.jsonp('entries', {
      structure: '590ba6be5aa59b01b02e2ec4',
      sort: 'order',
      asc: 'true',
      active: 'true'
    }, null, 'Work.callback');
  },
  callback: function(data) {
    var copy, description, dot, entry, gig_desktop, gig_mobile, image, image_mobile, index, j, len, name, ref, thumbnail, thumbnail_mobile;
    ref = data.data;
    for (index = j = 0, len = ref.length; j < len; index = ++j) {
      entry = ref[index];
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

//# sourceMappingURL=data:application/json;base64,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b3VyY2VzQ29udGVudCI6WyJXb3JrID0gXG5cbiAgcG9wdWxhdGVkOiBmYWxzZVxuXG4gIHBhdXNlZDogZmFsc2VcbiAgdGltZW91dDogMTAwMFxuXG4gIGFjdGl2ZTogZmFsc2VcblxuICBnaWdzOiBbXG4gICAgJ2xpa3dpZC5qcGcnLFxuICAgICdsaXZlbHlfY2FyZC5qcGcnLFxuICAgICdsd19sYWJzLmpwZycsXG4gICAgJ3BlcnJpY29uZV9ibG9nLmpwZycsXG4gICAgJ2xpdmVseV9icmFuZGluZy5qcGcnLFxuICAgICdsaXZlbHlfcHJvZHVjdC5qcGcnLFxuICAgICdsd19zaXRlLmpwZycsXG4gIF1cblxuICBwb3B1bGF0ZTogIChjb21wbGV0ZSkgLT5cblxuICAgIEJhc2FsLmpzb25wICdlbnRyaWVzJywgXG4gICAgICBzdHJ1Y3R1cmU6ICc1OTBiYTZiZTVhYTU5YjAxYjAyZTJlYzQnXG4gICAgICBzb3J0OiAnb3JkZXInLFxuICAgICAgYXNjOiAndHJ1ZScsXG4gICAgICBhY3RpdmU6ICd0cnVlJyxcbiAgICAsIG51bGwsICdXb3JrLmNhbGxiYWNrJ1xuXG4gIGNhbGxiYWNrOiAoZGF0YSkgLT5cblxuICAgIGZvciBlbnRyeSwgaW5kZXggaW4gZGF0YS5kYXRhXG4gICAgICBcbiAgICAgIGltYWdlID0gZW50cnkuZW50aXRpZXMuaW1hZ2UudmFsdWVcbiAgICAgIHRodW1ibmFpbCA9IGVudHJ5LmVudGl0aWVzLmltYWdlLnRodW1ibmFpbHNbMjBdXG5cbiAgICAgIGltYWdlX21vYmlsZSA9IGVudHJ5LmVudGl0aWVzLmltYWdlX21vYmlsZS52YWx1ZVxuICAgICAgdGh1bWJuYWlsX21vYmlsZSA9IGVudHJ5LmVudGl0aWVzLmltYWdlX21vYmlsZS50aHVtYm5haWxzWzIwXVxuXG4gICAgICBuYW1lID0gZW50cnkubmFtZVxuICAgICAgZGVzY3JpcHRpb24gPSBlbnRyeS5lbnRpdGllcy5kZXNjcmlwdGlvbi52YWx1ZVxuXG4gICAgICBnaWdfZGVza3RvcCA9ICQgJzxkaXYgLz4nLCBcbiAgICAgICAgY2xhc3M6IFwiZ2lnIG9mZiBkb3duIGdpZ18je2luZGV4fVwiXG4gICAgICAgIHN0eWxlOiBcImJhY2tncm91bmQtaW1hZ2U6IHVybCgje3RodW1ibmFpbH0pXCJcblxuICAgICAgZ2lnX2Rlc2t0b3AuYXBwZW5kICAkICc8ZGl2IC8+JyxcbiAgICAgICAgY2xhc3M6ICdpbWFnZSBvZmYnXG4gICAgICAgIHN0eWxlOiBcImJhY2tncm91bmQtaW1hZ2U6IHVybCgje2ltYWdlfSlcIlxuXG4gICAgICBnaWdfbW9iaWxlID0gJCAnPGRpdiAvPicsIFxuICAgICAgICBjbGFzczogXCJnaWcgb2ZmIGRvd24gZ2lnXyN7aW5kZXh9XCJcbiAgICAgICAgc3R5bGU6IFwiYmFja2dyb3VuZC1pbWFnZTogdXJsKCN7dGh1bWJuYWlsX21vYmlsZX0pXCJcblxuICAgICAgZ2lnX21vYmlsZS5hcHBlbmQgICQgJzxkaXYgLz4nLFxuICAgICAgICBjbGFzczogJ2ltYWdlIG9mZidcbiAgICAgICAgc3R5bGU6IFwiYmFja2dyb3VuZC1pbWFnZTogdXJsKCN7aW1hZ2VfbW9iaWxlfSlcIlxuXG4gICAgICBkb3QgPSAkICc8ZGl2PjwvZGl2PicsIFxuICAgICAgICBjbGFzczogXCJkb3Qgb2ZmIGRvdF8je2luZGV4fVwiXG4gICAgICAgICdkYXRhLW51bSc6IGluZGV4XG5cbiAgICAgIGRvdC5hcHBlbmQgJCAnPGRpdiAvPicsIGNsYXNzOiAnaW5uZXInXG5cbiAgICAgIGNvcHkgPSAkICc8ZGl2IC8+JywgXG4gICAgICAgIGNsYXNzOiBcImNvcHkgb2ZmIGNvcHlfI3tpbmRleH1cIlxuXG4gICAgICBjb3B5LmFwcGVuZCAkICc8ZGl2IC8+JyxcbiAgICAgICAgY2xhc3M6ICdjdGl0bGUnXG4gICAgICAgIGh0bWw6IG5hbWVcblxuICAgICAgY29weS5hcHBlbmQgJCAnPGRpdiAvPicsXG4gICAgICAgIGNsYXNzOiAnY2Rlc2NyaXB0aW9uJ1xuICAgICAgICBodG1sOiBkZXNjcmlwdGlvblxuXG4gICAgICBpZiBpbmRleCBpcyAwXG4gICAgICAgIF8ub24gZ2lnX2Rlc2t0b3BcbiAgICAgICAgXy5vbiBnaWdfbW9iaWxlXG4gICAgICAgIF8ub24gZG90XG4gICAgICAgIF8ub24gY29weVxuXG4gICAgICAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MuZ2lnc19kZXNrdG9wJykuYXBwZW5kIGdpZ19kZXNrdG9wXG4gICAgICAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MuZ2lnc19tb2JpbGUnKS5hcHBlbmQgZ2lnX21vYmlsZVxuICAgICAgJCgnLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5kb3RzJykuYXBwZW5kIGRvdFxuICAgICAgJCgnLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5jb3B5cycpLmFwcGVuZCBjb3B5XG5cbiAgICAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnID4gLmltYWdlLm9mZicpLmVhY2ggKGksIGVsKSAtPlxuICAgICAgc3JjID0gJChlbCkuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJykucmVwbGFjZSgvdXJsXFwoXCI/KC4qPylcIj9cXCkvLCBcIiQxXCIpXG4gICAgICBpbWFnZSA9IG5ldyBJbWFnZSgpXG4gICAgICBpbWFnZS5zcmMgPSBzcmNcbiAgICAgIGltYWdlLm9ubG9hZCA9IC0+XG4gICAgICAgIF8ub24gZWxcblxuICBpOiAtPlxuICAgIEBhY3RpdmUgPSB0cnVlXG4gICAgQGhhbmRsZXJzLmkoKVxuXG4gIGQ6IC0+XG4gICAgQGFjdGl2ZSA9IGZhbHNlXG4gICAgQGhhbmRsZXJzLmQoKVxuXG4gIGhhbmRsZXJzOiBcblxuICAgIGk6IC0+XG4gICAgICAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyJykub24gJ2NsaWNrJywgJy5kb3RzID4gLmRvdCcsIEBkb3RcbiAgICBkOiAtPlxuICAgICAgJCgnLnNlY3Rpb24ud29yayA+IC5pbm5lcicpLm9mZiAnY2xpY2snLCAnLmRvdHMgPiAuZG90JywgQGRvdFxuXG4gICAgZG90OiAtPlxuICAgICAgcHJldmlvdXMgPSAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmRvdHMgPiAuZG90Lm9uJykuZGF0YSAnbnVtJ1xuICAgICAgY3VycmVudCA9ICQodGhpcykuZGF0YSAnbnVtJ1xuXG4gICAgICBpZiBwcmV2aW91cyA8IGN1cnJlbnRcbiAgICAgICAgV29yay5zbGlkZSBwcmV2aW91cywgY3VycmVudCwgJ2Rvd24nXG4gICAgICBlbHNlXG4gICAgICAgIFdvcmsuc2xpZGUgcHJldmlvdXMsIGN1cnJlbnQsICd1cCdcblxuICBuYXZpZ2F0ZTogKGRpcmVjdGlvbikgLT5cblxuICAgIHJldHVybiB0cnVlIGlmIFdvcmsucGF1c2VkIGlzIHRydWVcblxuICAgIHByZXZpb3VzID0gJCgnLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5kb3RzID4gLmRvdC5vbicpLmRhdGEgJ251bSdcblxuICAgIGlmIGRpcmVjdGlvbiBpcyAndXAnXG4gICAgICBjdXJyZW50ID0gcHJldmlvdXMrMVxuICAgIGVsc2VcbiAgICAgIGN1cnJlbnQgPSBwcmV2aW91cy0xXG5cbiAgICBjdXJyZW50ID0gV29yay5naWdzLmxlbmd0aC0xaWYgY3VycmVudCA8IDBcblxuICAgIGN1cnJlbnQgPSAwIGlmIGN1cnJlbnQgaXMgV29yay5naWdzLmxlbmd0aFxuXG4gICAgQHNsaWRlIHByZXZpb3VzLCBjdXJyZW50LCBkaXJlY3Rpb25cblxuICAgIFdvcmsucGF1c2VkID0gdHJ1ZVxuICAgIHNldFRpbWVvdXQgLT5cbiAgICAgIFdvcmsucGF1c2VkID0gZmFsc2VcbiAgICAsV29yay50aW1lb3V0XG5cbiAgc2xpZGU6IChmcm9tLCB0bywgZGlyZWN0aW9uKSAtPlxuXG4gICAgaWYgZGlyZWN0aW9uIGlzICd1cCdcbiAgICAgICQoXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnLmdpZ18je2Zyb219XCIpLmFkZENsYXNzKCd1cCcpLnJlbW92ZUNsYXNzKCdkb3duJylcbiAgICAgICQoXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnLmdpZ18je3RvfVwiKS5hZGRDbGFzcygndXAnKS5yZW1vdmVDbGFzcygnZG93bicpXG4gICAgZWxzZSBcbiAgICAgICQoXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnLmdpZ18je2Zyb219XCIpLmFkZENsYXNzKCdkb3duJykucmVtb3ZlQ2xhc3MoJ3VwJylcbiAgICAgICQoXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnLmdpZ18je3RvfVwiKS5hZGRDbGFzcygnZG93bicpLnJlbW92ZUNsYXNzKCd1cCcpXG5cbiAgICBfLm9mZiBcIi5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZG90cyA+IC5kb3QuZG90XyN7ZnJvbX1cIlxuICAgIF8ub2ZmIFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5naWdzID4gLmdpZy5naWdfI3tmcm9tfVwiLCBvZmZpbmc6IHRydWUsIG9mZnRpbWU6IDAuNVxuICAgIF8ub2ZmIFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5jb3B5cyA+IC5jb3B5LmNvcHlfI3tmcm9tfVwiXG5cbiAgICBfLm9uIFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5kb3RzID4gLmRvdF8je3RvfVwiXG4gICAgXy5vbiBcIi5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZ2lncyA+IC5naWdfI3t0b31cIlxuICAgIF8ub24gXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmNvcHlzID4gLmNvcHkuY29weV8je3RvfVwiXG5cbiJdfQ==
