<template>
  <div class="page-wrap">
    <h1 class="page-title">
      Профиль
    </h1>
    <div class="form">
      <base-input
        v-model="user.nickname"
        :required="false"
        placeholder="Введите вашу почту"
        type="text">
        <template #label>
          <span>Nickname</span>
        </template>
      </base-input>
      <base-input
        v-model="user.email"
        :required="false"
        placeholder="Введите вашу почту"
        type="text">
        <template #label>
          <span>email</span>
        </template>
      </base-input>
      <base-input
        v-model="password"
        :required="false"
        placeholder="введите пароль"
        type="text">
        <template #label>
          <span>Password</span>
        </template>
      </base-input>
      <button class="button">
        Сохранить
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, computed, ref } from "vue";
import { ActionType } from "@/store/modules/User/ActionType.ts";
import { store } from "@/store";
import BaseInput from "@/components/BaseInput.vue";

export default defineComponent({
  name: "ProfilePage",
  components: {
    BaseInput,
  },
  setup() {
    const user = ref({ nickname: "", email: "" });
    const password = ref("");
    onBeforeMount(async () => {
      await store.dispatch(ActionType.GET_PROFILE);
      user.value = computed(() => store.getters.userInfo).value;
    });

    return {
      store,
      user,
      password,
    };
  },
});
</script>

<style lang="scss" scoped>
  .page-wrap {
    padding: 50px;
    width: 100%;
  }
  .page-title {
    text-align: center;
    margin-bottom: 30px;
  }
  .form {
    margin: 0 auto;
    width: 400px;
  }
  .button {
    background: #8a2be2;
    color: #fff;
    width: 150px;
    height: 40px;
    border-radius: 5px;
    outline: none;
    transition: background .3s;
    margin: 0 auto;
    display: block;
    &:hover {
      background: #943ee4;
    }
  }
</style>
