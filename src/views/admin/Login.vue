<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-black text-zinc-900 uppercase tracking-tight">
        Admin Ghoenk<span class="text-cyan-500">.</span>
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600 font-medium">
        Silakan masuk ke panel admin
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200">
        <form class="space-y-6" @submit.prevent="handleLogin">
          <div>
            <label for="email" class="block text-sm font-bold text-gray-700">Email address</label>
            <div class="mt-1">
              <input id="email" v-model="email" name="email" type="email" autocomplete="email" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm font-medium">
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-bold text-gray-700">Password</label>
            <div class="mt-1">
              <input id="password" v-model="password" name="password" type="password" autocomplete="current-password" required class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm font-medium">
            </div>
          </div>

          <div v-if="errorMsg" class="rounded-md bg-red-50 p-4 border border-red-200">
            <div class="flex">
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">{{ errorMsg }}</h3>
              </div>
            </div>
          </div>

          <div>
            <button type="submit" :disabled="loading" class="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-zinc-900 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 transition-colors">
              {{ loading ? 'Memproses...' : 'Masuk' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

const handleLogin = async () => {
  loading.value = true
  errorMsg.value = ''
  
  try {
    await authStore.login(email.value, password.value)
    router.push('/admin')
  } catch (error) {
    errorMsg.value = error.message || 'Gagal login. Cek kembali email dan password.'
  } finally {
    loading.value = false
  }
}
</script>
