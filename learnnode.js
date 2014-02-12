//1. HELLO WORLD
//console.log("HELLO WORLD");

//2. BABY STEPS
//console.log(process.argv.slice(2).reduce(function(previous,current,index,array){return Number(previous) + Number(current);}));

//3. MY FIRST I/O!
//var fs = require('fs');
//var buf = fs.readFileSync(process.argv.pop());
//console.log(buf.toString().split('\n').length-1);

//4. MY FIRST ASYNC I/O!
//var fs = require('fs');
//fs.readFile(process.argv.pop(),'utf8',function(err,data){
//  console.log(data.split('\n').length-1);
//})  

//5. FILTERED LS
//var fs = require('fs');
//var filter = process.argv.pop();
//var path = process.argv.pop();
//fs.readdir(path, function(err, list){
//  list.forEach(function(file,index){
//    if(file.indexOf("."+filter) != -1){
//      console.log(file);
//    }
//  })
//})

//6. MAKE IT MODULAR
//var list = require('/home/ji/code/myproject/nodeschool/readdir');
//var filter = process.argv.pop();
//var path = process.argv.pop();
//list(path,filter,function(err,files){
//  if (err) {
//    console.log(err);
//    console.log("there is some wrong!");
//  } else {
//    files.forEach(function(file){
//      console.log(file);
//    })
//  }
//})

//7. HTTP CLIENT
//var http = require('http');
//var site = process.argv.pop();
//http.get(site,function(res){
//  res.setEncoding('utf8');  
//  res.on('data',function(data){
//    console.log(data);
//  })
//})

//8. HTTP COLLECT
//var http = require('http');
//var url = process.argv.pop();
//http.get(url,function(res){
//  var result = '';
//  res.on('data',function(data){
//    result += data.toString();
//  })
//  res.on('end',function(){
//    console.log(result.length);
//    console.log(result);
//  })
//})

//9. JUGGLING ASYNC
//var http = require('http');
//var results = [];
//var count = 0;
//
//function printResults() {
  //for (var i = 0; i< 3; i++) {
    //console.log(results[i]);
  //}
//}
//
//function httpGet (index) {
  //http.get(process.argv[2+index],function(res){
    //res.setEncoding('utf8');
    //var result = "";
    //res.on('data',function(data){
      //result += data;
    //})
    //res.on('end',function(){
      //results[index] = result;
      //count++;
    //})
    //if (count == 3){
      //printResults();
    //}
  //})
//}

//for (var i = 0;i<3;i++){
  //httpGet(i);
//}

//10. Time Server
//var net = require("net");
//function pad(n) {return n < 10 ? '0'+ n : n }
//var server = net.createServer(function(socket){
  //var d = new Date();
  //var s = d.getFullYear() + "-"
    //+ pad(d.getMonth()+1) + "-"
    //+ pad(d.getDate()) + " " 
    //+ pad(d.getHours()) + ":"
    //+ pad(d.getMinutes()) + "\n";
  //socket.end(s);
//})
//server.listen(process.argv[2]);

//11.HTTP FILE SERVER
//var fs = require('fs');
//var http = require("http");
//var server = http.createServer(function(res,rep){
  //fs.createReadStream(process.argv[3]).pipe(rep);
//})
//server.listen(process.argv[2])

//12. HTTP UPPERCASERER
//var http = require("http");
//var map = require('through2-map');
//var server = http.createServer(function(res,rep){
  //if (res.method == 'POST') {
    //res.pipe(map(function(chunk){
      //return chunk.toString().toUpperCase();
    //})).pipe(rep)
  //}
//});
//server.listen(process.argv[2]);

//13. HTTP JSON API SERVER
//**********
//url.parse('/test?q=1',true)
//{ protocol: null,
  //slashes: null,
  //auth: null,
  //host: null,
  //port: null,
  //hostname: null,
  //hash: null,
  //search: '?q=1',
  //query: { q: '1' },
  //pathname: '/test',
  //path: '/test?q=1',
  //href: '/test?q=1' }
//******************************

var http = require("http");
var url = require("url");
var routes = {
  'api/parsetime': function(parsedUrl) {
    var d = new Date(parsedUrl.query.iso);
    return {
      hour: d.getHours(),
      minute: d.getMinutes(),
      second: d.getSeconds()
    };
  },
  'api/unixtime': function(parsedUrl) {
    return {unixtime: (new Date(parsedUrl.query.iso)).getTime()};
  }
}
var server = http.createServer(function(req,res){
  var parsedUrl = url.parse(req.url, true);
  var resource = routes[parsedUrl.pathname];
  if(resource) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(resource(parsedUrl)));
  } else {
    res.writeHead(404);
    res.end();
  }
})
server.listen(process.argv[2]);