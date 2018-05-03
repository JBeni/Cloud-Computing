const bodyParser = require('body-parser');
const path = require('path');
const azure = require('azure-storage');
const express = require('express');
const app = express();


app.get('/', (req, res) => { 
  res.sendFile(path.join(__dirname + '/index.html'));
});


app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/upload', (req, res) => {
  for (var index = 0; index < req.body.files.length; index++) {
    uploadImageStorage(req.body.files[index]);
  }
  res.end();
});


// Azure Storage
function uploadImageStorage(imageName, imageLink) {
  var blobService = azure.createBlobService('storage-name', 'access key');

  blobService.createBlockBlobFromLocalFile('images', imageName, imageLink, function(error, result, response) {
    if (!error) {
      console.log("Upload: done it...");
    }else {
      console.log("Error...." + error);
    }
  });  
}


// Start the server
const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
