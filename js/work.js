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

//# sourceMappingURL=data:application/json;base64,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O0VBbEJRLENBMUdWO0VBZ0lBLEtBQUEsRUFBTyxTQUFDLElBQUQsRUFBTyxFQUFQLEVBQVcsU0FBWDtJQUVMLElBQUcsU0FBQSxLQUFhLElBQWhCO01BQ0UsQ0FBQSxDQUFFLDRDQUFBLEdBQTZDLElBQS9DLENBQXNELENBQUMsUUFBdkQsQ0FBZ0UsSUFBaEUsQ0FBcUUsQ0FBQyxXQUF0RSxDQUFrRixNQUFsRjtNQUNBLENBQUEsQ0FBRSw0Q0FBQSxHQUE2QyxFQUEvQyxDQUFvRCxDQUFDLFFBQXJELENBQThELElBQTlELENBQW1FLENBQUMsV0FBcEUsQ0FBZ0YsTUFBaEYsRUFGRjtLQUFBLE1BQUE7TUFJRSxDQUFBLENBQUUsNENBQUEsR0FBNkMsSUFBL0MsQ0FBc0QsQ0FBQyxRQUF2RCxDQUFnRSxNQUFoRSxDQUF1RSxDQUFDLFdBQXhFLENBQW9GLElBQXBGO01BQ0EsQ0FBQSxDQUFFLDRDQUFBLEdBQTZDLEVBQS9DLENBQW9ELENBQUMsUUFBckQsQ0FBOEQsTUFBOUQsQ0FBcUUsQ0FBQyxXQUF0RSxDQUFrRixJQUFsRixFQUxGOztJQU9BLENBQUMsQ0FBQyxHQUFGLENBQU0sNENBQUEsR0FBNkMsSUFBbkQ7SUFDQSxDQUFDLENBQUMsR0FBRixDQUFNLDRDQUFBLEdBQTZDLElBQW5ELEVBQTJEO01BQUEsTUFBQSxFQUFRLElBQVI7TUFBYyxPQUFBLEVBQVMsR0FBdkI7S0FBM0Q7SUFDQSxDQUFDLENBQUMsR0FBRixDQUFNLCtDQUFBLEdBQWdELElBQXREO0lBRUEsQ0FBQyxDQUFDLEVBQUYsQ0FBSyx3Q0FBQSxHQUF5QyxFQUE5QztJQUNBLENBQUMsQ0FBQyxFQUFGLENBQUssd0NBQUEsR0FBeUMsRUFBOUM7V0FDQSxDQUFDLENBQUMsRUFBRixDQUFLLCtDQUFBLEdBQWdELEVBQXJEO0VBZkssQ0FoSVAiLCJmaWxlIjoid29yay5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIldvcmsgPSBcblxuICBwb3B1bGF0ZWQ6IGZhbHNlXG5cbiAgcGF1c2VkOiBmYWxzZVxuICB0aW1lb3V0OiAxMDAwXG5cbiAgYWN0aXZlOiBmYWxzZVxuXG4gIHBvcHVsYXRlOiAgKGNvbXBsZXRlKSAtPlxuXG4gICAgQmFzYWwuanNvbnAgJ2VudHJpZXMnLCBcbiAgICAgIHN0cnVjdHVyZTogJzU5MGJhNmJlNWFhNTliMDFiMDJlMmVjNCdcbiAgICAgIHNvcnQ6ICdvcmRlcicsXG4gICAgICBhc2M6ICd0cnVlJyxcbiAgICAgIGFjdGl2ZTogJ3RydWUnLFxuICAgICwgbnVsbCwgJ1dvcmsuY2FsbGJhY2snXG5cbiAgY2FsbGJhY2s6IChkYXRhKSAtPlxuXG4gICAgV29yay5lbnRyaWVzID0gZGF0YS5kYXRhXG5cbiAgICBmb3IgZW50cnksIGluZGV4IGluIFdvcmsuZW50cmllcyAgICAgXG5cbiAgICAgIGltYWdlID0gZW50cnkuZW50aXRpZXMuaW1hZ2UudmFsdWVcbiAgICAgIHRodW1ibmFpbCA9IGVudHJ5LmVudGl0aWVzLmltYWdlLnRodW1ibmFpbHNbMjBdXG5cbiAgICAgIGltYWdlX21vYmlsZSA9IGVudHJ5LmVudGl0aWVzLmltYWdlX21vYmlsZS52YWx1ZVxuICAgICAgdGh1bWJuYWlsX21vYmlsZSA9IGVudHJ5LmVudGl0aWVzLmltYWdlX21vYmlsZS50aHVtYm5haWxzWzIwXVxuXG4gICAgICBuYW1lID0gZW50cnkubmFtZVxuICAgICAgZGVzY3JpcHRpb24gPSBlbnRyeS5lbnRpdGllcy5kZXNjcmlwdGlvbi52YWx1ZVxuXG4gICAgICBnaWdfZGVza3RvcCA9ICQgJzxkaXYgLz4nLCBcbiAgICAgICAgY2xhc3M6IFwiZ2lnIG9mZiBnaWdfI3tpbmRleH1cIlxuICAgICAgICBzdHlsZTogXCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoI3t0aHVtYm5haWx9KVwiXG5cbiAgICAgIGdpZ19kZXNrdG9wLmFwcGVuZCAgJCAnPGRpdiAvPicsXG4gICAgICAgIGNsYXNzOiAnaW1hZ2Ugb2ZmJ1xuICAgICAgICBzdHlsZTogXCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoI3tpbWFnZX0pXCJcblxuICAgICAgZ2lnX21vYmlsZSA9ICQgJzxkaXYgLz4nLCBcbiAgICAgICAgY2xhc3M6IFwiZ2lnIG9mZiBnaWdfI3tpbmRleH1cIlxuICAgICAgICBzdHlsZTogXCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoI3t0aHVtYm5haWxfbW9iaWxlfSlcIlxuXG4gICAgICBnaWdfbW9iaWxlLmFwcGVuZCAgJCAnPGRpdiAvPicsXG4gICAgICAgIGNsYXNzOiAnaW1hZ2Ugb2ZmJ1xuICAgICAgICBzdHlsZTogXCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoI3tpbWFnZV9tb2JpbGV9KVwiXG5cbiAgICAgIGRvdCA9ICQgJzxkaXY+PC9kaXY+JywgXG4gICAgICAgIGNsYXNzOiBcImRvdCBvZmYgZG90XyN7aW5kZXh9XCJcbiAgICAgICAgJ2RhdGEtbnVtJzogaW5kZXhcblxuICAgICAgZG90LmFwcGVuZCAkICc8ZGl2IC8+JywgY2xhc3M6ICdpbm5lcidcblxuICAgICAgY29weSA9ICQgJzxkaXYgLz4nLCBcbiAgICAgICAgY2xhc3M6IFwiY29weSBvZmYgY29weV8je2luZGV4fVwiXG5cbiAgICAgIGNvcHkuYXBwZW5kICQgJzxkaXYgLz4nLFxuICAgICAgICBjbGFzczogJ2N0aXRsZSdcbiAgICAgICAgaHRtbDogbmFtZVxuXG4gICAgICBjb3B5LmFwcGVuZCAkICc8ZGl2IC8+JyxcbiAgICAgICAgY2xhc3M6ICdjZGVzY3JpcHRpb24nXG4gICAgICAgIGh0bWw6IGRlc2NyaXB0aW9uXG5cbiAgICAgIGlmIGluZGV4IGlzIDBcbiAgICAgICAgXy5vbiBnaWdfZGVza3RvcFxuICAgICAgICBfLm9uIGdpZ19tb2JpbGVcbiAgICAgICAgXy5vbiBkb3RcbiAgICAgICAgXy5vbiBjb3B5XG5cbiAgICAgICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZ2lncy5naWdzX2Rlc2t0b3AnKS5hcHBlbmQgZ2lnX2Rlc2t0b3BcbiAgICAgICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZ2lncy5naWdzX21vYmlsZScpLmFwcGVuZCBnaWdfbW9iaWxlXG4gICAgICAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmRvdHMnKS5hcHBlbmQgZG90XG4gICAgICAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmNvcHlzJykuYXBwZW5kIGNvcHlcblxuICAgICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZ2lncyA+IC5naWcgPiAuaW1hZ2Uub2ZmJykuZWFjaCAoaSwgZWwpIC0+XG4gICAgICBzcmMgPSAkKGVsKS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKS5yZXBsYWNlKC91cmxcXChcIj8oLio/KVwiP1xcKS8sIFwiJDFcIilcbiAgICAgIGltYWdlID0gbmV3IEltYWdlKClcbiAgICAgIGltYWdlLnNyYyA9IHNyY1xuICAgICAgaW1hZ2Uub25sb2FkID0gLT5cbiAgICAgICAgXy5vbiBlbFxuXG4gIGk6IC0+XG4gICAgQGFjdGl2ZSA9IHRydWVcbiAgICBAaGFuZGxlcnMuaSgpXG5cbiAgZDogLT5cbiAgICBAYWN0aXZlID0gZmFsc2VcbiAgICBAaGFuZGxlcnMuZCgpXG5cbiAgaGFuZGxlcnM6IFxuXG4gICAgaTogLT5cbiAgICAgICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXInKS5vbiAnY2xpY2snLCAnLmRvdHMgPiAuZG90JywgQGRvdFxuICAgIGQ6IC0+XG4gICAgICAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyJykub2ZmICdjbGljaycsICcuZG90cyA+IC5kb3QnLCBAZG90XG5cbiAgICBkb3Q6IC0+XG4gICAgICBwcmV2aW91cyA9ICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZG90cyA+IC5kb3Qub24nKS5kYXRhICdudW0nXG4gICAgICBjdXJyZW50ID0gJCh0aGlzKS5kYXRhICdudW0nXG5cbiAgICAgIGlmIHByZXZpb3VzIDwgY3VycmVudFxuICAgICAgICBXb3JrLnNsaWRlIHByZXZpb3VzLCBjdXJyZW50LCAnZG93bidcbiAgICAgIGVsc2VcbiAgICAgICAgV29yay5zbGlkZSBwcmV2aW91cywgY3VycmVudCwgJ3VwJ1xuXG4gIG5hdmlnYXRlOiAoZGlyZWN0aW9uKSAtPlxuXG4gICAgcmV0dXJuIHRydWUgaWYgV29yay5wYXVzZWQgaXMgdHJ1ZVxuXG4gICAgcHJldmlvdXMgPSAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmRvdHMgPiAuZG90Lm9uJykuZGF0YSAnbnVtJ1xuXG4gICAgaWYgZGlyZWN0aW9uIGlzICd1cCdcbiAgICAgIGN1cnJlbnQgPSBwcmV2aW91cysxXG4gICAgZWxzZVxuICAgICAgY3VycmVudCA9IHByZXZpb3VzLTFcblxuICAgIGN1cnJlbnQgPSBXb3JrLmVudHJpZXMubGVuZ3RoLTEgaWYgY3VycmVudCA8IDBcblxuICAgIGN1cnJlbnQgPSAwIGlmIGN1cnJlbnQgaXMgV29yay5lbnRyaWVzLmxlbmd0aFxuXG4gICAgQHNsaWRlIHByZXZpb3VzLCBjdXJyZW50LCBkaXJlY3Rpb25cblxuICAgIFdvcmsucGF1c2VkID0gdHJ1ZVxuICAgIHNldFRpbWVvdXQgLT5cbiAgICAgIFdvcmsucGF1c2VkID0gZmFsc2VcbiAgICAsV29yay50aW1lb3V0XG5cbiAgc2xpZGU6IChmcm9tLCB0bywgZGlyZWN0aW9uKSAtPlxuXG4gICAgaWYgZGlyZWN0aW9uIGlzICd1cCdcbiAgICAgICQoXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnLmdpZ18je2Zyb219XCIpLmFkZENsYXNzKCd1cCcpLnJlbW92ZUNsYXNzKCdkb3duJylcbiAgICAgICQoXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnLmdpZ18je3RvfVwiKS5hZGRDbGFzcygndXAnKS5yZW1vdmVDbGFzcygnZG93bicpXG4gICAgZWxzZSBcbiAgICAgICQoXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnLmdpZ18je2Zyb219XCIpLmFkZENsYXNzKCdkb3duJykucmVtb3ZlQ2xhc3MoJ3VwJylcbiAgICAgICQoXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnLmdpZ18je3RvfVwiKS5hZGRDbGFzcygnZG93bicpLnJlbW92ZUNsYXNzKCd1cCcpXG5cbiAgICBfLm9mZiBcIi5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZG90cyA+IC5kb3QuZG90XyN7ZnJvbX1cIlxuICAgIF8ub2ZmIFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5naWdzID4gLmdpZy5naWdfI3tmcm9tfVwiLCBvZmZpbmc6IHRydWUsIG9mZnRpbWU6IDAuNVxuICAgIF8ub2ZmIFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5jb3B5cyA+IC5jb3B5LmNvcHlfI3tmcm9tfVwiXG5cbiAgICBfLm9uIFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5kb3RzID4gLmRvdF8je3RvfVwiXG4gICAgXy5vbiBcIi5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZ2lncyA+IC5naWdfI3t0b31cIlxuICAgIF8ub24gXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmNvcHlzID4gLmNvcHkuY29weV8je3RvfVwiXG5cbiJdfQ==
