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
        v-model="general.domain"
        :required="false"
        placeholder="Ваш домен"
        type="text">
        <template #label>
          <span>Имя домена</span>
        </template>
      </base-input>
      <base-input
        v-model="password"
        :required="false"
        placeholder="введите пароль"
        type="text"
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
import { defineComponent, onBeforeMount, computed, ref } from "vue";
import { ActionType } from "@/store/modules/User/ActionType.ts";
import { store } from "@/store";
import BaseInput from "@/components/BaseInput.vue";

interface Profile {
  general: {
    name: string;
    domain: string;
    closed: boolean;
  };
  Account: {
    nickname: string;
    email: string;
  };
}

export default defineComponent({
  name: "ProfilePage",
  components: {
    BaseInput,
  },
  setup() {
    const user = ref({ nickname: "", email: "" });
    const general = ref({ id: 0, name: "", closed: false, domain: null });
    const password = ref("");
    const passwordError = computed(() => {
      return (password.value.length !== 0 && password.value.length < 6) ? "ошибка" : "";
    }).value;
    onBeforeMount(async () => {
      await store.dispatch(ActionType.GET_PROFILE);
      user.value = computed(() => store.getters.userInfo).value;
      general.value = computed(() => store.getters.general).value;
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
    };
    return {
      store,
      user,
      password,
      onSubmit,
      general,
      passwordError,
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
