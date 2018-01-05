window.onload=function(){
    deleteBox();
};
function deleteBox(){
    var shade = document.querySelector(".shade");
    var popUp = document.querySelector(".pop_up");
    var deleteList =document.querySelectorAll(".delete");
    var deleteBox = null;
    // 1.点击删除盒子，动画效果弹出pop_up盒子
    for(var i=0;i < deleteList.length; i++){
        deleteList[i].onclick= function(){
            shade.style.display="block";
            popUp.className="pop_up bounceInDown";
            // 2.盖子打开
            deleteBox = this;
            var spanUp = deleteBox.querySelector("span:first-child");
            spanUp.style.transition = "all 1s";
            spanUp.style.webkitTransition = "all 1s";
            spanUp.style.transform="rotate(-30deg) translateY(2px)";
            spanUp.style.webkitTransform="rotate(-30deg) translateY(2px)";
            spanUp.style.transformOrigin="0 5px";
            spanUp.style.webkitTransformOrigin="0 5px";
        }
    }
    // 3.点击取消按钮，删除盒子盖子盖上
    document.querySelector(".cancel").onclick=function(){
        shade.style.display="none";
        var spanUp = deleteBox.querySelector("span:first-child");
        spanUp.style.transform="none";
        spanUp.style.webkitTransform="none";
    }

}
