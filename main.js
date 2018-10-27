function init() {
  setImage();
}

function setImage() {
  console.log("set image");
  const gif = document.querySelector(".js-gif");

  gif.src = "./ralph.gif";

  console.log(gif);

  scroll();
}

function scroll() {
  var elem = document.querySelector(".js-animate");
  var pos = -200;
  var id = setInterval(frame, 10);

  function frame() {
    console.log("scrolling");
    pos++;
    elem.style.left = pos + "px";

    const windowEdge = window.innerWidth;
    const imageWidth = elem.offsetWidth;
    const imageEdge = windowEdge / 2 - imageWidth / 2;

    if (pos === imageEdge) {
      console.log("stop here!!");
      clearInterval(id);

      setTimeout(function(){ 
        console.log("restart animation");
        id = setInterval(frame, 10);
       }, 5000);
    }

    if (pos === windowEdge) {
      clearInterval(id);
      setImage();
    }
  }
}

window.addEventListener("load", () => {
  init();
});
