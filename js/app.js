const router = new Router([
  new Route('login', 'views/login.html', true),
  new Route('signin', 'views/signin.html'),
  new Route('addnew', 'views/addnew.html'),
  new Route('edit', 'views/edit.html'),
  new Route('home', 'views/home.html'),
  new Route('logout', 'views/login.html'),

], 'app');
router.init();


