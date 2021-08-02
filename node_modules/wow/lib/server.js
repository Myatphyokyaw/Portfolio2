require("./config");
var http = require("http");
var sys = require("util");
var filed = require("filed");
var fs = require("fs");
var path = require("path");
var mime = require("mime");
var dns = require("dns");
var server = {};

server.run = function () {
    //check dns
    dns.lookup(global.DOMAIN, function(err, addr){
        if(err || addr !== "127.0.0.1" ){
            sys.puts("[error] please bind host "+ global.DOMAIN + " 127.0.0.1");
        }else{
            //start server
            var app = http.createServer(function (req ,res) {

                plugin(req,res);

            }).listen(global.PORT, global.DOMAIN, function (err) {
                sys.puts("[info] local cdn server is running ...");
            });
        }
    });



}
function plugin(req,res){
    var root = global.ROOT || process.cwd();
    var reqPath = require("url").parse(req.url).pathname;
    var file = path.join(root,reqPath);
    if (reqPath.match("minlist.js")) {
        var prePath = req.url.split("/js/")[0];
        var projectName = reqPath.split("/")[1];
        var _baseUrl_ = "http://" + global.DOMAIN + prePath + "/js/" + projectName + "/";
        fs.readFile(file, "utf-8",function (err, data) {
            if (err) {
                res.statusCode = 500;
                res.end(String(err));
            }else{
                res.setHeader('content-type', mime.lookup(reqPath));
                res.write('var _baseUrl_ = "' + _baseUrl_ +'";');
                res.end(data);
            }
        });
    }else{
        var f = filed(file);
        f.pipe(res);
    }
}
//main
exports.server = server;

