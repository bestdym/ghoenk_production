<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../../lib/supabase'

const stats = ref({
  catalogs: 0,
  docs: 0,
  sells: 0
})

const loading = ref(true)

onMounted(async () => {
  try {
    const [catalogRes, docRes, sellRes] = await Promise.all([
      supabase.from('catalogs').select('*', { count: 'exact', head: true }),
      supabase.from('documentations').select('*', { count: 'exact', head: true }),
      supabase.from('sell_items').select('*', { count: 'exact', head: true })
    ])

    stats.value = {
      catalogs: catalogRes.count || 0,
      docs: docRes.count || 0,
      sells: sellRes.count || 0
    }
  } catch (error) {
    console.error('Error fetching stats:', error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <div class="mb-10">
      <h1 class="text-3xl font-black text-zinc-900 tracking-tight">Dashboard</h1>
      <p class="text-gray-500 mt-1 font-medium">Ringkasan data aplikasi Ghoenk Production.</p>
    </div>

    <div v-if="loading" class="text-gray-500 font-medium">Memuat data...</div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <!-- Katalog Card -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
        <div class="w-14 h-14 bg-cyan-50 text-cyan-500 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 class="text-4xl font-black text-zinc-900">{{ stats.catalogs }}</h3>
        <p class="text-sm font-bold text-gray-500 uppercase tracking-wider mt-2">Katalog Alat</p>
      </div>

      <!-- Dokumentasi Card -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
        <div class="w-14 h-14 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 class="text-4xl font-black text-zinc-900">{{ stats.docs }}</h3>
        <p class="text-sm font-bold text-gray-500 uppercase tracking-wider mt-2">Dokumentasi</p>
      </div>

      <!-- Jual Beli Card -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
        <div class="w-14 h-14 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 class="text-4xl font-black text-zinc-900">{{ stats.sells }}</h3>
        <p class="text-sm font-bold text-gray-500 uppercase tracking-wider mt-2">Barang Dijual</p>
      </div>

    </div>
  </div>
</template>
