const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.options('/comments', cors());
app.use(cors());
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/request', (req, res) => {

    var request = require('request');

    var options = {
        method: 'GET',
        url: 'https://dequecsddev.atlassian.net/rest/servicedeskapi/request',
        auth: { username: 'jonathan.thickens@deque.com', password: 'j0VEP5Ia8BngJnzcIm6pC00B' },
        headers: {
            'Accept': 'application/json'
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.send(body);
    });
});

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
    });
});

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
    });
});


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
    });
});

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
          'Response: ' + response.statusCode + ' ' + response.statusMessage
       );
    });
});

app.post('/requests', cors(corsOptions), (req, res) => {
    
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
        if (response.statusCode === 400) {
            console.log(body);
        }
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));