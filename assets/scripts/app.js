function init() {
  getData();
  setImage();
}

function setImage() {
  console.log("set image");

  const gif = document.querySelector(".js-gif");

  gif.src = "./assets/images/ralph.gif";

  console.log(gif);

  scroll();
}

function scroll() {
  var elem = document.querySelector(".js-animate");
  var pos = -200;
  var id = setInterval(frame, 10);

  function frame() {
    // console.log("scrolling");
    pos++;
    elem.style.left = pos + "px";

    const windowEdge = window.innerWidth;
    const imageWidth = elem.offsetWidth;
    const imageEdge = windowEdge / 2 - imageWidth / 2;

    if (pos === imageEdge) {
      console.log("stop here!!");
      clearInterval(id);
      showText();
      playSound();

      setTimeout(function(){ 
        console.log("restart animation");
        hideText();
        id = setInterval(frame, 10);
       }, 5000);
    }

    if (pos === windowEdge) {
      clearInterval(id);
      setImage();
    }
  }
}

function setText(text) {

  console.log(text);

  const textBox = document.querySelector('.js-text-box');
  const textContent = text;

  textBox.innerHTML = textContent;

  console.log(queue);
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

  textBox.style.left = 0;
  textBox.style.top = 0;
}

function playSound() {
  console.log("play sound");
  var audio = new Audio("./assets/sounds/sample.mp3");
  
  audio.loop = false;
  // audio.play(); 
}

function getData() {
  var request = new XMLHttpRequest();

  request.open('GET', 'https://hackmcr.azurewebsites.net/api/gethackmessages?timestamp=20081027%2000:00', true);

  request.onload = function () {
    var data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
      data.forEach(item => {
        const message = item.Message;
        // enqueue an item
        var stack = [];
        stack.push(message);       // stack is now [2]
        var i = stack.pop(); // stack is now [2]
        console.log(i); 
        setText(i);

      });
    } else {
      console.log('error');
    }

    console.log("queue" + queue);
    }

  // Send request
  request.send();
}

window.addEventListener("load", () => {
  init();
});
