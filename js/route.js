class Route {
  constructor(name, htmlFileName, isHome) {
    this.name = name;
    this.htmlFileName = htmlFileName;
    this.isHome = isHome;
  }

  isActiveRoute(path) {
    return path.replace('#', '') === this.name;
  }
}