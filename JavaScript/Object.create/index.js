const person = Object.create(
  {
    calculateAge() {
      console.log("Age: ", new Date().getFullYear() - this.birthYear);
    }
  },
  {
    name: {
      value: "Oleksii",
      enumerable: true,
      writable: true,
      configurable: true
    },
    birthYear: {
      value: 1999
    },
    age: {
      get() {
        return this.name;
      },
      set(value) {
        document.body.style.background = value;
      }
    }
  }
);

for (let key in person) {
  if (person.hasOwnProperty(key)) {
    console.log("key", key, person[key]);
  }
}
