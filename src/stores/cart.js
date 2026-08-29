import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  
  const isCartOpen = ref(false)
  const customerName = ref('')
  const customerEmail = ref('')
  const startDate = ref('')
  const endDate = ref('')
  const location = ref('')

  const cartItemCount = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const daysCount = computed(() => {
    if (!startDate.value || !endDate.value) return 1
    const start = new Date(startDate.value)
    const end = new Date(endDate.value)
    const diffTime = end - start
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 1 
  })

  const cartSubtotal = computed(() => {
    return items.value.reduce((total, item) => total + (item.price_per_day * item.quantity), 0)
  })

  const grandTotal = computed(() => {
    return cartSubtotal.value * daysCount.value
  })

  const addToCart = (product) => {
    const existingItem = items.value.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
  }

  const updateQuantity = (item, delta) => {
    const existing = items.value.find(i => i.id === item.id)
    if (existing) {
      existing.quantity += delta
      if (existing.quantity <= 0) {
        items.value = items.value.filter(i => i.id !== item.id)
      }
    }
  }
  
  const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value
  }

  return {
    items,
    isCartOpen,
    customerName,
    customerEmail,
    startDate,
    endDate,
    location,
    cartItemCount,
    daysCount,
    cartSubtotal,
    grandTotal,
    addToCart,
    updateQuantity,
    toggleCart
  }
})
