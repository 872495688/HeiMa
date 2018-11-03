
window.onload = function(){
    leftSwipe();
    itcast.iScroll({
        swipeDom:document.querySelector('.hm_category_right'),
        swipeType:'y',
        swipeDistance:100
    });
};
//左侧的滑动效果
function leftSwipe(){

    var parentBox = document.querySelector('.hm_category_left');
    
    var childBox = parentBox.querySelector('ul');

    var parentHeight = parentBox.offsetHeight;
    var childHeight = childBox.offsetHeight;

    //定位区间
    var maxPosition = 0;//最大的定位区间
    var minPosition = parentHeight-childHeight;//最小的定位区间

   //缓冲的距离
    var distance = 150;
//滑动区间
    
    var maxSwipe = maxPosition + 150; //最大滑动区间
    var minSwipe = minPosition - 150; //最小滑动区间



    //添加过渡
    var addTransition = function () {
        childBox.style.webkitTransition = "all .2s";
        childBox.style.transition = "all .2s";
    };
    //删除过渡
   
    var removeTransition = function () {
        childBox.style.webkitTransition = "none";
        childBox.style.transition = "none";
    };
    //改变位子
    var setTranslateY = function(translateY){
        childBox.style.webkitTransform = "translateY("+translateY+"px)";
        childBox.style.transform = "translateY("+translateY+"px)";
    };

   
    var startY = 0;
    var moveY = 0;
    var distanceY = 0;


    //记录当前位子
    var currY = 0;

    childBox.addEventListener('touchstart',function(e){
        startY = e.touches[0].clientY;
    });
    childBox.addEventListener('touchmove',function(e){
        moveY = e.touches[0].clientY;
        distanceY = moveY - startY;

        if((currY + distanceY) < maxSwipe && (currY + distanceY) > minSwipe){
            
            removeTransition();
            
            setTranslateY(currY + distanceY);
        }

    });
    
    window.addEventListener('touchend',function(e){
        
        if((currY + distanceY) > maxPosition){
            currY = maxPosition;
           
            addTransition();
            
            setTranslateY(currY);
        }
        
        else  if ((currY + distanceY) < minPosition){
            currY = minPosition;
            
            addTransition();
            
            setTranslateY(currY);
        }
        
        else {
           
            currY = currY + distanceY;
        }

        
        startY = 0;
        moveY = 0;
        distanceY = 0;
    });

   
    var lis = childBox.querySelectorAll('li');
    itcast.tap(childBox,function(e){
        
        for(var i =0;i<lis.length;i++){
            lis[i].className = " ";
            lis[i].index = i;
        }
        var li = e.target.parentNode;
        li.className = 'now';
        
        console.log(li.index);

        var translateY = -li.index * 50;

      
        if(translateY > minPosition){
            currY = translateY;
            
            addTransition();
            
            setTranslateY(currY);
        }else{
            currY = minPosition;
            //加过渡
            addTransition();
            //去做定位
            setTranslateY(currY);
        }

    });

}