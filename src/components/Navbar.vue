<template>
  <nav class="fixed top-0 left-0 w-full z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- LOGO -->
        <router-link to="/" class="flex-shrink-0 font-black text-3xl tracking-tighter italic" style="transform: skewX(-10deg);">
          <span class="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">GHOENK</span>
          <span class="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)] ml-1 text-2xl">PRO</span>
        </router-link>
        
        <!-- LINKS -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-6">
            <router-link to="/" class="text-gray-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-bold transition-colors uppercase tracking-wider" active-class="text-cyan-400">Home</router-link>
            <router-link to="/catalog" class="text-gray-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-bold transition-colors uppercase tracking-wider" active-class="text-cyan-400">Sewa Alat</router-link>
            <router-link to="/sell" class="text-gray-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-bold transition-colors uppercase tracking-wider" active-class="text-cyan-400">Jual Beli</router-link>
            <router-link to="/contact" class="text-gray-300 hover:text-cyan-400 px-3 py-2 rounded-md text-sm font-bold transition-colors uppercase tracking-wider" active-class="text-cyan-400">Contact</router-link>
          </div>
        </div>
        
        <!-- CART ICON -->
        <div>
          <button @click="cartStore.toggleCart" class="relative p-2 text-gray-400 hover:text-cyan-400 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span v-if="cartStore.cartItemCount > 0" class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-slate-900 bg-cyan-400 rounded-full transform translate-x-1/4 -translate-y-1/4">
              {{ cartStore.cartItemCount }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
</script>
