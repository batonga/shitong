// 左边菜单栏js效果
window.onload = function(){
    leftSlide();
    rightSwipe();
};
function leftSlide(){
    var leftParent =document.querySelector(".product_category_left");
    var sonBox = document.querySelector("ul");
    var parentHeight = leftParent.offsetHeight;
    var sonHeight = sonBox.offsetHeight;
    var maxY = 0;
    var minY = parentHeight-sonHeight;
    var distance = 100;
    var maxDistance = maxY +100;
    var minDistance = minY -100;
    // 公共js方法
    var addTransition = function(){
        sonBox.style.webkitTransition="transform .2s";
        sonBox.style.transition="transform .2s";
    };
    var removeTransition = function(){
        sonBox.style.webkitTransition="none";
        sonBox.style.transition="none";
    };
    var setTranslateY = function(y){
        sonBox.style.webkitTransform="translateY("+y+"px)";
        sonBox.style.transform="translateY("+y+"px)";
    };
    // 1.让菜单滑动起来
    var startY =0;
    var moveY = 0;
    var distanceY =0;
    var isMove = false;
    var curry = 0;//相当于全局索引值
    sonBox.addEventListener("touchstart",function(e){
        startY = e.touches[0].clientY;
    });
    sonBox.addEventListener("touchmove",function(e){
        moveY= e.touches[0].clientY;
        distanceY = moveY-startY;
        removeTransition();
        // 2.给滑动限定距离
        if((curry+distanceY)<maxDistance&&(curry+distanceY)>minDistance){
            setTranslateY(curry+distanceY);
        }
    });
    window.addEventListener("touchend",function(e){
        // 3.超过上下两边距离，吸附回去
        if((curry = curry + distanceY)>maxY){
            curry=maxY;
            addTransition();
            setTranslateY(curry);
        }else if((curry = curry + distanceY)<minY){
            curry=minY;
            addTransition();
            setTranslateY(curry);
        }else {
            curry = curry + distanceY;
        }
        //参数重置
        startY =0;
        moveY = 0;
        distanceY =0;
        isMove = true;
    });
    // 4点击事件用封装的tap，click有300ms的延时。
    var lis = sonBox.querySelectorAll("li");
    itcast.tap(sonBox,function(e){
        var li = e.target.parentNode;
        for(var i = 0; i<lis.length;i++){
            lis[i].className="";
            lis[i].index=i;
        }
        li.className="now";
        var translateY = -li.index*50;
        if(translateY>minY){
            curry=translateY;
            addTransition();
            setTranslateY(curry);
        }else {
            curry=minY;
            addTransition();
            setTranslateY(curry);
        }
    })
}

//右侧js特效
function rightSwipe(){
    /*通过封装的swipe插件来实现*/
    itcast.iScroll({
        swipeDom:document.querySelector('.product_category_right'),/*父容器对象*/
        swipeType:'y',/*滑动的方向*/
        swipeDistance:100/*缓冲的距离*/
    });
}
