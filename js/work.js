var Work;

Work = {
  populated: false,
  paused: false,
  timeout: 1000,
  active: false,
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
    Work.entries = data.data;
    ref = Work.entries;
    for (index = j = 0, len = ref.length; j < len; index = ++j) {
      entry = ref[index];
      image = entry.entities.image.value;
      thumbnail = entry.entities.image.thumbnails[20];
      image_mobile = entry.entities.image_mobile.value;
      thumbnail_mobile = entry.entities.image_mobile.thumbnails[20];
      name = entry.name;
      description = entry.entities.description.value;
      gig_desktop = $('<div />', {
        "class": "gig off gig_" + index,
        style: "background-image: url(" + thumbnail + ")"
      });
      gig_desktop.append($('<div />', {
        "class": 'image off',
        style: "background-image: url(" + image + ")"
      }));
      gig_mobile = $('<div />', {
        "class": "gig off gig_" + index,
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
      copy = $('<a />', {
        "class": "copy off copy_" + index
      });
      copy.append($('<div />', {
        "class": 'ctitle',
        html: name
      }));
      if (entry.entities.link.value) {
        copy.append($('.copylink_template').children().clone());
        copy.addClass('linked');
        copy.attr('href', entry.entities.link.value);
        copy.attr('target', '_new');
      }
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
        return Work.slide(previous, current, 'up');
      } else {
        return Work.slide(previous, current, 'down');
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
      current = Work.entries.length - 1;
    }
    if (current === Work.entries.length) {
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

//# sourceMappingURL=data:application/json;base64,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Q0FBQyxDQUFDLEdBQUYsQ0FBTSwrQ0FBQSxHQUFnRCxJQUF0RDtJQUVBLENBQUMsQ0FBQyxFQUFGLENBQUssd0NBQUEsR0FBeUMsRUFBOUM7SUFDQSxDQUFDLENBQUMsRUFBRixDQUFLLHdDQUFBLEdBQXlDLEVBQTlDO1dBQ0EsQ0FBQyxDQUFDLEVBQUYsQ0FBSywrQ0FBQSxHQUFnRCxFQUFyRDtFQWZLLENBdElQIiwiZmlsZSI6IndvcmsuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJXb3JrID0gXG5cbiAgcG9wdWxhdGVkOiBmYWxzZVxuXG4gIHBhdXNlZDogZmFsc2VcbiAgdGltZW91dDogMTAwMFxuXG4gIGFjdGl2ZTogZmFsc2VcblxuICBwb3B1bGF0ZTogIChjb21wbGV0ZSkgLT5cblxuICAgIEJhc2FsLmpzb25wICdlbnRyaWVzJywgXG4gICAgICBzdHJ1Y3R1cmU6ICc1OTBiYTZiZTVhYTU5YjAxYjAyZTJlYzQnXG4gICAgICBzb3J0OiAnb3JkZXInLFxuICAgICAgYXNjOiAndHJ1ZScsXG4gICAgICBhY3RpdmU6ICd0cnVlJyxcbiAgICAsIG51bGwsICdXb3JrLmNhbGxiYWNrJ1xuXG4gIGNhbGxiYWNrOiAoZGF0YSkgLT5cblxuICAgIFdvcmsuZW50cmllcyA9IGRhdGEuZGF0YVxuXG4gICAgZm9yIGVudHJ5LCBpbmRleCBpbiBXb3JrLmVudHJpZXMgICAgIFxuXG4gICAgICBpbWFnZSA9IGVudHJ5LmVudGl0aWVzLmltYWdlLnZhbHVlXG4gICAgICB0aHVtYm5haWwgPSBlbnRyeS5lbnRpdGllcy5pbWFnZS50aHVtYm5haWxzWzIwXVxuXG4gICAgICBpbWFnZV9tb2JpbGUgPSBlbnRyeS5lbnRpdGllcy5pbWFnZV9tb2JpbGUudmFsdWVcbiAgICAgIHRodW1ibmFpbF9tb2JpbGUgPSBlbnRyeS5lbnRpdGllcy5pbWFnZV9tb2JpbGUudGh1bWJuYWlsc1syMF1cblxuICAgICAgbmFtZSA9IGVudHJ5Lm5hbWVcbiAgICAgIGRlc2NyaXB0aW9uID0gZW50cnkuZW50aXRpZXMuZGVzY3JpcHRpb24udmFsdWVcblxuICAgICAgZ2lnX2Rlc2t0b3AgPSAkICc8ZGl2IC8+JywgXG4gICAgICAgIGNsYXNzOiBcImdpZyBvZmYgZ2lnXyN7aW5kZXh9XCJcbiAgICAgICAgc3R5bGU6IFwiYmFja2dyb3VuZC1pbWFnZTogdXJsKCN7dGh1bWJuYWlsfSlcIlxuXG4gICAgICBnaWdfZGVza3RvcC5hcHBlbmQgICQgJzxkaXYgLz4nLFxuICAgICAgICBjbGFzczogJ2ltYWdlIG9mZidcbiAgICAgICAgc3R5bGU6IFwiYmFja2dyb3VuZC1pbWFnZTogdXJsKCN7aW1hZ2V9KVwiXG5cbiAgICAgIGdpZ19tb2JpbGUgPSAkICc8ZGl2IC8+JywgXG4gICAgICAgIGNsYXNzOiBcImdpZyBvZmYgZ2lnXyN7aW5kZXh9XCJcbiAgICAgICAgc3R5bGU6IFwiYmFja2dyb3VuZC1pbWFnZTogdXJsKCN7dGh1bWJuYWlsX21vYmlsZX0pXCJcblxuICAgICAgZ2lnX21vYmlsZS5hcHBlbmQgICQgJzxkaXYgLz4nLFxuICAgICAgICBjbGFzczogJ2ltYWdlIG9mZidcbiAgICAgICAgc3R5bGU6IFwiYmFja2dyb3VuZC1pbWFnZTogdXJsKCN7aW1hZ2VfbW9iaWxlfSlcIlxuXG4gICAgICBkb3QgPSAkICc8ZGl2PjwvZGl2PicsIFxuICAgICAgICBjbGFzczogXCJkb3Qgb2ZmIGRvdF8je2luZGV4fVwiXG4gICAgICAgICdkYXRhLW51bSc6IGluZGV4XG5cbiAgICAgIGRvdC5hcHBlbmQgJCAnPGRpdiAvPicsIGNsYXNzOiAnaW5uZXInXG5cbiAgICAgIGNvcHkgPSAkICc8YSAvPicsIFxuICAgICAgICBjbGFzczogXCJjb3B5IG9mZiBjb3B5XyN7aW5kZXh9XCJcblxuICAgICAgY29weS5hcHBlbmQgJCAnPGRpdiAvPicsXG4gICAgICAgIGNsYXNzOiAnY3RpdGxlJ1xuICAgICAgICBodG1sOiBuYW1lXG5cbiAgICAgIGlmIGVudHJ5LmVudGl0aWVzLmxpbmsudmFsdWVcbiAgICAgICAgY29weS5hcHBlbmQgJCgnLmNvcHlsaW5rX3RlbXBsYXRlJykuY2hpbGRyZW4oKS5jbG9uZSgpXG4gICAgICAgIGNvcHkuYWRkQ2xhc3MgJ2xpbmtlZCdcbiAgICAgICAgY29weS5hdHRyICdocmVmJywgZW50cnkuZW50aXRpZXMubGluay52YWx1ZVxuICAgICAgICBjb3B5LmF0dHIgJ3RhcmdldCcsICdfbmV3J1xuXG4gICAgICBjb3B5LmFwcGVuZCAkICc8ZGl2IC8+JyxcbiAgICAgICAgY2xhc3M6ICdjZGVzY3JpcHRpb24nXG4gICAgICAgIGh0bWw6IGRlc2NyaXB0aW9uXG5cbiAgICAgIGlmIGluZGV4IGlzIDBcbiAgICAgICAgXy5vbiBnaWdfZGVza3RvcFxuICAgICAgICBfLm9uIGdpZ19tb2JpbGVcbiAgICAgICAgXy5vbiBkb3RcbiAgICAgICAgXy5vbiBjb3B5XG5cbiAgICAgICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZ2lncy5naWdzX2Rlc2t0b3AnKS5hcHBlbmQgZ2lnX2Rlc2t0b3BcbiAgICAgICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZ2lncy5naWdzX21vYmlsZScpLmFwcGVuZCBnaWdfbW9iaWxlXG4gICAgICAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmRvdHMnKS5hcHBlbmQgZG90XG4gICAgICAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmNvcHlzJykuYXBwZW5kIGNvcHlcblxuICAgICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZ2lncyA+IC5naWcgPiAuaW1hZ2Uub2ZmJykuZWFjaCAoaSwgZWwpIC0+XG4gICAgICBzcmMgPSAkKGVsKS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKS5yZXBsYWNlKC91cmxcXChcIj8oLio/KVwiP1xcKS8sIFwiJDFcIilcbiAgICAgIGltYWdlID0gbmV3IEltYWdlKClcbiAgICAgIGltYWdlLnNyYyA9IHNyY1xuICAgICAgaW1hZ2Uub25sb2FkID0gLT5cbiAgICAgICAgXy5vbiBlbFxuXG4gIGk6IC0+XG4gICAgQGFjdGl2ZSA9IHRydWVcbiAgICBAaGFuZGxlcnMuaSgpXG5cbiAgZDogLT5cbiAgICBAYWN0aXZlID0gZmFsc2VcbiAgICBAaGFuZGxlcnMuZCgpXG5cbiAgaGFuZGxlcnM6IFxuXG4gICAgaTogLT5cbiAgICAgICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXInKS5vbiAnY2xpY2snLCAnLmRvdHMgPiAuZG90JywgQGRvdFxuICAgIGQ6IC0+XG4gICAgICAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyJykub2ZmICdjbGljaycsICcuZG90cyA+IC5kb3QnLCBAZG90XG5cbiAgICBkb3Q6IC0+XG4gICAgICBwcmV2aW91cyA9ICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZG90cyA+IC5kb3Qub24nKS5kYXRhICdudW0nXG4gICAgICBjdXJyZW50ID0gJCh0aGlzKS5kYXRhICdudW0nXG5cbiAgICAgIGlmIHByZXZpb3VzIDwgY3VycmVudFxuICAgICAgICBXb3JrLnNsaWRlIHByZXZpb3VzLCBjdXJyZW50LCAndXAnXG4gICAgICBlbHNlXG4gICAgICAgIFdvcmsuc2xpZGUgcHJldmlvdXMsIGN1cnJlbnQsICdkb3duJ1xuXG4gIG5hdmlnYXRlOiAoZGlyZWN0aW9uKSAtPlxuXG4gICAgcmV0dXJuIHRydWUgaWYgV29yay5wYXVzZWQgaXMgdHJ1ZVxuXG4gICAgcHJldmlvdXMgPSAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmRvdHMgPiAuZG90Lm9uJykuZGF0YSAnbnVtJ1xuXG4gICAgaWYgZGlyZWN0aW9uIGlzICd1cCdcbiAgICAgIGN1cnJlbnQgPSBwcmV2aW91cysxXG4gICAgZWxzZVxuICAgICAgY3VycmVudCA9IHByZXZpb3VzLTFcblxuICAgIGN1cnJlbnQgPSBXb3JrLmVudHJpZXMubGVuZ3RoLTEgaWYgY3VycmVudCA8IDBcblxuICAgIGN1cnJlbnQgPSAwIGlmIGN1cnJlbnQgaXMgV29yay5lbnRyaWVzLmxlbmd0aFxuXG4gICAgQHNsaWRlIHByZXZpb3VzLCBjdXJyZW50LCBkaXJlY3Rpb25cblxuICAgIFdvcmsucGF1c2VkID0gdHJ1ZVxuICAgIHNldFRpbWVvdXQgLT5cbiAgICAgIFdvcmsucGF1c2VkID0gZmFsc2VcbiAgICAsV29yay50aW1lb3V0XG5cbiAgc2xpZGU6IChmcm9tLCB0bywgZGlyZWN0aW9uKSAtPlxuXG4gICAgaWYgZGlyZWN0aW9uIGlzICd1cCdcbiAgICAgICQoXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnLmdpZ18je2Zyb219XCIpLmFkZENsYXNzKCd1cCcpLnJlbW92ZUNsYXNzKCdkb3duJylcbiAgICAgICQoXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnLmdpZ18je3RvfVwiKS5hZGRDbGFzcygndXAnKS5yZW1vdmVDbGFzcygnZG93bicpXG4gICAgZWxzZSBcbiAgICAgICQoXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnLmdpZ18je2Zyb219XCIpLmFkZENsYXNzKCdkb3duJykucmVtb3ZlQ2xhc3MoJ3VwJylcbiAgICAgICQoXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnLmdpZ18je3RvfVwiKS5hZGRDbGFzcygnZG93bicpLnJlbW92ZUNsYXNzKCd1cCcpXG5cbiAgICBfLm9mZiBcIi5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZG90cyA+IC5kb3QuZG90XyN7ZnJvbX1cIlxuICAgIF8ub2ZmIFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5naWdzID4gLmdpZy5naWdfI3tmcm9tfVwiLCBvZmZpbmc6IHRydWUsIG9mZnRpbWU6IDAuNVxuICAgIF8ub2ZmIFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5jb3B5cyA+IC5jb3B5LmNvcHlfI3tmcm9tfVwiXG5cbiAgICBfLm9uIFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5kb3RzID4gLmRvdF8je3RvfVwiXG4gICAgXy5vbiBcIi5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZ2lncyA+IC5naWdfI3t0b31cIlxuICAgIF8ub24gXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmNvcHlzID4gLmNvcHkuY29weV8je3RvfVwiXG5cbiJdfQ==
