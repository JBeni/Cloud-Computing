
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('export_log_github').addEventListener('click', writeLogFileGithub);
});

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('export_log_wikipedia_bing').addEventListener('click', writeLogFileWikipedia_Bing);
});

function writeLogFileWikipedia_Bing() {
  var content = '';

  for (var index = 0; index < localStorage.length; index++) {
    var key = localStorage.key(index);
    var localData = key.split("_");

	  var adnotare = localStorage.getItem(key);
    if (localData[0] == "logWikipediaError") {
       var jsonData = JSON.parse(adnotare);

   		 content += '{\n\t'.toString();
   		 content += '"logBingError": "'.toString();
   		 content += key.toString() + '",\n\t\t'.toString();

       content += '"readyState": "'.toString();
   		 content += jsonData.readyState + '",\n\t\t'.toString();

       content += '"status": "'.toString();
   		 content += jsonData.status + '",\n\t\t'.toString();

       content += '"statusText": "'.toString();
   		 content += jsonData.statusText + '",\n'.toString();

   		 content += '}\n\n'.toString();
    }else if(localData[0] == "logBingError") {
      var jsonData = JSON.parse(adnotare);

      content += '{\n\t'.toString();
      content += '"logBingError": "'.toString();
      content += key.toString() + '",\n\t\t'.toString();

      content += '"readyState": "'.toString();
      content += jsonData.readyState + '",\n\t\t'.toString();

      content += '"message": "'.toString();
      content += jsonData.responseJSON.message + '",\n\t\t'.toString();

      content += '"statusCode": "'.toString();
      content += jsonData.responseJSON.statusCode + '",\n\t\t'.toString();

      content += '"status": "'.toString();
      content += jsonData.status + '",\n\t\t'.toString();

      content += '"statusText": "'.toString();
      content += jsonData.statusText + '",\n'.toString();

      content += '}\n\n'.toString();
    }
  }

  let jsonContent = "data:text/json; charset=utf-8,";
  jsonContent += content;
  var encodedUri = encodeURI(jsonContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "logDataWikipediaBing.json");
  document.body.appendChild(link);

  link.click();
}

/*  -----------------------------------------------------  */


