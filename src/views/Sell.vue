<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../lib/supabase'

const items = ref([])
const loading = ref(true)
const searchQuery = ref('')
const activeCategory = ref('All')

// Compute categories based on unique values in items data
const categories = computed(() => {
  const cats = items.value.map(p => p.category).filter(Boolean)
  const uniqueCats = [...new Set(cats)]
  return ['All', ...uniqueCats]
})

const fetchItems = async () => {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('sell_items')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    items.value = data
  } catch (error) {
    console.error('Error fetching sell items:', error)
  } finally {
    loading.value = false
  }
}

const appSettings = ref({
  whatsapp_number: '6281234567890'
})

const fetchSettings = async () => {
  const { data } = await supabase.from('settings').select('*')
  if (data) {
    const wa = data.find(s => s.setting_key === 'whatsapp_number')
    if (wa) appSettings.value.whatsapp_number = wa.setting_value
  }
}

onMounted(() => {
  fetchItems()
  fetchSettings()
})

const filteredItems = computed(() => {
  return items.value.filter(item => {
    const matchCategory = activeCategory.value === 'All' || item.category === activeCategory.value
    const matchSearch = item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchCategory && matchSearch
  })
})

const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number)
}

const contactAdmin = async (item) => {
  // Ambil nomor terbaru langsung dari database
  const { data } = await supabase.from('settings').select('*')
  if (data) {
    const wa = data.find(s => s.setting_key === 'whatsapp_number')
    if (wa) appSettings.value.whatsapp_number = wa.setting_value
  }

  const message = `Halo Admin Ghoenk Production, saya tertarik dengan barang "${item.name}" yang dijual seharga ${formatRupiah(item.price)}.`
  const whatsappUrl = `https://wa.me/${appSettings.value.whatsapp_number}?text=${encodeURIComponent(message)}`
  window.open(whatsappUrl, '_blank')
}
</script>

<template>
  <div class="pt-24 pb-20 bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-12 text-center">
        <h2 class="text-4xl font-black text-slate-900 tracking-tight">
          Jual Beli Alat
        </h2>
        <p class="text-slate-500 mt-4 text-lg font-medium">Temukan peralatan produksi baru dan bekas berkualitas dengan harga terbaik.</p>
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
          <input v-model="searchQuery" type="text" placeholder="Cari nama barang..." class="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-full focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-zinc-900 font-medium shadow-sm">
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

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <svg class="animate-spin h-10 w-10 text-cyan-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-xl font-bold text-zinc-700">Memuat Barang...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredItems.length === 0" class="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <p class="text-xl font-bold text-zinc-700">Barang tidak ditemukan.</p>
        <p class="text-gray-500 mt-2">Coba ubah kata kunci pencarian atau filter kategori Anda.</p>
      </div>
      
      <!-- Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="item in filteredItems" :key="item.id" class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col">
          <div class="relative h-64 overflow-hidden bg-gray-100 shrink-0">
            <img :src="item.image_url" :alt="item.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none">
            
            <div class="absolute top-4 right-4 flex flex-col gap-2 items-end">
              <div v-if="item.badge" class="bg-yellow-400 border border-yellow-500 text-zinc-900 text-xs font-black px-3 py-1 rounded shadow-sm">
                {{ item.badge }}
              </div>
              <div class="bg-zinc-900 text-white text-xs font-bold px-3 py-1 rounded shadow-sm">
                {{ item.condition }}
              </div>
            </div>
          </div>
          <div class="p-6 flex-1 flex flex-col">
            <h3 class="text-xl font-bold text-zinc-900 mb-2">{{ item.name }}</h3>
            <p v-if="item.description" class="text-sm text-gray-500 font-medium leading-relaxed mb-4 line-clamp-3">{{ item.description }}</p>
            
            <div class="mt-auto pt-4 border-t border-gray-50">
              <p class="text-sm font-medium text-gray-500 mb-1">Harga Jual</p>
              <div class="flex items-end justify-between">
                <p class="text-2xl font-black text-zinc-900">{{ formatRupiah(item.price).split(',')[0] }}</p>
                <button @click="contactAdmin(item)" class="bg-green-500 hover:bg-green-600 text-white p-2.5 rounded-lg flex items-center justify-center transition-all shadow-sm transform active:scale-95" title="Hubungi via WhatsApp">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
