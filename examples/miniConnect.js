// Create connections
const sender = new RTCPeerConnection();
const receiver = new RTCPeerConnection();

// Set ICE candidate
sender.onicecandidate = e =>
	!e.candidate || receiver.addIceCandidate(e.candidate);
receiver.onicecandidate = e =>
	!e.candidate || sender.addIceCandidate(e.candidate);

// Create offer and set description
const offer = await sender.createOffer();
await sender.setLocalDescription(offer);
await receiver.setRemoteDescription(offer);

// Create answer from receiver and set description
const answer = await receiver.createAnswer();
await receiver.setLocalDescription(answer);
await sender.setRemoteDescription(answer);
