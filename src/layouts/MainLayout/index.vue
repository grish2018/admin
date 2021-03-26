<template>
  <div class="main-layout">
    <header-layout />
    <div class="main-layout__body">
      <menu-layout />
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import MenuLayout from "./components/Menu.vue";
import HeaderLayout from "./components/Header.vue";
export default defineComponent({
  name: "MainLayout",
  components: {
    MenuLayout,
    HeaderLayout,
  },
});
</script>

<style lang="scss">
.main-layout {
  display: flex;
  flex-direction: column;
  max-width: 1920px;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  background: var(--background-color-layout);
  &__body {
    display: flex;
    height: 100%;
  }
}
</style>
