//12.1 window 对象
//12.1.1 Global作用域
//12.1.2 窗口关系
window.parent;
window.parent.parent;
window.self;
//12.1.3 窗口位置与像素比
//css像素
//DPI（ dot per inch） window.devicePixelRatio 0.0213
//12.1.4 窗口大小
//获取浏览器视口大小：
let width = window.innerWidth,
  height = window.innerHeight;
if (typeof width != "number") {
  if (document.compatMode == "CSS1Compat") {
    width = document.documentElement.clientWidth;
    height = document.documentElement.clientHeight;
  } else {
    width = document.body.clientWidth;
    height = document.body.clientHeight;
  }
}

//调整window窗口大小 部分浏览器可能会禁用缩放
window.resizeTo(100, 100);
window.resizeBy(100, 50);

//12.1 .5 视口位置
window.scrollTo(x, y);
window.scrollTo({ left: 100, top: 100, behavior: "smooth" });
//12.1 .6 window.open()
//12.1 .7 定时器 window.setTimeout window.setInterval()
//2.1 .8 系统对话框
alert("alert");

if (confirm("confirm?")) {
  console.log("confirmed!");
} else {
  console.log("canceled!");
}

var result = prompt("please input number and confirm", "");
if (result) {
  alert("number is" + result);
}

window.print(); //打开浏览器打印界面
window.find();

//12.2 location
location.host;
location.hostname;
location.href;
location.protocol;
location.port;
location.search;
location.hash;
location.pathname;
location.origin;
//12.2.1 query string
let getQueryObj = function () {
  let normalized =
    location.search.length > 0 ? location.search.substring(1) : "";
  let args = {};
  for (let item of normalized.split("&").map((kv) => kv.split("="))) {
    let key = decodeURIComponent(item[0]);
    let v = decodeURIComponent(item[1]);
    if (key.length) {
      args[key] = v;
    }
  }
};

//URLSearchParams
let queryString = "?q=js&num=666";
let queryParams = new URLSearchParams(queryString);
console.log(queryParams.toString()); //' q=js&num=666';
console.log(queryParams.has("num")); //true
console.log(queryParams.get("num")); //666
console.log(queryParams.set("page", 3));
console.log(queryParams.delete("page"));
for (let param of queryParams) {
  console.log(param);
}

//12.2.2 操作地址
let newUrl = "www.google.com";
location.assign(newUrl);
location.href = newUrl;
location.location = newUrl;
//常用的是href
//修改一下location属性一样会重新加载地址
location.hostname;
location.pathname;
location.host;
location.port;
//修改location.hash不会重新加载地址
location.reload(); //可能加载缓存页面
location.reload(true); //重新从服务器加载页面
//location.reload() 之后的代码不一定会执行，取决于页面加载的快慢，reload一般放到最后执行

//12.3 navigator
//12.3.1 检测插件

//12.4 screen
screen.width; //屏幕宽度
screen.height; //屏幕高度
screen.orientation; //屏幕朝向

//12.5 history
//12.5.1 导航
//12.5.2 历史状态管理
history.go(-1); //-1 0 1
history.forward(); //history.go(1)
history.back(); //history.go(-1)
let stateObj = { foo: "bar" }; //500k-1M 阈值限制
history.pushState({}, "title", "biz.html"); //新增一条历史记录
history.replaceState({}, "title", "biz.html"); //不会创建历史揭露只会覆盖当前的状态
//页面后退时会触发popstate事件
window.addEventListener("popstate", (e) => {
  let state = e.state;
  if (state) {
    //第一次加载时状态是null值
    //....
  }
});
//pushState与replaceState方法对应的逻辑地址要对应一个服务器物理URL，否则404
