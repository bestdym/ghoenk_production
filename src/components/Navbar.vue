<template>
  <div class="fixed top-0 left-0 w-full z-40 pt-4 px-4 pointer-events-none">
    <nav class="mx-auto max-w-5xl bg-white rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 pointer-events-auto flex items-center justify-between px-8 py-3">
      
      <!-- LOGO -->
      <router-link to="/" class="flex items-center gap-2 flex-shrink-0">
        <span class="font-black text-xl tracking-tight text-slate-900">GHOENK</span>
      </router-link>
      
      <!-- LINKS -->
      <div class="hidden md:flex items-center space-x-8">
        <router-link to="/" class="text-gray-500 hover:text-slate-900 text-sm font-semibold transition-colors pb-1" active-class="text-slate-900 border-b-2 border-slate-900">
          Home
        </router-link>
        <router-link to="/catalog" class="text-gray-500 hover:text-slate-900 text-sm font-semibold transition-colors pb-1" active-class="text-slate-900 border-b-2 border-slate-900">
          Catalog
        </router-link>
        <router-link to="/sell" class="text-gray-500 hover:text-slate-900 text-sm font-semibold transition-colors pb-1" active-class="text-slate-900 border-b-2 border-slate-900">
          Sell
        </router-link>
        <router-link to="/contact" class="text-gray-500 hover:text-slate-900 text-sm font-semibold transition-colors pb-1" active-class="text-slate-900 border-b-2 border-slate-900">
          Contact
        </router-link>
      </div>
      
      <!-- RIGHT ACTIONS -->
      <div class="flex items-center">
        <button @click="cartStore.toggleCart" class="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 py-2.5 text-sm font-bold transition-all shadow-md flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>Cart</span>
          <span v-if="cartStore.cartItemCount > 0" class="bg-white text-slate-900 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black">
            {{ cartStore.cartItemCount }}
          </span>
        </button>
      </div>
      
    </nav>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'
import { useRoute } from 'vue-router'

const cartStore = useCartStore()
const $route = useRoute()
</script>
