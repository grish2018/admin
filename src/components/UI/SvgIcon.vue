<template>
  <svg
    :class="className"
    xmlns="http://www.w3.org/2000/svg">
    <title v-if="title">
      {{ title }}
    </title>
    <use
      :xlink:href="iconPath"
      xmlns:xlink="http://www.w3.org/1999/xlink" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SvgIcon",
  props: {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      icon: {} as {default: { id?: number | string }},
    };
  },
  computed: {
    iconPath(): string {
      let icon: { id?: number | string } = {};
      if (Object.prototype.hasOwnProperty.call(this.icon, "default")) {
        icon = this.icon.default;
      }

      return `#${icon.id}`;
    },
    className(): string {
      return `svg-icon svg-icon--${this.name}`;
    },
  },
  watch: {
    name: {
      immediate: true,
      async handler(val) {
        this.icon = await import(`@/assets/icons/${val}.svg`);
      },
    },
  },
});
</script>
