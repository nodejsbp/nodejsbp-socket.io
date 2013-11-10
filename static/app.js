var socket = io.connect(),
    messagesEl = document.querySelector('#messages'),
    statusEl = document.querySelector('#status'),
    textEl = document.querySelector('input'),
    sendBtnEl = document.querySelector('button'),
    me = prompt('tell me your name sunshine, you\'d be grateful');

[ 'connect', 'reconnect', 'connecting', 'disconnect' ].forEach(function( evName ){
  socket.on( evName, function(){
    statusEl.textContent = evName;
  });
});
socket.on('message', addMessage);

sendBtnEl.addEventListener('click', function(){
  var text = ( textEl.value||"" ).trim();
  var date = new Date();
  socket.send(JSON.stringify({
    from: me,
    text: text,
    date: date.getHours() + ":" + date.getMinutes()
  }));
  textEl.value = "";
}, false);

function addMessage(data){
  var message = JSON.parse( data );
  var li = document.createElement('li');
  li.className = message.from === me ? "me" : "";
  li.innerHTML = "<p><span class='from'>" + message.from + "</span><span class='message'>" + message.text + "</span></p><small>" + message.date + "</small>";
  messagesEl.appendChild( li );
}