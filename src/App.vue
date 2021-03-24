<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getStorage } from "@/utils/storage";
import { RouteNames } from "@/router/RouteNames";
import { mapMutations } from "vuex";
import { useStore } from "@/store";
import { MutationType } from "@/store/modules/User/MutationType";
import { ActionType } from "@/store/modules/User/ActionType";
export default defineComponent({
  name: "App",
  created() {
    const storId = getStorage("storeId");
    const token = getStorage("token");
    const store = useStore();

    if (storId && token) {
      store.commit(MutationType.SET_TOKEN, token);
      store.commit(MutationType.SET_STOREID, storId);
      this.$router.push({ name: RouteNames.MAIN_PAGE });
    } else {
      this.$router.push({ name: RouteNames.SIGN_IN });
    }
  },
  mounted() {
    document.addEventListener("resize", this.resize);
    this.resize();
  },
  methods: {
    ...mapMutations([]),
    resize() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }
  }
});
</script>
