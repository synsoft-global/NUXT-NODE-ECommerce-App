<template>
  <div>
    <label
      :for="name"
      class="block mb-2 text-sm font-medium text-gray-900"
    >{{ label }}</label>
    <VeeField
      v-slot="{ field, meta, errors }"
      :name="name"
    >
      <input
        v-bind="field"
        :placeholder="placeholder"
        :type="type"
        :class="`rounded-lg sm:text-sm border block w-full p-2 ${meta.touched ? meta.valid ? 'bg-green-50 border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500' : 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-700 focus:ring-primary focus:border-primary'}`"
      >
      <VeeErrorMessage
        :name="name"
        as="p"
        class="mt-2 text-sm text-red-600"
      />
    </VeeField>
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  }
});
</script>
