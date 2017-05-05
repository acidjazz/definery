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
      thumbnail = entry.entities.thumbnail.value;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmsuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsSUFBQSxHQUVFO0VBQUEsU0FBQSxFQUFXLEtBQVg7RUFFQSxNQUFBLEVBQVEsS0FGUjtFQUdBLE9BQUEsRUFBUyxJQUhUO0VBS0EsTUFBQSxFQUFRLEtBTFI7RUFPQSxJQUFBLEVBQU0sQ0FDSixZQURJLEVBRUosaUJBRkksRUFHSixhQUhJLEVBSUosb0JBSkksRUFLSixxQkFMSSxFQU1KLG9CQU5JLEVBT0osYUFQSSxDQVBOO0VBaUJBLFFBQUEsRUFBVyxTQUFDLFFBQUQ7V0FFVCxLQUFLLENBQUMsS0FBTixDQUFZLFlBQVosRUFBMEI7TUFBQSxNQUFBLEVBQVEsMEJBQVI7S0FBMUIsRUFBOEQsSUFBOUQsRUFBb0UsZUFBcEU7RUFGUyxDQWpCWDtFQXFCQSxRQUFBLEVBQVUsU0FBQyxJQUFEO0FBRVIsUUFBQTtBQUFBO0FBQUEsU0FBQSxxQ0FBQTs7TUFDRSxJQUFHLFNBQVMsQ0FBQyxJQUFWLEtBQWtCLE1BQXJCO1FBQ0UsT0FBQSxHQUFVLFNBQVMsQ0FBQyxRQUR0Qjs7QUFERjtBQUlBLFNBQUEsMkRBQUE7O01BRUUsS0FBQSxHQUFRLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO01BQzdCLFNBQUEsR0FBWSxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztNQUNyQyxJQUFBLEdBQU8sS0FBSyxDQUFDO01BQ2IsV0FBQSxHQUFjLEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO01BR3pDLEdBQUEsR0FBTSxDQUFBLENBQUUsU0FBRixFQUNKO1FBQUEsT0FBQSxFQUFPLG1CQUFBLEdBQW9CLEtBQTNCO1FBQ0EsS0FBQSxFQUFPLHdCQUFBLEdBQXlCLFNBQXpCLEdBQW1DLEdBRDFDO09BREk7TUFJTixHQUFHLENBQUMsTUFBSixDQUFZLENBQUEsQ0FBRSxTQUFGLEVBQ1Y7UUFBQSxPQUFBLEVBQU8sV0FBUDtRQUNBLEtBQUEsRUFBTyx3QkFBQSxHQUF5QixLQUF6QixHQUErQixHQUR0QztPQURVLENBQVo7TUFJQSxHQUFBLEdBQU0sQ0FBQSxDQUFFLGFBQUYsRUFDSjtRQUFBLE9BQUEsRUFBTyxjQUFBLEdBQWUsS0FBdEI7UUFDQSxVQUFBLEVBQVksS0FEWjtPQURJO01BSU4sR0FBRyxDQUFDLE1BQUosQ0FBVyxDQUFBLENBQUUsU0FBRixFQUFhO1FBQUEsT0FBQSxFQUFPLE9BQVA7T0FBYixDQUFYO01BRUEsSUFBQSxHQUFPLENBQUEsQ0FBRSxTQUFGLEVBQ0w7UUFBQSxPQUFBLEVBQU8sZ0JBQUEsR0FBaUIsS0FBeEI7T0FESztNQUdQLElBQUksQ0FBQyxNQUFMLENBQVksQ0FBQSxDQUFFLFNBQUYsRUFDVjtRQUFBLE9BQUEsRUFBTyxRQUFQO1FBQ0EsSUFBQSxFQUFNLElBRE47T0FEVSxDQUFaO01BSUEsSUFBSSxDQUFDLE1BQUwsQ0FBWSxDQUFBLENBQUUsU0FBRixFQUNWO1FBQUEsT0FBQSxFQUFPLGNBQVA7UUFDQSxJQUFBLEVBQU0sV0FETjtPQURVLENBQVo7TUFJQSxJQUFHLEtBQUEsS0FBUyxDQUFaO1FBQ0UsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxHQUFMO1FBQ0EsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxHQUFMO1FBQ0EsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxJQUFMLEVBSEY7O01BS0EsQ0FBQSxDQUFFLGdDQUFGLENBQW1DLENBQUMsTUFBcEMsQ0FBMkMsR0FBM0M7TUFDQSxDQUFBLENBQUUsZ0NBQUYsQ0FBbUMsQ0FBQyxNQUFwQyxDQUEyQyxHQUEzQztNQUNBLENBQUEsQ0FBRSxpQ0FBRixDQUFvQyxDQUFDLE1BQXJDLENBQTRDLElBQTVDO0FBeENGO1dBMENBLENBQUEsQ0FBRSxvREFBRixDQUF1RCxDQUFDLElBQXhELENBQTZELFNBQUMsQ0FBRCxFQUFJLEVBQUo7QUFDM0QsVUFBQTtNQUFBLEdBQUEsR0FBTSxDQUFBLENBQUUsRUFBRixDQUFLLENBQUMsR0FBTixDQUFVLGtCQUFWLENBQTZCLENBQUMsT0FBOUIsQ0FBc0Msa0JBQXRDLEVBQTBELElBQTFEO01BQ04sS0FBQSxHQUFZLElBQUEsS0FBQSxDQUFBO01BQ1osS0FBSyxDQUFDLEdBQU4sR0FBWTthQUNaLEtBQUssQ0FBQyxNQUFOLEdBQWUsU0FBQTtlQUNiLENBQUMsQ0FBQyxFQUFGLENBQUssRUFBTDtNQURhO0lBSjRDLENBQTdEO0VBaERRLENBckJWO0VBNEVBLENBQUEsRUFBRyxTQUFBO0lBQ0QsSUFBQyxDQUFBLE1BQUQsR0FBVTtXQUNWLElBQUMsQ0FBQSxRQUFRLENBQUMsQ0FBVixDQUFBO0VBRkMsQ0E1RUg7RUFnRkEsQ0FBQSxFQUFHLFNBQUE7SUFDRCxJQUFDLENBQUEsTUFBRCxHQUFVO1dBQ1YsSUFBQyxDQUFBLFFBQVEsQ0FBQyxDQUFWLENBQUE7RUFGQyxDQWhGSDtFQW9GQSxRQUFBLEVBRUU7SUFBQSxDQUFBLEVBQUcsU0FBQTthQUNELENBQUEsQ0FBRSx1Q0FBRixDQUEwQyxDQUFDLEVBQTNDLENBQThDLE9BQTlDLEVBQXVELElBQUMsQ0FBQSxHQUF4RDtJQURDLENBQUg7SUFFQSxDQUFBLEVBQUcsU0FBQTthQUNELENBQUEsQ0FBRSx1Q0FBRixDQUEwQyxDQUFDLEdBQTNDLENBQStDLE9BQS9DLEVBQXdELElBQUMsQ0FBQSxHQUF6RDtJQURDLENBRkg7SUFLQSxHQUFBLEVBQUssU0FBQTtBQUNILFVBQUE7TUFBQSxRQUFBLEdBQVcsQ0FBQSxDQUFFLDBDQUFGLENBQTZDLENBQUMsSUFBOUMsQ0FBbUQsS0FBbkQ7TUFDWCxPQUFBLEdBQVUsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLElBQVIsQ0FBYSxLQUFiO01BRVYsSUFBRyxRQUFBLEdBQVcsT0FBZDtlQUNFLElBQUksQ0FBQyxLQUFMLENBQVcsUUFBWCxFQUFxQixPQUFyQixFQUE4QixNQUE5QixFQURGO09BQUEsTUFBQTtlQUdFLElBQUksQ0FBQyxLQUFMLENBQVcsUUFBWCxFQUFxQixPQUFyQixFQUE4QixJQUE5QixFQUhGOztJQUpHLENBTEw7R0F0RkY7RUFvR0EsUUFBQSxFQUFVLFNBQUMsU0FBRDtBQUVSLFFBQUE7SUFBQSxJQUFlLElBQUksQ0FBQyxNQUFMLEtBQWUsSUFBOUI7QUFBQSxhQUFPLEtBQVA7O0lBRUEsUUFBQSxHQUFXLENBQUEsQ0FBRSwwQ0FBRixDQUE2QyxDQUFDLElBQTlDLENBQW1ELEtBQW5EO0lBRVgsSUFBRyxTQUFBLEtBQWEsSUFBaEI7TUFDRSxPQUFBLEdBQVUsUUFBQSxHQUFTLEVBRHJCO0tBQUEsTUFBQTtNQUdFLE9BQUEsR0FBVSxRQUFBLEdBQVMsRUFIckI7O0lBS0EsSUFBK0IsT0FBQSxHQUFVLENBQXpDO01BQUEsT0FBQSxHQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBVixHQUFpQixFQUEzQjs7SUFFQSxJQUFlLE9BQUEsS0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQXBDO01BQUEsT0FBQSxHQUFVLEVBQVY7O0lBRUEsSUFBQyxDQUFBLEtBQUQsQ0FBTyxRQUFQLEVBQWlCLE9BQWpCLEVBQTBCLFNBQTFCO0lBRUEsSUFBSSxDQUFDLE1BQUwsR0FBYztXQUNkLFVBQUEsQ0FBVyxTQUFBO2FBQ1QsSUFBSSxDQUFDLE1BQUwsR0FBYztJQURMLENBQVgsRUFFQyxJQUFJLENBQUMsT0FGTjtFQWxCUSxDQXBHVjtFQTBIQSxLQUFBLEVBQU8sU0FBQyxJQUFELEVBQU8sRUFBUCxFQUFXLFNBQVg7SUFFTCxJQUFHLFNBQUEsS0FBYSxJQUFoQjtNQUNFLENBQUEsQ0FBRSw0Q0FBQSxHQUE2QyxJQUEvQyxDQUFzRCxDQUFDLFFBQXZELENBQWdFLElBQWhFLENBQXFFLENBQUMsV0FBdEUsQ0FBa0YsTUFBbEY7TUFDQSxDQUFBLENBQUUsNENBQUEsR0FBNkMsRUFBL0MsQ0FBb0QsQ0FBQyxRQUFyRCxDQUE4RCxJQUE5RCxDQUFtRSxDQUFDLFdBQXBFLENBQWdGLE1BQWhGLEVBRkY7S0FBQSxNQUFBO01BSUUsQ0FBQSxDQUFFLDRDQUFBLEdBQTZDLElBQS9DLENBQXNELENBQUMsUUFBdkQsQ0FBZ0UsTUFBaEUsQ0FBdUUsQ0FBQyxXQUF4RSxDQUFvRixJQUFwRjtNQUNBLENBQUEsQ0FBRSw0Q0FBQSxHQUE2QyxFQUEvQyxDQUFvRCxDQUFDLFFBQXJELENBQThELE1BQTlELENBQXFFLENBQUMsV0FBdEUsQ0FBa0YsSUFBbEYsRUFMRjs7SUFPQSxDQUFDLENBQUMsR0FBRixDQUFNLDRDQUFBLEdBQTZDLElBQW5EO0lBQ0EsQ0FBQyxDQUFDLEdBQUYsQ0FBTSw0Q0FBQSxHQUE2QyxJQUFuRCxFQUEyRDtNQUFBLE1BQUEsRUFBUSxJQUFSO01BQWMsT0FBQSxFQUFTLEdBQXZCO0tBQTNEO0lBQ0EsQ0FBQyxDQUFDLEdBQUYsQ0FBTSwrQ0FBQSxHQUFnRCxJQUF0RDtJQUVBLENBQUMsQ0FBQyxFQUFGLENBQUssd0NBQUEsR0FBeUMsRUFBOUM7SUFDQSxDQUFDLENBQUMsRUFBRixDQUFLLHdDQUFBLEdBQXlDLEVBQTlDO1dBQ0EsQ0FBQyxDQUFDLEVBQUYsQ0FBSywrQ0FBQSxHQUFnRCxFQUFyRDtFQWZLLENBMUhQIiwiZmlsZSI6IndvcmsuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJXb3JrID0gXG5cbiAgcG9wdWxhdGVkOiBmYWxzZVxuXG4gIHBhdXNlZDogZmFsc2VcbiAgdGltZW91dDogMTAwMFxuXG4gIGFjdGl2ZTogZmFsc2VcblxuICBnaWdzOiBbXG4gICAgJ2xpa3dpZC5qcGcnLFxuICAgICdsaXZlbHlfY2FyZC5qcGcnLFxuICAgICdsd19sYWJzLmpwZycsXG4gICAgJ3BlcnJpY29uZV9ibG9nLmpwZycsXG4gICAgJ2xpdmVseV9icmFuZGluZy5qcGcnLFxuICAgICdsaXZlbHlfcHJvZHVjdC5qcGcnLFxuICAgICdsd19zaXRlLmpwZycsXG4gIF1cblxuICBwb3B1bGF0ZTogIChjb21wbGV0ZSkgLT5cblxuICAgIEJhc2FsLmpzb25wICdzdHJ1Y3R1cmVzJywgY2xpZW50OiAnNTkwYTYxZjQ1YWE1OWIwMWIwMmUyZWMyJywgbnVsbCwgJ1dvcmsuY2FsbGJhY2snXG5cbiAgY2FsbGJhY2s6IChkYXRhKSAtPlxuXG4gICAgZm9yIHN0cnVjdHVyZSBpbiBkYXRhLmRhdGFcbiAgICAgIGlmIHN0cnVjdHVyZS5uYW1lIGlzICd3b3JrJ1xuICAgICAgICBlbnRyaWVzID0gc3RydWN0dXJlLmVudHJpZXNcblxuICAgIGZvciBlbnRyeSwgaW5kZXggaW4gZW50cmllc1xuXG4gICAgICBpbWFnZSA9IGVudHJ5LmVudGl0aWVzLmltYWdlLnZhbHVlXG4gICAgICB0aHVtYm5haWwgPSBlbnRyeS5lbnRpdGllcy50aHVtYm5haWwudmFsdWVcbiAgICAgIG5hbWUgPSBlbnRyeS5uYW1lXG4gICAgICBkZXNjcmlwdGlvbiA9IGVudHJ5LmVudGl0aWVzLmRlc2NyaXB0aW9uLnZhbHVlXG5cblxuICAgICAgZ2lnID0gJCAnPGRpdiAvPicsIFxuICAgICAgICBjbGFzczogXCJnaWcgb2ZmIGRvd24gZ2lnXyN7aW5kZXh9XCJcbiAgICAgICAgc3R5bGU6IFwiYmFja2dyb3VuZC1pbWFnZTogdXJsKCN7dGh1bWJuYWlsfSlcIlxuXG4gICAgICBnaWcuYXBwZW5kICAkICc8ZGl2IC8+JyxcbiAgICAgICAgY2xhc3M6ICdpbWFnZSBvZmYnXG4gICAgICAgIHN0eWxlOiBcImJhY2tncm91bmQtaW1hZ2U6IHVybCgje2ltYWdlfSlcIlxuXG4gICAgICBkb3QgPSAkICc8ZGl2PjwvZGl2PicsIFxuICAgICAgICBjbGFzczogXCJkb3Qgb2ZmIGRvdF8je2luZGV4fVwiXG4gICAgICAgICdkYXRhLW51bSc6IGluZGV4XG5cbiAgICAgIGRvdC5hcHBlbmQgJCAnPGRpdiAvPicsIGNsYXNzOiAnaW5uZXInXG5cbiAgICAgIGNvcHkgPSAkICc8ZGl2IC8+JywgXG4gICAgICAgIGNsYXNzOiBcImNvcHkgb2ZmIGNvcHlfI3tpbmRleH1cIlxuXG4gICAgICBjb3B5LmFwcGVuZCAkICc8ZGl2IC8+JyxcbiAgICAgICAgY2xhc3M6ICdjdGl0bGUnXG4gICAgICAgIGh0bWw6IG5hbWVcblxuICAgICAgY29weS5hcHBlbmQgJCAnPGRpdiAvPicsXG4gICAgICAgIGNsYXNzOiAnY2Rlc2NyaXB0aW9uJ1xuICAgICAgICBodG1sOiBkZXNjcmlwdGlvblxuXG4gICAgICBpZiBpbmRleCBpcyAwXG4gICAgICAgIF8ub24gZ2lnXG4gICAgICAgIF8ub24gZG90XG4gICAgICAgIF8ub24gY29weVxuXG4gICAgICAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MnKS5hcHBlbmQgZ2lnXG4gICAgICAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmRvdHMnKS5hcHBlbmQgZG90XG4gICAgICAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmNvcHlzJykuYXBwZW5kIGNvcHlcblxuICAgICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZ2lncyA+IC5naWcgPiAuaW1hZ2Uub2ZmJykuZWFjaCAoaSwgZWwpIC0+XG4gICAgICBzcmMgPSAkKGVsKS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKS5yZXBsYWNlKC91cmxcXChcIj8oLio/KVwiP1xcKS8sIFwiJDFcIilcbiAgICAgIGltYWdlID0gbmV3IEltYWdlKClcbiAgICAgIGltYWdlLnNyYyA9IHNyY1xuICAgICAgaW1hZ2Uub25sb2FkID0gLT5cbiAgICAgICAgXy5vbiBlbFxuXG4gIGk6IC0+XG4gICAgQGFjdGl2ZSA9IHRydWVcbiAgICBAaGFuZGxlcnMuaSgpXG5cbiAgZDogLT5cbiAgICBAYWN0aXZlID0gZmFsc2VcbiAgICBAaGFuZGxlcnMuZCgpXG5cbiAgaGFuZGxlcnM6IFxuXG4gICAgaTogLT5cbiAgICAgICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZG90cyA+IC5kb3QnKS5vbiAnY2xpY2snLCBAZG90XG4gICAgZDogLT5cbiAgICAgICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZG90cyA+IC5kb3QnKS5vZmYgJ2NsaWNrJywgQGRvdFxuXG4gICAgZG90OiAtPlxuICAgICAgcHJldmlvdXMgPSAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmRvdHMgPiAuZG90Lm9uJykuZGF0YSAnbnVtJ1xuICAgICAgY3VycmVudCA9ICQodGhpcykuZGF0YSAnbnVtJ1xuXG4gICAgICBpZiBwcmV2aW91cyA8IGN1cnJlbnRcbiAgICAgICAgV29yay5zbGlkZSBwcmV2aW91cywgY3VycmVudCwgJ2Rvd24nXG4gICAgICBlbHNlXG4gICAgICAgIFdvcmsuc2xpZGUgcHJldmlvdXMsIGN1cnJlbnQsICd1cCdcblxuICBuYXZpZ2F0ZTogKGRpcmVjdGlvbikgLT5cblxuICAgIHJldHVybiB0cnVlIGlmIFdvcmsucGF1c2VkIGlzIHRydWVcblxuICAgIHByZXZpb3VzID0gJCgnLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5kb3RzID4gLmRvdC5vbicpLmRhdGEgJ251bSdcblxuICAgIGlmIGRpcmVjdGlvbiBpcyAndXAnXG4gICAgICBjdXJyZW50ID0gcHJldmlvdXMrMVxuICAgIGVsc2VcbiAgICAgIGN1cnJlbnQgPSBwcmV2aW91cy0xXG5cbiAgICBjdXJyZW50ID0gV29yay5naWdzLmxlbmd0aC0xaWYgY3VycmVudCA8IDBcblxuICAgIGN1cnJlbnQgPSAwIGlmIGN1cnJlbnQgaXMgV29yay5naWdzLmxlbmd0aFxuXG4gICAgQHNsaWRlIHByZXZpb3VzLCBjdXJyZW50LCBkaXJlY3Rpb25cblxuICAgIFdvcmsucGF1c2VkID0gdHJ1ZVxuICAgIHNldFRpbWVvdXQgLT5cbiAgICAgIFdvcmsucGF1c2VkID0gZmFsc2VcbiAgICAsV29yay50aW1lb3V0XG5cbiAgc2xpZGU6IChmcm9tLCB0bywgZGlyZWN0aW9uKSAtPlxuXG4gICAgaWYgZGlyZWN0aW9uIGlzICd1cCdcbiAgICAgICQoXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnLmdpZ18je2Zyb219XCIpLmFkZENsYXNzKCd1cCcpLnJlbW92ZUNsYXNzKCdkb3duJylcbiAgICAgICQoXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnLmdpZ18je3RvfVwiKS5hZGRDbGFzcygndXAnKS5yZW1vdmVDbGFzcygnZG93bicpXG4gICAgZWxzZSBcbiAgICAgICQoXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnLmdpZ18je2Zyb219XCIpLmFkZENsYXNzKCdkb3duJykucmVtb3ZlQ2xhc3MoJ3VwJylcbiAgICAgICQoXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnLmdpZ18je3RvfVwiKS5hZGRDbGFzcygnZG93bicpLnJlbW92ZUNsYXNzKCd1cCcpXG5cbiAgICBfLm9mZiBcIi5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZG90cyA+IC5kb3QuZG90XyN7ZnJvbX1cIlxuICAgIF8ub2ZmIFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5naWdzID4gLmdpZy5naWdfI3tmcm9tfVwiLCBvZmZpbmc6IHRydWUsIG9mZnRpbWU6IDAuNVxuICAgIF8ub2ZmIFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5jb3B5cyA+IC5jb3B5LmNvcHlfI3tmcm9tfVwiXG5cbiAgICBfLm9uIFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5kb3RzID4gLmRvdF8je3RvfVwiXG4gICAgXy5vbiBcIi5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZ2lncyA+IC5naWdfI3t0b31cIlxuICAgIF8ub24gXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmNvcHlzID4gLmNvcHkuY29weV8je3RvfVwiXG5cbiJdfQ==
