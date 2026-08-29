import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../lib/supabase'
import Home from '../views/Home.vue'
import Catalog from '../views/Catalog.vue'
import Contact from '../views/Contact.vue'
import Sell from '../views/Sell.vue'
import Documentation from '../views/Documentation.vue'
import AdminHome from '../views/admin/Home.vue'

// Admin Views
import AdminLogin from '../views/admin/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/catalog', name: 'catalog', component: Catalog },
    { path: '/contact', name: 'contact', component: Contact },
    { path: '/sell', name: 'sell', component: Sell },
    { path: '/documentation', name: 'documentation', component: Documentation },
    
    // Admin Routes
    { 
      path: '/admin/login', 
      name: 'admin-login', 
      component: AdminLogin 
    },
    { 
      path: '/admin', 
      component: () => import('../views/admin/Dashboard.vue'),
      meta: { requiresAuth: true },
      children: [
        { path: '', component: AdminHome },
        { path: 'catalog', name: 'admin-catalog', component: () => import('../views/admin/ManageCatalog.vue') },
        { path: 'doc', name: 'admin-doc', component: () => import('../views/admin/ManageDoc.vue') },
        { path: 'sell', name: 'admin-sell', component: () => import('../views/admin/ManageSell.vue') },
        { path: 'settings', name: 'admin-settings', component: () => import('../views/admin/ManageSettings.vue') }
      ]
    }
  ]
})

// Navigation Guard
router.beforeEach(async (to, from, next) => {
  const { data: { session } } = await supabase.auth.getSession()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !session) {
    next('/admin/login')
  } else if (to.path === '/admin/login' && session) {
    next('/admin')
  } else {
    next()
  }
})

export default router
