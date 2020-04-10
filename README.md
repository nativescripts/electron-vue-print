
项目环境

node 最新的稳定版

```
//安装依赖
npm
```

```
//运行项目
npm run dev
```

```
//打包项目
npm run build
```

先在主进程 /src/main/index.js

```
//引入ipcMain
import {
  app,
  BrowserWindow,
  ipcMain
} from 'electron'
```

在createWindow方法里添加以下代码，获取打印机列表

```
  //在主线程下，通过ipcMain对象监听渲染线程传过来的getPrinterList事件
  ipcMain.on('getPrinterList', (event) => {
    //在主线程中获取打印机列表
    const list = mainWindow.webContents.getPrinters();
    //通过webContents发送事件到渲染线程，同时将打印机列表也传过去
    mainWindow.webContents.send('getPrinterList', list);
  });
```

接下来在LandingPage.vue中也就是渲染进程中添加一下代码

```
const ipcRenderer = require("electron").ipcRenderer;
```

```
//使用ipcRenderer与主进程通信，并获取返回值
ipcRenderer.send("getPrinterList");
//监听主线程获取到打印机列表后的回调
ipcRenderer.once("getPrinterList", (event, data) => {
//data就是打印机列表
console.log(data);
});
```



```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://cdn.bootcss.com/vue/2.2.2/vue.min.js"></script>
    <title>Document</title>
    <style>
        @page {
            margin: 0;
        }
        .a {
            padding-left: 100px;
        }
    </style>
</head>

<body>
    <div id='app'>
        <div class="a" v-for="v in arr">{{v}}</div>
    </div>
</body>
<script>
    //引入ipcRenderer对象
    const {
        ipcRenderer
    } = require('electron')
    new Vue({
        el: "#app",
        data: {
            arr: []
        },
        mounted() {
            ipcRenderer.on('ping', (e, arr) => { //接收响应
                console.log(e)
                console.log(arr)
                this.arr = arr;
                ipcRenderer.sendToHost('pong') //向webview所在页面的进程传达消息
            })
        },
        methods: {}
    })
</script>

</html>

```

创建完成，回到LandingPage.vue中添加以下代码
注意两个参数

```
silent  是否静默打印
deviceName  打印机名字

```

把deviceName换成你自己的打印机名字

```
<template>
  <div>
    <webview src="../../../static/print.html" nodeintegration></webview>
  </div>
</template>

<script>
const ipcRenderer = require("electron").ipcRenderer;
export default {
  name: "landing-page",
  components: {},
  data() {
    return {
      print0: "",
      print1: ""
    };
  },
  mounted() {
    this.getPrinterList(); //首先先获取
    this. print();
  },
  methods: {
    print() {
      const webview = document.querySelector("webview");
      console.log(webview);
      webview.addEventListener("dom-ready", () => {
        console.log("dom-ready");
        //dom-ready---webview加载完成
        webview.openDevTools(); //这个方法可以打开print.html的控制台
        var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12, 13, 14];
        //在send时将arr传递过去
        webview.send("ping", arr); //向webview嵌套的页面响应事件
      });
      webview.addEventListener("ipc-message", event => {
        console.log(event.channel); // Prints "pong" 在此监听事件中接收webview嵌套页面所响应的事件
        if (event.channel == "pong") {
          console.log("通信成功");
          webview.print(
            {
              //是否是静默打印,true为静默打印，false会弹出打印设置框
              silent: true,
              printBackground: true,
              //打印机的名称，this.print1为在getPrinterList()方法中获取到的打印机名字。
              //注意在demo中这是我打印机的设备，在使用本demo时，先去getPrinterList()中找到你使用的打印机
              deviceName: this.print1
            },
            data => {
              //这个回调是打印后的回调事件，data为true就是打印成功，为false就打印失败
              console.log("webview success", data);
            }
          );
        }
      });
    },
    getPrinterList() {
      ipcRenderer.send("getPrinterList");
      //监听主线程获取到打印机列表后的回调
      ipcRenderer.once("getPrinterList", (event, data) => {
        //data就是打印机列表
        this.print0 = data[3].name;
        this.print1 = data[5].name;
        console.log(data[3].name);
        console.log(data[5].name);
      });
    }
  }
};
</script>

<style>
</style>


```

打包前在package.json中修改

```
"win": {

      "icon": "build/icons/icon.ico",

      "extraResources": "./static/*.html"

    },

```
