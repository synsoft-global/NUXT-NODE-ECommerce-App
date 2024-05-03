<script setup lang="ts">
import { ref } from "vue";
const { t } = useI18n();
import type { FormError, FormSubmitEvent } from "#ui/types";
const toast = useToast()

definePageMeta({
  middleware: "auth",
  layout: false,
});
useHead({
  title: `Create Order | Nuxt App`,
});
const isOpen = ref(false)
const payload:any = ref<any>({
  name: '',
  price: 0,
  productname: '',
  address: '',
  productId: '',
  quantity: 1,
  shippingMethod: '',
  notes: ''
});

const validate = (payload: any): FormError[] => {
  const errors: any = [];
   // Validate Select Product
  if (!payload || !payload.productId) {
    errors.push({ path: "productId", message: "Please select a product" });
  }
  if (!payload || payload.name == '') errors.push({ path: "name", message: "Required" });
  if (!payload || payload.address == '') errors.push({ path: "address", message: "Required" });
  if (!payload || payload.quantity == 0) errors.push({ path: "quantity", message: "Required" });
  return errors;
};

const loading = ref(false)
// const selected = ref()
const selected = ref({})

watch(selected, (val) => {
  if(val){
    const data = JSON.parse(JSON.stringify(val))
    payload.value.productname = data.name
    payload.value.price = data.price
    payload.value.productId = data._id
  }
});
const handelQuit = () => {
  isOpen.value = true;
}
async function search (q: string) {
  loading.value = true
  const products = await $fetch<any[]>('/api/product', { params: { q } })
  loading.value = false  
  return products?.data
}
const handelConfirm = () => {
  navigateTo('/orders')
  isOpen.value = false;
}
const handelAbort = () => {
  isOpen.value = false;
}
async function onSubmit(event: FormSubmitEvent<any>) {
  const val = event.data
  if (val.productId == '' || val.name == '' || val.address == '' || val.quantity == 0) {
    return;
  }
  const data = {
    name: val.name,
    price: val.price,
    productname: val.productname,
    address: val.address,
    productId: val.productId,
    quantity: val.quantity,
    shippingMethod: val.shippingMethod,
    notes: val.notes,
  };
  const res = await $fetch("/api/order/create", {
    method: "post",
    body: data,
  });
  if (res.statusCode == 200) {
    isOpen.value = false;
    navigateTo("/orders");
    toast.add({ title: 'Order created successfully!' })

  }
}
const cancel = () => {
  navigateTo("/orders");
  isOpen.value = false;
};
</script>

<template>
  <div class="w-full max-w-screen-2xl m-auto">
    <header class="fixed top-0 w-full max-w-screen-2xl m-auto z-10">
      <div class="h-16 bg-blue-600 flex justify-between items-center">
        <img
          src="~/assets/images/e-commerce-high-resolution-logo.png"
          :class="`h-[35px] w-[150px] ml-3 cursor-pointer`"
          alt="Logo"
          @click="handelQuit"
        >
        <div />
        <UIcon
          name="i-heroicons-x-mark-solid"
          class="mr-3 bg-white cursor-pointer"
          @click="handelQuit"
        />
      </div>
    </header>
    <section class="relative w-full max-w-screen-2xl m-auto flex bg-blue-50">
      <div class="w-full min-h-full p-7 border-r border-[#bfcee0]">
        <div class="section_title mt-0 mb-7 add-new-product__header-title">
          <div
            class="text-2xl font-medium leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight"
          >
            {{ $t("common.createOrder") }}
          </div>
        </div>

        <UForm
          :validate="validate"
          :state="payload"
          class="space-y-4"
          @submit="onSubmit"
        >
          <!-- Products Dropdown -->
          <UFormGroup label="Select Product">
            <USelectMenu
              v-model="selected"
              :loading="loading"
              :searchable="search"
              placeholder="Search for a product..."
              option-attribute="name"
              by="id"
              :class="{ 'border-red-500': payload.productId == '' }"
            />
          </UFormGroup>

          <UFormGroup
            label="Price"
            name="price"
          >
            <UInput
              v-model="payload.price"
              disabled
              type="number"
            />
          </UFormGroup>

          <UFormGroup
            label="Name"
            name="name"
          >
            <UInput v-model="payload.name" />
          </UFormGroup>

          <UFormGroup
            label="Address"
            name="address"
          >
            <UInput
              v-model="payload.address"
              type="text"
            />
          </UFormGroup>

          <UFormGroup
            label="Quantity"
            name="quantity"
          >
            <UInput
              v-model="payload.quantity"
              type="number"
            />
          </UFormGroup>

          <UFormGroup
            label="Shipping Method"
            name="shippingMethod"
          >
            <UInput
              v-model="payload.shippingMethod"
              type="text"
            />
          </UFormGroup>

          <UFormGroup
            label="Notes"
            name="notes"
          >
            <UInput
              v-model="payload.notes"
              type="text"
            />
          </UFormGroup>
          
          <!-- save and cancel button -->
          <UButton
            class="px-5 py-2 rounded-md"
            @click="cancel"
          >
            Cancel
          </UButton>
          <UButton
            class="px-5 py-2 rounded-md ml-2"
            type="submit"
          >
            Save
          </UButton>
        </UForm>
      </div>
    </section>
    <UModal v-model="isOpen">
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800 text-center' }">
        <h3 class="text-md font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
          {{ $t('common.leave') }}
        </h3>
        <div class="w-full flex gap-6 justify-center px-4 pb-3 pt-5">
          <UButton
            class="px-5 py-2 rounded-md"
            @click="handelAbort"
          >
            Cancel
          </UButton>
          <UButton
            class="px-5 py-2 rounded-md"
            @click="handelConfirm"
          >
            Yes
          </UButton>
        </div>
      </UCard>
    </UModal>
    <UNotifications />
  </div>
</template>
