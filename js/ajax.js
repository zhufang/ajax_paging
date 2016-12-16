/**
 * Created by yaya on 16/10/4.
 */
function ajax(options){
    var _default = {
        url:null,
        type:'GET',
        dataType:'JSON',
        cache:true,
        async:true,
        data:null,
        success:null
    };
    for(var key in options){
        if(options.hasOwnProperty(key)){
            _default[key] = options[key];
        }
    }
    var xml = new XMLHttpRequest();
    if(/^(GET|HEAD|DELETE)$/i.test(_default.type) && _default.cache=='false'){
        _default.url.indexOf('?')>-1?_default.url+='&':_default.url+='?';
        _default.url+='_='+Math.random();
    }
    xml.open(_default.type,_default.url,_default.async);
    xml.onreadystatechange = function(){
        if(xml.readyState===4 && /^2\d{2}$/.test(xml.status)){
            var value = xml.responseText,
                dataType = _default.dataType.toUpperCase();
            switch(dataType){
                case'JSON':
                    value = 'JSON' in window?JSON.parse(value):eval('('+value+')');
                    break;
                case'TXT':
                    break;
                case'XML':
                    value = xml.responseXML;
                    break;
            }
            _default.success && _default.success.call(xml,value);
        }
    };
    xml.send(_default.data);
}