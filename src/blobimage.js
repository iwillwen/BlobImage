/**
 * BlobImage - Load images as blob and store them in buffer of the bowser
 *
 * 
 */

(function(undefined) {
  var Blob = window.Blob || window.WebkitBlob;
  var URL = window.URL || window.webkitURL;

  function BlobImage(src) {
    if (!(this instanceof BlobImage)) return new BlobImage(src);

    this.url = src;
    this.element = new Image();
    this.blob = null;
    this.blobURL = null;
    this.onload = function() {};

    this.load();
  }
  BlobImage.prototype.load = function() {
    var self = this;

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'arraybuffer';
    xhr.open('GET', self.url, true);

    xhr.onload = function(evt) {
      var arrayBuffer = new Uint8Array(this.response);
      var mime = xhr.getResponseHeader('Content-Type');
      mime = mime ? mime.split(';')[0] : 'image/jpeg';

      self.blob = new Blob([ arrayBuffer ], { type: mime });
      var url = URL.createObjectURL(self.blob);
      self.blobURL = self.element.src = url;

      self.onload();
    };
    xhr.onerror = function(evt) {
      return console.error(evt.error);
    };
    xhr.send();
  };
  BlobImage.prototype.toDataURL = function(callback) {
    var reader = new window.FileReader();
    reader.onloadend = function() {
      var dataURL = reader.result;
      return callback(null, dataURL);
    };
    reader.onerror = callback;
    reader.readAsDataURL(this.blob);
  };
  BlobImage.prototype.release = function() {
    URL.revokeObjectURL(this.blobURL);
  };

  var hasDefine  = 'undefined' !== typeof define;

  if (hasDefine && define.amd) {
    define(function() {
      return BlobImage;
    });
  } else {
    this.BlobImage = BlobImage;
  }
})();