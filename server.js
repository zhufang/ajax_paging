var http = require('http'),
    url = require('url'),
    fs = require('fs');
var server = http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true),
        pathname = urlObj['pathname'],
        query = urlObj['query'];
    var reg = /\.([a-z]+)/i;
    if (reg.test(pathname)) {
        var suffix = reg.exec(pathname)[1].toUpperCase(),
            suffixMIME = suffix === 'HTML' ? 'text/html' : (suffix === 'CSS' ? 'text/css' : 'text/javascript');
        try {
            res.writeHead(200, {'content-type': suffixMIME + ';charset=utf-8'});
            res.end(fs.readFileSync('.' + pathname, 'utf-8'));
        } catch (e) {
            res.writeHead(404);
            res.end('file is not found');
        }
        return;
    }
    //api接口
    var data = JSON.parse(fs.readFileSync('./jsonp/student.json', 'utf-8'));
    if (pathname === '/getList') {
        var n = query['n'],
            ary = [];
        for (var i = (n - 1) * 10; i <= n * 10 - 1; i++) {
            if (i > data.length - 1) {
                break;
            }
            ary.push(data[i]);
        }
        res.writeHead(200, {'content-type': 'application/json;charset=utf-8'});
        res.end(JSON.stringify({
            code:0,
            msg:'成功',
            total:Math.ceil(data.length/10),
            data:ary
        }));
        return;
    }
    if(pathname==='/getInfo'){
        var studentId=parseInt(query['id']),
            obj=null;
        console.log(studentId)
        for(i=0;i<data.length;i++){

            if(data[i]['id']===studentId){
                obj=data[i];
                console.log("find")
            }
        }
        var result={
            code:1,
            msg:'内容不存在',
            data:null
        };
        if(obj){
            result={
                code:0,
                msg:'成功',
                data:obj
            }
        }
        res.writeHead(200,{'content-type':'application/json;charset=utf-8'});
        res.end(JSON.stringify(result));
        return;
    }
    res.writeHead(404);
    res.end('request api url is not found');

});
server.listen(93, function () {
    console.log('ok');
});
