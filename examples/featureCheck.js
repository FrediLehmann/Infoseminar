function hasUserMedia() {
	return !!(navigator.mediaDevices
		&& navigator.mediaDevices.getUserMedia);
}