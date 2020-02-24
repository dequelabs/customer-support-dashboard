const accountSid = 'AC4a87abb82ec5281803d65099d34256a2';
const authToken = 'b1483e006de65afa0ede5e1ef0959bf1';
// const twillio = require('twilio')(accountSid,authToken);

var FormData = require('form-data');
const express = require('express');
const fileUpload = require('express-fileupload');
const Axios = require('axios');
var cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const port = 3000;
const app = express();
const axios = Axios.create();

app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

//get list of requests
app.get('/request', (req, res) => {

    var request = require('request');
    var params = req.url.split('?');
   
    var options = {
        method: 'GET',
        url: 'https://dequecsddev.atlassian.net/rest/servicedeskapi/request?'+params[1],
        auth: { username: 'jonathan.thickens@deque.com', password: 'j0VEP5Ia8BngJnzcIm6pC00B' },
        headers: {
            'Accept': 'application/json',
        },
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.send(body);
        // console.log(
        //     'Get Requests Response: ' + response.statusCode + ' ' + response.statusMessage
        // );
    });
});

//get request's comments
app.get('/request/*/comment', (req, res) => {

    let issueID = req.url.split('/')[2]
    var request = require('request');

    var options = {
        method: 'GET',
        url: 'https://dequecsddev.atlassian.net/rest/servicedeskapi/request/'+issueID+'/comment',
        auth: { username: 'jonathan.thickens@deque.com', password: 'j0VEP5Ia8BngJnzcIm6pC00B' },
        headers: {
            'Accept': 'application/json'
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.send(body);
        console.log(
            'Get Comments Response: ' + response.statusCode + ' ' + response.statusMessage
        );
    });
});

//get products for product field in request
app.get('/requesttypefield', (req, res) => {

    var request = require('request');

    var options = {
        method: 'GET',
        url: 'https://dequecsddev.atlassian.net/rest/servicedeskapi/servicedesk/1/requesttype/10006/field',
        auth: { username: 'jonathan.thickens@deque.com', password: 'j0VEP5Ia8BngJnzcIm6pC00B' },
        headers: {
            'Accept': 'application/json',
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.send(body);
        // console.log(
        //     'Get Products Response: ' + response.statusCode + ' ' + response.statusMessage
        //  );
    });
});

//get request types
app.get('/requesttype', (req, res) => {

    var request = require('request');

    var options = {
        method: 'GET',
        url: 'https://dequecsddev.atlassian.net/rest/servicedeskapi/requesttype',
        auth: { username: 'jonathan.thickens@deque.com', password: 'j0VEP5Ia8BngJnzcIm6pC00B' },
        headers: {
            'Accept': 'application/json',
            'X-ExperimentalApi': 'opt-in',
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.send(body);
        // console.log(
        //     'Get Request Types Response: ' + response.statusCode + ' ' + response.statusMessage
        //  );
    });
});

//get request notification status (subscription status)
app.get('/request/*/notification', (req, res) => {

    let issueID = req.url.split('/')[2]
    var request = require('request');

    var options = {
        method: 'GET',
        url: 'https://dequecsddev.atlassian.net/rest/servicedeskapi/request/'+issueID+'/notification',
        auth: { username: 'jonathan.thickens@deque.com', password: 'j0VEP5Ia8BngJnzcIm6pC00B' },
        headers: {
            'Accept': 'application/json'
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.send(body);
        console.log(
            'Get Notification Status Response: ' + response.statusCode + ' ' + response.statusMessage
         );
    });
});

//get all organization members
app.get('/organization/*/user', (req, res) => {

    var request = require('request');

    var options = {
        method: 'GET',
        url: 'https://dequecsddev.atlassian.net/rest/servicedeskapi/organization/1/user',
        auth: { username: 'jonathan.thickens@deque.com', password: 'j0VEP5Ia8BngJnzcIm6pC00B' },
        headers: {
            'Accept': 'application/json'
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.send(body);
        console.log(
            'Get User List Response: ' + response.statusCode + ' ' + response.statusMessage
         );
    });
});

