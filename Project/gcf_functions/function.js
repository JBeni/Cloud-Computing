const https = require('https');

exports.getData = function getData(req, res) {
  var searchInput = 'Iasi';
  var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchInput + "&dataType=json";

  https.get(url, response => {
    response.setEncoding("utf8");
    var body = "";
    response.on("data", data => {
      body += data;
    });
    response.on("end", () => {
      body = JSON.parse(body);
      var content = "<ul>";
      console.log("body: " + body + "\n");

      for (var index = 0; index < 10; index++) {
        if (body[1][index])
          content += "<li>" + (index + 1) + ". " + body[1][index] + "</li><br/>";
        if (body[3][index])
          content += "<li>" + " <a href='" + body[3][index] +  "'>" + body[3][index] + "</a></li><br/>";
        if (body[2][index])
          content += "<li>" + " " + body[2][index] + "</li><br>";
        content += "<br/><br/>";
      }
      content += "</ul>";
      
      res.status(200).send(content).end();     
    });
  });
};
