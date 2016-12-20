const pathChecker = {
  oriUrl: null,
  baseUrl: null,
  checkUrl: null,
  init: function init(url) {
    this.oriUrl = url;
    this.baseUrl = 'https://www.youtube.com/tv#/';
    this.checkUrl = url.substring(this.baseUrl.length);
    console.log(this.checkUrl);
  },
  includePath: function includePath(partialPath) {
    return this.checkUrl.includes(partialPath);
  }
};

module.exports = pathChecker;