//get request participants (shared with)
app.get('/request/*/participant', (req, res) => {

    let issueID = req.url.split('/')[2]
    var request = require('request');

    var options = {
        method: 'GET',
        url: 'https://dequecsddev.atlassian.net/rest/servicedeskapi/request/'+issueID+'/participant',
        auth: { username: 'jonathan.thickens@deque.com', password: 'j0VEP5Ia8BngJnzcIm6pC00B' },
        headers: {
            'Accept': 'application/json'
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.send(body);
        console.log(
            'Get Shared Users Response: ' + response.statusCode + ' ' + response.statusMessage
         );
    });
});

//get transitions available to user for request (not yet supported)
app.get('/request/*/transition', (req, res) => {

    let issueID = req.url.split('/')[2]
    var request = require('request');

    var options = {
        method: 'GET',
        url: 'https://dequecsddev.atlassian.net/rest/servicedeskapi/request/'+issueID+'/transition',
        auth: { username: 'jonathan.thickens@deque.com', password: 'j0VEP5Ia8BngJnzcIm6pC00B' },
        headers: {
            'Accept': 'application/json'
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.send(body);
        console.log(
            'Get Transitions Response: ' + response.statusCode + ' ' + response.statusMessage
         );
    });
});

//unsubscribe from request notifications
app.delete('/request/*/notification', (req, res) => {

    let issueID = req.url.split('/')[2]
    var request = require('request');

    var options = {
        method: 'DELETE',
        url: 'https://dequecsddev.atlassian.net/rest/servicedeskapi/request/'+issueID+'/notification',
        auth: { username: 'jonathan.thickens@deque.com', password: 'j0VEP5Ia8BngJnzcIm6pC00B' },
        headers: {
            'Accept': 'application/json'
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.send(response.statusCode);
        console.log(
            'Notifications Unsubscribe Response: ' + response.statusCode + ' ' + response.statusMessage
         );
    });
});

//subscribe to request notificatios
app.put('/request/*/notification', (req, res) => {

    let issueID = req.url.split('/')[2]
    var request = require('request');

    var options = {
        method: 'PUT',
        url: 'https://dequecsddev.atlassian.net/rest/servicedeskapi/request/'+issueID+'/notification',
        auth: { username: 'jonathan.thickens@deque.com', password: 'j0VEP5Ia8BngJnzcIm6pC00B' },
        headers: {
            'Accept': 'application/json'
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.send(body);
        console.log(
            'Notifications Subscribe Response: ' + response.statusCode + ' ' + response.statusMessage
         );
    });
});

//add all users to request
app.post('/organizationuser', (req, res) => {
    
    var request = require('request');

    let accountIds=[];

    var getOptions = {
        method: 'GET',
        url: 'https://dequecsddev.atlassian.net/rest/servicedeskapi/organization/1/user',
        auth: { username: 'jonathan.thickens@deque.com', password: 'j0VEP5Ia8BngJnzcIm6pC00B' },
        headers: {
            'Accept': 'application/json'
        }
    };

    request(getOptions, function (error, response, body) {
        if (error) throw new Error(error);
        let jsonResponse = JSON.parse(body);
        jsonResponse.values.forEach(element => {
            if (element.accountId.startsWith('qm:')) {
                accountIds.push(element.accountId);
            }
        });    
        console.log(accountIds);
        var bodyData = {
            accountIds: ['qm:9eefea27-59e0-4ac7-863f-491db58cb02a:cbc32416-12a3-4c3b-9940-1c863be212ce',],
        };
        var newOptions = {
            method: 'POST',
            url: 'https://dequecsddev.net/rest/servicedeskapi/request/10103/participant',
            auth: { username: 'jonathan.thickens@deque.com', password: 'j0VEP5Ia8BngJnzcIm6pC00B' },
            headers: {
                'Accept': 'application/json'
            },
            body: JSON.stringify(bodyData),
        };
        request(newOptions, function (error, response, body) {
            if (error) throw new Error(error);
            res.send(body);
            console.log(body);
            console.log(
                'add all org membersss response: ' + response.statusCode + ' ' + response.statusMessage
          );
        });
    });
});

