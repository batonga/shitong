//公共js代码
window.itcast = {};
itcast.transitionEnd = function(dom,callback){
    if(dom && typeof dom ==='object' ){
        dom.addEventListener("webkitTransitionEnd",function(){
            callback&&callback();
        });
        dom.addEventListener("transitionEnd",function(){
            callback&&callback();
        });
    }
};
//封装点击事件
itcast.tap=function(dom,callback){
    if(dom && typeof dom==="object" ){
        var startTime = 0;
        var isMove = false;
        dom.addEventListener("touchstart",function(e){
            startTime = Date.now();
        });
        dom.addEventListener("touchmove",function(e){
            isMove = true;
        });
        dom.addEventListener("touchend",function(e){
            if(!isMove && (Date.now()-startTime)<150){
                callback&&callback(e);
            }
            startTime=0;
            isMove=false;
        });
    }
};