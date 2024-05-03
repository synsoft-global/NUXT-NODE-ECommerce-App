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
        const update = await $fetch('/api/product/edit', {
            method: 'POST',
            body: payload.value
            })
        if(update.statusCode == 200){
            isOpen.value = false
            toast.add({ title: 'Product updated successfully!' })
            refreshNuxtData('products')
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
        Edit Product
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
      <UFormGroup label="Product Name">
        <UInput
          v-model="payload.name"
          type="text"
        />
      </UFormGroup>

      <UFormGroup
        label="Price"
        name="price"
      >
        <UInput
          v-model="payload.price"
          type="number"
        />
      </UFormGroup>

      <UFormGroup
        label="Sale Price"
        name="priceCompare"
      >
        <UInput
          v-model="payload.priceCompare"
          type="number"
        />
      </UFormGroup>

      <UFormGroup
        label="Status"
        name="status"
      >
        <UInput v-model="payload.status" />
      </UFormGroup>

      <UFormGroup
        label="Type"
        name="type"
      >
        <UInput
          v-model="payload.type"
          type="text"
        />
      </UFormGroup>

      <UFormGroup
        label="SKU"
        name="SKU"
      >
        <UInput v-model="payload.SKU" />
      </UFormGroup>

      <UFormGroup
        label="Quantity Available"
        name="available"
      >
        <UInput
          v-model="payload.available"
          type="number"
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
