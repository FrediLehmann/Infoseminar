import { hasUserMedia, startStream } from "./media";

let sender;
let receiver;

function end() {
  sender.close();
  receiver.close();
  sender = null;
  receiver = null;
}

async function start() {
  // Check if the client supports the needed API
  if (!hasUserMedia()) return;

  // Start the video / audio stream
  const stream = await startStream();

  // Create sender / receiver connection
  sender = new RTCPeerConnection();
  receiver = new RTCPeerConnection();

  // Set ICE candidate
  sender.onicecandidate = e =>
    !e.candidate || receiver.addIceCandidate(e.candidate);
  receiver.onicecandidate = e =>
    !e.candidate || sender.addIceCandidate(e.candidate);

  // Listen on incoming stream
  receiver.ontrack = e => {
    document.querySelector("#remoteVideo").srcObject = e.streams[0];
  };

  // Bind stream to sender
  stream.getTracks().forEach(track => sender.addTrack(track, stream));

  // Create offer and set description
  const offer = await sender.createOffer();
  await sender.setLocalDescription(offer);
  await receiver.setRemoteDescription(offer);

  // Create answer from receiver and set description
  const answer = await receiver.createAnswer();
  await receiver.setLocalDescription(answer);
  await sender.setRemoteDescription(answer);
}
