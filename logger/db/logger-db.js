
var DataStore = require('nedb');
var {NEDBconnect} =require('../../bin/storage/nedb-connector.js');

var arequestlog=(rl=null)=>{
  if(!rl||rl==undefined){rl={};}
  return {
    url:rl.url||null,
    timein:rl.timein || null,
    timeout:rl.timeout || null,
    timerun:rl.timerun || null,
    access:rl.access||{user:'',pswrd:'',coid:'',appid:''},
    pack:rl.pack||{},
    success:rl.success||false
  }
}


class LogStore extends NEDBconnect{
  constructor(docs){
    super(docs);
  }

  LOGrequeststart=(reqitem = {})=>{
      reqitem.timein = new Date().getTime();
      return this.INSERTdb(arequestlog(reqitem));
  }
  LOGrequestend=(reqitem={})=>{
    reqitem=arequestlog(reqitem);
    reqitem.timeout = new Date().getTime();
    reqitem.timerun = reqitem.timeout - reqitem.timein;
    reqitem.timeout = new Date().getTime();
    console.log(reqitem);
    return this.UPDATEdb(reqitem);
  }
  GETlog = (flts={})=>{
    return this.QUERYdb(flts);
  }
}


var vapilogger = new LogStore(__dirname+'/store/vapi-log.db');


module.exports={
  arequestlog,
  vapilogger
}
