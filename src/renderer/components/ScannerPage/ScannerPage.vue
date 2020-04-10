<template>
  <div>
    <button class="msgbox-btn msgbox-cancel" @click="goToPage('landing')">
      返回
    </button>
    <button class="msgbox-btn msgbox-cancel" @click="scan()">
      打开调试工具
    </button>
    <webview src="../../../static/scan.html" nodeintegration style="height: 1000px;"></webview>
  </div>
</template>

<script>
  export default {
    name: "scan-page",
    components: {},
    data() {
      return {

      };
    },
    mounted() {

    },
    methods: {
      goToPage (name) {
        this.$router.push({
          name: name
        });
      },
      scan() {
        const webview = document.querySelector("webview");
        webview.openDevTools(); //这个方法可以打开print.html的控制台
      }
    }
  };
</script>

<style>
</style>
