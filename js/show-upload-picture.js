(function() {
	var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

	window.showUploadPicture = function(fileInput, uploadPicture) {
		var file = fileInput.files[0];
		var fileName = file.name.toLowerCase();

		var isCorrectFileType = FILE_TYPES.some(function(fileType) {
			return fileName.endsWith(fileType);
		});

		if (isCorrectFileType) {
			var reader = new FileReader();
			reader.readAsDataURL(file);

			reader.addEventListener('load', function() {
				uploadPicture.src = reader.result;
			})
		}
	}
})();