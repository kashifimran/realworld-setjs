(function($){
  'use strict';
  function easeOutPow(t, b, c, d) {
    //t = current time, b = start value, c = change in value, d = duration
    return c * (-Math.pow(2, -10 * t/d ) + 1 ) + b;
  }

  function createPiece(options) {
    var s = Math.random() * 2;
    var radiusY = (options.pieceSize || 2) + s;
    var radiusX = (options.pieceSize || 2) + s;
    var colorPair = options.colors[Math.floor(Math.random() * options.colors.length)];
    return {
      radiusX: radiusX,
      radiusY: radiusY,
      color1: colorPair[0],
      color2: colorPair[1],
      x: 0,
      y: 0,
      d: Math.random() * 0.2,
      v: (0.3 + Math.random())/1.3,
      spin: 0,
      spinDir: 1,
      rotate: Math.PI * Math.random(),
      swing: Math.random() * Math.min(1, options.swing || 1),
      spinRate: Math.random() * Math.min(1, options.spin || 0.2),
      hAngle: Math.random() > .5 ? Math.PI/4 - Math.PI * Math.random() : Math.PI/4 + Math.PI * Math.random()
    };
  }

  function explode(canvas, center, options) {
    var list = [];
    var ctx = canvas.getContext('2d');
    var count = options.pieces;
    while (count-- > 0) {
      list.push(createPiece(options));
    }
    function processPiece(piece, frac) {
      var d = piece.d + easeOutPow(frac, 0, easeOutPow(frac, piece.v, -0.15, 1), 1);
      var scale = easeOutPow(Math.min(0.8, frac), 0, 2, 1) * d;
      var newHeight = canvas.height * scale;
      if (frac < 1) {
        piece.x = piece.v * 0.6 * newHeight * Math.cos(piece.hAngle);
        piece.y = newHeight * d * Math.sin(piece.hAngle) - canvas.height * 0.5 * easeOutPow(frac, 0, frac - 0.4, 1);
      } else {
        if (!piece.yDiff) {
          piece.yDiff = piece.y - (newHeight * d * Math.sin(piece.hAngle) - canvas.height * 0.5 * easeOutPow(frac, 0, frac - 0.4, 1));
          piece.x = piece.v * 0.6 * newHeight * Math.cos(piece.hAngle);
        }
        piece.y -= piece.yDiff;
        if (piece.yDiff > 6) {
          piece.yDiff -= 0.1;
        }
      }
      piece.spin += piece.spinDir * piece.spinRate;
      if (piece.spin < 0.1 && piece.spin > -0.1) {
        piece.spin = piece.spinDir * 0.1;
      }
      if (piece.spin > 1 || piece.spin < -1) {
        piece.spinDir *= -1;
      }
      piece.x += Math.sin(frac * Math.PI) * piece.swing;
      ctx.translate(center.x - piece.x, center.y - piece.y);
      ctx.scale(scale, scale);
      ctx.rotate(frac * piece.rotate);
      ctx.scale(piece.spin, 1);
      ctx.fillStyle = piece.spin > 0 ? piece.color1 : piece.color2;
      ctx.beginPath();
      ctx.moveTo(-piece.radiusX, -piece.radiusY);
      ctx.lineTo(piece.radiusX, -piece.radiusY);
      ctx.lineTo(piece.radiusX, piece.radiusY);
      ctx.lineTo(-piece.radiusX, piece.radiusY);
      ctx.fill();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }

    return function nextTick(frac, cb) {
      var minY = 99999999;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      list.forEach(function (piece) {
        processPiece(piece, frac);
        minY = Math.min(-piece.y, minY);
      });
      cb && cb(minY);
    };
  }

  $.fn.confetti = function () {
    var $el = this;
    var options = Object.assign({
      pieces: 1200,
      colors: [["#df0049", "#660671"], ["#00e857", "#005291"], ["#2bebbc", "#05798a"], ["#ffd200", "#b06c00"], ['#0099aa', '#00bbdd']]
    }, $el.data('opts'));
    var $canvas = $('<canvas></canvas>').css({position: 'fixed', left: 0, top: 0, right: 0, bottom: 0, 'z-index': options.zIndex || 1, 'pointer-events': 'none'});
    var canvas = $canvas[0];
    var doRun = 0;
    var explosion;
    var duration = options.duration || 2000;
    var startTime = Date.now();
    var frac = 0.01;
    var center;

    function run() {
      explosion(frac, function (minY) {
        if (minY > canvas.height - center.y) {
          $canvas.remove();
        }
        else if (doRun) {
          frac = (Date.now() - startTime) / duration;
          requestAnimationFrame(run);
        }
      });
    }

    $el.click(function () {
      var bounds = $el[0].getBoundingClientRect();
      center = {x: bounds.left + bounds.width/2, y: bounds.top + bounds.height/2};
      $canvas.attr('width', window.innerWidth).attr('height', window.innerHeight);
      $('body').append($canvas);
      doRun = 0;
      setTimeout(function () {
        frac = 0.01;
        doRun = 1;
        startTime = Date.now();
        explosion = explode(canvas, center, options);
        run();
      }, 20);
    });
    return $el;
  };
}(jQuery));
