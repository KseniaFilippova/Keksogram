(function() {
	var URL = 'https://js.dump.academy/kekstagram/data';
	var FILTERED_NEW_PICTURES_COUNT = 10;
	var DEBOUNCE_INTERVAL = 500;
	
	window.backend.load(onSuccess, onError, URL);

	function onSuccess(picturesInfo) {
		renderGallery(picturesInfo);

		var filteredPopularPicturesInfo = picturesInfo.slice();
		var filteredNewPicturesInfo = picturesInfo.slice(0, FILTERED_NEW_PICTURES_COUNT).sort(compareRandom);
		var filteredDiscussedPicturesInfo = picturesInfo.slice().sort(compareDiscussed);

		var filterPopularButton = document.querySelector('#filter-popular');
		var filterNewButton = document.querySelector('#filter-new');
		var filterDiscussedButton = document.querySelector('#filter-discussed');

		filterPopularButton.addEventListener('click', onfilterPopularButtonClick);
		filterNewButton.addEventListener('click', onfilterNewButtonClick);
		filterDiscussedButton.addEventListener('click', onfilterDiscussedButtonClick);

		var imgFilters = document.querySelector('.img-filters');
		imgFilters.classList.remove('img-filters--inactive');

		function onfilterPopularButtonClick() {
			switchActiveButton(filterPopularButton, filterNewButton, filterDiscussedButton);
			updateGallery(filteredPopularPicturesInfo);
		}

		function onfilterNewButtonClick() {
			switchActiveButton(filterNewButton, filterPopularButton, filterDiscussedButton);
			updateGallery(filteredNewPicturesInfo);
		}

		function onfilterDiscussedButtonClick() {
			switchActiveButton(filterDiscussedButton, filterPopularButton, filterNewButton);
			updateGallery(filteredDiscussedPicturesInfo);
		}
	}

	function compareRandom(a, b) {
 		return Math.random() - 0.5;
	}

	function compareDiscussed(a, b) {
		return b.comments.length - a.comments.length;
	}

	function switchActiveButton(activeButton, firstUnactiveButton, secondUnactiveButton) {
		if (firstUnactiveButton.classList.contains('img-filters__button--active')) {
			firstUnactiveButton.classList.remove('img-filters__button--active');
		} else if (secondUnactiveButton.classList.contains('img-filters__button--active')) {
			secondUnactiveButton.classList.remove('img-filters__button--active');
		}

		if (!activeButton.classList.contains('img-filters__button--active')) {
			activeButton.classList.add('img-filters__button--active');
		}
	}

	var timerID = null;
	function updateGallery(picturesInfo) {
		if (timerID) {
			clearTimeout(timerID);
		}
		timerID = setTimeout(showFilteredGallery, DEBOUNCE_INTERVAL, picturesInfo);
	}

	function showFilteredGallery(filteredPicturesInfo) {
		removeGallery();
		renderGallery(filteredPicturesInfo);
	}

	function removeGallery() {
		var picturesItems = document.querySelectorAll('.picture');
		picturesItems.forEach(function(pictureItem) {
			pictureItem.remove();
		});
	}

	function renderGallery(picturesInfo) {
		var picturesItems = createPicturesItems(picturesInfo);
		var picturesItemsFragment = createPicturesItemsFragment(picturesItems);
		renderPicturesItems(picturesItemsFragment);

		for (var i = 0; i < picturesItems.length; i++) {
			addPictureEventListener(picturesInfo[i], picturesItems[i]);
		}
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

	function onError(errorMessage) {
		window.openMessageDialog(errorMessage);
	}
})();