import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ContainerComponent } from "./components/ContainerComponent";
import { TrackComponent } from "./components/TrackComponent";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to="/">Store</Link> | <Link to="/tracking">Orders</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ContainerComponent />} />
          <Route path="/tracking" element={<TrackComponent />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
