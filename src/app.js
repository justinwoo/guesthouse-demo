var Router = require('director').Router;
var $ = require('jquery');

var handleLogin = function () {
  $('.carousel-heading').text('Login');
};

var handleRegister = function () {
  $('.carousel-heading').text('Create your account');
};

// hide the sections that we aren't using for this path.
// kind of messy, but this can be redone later with a library.
var handleBeforeRoute = function () {
  var pathname = window.location.pathname;
  var sections = $('section');
  $('section').each(function (i, ele) {
    var route = $(ele).data('route');
    if (pathname.indexOf(route) === -1) {
      $(ele).hide();
    }
  });
};

routes = {
  '/login': handleLogin,
  '/register': handleRegister
};

router = Router(routes);

router.configure({
  before: handleBeforeRoute,
  html5history: true
});

router.init();
