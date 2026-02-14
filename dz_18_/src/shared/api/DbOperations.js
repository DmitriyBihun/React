
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  startAfter,
  setDoc,
  deleteField
} from 'firebase/firestore/lite'
import db from '../firebase/firebase'

class DbOperations {
  constructor(name) {
    this.collectionRef = collection(db, name)
  }

  // --- CARTS SPECIALIZED METHODS ---
  // get cart object for user_id
  async getCartByUserId(userId) {
    const docRef = doc(this.collectionRef, userId);
    const snap = await getDoc(docRef);
    if (!snap.exists()) return {};
    return snap.data();
  }

  // set full cart object for user_id
  async setCartByUserId(userId, cartObj) {
    await setDoc(doc(this.collectionRef, userId), cartObj);
    return true;
  }

  // update/add one product in cart for user_id
  async updateCartProduct(userId, productId, productData) {
    await setDoc(
      doc(this.collectionRef, userId),
      { [productId]: productData },
      { merge: true }  
    )
    return true
  }

  // remove one product from cart for user_id
  async removeCartProduct(userId, productId) {
    const docRef = doc(this.collectionRef, userId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        [productId]: deleteField()
      })
    }
    return true
  }

  async getAll() {
    const snapshot = await getDocs(this.collectionRef)
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  }

  async getAllPaginated({ page = 1, perPage = 6, cursors = [] }) {
    let q

    const realLimit = perPage + 1 // беремо на 1 більше

    if (page === 1) {
      q = query(this.collectionRef, orderBy('title'), limit(realLimit))
    } else {
      const cursor = cursors[page - 2]
      if (!cursor) throw new Error('Cursor not found')
      q = query(
        this.collectionRef,
        orderBy('title'),
        startAfter(cursor),
        limit(realLimit),
      )
    }

    const snapshot = await getDocs(q)
    const docs = snapshot.docs

    const hasMore = docs.length > perPage

    const data = docs
      .slice(0, perPage)
      .map((doc) => ({ id: doc.id, ...doc.data() }))
    const lastVisible = docs[docs.length - 2] || null

    return { data, cursor: lastVisible, hasMore }
  }

  async getById(id) {
    const snap = await getDoc(doc(this.collectionRef, id))
    return { id: snap.id, ...snap.data() }
  }

  async setWithId(id, data) {
    await setDoc(doc(this.collectionRef, id), data)
    return true
  }

  async add(data) {
    await addDoc(this.collectionRef, data)
    return true
  }
  async update(id, data) {
    await updateDoc(doc(this.collectionRef, id), data)
    return true
  }
  async delete(id) {
    await deleteDoc(doc(this.collectionRef, id))
    return true
  }
  // --- FAVORITES SPECIALIZED METHODS ---
  async getFavouritesByUserId(userId) {
    const docRef = doc(this.collectionRef, userId);
    const snap = await getDoc(docRef);
    if (!snap.exists()) return {};
    return snap.data();
  }

  async setFavouritesByUserId(userId, favObj) {
    await setDoc(doc(this.collectionRef, userId), favObj);
    return true;
  }

  async updateFavouriteProduct(userId, productId, productData) {
    await setDoc(
      doc(this.collectionRef, userId),
      { [productId]: productData },
      { merge: true }
    )
    return true;
  }

  async removeFavouriteProduct(userId, productId) {
    const docRef = doc(this.collectionRef, userId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        [productId]: deleteField()
      })
    }
    return true;
  }
}

export default DbOperations
