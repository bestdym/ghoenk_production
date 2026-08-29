<template>
  <div>
    <div class="mb-8">
      <h1 class="text-3xl font-black text-zinc-900 tracking-tight">Pengaturan</h1>
      <p class="text-gray-500 mt-1">Kelola kontak WhatsApp dan status pemesanan.</p>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden max-w-2xl">
      <div class="p-6 space-y-6">
        
        <!-- WhatsApp Number -->
        <div>
          <label class="block text-sm font-bold text-zinc-900 mb-2">Nomor WhatsApp Admin</label>
          <div class="flex gap-4">
            <input 
              v-model="waNumber" 
              type="text" 
              class="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors font-mono"
              placeholder="62812xxxxxx"
            >
            <button @click="saveWaNumber" class="bg-zinc-900 hover:bg-zinc-800 text-yellow-400 px-6 py-2 rounded-lg font-bold transition-colors">
              Simpan
            </button>
          </div>
          <p class="text-xs text-gray-500 mt-2">Gunakan format 62 tanpa + atau 0 di depan.</p>
        </div>

        <hr class="border-gray-100">

        <!-- Status Pemesanan -->
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-sm font-bold text-zinc-900">Status Pemesanan</h3>
            <p class="text-xs text-gray-500 mt-1">Matikan jika sedang tidak menerima orderan.</p>
          </div>
          <button 
            @click="toggleOrderEnabled"
            :class="orderEnabled ? 'bg-cyan-500 text-zinc-900' : 'bg-gray-200 text-gray-500'"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none"
          >
            <span 
              :class="orderEnabled ? 'translate-x-6 bg-white' : 'translate-x-1 bg-white'"
              class="inline-block h-4 w-4 transform rounded-full transition-transform"
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

const saveWaNumber = async () => {
  const { error } = await supabase
    .from('settings')
    .update({ setting_value: waNumber.value })
    .eq('setting_key', 'whatsapp_number')
  
  if (error) alert('Gagal menyimpan: ' + error.message)
  else alert('Nomor WhatsApp berhasil disimpan!')
}

const toggleOrderEnabled = async () => {
  const newValue = !orderEnabled.value
  const { error } = await supabase
    .from('settings')
    .update({ setting_value: newValue.toString() })
    .eq('setting_key', 'order_enabled')
    
  if (error) {
    alert('Gagal mengubah status: ' + error.message)
  } else {
    orderEnabled.value = newValue
  }
}

onMounted(() => {
  fetchSettings()
})
</script>
