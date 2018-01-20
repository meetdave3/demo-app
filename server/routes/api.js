const express = require('express');
var request = require("request");
const router = express.Router();

var successResponse = {};
var userDetails = {};

router.post('/login', function(req,res){

    let username = req.body.username;
    let password = req.body.password;

    userDetails = req.body;

    var options = 
    { 
        method: 'POST',
        url: 'http://masjid-app.com:8080/portal-rest/oauth/token',
        headers: 
        {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/x-www-form-urlencoded'    
        }, 
        form: 
        { 
            grant_type: 'password',
            client_id: 'portal_app',
            client_secret: 'portal_app_s3cr3t',
            username: req.body.username,
            password: req.body.password,
            scope: 'read,write,trust' 
        } 
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        let jsonObject = JSON.parse(body);
        console.log(jsonObject);
        if (jsonObject.token_type) {
            successResponse = jsonObject;
            res.json('success');
        } else if (jsonObject.error) {
            res.json('incorrectpass');
        } else {
            res.json('error');
        }
    });
});

router.get('/checkaccess', function(req,res) {

    if (!successResponse.access_token || !userDetails.username) {
        res.json('error');
    }

    let access_token = successResponse.access_token;

    var options = { method: 'GET',
    url: 'http://masjid-app.com:8080/portal-rest/account',
    headers: 
    {
        'Cache-Control': 'no-cache',
        Authorization: 'Bearer ' + access_token 
    },
    form: 
    { 
        grant_type: 'password',
        client_id: 'portal_app',
        client_secret: 'portal_app_s3cr3t',
        username: userDetails.username,
        password: userDetails.password,
        scope: 'read,write,trust' } };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        let jsonObject = JSON.parse(body);
        if (!jsonObject.customerId) {
            res.json('error');
        } else {
            res.json('success');
        }
    });

})

router.get('/getfamilydata', function(req,res) {

    if (!successResponse.access_token || !userDetails.username) {
        res.json('error');
    }

    let access_token = successResponse.access_token;

    var options = { method: 'GET',
    url: 'http://masjid-app.com:8080/portal-rest/familyMembers',
    headers: 
    { 
        'Cache-Control': 'no-cache',
        Authorization: 'Bearer ' + access_token
    },
    body: '{\n    "firstName": "TF7",\n    "middleName": "TM7",\n    "lastName": "TL7",\n    "email": "tfl7@test.com",\n    "gender": "Male",\n    "dob": "2010-07-10",\n    "relation": "SON"\n  }' };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        let jsonObject = JSON.parse(body);
        if (jsonObject.error) {
            res.json('error');
        } else if (jsonObject.length == 0) {
            res.json('nodata');
        } else if (jsonObject.length > 1) {
            res.json(jsonObject);
        }
    })
});

module.exports = router;