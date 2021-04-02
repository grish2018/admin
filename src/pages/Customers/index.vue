<template>
  <div class="customers">
    <table>
      <tr class="customers__table-header">
        <th />
        <th>{{ $t("Nickname") }}</th>
        <th>{{ $t("Email") }}</th>
        <th />
      </tr>
      <tr
        v-for="customer in customers"
        :key="customer.token"
        class="customers__table-row">
        <td class="customers__table-check">
          <input
            type="checkbox"
            @change="addItem($event, customer.id)">
        </td>
        <td class="customers__table-name">
          {{ customer.nickname ? customer.nickname : "" }}
        </td>
        <td class="customers__table-email">
          {{ customer.email }}
        </td>
        <td class="customers__table-delete">
          <button
            class="customers__delete-button"
            @click="deleteCustomer(customer.id)">
            <svg-icon name="delete" />
          </button>
        </td>
      </tr>
    </table>
    <button
      class="customers__delete-all-button"
      @click="deleteCheckedCustomers">
      {{ $t("DeleteChecked") }}
    </button>
  </div>
</template>

<script lang="ts">
import SvgIcon from "@/components/UI/SvgIcon.vue";
import { useStore } from "@/store";
import { ActionType } from "@/store/modules/Customers/ActionType";
import { computed, defineComponent, onBeforeMount, ref } from "vue";
export default defineComponent({
  name: "CustomersPage",
  components: { SvgIcon },
  setup() {
    const store = useStore();
    onBeforeMount(() => {
      store.dispatch(ActionType.GET_CUSTOMERS);
    });

    const customers = computed(() => store.state.customers.customers);

    const checkedCustomers: { value: number[] } = ref([]);
    const addItem = ({ target }: { target: HTMLInputElement }, id: number) => {
      if (target.checked) {
        checkedCustomers.value.push(id);
      } else {
        checkedCustomers.value = checkedCustomers.value.filter(
          (item) => item !== id
        );
      }
    };

    const deleteCustomer = async (token: string) => {
      await store.dispatch(ActionType.DELETE_CUSTOMER, token);
      await store.dispatch(ActionType.GET_CUSTOMERS);
    };

    const deleteCheckedCustomers = async () => {
      await store.dispatch(
        ActionType.DELETE_CHECKED_CUSTOMERS,
        checkedCustomers.value
      );
      await store.dispatch(ActionType.GET_CUSTOMERS);
    };
    return { customers, addItem, deleteCustomer, deleteCheckedCustomers };
  },
});
</script>

<style lang="scss" scoped>
.customers {
  width: 100%;
  display: flex;
  flex-direction: column;
  & table {
    width: 100%;
    border-spacing: 0 10px;
  }
  &__table-row {
    background: white;
    height: 50px;
  }
  &__table-header {
  }
  &__table-check {
    padding-left: 10px;
  }
  &__table-name {
    text-align: center;
  }
  &__table-email {
    text-align: center;
  }
  &__table-delete {
    text-align: right;
    padding-right: 10px;
  }
  &__delete-button {
    height: 30px;
    padding: 0px 8px;
    border-radius: 5px;
    background: red;
    outline: none;
    color: white;
    & svg {
      width: 24px;
      vertical-align: middle;
      height: 19px;
    }
  }
  &__delete-all-button {
    width: fit-content;
    height: 30px;
    padding: 0px 8px;
    border-radius: 5px;
    background: red;
    outline: none;
    color: white;
    align-self: flex-end;
    margin-right: 10px;
    margin-bottom: 20px;
  }
}
</style>
