//14.1 DOM 层次结构
//14.1.1 Node type
//14.1.2 Doucument type
//14.1.3 Element type 
//14.1.4 Text type
//14.1.5 Comment type
//14.1.6 CDATASection
//14.1.7 DocumentType type
//14.1.8 DocumentFragment(11)
let fragment = document.createDocumentElement();
let ul = document.getElementById('myList'); //<ul id="myList"></ul>

for (let i = 0; i < 3; ++i) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(`Item ${i+1}`));
    fragment.appendChild(li);
}
ul.appendChild(fragment); //render once
//14.1.9 Attr type(2)
let element = document.getElementById('demo');
let attrKey = document.createAttribute('key');
attrKey.value = 'value';
element.setAttributeNode(attrKey);

//14.2 DOM script
//14.2.1 dynamic script
let script = document.createElement('script');
script.src = 'foo.js';
document.body.appendChild(script);
//14.2.2 dynamic style
//link
let link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'styles.css';
let head = document.getElementsByTagName('head')[0];
head.appendChild(link);
//style
let style = document.createElement('style');
style.type = 'text/css';
style.appendChild(document.createTextNode("body{background-color:red}"));
let headElement = document.getElementsByTagName('head')[0];
headElement.appendChild(style);
//IE不兼容上述写法,IE禁止操作style和script节点加入子节点
//style.style.cssText = "body{background-color:red}";
style.type = 'text/css';
try {
    style.appendChild(document.createTextNode("body{background-color:red}"));
} catch (error) {
    style.style.cssText = 'body{background-color:red}';
}
headElement.appendChild(style);
//对于 IE，要小心使用 styleSheet.cssText。如果重用同一个<style>元素并设
//置该属性超过一次，则可能导致浏览器崩溃。同样，将 cssText 设置为空字符串也可能
//导致浏览器崩溃
//14.2.3 table
let table = document.createElement('table');
table.border = 1;
table.insertRow(0);
table.rows[0].insertCell(0); //0:pos
table.rows[0].cells[0].appendChild(document.createTextNode('cell 1 0'));
table.rows[0].insertCell(1);
table.rows[0].cells[1].appendChild(document.createTextNode('cell 1 1'));
table.insertRow(1);
table.rows[1].insertCell(0);
table.rows[1].cells[0].appendChild(document.createTextNode('cell 2 0'));
table.rows[1].insertCell(1);
table.rows[1].cells[1].appendChild(document.createTextNode('cell 2 1'));
document.body.appendChild(table);
//14.2.4 NodeList
//NodeList NamedNodeMap HTMLCollection 三个集合类型是实时的，任何文档结构的变化会实时地表现出来，总是代表集合的最新状态


//14.3 MutationObserver
//14.3.1
let observer = new MutationObserver((record) => { console.log(record); }); //async task
observer.observe(document.body, { attributes: true });
document.body.setAttribute('key', 'value'); //add
document.body.setAttribute('key', 'value_alter'); //alter
document.body.removeAttribute('key');

//disconnect()
//observer.disconnect();
//takeRecords()
//observer.takeRecords(); 相当于 disconnect 之后将记录列表弹出

//复用: 可以观察多个对象
let observedDiv = document.getElementById('MyDiv');
observer.observe(observedDiv, { attributes: true });

//重用: 调用diconnect()之后，观察者的生命周期没有结束
observer.disconnect();
observer.observe(observedDiv, { attributes: true });

//14.3.2 观察范围 MutationObserveInit
//subtree 观察子树
//attributes 属性
//attributeFilter 要观察的属性数组['foo','bar']
//attributeOldValue 是否记录变化之前的属性值 record.oldValue
//characterData 观察字符串 textContent要比innerText标准 innerText有兼容性问题
//characterDataOldValue 是否记录变化之前的字符串
//childList 观察子节点

//note: 在调用 observe()时， MutationObserverInit 对象中的 attribute、 characterData
//和 childList 属性必须至少有一项为 true（无论是直接设置这几个属性，还是通过设置
//attributeOldValue 等属性间接导致它们的值转换为 true）。否则会抛出错误，因为没
//有任何变化事件可能触发回调。

//14.3.3 异步回调与记录队列
//回调会被当作微任务推进微任务队列，如果当前有正在排期的微任务需要挂起
//在处理回调任务期间，可能又发生多起变化事件，因此回调会收到一个各自MutationRecord数组实例（回调函数退出之后这些实例就不存在了），顺序是进入记录队列的顺序
document.body.setAttribute('foo', 'first'); //output:[mutationrecord]
document.body.setAttribute('foo', 'second'); //output:[mutationrecord mutationrecord]
//14.3.4 性能内存与垃圾回收
//MutationObserver是DOM3的产物为了DOM2 MutationEvent
//DOM2 MutationEvent性能差，具体表现
//1.MutationEvent是同步的，每次DOM的修改都会被触发，严重降低浏览器的运行
//2.为DOM添加 mutation 监听器会降低修改DOM文档的性能（慢1.5-7倍），即使移除监听器也不会提升性能；
//3.MutationEvent中的所有事件都被设计成无法取消；
//4.兼容性问题
//DOM3 MutationObserver 通过微任务和记录队列分别解决了MutationEvent的什么问题 TODO


