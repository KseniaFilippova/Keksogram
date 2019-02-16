(function() {
	var URL = 'https://js.dump.academy/kekstagram';
	var DEFAULT_SCALE_VALUE = 100;

	var fileInput = document.querySelector('#upload-file');
	var uploadPicture = document.querySelector('.img-upload__preview img');
	fileInput.addEventListener('change', function() {
		openImgEditor();
		window.setUploadPictureSrc(fileInput, uploadPicture);
	});

	var imgEditor = document.querySelector('.img-upload__overlay');
	var imgEditorCancel = imgEditor.querySelector('.img-upload__cancel');
	imgEditorCancel.addEventListener('click', function() {
		closeImgEditor();
	});

	var form = document.querySelector('.img-upload__form');
	var scaleValueInput = imgEditor.querySelector('.scale__control--value');
	var scaleSmallerControl = imgEditor.querySelector('.scale__control--smaller');
	var scaleBiggerControl = imgEditor.querySelector('.scale__control--bigger');
	var effectsList = imgEditor.querySelector('.effects__list');
	var effectLevelControl = imgEditor.querySelector('.img-upload__effect-level');
	var effectLevelPin = effectLevelControl.querySelector('.effect-level__pin');
	var effectLevelLine = effectLevelControl.querySelector('.effect-level__line');

	function openImgEditor() {
		imgEditor.classList.remove('hidden');

		document.addEventListener('keydown', onDocumentKeydown);
		form.addEventListener('submit', onFormSubmit);
		scaleSmallerControl.addEventListener('click', onSmallerControlClick);
		scaleBiggerControl.addEventListener('click', onBiggerControlClick);
		effectsList.addEventListener('click', window.formEffects.onListClick);
		effectLevelPin.addEventListener('mousedown', window.formEffects.onPinMousedown);
		effectLevelLine.addEventListener('click', window.formEffects.onLineClick);
	}

	function closeImgEditor() {
		imgEditor.classList.add('hidden');

		resetForm();

		document.removeEventListener('keydown', onDocumentKeydown);
		form.removeEventListener('submit', onFormSubmit);
		scaleSmallerControl.removeEventListener('click', onSmallerControlClick);
		scaleBiggerControl.removeEventListener('click', onBiggerControlClick);
		effectsList.removeEventListener('click', window.formEffects.onListClick);
		effectLevelPin.removeEventListener('mousedown', window.formEffects.onPinMousedown);
		effectLevelLine.removeEventListener('click', window.formEffects.onLineClick);
	}

	function resetForm() {
		var defaultPreviewPicture = imgEditor.querySelector('#effect-none');
		defaultPreviewPicture.checked = true;

		uploadPicture.style.transform = `scale(${DEFAULT_SCALE_VALUE / 100})`;
		scaleValueInput.value = DEFAULT_SCALE_VALUE + '%';

		uploadPicture.style.filter = 'none';
		effectLevelControl.classList.add('hidden');

		fileInput.value = '';

		clearFormData();
	}

	function clearFormData() {
		var textHashtagsInput = document.querySelector('.text__hashtags');
		textHashtagsInput.value = '';

		var descriptionTextarea = document.querySelector('.text__description');
		descriptionTextarea.value = '';
	}

	function onDocumentKeydown(evt) {
		var target = evt.target;

		if (window.keyboardUtils.isEscKeyCode(evt) &&
			target.className !== 'text__hashtags' &&
			target.className !== 'text__description') {
			closeImgEditor();
		}
	}

	function onFormSubmit(evt) {
		window.backend.save(onSuccess, onError, new FormData(form), URL);
		evt.preventDefault();
	}

	function onSuccess() {
		closeImgEditor();
		window.openMessageDialog();
	}

	function onError(errorMessage) {
		window.openMessageDialog(errorMessage);
	}

	function onSmallerControlClick() {
		window.scale.decreaseScale(scaleValueInput, uploadPicture);
	}

	function onBiggerControlClick() {
		window.scale.increaseScale(scaleValueInput, uploadPicture);
	}
})();