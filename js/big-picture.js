(function() {
	var MIN_COMMENT_AUTHOR_PICTURE_NUMBER = 1;
	var MAX_COMMENT_AUTHOR_PICTURE_NUMBER = 6;
	var MAX_RENDERED_COMMENTS_COUNT = 5;

	var bigPictureItem = document.querySelector('.big-picture');
	var socialComments = bigPictureItem.querySelector('.social__comments');
	var bigPictureItemCancel = bigPictureItem.querySelector('.big-picture__cancel');

	window.renderBigPictureItem = function(pictureInfo) {
		bigPictureItem.querySelector('.big-picture__img').querySelector('img').src = pictureInfo.url;
		bigPictureItem.querySelector('.likes-count').textContent = pictureInfo.likes;
		bigPictureItem.querySelector('.comments-count').textContent
			= getCommentsCountText(pictureInfo.comments.length);
		bigPictureItem.querySelector('.social__caption').textContent = pictureInfo.description;

		renderComments(pictureInfo.comments);

		bigPictureItemCancel.addEventListener('click', onBigPictureItemCancelClick);
		document.addEventListener('keydown', onDocumentKeydown);

		document.body.classList.add('modal-open');
		bigPictureItem.classList.remove('hidden');
	}

	function getCommentsCountText(commentsCount) {
		var commentsCountString = commentsCount.toString();

		var lastTwoNumbers = parseInt(commentsCountString.slice(-2));
		if (lastTwoNumbers >= 11 && lastTwoNumbers <= 14) {
			return commentsCount + ' комментариев';
		}

		var lastNumber = parseInt(commentsCountString.slice(-1));
		if (lastNumber === 1) {
			return commentsCount + ' комментарий';
		} else if (lastNumber >= 2 && lastNumber <= 4) {
			return commentsCount + ' комментария';
		} else {
			return commentsCount + ' комментариeв';
		}
	}

	function renderComments(comments) {
		var commentsPool = comments.slice();
		socialComments.appendChild(createCommentsFragment(commentsPool));

		if (commentsPool.length !== 0) {
			var commentsLoader = document.querySelector('.social__comments-loader');
			commentsLoader.addEventListener('click', onCommentsLoaderClick);
			commentsLoader.classList.remove('hidden');

			function onCommentsLoaderClick() {
				socialComments.appendChild(createCommentsFragment(commentsPool));

				if (commentsPool.length === 0) {
					commentsLoader.classList.add('hidden');
					commentsLoader.removeEventListener('click', onCommentsLoaderClick);
				}
			}
		}
	}

	function createCommentsFragment(commentsPool) {
		var comments = commentsPool.splice(0, MAX_RENDERED_COMMENTS_COUNT);
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

	function onBigPictureItemCancelClick() {
		closeBigPictureItem();
	}

	function onDocumentKeydown(evt) {
		if (window.keyboardUtils.isEscKeyCode(evt)) {
			closeBigPictureItem();
		}
	}

	function closeBigPictureItem() {
		var socialCommentsItems = socialComments.querySelectorAll('.social__comment');

		for (var i = 0; i < socialCommentsItems.length; i++) {
			socialComments.removeChild(socialCommentsItems[i]);
		}

		bigPictureItemCancel.removeEventListener('click', onBigPictureItemCancelClick);
		document.removeEventListener('keydown', onDocumentKeydown);

		document.body.classList.remove('modal-open');
		bigPictureItem.classList.add('hidden');
	}
})();