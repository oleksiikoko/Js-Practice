function hello() {
  console.log("Hello", this);
}

const person = {
  name: "Oleksii",
  age: 25,
  sayHello: hello,
  sayHelloWindow: hello.bind(window),
  logInfo: function(job, phone) {
    console.group(`${this.name} info: `);
    console.log(`Name is ${this.name}`);
    console.log(`Age is ${this.age}`);
    console.log(`Job is ${job}`);
    console.log(`Phone is ${phone}`);
    console.groupEnd();
  }
};

const melissa = {
  name: "Melissa",
  age: 23
};

person.logInfo.bind(melissa, "Frontend", "+380675437678")();
person.logInfo.call(melissa, "Frontend", "+380675437678");
person.logInfo.apply(melissa, ["Frontend", "+380675437678"]);

const array = [1, 2, 3, 4, 5];

function multBy(arr, n) {
  return arr.map(function(i) {
    return i * n;
  });
}

Array.prototype.multBy = function(n) {
  return this.map(function(i) {
    return i * n;
  });
};

console.log(multBy(array, 15));
console.log(array.multBy(2));