function writeLogFileGithub() {
  var content = '';

  for (var index = 0; index < localStorage.length; index++) {
    var key = localStorage.key(index);
    var localData = key.split("_");

	  var adnotare = localStorage.getItem(key);
    if (localData[0] == "logGithubAuthDone") {
       var jsonData = JSON.parse(adnotare);

   		 content += '{\n\t'.toString();
   		 content += '"logGithubAuthDone": "'.toString();
   		 content += key.toString() + '",\n\t\t'.toString();

       content += '"app.name": "'.toString();
   		 content += jsonData.app.name + '",\n\t\t'.toString();

       content += '"app.client_id": "'.toString();
   		 content += jsonData.app.client_id + '",\n\t\t'.toString();

       content += '"app.url": "'.toString();
   		 content += jsonData.app.url + '",\n\t\t'.toString();

   		 content += '"created_at": "'.toString();
   		 content += jsonData.created_at + '",\n\t\t'.toString();

       content += '"fingerprint": "'.toString();
   		 content += jsonData.fingerprint + '",\n\t\t'.toString();

       content += '"hashed_token": "'.toString();
   		 content += jsonData.hashed_token + '",\n\t\t'.toString();

       content += '"id": "'.toString();
   		 content += jsonData.id + '",\n\t\t'.toString();

       content += '"note": "'.toString();
   		 content += jsonData.note + '",\n\t\t'.toString();

       content += '"note_url": "'.toString();
   		 content += jsonData.note_url + '",\n\t\t'.toString();

       content += '"scopes": "'.toString();
   		 content += jsonData.scopes + '",\n\t\t'.toString();

       content += '"token": "'.toString();
   		 content += jsonData.token + '",\n\t\t'.toString();

       content += '"token_last_eight": "'.toString();
   		 content += jsonData.token_last_eight + '",\n\t\t'.toString();

       content += '"updated_at": "'.toString();
   		 content += jsonData.updated_at + '",\n\t\t'.toString();

       content += '"url": "'.toString();
   		 content += jsonData.url + '",\n'.toString();

   		 content += '}\n\n'.toString();
    }else if(localData[0] == "logGithubGistDone") {
      var jsonData = JSON.parse(adnotare);

      content += '{\n\t'.toString();
      content += '"logGithubGistDone": "'.toString();
      content += key.toString() + '",\n\t\t'.toString();

      content += '"comments": "'.toString();
      content += jsonData.comments + '",\n\t\t'.toString();

      content += '"comments_url": "'.toString();
      content += jsonData.comments_url + '",\n\t\t'.toString();

      content += '"commits_url": "'.toString();
      content += jsonData.commits_url + '",\n\t\t'.toString();

      content += '"created_at": "'.toString();
      content += jsonData.created_at + '",\n\t\t'.toString();

      content += '"description": "'.toString();
      content += jsonData.description + '",\n\t\t'.toString();

      content += '"files": "'.toString();
      content += jsonData.files + '",\n\t\t'.toString();

      content += '"forks_url": "'.toString();
      content += jsonData.forks_url + '",\n\t\t'.toString();

      content += '"git_pull_url": "'.toString();
      content += jsonData.git_pull_url + '",\n\t\t'.toString();

      content += '"git_push_url": "'.toString();
      content += jsonData.git_push_url + '",\n\t\t'.toString();

      content += '"history": "'.toString();
      content += jsonData.history + '",\n\t\t'.toString();

      content += '"html": "'.toString();
      content += jsonData.html_url + '",\n\t\t'.toString();

      content += '"id": "'.toString();
      content += jsonData.id + '",\n\t\t'.toString();

      content += '"owner": "'.toString();
      content += jsonData.owner + '",\n\t\t'.toString();

      content += '"public": "'.toString();
      content += jsonData.public + '",\n\t\t'.toString();

      content += '"truncated": "'.toString();
      content += jsonData.truncated + '",\n\t\t'.toString();

      content += '"updated_at": "'.toString();
      content += jsonData.updated_at + '",\n\t\t'.toString();

      content += '"user": "'.toString();
      content += jsonData.user + '",\n\t\t'.toString();

      content += '"url": "'.toString();
      content += jsonData.url + '",\n'.toString();

      content += '}\n\n'.toString();
    }else if(localData[0] == "logGithubAuthFail") {
      var jsonData = JSON.parse(adnotare);

      content += '{\n\t'.toString();
      content += '"logGithubAuthFail": "'.toString();
      content += key.toString() + '",\n\t\t'.toString();

      content += '"readyState": "'.toString();
      content += jsonData.readyState + '",\n\t\t'.toString();

      content += '"message": "'.toString();
      content += jsonData.responseJSON.message + '",\n\t\t'.toString();

      content += '"documentation_url": "'.toString();
      content += jsonData.responseJSON.documentation_url + '",\n\t\t'.toString();

      content += '"status": "'.toString();
      content += jsonData.status + '",\n\t\t'.toString();

      content += '"statusText": "'.toString();
      content += jsonData.statusText + '",\n'.toString();

      content += '}\n\n'.toString();
    }else if(localData[0] == "logGithubGistFail") {
      var jsonData = JSON.parse(adnotare);

      content += '{\n\t'.toString();
      content += '"logGithubGistFail": "'.toString();
      content += key.toString() + '",\n\t\t'.toString();

      content += '"readyState": "'.toString();
      content += jsonData.readyState + '",\n\t\t'.toString();

      content += '"message": "'.toString();
      content += jsonData.responseJSON.message + '",\n\t\t'.toString();

      content += '"documentation_url": "'.toString();
      content += jsonData.responseJSON.documentation_url + '",\n\t\t'.toString();

      content += '"status": "'.toString();
      content += jsonData.status + '",\n\t\t'.toString();

      content += '"statusText": "'.toString();
      content += jsonData.statusText + '",\n'.toString();

      content += '}\n\n'.toString();
    }
  }

  let jsonContent = "data:text/json; charset=utf-8,";
  jsonContent += content;
  var encodedUri = encodeURI(jsonContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "logDataGithub.json");
  document.body.appendChild(link);

  link.click();
}
