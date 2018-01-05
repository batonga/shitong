window.onload=function(){
    search();
    banner();
    skTime();
};
// 头部search部分
function search(){
    var searchBox = document.querySelector(".jd_header_box");
    var bannerBox = document.querySelector(".jd_banner");
    var height = bannerBox.offsetHeight;
    window.onscroll = function(){
        var top = document.documentElement.scrollTop;
        var opacity=0;
        if(top>height){
            opacity = 0.85;
        }else{
            opacity = 0.85*(top/height);
        }
        searchBox.style.background="rgba(201,21,35,"+opacity+")";
    }
}
// 轮播图部分
function banner(){
    // 获取DOM元素
    var bannerBox = document.querySelector(".jd_banner");
    var width = bannerBox.offsetWidth;
    var imgUl = bannerBox.querySelector("ul:first-child");
    var pointUl = bannerBox.querySelector("ul:last-child");
    var lis = pointUl.querySelectorAll("li");
    // 2.动画效果，这里使用过渡来做
    var index = 1 ;
    // 封装公用方法
    var addTransition = function(){
        imgUl.style.webkitTransition="transform .2s";
        imgUl.style.transition="transform .2s";
    };
    var setTranslate = function(x){
        imgUl.style.webkitTransform="translateX("+x+"px)";
        imgUl.style.transform="translateX("+x+"px)";
    };
    var removeTransition = function(){
        imgUl.style.webkitTransition="none";
        imgUl.style.transition="none";
    };
    var timer = setInterval(function(){
        index++;
        addTransition();
        setTranslate(-index*width);
    },3000);
    // 3.无缝衔接 添加事件监听，用到transitionEnd这个方法
    itcast.transitionEnd(imgUl,function(){
        if(index >= 9){
            index =1;
            removeTransition();
            setTranslate(-index*width);
        }else if(index <= 0){
            index =8;
            removeTransition();
            setTranslate(-index*width);
        }
        setPoint();
    });
    // 4.点和图片对应
    var setPoint = function(){
        for(var i= 0; i< lis.length;i++){
            lis[i].className=" ";
        }
        lis[index-1].className="current";
    };
    // 5.滑动图片
    var start = 0; //开始的触摸点
    var move = 0; //移动后的触摸点
    var distance = 0; //移动后的距离
    var isMove = false; //是否移动了
    imgUl.addEventListener("touchstart",function(e){
        start = e.touches[0].clientX;
        clearInterval(timer);
    });
    imgUl.addEventListener("touchmove",function(e){
        isMove = true;
        move = e.touches[0].clientX;
        distance= move-start;
        removeTransition();
        setTranslate(-index*width+distance);
    });
    window.addEventListener("touchend",function(e){

        //6.滑动后吸附回去 或者到上一张或者下一张
        if(Math.abs(distance)>(width/3)){
            if(distance>0){
                index--;
            }else {
                index++;
            }
            addTransition();
            setTranslate(-index*width);
        }else{
           addTransition();
           setTranslate(-index*width);
        }
        clearInterval(timer);
        timer = setInterval(function(){
            index++;
            addTransition();
            setTranslate(-index*width);
        },3000);
        //活动结束后重置默认值
        start=0;
        move =0;
        distance=0;
        isMove=false;
    });
}

//倒计时
function skTime(){
    var time = 12*60*60;
   timer = setInterval(function(){
        time--;
       if(time <0){
           clearInterval(timer);
           return false;
       }
        var h = Math.floor(time/3600);
        var m = Math.floor(time%3600/60);
        var s = Math.floor(time%60);

        var skTimeBox=document.querySelector(".sk_time");
        var spans = skTimeBox.querySelectorAll("span");

        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;

        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;

        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;
    },1000)
}