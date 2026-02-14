import { useParams, useNavigate } from "react-router-dom"
import { useAddProductMutation, useGetProductByIdQuery, useUpdateProductMutation } from "../../entities/product/api/productApi"
import ProductForm from "../../entities/product/ui/ProductForm"


export default function ProductEdit() {
    const { id } = useParams()
    const navigate = useNavigate()

    const isEdit = Boolean(id)

    const { data: product, isLoading } = useGetProductByIdQuery(id, {
        skip: !isEdit
    })

    const [addProduct] = useAddProductMutation()
    const [updateProduct] = useUpdateProductMutation()

    const handleSubmit = async (formData) => {
        if (isEdit) {
            await updateProduct({ id, data: formData })
        } else {
            await addProduct({
                ...formData,
                createdAt: new Date().toISOString(),
            })
        }

        navigate("/products")
    }

    if (isEdit && isLoading) return <p>Loading...</p>

    return (
        <div>
            <h1>{isEdit ? "Edit Product" : "Add Product"}</h1>
            <ProductForm product={product} onSubmit={handleSubmit} />
        </div>
    )
}
