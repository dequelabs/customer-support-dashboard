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
    // console.log('params:',params);
    // console.log('search:',params.searchValue);
    // console.log('endpoint:',endpoint);

    //?searchTerm=test

// requestOwnership
//  Array<string>

// OWNED_REQUESTS returns customer requests where the user is the creator.
// PARTICIPATED_REQUESTS returns customer requests where the user is a participant.
// ORGANIZATION returns customer requests for an organization of which the user is a member when used in conjunction with organizationId.
// ALL_ORGANIZATIONS returns customer requests that belong to all organizations of which the user is a member.

// requestStatus
// string

// Filters customer requests where the request is closed, open, or either of the two where:

// CLOSED_REQUESTS returns customer requests that are closed.
// OPEN_REQUESTS returns customer requests that are open.
// ALL_REQUESTS returns all customer requests.

// serviceDeskId
// integer

// Filters customer requests by service desk.

// Format: int32
// requestTypeId
// integer

// Filters customer requests by request type. Note that the serviceDeskId must be specified for the service desk in which the request type belongs.

// Format: int32

// start
// integer

// The starting index of the returned objects. Base index: 0. See the Pagination section for more details.

// Format: int32

    let ret = ''

    await fetch(baseEndpoint+endpoint+'?searchTerm='+params.searchValue, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        ret = data;
    })

    return ret;
}