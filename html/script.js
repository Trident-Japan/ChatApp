var socket;
var usernameInput
var chatIDInput;
var messageInput;
var chatRoom;
var dingSound;
var messages = [];
var delay = true;

function onload(){
  
  socket = io();
  usernameInput = document.getElementById("NameInput");
  chatIDInput = document.getElementById("IDInput");
  messageInput = document.getElementById("ComposedMessage");
  chatRoom = document.getElementById("RoomID");
  dingSound = document.getElementById("notification");

  socket.on("join", function(room){
    chatRoom.innerHTML = "Chatroom : " + room;
  })

socket.on('recieve', message =>{
  function push(){
        Push.create("ChatApp:ルームへの新着メッセージ",
        {
            body: message,
            icon: '',
            timeout: 8000,
            onClick: function () {
                window.focus();
                this.close();
            }
        })
    }
    push(); 

})


  socket.on("recieve", message =>{
    console.log(message);
    if (messages.length < 20){
      messages.push(message);
      dingSound.currentTime = 0;
      dingSound.play();
    }
    else{
      messages.shift();
      messages.push(message);
            dingSound.currentTime = 0;
      dingSound.play();
    }


    /*for (i = 0; i < messages.length; i++){
        document.getElementById("Message"+i).innerHTML = messages[i];
        document.getElementById("Message"+i).style.color = "whitesmoke";
    }*/
    for (i = 0; i < messages.length; i++){
if(i==0){
        console.log(i)
var msg = messages[i]
console.log(messages[i])
      var currentDiv = document.getElementById(`chat`);
        /*currentDiv.insertAdjacentHTML("beforeend", `<p id="Message${i}" style="color:red">${messages[i]}</p>`);*/
                currentDiv.insertAdjacentHTML("beforebegin", `<p id="Message${i}"></p>`);
                document.getElementById("Message"+i).innerHTML = messages[i];
        document.getElementById("Message"+i).style.color = "whitesmoke";
}else{
  var args=messages[i].split(/\s+/)

          var link =args[2]
        console.log(i)
var msg = messages[i]
console.log(messages[i])
      var currentDiv = document.getElementById(`Message${i-1}`);
        /*currentDiv.insertAdjacentHTML("beforeend", `<p id="Message${i}" style="color:red">${messages[i]}</p>`);*/
                currentDiv.insertAdjacentHTML("beforebegin", `<p id="Message${i}"></p>`);
                document.getElementById("Message"+i).innerHTML = messages[i];
        document.getElementById("Message"+i).style.color = "whitesmoke";        
}
    }
  })
}

