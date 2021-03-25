<template>
  <header class="header-main-layout">
    <div class="header-main-layout__left">
      <img src="@/assets/img/logo.svg" alt="logo">
    </div>
    <div class="header-main-layout__right">
      <p class="header-main-layout__right-showcase">
        Витрина
      </p>
      <img class="header-main-layout__right-notification" src="@/assets/img/bell.svg" alt="bell">
      <div class="header-main-layout__user" @click="showHeadPanel">
        <img src="@/assets/img/user.svg" alt="user">
        <img class="icon-arrow" src="@/assets/img/down-arrow.svg" alt="arrow-down">
        <div class="header-main-layout__sub-list" v-if="showModal">
          <router-link
            class="menu-main-layout__sub-link menu-sub-layout__link"
            :to="{ name: RouteNames.PROFILE }">
            Профиль
          </router-link>
          <button
            class="menu-main-layout__sub-link"
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
import { defineComponent } from "vue";
import { ActionType } from "@/store/modules/User/ActionType";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import { RouteNames } from "@/router/RouteNames";

// const menuLinks = [{ routeName: RouteNames.PROFILE, name: "Профиль" }, { routeName: RouteNames.SIGN_UP, name: "Выйти" }];
export default defineComponent({
  name: "HeaderMainLayout",
  data() {
    return {
      showModal: false,
    };
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const logOut = () => {
      store.dispatch(ActionType.SIGN_OUT);
      router.push({ name: RouteNames.SIGN_IN });
    };
    return { RouteNames, logOut };
  },
  methods: {
    showHeadPanel() {
      this.showModal = !this.showModal;
    },
    showModalFunc() {
      this.showModal = !this.showModal;
    },
  },
});
</script>

<style lang="scss">
.header-main-layout {
  display: flex;
  justify-content: space-between;
  background-color: blueviolet;
  padding: 10px 15px;
  &__left {
    display: flex;
    align-items: center;
  }
  &__right {
    display: flex;
    align-items: center;
    &-showcase {
      margin-right: 10px;
      color: white;
    }
    &-notification {
      margin-right: 10px;
      cursor: pointer;
    }
  }
  &__user {
    display: flex;
    align-items: center;
    position: relative;
    &:hover {
      cursor: pointer;
    }
    .icon-arrow {
      margin-left: 5px;
    }
  }
  &__sub-list {
    position: absolute;
    list-style: none;
    left: -80px;
    top: 45px;
    background-color: #1F2328;
  }
}
</style>
