<template>
  <transition name="fade">
    <div v-show="props.error.message && showError" class="errorAlert">
      <span>{{ props.error.message }}</span>
    </div>
  </transition>
</template>

<script lang="ts">
import { ErrorMessage } from "@/types/ErrorMessage";
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
export default defineComponent({
  name: "ErrorAlert",
  props: {
    error: {
      type: Object as () => ErrorMessage,
      default: () => {
        return {};
      },
    },
  },
  setup(props) {
    const route = useRoute();
    const showError = computed(() => route.name === props.error.place);
    return { showError, props };
  },
});
</script>

<style lang="scss" scoped>
.fade-enter-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
}
.errorAlert {
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
</style>
