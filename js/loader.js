var Loader;

Loader = {
  scripts: {
    js: [],
    js_lib: [],
    jst_cune: [],
    jst_cune_lib: []
  },
  i: function(callback) {
    this.browser = this.searchString(this.dataBrowser) || "Other";
    this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
    this.mobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    this.iPad = /iPad/i.test(navigator.userAgent);
    this.iPhone = /iPhone/i.test(navigator.userAgent);
    this.Chrome = /Chrome/i.test(navigator.userAgent);
    this.Safari = /Safari/i.test(navigator.userAgent) && !Loader.Chrome;
    if (Loader.compatible()) {
      return Loader.loadscripts(Loader.scripts, function() {
        if (window.cfg !== 'undefined') {
          return callback(true);
        } else {
          return Loader.config(function() {
            return callback(true);
          });
        }
      });
    } else {
      return callback(false);
    }
  },
  searchString: function(data) {
    var dataString, i;
    i = 0;
    while (i < data.length) {
      dataString = data[i].string;
      this.versionSearchString = data[i].subString;
      if (dataString.indexOf(data[i].subString) !== -1) {
        return data[i].identity;
      }
      i++;
    }
  },
  searchVersion: function(dataString) {
    var index;
    index = dataString.indexOf(this.versionSearchString);
    if (index === -1) {
      return;
    }
    return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
  },
  dataBrowser: [
    {
      string: navigator.userAgent,
      subString: "Chrome",
      identity: "Chrome"
    }, {
      string: navigator.userAgent,
      subString: "MSIE",
      identity: "Explorer"
    }, {
      string: navigator.userAgent,
      subString: "Firefox",
      identity: "Firefox"
    }, {
      string: navigator.userAgent,
      subString: "Safari",
      identity: "Safari"
    }, {
      string: navigator.userAgent,
      subString: "Opera",
      identity: "Opera"
    }
  ],
  compatible: function() {
    if (Loader.browser === 'Chrome' && Loader.version < 17) {
      return Loader.redirect();
    }
    if (Loader.browser === 'MSIE' && Loader.version < 10) {
      return Loader.redirect();
    }
    if (Loader.browser === 'Explorer' && Loader.version < 10) {
      return Loader.redirect();
    }
    if (Loader.browser === 'FireFox' && Loader.version < 20) {
      return Loader.redirect();
    }
    if (Loader.browser === 'Safari' && Loader.version < 6) {
      return Loader.redirect();
    }
    if (!Loader.browser.indexOf(['Chrome', 'MSIE', 'FireFox', 'Safari'])) {
      return Loader.redirect();
    }
    return true;
  },
  redirect: function() {
    location.href = '/compatible/';
    return false;
  },
  loadscripts: function(list, complete) {
    var floop, folder, i, j, len, paths, script, scripts;
    paths = [];
    i = 0;
    for (folder in list) {
      scripts = list[folder];
      for (j = 0, len = scripts.length; j < len; j++) {
        script = scripts[j];
        paths.push('/' + folder.replace(/_/g, '/') + '/' + script + '.js');
      }
    }
    floop = function(arr) {
      return Loader.load(paths[i], false, function() {
        if (++i === paths.length) {
          return complete();
        } else {
          return floop(arr);
        }
      });
    };
    return floop(paths);
  },
  config: function(complete) {
    return $.getJSON('./cfg/config.json', function(result) {
      window.cfg = result.cfg;
      return complete();
    });
  },
  load: function(script, initiate, complete) {
    var el;
    el = document.createElement('script');
    el.type = 'text/javascript';
    el.src = script;
    el.addEventListener('load', function(e) {
      if (typeof complete === 'function') {
        complete();
      }
      if (initiate !== void 0 && initiate !== false) {
        return window[initiate].i();
      }
    }, false);
    return document.body.appendChild(el);
  },
  jsonp: function(script, initiate, complete) {
    var el;
    el = document.createElement('script');
    el.type = 'text/json';
    el.src = script;
    el.addEventListener('load', function(e) {
      if (typeof complete === 'function') {
        complete();
      }
      if (initiate !== void 0 && initiate !== false) {
        return window[initiate].i();
      }
    }, false);
    return document.body.appendChild(el);
  }
};

