<template>
  <aside class="menu-main-layout">
    <header class="menu-main-layout__header">
      Управление магазином
    </header>
    <nav class="menu-main-layout__navigation">
      <ul class="menu-main-layout__list">
        <li
          v-for="link in menuLinksProducts"
          :key="link.name"
          class="menu-main-layout__list-item">
          <router-link
            class="menu-main-layout__link"
            :class="{'menu-main-layout__link--active' : link.children.some((link) => link.routeName === currentRoute) || link.routeName === currentRoute}"
            :to="{ name: link.routeName }">
            {{ link.name }}
          </router-link>
          <ul class="menu-sub">
            <li v-for="subLink in link.children" :key="subLink.routeName">
              <router-link
                class="menu-main-layout__link menu-sub-layout__link"
                active-class="menu-main-layout__link--active"
                :to="{ name: subLink.routeName }">
                {{ subLink.name }}
              </router-link>
            </li>
          </ul>
        </li>
        <li
          v-for="link in menuLinksSales"
          :key="link.name"
          class="menu-main-layout__list-item">
          <router-link
            class="menu-main-layout__link"
            :class="{'menu-main-layout__link--active' : link.children.some((link) => link.routeName === currentRoute) || link.routeName === currentRoute}"
            :to="{ name: link.routeName }">
            {{ link.name }}
          </router-link>
          <ul class="menu-sub">
            <li v-for="subLink in link.children" :key="subLink.routeName">
              <router-link
                class="menu-main-layout__link menu-sub-layout__link"
                active-class="menu-main-layout__link--active"
                :to="{ name: subLink.routeName }">
                {{ subLink.name }}
              </router-link>
            </li>
          </ul>
        </li>
        <li class="menu-main-layout__list-item">
          <button
            class="menu-main-layout__link"
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

const menuLinksProducts = [
  {
    routeName: RouteNames.PRODUCTS,
    name: "Каталог",
    children: [
      {
        routeName: RouteNames.PRODUCTS,
        name: "Товары",
      },
      {
        routeName: RouteNames.CATEGORIES,
        name: "Категории",
      },
    ],
  },
];

const menuLinksSales = [
  {
    routeName: RouteNames.ORDERS,
    name: "Продажи",
    children: [
      {
        routeName: RouteNames.ORDERS,
        name: "Заказы",
      },
      {
        routeName: RouteNames.BUYERS,
        name: "Покупатели",
      },
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
    return { RouteNames, logOut, menuLinksProducts, menuLinksSales, currentRoute };
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
    &-item {
      position: relative;
      &:hover .menu-sub {
        display: block;
      }
    }
  }
  &__link {
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
    &--active {
      background: var(--select-navigation-color);

    }
    &:hover {
      background: var(--select-navigation-color);
    }
  }
  .menu-sub {
    display: none;
    list-style: none;
    position: absolute;
    width: 150px;
    top: 0;
    right: -150px;
    background-color: #94C4E8;
  }
  .menu-main-layout__link--active + .menu-sub {
    display: block;
    position: relative;
    width: 100%;
    top: 0;
    right: 0;
    .menu-sub-layout__link {
      padding: 10px 30px 10px 40px;
    }
  }
}
</style>
