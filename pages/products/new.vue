<script setup lang="ts">
import InputPrice from '~/components/common/InputPrice.vue';
import CategoryInput from '~/components/common/CategoryInput.vue';
import draggableField from '~/components/common/draggableField.vue';
import SwitchGreenSelected from '~/components/common/SwitchGreenSelected.vue';
import productInit from '~/constants/productInit';
import formInit from '~/constants/formInit';
const { t } = useI18n();
const toast = useToast()

definePageMeta({
  middleware: 'auth',
  layout: false,
})
useHead({
  title: `Create product | Nuxt App`,
})
const isOpen = ref(false)
const isNewProduct = ref(true)
const enableProductOptions = ref(true)
const isProductOptionsEnable = ref("Enable")
const wholeSaleDataList = ref([{ count: "", price: "" }])
const payload = ref<any>({ ...productInit, ...formInit })

const statusOptions = [
  {
    label: t("common.draft"),
    value: "draft",
  },
  {
    label: t("common.active"),
    value: "active",
  },
];
const stockOptions = [
  {
    label: 'Out of Stock',
    value: "Out of Stock",
  },
  {
    label: 'In Stock',
    value: "In Stock",
  },
];
watch(() => enableProductOptions.value, (val) => {
  payload.value.enableProductOptions = val;
  payload.value.type = val ? "variable" : "simple";
  isProductOptionsEnable.value = val ? "Disable" : "Enable";
  if (val) {
    // payload.value.isBump = false;
    payload.value.enableSplitPrice = false;
  }
  if (!payload.value._id) {
    // it should only work in add new product
    let isPriceAdded = false;
    if (payload.value.enableProductOptions) {
      if (
        payload.value.variablePrices &&
        payload.value.variablePrices.length > 0
      ) {
        payload.value.variablePrices.map((val: any) => {
          if (val.price && val.price > 0) {
            isPriceAdded = true;
          }
        });
      }
    } else {
      if (payload.value.price && payload.value.price > 0) {
        isPriceAdded = true;
      }
    }
    payload.value.orderSummary = isPriceAdded;
  }
})

const handelQuit = () => {
  isOpen.value = true;
}
const handelConfirm = () => {
  navigateTo('/orders')
  isOpen.value = false;
}
const handelAbort = () => {
  isOpen.value = false;
}
const cancel = () => {
  navigateTo('/products')
}
const save = async () => {
  if(!payload.value.name){
    return;
  }
  const data = {
    name:payload.value.name,
    price:payload.value.price,
    priceCompare:payload.value.priceCompare,
    costPerItem:payload.value.costPerItem,
    formOption:payload.value.formOption,
    images:payload.value.images,
    url:payload.value.url,
    category:payload.value.category,
    category2:payload.value.category2,
    category3:payload.value.category3,
    status:payload.value.status,
  }
  const res = await $fetch('/api/product/save', {
      method: 'post',
      body: data
  })
  if(res.statusCode == 200){
    navigateTo('/products')
    toast.add({ title: 'Product created successfully!' })
  }
  isOpen.value = false;
}

