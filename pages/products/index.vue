<script lang="ts" setup>
definePageMeta({
  middleware: 'auth'
})
import DatePicker from '~/components/common/DatePicker.vue';

const { t } = useI18n()

const range = ref({ start: new Date(2020, 0, 6), end: new Date() })
const summary = ref<any>([
  {
    title: t("common.totalProducts"),
    img: 'assets/img/icon/Total_Products.svg',
    value: 178,
    key: "viewProduct",
  },
  {
    title: t("common.totalQtySold"),
    img: 'assets/img/icon/bage_qty.svg',
    value: 18,
    key: "viewQuantitySold",
  },
  {
    title: t("common.totalPaidOrder"),
    img: 'assets/img/icon/Total_Paid_Order.svg',
    value: 20,
    key: "viewTotalPaid",
  },
])

const date = ref(new Date())


</script>

<template>
  <UContainer class="py-7 px-5">
    <div class="flex gap-5 justify-between md:flex-row flex-col">
      <h2 class="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
        {{ $t('menu.products') }}
      </h2>
      <div class="flex gap-5 flex-wrap">
        <div>
          <DatePicker
            v-model:range="range"
            :is-range="true"
          />
        </div>
        <div>
          <NuxtLink to="products/new">
            <UButton
              icon="i-heroicons-plus-circle-solid"
              :label="$t('menu.createProduct')"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
    <!-- <PortletBase :data="summary" /> -->
    <ProductListing />
    <UNotifications />
  </UContainer>
</template>