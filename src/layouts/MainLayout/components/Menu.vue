<template>
  <aside class="menu-main-layout">
    <header class="menu-main-layout__header">
      Управление магазином
    </header>
    <nav class="menu-main-layout__navigation">
      <ul class="menu-main-layout__list">
        <li
          v-for="link in menuLinks.menuLinksProducts"
          :key="link.name"
          class="menu-main-layout__list-item">
          <router-link
            class="menu-main-layout__sub-link"
            :class="{'menu-main-layout__link--active' : link.children.some((link) => link.routeName === currentRoute)}"
            :to="{ name: link.routeName }">
            {{ link.name }}
          </router-link>
          <ul class="menu-main-layout__sub-list">
            <li v-for="subLink in link.children" :key="subLink.routeName">
              <router-link
                class="menu-main-layout__sub-link menu-sub-layout__link"
                active-class="menu-main-layout__link--active"
                :to="{ name: subLink.routeName }">
                {{ subLink.name }}
              </router-link>
            </li>
          </ul>
        </li>
        <li
          v-for="link in menuLinks.menuLinksSales"
          :key="link.name"
          class="menu-main-layout__list-item">
          <router-link
            class="menu-main-layout__sub-link"
            :class="{'menu-main-layout__link--active' : link.children.some((link) => link.routeName === currentRoute)}"
            :to="{ name: link.routeName }">
            {{ link.name }}
          </router-link>
          <ul class="menu-main-layout__sub-list">
            <li v-for="subLink in link.children" :key="subLink.routeName">
              <router-link
                class="menu-main-layout__sub-link menu-sub-layout__link"
                active-class="menu-main-layout__link--active"
                :to="{ name: subLink.routeName }">
                {{ subLink.name }}
              </router-link>
            </li>
          </ul>
        </li>
        <li class="menu-main-layout__list-item">
          <button
            class="menu-main-layout__sub-link"
            @click="logOut">
            Выйти
          </button>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script lang="ts">
/**
 * Боковое меню на основном экране с ссылками
 */
import { defineComponent, computed } from "vue";
import { RouteNames } from "@/router/RouteNames";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "@/store";
import { ActionType } from "@/store/modules/User/ActionType";

const menuLinks = {
  menuLinksProducts: [{ routeName: RouteNames.PRODUCTS, name: "Каталог", children: [{ routeName: RouteNames.PRODUCTS, name: "Товары" }, { routeName: RouteNames.CATEGORIES, name: "Категории" }] }],
  menuLinksSales: [{ routeName: RouteNames.ORDERS, name: "Продажи", children: [{ routeName: RouteNames.ORDERS, name: "Заказы" }, { routeName: RouteNames.BUYERS, name: "Покупатели" }] }],
};

export default defineComponent({
  name: "MenuMainLayout",

  setup() {
    const router = useRouter();
    const store = useStore();
    const logOut = () => {
      store.dispatch(ActionType.SIGN_OUT);
      router.push({ name: RouteNames.SIGN_IN });
    };
    const route = useRoute();
    const currentRoute = computed(() => {
      return route.name;
    });
    return { RouteNames, logOut, menuLinks, currentRoute };
  },
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
  &__list-item {
    position: relative;
    &:hover .menu-main-layout__sub-list {
      --sub-list-display: block;
    }
  }
  &__sub-link {
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
  }
  &__link {
    &--active {
      background: var(--select-navigation-color);
    }
    &--active + .menu-main-layout__sub-list{
      --sub-list-display: block;
      --sub-list-position: relative;
      width: 100%;
      top: 0;
      right: 0;
      .menu-sub-layout__link {
        padding: 10px 30px 10px 40px;
      }
    }
    &:hover {
      background: var(--select-navigation-color);
    }
  }
  &__sub-list {
    --sub-list-display: none;
    --sub-list-position: absolute;
    display: var(--sub-list-display);
    position: var(--sub-list-position);
    list-style: none;
    width: 150px;
    top: 0;
    right: -150px;
    background-color: #94C4E8;
  }
}
</style>