//create new comment
app.post('/comments', cors(corsOptions), (req, res) => {

    var request = require('request');

    var bodyData = {
      public: true,
      body: req.body.value
    };
    
    var options = {
       method: 'POST',
       url: 'https://dequecsddev.atlassian.net/rest/servicedeskapi/request/'+req.body.requestId+'/comment',
       auth: { username: 'jonathan.thickens@deque.com', password: 'j0VEP5Ia8BngJnzcIm6pC00B' },
       headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
       },
       body: JSON.stringify(bodyData),
    };
    
    request(options, function (error, response, body) {
       if (error) throw new Error(error);
       console.log(
        'Post Comment Response: ' + response.statusCode + ' ' + response.statusMessage
        );
        res.send(body);
    });
});

//create new request
app.post('/requests', cors(corsOptions), (req, res) => {

    if(req.files === null) {
        console.log('no file upload')
    } else {
        const file = req.files.file;
        console.log('file:', file);
    }

    var request = require('request');
    let type = req.body.type;
    let value = '';

    if(type === 'Report A Problem') {
        value = '10008';
    } else if(type === 'Request Training') {
        value = '10006';
    } else if(type === 'Request A Feature') {
        value = '10009';
    }else if(type === 'Provide Feedback') {
        value = '10012';
    }else if(type === 'Other' || type === '') {
        value = '10011';
    }else if(type === 'Ask A Question') {
        value = '10010';
    } else {
        value = type;
    }

    if (req.body.product === '') {
        req.body.product = 'Other';
    }

    var bodyData = {
        serviceDeskId: "1",
        requestTypeId: value,
        requestFieldValues: {
            summary: req.body.summary,
            description: req.body.description,
            customfield_10036: {
                value: req.body.product
            },
            customfield_10038: req.body.additional
        }
    };

    var options = {
        method: 'POST',
        auth: { username: 'jonathan.thickens@deque.com', password: 'j0VEP5Ia8BngJnzcIm6pC00B' },
        url: 'https://dequecsddev.atlassian.net/rest/servicedeskapi/request',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(
            'Post Request Response: ' + response.statusCode + ' ' + response.statusMessage
        );
        twillio.messages.create({
            to: '+12183937222',
            from: '+12055375658',
            body: 'New CSD ticket: '+req.body.summary,
        });
        res.sendStatus(response.statusCode);
    });
});

app.post('/upload', (req, res) => {

    if(req.files === null) {
        res.status(400).json({msg: 'No File Uploaded'});
    }
    
    // file.mv(`../public/uploads/${file.name}`, err => {
    //     return res.status(500).send(err);
    // })

    //fs.readFile(`../public/uploads/${file.name}`, "utf8", (err, data) => {
    // fs.readFile('../public/uploads/testFile.txt', "utf8", (err, data) => {
    //     if (!err) {
    //         console.log('successful open of file');
    //         console.log(data)
    //     } else {
    //         console.log('unsuccessful open of file');
    //         console.log(err);
    //     }
    // });

    //const form = req.files.file;
    const form = new FormData();
    //form.append('file', fs.createReadStream('../public/uploads/testFile.txt'));
    form.append('file', fs.readFileSync('../public/uploads/testFile.txt'));

    axios.post('https://dequecsddev.atlassian.net/rest/servicedeskapi/servicedesk/1/attachTemporaryFile', form, {
        headers: {
            'X-ExperimentalApi': 'opt-in',
            'X-Atlassian-Token': 'no-check',
            'Content-Type': 'false',
        },
        auth: { username: 'jonathan.thickens@deque.com', password: 'j0VEP5Ia8BngJnzcIm6pC00B' }, 
    }).then(response => {
        console.log('post jira response success', response.status);
        res.sendStatus(response.response.status);
    }).catch(err => {
        console.log('err catch:', err.response);
        res.sendStatus(err.response.status);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));