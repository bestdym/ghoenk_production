<template>
  <nav class="fixed top-0 left-0 w-full z-40 bg-white border-b border-gray-100">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- LOGO -->
        <router-link to="/" class="flex-shrink-0 font-black text-2xl tracking-tight text-slate-900">
          Ghoenk Production
        </router-link>
        
        <!-- LINKS -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-center space-x-10">
            <router-link to="/" class="text-gray-500 hover:text-slate-900 px-1 py-7 text-sm font-semibold transition-colors relative" active-class="text-slate-900">
              Home
              <div v-if="$route.path === '/'" class="absolute bottom-0 left-0 w-full h-0.5 bg-slate-900"></div>
            </router-link>
            <router-link to="/catalog" class="text-gray-500 hover:text-slate-900 px-1 py-7 text-sm font-semibold transition-colors relative" active-class="text-slate-900">
              Categories
              <div v-if="$route.path === '/catalog'" class="absolute bottom-0 left-0 w-full h-0.5 bg-slate-900"></div>
            </router-link>
            <a href="#" class="text-gray-500 hover:text-slate-900 px-1 py-7 text-sm font-semibold transition-colors relative">
              Promos
            </a>
            <router-link to="/contact" class="text-gray-500 hover:text-slate-900 px-1 py-7 text-sm font-semibold transition-colors relative" active-class="text-slate-900">
              contact
              <div v-if="$route.path === '/contact'" class="absolute bottom-0 left-0 w-full h-0.5 bg-slate-900"></div>
            </router-link>
          </div>
        </div>
        
        <!-- ICONS -->
        <div class="flex items-center gap-5 text-gray-500">
          <button @click="cartStore.toggleCart" class="relative hover:text-slate-900 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span v-if="cartStore.cartItemCount > 0" class="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-slate-900 rounded-full transform translate-x-1/2 -translate-y-1/2">
              {{ cartStore.cartItemCount }}
            </span>
          </button>
          
          <button class="hover:text-slate-900 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useCartStore } from '../stores/cart'
import { useRoute } from 'vue-router'

const cartStore = useCartStore()
const $route = useRoute()
</script>
