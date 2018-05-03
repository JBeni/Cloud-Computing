const https = require('https');

module.exports = function (context, req) {
  var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=Iasi&dataType=json";

  https.get(url, response => {
    response.setEncoding("utf8");
    var body = "";
    response.on("data", data => {
      body += data;
    });
    response.on("end", () => {
      var datas = JSON.parse(body);
      var content = "<html><head><style> * {background-color: white} </style></head><body><ul>";

      for (var index = 0; index < 10; index++) {
        if (datas[1][index])
          content += "<li>" + (index + 1) + ". " + datas[1][index] + "</li><br/>";
        if (datas[3][index])
          content += "<li>" + " <a href='" + datas[3][index] +  "'>" + datas[3][index] + "</a></li><br/>";
        if (datas[2][index])
          content += "<li>" + " " + datas[2][index] + "</li><br>";
        content += "<br/><br/>";
      }
      content += "</ul></body></html>";
      
      context.res = {
        headers: 'text/html',
        body: content
      };
      context.done();
    });
  });
};
