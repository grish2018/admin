<template>
  <aside class="menu-main-layout">
    <header class="menu-main-layout__header">Управление магазином</header>
    <nav class="menu-main-layout__navigation">
      <ul class="menu-main-layout__list">
        <li class="menu-main-layout__list-item">
          <router-link
            class="menu-main-layout__link"
            active-class="menu-main-layout__link--active"
            :to="{ name: RouteNames.PRODUCTS }"
          >
            Товары
          </router-link>
        </li>
        <li class="menu-main-layout__list-item">
          <router-link
            class="menu-main-layout__link"
            active-class="menu-main-layout__link--active"
            :to="{ name: RouteNames.PROFILE }"
          >
            Профиль
          </router-link>
        </li>
        <li class="menu-main-layout__list-item">
          <router-link class="menu-main-layout__link" to="" @click="logOut">
            Выйти
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script lang="ts">
/**
 * Боковое меню на основном экране с ссылками
 */
import { defineComponent } from "vue";
import { removeStorage } from "@/utils/storage";
import { RouteNames } from "@/router/RouteNames";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "MenuMainLayout",
  setup() {
    const router = useRouter();
    const logOut = () => {
      removeStorage("token");
      removeStorage("storeId");
      router.push({ name: RouteNames.SIGN_UP });
    };
    return { RouteNames, logOut };
  }
});
</script>

<style lang="scss">
.menu-main-layout {
  background: #1f2328;
  width: 270px;
  height: 100%;
  &__header {
    text-align: center;
    color: var(--color-text);
  }
  &__list {
    list-style-type: none;
  }
  &__link {
    display: block;
    width: 100%;
    padding: 10px 30px;
    color: var(--color-text);
    text-decoration: none;
    line-height: 120%;
    font-size: var(--font-size-navigation-link);
    background: transparent;
    transition: 0.3s;
    &--active {
      background: var(--select-navigation-color);
    }
    &:hover {
      background: var(--select-navigation-color);
    }
  }
}
</style>
