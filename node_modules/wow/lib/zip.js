require("./config");
var fs = require("fs");
var evts = require("events");
var evt = new evts.EventEmitter();

zip ={
    min : function(){

    },
    pack : function(){
        //console.log(glob);
        zip._readConfig();
        zip._getSrcList();
    },
    _readConfig : function(){
        var path = zip.c;
        require(path);
    },
    _getSrcList : function(){
        var mark = project.src.mark;
        var path = project.src.path;
        var lists = zip._walk(path,mark);
    },
    _build : function(){
        
    },
    _walk : function(path,mark){
        var srcList = [];
        if(path.charAt(path.length)!= "/"){
            path += "/";
        }
        var dirList = fs.readdirSync(path);
        dirList.forEach(function(item){
            if(fs.statSync(path + item).isFile()){
                if(item.match(mark)){
                    srcList.push(path + item);
                }
            }
        });
        dirList.forEach(function(item){
            if(fs.statSync(path + item).isDirectory()){
                zip._walk(path+item,mark);
            }
        });
    }
}

exports.zip = zip;