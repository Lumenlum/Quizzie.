window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("logo").style.height = "35px";
        document.getElementById("logo").style.width = "35px";
  } else {
        document.getElementById("logo").style.height = "100px";
        document.getElementById("logo").style.width = "100px";
  }
}