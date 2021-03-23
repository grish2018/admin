<template>
  <div class="sign-up">
    <div class="sign-up__form-wrapper">
      <form class="sign-up__form" @submit.prevent="submit">
        <span class="sign-up__form__header"> Регистрация </span>
        <div class="sign-up__form__input">
          <input
            v-model="email"
            required
            class="sign-up__form__input__input"
            type="email"
            placeholder="Email"
            autocomplete="email"
            id="email"
          />
        </div>
        <div class="sign-up__form__input">
          <input
            v-model="login"
            required
            class="sign-up__form__input__input"
            type="text"
            placeholder="Login"
            autocomplete="login"
            id="login"
          />
        </div>
        <div class="sign-up__form__input">
          <input
            v-model="password"
            required
            class="sign-up__form__input__input"
            type="password"
            placeholder="Password"
            autocomplete="current-password"
            id="password"
          />
        </div>
        <button class="sign-up__form__submit-button">Регистрация</button>
      </form>
      <router-link
        class="sign-up__form-link"
        :to="{ name: RouteNames.SIGN_IN }"
      >
        Уже есть аккаунт
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import { ActionType } from "@/store/modules/User/ActionType";
import { RouteNames } from "@/router/RouteNames";
export default defineComponent({
  name: "SignUp",
  setup() {
    const router = useRouter();
    const email = ref("");
    const login = ref("");
    const password = ref("");
    const store = useStore();
    const submit = async () => {
      await store.dispatch(ActionType.SIGN_UP, {
        owner: {
          email: email.value,
          login: login.value,
          password: password.value
        }
      });
      router.push({ path: "/" });
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
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &__form {
    width: 100%;
    display: flex;
    flex-direction: column;
    &__header {
      font-weight: 300;
      font-size: 26px;
      line-height: 31px;
      color: #101d94;
      margin-bottom: 85px;
    }
    &__input {
      display: flex;
      flex-direction: column;
      margin-bottom: 30px;

      &__input {
        width: 100%;
        height: 40px;
        border: 1px solid #dedcdc;
        font-weight: 300;
        font-size: 16px;
        line-height: 18px;
        color: black;
        border-radius: 5px;
        transition: all 0.3s;
        outline: none;
        padding: 0px 15px;
        &:invalid {
          border: 1px solid red;
        }
        &::placeholder {
          font-weight: 300;
          font-size: 16px;
          line-height: 18px;
          color: #6b6b6b;
        }
      }
    }
    &__submit-button {
      width: 100%;
      height: 45px;
      background: rgba(25, 165, 39, 0.8);
      border-radius: 5px;
      align-items: center;
      justify-content: center;
      outline: none;
      font-weight: 500;
      font-size: 16px;
      line-height: 19px;
      color: #ffffff;
      border: none;
      cursor: pointer;
      margin-top: 10px;
    }
  }
  &__form-wrapper {
    max-width: 410px;
    height: 520px;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px 40px;
    background: #ffffff;
    box-shadow: 0px 0px 10px #ebf0ff;
    border-radius: 24px;
  }
}
.error {
  border: 1px solid red;
}
</style>
