(function() {
	window.mathUtils = {
		createRandomIntegerNumber: function(minNumber, maxNumber) {
			var randomIntegerNumber = Math.floor(minNumber + Math.random() * (maxNumber + 1 - minNumber));

	    	return randomIntegerNumber;
		}
	}
})();
