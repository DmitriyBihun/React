import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'

const firebaseConfig = {
    apiKey: "AIzaSyB2t1drOE-r8HiP_d0thQVhkRywfFPu4dc",
    authDomain: "planner-a67e6.firebaseapp.com",
    projectId: "planner-a67e6",
    storageBucket: "planner-a67e6.firebasestorage.app",
    messagingSenderId: "884025217108",
    appId: "1:884025217108:web:635884d643466da4789dc1"
}
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export default db
