const constraints = {
	audio: true,
	video: true
};

const video = document.querySelector("video");

if (hasUserMedia()) {
	navigator
		.mediaDevices
		.getUserMedia(constraints)
		.then(stream => {
			video.srcObject = stream;
		});
}