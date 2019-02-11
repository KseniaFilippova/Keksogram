(function() {
	window.backend = { 
		load: function(onSuccess, onError, url) {
			var xhr = createXMLHttpRequest('GET', url);
			addRequestEventListeners(xhr, onSuccess, onError);
			xhr.send();
		},
		save: function(onSuccess, onError, data, url) {
			var xhr = createXMLHttpRequest('POST', url);
			addRequestEventListeners(xhr, onSuccess, onError);
			xhr.send(data);
		}
	}

	function createXMLHttpRequest(method, url) {
		var xhr = new XMLHttpRequest();
		xhr.responseType = 'json';
		xhr.open(method, url);

		return xhr;
	}

	function addRequestEventListeners(xhr, onSuccess, onError) {
		xhr.addEventListener('load', onXhrLoad);
		xhr.addEventListener('error', onXhrError);
		xhr.addEventListener('timeout', onXhrTimeout);

		function onXhrLoad() {
			switch (xhr.status) {
				case 200:
					onSuccess(xhr.response);
					break;
				case 400:
					onError('Ошибка ' + xhr.status + ' ' + 'Неверный запрос');
					break;
				case 401:
					onError('Ошибка ' + xhr.status + ' ' + 'Пользователь не авторизован');
					break;
				case 404:
					onError('Ошибка ' + xhr.status + ' ' + 'Информация не найдена');
					break;
				default:
					onError('Ошибка ' + xhr.status + ' ' + xhr.statusText);	
			}

			xhr.removeEventListener('load', onXhrLoad);
		}

		function onXhrError() {
			onError('Произошла ошибка соединения');
			xhr.removeEventListener('error', onXhrError);
		}

		function onXhrTimeout() {
			onError('Запрос не успел выполниться');
			xhr.removeEventListener('timeout', onXhrTimeout);
		}
	}
})();