var PICTURES_QUANTITY = 25;
var MIN_PICTURE_NUMBER = 1;
var MAX_PICTURE_NUMBER = 25;
var MIN_LIKES_QUANTITY = 15;
var MAX_LIKES_QUANTITY = 200;
var MIN_COMMENTS_QUANTITY = 1;
var MAX_COMMENTS_QUANTITY = 2;
var MIN_COMMENT_AUTHOR_PICTURE_NUMBER = 1;
var MAX_COMMENT_AUTHOR_PICTURE_NUMBER = 6;

var COMMENTS = [
	'Всё отлично!',
	'В целом всё неплохо. Но не всё.',
	'Ну такоооое себе',
	'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
	'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
	'А где Ронни-красавчик?((',
	'Как можно было поймать такой неудачный момент?!'
];

var DESCRIPTIONS = [
	'Тестим новую камеру!',
	'Затусили с друзьями на море',
	'Как же круто тут кормят',
	'Отдыхаем...',
	'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
	'Вот это тачка!'
];

var randomPicturesInfo = createRandomPicturesInfo(PICTURES_QUANTITY);
var picturesItemsFragment = createPicturesItemsFragment(randomPicturesInfo);
renderPicturesItems(picturesItemsFragment);
renderBigPictureItem(randomPicturesInfo[0]);
hideCommentCounter();
hideCommentLoader();

function createRandomPicturesInfo(picturesQuantity) {
	var randomPicturesInfo = [];
	var picturesNumbersPool = createOrderedIntegerNumbers(MIN_PICTURE_NUMBER, MAX_PICTURE_NUMBER);

	for (var i = 0; i < picturesQuantity; i++) {
		var randomUniquePictureUrl = createPictureUrl(pullRandomUniqueNumber(picturesNumbersPool));
		var randomlikesQuantity = createRandomIntegerNumber(MIN_LIKES_QUANTITY, MAX_LIKES_QUANTITY);
		var randomComments = createRandomComments(COMMENTS);
		var randomDescription = getRandomDescription(DESCRIPTIONS);

		var pictureInfo = createPictureInfo(randomUniquePictureUrl, randomlikesQuantity, randomComments, randomDescription);
		randomPicturesInfo.push(pictureInfo);
	}

	return randomPicturesInfo;
}

function createOrderedIntegerNumbers(minNumber, maxNumber) {
	var result = [];

	for (var i = minNumber; i <= maxNumber; i++) {
		result.push(i);
	}

	return result;
}

function createPictureUrl(pictureNumber) {
	return 'photos/' + pictureNumber + '.jpg';
}

function pullRandomUniqueNumber(numbersPool) {
	var randomIndex = createRandomIntegerNumber(0, numbersPool.length - 1);
	var randomUniqueNumber = numbersPool.splice(randomIndex, 1)[0];

	if (randomUniqueNumber === undefined) {
		console.log('Error! Empty numbers pool');
	}

	return randomUniqueNumber;
}

function createRandomComments(comments) {
	var randomComments = [];
	var randomQuantityOfComments = createRandomIntegerNumber(MIN_COMMENTS_QUANTITY, MAX_COMMENTS_QUANTITY)

	for (var i = 0; i < randomQuantityOfComments; i++) {
		var randomComment = comments[createRandomIntegerNumber(0, comments.length - 1)];
		randomComments.push(randomComment);
	}

	return randomComments;
}

function getRandomDescription(descriptions) {
	var randomDescription = descriptions[createRandomIntegerNumber(0, descriptions.length - 1)];

	return randomDescription;
}

function createPictureInfo(url, likesQuantity, comments, description) {
	var pictureInfo = {
		url: url,
		likes: likesQuantity,
		comments: comments,
		description: description
	}

	return pictureInfo;
}

function createPicturesItemsFragment(picturesInfo) {
	var picturesItemsFragment = document.createDocumentFragment();

	picturesInfo.forEach(function(pictureInfo) {
		picturesItemsFragment.appendChild(createPictureItem(pictureInfo));
	});

	return picturesItemsFragment;
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
	var picturesItems = document.querySelector('.pictures');
	picturesItems.appendChild(picturesItemsFragment);
}

function renderBigPictureItem(pictureInfo) {
	var bigPictureItem = document.querySelector('.big-picture');

	bigPictureItem.querySelector('.big-picture__img').querySelector('img').src = pictureInfo.url;
	bigPictureItem.querySelector('.likes-count').textContent = pictureInfo.likes;
	bigPictureItem.querySelector('.comments-count').textContent = pictureInfo.comments.length;
	bigPictureItem.querySelector('.social__comments').appendChild(createCommentsFragment(pictureInfo.comments));
	bigPictureItem.querySelector('.social__caption').textContent = pictureInfo.description;

	bigPictureItem.classList.remove('hidden');
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
	var randomAuthorImgNumber = 
		createRandomIntegerNumber(MIN_COMMENT_AUTHOR_PICTURE_NUMBER, MAX_COMMENT_AUTHOR_PICTURE_NUMBER);
	commentAuthorImg.src = 'img/avatar-' + randomAuthorImgNumber + '.svg';
	commentAuthorImg.alt = 'Аватар комментатора фотографии';
	commentAuthorImg.width = '35';
	commentAuthorImg.height = '35';

	var commentText = document.createElement('p');
	commentText.classList.add('social__text');
	commentText.textContent = comment;

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

function createRandomIntegerNumber(minNumber, maxNumber) {
	var randomIntegerNumber = Math.floor(minNumber + Math.random() * (maxNumber + 1 - minNumber));

    return randomIntegerNumber;
}