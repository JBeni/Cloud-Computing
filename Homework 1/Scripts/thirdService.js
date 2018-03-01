
function autentificareGithub() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var url = 'https://api.github.com/authorizations';

  var type = "POST";
  var logRequest = {
    'api': 'bing',
    'type': type,
    'url': url,
    'Date': Date(),
  };

  $.ajax({
    url: url,
    type: type,
    beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ':' + password));
    },

    data: '{"scopes": ["gist"], "note": "Put data to a file"}',
  }).done(function(response) {
    localStorage.setItem("logGithubAuthDone_" + localStorage.length, JSON.stringify(response));
    localStorage.setItem("logRequest_" + localStorage.length, JSON.stringify(logRequest));
    console.log(logRequest);

    token = response.token;
    createGist(token);
  }).fail(function(response) {
    localStorage.setItem("logGithubAuthFail_" + localStorage.length, JSON.stringify(response));
    localStorage.setItem("logRequest_" + localStorage.length, JSON.stringify(logRequest));
    console.log(logRequest);
  });
}

function createGist(token) {
  var description = document.getElementById('description').value;
  var fileName = document.getElementById('fileName').value;
  fileName = fileName + '.md';
  var dataContent = getDataFromLocalStorage();
  //var dataContent = "File \n String";

  var content = '{"description": "' + description + '", "public": true, "files": {"' + fileName + '": { "content": "' + dataContent + '" }}}';
  var url = 'https://api.github.com/gists';

  var type = "POST";
  var logRequest = {
    'api': 'bing',
    'type': type,
    'url': url,
    'Date': Date(),
  };

	$.ajax({
  	url: url,
  	type: type,
  	beforeSend: function(xhr) {
  	  xhr.setRequestHeader("Authorization", "token " + token);
  	},

  	data: content,
  }).done(function(data, response) {
      localStorage.setItem("logGithubGistDone_" + localStorage.length, JSON.stringify(data));
      localStorage.setItem("logRequest_" + localStorage.length, JSON.stringify(logRequest));
      console.log(logRequest);
  }).fail(function(data, response) {
    localStorage.setItem("logGithubGistFail_" + localStorage.length, JSON.stringify(data));
    localStorage.setItem("logRequest_" + localStorage.length, JSON.stringify(logRequest));
    console.log(logRequest);
  });
}

function getDataFromLocalStorage() {
  var content = '';
  var number_data = 0;
  var number_image = 0;

  for (var index = 0; index < localStorage.length; index++) {
    var key = localStorage.key(index);
    var localData = key.split("_");

    if (localData[0] == "data" && number_data < 1) {
      var adnotare = localStorage.getItem(key);
      var jsonData = JSON.parse(adnotare);

      content += "<p>" + jsonData.name + "</p>";
      content += "<p>" + jsonData.info + "</p>";
      content += "<p>" + jsonData.link + "</p> <br>";

      number_data = number_data + 1;
    }else if (localData[0] == "image" && number_image < 1) {
      var adnotare = localStorage.getItem(key);
      var jsonData = JSON.parse(adnotare);

      content += "<p>" + jsonData.name + "</p>";
      content += "<img src='" + jsonData.link + "' > <br>";

      number_image = number_image + 1;
    }
  }
  return content;
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('submit-github').addEventListener('click', autentificareGithub);
});
