//Objects
const person = {
  name: "Oleksii",
  age: 25,
  job: "Fullstack"
};

const op = new Proxy(person, {
  get(target, prop) {
    console.log(`Getting prop ${prop}`);
    if (!(prop in target)) {
      return prop
        .split("_")
        .map(p => target[p])
        .join(" ");
    }
    return target[prop];
  },
  set(target, prop, value) {
    if (prop in target) {
      target[prop] = value;
    } else {
      throw new Error(`No ${prop} field in target`);
    }
  },
  has(target, prop) {
    return ["age", "name", "job"].includes(prop);
  },
  deleteProperty(target, prop) {
    delete target[prop];
    return true;
  }
});

//Functions
const log = text => `Log: ${text}`;

const fp = new Proxy(log, {
  apply(target, thisArg, args) {
    console.log("Calling fn...");

    return target.apply(thisArg, args);
  }
});

//classes
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

const PersonProxy = new Proxy(Person, {
  construct(target, args) {
    console.log("Construct...");

    return new Proxy(new target(...args), {
      get(t, prop) {
        console.log(`Getting prop "${prop}"`);

        return t[prop];
      }
    });
  }
});

const p = new PersonProxy("Oleksii", 30);

//Wrapper
const withDefaultValue = (target, defaultValue = 0) => {
  return new Proxy(target, {
    get: (obj, prop) => (prop in obj ? obj[prop] : defaultValue)
  });
};

const position = withDefaultValue(
  {
    x: 24,
    y: 42
  },
  0
);

console.log(position.z);

// Hidden properties
const withHiddenProps = (target, prefix = "_") => {
  return new Proxy(target, {
    has: (obj, prop) => prop in obj && prop.startsWith(prefix),
    ownKeys: obj => Reflect.ownKeys(obj).filter(p => !p.startsWith(prefix)),
    get: (obj, prop, receiver) => (prop in receiver ? obj[prop] : undefined)
  });
};

const data = withHiddenProps({
  name: "Oleksii",
  age: 21,
  _uid: "123456789"
});

// Optimization
const IndexedArray = new Proxy(Array, {
  construct(target, [args]) {
    const index = {};
    args.forEach(item => (index[item.id] = item));

    return new Proxy(new target(...args), {
      get(arr, prop) {
        switch (prop) {
          case "push":
            return item => {
              index[item.id] = item;
              arr[prop].call(arr, item);
            };
          case "findById":
            return id => index[id];
          default:
            return arr[prop];
        }
      }
    });
  }
});

const users = new IndexedArray([
  { id: 1, name: "Oleksii", job: "Frontend", age: 21 },
  { id: 2, name: "Serigiy", job: "Student", age: 22 },
  { id: 3, name: "Ivan", job: "Backend", age: 25 },
  { id: 4, name: "Grisha", job: "Fullstack", age: 27 }
]);

// const index = {};
// userData.forEach(i => (index[i.id] = i));
