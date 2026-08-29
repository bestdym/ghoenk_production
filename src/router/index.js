import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Catalog from '../views/Catalog.vue'
import Contact from '../views/Contact.vue'
import Sell from '../views/Sell.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/catalog', name: 'catalog', component: Catalog },
    { path: '/contact', name: 'contact', component: Contact },
    { path: '/sell', name: 'sell', component: Sell }
  ]
})

export default router
