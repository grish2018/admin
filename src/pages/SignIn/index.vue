<template>
  <div class="sign-in">
    <form class="sign-in__form" @submit.prevent="submit">
      <fieldset class="sign-in__form-border">
        <legend class="sign-in__form-title">Вход</legend>
        <input
          v-model="email"
          type="text"
          class="sign-in__form-input"
          placeholder="Email"
          autocomplete="email"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="sign-in__form-input"
          autocomplete="current-password"
        />
        <button class="sign-in__form-button">Войти</button>
        <router-link
          class="sign-in__form-link"
          :to="{ name: RouteNames.SIGN_UP }"
        >
          Зарегестрироваться
        </router-link>
      </fieldset>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "@/store";
import hash from "@/utils/hash";
import { ActionType } from "@/store/modules/User/ActionType";
import { RouteNames } from "@/router/RouteNames";
export default defineComponent({
  name: "SignIn",
  setup() {
    const email = ref("");
    const password = ref("");
    const store = useStore();
    const submit = () => {
      store.dispatch(ActionType.SIGN_IN, {
        owner: {
          email: email.value,
          hash: hash(password.value)
        }
      });
    };
    return {
      email,
      password,
      submit,
      RouteNames
    };
  }
});
</script>

<style lang="scss">
.sign-in {
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
