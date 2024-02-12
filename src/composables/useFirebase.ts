import { store, app, auth } from '@/firebase'

const useFirebase = () => {
  return { app, store, auth }
}

export default useFirebase
