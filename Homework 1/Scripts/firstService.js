var searchInput = "";

function setup() {
//    if ($("ul li").length > 1)
//      $("ul li").remove();
    getDataFromWikipedia();

    $('input[name=search]').val('');
}

function getDataFromWikipedia() {
  searchInput = document.getElementById('search').value;
  var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchInput + "&callback=?";

    $.ajax({
      type: "GET",
      url: url,
      async: false,
      dataType: "json",
      success: function(data, response) {
        localStorage.setItem("logWikipedia_" + localStorage.length, JSON.stringify(data));

        for (var index = 0; index < 10; index++) {
          if (data[1][index]) {
    				$("#informatii").append("<li clasa='keyword'>" + (index + 1) + ". " + data[1][index] + "</li>");
    				$("#informatii").append("<li>" + " <a href='" + data[3][index] +  "'>" + data[3][index] + "</a></li>");
    				$("#informatii").append("<li>" + " " + data[2][index] + "</li>");
            $("#informatii").append("<br>");
            saveWikipediaData(data[1][index], data[2][index], data[3][index]);
          }
        }
        $("#informatii").append("<br> <br>");
      },

      error: function(data, response){
        localStorage.setItem("logWikipedia_" + localStorage.length, JSON.stringify(data));
      },
    });
}

function saveWikipediaData(firstData, secondData, thirdData) {
  var wikipediaObject = {
      'name': firstData,
      'info': secondData,
      'link': thirdData,
  };
  localStorage.setItem('data_' + localStorage.length, JSON.stringify(wikipediaObject));
}

function export_json() {
	var contentjson = '';

	for (var index = 0; index < localStorage.length; index++) {
		var key = localStorage.key(index);
    var localData = key.split("_");

    if (localData[0] == "data") {
  		var adnotare = localStorage.getItem(key);
  		var jsonData = JSON.parse(adnotare);

  		contentjson += '{\n\t'.toString();
  		contentjson += '"data_id": "'.toString();
  		contentjson += key.toString() + '",\n\t\t'.toString();

  		contentjson += '"name": "'.toString();
  		contentjson += jsonData.name + '",\n\t\t'.toString();

  		contentjson += '"link": "'.toString();
  		contentjson += jsonData.link + '",\n\t\t'.toString();

  		contentjson += '"info": "'.toString();
  		contentjson += jsonData.info + '",\n'.toString();

  		contentjson += '}\n\n'.toString();
    }else if(localData[0] == "image") {
      var adnotare = localStorage.getItem(key);
  		var jsonData = JSON.parse(adnotare);

  		contentjson += '{\n\t'.toString();
  		contentjson += '"image_id": "'.toString();
  		contentjson += key.toString() + '",\n\t\t'.toString();

  		contentjson += '"name": "'.toString();
  		contentjson += jsonData.name + '",\n\t\t'.toString();

  		contentjson += '"link": "'.toString();
  		contentjson += jsonData.link + '",\n'.toString();

  		contentjson += '}\n\n'.toString();
    }
	}

	let jsonContent = "data:text/json; charset=utf-8,";
	jsonContent += contentjson;
	var encodedUri = encodeURI(jsonContent);
	var link = document.createElement("a");
	link.setAttribute("href", encodedUri);
	link.setAttribute("download", "localStorageData.json");
	document.body.appendChild(link);

	link.click();
}
