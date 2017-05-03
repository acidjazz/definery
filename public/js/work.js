var Work;

Work = {
  active: false,
  gigs: ['likwid.jpg', 'lively_card.jpg', 'lw_labs.jpg', 'perricone_blog.jpg', 'lively_branding.jpg', 'lively_product.jpg', 'lw_site.jpg'],
  populate: function(complete) {
    var dot, gig, i, image, index, len, ref, results;
    ref = this.gigs;
    results = [];
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      image = ref[index];
      gig = $('<div />', {
        "class": "gig off gig_" + index,
        style: "background-image: url(/images/work/" + image + ")"
      });
      dot = $('<div></div>', {
        "class": "dot off dot_" + index,
        'data-num': index
      });
      dot.append($('<div />', {
        "class": 'inner'
      }));
      if (index === 0) {
        _.on(gig);
        _.on(dot);
      }
      $('.section.work > .inner > .gigs').append(gig);
      results.push($('.section.work > .inner > .dots').append(dot));
    }
    return results;
  },
  i: function() {
    console.log('Work.i()');
    this.active = true;
    return this.handlers.i();
  },
  d: function() {
    console.log('Work.d()');
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
      var current, num, previous;
      previous = $('.section.work > .inner > .dots > .dot.on');
      current = $(this);
      num = current.data('num');
      _.off('.section.work > .inner > .dots > .dot');
      _.off('.section.work > .inner > .gigs > .gig');
      _.on(".section.work > .inner > .dots > .dot_" + num);
      return _.on(".section.work > .inner > .gigs > .gig_" + num);
    }
  },
  navigate: function(direction) {
    var next, previous;
    previous = $('.section.work > .inner > .dots > .dot.on').data('num');
    if (direction === 'up') {
      next = previous + 1;
    } else {
      next = previous - 1;
    }
    if (next < 0) {
      next = Work.gigs.length - 1;
    }
    if (next === Work.gigs.length - 1) {
      next = 0;
    }
    console.log(next);
    _.off('.section.work > .inner > .dots > .dot');
    _.off('.section.work > .inner > .gigs > .gig');
    _.on(".section.work > .inner > .dots > .dot_" + next);
    return _.on(".section.work > .inner > .gigs > .gig_" + next);
  }
};

