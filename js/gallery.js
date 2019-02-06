(function() {
	var picturesItemsFragment = createPicturesItemsFragment(window.picturesInfo);
	renderPicturesItems(picturesItemsFragment);

	function createPicturesItemsFragment(picturesInfo) {
		var picturesItemsFragment = document.createDocumentFragment();
		picturesInfo.forEach(function(pictureInfo) {
			picturesItemsFragment.appendChild(createPictureItem(pictureInfo));
		});

		return picturesItemsFragment;
	}

	function createPictureItem(pictureInfo) {
		var pictureItemTemplate = document.querySelector('#picture').content.querySelector('.picture');
		var pictureItem = pictureItemTemplate.cloneNode(true);
		pictureItem.querySelector('.picture__img').src = pictureInfo.url;
		pictureItem.querySelector('.picture__likes').textContent = pictureInfo.likes;
		pictureItem.querySelector('.picture__comments').textContent = pictureInfo.comments.length;

		return pictureItem;
	}

	function renderPicturesItems(picturesItemsFragment) {
		var picturesItems = document.querySelector('.pictures');
		picturesItems.appendChild(picturesItemsFragment);
	}
})();