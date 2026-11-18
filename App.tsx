import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { CartProvider } from "./store/cart";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </BrowserRouter>
  );
}
