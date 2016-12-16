/**
 * Created by Administrator on 2016/11/7.
 */
function rnd(n,m){
    return Math.round(Math.random()*(m-n)+n);
}
var str1='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var str2='abcdefghijklmnopqrstuvwxyz';
var ary=[];
for(var i=1;i<99;i++){
    var obj={};
    obj['id']=i;
    obj['name']=str1[rnd(0,25)]+str2[rnd(0,25)];
    obj['sex']=rnd(0,1);
    obj['score']=rnd(59,99);
    ary.push(obj);
}
console.log(JSON.stringify(ary));