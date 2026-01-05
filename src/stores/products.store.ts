import { defineStore } from 'pinia'
import { Product } from '@/types/commerce'
import { mockProducts } from '@/mocks/products'

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [...mockProducts] as Product[],
    selectedProduct: null as Product | null,
    loading: false,
  }),

  getters: {
    // All products
    allProducts: (state) => state.products,

    // Active products only
    activeProducts: (state) => 
      state.products.filter(p => p.isActive),

    // Low stock products (stock < 10)
    lowStockProducts: (state) =>
      state.products.filter(p => 
        p.stockQuantity !== undefined && p.stockQuantity < 10
      ),

    // Out of stock products
    outOfStockProducts: (state) =>
      state.products.filter(p => 
        p.stockQuantity !== undefined && p.stockQuantity === 0
      ),

    // Get product by ID
    getProductById: (state) => (id: string) =>
      state.products.find(p => p.id === id),

    // Get product by code
    getProductByCode: (state) => (code: string) =>
      state.products.find(p => p.code === code),
  },

  actions: {
    // Add product
    addProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
      const newProduct: Product = {
        ...product,
        id: `p${this.products.length + 1}`,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      this.products.unshift(newProduct)
      return newProduct
    },

    // Update product
    updateProduct(id: string, updates: Partial<Product>) {
      const product = this.products.find(p => p.id === id)
      if (product) {
        Object.assign(product, updates, { updatedAt: new Date() })
      }
    },

    // Toggle product active status
    toggleActive(id: string) {
      const product = this.products.find(p => p.id === id)
      if (product) {
        product.isActive = !product.isActive
        product.updatedAt = new Date()
      }
    },

    // Update stock
    updateStock(id: string, quantity: number) {
      const product = this.products.find(p => p.id === id)
      if (product) {
        product.stockQuantity = quantity
        product.updatedAt = new Date()
      }
    },

    // Deduct stock (when order is confirmed)
    deductStock(id: string, quantity: number) {
      const product = this.products.find(p => p.id === id)
      if (product && product.stockQuantity !== undefined) {
        product.stockQuantity = Math.max(0, product.stockQuantity - quantity)
        product.updatedAt = new Date()
      }
    },

    // Select product
    selectProduct(product: Product) {
      this.selectedProduct = product
    },

    // Simulate fetching products
    async fetchProducts() {
      this.loading = true
      await new Promise(resolve => setTimeout(resolve, 300))
      this.loading = false
    }
  }
})
