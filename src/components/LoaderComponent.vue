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
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  position: absolute;
  z-index: 1000;
}
</style>
