console.log("Start");

console.log("Start 2");

function callback() {
  console.log("Inside setTimeout - 0");
}

function timeout3sec() {
  console.log("timeout3sec");
}

window.setTimeout(function() {
  console.log("Inside timeout, after 2 seconds");
}, 2000);

window.setTimeout(timeout3sec, 3000);
window.setTimeout(callback, 0);

console.log("End");
