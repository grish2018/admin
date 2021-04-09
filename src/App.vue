<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "App",
  setup() {
    function resize() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
    onMounted(() => {
      document.addEventListener("resize", resize);
      resize();
    });
  },
});
</script>
