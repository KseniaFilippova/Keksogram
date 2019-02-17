'use strict';

(function() {
	var MAX_SCALE_VALUE = 100;
	var MIN_SCALE_VALUE = 25;
	var SCALE_STEP = 25;
	
	window.scale = {
		decreaseScale: function(valueInput, pictureElement) {
			var value = parseInt(valueInput.value);
			var newValue = value - SCALE_STEP;

			if (newValue >= MIN_SCALE_VALUE) {
				valueInput.value = newValue + '%';
				pictureElement.style.transform = `scale(${newValue / 100})`;	
			}
		},
		increaseScale: function(valueInput, pictureElement) {
			var value = parseInt(valueInput.value);
			var newValue = value + SCALE_STEP;

			if (newValue <= MAX_SCALE_VALUE) {
				valueInput.value = newValue + '%';
				pictureElement.style.transform = `scale(${newValue / 100})`;	
			}
		}
	}
})();