<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- HERO SECTION -->
    <div class="relative pt-24 pb-20 md:pt-36 md:pb-32 overflow-hidden bg-slate-100 flex items-center justify-center min-h-[600px]">
      <!-- Background Image (Simulated with a placeholder or CSS for now) -->
      <div class="absolute inset-0 w-full h-full">
        <img src="https://placehold.co/1920x800/e2e8f0/cbd5e1?text=Warehouse+Background" class="w-full h-full object-cover opacity-60 mix-blend-multiply blur-sm">
        <div class="absolute inset-0 bg-white/40"></div>
      </div>
      
      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-10">
        <h1 class="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-6">
          Industrial Reliability, <br/>
          On Demand.
        </h1>
        <p class="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-slate-700 font-medium mb-10">
          Premium production and construction equipment, meticulously maintained and ready for your next major project.
        </p>
        
        <!-- Search Bar -->
        <div class="max-w-2xl mx-auto bg-white p-2 rounded-lg shadow-lg flex items-center border border-gray-200 focus-within:ring-2 focus-within:ring-slate-900 transition-all">
          <div class="pl-4 pr-2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input type="text" placeholder="What do you need to borrow?" class="flex-1 py-3 px-2 text-slate-900 bg-transparent focus:outline-none placeholder-gray-400 font-medium">
          <router-link to="/catalog" class="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-md font-semibold text-sm transition-colors whitespace-nowrap">
            Find Equipment
          </router-link>
        </div>
      </div>
    </div>

    <!-- FEATURED INVENTORY -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="flex justify-between items-end mb-8">
        <div>
          <h2 class="text-3xl font-black text-slate-900 tracking-tight">Featured Inventory</h2>
          <p class="text-slate-500 mt-2 font-medium">Browse our most requested equipment categories.</p>
        </div>
        <router-link to="/catalog" class="text-sm font-bold text-slate-900 hover:text-blue-600 flex items-center gap-1 transition-colors">
          View All 
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </router-link>
      </div>

      <!-- Bento Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Main Large Card -->
        <router-link to="/catalog" class="md:col-span-2 relative h-[500px] rounded-xl overflow-hidden group border border-gray-200 block shadow-sm hover:shadow-md transition-shadow">
          <img src="https://placehold.co/800x600/e2e8f0/94a3b8?text=Industrial+Generator" class="absolute inset-0 w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700">
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div class="absolute bottom-0 left-0 p-8">
            <span class="bg-white/90 text-slate-900 text-xs font-bold px-2 py-1 rounded mb-3 inline-block uppercase tracking-wider">CATEGORY</span>
            <h3 class="text-3xl font-black text-white mb-2">Heavy Construction</h3>
            <p class="text-gray-200 font-medium text-sm">Earthmovers, generators, and heavy-duty site equipment.</p>
          </div>
        </router-link>
        
        <!-- Right Column Cards -->
        <div class="flex flex-col gap-6">
          <router-link to="/catalog" class="relative h-[238px] rounded-xl overflow-hidden group border border-gray-200 block shadow-sm hover:shadow-md transition-shadow">
            <img src="https://placehold.co/400x300/e2e8f0/94a3b8?text=Stage+Lighting" class="absolute inset-0 w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700">
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-6">
              <h3 class="text-xl font-black text-white">Stage Lighting</h3>
            </div>
          </router-link>
          
          <router-link to="/catalog" class="relative h-[238px] rounded-xl overflow-hidden group border border-gray-200 block shadow-sm hover:shadow-md transition-shadow">
            <img src="https://placehold.co/400x300/e2e8f0/94a3b8?text=Audio+Systems" class="absolute inset-0 w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700">
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div class="absolute bottom-0 left-0 p-6">
              <h3 class="text-xl font-black text-white">Audio Systems</h3>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <!-- THE GHOENK STANDARD -->
    <div class="bg-gray-100/50 py-24 border-t border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-black text-slate-900 text-center mb-12 tracking-tight">The Ghoenk Standard</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3">Impeccable Maintenance</h3>
            <p class="text-slate-500 text-sm leading-relaxed font-medium">Every item is rigorously tested and serviced after every rental. We guarantee performance-ready gear.</p>
          </div>
          
          <div class="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3">Frictionless Logistics</h3>
            <p class="text-slate-500 text-sm leading-relaxed font-medium">Direct-to-site delivery and pickup options available for all heavy machinery and bulk orders.</p>
          </div>
          
          <div class="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3">24/7 Expert Support</h3>
            <p class="text-slate-500 text-sm leading-relaxed font-medium">On-call technicians ready to assist with setup or troubleshoot any issues during your rental period.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
