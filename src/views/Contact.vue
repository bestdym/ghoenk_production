<script setup>
import { ref } from 'vue'

import { supabase } from '../lib/supabase'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const message = ref('')
const appSettings = ref({
  whatsapp_number: '6281227419667'
})

import { onMounted } from 'vue'

const fetchSettings = async () => {
  const { data } = await supabase.from('settings').select('*')
  if (data) {
    const wa = data.find(s => s.setting_key === 'whatsapp_number')
    if (wa) appSettings.value.whatsapp_number = wa.setting_value
  }
}

onMounted(() => {
  fetchSettings()
})

import Swal from 'sweetalert2'

const sendWhatsAppMessage = async () => {
  if (!firstName.value || !message.value) {
    Swal.fire({
      icon: 'warning',
      title: 'Data Belum Lengkap',
      text: 'Harap isi Nama Depan dan Pesan Anda!',
      confirmButtonColor: '#06b6d4'
    })
    return
  }

  // Ambil nomor terbaru langsung dari database
  const { data } = await supabase.from('settings').select('*')
  if (data) {
    const wa = data.find(s => s.setting_key === 'whatsapp_number')
    if (wa) appSettings.value.whatsapp_number = wa.setting_value
  }

  const phoneNumber = appSettings.value.whatsapp_number
  
  let text = `*PESAN BARU DARI WEBSITE*\n\n`
  text += `*Nama:* ${firstName.value} ${lastName.value}\n`
  text += `*Email:* ${email.value}\n\n`
  text += `*Pesan:*\n${message.value}\n`

  const encodedText = encodeURIComponent(text)
  window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank')
}

// FAQ Logic
const activeFaq = ref(null)
const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index
}

const faqs = [
  {
    question: "Bagaimana cara menyewa alat di Ghoenk Production?",
    answer: "Sangat mudah! Anda bisa melihat daftar alat di halaman Katalog, masukkan ke Keranjang, isi tanggal dan lokasi acara, lalu klik 'Pesan Sekarang' untuk langsung terhubung dengan WhatsApp kami."
  },
  {
    question: "Apakah harga sewa sudah termasuk biaya antar-jemput?",
    answer: "Harga yang tertera di website adalah harga sewa alat per hari. Biaya antar-jemput dan instalasi akan disesuaikan dengan jarak lokasi acara Anda."
  },
  {
    question: "Berapa lama minimal waktu penyewaan?",
    answer: "Minimal waktu penyewaan adalah 1 (satu) hari. Kami juga melayani penyewaan jangka panjang dengan harga khusus/diskon."
  },
  {
    question: "Apakah ada teknisi yang mendampingi selama acara (stanby)?",
    answer: "Ya, kami menyediakan opsi teknisi standby (operator) untuk menjaga kelancaran acara Anda dengan biaya tambahan yang terjangkau."
  },
  {
    question: "Bagaimana jika ada alat yang rusak saat disewa?",
    answer: "Jika kerusakan disebabkan oleh kesalahan teknis alat, kami akan langsung menggantinya tanpa biaya. Namun, jika kerusakan akibat kelalaian penyewa, maka biaya perbaikan sepenuhnya menjadi tanggung jawab penyewa sesuai dengan perjanjian."
  }
]
</script>

<template>
  <div class="pt-32 pb-20 bg-gray-50 min-h-screen">
    <div class="max-w-4xl w-full mx-auto px-4">
      
      <!-- Contact Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-black text-zinc-900 tracking-tight mb-4">Hubungi Kami</h1>
        <p class="text-lg text-slate-500 font-medium">Punya pertanyaan atau butuh alat khusus? Kirim pesan kepada kami.</p>
      </div>

      <!-- Contact Form Wrapper -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row mb-20">
        
        <!-- Contact Info Side -->
        <div class="bg-zinc-900 text-white p-10 md:w-2/5 flex flex-col justify-between">
          <div>
            <h3 class="text-2xl font-bold mb-2">Informasi Kontak</h3>
            <p class="text-gray-400 mb-8 text-sm">Isi formulir ini dan tim kami akan segera membalas Anda secepatnya.</p>
            
            <div class="space-y-6">
              <div class="flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span class="font-medium">+62 812 2741 9667</span>
              </div>
              <div class="flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span class="font-medium">hello@ghoenk.com</span>
              </div>
              <div class="flex items-start gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-cyan-400 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span class="font-medium">Jl. Raya Production No. 12<br/>Jakarta Selatan, Indonesia</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Chat Form Side -->
        <div class="p-10 md:w-3/5">
          <form @submit.prevent="sendWhatsAppMessage" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold text-zinc-700 mb-2">Nama Depan</label>
                <input v-model="firstName" type="text" class="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors bg-gray-50">
              </div>
              <div>
                <label class="block text-sm font-bold text-zinc-700 mb-2">Nama Belakang</label>
                <input v-model="lastName" type="text" class="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors bg-gray-50">
              </div>
            </div>

            <div>
              <label class="block text-sm font-bold text-zinc-700 mb-2">Email</label>
              <input v-model="email" type="email" class="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors bg-gray-50">
            </div>

            <div>
              <label class="block text-sm font-bold text-zinc-700 mb-2">Pesan</label>
              <textarea v-model="message" rows="4" placeholder="Tulis pesan Anda di sini..." class="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors bg-gray-50 resize-none"></textarea>
            </div>

            <button type="submit" class="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-3 px-8 rounded-lg font-black text-base transition-all mt-4 shadow-sm w-full md:w-auto md:float-right">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 448 512">
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
              </svg>
              Kirim Pesan
            </button>
          </form>
        </div>

      </div>
      
      <!-- FAQ Section -->
      <div class="mt-12">
        <h2 class="text-3xl font-black text-zinc-900 text-center mb-8 tracking-tight">Pertanyaan yang Sering Diajukan (FAQ)</h2>
        <div class="space-y-4">
          <div v-for="(faq, index) in faqs" :key="index" class="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm transition-all duration-300">
            <button 
              @click="toggleFaq(index)" 
              class="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none hover:bg-gray-50 transition-colors"
            >
              <span class="font-bold text-zinc-900 pr-8">{{ faq.question }}</span>
              <span class="shrink-0">
                <svg 
                  class="w-5 h-5 text-cyan-500 transform transition-transform duration-300" 
                  :class="{ 'rotate-180': activeFaq === index }" 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            <div 
              class="overflow-hidden transition-all duration-300"
              :class="activeFaq === index ? 'max-h-96' : 'max-h-0'"
            >
              <div class="px-6 pb-6 text-slate-600 font-medium leading-relaxed border-t border-gray-100 pt-4">
                {{ faq.answer }}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