//15.DOM Extension
//15.1.1 querySelector() by Document DocumentFragment Element
//return Element / throw exception
let queryBody = document.querySelector('body');
let queryId = document.querySelector('#id');
let queryClassName = document.querySelector('.plain');
let btn = document.querySelector('img.Button');
//15.1.2 querySelectorAll() 
//return NodeList / throw exception
let emList = document.getElementById('MyDiv').querySelectorAll('em');
let strongs = document.querySelectorAll('p strong');
//15.1.3 matches() by Element
if (document.body.matches('body.page1')) {
    let page1 = document.body.querySelector('body.page1');
}
//15.2 元素遍历
let parentNode = document.getElementById('demo');
let currentNode = parentNode.firstChild;
while (currentNode) {
    if (currentNode.nodeType == 1) {
        console.log(currentNode.nodeName);
    }
    if (currentNode == parentNode.lastChild) {
        break;
    }
    currentNode = currentNode.nextSibling;
}

//childElementCount firstElmentChild lastElementChild previousElementSibling nextElementSibling
let currentElementNode = parentNode.firstElementChild;
while (currentElementNode) {
    console.log(currentElementNode.nodeName);
    if (currentElementNode == parentNode.lastElementChild) {
        break;
    }
    currentElementNode = currentElementNode.nextElementSibling;
}
//15.3 html5
//15.3.1 css
let selectedElements = document.getElementsByClassName('selected');

//15.3.2 焦点管理
let currentActiveNode = document.activeElement;
//页面全部加载之前 currentActiveNode为null，之后为body
let hasFocus = document.hasFocus();
if (hasFocus) {
    console.log(document.activeElement.nodeName);
} else {
    var inputNode = document.getElementById('MyInput');
    inputNode.focus();
    console.log(document.hasFocus()); //true
}
//15.3.3 HtmlDocument Extension
//1.readyState (loading:文档加载中 complete:文档加载完成)
let documentLoaded = false;
if (document.readyState == "complete") {
    documentLoaded = true;
}
//before method
window.onload = (e) => {
    documentLoaded = true;
};
//2.compatMode 渲染模式: CSS1Compat(标准渲染模式) / BackCompat(混杂渲染模式)

//15.3.4 characterSet default:utf-16
console.log(document.characterSet); //utf-16
document.characterSet = 'utf-8';
//15.3.5 自定义数据属性
//<div id='myDiv' data-myName='name' data-myAge='18'></div>
let myDiv = document.getElementById('myDiv');
if (myDiv.dataset.myName) {
    console.log(`myName:${myDiv.dataset.myName}`)
}
//作用:给元素附加一些额外数据，场景：链接追踪和聚合应用程序标记页面的不同部分，单页面程序常用
//15.3.6 插入html标记 innerHtml outHtml
//1.innerHtml
//2.old IE innerHtml  非受控 style script 受控
//3.outerHtml
//4.insertAdjacentHtml insertAdjacentText
//5.性能与内存
////1.html节点替换，被删除的子树或者子节点可能绑定了某些事件或者引用，频繁的删除这些节点导致这些对象
//保留在内存中，内存不断上升且不会释放，影响性能问题
////2.html变化也是需要解析器和构造器处理，频繁处理也会有性能问题，尽量一次性完成html标记的赋值，避免在
//循环处理
//6.跨站脚本攻击 XSS
//在获取用户数据的页面避免使用 innerHtml
//使用innerHtml时使用相关库进行转义
//15.3.7 scrollIntoView() :scrollIntoView(alignToTop,options)
//alignToTop default:true
////true:滑动过后元素顶部与视口顶部对齐,
////false:滑动后元素的底部和适口的底部对齐
//options：选项参数
////behavior:过度动画:smooth(平滑动画)/auto(默认)
////block:垂直对齐:start center end nearest 默认start
////inline:水平对齐:start center end nearest 默认nearest

//15.4 专有扩展 部分浏览器自己扩展
//15.4.1 children ：IE9之前与其他浏览器处理空白文本节点的差异诞生children作用与childNodes一样
//children 子节点都是元素节点
let childLength = document.children.length;
let firstChild = document.children[0];
//15.4.2 （IE引入）contains  a.contains(b):判断元素b是否时元素a的后代节点
//让开发者可以在不遍历 DOM 的情况下获取这个信息
console.log(document.documentElement.contains(document.body)); //true
//compareDocumentPosition()
let result = document.documentElement.compareDocumentPosition(document.body);
console.log(!!(result & 0x10));
//0x1 断开-传入的节点不在文档中
//0x2 领先-传入的节点在参考节点之前
//0x4 随后-传入的节点在参考节点之后
//0x8 包含-传入的节点是参考节点的祖先节点
//0x10 被包含-传入的节点是参考节点的后代节点
//contains compareDocumentPosition IE9+其他现代浏览器都支持
//15.4.3 插入标记 （innerText & outerText）->IE
/* <div id="content">
<p>This is a <strong>paragraph</strong> with a list following it.</p>
<ul>
<li>Item 1</li>
<li>Item 2</li>
<li>Item 3</li>
</ul>
</div> */
console.log(myDiv.innerText);
//对这个例子中的<div>而言， innerText 属性会返回以下字符串：
//This is a paragraph with a list following it.
//Item 1
//Item 2
//Item 3

//15.4.4 scrollIntoViewIfNeeded()
//scrollIntoViewIfNeeded(alingCenter)会在
//元素不可见的情况下，将其滚动到窗口或包含窗口中，使其可见；如果已经在视口中可见，则这个方法
//什么也不做。如果将可选的参数 alingCenter 设置为 true，则浏览器会尝试将其放在视口中央。 Safari、
//Chrome 和 Opera 实现了这个方法
//16