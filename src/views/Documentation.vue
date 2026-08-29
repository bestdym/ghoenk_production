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

      <!-- Gallery Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
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
import { ref, computed } from 'vue'

const filters = ['Semua', 'Panggung & Konser', 'Pernikahan', 'Acara Perusahaan']
const activeFilter = ref('Semua')

// Dummy data for documentation gallery
const galleryItems = ref([
  {
    id: 1,
    type: 'video',
    title: 'Konser Musik Kemerdekaan 2025',
    description: 'Dukungan penuh tata suara (Line Array) dan lighting spektakuler untuk panggung utama konser malam kemerdekaan.',
    category: 'Panggung & Konser',
    date: 'Agt 2025',
    thumbnail: 'https://placehold.co/800x600/e2e8f0/64748b?text=Konser+Kemerdekaan'
  },
  {
    id: 2,
    type: 'photo',
    title: 'Grand Wedding Reception',
    description: 'Instalasi rigging, lighting dekoratif, dan sound system elegan untuk acara pernikahan indoor berkapasitas 2000 tamu.',
    category: 'Pernikahan',
    date: 'Jul 2025',
    thumbnail: 'https://placehold.co/800x600/e2e8f0/64748b?text=Wedding+Reception'
  },
  {
    id: 3,
    type: 'photo',
    title: 'Gala Dinner Perusahaan',
    description: 'Set up panggung minimalis elegan dengan LED Screen dan sistem audio rapat tingkat tinggi.',
    category: 'Acara Perusahaan',
    date: 'Jun 2025',
    thumbnail: 'https://placehold.co/800x600/e2e8f0/64748b?text=Gala+Dinner'
  },
  {
    id: 4,
    type: 'video',
    title: 'Festival Budaya Daerah',
    description: 'Video kompilasi dari dukungan alat untuk pagelaran budaya luar ruangan selama 3 hari berturut-turut.',
    category: 'Panggung & Konser',
    date: 'Mei 2025',
    thumbnail: 'https://placehold.co/800x600/e2e8f0/64748b?text=Festival+Budaya'
  },
  {
    id: 5,
    type: 'photo',
    title: 'Peresmian Pabrik Baru',
    description: 'Penyewaan tenda sarnafil raksasa, genset backup, dan sound system untuk upacara peresmian oleh direksi.',
    category: 'Acara Perusahaan',
    date: 'Apr 2025',
    thumbnail: 'https://placehold.co/800x600/e2e8f0/64748b?text=Peresmian+Pabrik'
  },
  {
    id: 6,
    type: 'photo',
    title: 'Outdoor Wedding Party',
    description: 'Suasana romantis dengan fairy lights, sound system akustik, dan panggung custom untuk resepsi kebun.',
    category: 'Pernikahan',
    date: 'Mar 2025',
    thumbnail: 'https://placehold.co/800x600/e2e8f0/64748b?text=Outdoor+Wedding'
  }
])

const filteredGallery = computed(() => {
  if (activeFilter.value === 'Semua') {
    return galleryItems.value
  }
  return galleryItems.value.filter(item => item.category === activeFilter.value)
})
</script>
