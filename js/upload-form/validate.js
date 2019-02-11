(function() {
	var MAX_HASHTAGS_COUNT = 5;
	var MAX_HASHTAG_LENGTH = 20;

	var textHashtagsInput = document.querySelector('.text__hashtags');
	var imgUploadSubmit = document.querySelector('.img-upload__submit');
	
	imgUploadSubmit.addEventListener('click', function() {
		var hashtagsString = textHashtagsInput.value;
		var customErrorMessage = validateHashtags(hashtagsString);

		if (customErrorMessage != null) {
			textHashtagsInput.setCustomValidity(customErrorMessage);
			textHashtagsInput.style.outline = 'red auto 5px';
		}
	});

	textHashtagsInput.addEventListener('input', function() {
		if (textHashtagsInput.validity.customError !== '') {
			textHashtagsInput.setCustomValidity('');
			textHashtagsInput.style.outline = '-webkit-focus-ring-color auto 5px';
		}
	});

	function validateHashtags(hashtagsString) {
		if (hashtagsString === '') {
			return null;
		}

		var hashtagsArr = hashtagsString.trim().split(' ');
		for (var i = 0; i < hashtagsArr.length; i++) {
			var hashtag = hashtagsArr[i];

			if (hashtag.charAt(0) !== '#') {
				return 'Хэш-тег должен начинаться с символа # (решётка)';
			} else if (hashtag === '#') {
				return 'Хеш-тег не может состоять только из одной решётки';
			} else if (hashtag.length > MAX_HASHTAG_LENGTH) {
				return 'Максимальная длина одного хэш-тега 20 символов, включая решётку';
			}
		}

		if (!areHashtagsUnique(hashtagsArr)) {
			return 'Один и тот же хэш-тег не может быть использован дважды';
		}

		if (hashtagsArr.length > MAX_HASHTAGS_COUNT) {
			return 'Hельзя указать больше пяти хэш-тегов';
		}

		return null;
	}

	function areHashtagsUnique(hashtagsArr) {
		for (var i = 0; i < hashtagsArr.length - 1; i++) {
			firstLowerCaseHashtag = hashtagsArr[i].toLowerCase();

			for (var j = i + 1; j < hashtagsArr.length; j++) {
				secondLowerCaseHashtag = hashtagsArr[j].toLowerCase();

				if (firstLowerCaseHashtag === secondLowerCaseHashtag) {
					return false;
				}
			}
		}

		return true;
	}
})();