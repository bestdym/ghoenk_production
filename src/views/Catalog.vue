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
  <div class="pt-24 pb-20 bg-gray-50 min-h-screen">
    <!-- CATALOG GRID -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-12 text-center">
        <h2 class="text-4xl font-black text-slate-900 tracking-tight">
          Equipment Catalog
        </h2>
        <p class="text-slate-500 mt-4 text-lg font-medium">Select the equipment you need for your next project.</p>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="product in products" :key="product.id" class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
          <div class="relative h-48 overflow-hidden bg-gray-100">
            <img :src="product.image_url" :alt="product.name" class="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500">
            <div class="absolute top-4 right-4 bg-white/90 backdrop-blur border border-gray-200 text-slate-900 text-xs font-bold px-3 py-1 rounded shadow-sm">
              {{ product.badge }}
            </div>
          </div>
          <div class="p-6">
            <div class="text-xs font-bold tracking-widest text-blue-500 uppercase mb-2">{{ product.category }}</div>
            <h3 class="text-xl font-bold text-slate-900 mb-4 line-clamp-2 min-h-[3.5rem]">{{ product.name }}</h3>
            <div class="flex items-end justify-between mt-auto">
              <div>
                <p class="text-sm font-medium text-slate-500 mb-1">Price per Day</p>
                <p class="text-2xl font-black text-slate-900">{{ formatRupiah(product.price_per_day).split(',')[0] }}</p>
              </div>
              <button @click="cartStore.addToCart(product)" class="bg-slate-900 hover:bg-slate-800 text-white w-12 h-12 rounded-lg flex items-center justify-center transition-colors shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
