fs = require('fs');
module.exports = function(path,filter,callback){
  var pat = RegExp('\\.'+filter+'$');
  fs.readdir(path, function(err,list){
    if (err) {
      callback(err,null);
    } else {  
      var result = []
      list.forEach(function(file,index){
        if (pat.test(file)){
       	  result.push(file);
        }
      })
      callback(null,result);
    }
  })
}
