function debounce(fuc,wait){
    var timeout;
    return function(){
        var context = this;
        var args = arguments;
        if(timeout){
            clearTimeout(timeout);
        }
        timeout = setTimeout(()=>{
            fuc.apply(context,args)
        },wait);
    }
}

function debounce(fuc,wait,immediate){
    var timeout;
    var result;
    var debounced = function(){
        var context = this;
        var args = arguments;
        if (timeout) clearTimeout(timeout);
        if(immediate){
            var callNow = !timeout;
            timeout = setTimeout(()=>{
                timeout = null;
            },wait);
            if(callNow) result = fuc.apply(context,args);
        }else{
            clearTimeout(timeout);
            timeout = setTimeout(()=>{
                fuc.apply(context,args);
            },wait);
        }
        return result;
    }
    return debounced;
}

function throttle(func,wait){
    let pre = new Date();
    return function(){
        let now = new Date();
        let context = this;
        let args = arguments;
        
        if(now-pre >= wait){
            func.apply(context,args);
            pre = now;
        }
    };
}

var cookieAssign=function(g,s){
    const childs=g.sort((a,b)=>b-a);
    const cookies=g.sort((a,b)=>b-a);
    let count=0;
    //[10,9,8,7,6]
    //[7,6]
    for(let i=0,j=cookies.length;i<childs.length,j>0;++i,--j){
        while(childs[i]>cookies[j]){
            i++;
        }
        
        //10 9 8 
        if(i<childs.length && j>0){
            count++;
        }
    }
    return count;
}

cookieAssign([10,9,8,7,6],[7,6]);