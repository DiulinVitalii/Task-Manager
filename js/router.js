class Router {
  constructor(routes, root) {
    this.routes = routes;
    this.root = document.getElementById(root);
  }

  init() {
    window.addEventListener('hashchange', () => this.hashChange());
    this.hashChange();
  }
  hashChange() {
    if(location.hash.length > 0) {
      this.routes.forEach((r) => {
        if(r.isActiveRoute(location.hash)) {
          this.follow(r.htmlFileName, r.name);
        }
      });
    } else {
      this.routes.forEach((r) => {
        if(r.isHome) {
          this.follow(r.htmlFileName, r.name);
        }
      })
    }
  }
  follow(path, hash) {
    if(hash === 'logout'){
      AjaxRequest.logOut();
    }
    if(hash === 'home') document.querySelector('#app').classList.remove('align-items-center');
    else document.querySelector('#app').classList.add('align-items-center');
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${path}`);
    xhr.onloadend = () => {
      this.root.innerHTML = xhr.responseText;
      if(document.forms[0] && (document.forms[0].classList.contains('login') ||
          document.forms[0].classList.contains('signin') ||
          document.forms[0].classList.contains('addnew') ||
          document.forms[0].classList.contains('edit')
      )) login = new Login(document.forms[0]);
    };
    xhr.onerror = function() {
      console.log(xhr.status);
    };
    xhr.send();
  }
}