'use strict';

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
	var form = document.querySelector('.img-upload__form');
	var scaleSmallerControl = imgEditor.querySelector('.scale__control--smaller');
	var scaleBiggerControl = imgEditor.querySelector('.scale__control--bigger');
	var scaleValueInput = imgEditor.querySelector('.scale__control--value');
	var effectsList = imgEditor.querySelector('.effects__list');
	var effectLevelControl = imgEditor.querySelector('.img-upload__effect-level');
	var effectLevelPin = effectLevelControl.querySelector('.effect-level__pin');
	var effectLevelLine = effectLevelControl.querySelector('.effect-level__line');
	var imgUploadSubmit = document.querySelector('.img-upload__submit');
	var textHashtagsInput = document.querySelector('.text__hashtags');

	function openImgEditor() {
		imgEditorCancel.addEventListener('click', onImgEditorCancelClick);
		document.addEventListener('keydown', onDocumentKeydown);
		form.addEventListener('submit', onFormSubmit);
		scaleSmallerControl.addEventListener('click', onSmallerControlClick);
		scaleBiggerControl.addEventListener('click', onBiggerControlClick);
		effectsList.addEventListener('click', onListClick);
		effectLevelPin.addEventListener('mousedown', onPinMousedown);
		effectLevelLine.addEventListener('click', onLineClick);
		imgUploadSubmit.addEventListener('click', onImgUploadSubmitClick);
		textHashtagsInput.addEventListener('input', onTextHashtagsInputInput);

		imgEditor.classList.remove('hidden');
	}

	function closeImgEditor() {
		imgEditor.classList.add('hidden');

		resetForm();

		imgEditorCancel.removeEventListener('click', onImgEditorCancelClick);
		document.removeEventListener('keydown', onDocumentKeydown);
		form.removeEventListener('submit', onFormSubmit);
		scaleSmallerControl.removeEventListener('click', onSmallerControlClick);
		scaleBiggerControl.removeEventListener('click', onBiggerControlClick);
		effectsList.removeEventListener('click', onListClick);
		effectLevelPin.removeEventListener('mousedown', onPinMousedown);
		effectLevelLine.removeEventListener('click', onLineClick);
		imgUploadSubmit.removeEventListener('click', onImgUploadSubmitClick);
		textHashtagsInput.removeEventListener('input', onTextHashtagsInputInput);
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
		var descriptionTextarea = document.querySelector('.text__description');
		descriptionTextarea.value = '';

		textHashtagsInput.value = '';
		if (textHashtagsInput.classList.contains('hashtags-invalid')) {
			textHashtagsInput.classList.remove('hashtags-invalid');
		}
	}

	function onImgEditorCancelClick() {
		closeImgEditor();
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

	function onListClick(evt) {
		window.formPictureEffect.switch(evt);
	}

	function onPinMousedown(evt) {
		window.formPictureEffect.updateByMousemove(evt);
	}

	function onLineClick(evt) {
		window.formPictureEffect.updateByLineClick(evt);
	}

	function onImgUploadSubmitClick() {
		var customErrorMessage = window.validateHashtags(textHashtagsInput.value);

		if (customErrorMessage != null) {
			textHashtagsInput.setCustomValidity(customErrorMessage);
			textHashtagsInput.classList.add('hashtags-invalid');
		}
	}

	function onTextHashtagsInputInput() {
		if (textHashtagsInput.validity.customError !== '') {
			textHashtagsInput.setCustomValidity('');
			textHashtagsInput.classList.remove('hashtags-invalid');
		}
	}

})();