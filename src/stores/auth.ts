import { auth } from '@/firebase'
import type { FirebaseError } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type User
} from 'firebase/auth'

import { defineStore } from 'pinia'

const useAuthStore = defineStore('app/auth', {
  state: () => ({
    user: null as User | null,
    error: null as string | null,
    loading: false as boolean
  }),
  getters: {
    isAuthenticated(state) {
      return state.user ? true : false
    }
  },
  actions: {
    login(email: string, password: string) {
      this.error = null
      this.loading = true
      signInWithEmailAndPassword(auth, email, password)
        .finally(() => {
          this.loading = false
        })
        .catch((e: FirebaseError) => {
          this.error = e.message
        })
    },
    signUp(email: string, password: string) {
      this.error = null
      this.loading = true
      createUserWithEmailAndPassword(auth, email, password)
        .finally(() => {
          this.loading = false
        })
        .catch((e: FirebaseError) => {
          this.error = e.message
        })
    },
    loguot() {
      this.error = null
      this.loading = true
      signOut(auth)
        .catch((e: FirebaseError) => {
          this.error = e.message
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
})

auth.onAuthStateChanged((user) => {
  const store = useAuthStore()
  if (user) {
    store.user = user
  } else {
    store.user = user
  }
})

export default useAuthStore
