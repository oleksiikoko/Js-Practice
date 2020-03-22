console.log("Request data...");

setTimeout(() => {
  console.log("Prepearing data...");

  const backendData = {
    server: "aws",
    port: 2000,
    status: "work"
  };

  setTimeout(() => {
    backendData.modified = true;
    console.log("Data received", backendData);
  }, 2000);
}, 2000);

const p = new Promise(function(resolve, reject) {
  setTimeout(() => {
    console.log("Prepearing data...");

    const backendData = {
      server: "aws",
      port: 2000,
      status: "work"
    };
    resolve(backendData);
  }, 2000);
});

p.then(data => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      data.modified = true;
      resolve(data);
      // reject(data);
    }, 2000);
  });
})
  .then(clientData => {
    console.log("Data received: ", clientData);
    return clientData;
  })
  .then(clientData => {
    console.log("Full data received: ", clientData);
  })
  .catch(clientData => {
    console.warn("Data not received", clientData);
  })
  .finally(() => console.log("Finally!"));

const sleep = ms =>
  new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  });

sleep(2000).then(() => console.log("After 2 sec"));

Promise.all([sleep(2000), sleep(3000)]).then(() => {
  console.log("All promises");
});

Promise.race([sleep(2000), sleep(5000)]).then(() => {
  console.log("Race primises");
});
