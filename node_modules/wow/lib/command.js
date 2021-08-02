require("./config.js");
var fs = require('fs');
var path = require('path');
var sys = require('util');

var commands=function(args){
    if(args.length === 2){
        this.args = "help";
    }else {
        this.args = args[2];
    }
};
commands.prototype.init=function(){
    var args = this.args;
    switch(args){
        case "init" :
            this.start();
            break;
        case "min" :
            this.min();
            break;
        case "pack" :
            this.pack();
            break;
        case "server" :
            this.server();
            break;
        case "help" :
            this.help();
            break;
        default :
            this.help();
            break;
    }
};
commands.prototype.start = function(){
    var workspace = global.WORKSPACE;
    var projects = global.PROJECTS;
    var pwd = process.cwd();
    workspace = path.join(pwd,workspace);
    //todo check
    fs.mkdir(workspace,0777,function(err){
        if(err){
            sys.puts("[error] "+err); 
        }else{
            sys.puts("[info] "+ WORKSPACE +"  WorkSpace Directory created");
        }
        projects.forEach(function(pro){
            pro = path.join(workspace,pro);
            fs.mkdirSync(pro,0777); 
        });
    });
    this._writeConfig(workspace);
};
commands.prototype._writeConfig = function(w){
    var f = path.join(__dirname,"config.js");
    fs.open(f,"a",0777,function(err,fd){
        if(err) throw err;

        fs.writeSync(fd,'global.ROOT = "'+w+'";');
        fs.closeSync(fd);
    })
}
commands.prototype.changeHost = function(args) {
    if( args === "local"){

    }
};
commands.prototype.server = function(){
    var s = require('./server.js').server;
    // todo
    // this.changeHost("local");
    s.run();
};
commands.prototype.min = function(){
    var that = this;   
    this._checkIni(function(){
        var zip  = require('./zip.js').zip;
        zip.c = this.ini;
        zip.pack();
    });
};
commands.prototype.help = function(){
    var help = [];
    help.push("[info]");
    help.push("wow init : create local workspace [ "+global.WORKSPACE+" ]")
    help.push("wow server : running local web server under "+global.WORKSPACE);
    sys.puts(help.join("\n"));
};
commands.prototype._checkIni = function(fun) {
    var ini = "";
    if(!!global.INI){
        ini = ".wow";
    }else{
        ini = global.INI;
    }
    var p1 = process.cwd();
    p1 = p1 +"/" + ini;
    var that = this;
    path.exists(p1, function(exists){
        if(exists){
            that.ini = p1;
            fun.call(that);
        }else{
            sys.puts("[error] can not find .wow file , please run in project root path.");
            process.exit(1);
        }
    });
};
exports.commands = commands;
