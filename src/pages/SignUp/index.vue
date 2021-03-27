<template>
  <div class="sign-up">
    <div class="sign-up__form-wrapper">
      <form
        class="sign-up__form"
        @submit.prevent="submit">
        <span class="sign-up__form-header">
          Регистрация
        </span>
        <error-alert :error-message="errorMessage" />
        <div class="sign-up__input-wrapper">
          <input
            id="email"
            v-model="email"
            required
            class="sign-up__form-input"
            type="email"
            placeholder="Email"
            autocomplete="email">
        </div>
        <div class="sign-up__input-wrapper">
          <input
            id="nickname"
            v-model="nickname"
            required
            class="sign-up__form-input"
            type="text"
            placeholder="Nickname"
            autocomplete="nickname">
        </div>
        <div class="sign-up__input-wrapper">
          <input
            id="password"
            v-model="password"
            required
            class="sign-up__form-input"
            type="password"
            placeholder="Password"
            autocomplete="current-password">
        </div>
        <button class="sign-up__form__submit-button">
          Регистрация
        </button>
      </form>
      <router-link
        class="sign-up__form-link"
        :to="{ name: RouteNames.SIGN_IN }">
        Уже есть аккаунт
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import ErrorAlert from "@/components/ErrorAlert.vue";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import { ActionType } from "@/store/modules/User/ActionType";
import { RouteNames } from "@/router/RouteNames";
export default defineComponent({
  name: "SignUp",
  components: { ErrorAlert },
  setup() {
    const router = useRouter();
    const email = ref("");
    const nickname = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const store = useStore();
    const submit = async () => {
      try {
        await store.dispatch(ActionType.SIGN_UP, {
          owner: {
            email: email.value,
            nickname: nickname.value,
            password: password.value,
          },
        });
        router.push({ name: RouteNames.MAIN_PAGE });
      } catch (err) {
        errorMessage.value = err.response.data
          ? err.response.data
          : "Network Error";
        return false;
      }
    };
    return {
      nickname,
      password,
      email,
      submit,
      RouteNames,
      errorMessage,
    };
  },
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
    margin-bottom: 40px;
    &-header {
      font-weight: 300;
      font-size: 26px;
      line-height: 31px;
      color: #101d94;
      margin-bottom: 35px;
    }

    &-input {
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
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px 40px;
    background: #ffffff;
    box-shadow: 0px 0px 10px #ebf0ff;
    border-radius: 24px;
  }
  &__input-wrapper {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
  }
  &__form-link {
    text-decoration: none;
  }
}
</style>
