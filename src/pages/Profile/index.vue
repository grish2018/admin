<template>
  <div class="page-wrap">
    <h1 class="page-title">
      Профиль
    </h1>
    <form
      class="form"
      @submit.prevent="onSubmit">
      <base-input
        v-model="user.nickname"
        placeholder="Введите вашу почту">
        <template #label>
          <span>Nickname</span>
        </template>
      </base-input>
      <base-input
        v-model="user.email"
        placeholder="Введите вашу почту"
        type="email">
        <template #label>
          <span>email</span>
        </template>
      </base-input>
      <base-input
        v-model="general.domain"
        placeholder="Ваш домен">
        <template #label>
          <span>Имя домена</span>
        </template>
      </base-input>
      <base-input
        v-model="password"
        placeholder="введите пароль"
        :error="(password.length !== 0 && password.length < 6) ? 'Маленькая длина пароля' : ''">
        <template #label>
          <span>Password</span>
        </template>
      </base-input>
      <button class="button">
        Сохранить
      </button>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "vue";
import { ActionType } from "@/store/modules/User/ActionType.ts";
import { store } from "@/store";
import BaseInput from "@/components/BaseInput.vue";

interface User {
  nickname?: string;
  email?: string;
}

interface General {
  id?: number;
  name?: string;
  closed?: boolean;
  domain?: string;
}

export default defineComponent({
  name: "ProfilePage",
  components: {
    BaseInput,
  },
  setup() {
    const user: {value: User} = ref({});
    const general: {value: General} = ref({});
    const password = ref("");

    onBeforeMount(async () => {
      await store.dispatch(ActionType.GET_PROFILE);
      user.value = { ...store.state.user.user };
      general.value = { ...store.state.user.general };
    });

    const onSubmit = () => {
      store.dispatch(ActionType.SET_PROFILE,
        {
          account: {
            nickname: user.value.nickname,
            email: user.value.email,
            password: password.value.length > 5 ? password.value : "",
          },
          general: {
            name: general.value.name,
            closed: general.value.closed,
            domain: general.value.domain,
          },
        }
      );
      password.value = "";
    };
    return {
      user,
      onSubmit,
      general,
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
