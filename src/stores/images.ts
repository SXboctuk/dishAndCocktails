import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const useImagesStore = defineStore('app/images', () => {
  const images = ref<Record<string, string>>({})

  function getImage(url: string) {
    const pending = ref<boolean>(false)
    const error = ref<string | null>(null)
    function fetch(url: string) {
      error.value = null
      pending.value = true

      axios
        .get<Blob>(url, { responseType: 'blob' })
        .then((res) => {
          const imageBinary = res.data

          if (imageBinary) {
            try {
              const imageObjectURL = URL.createObjectURL(imageBinary)
              images.value[url] = imageObjectURL
            } catch {
              throw new Error('Creating image object URL failed')
            }
          } else {
            throw new Error('Image not found')
          }
        })
        .catch((e: Error) => (error.value = e.message))
        .finally(() => (pending.value = false))
    }

    if (!images.value[url]) {
      fetch(url)
    }
    return { error, pending, imageSrc: computed(() => images.value[url]) }
  }

  return { getImage }
})

export default useImagesStore
