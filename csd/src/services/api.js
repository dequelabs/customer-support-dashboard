export function get(endpoint) {

    console.log("get called");
    fetch(endpoint, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => console.log(data))
}

export function post(endpoint, body) {
    fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
    })
    .then(response => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    })
    .then(([res, data]) => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
      });
}

export function put(endpoint, body) {
    fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
    })
    .then(response => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    })
    .then(([res, data]) => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
      });
}

export function delet(endpoint) {
    fetch(endpoint, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
    })
    .then(response => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
    })
    .then(([res, data]) => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
      });
}