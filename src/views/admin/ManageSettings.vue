<template>
  <div>
    <div class="mb-10">
      <h1 class="text-3xl font-black text-zinc-900 tracking-tight">Pengaturan</h1>
      <p class="text-gray-500 mt-1 font-medium">Kelola kontak WhatsApp dan status pemesanan.</p>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden max-w-2xl">
      <div class="p-8 space-y-8">
        
        <!-- WhatsApp Number -->
        <div>
          <label class="block text-sm font-bold text-zinc-900 mb-3">Nomor WhatsApp Admin</label>
          <div class="flex gap-4">
            <input 
              v-model="waNumber" 
              type="text" 
              class="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 text-zinc-900 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors font-mono placeholder-gray-400"
              placeholder="62812xxxxxx"
            >
            <button @click="saveWaNumber" class="bg-cyan-500 hover:bg-cyan-600 text-zinc-900 px-8 py-3 rounded-xl font-black transition-all shadow-sm">
              Simpan
            </button>
          </div>
          <p class="text-xs text-gray-500 mt-3 font-medium">Gunakan format 62 tanpa + atau 0 di depan.</p>
        </div>

        <hr class="border-gray-100">

        <!-- Status Pemesanan -->
        <div class="flex items-center justify-between bg-gray-50 p-5 rounded-xl border border-gray-200">
          <div>
            <h3 class="text-base font-bold text-zinc-900">Status Pemesanan</h3>
            <p class="text-sm text-gray-500 mt-1">Matikan jika sedang tidak menerima orderan.</p>
          </div>
          <button 
            @click="toggleOrderEnabled"
            :class="orderEnabled ? 'bg-cyan-500' : 'bg-gray-300'"
            class="relative inline-flex h-7 w-14 items-center rounded-full transition-all duration-300 focus:outline-none"
          >
            <span 
              :class="orderEnabled ? 'translate-x-8 bg-white' : 'translate-x-1 bg-white'"
              class="inline-block h-5 w-5 transform rounded-full transition-transform duration-300 shadow-sm"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../../lib/supabase'

const waNumber = ref('')
const orderEnabled = ref(true)

const fetchSettings = async () => {
  const { data, error } = await supabase.from('settings').select('*')
  if (data) {
    const wa = data.find(s => s.setting_key === 'whatsapp_number')
    if (wa) waNumber.value = wa.setting_value
    
    const enabled = data.find(s => s.setting_key === 'order_enabled')
    if (enabled) orderEnabled.value = enabled.setting_value === 'true'
  }
}

import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
})

const saveWaNumber = async () => {
  const { data: existing } = await supabase.from('settings').select('id').eq('setting_key', 'whatsapp_number').maybeSingle()
  
  let error;
  if (existing) {
    const res = await supabase.from('settings').update({ setting_value: waNumber.value }).eq('setting_key', 'whatsapp_number')
    error = res.error
  } else {
    const res = await supabase.from('settings').insert({ setting_key: 'whatsapp_number', setting_value: waNumber.value })
    error = res.error
  }
  
  if (error) {
    Toast.fire({
      icon: 'error',
      title: 'Gagal menyimpan: ' + error.message
    })
  } else {
    Toast.fire({
      icon: 'success',
      title: 'Nomor WhatsApp berhasil disimpan!'
    })
  }
}

const toggleOrderEnabled = async () => {
  const newValue = !orderEnabled.value
  const { data: existing } = await supabase.from('settings').select('id').eq('setting_key', 'order_enabled').maybeSingle()
  
  let error;
  if (existing) {
    const res = await supabase.from('settings').update({ setting_value: newValue.toString() }).eq('setting_key', 'order_enabled')
    error = res.error
  } else {
    const res = await supabase.from('settings').insert({ setting_key: 'order_enabled', setting_value: newValue.toString() })
    error = res.error
  }
    
  if (error) {
    Toast.fire({
      icon: 'error',
      title: 'Gagal mengubah status: ' + error.message
    })
  } else {
    orderEnabled.value = newValue
    Toast.fire({
      icon: 'success',
      title: 'Status pemesanan diperbarui!'
    })
  }
}

onMounted(() => {
  fetchSettings()
})
</script>
