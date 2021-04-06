<template>
  <div class="loader">
    <svg-icon
      name="loader" />
  </div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "LoaderComponent",
});
</script>

<style>
.loader {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 1000;
}
</style>
