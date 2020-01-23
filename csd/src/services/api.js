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