const automaticFillUrl = () => {
  if (!payload.value.url)
    payload.value.url = payload.value.name
}
const updatedPrice = (val:any) => {
  payload.value.price = val  
}
const increaseValue = (type: string, index: number) => {
  if (type == "RegularPrice") {
    payload.value.price =
      +(payload.value.price ? payload.value.price : 0) + 1;
  } else if (type == 'SKU') {
    payload.value.SKU = parseInt(payload.value.SKU) + 1;
  } else if (type == "StockQty") {
    payload.value.available =
      +(payload.value.available ? payload.value.available : 0) + 1;
  } else if (type == "SalePrice") {
    payload.value.priceCompare =
      +(payload.value.priceCompare ? payload.value.priceCompare : 0) +
      1;
  } else if (type == "CostPerItem") {
    payload.value.costPerItem = payload.value.costPerItem + 1;
  } else if (type == "wholesaleQty") {
    payload.value.whosaleData[index].count = payload.value.whosaleData[index]
      .count
      ? payload.value.whosaleData[index].count
      : 0;
    payload.value.whosaleData[index].count =
      +(payload.value.whosaleData[index].count) + 1;
  } else if (type == "wholesalePrice") {
    payload.value.whosaleData[index].price = payload.value.whosaleData[index]
      .price
      ? payload.value.whosaleData[index].price
      : 0;
    payload.value.whosaleData[index].price =
      +(payload.value.whosaleData[index].price) + 1;
  } else if (type == "BumpPrice") {
    payload.value.bumpPrice =
      +(payload.value.bumpPrice ? payload.value.bumpPrice : 0) + 1;
  } else if (type == "BumpWeight") {
    payload.value.bumpWeight =
      +(payload.value.bumpWeight ? payload.value.bumpWeight : 0) + 1;
  } else if (type == "splitBitPrice") {
    payload.value.splitPriceData[index].bidPrice =
      +(payload.value.splitPriceData[index].bidPrice) + 1;
  } else if (type == "splitSalePrice") {
    payload.value.splitPriceData[index].salePrice =
      +(payload.value.splitPriceData[index].salePrice) + 1;
  }
}
const decreaseValue = (type: string, index: number) => {
  if (type == "RegularPrice" && payload.value.price > 0) {
    payload.value.price = parseInt(payload.value.price) - 1;
    // } else if(type == 'SKU' && payload.value.SKU > 0) {
    //   payload.value.SKU = parseInt(payload.value.SKU) - 1;
  } else if (type == "StockQty" && payload.value.available > 0) {
    payload.value.available = parseInt(payload.value.available) - 1;
  } else if (type == "SalePrice" && payload.value.priceCompare > 0) {
    payload.value.priceCompare = parseInt(payload.value.priceCompare) - 1;
  } else if (type == "CostPerItem" && payload.value.costPerItem > 0) {
    payload.value.costPerItem = parseInt(payload.value.costPerItem) - 1;
  } else if (
    type == "wholesaleQty" &&
    payload.value.whosaleData[index].count > 0
  ) {
    payload.value.whosaleData[index].count =
      parseInt(payload.value.whosaleData[index].count) - 1;
  } else if (
    type == "wholesalePrice" &&
    payload.value.whosaleData[index].price > 0
  ) {
    payload.value.whosaleData[index].price =
      parseInt(payload.value.whosaleData[index].price) - 1;
  } else if (type == "BumpPrice" && payload.value.bumpPrice > 0) {
    payload.value.bumpPrice = parseInt(payload.value.bumpPrice) - 1;
  } else if (type == "BumpWeight" && payload.value.bumpWeight > 0) {
    payload.value.bumpWeight = parseInt(payload.value.bumpWeight) - 1;
  } else if (
    type == "splitBitPrice" &&
    payload.value.splitPriceData[index].bidPrice > 0
  ) {
    payload.value.splitPriceData[index].bidPrice =
      parseInt(payload.value.splitPriceData[index].bidPrice) - 1;
  } else if (
    type == "splitSalePrice" &&
    payload.value.splitPriceData[index].salePrice > 0
  ) {
    payload.value.splitPriceData[index].salePrice =
      parseInt(payload.value.splitPriceData[index].salePrice) - 1;
  }
}
const addWhosaleData = () => {
  wholeSaleDataList.value.push({ count: "", price: "" });
  payload.value.whosaleData = payload.value.whosaleData.concat(
    JSON.parse(JSON.stringify(wholeSaleDataList.value))
  );
  wholeSaleDataList.value = [];
}
const removeWhosale = (num: number) => {
  payload.value.whosaleData.splice(num, 1);
}
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

    <section class="relative w-full max-w-screen-2xl m-auto mt-16 flex bg-blue-50">
      <div class="w-full min-h-full p-7 border-r border-[#bfcee0]">
        <div
          class="section_title mt-0 mb-7 add-new-product__header-title"
          :class="payload.formOption == 'single' && !isNewProduct ? 'add-new-product__header-title--with-action' : ''"
        >
          <div
            v-if="isNewProduct"
            class="text-2xl font-medium leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight"
          >
            {{ $t("common.productshipping") }}
          </div>
        </div>

        <div class="add-new-product-step1__container">
          <div class="add-new-product-step1__section-group">
            <!-- FORM OPTION SINGLE OR MULTIPLE FORMS -->
            <div
              v-if="isNewProduct"
              id="add-new-product-step1__type-form"
              class="flex flex-col gap-5"
            >
              <div class="add-new-product__card-container p-4 bg-white rounded-md">
                <div class="flex items-center gap-4 border-b border-blue-100 mb-4 pb-4">
                  <img src="~/assets/img/icon/formOption.svg">
                  <p class="text-[#203551] font-medium text-md">
                    {{ $t("common.formOption") }}
                  </p>
                </div>
                <div class="add-new-product-step1__type-form__content">
                  <SwitchGreenSelected
                    v-model:value="payload.formOption"
                    :options="[
                      { id: 'single', text: 'Single Form' },
                      { id: 'multiple', text: 'Multiple Forms' },
                    ]"
                    :full="true"
                    :class-name="'maxWidth'"
                  />
                  <div class="flex gap-4 items-center text-xs mt-2">
                    <p class="text-xs text-gray-400 dark:text-white w-full px-2">
                      {{ $t("product.createSingleForm") }}
                    </p>
                    <p class="text-xs text-gray-400 dark:text-white w-full px-2">
                      {{ $t("product.createMultiForm") }}
                    </p>
                  </div>
                </div>
              </div>
              <!-- IMAGES -->
              <div
                id="upload-product-images"
                class="card section_card p-4 bg-white rounded-md"
              >
                <div class="card-body">
                  <div class="card_wrapper">
                    <div class="flex items-center gap-4 border-b border-blue-100 mb-4 pb-4">
                      <img src="~/assets/img/icon/Images.svg">
                      <p class="text-[#203551] font-medium text-md">
                        {{ $t("common.images") }}
                      </p>
                    </div>
                    <div class="text-xs text-gray-400 dark:text-white mb-5">
                      {{ $t("common.Upload10") }}
                    </div>
                    <div
                      class="upload_wrapper w-100"
                      style="row-gap: 10px"
                    >
                      <draggableField
                        v-model:files="payload.images"
                        :max-allowed-files="10"
                      />
                    </div>
                    <div class="text-xs text-gray-400 dark:text-white mt-5">
                      {{ $t("common.YouCan") }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- OPTIONS -->
              <div
                id="add-new-product-step1__options"
                class="card section_card p-4 bg-white rounded-md"
              >
                <div class="card-body">
                  <div class="card_wrapper">
                    <div class="flex items-center gap-4 border-b border-blue-100 mb-4 pb-4">
                      <img src="~/assets/img/icon/Options.svg">
                      <p class="text-[#203551] font-medium text-md">
                        {{ $t("common.options") }}
                      </p>
                    </div>
                  </div>
                  <!-- Name -->
                  <div class="w-full">
                    <label class="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                      {{ $t("common.ProductName") }} &ensp;
                      <span class="text-xs text-gray-400 dark:text-white"> {{ $t("common.willAppear") }}</span>
                    </label>
                    <div class="">
                      <UFormGroup :error="!payload.name && 'You must enter a name'">
                        <template #default="{ error }">
                          <UInput
                            v-model="payload.name"
                            type="text"
                            :placeholder="$t('common.enterProductName')"
                            @blur="automaticFillUrl()"
                          />
                        </template>

                        <template #error="{ error }">
                          <span :class="[error ? 'text-red-500 dark:text-red-400' : 'text-primary-500 dark:text-primary-400']">
                            {{ error ? error : 'Your name is valid' }}
                          </span>
                        </template>
                      </UFormGroup>
                    </div>
                  </div>

                  <!-- URL -->
                  <div class="w-full my-5">
                    <label class="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                      {{ $t("common.url") }}
                    </label>
                    <div class="flex mt-1 border border-gray-300 dark:border-gray-700 rounded-lg">
                      <div
                        class="flex items-center justify-center bg-blue-50 w-10 h-auto border-r-gray-300
                            dark:border-r-gray-700 border-r rounded-s-lg"
                      >
                        <img src="~/assets/img/icon/tilted_line.png">
                      </div>
                      <UInput
                        v-model="payload.url"
                        type="text"
                        size="md"
                        class="text-sm block w-full"
                        variant="none"
                        placeholder="Enter page URL"
                      />
                    </div>
                  </div>

                  <div class="d-flex flex-column category-status gap-5">
                    <!-- Category -->
                    <div class="w-100">
                      <CategoryInput v-model:value="payload" />
                    </div>

                    <!-- Status -->
                    <div class="w-100">
                      <div class="input-label title-font flex items-center mb-3">
                        <div>
                          <label class="title-font sub-title">{{
                            $t("common.status")
                          }}</label>
                        </div>
                        <div class="h-[18px]">
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
                                <span class="">
                                  {{ $t("product.activeProductOrderMSG") }}<br>
                                  {{ $t("product.draftProductOrderMSG") }}</span>
                              </div>
                            </template>
                          </UPopover>
                        </div>
                      </div>
                      <USelectMenu
                        v-model="payload.status"
                        class="w-full"
                        size="md"
                        :options="statusOptions"
                        placeholder="Select status"
                        value-attribute="value"
                        option-attribute="label"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- PRICING -->
              <div
                id="add-new-product-step1__pricing"
                class="card section_card p-4 bg-white rounded-md"
              >
                <div class="card-body">
                  <div class="card_wrapper">
                    <div class="flex items-center gap-4 border-b border-blue-100 mb-4 pb-4">
                      <img src="~/assets/img/icon/Pricing.svg">
                      <p class="text-[#203551] font-medium text-md">
                        {{ $t("common.pricing") }}
                      </p>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-3">
                    <!-- Price and sale price -->
                    <div class="col-span-1">
                      <InputPrice
                        v-model:value="payload.price"
                        :label="$t('common.regularPrice')"
                        placeholder="0"
                        :increase-value="increaseValue"
                        :decrease-value="decreaseValue"
                        type="RegularPrice"
                        :icon-text="true"
                        @updated-price-data="updatedPrice"
                      />
                    </div>
                    <div class="col-span-1">
                      <InputPrice
                        v-model:value="payload.priceCompare"
                        :label="$t('common.salePrice')"
                        placeholder="0"
                        :increase-value="increaseValue"
                        :decrease-value="decreaseValue"
                        type="SalePrice"
                        :icon-text="true"
                      />
                    </div>
                    <div class="col-span-1">
                      <InputPrice
                        v-model:value="payload.costPerItem"
                        :label="$t('common.costPerItem')"
                        placeholder="0"
                        :icon="true"
                        :tooltip-text="$t('hint.wontSee')"
                        type="CostPerItem"
                        :increase-value="increaseValue"
                        :decrease-value="decreaseValue"
                        :icon-text="true"
                      />
                    </div>
                    <!-- Wholse sale price -->
                    <div
                      v-if="payload.whosale == false"
                      class="flex items-center text-primary dark:text-white col-span-2"
                    >
                      <span
                        class="flex items-center gap-2 cursor-pointer"
                        @click="() => (payload.whosale = true)"
                      >
                        <img
                          style="width: 20px"
                          src="~/assets/img/icon/bluePlus.svg"
                        >
                        {{ $t("text.AddWholesalePrices") }}
                      </span>
                    </div>
                    <div
                      v-else
                      class="flex items-center dark:text-white text-primary col-span-2"
                    >
                      <span
                        class="remove_wholeSaleData flex items-center gap-2 cursor-pointer"
                        @click="() => (payload.whosale = false)"
                      >
                        <img
                          style="width: 20px"
                          src="~/assets/img/icon/blueMinus.svg"
                        >
                        {{ $t("text.RemoveWholesalePrices") }}
                      </span>
                    </div>

                    <!-- Wholse sale price -->
                    <div
                      v-if="payload.whosale"
                      class="col-span-2"
                    >
                      <div class="flex w-full text-sm font-medium text-gray-900 dark:text-white">
                        <div class="w-1/2 pl-5">
                          Minimum Buy
                        </div>
                        <div class="w-1/2 pl-4">
                          Price to Be
                        </div>
                      </div>
                      <div
                        v-for="(data, i) in payload.whosaleData"
                        :key="i"
                        class="price-field-wrapper flex mb-3"
                      >
                        <img
                          src="~/assets/img/bigger-than-equal.svg"
                          alt="icon"
                        >
                        <InputPrice
                          v-model:value="payload.whosaleData[i]['count']"
                          placeholder="0"
                          type="wholesaleQty"
                          :index="i"
                          :increase-value="increaseValue"
                          :decrease-value="decreaseValue"
                        />
                        <img
                          src="~/assets/img/equal.svg"
                          alt="icon"
                        >
                        <InputPrice
                          v-model:value="payload.whosaleData[i]['price']"
                          placeholder="0"
                          type="wholesalePrice"
                          :index="i"
                          :icon-text="true"
                          :increase-value="increaseValue"
                          :decrease-value="decreaseValue"
                        />
                        <img
                          src="~/assets/img/close.svg"
                          alt=""
                          class="cursor-pointer"
                          @click="removeWhosale(i)"
                        >
                      </div>
                      <div class="flex items-center text-primary dark:text-white">
                        <span
                          class="flex items-center gap-2 cursor-pointer"
                          @click="addWhosaleData()"
                        >
                          <img
                            style="width: 20px"
                            src="~/assets/img/icon/bluePlus.svg"
                          >
                          {{ $t("text.AddWholesalePrices") }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- INVENTORY -->
              <div
                id="add-new-product-step1__iventory"
                class="card section_card p-4 bg-white rounded-md"
              >
                <div class="card-body">
                  <div class="card_wrapper">
                    <div class="flex items-center gap-4 border-b border-blue-100 mb-4 pb-4">
                      <img src="~/assets/img/icon/Inventory.svg">
                      <p class="text-[#203551] font-medium text-md">
                        {{ $t("common.inventory") }}
                      </p>
                    </div>
                  </div>
                  <div class="w-full">
                    <label class="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                      {{ $t("common.SKU") }} {{ $t("common.SKU2") }}
                    </label>
                    <div class="flex mt-1 border border-gray-300 dark:border-gray-700 rounded-lg">
                      <UInput
                        v-model="payload.SKU"
                        type="text"
                        size="md"
                        class="text-sm block w-full"
                        variant="none"
                      />
                    </div>
                  </div>
                  <div class="flex gap-4 mt-3">
                    <div class="track-quality">
                      <UCheckbox
                        v-model="payload.trackQuantity"
                        color="primary"
                        :label="$t('common.TrackQuantity')"
                      />
                    </div>
                    <div class="continue-selling">
                      <UCheckbox
                        v-model="payload.continueSelling"
                        color="primary"
                        :label="$t('common.ContinueStock')"
                        :disabled="!payload.trackQuantity"
                      />
                    </div>
                  </div>
                  <div
                    v-if="payload.trackQuantity"
                    class="parent-contentinventroy"
                  >
                    <div class="flex gap-4 mt-5 mb-0">
                      <div class="w-full">
                        <label class="text-sm font-medium text-gray-900 dark:text-white flex items-center">
                          {{ $t("common.stockStatus") }}
                        </label>
                        <USelectMenu
                          v-model="payload.stockStatus"
                          class="w-full mt-1"
                          size="md"
                          :options="stockOptions"
                          placeholder="Select status"
                          value-attribute="value"
                          option-attribute="label"
                        />
                      </div>
                      <div class="w-full">
                        <InputPrice
                          v-model:value="payload.available"
                          :label="$t('common.stockQuantity')"
                          placeholder="0"
                          :increase-value="increaseValue"
                          :decrease-value="decreaseValue"
                          type="StockQty"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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

    <!-- save and cancel button -->
    <div class="w-full flex gap-6 justify-end px-4 pb-3 pt-5">
      <UButton
        class="px-5 py-2 rounded-md"
        @click="cancel"
      >
        Cancel
      </UButton>
      <UButton
        class="px-5 py-2 rounded-md"
        @click="save"
      >
        Save
      </UButton>
    </div>
    <UNotifications />
  </div>
</template>


