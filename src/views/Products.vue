<template>
  <div>
    <!-- Header -->
    <div class="mb-6 d-flex justify-space-between align-center">
      <div>
        <h1 class="text-h4 font-weight-bold mb-2">{{ $t('products.title') }}</h1>
        <p class="text-subtitle-1 text-medium-emphasis">
          {{ products.length }} {{ $t('products.title').toLowerCase() }}
        </p>
      </div>
      <v-btn
        color="success"
        prepend-icon="mdi-plus"
        @click="openAddDialog"
      >
        {{ $t('products.addProduct') }}
      </v-btn>
    </div>

    <!-- Alerts for Low Stock -->
    <v-alert
      v-if="lowStockProducts.length > 0"
      type="warning"
      variant="tonal"
      class="mb-4"
    >
      {{ lowStockProducts.length }} {{ $t('products.lowStock') }}
    </v-alert>

    <!-- Search -->
    <v-card class="mb-4">
      <v-card-text>
        <v-text-field
          v-model="searchQuery"
          :label="$t('products.searchProducts')"
          prepend-inner-icon="mdi-magnify"
          clearable
          variant="outlined"
          density="compact"
          hide-details
        ></v-text-field>
      </v-card-text>
    </v-card>

    <!-- Products Table -->
    <v-card>
      <v-data-table
        :headers="headers"
        :items="filteredProducts"
        :search="searchQuery"
        item-value="id"
      >
        <!-- Product Name -->
        <template v-slot:item.name="{ item }">
          <div class="py-2">
            <p class="font-weight-bold">{{ item.name }}</p>
            <p class="text-caption text-medium-emphasis">{{ item.code }}</p>
          </div>
        </template>

        <!-- Price -->
        <template v-slot:item.price="{ item }">
          {{ formatCurrency(item.price) }}
        </template>

        <!-- Stock -->
        <template v-slot:item.stockQuantity="{ item }">
          <v-chip
            :color="getStockColor(item.stockQuantity)"
            size="small"
          >
            {{ item.stockQuantity !== undefined ? item.stockQuantity : 'N/A' }}
          </v-chip>
        </template>

        <!-- Status -->
        <template v-slot:item.isActive="{ item }">
          <v-switch
            v-model="item.isActive"
            color="success"
            hide-details
            @change="toggleActive(item.id)"
          ></v-switch>
        </template>

        <!-- Actions -->
        <template v-slot:item.actions="{ item }">
          <v-btn
            icon
            size="small"
            variant="text"
            @click="openEditDialog(item)"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <!-- Add/Edit Product Dialog -->
    <v-dialog
      v-model="showDialog"
      max-width="600"
    >
      <v-card>
        <v-card-title class="bg-primary">
          {{ isEditing ? $t('products.editProduct') : $t('products.addProduct') }}
        </v-card-title>

        <v-card-text class="pa-6">
          <v-form ref="form">
            <v-text-field
              v-model="formData.name"
              :label="$t('products.name')"
              variant="outlined"
              required
              class="mb-4"
            ></v-text-field>

            <v-text-field
              v-model="formData.code"
              :label="$t('products.code')"
              variant="outlined"
              required
              class="mb-4"
            ></v-text-field>

            <v-text-field
              v-model.number="formData.price"
              :label="$t('products.price')"
              variant="outlined"
              type="number"
              required
              prefix="MMK"
              class="mb-4"
            ></v-text-field>

            <v-text-field
              v-model.number="formData.stockQuantity"
              :label="$t('products.stockQuantity')"
              variant="outlined"
              type="number"
              hint="Leave empty if you don't want to track stock"
              persistent-hint
              class="mb-4"
            ></v-text-field>

            <v-switch
              v-model="formData.isActive"
              :label="formData.isActive ? $t('products.active') : $t('products.inactive')"
              color="success"
            ></v-switch>
          </v-form>
        </v-card-text>

        <v-card-actions class="pa-4">
          <v-spacer></v-spacer>
          <v-btn
            variant="text"
            @click="showDialog = false"
          >
            {{ $t('common.cancel') }}
          </v-btn>
          <v-btn
            color="success"
            @click="saveProduct"
          >
            {{ $t('common.save') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useProductsStore } from '@/stores/products.store'
import { Product } from '@/types/commerce'
import { useToast } from 'vue-toast-notification'

const { t } = useI18n()
const productsStore = useProductsStore()
const toast = useToast()

const searchQuery = ref('')
const showDialog = ref(false)
const isEditing = ref(false)
const editingId = ref<string | null>(null)

const formData = ref({
  name: '',
  code: '',
  price: 0,
  stockQuantity: undefined as number | undefined,
  isActive: true
})

const headers = computed(() => [
  { title: t('products.name'), key: 'name', sortable: true },
  { title: t('products.price'), key: 'price', sortable: true },
  { title: t('products.stock'), key: 'stockQuantity', sortable: true },
  { title: t('common.status'), key: 'isActive', sortable: false },
  { title: t('common.actions'), key: 'actions', sortable: false, align: 'end' as const }
])

const products = computed(() => productsStore.allProducts)
const lowStockProducts = computed(() => productsStore.lowStockProducts)

const filteredProducts = computed(() => {
  if (!searchQuery.value) return products.value
  
  const query = searchQuery.value.toLowerCase()
  return products.value.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.code.toLowerCase().includes(query)
  )
})

const getStockColor = (stock: number | undefined) => {
  if (stock === undefined) return 'grey'
  if (stock === 0) return 'error'
  if (stock < 10) return 'warning'
  return 'success'
}

const formatCurrency = (amount: number) => {
  return amount.toLocaleString('en-US') + ' MMK'
}

const resetForm = () => {
  formData.value = {
    name: '',
    code: '',
    price: 0,
    stockQuantity: undefined,
    isActive: true
  }
  isEditing.value = false
  editingId.value = null
}

const openAddDialog = () => {
  resetForm()
  showDialog.value = true
}

const openEditDialog = (product: Product) => {
  formData.value = {
    name: product.name,
    code: product.code,
    price: product.price,
    stockQuantity: product.stockQuantity,
    isActive: product.isActive
  }
  isEditing.value = true
  editingId.value = product.id
  showDialog.value = true
}

const saveProduct = () => {
  if (isEditing.value && editingId.value) {
    productsStore.updateProduct(editingId.value, formData.value)
    toast.success(t('toast.productUpdated'))
  } else {
    productsStore.addProduct(formData.value)
    toast.success(t('toast.productAdded'))
  }
  showDialog.value = false
  resetForm()
}

const toggleActive = (id: string) => {
  productsStore.toggleActive(id)
  toast.success(t('toast.productUpdated'))
}
</script>
