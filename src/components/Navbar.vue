<template>
  <nav class="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl bg-white/80 backdrop-blur-md border border-gray-200 rounded-full shadow-sm px-6 py-3 flex justify-between items-center transition-all">
    
    <!-- BRAND / LOGO -->
    <div class="flex items-center">
      <router-link to="/" class="text-2xl font-black tracking-tighter text-zinc-900 uppercase">
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
      <router-link to="/sell" class="text-gray-500 hover:text-zinc-900 text-sm font-bold transition-colors pb-1" active-class="text-zinc-900 border-b-2 border-cyan-500">
        Jual Beli
      </router-link>
      <router-link to="/contact" class="text-gray-500 hover:text-zinc-900 text-sm font-bold transition-colors pb-1" active-class="text-zinc-900 border-b-2 border-cyan-500">
        Kontak
      </router-link>
    </div>
    
    <!-- RIGHT ACTIONS -->
    <div class="flex items-center">
      <button @click="cartStore.toggleCart" class="bg-zinc-900 hover:bg-zinc-800 text-white rounded-full px-6 py-2.5 text-sm font-black transition-all shadow-md flex items-center gap-2 group">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-cyan-400 group-hover:text-yellow-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span>Keranjang</span>
        <span v-if="cartStore.cartItemCount > 0" class="bg-yellow-400 text-zinc-900 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ml-1 shadow-sm">
          {{ cartStore.cartItemCount }}
        </span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { useCartStore } from '../stores/cart'
import { useRoute } from 'vue-router'

const cartStore = useCartStore()
const $route = useRoute()
</script>
