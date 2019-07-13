var timerId = setTimeout(function tick() {
    alert( "тик" );
    timerId = setTimeout(tick, 2000);
  }, 2000);