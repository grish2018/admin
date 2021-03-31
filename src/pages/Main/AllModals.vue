<template>
  <div
    v-for="(modal, index) in modals"
    :key="index">
    <component
      :is="info.name"
      :info="info.info || {}"
      :value="info.show!==undefined ? info.show : true"
      @close="mutationCloseModal(modal.id)"
      @toggle="toggle(modal.id, $event)"
      @close-all="mutationCloseAllModal" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "node_modules/vue/dist/vue";

export default defineComponent({
  name: "AllModals",
  components: {

  },
  mounted() {
    try {
      document.body.appendChild(this.$el);
    } catch (e) {
      throw Error(e);
    }
  },
  beforeUnmount() {
    document.body.removeChild(this.$el);
    this.modals.forEach(() => {
      this.mutationCloseModal();
    });
  },
  methods: {
    toggle(id: number, show: boolean) {
      this.mutationToggleModal({ id, show });
    },
  },
});
</script>
