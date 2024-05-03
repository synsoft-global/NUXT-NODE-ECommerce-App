<template>
  <div>
    <!-- component -->
    <div class="sm:px-6 lg:px-8 py-7 px-5">
      <div class="flex justify-start items-start">
        <p class="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800 dark:text-white">
          {{ $t("menu.dashboard") }}
        </p>
      </div>
      <div class="custom-grid-container mt-4 gap-4">
        <!-- Loop through the stats and generate card sections -->
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="card section_card p-4 bg-white rounded-md w-full space-y-8 dark:bg-[#203551] dark:text-white"
        >
          <div class="card-body">
            <div class="card_wrapper">
              <div class="flex items-center gap-4 border-b border-blue-100 mb-4 pb-4">
                <img src="~/assets/img/icon/captcha-settings-icon.svg">
                <p class="text-[#203551] font-medium text-md dark:text-white">
                  {{ stat.label }} :
                </p>
                {{ stat.value }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <UNotifications />
  </div>
</template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  definePageMeta({
  middleware: 'auth'
})
  const stats = ref([
    { label: 'Total Products', value: 0 },
    { label: 'Total Orders', value: 0 },
    { label: 'Total Paid Orders', value: 0 },
    { label: 'Total Unpaid Orders', value: 0 }
  ]);
  
  const { data, pending, error, refresh } = await useAsyncData(
  'mountains',
  () => $fetch('/api/order/getStats')
)

watch(data, (newValue) => {
    if (newValue) {
        stats.value = [
        { label: 'Total Products', value: newValue.data.totalProducts },
        { label: 'Total Orders', value: newValue.data.totalOrder },
        { label: 'Total Paid Orders', value: newValue.data.totalPaid },
        { label: 'Total Unpaid Orders', value: newValue.data.totalUnPaid }
        ];
    }
},{immediate: true});
  </script>
  
  <style>
  .custom-grid-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
  </style>
  