<script setup lang="ts">
import categories from '~/constants/categories'

const props = defineProps(['value'])
const catOptions2 = ref<any>([])
const emit = defineEmits();

watch(() => props.value.category, (val) => {
    const findMainCat = categories.find(one => one.text == val)
    const payload = {...props.value}
    payload.category2 = "";
    if(findMainCat) catOptions2.value = findMainCat.sub
    emit('update:value', payload);
});

</script>

<template>
  <div class="mb-5">
    <label
      for="name"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      {{ $t("common.category") }}
    </label>
    <div class="flex gap-3">
      <USelectMenu 
        v-model="props.value.category"
        class="w-full"
        size="md" 
        :options="categories" 
        placeholder="Select category" 
        value-attribute="text"
        option-attribute="text"
      />
      <USelectMenu 
        v-if="catOptions2.length"
        v-model="props.value.category2"
        class="w-full"
        size="md" 
        :options="catOptions2" 
        placeholder="Select category" 
        value-attribute="text"
        option-attribute="text"
      />
    </div>
  </div>
</template>