function Connect(){
    usernameInput = document.getElementById("NameInput").value;
  chatIDInput = document.getElementById("IDInput").value;

  console.log(usernameInput.value)
  var req = document.getElementById('hissu')
if(!usernameInput||!chatIDInput)return req.innerHTML = '<br>システム警告:ユーザー名とルームIDを入力してください  　';
  document.getElementById('user').innerHTML = `${usernameInput}さん`
  socket.emit("join", chatIDInput, usernameInput);
  var cookieValue = document.getElementById('NameInput').value;
      var cookieValue2 = document.getElementById('IDInput').value;
      document.cookie = `name=${cookieValue}; id=${cookieValue2}`;
      console.log(document.cookie);
}
function Send(){
	
var Now2 = new Date();
var YYY = Now2.getYear();
if (YYY < 2000) { YYY += 1900; }
hhh = set0( Now2.getHours() );
mmm = set0( Now2.getMinutes() );

  if (delay && document.getElementById("ComposedMessage").value.replace(/\s/g, "") != ""&&document.getElementById("ComposedMessage").value.includes('https://www.youtube.com/')){
    delay = false;
    setTimeout(delayReset, 1000);
    socket.emit("send", `<a href=${document.getElementById("ComposedMessage").value} style="color:whitesmoke;">${document.getElementById("ComposedMessage").value.split(' ')[1]}</a><br><iframe width="560" height="315" src="https://www.youtube.com/embed/${document.getElementById("ComposedMessage").value.replace('https://www.youtube.com/watch?v=',"").split(" ")[0]}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br><br>${document.getElementById("ComposedMessage").value.split(' ')[1]}      ${hhh}:${mmm}<br>`);
    document.getElementById("ComposedMessage").value = ""
  }
  if (delay && document.getElementById("ComposedMessage").value.replace(/\s/g, "") != ""&&document.getElementById("ComposedMessage").value.includes('image://')){
    //if(document.getElementById('ComposedMessage').value.includes('png')||document.getElementById('ComposedMessage').value.includes('jpg')||document.getElementById('ComposedMessage').value.includes('jpeg')||document.getElementById('ComposedMessage').value.includes('webp')||document.getElementById('ComposedMessage').value.includes('jiff')||document.getElementById('ComposedMessage').value.includes('bmp')||document.getElementById('ComposedMessage').value.includes('.tiff')||document.getElementById('ComposedMessage').value.includes('gif'))return document.getElementById('chat').insertAdjacentHTML('beforebegin',"形式が正しく有りません。画像ファイルのリンクを送信してください。<br>")
    delay = false;
    setTimeout(delayReset, 1000);
    socket.emit("send", `<img src=${document.getElementById("ComposedMessage").value.replace('image://','').split(' ')[0]} style="color:whitesmoke;"><br>${document.getElementById("ComposedMessage").value.split(' ')[1]||""}      ${hhh}:${mmm}<br>`);
    document.getElementById("ComposedMessage").value = ""
  }
  if (delay && document.getElementById("ComposedMessage").value.replace(/\s/g, "") != ""&&document.getElementById("ComposedMessage").value.includes('video://')){
    //if(document.getElementById('ComposedMessage').value.includes('png')||document.getElementById('ComposedMessage').value.includes('jpg')||document.getElementById('ComposedMessage').value.includes('jpeg')||document.getElementById('ComposedMessage').value.includes('webp')||document.getElementById('ComposedMessage').value.includes('jiff')||document.getElementById('ComposedMessage').value.includes('bmp')||document.getElementById('ComposedMessage').value.includes('.tiff')||document.getElementById('ComposedMessage').value.includes('gif'))return document.getElementById('chat').insertAdjacentHTML('beforebegin',"形式が正しく有りません。画像ファイルのリンクを送信してください。<br>")
    delay = false;
    setTimeout(delayReset, 1000);
    socket.emit("send", `<video src="${document.getElementById("ComposedMessage").value.replace('video://','').split(' ')[0]}" onclick="this.play()" controls> </video><br>${document.getElementById("ComposedMessage").value.split(' ')[1]||""}      ${hhh}:${mmm}<br>`);
    document.getElementById("ComposedMessage").value = ""
  }
  if (delay && document.getElementById("ComposedMessage").value.replace(/\s/g, "") != ""&&document.getElementById("ComposedMessage").value.includes('link://')){
    //if(document.getElementById('ComposedMessage').value.includes('png')||document.getElementById('ComposedMessage').value.includes('jpg')||document.getElementById('ComposedMessage').value.includes('jpeg')||document.getElementById('ComposedMessage').value.includes('webp')||document.getElementById('ComposedMessage').value.includes('jiff')||document.getElementById('ComposedMessage').value.includes('bmp')||document.getElementById('ComposedMessage').value.includes('.tiff')||document.getElementById('ComposedMessage').value.includes('gif'))return document.getElementById('chat').insertAdjacentHTML('beforebegin',"形式が正しく有りません。画像ファイルのリンクを送信してください。<br>")
    delay = false;
    setTimeout(delayReset, 1000);
    socket.emit("send", `<a href=${document.getElementById("ComposedMessage").value.replace('link://','').split(' ')[0]} style="color:whitesmoke;">共有されたリンク:${document.getElementById("ComposedMessage").value.replace('link://','').split(' ')[0]}</a><br>${document.getElementById("ComposedMessage").value.split(' ')[1]||""}      ${hhh}:${mmm}<br>`);
    document.getElementById("ComposedMessage").value = ""
  }
  if (delay && messageInput.value.replace(/\s/g, "") != ""){
    delay = false;
    setTimeout(delayReset, 1000);
    socket.emit("send", messageInput.value+`      ${hhh}:${mmm}<br>`);
    messageInput.value = "";


}}


function delayReset(){
  delay = true;
}

