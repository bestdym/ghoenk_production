<template>
  <div class="min-h-screen flex items-center justify-center pt-16 px-4">
    <div class="bg-slate-900 border border-slate-800 p-8 rounded-xl w-full max-w-md">
      <h2 class="text-2xl font-black text-white mb-6 text-center">ADMIN <span class="text-cyan-400">LOGIN</span></h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm text-gray-400 mb-1">Email</label>
          <input type="email" class="w-full bg-slate-950 border border-slate-800 rounded-md px-4 py-2 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500">
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Password</label>
          <input type="password" class="w-full bg-slate-950 border border-slate-800 rounded-md px-4 py-2 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500">
        </div>
        <button type="submit" class="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-md mt-6 transition-colors">
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const handleLogin = () => {
  // Placeholder untuk integrasi Supabase Auth
  router.push('/admin/dashboard')
}
</script>
