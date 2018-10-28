var messageStack = [];
var gifStack = [];
var soundStack = [];
var sentimentStack = [];

var sound;
var checkForDataInterval;
var sentiment;

function init() {
  getData();
}

function setImage() {
  console.log("set image");
  var gifContent = gifStack.shift();
  console.log(gifContent);

  const gif = document.querySelector(".js-gif");

  if (!gifContent) {
    gif.src = "./assets/images/homer.gif";
    console.log("no gif content");
  } else {
    console.log("gif content");
    gif.src = gifContent;
  }

  console.log(gif);

  scroll();
}

function setText() {
  var text = messageStack.shift(); // stack is now [2]
  console.log(text); 

  const textBox = document.querySelector('.js-text-box');
  const textContent = text;

  textBox.innerHTML = textContent;
}

function setSound(){
  sound = soundStack.shift();
  console.log(sound);
}

function setSentiment(){
  sentiment = sentimentStack.shift();
  console.log(sentiment);

  if (!sentiment) {
    const sadContainers = document.querySelectorAll('.js-negative');
    const happyContainers = document.querySelectorAll('.js-positive');
    console.log("no sentiment content");
    for (var sadContainer of sadContainers) {
      sadContainer.classList.remove('js-negative--show');
    }

    for (var happyContainer of happyContainers) {
      happyContainer.classList.remove('js-positive--show');
    }
  } else {
    applySentiment();
  }
}

function applySentiment(){
  if (sentiment === 'positive') {
    const sadContainers = document.querySelectorAll('.js-negative');
    const happyContainers = document.querySelectorAll('.js-positive');
    
    console.log("positive sentiment");

    for (var sadContainer of sadContainers) {
      sadContainer.classList.remove('js-negative--show');
    }

    for (var happyContainer of happyContainers) {
      happyContainer.classList.add('js-positive--show');
    }
  }
  if (sentiment === 'neutral') {
    const sadContainers = document.querySelectorAll('.js-negative');
    const happyContainers = document.querySelectorAll('.js-positive');

    console.log("neutral sentiment");

    for (var sadContainer of sadContainers) {
      sadContainer.classList.remove('js-negative--show');
    }

    for (var happyContainer of happyContainers) {
      happyContainer.classList.remove('js-positive--show');
    }
  }
  if (sentiment === 'negative') {
    const sadContainers = document.querySelectorAll('.js-negative');
    const happyContainers = document.querySelectorAll('.js-positive');

    console.log("negative sentiment");

    for (var sadContainer of sadContainers) {
      sadContainer.classList.add('js-negative--show');
    }

    for (var happyContainer of happyContainers) {
      happyContainer.classList.remove('js-positive--show');
    }
  }
}

function scroll() {
  var elem = document.querySelector(".js-animate");
  var pos = -200;
  var scrollInterval = setInterval(frame, 10);

  function frame() {
    // console.log("scrolling");
    pos++;
    elem.style.left = pos + "px";

    const windowEdge = window.innerWidth;
    const imageWidth = elem.offsetWidth;
    const imageEdge = windowEdge / 2 - imageWidth / 2;

    if (pos === imageEdge) {
      console.log("stop here!!");
      clearInterval(scrollInterval);
      showText();
      playSound();

      setTimeout(function(){ 
        console.log("restart animation");
        hideText();
        scrollInterval = setInterval(frame, 10);
       }, 5000);
    }

    if (pos === windowEdge) {
      clearInterval(scrollInterval);
      checkForData();
      setImage();
      setText();
      setSound();
      setSentiment();
    }
  }
}

function checkForData() {
  if (messageStack.length === 0) {
    console.log("there's no data");
    getData();
  } else {
    console.log("there's already data");
  }
}

function showText() {
  var elem = document.querySelector(".js-animate");
  const textBox = document.querySelector('.js-text-box');

  var elem = document.querySelector(".js-animate");

  const textBoxPosRight = elem.offsetLeft + elem.offsetWidth;
  const textBoxPosTop = elem.offsetTop;
  const elemHeight = elem.offsetHeight;

  textBox.style.left = (textBoxPosRight - (textBoxPosRight * 0.15)) + "px";
  textBox.style.top = (textBoxPosTop - (elemHeight / 2)) + "px";

  textBox.classList.add('text-box--show');
}

function hideText() {
  const textBox = document.querySelector('.js-text-box');

  textBox.classList.remove('text-box--show');

  setTimeout(function(){ 
    textBox.style.left = 0;
    textBox.style.top = 0;
   }, 2000);
}

function playSound() {
  console.log("play sound");
  var audio = new Audio(sound);
  
  audio.loop = false;
  audio.play(); 
}

function getData() {
  var date = new Date();

  var hours = date.getHours() < 10 ? "0" + date.getHours().toString() : date.getHours().toString();
  var mins = date.getMinutes() < 10 ? "0" + date.getMinutes().toString() : date.getMinutes().toString();

  var day = date.getDate().toString();
  var month = (date.getMonth() + 1).toString();
  var year = date.getFullYear().toString();

  const currentDate = year + month + day;
  const currentTime = hours + mins;

  var request = new XMLHttpRequest();

  request.open('GET', 'https://hackmcr.azurewebsites.net/api/gethackmessages?timestamp=' + currentDate + ' ' + '04:25', true);

  request.onload = function () {
    var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
      data.forEach(item => {
        const message = item.Message;
        const gif = item.Gif;
        const audio = item.Sound;
        const sentimentVal = item.Sentiment;
        // enqueue an item
        messageStack.push(message);
        gifStack.push(gif);
        soundStack.push(audio);
        sentimentStack.push(sentimentVal);
      });
      setImage();
      setText();
      setSound();
      setSentiment();
    } else {
      console.log('error');
      console.log('no new data');
    }
    }

  // Send request
  request.send();
}

window.addEventListener("load", () => {
  init();
});
