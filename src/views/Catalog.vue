<script setup>
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()

// MOCK DATA
const products = [
  {
    id: 1,
    name: 'Line Array System L-Acoustics K2',
    category: 'Sound',
    badge: '5000W',
    price_per_day: 15000000,
    image_url: 'https://placehold.co/400x300/1e293b/06b6d4?text=Line+Array'
  },
  {
    id: 2,
    name: 'Par LED RGBW',
    category: 'Lighting',
    badge: '54x3W',
    price_per_day: 150000,
    image_url: 'https://placehold.co/400x300/1e293b/06b6d4?text=Par+LED+54'
  },
  {
    id: 3,
    name: 'Moving Head Beam 230W',
    category: 'Lighting',
    badge: '230W',
    price_per_day: 400000,
    image_url: 'https://placehold.co/400x300/1e293b/06b6d4?text=Moving+Head'
  },
  {
    id: 4,
    name: 'Generator Set Cummins',
    category: 'Power',
    badge: '40 KVA',
    price_per_day: 1500000,
    image_url: 'https://placehold.co/400x300/1e293b/06b6d4?text=Genset+40KVA'
  },
  {
    id: 5,
    name: 'Rigging Stage Alumunium',
    category: 'Stage',
    badge: '10x8m',
    price_per_day: 3500000,
    image_url: 'https://placehold.co/400x300/1e293b/06b6d4?text=Rigging+Stage'
  },
  {
    id: 6,
    name: 'Digital Mixer Allen & Heath SQ6',
    category: 'Sound',
    badge: '48 Ch',
    price_per_day: 1200000,
    image_url: 'https://placehold.co/400x300/1e293b/06b6d4?text=Mixer+SQ6'
  }
]

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

  const phoneNumber = '6281234567890'
  
  let text = `*ORDER BARU - PHOENIX PRO*\n\n`
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
  <div class="pt-24 pb-12 bg-slate-950 min-h-screen">
    <!-- CATALOG GRID -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-black text-white tracking-tight mb-8">
        EQUIPMENT RENTAL
      </h2>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="product in products" :key="product.id" class="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden hover:border-cyan-500/50 transition-colors group">
          <div class="relative h-48 overflow-hidden bg-slate-800">
            <img :src="product.image_url" :alt="product.name" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity">
            <div class="absolute top-4 right-4 bg-slate-950/80 backdrop-blur border border-cyan-500 text-cyan-400 text-xs font-mono font-bold px-3 py-1 rounded-sm">
              {{ product.badge }}
            </div>
          </div>
          <div class="p-6">
            <div class="text-xs font-bold tracking-widest text-indigo-400 uppercase mb-2">{{ product.category }}</div>
            <h3 class="text-xl font-bold text-white mb-4 line-clamp-2 min-h-[3.5rem]">{{ product.name }}</h3>
            <div class="flex items-end justify-between mt-auto">
              <div>
                <p class="text-sm text-gray-500 mb-1">Price per Day</p>
                <p class="text-2xl font-black text-yellow-400">{{ formatRupiah(product.price_per_day).split(',')[0] }}</p>
              </div>
              <button @click="cartStore.addToCart(product)" class="bg-indigo-600 hover:bg-indigo-500 text-white w-12 h-12 rounded-lg flex items-center justify-center transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CART SLIDE-OUT PANEL -->
    <div v-if="cartStore.isCartOpen" class="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div class="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" @click="cartStore.isCartOpen = false"></div>
      
      <div class="fixed inset-y-0 right-0 max-w-md w-full flex">
        <div class="w-full h-full bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
          
          <div class="px-6 py-4 flex items-center justify-between border-b border-slate-800">
            <h2 class="text-xl font-bold text-white flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              YOUR CART
            </h2>
            <button @click="cartStore.isCartOpen = false" class="text-gray-400 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="flex-1 overflow-y-auto p-6 space-y-6">
            <div class="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
              <h3 class="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-2">Event Details</h3>
              
              <div>
                <label class="block text-xs text-gray-400 mb-1">Lokasi Acara</label>
                <input v-model="cartStore.location" type="text" placeholder="Gedung / Alamat lengkap" class="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-white focus:outline-none focus:border-indigo-500">
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs text-gray-400 mb-1">Tanggal Mulai</label>
                  <input v-model="cartStore.startDate" type="date" class="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500 [color-scheme:dark]">
                </div>
                <div>
                  <label class="block text-xs text-gray-400 mb-1">Tanggal Selesai</label>
                  <input v-model="cartStore.endDate" type="date" class="w-full bg-slate-900 border border-slate-700 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-indigo-500 [color-scheme:dark]">
                </div>
              </div>
            </div>

            <div v-if="cartStore.items.length === 0" class="text-center py-12 text-gray-500">
              <p>No equipment selected.</p>
            </div>

            <div v-else class="space-y-4">
              <div v-for="item in cartStore.items" :key="item.id" class="flex gap-4 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div class="w-20 h-20 rounded-md bg-slate-800 overflow-hidden shrink-0">
                  <img :src="item.image_url" class="w-full h-full object-cover">
                </div>
                <div class="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 class="text-sm font-bold text-white line-clamp-2 leading-tight">{{ item.name }}</h4>
                    <p class="text-xs text-yellow-400 mt-1">{{ formatRupiah(item.price_per_day).split(',')[0] }}<span class="text-gray-500 text-[10px]">/hari</span></p>
                  </div>
                  <div class="flex items-center justify-between mt-2">
                    <div class="flex items-center gap-3 bg-slate-900 rounded-md px-2 py-1 border border-slate-700">
                      <button @click="cartStore.updateQuantity(item, -1)" class="text-gray-400 hover:text-cyan-400 w-4 h-4">-</button>
                      <span class="text-xs font-mono font-bold w-4 text-center text-white">{{ item.quantity }}</span>
                      <button @click="cartStore.updateQuantity(item, 1)" class="text-gray-400 hover:text-cyan-400 w-4 h-4">+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="p-6 bg-slate-950 border-t border-slate-800 space-y-4">
            <div class="flex justify-between text-sm text-gray-400">
              <span>Durasi Sewa</span>
              <span class="font-mono text-white">{{ cartStore.daysCount }} Hari</span>
            </div>
            <div class="flex justify-between items-end pt-4 border-t border-slate-800">
              <span class="text-lg font-bold text-white">GRAND TOTAL</span>
              <span class="text-2xl font-black text-yellow-400">{{ formatRupiah(cartStore.grandTotal).split(',')[0] }}</span>
            </div>
            
            <button 
              @click="checkoutWhatsApp"
              class="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-xl font-bold text-lg transition-colors mt-4"
            >
              Pesan via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
