const servers = {
	iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
};

const connection = new RTCPeerConnection(servers);
connection.onicecandidate = e => {
	if (e.candidate) {
		// share candidate with the other peer
	}
};

connection.onmessage = receivedString => {
	const message = JSON.parse(receivedString);
	if (message.ice) {
		connection.addIceCandidate(message.ice);
	}
};

// create offer
const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
stream.getTracks().forEach(track => connection.addTrack(track, stream));

const offer = await connection.createOffer({ offerToReceiveAudio: 1 });
connection.setLocalDescription(offer);