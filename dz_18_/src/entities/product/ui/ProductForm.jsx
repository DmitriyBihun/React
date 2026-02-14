import { useState } from 'react'

export default function ProductForm({ product = {}, onSubmit }) {
  const [title, setTitle] = useState(product?.title || '')
  const [price, setPrice] = useState(product?.price || '')
  const [image, setImage] = useState(product?.image || '')
  const [description, setDescription] = useState(product?.description || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...product,
      title,
      price: Number(price),
      image,
      description
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" value={title} onChange={(e) => setTitle(e.target.value)} required />

      <input placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />

      <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image link" type="url" />

      <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />

      <button type="submit">Save</button>
    </form>
  )
}
