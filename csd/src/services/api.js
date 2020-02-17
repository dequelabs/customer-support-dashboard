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

export async function getParam(endpoint, params, page, pageSize) {

    let ret = ''

    await fetch(baseEndpoint+endpoint+buildParams(params, page, pageSize), {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {
        ret = data;
    })

    return ret;
}

function buildParams(params, page, pageSize) {

    console.log('api page:', page)

    let url = '?searchTerm=' + params.searchValue;

    if (params.statusValue === 'Open') {
        url +='&requestStatus=OPEN_REQUESTS';
    } else if (params.statusValue === 'Closed') {
        url +='&requestStatus=CLOSED_REQUESTS'
    }

    if (params.typeValue !== 'Any') {
        if(params.typeValue === 'Report A Problem') {
            url += '&serviceDeskId=1&requestTypeId=10008'
        } else if(params.typeValue === 'Request Training') {
            url += '&serviceDeskId=1&requestTypeId=10006'
        } else if(params.typeValue === 'Request A Feature') {
            url += '&serviceDeskId=1&requestTypeId=10009'
        }else if(params.typeValue === 'Provide Feedback') {
            url += '&serviceDeskId=1&requestTypeId=10012'
        }else if(params.typeValue === 'Other') {
            url += '&serviceDeskId=1&requestTypeId=10011'
        }else if(params.typeValue === 'Ask A Question') {
            url += '&serviceDeskId=1&requestTypeId=10010'
        }
    }

    let start = ((page-1)*pageSize);
    url += ('&start='+start);
    url += ('&limit='+pageSize)

    return url;
}