<template>
  <header class="header-main-layout">
    <div class="header-main-layout__left">
      <img
        src="@/assets/img/logo.svg"
        alt="logo">
    </div>
    <div class="header-main-layout__right">
      <p class="header-main-layout__showcase">
        Витрина
      </p>
      <img
        class="header-main-layout__notification"
        src="@/assets/img/bell.svg"
        alt="bell">
      <div
        class="header-main-layout__user"
        @click="showHeadPanel">
        <img
          src="@/assets/img/user.svg"
          alt="user">
        <img
          class="header__icon-arrow"
          src="@/assets/img/down-arrow.svg"
          alt="arrow-down">
        <div
          v-if="showModal"
          class="header-main-layout__sub-list">
          <router-link
            class="menu-main-layout__sub-link"
            :to="{ name: RouteNames.PROFILE }">
            Профиль
          </router-link>
          <button
            class="header-main-layout__button"
            @click="logOut">
            Выйти
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
/**
 * Шапка на основном экране
 */
import { defineComponent, ref } from "vue";
import { ActionType } from "@/store/modules/User/ActionType";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import { RouteNames } from "@/router/RouteNames";

export default defineComponent({
  name: "HeaderMainLayout",
  setup() {
    const showModal = ref(false);
    const router = useRouter();
    const store = useStore();
    const logOut = () => {
      store.dispatch(ActionType.SIGN_OUT);
      router.push({ name: RouteNames.SIGN_IN });
    };
    function showHeadPanel() {
      showModal.value = !showModal.value;
    }
    return { RouteNames, logOut, showHeadPanel, showModal };
  },
});
</script>

<style lang="scss">
.header-main-layout {
  display: flex;
  justify-content: space-between;
  background-color: blueviolet;
  padding: 10px 15px;
  height: 50px;
  &__left {
    display: flex;
    align-items: center;
  }
  &__right {
    display: flex;
    align-items: center;
  }
  &__showcase {
    margin-right: 10px;
    color: white;
  }
  &__notification {
    margin-right: 10px;
    cursor: pointer;
  }
  &__user {
    display: flex;
    align-items: center;
    position: relative;
    &:hover {
      cursor: pointer;
    }
    .header__icon-arrow {
      margin-left: 5px;
    }
  }
  &__sub-list {
    position: absolute;
    list-style: none;
    left: -80px;
    top: 45px;
    background-color: #1f2328;
  }
  &__button {
    display: block;
    text-align: left;
    width: 100%;
    padding: 10px 30px;
    color: var(--color-text);
    text-decoration: none;
    line-height: 120%;
    font-size: var(--font-size-navigation-link);
    background: transparent;
    transition: 0.3s;
    &:hover {
      background: var(--select-navigation-color);
    }
  }
}
</style>
