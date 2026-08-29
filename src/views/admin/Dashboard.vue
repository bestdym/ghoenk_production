<template>
  <div class="min-h-screen bg-gray-50 flex">
    
    <!-- Sidebar -->
    <div class="w-64 bg-zinc-900 text-white flex flex-col hidden md:flex fixed h-full">
      <div class="p-6 border-b border-zinc-800">
        <h2 class="text-2xl font-black tracking-tight uppercase">Admin<span class="text-cyan-500">.</span></h2>
        <p class="text-xs text-gray-400 mt-1">{{ authStore.user?.email }}</p>
      </div>
      
      <nav class="flex-1 p-4 space-y-2">
        <router-link to="/admin/catalog" class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors" active-class="bg-cyan-500 text-zinc-900">
          Katalog Alat
        </router-link>
        <router-link to="/admin/doc" class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors" active-class="bg-cyan-500 text-zinc-900">
          Dokumentasi
        </router-link>
        <router-link to="/admin/settings" class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-colors" active-class="bg-cyan-500 text-zinc-900">
          Pengaturan
        </router-link>
      </nav>
      
      <div class="p-4 border-t border-zinc-800">
        <button @click="handleLogout" class="w-full flex items-center justify-center gap-2 bg-zinc-800 hover:bg-red-500 hover:text-white text-gray-300 py-3 rounded-lg text-sm font-bold transition-colors">
          Logout
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 md:ml-64 flex flex-col">
      <!-- Mobile Header -->
      <div class="md:hidden bg-zinc-900 text-white p-4 flex justify-between items-center sticky top-0 z-10">
        <h2 class="text-xl font-black uppercase">Admin<span class="text-cyan-500">.</span></h2>
        <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="p-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      <!-- Mobile Menu Overlay -->
      <div v-if="isMobileMenuOpen" class="md:hidden bg-zinc-800 text-white p-4 space-y-2">
        <router-link to="/admin/catalog" @click="isMobileMenuOpen = false" class="block px-4 py-3 rounded-lg text-sm font-bold" active-class="bg-cyan-500 text-zinc-900">Katalog Alat</router-link>
        <router-link to="/admin/doc" @click="isMobileMenuOpen = false" class="block px-4 py-3 rounded-lg text-sm font-bold" active-class="bg-cyan-500 text-zinc-900">Dokumentasi</router-link>
        <router-link to="/admin/settings" @click="isMobileMenuOpen = false" class="block px-4 py-3 rounded-lg text-sm font-bold" active-class="bg-cyan-500 text-zinc-900">Pengaturan</router-link>
        <button @click="handleLogout" class="w-full text-left px-4 py-3 rounded-lg text-sm font-bold text-red-400">Logout</button>
      </div>

      <!-- Router View for Admin Pages -->
      <main class="flex-1 p-6 md:p-10 overflow-y-auto">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const isMobileMenuOpen = ref(false)

const handleLogout = async () => {
  await authStore.logout()
  router.push('/admin/login')
}
</script>
