import "./App.css";
import "./styles/sdk.css";
import "./styles/fonts.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { Store } from "./components/Store";
import { Cart } from "./components/Cart";
import { CheckoutContainer } from "./components/CheckoutContainer";
import { Track } from "./components/Track";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate replace to="/store" />} />
          <Route path="/store" element={<Store />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutContainer />} />
          <Route path="/tracking" element={<Track />} />
          <Route path="/tracking/:orderId" element={<Track />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
