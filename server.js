// server.js
// where your node app starts

// init project
var express = require('express');
var Upload = require('upload-file');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.post('/upload', function(request, response){
  var upload = new Upload({
      dest: 'public/',
	    maxFileSize: 3000 * 1024,
	    acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
	    rename: function(name, file) {
	    	return file.filename;
	    }
  });
  
  upload.on('end', function(fields, files){
    var size = files.file.size;
    
    response.send({
      size
    });
  });
  
  upload.on('error', function(error){
    upload.cleanup();
    response.send(error);
  });
  
  upload.parse(request);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
