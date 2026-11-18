import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { ButtonLink } from "./components/ui";
import Home from "./screens/Home";
import Shop from "./screens/Shop";
import BookDetail from "./screens/BookDetail";
import Cart from "./screens/Cart";
import Checkout from "./screens/Checkout";
import OrderConfirmed from "./screens/OrderConfirmed";
import Offers from "./screens/Offers";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/books/:slug" element={<BookDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmed" element={<OrderConfirmed />} />
        <Route path="/offers" element={<Offers />} />
        <Route
          path="*"
          element={
            <div className="mx-auto max-w-xl px-5 py-32 text-center">
              <h1 className="font-display text-4xl font-medium">Page not found</h1>
              <ButtonLink to="/" className="mt-6">
                Back to home
              </ButtonLink>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}
