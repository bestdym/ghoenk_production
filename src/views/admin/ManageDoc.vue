<template>
  <div>
    <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
      <div>
        <h1 class="text-3xl font-black text-zinc-900 tracking-tight">Dokumentasi</h1>
        <p class="text-gray-500 mt-1">Kelola galeri foto dan video acara.</p>
      </div>
      <button @click="openModal()" class="bg-cyan-500 hover:bg-cyan-600 text-zinc-900 px-6 py-2.5 rounded-xl font-bold transition-all shadow-sm">
        + Tambah Galeri
      </button>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Acara</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Kategori</th>
              <th class="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Tipe</th>
              <th class="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-if="loading">
              <td colspan="4" class="px-6 py-8 text-center text-sm font-medium text-gray-500">Memuat data...</td>
            </tr>
            <tr v-else-if="docs.length === 0">
              <td colspan="4" class="px-6 py-8 text-center text-sm font-medium text-gray-500">Belum ada data dokumentasi.</td>
            </tr>
            <tr v-for="item in docs" :key="item.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-12 w-20 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                    <img :src="item.thumbnail" class="h-full w-full object-cover" />
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-bold text-zinc-900">{{ item.title }}</div>
                    <div class="text-xs text-gray-500 mt-0.5">{{ item.date }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-md bg-cyan-50 text-cyan-700 border border-cyan-100">
                  {{ item.category }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize font-medium">
                {{ item.type === 'photo' ? 'Foto' : 'Video' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-bold">
                <button @click="openModal(item)" class="text-yellow-600 hover:text-yellow-700 mr-4 transition-colors">Edit</button>
                <button @click="deleteItem(item.id)" class="text-red-500 hover:text-red-600 transition-colors">Hapus</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Form -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-zinc-900/70 backdrop-blur-sm transition-opacity" @click="closeModal"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div class="relative z-10 inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
          <form @submit.prevent="saveItem">
            <div class="bg-white px-6 pt-6 pb-6">
              <h3 class="text-xl leading-6 font-black text-zinc-900 mb-6" id="modal-title">
                {{ isEditing ? 'Edit Dokumentasi' : 'Tambah Dokumentasi' }}
              </h3>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-1">Judul Acara</label>
                  <input v-model="formData.title" type="text" required class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-zinc-900 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500">
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-bold text-gray-700 mb-1">Kategori (Client)</label>
                    <input v-model="formData.category" type="text" required class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-zinc-900 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500" placeholder="Wedding, Konser, dll">
                  </div>
                  <div>
                    <label class="block text-sm font-bold text-gray-700 mb-1">Tanggal</label>
                    <input v-model="formData.date" type="text" class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-zinc-900 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500" placeholder="Misal: 12 Jan 2024">
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-1">Tipe Media</label>
                  <select v-model="formData.type" required class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-zinc-900 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500">
                    <option value="photo">Foto</option>
                    <option value="video">Video</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-1">Deskripsi Singkat</label>
                  <textarea v-model="formData.description" rows="3" class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-zinc-900 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"></textarea>
                </div>

                <div>
                  <label class="block text-sm font-bold text-gray-700 mb-1">Thumbnail Foto</label>
                  <input type="file" @change="handleFileUpload" accept="image/*" class="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100">
                  <p class="text-xs text-gray-500 mt-1" v-if="isEditing">Kosongkan jika tidak ingin mengganti thumbnail.</p>
                </div>
              </div>
            </div>
            
            <div class="bg-gray-50 px-6 py-4 flex justify-end gap-3 rounded-b-2xl border-t border-gray-100">
              <button type="button" @click="closeModal" class="px-5 py-2.5 bg-white border border-gray-300 rounded-xl text-gray-700 font-bold hover:bg-gray-50 transition-colors">
                Batal
              </button>
              <button type="submit" :disabled="isSaving" class="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-zinc-900 rounded-xl font-bold transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                {{ isSaving ? 'Menyimpan...' : 'Simpan Dokumentasi' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../../lib/supabase'

const docs = ref([])
const loading = ref(true)

// Modal State
const isModalOpen = ref(false)
const isEditing = ref(false)
const isSaving = ref(false)
const editId = ref(null)
const fileToUpload = ref(null)

const formData = ref({
  type: 'photo',
  title: '',
  description: '',
  category: '',
  date: '',
  thumbnail: ''
})

const fetchDocs = async () => {
  loading.value = true
  const { data, error } = await supabase.from('documentations').select('*').order('created_at', { ascending: false })
  if (error) console.error(error)
  else docs.value = data
  loading.value = false
}

const openModal = (item = null) => {
  if (item) {
    isEditing.value = true
    editId.value = item.id
    formData.value = { ...item }
  } else {
    isEditing.value = false
    editId.value = null
    formData.value = {
      type: 'photo',
      title: '',
      description: '',
      category: '',
      date: '',
      thumbnail: ''
    }
  }
  fileToUpload.value = null
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    fileToUpload.value = file
  }
}

const uploadImage = async () => {
  if (!fileToUpload.value) return formData.value.thumbnail

  const file = fileToUpload.value
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random()}.${fileExt}`
  const filePath = `doc/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from('images')
    .upload(filePath, file)

  if (uploadError) {
    throw uploadError
  }

  const { data } = supabase.storage
    .from('images')
    .getPublicUrl(filePath)

  return data.publicUrl
}

const saveItem = async () => {
  try {
    isSaving.value = true
    
    // Upload image if selected
    if (fileToUpload.value) {
      formData.value.thumbnail = await uploadImage()
    } else if (!isEditing.value && !formData.value.thumbnail) {
      alert("Harap pilih thumbnail terlebih dahulu!")
      isSaving.value = false
      return
    }

    if (isEditing.value) {
      const { error } = await supabase
        .from('documentations')
        .update(formData.value)
        .eq('id', editId.value)
      
      if (error) throw error
    } else {
      const { error } = await supabase
        .from('documentations')
        .insert([formData.value])
      
      if (error) throw error
    }

    await fetchDocs()
    closeModal()
  } catch (error) {
    console.error(error)
    alert('Terjadi kesalahan: ' + error.message)
  } finally {
    isSaving.value = false
  }
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
