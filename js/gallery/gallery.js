'use strict';

(function() {
	var URL = 'https://js.dump.academy/kekstagram/data';
	var FILTERED_NEW_PICTURES_COUNT = 10;
	var DEBOUNCE_INTERVAL = 500;

	var timerID = null;
	
	window.backend.load(onSuccessLoad, onErrorLoad, URL);

	function onSuccessLoad(picturesInfo) {
		var filterButtons = Array.from(document.querySelectorAll('.img-filters__button'));
		var activeFilterButton = filterButtons.find(function(filterButton) {
			return filterButton.classList.contains('img-filters__button--active');
		});
		renderGallery(createFilteredPicturesInfo(picturesInfo.slice(), activeFilterButton.id));

		filterButtons.forEach(function(filterButton) {
			filterButton.addEventListener('click', onFilterButtonClick);
		});

		var imgFilters = document.querySelector('.img-filters');
		imgFilters.classList.remove('img-filters--inactive');

		function onFilterButtonClick(evt) {
			switchActiveFilterButton(evt.target);
			debounceUpdateGallery(createFilteredPicturesInfo(picturesInfo.slice(), evt.target.id));
		}
	}

	function switchActiveFilterButton(activeFilterButton) {
		var filterButtons = document.querySelectorAll('.img-filters__button');
		filterButtons.forEach(function(filterButton) {
			if (filterButton.classList.contains('img-filters__button--active')) {
				filterButton.classList.remove('img-filters__button--active');
			}
		});

		activeFilterButton.classList.add('img-filters__button--active');
	}

	function createFilteredPicturesInfo(picturesInfo, filterButtonId) {
		switch (filterButtonId) {
			case 'filter-popular':
				return picturesInfo;
			case 'filter-new':
				picturesInfo.sort(window.mathUtils.compareRandom);
				picturesInfo.length = FILTERED_NEW_PICTURES_COUNT;
				return picturesInfo;
			case 'filter-discussed':
				return picturesInfo.sort(compareCommentsLength);
		}	
	}

	function compareCommentsLength(a, b) {
		return b.comments.length - a.comments.length;
	}

	function debounceUpdateGallery(picturesInfo) {
		if (timerID) {
			clearTimeout(timerID);
		}
		timerID = setTimeout(updateGallery, DEBOUNCE_INTERVAL, picturesInfo);
	}

	function updateGallery(picturesInfo) {
		removeGallery();
		renderGallery(picturesInfo);
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
			window.renderModalPicture(pictureInfo);
		});
	}

	function onErrorLoad(errorMessage) {
		window.openMessageDialog(errorMessage);
	}
})();