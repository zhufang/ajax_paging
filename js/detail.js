~function (pro) {
    //->http://old.zhufengpeixun.cn/qianduanjishuziliao/javaScriptzhuanti/2016-07-02/482.html
    //localhost/index.html?id=5
    function queryURLParameter() {
        var obj = {},
            reg = /([^?=&#]+)=([^?=&#]+)/g;
        this.replace(reg, function () {
            obj[arguments[1]] = arguments[2];
        });
        reg = /#([^?=&#]+)/;
        if (reg.test(this)) {
            obj['HASH'] = reg.exec(this)[1];
        }
        return obj;
    }

    pro.queryURLParameter = queryURLParameter;
}(String.prototype);

var infoRender = (function () {
    var oBox2 = document.getElementById('box2');
    var newUrl = window.location.href;
    var id = newUrl.queryURLParameter()['id'];

    function bindHTML() {
        function callback(result) {
            if (!result) return;
            var str = '';
            str += '<li><span>编号：</span><span>' + result.data.id + '</span></li>';
            str += ' <li><span>姓名：</span><span>' + result.data.name + '</span></li>';
            str += '<li><span>性别：</span><span>' + (result.data.sex == 0 ? '男' : '女') + '</span></li>';
            str += '<li><span>分数：</span><span>' + result.data.score + '</span></li>';
            oBox2.innerHTML = str;
        }

        ajax({
            url: '/getInfo?id=' + id,
            success: callback
        })
    }

    return {
        init: function () {
            bindHTML();
        }
    }
})();
infoRender.init();