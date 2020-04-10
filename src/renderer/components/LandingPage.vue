<template>
  <div>
      <button class="msgbox-btn msgbox-cancel" @click="goToPage('printer')">
          打印功能
      </button>
      <button class="msgbox-btn msgbox-confirm" @click="goToPage('scanner')">
          扫描功能
      </button>
  </div>
</template>

<script>
export default {
  name: "landing-page",
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
      }
  }
};
</script>

<style>
</style>
