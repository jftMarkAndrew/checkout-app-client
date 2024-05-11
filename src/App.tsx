import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContainerComponent } from "./components/ContainerComponent";
import { TrackComponent } from "./components/TrackComponent";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContainerComponent />} />
        <Route path="/tracking" element={<TrackComponent />} />
        <Route path="/tracking/:orderId" element={<TrackComponent />} />
      </Routes>
    </BrowserRouter>
  );
};
