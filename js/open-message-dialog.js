(function() {
	window.openMessageDialog = function(errorMessage) {
		if (errorMessage == null) {
			openSuccessMessageDialog();
		} else {
			openErrorMessageDialog(errorMessage);
		}
	}

	function openSuccessMessageDialog() {
		var messageTemplate = document.querySelector('#success').content.querySelector('.success');
		var messageElement = messageTemplate.cloneNode(true);
		messageElement.style = 'z-index: 100';

		document.body.insertAdjacentElement('beforebegin', messageElement);

		var closeButton = messageElement.querySelector('.success__button');
		closeButton.addEventListener('click', onCloseButtonClick);
		document.addEventListener('keydown', onDocumentKeydown);
	
		function onCloseButtonClick() {
			removeMessageDialog('.success');
			closeButton.removeEventListener('click', onCloseButtonClick);
		}

		function onDocumentKeydown() {
			removeMessageDialog('.success');
			document.removeEventListener('keydown', onDocumentKeydown);
		}
	}

	function openErrorMessageDialog(message) {
		var messageTemplate = document.querySelector('#error').content.querySelector('.error');
		var messageElement = messageTemplate.cloneNode(true);
		messageElement.querySelector('.error__title').textContent = message;
		messageElement.style = 'z-index: 100';

		document.body.insertAdjacentElement('beforebegin', messageElement);

		var closeButton = messageElement.querySelector('.error__button');
		closeButton.addEventListener('click', onCloseButtonClick);
		document.addEventListener('keydown', onDocumentKeydown);
	
		function onCloseButtonClick() {
			removeMessageDialog('.error');
			closeButton.removeEventListener('click', onCloseButtonClick);
		}

		function onDocumentKeydown() {
			removeMessageDialog('.error');
			document.removeEventListener('keydown', onDocumentKeydown);
		}
	}

	function removeMessageDialog(elementSelector) {
		var messageElement = document.querySelector(elementSelector);
			messageElement.remove();
	}
})();