<template>
  <!--  <router-view />-->
  <modal-page />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ModalPage from "@/layouts/MainLayout/components/Modal.vue";

export default defineComponent({
  name: "App",
  components: {
    ModalPage,
  },
  mounted() {
    document.addEventListener("resize", this.resize);
    this.resize();
  },
  methods: {
    resize() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    },
  },
});
</script>
