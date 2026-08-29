<template>
  <div>
    <nav class="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl bg-white/80 backdrop-blur-md border border-gray-200 rounded-full shadow-sm px-4 md:px-6 py-3 flex justify-between items-center transition-all">
      
      <!-- BRAND / LOGO -->
      <div class="flex items-center">
        <router-link to="/" class="text-xl md:text-2xl font-black tracking-tighter text-zinc-900 uppercase">
          Ghoenk<span class="text-cyan-500">.</span>
        </router-link>
      </div>

      <!-- LINKS -->
      <div class="hidden md:flex items-center space-x-8">
        <router-link to="/" class="text-gray-500 hover:text-zinc-900 text-sm font-bold transition-colors pb-1" active-class="text-zinc-900 border-b-2 border-cyan-500">
          Beranda
        </router-link>
        <router-link to="/catalog" class="text-gray-500 hover:text-zinc-900 text-sm font-bold transition-colors pb-1" active-class="text-zinc-900 border-b-2 border-cyan-500">
          Katalog
        </router-link>
        <router-link to="/documentation" class="text-gray-500 hover:text-zinc-900 text-sm font-bold transition-colors pb-1" active-class="text-zinc-900 border-b-2 border-cyan-500">
          Dokumentasi
        </router-link>
        <router-link to="/sell" class="text-gray-500 hover:text-zinc-900 text-sm font-bold transition-colors pb-1" active-class="text-zinc-900 border-b-2 border-cyan-500">
          Jual Beli
        </router-link>
        <router-link to="/contact" class="text-gray-500 hover:text-zinc-900 text-sm font-bold transition-colors pb-1" active-class="text-zinc-900 border-b-2 border-cyan-500">
          Kontak
        </router-link>
      </div>
      
      <!-- RIGHT ACTIONS -->
      <div class="flex items-center gap-2 md:gap-4">
        <button @click="cartStore.toggleCart" class="bg-zinc-900 hover:bg-zinc-800 text-white rounded-full px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-black transition-all shadow-md flex items-center gap-2 group">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-cyan-400 group-hover:text-yellow-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>Keranjang</span>
          <span v-if="cartStore.cartItemCount > 0" class="bg-yellow-400 text-zinc-900 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ml-1 shadow-sm">
            {{ cartStore.cartItemCount }}
          </span>
        </button>

        <!-- Mobile Menu Toggle Button -->
        <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="md:hidden p-2 text-zinc-900 rounded-full hover:bg-gray-100 transition-colors" aria-label="Toggle Menu">
          <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </nav>

    <!-- MOBILE MENU OVERLAY -->
    <div v-if="isMobileMenuOpen" class="fixed inset-0 z-40 bg-zinc-900/60 backdrop-blur-sm md:hidden transition-opacity" @click="isMobileMenuOpen = false"></div>
    <div v-if="isMobileMenuOpen" class="fixed top-24 left-1/2 -translate-x-1/2 w-[95%] bg-white rounded-2xl shadow-xl border border-gray-200 z-40 md:hidden overflow-hidden flex flex-col transition-all origin-top">
      <div class="flex flex-col p-4 space-y-1">
        <router-link to="/" @click="isMobileMenuOpen = false" class="px-4 py-3 text-zinc-900 font-bold rounded-xl hover:bg-cyan-50 hover:text-cyan-600 transition-colors" active-class="bg-cyan-50 text-cyan-600">Beranda</router-link>
        <router-link to="/catalog" @click="isMobileMenuOpen = false" class="px-4 py-3 text-zinc-900 font-bold rounded-xl hover:bg-cyan-50 hover:text-cyan-600 transition-colors" active-class="bg-cyan-50 text-cyan-600">Katalog</router-link>
        <router-link to="/documentation" @click="isMobileMenuOpen = false" class="px-4 py-3 text-zinc-900 font-bold rounded-xl hover:bg-cyan-50 hover:text-cyan-600 transition-colors" active-class="bg-cyan-50 text-cyan-600">Dokumentasi</router-link>
        <router-link to="/sell" @click="isMobileMenuOpen = false" class="px-4 py-3 text-zinc-900 font-bold rounded-xl hover:bg-cyan-50 hover:text-cyan-600 transition-colors" active-class="bg-cyan-50 text-cyan-600">Jual Beli</router-link>
        <router-link to="/contact" @click="isMobileMenuOpen = false" class="px-4 py-3 text-zinc-900 font-bold rounded-xl hover:bg-cyan-50 hover:text-cyan-600 transition-colors" active-class="bg-cyan-50 text-cyan-600">Kontak</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cart'
import { useRoute } from 'vue-router'

const cartStore = useCartStore()
const $route = useRoute()
const isMobileMenuOpen = ref(false)
</script>
