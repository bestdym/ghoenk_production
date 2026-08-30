<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '../stores/cart'
import { supabase } from '../lib/supabase'

const cartStore = useCartStore()

const products = ref([])
const loading = ref(true)
const searchQuery = ref('')
const activeCategory = ref('All')

// Compute categories based on unique values in products data
const categories = computed(() => {
  const cats = products.value.map(p => p.category).filter(Boolean)
  const uniqueCats = [...new Set(cats)]
  return ['All', ...uniqueCats]
})

const fetchProducts = async () => {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('catalogs')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    products.value = data
  } catch (error) {
    console.error('Error fetching catalogs:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProducts()
})

// DRAG TO SCROLL LOGIC
const scrollContainer = ref(null)
let isDown = false
let startX
let scrollLeft

const onMouseDown = (e) => {
  isDown = true
  startX = e.pageX - scrollContainer.value.offsetLeft
  scrollLeft = scrollContainer.value.scrollLeft
}

const onMouseLeave = () => {
  isDown = false
}

const onMouseUp = () => {
  isDown = false
}

const onMouseMove = (e) => {
  if (!isDown) return
  e.preventDefault()
  const x = e.pageX - scrollContainer.value.offsetLeft
  const walk = (x - startX) * 2 // Scroll speed multiplier
  scrollContainer.value.scrollLeft = scrollLeft - walk
}

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchCategory = activeCategory.value === 'All' || product.category === activeCategory.value
    const matchSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchCategory && matchSearch
  })
})

const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number)
}
</script>

<template>
  <div class="pt-24 pb-20 bg-gray-50 min-h-screen">
    <!-- CATALOG GRID -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-12 text-center">
        <h2 class="text-4xl font-black text-slate-900 tracking-tight">
          Katalog Alat
        </h2>
        <p class="text-slate-500 mt-4 text-lg font-medium">Pilih peralatan yang Anda butuhkan untuk proyek selanjutnya.</p>
      </div>
      
      <!-- Filters and Search -->
      <div class="flex flex-col md:flex-row gap-4 mb-10 max-w-4xl mx-auto">
        <!-- Search Bar -->
        <div class="relative flex-1">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input v-model="searchQuery" type="text" placeholder="Cari nama alat..." class="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-full focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-zinc-900 font-medium shadow-sm">
        </div>

        <!-- Category Dropdown -->
        <div class="relative w-full md:w-64 shrink-0">
          <select 
            v-model="activeCategory"
            class="w-full appearance-none bg-white border border-gray-200 rounded-full pl-6 pr-10 py-3.5 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-zinc-900 font-medium shadow-sm cursor-pointer"
          >
            <option v-for="cat in categories" :key="cat" :value="cat">
              Kategori: {{ cat === 'All' ? 'Semua' : cat }}
            </option>
          </select>
          <div class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <div v-if="loading" class="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <svg class="animate-spin h-10 w-10 text-cyan-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-xl font-bold text-zinc-700">Memuat Katalog...</p>
      </div>

      <div v-else-if="filteredProducts.length === 0" class="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-xl font-bold text-zinc-700">Alat tidak ditemukan.</p>
        <p class="text-gray-500 mt-2">Coba ubah kata kunci pencarian atau filter kategori Anda.</p>
      </div>
      
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="product in filteredProducts" :key="product.id" class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col">
          <div class="relative h-64 overflow-hidden bg-gray-100">
            <img :src="product.image_url" :alt="product.name" class="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500 pointer-events-none">
            <div v-if="product.badge" class="absolute top-4 right-4 bg-yellow-400 border border-yellow-500 text-zinc-900 text-xs font-black px-3 py-1 rounded shadow-sm">
              {{ product.badge }}
            </div>
          </div>
          <div class="p-6 flex-1 flex flex-col">
            <h3 class="text-xl font-bold text-zinc-900 mb-2">{{ product.name }}</h3>
            <p v-if="product.description" class="text-sm text-gray-500 font-medium leading-relaxed mb-4 line-clamp-3">{{ product.description }}</p>
            <div class="flex items-end justify-between mt-auto pt-4 border-t border-gray-50">
              <div>
                <p class="text-sm font-medium text-gray-500 mb-1">Harga per Hari</p>
                <p class="text-2xl font-black text-zinc-900">{{ formatRupiah(product.price_per_day).split(',')[0] }}</p>
              </div>
              <button @click="cartStore.addToCart(product)" class="bg-zinc-900 hover:bg-zinc-800 text-yellow-400 w-12 h-12 rounded-lg flex items-center justify-center transition-all shadow-sm transform active:scale-95">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
