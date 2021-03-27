<template>
  <div :class="{ visible: errorMessage }" class="errorAlert">
    <span>{{ errorMessage }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "ErrorAlert",
  props: {
    errorMessage: {
      type: String,
      default: "",
    },
  },
});
</script>

<style lang="scss" scoped>
.errorAlert {
  visibility: hidden;
  border: 1px solid red;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f2dede;
  margin-bottom: 20px;
  border-radius: 19px;
  & span {
    color: red;
  }
}
.visible {
  visibility: initial;
}
</style>
