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

    console.log('post called with value', value);

    await fetch(baseEndpoint+endpoint, {
        method: 'POST',
        headers: {
            
        },
        body: JSON.stringify({
            comment: "hard code test comment",
        })
    })
    .then(response => {
        console.log(response)
    })
}

