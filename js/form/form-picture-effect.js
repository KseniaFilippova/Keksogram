'use strict';

(function() {
	var EFFECT_LEVEL_INPUT_DEFAULT_VALUE = 100;

	var uploadPicture = document.querySelector('.img-upload__preview img');
	var effectLevelControl = document.querySelector('.img-upload__effect-level');
	var effectLevelValueInput = effectLevelControl.querySelector('.effect-level__value');
	var effectLevelPin = effectLevelControl.querySelector('.effect-level__pin');
	var effectLevelLine = effectLevelControl.querySelector('.effect-level__line');
	var effectLevelDepthLine = effectLevelControl.querySelector('.effect-level__depth');

	window.formPictureEffect = {
		switch: function(evt) {
			if (evt.target.classList.contains('effects__radio')) {
				updateControl(EFFECT_LEVEL_INPUT_DEFAULT_VALUE);
				uploadPicture.style.filter = getFilter(evt.target.id, EFFECT_LEVEL_INPUT_DEFAULT_VALUE);
				effectLevelValueInput.value = EFFECT_LEVEL_INPUT_DEFAULT_VALUE;

				if (evt.target.id === 'effect-none') {
					effectLevelControl.classList.add('hidden');
				} else {
					effectLevelControl.classList.remove('hidden');
				}
			}
		},
		updateByMousemove: function(evt) {
			document.addEventListener('mousemove', onDocumentMousemove);
			document.addEventListener('mouseup', onDocumentMouseup);
		},
		updateByLineClick: function(evt) {
			changeEffectLevel(evt.clientX);
		}
	}

	function onDocumentMousemove(evt) {
		changeEffectLevel(evt.clientX);
	}

	function onDocumentMouseup(evt) {
		document.removeEventListener('mousemove', onDocumentMousemove);
		document.removeEventListener('mouseup', onDocumentMouseup);
	}

	function changeEffectLevel(x) {
		var effectLevelValue = getEffectLevelValue(x);

		updateControl(effectLevelValue);
		uploadPicture.style.filter = getFilter(getActiveFilterId(), effectLevelValue);
		effectLevelValueInput.value = effectLevelValue;
	}

	function getEffectLevelValue(x) {
		var effectLevelLineLeftX = effectLevelLine.getBoundingClientRect().left;
		var effectLevelLineRightX = effectLevelLine.getBoundingClientRect().right;

		var relativeX;
		if (x < effectLevelLineLeftX) {
			 relativeX = 0;
		} else if (x > effectLevelLineRightX) {
			relativeX = effectLevelLine.clientWidth;
		} else {
			relativeX = (x - effectLevelLineLeftX);
		}

		return Math.round(relativeX / effectLevelLine.clientWidth * 100);
	}

	function updateControl(value) {
		effectLevelPin.style.left = value + '%';
		effectLevelDepthLine.style.width = value + '%';
	}

	function getFilter(id, value) {
		switch (id) {
			case 'effect-chrome':
				return `grayscale(${value / 100})`;
			case 'effect-sepia':
				return `sepia(${value / 100})`;
			case 'effect-marvin':
				return `invert(${value}%)`;
			case 'effect-phobos':
				return `blur(${value / 20}px)`;
			case 'effect-heat':
				return `brightness(${1 + value / 50})`;
			case 'effect-none':
				return 'none';
		}
	}
	function getActiveFilterId() {
		var previewPictures = document.querySelectorAll('.effects__radio');
		for (var i = 0; i < previewPictures.length; i++) {
			if (previewPictures[i].checked) {
				return previewPictures[i].id;
			}
		}
	}
})();