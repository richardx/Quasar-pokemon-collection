import { boot } from 'quasar/wrappers'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { useUserStore } from '../stores'

// Firebase konfiguration
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
}

// Initialisér Firebase
const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)

export default boot(({ app }) => {
  const userStore = useUserStore()

  // Firebase Auth observer
  onAuthStateChanged(auth, (currentUser) => {
    userStore.setUser(currentUser)
    userStore.isAuthReady = true
  })

  // Gør auth og db tilgængelige globalt hvis nødvendigt
  app.config.globalProperties.$auth = auth
  app.config.globalProperties.$db = db
})

export { auth, db }
