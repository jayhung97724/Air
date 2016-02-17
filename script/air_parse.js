var request = require("request");
var fs = require("fs");

var now = new Date();

request({
        url: 'http://opendata.epa.gov.tw/ws/Data/REWXQA/?$orderby=SiteName&$skip=0&$top=1000&format=json',
        method: "GET"
}, 
function(e,r,b) {
    if(!e) {
        var json = JSON.stringify(b).replace(/PM2\.5/g, 'PM2p5');
        var data = JSON.parse(json);
        fs.writeFileSync('/home/sakamoto/services/air/air.json', data);
    }
});
