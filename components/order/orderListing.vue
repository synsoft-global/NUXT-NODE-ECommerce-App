<script lang="ts" setup>
// Columns
import EditOrderModal from './EditOrderModal.vue';
import { OrderColumns } from '~/constants/columns';
const selectedColumns = ref([...OrderColumns]);
const columnsTable = computed(() => selectedColumns.value);

// Selected Rows
const selectedRows = ref<any>([])

function select (row:any) {
  const index = selectedRows.value.findIndex((item:any) => item.id == row.id)
  if (index == -1) {
    selectedRows.value.push(row)
  } else {
    selectedRows.value.splice(index, 1)
  }
}

// variable with ref
const search = ref('')
const editOrderModal = ref(false)
const editOrderData = ref<any>()

async function edit(row:any) {
  editOrderData.value = row
  editOrderModal.value = true 
}
async function closeModal(val:any) {
  editOrderModal.value = val
}
async function deleteOrder(row:any) {
  try {
    if(row._id){
      await $fetch('/api/order/delete', {
          method: 'POST',
          body: {
            id: row._id
          }
        })
      refreshNuxtData('orders')
    }
  } catch (error) {
    console.log(error,"error");
  }
}

// Pagination
const sort = ref({ column: 'id', direction: 'asc' as const })
const page = ref(1)
const pageCount = ref(20)
// Data
const { data: orders, pending } = await useLazyAsyncData('orders', () => ($fetch as any)(`/api/order`, {
  query: {
    q: search.value,
    'page': page.value,
    'limit': pageCount.value,
    'sort': sort.value.column,
    'order': sort.value.direction
  }
}), {
  default: () => [],
  watch: [page, search, pageCount, sort]
})
</script>

<template>
  <div>
    <UCard
      class="w-full"
      :ui="{
        base: '',
        ring: '',
        divide: 'divide-y divide-gray-200 dark:divide-gray-700',
        header: { padding: 'px-4 py-5' },
        body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700' },
        footer: { padding: 'p-4' }
      }"
    >
      <!-- Filters -->
      <div class="flex items-center justify-between gap-3 px-4 py-3">
        <UInput
          v-model="search"
          icon="i-heroicons-magnifying-glass-20-solid"
          placeholder="Search..."
        />
      </div>
  
      <!-- Table -->
      <UTable
        v-model="selectedRows" 
        v-model:sort="sort"
        :rows="orders.data"
        :columns="columnsTable"
        :loading="pending"
        sort-asc-icon="i-heroicons-arrow-up"
        sort-desc-icon="i-heroicons-arrow-down"
        sort-mode="manual"
        class="w-full"
        :ui="{ td: { base: 'max-w-[0] truncate' } }"
        @select="select"
      >
        <template #name-data="{ row }">
          <span :class="[selectedRows.find((item:any) => item._id == row._id) && 'text-primary-500 dark:text-primary-400']">{{ row.name }}</span>
        </template>
  
        <template #actions-data="{ row }">
          <UPopover mode="hover">
            <UButton
              color="gray"
              variant="ghost"
              trailing-icon="i-heroicons-ellipsis-horizontal-20-solid"
            />
  
            <template #panel>
              <div class="d-flex flex-column">
                <div>
                  <UButton
                    color="gray"
                    variant="ghost"
                    icon="i-heroicons-pencil-square-20-solid"
                    @click="edit(row)"
                  >
                    Edit
                  </UButton>
                </div>
                <div>
                  <UButton
                    color="gray"
                    variant="ghost"
                    icon="i-heroicons-trash-20-solid"
                    @click="deleteOrder(row)"
                  >
                    Delete
                  </UButton>
                </div>
              </div>
            </template>
          </UPopover>
        </template>
      </UTable>
  
      <!-- Number of rows & Pagination -->
      <template #footer>
        <div class="flex flex-wrap justify-between items-center">
          <div class="flex items-center gap-1.5">
            <span class="text-sm leading-5">Rows per page:</span>
        
            <USelect
              v-model="pageCount"
              :options="[3, 5, 10, 20, 30, 40]"
              class="me-2 w-20"
              size="xs"
            />
          </div>
  
          <UPagination
            v-model="page"
            :page-count="pageCount"
            :total="orders && orders?.data && orders?.data.length"
            :ui="{
              wrapper: 'flex items-center gap-1',
              rounded: '!rounded-full min-w-[32px] justify-center',
              default: {
                activeButton: {
                  variant: 'outline'
                }
              }
            }"
          />
        </div>
      </template>
    </UCard>
    <!-- Edit order model -->
    <div v-if="editOrderModal">
      <EditOrderModal
        :data="editOrderData"
        :val="editOrderModal"
        @close-modal="closeModal"
      />
    </div>
  </div>
</template>