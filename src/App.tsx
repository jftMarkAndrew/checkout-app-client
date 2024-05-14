import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreContainer } from "./components/StoreContainer";
import { Track } from "./components/Track";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StoreContainer />} />
        <Route path="/tracking" element={<Track />} />
        <Route path="/tracking/:orderId" element={<Track />} />
      </Routes>
    </BrowserRouter>
  );
};
