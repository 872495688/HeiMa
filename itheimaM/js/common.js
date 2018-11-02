
window.itcast = {};
itcast.transitionEnd  = function(dom,callback){

    if(dom && typeof dom === 'object'){
        dom.addEventListener('webkitTransitionEnd',function(){
        
            callback && callback();
        });
        dom.addEventListener('transitionEnd',function(){
            callback && callback();
        });
    }

};

itcast.tap = function(dom,callback){

    if(dom && typeof dom === 'object'){
        /*记录是否滑动过*/
        var isMove = false;
        var startTime = 0;
        dom.addEventListener('touchstart',function(e){
            startTime = Date.now();  
        });
        /*触摸滑动事件*/
        dom.addEventListener('touchmove',function(e){
            isMove = true;
        });
        /*触摸结束事件*/
        dom.addEventListener('touchend',function(e){
       
            if((Date.now()-startTime) < 150 && !isMove){
          
                callback && callback(e);
            }

            /*重置*/
            isMove = false;
            startTime = 0;
        })

    }
}