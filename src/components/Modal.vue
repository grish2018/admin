<template>
  <div class="modal">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.modal {
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
  z-index: 900;
}
</style>
