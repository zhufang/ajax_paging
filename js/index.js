/**
 * Created by Administrator on 2016/11/9.
 */
var pageRender = (function(){
    var n = 1,total = 0;
    var oBox = document.getElementById('box'),
        content = document.getElementById('content'),
        numBox = document.getElementById('numBox'),
        footer = document.getElementById('footer'),
        pageNum = document.getElementById('pageNum');

    function bindHTML(){
        function callback(result){
            total = result['total'];
            var data = result['data'],
                str = '';
            for(var i = 0;i<data.length;i++){
                var cur = data[i];
                str+='<li my-data="'+cur['id']+'">';
                str+='<span>'+cur['id']+'</span>';
                str+='<span>'+cur['name']+'</span>';
                str+='<span>'+(cur['sex']==0?'男':'女')+'</span>';
                str+='<span>'+cur['score']+'</span>';
                str+='</li>';
            }
            content.innerHTML=str;
            str='';
            for(var i = 1;i<=total;i++){
                if(i==n){
                    str+='<li class="bg">'+i+'</li>';
                    continue;
                }
                str+='<li>'+i+'</li>'
            }
            numBox.innerHTML=str;
            pageNum.value = n;
        }
        ajax({
            url:'/getList?n='+n,
            success:callback
        })
    }
    function bindEvent(){
        oBox.addEventListener('click',function(e){
            e = e || window.event;
            var target = e.target || e.srcElement,
                tartag = target.tagName.toUpperCase(),
                tarInn = target.innerHTML,
                tarPar = target.parentNode,
                tarGrandpa = tarPar.parentNode;

            if(tartag =='LI' && tarPar.id=='content' || tartag=='SPAN' && tarGrandpa.id=='content'){
                if(tartag=='SPAN'){
                    target = tarPar;
                }
                var id = target.getAttribute('my-data');
                window.open('detail.html?id='+id);
            };
            if(tartag =='LI' && tarPar.id=='numBox'){
                n=tarInn;
                bindHTML();
            }
            if(tartag == 'SPAN' && tarPar.id=='footer'){
                if(tarInn=='First'){
                    if(n==1) return;
                    n=1;
                }
                if(tarInn=='Last'){
                    if(n==total) return;
                    n=total;
                }
                if(tarInn=='Prev'){
                    if(n<=1) return;
                    n--;
                }
                if(tarInn=='Next'){
                    if(n>=total) return;
                    n++;
                }
                bindHTML();
            }

        })
    }
    return{
        init:function(){
            bindHTML();
            bindEvent();
            pageNum.onkeydown = function(e){
                e = e ||window.event;
                var val = parseInt(pageNum.value);
                if(e.keyCode==13){
                    if(val==n || isNaN(val) ){
                        n = this.val ;
                        return;
                    };
                    n = val<1?1:(val>total?total:val);
                    bindHTML();
                }
            }
        }
    }
})();
pageRender.init();
