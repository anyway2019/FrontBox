const worker = new Worker("./worker.js", { name: "echo worker" });
console.log("init worker");
// 给 1000 毫秒让工作者线程初始化
setTimeout(() => {
  worker.postMessage("foo");
  worker.postMessage("bar");
  worker.postMessage("hello");
  setTimeout(() => worker.postMessage("quit"), 0);
}, 1000);

worker.onmessage = ({ data }) => {
  if (data.includes("quit")) {
    worker.terminate();
  }
  console.log(data);
};

worker.onerror = console.log;

//message channel:MessageChannel 真正有用的地方是让两个工作者线程之间直接通信。这可以通过把端口传给
//另一个工作者线程实现
const channel = new MessageChannel();
const factorialWorker = new Worker("./channelWorker.js");
// 把`MessagePort`对象发送到工作者线程
// 工作者线程负责处理初始化信道
factorialWorker.postMessage(null, [channel.port1]);
// 通过信道实际发送数据
channel.port2.onmessage = ({ data }) => console.log(data);
// 工作者线程通过信道响应
channel.port2.postMessage(5);

//BroadcastChannel:

//serviceWorker:服务工作者线程在两个主要任务上最有用：充当网络请求的
//缓存层和启用推送通知。在这个意义上，服务工作者线程就是用于把网页变成像原生应用程序一样的
//工具(ps:pwa之类的application)
