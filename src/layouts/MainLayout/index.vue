<template>
  <div class="main-layout">
    <header-layout />
    <div class="main-layout__container">
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
  min-height: 100vh;
  background: var(--background-color-layout);
  &__container {
    width: 100%;
    flex-grow: 1;
    display: flex;
  }
}
</style>
