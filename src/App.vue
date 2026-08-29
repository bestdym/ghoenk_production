<script setup>
import { useCartStore } from './stores/cart'
import Navbar from './components/Navbar.vue'

const cartStore = useCartStore()

const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number)
}

const checkoutWhatsApp = () => {
  if (!cartStore.startDate || !cartStore.endDate || !cartStore.location) {
    alert("Harap lengkapi Tanggal dan Lokasi Acara!")
    return
  }
  if (cartStore.items.length === 0) {
    alert("Keranjang masih kosong!")
    return
  }

  const phoneNumber = '6285786577918'
  
  let text = `*ORDER BARU - GHOENK PRODUCTION*\n\n`
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
    
    <Navbar />

    <!-- MAIN CONTENT -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- FOOTER -->
    <footer class="bg-[#333333] text-gray-400 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="text-sm font-medium">
          <p class="text-white font-bold mb-1">Ghoenk Production</p>
          <p>&copy; 2024 Ghoenk Production. Industrial Reliability.</p>
        </div>
        <div class="flex gap-6 text-sm font-medium">
          <a href="#" class="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" class="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" class="hover:text-white transition-colors">Rental Agreement</a>
          <a href="#" class="hover:text-white transition-colors">Contact Us</a>
        </div>
      </div>
    </footer>

    <!-- CART SLIDE-OUT PANEL (LIGHT THEME) -->
    <div v-if="cartStore.isCartOpen" class="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" @click="cartStore.isCartOpen = false"></div>
      
      <div class="fixed inset-y-0 right-0 max-w-md w-full flex">
        <div class="w-full h-full bg-white border-l border-gray-200 shadow-2xl flex flex-col">
          
          <!-- Cart Header -->
          <div class="px-6 py-5 flex items-center justify-between border-b border-gray-100 bg-white">
            <h2 class="text-xl font-bold text-slate-900 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Your Cart
            </h2>
            <button @click="cartStore.isCartOpen = false" class="text-gray-400 hover:text-slate-900 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="flex-1 overflow-y-auto p-6 space-y-6">
            <!-- Order Details Form -->
            <div class="bg-gray-50 p-5 rounded-xl border border-gray-100 space-y-4">
              <h3 class="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                <div class="w-1.5 h-4 bg-blue-500 rounded-sm"></div> Event Details
              </h3>
              
              <div>
                <label class="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Lokasi Acara</label>
                <input v-model="cartStore.location" type="text" placeholder="Gedung / Alamat lengkap" class="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-slate-900 font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors">
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Tanggal Mulai</label>
                  <input v-model="cartStore.startDate" type="date" class="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-slate-900 text-sm font-medium focus:outline-none focus:border-blue-500">
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wider">Tanggal Selesai</label>
                  <input v-model="cartStore.endDate" type="date" class="w-full bg-white border border-gray-200 rounded-md px-3 py-2 text-slate-900 text-sm font-medium focus:outline-none focus:border-blue-500">
                </div>
              </div>
              
              <div v-if="cartStore.startDate && cartStore.endDate" class="text-xs font-mono font-bold text-blue-600 text-right bg-blue-50 p-2 rounded border border-blue-100">
                Durasi Sewa: {{ cartStore.daysCount }} Hari
              </div>
            </div>

            <!-- Cart Items -->
            <div v-if="cartStore.items.length === 0" class="text-center py-12 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p class="font-bold">No equipment selected.</p>
            </div>

            <div v-else class="space-y-4">
              <div v-for="item in cartStore.items" :key="item.id" class="flex gap-4 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                <div class="w-20 h-20 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-50">
                  <img :src="item.image_url" class="w-full h-full object-cover">
                </div>
                <div class="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 class="text-sm font-bold text-slate-900 line-clamp-2 leading-tight">{{ item.name }}</h4>
                    <p class="text-xs font-bold text-slate-500 mt-1">{{ formatRupiah(item.price_per_day).split(',')[0] }}<span class="text-gray-400 text-[10px] font-normal">/hari</span></p>
                  </div>
                  <div class="flex items-center justify-between mt-2">
                    <div class="flex items-center gap-1 bg-gray-50 rounded-md p-1 border border-gray-200">
                      <button @click="cartStore.updateQuantity(item, -1)" class="text-gray-500 hover:text-slate-900 bg-white hover:bg-gray-100 w-6 h-6 rounded flex items-center justify-center font-bold border border-gray-200 shadow-sm">-</button>
                      <span class="text-xs font-mono font-bold w-6 text-center text-slate-900">{{ item.quantity }}</span>
                      <button @click="cartStore.updateQuantity(item, 1)" class="text-gray-500 hover:text-slate-900 bg-white hover:bg-gray-100 w-6 h-6 rounded flex items-center justify-center font-bold border border-gray-200 shadow-sm">+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Cart Footer -->
          <div class="p-6 bg-white border-t border-gray-100 space-y-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div class="flex justify-between text-sm font-medium text-slate-500">
              <span>Subtotal Alat/Hari</span>
              <span class="font-mono text-slate-900">{{ formatRupiah(cartStore.cartSubtotal) }}</span>
            </div>
            <div class="flex justify-between text-sm font-medium text-slate-500">
              <span>Durasi Sewa</span>
              <span class="font-mono text-slate-900">{{ cartStore.daysCount }} Hari</span>
            </div>
            <div class="flex justify-between items-end pt-4 border-t border-gray-100">
              <span class="text-lg font-bold text-slate-900">Total</span>
              <span class="text-2xl font-black text-slate-900">{{ formatRupiah(cartStore.grandTotal).split(',')[0] }}</span>
            </div>
            
            <button 
              @click="checkoutWhatsApp"
              class="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-lg font-bold text-base transition-all mt-4"
            >
              Pesan Sekarang
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
