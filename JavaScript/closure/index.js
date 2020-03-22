function createCaclFunction(n) {
  return function() {
    console.log(1000 * n);
  };
}

const calc = createCaclFunction(42);
calc();

function createIncrementor(n) {
  return function(num) {
    return n + num;
  };
}

const addOne = createIncrementor(1);
const addTen = createIncrementor(1);

console.log(addOne(10));
console.log(addTen(41));

function urlGenerator(domain) {
  return function(url) {
    return `https://${url}.${domain}`;
  };
}

const comUrl = urlGenerator("com");
console.log(comUrl("google"));

//----------bind
function bind(context, fn) {
  return function(...args) {
    fn.apply(context, args);
  };
}

bind(this, arg => {
  console.log("arg - ", arg);
})("Hello");

//--------------
