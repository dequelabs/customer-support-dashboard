const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const fetch = require('node-fetch');
var JiraClient = require('jira-connector');
const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.options('/comments', cors());
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
        console.log('Response: ' + response.statusCode);
        res.send(body);
    });

    // fs.readFile('../src/assets/issues/issues.json', "utf8", (err, data) => {
    //     if (!err) {
    //         res.append('Content-Type', 'application/json');
    //         res.send(data);
    //     } else {
    //         message = 'unsuccessful open of file'
    //         res.append('Content-Type', 'application/json');
    //         res.send('unsuccessful access attempt');
    //     }
    // });
});

app.get('/issue', async (req, res) => {


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
        console.log('Response: ' + response.statusCode);
        res.send(body);
    });
    //res.send(body.fields.comment.comments[0].body);
    
    // var jira = new JiraClient({
    //     host: 'dequecsddev.atlassian.net',
    //     basic_auth: {
    //       email: 'jonathan.thickens@deque.com',
    //       api_token: 'j0VEP5Ia8BngJnzcIm6pC00B'
    //     }
    //   });
    //   jira.issue.getIssue(
    //     {
    //       issueId: '10011'
    //     },
    //     function(error, issue) {
    //         //res.append(issue.fields.summary);
    //         res.send(issue.fields.comment.comments[0].body);
    //     }
    //   );
});

app.get('/request/*/comment', (req, res) => {

    let issueID = req.url.split('/')[2]

    fs.readFile('../src/assets/comments/'+issueID+'-comments.json', "utf8", (err, data) => {
        if (!err) {
            res.append('Content-Type', 'application/json');
            res.send(data);
        } else {
            message = 'unsuccessful open of file'
            res.append('Content-Type', 'application/json');
            res.send('unsuccessful access attempt');
        }
    });
});

app.post('/comments', cors(corsOptions), (req, res) => {
    if (req.body.name && req.body.date && req.body.value && req.body.requestId) {
        let newComment = [{
            body: req.body.value,
            author: {
                displayName: req.body.name,
            },
            created: {
                friendly: req.body.date,
            },
        }];
        fs.readFile('../src/assets/comments/'+req.body.requestId+'-comments.json', "utf8", (err, data) => {
            if (!err) {
                let existingComments = JSON.parse(data);
                existingComments.values = existingComments.values.concat(newComment);
                let newComments = JSON.stringify(existingComments);
                fs.writeFile('../src/assets/comments/'+req.body.requestId+'-comments.json', newComments, 'utf8', (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
                res.status(200);
                res.append('Content-Type', 'application/json');
                res.send();
            } else {
                res.status(500);
                res.append('Content-Type', 'application/json');
                res.send();
            }
        });
    } else {
        res.status(400);
        res.send();
    }
});

app.post('/requests', cors(corsOptions), (req, res) => {
    if (req.body.summary && req.body.description) { 
        let newReq = [{
            issueId: (Math.floor((Math.random() * 100000) + 1)).toString(),
            issueKey: 'DC-'+Math.floor((Math.random() * 100) + 11),
            requestTypeId: req.body.type,
            createdDate: {
                friendly: "Today 10:02 AM",
            },
            reporter: {
                displayName: "Jonathan Thickens",
            },
            requestFieldValues: [
                {
                    fieldId: "summary",
                    label: "Summary",
                    value: req.body.summary,
                },
                {
                    fieldId: "description",
                    label: "Description",
                    value: req.body.description,
                    
                },
                {
                    fieldId: "additionalInfo",
                    label: "Additional Info",
                    value: req.body.additional,
                },
                {
                    fieldId: "product",
                    label: "Product",
                    value: req.body.product,
                },
            ],
            currentStatus: {
                status: "Open",
            }
        }];
        let saveID = newReq[0].issueId;
        fs.readFile('../src/assets/issues/issues.json', "utf8", (err, data) => {
            if (!err) {
                let existingReq = JSON.parse(data);
                existingReq.values = existingReq.values.concat(newReq);
                let newReqs = JSON.stringify(existingReq);

                fs.writeFile('../src/assets/issues/issues.json', newReqs, 'utf8', (err) => {
                    if (err) {
                        res.status(500);
                        res.append('Content-Type', 'application/json');
                        res.send();
                    }
                });
                fs.readFile('../src/assets/comments/emptyComment.json', "utf8", (err, data) => {
                    if (!err) {
        
                        fs.writeFile('../src/assets/comments/'+saveID+'-comments.json', data, 'utf8', (err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                        res.status(200);
                        res.append('Content-Type', 'application/json');
                        res.send();
                    } else {
                        res.status(500);
                        res.append('Content-Type', 'application/json');
                        res.send();
                    }
                });
            } else {
                res.status(500);
                res.append('Content-Type', 'application/json');
                res.send();
            }
        });
    } else {
        res.status(400);
        res.append('Content-Type', 'application/json');
        res.send();
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));


