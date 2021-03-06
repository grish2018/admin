<template>
  <div class="sign-in">
    <div class="sign-in__form-wrapper">
      <form
        class="sign-in__form"
        @submit.prevent="submit">
        <span class="sign-in__form-header">
          {{ $t("SignIn") }}
        </span>
        <error-plate />
        <div class="sign-in__input-wrapper">
          <input
            id="email"
            v-model="email"
            required
            class="sign-in__form-input"
            type="email"
            :placeholder="$t('Email')"
            autocomplete="email">
        </div>
        <div class="sign-in__input-wrapper">
          <input
            id="password"
            v-model="password"
            required
            class="sign-in__form-input"
            type="password"
            :placeholder="$t('Password')"
            autocomplete="current-password">
        </div>
        <button class="sign-in__form__submit-button">
          {{ $t("LogIn") }}
        </button>
      </form>
      <router-link
        class="sign-in__form-link"
        :to="{ name: RouteNames.SIGN_UP }"
        @click="cleanError">
        {{ $t("Registration") }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import ErrorPlate from "@/components/ErrorPlate.vue";
import { defineComponent, ref } from "vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
import hash from "@/utils/hash";
import { ActionType } from "@/store/modules/User/ActionType";
import { RouteNames } from "@/router/RouteNames";
import { MutationType } from "@/store/modules/User/MutationType";
export default defineComponent({
  name: "SignIn",
  components: { ErrorPlate },
  setup() {
    const email = ref("");
    const password = ref("");
    const store = useStore();
    const router = useRouter();
    const cleanError = () => {
      store.commit(MutationType.SET_ERROR_MESSAGE, "");
    };

    const submit = async () => {
      await store.dispatch(ActionType.SIGN_IN, {
        email: email.value,
        hash: hash(password.value),
      });
      router.push({ name: RouteNames.MAIN_PAGE });
    };

    return {
      email,
      password,
      submit,
      RouteNames,
      cleanError,
    };
  },
});
</script>

<style lang="scss">
.sign-in {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  &__form {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
    position: relative;
    &-header {
      font-weight: 300;
      font-size: 26px;
      line-height: 31px;
      color: #101d94;
      margin-bottom: 85px;
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
