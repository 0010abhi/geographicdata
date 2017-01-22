var http = require('http');
var fileStream = require('fs');
// var favicon = require('serve-icon')
var port = 3000;

http.createServer(function(request,response){
  var apiOrTemplate = (request.url.substring(1,4)==='api') ? 'api' : 'template';
  if(apiOrTemplate==='api'){
    var data,country;
    if((request.url).match('/api/states/')){
      country = 'data/states/' + request.url.split('/')[3] + '.json';
      data = fileStream.readFileSync(country);
    };
    if(request.url==='/api/countries'){
      data = fileStream.readFileSync('data/Countries.json');
    };
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(data);
  } else {
//     if(request.url==='/favicon.ico'){
//       fileStream.readFile('favicon.ico',function(err,data){
//         if(err) return console.error(err);
//         response.writeHead(200, {'Content-Type': 'image/x-icon'});
//         //response.write('favicon.ico');
//         response.end(data,'binary');
//       })
//     }
    if(request.url==='/'){
      fileStream.readFile('index.html',function(err,data){
        if(err) return console.error(err);
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data.toString());
        response.end();
      })
    }
    var htmlFile;
    if((request.url).match('/templates/')){
      htmlFile = 'templates/' + request.url.split('/')[2];
      fileStream.readFile(htmlFile, function(err,data){
        if(err) return console.error(err);
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data.toString());
        response.end();
      })
    }
  }
}).listen(port);

console.log('Server started on localhost:'+port);
