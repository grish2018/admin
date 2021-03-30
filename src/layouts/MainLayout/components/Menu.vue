<template>
  <aside class="menu-main-layout">
    <nav class="menu-main-layout__navigation">
      <ul class="menu-main-layout__list">
        <li
          v-for="link in menuLinks"
          :key="link.name"
          class="menu-main-layout__list-item"
          :class="{
            'menu-main-layout__link--active': link.children.some(
              (link) => link.routeName === currentRoute
            ),
          }">
          <router-link
            class="menu-main-layout__sub-link menu-main-layout__sub-link--active"
            :to="{ name: link.routeName }">
            {{ $t(link.name) }}
          </router-link>
          <ul class="menu-main-layout__sub-list">
            <li
              v-for="subLink in link.children"
              :key="subLink.routeName">
              <router-link
                class="menu-main-layout__sub-link"
                active-class="menu-main-layout__link--active"
                :to="{ name: subLink.routeName }">
                {{ $t(subLink.name) }}
              </router-link>
            </li>
          </ul>
        </li>
        <li class="menu-main-layout__list-item">
          <button
            class="menu-main-layout__sub-link"
            @click="logOut">
            {{ $t("message.LogOff") }}
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

const menuLinks = [
  {
    routeName: RouteNames.PRODUCTS,
    name: "message.Catalog",
    children: [
      { routeName: RouteNames.PRODUCTS, name: "message.Products" },
      { routeName: RouteNames.CATEGORIES, name: "message.Categories" },
    ],
  },
  {
    routeName: RouteNames.ORDERS,
    name: "message.Sales",
    children: [
      { routeName: RouteNames.ORDERS, name: "message.Orders" },
      { routeName: RouteNames.CUSTOMERS, name: "message.Customers" },
    ],
  },
];

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
  --sub-list-display: none;
  --sub-list-position: absolute;
  background: #1f2328;
  width: 270px;
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
      z-index: 1;
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
    &:hover {
      background: rgba(18, 88, 140);
    }
  }
  &__link {
    &--active {
      color: var(--select-navigation-color);
      .menu-main-layout__sub-list {
        --sub-list-display: block;
        --sub-list-position: relative;
        width: 100%;
        top: 0;
        right: 0;
        .menu-main-layout__sub-link {
          padding: 10px 30px 10px 40px;
        }
      }
      .menu-main-layout__sub-link--active {
        background: var(--select-navigation-color);
      }
    }
  }
  &__sub-list {
    display: var(--sub-list-display);
    position: var(--sub-list-position);
    list-style: none;
    width: 150px;
    top: 0;
    right: -150px;
    background-color: #1F2328;
  }
}
</style>
