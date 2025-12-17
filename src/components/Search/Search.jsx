import { useEffect, useId, useState } from "react";
import useDebounce from "./useDebounce";
import style from "./Search.module.css";

function Search() {

    const [searchTerm, setSearchTerm] = useState('')
    const debauncedSearchTerm = useDebounce(searchTerm, 500)
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const productId = useId()

    useEffect(() => {

        const controller = new AbortController()
        setLoading(true)

        async function fethData() {
            try {
                const url = debauncedSearchTerm
                    ? `https://products-api-bipy.onrender.com/api/products/search?q=${debauncedSearchTerm}`
                    : `https://products-api-bipy.onrender.com/api/products/`

                const res = await fetch(url, { signal: controller.signal })

                const data = await res.json()
                setResults(data)
            }
            catch (err) {
                if (err.name !== 'AbortError') console.log(err);
            }
            finally {
                setLoading(false)
            }
        }

        fethData()

        return () => controller.abort()
    }, [debauncedSearchTerm])

    return (
        <section className={style.searchSection}>
            <div className={style.containerInput}>
                <label htmlFor={productId}>Товари.</label>
                <input type="text" id={productId}
                    value={searchTerm}
                    placeholder="Введіть назву товару"
                    className={style.productInput}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading && <p>Loading...</p>}

            {!loading && results.length === 0 && <p>No results.</p>}

            <ul className={style.productList}>
                {results.map(product => (
                    <li key={product.id} className={style.product} >
                        <img src={product.imageUrl}
                            alt={product.name}
                        />
                        <span>{product.name} - ${product.price}</span>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Search;