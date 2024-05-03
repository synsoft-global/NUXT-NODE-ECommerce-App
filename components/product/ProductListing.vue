<script lang="ts" setup>
// Columns
import EditProductModal from './EditProductModal.vue';
import { ProductColumns } from '~/constants/columns';
const selectedColumns = ref([...ProductColumns]);
const columnsTable = computed(() => selectedColumns.value);

// Selected Rows
const selectedRows = ref<any>([])

function select (row:any) {
  const index = selectedRows.value.findIndex((item:any) => item._id == row._id)
  if (index == -1) {
    selectedRows.value.push(row)
  } else {
    selectedRows.value.splice(index, 1)
  }
}

// variable with ref
const search = ref('')
const editModal = ref(false)
const updatedData = ref<any>()

// Pagination
const sort = ref({ column: 'id', direction: 'asc' as const })
const page = ref(1)
const pageCount = ref(20)

// Data
const { data: products, pending } = await useLazyAsyncData<{
  id: number
  title: string
  completed: string
}[]>('products', () => ($fetch as any)(`/api/product`, {
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

async function edit(row:any) {
  updatedData.value = row
  editModal.value = true 
}
async function closeModal(val:any) {
  editModal.value = val
}
async function deleteProduct(row:any) {
  try {
    if(row._id){
      await $fetch('/api/product/delete', {
          method: 'POST',
          body: {
            id: row._id
          }
        })
      refreshNuxtData('products')
    }
  } catch (error) {
    console.log(error,"error");
  }
}

</script>

<template>
  <div>
    <UCard
      class="w-full"
      :ui="{ base: '', ring: '', divide: 'divide-y divide-gray-200 dark:divide-gray-700', header: { padding: 'px-4 py-5' }, body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700' }, footer: { padding: 'p-4' } }"
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
        :rows="products.data"
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
                    @click="deleteProduct(row)"
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
        <div
          v-if="products?.data && products?.data.length > 0"
          class="flex flex-wrap justify-between items-center"
        >
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
            :total="products && products?.data && products?.data.length" 
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
    <div v-if="editModal">
      <EditProductModal
        :data="updatedData"
        :val="editModal"
        @close-modal="closeModal"
      />
    </div>
  </div>
</template>