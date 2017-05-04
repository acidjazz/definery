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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndvcmsuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsSUFBQSxHQUVFO0VBQUEsU0FBQSxFQUFXLEtBQVg7RUFFQSxNQUFBLEVBQVEsS0FGUjtFQUdBLE9BQUEsRUFBUyxJQUhUO0VBS0EsTUFBQSxFQUFRLEtBTFI7RUFPQSxJQUFBLEVBQU0sQ0FDSixZQURJLEVBRUosaUJBRkksRUFHSixhQUhJLEVBSUosb0JBSkksRUFLSixxQkFMSSxFQU1KLG9CQU5JLEVBT0osYUFQSSxDQVBOO0VBaUJBLFFBQUEsRUFBVyxTQUFDLFFBQUQ7V0FFVCxLQUFLLENBQUMsS0FBTixDQUFZLFlBQVosRUFBMEI7TUFBQSxNQUFBLEVBQVEsMEJBQVI7S0FBMUIsRUFBOEQsSUFBOUQsRUFBb0UsZUFBcEU7RUFGUyxDQWpCWDtFQXFCQSxRQUFBLEVBQVUsU0FBQyxJQUFEO0FBRVIsUUFBQTtBQUFBO0FBQUEsU0FBQSxxQ0FBQTs7TUFDRSxJQUFHLFNBQVMsQ0FBQyxJQUFWLEtBQWtCLE1BQXJCO1FBQ0UsT0FBQSxHQUFVLFNBQVMsQ0FBQyxRQUR0Qjs7QUFERjtBQUlBLFNBQUEsMkRBQUE7O01BRUUsS0FBQSxHQUFRLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO01BQzdCLFNBQUEsR0FBWSxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQztNQUNyQyxJQUFBLEdBQU8sS0FBSyxDQUFDO01BQ2IsV0FBQSxHQUFjLEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDO01BR3pDLEdBQUEsR0FBTSxDQUFBLENBQUUsU0FBRixFQUNKO1FBQUEsT0FBQSxFQUFPLG1CQUFBLEdBQW9CLEtBQTNCO1FBQ0EsS0FBQSxFQUFPLHdCQUFBLEdBQXlCLFNBQXpCLEdBQW1DLEdBRDFDO09BREk7TUFJTixHQUFHLENBQUMsTUFBSixDQUFZLENBQUEsQ0FBRSxTQUFGLEVBQ1Y7UUFBQSxPQUFBLEVBQU8sV0FBUDtRQUNBLEtBQUEsRUFBTyx3QkFBQSxHQUF5QixLQUF6QixHQUErQixHQUR0QztPQURVLENBQVo7TUFJQSxHQUFBLEdBQU0sQ0FBQSxDQUFFLGFBQUYsRUFDSjtRQUFBLE9BQUEsRUFBTyxjQUFBLEdBQWUsS0FBdEI7UUFDQSxVQUFBLEVBQVksS0FEWjtPQURJO01BSU4sR0FBRyxDQUFDLE1BQUosQ0FBVyxDQUFBLENBQUUsU0FBRixFQUFhO1FBQUEsT0FBQSxFQUFPLE9BQVA7T0FBYixDQUFYO01BRUEsSUFBQSxHQUFPLENBQUEsQ0FBRSxTQUFGLEVBQ0w7UUFBQSxPQUFBLEVBQU8sZ0JBQUEsR0FBaUIsS0FBeEI7T0FESztNQUdQLElBQUksQ0FBQyxNQUFMLENBQVksQ0FBQSxDQUFFLFNBQUYsRUFDVjtRQUFBLE9BQUEsRUFBTyxRQUFQO1FBQ0EsSUFBQSxFQUFNLElBRE47T0FEVSxDQUFaO01BSUEsSUFBSSxDQUFDLE1BQUwsQ0FBWSxDQUFBLENBQUUsU0FBRixFQUNWO1FBQUEsT0FBQSxFQUFPLGNBQVA7UUFDQSxJQUFBLEVBQU0sV0FETjtPQURVLENBQVo7TUFJQSxJQUFHLEtBQUEsS0FBUyxDQUFaO1FBQ0UsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxHQUFMO1FBQ0EsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxHQUFMO1FBQ0EsQ0FBQyxDQUFDLEVBQUYsQ0FBSyxJQUFMLEVBSEY7O01BS0EsQ0FBQSxDQUFFLGdDQUFGLENBQW1DLENBQUMsTUFBcEMsQ0FBMkMsR0FBM0M7TUFDQSxDQUFBLENBQUUsZ0NBQUYsQ0FBbUMsQ0FBQyxNQUFwQyxDQUEyQyxHQUEzQztNQUNBLENBQUEsQ0FBRSxpQ0FBRixDQUFvQyxDQUFDLE1BQXJDLENBQTRDLElBQTVDO0FBeENGO1dBMENBLENBQUEsQ0FBRSxvREFBRixDQUF1RCxDQUFDLElBQXhELENBQTZELFNBQUMsQ0FBRCxFQUFJLEVBQUo7QUFDM0QsVUFBQTtNQUFBLEdBQUEsR0FBTSxDQUFBLENBQUUsRUFBRixDQUFLLENBQUMsR0FBTixDQUFVLGtCQUFWLENBQTZCLENBQUMsT0FBOUIsQ0FBc0Msa0JBQXRDLEVBQTBELElBQTFEO01BQ04sS0FBQSxHQUFZLElBQUEsS0FBQSxDQUFBO01BQ1osS0FBSyxDQUFDLEdBQU4sR0FBWTthQUNaLEtBQUssQ0FBQyxNQUFOLEdBQWUsU0FBQTtlQUNiLENBQUMsQ0FBQyxFQUFGLENBQUssRUFBTDtNQURhO0lBSjRDLENBQTdEO0VBaERRLENBckJWO0VBNEVBLENBQUEsRUFBRyxTQUFBO0lBQ0QsSUFBQyxDQUFBLE1BQUQsR0FBVTtXQUNWLElBQUMsQ0FBQSxRQUFRLENBQUMsQ0FBVixDQUFBO0VBRkMsQ0E1RUg7RUFnRkEsQ0FBQSxFQUFHLFNBQUE7V0FDRCxJQUFDLENBQUEsTUFBRCxHQUFVO0VBRFQsQ0FoRkg7RUFtRkEsUUFBQSxFQUVFO0lBQUEsQ0FBQSxFQUFHLFNBQUE7YUFDRCxDQUFBLENBQUUsdUNBQUYsQ0FBMEMsQ0FBQyxFQUEzQyxDQUE4QyxPQUE5QyxFQUF1RCxJQUFDLENBQUEsR0FBeEQ7SUFEQyxDQUFIO0lBRUEsQ0FBQSxFQUFHLFNBQUE7YUFDRCxDQUFBLENBQUUsdUNBQUYsQ0FBMEMsQ0FBQyxHQUEzQyxDQUErQyxPQUEvQyxFQUF3RCxJQUFDLENBQUEsR0FBekQ7SUFEQyxDQUZIO0lBS0EsR0FBQSxFQUFLLFNBQUE7QUFDSCxVQUFBO01BQUEsUUFBQSxHQUFXLENBQUEsQ0FBRSwwQ0FBRixDQUE2QyxDQUFDLElBQTlDLENBQW1ELEtBQW5EO01BQ1gsT0FBQSxHQUFVLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxJQUFSLENBQWEsS0FBYjtNQUVWLElBQUcsUUFBQSxHQUFXLE9BQWQ7ZUFDRSxJQUFJLENBQUMsS0FBTCxDQUFXLFFBQVgsRUFBcUIsT0FBckIsRUFBOEIsTUFBOUIsRUFERjtPQUFBLE1BQUE7ZUFHRSxJQUFJLENBQUMsS0FBTCxDQUFXLFFBQVgsRUFBcUIsT0FBckIsRUFBOEIsSUFBOUIsRUFIRjs7SUFKRyxDQUxMO0dBckZGO0VBbUdBLFFBQUEsRUFBVSxTQUFDLFNBQUQ7QUFFUixRQUFBO0lBQUEsSUFBZSxJQUFJLENBQUMsTUFBTCxLQUFlLElBQTlCO0FBQUEsYUFBTyxLQUFQOztJQUVBLFFBQUEsR0FBVyxDQUFBLENBQUUsMENBQUYsQ0FBNkMsQ0FBQyxJQUE5QyxDQUFtRCxLQUFuRDtJQUVYLElBQUcsU0FBQSxLQUFhLElBQWhCO01BQ0UsT0FBQSxHQUFVLFFBQUEsR0FBUyxFQURyQjtLQUFBLE1BQUE7TUFHRSxPQUFBLEdBQVUsUUFBQSxHQUFTLEVBSHJCOztJQUtBLElBQStCLE9BQUEsR0FBVSxDQUF6QztNQUFBLE9BQUEsR0FBVSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQVYsR0FBaUIsRUFBM0I7O0lBRUEsSUFBZSxPQUFBLEtBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFwQztNQUFBLE9BQUEsR0FBVSxFQUFWOztJQUVBLElBQUMsQ0FBQSxLQUFELENBQU8sUUFBUCxFQUFpQixPQUFqQixFQUEwQixTQUExQjtJQUVBLElBQUksQ0FBQyxNQUFMLEdBQWM7V0FDZCxVQUFBLENBQVcsU0FBQTthQUNULElBQUksQ0FBQyxNQUFMLEdBQWM7SUFETCxDQUFYLEVBRUMsSUFBSSxDQUFDLE9BRk47RUFsQlEsQ0FuR1Y7RUF5SEEsS0FBQSxFQUFPLFNBQUMsSUFBRCxFQUFPLEVBQVAsRUFBVyxTQUFYO0lBRUwsSUFBRyxTQUFBLEtBQWEsSUFBaEI7TUFDRSxDQUFBLENBQUUsNENBQUEsR0FBNkMsSUFBL0MsQ0FBc0QsQ0FBQyxRQUF2RCxDQUFnRSxJQUFoRSxDQUFxRSxDQUFDLFdBQXRFLENBQWtGLE1BQWxGO01BQ0EsQ0FBQSxDQUFFLDRDQUFBLEdBQTZDLEVBQS9DLENBQW9ELENBQUMsUUFBckQsQ0FBOEQsSUFBOUQsQ0FBbUUsQ0FBQyxXQUFwRSxDQUFnRixNQUFoRixFQUZGO0tBQUEsTUFBQTtNQUlFLENBQUEsQ0FBRSw0Q0FBQSxHQUE2QyxJQUEvQyxDQUFzRCxDQUFDLFFBQXZELENBQWdFLE1BQWhFLENBQXVFLENBQUMsV0FBeEUsQ0FBb0YsSUFBcEY7TUFDQSxDQUFBLENBQUUsNENBQUEsR0FBNkMsRUFBL0MsQ0FBb0QsQ0FBQyxRQUFyRCxDQUE4RCxNQUE5RCxDQUFxRSxDQUFDLFdBQXRFLENBQWtGLElBQWxGLEVBTEY7O0lBT0EsQ0FBQyxDQUFDLEdBQUYsQ0FBTSw0Q0FBQSxHQUE2QyxJQUFuRDtJQUNBLENBQUMsQ0FBQyxHQUFGLENBQU0sNENBQUEsR0FBNkMsSUFBbkQsRUFBMkQ7TUFBQSxNQUFBLEVBQVEsSUFBUjtNQUFjLE9BQUEsRUFBUyxHQUF2QjtLQUEzRDtJQUNBLENBQUMsQ0FBQyxHQUFGLENBQU0sK0NBQUEsR0FBZ0QsSUFBdEQ7SUFFQSxDQUFDLENBQUMsRUFBRixDQUFLLHdDQUFBLEdBQXlDLEVBQTlDO0lBQ0EsQ0FBQyxDQUFDLEVBQUYsQ0FBSyx3Q0FBQSxHQUF5QyxFQUE5QztXQUNBLENBQUMsQ0FBQyxFQUFGLENBQUssK0NBQUEsR0FBZ0QsRUFBckQ7RUFmSyxDQXpIUCIsImZpbGUiOiJ3b3JrLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiV29yayA9IFxuXG4gIHBvcHVsYXRlZDogZmFsc2VcblxuICBwYXVzZWQ6IGZhbHNlXG4gIHRpbWVvdXQ6IDEwMDBcblxuICBhY3RpdmU6IGZhbHNlXG5cbiAgZ2lnczogW1xuICAgICdsaWt3aWQuanBnJyxcbiAgICAnbGl2ZWx5X2NhcmQuanBnJyxcbiAgICAnbHdfbGFicy5qcGcnLFxuICAgICdwZXJyaWNvbmVfYmxvZy5qcGcnLFxuICAgICdsaXZlbHlfYnJhbmRpbmcuanBnJyxcbiAgICAnbGl2ZWx5X3Byb2R1Y3QuanBnJyxcbiAgICAnbHdfc2l0ZS5qcGcnLFxuICBdXG5cbiAgcG9wdWxhdGU6ICAoY29tcGxldGUpIC0+XG5cbiAgICBCYXNhbC5qc29ucCAnc3RydWN0dXJlcycsIGNsaWVudDogJzU5MGE2MWY0NWFhNTliMDFiMDJlMmVjMicsIG51bGwsICdXb3JrLmNhbGxiYWNrJ1xuXG4gIGNhbGxiYWNrOiAoZGF0YSkgLT5cblxuICAgIGZvciBzdHJ1Y3R1cmUgaW4gZGF0YS5kYXRhXG4gICAgICBpZiBzdHJ1Y3R1cmUubmFtZSBpcyAnd29yaydcbiAgICAgICAgZW50cmllcyA9IHN0cnVjdHVyZS5lbnRyaWVzXG5cbiAgICBmb3IgZW50cnksIGluZGV4IGluIGVudHJpZXNcblxuICAgICAgaW1hZ2UgPSBlbnRyeS5lbnRpdGllcy5pbWFnZS52YWx1ZVxuICAgICAgdGh1bWJuYWlsID0gZW50cnkuZW50aXRpZXMudGh1bWJuYWlsLnZhbHVlXG4gICAgICBuYW1lID0gZW50cnkubmFtZVxuICAgICAgZGVzY3JpcHRpb24gPSBlbnRyeS5lbnRpdGllcy5kZXNjcmlwdGlvbi52YWx1ZVxuXG5cbiAgICAgIGdpZyA9ICQgJzxkaXYgLz4nLCBcbiAgICAgICAgY2xhc3M6IFwiZ2lnIG9mZiBkb3duIGdpZ18je2luZGV4fVwiXG4gICAgICAgIHN0eWxlOiBcImJhY2tncm91bmQtaW1hZ2U6IHVybCgje3RodW1ibmFpbH0pXCJcblxuICAgICAgZ2lnLmFwcGVuZCAgJCAnPGRpdiAvPicsXG4gICAgICAgIGNsYXNzOiAnaW1hZ2Ugb2ZmJ1xuICAgICAgICBzdHlsZTogXCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoI3tpbWFnZX0pXCJcblxuICAgICAgZG90ID0gJCAnPGRpdj48L2Rpdj4nLCBcbiAgICAgICAgY2xhc3M6IFwiZG90IG9mZiBkb3RfI3tpbmRleH1cIlxuICAgICAgICAnZGF0YS1udW0nOiBpbmRleFxuXG4gICAgICBkb3QuYXBwZW5kICQgJzxkaXYgLz4nLCBjbGFzczogJ2lubmVyJ1xuXG4gICAgICBjb3B5ID0gJCAnPGRpdiAvPicsIFxuICAgICAgICBjbGFzczogXCJjb3B5IG9mZiBjb3B5XyN7aW5kZXh9XCJcblxuICAgICAgY29weS5hcHBlbmQgJCAnPGRpdiAvPicsXG4gICAgICAgIGNsYXNzOiAnY3RpdGxlJ1xuICAgICAgICBodG1sOiBuYW1lXG5cbiAgICAgIGNvcHkuYXBwZW5kICQgJzxkaXYgLz4nLFxuICAgICAgICBjbGFzczogJ2NkZXNjcmlwdGlvbidcbiAgICAgICAgaHRtbDogZGVzY3JpcHRpb25cblxuICAgICAgaWYgaW5kZXggaXMgMFxuICAgICAgICBfLm9uIGdpZ1xuICAgICAgICBfLm9uIGRvdFxuICAgICAgICBfLm9uIGNvcHlcblxuICAgICAgJCgnLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5naWdzJykuYXBwZW5kIGdpZ1xuICAgICAgJCgnLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5kb3RzJykuYXBwZW5kIGRvdFxuICAgICAgJCgnLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5jb3B5cycpLmFwcGVuZCBjb3B5XG5cbiAgICAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnID4gLmltYWdlLm9mZicpLmVhY2ggKGksIGVsKSAtPlxuICAgICAgc3JjID0gJChlbCkuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJykucmVwbGFjZSgvdXJsXFwoXCI/KC4qPylcIj9cXCkvLCBcIiQxXCIpXG4gICAgICBpbWFnZSA9IG5ldyBJbWFnZSgpXG4gICAgICBpbWFnZS5zcmMgPSBzcmNcbiAgICAgIGltYWdlLm9ubG9hZCA9IC0+XG4gICAgICAgIF8ub24gZWxcblxuICBpOiAtPlxuICAgIEBhY3RpdmUgPSB0cnVlXG4gICAgQGhhbmRsZXJzLmkoKVxuXG4gIGQ6IC0+XG4gICAgQGFjdGl2ZSA9IGZhbHNlXG5cbiAgaGFuZGxlcnM6IFxuXG4gICAgaTogLT5cbiAgICAgICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZG90cyA+IC5kb3QnKS5vbiAnY2xpY2snLCBAZG90XG4gICAgZDogLT5cbiAgICAgICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZG90cyA+IC5kb3QnKS5vZmYgJ2NsaWNrJywgQGRvdFxuXG4gICAgZG90OiAtPlxuICAgICAgcHJldmlvdXMgPSAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmRvdHMgPiAuZG90Lm9uJykuZGF0YSAnbnVtJ1xuICAgICAgY3VycmVudCA9ICQodGhpcykuZGF0YSAnbnVtJ1xuXG4gICAgICBpZiBwcmV2aW91cyA8IGN1cnJlbnRcbiAgICAgICAgV29yay5zbGlkZSBwcmV2aW91cywgY3VycmVudCwgJ2Rvd24nXG4gICAgICBlbHNlXG4gICAgICAgIFdvcmsuc2xpZGUgcHJldmlvdXMsIGN1cnJlbnQsICd1cCdcblxuICBuYXZpZ2F0ZTogKGRpcmVjdGlvbikgLT5cblxuICAgIHJldHVybiB0cnVlIGlmIFdvcmsucGF1c2VkIGlzIHRydWVcblxuICAgIHByZXZpb3VzID0gJCgnLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5kb3RzID4gLmRvdC5vbicpLmRhdGEgJ251bSdcblxuICAgIGlmIGRpcmVjdGlvbiBpcyAndXAnXG4gICAgICBjdXJyZW50ID0gcHJldmlvdXMrMVxuICAgIGVsc2VcbiAgICAgIGN1cnJlbnQgPSBwcmV2aW91cy0xXG5cbiAgICBjdXJyZW50ID0gV29yay5naWdzLmxlbmd0aC0xaWYgY3VycmVudCA8IDBcblxuICAgIGN1cnJlbnQgPSAwIGlmIGN1cnJlbnQgaXMgV29yay5naWdzLmxlbmd0aFxuXG4gICAgQHNsaWRlIHByZXZpb3VzLCBjdXJyZW50LCBkaXJlY3Rpb25cblxuICAgIFdvcmsucGF1c2VkID0gdHJ1ZVxuICAgIHNldFRpbWVvdXQgLT5cbiAgICAgIFdvcmsucGF1c2VkID0gZmFsc2VcbiAgICAsV29yay50aW1lb3V0XG5cbiAgc2xpZGU6IChmcm9tLCB0bywgZGlyZWN0aW9uKSAtPlxuXG4gICAgaWYgZGlyZWN0aW9uIGlzICd1cCdcbiAgICAgICQoXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnLmdpZ18je2Zyb219XCIpLmFkZENsYXNzKCd1cCcpLnJlbW92ZUNsYXNzKCdkb3duJylcbiAgICAgICQoXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnLmdpZ18je3RvfVwiKS5hZGRDbGFzcygndXAnKS5yZW1vdmVDbGFzcygnZG93bicpXG4gICAgZWxzZSBcbiAgICAgICQoXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnLmdpZ18je2Zyb219XCIpLmFkZENsYXNzKCdkb3duJykucmVtb3ZlQ2xhc3MoJ3VwJylcbiAgICAgICQoXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnLmdpZ18je3RvfVwiKS5hZGRDbGFzcygnZG93bicpLnJlbW92ZUNsYXNzKCd1cCcpXG5cbiAgICBfLm9mZiBcIi5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZG90cyA+IC5kb3QuZG90XyN7ZnJvbX1cIlxuICAgIF8ub2ZmIFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5naWdzID4gLmdpZy5naWdfI3tmcm9tfVwiLCBvZmZpbmc6IHRydWUsIG9mZnRpbWU6IDAuNVxuICAgIF8ub2ZmIFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5jb3B5cyA+IC5jb3B5LmNvcHlfI3tmcm9tfVwiXG5cbiAgICBfLm9uIFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5kb3RzID4gLmRvdF8je3RvfVwiXG4gICAgXy5vbiBcIi5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZ2lncyA+IC5naWdfI3t0b31cIlxuICAgIF8ub24gXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmNvcHlzID4gLmNvcHkuY29weV8je3RvfVwiXG5cbiJdfQ==
