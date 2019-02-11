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
		closeButton.addEventListener('click', function() {
			removeMessageDialog('.success');
		});		
	}

	function openErrorMessageDialog(message) {
		var messageTemplate = document.querySelector('#error').content.querySelector('.error');
		var messageElement = messageTemplate.cloneNode(true);
		messageElement.querySelector('.error__title').textContent = message;
		messageElement.style = 'z-index: 100';

		document.body.insertAdjacentElement('beforebegin', messageElement);

		var closeButton = messageElement.querySelector('.error__button');
		closeButton.addEventListener('click', function() {
			removeMessageDialog('.error');
		});
	}

	function removeMessageDialog(elementSelector) {
		var messageElement = document.querySelector(elementSelector);
			messageElement.remove();
	}
})();