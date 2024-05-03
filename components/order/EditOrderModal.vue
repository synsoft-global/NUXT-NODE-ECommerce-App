<script setup lang="ts">
const props = defineProps(["data", "val"]);
const emit = defineEmits();
const payload: any = ref<any>({ ...props.data });
const isOpen = ref(props.val);
const toast = useToast()

// Emit the updated value on change
const updateOrder = async() => {
  try {
    if(payload){
      const update = await $fetch('/api/order/edit', {
          method: 'POST',
          body: payload.value
        })
      if(update.statusCode == 200){
        isOpen.value = false
        toast.add({ title: 'Order updated successfully!' })
        refreshNuxtData('orders')
      }
    }
  } catch (error) {
    console.log(error,"error");
  }};
watch(isOpen, (val) => {
  emit('closeModal', val);
}, { immediate: true });

</script>
<template>
  <UModal
    v-model="isOpen"
    prevent-close
  >
    <div class="flex items-center justify-between px-4 pt-2">
      <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
        Edit Order
      </h3>
      <UButton
        color="gray"
        variant="ghost"
        icon="i-heroicons-x-mark-20-solid"
        class="-my-1"
        @click="isOpen = false"
      />
    </div>
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800 text-center',
      }"
    >
      <!-- Products Dropdown -->
      <UFormGroup label="Selected Product">
        <UInput
          v-model="payload.productname"
          disabled
          type="text"
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
      <UFormGroup
        label="Payment Status"
        name="paymentStatus"
      >
        <UInput
          v-model="payload.paymentStatus"
          type="text"
        />
      </UFormGroup>
      <UFormGroup
        label="Tracking Number"
        name="trackingNumber"
      >
        <UInput
          v-model="payload.trackingNumber"
          type="text"
        />
      </UFormGroup>

      <!-- save and cancel button -->
      <div class="mt-2">
        <UButton
          class="px-5 py-2 rounded-md"
          @click="isOpen = false"
        >
          Cancel
        </UButton>
        <UButton
          class="px-5 py-2 rounded-md ml-2"
          @click="updateOrder"
        >
          Update
        </UButton>
      </div>
    </UCard>
  </UModal>
</template>
