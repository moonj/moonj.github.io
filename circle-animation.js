var insertCircle = function(linkElement) {
  return $('<div class="circle-container ready">\
      <div class="circle"></div>\
      <div class="circle-border"></div>\
    </div>').insertBefore(linkElement);
}

var startCircleAnimation = function(circleContainer) {
  circleContainer.removeClass('ready');
  var circle = circleContainer.children('.circle');
  circle.animate({textIndent: 100}, {
      // grow the loading circle
      step: function(current) {
        var scale = 1 + current * 0.03;
        circle.css('transform', 'scale(' + scale + ', ' + scale + ')');
      },
      duration: 2000,
    }
  )
}

var setLikelihood = function(linkElement, likelihood) {
  var circle = linkElement.prev();
  var scale = 0.5 + likelihood * 1.2;
  linkElement.data('scale', scale);
  circle.css('transform', 'translateX(-16px) scale(' + scale + ', ' + scale +')');
}

// call when loading is done
var finishLoading = function(linkElement) {
  var circleContainer = linkElement.prev();
  var originalScale = linkElement.data('scale');
  console.log(originalScale);
  // make circle bounce
  circleContainer.animate({textIndent: 100}, {
      step: function(current) {
        var scale = -Math.pow((current/100 - 0.5), 2) + 1.25 * originalScale + 0.3;
        circleContainer.css('transform', 'translateX(-16px) scale(' + scale + ',' + scale + ')');
      },
      duration: 400
    }
  );

  // make ripple expand and fade
  circleContainer.children('.circle-border').animate( {textIndent: 100}, {
      step: function(current) {
        var scale = 1 + current*0.05;
        var opacity = 1 - current*0.01;
        $(this).css('transform', 'scale(' + scale + ',' + scale + ')');
        $(this).css('opacity', opacity);
      },
      duration: 800
    }
  );
}

var startLoading = function(linkElement) {
  startCircleAnimation(linkElement.prev());
  // TODO: actually load
}

$(document).ready(function() {
  // add circles to all likely links
  insertCircle($('a'));

  // set initial likelihoods
  setLikelihood($('#one'), 0.4);
  setLikelihood($('#two'), 0.7);
  setLikelihood($('#three'), 0.5);
  setLikelihood($('#four'), 0.9);

  // load
  setTimeout(
    function() { startLoading($('a'))}, 3000);
  setTimeout(function() {
    finishLoading($('#one'));
    finishLoading($('#two'));
    finishLoading($('#three'));
    finishLoading($('#four'));
  }, 5000);
  console.log('hey');
});
