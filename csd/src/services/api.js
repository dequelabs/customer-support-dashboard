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

    let ret = '';

    await fetch(baseEndpoint+endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
    })
    .then(response => {
        ret = response;
    })

    return ret;
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

export async function getParam(endpoint, params) {

// requestOwnership
//  Array<string>

// OWNED_REQUESTS returns customer requests where the user is the creator.
// PARTICIPATED_REQUESTS returns customer requests where the user is a participant.
// ORGANIZATION returns customer requests for an organization of which the user is a member when used in conjunction with organizationId.
// ALL_ORGANIZATIONS returns customer requests that belong to all organizations of which the user is a member.


    let ret = ''

    await fetch(baseEndpoint+endpoint+buildParams(params), {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        ret = data;
    })

    return ret;
}

function buildParams(params) {

    let url = '?searchTerm=' + params.searchValue;

    if (params.statusValue === 'Open') {
        url = url+='&requestStatus=OPEN_REQUESTS';
    } else if (params.statusValue === 'Closed') {
        url = url+='&requestStatus=CLOSED_REQUESTS'
    }

    return url;
}