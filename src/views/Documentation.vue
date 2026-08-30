<template>
  <div class="pt-32 pb-20 bg-gray-50 min-h-screen">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Header -->
      <div class="text-center mb-16">
        <h1 class="text-4xl font-black text-zinc-900 tracking-tight mb-4">Dokumentasi Acara</h1>
        <p class="text-lg text-gray-500 font-medium max-w-2xl mx-auto">
          Galeri momen tak terlupakan dari berbagai event yang didukung oleh Ghoenk Production. Dari panggung megah hingga tata cahaya spektakuler.
        </p>
      </div>

      <!-- Filter Buttons (Optional, but adds a premium feel) -->
      <div class="flex flex-wrap justify-center gap-3 mb-12">
        <button 
          v-for="filter in filters" 
          :key="filter"
          @click="activeFilter = filter"
          :class="[
            'px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm',
            activeFilter === filter 
              ? 'bg-zinc-900 text-yellow-400 border border-zinc-900' 
              : 'bg-white text-gray-600 border border-gray-200 hover:border-cyan-400 hover:text-cyan-600'
          ]"
        >
          {{ filter }}
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <svg class="animate-spin h-10 w-10 text-cyan-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-xl font-bold text-zinc-700">Memuat Dokumentasi...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredGallery.length === 0" class="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p class="text-xl font-bold text-zinc-700">Dokumentasi tidak ditemukan.</p>
        <p class="text-gray-500 mt-2">Coba pilih kategori filter yang lain.</p>
      </div>

      <!-- Gallery Grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <div v-for="item in filteredGallery" :key="item.id" class="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-cyan-200 transition-all duration-300 group flex flex-col cursor-pointer">
          
          <!-- Media Container -->
          <div class="relative h-64 overflow-hidden bg-zinc-100">
            <!-- Video Icon Overlay if it's a video -->
            <div v-if="item.type === 'video'" class="absolute inset-0 z-10 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
              <div class="w-14 h-14 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-zinc-900 shadow-lg transform group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            
            <!-- Type Badge -->
            <div class="absolute top-4 left-4 z-20">
              <span class="bg-zinc-900/80 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
                <svg v-if="item.type === 'video'" xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" />
                </svg>
                {{ item.type === 'video' ? 'Video' : 'Foto' }}
              </span>
            </div>

            <!-- Image/Thumbnail -->
            <img :src="item.thumbnail" :alt="item.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
          </div>
          
          <!-- Content -->
          <div class="p-6 flex-1 flex flex-col">
            <h3 class="text-xl font-bold text-zinc-900 mb-2 group-hover:text-cyan-600 transition-colors">{{ item.title }}</h3>
            <p class="text-sm text-gray-500 font-medium leading-relaxed mb-4">{{ item.description }}</p>
            
            <div class="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider">
              <span>{{ item.category }}</span>
              <span>{{ item.date }}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../lib/supabase'

const loading = ref(true)
const activeFilter = ref('Semua')
const galleryItems = ref([])

// Compute filters based on unique categories in galleryItems
const filters = computed(() => {
  const cats = galleryItems.value.map(item => item.category).filter(Boolean)
  const uniqueCats = [...new Set(cats)]
  return ['Semua', ...uniqueCats]
})

const fetchDocs = async () => {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('documentations')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    galleryItems.value = data
  } catch (error) {
    console.error('Error fetching documentations:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchDocs()
})

const filteredGallery = computed(() => {
  if (activeFilter.value === 'Semua') {
    return galleryItems.value
  }
  return galleryItems.value.filter(item => item.category === activeFilter.value)
})
</script>
