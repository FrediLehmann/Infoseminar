let senderChannel;

async function send() {
  // Send data
  senderChannel.send(document.querySelector("#senderArea").value);
}

async function init() {
  let sender = new RTCPeerConnection(null);
  senderChannel = sender.createDataChannel("sendDataChannel");
  let receiver = new RTCPeerConnection(null);

  // listen on data received
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