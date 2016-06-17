$(function(){
  var $envFront = $('#envelope_front'),
      $envBack  = $('#envelope_back'),
      $plane    = $('.plane'),
      $check    = $('.check');

  setTimeout(function(){window.scrollTo(0,document.body.scrollHeight)}, 100);
  $envFront.on('click tap', function(){
    $envFront.addClass('flipped');
    $envBack.addClass('flipped');
    setTimeout(function() {
      $('html, body').animate({
        scrollTop: 0
      }, 1000);
    }, 3500);
  });

  function success() {
    $check.addClass('fadeIn').delay(500).addClass('active');
    setTimeout(function(){
      $check.removeClass('fadeIn')
      $check.removeClass('active');
      $plane.removeClass('active');
    },4000)
  };

  $('input[type="radio"]').on('change', function(e){
    var value = $(e.target).val();
    var name = $(e.target).attr('name');

    switch (name) {
      case 'parella':
        value = Number(value);
        break;
      default:
        value = value === 'true';
    }

    if (typeof model[name] !== 'undefined') model[name] = value;

    console.log(model);
  });

  $('.button').on('click tap', function(){
    $plane.addClass('active');
    $.ajax('/api/invitacio', {
      method: 'PUT',
      dataType: 'json',
      data: {
        invitacio: model
      }
    })
    .done(function(data){
      console.log(data);
      success();
    })
    .fail(function(err){
      console.error(err);
    });
  });

  function resize() {
    var ratio = ($(window).width()/600);

    if ($(window).width() < 600) {
      $('#envelope').css('zoom', ratio);

      if ($(window).height() > 800*ratio) {
        console.log('AIAIAIAI');
        $('#envelope').css('margin-top', $(window).height()/ratio - 400);
      }
    }

    if ($(window).height() > 800 && $(window).width() > 600) {
      $('#envelope').css('margin-top', $(window).height() - 400);
    }
  }

  resize();

  $(window).on('resize', resize);

});
