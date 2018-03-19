var http = require('http');
var fs = require('fs');
var glob = 20;

http.createServer(function(req, res) {
    fs.readFile('database.json', 'utf-8', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
    
      if (err) throw err;
      var jsonData = JSON.parse(data);

      // GET -> HTTP Method
      if (req.url == "/products") {
        res.write(data + "<br/><br/>" + "HTTP Status Code: 200, OK");
      }else if(req.url == "/products/fruit") {
        var content = "";
        for(var x in jsonData.products)
          content += JSON.stringify(jsonData.products[x]) + "<br/>";
        res.write(content + "<br/><br/>" + "HTTP Status Code: 200, OK");

      }else if (req.url.split("=")[0] == "/products/fruit?") {
        // /product/fruit?=numeCamp (product_1)
        var requestUrl = req.url.split('?');
        var fruitName = requestUrl[1].replace("=", "");

        res.write(JSON.stringify(jsonData["products"][fruitName]) + "<br/><br/>" + "HTTP Status Code: 200, OK");
      }else if (req.url.split("=")[0] == "/products/fruit" && req.url.split("&")[1] == "method=post") {
        // POST /products/fruit=banana&method=post
        var fruitName = req.url.split("=")[1].split("&")[0];

        var fruitObject = {
          "id": 7,
          "name": "something",
          "category": "tr",
          "vitamins": "C,F,B"
        };
         
        jsonData["products"][fruitName] = fruitObject;
        fs.writeFile('database.json', JSON.stringify(jsonData), finish);
        function finish() {
          console.log("Ending...");
        }
        
        res.write("Collection Created: " + "<br/><br/>" + "HTTP Status Code: 201, Created");
      }else if (req.url.split("=")[0] == "/products/fruit" && req.url.split("&")[1] == "method=put") {
        // PUT /products/fruit=numeCamp&method=numeMetoda
        // e.x: product_1
        var productName = req.url.split("=")[1].split("&")[0];
        
        var fruitBeni = {
          "id": 4,
          "name": "ben",
          "category": "word",
          "vitamins": "E, T"
        };

        jsonData = JSON.parse(JSON.stringify(jsonData).split('"' + productName +'"').join('"beniamin"'));
        jsonData["products"]["beniamin"] = fruitBeni;
          
        fs.writeFile('database.json', JSON.stringify(jsonData), finish);
        function finish() {
          console.log("Ending...");
        }
        res.write("<br/><br/> Collection Updated <br/>" + "HTTP Status Code: 200, OK");

      }else if (req.url.split("=")[0] == "/products/fruit/item" && req.url.split("&")[1] == "method=put") {
        // PUT /products/fruit/item=numeFruit&method=numeMetoda
        var fruitName = req.url.split("=")[1].split("&")[0];
        
        var fruit = {
          "category": "world_war_2",
          "vitamins": "A,B1,B3,B6,D"
        };
        
        var flag = 0;
        for (var i in jsonData.products)
          if (fruitName == jsonData.products[i].name)
            flag = 1;

        if (flag == 1) {
          for (var j in Object.keys(jsonData.products))
            if (jsonData["products"][Object.keys(jsonData.products)[j]]["name"] == fruitName)
            var productKey = Object.keys(jsonData.products)[j];

          var fruit = {
            "category": "world_war_2",
            "vitamins": "A,B1,B3,B6,D"
          };
          jsonData["products"][productKey] = fruit;
        }else if (flag == 0) {
          var fruit = {
            "id": 5,
            "name": fruitName,
            "category": "world_war_1",
            "vitamins": "B1,B3,B6"
          };
          jsonData["products"]["product_" + glob] = fruit;
          glob += glob + 1;
        }
        
        fs.writeFile('database.json', JSON.stringify(jsonData), finish);
        function finish() {
          console.log("Ending...");
        }

        res.write("Item Updated <br/>" + "HTTP Status Code: 200, OK");
      }else if (req.url.split("&")[0] == "/products" && req.url.split("&")[1] == "method=delete") {
        // Delete all inreg
        delete jsonData["products"];

        fs.writeFile('database.json', JSON.stringify(jsonData), finish);
        function finish() {
          console.log("Ending...");
        }

        res.write("<br/><br/> Database Deleted <br/>" + "HTTP Status Code: 200, OK")
      }else if (req.url.split("=")[0] == "/products/fruit" && req.url.split("&")[1] == "method=delete") {
        // Delete /products/fruit=numeFruit&method=numeMetoda
        var fruitName = req.url.split("=")[1].split("&")[0];
        for (var j in Object.keys(jsonData.products))
          if (jsonData["products"][Object.keys(jsonData.products)[j]]["name"] == fruitName)
            var productKey = Object.keys(jsonData.products)[j];

        delete jsonData["products"][productKey];
        fs.writeFile('database.json', JSON.stringify(jsonData), finish);
        function finish() {
          console.log("Ending...");
        }
        res.write("<br/><br/> Collection Deleted <br/>" + "HTTP Status Code: 200, OK")

      }else if (req.url.split("=")[0] == "/products/fruit/item" && req.url.split("&")[1] == "method=delete") {
        // Delete /products/fruit/item=numeFruit&method=numeMetoda
        var fruitName = req.url.split("=")[1].split("&")[0];

        for (var j in Object.keys(jsonData.products))
          if (jsonData["products"][Object.keys(jsonData.products)[j]]["name"] == fruitName)
            var productKey = Object.keys(jsonData.products)[j];

        delete jsonData["products"][productKey]["category"];
        delete jsonData["products"][productKey]["vitamins"];

        fs.writeFile('database.json', JSON.stringify(jsonData), finish);
        function finish() {
          console.log("Ending...");
        }

        res.write("<br/><br/> Item Deleted <br/>" + "HTTP Status Code: 200, OK")
      }else {
        // Default Instruction
        res.write(req.url);
      }

      res.end();
    });
}).listen(9696);
console.log("Server runs at port: 9696");

