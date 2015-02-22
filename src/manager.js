;(function(undefined) {
  if ('undefined' == typeof min) {
    throw new Error('MinDB is required.');
  }

  if ('undefined' == typeof BlobImage) {
    throw new Error('BlobImage is required.');
  }

  var BlobImageManager = {
    images: {},

    addImage: function(blobImage) {
      var id = Math.random().toString(32).substr(2);
      blobImage.id = id;

      this.images[id] = blobImage;
      return id;
    },

    createImage: function(url) {
      var blobImage = new BlobImage(url);
      this.addImage(blobImage);

      return blobImage;
    },

    storeImageCache: function(id, callback) {
      var self = this;
      var blobImage = self.images[id];

      blobImage.toDataURL(function(err, dataURL) {
        if (err) {
          return callback(err);
        }

        min.multi()
          .sadd('img-caches', blobImage.id)
          .set('img-cache:' + blobImage.id, dataURL)
          .exec(callback);
      });
    },

    getImageCache: function(id, callback) {
      var self = this;

      min.sismember('img-caches', id)
        .then(function(reply) {
          if (reply == 1) {
            return min.get('img-cache:' + id);
          }

          return callback(new Error('Image cache not found'));
        })
        .then(function(dataURL) {
          var blobImage = new BlobImage(dataURL);
          self.images[id] = blobImage;

          callback(null, blobImage);
        }, callback);
    },

    removeImage: function(id) {
      var self = this;

      self.removeImageCache(id, function(err) {
        if (err) {
          console.error(err);
        }

        if (self.images[id]) {
          var blobImage = self.images[id];
          blobImage.release();

          delete self.images[id];
        }
      });
    },

    removeImageCache: function(id, callback) {
      min.multi()
        .srem('img-caches', id)
        .del('img-cache:' + id)
        .exec(callback);
    }
  };

  var hasDefine  = 'undefined' !== typeof define;

  if (hasDefine && define.amd) {
    define(function() {
      return BlobImageManager;
    });
  } else {
    this.BlobImageManager = BlobImageManager;
  }
})();