var searchInput = "";

function runSecondApi() {
  getImageFromBing();
  clearInputAfterSubmit();
}

function clearInputAfterSubmit() {
  $('input[name=search]').val('');
}

function getImageFromBing() {
  searchInput = document.getElementById('search').value;
  var url = "https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=" + encodeURIComponent(searchInput) + "&mkt=en-US&SafeSearch=strict&aspect=all&count=25&offset=0";
  var type = "GET";

  var logRequest = {
    'api': 'bing',
    'type': type,
    'url': url,
    'Date': Date(),
  };

    $.ajax({
      type: type,
      url: url,
      beforeSend: function(xhrObj){
        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "303acf5ed6c44527866c6d7831303ff9");
      },

      success: function(data, response) {
        localStorage.setItem("logBingSuccess_" + localStorage.length, JSON.stringify(data));
        localStorage.setItem("logBingRequest_" + localStorage.length, JSON.stringify(logRequest));
        console.log(logRequest);

        for (var index = 0; index < 10; index++) {
          if (index < 3) {
            $("#picture").append('<li clasa="picture">' + data.value[index].name + '</li>');
            $("#picture").append('<li clasa="picture">' + '<img src="' + data.value[index].thumbnailUrl + '" />' + '</li><br>');
          }
          saveBingImages(data.value[index].name, data.value[index].thumbnailUrl);
        }
      },

      error: function(data, response){
        localStorage.setItem("logBingError_" + localStorage.length, JSON.stringify(data));
        localStorage.setItem("logBingRequest_" + localStorage.length, JSON.stringify(logRequest));
        console.log(logRequest);
		  },
    });
}

function saveBingImages(imageName, imageUrl) {
  var bingObject = {
      'name': imageName,
      'link': imageUrl,
  };

  localStorage.setItem('image_' + localStorage.length, JSON.stringify(bingObject));
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('submit-bing').addEventListener('click', runSecondApi);
});
