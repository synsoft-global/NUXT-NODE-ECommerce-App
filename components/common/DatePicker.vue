<script setup lang="ts">

const props = defineProps({
    date: {
        type: Date,
        default: new Date()
    },
    range: {
        type: Object,
        default: () => ({ start: new Date(), end: new Date() })
    },
    disabledDates: {
        type: [Date],
        default: null
    },
    columns: {
        type: Number,
        default: 2
    },
    isRange: {
        type: Boolean,
        default: true
    }
})

const { disabledDates, date, range, columns, isRange } = props
const open = ref(false)
const localRange = ref(range)
const localDate = ref(date)

const label = computed(() => {
    if(isRange){ 
        return `${localRange.value.start.toLocaleDateString('en-us', { day: 'numeric' , month: 'short',  })} - ${localRange.value.end.toLocaleDateString('en-us', { day: 'numeric' , month: 'short',  })}`
    }
    else {
        return localDate.value.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })
    }
})

const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')

const attrs = [{
    key: 'today',
    highlight: {
        color: 'blue',
        fillMode: 'outline',
        class: '!bg-gray-100 dark:!bg-gray-800'
    },
}]

const handleOpenCalender = () =>{
    open.value = !open.value
}
const  emit  = defineEmits();

const handleApply = () => {
    if(isRange){
        emit('update:range',localRange.value);
    }
    else{
        emit('update:date',localDate);
    }
    open.value = false
};
const handleCancel = () => {
    if(isRange){
        localRange.value = props.range
    }
    else{
        localDate.value = props.date
    }
    open.value = false
};

</script>

<template>
  <UPopover
    :popper="{ placement: 'bottom-start' }"
    :open="open"
  >
    <span
      class="text-[#6c757d] bg-white dark:bg-[#353a53] dark:text-[#94a0ad] py-1 px-2 items-center flex gap-1" 
      @click="handleOpenCalender"
    >
      <UIcon name="i-heroicons-calendar-days-20-solid" />
      {{ label }}
      <UIcon name="i-heroicons-chevron-down-solid" />
    </span>

    <template #panel="{ close }">
      <template v-if="isRange">
        <VDatePicker 
          v-model.range="localRange" 
          :disabled-dates="disabledDates ? disabledDates : []" 
          :columns="columns"
          transparent 
          show-adjacent-months 
          borderless 
          :attributes="attrs" 
          :is-dark="isDark" 
          title-position="left"
          :first-day-of-week="1"
        >
          <template #footer>
            <div class="w-full flex gap-6 justify-end px-4 pb-3">
              <UButton
                class="px-5 py-2 rounded-md"
                @click="handleCancel"
              >
                Cancel
              </UButton>
              <UButton
                class="px-5 py-2 rounded-md"
                @click="handleApply"
              >
                Apply
              </UButton>
            </div>
          </template>
        </VDatePicker>
      </template>
      <template v-else>
        <VDatePicker 
          v-model="localDate" 
          :disabled-dates="disabledDates ? disabledDates : []"
          :columns="columns"
          transparent
          show-adjacent-months
          borderless
          :attributes="attrs"
          :is-dark="isDark"
          title-position="left"
          :first-day-of-week="1"
        >
          <template #footer>
            <div class="w-full flex gap-6 justify-end px-4 pb-3">
              <UButton
                class="px-5 py-2 rounded-md"
                @click="handleCancel"
              >
                Cancel
              </UButton>
              <UButton
                class="px-5 py-2 rounded-md"
                @click="handleApply"
              >
                Apply
              </UButton>
            </div>
          </template>
        </VDatePicker>
      </template>
    </template>
  </UPopover>
</template>