//# sourceMappingURL=data:application/json;base64,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Q0FBckM7TUFBQSxJQUFBLEdBQU8sRUFBUDs7SUFFQSxPQUFPLENBQUMsR0FBUixDQUFZLElBQVo7SUFFQSxDQUFDLENBQUMsR0FBRixDQUFNLHVDQUFOO0lBQ0EsQ0FBQyxDQUFDLEdBQUYsQ0FBTSx1Q0FBTjtJQUVBLENBQUMsQ0FBQyxFQUFGLENBQUssd0NBQUEsR0FBeUMsSUFBOUM7V0FDQSxDQUFDLENBQUMsRUFBRixDQUFLLHdDQUFBLEdBQXlDLElBQTlDO0VBakJRLENBN0RWIiwiZmlsZSI6IndvcmsuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJcbldvcmsgPSBcblxuICBhY3RpdmU6IGZhbHNlXG5cbiAgZ2lnczogW1xuICAgICdsaWt3aWQuanBnJyxcbiAgICAnbGl2ZWx5X2NhcmQuanBnJyxcbiAgICAnbHdfbGFicy5qcGcnLFxuICAgICdwZXJyaWNvbmVfYmxvZy5qcGcnLFxuICAgICdsaXZlbHlfYnJhbmRpbmcuanBnJyxcbiAgICAnbGl2ZWx5X3Byb2R1Y3QuanBnJyxcbiAgICAnbHdfc2l0ZS5qcGcnLFxuICBdXG5cbiAgcG9wdWxhdGU6ICAoY29tcGxldGUpLT5cblxuICAgIGZvciBpbWFnZSwgaW5kZXggaW4gQGdpZ3NcblxuICAgICAgZ2lnID0gJCgnPGRpdiAvPicsIFxuICAgICAgICBjbGFzczogXCJnaWcgb2ZmIGdpZ18je2luZGV4fVwiXG4gICAgICAgIHN0eWxlOiBcImJhY2tncm91bmQtaW1hZ2U6IHVybCgvaW1hZ2VzL3dvcmsvI3tpbWFnZX0pXCJcbiAgICAgIClcblxuICAgICAgZG90ID0gJCgnPGRpdj48L2Rpdj4nLCBcbiAgICAgICAgY2xhc3M6IFwiZG90IG9mZiBkb3RfI3tpbmRleH1cIlxuICAgICAgICAnZGF0YS1udW0nOiBpbmRleFxuICAgICAgKVxuICAgICAgZG90LmFwcGVuZCAkKCc8ZGl2IC8+JywgY2xhc3M6ICdpbm5lcicpXG5cbiAgICAgIGlmIGluZGV4IGlzIDBcbiAgICAgICAgXy5vbiBnaWdcbiAgICAgICAgXy5vbiBkb3RcblxuICAgICAgJCgnLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5naWdzJykuYXBwZW5kIGdpZ1xuICAgICAgJCgnLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5kb3RzJykuYXBwZW5kIGRvdFxuXG4gIGk6IC0+XG4gICAgY29uc29sZS5sb2cgJ1dvcmsuaSgpJ1xuICAgIEBhY3RpdmUgPSB0cnVlXG4gICAgQGhhbmRsZXJzLmkoKVxuXG4gIGQ6IC0+XG4gICAgY29uc29sZS5sb2cgJ1dvcmsuZCgpJ1xuICAgIEBhY3RpdmUgPSBmYWxzZVxuXG5cbiAgaGFuZGxlcnM6IFxuXG4gICAgaTogLT5cbiAgICAgICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZG90cyA+IC5kb3QnKS5vbiAnY2xpY2snLCBAZG90XG4gICAgZDogLT5cbiAgICAgICQoJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZG90cyA+IC5kb3QnKS5vZmYgJ2NsaWNrJywgQGRvdFxuXG4gICAgZG90OiAtPlxuICAgICAgcHJldmlvdXMgPSAkKCcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmRvdHMgPiAuZG90Lm9uJylcbiAgICAgIGN1cnJlbnQgPSAkKHRoaXMpXG4gICAgICBudW0gPSBjdXJyZW50LmRhdGEgJ251bSdcbiAgICAgIF8ub2ZmICcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmRvdHMgPiAuZG90J1xuICAgICAgXy5vZmYgJy5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZ2lncyA+IC5naWcnXG5cbiAgICAgIF8ub24gXCIuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmRvdHMgPiAuZG90XyN7bnVtfVwiXG4gICAgICBfLm9uIFwiLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5naWdzID4gLmdpZ18je251bX1cIlxuXG4gIG5hdmlnYXRlOiAoZGlyZWN0aW9uKSAtPlxuICAgIHByZXZpb3VzID0gJCgnLnNlY3Rpb24ud29yayA+IC5pbm5lciA+IC5kb3RzID4gLmRvdC5vbicpLmRhdGEgJ251bSdcblxuICAgIGlmIGRpcmVjdGlvbiBpcyAndXAnXG4gICAgICBuZXh0ID0gcHJldmlvdXMrMVxuICAgIGVsc2VcbiAgICAgIG5leHQgPSBwcmV2aW91cy0xXG5cbiAgICBuZXh0ID0gV29yay5naWdzLmxlbmd0aC0xIGlmIG5leHQgPCAwXG4gICAgbmV4dCA9IDAgaWYgbmV4dCBpcyBXb3JrLmdpZ3MubGVuZ3RoLTFcblxuICAgIGNvbnNvbGUubG9nIG5leHRcblxuICAgIF8ub2ZmICcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmRvdHMgPiAuZG90J1xuICAgIF8ub2ZmICcuc2VjdGlvbi53b3JrID4gLmlubmVyID4gLmdpZ3MgPiAuZ2lnJ1xuXG4gICAgXy5vbiBcIi5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZG90cyA+IC5kb3RfI3tuZXh0fVwiXG4gICAgXy5vbiBcIi5zZWN0aW9uLndvcmsgPiAuaW5uZXIgPiAuZ2lncyA+IC5naWdfI3tuZXh0fVwiXG5cblxuIl19
