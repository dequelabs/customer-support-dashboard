const baseEndpoint = 'http://localhost:3000/';

export async function get(endpoint) {

    let ret = ''

    await fetch(baseEndpoint+endpoint, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        ret = data;
    })

    return ret;
}

export async function post(endpoint, value) {

    await fetch(baseEndpoint+endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
    })
    .then(response => {
        console.log(response)
    })
}

export async function deletes(endpoint) {

    let ret = ''

    await fetch(baseEndpoint+endpoint, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        ret = response;
    })

    return ret;
}

export async function put(endpoint) {

    let ret = ''

    await fetch(baseEndpoint+endpoint, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        ret = response;
    })

    return ret;
}