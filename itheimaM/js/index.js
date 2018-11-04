window.onload = function(){
    
    search();
    /*轮播图*/
    banner();
    /*倒计时*/
    downTime();
};
/*搜索区块的颜色变化*/
function search(){


    /*获取搜索盒子*/
    var searchBox = document.querySelector('.hm_header_box');
    /*获取banner盒子*/
    var bannerBox = document.querySelector('.hm_banner');
    /*获取高度*/
    var h = bannerBox.offsetHeight;

    /*监听window的滚动事件*/
    window.onscroll = function(){
        /*不断的获取离顶部的距离*/
        var top = document.body.scrollTop;
        var opacity = 0;
        if( top < h){
            
            opacity = top/h * 0.85
        }else{
           
            opacity = 0.85
        }

        /*把透明度设置上去*/
        searchBox.style.background = "rgba(201,21,35,"+opacity+")";

    }
}
/*轮播图*/
function banner(){
  


    var banner = document.querySelector('.hm_banner');
    /*屏幕的宽度*/
    var w = banner.offsetWidth;
    /*图片盒子*/
    var imageBox = banner.querySelector('ul:first-child');
    /*点盒子*/
    var pointBox = banner.querySelector('ul:last-child');
    /*所有的点*/
    var points = pointBox.querySelectorAll('li');


    /*添加过渡*/
    var addTransition = function () {
        imageBox.style.webkitTransition = "all .2s";/*兼容*/
        imageBox.style.transition = "all .2s";
    };
    /*删除过渡*/
    var removeTransition = function () {
        imageBox.style.webkitTransition = "none";/*兼容*/
        imageBox.style.transition = "none";
    };
    /*改变位子*/
    var setTranslateX = function(translateX){
        imageBox.style.webkitTransform = "translateX("+translateX+"px)";
        imageBox.style.transform = "translateX("+translateX+"px)";
    };


  
    var index = 1;
    var timer = setInterval(function(){
        /*箱子滚动*/
        index  ++ ;
     
        addTransition();
        /*改变位子*/
        setTranslateX(-index*w);

    },4000);

    /*绑定一个过渡结束事件*/
    itcast.transitionEnd(imageBox,function(){
        console.log('transitionEnd');
        if(index >= 9){
            index = 1;
            /*做定位*/
            /*加过渡*/
            removeTransition();
            /*改变位子*/
            setTranslateX(-index*w);
        }else if(index <= 0){
            index = 8;
            /*加过渡*/
            removeTransition();
            /*改变位子*/
            setTranslateX(-index*w);
        }
      
        setPoint();
    });

  
    var setPoint = function(){
        /*把所有点的样式清除*/
        for(var i = 0 ; i < points.length ; i ++){
            points[i].className = " ";
         
        }
        points[index-1].className = "now";
    }

    /*3.图片滑动 touch事件）*/
    var startX = 0;
    var moveX = 0;
    var distanceX = 0;
    var isMove = false;

    imageBox.addEventListener('touchstart',function(e){
        /*清除定时器*/
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });
    imageBox.addEventListener('touchmove',function(e){
        isMove = true;
        moveX = e.touches[0].clientX;
        distanceX = moveX - startX;

      
        console.log(distanceX);

        
        var currX = -index*w + distanceX;
        /*删除过渡*/
        removeTransition();
        /*改变位子*/
        setTranslateX(currX);



    });
    imageBox.addEventListener('touchend',function(e){

        
        if(isMove && (Math.abs(distanceX) > w/3)){
            
            if(distanceX > 0){
                index --;/*向右滑  上一张*/
            }else{
                index ++;/*向左滑 下一张*/
            }
            addTransition();
            setTranslateX(-index * w);
        }
        
        else {
            
            addTransition();
            setTranslateX(-index * w);
        }

        /*重置*/
        startX = 0;
        moveX = 0;
        distanceX = 0;
        isMove = false;

        /*添加定时器*/
        clearInterval(timer);
        timer = setInterval(function(){
            /*箱子滚动*/
            index  ++ ;
         
           
            addTransition();
            /*改变位子*/
            setTranslateX(-index*w);
        },4000);
    });
}

/*倒计时*/
function downTime(){
    /*需要倒计时的时间*/

    var time = 5 * 60 * 60 ;
    var timer = null;

    /*操作dom*/
    var skTime = document.querySelector('.sk_time');
    /*所有的SPAN*/
    var spans = skTime.querySelectorAll('span');

    timer = setInterval(function(){
        if(time <= 0){
            clearInterval(timer);
            return false;
        }
        time -- ;
        /*格式化*/
        var h = Math.floor(time/3600);
        var m = Math.floor(time%3600/60);
        var s = time%60;

        console.log(h);
        console.log(m);
        console.log(s);

        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;

        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;

        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;

    },1000);


}
