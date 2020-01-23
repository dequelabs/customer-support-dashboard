const express = require('express');
const app = express();
const port = 3000;

const fs = require('fs');

app.get('/request', (req, res) => {

    fs.readFile('../src/assets/issues.json', "utf8", (err, data) => {
        if (!err) {
            res.append('Access-Control-Allow-Origin', '*');
            res.append('Content-Type', 'application/json');
            res.send(data);
        } else {
            console.log(err);
            message = 'unsuccessful open of file'
            res.append('Access-Control-Allow-Origin', '*');
            res.append('Content-Type', 'application/json');
            res.send('unsuccessful access attempt');
        }
    });
})

app.get('/request/*/comment', (req, res) => {

    let issueID = req.url.split('/')[2]

    fs.readFile('../src/assets/'+issueID+'-comments.json', "utf8", (err, data) => {
        if (!err) {
            res.append('Access-Control-Allow-Origin', '*');
            res.append('Content-Type', 'application/json');
            res.send(data);
        } else {
            console.log(err);
            message = 'unsuccessful open of file'
            res.append('Access-Control-Allow-Origin', '*');
            res.append('Content-Type', 'application/json');
            res.send('unsuccessful access attempt');
        }
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));