let sender;
let senderChannel;
let receiver;

async function send() {
  senderChannel.send(document.querySelector("#senderArea").value);
}

async function init() {
  // Create sender / receiver connection
  sender = new RTCPeerConnection(null);
  senderChannel = sender.createDataChannel("sendDataChannel");

  // Set ICE candidate
  sender.onicecandidate = e =>
    !e.candidate || receiver.addIceCandidate(e.candidate);

  receiver = new RTCPeerConnection(null);

  // Set ICE candidate
  receiver.onicecandidate = e =>
    !e.candidate || sender.addIceCandidate(e.candidate);

  receiver.ondatachannel = e => {
    e.channel.onmessage = event => {
      document.querySelector("#recieverArea").value = event.data;
    };
  };

  const offer = await sender.createOffer();
  sender.setLocalDescription(offer);
  receiver.setRemoteDescription(offer);

  const answer = await receiver.createAnswer();
  receiver.setLocalDescription(answer);
  sender.setRemoteDescription(answer);
}

(function() {
  init();
})();
