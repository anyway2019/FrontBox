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
//17.3.1 DOM事件对象
let joinBtn = document.getElementById('join-button');
joinBtn.addEventListener('click', (event) => {
    console.log(event.type); //click
    console.log(this == joinBtn); //true
    console.log(e.currentTarget == joinBtn); //true
    console.log(e.target == joinBtn); //true
}, false);
//this currntTarget target 
document.body.addEventListener(('click', (e) => {
    console.log(this == document.body); //true
    console.log(e.currentTarget == document.body); //true
    console.log(e.target == joinBtn); //true
}));
//event type 
joinBtn.onmouseover = function(e) {
    console.log(e.type == 'mouseover'); //true
};
joinBtn.onmouseout = function(e) {
    console.log(e.type == 'mouseout'); //true
};
//etc...
//event preventDefault() stopProgation()
//preventDefault() 取消元素的默认行为
let link = document.getElementById('myLink');
link.addEventListener("click", (e) => {
    e.preventDefault(); //取消Link的元素的跳转到href中url的行为
}, false);
//stopPropagation() 立即阻止事件流在DOM中传播 example：模态窗口点击空白处消失
let modal = document.getElementById('myModal');
modal.addEventListener('click', (e) => {
    //....
    e.stopPropagation();
}, false);
document.body.addEventListener('click', (e) => {
    console.log('body clicked');
    // set modal hidden
    modal.style = 'display:hidden;';
}, false);
//event phase 捕获1 目标2 冒泡3
let btn = document.getElementById("myBtn");
btn.onclick = function(event) {
    console.log(event.eventPhase); // 2
};
document.body.addEventListener("click", (event) => {
    console.log(event.eventPhase); // 1
}, true);
document.body.onclick = (event) => {
    console.log(event.eventPhase); // 3
};
//17.3.2 IE事件对象
//17.3.3 跨浏览器事件对象

//17.4 事件类型
//* DOMContentLoaded DOM树构建完成触发不用等大牌资源文件js css文件加载完成，方便用户更快与夜main交互
//window 的load事件是页面完全加载完成时触发
//* readystatechange
// hashchange
//orientationchange
//deviceorientation
//17.5 内存与性能
//：性能问题：事件处理函数本身就是一个函数，过多的事件处理程序会占用更多的内存，并且访问DOM的次数也会变得更多从而导致整个页面的响应速度；
//解决方案：
//17.5.1 事件委托 给父容器注册事件处理程序，根据target处理不同交互逻辑，减少了事件处理程序的数量从而减少内存使用和DOM的访问次数
//17.5.2 卸载事件处理程序
let btn = document.getElementById("myBtn");
btn.onclick = function() {
    // 执行操作
    btn.onclick = null; // 删除事件处理程序
    document.getElementById("myDiv").innerHTML = "Processing...";
};

//如果知道某个节点会被删除,可以将事件处理程序放到更高的层级上
//页面卸载同样可能导致内存残留，一般是在卸载事件中清理无用的引用
//解决方案:onload中注册事件onunload卸载对应事件
//17.6 模拟事件
//17.6.1 DOM事件模拟

let btn = document.getElementById("myBtn");
// 创建 event 对象
let event = document.createEvent("MouseEvents");
// 初始化 event 对象
event.initMouseEvent("click", true, true, document.defaultView,
    0, 0, 0, 0, 0, false, false, false, false, 0, null);
// 触发事件
btn.dispatchEvent(event);

let textbox = document.getElementById("myTextbox"),
    textevent;
// 按照 DOM3 的方式创建 event 对象
if (document.implementation.hasFeature("KeyboardEvents", "3.0")) {
    textevent = document.createEvent("KeyboardEvent");
    // 初始化 event 对象
    textevent.initKeyboardEvent("keydown", true, true, document.defaultView, "a",
        0, "Shift", 0);
}
// 触发事件
textbox.dispatchEvent(textevent);
//自定义事件
// 创建 event 对象
let customEvent = document.createEvent("Events");
// 初始化 event 对象
customEvent.initEvent(type, bubbles, cancelable);
customEvent.view = document.defaultView;
customEvent.altKey = false;
customEvent.ctrlKey = false;
customEvent.shiftKey = false;
customEvent.metaKey = false;
customEvent.keyCode = 65;
customEvent.charCode = 65;
// 触发事件
textbox.dispatchEvent(customEvent);
//17.6.2 IE事件模拟