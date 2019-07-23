"use strict";

var s;

$(document).ready(function() {
  // Browser init
  if (usingIE()) {
    $("#IE-modal").modal({
      keyboard: false,
      backdrop: "static",
      show: true
    });
    $("#IE-vnum").html(usingIE());
    return;
  }

  if (/Chrome/.test(navigator.userAgent)) $("#use-chrome").hide();

  // Skrollr init
  s = skrollr.init({
    constants: {
      box: "100p"
    },
    mobileCheck: function() {
      return false;
    }
  });

  // Konami init
  cheet("↑ ↑ ↓ ↓ ← → ← → b a", function() {
    $("#konami").css("opacity", 1);
  });

  cheet("y e s", {
    next: yesNoProgress,
    fail: yesNoFail,
    done: function() {
      $("#about-yes-no").fadeOut();
      $("#about-yes").fadeIn();
      $("#about-ask").fadeOut();
    }
  });

  cheet("n o", {
    next: yesNoProgress,
    fail: yesNoFail,
    done: function() {
      $("#about-yes-no").fadeOut();
      $("#about-no").fadeIn();
      $("#about-ask").fadeOut();
    }
  });

  function yesNoProgress(str, key, num, seq) {
    $("#about-yes-no").show();
    $("#about-no").hide();
    $("#about-yes").hide();
    var progress = seq.join("").slice(0, num + 1);
    $("#about-yes-no").html(progress + " _");
  }

  function yesNoFail() {
    $("#about-ask").fadeIn();
    $("#about-yes-no").html("_");
  }

  // Bootstrap init
  $('[data-toggle="tooltip"]').tooltip();

  // UX init
  randomize();
  $(".hover-primary")
    .mouseenter(function() {
      $(".hover")
        .not(".hover-primary")
        .addClass("hover-others");
    })
    .mouseleave(function() {
      $(".hover")
        .not(".hover-primary")
        .removeClass("hover-others");
    });
  $(".hover-success")
    .mouseenter(function() {
      $(".hover")
        .not(".hover-success")
        .addClass("hover-others");
    })
    .mouseleave(function() {
      $(".hover")
        .not(".hover-success")
        .removeClass("hover-others");
    });
  $(".hover-danger")
    .mouseenter(function() {
      $(".hover")
        .not(".hover-danger")
        .addClass("hover-others");
    })
    .mouseleave(function() {
      $(".hover")
        .not(".hover-danger")
        .removeClass("hover-others");
    });
  $(".hover-info")
    .mouseenter(function() {
      $(".hover")
        .not(".hover-info")
        .addClass("hover-others");
    })
    .mouseleave(function() {
      $(".hover")
        .not(".hover-info")
        .removeClass("hover-others");
    });
  $(".hover-warning")
    .mouseenter(function() {
      $(".hover")
        .not(".hover-warning")
        .addClass("hover-others");
    })
    .mouseleave(function() {
      $(".hover")
        .not(".hover-warning")
        .removeClass("hover-others");
    });
  $(".hover-inverse")
    .mouseenter(function() {
      $(".hover")
        .not(".hover-inverse")
        .addClass("hover-others");
    })
    .mouseleave(function() {
      $(".hover")
        .not(".hover-inverse")
        .removeClass("hover-others");
    });
});

function toTop() {
  $("body").animate({ scrollTop: 0 }, 1000);
  $("#konami").css("opacity", 0);
  $("#about-no, #about-yes").fadeOut();
  $("#about-ask").fadeIn();
  $("#about-yes-no")
    .show()
    .html("_");

  randomize();
}

function randomize() {
  var cards = $(".card-columns .card");
  for (var i = 0; i < cards.length; i++) {
    var target1 = Math.floor(Math.random() * cards.length - 1) + 1;
    var target2 = Math.floor(Math.random() * cards.length - 1) + 1;
    cards.eq(target1).before(cards.eq(target2));
  }
}

function usingIE() {
  var ua = window.navigator.userAgent;

  var msie = ua.indexOf("MSIE ");
  if (msie > 0) {
    return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
  }

  var trident = ua.indexOf("Trident/");
  if (trident > 0) {
    var rv = ua.indexOf("rv:");
    return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
  }

  var edge = ua.indexOf("Edge/");
  if (edge > 0) {
    return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
  }

  return false;
}
