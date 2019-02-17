'use strict';

(function() {
	var MAX_HASHTAGS_COUNT = 5;
	var MAX_HASHTAG_LENGTH = 20;

	window.validateHashtags = function(hashtags) {
		if (hashtags === '') {
			return null;
		}

		var hashtagsArr = hashtags.trim().split(' ');
		for (var i = 0; i < hashtagsArr.length; i++) {
			var hashtag = hashtagsArr[i];

			if (hashtag.charAt(0) !== '#') {
				return 'Хэш-тег должен начинаться с символа # (решётка)';
			}

			if (hashtag === '#') {
				return 'Хеш-тег не может состоять только из одной решётки';
			}
			
			if (hashtag.length > MAX_HASHTAG_LENGTH) {
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
			var firstLowerCaseHashtag = hashtagsArr[i].toLowerCase();

			for (var j = i + 1; j < hashtagsArr.length; j++) {
				var secondLowerCaseHashtag = hashtagsArr[j].toLowerCase();

				if (firstLowerCaseHashtag === secondLowerCaseHashtag) {
					return false;
				}
			}
		}

		return true;
	}
})();