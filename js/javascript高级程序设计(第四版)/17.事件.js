//17 事件
//17.1.1 冒泡事件
//target->body->html->window
//17.1.2 捕获
//window->html->body->target
//17.1.3 DOM事件流(先捕获后冒泡)

//17.2.1 html event handler
//缺点：修改handler：同时修改html与javascript逻;一般使用js事件处理;
//优点：包装函数扩大了作用域链，event对象
//17.2.2 DOM0 event handler
let btn = document.getElementById('confirm-button');
btn.onclick = function(event) { //冒泡阶段触发
    console.log(event);
    console.log(this.id); //confirm-button
};
//remove handler
btn.onclick = null;
//17.2.3 DOM2 event handler
btn.addEventListener('click', () => console.log(this.id), false); //参数1:事件名 参数2:事件处理函数 参数3:是否在捕获阶段调用处理函数
btn.addEventListener('click', () => console.log('hello !'), false);
//output:
//confirm-button
//hello !
btn.removeEventListener('click', () => console.log(this.id), false); //这里的处理函数引用和添加事件处理函数不一样，所以移除无效
let handler = function() {
    console.log(this.id);
};
btn.addEventListener('click', handler, false);
btn.removeEventListener('click', handler, false); //成功移除 如果参数3的false改成true同样不能移除该事件处理器
//17.2.4 IE事件处理程序 (handler 添加到冒泡阶段)
btn.attachEvent('onclick', () => {
    console.log(this === window); //true   
});
btn.attachEvent('onclick', () => {
    console.log('hello !');
});
//onclick output:
//hello !
//true
btn.attachEvent('onclick', handler);
btn.detachEvent('onclick', handler);
//17.2.5 跨浏览器事件处理程序
var EventUtil = {
    addHandler: function(sender, type, handler) {
        if (sender.addEventListener) {
            sender.addEventListener(type, handler, false);
        } else if (sender.attachEvent) {
            sender.attachEvent("on" + type, handler);
        } else {
            sender["on" + type] = handler;
        }
    },
    removeHandler: function(sender, type, handler) {
        if (sender.removeEventListener) {
            sender.removeEventListener(type, handler, false);
        } else if (sender.attachEvent) {
            sender.detachEvent("on" + type, handler);
        } else {
            sender["on" + type] = null;
        }
    },
};
//17.3 事件对象event