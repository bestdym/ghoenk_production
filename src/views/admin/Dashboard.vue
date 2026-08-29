<template>
  <div class="min-h-screen bg-gray-50 flex font-sans selection:bg-cyan-500 selection:text-white">
    
    <!-- Sidebar -->
    <div class="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex fixed h-full z-20 shadow-sm">
      <div class="p-8 border-b border-gray-100">
        <h2 class="text-3xl font-black tracking-tight uppercase text-zinc-900">Admin<span class="text-cyan-500">.</span></h2>
        <p class="text-xs text-gray-500 mt-2 font-medium">{{ authStore.user?.email || 'Admin Dashboard' }}</p>
      </div>
      
      <nav class="flex-1 p-6 space-y-2">
        <router-link to="/admin" exact class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all text-gray-600 hover:bg-gray-50" active-class="bg-cyan-50 text-cyan-700 hover:bg-cyan-100 shadow-sm border border-cyan-100">
          Dashboard
        </router-link>
        <router-link to="/admin/catalog" class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all text-gray-600 hover:bg-gray-50" active-class="bg-cyan-50 text-cyan-700 hover:bg-cyan-100 shadow-sm border border-cyan-100">
          Katalog Alat
        </router-link>
        <router-link to="/admin/doc" class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all text-gray-600 hover:bg-gray-50" active-class="bg-cyan-50 text-cyan-700 hover:bg-cyan-100 shadow-sm border border-cyan-100">
          Dokumentasi
        </router-link>
        <router-link to="/admin/sell" class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all text-gray-600 hover:bg-gray-50" active-class="bg-cyan-50 text-cyan-700 hover:bg-cyan-100 shadow-sm border border-cyan-100">
          Jual Beli
        </router-link>
        <router-link to="/admin/settings" class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all text-gray-600 hover:bg-gray-50" active-class="bg-cyan-50 text-cyan-700 hover:bg-cyan-100 shadow-sm border border-cyan-100">
          Pengaturan
        </router-link>
      </nav>
      
      <div class="p-6 border-t border-gray-100">
        <button @click="handleLogout" class="w-full flex items-center justify-center gap-2 bg-gray-50 hover:bg-red-50 text-gray-600 hover:text-red-600 py-3.5 rounded-xl text-sm font-bold transition-all border border-gray-200 hover:border-red-200">
          Logout
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 md:ml-64 flex flex-col min-h-screen">
      <!-- Mobile Header -->
      <div class="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-30 shadow-sm">
        <h2 class="text-xl font-black uppercase text-zinc-900">Admin<span class="text-cyan-500">.</span></h2>
        <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="p-2 bg-gray-100 rounded-lg text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      <!-- Mobile Menu Overlay -->
      <div v-if="isMobileMenuOpen" class="md:hidden bg-white border-b border-gray-200 p-4 space-y-2 z-20 absolute w-full top-[73px] shadow-lg">
        <router-link to="/admin" exact @click="isMobileMenuOpen = false" class="block px-4 py-3 rounded-lg text-sm font-bold text-gray-600" active-class="bg-cyan-50 text-cyan-700">Dashboard</router-link>
        <router-link to="/admin/catalog" @click="isMobileMenuOpen = false" class="block px-4 py-3 rounded-lg text-sm font-bold text-gray-600" active-class="bg-cyan-50 text-cyan-700">Katalog Alat</router-link>
        <router-link to="/admin/doc" @click="isMobileMenuOpen = false" class="block px-4 py-3 rounded-lg text-sm font-bold text-gray-600" active-class="bg-cyan-50 text-cyan-700">Dokumentasi</router-link>
        <router-link to="/admin/sell" @click="isMobileMenuOpen = false" class="block px-4 py-3 rounded-lg text-sm font-bold text-gray-600" active-class="bg-cyan-50 text-cyan-700">Jual Beli</router-link>
        <router-link to="/admin/settings" @click="isMobileMenuOpen = false" class="block px-4 py-3 rounded-lg text-sm font-bold text-gray-600" active-class="bg-cyan-50 text-cyan-700">Pengaturan</router-link>
        <button @click="handleLogout" class="w-full text-left px-4 py-3 rounded-lg text-sm font-bold text-red-500">Logout</button>
      </div>

      <!-- Router View for Admin Pages -->
      <main class="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
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
