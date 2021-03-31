<template>
  <div class="base-input">
    <div class="base-input__header">
      <slot name="header" />
    </div>
    <label class="base-input__label">
      <slot name="label" />
    </label>
    <input
      :value="modelValue"
      :required="required"
      :disabled="disabled"
      :class="{'base-input__input': true, 'base-input__input--error': error}"
      :type="type"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)">
    <span
      :class="{'base-input__error': true, 'base-input__error--visible': error }">
      {{ error }}
    </span>
    <div class="base-input__footer">
      <slot name="footer" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "BaseInput",
  props: {
    placeholder: {
      type: String,
      default: "",
      required: false,
    },
    type: {
      type: String,
      default: "text",
      required: false,
    },
    required: {
      type: Boolean,
      default: false,
      required: false,
    },
    modelValue: {
      type: String,
      default: "text",
      required: false,
    },
    error: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
});
</script>

<style lang="scss" scoped>
.base-input {
  width: 400px;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  &__header {
    margin-bottom: 15px;
  }
  &__footer {
    margin-top: 15px;
  }
  &__input{
    width: 100%;
    height: 40px;
    border: 1px solid #dedcdc;
    font-weight: 300;
    font-size: 16px;
    line-height: 18px;
    color: black;
    border-radius: 5px;
    transition: all 0.3s;
    outline: none;
    padding: 0px 15px;
    font-size: 14px;
    &:invalid,
    &--error {
      border: 1px solid red;
    }
    &::placeholder {
      font-weight: 300;
      font-size: 16px;
      line-height: 18px;
      color: #6b6b6b;
    }
  }
  &__label {
    font-size: 14px;
    margin-bottom: 2px;
    display: block;
  }
  &__error {
    color: red;
    font-size: 12px;
    padding: 2px;
    display: none;
    &--visible {
      display: block;
    }
  }
}
</style>
