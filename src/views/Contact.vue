<template>
  <div class="pt-32 pb-20 bg-gray-50 min-h-screen flex items-center justify-center">
    <div class="max-w-4xl w-full mx-auto px-4">
      
      <div class="text-center mb-12">
        <h1 class="text-4xl font-black text-slate-900 tracking-tight mb-4">Get in Touch</h1>
        <p class="text-lg text-slate-500 font-medium">Have a question or need custom equipment? Send us a message.</p>
      </div>

      <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row">
        
        <!-- Contact Info Side -->
        <div class="bg-slate-900 text-white p-10 md:w-2/5 flex flex-col justify-between">
          <div>
            <h3 class="text-2xl font-bold mb-2">Contact Information</h3>
            <p class="text-gray-400 mb-8 text-sm">Fill up the form and our team will get back to you within 24 hours.</p>
            
            <div class="space-y-6">
              <div class="flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span class="font-medium">+62 857 8657 7918</span>
              </div>
              <div class="flex items-center gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span class="font-medium">hello@ghoenk.com</span>
              </div>
              <div class="flex items-start gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-400 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <form @submit.prevent class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                <input type="text" class="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-gray-50">
              </div>
              <div>
                <label class="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                <input type="text" class="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-gray-50">
              </div>
            </div>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2">Email</label>
              <input type="email" class="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-gray-50">
            </div>

            <div>
              <label class="block text-sm font-bold text-slate-700 mb-2">Message</label>
              <textarea rows="4" placeholder="Write your message here..." class="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-gray-50 resize-none"></textarea>
            </div>

            <button type="submit" class="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-8 rounded-full transition-all shadow-md float-right">
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>
