<template>
  <div class="profile-page">
    <h1 class="profile-page__title">
      {{ $t("Profile") }}
    </h1>
    <form
      class="profile-page__form"
      @submit.prevent="onSubmit">
      <base-input
        v-model="nickname"
        :placeholder="$t('EnterYourNickname')">
        <template #label>
          <span>{{ $t("Nickname") }}</span>
        </template>
      </base-input>
      <base-input
        v-model="email"
        :placeholder="$t('EnterYourEmail')"
        type="email">
        <template #label>
          <span>{{ $t("Email") }}</span>
        </template>
      </base-input>
      <base-input
        v-model="user.general.domain"
        :placeholder="$t('YourDomain')">
        <template #label>
          <span>{{ $t("DomenName") }}</span>
        </template>
      </base-input>
      <base-input
        v-model="password"
        :placeholder="$t('EnterPassword')"
        :error="
          password.length !== 0 && password.length < 6
            ? $t('PasswordIsTooShort')
            : ''
        ">
        <template #label>
          <span>{{ $t("Password") }}</span>
        </template>
      </base-input>
      <button class="profile-page__button">
        {{ $t("Save") }}
      </button>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "vue";
import { ActionType } from "@/store/modules/User/ActionType";
import { store } from "@/store";
import BaseInput from "@/components/BaseInput.vue";
import { User } from "@/types/User";

export default defineComponent({
  name: "ProfilePage",
  components: {
    BaseInput,
  },
  setup() {
    const user: { value: User } = ref({ account: {}, general: {} });
    const nickname: { value: string | undefined } = ref("");
    const domain: { value: string | undefined } = ref("");
    const email: { value: string | undefined } = ref("");
    const password = ref("");

    onBeforeMount(async () => {
      await store.dispatch(ActionType.GET_PROFILE);
      user.value = { ...store.state.user.user };
      nickname.value = user.value.account.nickname;
      email.value = user.value.account.email;
      domain.value = user.value.general.domain;
    });

    const onSubmit = () => {
      let query = {};
      if (password.value.length > 5) {
        query = {
          nickname: nickname.value,
          email: email.value,
          password: password.value.length > 5 ? password.value : "",
        };
      } else {
        query = {
          nickname: nickname.value,
          email: email.value,
        };
      }
      store.dispatch(ActionType.SET_PROFILE, {
        account: query,
        general: {
          name: user.value.general.name,
          closed: user.value.general.closed,
          domain: domain.value,
        },
      });
      password.value = "";
    };
    return {
      user,
      onSubmit,
      password,
      nickname,
      email,
    };
  },
});
</script>

<style lang="scss">
.profile-page {
  padding: 50px;
  width: 100%;
  &__title {
    text-align: center;
    margin-bottom: 30px;
  }
  &__form {
    margin: 0 auto;
    width: 400px;
  }
  &__button {
    background: #8a2be2;
    color: #fff;
    width: 150px;
    height: 40px;
    border-radius: 5px;
    outline: none;
    transition: background 0.3s;
    margin: 0 auto;
    display: block;
    &:hover {
      background: #943ee4;
    }
  }
}
</style>
