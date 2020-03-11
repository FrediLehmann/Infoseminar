async function start() {
  // Start the video / audio stream
  const stream = await startStream();

  // Create sender / receiver connection
  let sender = new RTCPeerConnection();
  let receiver = new RTCPeerConnection();

  // Listen on incoming stream
  receiver.ontrack = e => {
    document.querySelector("#remoteVideo").srcObject = e.streams[0];
  };

  // Bind stream to sender
  stream.getTracks().forEach(track => sender.addTrack(track, stream));

  // Create offer and answer and set the corresponding descriptions
}
