<script setup>
import { useCartStore } from './stores/cart'
import Navbar from './components/Navbar.vue'
import { supabase } from './lib/supabase'
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const cartStore = useCartStore()

const isAdminRoute = computed(() => route.path.startsWith('/admin'))
const appSettings = ref({
  whatsapp_number: '6281227419667',
  order_enabled: true
})

onMounted(async () => {
  const { data } = await supabase.from('settings').select('*')
  if (data) {
    const wa = data.find(s => s.setting_key === 'whatsapp_number')
    const order = data.find(s => s.setting_key === 'order_enabled')
    
    if (wa) appSettings.value.whatsapp_number = wa.setting_value
    if (order) appSettings.value.order_enabled = (order.setting_value === 'true')
  }
})

const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number)
}

const checkoutWhatsApp = () => {
  if (!appSettings.value.order_enabled) {
    alert("Mohon maaf, saat ini kami sedang tidak menerima pesanan baru.")
    return
  }

  if (!cartStore.customerName || !cartStore.customerEmail || !cartStore.startDate || !cartStore.endDate || !cartStore.location) {
    alert("Harap lengkapi semua Data Pemesan dan Detail Acara!")
    return
  }
  if (cartStore.items.length === 0) {
    alert("Keranjang masih kosong!")
    return
  }

  const phoneNumber = appSettings.value.whatsapp_number
  
  
  let text = `*ORDER BARU - GHOENK PRODUCTION*\n\n`
  text += `*Nama Pemesan:* ${cartStore.customerName}\n`
  text += `*Email:* ${cartStore.customerEmail}\n`
  text += `*Lokasi Acara:* ${cartStore.location}\n`
  text += `*Tanggal:* ${cartStore.startDate} s/d ${cartStore.endDate} (${cartStore.daysCount} Hari)\n\n`
  text += `*Rincian Alat:*\n`
  
  cartStore.items.forEach(item => {
    text += `- ${item.name} (${item.quantity}x) - ${formatRupiah(item.price_per_day)}/hari\n`
  })

  text += `\n*Subtotal Alat/Hari:* ${formatRupiah(cartStore.cartSubtotal)}\n`
  text += `*GRAND TOTAL:* ${formatRupiah(cartStore.grandTotal)}\n\n`
  text += `Mohon segera diproses, terima kasih!`

  const encodedText = encodeURIComponent(text)
  window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 font-sans selection:bg-slate-900 selection:text-white flex flex-col">
    
    <Navbar v-if="!isAdminRoute" />

    <!-- MAIN CONTENT -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- FOOTER -->
    <footer v-if="!isAdminRoute" class="bg-zinc-950 text-gray-400 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div class="md:col-span-2">
            <h3 class="text-white font-black text-2xl mb-4 tracking-tight uppercase">Ghoenk<span class="text-cyan-500">.</span></h3>
            <p class="text-sm font-medium leading-relaxed max-w-sm">
              Perlengkapan Pesta siap sedia. Menyediakan sound system, lighting, dan perlengkapan panggung premium untuk menyukseskan setiap momen spesial Anda.
            </p>
          </div>
          <div>
            <h4 class="text-white font-bold mb-4 uppercase tracking-wider text-sm">Perusahaan</h4>
            <ul class="space-y-3 text-sm font-medium">
              <li><router-link to="/" class="hover:text-cyan-400 transition-colors">Tentang Kami</router-link></li>
              <li><router-link to="/catalog" class="hover:text-cyan-400 transition-colors">Katalog Alat</router-link></li>
              <li><router-link to="/documentation" class="hover:text-cyan-400 transition-colors">Dokumentasi</router-link></li>
              <li><router-link to="/sell" class="hover:text-cyan-400 transition-colors">Jual Beli</router-link></li>
              <li><router-link to="/contact" class="hover:text-cyan-400 transition-colors">Kontak</router-link></li>
            </ul>
          </div>
          <div>
            <h4 class="text-white font-bold mb-4 uppercase tracking-wider text-sm">Legal & Dukungan</h4>
            <ul class="space-y-3 text-sm font-medium">
              <li><a href="#" class="hover:text-cyan-400 transition-colors">Syarat Ketentuan</a></li>
              <li><a href="#" class="hover:text-cyan-400 transition-colors">Kebijakan Privasi</a></li>
              <li><a href="#" class="hover:text-cyan-400 transition-colors">Perjanjian Sewa</a></li>
              <li><a href="#" class="hover:text-cyan-400 transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>
        <div class="pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p class="text-sm font-medium">&copy; 2026 Ghoenk Production. Hak Cipta Dilindungi.</p>
          <div class="flex gap-6">
            <a href="#" class="hover:text-cyan-400 transition-colors">
              <span class="sr-only">Facebook</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"/></svg>
            </a>
            <a href="#" class="hover:text-cyan-400 transition-colors">
              <span class="sr-only">Instagram</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>

    <!-- CART SLIDE-OUT PANEL (LIGHT THEME) -->
    <div v-if="!isAdminRoute && cartStore.isCartOpen" class="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div class="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm transition-opacity" @click="cartStore.isCartOpen = false"></div>
      
      <div class="fixed inset-y-0 right-0 max-w-md w-full flex">
        <div class="w-full h-full bg-white border-l border-gray-200 shadow-2xl flex flex-col">
          
          <!-- Cart Header -->
          <div class="px-6 py-5 flex items-center justify-between border-b border-gray-100 bg-white">
            <h2 class="text-xl font-black text-zinc-900 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Keranjang Anda
            </h2>
            <button @click="cartStore.isCartOpen = false" class="text-gray-400 hover:text-red-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="flex-1 overflow-y-auto p-6 space-y-6">
            <!-- Order Details Form -->
            <div class="bg-gray-50 p-5 rounded-xl border border-gray-100 space-y-4">
              <h3 class="text-sm font-bold text-zinc-900 mb-2 flex items-center gap-2">
                <div class="w-1.5 h-4 bg-yellow-400 rounded-sm"></div> Data Pemesan & Acara
              </h3>
              
              <div>
                <label class="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Nama Lengkap</label>
                <input v-model="cartStore.customerName" type="text" placeholder="Masukkan nama Anda" class="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-zinc-900 font-medium focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors">
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Email</label>
                <input v-model="cartStore.customerEmail" type="email" placeholder="email@contoh.com" class="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-zinc-900 font-medium focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors">
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Lokasi Acara</label>
                <input v-model="cartStore.location" type="text" placeholder="Gedung / Alamat lengkap" class="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-zinc-900 font-medium focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors">
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Tanggal Mulai</label>
                  <input v-model="cartStore.startDate" type="date" class="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-zinc-900 text-sm font-medium focus:outline-none focus:border-cyan-500">
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Tanggal Selesai</label>
                  <input v-model="cartStore.endDate" type="date" class="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-zinc-900 text-sm font-medium focus:outline-none focus:border-cyan-500">
                </div>
              </div>
              
              <div v-if="cartStore.startDate && cartStore.endDate" class="text-xs font-mono font-bold text-zinc-900 text-right bg-cyan-50 p-2 rounded border border-cyan-100">
                Durasi Sewa: <span class="text-cyan-600">{{ cartStore.daysCount }} Hari</span>
              </div>
            </div>

            <!-- Cart Items -->
            <div v-if="cartStore.items.length === 0" class="text-center py-12 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p class="font-bold">Belum ada alat yang dipilih.</p>
            </div>

            <div v-else class="space-y-4">
              <div v-for="item in cartStore.items" :key="item.id" class="flex gap-4 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                <div class="w-20 h-20 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-50">
                  <img :src="item.image_url" class="w-full h-full object-cover">
                </div>
                <div class="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 class="text-sm font-bold text-zinc-900 line-clamp-2 leading-tight">{{ item.name }}</h4>
                    <p class="text-xs font-bold text-gray-500 mt-1">{{ formatRupiah(item.price_per_day).split(',')[0] }}<span class="text-gray-400 text-[10px] font-normal">/hari</span></p>
                  </div>
                  <div class="flex items-center justify-between mt-2">
                    <div class="flex items-center gap-1 bg-gray-50 rounded-md p-1 border border-gray-200">
                      <button @click="cartStore.updateQuantity(item, -1)" class="text-gray-500 hover:text-zinc-900 bg-white hover:bg-gray-100 w-6 h-6 rounded flex items-center justify-center font-bold border border-gray-200 shadow-sm">-</button>
                      <span class="text-xs font-mono font-bold w-6 text-center text-zinc-900">{{ item.quantity }}</span>
                      <button @click="cartStore.updateQuantity(item, 1)" class="text-gray-500 hover:text-zinc-900 bg-white hover:bg-gray-100 w-6 h-6 rounded flex items-center justify-center font-bold border border-gray-200 shadow-sm">+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Cart Footer -->
          <div class="p-6 bg-white border-t border-gray-100 space-y-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div class="flex justify-between text-sm font-medium text-gray-500">
              <span>Subtotal Alat/Hari</span>
              <span class="font-mono text-zinc-900">{{ formatRupiah(cartStore.cartSubtotal) }}</span>
            </div>
            <div class="flex justify-between text-sm font-medium text-gray-500">
              <span>Durasi Sewa</span>
              <span class="font-mono text-zinc-900">{{ cartStore.daysCount }} Hari</span>
            </div>
            <div class="flex justify-between items-end pt-4 border-t border-gray-100">
              <span class="text-lg font-bold text-zinc-900">Total</span>
              <span class="text-2xl font-black text-zinc-900">{{ formatRupiah(cartStore.grandTotal).split(',')[0] }}</span>
            </div>
            
            <button 
              @click="checkoutWhatsApp"
              class="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-yellow-400 py-4 rounded-lg font-black text-base transition-all mt-4 shadow-sm"
            >
              Pesan Sekarang
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
