import { hasUserMedia, startStream } from "./media";

async function start() {
	// Check if the client supports the needed API
  if (!hasUserMedia()) return;

	// Start the video / audio stream
  const stream = await startStream();

	// Create sender / reciever connection
  const sender = new RTCPeerConnection();
  const reciever = new RTCPeerConnection();

	// Set ICE candidate
  sender.onicecandidate = e =>
    !e.candidate || reciever.addIceCandidate(e.candidate);
  reciever.onicecandidate = e =>
    !e.candidate || sender.addIceCandidate(e.candidate);

	// Listen on incoming stream
  reciever.ontrack = e => {
    document.querySelector("#remoteVideo").srcObject = e.streams[0];
  };

	// Bind stream to sender
  stream.getTracks().forEach(track => sender.addTrack(track, stream));

	// Create offer and set description
  const offer = await sender.createOffer({
    offerToReceiveAudio: 1,
    offerToReceiveVideo: 1
  });
  await sender.setLocalDescription(offer);
  await reciever.setRemoteDescription(offer);

	// Create answer from reciever and set description
  const answer = await reciever.createAnswer();
  await reciever.setLocalDescription(answer);
  await sender.setRemoteDescription(answer);
}

(function() {
  document.querySelector("#connectButton").addEventListener("click", start);
})();
