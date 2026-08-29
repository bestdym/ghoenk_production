import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../lib/supabase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(true)

  const initialize = async () => {
    loading.value = true
    const { data: { session } } = await supabase.auth.getSession()
    user.value = session?.user || null
    loading.value = false

    supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user || null
    })
  }

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    return data
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  return {
    user,
    loading,
    initialize,
    login,
    logout
  }
})
