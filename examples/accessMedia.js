const constraints = {
	audio: true,
	video: true
};

navigator
	.mediaDevices
	.getUserMedia(constraints)
	.then(stream => {
		// use the stream, for example to present to the user
	});