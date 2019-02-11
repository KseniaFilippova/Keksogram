(function() {
	var URL = 'https://js.dump.academy/kekstagram/data';
	
	window.backend.load(onSuccess, onError, URL);

	function onSuccess(picturesInfo) {
		var picturesItems = createPicturesItems(picturesInfo);
		var picturesItemsFragment = createPicturesItemsFragment(picturesItems);
		renderPicturesItems(picturesItemsFragment);

		for (var i = 0; i < picturesItems.length; i++) {
			addPictureEventListener(picturesInfo[i], picturesItems[i]);
		}
	}

	function onError(errorMessage) {
		window.openMessageDialog(errorMessage);
	}

	function createPicturesItemsFragment(picturesItems) {
		var picturesItemsFragment = document.createDocumentFragment();
		picturesItems.forEach(function(pictureItem) {
			picturesItemsFragment.appendChild(pictureItem);
		});

		return picturesItemsFragment;
	}

	function createPicturesItems(picturesInfo) {
		var picturesItems = [];
		picturesInfo.forEach(function(pictureInfo) {
			picturesItems.push(createPictureItem(pictureInfo));
		});

		return picturesItems;
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
		var picturesItemsContainer = document.querySelector('.pictures');
		picturesItemsContainer.appendChild(picturesItemsFragment);
	}

	function addPictureEventListener(pictureInfo, pictureElement) {
		pictureElement.addEventListener('click', function() {
			window.renderBigPictureItem(pictureInfo);
		});
	}
})();