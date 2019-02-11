(function() {
	var MIN_COMMENT_AUTHOR_PICTURE_NUMBER = 1;
	var MAX_COMMENT_AUTHOR_PICTURE_NUMBER = 6;

	window.renderBigPictureItem = function(pictureInfo) {
		var bigPictureItem = document.querySelector('.big-picture');

		bigPictureItem.querySelector('.big-picture__img').querySelector('img').src = pictureInfo.url;
		bigPictureItem.querySelector('.likes-count').textContent = pictureInfo.likes;
		bigPictureItem.querySelector('.comments-count').textContent = pictureInfo.comments.length;
		bigPictureItem.querySelector('.social__caption').textContent = pictureInfo.description;

		var socialComments = bigPictureItem.querySelector('.social__comments');
		socialComments.appendChild(createCommentsFragment(pictureInfo.comments));

		hideCommentCounter();
		hideCommentLoader();

		bigPictureItem.classList.remove('hidden');

		var bigPictureItemCancel = document.querySelector('.big-picture__cancel');
		bigPictureItemCancel.addEventListener('click', function() {
			var socialCommentsItems = socialComments.querySelectorAll('.social__comment');

			for (var i = 0; i < socialCommentsItems.length; i++) {
				socialComments.removeChild(socialCommentsItems[i]);
			}

			bigPictureItem.classList.add('hidden');
		});
	}

	function createCommentsFragment(comments) {
		var commentsFragment = document.createDocumentFragment();

		comments.forEach(function(comment) {
			commentsFragment.appendChild(createCommentItem(comment));
		});

		return commentsFragment;
	}

	function createCommentItem(comment) {
		var commentItem = document.createElement('li');
		commentItem.classList.add('social__comment');

		var commentAuthorImg = document.createElement('img');
		commentAuthorImg.classList.add('social__picture');
		commentAuthorImg.src = comment.avatar;
		commentAuthorImg.alt = 'Аватар комментатора фотографии';
		commentAuthorImg.width = '35';
		commentAuthorImg.height = '35';

		var commentText = document.createElement('p');
		commentText.classList.add('social__text');
		commentText.textContent = comment.message;

		commentItem.appendChild(commentAuthorImg);
		commentItem.appendChild(commentText);

		return commentItem;
	}

	function hideCommentCounter() {
		var commentCounter = document.querySelector('.social__comment-count');
		commentCounter.classList.add('visually-hidden');
	}

	function hideCommentLoader() {
		var commentLoader = document.querySelector('.social__comments-loader');
		commentLoader.classList.add('visually-hidden');
	}
})();