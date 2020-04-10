<template>
  <div>
    <button class="msgbox-btn msgbox-cancel" @click="goToPage('landing')">
      返回
    </button>
    <p>选择打印机</p>
    <select>
      <option></option>
      <option v-for="v in printerList">{{v}}</option>
    </select>
    <button class="msgbox-btn msgbox-cancel" @click="goToClick()">
      打印下面内容
    </button>
    <webview id="printWebview" src="../../../static/print.html" nodeintegration></webview>
  </div>
</template>

<script>
  const ipcRenderer = require("electron").ipcRenderer;
  export default {
    name: "print-page",
    components: {},
    data() {
      return {
        select: "",
        printerList: []
      };
    },
    mounted() {
      this.getPrinterList(); //首先先获取
    },
    methods: {
      goToPage (name) {
        this.$router.push({
          name: name
        });
      },
      goToClick () {
        let  sel = document.querySelector("select");
        this.select = sel.options[sel.selectedIndex].value;
        if(this.select){
          this.print(this.select);
        }else{
          alert("请先选择打印机");
        }
      },
      print(name) {
        const webview = document.querySelector("webview");
        console.log(webview);
        //传值方式一
        // const renderHtml = '我是被临时插入webview的内容...';
        // webview.executeJavaScript('document.documentElement.innerHTML =`' + renderHtml + '`;');
        //webview.openDevTools(); //这个方法可以打开print.html的控制台
        //传值方式二
        let arr = ["打印内容1", 2, 3, 4, 5, 6];//在send时将arr传递过去
        webview.send("ping", arr); //向webview嵌套的页面响应事件
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
                      deviceName: name
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
          console.log(data);
          for (let i=0;i<data.length;i++) {
            this.printerList.push(data[i].name);
          }
          // console.log(this.printerList);
        });
      }
    }
  };
</script>

<style>
</style>
