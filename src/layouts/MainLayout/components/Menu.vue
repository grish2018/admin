<template>
  <aside class="menu-main-layout">
    <nav class="menu-main-layout__navigation">
      <ul class="menu-main-layout__list">
        <li
          v-for="link in menuLinks"
          :key="link.name"
          class="menu-main-layout__list-item"
          :class="{
            'menu-main-layout__list-item--active': isActive(link.children),
          }">
          <router-link
            class="menu-main-layout__link"
            :to="{ name: link.routeName }">
            {{ $t(link.name) }}
          </router-link>
          <ul class="menu-main-layout__sub-list">
            <li
              v-for="subLink in link.children"
              :key="subLink.routeName">
              <router-link
                v-if="subLink.name"
                class="menu-main-layout__sub-link"
                active-class="menu-main-layout__sub-link--active"
                :class="{
                  'menu-main-layout__sub-link--active': isActive(subLink.children),
                }"
                :to="{ name: subLink.routeName }">
                {{ $t(subLink.name) }}
              </router-link>
            </li>
          </ul>
        </li>
        <li class="menu-main-layout__list-item">
          <button
            class="menu-main-layout__logout"
            @click="logOut">
            {{ $t("LogOut") }}
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
    name: "Catalog",
    children: [
      {
        routeName: RouteNames.PRODUCTS,
        name: "Products",
        children: [
          { routeName: RouteNames.PRODUCTS },
          { routeName: RouteNames.CREATE_PRODUCTS },
          { routeName: RouteNames.EDIT_PRODUCTS },
        ],
      },
      { routeName: RouteNames.CATEGORIES, name: "Categories" },
    ],
  },
  {
    routeName: RouteNames.ORDERS,
    name: "Sales",
    children: [
      { routeName: RouteNames.ORDERS, name: "Orders" },
      { routeName: RouteNames.CUSTOMERS, name: "Customers" },
    ],
  },
];
interface SubLink {
  routeName: string;
  name: string;
  children: SubLink[];
}
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
    const isActive = (links: SubLink[] = []): boolean => {
      return links.some((link) => link.routeName === currentRoute.value || isActive(link.children));
    };
    return { RouteNames, logOut, menuLinks, currentRoute, isActive };
  },
});
</script>

<style lang="scss">
.menu-main-layout {

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
    --link-background: transparent;
    --sub-list-display: none;
    --sub-list-position: absolute;
    --sub-list-max-width: 150px;
    --sub-link-padding: 10px 30px;

    position: relative;
    &:hover {
      --sub-list-display: block;
    }

    &--active {
      --link-background: var(--select-navigation-color);
      --sub-list-display: block;
      --sub-list-position: static;
      --sub-list-max-width: none;
      --sub-link-padding: 10px 30px 10px 40px;
    }
  }
  &__link, &__sub-link, &__logout {
    display: block;
    text-align: left;
    width: 100%;
    padding: 10px 30px;
    color: var(--color-text);
    text-decoration: none;
    line-height: 120%;
    font-size: var(--font-size-navigation-link);
    background: transparent;
    transition: background-color 0.3s;
    &:hover {
      background: rgba(18, 88, 140);
    }
  }
  &__link {
    background: var(--link-background);
  }
  &__sub-link {
    padding: var(--sub-link-padding);
    &--active {
      color: var(--select-navigation-color);
    }
  }
  &__sub-list {
    display: var(--sub-list-display);
    position: var(--sub-list-position);
    z-index: 1;
    list-style: none;
    width: 100%;
    max-width: var(--sub-list-max-width);
    top: 0;
    left: 100%;
    background-color: #1f2328;
  }
}
</style>
