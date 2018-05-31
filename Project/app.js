/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 /**
 * gcloud auth application-default login : creeaza acces pt servicii
 * gcloud auth application-default print-access-token : generate access token
 */

//'use strict';

// [START app]
const express = require('express');
const Storage = require('@google-cloud/storage');
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const path = require('path');
const app = express();
const gm = require('gm');
const request = require('request');
const admin = require('firebase-admin');
const https = require('https');
const sgMail = require('@sendgrid/mail');

var serviceAccount = require('./artifacty-app-firebase-adminsdk-ei7yw-4104831239.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();


app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');


// search artefact
app.get('/search' , (req, res) => {
  res.render('index', {lat: 0, long: 0});
});
app.post('/searched', (req, res) => {
  var numeArtefact = req.body.query;
  var UserRef = db.collection('Artifacts').doc(String(numeArtefact));
  var lati = 0;
  var longi = 0;
  var getDoc = UserRef.get()
    .then(doc => {
        lati = doc.data().Lat;
        longi = doc.data().Lng;
        res.render('index', {lat: lati, long: longi});
    });
});


app.get('/', (req, res) => {
  res.sendFile('views/homeNonUser.html', {root: __dirname });
});


// show artefacts from cloud storage
app.get('/list', (req, res) => {
  const storage = new Storage();

  const bucketName = 'artifacty_store';
  var content = "";
  var objectName = "";

 storage
  .bucket(bucketName)
  .getFiles()
  .then(results => {
    const files = results[0];
    files.forEach(file => {
      var numeArtefact = file.name.split('.jpg')[0];

      console.log(file.metadata.mediaLink);
      var fit = file.metadata.mediaLink.replace('download/', '').split('&alt')[0];
      console.log(fit);
      content += "<p>" + numeArtefact + "</p>";
      content += "<img src='" + fit + "'> <br/> <br/>";
    });

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(content);    
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
});

// NEWS FROM Artefacts WORLD
app.get('/news', (req, res) => {
  var cont = "";
  request({
    uri: "https://www.ctvnews.ca/world/archeologists-discover-greco-roman-era-building-in-egypt-1.3941375",
  }, function(error, response, body) {
    cont += body;
    res.send(cont).end();
  });
});

app.get('/login', (req, res) => {
	res.render('loginreg');
});
app.post('/myaction', function(req, res) {
  addUser(req.body.emailsignup, req.body.usernamesignup, req.body.passwordsignup);
  SendEmail(req.body.emailsignup);
  res.render('loginreg');
});
app.post('/loggedin', (req, res) => {
var usr = req.body.username;
var UserRef = db.collection('Users').doc(String(usr));
var getDoc = UserRef.get()
    .then(doc => {
      if(doc.data() != null){
        var pass = doc.data().Password;
        if(pass == req.body.password){
          //  send first page
          //res.send("V-ati logat cu success!");
          res.sendFile('views/home.html', {root: __dirname });
        }
        else {
        	res.render('loginreg');;
        }
      }
      else {
    res.render('loginreg');
    }
    })
    .catch(err => {
      console.log('Error getting document', err);
    });

});


function SendEmail(email){
  sgMail.setApiKey('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');
  const msg = {
    to: 'artifacty.officecc@gmail.com',
    from: email,
    subject: 'New User!',
    text: "His email: " + email,
  };
  sgMail.send(msg);
}

function addUser(email, username, password){
	var docRef = db.collection('Users').doc(String(username));
	var setAda = docRef.set({
	  Email: email,
	  Username: username,
	  Password: password
	});
}

function addArtifact(nume, lat, long){
	var docRef = db.collection('Artifacts').doc(String(nume));
	var setAda = docRef.set({
	  Nume: nume,
	  Lat: lat,
	  Lng: long
	});
}


// Start the server
const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END app]


// for admin -> upload artefacts (data about them)
app.get('/AddArtefacts' , (req, res) => {
	res.render('Artifact');
})
app.get('/AddArtefacts' , (req, res) => {
  res.render('Artifact');
})
app.post('/Add', function(req, res) {
  addArtifact(req.body.nume, req.body.lat, req.body.long);
  res.render('Artifact');
});


