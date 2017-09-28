var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");
var forEach = require('async-foreach').forEach;
var data1 = "nerqin.json";
var vv = url + data1;
var nerqin_links = require("./nerqin.json");
var link = "http://gameguru.ru/";

var url = encodeURI("http://gameguru.ru/pc/games/2016/popular/list.html");
var data0="linker.json";
var uri=[];
var asd = [];


request(url,function(error, response, html){
    if(!error)
    {
        var $ = cheerio.load(html);
        $(".pna").each(function(){
            var data=$(this);
            uri.push($(this).attr("href"));
            fs.writeFile(data0,JSON.stringify(uri));
            
        });
  
      
    
        $(".pseudo_h3_inner > a").each(function(){
            asd.push($(this).attr("href"));
            fs.writeFile(data1,JSON.stringify(asd));
            
        });
    }
});

forEach(nerqin_links,function(item, index, err){
    var current_url = link+item;
    request(current_url, function(error, response, html){
        //console.log(html);
        if(!error){
            // console.log(data);
            var $ = cheerio.load(html);
            $(".jointCard-spotlight-views > span").each(function(){
                var data = $(this);
                console.log(data.text());
            });
        }
    });
});












