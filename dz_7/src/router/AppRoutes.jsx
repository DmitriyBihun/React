import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import ProductList from "../pages/products/ProductList";
import Contacts from "../pages/Contacts";
import PaymentRules from "../pages/PaymentRules";
import Page404 from "../pages/Page404";
import Layout from "../components/layout/Layout";
import Shop from "../pages/products/Shop";
import ProductDetails from "../pages/products/ProductDetails";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="products" element={<Shop />}>
                    <Route index element={<ProductList />} />
                    <Route path=":category" element={<ProductList />} />
                    <Route path=":category/:id" element={<ProductDetails />} />
                </Route>
                <Route path="contacts" element={<Contacts />} />
                <Route path="rules" element={<PaymentRules />} />
                <Route path="*" element={<Page404 />} />
            </Route>
        </Routes>
    );
}


export default AppRoutes; 