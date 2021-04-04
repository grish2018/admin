<template>
  <header class="header-main-layout">
    <div class="header-main-layout__logo">
      <svg-icon
        class="header-main-layout__logo-icon"
        name="logo" />
    </div>
    <div class="header-main-layout__content">
      <p class="header-main-layout__showcase">
        {{ $t("Storefront") }}
      </p>
      <svg-icon
        class="header-main-layout__bell-icon"
        name="bell" />
      <div
        class="header-main-layout__user"
        @click="showHeadPanel">
        <svg-icon
          class="header-main-layout__user-icon"
          name="user" />
        <svg-icon
          class="header-main-layout__arrow"
          name="down-arrow" />
        <div
          v-if="showModal"
          v-click-away="onClickAway"
          class="header-main-layout__sub-list">
          <router-link
            class="menu-main-layout__sub-link"
            :to="{ name: RouteNames.PROFILE }">
            {{ $t("Profile") }}
          </router-link>
          <button
            class="header-main-layout__button"
            @click="logOut">
            {{ $t("LogOut") }}
          </button>
        </div>
      </div>
      <select
        :value="$i18n.locale"
        class="header-main-layout__select"
        @change="setLocale">
        <option value="ru">
          ru
        </option>
        <option value="en">
          en
        </option>
      </select>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ActionType } from "@/store/modules/User/ActionType";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import { RouteNames } from "@/router/RouteNames";
import { setStorage } from "@/utils/storage";

export default defineComponent({
  name: "HeaderMainLayout",
  setup() {
    const showModal = ref(false);
    const router = useRouter();
    const store = useStore();
    const setLocale = ({ target }: { target: HTMLSelectElement }) => {
      setStorage("locale", target.value);
      window.location.reload();
    };
    const logOut = () => {
      store.dispatch(ActionType.SIGN_OUT);
      router.push({ name: RouteNames.SIGN_IN });
    };
    function showHeadPanel() {
      showModal.value = !showModal.value;
    }
    function onClickAway() {
      showModal.value = false;
    }
    return {
      RouteNames,
      logOut,
      showHeadPanel,
      showModal,
      setLocale,
      onClickAway,
    };
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
  &__logo {
    display: flex;
    align-items: center;
  }
  &__logo-icon {
    width: 183px;
    height: 25px;
  }
  &__content {
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
  &__bell-icon {
    height: 30px;
    width: 30px;
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
  &__user-icon {
    height: 30px;
    width: 30px;
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
  &__select {
    margin-left: 10px;
    width: 50px;
    outline: none;
  }
  &__arrow {
    height: 15px;
    width: 15px;
  }
}
</style>
