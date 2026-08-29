<template>
  <div class="min-h-screen bg-slate-950 font-sans selection:bg-cyan-500 selection:text-white">
    <Navbar />
    <router-view />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
</script>
