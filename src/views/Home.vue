<template>
  <div class="relative min-h-screen pt-24 pb-12 flex items-center justify-center overflow-hidden bg-slate-950">
    <!-- Decorative background elements -->
    <div class="absolute inset-y-0 w-full h-full pointer-events-none" aria-hidden="true">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-3xl"></div>
    </div>
    
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 class="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 uppercase">
        Elevate Your Event with <br class="hidden md:block" />
        <span class="text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">Professional Gear</span>
      </h1>
      <p class="mt-4 max-w-2xl mx-auto text-xl text-gray-400 mb-10">
        Top-tier Sound System, Lighting, and Rigging for any scale. Built for maximum impact and flawless execution.
      </p>
      
      <router-link to="/catalog" class="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-lg font-bold text-lg uppercase tracking-wider shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all hover:scale-105 active:scale-95">
        Lihat Katalog
      </router-link>
    </div>
  </div>

  <!-- ABOUT SECTION -->
  <div class="bg-slate-900 border-t border-slate-800 py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl md:text-5xl font-black text-white tracking-tight mb-8 uppercase">
        TENTANG <span class="text-cyan-400">GHOENK PRODUCTION</span>
      </h2>
      <p class="mt-4 max-w-3xl mx-auto text-xl text-gray-400 leading-relaxed">
        GHOENK PRODUCTION adalah penyedia jasa rental alat pesta, sound system, lighting, dan rigging profesional. 
        Kami siap membuat setiap acara Anda menjadi spektakuler dengan peralatan standar industri dan tim teknisi berpengalaman.
      </p>
    </div>
  </div>
</template>
