<template>
  <div>
    <div class="flex justify-between items-end mb-8">
      <div>
        <h1 class="text-3xl font-black text-zinc-900 tracking-tight">Dokumentasi</h1>
        <p class="text-gray-500 mt-1">Kelola galeri foto dan video acara.</p>
      </div>
      <button class="bg-cyan-500 hover:bg-cyan-600 text-zinc-900 px-4 py-2 rounded-lg font-bold transition-colors">
        + Tambah Galeri
      </button>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Acara</th>
            <th class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Kategori</th>
            <th class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Tipe</th>
            <th class="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Aksi</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-if="loading">
            <td colspan="4" class="px-6 py-4 text-center text-sm text-gray-500">Memuat data...</td>
          </tr>
          <tr v-else-if="docs.length === 0">
            <td colspan="4" class="px-6 py-4 text-center text-sm text-gray-500">Belum ada data dokumentasi.</td>
          </tr>
          <tr v-for="item in docs" :key="item.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-16 bg-gray-100 rounded-md overflow-hidden">
                  <img :src="item.thumbnail" class="h-10 w-16 object-cover" />
                </div>
                <div class="ml-4">
                  <div class="text-sm font-bold text-zinc-900">{{ item.title }}</div>
                  <div class="text-xs text-gray-500">{{ item.date }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-cyan-100 text-cyan-800">
                {{ item.category }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
              {{ item.type }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button class="text-yellow-600 hover:text-yellow-900 mr-3">Edit</button>
              <button @click="deleteItem(item.id)" class="text-red-600 hover:text-red-900">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../../lib/supabase'

const docs = ref([])
const loading = ref(true)

const fetchDocs = async () => {
  loading.value = true
  const { data, error } = await supabase.from('documentations').select('*').order('created_at', { ascending: false })
  if (error) console.error(error)
  else docs.value = data
  loading.value = false
}

const deleteItem = async (id) => {
  if (confirm('Yakin ingin menghapus dokumentasi ini?')) {
    const { error } = await supabase.from('documentations').delete().eq('id', id)
    if (error) alert('Gagal menghapus: ' + error.message)
    else fetchDocs()
  }
}

onMounted(() => {
  fetchDocs()
})
</script>
