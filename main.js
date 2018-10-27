function scroll() {
  var elem = document.querySelector(".js-animate");   
  var pos = -200;
  var id = setInterval(frame, 5);
  function frame() {
      console.log(pos);
      pos++; 
      elem.style.left = pos + 'px'; 

    const windowEdge = window.innerWidth;
    
    if (pos >= windowEdge) {
      clearInterval(id);
      replaceImage();
    }
  }
}

function replaceImage() {
  console.log("replace image");
  const gif = document.querySelector(".js-gif");  

  gif.src = './ralph.gif';

  console.log(gif);

  scroll();
}

window.addEventListener("load", () => {
  replaceImage();
});