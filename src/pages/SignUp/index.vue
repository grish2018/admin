<template>
  <div class="sign-up">
    <form class="sign-up__form" @submit.prevent="submit">
      <fieldset class="sign-up__form-border">
        <legend class="sign-up__form-title">Регистрация</legend>
        <input
          v-model="email"
          type="email"
          class="sign-up__form-input"
          placeholder="Email"
          autocomplete="email"
        />
        <input
          v-model="login"
          type="text"
          class="sign-up__form-input"
          placeholder="Login"
          autocomplete="login"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="sign-up__form-input"
          autocomplete="current-password"
        />
        <button class="sign-up__form-button">Регистрация</button>
        <router-link
          class="sign-up__form-link"
          :to="{ name: RouteNames.SIGN_IN }"
        >
          Уже есть аккаунт
        </router-link>
      </fieldset>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "@/store";
import { ActionType } from "@/store/modules/User/ActionType";
import { RouteNames } from "@/router/RouteNames";
export default defineComponent({
  name: "SignUp",
  setup() {
    const email = ref("");
    const login = ref("");
    const password = ref("");
    const store = useStore();
    const submit = () => {
      store.dispatch(ActionType.SIGN_UP, {
        owner: {
          email: email.value,
          login: login.value,
          password: password.value
        }
      });
    };
    return {
      login,
      password,
      email,
      submit,
      RouteNames
    };
  }
});
</script>

<style lang="scss">
.sign-up {
  &__form {
    max-width: 320px;
  }
  &__form-border {
    display: flex;
    flex-direction: column;
    padding: 0 10px 10px;
  }
  &__form-input {
    margin-top: 10px;
  }
  &__form-button {
    min-width: 70px;
    margin-top: 20px;
    align-self: center;
  }
  &__form-link {
    margin-top: 10px;
    align-self: center;
  }
}
</style>
