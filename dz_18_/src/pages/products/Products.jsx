import { useState } from "react"
import { useSelector } from "react-redux"
import { useGetAllProductsQuery } from "../../entities/product/api/productApi"
import ProductList from "../../entities/product/ui/ProductList"
import { selectAuthUser } from "../../features/auth/api/authSlice"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next";

export default function Products() {
    const { t } = useTranslation()
    const { data, isLoading, error } = useGetAllProductsQuery()
    const user = useSelector(selectAuthUser)

    const [editingProduct, setEditingProduct] = useState(null)

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error</p>

    return (
        <div style={{textAlign: 'center'}}>
            <h1>{t('products.title')}</h1>

            {user?.role === 'admin' && (
                <Link to='/products/new'>
                    <button>+ {t('products.addProduct')}</button>
                </Link>
            )}

            <ProductList
                products={data}
                onEdit={setEditingProduct}
            />
        </div>
    )
}
