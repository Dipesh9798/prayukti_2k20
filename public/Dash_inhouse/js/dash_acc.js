// Forked from https://codepen.io/SECRETO/pen/wXwzoW

var accordions = document.getElementsByClassName("accordion");

for (var i = 0; i < accordions.length; i++) {
  accordions[i].onclick = function() {
    this.classList.toggle('is-open');

    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      // IF accordion is open - close it
      content.style.maxHeight = null;
    } else {
      // ELSE accordion is closed - so open it
      content.style.maxHeight = content.scrollHeight + "px";
    }
  }
}
