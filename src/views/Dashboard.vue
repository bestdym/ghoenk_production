<template>
  <div class="pt-32 pb-16 px-4 max-w-7xl mx-auto">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-black text-white">ADMIN <span class="text-cyan-400">DASHBOARD</span></h1>
      <button @click="logout" class="bg-red-500/20 text-red-400 hover:bg-red-500/30 px-4 py-2 rounded-md font-bold transition-colors border border-red-500/50">
        Logout
      </button>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-slate-900 border border-slate-800 p-6 rounded-xl">
        <h3 class="text-gray-400 text-sm font-bold mb-2">Total Produk</h3>
        <p class="text-3xl font-black text-cyan-400">12</p>
      </div>
      <div class="bg-slate-900 border border-slate-800 p-6 rounded-xl">
        <h3 class="text-gray-400 text-sm font-bold mb-2">Total Kategori</h3>
        <p class="text-3xl font-black text-yellow-400">4</p>
      </div>
    </div>

    <div class="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      <div class="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
        <h2 class="text-xl font-bold text-white">Manajemen Alat</h2>
        <button class="bg-cyan-600 hover:bg-cyan-500 text-white px-3 py-1 rounded text-sm font-bold transition-colors">
          + Tambah Alat
        </button>
      </div>
      <div class="p-6 text-center text-gray-500">
        (Tabel Data Supabase akan dirender di sini)
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const logout = () => {
  // Placeholder logout
  router.push('/admin/login')
}
</script>