//# sourceMappingURL=data:application/json;base64,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Q0FBQyxHQUFILEdBQVM7SUFDVCxFQUFFLENBQUMsZ0JBQUgsQ0FBb0IsTUFBcEIsRUFBNkIsU0FBQyxDQUFEO01BQzNCLElBQWMsT0FBTyxRQUFQLEtBQW1CLFVBQWpDO1FBQUEsUUFBQSxDQUFBLEVBQUE7O01BQ0EsSUFBd0IsUUFBQSxLQUFjLE1BQWQsSUFBNEIsUUFBQSxLQUFjLEtBQWxFO2VBQUEsTUFBTyxDQUFBLFFBQUEsQ0FBUyxDQUFDLENBQWpCLENBQUEsRUFBQTs7SUFGMkIsQ0FBN0IsRUFHRSxLQUhGO1dBS0EsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFkLENBQTBCLEVBQTFCO0VBVkksQ0F6RU47RUFzRkEsS0FBQSxFQUFPLFNBQUMsTUFBRCxFQUFTLFFBQVQsRUFBbUIsUUFBbkI7QUFFTCxRQUFBO0lBQUEsRUFBQSxHQUFLLFFBQVEsQ0FBQyxhQUFULENBQXVCLFFBQXZCO0lBQ0wsRUFBRSxDQUFDLElBQUgsR0FBVTtJQUNWLEVBQUUsQ0FBQyxHQUFILEdBQVM7SUFDVCxFQUFFLENBQUMsZ0JBQUgsQ0FBb0IsTUFBcEIsRUFBNkIsU0FBQyxDQUFEO01BQzNCLElBQWMsT0FBTyxRQUFQLEtBQW1CLFVBQWpDO1FBQUEsUUFBQSxDQUFBLEVBQUE7O01BQ0EsSUFBd0IsUUFBQSxLQUFjLE1BQWQsSUFBNEIsUUFBQSxLQUFjLEtBQWxFO2VBQUEsTUFBTyxDQUFBLFFBQUEsQ0FBUyxDQUFDLENBQWpCLENBQUEsRUFBQTs7SUFGMkIsQ0FBN0IsRUFHRSxLQUhGO1dBS0EsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFkLENBQTBCLEVBQTFCO0VBVkssQ0F0RlAiLCJmaWxlIjoibG9hZGVyLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiXG5Mb2FkZXIgPVxuXG4gIHNjcmlwdHM6IHtqczogW10sIGpzX2xpYjogW10sIGpzdF9jdW5lOiBbXSwganN0X2N1bmVfbGliOiBbXX1cblxuICBpOiAoY2FsbGJhY2spIC0+XG5cbiAgICBAYnJvd3NlciA9IEBzZWFyY2hTdHJpbmcoQGRhdGFCcm93c2VyKSBvciBcIk90aGVyXCJcbiAgICBAdmVyc2lvbiA9IEBzZWFyY2hWZXJzaW9uKG5hdmlnYXRvci51c2VyQWdlbnQpIG9yIEBzZWFyY2hWZXJzaW9uKG5hdmlnYXRvci5hcHBWZXJzaW9uKSBvciBcIlVua25vd25cIlxuICAgIEBtb2JpbGUgPSAvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBvZHxCbGFja0JlcnJ5fElFTW9iaWxlfE9wZXJhIE1pbmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpXG4gICAgQGlQYWQgPSAvaVBhZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudClcbiAgICBAaVBob25lID0gL2lQaG9uZS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudClcbiAgICBAQ2hyb21lID0gL0Nocm9tZS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudClcbiAgICBAU2FmYXJpID0gL1NhZmFyaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgIUxvYWRlci5DaHJvbWVcblxuICAgIGlmIExvYWRlci5jb21wYXRpYmxlKClcbiAgICAgIExvYWRlci5sb2Fkc2NyaXB0cyBMb2FkZXIuc2NyaXB0cywgLT5cbiAgICAgICAgaWYgd2luZG93LmNmZyBpc250ICd1bmRlZmluZWQnXG4gICAgICAgICAgY2FsbGJhY2sgdHJ1ZVxuICAgICAgICBlbHNlXG4gICAgICAgICAgTG9hZGVyLmNvbmZpZyAtPlxuICAgICAgICAgICAgY2FsbGJhY2sgdHJ1ZVxuICAgIGVsc2VcbiAgICAgIGNhbGxiYWNrIGZhbHNlXG5cbiAgc2VhcmNoU3RyaW5nOiAoZGF0YSkgLT5cbiAgICBpID0gMFxuICAgIHdoaWxlIGkgPCBkYXRhLmxlbmd0aFxuICAgICAgZGF0YVN0cmluZyA9IGRhdGFbaV0uc3RyaW5nXG4gICAgICBAdmVyc2lvblNlYXJjaFN0cmluZyA9IGRhdGFbaV0uc3ViU3RyaW5nXG4gICAgICByZXR1cm4gZGF0YVtpXS5pZGVudGl0eSB1bmxlc3MgZGF0YVN0cmluZy5pbmRleE9mKGRhdGFbaV0uc3ViU3RyaW5nKSBpcyAtMVxuICAgICAgaSsrXG4gICAgcmV0dXJuXG5cbiAgc2VhcmNoVmVyc2lvbjogKGRhdGFTdHJpbmcpIC0+XG4gICAgaW5kZXggPSBkYXRhU3RyaW5nLmluZGV4T2YoQHZlcnNpb25TZWFyY2hTdHJpbmcpXG4gICAgcmV0dXJuIGlmIGluZGV4IGlzIC0xXG4gICAgcGFyc2VGbG9hdCBkYXRhU3RyaW5nLnN1YnN0cmluZyhpbmRleCArIEB2ZXJzaW9uU2VhcmNoU3RyaW5nLmxlbmd0aCArIDEpXG5cbiAgZGF0YUJyb3dzZXI6IFtcbiAgICB7IHN0cmluZzogbmF2aWdhdG9yLnVzZXJBZ2VudCwgc3ViU3RyaW5nOiBcIkNocm9tZVwiLCBpZGVudGl0eTogXCJDaHJvbWVcIiB9XG4gICAgeyBzdHJpbmc6IG5hdmlnYXRvci51c2VyQWdlbnQsIHN1YlN0cmluZzogXCJNU0lFXCIsIGlkZW50aXR5OiBcIkV4cGxvcmVyXCIgfVxuICAgIHsgc3RyaW5nOiBuYXZpZ2F0b3IudXNlckFnZW50LCBzdWJTdHJpbmc6IFwiRmlyZWZveFwiLCBpZGVudGl0eTogXCJGaXJlZm94XCIgfVxuICAgIHsgc3RyaW5nOiBuYXZpZ2F0b3IudXNlckFnZW50LCBzdWJTdHJpbmc6IFwiU2FmYXJpXCIsIGlkZW50aXR5OiBcIlNhZmFyaVwiIH1cbiAgICB7IHN0cmluZzogbmF2aWdhdG9yLnVzZXJBZ2VudCwgc3ViU3RyaW5nOiBcIk9wZXJhXCIsIGlkZW50aXR5OiBcIk9wZXJhXCIgfVxuICBdXG5cbiAgY29tcGF0aWJsZTogLT5cbiAgICByZXR1cm4gTG9hZGVyLnJlZGlyZWN0KCkgaWYgTG9hZGVyLmJyb3dzZXIgPT0gJ0Nocm9tZScgYW5kIExvYWRlci52ZXJzaW9uIDwgMTdcbiAgICByZXR1cm4gTG9hZGVyLnJlZGlyZWN0KCkgaWYgTG9hZGVyLmJyb3dzZXIgPT0gJ01TSUUnIGFuZCBMb2FkZXIudmVyc2lvbiA8IDEwXG4gICAgcmV0dXJuIExvYWRlci5yZWRpcmVjdCgpIGlmIExvYWRlci5icm93c2VyID09ICdFeHBsb3JlcicgYW5kIExvYWRlci52ZXJzaW9uIDwgMTBcbiAgICByZXR1cm4gTG9hZGVyLnJlZGlyZWN0KCkgaWYgTG9hZGVyLmJyb3dzZXIgPT0gJ0ZpcmVGb3gnIGFuZCBMb2FkZXIudmVyc2lvbiA8IDIwXG4gICAgcmV0dXJuIExvYWRlci5yZWRpcmVjdCgpIGlmIExvYWRlci5icm93c2VyID09ICdTYWZhcmknIGFuZCBMb2FkZXIudmVyc2lvbiA8IDZcbiAgICByZXR1cm4gTG9hZGVyLnJlZGlyZWN0KCkgaWYgIUxvYWRlci5icm93c2VyLmluZGV4T2YgWydDaHJvbWUnLCdNU0lFJywnRmlyZUZveCcsJ1NhZmFyaSddXG4gICAgcmV0dXJuIHRydWVcblxuICByZWRpcmVjdDogLT5cbiAgICBsb2NhdGlvbi5ocmVmID0gJy9jb21wYXRpYmxlLydcbiAgICByZXR1cm4gZmFsc2VcblxuICBsb2Fkc2NyaXB0czogKGxpc3QsIGNvbXBsZXRlKSAtPlxuICAgIHBhdGhzID0gW11cbiAgICBpID0gMFxuICAgIHBhdGhzLnB1c2ggJy8nICsgZm9sZGVyLnJlcGxhY2UoL18vZywnLycpICsgJy8nICsgc2NyaXB0ICsgJy5qcycgZm9yIHNjcmlwdCBpbiBzY3JpcHRzIGZvciBmb2xkZXIsIHNjcmlwdHMgb2YgbGlzdFxuXG4gICAgZmxvb3AgPSAoYXJyKSAtPlxuICAgICAgTG9hZGVyLmxvYWQgcGF0aHNbaV0sIGZhbHNlLCAtPlxuICAgICAgICBpZiArK2kgaXMgcGF0aHMubGVuZ3RoIHRoZW4gY29tcGxldGUoKSBlbHNlIGZsb29wKGFycilcblxuICAgIGZsb29wIHBhdGhzXG5cbiAgY29uZmlnOiAoY29tcGxldGUpIC0+XG4gICAgJC5nZXRKU09OICcuL2NmZy9jb25maWcuanNvbicsIChyZXN1bHQpIC0+XG4gICAgICB3aW5kb3cuY2ZnID0gcmVzdWx0LmNmZ1xuICAgICAgY29tcGxldGUoKVxuXG4gIGxvYWQ6IChzY3JpcHQsIGluaXRpYXRlLCBjb21wbGV0ZSkgLT5cblxuICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCAnc2NyaXB0J1xuICAgIGVsLnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0J1xuICAgIGVsLnNyYyA9IHNjcmlwdFxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIgJ2xvYWQnICwgKGUpIC0+XG4gICAgICBjb21wbGV0ZSgpIGlmIHR5cGVvZiBjb21wbGV0ZSBpcyAnZnVuY3Rpb24nXG4gICAgICB3aW5kb3dbaW5pdGlhdGVdLmkoKSBpZiBpbml0aWF0ZSBpc250IHVuZGVmaW5lZCBhbmQgaW5pdGlhdGUgaXNudCBmYWxzZVxuICAgICwgZmFsc2VcblxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWwpXG5cblxuICBqc29ucDogKHNjcmlwdCwgaW5pdGlhdGUsIGNvbXBsZXRlKSAtPlxuXG4gICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdzY3JpcHQnXG4gICAgZWwudHlwZSA9ICd0ZXh0L2pzb24nXG4gICAgZWwuc3JjID0gc2NyaXB0XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lciAnbG9hZCcgLCAoZSkgLT5cbiAgICAgIGNvbXBsZXRlKCkgaWYgdHlwZW9mIGNvbXBsZXRlIGlzICdmdW5jdGlvbidcbiAgICAgIHdpbmRvd1tpbml0aWF0ZV0uaSgpIGlmIGluaXRpYXRlIGlzbnQgdW5kZWZpbmVkIGFuZCBpbml0aWF0ZSBpc250IGZhbHNlXG4gICAgLCBmYWxzZVxuXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbClcbiJdfQ==
