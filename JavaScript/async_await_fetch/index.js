const delay = ms => {
  return new Promise(r => setTimeout(() => r(), ms));
};

const url = "https://jsonplaceholder.typicode.com/todos";

// function fetchTodos() {
//   console.log("Fetch todo started...");
//   return delay(2000)
//     .then(() => fetch(url))
//     .then(response => response.json());
// }

// fetchTodos()
//   .then(data => console.log("Data", data))
//   .catch(err => console.error(err));

async function fetchAsyncTodos() {
  console.log("Fetch todo started...");
  try {
    await delay(2000);
    const response = await fetch(url);
    const data = await response.json();
    console.log("Data", data);
  } catch (err) {
    console.error(err);
  } finally {
    console.log("Finally!");
  }
}

fetchAsyncTodos();
