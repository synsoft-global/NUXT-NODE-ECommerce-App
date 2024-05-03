<script setup lang="ts">

const props = defineProps(['value', 'label', 'placeholder', 'icon', 'tooltipText', 'type', 'increaseValue', 'decreaseValue', 'iconText', 'index'])
const { increaseValue, decreaseValue } = props;
const emit = defineEmits();

import { ref } from 'vue';
const priceValue = ref(props.value);


// Emit the updated value on change
const emitUpdatedPrice = (val: any) => {
  emit('updatedPriceData', val);
};

watch(priceValue, (val) => {
  emitUpdatedPrice(val);
}, { immediate: true });

</script>

<template>
  <div class="w-full">
    <label
      v-if="props.label"
      class="text-sm font-medium text-gray-900 dark:text-white flex items-center"
    >
      {{ props.label }}
      <div
        v-if="props.icon"
        class="h-[18px]"
      >
        <UPopover
          mode="hover"
          :popper="{ offsetDistance: 10, placement: 'top' }"
        >
          <img
            class="ml-1 pointer"
            src="~/assets/img/icon/Hint.svg"
          >
          <template #panel>
            <div class="p-3 bg-gray-600 text-white rounded-md max-w-sm">
              <span class="">{{ props.tooltipText }}</span>
            </div>
          </template>
        </UPopover>
      </div>
    </label>
    <div class="flex mt-1 border border-gray-300 dark:border-gray-700 rounded-lg">
      <div
        v-if="props.iconText"
        class="flex items-center justify-center bg-blue-50 w-10 h-auto border-r-gray-300
            dark:border-r-gray-700 border-r rounded-s-lg"
      >
        Rp
      </div>
      <UInput
        v-model="priceValue"
        type="text"
        size="md"
        class="text-sm block w-full"
        variant="none"
        :placeholder="props.placeholder"
      />
      <div class="h-auto py-[3px] px-3">
        <div
          class="flex items-center py-[5px] cursor-pointer"
          @click="props.index !== undefined && props.index !== null ? increaseValue(props.type, props.index) : increaseValue(props.type)"
        >
          <img
            src="~/assets/img/icon/input-uparrow.svg"
            alt=""
          >
        </div>
        <div
          class="flex items-center py-[5px] cursor-pointer"
          @click="props.index !== undefined && props.index !== null ? decreaseValue(props.type, props.index) : decreaseValue(props.type)"
        >
          <img
            src="~/assets/img/icon/input-downarrow.svg"
            alt=""
          >
        </div>
      </div>
    </div>
  </div>
</template>
