'use strict';

(function() {
	var ENTER_KEYCODE = 13;
	var ESC_KEYCODE = 27;

	window.keyboardUtils = {
		isEnterKeyCode: function(evt) {
			return evt.keyCode === ENTER_KEYCODE;
		},
		isEscKeyCode: function(evt) {
			return evt.keyCode === ESC_KEYCODE;
		}
	}
})();