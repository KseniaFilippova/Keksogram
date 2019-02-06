(function() {
	var EFFECT_LEVEL_INPUT_DEFAULT_VALUE = 100;
	var DEFAULT_SCALE_VALUE = 100;
	var MAX_SCALE_VALUE = 100;
	var MIN_SCALE_VALUE = 25;
	var SCALE_STEP = 25;

	var fileInput = document.querySelector('#upload-file');
	fileInput.addEventListener('change', function() {
		openImgEditor();
	});

	var imgEditor = document.querySelector('.img-upload__overlay');
	var imgEditorCancel = imgEditor.querySelector('.img-upload__cancel');
	imgEditorCancel.addEventListener('click', function() {
		closeImgEditor();
		fileInput.value = '';
	});

	var effectsList = imgEditor.querySelector('.effects__list');
	var uploadPicture = imgEditor.querySelector('.img-upload__preview img');
	var effectLevelControl = imgEditor.querySelector('.img-upload__effect-level');
	var effectLevelPin = effectLevelControl.querySelector('.effect-level__pin');
	var effectLevelLine = effectLevelControl.querySelector('.effect-level__line');
	var effectLevelValueInput = effectLevelControl.querySelector('.effect-level__value');
	var effectLevelDepthLine = effectLevelControl.querySelector('.effect-level__depth');
	var scaleSmallerControl = imgEditor.querySelector('.scale__control--smaller');
	var scaleBiggerControl = imgEditor.querySelector('.scale__control--bigger');
	var scaleValueInput = imgEditor.querySelector('.scale__control--value');

	function openImgEditor() {
		imgEditor.classList.remove('hidden');
		effectLevelPin.addEventListener('mousedown', onEffectLevelPinMousedown);
		effectLevelLine.addEventListener('click', onEffectLevelLineClick);
		effectsList.addEventListener('click', onEffectsListClick);
		scaleSmallerControl.addEventListener('click', onScaleSmallerControlClick);
		scaleBiggerControl.addEventListener('click', onScaleBiggerControlClick);
		document.addEventListener('keydown', onDocumentKeydown);
	}

	function closeImgEditor() {
		imgEditor.classList.add('hidden');
		uploadPicture.style.filter = 'none';
		effectLevelControl.classList.add('hidden');
		applyScaleInputValue(DEFAULT_SCALE_VALUE);
		effectLevelPin.removeEventListener('mousedown', onEffectLevelPinMousedown);
		effectLevelLine.removeEventListener('click', onEffectLevelLineClick);
		effectsList.removeEventListener('click', onEffectsListClick);
		scaleSmallerControl.removeEventListener('click', onScaleSmallerControlClick);
		scaleBiggerControl.removeEventListener('click', onScaleBiggerControlClick);
		document.removeEventListener('keydown', onDocumentKeydown);
	}

	function onEffectLevelPinMousedown() {
		document.addEventListener('mousemove', onDocumentMousemove);
		document.addEventListener('mouseup', onDocumentMouseup);
	}

	function onDocumentMousemove(evt) {
		changeEffectLevel(evt.clientX);
	}

	function onDocumentMouseup(evt) {
		document.removeEventListener('mousemove', onDocumentMousemove);
		document.removeEventListener('mouseup', onDocumentMouseup);
	}

	function onEffectLevelLineClick(evt) {
		changeEffectLevel(evt.clientX);
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

	function getActiveFilterId() {
		var previewPictures = document.querySelectorAll('.effects__radio');
		for (var i = 0; i < previewPictures.length; i++) {
			if (previewPictures[i].checked) {
				return previewPictures[i].id;
			}
		}
	}

	function onEffectsListClick(evt) {
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

	function onScaleSmallerControlClick() {
		var value = parseInt(scaleValueInput.value);
		var newValue = value - SCALE_STEP;

		if (newValue >= MIN_SCALE_VALUE) {
			applyScaleInputValue(newValue);
		}
	}

	function onScaleBiggerControlClick() {
		var value = parseInt(scaleValueInput.value);
		var newValue = value + SCALE_STEP;

		if (newValue <= MAX_SCALE_VALUE) {
			applyScaleInputValue(newValue);
		}
	}

	function applyScaleInputValue(value) {
		scaleValueInput.value = value + '%';
		uploadPicture.style.transform = `scale(${value / 100})`;
	}

	function onDocumentKeydown(evt) {
		var target = evt.target;

		if (window.keyboardUtils.isEscKeyCode(evt) &&
			target.className !== 'text__hashtags' &&
			target.className !== 'text__description') {
			closeImgEditor();
		}
	}
})();