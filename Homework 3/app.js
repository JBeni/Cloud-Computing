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

'use strict';

// [START app]
const express = require('express');
const bodyParser = require('body-parser');
const Storage = require('@google-cloud/storage');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const https = require('https');
const app = express();


app.set('view engine', 'ejs');
app.get('/', (req, res) => {
	res.render('index');
});

app.post('/', urlencodedParser, function(req, res) {
  var bucketName = 'our_store';
  var objectName = req.body.locationName;

  if (objectName.length > 0)
    uploadObject(bucketName, objectName);

  res.render('index');
});


function uploadObject(bucketName, objectName) {
  // Creates a client
  const storage = new Storage();
  var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + objectName;

  https.get(url, res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      body += data;
    });
    res.on("end", () => {
      body = JSON.parse(body);
      var center = body.results[0].formatted_address;
      center = center.split(", ").join('+');
      var imagine = `https://maps.googleapis.com/maps/api/staticmap?center=` + center + `&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7Clabel:C%7C${body.results[0].geometry.location.lng},${body.results[0].geometry.location.lat}`;
      
      storage
      .bucket(bucketName)
      .upload(imagine)
      .then(() => {
        console.log(`${imagine} uploaded to ${bucketName}.`);
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
    });
  });
}


app.get('/listObjects', (req, res) => {
  // Creates a client
  const storage = new Storage();

  const bucketName = 'our_store';
  var content = "";
  var objectName = "";
  
  storage
    .bucket(bucketName)
    .getFiles()
    .then(results => {
    const files = results[0];
    files.forEach(file => {
      objectName = file.name;
	    content += '<img src="http://maps.googleapis.com/maps/api/' + objectName + '"/><br/><br/>';
    });

    res.status(200).send(content).end();
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
});


// Start the server
const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END app]
