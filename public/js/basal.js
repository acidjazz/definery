var Basal,
  hasProp = {}.hasOwnProperty;

Basal = {
  domain: '//basal.tech/api',
  client: false,
  data: false,
  structures: false,
  complete: false,
  i: function(client, complete) {
    this.complete = complete;
    this.client = client;
    return this.getStructures((function(_this) {
      return function() {
        _this.loop();
        return _this.entry();
      };
    })(this));
  },
  entry: function() {
    return $('.basal-entry').each(function(i, el) {
      var attr, bkey, entity, entityName, entry, key, name, ref, results, structure;
      el = $(el);
      structure = el.attr('basal-structure');
      name = el.attr('basal-name');
      entityName = el.attr('basal-entity');
      attr = el.attr('basal-attr');
      if (Basal.structures[structure] == null) {
        Basal.error("Structure not found \"" + structure + "\"");
      }
      ref = Basal.structures[structure].entries;
      results = [];
      for (key in ref) {
        entry = ref[key];
        if (entry.active !== true) {
          continue;
        }
        if (name === entry.name) {
          results.push((function() {
            var ref1, results1;
            ref1 = entry.entities;
            results1 = [];
            for (bkey in ref1) {
              entity = ref1[bkey];
              if (entity.name === entityName) {
                if (attr) {
                  el.attr(attr, entity.value);
                  results1.push(console.log(attr));
                } else {
                  results1.push(el.html(entity.value));
                }
              } else {
                results1.push(void 0);
              }
            }
            return results1;
          })());
        } else {
          results.push(void 0);
        }
      }
      return results;
    });
  },
  loop: function() {
    return $('.basal-loop').each(function(i, el) {
      var entry, name, ref, results, structure, template, tpl;
      el = $(el);
      structure = el.attr("basal-structure");
      if (Basal.structures[structure] == null) {
        Basal.error("Structure not found \"" + structure + "\"");
      }
      template = el.children().remove();
      ref = Basal.structures[structure].entries;
      results = [];
      for (name in ref) {
        if (!hasProp.call(ref, name)) continue;
        entry = ref[name];
        if (entry.active !== true) {
          continue;
        }
        tpl = template.clone();
        tpl.find('*').each(function(ci, cel) {
          var j, jcel, len, names, ref1, ref2, results1, type, types;
          jcel = $(cel);
          name = jcel.attr('basal-name');
          type = jcel.attr('basal-type');
          names = (ref1 = jcel.attr('basal-names')) != null ? ref1.split(',') : void 0;
          types = (ref2 = jcel.attr('basal-types')) != null ? ref2.split(',') : void 0;
          if (name === void 0 && names === void 0) {
            return true;
          }
          if (names === void 0) {
            names = [name];
            types = [type];
          }
          results1 = [];
          for (i = j = 0, len = names.length; j < len; i = ++j) {
            name = names[i];
            type = types[i];
            if (type !== void 0) {
              switch (type) {
                case 'css-background':
                  results1.push(jcel.css('background-image', "url(" + entry.entities[name].value + ")"));
                  break;
                case 'date':
                  results1.push(jcel.html(moment(entry.entities[name].value, 'MM/DD/YYYY').format(jcel.attr('basal-dateformat'))));
                  break;
                case 'image':
                  results1.push(jcel.attr('src', entry.entities[name].value));
                  break;
                case 'text':
                  results1.push(jcel.html(entry.entities[name].value));
                  break;
                case 'href':
                  results1.push(jcel.attr('href', entry.entities[name].value));
                  break;
                default:
                  results1.push(void 0);
              }
            } else {
              if (name === 'structure-name') {
                results1.push(jcel.html(entry.name));
              } else {
                results1.push(jcel.html(entry.entities[name].value));
              }
            }
          }
          return results1;
        });
        results.push(el.append(tpl));
      }
      return results;
    }).promise().done(function() {
      return Basal.complete();
    });
  },
  getStructures: function(complete) {
    return this.jsonp("structures", {
      client: this.client
    }, (function(_this) {
      return function(result) {
        var i, ref, structure;
        _this.structures = {};
        ref = result.data;
        for (i in ref) {
          structure = ref[i];
          _this.structures[structure.name] = structure;
        }
        return typeof complete === "function" ? complete() : void 0;
      };
    })(this));
  },
  jsonp: function(endpoint, params, complete, callback) {
    var el, script;
    if (callback == null) {
      callback = 'Basal.callback';
    }
    params.callback = callback;
    script = ("" + document.location.protocol + this.domain + "/" + endpoint + "?") + $.param(params);
    el = document.createElement('script');
    el.src = script;
    el.addEventListener('load', function(e) {
      if (typeof complete === "function") {
        complete(Basal.data);
      }
      return Basal.data = false;
    }, false);
    return document.getElementsByTagName('head')[0].appendChild(el);
  },
  callback: function(data) {
    return Basal.data = data;
  },
  error: function(message) {
    throw new Error("basal: " + message);
  }
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2FsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLEtBQUE7RUFBQTs7QUFBQSxLQUFBLEdBRUU7RUFBQSxNQUFBLEVBQVEsa0JBQVI7RUFDQSxNQUFBLEVBQVEsS0FEUjtFQUdBLElBQUEsRUFBTSxLQUhOO0VBSUEsVUFBQSxFQUFZLEtBSlo7RUFNQSxRQUFBLEVBQVUsS0FOVjtFQVFBLENBQUEsRUFBRyxTQUFDLE1BQUQsRUFBUyxRQUFUO0lBRUQsSUFBQyxDQUFBLFFBQUQsR0FBWTtJQUVaLElBQUMsQ0FBQSxNQUFELEdBQVU7V0FFVixJQUFDLENBQUEsYUFBRCxDQUFlLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtRQUNiLEtBQUMsQ0FBQSxJQUFELENBQUE7ZUFDQSxLQUFDLENBQUEsS0FBRCxDQUFBO01BRmE7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWY7RUFOQyxDQVJIO0VBa0JBLEtBQUEsRUFBTyxTQUFBO1dBQ0wsQ0FBQSxDQUFFLGNBQUYsQ0FBaUIsQ0FBQyxJQUFsQixDQUF1QixTQUFDLENBQUQsRUFBSSxFQUFKO0FBRXJCLFVBQUE7TUFBQSxFQUFBLEdBQUssQ0FBQSxDQUFFLEVBQUY7TUFDTCxTQUFBLEdBQVksRUFBRSxDQUFDLElBQUgsQ0FBUSxpQkFBUjtNQUNaLElBQUEsR0FBTyxFQUFFLENBQUMsSUFBSCxDQUFRLFlBQVI7TUFDUCxVQUFBLEdBQWEsRUFBRSxDQUFDLElBQUgsQ0FBUSxjQUFSO01BQ2IsSUFBQSxHQUFPLEVBQUUsQ0FBQyxJQUFILENBQVEsWUFBUjtNQUVQLElBQXdELG1DQUF4RDtRQUFBLEtBQUssQ0FBQyxLQUFOLENBQVksd0JBQUEsR0FBeUIsU0FBekIsR0FBbUMsSUFBL0MsRUFBQTs7QUFFQTtBQUFBO1dBQUEsVUFBQTs7UUFDRSxJQUFZLEtBQUssQ0FBQyxNQUFOLEtBQWtCLElBQTlCO0FBQUEsbUJBQUE7O1FBQ0EsSUFBRyxJQUFBLEtBQVEsS0FBSyxDQUFDLElBQWpCOzs7QUFDRTtBQUFBO2lCQUFBLFlBQUE7O2NBQ0UsSUFBRyxNQUFNLENBQUMsSUFBUCxLQUFlLFVBQWxCO2dCQUNFLElBQUcsSUFBSDtrQkFDRSxFQUFFLENBQUMsSUFBSCxDQUFRLElBQVIsRUFBYyxNQUFNLENBQUMsS0FBckI7Z0NBQ0EsT0FBTyxDQUFDLEdBQVIsQ0FBWSxJQUFaLEdBRkY7aUJBQUEsTUFBQTtnQ0FJRSxFQUFFLENBQUMsSUFBSCxDQUFRLE1BQU0sQ0FBQyxLQUFmLEdBSkY7aUJBREY7ZUFBQSxNQUFBO3NDQUFBOztBQURGOztnQkFERjtTQUFBLE1BQUE7K0JBQUE7O0FBRkY7O0lBVnFCLENBQXZCO0VBREssQ0FsQlA7RUF3Q0EsSUFBQSxFQUFNLFNBQUE7V0FFSixDQUFBLENBQUUsYUFBRixDQUFnQixDQUFDLElBQWpCLENBQXVCLFNBQUMsQ0FBRCxFQUFJLEVBQUo7QUFFckIsVUFBQTtNQUFBLEVBQUEsR0FBSyxDQUFBLENBQUUsRUFBRjtNQUNMLFNBQUEsR0FBWSxFQUFFLENBQUMsSUFBSCxDQUFRLGlCQUFSO01BRVosSUFBd0QsbUNBQXhEO1FBQUEsS0FBSyxDQUFDLEtBQU4sQ0FBWSx3QkFBQSxHQUF5QixTQUF6QixHQUFtQyxJQUEvQyxFQUFBOztNQUVBLFFBQUEsR0FBVyxFQUFFLENBQUMsUUFBSCxDQUFBLENBQWEsQ0FBQyxNQUFkLENBQUE7QUFFWDtBQUFBO1dBQUEsV0FBQTs7O1FBQ0UsSUFBWSxLQUFLLENBQUMsTUFBTixLQUFrQixJQUE5QjtBQUFBLG1CQUFBOztRQUNBLEdBQUEsR0FBTSxRQUFRLENBQUMsS0FBVCxDQUFBO1FBQ04sR0FBRyxDQUFDLElBQUosQ0FBUyxHQUFULENBQWEsQ0FBQyxJQUFkLENBQW1CLFNBQUMsRUFBRCxFQUFLLEdBQUw7QUFDakIsY0FBQTtVQUFBLElBQUEsR0FBTyxDQUFBLENBQUUsR0FBRjtVQUNQLElBQUEsR0FBTyxJQUFJLENBQUMsSUFBTCxDQUFVLFlBQVY7VUFDUCxJQUFBLEdBQU8sSUFBSSxDQUFDLElBQUwsQ0FBVSxZQUFWO1VBQ1AsS0FBQSxtREFBZ0MsQ0FBRSxLQUExQixDQUFnQyxHQUFoQztVQUNSLEtBQUEsbURBQWdDLENBQUUsS0FBMUIsQ0FBZ0MsR0FBaEM7VUFFUixJQUFlLElBQUEsS0FBUSxNQUFSLElBQXNCLEtBQUEsS0FBUyxNQUE5QztBQUFBLG1CQUFPLEtBQVA7O1VBRUEsSUFBRyxLQUFBLEtBQVMsTUFBWjtZQUNFLEtBQUEsR0FBUSxDQUFDLElBQUQ7WUFDUixLQUFBLEdBQVEsQ0FBQyxJQUFELEVBRlY7O0FBSUE7ZUFBQSwrQ0FBQTs7WUFDRSxJQUFBLEdBQU8sS0FBTSxDQUFBLENBQUE7WUFFYixJQUFHLElBQUEsS0FBVSxNQUFiO0FBQ0Usc0JBQU8sSUFBUDtBQUFBLHFCQUNPLGdCQURQO2dDQUVJLElBQUksQ0FBQyxHQUFMLENBQVMsa0JBQVQsRUFBNkIsTUFBQSxHQUFPLEtBQUssQ0FBQyxRQUFTLENBQUEsSUFBQSxDQUFLLENBQUMsS0FBNUIsR0FBa0MsR0FBL0Q7QUFERztBQURQLHFCQUdPLE1BSFA7Z0NBSUksSUFBSSxDQUFDLElBQUwsQ0FBVSxNQUFBLENBQU8sS0FBSyxDQUFDLFFBQVMsQ0FBQSxJQUFBLENBQUssQ0FBQyxLQUE1QixFQUFtQyxZQUFuQyxDQUFnRCxDQUFDLE1BQWpELENBQXdELElBQUksQ0FBQyxJQUFMLENBQVUsa0JBQVYsQ0FBeEQsQ0FBVjtBQURHO0FBSFAscUJBS08sT0FMUDtnQ0FNSSxJQUFJLENBQUMsSUFBTCxDQUFVLEtBQVYsRUFBaUIsS0FBSyxDQUFDLFFBQVMsQ0FBQSxJQUFBLENBQUssQ0FBQyxLQUF0QztBQURHO0FBTFAscUJBT08sTUFQUDtnQ0FRSSxJQUFJLENBQUMsSUFBTCxDQUFVLEtBQUssQ0FBQyxRQUFTLENBQUEsSUFBQSxDQUFLLENBQUMsS0FBL0I7QUFERztBQVBQLHFCQVNPLE1BVFA7Z0NBVUksSUFBSSxDQUFDLElBQUwsQ0FBVSxNQUFWLEVBQWtCLEtBQUssQ0FBQyxRQUFTLENBQUEsSUFBQSxDQUFLLENBQUMsS0FBdkM7QUFERztBQVRQOztBQUFBLGVBREY7YUFBQSxNQUFBO2NBY0UsSUFBRyxJQUFBLEtBQVEsZ0JBQVg7OEJBQ0UsSUFBSSxDQUFDLElBQUwsQ0FBVSxLQUFLLENBQUMsSUFBaEIsR0FERjtlQUFBLE1BQUE7OEJBR0UsSUFBSSxDQUFDLElBQUwsQ0FBVSxLQUFLLENBQUMsUUFBUyxDQUFBLElBQUEsQ0FBSyxDQUFDLEtBQS9CLEdBSEY7ZUFkRjs7QUFIRjs7UUFiaUIsQ0FBbkI7cUJBa0NBLEVBQUUsQ0FBQyxNQUFILENBQVUsR0FBVjtBQXJDRjs7SUFUcUIsQ0FBdkIsQ0FnREcsQ0FBQyxPQWhESixDQUFBLENBZ0RhLENBQUMsSUFoRGQsQ0FnRG1CLFNBQUE7YUFDZixLQUFLLENBQUMsUUFBTixDQUFBO0lBRGUsQ0FoRG5CO0VBRkksQ0F4Q047RUE2RkEsYUFBQSxFQUFlLFNBQUMsUUFBRDtXQUNiLElBQUMsQ0FBQSxLQUFELENBQU8sWUFBUCxFQUFxQjtNQUFBLE1BQUEsRUFBUSxJQUFDLENBQUEsTUFBVDtLQUFyQixFQUFzQyxDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUMsTUFBRDtBQUNwQyxZQUFBO1FBQUEsS0FBQyxDQUFBLFVBQUQsR0FBYztBQUNkO0FBQUEsYUFBQSxRQUFBOztVQUNFLEtBQUMsQ0FBQSxVQUFXLENBQUEsU0FBUyxDQUFDLElBQVYsQ0FBWixHQUE4QjtBQURoQztnREFFQTtNQUpvQztJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBdEM7RUFEYSxDQTdGZjtFQW9HQSxLQUFBLEVBQU8sU0FBQyxRQUFELEVBQVcsTUFBWCxFQUFtQixRQUFuQixFQUE2QixRQUE3QjtBQUVMLFFBQUE7O01BRmtDLFdBQVM7O0lBRTNDLE1BQU0sQ0FBQyxRQUFQLEdBQWtCO0lBRWxCLE1BQUEsR0FBUyxDQUFBLEVBQUEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQXJCLEdBQWdDLElBQUMsQ0FBQSxNQUFqQyxHQUF3QyxHQUF4QyxHQUEyQyxRQUEzQyxHQUFvRCxHQUFwRCxDQUFBLEdBQXlELENBQUMsQ0FBQyxLQUFGLENBQVEsTUFBUjtJQUVsRSxFQUFBLEdBQUssUUFBUSxDQUFDLGFBQVQsQ0FBdUIsUUFBdkI7SUFDTCxFQUFFLENBQUMsR0FBSCxHQUFTO0lBQ1QsRUFBRSxDQUFDLGdCQUFILENBQW9CLE1BQXBCLEVBQTZCLFNBQUMsQ0FBRDs7UUFDM0IsU0FBVSxLQUFLLENBQUM7O2FBQ2hCLEtBQUssQ0FBQyxJQUFOLEdBQWE7SUFGYyxDQUE3QixFQUdFLEtBSEY7V0FLQSxRQUFRLENBQUMsb0JBQVQsQ0FBOEIsTUFBOUIsQ0FBc0MsQ0FBQSxDQUFBLENBQUUsQ0FBQyxXQUF6QyxDQUFxRCxFQUFyRDtFQWJLLENBcEdQO0VBbUhBLFFBQUEsRUFBVSxTQUFDLElBQUQ7V0FDUixLQUFLLENBQUMsSUFBTixHQUFhO0VBREwsQ0FuSFY7RUFzSEEsS0FBQSxFQUFPLFNBQUMsT0FBRDtBQUNMLFVBQVUsSUFBQSxLQUFBLENBQU0sU0FBQSxHQUFVLE9BQWhCO0VBREwsQ0F0SFAiLCJmaWxlIjoiYmFzYWwuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJCYXNhbCA9XG5cbiAgZG9tYWluOiAnLy9iYXNhbC50ZWNoL2FwaSdcbiAgY2xpZW50OiBmYWxzZVxuXG4gIGRhdGE6IGZhbHNlXG4gIHN0cnVjdHVyZXM6IGZhbHNlXG5cbiAgY29tcGxldGU6IGZhbHNlXG5cbiAgaTogKGNsaWVudCwgY29tcGxldGUpIC0+XG5cbiAgICBAY29tcGxldGUgPSBjb21wbGV0ZVxuXG4gICAgQGNsaWVudCA9IGNsaWVudFxuXG4gICAgQGdldFN0cnVjdHVyZXMgPT5cbiAgICAgIEBsb29wKClcbiAgICAgIEBlbnRyeSgpXG5cbiAgZW50cnk6IC0+XG4gICAgJCgnLmJhc2FsLWVudHJ5JykuZWFjaCAoaSwgZWwpIC0+XG5cbiAgICAgIGVsID0gJChlbClcbiAgICAgIHN0cnVjdHVyZSA9IGVsLmF0dHIgJ2Jhc2FsLXN0cnVjdHVyZSdcbiAgICAgIG5hbWUgPSBlbC5hdHRyICdiYXNhbC1uYW1lJ1xuICAgICAgZW50aXR5TmFtZSA9IGVsLmF0dHIgJ2Jhc2FsLWVudGl0eSdcbiAgICAgIGF0dHIgPSBlbC5hdHRyICdiYXNhbC1hdHRyJ1xuXG4gICAgICBCYXNhbC5lcnJvcihcIlN0cnVjdHVyZSBub3QgZm91bmQgXFxcIiN7c3RydWN0dXJlfVxcXCJcIikgaWYgIUJhc2FsLnN0cnVjdHVyZXNbc3RydWN0dXJlXT9cblxuICAgICAgZm9yIGtleSwgZW50cnkgb2YgQmFzYWwuc3RydWN0dXJlc1tzdHJ1Y3R1cmVdLmVudHJpZXNcbiAgICAgICAgY29udGludWUgaWYgZW50cnkuYWN0aXZlIGlzbnQgdHJ1ZVxuICAgICAgICBpZiBuYW1lIGlzIGVudHJ5Lm5hbWVcbiAgICAgICAgICBmb3IgYmtleSwgZW50aXR5IG9mIGVudHJ5LmVudGl0aWVzXG4gICAgICAgICAgICBpZiBlbnRpdHkubmFtZSBpcyBlbnRpdHlOYW1lXG4gICAgICAgICAgICAgIGlmIGF0dHJcbiAgICAgICAgICAgICAgICBlbC5hdHRyIGF0dHIsIGVudGl0eS52YWx1ZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nIGF0dHJcbiAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGVsLmh0bWwgZW50aXR5LnZhbHVlXG5cbiAgbG9vcDogLT5cblxuICAgICQoJy5iYXNhbC1sb29wJykuZWFjaCggKGksIGVsKSAtPlxuXG4gICAgICBlbCA9ICQoZWwpXG4gICAgICBzdHJ1Y3R1cmUgPSBlbC5hdHRyKFwiYmFzYWwtc3RydWN0dXJlXCIpXG5cbiAgICAgIEJhc2FsLmVycm9yKFwiU3RydWN0dXJlIG5vdCBmb3VuZCBcXFwiI3tzdHJ1Y3R1cmV9XFxcIlwiKSBpZiAhQmFzYWwuc3RydWN0dXJlc1tzdHJ1Y3R1cmVdP1xuXG4gICAgICB0ZW1wbGF0ZSA9IGVsLmNoaWxkcmVuKCkucmVtb3ZlKClcblxuICAgICAgZm9yIG93biBuYW1lLCBlbnRyeSBvZiBCYXNhbC5zdHJ1Y3R1cmVzW3N0cnVjdHVyZV0uZW50cmllc1xuICAgICAgICBjb250aW51ZSBpZiBlbnRyeS5hY3RpdmUgaXNudCB0cnVlXG4gICAgICAgIHRwbCA9IHRlbXBsYXRlLmNsb25lKClcbiAgICAgICAgdHBsLmZpbmQoJyonKS5lYWNoIChjaSwgY2VsKSAtPlxuICAgICAgICAgIGpjZWwgPSAkKGNlbClcbiAgICAgICAgICBuYW1lID0gamNlbC5hdHRyKCdiYXNhbC1uYW1lJylcbiAgICAgICAgICB0eXBlID0gamNlbC5hdHRyKCdiYXNhbC10eXBlJylcbiAgICAgICAgICBuYW1lcyA9IGpjZWwuYXR0cignYmFzYWwtbmFtZXMnKT8uc3BsaXQgJywnXG4gICAgICAgICAgdHlwZXMgPSBqY2VsLmF0dHIoJ2Jhc2FsLXR5cGVzJyk/LnNwbGl0ICcsJ1xuXG4gICAgICAgICAgcmV0dXJuIHRydWUgaWYgbmFtZSBpcyB1bmRlZmluZWQgYW5kIG5hbWVzIGlzIHVuZGVmaW5lZFxuXG4gICAgICAgICAgaWYgbmFtZXMgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgICBuYW1lcyA9IFtuYW1lXVxuICAgICAgICAgICAgdHlwZXMgPSBbdHlwZV1cblxuICAgICAgICAgIGZvciBuYW1lLCBpIGluIG5hbWVzXG4gICAgICAgICAgICB0eXBlID0gdHlwZXNbaV1cblxuICAgICAgICAgICAgaWYgdHlwZSBpc250IHVuZGVmaW5lZFxuICAgICAgICAgICAgICBzd2l0Y2ggdHlwZVxuICAgICAgICAgICAgICAgIHdoZW4gJ2Nzcy1iYWNrZ3JvdW5kJ1xuICAgICAgICAgICAgICAgICAgamNlbC5jc3MgJ2JhY2tncm91bmQtaW1hZ2UnLCBcInVybCgje2VudHJ5LmVudGl0aWVzW25hbWVdLnZhbHVlfSlcIlxuICAgICAgICAgICAgICAgIHdoZW4gJ2RhdGUnXG4gICAgICAgICAgICAgICAgICBqY2VsLmh0bWwgbW9tZW50KGVudHJ5LmVudGl0aWVzW25hbWVdLnZhbHVlLCAnTU0vREQvWVlZWScpLmZvcm1hdCBqY2VsLmF0dHIoJ2Jhc2FsLWRhdGVmb3JtYXQnKVxuICAgICAgICAgICAgICAgIHdoZW4gJ2ltYWdlJ1xuICAgICAgICAgICAgICAgICAgamNlbC5hdHRyICdzcmMnLCBlbnRyeS5lbnRpdGllc1tuYW1lXS52YWx1ZVxuICAgICAgICAgICAgICAgIHdoZW4gJ3RleHQnXG4gICAgICAgICAgICAgICAgICBqY2VsLmh0bWwgZW50cnkuZW50aXRpZXNbbmFtZV0udmFsdWVcbiAgICAgICAgICAgICAgICB3aGVuICdocmVmJ1xuICAgICAgICAgICAgICAgICAgamNlbC5hdHRyICdocmVmJywgZW50cnkuZW50aXRpZXNbbmFtZV0udmFsdWVcblxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICBpZiBuYW1lIGlzICdzdHJ1Y3R1cmUtbmFtZSdcbiAgICAgICAgICAgICAgICBqY2VsLmh0bWwgZW50cnkubmFtZVxuICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgamNlbC5odG1sIGVudHJ5LmVudGl0aWVzW25hbWVdLnZhbHVlXG4gICAgICAgIGVsLmFwcGVuZCB0cGxcblxuICAgICAgKS5wcm9taXNlKCkuZG9uZSAtPlxuICAgICAgICBCYXNhbC5jb21wbGV0ZSgpXG5cbiAgZ2V0U3RydWN0dXJlczogKGNvbXBsZXRlKSAtPlxuICAgIEBqc29ucCBcInN0cnVjdHVyZXNcIiwgY2xpZW50OiBAY2xpZW50LCAocmVzdWx0KSA9PlxuICAgICAgQHN0cnVjdHVyZXMgPSB7fVxuICAgICAgZm9yIGksc3RydWN0dXJlIG9mIHJlc3VsdC5kYXRhXG4gICAgICAgIEBzdHJ1Y3R1cmVzW3N0cnVjdHVyZS5uYW1lXSA9IHN0cnVjdHVyZVxuICAgICAgY29tcGxldGU/KClcblxuICBqc29ucDogKGVuZHBvaW50LCBwYXJhbXMsIGNvbXBsZXRlLCBjYWxsYmFjaz0nQmFzYWwuY2FsbGJhY2snKSAtPlxuXG4gICAgcGFyYW1zLmNhbGxiYWNrID0gY2FsbGJhY2tcblxuICAgIHNjcmlwdCA9IFwiI3tkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbH0je0Bkb21haW59LyN7ZW5kcG9pbnR9P1wiICsgJC5wYXJhbSBwYXJhbXNcblxuICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnc2NyaXB0J1xuICAgIGVsLnNyYyA9IHNjcmlwdFxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIgJ2xvYWQnICwgKGUpIC0+XG4gICAgICBjb21wbGV0ZT8oQmFzYWwuZGF0YSlcbiAgICAgIEJhc2FsLmRhdGEgPSBmYWxzZVxuICAgICwgZmFsc2VcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoZWwpXG5cbiAgY2FsbGJhY2s6IChkYXRhKSAtPlxuICAgIEJhc2FsLmRhdGEgPSBkYXRhXG5cbiAgZXJyb3I6IChtZXNzYWdlKSAtPlxuICAgIHRocm93IG5ldyBFcnJvciBcImJhc2FsOiAje21lc3NhZ2V9XCJcbiJdfQ==
