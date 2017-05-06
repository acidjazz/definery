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
    var copy, description, dot, entries, entry, gig, image, index, j, k, len, len1, name, ref, structure, thumbnail;
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
      name = entry.name;
      description = entry.entities.description.value;
      gig = $('<div />', {
        "class": "gig off down gig_" + index,
        style: "background-image: url(" + thumbnail + ")"
      });
      gig.append($('<div />', {
        "class": 'image off',
        style: "background-image: url(" + image + ")"
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

//# sourceMappingURL=data:application/json;base64,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Z0UsTUFBaEUsQ0FBdUUsQ0FBQyxXQUF4RSxDQUFvRixJQUFwRjtNQUNBLENBQUEsQ0FBRSw0Q0FBQSxHQUE2QyxFQUEvQyxDQUFvRCxDQUFDLFFBQXJELENBQThELE1BQTlELENBQXFFLENBQUMsV0FBdEUsQ0FBa0YsSUFBbEYsRUFMRjs7SUFPQSxDQUFDLENBQUMsR0FBRixDQUFNLDRDQUFBLEdBQTZDLElBQW5EO0lBQ0EsQ0FBQyxDQUFDLEdBQUYsQ0FBTSw0Q0FBQSxHQUE2QyxJQUFuRCxFQUEyRDtNQUFBLE1BQUEsRUFBUSxJQUFSO01BQWMsT0FBQSxFQUFTLEdBQXZCO0tBQTNEO0lBQ0EsQ0FBQyxDQUFDLEdBQUYsQ0FBTSwrQ0FBQSxHQUFnRCxJQUF0RDtJQUVBLENBQUMsQ0FBQyxFQUFGLENBQUssd0NBQUEsR0FBeUMsRUFBOUM7SUFDQSxDQUFDLENBQUMsRUFBRixDQUFLLHdDQUFBLEdBQXlDLEVBQTlDO1dBQ0EsQ0FBQyxDQUFDLEVBQUYsQ0FBSywrQ0FBQSxHQUFnRCxFQUFyRDtFQWZLLENBMUhQIiwiZmlsZSI6IndvcmsuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJXb3JrID0gXG5cbiAgcG9wdWxhdGVkOiBmYWxzZVxuXG4gIHBhdXNlZDogZmFsc2VcbiAgdGltZW91dDogMTAwMFxuXG4gIGFjdGl2ZTogZmFsc2VcblxuICBnaWdzOiBbXG4gICAgJ2xpa3dpZC5qcGcnLFxuICAgICdsaXZlbHlfY2FyZC5qcGcnLFxuICAgICdsd19sYWJzLmpwZycsXG4gICAgJ3BlcnJpY29uZV9ibG9nLmpwZycsXG4gICAgJ2xpdmVseV9icmFuZGluZy5qcGcnLFxuICAgICdsaXZlbHlfcHJvZHVjdC5qcGcnLFxuICAgICdsd19zaXRlLmpwZycsXG4gIF1cblxuICBwb3B1bGF0ZTogIChjb21wbGV0ZSkgLT5cblxuICAgIEJhc2FsLmpzb25wICdzdHJ1Y3R1cmVzJywgY2xpZW50OiAnNTkwYTYxZjQ1YWE1OWIwMWIwMmUyZWMyJywgbnVsbCwgJ1dvcmsuY2FsbGJhY2snXG5cbiAgY2FsbGJhY2s6IChkYXRhKSAtPlxuXG4gICAgZm9yIHN0cnVjdHVyZSBpbiBkYXRhLmRhdGFcbiAgICAgIGlmIHN0cnVjdHVyZS5uYW1lIGlzICd3b3JrJ1xuICAgICAgICBlbnRyaWVzID0gc3RydWN0dXJlLmVudHJpZXNcblxuICAgIGZvciBlbnRyeSwgaW5kZXggaW4gZW50cmllc1xuXG4gICAgICBpbWFnZSA9IGVudHJ5LmVudGl0aWVzLmltYWdlLnZhbHVlXG4gICAgICB0aHVtYm5haWwgPSBlbnRyeS5lbnRpdGllcy5pbWFnZS50aHVtYm5haWxzWzIwXVxuICAgICAgbmFtZSA9IGVudHJ5Lm5hbWVcbiAgICAgIGRlc2NyaXB0aW9uID0gZW50cnkuZW50aXRpZXMuZGVzY3JpcHRpb24udmFsdWVcblxuXG4gICAgICBnaWcgPSAkICc8ZGl2IC8+JywgXG4gICAgICAgIGNsYXNzOiBcImdpZyBvZmYgZG93biBnaWdfI3tpbmRleH1cIlxuICAgICAgICBzdHlsZTogXCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoI3t0aHVtYm5haWx9KVwiXG5cbiAgICAgIGdpZy5hcHBlbmQgICQgJzxkaXYgLz4nLFxuICAgICAgICBjbGFzczogJ2ltYWdlIG9mZidcbiAgICAgICAgc3R5bGU6IFwiYmFja2dyb3VuZC1pbWFnZTogdXJsKCN7aW1hZ2V9KVwiXG5cbiAgICAgIGRvdCA9ICQgJzxkaXY+PC9kaXY+JywgXG4gICAgICAgIGNsYXNzOiBcImRvdCBvZmYgZG90XyN7aW5kZXh9XCJcbiAgICAgICAgJ2RhdGEtbnVtJzogaW5kZXhcblxuICAgICAgZG90LmFwcGVuZCAkICc8ZGl2IC8+JywgY2xhc3M6ICdpbm5lcidcblxuICAgICAgY29weSA9ICQgJzxkaXYgLz4nLCBcbiAgICAgICAgY2xhc3M6IFwiY29weSBvZmYgY29weV8je2luZGV4fVwiXG5cbiAgICAgIGNvcHkuYXBwZW5kICQgJzxkaXYgLz4nLFxuICAgICAgICBjbGFzczogJ2N0aXRsZSdcbiAgICAgICAgaHRtbDogbmFtZVxuXG4gICAgICBjb3B5LmFwcGVuZCAkICc8ZGl2IC8+JyxcbiAgICAgICAgY2xhc3M6ICdjZGVzY3JpcHRpb24nXG4gICAgICAgIGh0bWw6IGRlc2NyaXB0aW9uXG5cbiAgICAgIGlmIGluZGV4IGlzIDBcbiAgICAgICAgXy5vbiBnaWdcbiAgICAgICAgXy5vbiBkb3RcbiAgICAgICAgXy5vbiBjb3B5XG5cbiAgICAgICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZ2lncycpLmFwcGVuZCBnaWdcbiAgICAgICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZG90cycpLmFwcGVuZCBkb3RcbiAgICAgICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuY29weXMnKS5hcHBlbmQgY29weVxuXG4gICAgJCgnLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5naWdzID4gLmdpZyA+IC5pbWFnZS5vZmYnKS5lYWNoIChpLCBlbCkgLT5cbiAgICAgIHNyYyA9ICQoZWwpLmNzcygnYmFja2dyb3VuZC1pbWFnZScpLnJlcGxhY2UoL3VybFxcKFwiPyguKj8pXCI/XFwpLywgXCIkMVwiKVxuICAgICAgaW1hZ2UgPSBuZXcgSW1hZ2UoKVxuICAgICAgaW1hZ2Uuc3JjID0gc3JjXG4gICAgICBpbWFnZS5vbmxvYWQgPSAtPlxuICAgICAgICBfLm9uIGVsXG5cbiAgaTogLT5cbiAgICBAYWN0aXZlID0gdHJ1ZVxuICAgIEBoYW5kbGVycy5pKClcblxuICBkOiAtPlxuICAgIEBhY3RpdmUgPSBmYWxzZVxuICAgIEBoYW5kbGVycy5kKClcblxuICBoYW5kbGVyczogXG5cbiAgICBpOiAtPlxuICAgICAgJCgnLnNlY3Rpb24ud29yayA+IC5pbm5lcicpLm9uICdjbGljaycsICcuZG90cyA+IC5kb3QnLCBAZG90XG4gICAgZDogLT5cbiAgICAgICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXInKS5vZmYgJ2NsaWNrJywgJy5kb3RzID4gLmRvdCcsIEBkb3RcblxuICAgIGRvdDogLT5cbiAgICAgIHByZXZpb3VzID0gJCgnLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5kb3RzID4gLmRvdC5vbicpLmRhdGEgJ251bSdcbiAgICAgIGN1cnJlbnQgPSAkKHRoaXMpLmRhdGEgJ251bSdcblxuICAgICAgaWYgcHJldmlvdXMgPCBjdXJyZW50XG4gICAgICAgIFdvcmsuc2xpZGUgcHJldmlvdXMsIGN1cnJlbnQsICdkb3duJ1xuICAgICAgZWxzZVxuICAgICAgICBXb3JrLnNsaWRlIHByZXZpb3VzLCBjdXJyZW50LCAndXAnXG5cbiAgbmF2aWdhdGU6IChkaXJlY3Rpb24pIC0+XG5cbiAgICByZXR1cm4gdHJ1ZSBpZiBXb3JrLnBhdXNlZCBpcyB0cnVlXG5cbiAgICBwcmV2aW91cyA9ICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZG90cyA+IC5kb3Qub24nKS5kYXRhICdudW0nXG5cbiAgICBpZiBkaXJlY3Rpb24gaXMgJ3VwJ1xuICAgICAgY3VycmVudCA9IHByZXZpb3VzKzFcbiAgICBlbHNlXG4gICAgICBjdXJyZW50ID0gcHJldmlvdXMtMVxuXG4gICAgY3VycmVudCA9IFdvcmsuZ2lncy5sZW5ndGgtMWlmIGN1cnJlbnQgPCAwXG5cbiAgICBjdXJyZW50ID0gMCBpZiBjdXJyZW50IGlzIFdvcmsuZ2lncy5sZW5ndGhcblxuICAgIEBzbGlkZSBwcmV2aW91cywgY3VycmVudCwgZGlyZWN0aW9uXG5cbiAgICBXb3JrLnBhdXNlZCA9IHRydWVcbiAgICBzZXRUaW1lb3V0IC0+XG4gICAgICBXb3JrLnBhdXNlZCA9IGZhbHNlXG4gICAgLFdvcmsudGltZW91dFxuXG4gIHNsaWRlOiAoZnJvbSwgdG8sIGRpcmVjdGlvbikgLT5cblxuICAgIGlmIGRpcmVjdGlvbiBpcyAndXAnXG4gICAgICAkKFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5naWdzID4gLmdpZy5naWdfI3tmcm9tfVwiKS5hZGRDbGFzcygndXAnKS5yZW1vdmVDbGFzcygnZG93bicpXG4gICAgICAkKFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5naWdzID4gLmdpZy5naWdfI3t0b31cIikuYWRkQ2xhc3MoJ3VwJykucmVtb3ZlQ2xhc3MoJ2Rvd24nKVxuICAgIGVsc2UgXG4gICAgICAkKFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5naWdzID4gLmdpZy5naWdfI3tmcm9tfVwiKS5hZGRDbGFzcygnZG93bicpLnJlbW92ZUNsYXNzKCd1cCcpXG4gICAgICAkKFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5naWdzID4gLmdpZy5naWdfI3t0b31cIikuYWRkQ2xhc3MoJ2Rvd24nKS5yZW1vdmVDbGFzcygndXAnKVxuXG4gICAgXy5vZmYgXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmRvdHMgPiAuZG90LmRvdF8je2Zyb219XCJcbiAgICBfLm9mZiBcIi5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZ2lncyA+IC5naWcuZ2lnXyN7ZnJvbX1cIiwgb2ZmaW5nOiB0cnVlLCBvZmZ0aW1lOiAwLjVcbiAgICBfLm9mZiBcIi5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuY29weXMgPiAuY29weS5jb3B5XyN7ZnJvbX1cIlxuXG4gICAgXy5vbiBcIi5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZG90cyA+IC5kb3RfI3t0b31cIlxuICAgIF8ub24gXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnXyN7dG99XCJcbiAgICBfLm9uIFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5jb3B5cyA+IC5jb3B5LmNvcHlfI3t0b31cIlxuXG4iXX0=
