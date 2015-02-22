### BlobImage Helper and Store with [MinDB](https://github.com/iwillwen/mindb)

### Example
```html
<script type="type/javascript" src="/path/to/script/manager.js"></script>
```

### API

#### addImage(BlobImage)
Add a BlobImage into the manager and return the id of it.

```js
var id = BlobImageManager.addImage(blobImage);
```

#### createImage(url)
Create a BlobImage and put it in the manager

```js
var blobImage = BlobImageManager.createImage('http://iwillwen.u.qiniudn.com/mindb.png');
```

#### storeImageCache(id, callback)
Store the BlobImage with MinDB.

```js
BlobImageManager.storeImageCache(id, function(err) {
  if (err) {
    return console.error(err);
  }

  // The BlobImage is in the store now.
});
```

#### getImageCache(id, callback)
Fetch the BlobImage from the store.

```js
BlobImageManager.getImageCache(id, function(err, blobImage) {
  if (err) {
    return console.error(err);
  }

  document.body.appendChild(blobImage.element);
});
```

#### removeImage(id)
Remove the BlobImage from the store and release it from the buffer.

```js
BlobImageManager.removeImage(id);
```

#### removeImageCache(id, callback)
Remove the BlobImage's cache from the store but not release it.

```js
BlobImageManager.removeImageCache(id, function(err) {
  if (err) {
    return console.error(err);
  }

  // ...
});
```