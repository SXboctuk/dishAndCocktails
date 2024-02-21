import { computed, ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where
} from 'firebase/firestore'
import { auth, store } from '@/firebase'
import useAuthStore from '../auth'

const USER_COLLECTION_NAME = 'userCocktailLikes'

const authStore = useAuthStore()
const { isAuthenticated, user } = storeToRefs(authStore)

const useUserLikesStore = defineStore('cocktails/userLikes', () => {
  const userLikes = ref<{ cocktailId: string; dbId: string }[]>([])
  const pending = ref(false)
  const error = ref<string | null>(null)

  const findInStore = (id: string) => {
    return userLikes.value.find((like) => like.cocktailId === id)
  }
  function addFunc(id: string) {
    const pendingAdd = ref(true)
    const errorAdd = ref<string | null>(null)

    const add = () => {
      const dbId = findInStore(id)
      if (dbId) return
      if (isAuthenticated) {
        pendingAdd.value = true
        addDoc(collection(store, USER_COLLECTION_NAME), {
          userId: user.value!.uid,
          cocktailId: id
        })
          .catch((e) => {
            errorAdd.value = e
          })
          .finally(() => (pendingAdd.value = false))
      } else {
        pendingAdd.value = false
        errorAdd.value = 'User not authenticated'
      }
    }
    return { pendingAdd, errorAdd, add }
    // todo
  }
  function removeFunc(id: string) {
    const pendingRemove = ref(false)
    const errorRemove = ref<string | null>(null)

    const remove = () => {
      const dbId = findInStore(id)?.dbId

      pendingRemove.value = true

      if (dbId) {
        deleteDoc(doc(store, USER_COLLECTION_NAME, dbId))
          .catch((e) => {
            errorRemove.value = e
          })
          .finally(() => {
            pendingRemove.value = false
          })
      } else {
        errorRemove.value = 'DB id not found'
        pendingRemove.value = false
      }
    }
    return { pendingRemove, errorRemove, remove }
  }

  const isLiked = computed(() => (id: string) => {
    return userLikes.value.find((like) => like.cocktailId === id)
  })

  auth.onAuthStateChanged((user) => {
    if (user) {
      onSnapshot(
        query(
          collection(store, USER_COLLECTION_NAME),
          where('userId', '==', user.uid)
        ),
        (snapshot) => {
          const likes: { cocktailId: string; dbId: string }[] = []
          snapshot.docs.forEach((doc) => {
            likes.push({
              cocktailId: doc.data().cocktailId,
              dbId: doc.id
            })
          })
          userLikes.value = [...likes]
        }
      )
    } else {
      userLikes.value = []
    }
  })

  return {
    userLikes,
    pending,
    error,
    addFunc,
    removeFunc,
    isLiked
  }
})

export default useUserLikesStore
