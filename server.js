var http = require('http');
var fileStream = require('fs');
// var favicon = require('serve-icon')
var port = process.env.PORT || '3000';

http.createServer(function(request,response){
  var apiOrTemplate = ((request.url).match('api')) ? 'api' : 'template';
  if(apiOrTemplate==='api'){
    var data,country;
    if((request.url).match('/api/states/')){
      country = 'data/states/' + request.url.split('/')[3] + '.json';
      data = fileStream.readFileSync(country);
    };
    if(request.url==='/api/countries'){
      data = fileStream.readFileSync('data/countries.json');
    };
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.end(data);
  } else {
    if(request.url.match('.js')){
      var filePath = '.' + request.url;
      fileStream.readFile(filePath,function(err,data){
        if(err) return console.error(err);
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        //response.write('favicon.ico');
        response.end(data,'utf-8');
      })
    }
    if(request.url.match('.css')){
      var filePath = '.' + request.url;
      fileStream.readFile(filePath,function(err,data){
        if(err) return console.error(err);
        response.writeHead(200, {'Content-Type': 'text/css'});
        //response.write('favicon.ico');
        response.end(data,'utf-8');
      })
    }
    if(request.url==='/favicon.ico'){
      fileStream.readFile('favicon.ico',function(err,data){
        if(err) return console.error(err);
        response.writeHead(200, {'Content-Type': 'image/x-icon'});
        response.write(data,'binary');
        response.end();
      })
    }
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
