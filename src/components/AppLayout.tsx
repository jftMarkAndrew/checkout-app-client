import { Outlet } from "react-router-dom";
import { Logo } from "./Logo";

export const AppLayout: React.FC = () => {
  return (
    <div className="content-grid">
      <header>
        <Logo />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
